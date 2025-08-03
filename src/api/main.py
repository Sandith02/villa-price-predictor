from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import os
import numpy as np
from typing import Optional

# Initialize FastAPI app
app = FastAPI(
    title="Villa Price Predictor API",
    description="AI-powered villa rental price prediction for Ahangama, Sri Lanka",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple prediction function (fallback if model fails to load)
def simple_predict(bedrooms, bathrooms, beach_distance, pool, ocean_view, garden_size, ac_rooms, wifi_quality):
    """Simple rule-based prediction if ML model fails"""
    base_price = 50
    
    # Add for bedrooms
    base_price += bedrooms * 25
    
    # Add for bathrooms  
    base_price += bathrooms * 15
    
    # Beach distance penalty
    if beach_distance <= 50:
        base_price += 100  # Beachfront premium
    elif beach_distance <= 200:
        base_price += 50   # Close to beach
    elif beach_distance >= 1000:
        base_price -= 30   # Far from beach
    
    # Amenities
    if pool == 1:
        base_price += 40
    if ocean_view == 1:
        base_price += 60
    if garden_size == 3:  # Large
        base_price += 20
    elif garden_size == 2:  # Medium
        base_price += 10
    
    base_price += ac_rooms * 10
    base_price += wifi_quality * 10
    
    return max(base_price, 20)

# Try to load the trained model
model = None
model_info = None

try:
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../data/models/villa_price_model.pkl")
    INFO_PATH = os.path.join(os.path.dirname(__file__), "../../data/models/model_info.json")
    
    model = joblib.load(MODEL_PATH)
    with open(INFO_PATH, 'r') as f:
        model_info = json.load(f)
    print("✅ AI model loaded successfully!")
except Exception as e:
    print(f"⚠️ Could not load ML model: {e}")
    print("📊 Using simple rule-based prediction")
    model_info = {"features": ["bedrooms", "bathrooms", "beach_distance", "pool", "ocean_view", "garden_size", "ac_rooms", "wifi_quality"]}

# Request model for villa prediction
class VillaRequest(BaseModel):
    bedrooms: int
    bathrooms: int
    beach_distance_m: int
    pool: str
    ocean_view: str
    garden_size: str
    ac_rooms: int
    wifi_quality: str

@app.get("/")
async def root():
    return {
        "message": "🏖️ Villa Price Predictor API",
        "status": "active",
        "model_loaded": model is not None,
        "prediction_method": "ML Model" if model else "Rule-based"
    }

@app.get("/model-info")
async def get_model_info():
    if model_info is None:
        raise HTTPException(status_code=500, detail="Model info not available")
    return model_info

@app.post("/predict")
async def predict_villa_price(villa: VillaRequest):
    try:
        # Convert categorical inputs to numbers
        pool_num = 1 if villa.pool.lower() == 'yes' else 0
        ocean_view_num = 1 if villa.ocean_view.lower() == 'yes' else 0
        
        garden_map = {'small': 1, 'medium': 2, 'large': 3}
        wifi_map = {'average': 1, 'good': 2, 'excellent': 3}
        
        garden_num = garden_map.get(villa.garden_size.lower(), 2)
        wifi_num = wifi_map.get(villa.wifi_quality.lower(), 2)
        
        # Try ML model first, fallback to simple prediction
        if model is not None:
            try:
                features = np.array([[
                    villa.bedrooms,
                    villa.bathrooms,
                    villa.beach_distance_m,
                    pool_num,
                    ocean_view_num,
                    garden_num,
                    villa.ac_rooms,
                    wifi_num
                ]])
                predicted_price = model.predict(features)[0]
            except Exception as e:
                print(f"ML prediction failed: {e}, using simple prediction")
                predicted_price = simple_predict(
                    villa.bedrooms, villa.bathrooms, villa.beach_distance_m,
                    pool_num, ocean_view_num, garden_num, villa.ac_rooms, wifi_num
                )
        else:
            predicted_price = simple_predict(
                villa.bedrooms, villa.bathrooms, villa.beach_distance_m,
                pool_num, ocean_view_num, garden_num, villa.ac_rooms, wifi_num
            )
        
        predicted_price = max(predicted_price, 20)  # Minimum $20/night
        
        return {
            "predicted_price": round(predicted_price, 2),
            "currency": "USD",
            "period": "per night",
            "prediction_method": "ML Model" if model else "Rule-based",
            "villa_features": {
                "bedrooms": villa.bedrooms,
                "bathrooms": villa.bathrooms,
                "beach_distance_m": villa.beach_distance_m,
                "pool": villa.pool,
                "ocean_view": villa.ocean_view,
                "garden_size": villa.garden_size,
                "ac_rooms": villa.ac_rooms,
                "wifi_quality": villa.wifi_quality
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import os
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
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if os.path.exists("/opt/render/project/src"):
    # Production paths - model files in src/data/models
    BASE_DIR = os.path.dirname(__file__)  # this gives you /project-root/src/api
    MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, '../data/models/villa_price_model.pkl'))
    INFO_PATH = os.path.abspath(os.path.join(BASE_DIR, '../data/models/model_info.json'))
else:
    # Local development path - go up one level to src, then data/models
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "../data/models/villa_price_model.pkl")
    INFO_PATH = os.path.join(os.path.dirname(__file__), "../data/models/model_info.json")

try:
    model = joblib.load(MODEL_PATH)
    with open(INFO_PATH, 'r') as f:
        model_info = json.load(f)
    print("✅ AI model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None
    model_info = None

# Request model for villa prediction
class VillaRequest(BaseModel):
    bedrooms: int
    bathrooms: int
    beach_distance_m: int
    pool: str  # "Yes" or "No"
    ocean_view: str  # "Yes" or "No"
    garden_size: str  # "Small", "Medium", "Large"
    ac_rooms: int
    wifi_quality: str  # "Average", "Good", "Excellent"

@app.get("/")
async def root():
    return {
        "message": "🏖️ Villa Price Predictor API",
        "status": "active",
        "model_loaded": model is not None
    }

@app.get("/model-info")
async def get_model_info():
    if model_info is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    return model_info

@app.post("/predict")
async def predict_villa_price(villa: VillaRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Convert categorical inputs to numbers
        pool_num = 1 if villa.pool.lower() == 'yes' else 0
        ocean_view_num = 1 if villa.ocean_view.lower() == 'yes' else 0
        
        garden_map = {'small': 1, 'medium': 2, 'large': 3}
        wifi_map = {'average': 1, 'good': 2, 'excellent': 3}
        
        garden_num = garden_map.get(villa.garden_size.lower(), 2)
        wifi_num = wifi_map.get(villa.wifi_quality.lower(), 2)
        
        # Create feature array
        features = [[
            villa.bedrooms,
            villa.bathrooms,
            villa.beach_distance_m,
            pool_num,
            ocean_view_num,
            garden_num,
            villa.ac_rooms,
            wifi_num
        ]]
        
        # Make prediction
        predicted_price = model.predict(features)[0]
        predicted_price = max(predicted_price, 20)  # Minimum $20/night
        
        return {
            "predicted_price": round(predicted_price, 2),
            "currency": "USD",
            "period": "per night",
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
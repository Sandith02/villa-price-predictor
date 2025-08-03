# Villa Price Predictor AI - Professional Project Documentation

## 🎯 Project Overview

**Goal:** Build an AI-powered villa rental price prediction system for Ahangama, Sri Lanka  
**Your Advantage:** Local market knowledge + web development experience  
**Development Approach:** Professional data science workflow using VS Code + Jupyter

---

## 📊 Dataset Summary

- **Properties:** 45 Ahangama villas (real market data)
- **Features:** 9 attributes (bedrooms, beach distance, pool, ocean view, etc.)
- **Target Variable:** Daily rental rate (USD)
- **Price Range:** $21 - $414 per night
- **Data Quality:** Complete dataset, no missing values
- **Market Focus:** High-season rental rates for tourist villas

---

## 🛠️ Professional Development Environment

### VS Code Setup (Required Extensions):
```
✅ Python (Microsoft)
✅ Jupyter (Microsoft) 
✅ Pylance (Microsoft)
✅ Black Formatter
✅ GitLens
✅ Thunder Client (API testing)
```

### Python Environment:
```bash
# Create virtual environment
python -m venv villa-ai-env
source villa-ai-env/bin/activate  # Linux/Mac
villa-ai-env\Scripts\activate     # Windows

# Install dependencies
pip install pandas scikit-learn matplotlib seaborn jupyter fastapi uvicorn
```

---

## 📁 Professional Project Structure

```
villa-price-predictor/
├── notebooks/                    # Jupyter research & analysis
│   ├── 01_data_exploration.ipynb
│   ├── 02_feature_engineering.ipynb
│   ├── 03_model_experiments.ipynb
│   ├── 04_model_evaluation.ipynb
│   └── 05_final_analysis.ipynb
├── src/                          # Production Python code
│   ├── data/
│   │   ├── __init__.py
│   │   ├── processor.py          # Data cleaning & preprocessing
│   │   └── validator.py          # Input validation
│   ├── models/
│   │   ├── __init__.py
│   │   ├── trainer.py            # Model training pipeline
│   │   ├── predictor.py          # Prediction service
│   │   └── evaluator.py          # Model evaluation metrics
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI application
│   │   ├── routes.py             # API endpoints
│   │   └── schemas.py            # Pydantic data models
│   └── utils/
│       ├── __init__.py
│       ├── config.py             # Configuration management
│       └── logger.py             # Logging setup
├── frontend/                     # React web application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── data/                         # Dataset storage
│   ├── raw/
│   │   └── ahangama_villas.csv
│   ├── processed/
│   └── models/
│       └── trained_model.pkl
├── tests/                        # Unit & integration tests
│   ├── test_data_processor.py
│   ├── test_model.py
│   └── test_api.py
├── docs/                         # Documentation
│   ├── api_docs.md
│   └── model_documentation.md
├── .gitignore
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── README.md
└── setup.py
```

---

## 🚀 Development Phases

### Phase 1: AI Model Development (Week 1-2)
**Focus:** Research & experimentation in Jupyter notebooks  
**Duration:** 7-10 days  
**Environment:** VS Code with Jupyter notebooks

#### 🎯 Objectives:
- [ ] Comprehensive data exploration and visualization
- [ ] Feature engineering and selection
- [ ] Multiple ML model experimentation
- [ ] Model evaluation and selection
- [ ] Production-ready prediction pipeline

#### 📊 Deliverables:
- [ ] **01_data_exploration.ipynb** - Dataset analysis, insights, visualizations
- [ ] **02_feature_engineering.ipynb** - New features, data transformations
- [ ] **03_model_experiments.ipynb** - Try Linear Regression, Random Forest, XGBoost
- [ ] **04_model_evaluation.ipynb** - Compare models, select best performer
- [ ] **05_final_analysis.ipynb** - Final insights and recommendations
- [ ] **src/models/trainer.py** - Production model training code
- [ ] **src/models/predictor.py** - Clean prediction service

#### 🎯 Success Metrics:
- Model R² Score: >0.85 (85% accuracy)
- Mean Absolute Error: <$25
- Cross-validation stability
- Realistic price predictions for test cases

#### 🛠️ Tech Stack:
```python
pandas              # Data manipulation
scikit-learn        # Machine learning algorithms
matplotlib/seaborn  # Data visualization
numpy               # Numerical computing
joblib              # Model serialization
```

---

### Phase 2: Web Application Development (Week 3-4)
**Focus:** Professional full-stack application  
**Duration:** 10-14 days  
**Environment:** VS Code for both backend and frontend

#### 🎯 Objectives:
- [ ] FastAPI backend with ML model integration
- [ ] Modern React frontend with professional UI
- [ ] Real-time price predictions
- [ ] Data validation and error handling
- [ ] Mobile-responsive design

#### 📱 Application Features:
- **Villa Input Form:** 
  - Bedrooms, bathrooms, beach distance
  - Pool, ocean view, garden size
  - AC rooms, WiFi quality
- **Instant Predictions:** Real-time price estimates
- **Market Analysis:** Compare with similar villas
- **Price Insights:** Explain what affects pricing
- **Mobile Responsive:** Works on all devices

#### 🛠️ Tech Stack:
```javascript
// Backend
FastAPI            # Modern Python web framework
Pydantic           # Data validation
Uvicorn            # ASGI server

// Frontend  
React              # UI framework
TypeScript         # Type safety
Tailwind CSS       # Modern styling
React Hook Form    # Form management
Axios              # API communication
Recharts           # Data visualization
```

#### 🎯 API Endpoints:
```python
POST /predict          # Get price prediction
GET /villa/{id}        # Get villa details
GET /market-analysis   # Market insights
GET /health           # System health check
```

---

### Phase 3: Production Deployment (Week 5)
**Focus:** Professional hosting and monitoring  
**Duration:** 3-5 days

#### 🎯 Objectives:
- [ ] Containerized deployment with Docker
- [ ] Backend deployment (Railway/Render)
- [ ] Frontend deployment (Vercel)
- [ ] API documentation
- [ ] Basic monitoring and logging

#### 🚀 Deployment Stack:
```yaml
Backend:   Railway/Render (FastAPI + ML model)
Frontend:  Vercel (React application)
Database:  PostgreSQL (future expansion)
Monitoring: Basic logging and health checks
```

---

## 🔬 Research Questions to Explore

1. **What villa features most impact rental prices?**
2. **How much premium do beachfront properties command?**
3. **Is there a sweet spot for bedroom count vs. price?**
4. **How does WiFi quality affect modern travelers' willingness to pay?**
5. **Can we identify underpriced or overpriced villas in the market?**

---

## 📈 Success Metrics

### Technical Metrics:
- **Model Accuracy:** R² > 0.85
- **Prediction Error:** MAE < $25
- **API Response Time:** < 200ms
- **Frontend Performance:** Lighthouse score > 90

### Business Metrics:
- **Prediction Accuracy:** Within 15% of actual rates
- **User Experience:** Intuitive villa price estimation
- **Market Insights:** Actionable pricing recommendations

---

## 🎓 Learning Outcomes

By completing this project, you'll gain expertise in:

### Data Science:
- Data exploration and visualization
- Feature engineering techniques
- Multiple machine learning algorithms
- Model evaluation and selection
- Production ML pipeline development

### Software Engineering:
- Professional project structure
- API development with FastAPI
- Modern frontend development
- Docker containerization
- Cloud deployment strategies

### Domain Knowledge:
- Real estate pricing factors
- Sri Lankan tourism market dynamics
- Vacation rental business insights

---

## 📚 Next Steps

1. **Set up VS Code environment** with required extensions
2. **Create project structure** and initialize Git repository
3. **Start with Phase 1** - data exploration in Jupyter notebook
4. **Load villa dataset** and begin analysis

**Ready to build your first professional AI project?** 🚀

---

*This documentation will be updated as the project progresses. Each phase includes specific deliverables and success criteria to ensure professional-quality development.*
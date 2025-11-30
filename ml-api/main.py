from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from sentence_transformers import SentenceTransformer
import os

app = FastAPI(title="PeoplePost ML API")

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and SBERT
model = None
sbert = None

@app.on_event("startup")
async def load_models():
    global model, sbert
    print("\n" + "="*50)
    print("🚀 Starting PeoplePost ML API...")
    print("="*50)
    
    # Load classifier model
    print("\n📦 Loading department classifier...")
    try:
        model = joblib.load("models/department_classifier.pkl")
        print("✅ Department classifier loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading classifier: {e}")
        model = None
    
    # Load SBERT model
    print("\n📦 Loading SBERT model (this may take a few minutes on first run)...")
    try:
        sbert = SentenceTransformer("all-MiniLM-L6-v2")
        print("✅ SBERT model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading SBERT: {e}")
        sbert = None
    
    if model and sbert:
        print("\n✅ All models loaded successfully! API is ready.")
    else:
        print("\n⚠️  Warning: Some models failed to load. Predictions will not work.")
    print("="*50 + "\n")

# Department icons mapping
DEPARTMENT_ICONS = {
    "Roads": "🛣",
    "Streetlight": "💡",
    "Water & Drainage": "💧",
    "Waste Management": "🗑",
    "Animal Control": "🐕"
}

class PredictionRequest(BaseModel):
    description: str

class PredictionResponse(BaseModel):
    department: str
    icon: str

@app.get("/")
async def root():
    return {
        "message": "PeoplePost ML API",
        "status": "running",
        "model_loaded": model is not None
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_department(request: PredictionRequest):
    if not model or not sbert:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if not request.description or len(request.description.strip()) < 5:
        raise HTTPException(status_code=400, detail="Description too short")
    
    try:
        # Generate embedding
        embedding = sbert.encode([request.description])
        
        # Predict department
        prediction = model.predict(embedding)[0]
        
        # Get icon
        icon = DEPARTMENT_ICONS.get(prediction, "🏛")
        
        return {
            "department": prediction,
            "icon": icon
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

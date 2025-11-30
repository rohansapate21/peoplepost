# ML API for PeoplePost

Python FastAPI backend for AI-powered department prediction.

## Setup

### 1. Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Add Your Model

Place your trained model file in the `models/` folder:
\`\`\`
ml-api/
└── models/
    └── department_classifier.pkl  # Your trained model
\`\`\`

### 3. Run the API

\`\`\`bash
uvicorn main:app --reload --port 5000
\`\`\`

The API will be available at `http://localhost:5000`

## Endpoints

- `GET /` - API information
- `GET /health` - Health check (returns model status)
- `POST /predict` - Predict department from description

## Example Request

\`\`\`bash
curl -X POST http://localhost:5000/predict \\
  -H "Content-Type: application/json" \\
  -d '{"description": "Large pothole on main street"}'
\`\`\`

## Example Response

\`\`\`json
{
  "department": "Roads",
  "icon": "🛣"
}
\`\`\`

## Deployment

### Render

1. Create new Web Service
2. Connect GitHub repo
3. Set:
   - **Build Command**: `cd ml-api && pip install -r requirements.txt`
   - **Start Command**: `cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy

### Railway

1. Create new project
2. Connect GitHub repo
3. Add start command: `cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy

### Update Frontend

After deploying, update `NEXT_PUBLIC_ML_API_URL` in Vercel:
\`\`\`
NEXT_PUBLIC_ML_API_URL=https://your-ml-api.onrender.com
\`\`\`

## Notes

- First run downloads SBERT model (~500MB)
- Model file is excluded from git (add manually on server)
- API is optional - app works without it

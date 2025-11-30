# PeoplePost - Civic Issue Reporting Platform

A modern web application that empowers citizens to report civic issues and enables government officials to manage and resolve them efficiently. Features AI-powered department routing using machine learning.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## ✨ Features

### For Citizens
- 📍 **GPS-based Reporting** - Capture exact location of issues
- 📸 **Photo Upload** - Attach up to 5 images per report
- 🤖 **AI Department Routing** - ML model predicts correct department
- 📊 **Track Progress** - Monitor status of your reports
- 🔔 **Status Updates** - Get notified when issues are resolved

### For Officials
- 📋 **Dashboard** - Manage all reported issues
- 🗺️ **Map View** - Visualize issues geographically
- 🔍 **Filtering** - Filter by status, date, and category
- ✅ **Status Management** - Update issue status
- 📷 **Resolution Proof** - Upload proof of resolution

### Technical Features
- 🎨 **Modern UI/UX** - Gradient backgrounds, glassmorphism, smooth animations
- 🔐 **Secure Authentication** - Supabase Auth with role-based access
- 🌐 **Responsive Design** - Works on desktop, tablet, and mobile
- 🚀 **Fast Performance** - Optimized with Next.js 16
- 🤖 **ML Integration** - Department prediction using SBERT + Logistic Regression

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Maps**: Leaflet + React Leaflet
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Heroicons

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **ML API**: FastAPI (Python)

### ML Model
- **Framework**: Scikit-learn
- **Embeddings**: Sentence Transformers (SBERT)
- **Model**: Logistic Regression Classifier
- **Departments**: Roads, Streetlight, Water & Drainage, Waste Management, Animal Control

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Supabase account
- Git

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/yourusername/peoplepost.git
cd peoplepost
\`\`\`

### 2. Install Dependencies

**Frontend:**
\`\`\`bash
npm install
\`\`\`

**ML API (Optional):**
\`\`\`bash
cd ml-api
pip install -r requirements.txt
cd ..
\`\`\`

### 3. Environment Setup

Copy the example environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ML_API_URL=http://localhost:5000
\`\`\`

### 4. Database Setup

Run these SQL commands in your Supabase SQL editor:

\`\`\`sql
-- Create reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'NEW',
  latitude DECIMAL,
  longitude DECIMAL,
  address TEXT,
  image_urls TEXT[],
  resolutionImageUrls TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view all reports" ON reports FOR SELECT USING (true);
CREATE POLICY "Users can insert own reports" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Officials can update reports" ON reports FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'official'
  )
);
\`\`\`

### 5. Storage Setup

Create a storage bucket named `images` in Supabase:
1. Go to Storage in Supabase dashboard
2. Create new bucket: `images`
3. Set to public
4. Add policy: Allow authenticated users to upload

### 6. Run Development Servers

**Terminal 1 - Next.js:**
\`\`\`bash
npm run dev
\`\`\`

**Terminal 2 - ML API (Optional):**
\`\`\`bash
cd ml-api
uvicorn main:app --reload --port 5000
\`\`\`

Visit `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_ANON_KEY`
     - `NEXT_PUBLIC_ML_API_URL` (if using ML)
   - Deploy!

### Deploy ML API (Optional)

Deploy the ML API to Render, Railway, or Heroku:

**Example for Render:**
1. Create new Web Service
2. Connect your GitHub repo
3. Set:
   - Build Command: `cd ml-api && pip install -r requirements.txt`
   - Start Command: `cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy
5. Update `NEXT_PUBLIC_ML_API_URL` in Vercel

## 📁 Project Structure

\`\`\`
peoplepost/
├── app/                      # Next.js app directory
│   ├── components/           # React components
│   ├── data-service/         # Supabase client & actions
│   ├── login/               # Login page
│   ├── signup/              # Signup pages
│   ├── report/              # Report form
│   ├── account/             # User dashboard
│   ├── dashboard/           # Official dashboard
│   └── page.js              # Homepage
├── ml-api/                  # Python ML API
│   ├── models/              # ML model files
│   ├── main.py              # FastAPI app
│   └── requirements.txt     # Python dependencies
├── public/                  # Static assets
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Node dependencies
└── README.md               # This file
\`\`\`

## 🎯 Usage

### As a Citizen

1. **Sign Up** - Create account as "Citizen"
2. **Report Issue** - Click "Report a Problem"
3. **Fill Details** - Add title, description, category
4. **Add Location** - Use GPS or manual entry
5. **Upload Photos** - Attach up to 5 images
6. **Submit** - AI predicts department automatically
7. **Track** - View status in "My Reports"

### As an Official

1. **Sign Up** - Create account as "Official" (requires admin approval)
2. **View Dashboard** - See all reported issues
3. **Filter Issues** - By status, date, category
4. **Update Status** - Mark as IN_PROCESS or RESOLVED
5. **Add Proof** - Upload resolution images
6. **Track Metrics** - View statistics

## 🤖 ML Model

The department prediction model uses:
- **SBERT** (all-MiniLM-L6-v2) for text embeddings
- **Logistic Regression** for classification
- **Accuracy**: ~85% on test data

**Predicted Departments:**
- 🛣 Roads
- 💡 Streetlight
- 💧 Water & Drainage
- 🗑 Waste Management
- 🐕 Animal Control

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_ML_API_URL` | ML API endpoint | No |

### ML API (Optional)

The ML API is optional. If not running:
- Reports still submit successfully
- No department prediction shown
- All other features work normally

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Email: your-email@example.com

## 🙏 Acknowledgments

- Built with Next.js and Supabase
- ML powered by Sentence Transformers
- Icons by Heroicons
- Maps by Leaflet

---

**Made with ❤️ for better civic engagement**


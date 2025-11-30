# Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Supabase project set up

### Step 1: Push to GitHub

\`\`\`bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PeoplePost civic reporting platform"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/peoplepost.git

# Push
git push -u origin main
\`\`\`

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Add Environment Variables**:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_ML_API_URL=http://localhost:5000
   \`\`\`

6. Click "Deploy"

### Step 3: Update Supabase Settings

In your Supabase project:

1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

3. Go to **API Settings**
4. Note your:
   - Project URL
   - Anon/Public key

---

## 🤖 Deploy ML API (Optional)

### Option 1: Render

1. **Create Account** at [render.com](https://render.com)

2. **Create New Web Service**
   - Connect GitHub repository
   - Select your repo

3. **Configure**:
   - **Name**: `peoplepost-ml-api`
   - **Environment**: Python 3
   - **Build Command**: 
     \`\`\`bash
     cd ml-api && pip install -r requirements.txt
     \`\`\`
   - **Start Command**: 
     \`\`\`bash
     cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT
     \`\`\`

4. **Add Model File**:
   - Upload `department_classifier.pkl` manually via Render dashboard
   - Or use Render Disk for persistent storage

5. **Deploy**

6. **Update Vercel**:
   - Go to Vercel project settings
   - Update `NEXT_PUBLIC_ML_API_URL` to your Render URL
   - Redeploy

### Option 2: Railway

1. **Create Account** at [railway.app](https://railway.app)

2. **New Project** → **Deploy from GitHub**

3. **Configure**:
   - Add start command: `cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Railway auto-detects Python

4. **Add Model**:
   - Use Railway volumes
   - Or upload via dashboard

5. **Deploy**

6. **Update Vercel** with Railway URL

---

## 📊 Database Migration

If deploying to production, run these in Supabase SQL editor:

\`\`\`sql
-- Ensure reports table exists
CREATE TABLE IF NOT EXISTS reports (
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

-- Enable RLS
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

---

## ✅ Post-Deployment Checklist

- [ ] Vercel deployment successful
- [ ] Environment variables set correctly
- [ ] Supabase redirect URLs updated
- [ ] Can sign up new users
- [ ] Can log in
- [ ] Can submit reports
- [ ] Images upload successfully
- [ ] Map displays correctly
- [ ] Officials can update status
- [ ] ML API working (if deployed)

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Issue**: Build errors
**Solution**: Check build logs, ensure all dependencies in `package.json`

### Authentication Not Working

**Issue**: Can't log in
**Solution**: Check Supabase redirect URLs match Vercel URL

### Images Not Uploading

**Issue**: Upload fails
**Solution**: Check Supabase Storage bucket is public and policies are set

### ML Predictions Not Working

**Issue**: No department shown
**Solution**: 
- Check `NEXT_PUBLIC_ML_API_URL` is set
- Verify ML API is running
- Check browser console for errors

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

\`\`\`bash
git add .
git commit -m "Update feature"
git push
\`\`\`

Vercel will:
1. Detect the push
2. Build your app
3. Deploy automatically
4. Provide preview URL

---

## 📈 Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Track page views, performance

### Supabase Logs
- View in Supabase dashboard
- Monitor database queries
- Check auth events

---

**Your app is now live! 🎉**

Visit your Vercel URL to see it in action.

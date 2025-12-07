# 🚀 Deployment Guide

## Prerequisites
- Valid OMDB API Key (activated)
- GitHub account
- Netlify account (free)

---

## 📦 Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Movie Search App"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `movie-search-app`
3. Description: "A full-featured movie search app using React and OMDB API"
4. Keep it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/movie-search-app.git
git branch -M main
git push -u origin main
```

---

## 🌐 Part 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. **Go to Netlify**: https://app.netlify.com/
2. **Sign up/Login** (you can use GitHub account)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Authorize Netlify to access your GitHub
6. Select your `movie-search-app` repository
7. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
8. Click **"Show advanced"** → **"New variable"**
9. Add environment variable:
   - **Key:** `VITE_OMDB_API_KEY`
   - **Value:** Your activated API key
10. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Deploy
netlify deploy --prod
```

When prompted:
- Build command: `npm run build`
- Publish directory: `dist`

Then add environment variable in Netlify dashboard.

---

## 🔑 Setting Environment Variables on Netlify

### After Deployment:

1. Go to your site dashboard on Netlify
2. Click **"Site settings"**
3. Click **"Environment variables"** (left sidebar)
4. Click **"Add a variable"**
5. Add:
   - **Key:** `VITE_OMDB_API_KEY`
   - **Value:** Your OMDB API key (must be activated!)
6. Click **"Create variable"**
7. **Trigger redeploy** (Deploys → Trigger deploy → Deploy site)

---

## ✅ Verify Deployment

After deployment completes:

1. Click the Netlify URL (e.g., `your-site-name.netlify.app`)
2. Test searching for "Batman"
3. Test type filters
4. Test pagination
5. Click a movie to view details

---

## 🔧 Updating Your Deployed Site

### After making code changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Netlify will **automatically rebuild and redeploy** your site!

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key" on deployed site

**Solution:** 
- Check environment variable is set correctly in Netlify
- Make sure variable name is exactly: `VITE_OMDB_API_KEY`
- API key must be activated via email
- Redeploy after adding environment variable

### Issue: Build fails on Netlify

**Solution:**
- Check build logs in Netlify dashboard
- Ensure `package.json` has all dependencies
- Make sure build command is `npm run build`
- Publish directory should be `dist`

### Issue: Site loads but shows errors

**Solution:**
- Open browser console (F12)
- Check for API key errors
- Verify environment variable is set in Netlify
- Check API quota (1000 requests/day for free tier)

---

## 📊 Netlify Dashboard Features

- **Deploy logs** - See build process
- **Function logs** - Debug issues
- **Analytics** - View traffic (paid feature)
- **Custom domain** - Add your own domain (free)
- **Deploy previews** - Test before going live

---

## 🎯 Custom Domain (Optional)

1. In Netlify: **Domain settings** → **Add custom domain**
2. Follow DNS configuration instructions
3. Netlify provides free HTTPS certificate!

---

## 💡 Tips

- Netlify free tier includes:
  - 100GB bandwidth/month
  - Continuous deployment from Git
  - HTTPS enabled automatically
  - Instant cache invalidation
  
- Every Git push triggers auto-deployment
- Keep your API key secret (never commit `.env` file)
- Monitor API usage to stay within free tier limits

---

**Your app will be live at:** `https://your-site-name.netlify.app` 🎉

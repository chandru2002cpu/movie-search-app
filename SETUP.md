# 🚀 SETUP INSTRUCTIONS

## PowerShell Execution Policy Fix

Your system is blocking npm/node commands due to PowerShell execution policy. Here are the solutions:

### Option 1: Temporary Fix (Recommended for Quick Start)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Option 2: Run Commands via CMD

Use Command Prompt (cmd.exe) instead of PowerShell:
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project: `cd "C:\Users\DELL\OneDrive\Desktop\task & projects\Movie searching app"`
4. Run: `npm install`

### Option 3: Use npx with Full Path

In PowerShell, run commands using their full path:
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

## 📦 Installation Steps

Once you've resolved the PowerShell issue, follow these steps:

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages:
- react
- react-dom
- react-router-dom
- vite
- tailwindcss
- autoprefixer
- postcss
- @vitejs/plugin-react

### Step 2: Configure Your API Key

1. Visit https://www.omdbapi.com/apikey.aspx
2. Enter your email to get a FREE API key
3. Check your email and activate the key
4. Open the `.env` file in the project root
5. Replace `your_api_key_here` with your actual API key:

```env
VITE_OMDB_API_KEY=abcd1234
```

### Step 3: Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## ✅ Verification Checklist

- [ ] Dependencies installed successfully
- [ ] `.env` file has valid API key
- [ ] Development server starts without errors
- [ ] Can search for movies (try "Batman")
- [ ] Type filter dropdown works
- [ ] Pagination works
- [ ] Can click on movie to see details
- [ ] Back button returns to search

## 🐛 Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` again

### Issue: "API key is undefined"
**Solution:** Make sure `.env` file has `VITE_OMDB_API_KEY=your_key` (no quotes)

### Issue: "Too many requests"
**Solution:** OMDB free tier has 1000 requests/day limit. Wait or upgrade.

### Issue: Styles not loading
**Solution:** Make sure Tailwind is installed: `npm install -D tailwindcss postcss autoprefixer`

## 📝 Quick Test Commands

After setup, test these searches:
- "Inception"
- "Batman"
- "Marvel"
- "Star Wars"

Try different type filters:
- All Types
- Movies only
- Series only

## 🎯 Next Steps

1. Install dependencies
2. Get API key
3. Run dev server
4. Start searching movies!

Enjoy your Movie Search App! 🎬

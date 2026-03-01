# PrimeSolutions Deployment Guide

This guide walks you through deploying the PrimeSolutions platform to **Netlify (Frontend)** and **Render (Backend)**.

---

## 📋 Prerequisites

- **Netlify Account**: [netlify.com](https://netlify.com) (free tier available)
- **Render Account**: [render.com](https://render.com) (free tier available)
- **MongoDB Atlas Account**: [mongodb.com](https://mongodb.com) for cloud database
- **GitHub Account**: Both platforms deploy from GitHub repositories
- Your project pushed to GitHub

---

## 🚀 Backend Deployment (Render)

### Step 1: Push Backend to GitHub

```bash
cd backend
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

### Step 2: Create Render Account & New Web Service

1. Go to [render.com](https://render.com) and sign up
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Select your repo and authorize Render

### Step 3: Configure Render Service

| Field | Value |
|-------|-------|
| **Name** | `primesolutions-backend` (or your choice) |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Plan** | Free (or paid if needed) |
| **Region** | Choose closest to your users |

### Step 4: Add Environment Variables

In Render dashboard, go to **Environment** and add these variables:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong random secret (use `openssl rand -hex 32`) |
| `NODE_ENV` | `production` |
| `FRONTEND_ORIGIN` | Your Netlify frontend URL (e.g., `https://primesolutions.netlify.app`) |
| `PORT` | Leave blank (Render assigns automatically) |

**To get MongoDB Atlas connection string:**
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a cluster (free tier available)
3. Create a user with password
4. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/primesolutions?retryWrites=true&w=majority`

### Step 5: Deploy

Click **Deploy** on Render. Your backend will be live at:
```
https://primesolutions-backend.onrender.com
```

---

## 🎨 Frontend Deployment (Netlify)

### Step 1: Push Frontend to GitHub

```bash
cd frontend
git add .
git commit -m "Frontend ready for deployment"
git push origin main
```

### Step 2: Create Netlify Account & Connect Repository

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize
4. Select your repository

### Step 3: Configure Build Settings

Netlify should auto-detect these from `netlify.toml`:

| Field | Value |
|-------|-------|
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |

If not, set them manually in **Site Settings** → **Build & deploy**.

### Step 4: Add Environment Variables

In Netlify **Site Settings** → **Build & deploy** → **Environment**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://primesolutions-backend.onrender.com/api`) |

> Update your frontend code to use `import.meta.env.VITE_API_URL` for API calls.

### Step 5: Deploy

Netlify will automatically deploy when you push to GitHub. Your frontend will be live at:
```
https://primesolutions.netlify.app
```
(or your custom domain)

---

## 🔗 Update Frontend API Configuration

Update your frontend to use the backend URL from environment variables:

**File: `frontend/src/api/client.ts` (or similar)**

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

Then use it in your components:
```typescript
import { apiClient } from '../api/client';

// Example
const response = await apiClient.post('/auth/login', { email, password });
```

---

## 🔒 Security Checklist

- [ ] MongoDB Atlas: Create user with strong password
- [ ] Render: Set `NODE_ENV=production`
- [ ] Backend: Use strong `JWT_SECRET` (minimum 32 characters)
- [ ] Netlify: Restrict API to only your frontend domain in CORS
- [ ] Update backend `FRONTEND_ORIGIN` to your Netlify URL
- [ ] Remove sensitive info from `.env` files (use Render/Netlify env variables instead)

---

## 🐛 Troubleshooting

### Backend Won't Start on Render
- Check logs: **Render Dashboard** → **Logs**
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas allows connections from Render IP (allow all: 0.0.0.0/0)

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly in Netlify
- Check CORS policy on backend (should allow your Netlify domain)
- Open browser DevTools → Network tab to see actual requests

### Build Fails on Netlify
- Check **Deploys** → **Deploy logs**
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

---

## 📈 Monitoring

### Render
- Monitor in **Render Dashboard** → **Metrics**
- Watch for errors in **Logs**
- Set up alerts if needed

### Netlify
- Monitor in **Analytics** tab
- Check **Deploys** for build status
- Review **Functions** if using serverless

---

## 🔄 Redeploying

**Backend (Render):**
- Automatic on push to GitHub
- Or manual: **Render Dashboard** → **Manual Deploy**

**Frontend (Netlify):**
- Automatic on push to GitHub
- Or manual: **Netlify** → **Deploys** → **Trigger deploy**

---

## 💾 Backup & Scaling

As your app grows:
- **Upgrade to paid plans** for more resources
- **Enable auto-scaling** on Render
- **Upgrade MongoDB Atlas** tier for higher limits
- **Use CDN** on Netlify (included with paid plan)

---

For questions or issues, check platform documentation:
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

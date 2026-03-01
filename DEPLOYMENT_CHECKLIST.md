# ✅ Pre-Deployment Checklist

## Code Preparation ✅
- [x] All hardcoded API URLs replaced with environment variables
- [x] API utility created (`frontend/src/utils/api.ts`)
- [x] Frontend builds successfully without errors
- [x] Backend ready for deployment
- [x] CORS configured for production
- [x] Environment variable files created (`.env.example`)

## Deployment Configuration Files ✅
- [x] `Procfile` created for Render backend
- [x] `netlify.toml` created for Netlify frontend
- [x] Deployment documentation complete (DEPLOYMENT.md)
- [x] Quick start guide created (DEPLOY_INSTRUCTIONS.md)
- [x] Deployment summary provided (DEPLOYMENT_SUMMARY.md)

## Before You Deploy

### ☐ Prepare GitHub Repository
```bash
# Make sure you've committed everything
git add .
git commit -m "Ready for deployment"
git push origin main
```

### ☐ Create MongoDB Atlas Account & Database
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free cluster
3. Create database user (remember username and password)
4. Whitelist IP: 0.0.0.0/0 (allows all, fine for MVP)
5. Copy connection string
6. Replace `<username>` and `<password>` in string

### ☐ Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easier authorization)
3. Create free account

### ☐ Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (easier authorization)
3. Create free account

## Deployment Steps (in order)

### Step 1: Deploy Backend (Render) ☐
- [ ] Go to Render dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Name: `primesolutions-backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Add environment variables:
  - `MONGO_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: Generate with `openssl rand -hex 32`
  - `NODE_ENV`: `production`
  - `FRONTEND_ORIGIN`: `https://primesolutions.netlify.app` (update after frontend deploy)
- [ ] Click Deploy
- [ ] Copy backend URL (e.g., `https://primesolutions-backend.onrender.com`)

### Step 2: Deploy Frontend (Netlify) ☐
- [ ] Go to Netlify dashboard
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose GitHub
- [ ] Select your repository
- [ ] Build Command: `npm run build`
- [ ] Publish Directory: `dist`
- [ ] Add environment variable:
  - `VITE_API_URL`: Your Render backend URL `/api` appended
    - Example: `https://primesolutions-backend.onrender.com/api`
- [ ] Click Deploy
- [ ] Copy frontend URL (e.g., `https://primesolutions.netlify.app`)

### Step 3: Update Backend CORS ☐
- [ ] Go back to Render dashboard
- [ ] Select your backend service
- [ ] Go to Environment
- [ ] Update `FRONTEND_ORIGIN` to your Netlify URL
- [ ] Backend automatically redeploys

### Step 4: Test Live Site ☐
- [ ] Visit frontend URL: `https://primesolutions.netlify.app`
- [ ] Register new account
- [ ] Login
- [ ] Open DevTools (F12) → Network tab
- [ ] Verify API calls go to Render backend
- [ ] Test wallet backup functionality
- [ ] Test admin panel
- [ ] Check MongoDB Atlas for user data

## Post-Deployment

### Monitor Your Services ☐
- [ ] Set up Render alerts (optional)
- [ ] Check MongoDB Atlas dashboard weekly
- [ ] Review build logs if deployment fails

### Make Changes Going Forward ☐
1. Make code changes locally
2. Push to GitHub
3. Both platforms automatically redeploy

### Database Backups ☐
- [ ] MongoDB Atlas: Enable automatic backups (Project → Backup)
- [ ] Render: Uses GitHub as backup source

## Troubleshooting

### Build fails on Netlify
- Check build logs: Netlify dashboard → Deploys → Recent deploy → Logs
- Run `npm run build` locally to debug

### Backend won't start on Render
- Check logs: Render dashboard → Service → Logs
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas allows connections

### "Cannot connect to API" on frontend
- Check `VITE_API_URL` in Netlify environment variables
- Verify it matches your Render backend URL + `/api`
- Clear browser cache: Ctrl+Shift+Delete

### CORS errors in browser
- Render backend's `FRONTEND_ORIGIN` must match Netlify URL exactly
- Check for `http://` vs `https://` differences
- After changing, Render backend redeploys automatically

## Support Resources

- Render Help: [render.com/docs](https://render.com/docs)
- Netlify Help: [docs.netlify.com](https://docs.netlify.com)
- MongoDB Help: [mongodb.com/support](https://mongodb.com/support)

---

## 🎉 You're All Set!

Once you complete these steps, your application will be:
- ✅ Live on the internet
- ✅ Using cloud database (MongoDB Atlas)
- ✅ With automatic SSL/TLS (HTTPS)
- ✅ Automatically deploying on git push
- ✅ Using environment variables for security

**Estimated time: 15-20 minutes**

Start with the deployment steps above. Good luck! 🚀

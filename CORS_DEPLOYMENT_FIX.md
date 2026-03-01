# CORS Fix - Deployment Instructions

## Changes Made to Backend

### 1. Enhanced CORS Middleware (`server.js`)
- Added fallback CORS headers middleware that runs on ALL responses
- This ensures `Access-Control-Allow-Origin` headers are always set
- Middleware checks if origin is in allowed list before setting headers
- Allowed origins include:
  - `https://primedigital-solutions.com` (your custom domain)
  - `https://primedigital-solutions.netlify.app` (Netlify default)
  - `http://localhost:3000` and `http://localhost:5173` (local dev)
  - Environment variable `FRONTEND_ORIGIN` if set

### 2. Added Explicit OPTIONS Handler
- Added `/api/whatsapp` OPTIONS handler
- This ensures preflight requests are handled properly before reaching the route

### 3. Updated `.env`
- `NODE_ENV=production` (ensures CORS restrictions are enabled)
- `FRONTEND_ORIGIN=https://primedigital-solutions.com`

## Deployment Steps on Render

### Step 1: Push Changes
```bash
cd backend
git add .
git commit -m "Fix CORS headers for production"
git push origin main
```

### Step 2: Update Render Environment Variables
1. Go to https://dashboard.render.com
2. Click on your **primesolutions** backend service
3. Click **Settings**
4. Scroll to **Environment**
5. Make sure these variables are set:
   ```
   NODE_ENV = production
   FRONTEND_ORIGIN = https://primedigital-solutions.com
   MONGO_URI = mongodb+srv://primesolutions:PrimeSolutions25..@primesolutions-db.9w96rjl.mongodb.net/?appName=primesolutions-db
   JWT_SECRET = your_jwt_secret
   PORT = 5001
   ADMIN_EMAIL = admin@primesolutions.com
   ADMIN_PASSWORD = admin123
   ```
6. Click **Save** (Render will auto-redeploy)

### Step 3: Verify Deployment
1. Wait for Render to finish deploying (usually 2-5 minutes)
2. Visit https://primedigital-solutions.com
3. Open Developer Tools (F12 → Console)
4. Verify no CORS errors appear
5. Check that the chat button loads and displays social icons

## What This Fixes

✅ WhatsApp settings endpoint will respond with proper CORS headers
✅ Authentication endpoints will accept preflight requests
✅ All API calls from frontend will work without being blocked
✅ Fallback headers ensure even error responses have CORS headers

## Testing Locally

To test the CORS fixes locally before deploying:

```bash
cd backend
NODE_ENV=production npm run dev
```

Then access from your Netlify frontend URL to verify headers are being set.

# Deployment Guide for Vercel

## 🚀 Deployment Steps

### 1. Fix Environment Variables on Vercel

Go to your Vercel project settings → Environment Variables and add the following:

#### Required Variables:
```
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_API_URL=/api
```

#### Optional Variables (for email notifications):
```
EMAIL_USER=your-mailtrap-or-smtp-user
EMAIL_PASS=your-mailtrap-or-smtp-password
```

### 2. Set Up MongoDB Atlas (Production Database)

Since your local MongoDB won't work in production:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/team-task-manager`)
4. Add this as `MONGO_URI` in Vercel environment variables

### 3. Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client
3. Add your Vercel URL to Authorized JavaScript origins:
   - `https://your-app-name.vercel.app`
4. Add to Authorized redirect URIs:
   - `https://your-app-name.vercel.app`
   - `https://your-app-name.vercel.app/api/auth/google`

### 4. Deploy

After adding all environment variables:
1. Push your code to GitHub (already done ✅)
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy in Vercel dashboard

## ⚠️ Common Issues

### Issue: "MONGO_URI is not defined"
**Solution**: Make sure you've added `MONGO_URI` to Vercel environment variables

### Issue: "Google OAuth not working"
**Solution**: Check that your Vercel URL is added to Google Cloud Console authorized origins

### Issue: "Build fails with TypeScript errors"
**Solution**: Run `npm run build` locally to test before deploying

## 🔍 Check Build Logs

If deployment fails:
1. Go to your Vercel dashboard
2. Click on the failed deployment
3. Check the build logs for specific error messages
4. Look for missing environment variables or build errors

## ✅ Verification

After successful deployment:
1. Check that the app loads at your Vercel URL
2. Test Google OAuth login
3. Verify task creation and management works
4. Check browser console for any API errors

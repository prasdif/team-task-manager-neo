# Deployment Guide for Vercel

## 🚀 Deployment Steps

### 1. Configure Environment Variables on Vercel

Go to your Vercel project settings → Environment Variables and add the following:

#### Required Variables:
```
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_API_URL=/api
```

#### Optional Variables (for MongoDB - if using real database):
```
MONGO_URI=your-mongodb-atlas-connection-string
```

#### Optional Variables (for email notifications):
```
EMAIL_USER=your-mailtrap-or-smtp-user
EMAIL_PASS=your-mailtrap-or-smtp-password
```

### 2. Set Up MongoDB Atlas (Optional - for Production Database)

The app works with a mock database by default. If you want persistent data:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/team-task-manager`)
4. Add this as `MONGO_URI` in Vercel environment variables

### 3. Deploy

After adding all environment variables:
1. Push your code to GitHub (already done ✅)
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy in Vercel dashboard

## ⚠️ Common Issues

### Issue: "Build fails with TypeScript errors"
**Solution**: Run `npm run build` locally to test before deploying

### Issue: "API routes returning 500 errors"
**Solution**: Check that `JWT_SECRET` is set in Vercel environment variables

## 🔍 Check Build Logs

If deployment fails:
1. Go to your Vercel dashboard
2. Click on the failed deployment
3. Check the build logs for specific error messages
4. Look for missing environment variables or build errors

## ✅ Verification

After successful deployment:
1. Check that the app loads at your Vercel URL
2. Test user registration and login
3. Verify task creation and management works
4. Check browser console for any API errors

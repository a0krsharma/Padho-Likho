# Padho Likho - Deployment Guide

This guide will walk you through deploying the Padho Likho educational platform for free using Netlify for the frontend and Render for the backend.

## Prerequisites

- GitHub account (https://github.com)
- Netlify account (https://netlify.com)
- Render account (https://render.com)
- MongoDB Atlas account for database (https://www.mongodb.com/cloud/atlas)

## Step 1: Set Up MongoDB Atlas (Free Tier)

1. Sign up or log in to MongoDB Atlas at https://www.mongodb.com/cloud/atlas
2. Create a new project named "Padho-Likho"
3. Build a new cluster using the FREE tier option
4. Choose a cloud provider and region closest to your target audience
5. Click "Create Cluster" (this may take a few minutes)
6. Once created, click "Connect" on your cluster
7. Add a database user (remember these credentials)
8. Add your IP address or allow access from anywhere (for development)
9. Choose "Connect your application" and copy the connection string
10. Replace `<password>` with your database user's password

## Step 2: Deploy Backend to Render (Free Tier)

1. Sign up or log in to Render at https://render.com
2. Push your project to a GitHub repository if you haven't already
3. In Render dashboard, click "New" and select "Web Service"
4. Connect your GitHub account and select your repository
5. Configure the service:
   - Name: `padho-likho-api`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Select the Free plan
6. Add the following environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `PORT`: `10000` (Render will override this with its own port)
7. Click "Create Web Service"

## Step 3: Deploy Frontend to Netlify (Free Tier)

1. Sign up or log in to Netlify at https://netlify.com
2. Click "New site from Git"
3. Connect your GitHub account and select your repository
4. Configure the build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add the following environment variable:
   - `REACT_APP_API_URL`: The URL of your Render backend + `/api` (e.g., `https://padho-likho-api.onrender.com/api`)
6. Click "Deploy site"

## Step 4: Connect Frontend to Backend

1. Update the API URL in your frontend code to use the environment variable:

```javascript
// In your API service file
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

2. Make sure all API calls use this base URL

## Step 5: Custom Domain (Optional)

### For Netlify:
1. Go to your site settings in Netlify
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Follow the instructions to configure your DNS settings

### For Render:
1. Go to your web service in Render
2. Navigate to "Settings"
3. Under "Custom Domains", add your domain
4. Follow the instructions to configure your DNS settings

## Step 6: Continuous Deployment

Both Netlify and Render support continuous deployment from GitHub. Any changes pushed to your main branch will automatically trigger a new deployment.

## Troubleshooting

### CORS Issues
If you encounter CORS issues, ensure your backend has proper CORS configuration:

```javascript
// In your backend server.js or app.js
app.use(cors({
  origin: ['https://your-netlify-app.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Environment Variables
Double-check that all environment variables are correctly set in both Netlify and Render.

### Build Failures
Check the build logs in Netlify or Render for any errors. Common issues include:
- Missing dependencies
- Failed build scripts
- Incorrect paths

## Monitoring and Scaling

Both Netlify and Render provide basic analytics and monitoring on their free tiers. As your application grows, you may need to upgrade to paid plans for better performance and more features.

---

**Note**: The free tiers of Netlify and Render have certain limitations:
- Render free tier web services spin down after 15 minutes of inactivity, which may cause a slight delay on the first request after inactivity
- Netlify has bandwidth and build minute limitations on the free tier
- MongoDB Atlas free tier has storage limitations (512MB)

These limitations are generally sufficient for small to medium projects or for demonstration purposes.

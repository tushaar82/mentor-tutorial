# Configuration Guide: Firebase Hosting Deployment

This guide walks you through setting up Firebase Hosting and deploying your Next.js frontend.

---

## Step 1: Install Firebase CLI

### What You're Doing
Installing the Firebase command-line tool to deploy and manage your hosting.

### For Ubuntu/Debian/macOS

```bash
# Install Firebase CLI globally using npm
npm install -g firebase-tools

# Alternative: Use standalone binary
curl -sL https://firebase.tools | bash
```

### For Windows

```bash
# Using npm
npm install -g firebase-tools
```

### Verification

```bash
firebase --version
# Should show: 13.0.0 (or higher)
```

### Why This Matters
The Firebase CLI is required for deploying to Firebase Hosting, managing projects, and testing locally.

---

## Step 2: Login to Firebase

### What You're Doing
Authenticating with your Google account to access Firebase projects.

### Command/Action

```bash
# Login to Firebase
firebase login

# This opens a browser window - sign in with your Google account
# Grant Firebase CLI the requested permissions
```

### Verification

```bash
# List your Firebase projects
firebase projects:list

# Should show all your Firebase projects
```

### Alternative: CI/CD Token

For automated deployments (GitHub Actions, etc.):

```bash
# Generate a CI token
firebase login:ci

# Save the token for use in CI/CD pipelines
```

### Why This Matters
Authentication allows the CLI to access your Firebase projects and deploy your application.

---

## Step 3: Initialize Firebase Hosting

### What You're Doing
Setting up Firebase Hosting configuration in your project.

### Commands

```bash
# Navigate to your frontend directory
cd /path/to/frontend

# Initialize Firebase Hosting
firebase init hosting

# Answer the prompts:
# ? What do you want to use as your public directory? out
# ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
# ? Set up automatic builds and deploys with GitHub? No (we'll do this later)
# ? File out/index.html already exists. Overwrite? No
```

### What Gets Created

This creates two files:
- `firebase.json` - Hosting configuration
- `.firebaserc` - Project configuration

### Manual Setup (Alternative)

If you prefer to create files manually using the AI prompts from PROMPTS.md:

1. Create `firebase.json` using Prompt 3
2. Create `.firebaserc` using Prompt 4
3. Update project IDs to match your Firebase project

### Verification

```bash
# Check if files exist
ls -la firebase.json .firebaserc

# View firebase.json content
cat firebase.json
```

### Why This Matters
These configuration files tell Firebase how to deploy and serve your application.

---

## Step 4: Configure Production Environment Variables

### What You're Doing
Setting up environment variables for production deployment.

### Create .env.production File

Use Prompt 2 from PROMPTS.md to generate the file, then update with your values:

```bash
# Create .env.production
touch .env.production
```

### Get Firebase Configuration Values

```bash
# Option 1: From Firebase Console
# Go to: https://console.firebase.google.com
# Select your project
# Click gear icon → Project settings
# Scroll to "Your apps" section
# Copy the firebaseConfig object

# Option 2: Using Firebase CLI
firebase apps:sdkconfig web
```

### Example .env.production

```bash
# Backend API (from Day 10 Backend deployment)
NEXT_PUBLIC_API_URL=https://mentor-ai-backend-xxxxx.run.app

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mentor-ai-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mentor-ai-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mentor-ai-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Razorpay (Public Key Only)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
```

### Update Backend API URL

Get your backend URL from Day 10 Backend deployment:

```bash
# If backend is on Cloud Run
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(status.url)'

# Copy this URL and set as NEXT_PUBLIC_API_URL
```

### Verification

```bash
# Check if file exists and has content
cat .env.production | grep NEXT_PUBLIC_API_URL
```

### Why This Matters
Environment variables configure your app to connect to production services instead of local development servers.

---

## Step 5: Update Next.js Configuration

### What You're Doing
Configuring Next.js for optimized production builds.

### Update next.config.js

Use Prompt 1 from PROMPTS.md to generate or update `next.config.js`.

### Key Configuration Points

```javascript
// next.config.js
module.exports = {
  // Enable static export for Firebase Hosting
  output: 'export',
  
  // Configure image domains
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com'
    ],
    unoptimized: true // Required for static export
  },
  
  // Trailing slash handling
  trailingSlash: false,
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}
```

### Verification

```bash
# Test configuration by building
npm run build

# Should complete without errors
```

### Why This Matters
Proper configuration ensures optimal performance, security, and compatibility with Firebase Hosting.

---

## Step 6: Build Application for Production

### What You're Doing
Creating an optimized production build of your Next.js application.

### Option A: Use Build Script

```bash
# Make script executable
chmod +x scripts/build-production.sh

# Run build script
./scripts/build-production.sh
```

### Option B: Manual Build

```bash
# Clean previous builds
rm -rf out/ .next/

# Install dependencies
npm ci

# Run linting
npm run lint

# Build for production
npm run build

# Verify build output
ls -la out/
```

### What Gets Generated

The `out/` directory contains:
- `index.html` - Main HTML file
- `_next/` - Optimized JavaScript and CSS
- `images/` - Optimized images
- Other static assets

### Verification

```bash
# Check if out/ directory exists
ls -la out/

# Check if index.html exists
ls -la out/index.html

# Count files in build
find out/ -type f | wc -l

# Check build size
du -sh out/
```

### Test Build Locally

```bash
# Install serve (if not already installed)
npm install -g serve

# Serve the build locally
serve out/ -p 3000

# Open browser to http://localhost:3000
# Test all features
```

### Why This Matters
Building locally catches errors before deployment and lets you test the production version.

---

## Step 7: Deploy to Firebase Hosting

### What You're Doing
Uploading your built application to Firebase Hosting.

### Option A: Use Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy to production
./scripts/deploy.sh production
```

### Option B: Manual Deployment

```bash
# Select Firebase project
firebase use mentor-ai-prod

# Deploy to hosting
firebase deploy --only hosting

# Wait for deployment to complete (usually 1-2 minutes)
```

### Deployment Output

```
=== Deploying to 'mentor-ai-prod'...

i  deploying hosting
i  hosting[mentor-ai-prod]: beginning deploy...
i  hosting[mentor-ai-prod]: found 150 files in out
✔  hosting[mentor-ai-prod]: file upload complete
i  hosting[mentor-ai-prod]: finalizing version...
✔  hosting[mentor-ai-prod]: version finalized
i  hosting[mentor-ai-prod]: releasing new version...
✔  hosting[mentor-ai-prod]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/mentor-ai-prod/overview
Hosting URL: https://mentor-ai-prod.web.app
```

### Get Hosting URL

```bash
# Get hosting URL
firebase hosting:channel:list

# Or from Firebase Console
# Go to: https://console.firebase.google.com
# Select project → Hosting
# Copy the domain
```

### Verification

```bash
# Test deployed site
curl https://mentor-ai-prod.web.app

# Should return HTML content

# Open in browser
open https://mentor-ai-prod.web.app
```

### Why This Matters
This makes your application publicly accessible on the internet with global CDN distribution.

---

## Step 8: Test Deployed Application

### What You're Doing
Verifying that all features work correctly in production.

### Option A: Use Test Script

```bash
# Make script executable
chmod +x scripts/test-deployment.sh

# Run tests
./scripts/test-deployment.sh https://mentor-ai-prod.web.app
```

### Option B: Manual Testing

```bash
# Test homepage
curl -I https://mentor-ai-prod.web.app
# Should return: HTTP/2 200

# Test authentication page
curl -I https://mentor-ai-prod.web.app/login
# Should return: HTTP/2 200

# Test API connectivity
curl https://mentor-ai-prod.web.app/api/health
# Should return backend health check
```

### Browser Testing Checklist

Open https://mentor-ai-prod.web.app in browser and test:

- [ ] Homepage loads correctly
- [ ] Login page accessible
- [ ] Registration page accessible
- [ ] Firebase Authentication works
- [ ] Dashboard loads (after login)
- [ ] API calls to backend work
- [ ] Images load correctly
- [ ] Navigation works
- [ ] No console errors
- [ ] Mobile responsive design works

### Performance Testing

```bash
# Install Lighthouse CLI (if not installed)
npm install -g lighthouse

# Run Lighthouse audit
lighthouse https://mentor-ai-prod.web.app --view

# Check scores:
# - Performance: > 90
# - Accessibility: > 90
# - Best Practices: > 90
# - SEO: > 90
```

### Why This Matters
Testing ensures your production deployment works correctly and provides a good user experience.

---

## Step 9: Configure Custom Domain (Optional)

### What You're Doing
Setting up a custom domain (e.g., www.mentorai.com) for your application.

### Prerequisites

- Own a domain name
- Access to domain DNS settings

### Add Domain in Firebase Console

```bash
# Option 1: Using Firebase Console
# 1. Go to: https://console.firebase.google.com
# 2. Select project → Hosting
# 3. Click "Add custom domain"
# 4. Enter your domain: www.mentorai.com
# 5. Follow verification steps

# Option 2: Using Firebase CLI
firebase hosting:channel:create production --domain www.mentorai.com
```

### Get DNS Records

Firebase will provide DNS records to add:

```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: TXT
Name: @
Value: firebase-hosting-verification=xxxxxxxxxxxxx
```

### Configure DNS

Add these records in your domain provider's DNS settings:

1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS management
3. Add the A records provided by Firebase
4. Add the TXT record for verification
5. Save changes

### Verification

```bash
# Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)

# Check DNS records
nslookup www.mentorai.com

# Check if domain resolves to Firebase
dig www.mentorai.com

# Test site
curl https://www.mentorai.com
```

### SSL Certificate

Firebase automatically provisions an SSL certificate for your custom domain. This usually takes 24-48 hours.

### Why This Matters
Custom domains look professional and are easier to remember than Firebase's default URLs.

---

## Step 10: Update Backend CORS Settings

### What You're Doing
Allowing your production frontend domain to access the backend API.

### Update Backend main.py

Add your production domain to CORS origins:

```python
# In backend main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://mentor-ai-prod.web.app",  # Firebase Hosting
        "https://mentor-ai-prod.firebaseapp.com",  # Alternative Firebase domain
        "https://www.mentorai.com",  # Custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Redeploy Backend

```bash
# Navigate to backend directory
cd /path/to/backend

# Redeploy to Cloud Run
./scripts/deploy.sh production
```

### Verification

```bash
# Test CORS from frontend
# Open browser console on your frontend
# Run: fetch('https://your-backend.run.app/health')
# Should succeed without CORS errors
```

### Why This Matters
CORS prevents unauthorized domains from accessing your API. You must explicitly allow your frontend domain.

---

## Step 11: Set Up Firebase Analytics (Optional)

### What You're Doing
Enabling analytics to track user behavior and application performance.

### Enable Analytics in Firebase Console

```bash
# Go to: https://console.firebase.google.com
# Select project → Analytics
# Click "Enable Analytics"
# Follow setup wizard
```

### Get Measurement ID

```bash
# From Firebase Console
# Project settings → General
# Scroll to "Your apps"
# Copy Measurement ID (G-XXXXXXXXXX)

# Add to .env.production
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Rebuild and Redeploy

```bash
# Rebuild with new environment variable
npm run build

# Redeploy
firebase deploy --only hosting
```

### Verification

```bash
# Open your site in browser
# Open browser console
# Check for analytics events
# Go to Firebase Console → Analytics → Events
# Should see page_view events
```

### Why This Matters
Analytics helps you understand user behavior, track conversions, and identify issues.

---

## Step 12: Set Up Automated Deployment (CI/CD)

### What You're Doing
Automating deployment so that pushing to Git automatically deploys to Firebase Hosting.

### Create GitHub Actions Workflow

Create `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to Firebase Hosting

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build application
        run: |
          cd frontend
          npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          # Add other environment variables
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: mentor-ai-prod
```

### Add GitHub Secrets

```bash
# Go to GitHub repository → Settings → Secrets and variables → Actions
# Add secrets:
# - FIREBASE_SERVICE_ACCOUNT (from Firebase Console)
# - NEXT_PUBLIC_API_URL
# - NEXT_PUBLIC_FIREBASE_API_KEY
# - Other environment variables
```

### Get Firebase Service Account

```bash
# Go to: https://console.firebase.google.com
# Select project → Project settings → Service accounts
# Click "Generate new private key"
# Download JSON file
# Copy entire JSON content to GitHub secret
```

### Test Workflow

```bash
# Make a change and push to main
git add .
git commit -m "Test automated deployment"
git push origin main

# Check GitHub Actions tab
# Should see workflow running
```

### Why This Matters
CI/CD automates deployment, reducing manual work and ensuring consistent deployments.

---

## Configuration Complete! ✅

Your frontend is now deployed to Firebase Hosting with:

- ✅ Production build optimization
- ✅ Global CDN distribution
- ✅ Automatic SSL certificate
- ✅ Custom domain (optional)
- ✅ Analytics tracking (optional)
- ✅ Automated CI/CD pipeline (optional)

**Hosting URL**: https://mentor-ai-prod.web.app (or your custom domain)

**Next Step**: Move to TESTING.md to verify your deployment!

---

## Quick Reference Commands

```bash
# Build application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# View hosting URL
firebase hosting:channel:list

# Rollback to previous deployment
firebase hosting:rollback

# View deployment history
firebase hosting:releases:list

# Create preview channel
firebase hosting:channel:deploy preview

# Delete preview channel
firebase hosting:channel:delete preview

# View logs
firebase hosting:logs
```

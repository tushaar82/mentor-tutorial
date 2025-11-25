# User Flow: Build → Deploy → Verify

This document illustrates the complete workflow from building your application to verifying the live deployment.

---

## Overview

```
Developer → Build Application → Deploy to Firebase → Verify Live Site → Monitor Performance
```

---

## Phase 1: Pre-Deployment Preparation

### Step 1: Configure Environment

**Developer Action**:
```bash
# Create production environment file
touch .env.production

# Add all required variables
NEXT_PUBLIC_API_URL=https://backend.run.app
NEXT_PUBLIC_FIREBASE_API_KEY=...
# ... other variables
```

**System Response**:
- Environment file created
- Variables ready for build

**Verification**:
```bash
cat .env.production | grep NEXT_PUBLIC_API_URL
# Should show: NEXT_PUBLIC_API_URL=https://backend.run.app
```

---

### Step 2: Update Configuration Files

**Developer Action**:
```bash
# Update next.config.js for production
# Update firebase.json with hosting config
# Update .firebaserc with project ID
```

**System Response**:
- Configuration files updated
- Ready for production build

**Verification**:
```bash
cat firebase.json | grep "public"
# Should show: "public": "out"
```

---

## Phase 2: Build Application

### Step 3: Clean Previous Builds

**Developer Action**:
```bash
# Remove old build artifacts
rm -rf out/ .next/
```

**System Response**:
```
Removed: out/ directory
Removed: .next/ directory
```

**Visual Indicator**:
```
🗑️  Cleaning previous builds...
✓ Build directories removed
```

---

### Step 4: Install Dependencies

**Developer Action**:
```bash
# Install all dependencies
npm ci
```

**System Response**:
```
added 1234 packages in 45s
```

**Visual Indicator**:
```
📦 Installing dependencies...
✓ Dependencies installed (1234 packages)
```

---

### Step 5: Run Code Quality Checks

**Developer Action**:
```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

**System Response**:
```
✓ No linting errors found
✓ No type errors found
```

**Visual Indicator**:
```
🔍 Running code quality checks...
✓ Linting passed
✓ Type checking passed
```

---

### Step 6: Build for Production

**Developer Action**:
```bash
# Build Next.js application
npm run build
```

**System Response**:
```
Creating an optimized production build...
Compiled successfully

Route (pages)                              Size     First Load JS
┌ ○ /                                      5.2 kB         85.3 kB
├ ○ /404                                   3.1 kB         83.2 kB
├ ○ /login                                 8.5 kB         88.6 kB
├ ○ /register                              9.2 kB         89.3 kB
├ ● /dashboard                            12.4 kB         92.5 kB
└ ○ /schedule                             10.1 kB         90.2 kB

○  (Static)  automatically rendered as static HTML
●  (SSG)     automatically generated as static HTML + JSON

Export successful. Files written to /path/to/out
```

**Visual Indicator**:
```
🔨 Building Next.js application...
✓ Build completed successfully
📊 Generated 150 files
💾 Total size: 5.2 MB
```

---

### Step 7: Verify Build Output

**Developer Action**:
```bash
# Check build output
ls -la out/
```

**System Response**:
```
total 24
drwxr-xr-x  8 user  staff   256 Jan 15 10:30 .
drwxr-xr-x 20 user  staff   640 Jan 15 10:25 ..
-rw-r--r--  1 user  staff  5234 Jan 15 10:30 index.html
-rw-r--r--  1 user  staff  3124 Jan 15 10:30 404.html
drwxr-xr-x  5 user  staff   160 Jan 15 10:30 _next
drwxr-xr-x  3 user  staff    96 Jan 15 10:30 images
```

**Visual Indicator**:
```
✓ Build verification passed
  - index.html exists
  - Static assets generated
  - Images optimized
```

---

## Phase 3: Deploy to Firebase Hosting

### Step 8: Authenticate with Firebase

**Developer Action**:
```bash
# Login to Firebase (if not already)
firebase login
```

**System Response**:
```
✔ Success! Logged in as developer@example.com
```

**Visual Indicator**:
```
🔐 Authenticating with Firebase...
✓ Logged in as developer@example.com
```

---

### Step 9: Select Firebase Project

**Developer Action**:
```bash
# Select production project
firebase use mentor-ai-prod
```

**System Response**:
```
Now using project mentor-ai-prod
```

**Visual Indicator**:
```
🎯 Selecting Firebase project...
✓ Using project: mentor-ai-prod
```

---

### Step 10: Deploy to Hosting

**Developer Action**:
```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting
```

**System Response**:
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

**Visual Indicator**:
```
🚀 Deploying to Firebase Hosting...
📤 Uploading 150 files...
⏳ Finalizing deployment...
✓ Deployment successful!
🌐 Live at: https://mentor-ai-prod.web.app
```

**Timeline**:
```
[0s]    Start deployment
[15s]   Upload files (150 files)
[45s]   Finalize version
[60s]   Release to production
[75s]   Deployment complete
```

---

## Phase 4: Verify Deployment

### Step 11: Test Homepage

**Developer Action**:
```bash
# Open deployed site
open https://mentor-ai-prod.web.app
```

**Browser Display**:
```
┌─────────────────────────────────────────┐
│  🎓 Mentor AI                           │
│                                         │
│  Personalized JEE/NEET Preparation      │
│                                         │
│  [Get Started]  [Login]                 │
│                                         │
│  ✓ AI-Powered Study Plans              │
│  ✓ Diagnostic Tests                    │
│  ✓ Performance Analytics                │
└─────────────────────────────────────────┘
```

**Visual Indicator**:
```
✓ Homepage loads successfully
✓ All assets loaded
✓ No console errors
```

---

### Step 12: Test Authentication

**User Action**:
```
1. Click "Login" button
2. Click "Sign in with Google"
3. Select Google account
4. Authorize application
```

**System Flow**:
```
User clicks "Login"
    ↓
Navigate to /login
    ↓
Display login form
    ↓
User clicks "Sign in with Google"
    ↓
Open Google Sign-In popup
    ↓
User authenticates
    ↓
Firebase Auth creates session
    ↓
Redirect to /dashboard
    ↓
Dashboard loads with user data
```

**Visual Indicator**:
```
✓ Login page accessible
✓ Google Sign-In works
✓ Authentication successful
✓ Redirected to dashboard
```

---

### Step 13: Test API Connectivity

**System Action**:
```javascript
// Frontend makes API call
fetch('https://backend.run.app/api/schedule', {
  headers: {
    'Authorization': 'Bearer ' + authToken
  }
})
```

**Backend Response**:
```json
{
  "schedule": [
    {
      "date": "2024-01-15",
      "tasks": [...]
    }
  ],
  "status": "success"
}
```

**UI Display**:
```
┌─────────────────────────────────────────┐
│  📅 Your Study Schedule                 │
│                                         │
│  Monday, Jan 15                         │
│  ✓ Physics: Mechanics (2 hours)        │
│  ✓ Chemistry: Organic (1.5 hours)      │
│  ○ Math: Calculus (2 hours)            │
└─────────────────────────────────────────┘
```

**Visual Indicator**:
```
✓ API call successful
✓ Data received from backend
✓ UI updated with data
✓ No CORS errors
```

---

### Step 14: Test Client-Side Routing

**User Action**:
```
1. Navigate to /dashboard
2. Click "Schedule" link
3. Click browser back button
4. Refresh page
```

**System Behavior**:
```
Navigate to /dashboard
    ↓
URL updates: /dashboard
    ↓
Dashboard component renders
    ↓
Click "Schedule"
    ↓
URL updates: /schedule
    ↓
Schedule component renders (no page reload)
    ↓
Click back button
    ↓
URL updates: /dashboard
    ↓
Dashboard component renders
    ↓
Refresh page
    ↓
Dashboard reloads (not 404)
```

**Visual Indicator**:
```
✓ Navigation works without page reload
✓ Browser back/forward works
✓ Refresh loads correct page
✓ No 404 errors
```

---

### Step 15: Test Mobile Responsiveness

**Developer Action**:
```
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone 12 Pro
4. Test navigation and features
```

**Mobile Display**:
```
┌─────────────────┐
│  ☰  Mentor AI   │
├─────────────────┤
│                 │
│  Welcome Back!  │
│                 │
│  [Dashboard]    │
│  [Schedule]     │
│  [Analytics]    │
│                 │
└─────────────────┘
```

**Visual Indicator**:
```
✓ Layout adapts to mobile
✓ Touch targets adequate size
✓ No horizontal scrolling
✓ All features accessible
```

---

### Step 16: Run Performance Audit

**Developer Action**:
```bash
# Run Lighthouse audit
lighthouse https://mentor-ai-prod.web.app --view
```

**Lighthouse Report**:
```
Performance:     95 ████████████████████░
Accessibility:   98 ███████████████████░░
Best Practices: 100 █████████████████████
SEO:            100 █████████████████████

Metrics:
First Contentful Paint:    0.8s ✓
Largest Contentful Paint:  1.5s ✓
Time to Interactive:       2.1s ✓
Cumulative Layout Shift:   0.05 ✓
Total Blocking Time:       150ms ✓
```

**Visual Indicator**:
```
✓ Performance score: 95/100
✓ All Core Web Vitals passed
✓ Accessibility excellent
✓ SEO optimized
```

---

## Phase 5: Monitor and Maintain

### Step 17: Set Up Monitoring

**Developer Action**:
```bash
# Enable Firebase Analytics
# Enable Performance Monitoring
# Configure error tracking
```

**Firebase Console Display**:
```
┌─────────────────────────────────────────┐
│  📊 Analytics Dashboard                 │
│                                         │
│  Active Users: 1,234                    │
│  Page Views: 5,678                      │
│  Avg Session: 8m 32s                    │
│                                         │
│  Top Pages:                             │
│  1. /dashboard (45%)                    │
│  2. /schedule (28%)                     │
│  3. /analytics (15%)                    │
└─────────────────────────────────────────┘
```

**Visual Indicator**:
```
✓ Analytics tracking active
✓ Performance monitoring enabled
✓ Error tracking configured
```

---

### Step 18: Monitor Performance

**System Monitoring**:
```
Real-time Metrics:
- Response Time: 120ms avg
- Error Rate: 0.01%
- Uptime: 99.99%
- CDN Hit Rate: 95%

Alerts Configured:
✓ Error rate > 1%
✓ Response time > 3s
✓ Downtime detected
```

**Visual Indicator**:
```
✓ All systems operational
✓ Performance within targets
✓ No critical alerts
```

---

## Phase 6: Continuous Deployment (Optional)

### Step 19: Set Up GitHub Actions

**Developer Action**:
```yaml
# Create .github/workflows/deploy.yml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
```

**Workflow Execution**:
```
Git Push to main
    ↓
GitHub Actions triggered
    ↓
Install dependencies
    ↓
Build application
    ↓
Deploy to Firebase
    ↓
Deployment complete
    ↓
Notification sent
```

**Visual Indicator**:
```
✓ CI/CD pipeline configured
✓ Automatic deployment on push
✓ Build and deploy successful
```

---

## Complete User Journey

### End-to-End Flow

```
Developer writes code
    ↓
Commits to Git
    ↓
Pushes to main branch
    ↓
GitHub Actions triggered (if configured)
    ↓
Build application
    ↓
Run tests
    ↓
Deploy to Firebase Hosting
    ↓
CDN distributes globally
    ↓
User visits site
    ↓
CDN serves from nearest location
    ↓
Page loads in < 2 seconds
    ↓
User interacts with application
    ↓
API calls to backend
    ↓
Data displayed in UI
    ↓
Analytics tracked
    ↓
Performance monitored
```

---

## Timeline Summary

### Manual Deployment

```
[0m]     Start: Configure environment
[5m]     Build application
[7m]     Deploy to Firebase
[9m]     Verify deployment
[15m]    Complete testing
[20m]    Total time
```

### Automated Deployment (CI/CD)

```
[0m]     Git push
[1m]     CI/CD triggered
[3m]     Build complete
[5m]     Deploy complete
[7m]     Verification
[10m]    Total time
```

---

## Success Indicators

### Deployment Success

```
✓ Build completed without errors
✓ All tests passed
✓ Deployment successful
✓ Site accessible at production URL
✓ SSL certificate active
✓ All features functional
✓ Performance metrics met
✓ No console errors
✓ Analytics tracking
✓ Monitoring active
```

### User Experience

```
✓ Fast page loads (< 2s)
✓ Smooth navigation
✓ Responsive on all devices
✓ No errors or crashes
✓ Secure (HTTPS)
✓ Accessible worldwide
```

---

## Rollback Flow (If Needed)

### Emergency Rollback

```
Issue detected
    ↓
Developer runs: firebase hosting:rollback
    ↓
Previous version restored
    ↓
Site reverted to working state
    ↓
Issue investigated
    ↓
Fix applied
    ↓
New deployment
```

**Timeline**: < 2 minutes to rollback

---

## Conclusion

This user flow demonstrates the complete journey from building your application to having it live and monitored in production. The process is streamlined, automated where possible, and includes comprehensive verification at each step.

**Key Takeaways**:
- Build process is automated and reliable
- Deployment is fast (< 2 minutes)
- Verification ensures quality
- Monitoring provides visibility
- Rollback is quick if needed
- CI/CD enables continuous delivery

**Your application is now live and serving users worldwide!** 🌍🚀

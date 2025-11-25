# AI Coding Agent Prompts for Firebase Hosting Deployment

## Prompt 1: Configure Next.js for Production Build

### Purpose
Update Next.js configuration for optimized production builds with proper image optimization, caching, and performance settings.

### When to Use
First step - before building for production.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open or create file `next.config.js` in the root of your frontend project

**Step 2**: Type this comment at the top of the file:
```javascript
// Next.js production configuration
// 
// Requirements:
// - Enable React strict mode
// - Configure image optimization with domains
// - Set up environment variables
// - Enable SWC minification
// - Configure output as standalone for optimal performance
// - Add security headers
// - Configure redirects and rewrites
// - Enable compression
// - Set up proper caching headers
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review the generated configuration

**Step 5**: If incomplete, add:
```javascript
// Add image domains for Firebase Storage and external sources
// Configure API rewrites to backend
// Add security headers (CSP, X-Frame-Options, etc.)
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a production-ready next.config.js file for a Next.js application deploying to Firebase Hosting.

CONTEXT:
- Project: Mentor AI Frontend (Next.js 14)
- Deployment: Firebase Hosting
- Backend API: Google Cloud Run
- Image sources: Firebase Storage, external CDNs

GENERATE:
A next.config.js with:

BASIC CONFIGURATION:
1. reactStrictMode: true
2. swcMinify: true (faster builds)
3. output: 'export' (for static export to Firebase Hosting)

IMAGE OPTIMIZATION:
1. Configure image domains:
   - firebasestorage.googleapis.com
   - lh3.googleusercontent.com (Google profile images)
2. Set image formats: ['image/avif', 'image/webp']
3. Set device sizes and image sizes

ENVIRONMENT VARIABLES:
1. Access NEXT_PUBLIC_* variables
2. Validate required environment variables at build time

SECURITY HEADERS:
1. Content-Security-Policy
2. X-Frame-Options: DENY
3. X-Content-Type-Options: nosniff
4. Referrer-Policy: origin-when-cross-origin
5. Permissions-Policy

PERFORMANCE:
1. Enable compression
2. Configure caching headers
3. Enable prefetching

REDIRECTS AND REWRITES:
1. Redirect /api/* to backend Cloud Run URL
2. Handle trailing slashes
3. Redirect old URLs if needed

REQUIREMENTS:
1. TypeScript support
2. ESLint integration
3. Proper error handling
4. Comments explaining each section
5. Production-optimized settings

OUTPUT FORMAT:
- Complete next.config.js file
- Explanation of each configuration
- Best practices used
```

**What You'll Get**: Complete production Next.js configuration

**What to Do**:
1. Copy the generated configuration
2. Save as `next.config.js` in frontend root
3. Adjust domains and URLs for your project

---

## Prompt 2: Create Production Environment Variables

### Purpose
Set up production environment variables with backend API URLs and service keys.

### When to Use
After configuring next.config.js.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `.env.production` in frontend root

**Step 2**: Type this comment:
```bash
# Production environment variables for Firebase Hosting deployment
# 
# Include:
# - Backend API URL (Cloud Run)
# - Firebase configuration
# - Analytics IDs
# - Feature flags
# - Public API keys
# 
# Note: All variables must be prefixed with NEXT_PUBLIC_ to be accessible in browser
```

**Step 3**: Let Copilot generate the variables

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a .env.production file for a Next.js frontend deploying to Firebase Hosting.

CONTEXT:
- Frontend: Next.js on Firebase Hosting
- Backend: FastAPI on Google Cloud Run
- Services: Firebase Auth, Firestore, Analytics

GENERATE:
Environment variables for:

BACKEND API:
1. NEXT_PUBLIC_API_URL=https://your-backend-xxxxx.run.app
2. NEXT_PUBLIC_API_TIMEOUT=30000

FIREBASE CONFIGURATION:
1. NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
3. NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
4. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
6. NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
7. NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

ANALYTICS:
1. NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
2. NEXT_PUBLIC_ENABLE_ANALYTICS=true

FEATURE FLAGS:
1. NEXT_PUBLIC_ENABLE_PAYMENT=true
2. NEXT_PUBLIC_ENABLE_PRACTICE_MODE=true
3. NEXT_PUBLIC_ENABLE_PARENT_DASHBOARD=true

RAZORPAY (PUBLIC KEY ONLY):
1. NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx

ENVIRONMENT:
1. NEXT_PUBLIC_ENVIRONMENT=production
2. NEXT_PUBLIC_APP_VERSION=1.0.0

REQUIREMENTS:
1. All variables prefixed with NEXT_PUBLIC_
2. Use placeholder values (to be replaced)
3. Add comments explaining each variable
4. Group related variables
5. Include instructions for obtaining values

OUTPUT FORMAT:
- Complete .env.production file
- Comments for each variable
- Instructions for setup
```

**What You'll Get**: Complete production environment file

**What to Do**:
1. Copy the generated file
2. Save as `.env.production`
3. Replace placeholder values with actual production values
4. Never commit this file to Git (add to .gitignore)

---

## Prompt 3: Create Firebase Hosting Configuration

### Purpose
Configure Firebase Hosting with proper routing, caching, and security rules.

### When to Use
After environment variables are set up.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `firebase.json` in frontend root

**Step 2**: Type this comment:
```json
// Firebase Hosting configuration
// 
// Configure:
// - Public directory (out/ for Next.js export)
// - Ignore files
// - Rewrites for client-side routing
// - Headers for caching and security
// - Redirects for old URLs
```

**Step 3**: Let Copilot generate the JSON

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a firebase.json configuration file for deploying a Next.js application to Firebase Hosting.

CONTEXT:
- Framework: Next.js 14 with static export
- Build output: out/ directory
- Routing: Client-side routing (React Router)

GENERATE:
A firebase.json with:

HOSTING CONFIGURATION:
1. public: "out" (Next.js export directory)
2. ignore: ["firebase.json", "**/.*", "**/node_modules/**"]
3. cleanUrls: true (remove .html extensions)
4. trailingSlash: false

REWRITES:
1. Rewrite all routes to /index.html for client-side routing
2. Exception: Don't rewrite files that exist (images, CSS, JS)
3. Pattern: "**" → "/index.html"

HEADERS:
1. Cache static assets (/_next/static/**):
   - Cache-Control: public, max-age=31536000, immutable
   
2. Cache images (/images/**):
   - Cache-Control: public, max-age=31536000, immutable
   
3. Cache HTML files (/**/*.html):
   - Cache-Control: public, max-age=3600, must-revalidate
   
4. Security headers (/**):
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin

REDIRECTS:
1. Redirect HTTP to HTTPS (if not already)
2. Redirect www to non-www (or vice versa)
3. Redirect old URLs to new ones

REQUIREMENTS:
1. Optimize for Next.js static export
2. Proper caching strategy
3. Security headers
4. Handle client-side routing
5. Comments explaining each section

OUTPUT FORMAT:
- Complete firebase.json file
- Explanation of each configuration
- Best practices used
```

**What You'll Get**: Complete Firebase Hosting configuration

**What to Do**:
1. Copy the generated JSON
2. Save as `firebase.json` in frontend root
3. Adjust paths and settings as needed

---

## Prompt 4: Create Firebase Project Configuration

### Purpose
Configure which Firebase project to deploy to.

### When to Use
After firebase.json is created.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `.firebaserc` in frontend root

**Step 2**: Type this comment:
```json
// Firebase project configuration
// Maps aliases to Firebase project IDs
// 
// Aliases:
// - default: production project
// - staging: staging project (optional)
```

**Step 3**: Let Copilot generate the JSON

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a .firebaserc file for Firebase project configuration.

CONTEXT:
- Production project: mentor-ai-prod
- Staging project: mentor-ai-staging (optional)

GENERATE:
A .firebaserc file with:

PROJECTS:
1. default: "mentor-ai-prod" (production)
2. staging: "mentor-ai-staging" (optional)

TARGETS:
1. hosting target for production
2. hosting target for staging (optional)

REQUIREMENTS:
1. JSON format
2. Support multiple environments
3. Comments explaining usage

OUTPUT FORMAT:
- Complete .firebaserc file
- Explanation of aliases
```

**What You'll Get**: Complete Firebase project configuration

**What to Do**:
1. Copy the generated JSON
2. Save as `.firebaserc`
3. Replace project IDs with your actual Firebase project IDs

---

## Prompt 5: Create Production Build Script

### Purpose
Automated script to build the Next.js application for production.

### When to Use
Before first deployment.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/build-production.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Production build script for Next.js
# 
# Steps:
# 1. Clean previous builds
# 2. Install dependencies
# 3. Run linting
# 4. Run type checking
# 5. Build Next.js application
# 6. Verify build output
# 7. Generate build report
# 
# Usage: ./scripts/build-production.sh
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash script to build a Next.js application for production deployment.

CONTEXT:
- Framework: Next.js 14
- Package manager: npm
- Output: out/ directory (static export)

GENERATE:
A bash script (scripts/build-production.sh) that:

PREREQUISITES CHECK:
1. Check if Node.js is installed
2. Check if npm is installed
3. Check Node.js version (>= 18)

CLEANUP:
1. Remove previous build artifacts
2. Commands: rm -rf out/ .next/
3. Print "Cleaning previous builds..."

DEPENDENCIES:
1. Install dependencies
2. Command: npm ci (clean install)
3. Print "Installing dependencies..."

CODE QUALITY:
1. Run ESLint
2. Command: npm run lint
3. Print "Running linting..."
4. Exit if linting fails

TYPE CHECKING:
1. Run TypeScript type checking
2. Command: npx tsc --noEmit
3. Print "Running type checking..."
4. Exit if type errors found

BUILD:
1. Load production environment variables
2. Command: npm run build
3. Print "Building Next.js application..."
4. Show build progress

VERIFICATION:
1. Check if out/ directory exists
2. Check if out/index.html exists
3. Count files in out/ directory
4. Print build size

BUILD REPORT:
1. Generate build statistics
2. Show bundle sizes
3. List generated pages
4. Print total build time

SUCCESS MESSAGE:
1. Print "✓ Build completed successfully"
2. Print output directory location
3. Print next steps (deploy command)

ERROR HANDLING:
1. Exit on any error (set -e)
2. Print error messages in red
3. Provide troubleshooting hints

OUTPUT FORMAT:
- Complete bash script
- Colored output (green for success, red for errors)
- Progress indicators
- Comments explaining each section
```

**What You'll Get**: Complete build script

**What to Do**:
1. Copy the script
2. Save as `scripts/build-production.sh`
3. Make executable: `chmod +x scripts/build-production.sh`

---

## Prompt 6: Create Deployment Script

### Purpose
Automated script to deploy the built application to Firebase Hosting.

### When to Use
After build script is created.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/deploy.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Deployment script for Firebase Hosting
# 
# Steps:
# 1. Check prerequisites (firebase CLI)
# 2. Select environment (production/staging)
# 3. Build application
# 4. Deploy to Firebase Hosting
# 5. Display deployment URL
# 6. Run post-deployment tests
# 
# Usage: ./scripts/deploy.sh [environment]
# Environment: production, staging (default: production)
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash deployment script for deploying Next.js to Firebase Hosting.

CONTEXT:
- Framework: Next.js
- Hosting: Firebase Hosting
- Environments: production, staging

GENERATE:
A bash script (scripts/deploy.sh) that:

PREREQUISITES CHECK:
1. Check if firebase CLI is installed
2. Check if user is authenticated (firebase login:list)
3. Check if build exists (out/ directory)

CONFIGURATION:
1. Accept environment argument (production/staging)
2. Set variables based on environment:
   - PROJECT_ID
   - HOSTING_TARGET
   - MESSAGE (deployment message)

BUILD:
1. Ask user if they want to build first
2. If yes, run build-production.sh
3. If no, verify build exists

DEPLOYMENT:
1. Print "Deploying to Firebase Hosting..."
2. Select Firebase project
3. Command: firebase use [environment]
4. Deploy: firebase deploy --only hosting
5. Show deployment progress

POST-DEPLOYMENT:
1. Get hosting URL
2. Command: firebase hosting:channel:list
3. Print deployment success message
4. Print hosting URL
5. Ask if user wants to run tests

TESTING:
1. If user wants tests, run test-deployment.sh
2. Pass hosting URL to test script

ROLLBACK INFO:
1. Print how to rollback if needed
2. Command: firebase hosting:rollback

ERROR HANDLING:
1. Exit on any error (set -e)
2. Print error messages
3. Provide troubleshooting hints

OUTPUT FORMAT:
- Complete bash script
- Colored output (green for success, red for errors)
- Interactive prompts
- Progress indicators
- Comments explaining each section
```

**What You'll Get**: Complete deployment script

**What to Do**:
1. Copy the script
2. Save as `scripts/deploy.sh`
3. Make executable: `chmod +x scripts/deploy.sh`

---

## Prompt 7: Create Deployment Testing Script

### Purpose
Automated script to test the deployed website.

### When to Use
After each deployment to verify everything works.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/test-deployment.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Test deployed website
# 
# Tests:
# 1. Homepage loads
# 2. Authentication pages accessible
# 3. Dashboard pages load
# 4. API connectivity
# 5. Static assets load
# 6. Performance metrics
# 
# Usage: ./scripts/test-deployment.sh [SITE_URL]
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash script to test a deployed Next.js website on Firebase Hosting.

CONTEXT:
- Website: Next.js frontend on Firebase Hosting
- Features: Authentication, dashboard, test interface

GENERATE:
A bash script (scripts/test-deployment.sh) that:

SETUP:
1. Accept SITE_URL as argument
2. Set up test variables
3. Create temporary directory for test results

TEST FUNCTIONS:
Create a function for each test that:
- Prints test name
- Makes curl request
- Checks response status code
- Checks response content
- Prints result (✓ or ✗)
- Returns 0 for success, 1 for failure

TESTS TO IMPLEMENT:

1. test_homepage()
   - GET /
   - Expect 200 status
   - Expect HTML with "Mentor AI" title

2. test_login_page()
   - GET /login
   - Expect 200 status
   - Expect login form elements

3. test_register_page()
   - GET /register
   - Expect 200 status
   - Expect registration form

4. test_dashboard_redirect()
   - GET /dashboard (without auth)
   - Expect redirect to login

5. test_static_assets()
   - GET /_next/static/css/[hash].css
   - Expect 200 status
   - Check Content-Type: text/css

6. test_images_load()
   - GET /images/logo.png
   - Expect 200 status
   - Check Content-Type: image/png

7. test_api_connectivity()
   - Check if API URL is accessible
   - GET [API_URL]/health
   - Expect 200 status

8. test_security_headers()
   - GET /
   - Check X-Frame-Options header
   - Check X-Content-Type-Options header
   - Check CSP header

9. test_ssl_certificate()
   - Verify HTTPS is working
   - Check certificate validity

10. test_performance()
    - Measure page load time
    - Check if < 3 seconds

LIGHTHOUSE AUDIT (Optional):
1. Run Lighthouse CLI if installed
2. Check performance score
3. Check accessibility score
4. Check SEO score

EXECUTION:
1. Run all tests in sequence
2. Count passed/failed tests
3. Print summary
4. Save results to file
5. Exit with 0 if all pass, 1 if any fail

ERROR HANDLING:
1. Check if SITE_URL is provided
2. Check if site is reachable
3. Handle network errors
4. Provide clear error messages

OUTPUT FORMAT:
- Complete bash script
- Colored output (green ✓, red ✗)
- Progress indicators
- Summary at the end
- Test results saved to file
```

**What You'll Get**: Complete testing script

**What to Do**:
1. Copy the script
2. Save as `scripts/test-deployment.sh`
3. Make executable: `chmod +x scripts/test-deployment.sh`
4. Run after each deployment

---

## Prompt 8: Create Deployment Documentation

### Purpose
Comprehensive guide for deployment procedures and troubleshooting.

### When to Use
After all deployment scripts are created.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a DEPLOYMENT.md file documenting the deployment process for the Next.js frontend to Firebase Hosting.

SECTIONS TO INCLUDE:

1. PREREQUISITES
   - Required accounts and permissions
   - Required software installations
   - Firebase project setup

2. INITIAL SETUP
   - Install Firebase CLI
   - Login to Firebase
   - Initialize Firebase Hosting
   - Commands for each step

3. ENVIRONMENT CONFIGURATION
   - Create .env.production file
   - Set all required variables
   - Obtain values from Firebase Console

4. LOCAL BUILD TESTING
   - Build application locally
   - Test build output
   - Commands: npm run build, npx serve out/

5. MANUAL DEPLOYMENT
   - Using deploy.sh script
   - Step-by-step process
   - Verification steps

6. AUTOMATED DEPLOYMENT (CI/CD)
   - Set up GitHub Actions
   - Configure deployment workflow
   - Automatic deployment on push

7. CUSTOM DOMAIN
   - Add custom domain in Firebase Console
   - Configure DNS records
   - Verify domain ownership
   - SSL certificate setup

8. MONITORING
   - View hosting metrics
   - Set up Firebase Analytics
   - Performance monitoring
   - Error tracking

9. ROLLBACK
   - How to rollback to previous deployment
   - Commands: firebase hosting:rollback

10. PREVIEW CHANNELS
    - Create preview channel for testing
    - Deploy to preview before production
    - Commands: firebase hosting:channel:deploy

11. TROUBLESHOOTING
    - Common deployment errors
    - Build failures
    - Environment variable issues
    - CORS errors
    - 404 errors on refresh

OUTPUT FORMAT:
- Complete markdown document
- Code blocks for all commands
- Clear step-by-step instructions
- Screenshots placeholders
- Links to relevant documentation
```

**What You'll Get**: Complete deployment documentation

**What to Do**:
1. Copy the markdown
2. Save as `DEPLOYMENT.md` in frontend root
3. Update with your specific project details

---

## Summary

After completing all prompts, you will have:

1. ✅ **next.config.js** - Production build configuration
2. ✅ **.env.production** - Production environment variables
3. ✅ **firebase.json** - Firebase Hosting configuration
4. ✅ **.firebaserc** - Firebase project configuration
5. ✅ **build-production.sh** - Build script
6. ✅ **deploy.sh** - Deployment script
7. ✅ **test-deployment.sh** - Testing script
8. ✅ **DEPLOYMENT.md** - Deployment documentation

**Next Step**: Move to CONFIGURATION.md to set up Firebase Hosting and deploy!

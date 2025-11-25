# AI Coding Agent Prompts for Cloud Run Deployment

## Prompt 1: Create Production Dockerfile

### Purpose
Create a multi-stage Dockerfile that builds an optimized production image for your FastAPI application.

### When to Use
First step - before any deployment configuration.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `Dockerfile` in the root of your backend project

**Step 2**: Type this comment at the top of the file:
```dockerfile
# Multi-stage Dockerfile for FastAPI production deployment
# Stage 1: Build stage with all dependencies
# Stage 2: Runtime stage with only production dependencies
# 
# Requirements:
# - Use Python 3.11 slim base image
# - Install production dependencies only in final stage
# - Set up non-root user for security
# - Configure uvicorn for production (4 workers)
# - Expose port 8080 (Cloud Run default)
# - Set proper working directory
# - Copy only necessary files
# - Use environment variables for configuration
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review the generated Dockerfile

**Step 5**: If incomplete, add:
```dockerfile
# Add health check
# Set environment variables for production
# Optimize layer caching
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a production-ready multi-stage Dockerfile for a FastAPI application to deploy on Google Cloud Run.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Python Version: 3.11
- Framework: FastAPI with uvicorn
- Target: Google Cloud Run (requires port 8080)
- Dependencies: Listed in requirements.txt

GENERATE:
A multi-stage Dockerfile with:

STAGE 1 (Builder):
1. Use python:3.11-slim as base
2. Install build dependencies
3. Copy requirements.txt
4. Install Python packages
5. Create virtual environment

STAGE 2 (Runtime):
1. Use python:3.11-slim as base
2. Copy only installed packages from builder
3. Create non-root user "appuser"
4. Set working directory to /app
5. Copy application code
6. Set environment variables:
   - PYTHONUNBUFFERED=1
   - PORT=8080
7. Expose port 8080
8. Run uvicorn with 4 workers
9. Command: uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4

REQUIREMENTS:
1. Minimize image size (use slim images, multi-stage build)
2. Security: Run as non-root user
3. Optimize layer caching (copy requirements.txt before code)
4. Include health check
5. Set proper file permissions
6. Use .dockerignore to exclude unnecessary files
7. Add labels for metadata (version, maintainer)

OUTPUT FORMAT:
- Complete Dockerfile
- Explanation of each stage
- Best practices used
```

**What You'll Get**: Complete production Dockerfile

**What to Do**:
1. Copy the generated Dockerfile
2. Save as `Dockerfile` in backend root
3. Review and adjust if needed

---

## Prompt 2: Create .dockerignore File

### Purpose
Exclude unnecessary files from Docker build context to speed up builds and reduce image size.

### When to Use
After creating Dockerfile.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `.dockerignore` in backend root

**Step 2**: Type this comment:
```
# Exclude files from Docker build context
# Include: Python cache, virtual environments, git, tests, docs, local configs
```

**Step 3**: Let Copilot generate the ignore patterns

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a .dockerignore file for a Python FastAPI project.

EXCLUDE:
1. Python cache and bytecode (__pycache__, *.pyc, *.pyo)
2. Virtual environments (venv/, env/, .venv/)
3. Git files (.git/, .gitignore)
4. IDE files (.vscode/, .idea/, *.swp)
5. Test files (tests/, pytest_cache/)
6. Documentation (docs/, *.md except README.md)
7. Local environment files (.env, .env.local)
8. Logs (*.log, logs/)
9. Temporary files (*.tmp, tmp/)
10. Docker files (Dockerfile, docker-compose.yml, .dockerignore)
11. CI/CD files (.github/, cloudbuild.yaml)
12. Local data (data/, uploads/)

OUTPUT FORMAT:
Complete .dockerignore file with comments
```

**What You'll Get**: Complete .dockerignore file

**What to Do**:
1. Copy the generated content
2. Save as `.dockerignore` in backend root

---

## Prompt 3: Create Cloud Build Configuration

### Purpose
Define the CI/CD pipeline that automatically builds and deploys your application when you push to Git.

### When to Use
After Dockerfile is created and tested locally.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `cloudbuild.yaml` in backend root

**Step 2**: Type this comment:
```yaml
# Cloud Build configuration for automatic deployment
# Steps:
# 1. Build Docker image
# 2. Push to Container Registry
# 3. Deploy to Cloud Run
# 
# Configuration:
# - Service name: mentor-ai-backend
# - Region: us-central1
# - Platform: managed
# - Allow unauthenticated: no (requires authentication)
# - Set environment variables from Secret Manager
# - Set memory: 2Gi
# - Set CPU: 2
# - Set max instances: 10
# - Set min instances: 1
```

**Step 3**: Let Copilot generate the YAML

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a cloudbuild.yaml file for deploying a FastAPI application to Google Cloud Run.

CONTEXT:
- Project: Mentor AI Backend
- Service Name: mentor-ai-backend
- Region: us-central1
- Container Registry: gcr.io/$PROJECT_ID/mentor-ai-backend

GENERATE:
A cloudbuild.yaml with these steps:

STEP 1: Build Docker Image
- Use docker build command
- Tag image as gcr.io/$PROJECT_ID/mentor-ai-backend:$COMMIT_SHA
- Also tag as :latest

STEP 2: Push to Container Registry
- Push both tags to gcr.io

STEP 3: Deploy to Cloud Run
- Use gcloud run deploy command
- Service name: mentor-ai-backend
- Region: us-central1
- Platform: managed
- Image: gcr.io/$PROJECT_ID/mentor-ai-backend:$COMMIT_SHA
- Port: 8080
- Memory: 2Gi
- CPU: 2
- Max instances: 10
- Min instances: 1
- Timeout: 300s
- Allow unauthenticated: no
- Set environment variables:
  - ENVIRONMENT=production
  - PROJECT_ID=$PROJECT_ID
- Use secrets from Secret Manager:
  - FIREBASE_CREDENTIALS
  - GEMINI_API_KEY
  - RAZORPAY_KEY_ID
  - RAZORPAY_KEY_SECRET

REQUIREMENTS:
1. Use substitution variables ($PROJECT_ID, $COMMIT_SHA)
2. Include timeout for each step
3. Add proper labels
4. Configure service account
5. Set up VPC connector if needed
6. Include rollback on failure

OUTPUT FORMAT:
- Complete cloudbuild.yaml
- Comments explaining each step
- Substitution variables documented
```

**What You'll Get**: Complete Cloud Build configuration

**What to Do**:
1. Copy the generated YAML
2. Save as `cloudbuild.yaml` in backend root
3. Adjust settings as needed

---

## Prompt 4: Create Deployment Script

### Purpose
Create a bash script for manual deployment and testing.

### When to Use
For manual deployments and local testing before setting up CI/CD.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/deploy.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Manual deployment script for Cloud Run
# 
# Steps:
# 1. Check prerequisites (gcloud, docker)
# 2. Set project ID and region
# 3. Build Docker image locally
# 4. Tag image for Container Registry
# 5. Push to Container Registry
# 6. Deploy to Cloud Run with all configurations
# 7. Display deployment URL
# 
# Usage: ./scripts/deploy.sh [environment]
# Environment: dev, staging, production (default: dev)
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash deployment script for deploying FastAPI to Google Cloud Run.

CONTEXT:
- Project: Mentor AI Backend
- Service: mentor-ai-backend
- Regions: us-central1 (production), us-west1 (staging)

GENERATE:
A bash script (scripts/deploy.sh) that:

PREREQUISITES CHECK:
1. Check if gcloud is installed
2. Check if docker is installed
3. Check if user is authenticated (gcloud auth list)
4. Check if correct project is set

CONFIGURATION:
1. Accept environment argument (dev/staging/production)
2. Set variables based on environment:
   - PROJECT_ID
   - REGION
   - SERVICE_NAME
   - MIN_INSTANCES
   - MAX_INSTANCES

BUILD STEPS:
1. Print "Building Docker image..."
2. Run docker build with proper tags
3. Print "Pushing to Container Registry..."
4. Push image to gcr.io

DEPLOYMENT STEPS:
1. Print "Deploying to Cloud Run..."
2. Run gcloud run deploy with:
   - Service name
   - Image
   - Region
   - Platform: managed
   - Memory: 2Gi
   - CPU: 2
   - Port: 8080
   - Min/max instances
   - Environment variables
   - Secrets from Secret Manager
   - Service account
   - Allow unauthenticated: no

POST-DEPLOYMENT:
1. Get service URL
2. Print deployment success message
3. Print service URL
4. Run health check (curl /health)
5. Print logs command for debugging

ERROR HANDLING:
1. Exit on any error (set -e)
2. Print error messages
3. Provide troubleshooting hints

OUTPUT FORMAT:
- Complete bash script
- Colored output (green for success, red for errors)
- Progress indicators
- Comments explaining each section
```

**What You'll Get**: Complete deployment script

**What to Do**:
1. Copy the script
2. Save as `scripts/deploy.sh`
3. Make executable: `chmod +x scripts/deploy.sh`

---

## Prompt 5: Create Secrets Setup Script

### Purpose
Script to create and configure secrets in Google Secret Manager.

### When to Use
Before first deployment to set up environment variables securely.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/setup-secrets.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Setup secrets in Google Secret Manager
# 
# Creates secrets for:
# - Firebase credentials (from service account JSON)
# - Gemini API key
# - Razorpay keys
# - Other sensitive configuration
# 
# Usage: ./scripts/setup-secrets.sh
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash script to set up secrets in Google Secret Manager for Cloud Run deployment.

CONTEXT:
- Project: Mentor AI Backend
- Secrets needed: Firebase credentials, Gemini API key, Razorpay keys

GENERATE:
A bash script (scripts/setup-secrets.sh) that:

PREREQUISITES:
1. Check if gcloud is installed
2. Check if Secret Manager API is enabled
3. Prompt user to enable if not

SECRET CREATION:
For each secret, create with:
1. gcloud secrets create [SECRET_NAME] --replication-policy="automatic"
2. Add secret version from file or stdin
3. Grant Cloud Run service account access

SECRETS TO CREATE:
1. FIREBASE_CREDENTIALS
   - Read from firebase-service-account.json
   - Store entire JSON as secret
   
2. GEMINI_API_KEY
   - Prompt user to enter
   - Store as secret
   
3. RAZORPAY_KEY_ID
   - Prompt user to enter
   - Store as secret
   
4. RAZORPAY_KEY_SECRET
   - Prompt user to enter
   - Store as secret

5. DATABASE_URL (if using external DB)
   - Prompt user to enter
   - Store as secret

PERMISSIONS:
1. Get Cloud Run service account email
2. Grant secretAccessor role to service account for each secret
3. Command: gcloud secrets add-iam-policy-binding

VERIFICATION:
1. List all created secrets
2. Verify service account has access
3. Print success message

ERROR HANDLING:
1. Check if secret already exists (update instead of create)
2. Handle permission errors
3. Provide clear error messages

OUTPUT FORMAT:
- Complete bash script
- Interactive prompts for sensitive data
- Confirmation messages
- Instructions for updating secrets
```

**What You'll Get**: Complete secrets setup script

**What to Do**:
1. Copy the script
2. Save as `scripts/setup-secrets.sh`
3. Make executable: `chmod +x scripts/setup-secrets.sh`
4. Run before first deployment

---

## Prompt 6: Create Deployment Testing Script

### Purpose
Automated script to test all API endpoints after deployment.

### When to Use
After each deployment to verify everything works.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `scripts/test-deployment.sh`

**Step 2**: Type this comment:
```bash
#!/bin/bash
# Test deployed API endpoints
# 
# Tests:
# 1. Health check endpoint
# 2. Authentication endpoints
# 3. Onboarding endpoints
# 4. Test generation endpoints
# 5. Analytics endpoints
# 6. Schedule endpoints
# 7. Payment endpoints
# 
# Usage: ./scripts/test-deployment.sh [SERVICE_URL]
```

**Step 3**: Let Copilot generate the script

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a bash script to test all API endpoints after Cloud Run deployment.

CONTEXT:
- Service: FastAPI backend with multiple endpoints
- Authentication: Firebase Auth tokens required for most endpoints

GENERATE:
A bash script (scripts/test-deployment.sh) that:

SETUP:
1. Accept SERVICE_URL as argument
2. Set up test variables (test email, phone, etc.)
3. Create temporary file for storing auth token

TEST FUNCTIONS:
Create a function for each test that:
- Prints test name
- Makes curl request
- Checks response status code
- Prints result (✓ or ✗)
- Returns 0 for success, 1 for failure

TESTS TO IMPLEMENT:

1. test_health_check()
   - GET /health
   - Expect 200 status
   - Expect {"status": "healthy"}

2. test_auth_register()
   - POST /api/auth/register/parent
   - Send test email and phone
   - Expect 201 status
   - Save parent_id

3. test_auth_login()
   - POST /api/auth/login
   - Send credentials
   - Expect 200 status
   - Save auth token

4. test_onboarding()
   - POST /api/onboarding/preferences
   - Use auth token
   - Expect 200 status

5. test_child_profile()
   - POST /api/onboarding/child
   - Use auth token
   - Expect 201 status

6. test_exam_selection()
   - POST /api/onboarding/exam
   - Use auth token
   - Expect 200 status

7. test_diagnostic_test()
   - GET /api/test/diagnostic
   - Use auth token
   - Expect 200 status
   - Verify questions returned

8. test_analytics()
   - POST /api/analytics/generate
   - Use auth token
   - Expect 200 status

9. test_schedule()
   - GET /api/schedule
   - Use auth token
   - Expect 200 status

10. test_payment_order()
    - POST /api/payment/create-order
    - Use auth token
    - Expect 200 status

EXECUTION:
1. Run all tests in sequence
2. Count passed/failed tests
3. Print summary
4. Exit with 0 if all pass, 1 if any fail

ERROR HANDLING:
1. Check if SERVICE_URL is provided
2. Check if service is reachable
3. Handle network errors
4. Provide clear error messages

OUTPUT FORMAT:
- Complete bash script
- Colored output (green ✓, red ✗)
- Progress indicators
- Summary at the end
```

**What You'll Get**: Complete testing script

**What to Do**:
1. Copy the script
2. Save as `scripts/test-deployment.sh`
3. Make executable: `chmod +x scripts/test-deployment.sh`
4. Run after each deployment

---

## Prompt 7: Create .gcloudignore File

### Purpose
Exclude files from Cloud Build uploads to speed up builds.

### When to Use
Before setting up Cloud Build triggers.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `.gcloudignore` in backend root

**Step 2**: Type this comment:
```
# Exclude files from Cloud Build uploads
# Similar to .dockerignore but for gcloud builds
```

**Step 3**: Let Copilot generate the patterns

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a .gcloudignore file for Cloud Build deployments.

EXCLUDE:
1. Git files (.git/)
2. Python cache (__pycache__, *.pyc)
3. Virtual environments (venv/, env/)
4. IDE files (.vscode/, .idea/)
5. Test files (tests/, pytest_cache/)
6. Documentation (docs/)
7. Local configs (.env, .env.local)
8. Logs (*.log, logs/)
9. Temporary files (*.tmp, tmp/)
10. Node modules (if any)
11. Build artifacts (dist/, build/)
12. Local data (data/, uploads/)

INCLUDE:
- Dockerfile
- cloudbuild.yaml
- requirements.txt
- Application code

OUTPUT FORMAT:
Complete .gcloudignore file with comments
```

**What You'll Get**: Complete .gcloudignore file

**What to Do**:
1. Copy the content
2. Save as `.gcloudignore` in backend root

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
Create a DEPLOYMENT.md file documenting the deployment process for the FastAPI backend to Cloud Run.

SECTIONS TO INCLUDE:

1. PREREQUISITES
   - Required accounts and permissions
   - Required software installations
   - Required API enablement

2. INITIAL SETUP
   - GCP project creation
   - Enable required APIs
   - Set up service accounts
   - Configure secrets
   - Commands for each step

3. LOCAL TESTING
   - Build Docker image locally
   - Run container locally
   - Test endpoints
   - Commands: docker build, docker run

4. MANUAL DEPLOYMENT
   - Using deploy.sh script
   - Step-by-step process
   - Verification steps

5. AUTOMATED DEPLOYMENT (CI/CD)
   - Set up Cloud Build trigger
   - Connect to Git repository
   - Configure trigger settings
   - Test automatic deployment

6. ENVIRONMENT VARIABLES
   - List all required variables
   - How to set in Cloud Run
   - How to update secrets

7. MONITORING
   - View logs: gcloud run logs
   - View metrics in Cloud Console
   - Set up alerts
   - Error tracking

8. ROLLBACK
   - How to rollback to previous revision
   - Commands: gcloud run services update-traffic

9. CUSTOM DOMAIN
   - Map custom domain to Cloud Run
   - Configure DNS
   - Set up SSL certificate

10. TROUBLESHOOTING
    - Common deployment errors
    - How to debug
    - Where to find logs

OUTPUT FORMAT:
- Complete markdown document
- Code blocks for all commands
- Clear step-by-step instructions
- Links to relevant documentation
```

**What You'll Get**: Complete deployment documentation

**What to Do**:
1. Copy the markdown
2. Save as `DEPLOYMENT.md` in backend root
3. Update with your specific project details

---

## Summary

After completing all prompts, you will have:

1. ✅ **Dockerfile** - Production container image
2. ✅ **.dockerignore** - Optimized build context
3. ✅ **cloudbuild.yaml** - CI/CD pipeline
4. ✅ **deploy.sh** - Manual deployment script
5. ✅ **setup-secrets.sh** - Secrets configuration
6. ✅ **test-deployment.sh** - Automated testing
7. ✅ **.gcloudignore** - Optimized Cloud Build uploads
8. ✅ **DEPLOYMENT.md** - Deployment documentation

**Next Step**: Move to CONFIGURATION.md to set up your GCP project and deploy!

# Troubleshooting Guide: Cloud Run Deployment

This guide helps you diagnose and fix common issues when deploying to Google Cloud Run.

---

## Quick Diagnostic Commands

```bash
# Check service status
gcloud run services describe mentor-ai-backend --region us-central1

# View recent logs
gcloud run services logs read mentor-ai-backend --region us-central1 --limit 50

# View error logs only
gcloud run services logs read mentor-ai-backend --region us-central1 --filter="severity>=ERROR" --limit 20

# Check recent deployments
gcloud run revisions list --service mentor-ai-backend --region us-central1

# Check build history
gcloud builds list --limit 10

# View specific build logs
gcloud builds log BUILD_ID
```

---

## Issue 1: Docker Build Fails

### Symptoms
- `docker build` command fails
- Error: "failed to solve with frontend dockerfile.v0"
- Build hangs or takes too long

### Possible Causes

#### Cause 1.1: Syntax Error in Dockerfile

**Error Message**:
```
failed to solve with frontend dockerfile.v0: failed to read dockerfile
```

**Solution**:
```bash
# Check Dockerfile syntax
cat Dockerfile

# Common issues:
# - Missing FROM statement
# - Incorrect instruction order
# - Typos in commands

# Fix example:
# Wrong: WORKDIR /app COPY . .
# Right: 
# WORKDIR /app
# COPY . .
```

#### Cause 1.2: Missing requirements.txt

**Error Message**:
```
COPY failed: file not found in build context
```

**Solution**:
```bash
# Ensure requirements.txt exists
ls -la requirements.txt

# If missing, create it:
pip freeze > requirements.txt

# Rebuild
docker build -t mentor-ai-backend:local .
```

#### Cause 1.3: Large Build Context

**Error Message**:
```
Sending build context to Docker daemon  2.5GB
```

**Solution**:
```bash
# Create/update .dockerignore
cat > .dockerignore << EOF
__pycache__
*.pyc
*.pyo
.git
.venv
venv
env
.env
.env.local
tests
docs
*.md
.vscode
.idea
EOF

# Rebuild
docker build -t mentor-ai-backend:local .
```

#### Cause 1.4: Dependency Installation Fails

**Error Message**:
```
ERROR: Could not find a version that satisfies the requirement package-name
```

**Solution**:
```bash
# Update requirements.txt with specific versions
pip freeze > requirements.txt

# Or specify version in Dockerfile:
# RUN pip install --no-cache-dir -r requirements.txt --upgrade pip

# For system dependencies, add to Dockerfile:
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     && rm -rf /var/lib/apt/lists/*
```

---

## Issue 2: Container Fails to Start

### Symptoms
- Container exits immediately after starting
- Health check fails
- Cloud Run shows "Container failed to start"

### Possible Causes

#### Cause 2.1: Wrong Port Configuration

**Error Message**:
```
Container failed to start. Failed to start and then listen on the port defined by the PORT environment variable.
```

**Solution**:
```python
# In main.py, ensure you're using port 8080
import os

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
```

```dockerfile
# In Dockerfile, expose port 8080
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

#### Cause 2.2: Missing Environment Variables

**Error Message**:
```
KeyError: 'REQUIRED_ENV_VAR'
```

**Solution**:
```bash
# Check configured environment variables
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].env)'

# Add missing variables
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-env-vars ENVIRONMENT=production,PROJECT_ID=$(gcloud config get-value project)

# Or use default values in code:
# project_id = os.getenv("PROJECT_ID", "default-project")
```

#### Cause 2.3: Failed to Load Secrets

**Error Message**:
```
Error loading secret: Permission denied
```

**Solution**:
```bash
# Check if secrets exist
gcloud secrets list

# Check service account has access
export SERVICE_ACCOUNT_EMAIL="cloud-run-backend@$(gcloud config get-value project).iam.gserviceaccount.com"

gcloud secrets get-iam-policy FIREBASE_CREDENTIALS

# Grant access if missing
gcloud secrets add-iam-policy-binding FIREBASE_CREDENTIALS \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/secretmanager.secretAccessor"

# Update Cloud Run to use secrets
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-secrets FIREBASE_CREDENTIALS=FIREBASE_CREDENTIALS:latest
```

#### Cause 2.4: Import Errors

**Error Message**:
```
ModuleNotFoundError: No module named 'package_name'
```

**Solution**:
```bash
# Check requirements.txt includes all dependencies
pip freeze | grep package_name

# Add missing package
echo "package_name==1.0.0" >> requirements.txt

# Rebuild and redeploy
docker build -t gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest .
docker push gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest
gcloud run deploy mentor-ai-backend --image gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest --region us-central1
```

---

## Issue 3: Deployment Fails

### Symptoms
- `gcloud run deploy` fails
- Cloud Build fails
- Service doesn't update

### Possible Causes

#### Cause 3.1: Insufficient Permissions

**Error Message**:
```
ERROR: (gcloud.run.deploy) User does not have permission to access service
```

**Solution**:
```bash
# Check your permissions
gcloud projects get-iam-policy $(gcloud config get-value project) \
    --flatten="bindings[].members" \
    --filter="bindings.members:$(gcloud config get-value account)"

# You need these roles:
# - roles/run.admin
# - roles/iam.serviceAccountUser

# Ask project owner to grant permissions:
# gcloud projects add-iam-policy-binding PROJECT_ID \
#     --member="user:YOUR_EMAIL" \
#     --role="roles/run.admin"
```

#### Cause 3.2: Image Not Found

**Error Message**:
```
ERROR: Image 'gcr.io/PROJECT_ID/mentor-ai-backend:latest' not found
```

**Solution**:
```bash
# Check if image exists in Container Registry
gcloud container images list

# If not, push the image
docker tag mentor-ai-backend:local gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest
docker push gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest

# Then deploy
gcloud run deploy mentor-ai-backend \
    --image gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest \
    --region us-central1
```

#### Cause 3.3: Region Not Supported

**Error Message**:
```
ERROR: Region 'REGION_NAME' is not supported
```

**Solution**:
```bash
# List available regions
gcloud run regions list

# Use a supported region (recommended: us-central1)
gcloud run deploy mentor-ai-backend \
    --image gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest \
    --region us-central1
```

#### Cause 3.4: Quota Exceeded

**Error Message**:
```
ERROR: Quota exceeded for quota metric 'Cloud Run requests'
```

**Solution**:
```bash
# Check quotas
gcloud compute project-info describe --project=$(gcloud config get-value project)

# Request quota increase:
# Go to: https://console.cloud.google.com/iam-admin/quotas
# Search for "Cloud Run"
# Request increase

# Or reduce resource usage:
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --max-instances 5  # Reduce from 10
```

---

## Issue 4: Service Crashes in Production

### Symptoms
- Service works locally but crashes in Cloud Run
- Intermittent 500 errors
- Container restarts frequently

### Possible Causes

#### Cause 4.1: Out of Memory

**Error Message** (in logs):
```
Memory limit exceeded
Container killed
```

**Solution**:
```bash
# Check current memory allocation
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].resources.limits.memory)'

# Increase memory
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --memory 4Gi  # Increase from 2Gi

# Optimize code to use less memory:
# - Use generators instead of lists
# - Close database connections
# - Clear caches periodically
```

#### Cause 4.2: Timeout Errors

**Error Message**:
```
Timeout waiting for response
```

**Solution**:
```bash
# Increase timeout
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --timeout 300s  # 5 minutes (max)

# Optimize slow operations:
# - Add caching
# - Use async operations
# - Optimize database queries
# - Add request timeouts to external APIs
```

#### Cause 4.3: Database Connection Issues

**Error Message**:
```
Failed to connect to Firestore
Connection pool exhausted
```

**Solution**:
```python
# In your code, implement connection pooling
from google.cloud import firestore

# Initialize once, reuse
db = firestore.Client()

# Don't create new client for each request:
# ❌ db = firestore.Client()  # In every function
# ✅ Use global db instance

# Close connections properly:
# Use context managers or finally blocks
```

#### Cause 4.4: Unhandled Exceptions

**Error Message**:
```
Internal Server Error
Unhandled exception in request handler
```

**Solution**:
```python
# Add global exception handler in main.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the error
    print(f"Unhandled exception: {exc}")
    
    # Return user-friendly error
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

# Add try-catch in critical functions
@app.post("/api/endpoint")
async def endpoint():
    try:
        # Your code
        pass
    except SpecificException as e:
        # Handle specific error
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Log unexpected errors
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal error")
```

---

## Issue 5: Authentication Errors

### Symptoms
- Firebase authentication fails
- "Invalid credentials" errors
- Service account errors

### Possible Causes

#### Cause 5.1: Invalid Firebase Credentials

**Error Message**:
```
Failed to initialize Firebase Admin SDK
Invalid service account credentials
```

**Solution**:
```bash
# Verify secret content
gcloud secrets versions access latest --secret=FIREBASE_CREDENTIALS | jq .

# Should show valid JSON with:
# - type: "service_account"
# - project_id: "your-project"
# - private_key: "-----BEGIN PRIVATE KEY-----..."

# If invalid, recreate secret:
gcloud secrets versions add FIREBASE_CREDENTIALS \
    --data-file=firebase-service-account.json

# Verify Cloud Run is using latest version
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].env)' | grep FIREBASE
```

#### Cause 5.2: Service Account Lacks Permissions

**Error Message**:
```
Permission denied: Missing required permission
```

**Solution**:
```bash
# Check service account permissions
export SERVICE_ACCOUNT_EMAIL="cloud-run-backend@$(gcloud config get-value project).iam.gserviceaccount.com"

gcloud projects get-iam-policy $(gcloud config get-value project) \
    --flatten="bindings[].members" \
    --filter="bindings.members:serviceAccount:$SERVICE_ACCOUNT_EMAIL"

# Grant missing permissions
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/firebase.admin"

gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/datastore.user"
```

#### Cause 5.3: Wrong Project ID

**Error Message**:
```
Project not found
Invalid project ID
```

**Solution**:
```bash
# Check configured project ID
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].env)' | grep PROJECT_ID

# Update if wrong
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-env-vars PROJECT_ID=$(gcloud config get-value project)
```

---

## Issue 6: API Integration Errors

### Symptoms
- Vertex AI errors
- Gemini API errors
- External API timeouts

### Possible Causes

#### Cause 6.1: API Not Enabled

**Error Message**:
```
API [aiplatform.googleapis.com] not enabled
```

**Solution**:
```bash
# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable generativelanguage.googleapis.com

# Verify enabled
gcloud services list --enabled | grep -E "(aiplatform|generativelanguage)"
```

#### Cause 6.2: Invalid API Key

**Error Message**:
```
Invalid API key
API key not found
```

**Solution**:
```bash
# Check Gemini API key secret
gcloud secrets versions access latest --secret=GEMINI_API_KEY

# If invalid, update:
echo -n "YOUR_NEW_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Restart service to pick up new secret
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --update-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest
```

#### Cause 6.3: Quota Exceeded

**Error Message**:
```
Quota exceeded for quota metric 'Generate Content API requests'
```

**Solution**:
```bash
# Check quota usage
# Go to: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

# Request quota increase or:
# 1. Implement rate limiting
# 2. Add caching
# 3. Reduce API calls

# Add retry logic with exponential backoff:
```

```python
import time
from google.api_core import retry

@retry.Retry(predicate=retry.if_exception_type(Exception))
def call_gemini_api():
    # Your API call
    pass
```

---

## Issue 7: CORS Errors

### Symptoms
- Frontend can't access API
- "CORS policy" errors in browser console
- Preflight requests fail

### Possible Causes

#### Cause 7.1: Frontend Domain Not Allowed

**Error Message** (in browser):
```
Access to fetch at 'https://api.example.com' from origin 'https://frontend.com' has been blocked by CORS policy
```

**Solution**:
```python
# In main.py, add frontend domain to allowed origins
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.web.app",
        "https://your-frontend-domain.firebaseapp.com",
        "https://your-custom-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redeploy
```

#### Cause 7.2: Credentials Not Allowed

**Error Message**:
```
The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true'
```

**Solution**:
```python
# Ensure allow_credentials=True
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.com"],
    allow_credentials=True,  # Must be True
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Issue 8: Cloud Build Fails

### Symptoms
- Automatic deployment doesn't work
- Build trigger fails
- Cloud Build shows errors

### Possible Causes

#### Cause 8.1: cloudbuild.yaml Syntax Error

**Error Message**:
```
Invalid cloudbuild.yaml: yaml: line X: mapping values are not allowed
```

**Solution**:
```bash
# Validate YAML syntax
python -c "import yaml; yaml.safe_load(open('cloudbuild.yaml'))"

# Common issues:
# - Incorrect indentation
# - Missing quotes around special characters
# - Invalid substitution variables

# Fix and commit
git add cloudbuild.yaml
git commit -m "Fix cloudbuild.yaml syntax"
git push
```

#### Cause 8.2: Cloud Build Lacks Permissions

**Error Message**:
```
ERROR: (gcloud.run.deploy) PERMISSION_DENIED: Permission denied on resource project
```

**Solution**:
```bash
# Get Cloud Build service account
export CLOUD_BUILD_SA="$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')@cloudbuild.gserviceaccount.com"

# Grant required permissions
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/secretmanager.secretAccessor"
```

#### Cause 8.3: Build Timeout

**Error Message**:
```
Build timeout exceeded
```

**Solution**:
```yaml
# In cloudbuild.yaml, increase timeout
timeout: 1200s  # 20 minutes

# Or optimize build:
# - Use smaller base images
# - Cache dependencies
# - Reduce build steps
```

---

## Issue 9: Performance Issues

### Symptoms
- Slow response times
- High latency
- Timeouts under load

### Possible Causes

#### Cause 9.1: Cold Starts

**Symptom**: First request after idle period is slow (3-5 seconds)

**Solution**:
```bash
# Set minimum instances to avoid cold starts
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --min-instances 1  # Keep at least 1 instance warm

# Note: This increases costs but eliminates cold starts
```

#### Cause 9.2: Insufficient Resources

**Symptom**: High CPU/memory usage, slow responses

**Solution**:
```bash
# Increase CPU and memory
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --cpu 4 \
    --memory 4Gi

# Check metrics to determine if needed:
# https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics
```

#### Cause 9.3: Slow Database Queries

**Symptom**: Requests take > 1 second

**Solution**:
```python
# Add caching
from functools import lru_cache

@lru_cache(maxsize=100)
def get_syllabus_data(exam_type):
    # Expensive database query
    return db.collection('syllabus').where('exam', '==', exam_type).get()

# Use indexes in Firestore
# Create composite indexes for complex queries

# Optimize queries:
# - Limit results
# - Use pagination
# - Fetch only needed fields
```

---

## Debugging Checklist

When something goes wrong:

1. **Check Logs**
   ```bash
   gcloud run services logs tail mentor-ai-backend --region us-central1
   ```

2. **Check Service Status**
   ```bash
   gcloud run services describe mentor-ai-backend --region us-central1
   ```

3. **Check Recent Deployments**
   ```bash
   gcloud run revisions list --service mentor-ai-backend --region us-central1
   ```

4. **Check Environment Variables**
   ```bash
   gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(spec.template.spec.containers[0].env)'
   ```

5. **Check Secrets**
   ```bash
   gcloud secrets list
   gcloud secrets get-iam-policy SECRET_NAME
   ```

6. **Test Locally**
   ```bash
   docker run -p 8080:8080 mentor-ai-backend:local
   curl http://localhost:8080/health
   ```

7. **Check Metrics**
   ```bash
   open "https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics"
   ```

---

## Getting Help

If you're still stuck:

1. **Check Cloud Run Documentation**
   - https://cloud.google.com/run/docs/troubleshooting

2. **Search Error Messages**
   - Copy exact error message
   - Search on Stack Overflow
   - Check Google Cloud Community

3. **Enable Debug Logging**
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

4. **Ask for Help**
   - Include: Error message, logs, what you've tried
   - Post on: Stack Overflow, Google Cloud Community
   - Tag: google-cloud-run, fastapi, python

---

## Prevention Tips

Avoid common issues:

1. **Test Locally First**
   - Always test Docker container locally before deploying

2. **Use Version Control**
   - Commit working code before making changes
   - Easy to rollback if needed

3. **Monitor Regularly**
   - Check logs daily
   - Set up alerts for errors

4. **Document Changes**
   - Note what you changed and why
   - Easier to debug later

5. **Use Staging Environment**
   - Test in staging before production
   - Catch issues early

---

**Still having issues?** Check the logs first - they usually tell you exactly what's wrong!

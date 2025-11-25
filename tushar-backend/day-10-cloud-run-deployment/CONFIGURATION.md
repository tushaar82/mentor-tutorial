# Configuration Guide: Cloud Run Deployment

This guide walks you through setting up Google Cloud Platform and deploying your FastAPI backend to Cloud Run.

---

## Step 1: Install Google Cloud SDK

### What You're Doing
Installing the `gcloud` command-line tool to interact with Google Cloud Platform.

### For Ubuntu/Debian

```bash
# Add Cloud SDK repository
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import Google Cloud public key
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Install gcloud SDK
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

### For macOS

```bash
# Using Homebrew
brew install --cask google-cloud-sdk
```

### For Windows

Download and run the installer from: https://cloud.google.com/sdk/docs/install

### Verification

```bash
gcloud --version
# Should show: Google Cloud SDK 450.0.0 (or higher)
```

### Why This Matters
The gcloud CLI is required for deploying to Cloud Run, managing secrets, and configuring services.

---

## Step 2: Install Docker Desktop

### What You're Doing
Installing Docker to build and test container images locally.

### For Ubuntu

```bash
# Install Docker
sudo apt-get update
sudo apt-get install docker.io

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# Log out and log back in for group changes to take effect
```

### For macOS/Windows

Download and install Docker Desktop from: https://www.docker.com/products/docker-desktop

### Verification

```bash
docker --version
# Should show: Docker version 24.0.0 (or higher)

docker run hello-world
# Should download and run a test container
```

### Why This Matters
Docker packages your application into a container that runs consistently in any environment.

---

## Step 3: Create Google Cloud Project

### What You're Doing
Creating a new GCP project to host your Cloud Run service.

### Command/Action

```bash
# Authenticate with Google Cloud
gcloud auth login
# This opens a browser window - sign in with your Google account

# Create new project
gcloud projects create mentor-ai-backend-prod --name="Mentor AI Backend"

# Set as active project
gcloud config set project mentor-ai-backend-prod

# Link billing account (required for Cloud Run)
# First, list your billing accounts
gcloud billing accounts list

# Link billing to project (replace BILLING_ACCOUNT_ID)
gcloud billing projects link mentor-ai-backend-prod --billing-account=BILLING_ACCOUNT_ID
```

### Alternative: Use Existing Firebase Project

If you want to use the same project as your Firebase setup:

```bash
# List your projects
gcloud projects list

# Set your Firebase project as active
gcloud config set project YOUR_FIREBASE_PROJECT_ID
```

### Verification

```bash
gcloud config get-value project
# Should show: mentor-ai-backend-prod (or your project ID)
```

### Why This Matters
All Google Cloud resources (Cloud Run, Secret Manager, Container Registry) belong to a project.

---

## Step 4: Enable Required APIs

### What You're Doing
Enabling Google Cloud APIs needed for deployment.

### Commands

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com

# Enable Cloud Build API (for CI/CD)
gcloud services enable cloudbuild.googleapis.com

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Enable Artifact Registry API (newer alternative to Container Registry)
gcloud services enable artifactregistry.googleapis.com

# Verify enabled services
gcloud services list --enabled
```

### Verification

```bash
gcloud services list --enabled | grep -E "(run|container|build|secret)"
# Should show all enabled APIs
```

### Why This Matters
APIs must be explicitly enabled before you can use them. This also activates billing for these services.

---

## Step 5: Set Up Service Account

### What You're Doing
Creating a service account for Cloud Run with necessary permissions.

### Commands

```bash
# Create service account
gcloud iam service-accounts create cloud-run-backend \
    --display-name="Cloud Run Backend Service Account"

# Get service account email
export SERVICE_ACCOUNT_EMAIL="cloud-run-backend@$(gcloud config get-value project).iam.gserviceaccount.com"

echo $SERVICE_ACCOUNT_EMAIL

# Grant necessary roles
# 1. Cloud Run Invoker (to invoke the service)
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/run.invoker"

# 2. Secret Manager Secret Accessor (to read secrets)
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/secretmanager.secretAccessor"

# 3. Cloud Datastore User (for Firestore)
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/datastore.user"

# 4. Firebase Admin (if using Firebase services)
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/firebase.admin"
```

### Verification

```bash
gcloud projects get-iam-policy $(gcloud config get-value project) \
    --flatten="bindings[].members" \
    --filter="bindings.members:$SERVICE_ACCOUNT_EMAIL"
# Should show all granted roles
```

### Why This Matters
Service accounts provide secure, limited access to Google Cloud resources without using personal credentials.

---

## Step 6: Configure Secrets in Secret Manager

### What You're Doing
Storing sensitive configuration (API keys, credentials) securely in Google Secret Manager.

### Option A: Use the setup-secrets.sh Script

```bash
# Make script executable
chmod +x scripts/setup-secrets.sh

# Run the script
./scripts/setup-secrets.sh
```

The script will prompt you for each secret value.

### Option B: Manual Setup

```bash
# 1. Create Firebase credentials secret
gcloud secrets create FIREBASE_CREDENTIALS --replication-policy="automatic"

# Add the Firebase service account JSON as a secret version
gcloud secrets versions add FIREBASE_CREDENTIALS --data-file=firebase-service-account.json

# 2. Create Gemini API key secret
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-

# 3. Create Razorpay key ID secret
echo -n "YOUR_RAZORPAY_KEY_ID" | gcloud secrets create RAZORPAY_KEY_ID --data-file=-

# 4. Create Razorpay key secret
echo -n "YOUR_RAZORPAY_KEY_SECRET" | gcloud secrets create RAZORPAY_KEY_SECRET --data-file=-

# 5. Create Vertex AI project ID secret (if different from main project)
echo -n "YOUR_VERTEX_AI_PROJECT_ID" | gcloud secrets create VERTEX_AI_PROJECT_ID --data-file=-

# Grant service account access to secrets
for SECRET in FIREBASE_CREDENTIALS GEMINI_API_KEY RAZORPAY_KEY_ID RAZORPAY_KEY_SECRET VERTEX_AI_PROJECT_ID; do
    gcloud secrets add-iam-policy-binding $SECRET \
        --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
        --role="roles/secretmanager.secretAccessor"
done
```

### Verification

```bash
# List all secrets
gcloud secrets list

# Verify service account has access
gcloud secrets get-iam-policy FIREBASE_CREDENTIALS
```

### Why This Matters
Secrets are encrypted at rest and in transit. They're never exposed in code or logs, and access is audited.

---

## Step 7: Build Docker Image Locally

### What You're Doing
Building your Docker image locally to test before deploying.

### Commands

```bash
# Navigate to backend directory
cd /path/to/backend

# Build Docker image
docker build -t mentor-ai-backend:local .

# This will take a few minutes the first time
```

### Verification

```bash
# List Docker images
docker images | grep mentor-ai-backend
# Should show: mentor-ai-backend  local  ...

# Check image size
docker images mentor-ai-backend:local --format "{{.Size}}"
# Should be under 500MB for optimized image
```

### Why This Matters
Building locally catches errors before deployment and lets you test the containerized application.

---

## Step 8: Test Docker Container Locally

### What You're Doing
Running your Docker container locally to verify it works.

### Commands

```bash
# Run container with environment variables
docker run -d \
    --name mentor-ai-test \
    -p 8080:8080 \
    -e ENVIRONMENT=development \
    -e PROJECT_ID=$(gcloud config get-value project) \
    -e GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-service-account.json \
    -v $(pwd)/firebase-service-account.json:/app/firebase-service-account.json \
    mentor-ai-backend:local

# Check if container is running
docker ps | grep mentor-ai-test

# View logs
docker logs mentor-ai-test

# Test health endpoint
curl http://localhost:8080/health
# Should return: {"status": "healthy"}

# Test API documentation
open http://localhost:8080/docs
# Should open FastAPI Swagger UI

# Stop and remove container
docker stop mentor-ai-test
docker rm mentor-ai-test
```

### Verification

```bash
# Health check should return 200
curl -I http://localhost:8080/health | grep "200 OK"
```

### Why This Matters
Local testing catches issues before deployment, saving time and avoiding production errors.

---

## Step 9: Push Image to Container Registry

### What You're Doing
Uploading your Docker image to Google Container Registry so Cloud Run can access it.

### Commands

```bash
# Configure Docker to use gcloud for authentication
gcloud auth configure-docker

# Tag image for Container Registry
docker tag mentor-ai-backend:local gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest

# Push to Container Registry
docker push gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest

# This will take a few minutes
```

### Verification

```bash
# List images in Container Registry
gcloud container images list

# List tags for your image
gcloud container images list-tags gcr.io/$(gcloud config get-value project)/mentor-ai-backend
```

### Why This Matters
Cloud Run pulls images from Container Registry. Your image must be uploaded before deployment.

---

## Step 10: Deploy to Cloud Run (Manual)

### What You're Doing
Deploying your containerized application to Cloud Run.

### Option A: Use the deploy.sh Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy to production
./scripts/deploy.sh production
```

### Option B: Manual Deployment

```bash
# Deploy to Cloud Run
gcloud run deploy mentor-ai-backend \
    --image gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest \
    --platform managed \
    --region us-central1 \
    --service-account $SERVICE_ACCOUNT_EMAIL \
    --port 8080 \
    --memory 2Gi \
    --cpu 2 \
    --timeout 300s \
    --min-instances 1 \
    --max-instances 10 \
    --set-env-vars ENVIRONMENT=production,PROJECT_ID=$(gcloud config get-value project) \
    --set-secrets FIREBASE_CREDENTIALS=FIREBASE_CREDENTIALS:latest,GEMINI_API_KEY=GEMINI_API_KEY:latest,RAZORPAY_KEY_ID=RAZORPAY_KEY_ID:latest,RAZORPAY_KEY_SECRET=RAZORPAY_KEY_SECRET:latest \
    --allow-unauthenticated

# Note: Use --no-allow-unauthenticated if you want to require authentication
```

### Get Service URL

```bash
# Get the deployed service URL
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(status.url)'

# Save to variable
export SERVICE_URL=$(gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(status.url)')

echo "Service deployed at: $SERVICE_URL"
```

### Verification

```bash
# Test health endpoint
curl $SERVICE_URL/health
# Should return: {"status": "healthy"}

# Test API documentation
open $SERVICE_URL/docs
```

### Why This Matters
This is your live production API. The URL is publicly accessible and can be used by your frontend.

---

## Step 11: Configure CORS for Frontend

### What You're Doing
Updating CORS settings to allow your frontend domain to access the API.

### Update main.py

Add your production frontend URL to CORS origins:

```python
# In main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://your-frontend-domain.web.app",  # Firebase Hosting
        "https://your-custom-domain.com",  # Custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Redeploy

```bash
# Rebuild and redeploy
docker build -t gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest .
docker push gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest
gcloud run deploy mentor-ai-backend --image gcr.io/$(gcloud config get-value project)/mentor-ai-backend:latest --region us-central1
```

### Why This Matters
CORS prevents unauthorized domains from accessing your API. You must explicitly allow your frontend domain.

---

## Step 12: Set Up Cloud Build Trigger (CI/CD)

### What You're Doing
Automating deployment so that pushing to Git automatically deploys to Cloud Run.

### Prerequisites

Your code must be in a Git repository (GitHub, GitLab, or Cloud Source Repositories).

### Commands

```bash
# Connect Cloud Build to your repository (interactive)
gcloud builds triggers create github \
    --name="deploy-backend-production" \
    --repo-name="your-repo-name" \
    --repo-owner="your-github-username" \
    --branch-pattern="^main$" \
    --build-config="cloudbuild.yaml"

# Alternative: Use Cloud Console
# Go to: https://console.cloud.google.com/cloud-build/triggers
# Click "Create Trigger"
# Connect your repository
# Select branch: main
# Build configuration: cloudbuild.yaml
```

### Grant Cloud Build Permissions

```bash
# Get Cloud Build service account
export CLOUD_BUILD_SA="$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')@cloudbuild.gserviceaccount.com"

# Grant Cloud Run Admin role
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/run.admin"

# Grant Service Account User role
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/iam.serviceAccountUser"

# Grant Secret Accessor role
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:$CLOUD_BUILD_SA" \
    --role="roles/secretmanager.secretAccessor"
```

### Test Trigger

```bash
# Make a small change and push to main branch
git add .
git commit -m "Test Cloud Build trigger"
git push origin main

# View build progress
gcloud builds list --limit 5

# View build logs
gcloud builds log $(gcloud builds list --limit 1 --format='value(id)')
```

### Verification

```bash
# Check trigger status
gcloud builds triggers list

# After push, check if build started
gcloud builds list --limit 1
```

### Why This Matters
CI/CD automates deployment, reducing manual work and ensuring consistent deployments.

---

## Step 13: Set Up Custom Domain (Optional)

### What You're Doing
Mapping a custom domain (e.g., api.mentorai.com) to your Cloud Run service.

### Prerequisites

- Own a domain name
- Access to domain DNS settings

### Commands

```bash
# Add domain mapping
gcloud run domain-mappings create \
    --service mentor-ai-backend \
    --domain api.mentorai.com \
    --region us-central1

# Get DNS records to configure
gcloud run domain-mappings describe \
    --domain api.mentorai.com \
    --region us-central1
```

### Configure DNS

Add the DNS records shown in the output to your domain provider:

```
Type: A
Name: api
Value: 216.239.32.21

Type: AAAA
Name: api
Value: 2001:4860:4802:32::15
```

### Verification

```bash
# Wait for DNS propagation (can take up to 48 hours)
# Check if domain resolves
nslookup api.mentorai.com

# Test API
curl https://api.mentorai.com/health
```

### Why This Matters
Custom domains look professional and are easier to remember than Cloud Run's default URLs.

---

## Step 14: Configure Monitoring and Alerts

### What You're Doing
Setting up monitoring to track errors, performance, and resource usage.

### Enable Cloud Monitoring

```bash
# Cloud Monitoring is enabled by default for Cloud Run
# View metrics in Cloud Console:
# https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics
```

### Set Up Log-Based Alerts

```bash
# Create alert for error rate
gcloud alpha monitoring policies create \
    --notification-channels=YOUR_NOTIFICATION_CHANNEL_ID \
    --display-name="Backend Error Rate Alert" \
    --condition-display-name="Error rate > 5%" \
    --condition-threshold-value=0.05 \
    --condition-threshold-duration=300s
```

### View Logs

```bash
# View recent logs
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --limit 50

# Follow logs in real-time
gcloud run services logs tail mentor-ai-backend \
    --region us-central1

# Filter for errors
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="severity>=ERROR"
```

### Why This Matters
Monitoring helps you detect and fix issues before they impact users.

---

## Configuration Complete! ✅

Your backend is now deployed to Cloud Run with:

- ✅ Docker containerization
- ✅ Secure secrets management
- ✅ Production environment configuration
- ✅ Automated CI/CD pipeline
- ✅ Monitoring and logging
- ✅ Custom domain (optional)

**Service URL**: Check with `gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(status.url)'`

**Next Step**: Move to TESTING.md to verify your deployment!

---

## Quick Reference Commands

```bash
# View service details
gcloud run services describe mentor-ai-backend --region us-central1

# View logs
gcloud run services logs tail mentor-ai-backend --region us-central1

# Update environment variable
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-env-vars NEW_VAR=value

# Update secret
echo -n "new-secret-value" | gcloud secrets versions add SECRET_NAME --data-file=-

# Rollback to previous revision
gcloud run services update-traffic mentor-ai-backend \
    --region us-central1 \
    --to-revisions PREVIOUS_REVISION=100

# Delete service
gcloud run services delete mentor-ai-backend --region us-central1
```

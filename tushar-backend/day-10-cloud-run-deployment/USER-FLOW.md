# User Flow: Cloud Run Deployment

This document describes the deployment workflow from a developer's perspective.

---

## Overview

The deployment process transforms your local FastAPI application into a live, production-ready API accessible from anywhere in the world.

```
Local Development → Docker Container → Container Registry → Cloud Run → Live API
```

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 1: LOCAL PREPARATION                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Write Dockerfile                                            │
│     │   └─► Define base image, dependencies, startup command        │
│     │                                                                │
│     ├─► Create .dockerignore                                        │
│     │   └─► Exclude unnecessary files from build                    │
│     │                                                                │
│     ├─► Build Docker image locally                                  │
│     │   └─► docker build -t mentor-ai-backend:local .               │
│     │                                                                │
│     └─► Test container locally                                      │
│         └─► docker run -p 8080:8080 mentor-ai-backend:local         │
│         └─► curl http://localhost:8080/health                       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 2: GOOGLE CLOUD SETUP                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Install gcloud CLI                                          │
│     │   └─► gcloud auth login                                       │
│     │                                                                │
│     ├─► Create/Select GCP Project                                   │
│     │   └─► gcloud config set project PROJECT_ID                    │
│     │                                                                │
│     ├─► Enable Required APIs                                        │
│     │   ├─► Cloud Run API                                           │
│     │   ├─► Container Registry API                                  │
│     │   ├─► Cloud Build API                                         │
│     │   └─► Secret Manager API                                      │
│     │                                                                │
│     ├─► Create Service Account                                      │
│     │   └─► Grant permissions (Cloud Run, Secrets, Firestore)       │
│     │                                                                │
│     └─► Configure Secrets                                           │
│         ├─► FIREBASE_CREDENTIALS                                    │
│         ├─► GEMINI_API_KEY                                          │
│         ├─► RAZORPAY_KEY_ID                                         │
│         └─► RAZORPAY_KEY_SECRET                                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 3: MANUAL DEPLOYMENT (First Time)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Tag image for Container Registry                            │
│     │   └─► docker tag mentor-ai-backend:local \                    │
│     │       gcr.io/PROJECT_ID/mentor-ai-backend:latest              │
│     │                                                                │
│     ├─► Push image to Container Registry                            │
│     │   └─► docker push gcr.io/PROJECT_ID/mentor-ai-backend:latest  │
│     │                                                                │
│     ├─► Deploy to Cloud Run                                         │
│     │   └─► gcloud run deploy mentor-ai-backend \                   │
│     │       --image gcr.io/PROJECT_ID/mentor-ai-backend:latest \    │
│     │       --region us-central1 \                                  │
│     │       --memory 2Gi --cpu 2 \                                  │
│     │       --set-secrets FIREBASE_CREDENTIALS=... \                │
│     │       --allow-unauthenticated                                 │
│     │                                                                │
│     ├─► Get Service URL                                             │
│     │   └─► https://mentor-ai-backend-xxxxx-uc.a.run.app           │
│     │                                                                │
│     └─► Test Deployed API                                           │
│         └─► curl https://SERVICE_URL/health                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 4: CI/CD SETUP (Automated Deployments)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Create cloudbuild.yaml                                      │
│     │   ├─► Step 1: Build Docker image                              │
│     │   ├─► Step 2: Push to Container Registry                      │
│     │   └─► Step 3: Deploy to Cloud Run                             │
│     │                                                                │
│     ├─► Connect Git Repository                                      │
│     │   └─► Link GitHub/GitLab to Cloud Build                       │
│     │                                                                │
│     ├─► Create Build Trigger                                        │
│     │   ├─► Trigger on: push to main branch                         │
│     │   └─► Build config: cloudbuild.yaml                           │
│     │                                                                │
│     └─► Grant Cloud Build Permissions                               │
│         ├─► Cloud Run Admin                                         │
│         ├─► Service Account User                                    │
│         └─► Secret Accessor                                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 5: AUTOMATED DEPLOYMENT FLOW                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Make code changes                                           │
│     │   └─► Edit Python files, update dependencies, etc.            │
│     │                                                                │
│     ├─► Commit and push to Git                                      │
│     │   └─► git add . && git commit -m "..." && git push            │
│     │                                                                │
│     ▼                                                                │
│                                                                       │
│  Cloud Build (Automatic)                                            │
│     │                                                                │
│     ├─► Trigger detected (push to main)                             │
│     │                                                                │
│     ├─► Clone repository                                            │
│     │   └─► Get latest code from Git                                │
│     │                                                                │
│     ├─► Build Docker image                                          │
│     │   └─► docker build -t gcr.io/PROJECT_ID/backend:COMMIT_SHA .  │
│     │                                                                │
│     ├─► Push to Container Registry                                  │
│     │   └─► docker push gcr.io/PROJECT_ID/backend:COMMIT_SHA        │
│     │                                                                │
│     ├─► Deploy to Cloud Run                                         │
│     │   └─► gcloud run deploy with new image                        │
│     │                                                                │
│     └─► Deployment complete (3-5 minutes)                           │
│                                                                       │
│     ▼                                                                │
│                                                                       │
│  Cloud Run (Automatic)                                              │
│     │                                                                │
│     ├─► Create new revision                                         │
│     │   └─► mentor-ai-backend-00043-xyz                             │
│     │                                                                │
│     ├─► Gradual traffic migration                                   │
│     │   ├─► 0% → New revision                                       │
│     │   ├─► 50% → New revision (health checks pass)                 │
│     │   └─► 100% → New revision (no errors)                         │
│     │                                                                │
│     ├─► Old revision kept for rollback                              │
│     │   └─► Can rollback instantly if issues                        │
│     │                                                                │
│     └─► New version live!                                           │
│                                                                       │
│     ▼                                                                │
│                                                                       │
│  Developer                                                           │
│     │                                                                │
│     ├─► Receive deployment notification                             │
│     │   └─► Email/Slack: "Deployment successful"                    │
│     │                                                                │
│     ├─► Verify deployment                                           │
│     │   └─► curl https://SERVICE_URL/health                         │
│     │                                                                │
│     └─► Monitor logs and metrics                                    │
│         └─► gcloud run services logs tail ...                       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Step-by-Step Flow

### Step 1: Developer Prepares Application

**Actions**:
1. Complete all backend features (Day 1-9)
2. Test locally with `uvicorn main:app --reload`
3. Verify all endpoints work
4. Update dependencies in `requirements.txt`

**Time**: Ongoing development

**Output**: Working FastAPI application

---

### Step 2: Developer Creates Dockerfile

**Actions**:
1. Create `Dockerfile` with multi-stage build
2. Define base image (Python 3.11 slim)
3. Copy dependencies and install
4. Copy application code
5. Set startup command (uvicorn)

**Time**: 15 minutes

**Output**: `Dockerfile` ready for building

**Example**:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

### Step 3: Developer Tests Docker Locally

**Actions**:
1. Build image: `docker build -t mentor-ai-backend:local .`
2. Run container: `docker run -p 8080:8080 mentor-ai-backend:local`
3. Test endpoints: `curl http://localhost:8080/health`
4. Check logs: `docker logs CONTAINER_ID`
5. Fix any issues and rebuild

**Time**: 30 minutes

**Output**: Working Docker container

---

### Step 4: Developer Sets Up Google Cloud

**Actions**:
1. Install gcloud CLI
2. Authenticate: `gcloud auth login`
3. Create/select project
4. Enable required APIs
5. Create service account
6. Configure secrets in Secret Manager

**Time**: 45 minutes

**Output**: GCP project ready for deployment

---

### Step 5: Developer Deploys Manually (First Time)

**Actions**:
1. Tag image: `docker tag mentor-ai-backend:local gcr.io/PROJECT_ID/mentor-ai-backend:latest`
2. Push to registry: `docker push gcr.io/PROJECT_ID/mentor-ai-backend:latest`
3. Deploy to Cloud Run: `gcloud run deploy ...`
4. Get service URL
5. Test deployed API

**Time**: 20 minutes

**Output**: Live API at `https://mentor-ai-backend-xxxxx-uc.a.run.app`

---

### Step 6: Developer Sets Up CI/CD

**Actions**:
1. Create `cloudbuild.yaml`
2. Connect Git repository to Cloud Build
3. Create build trigger (on push to main)
4. Grant Cloud Build permissions
5. Test trigger with a commit

**Time**: 30 minutes

**Output**: Automated deployment pipeline

---

### Step 7: Developer Makes Updates (Ongoing)

**Actions**:
1. Make code changes
2. Test locally
3. Commit: `git commit -m "Add new feature"`
4. Push: `git push origin main`
5. Wait for automatic deployment (3-5 minutes)
6. Verify deployment
7. Monitor logs

**Time**: 5 minutes per deployment

**Output**: Updated API automatically deployed

---

## Deployment States

### State 1: Local Development

```
┌──────────────────┐
│  Local Machine   │
│                  │
│  ┌────────────┐  │
│  │  FastAPI   │  │
│  │    App     │  │
│  └────────────┘  │
│                  │
│  localhost:8000  │
└──────────────────┘
```

**Characteristics**:
- Running on developer's machine
- Hot reload enabled
- Using local environment variables
- Accessible only from localhost

---

### State 2: Containerized Locally

```
┌──────────────────┐
│  Local Machine   │
│                  │
│  ┌────────────┐  │
│  │   Docker   │  │
│  │ Container  │  │
│  │            │  │
│  │  FastAPI   │  │
│  └────────────┘  │
│                  │
│  localhost:8080  │
└──────────────────┘
```

**Characteristics**:
- Running in Docker container
- Isolated environment
- Production-like setup
- Still local, not accessible externally

---

### State 3: Deployed to Cloud Run

```
┌─────────────────────────────────────┐
│         Google Cloud Run            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Load Balancer                │ │
│  └───────────────────────────────┘ │
│              │                      │
│    ┌─────────┴─────────┐          │
│    │                   │          │
│  ┌─▼──────┐      ┌────▼───┐      │
│  │Instance│      │Instance│      │
│  │   1    │      │   2    │      │
│  │        │      │        │      │
│  │FastAPI │      │FastAPI │      │
│  └────────┘      └────────┘      │
│                                     │
│  https://mentor-ai-backend-xxx...  │
└─────────────────────────────────────┘
```

**Characteristics**:
- Running on Google's infrastructure
- Automatically scaled (1-10 instances)
- Publicly accessible via HTTPS
- Load balanced across instances
- Integrated with Google Cloud services

---

## Traffic Flow

### User Request Flow

```
User/Frontend
    │
    │ HTTPS Request
    │ GET /api/test/diagnostic
    │
    ▼
Google Cloud Load Balancer
    │
    │ Route to available instance
    │
    ▼
Cloud Run Instance
    │
    │ Process request
    │ ├─► Query Firestore
    │ ├─► Call Vertex AI
    │ └─► Call Gemini API
    │
    ▼
Response
    │
    │ JSON Response
    │
    ▼
User/Frontend
```

---

## Scaling Behavior

### Low Traffic (1 instance)

```
Time: 10:00 AM
Requests: 5/minute

┌─────────────────┐
│  Cloud Run      │
│                 │
│  ┌───────────┐  │
│  │ Instance  │  │
│  │     1     │  │
│  │  (Active) │  │
│  └───────────┘  │
│                 │
└─────────────────┘
```

---

### Medium Traffic (3 instances)

```
Time: 2:00 PM
Requests: 50/minute

┌─────────────────────────────────┐
│  Cloud Run                      │
│                                 │
│  ┌───────────┐  ┌───────────┐  │
│  │ Instance  │  │ Instance  │  │
│  │     1     │  │     2     │  │
│  │  (Active) │  │  (Active) │  │
│  └───────────┘  └───────────┘  │
│                                 │
│  ┌───────────┐                 │
│  │ Instance  │                 │
│  │     3     │                 │
│  │  (Active) │                 │
│  └───────────┘                 │
│                                 │
└─────────────────────────────────┘
```

---

### High Traffic (10 instances - max)

```
Time: 8:00 PM (Peak)
Requests: 200/minute

┌─────────────────────────────────────────────┐
│  Cloud Run (Max Capacity)                   │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │       │
│  └────┘ └────┘ └────┘ └────┘ └────┘       │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │ 6  │ │ 7  │ │ 8  │ │ 9  │ │ 10 │       │
│  └────┘ └────┘ └────┘ └────┘ └────┘       │
│                                             │
│  All instances active                       │
│  Load balanced evenly                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Rollback Flow

### When Issues Detected

```
Developer
    │
    │ Notices errors in logs
    │ or metrics show high error rate
    │
    ▼
Check Recent Deployments
    │
    │ gcloud run revisions list
    │
    ▼
Identify Good Revision
    │
    │ mentor-ai-backend-00041-abc (working)
    │ mentor-ai-backend-00042-xyz (broken)
    │
    ▼
Rollback Traffic
    │
    │ gcloud run services update-traffic \
    │   --to-revisions mentor-ai-backend-00041-abc=100
    │
    ▼
Verify Rollback
    │
    │ curl https://SERVICE_URL/health
    │ Check logs for errors
    │
    ▼
Fix Issue Locally
    │
    │ Debug and fix the problem
    │
    ▼
Redeploy
    │
    │ git push (triggers new deployment)
    │
    ▼
Monitor New Deployment
```

---

## Monitoring Flow

### Continuous Monitoring

```
Cloud Run Service
    │
    │ Generates logs and metrics
    │
    ▼
Cloud Logging
    │
    ├─► Application logs
    ├─► Request logs
    ├─► Error logs
    └─► System logs
    │
    ▼
Cloud Monitoring
    │
    ├─► Request count
    ├─► Request latency
    ├─► Error rate
    ├─► CPU usage
    └─► Memory usage
    │
    ▼
Alerts (if configured)
    │
    ├─► Email notifications
    ├─► Slack notifications
    └─► PagerDuty (for critical)
    │
    ▼
Developer
    │
    ├─► Reviews metrics dashboard
    ├─► Investigates errors
    └─► Optimizes performance
```

---

## Summary

The deployment flow transforms your local application into a production-ready, scalable API:

1. **Local Development** → Working FastAPI app
2. **Containerization** → Docker image
3. **Cloud Setup** → GCP project configured
4. **Manual Deployment** → First deployment to Cloud Run
5. **CI/CD Setup** → Automated deployments
6. **Ongoing Updates** → Push to Git → Auto-deploy
7. **Monitoring** → Logs, metrics, alerts
8. **Rollback** → Quick recovery if issues

**Result**: A professional, production-ready backend that automatically deploys, scales, and recovers from issues!

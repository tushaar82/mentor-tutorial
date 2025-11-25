# Expected Outcome: Cloud Run Deployment

After completing this task, you should have a fully deployed, production-ready FastAPI backend running on Google Cloud Run.

---

## Success Checklist

### Docker Configuration ✅

- [ ] **Dockerfile created** with multi-stage build
  - Uses Python 3.11 slim base image
  - Optimized for production (minimal size)
  - Runs as non-root user
  - Exposes port 8080

- [ ] **.dockerignore created** to exclude unnecessary files
  - Python cache excluded
  - Virtual environments excluded
  - Test files excluded
  - Documentation excluded

- [ ] **Docker image builds successfully**
  ```bash
  docker build -t mentor-ai-backend:local .
  # Should complete without errors
  ```

- [ ] **Docker image size optimized**
  - Image size < 500MB
  - Multi-stage build reduces size
  - Only production dependencies included

- [ ] **Container runs locally**
  ```bash
  docker run -p 8080:8080 mentor-ai-backend:local
  # Should start without errors
  # Health check at http://localhost:8080/health returns 200
  ```

### Google Cloud Configuration ✅

- [ ] **GCP project created and configured**
  ```bash
  gcloud config get-value project
  # Should show your project ID
  ```

- [ ] **Required APIs enabled**
  - Cloud Run API
  - Container Registry API
  - Cloud Build API
  - Secret Manager API
  - Artifact Registry API

- [ ] **Service account created with proper permissions**
  - Cloud Run Invoker role
  - Secret Manager Secret Accessor role
  - Cloud Datastore User role
  - Firebase Admin role

- [ ] **Secrets configured in Secret Manager**
  - FIREBASE_CREDENTIALS secret created
  - GEMINI_API_KEY secret created
  - RAZORPAY_KEY_ID secret created
  - RAZORPAY_KEY_SECRET secret created
  - Service account has access to all secrets

### Deployment ✅

- [ ] **Image pushed to Container Registry**
  ```bash
  gcloud container images list
  # Should show: gcr.io/PROJECT_ID/mentor-ai-backend
  ```

- [ ] **Service deployed to Cloud Run**
  ```bash
  gcloud run services list
  # Should show: mentor-ai-backend with status READY
  ```

- [ ] **Service URL obtained**
  ```bash
  gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(status.url)'
  # Should return: https://mentor-ai-backend-xxxxx-uc.a.run.app
  ```

- [ ] **Service configuration correct**
  - Region: us-central1
  - Memory: 2Gi
  - CPU: 2
  - Min instances: 1
  - Max instances: 10
  - Timeout: 300s
  - Port: 8080

### Functionality ✅

- [ ] **Health check endpoint working**
  ```bash
  curl https://YOUR_SERVICE_URL/health
  # Returns: {"status":"healthy"}
  ```

- [ ] **API documentation accessible**
  ```bash
  open https://YOUR_SERVICE_URL/docs
  # Shows FastAPI Swagger UI with all endpoints
  ```

- [ ] **Environment variables configured**
  - ENVIRONMENT=production
  - PROJECT_ID set correctly
  - All secrets loaded from Secret Manager

- [ ] **Firebase authentication working**
  ```bash
  curl -X POST https://YOUR_SERVICE_URL/api/auth/register/parent \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","phone":"+1234567890","language":"en"}'
  # Returns: parent_id and verification_required
  ```

- [ ] **Vertex AI integration working**
  - Vector Search queries return results
  - Embeddings generated successfully
  - No authentication errors

- [ ] **Gemini API integration working**
  - Analytics generation works
  - Schedule generation works
  - No quota errors

- [ ] **Razorpay integration working**
  - Payment orders created successfully
  - Webhook verification works
  - Subscription status updates work

- [ ] **CORS configured correctly**
  - Frontend domain in allowed origins
  - Credentials allowed
  - All methods and headers allowed

### CI/CD Pipeline ✅

- [ ] **cloudbuild.yaml created**
  - Build step defined
  - Push step defined
  - Deploy step defined
  - Secrets configured

- [ ] **Cloud Build trigger created**
  - Connected to Git repository
  - Triggers on push to main branch
  - Uses cloudbuild.yaml

- [ ] **Cloud Build permissions configured**
  - Cloud Run Admin role
  - Service Account User role
  - Secret Accessor role

- [ ] **Automated deployment working**
  ```bash
  # After git push to main
  gcloud builds list --limit 1
  # Should show: STATUS: SUCCESS
  ```

### Scripts and Documentation ✅

- [ ] **Deployment scripts created**
  - `scripts/deploy.sh` - Manual deployment
  - `scripts/setup-secrets.sh` - Secrets configuration
  - `scripts/test-deployment.sh` - Automated testing

- [ ] **Scripts are executable**
  ```bash
  chmod +x scripts/*.sh
  ```

- [ ] **Scripts work correctly**
  ```bash
  ./scripts/deploy.sh production
  # Should deploy successfully
  
  ./scripts/test-deployment.sh $SERVICE_URL
  # Should pass all tests
  ```

- [ ] **Documentation created**
  - DEPLOYMENT.md with deployment guide
  - README.md updated with production URL
  - API documentation updated

### Monitoring and Logging ✅

- [ ] **Logs accessible**
  ```bash
  gcloud run services logs read mentor-ai-backend --region us-central1 --limit 10
  # Should show recent logs
  ```

- [ ] **Metrics visible in Cloud Console**
  - Request count
  - Request latency
  - Error rate
  - Container instance count
  - CPU utilization
  - Memory utilization

- [ ] **No errors in logs**
  ```bash
  gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="severity>=ERROR" \
    --limit 10
  # Should show no critical errors
  ```

- [ ] **Alerts configured** (optional but recommended)
  - High error rate alert
  - High latency alert
  - High memory usage alert

### Performance ✅

- [ ] **Response times acceptable**
  - Health check: < 100ms
  - API endpoints: < 500ms
  - AI operations: < 5s

- [ ] **Service scales properly**
  - Handles traffic spikes
  - Scales down when idle
  - No cold start issues (with min instances = 1)

- [ ] **Load testing passed**
  ```bash
  ab -n 100 -c 10 https://YOUR_SERVICE_URL/health
  # Requests per second: > 50
  # Failed requests: 0
  ```

### Security ✅

- [ ] **Service runs as non-root user**
  - Dockerfile uses non-root user
  - Security best practices followed

- [ ] **Secrets not exposed**
  - No secrets in code
  - No secrets in logs
  - Secrets stored in Secret Manager

- [ ] **Authentication required** (if configured)
  - Endpoints require valid Firebase token
  - Unauthorized requests return 401

- [ ] **HTTPS enabled**
  - All traffic uses HTTPS
  - SSL certificate valid

### Integration ✅

- [ ] **Frontend can connect to backend**
  - CORS allows frontend domain
  - API endpoints accessible from frontend
  - Authentication flow works end-to-end

- [ ] **External services working**
  - Firebase Admin SDK connected
  - Firestore reads/writes working
  - Vertex AI queries working
  - Gemini API calls working
  - Razorpay API calls working

---

## What You Should Have

### 1. Live Production API

**URL**: `https://mentor-ai-backend-xxxxx-uc.a.run.app`

**Endpoints**:
- `GET /health` - Health check
- `GET /docs` - API documentation
- `POST /api/auth/register/parent` - Parent registration
- `POST /api/auth/login` - Login
- `POST /api/onboarding/*` - Onboarding endpoints
- `GET /api/test/diagnostic` - Diagnostic test
- `POST /api/analytics/generate` - Analytics generation
- `GET /api/schedule` - Study schedule
- `POST /api/payment/*` - Payment endpoints

### 2. Deployment Infrastructure

**Container Registry**:
- Image: `gcr.io/PROJECT_ID/mentor-ai-backend:latest`
- Tagged with commit SHA for each deployment

**Cloud Run Service**:
- Name: `mentor-ai-backend`
- Region: `us-central1`
- Platform: Managed
- Autoscaling: 1-10 instances

**Secret Manager**:
- All sensitive configuration stored securely
- Service account has access
- Secrets versioned and audited

### 3. CI/CD Pipeline

**Cloud Build Trigger**:
- Automatically deploys on push to main
- Builds Docker image
- Pushes to Container Registry
- Deploys to Cloud Run
- Runs in < 5 minutes

### 4. Monitoring and Observability

**Cloud Logging**:
- All application logs centralized
- Searchable and filterable
- Retention: 30 days (default)

**Cloud Monitoring**:
- Request metrics
- Performance metrics
- Resource utilization
- Custom metrics (if configured)

### 5. Documentation

**Deployment Guide**:
- Step-by-step deployment instructions
- Configuration reference
- Troubleshooting guide

**API Documentation**:
- Swagger UI at `/docs`
- ReDoc at `/redoc`
- All endpoints documented

---

## Verification Commands

Run these commands to verify everything is working:

```bash
# 1. Check service status
gcloud run services describe mentor-ai-backend --region us-central1

# 2. Get service URL
export SERVICE_URL=$(gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(status.url)')

# 3. Test health check
curl $SERVICE_URL/health

# 4. Test API documentation
curl $SERVICE_URL/docs | grep "Swagger UI"

# 5. View recent logs
gcloud run services logs read mentor-ai-backend --region us-central1 --limit 10

# 6. Check for errors
gcloud run services logs read mentor-ai-backend --region us-central1 --filter="severity>=ERROR" --limit 10

# 7. View metrics
open "https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics"

# 8. Run automated tests
./scripts/test-deployment.sh $SERVICE_URL
```

---

## Example Output

### Successful Deployment

```bash
$ gcloud run services describe mentor-ai-backend --region us-central1

Service [mentor-ai-backend] revision [mentor-ai-backend-00042-abc] has been deployed and is serving 100 percent of traffic.
Service URL: https://mentor-ai-backend-xxxxx-uc.a.run.app
```

### Successful Health Check

```bash
$ curl https://mentor-ai-backend-xxxxx-uc.a.run.app/health

{"status":"healthy"}
```

### Successful Load Test

```bash
$ ab -n 100 -c 10 https://mentor-ai-backend-xxxxx-uc.a.run.app/health

Requests per second:    87.23 [#/sec] (mean)
Time per request:       114.645 [ms] (mean)
Failed requests:        0
```

---

## Common Issues

### ❌ Service Not Deploying

**Check**:
```bash
gcloud builds list --limit 1
gcloud builds log $(gcloud builds list --limit 1 --format='value(id)')
```

**Common causes**:
- Docker build errors
- Missing dependencies
- Incorrect cloudbuild.yaml

### ❌ Service Crashes on Startup

**Check**:
```bash
gcloud run services logs read mentor-ai-backend --region us-central1 --limit 50
```

**Common causes**:
- Missing environment variables
- Failed to load secrets
- Import errors in code

### ❌ Authentication Errors

**Check**:
```bash
gcloud secrets versions access latest --secret=FIREBASE_CREDENTIALS
```

**Common causes**:
- Invalid Firebase credentials
- Service account lacks permissions
- Secrets not configured

---

## Ready for Production?

If all items in the checklist are complete:

✅ **Your backend is production-ready!**

**Next steps**:
1. Update frontend with production API URL
2. Test complete user flows end-to-end
3. Monitor logs and metrics for first few days
4. Set up alerts for critical issues
5. Plan for scaling and optimization

**Congratulations!** You've successfully deployed a production FastAPI backend to Google Cloud Run! 🎉

---

## Production URL

Save your production URL for the frontend:

```bash
# Get and save service URL
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(status.url)' > PRODUCTION_URL.txt

cat PRODUCTION_URL.txt
```

Share this URL with Vaishnavi for frontend integration!

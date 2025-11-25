# Testing Guide: Cloud Run Deployment

This guide helps you verify that your deployed backend is working correctly in production.

---

## Prerequisites

Before testing, ensure:
- ✅ Backend deployed to Cloud Run
- ✅ Service URL obtained
- ✅ All secrets configured
- ✅ CORS configured for your frontend domain

---

## Get Your Service URL

```bash
# Get the deployed service URL
export SERVICE_URL=$(gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(status.url)')

echo "Testing service at: $SERVICE_URL"
```

---

## Test 1: Health Check Endpoint

### What You're Testing
Verify the service is running and responding to requests.

### Steps

```bash
# Test health endpoint
curl $SERVICE_URL/health

# Expected response:
# {"status":"healthy"}

# Check response status code
curl -I $SERVICE_URL/health | grep "200 OK"
```

### Expected Result

```json
{
  "status": "healthy"
}
```

### If It Fails

**Symptom**: Connection refused or timeout

**Possible Causes**:
1. Service not deployed
2. Service crashed on startup
3. Port configuration incorrect

**Solutions**:
```bash
# Check service status
gcloud run services describe mentor-ai-backend --region us-central1

# Check logs for errors
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --limit 50

# Verify port is 8080
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].ports[0].containerPort)'
```

---

## Test 2: API Documentation

### What You're Testing
Verify FastAPI's automatic documentation is accessible.

### Steps

```bash
# Open API docs in browser
open $SERVICE_URL/docs

# Or test with curl
curl $SERVICE_URL/docs | grep "Swagger UI"
```

### Expected Result

You should see the FastAPI Swagger UI with all your API endpoints listed.

### If It Fails

**Symptom**: 404 Not Found

**Possible Causes**:
1. FastAPI not configured correctly
2. Docs disabled in production

**Solutions**:
```python
# In main.py, ensure docs are enabled
app = FastAPI(
    title="Mentor AI Backend",
    docs_url="/docs",  # Enable docs
    redoc_url="/redoc"  # Enable ReDoc
)
```

---

## Test 3: Environment Variables

### What You're Testing
Verify environment variables are correctly set.

### Steps

Create a test endpoint (if not already exists):

```python
# In main.py
@app.get("/api/config/test")
async def test_config():
    return {
        "environment": os.getenv("ENVIRONMENT"),
        "project_id": os.getenv("PROJECT_ID"),
        "has_firebase_creds": os.getenv("FIREBASE_CREDENTIALS") is not None,
        "has_gemini_key": os.getenv("GEMINI_API_KEY") is not None,
    }
```

Test the endpoint:

```bash
curl $SERVICE_URL/api/config/test
```

### Expected Result

```json
{
  "environment": "production",
  "project_id": "your-project-id",
  "has_firebase_creds": true,
  "has_gemini_key": true
}
```

### If It Fails

**Symptom**: Variables are null or missing

**Possible Causes**:
1. Secrets not configured
2. Service account lacks permissions
3. Environment variables not set in deployment

**Solutions**:
```bash
# Check configured environment variables
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].env)'

# Check configured secrets
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].env)' | grep secret

# Update environment variables
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-env-vars ENVIRONMENT=production,PROJECT_ID=$(gcloud config get-value project)

# Update secrets
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest
```

---

## Test 4: Firebase Authentication

### What You're Testing
Verify Firebase Admin SDK is working.

### Steps

```bash
# Test parent registration
curl -X POST $SERVICE_URL/api/auth/register/parent \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "phone": "+1234567890",
        "language": "en"
    }'
```

### Expected Result

```json
{
  "parent_id": "abc123...",
  "verification_required": true,
  "message": "Verification code sent"
}
```

### If It Fails

**Symptom**: 500 Internal Server Error or Firebase initialization error

**Possible Causes**:
1. Firebase credentials not loaded
2. Service account lacks permissions
3. Firebase Admin SDK not initialized

**Solutions**:
```bash
# Check logs for Firebase errors
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="severity>=ERROR" \
    --limit 20

# Verify Firebase credentials secret
gcloud secrets versions access latest --secret=FIREBASE_CREDENTIALS

# Verify service account has Firebase Admin role
gcloud projects get-iam-policy $(gcloud config get-value project) \
    --flatten="bindings[].members" \
    --filter="bindings.members:cloud-run-backend@*"
```

---

## Test 5: Vertex AI Vector Search

### What You're Testing
Verify Vertex AI integration is working.

### Steps

```bash
# Test vector search (requires authentication)
# First, get an auth token (if you have a test account)
curl -X POST $SERVICE_URL/api/vector-search/query \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_TEST_TOKEN" \
    -d '{
        "query": "thermodynamics",
        "top_k": 5
    }'
```

### Expected Result

```json
{
  "results": [
    {
      "id": "topic_123",
      "content": "Thermodynamics concepts...",
      "score": 0.95
    }
  ]
}
```

### If It Fails

**Symptom**: Vertex AI authentication error

**Possible Causes**:
1. Service account lacks Vertex AI permissions
2. Vertex AI API not enabled
3. Vector Search index not created

**Solutions**:
```bash
# Grant Vertex AI permissions
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:cloud-run-backend@$(gcloud config get-value project).iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Verify Vertex AI API is enabled
gcloud services list --enabled | grep aiplatform

# Check logs
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="vertex" \
    --limit 20
```

---

## Test 6: Gemini API Integration

### What You're Testing
Verify Gemini Flash API is working for analytics and scheduling.

### Steps

```bash
# Test analytics generation (requires auth token and test data)
curl -X POST $SERVICE_URL/api/analytics/generate \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_TEST_TOKEN" \
    -d '{
        "test_id": "test_123",
        "answers": [...]
    }'
```

### Expected Result

```json
{
  "analytics_id": "analytics_123",
  "strengths": [...],
  "weaknesses": [...],
  "recommendations": [...]
}
```

### If It Fails

**Symptom**: Gemini API error or quota exceeded

**Possible Causes**:
1. Gemini API key not configured
2. API quota exceeded
3. Invalid API key

**Solutions**:
```bash
# Verify Gemini API key secret
gcloud secrets versions access latest --secret=GEMINI_API_KEY

# Check if Gemini API is enabled
gcloud services list --enabled | grep generativelanguage

# Check logs for Gemini errors
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="gemini OR generativelanguage" \
    --limit 20
```

---

## Test 7: Razorpay Payment Integration

### What You're Testing
Verify Razorpay integration is working.

### Steps

```bash
# Test payment order creation
curl -X POST $SERVICE_URL/api/payment/create-order \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_TEST_TOKEN" \
    -d '{
        "amount": 999,
        "currency": "INR"
    }'
```

### Expected Result

```json
{
  "order_id": "order_abc123",
  "amount": 999,
  "currency": "INR",
  "razorpay_key_id": "rzp_test_..."
}
```

### If It Fails

**Symptom**: Razorpay authentication error

**Possible Causes**:
1. Razorpay keys not configured
2. Invalid API keys
3. Razorpay account not activated

**Solutions**:
```bash
# Verify Razorpay secrets
gcloud secrets versions access latest --secret=RAZORPAY_KEY_ID
gcloud secrets versions access latest --secret=RAZORPAY_KEY_SECRET

# Check logs
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --filter="razorpay" \
    --limit 20
```

---

## Test 8: CORS Configuration

### What You're Testing
Verify frontend can make requests to the API.

### Steps

```bash
# Test CORS preflight request
curl -X OPTIONS $SERVICE_URL/api/auth/register/parent \
    -H "Origin: https://your-frontend-domain.web.app" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type" \
    -v
```

### Expected Result

Response headers should include:
```
Access-Control-Allow-Origin: https://your-frontend-domain.web.app
Access-Control-Allow-Methods: POST, GET, OPTIONS, ...
Access-Control-Allow-Headers: Content-Type, ...
```

### If It Fails

**Symptom**: CORS error in browser console

**Possible Causes**:
1. Frontend domain not in CORS allowed origins
2. CORS middleware not configured
3. Credentials not allowed

**Solutions**:

Update `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.web.app",
        "https://your-custom-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Redeploy:
```bash
./scripts/deploy.sh production
```

---

## Test 9: Performance and Scaling

### What You're Testing
Verify the service handles load and scales properly.

### Steps

```bash
# Install Apache Bench (if not installed)
sudo apt-get install apache2-utils  # Ubuntu
brew install apache2-utils          # macOS

# Run load test (100 requests, 10 concurrent)
ab -n 100 -c 10 $SERVICE_URL/health

# Check if service scaled up
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(status.traffic[0].latestRevision)'
```

### Expected Result

```
Requests per second: > 50
Time per request: < 200ms
Failed requests: 0
```

### If It Fails

**Symptom**: High latency or timeouts

**Possible Causes**:
1. Cold starts (no minimum instances)
2. Insufficient resources (CPU/memory)
3. Database connection issues

**Solutions**:
```bash
# Increase minimum instances to avoid cold starts
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --min-instances 1

# Increase resources
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --memory 4Gi \
    --cpu 4

# Check metrics in Cloud Console
open "https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics"
```

---

## Test 10: Automated Testing Script

### What You're Testing
Run comprehensive automated tests on all endpoints.

### Steps

```bash
# Make test script executable
chmod +x scripts/test-deployment.sh

# Run automated tests
./scripts/test-deployment.sh $SERVICE_URL
```

### Expected Result

```
✓ Health check passed
✓ API documentation accessible
✓ Authentication working
✓ Onboarding endpoints working
✓ Test generation working
✓ Analytics working
✓ Schedule generation working
✓ Payment integration working

All tests passed! (8/8)
```

### If It Fails

Check the specific test that failed and refer to the corresponding test section above.

---

## Monitoring and Logs

### View Real-Time Logs

```bash
# Tail logs in real-time
gcloud run services logs tail mentor-ai-backend --region us-central1

# Filter for errors only
gcloud run services logs tail mentor-ai-backend \
    --region us-central1 \
    --log-filter="severity>=ERROR"
```

### View Metrics

```bash
# Open metrics dashboard
open "https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics"
```

Key metrics to monitor:
- **Request count**: Number of requests per second
- **Request latency**: Response time (should be < 500ms)
- **Error rate**: Should be < 1%
- **Container instance count**: Number of running instances
- **CPU utilization**: Should be < 80%
- **Memory utilization**: Should be < 80%

### Set Up Alerts

```bash
# Create alert for high error rate
gcloud alpha monitoring policies create \
    --notification-channels=YOUR_CHANNEL_ID \
    --display-name="Backend Error Rate Alert" \
    --condition-display-name="Error rate > 5%" \
    --condition-threshold-value=0.05
```

---

## Common Issues and Solutions

### Issue 1: Service Crashes on Startup

**Symptoms**:
- Health check fails immediately
- Logs show "Container failed to start"

**Solutions**:
```bash
# Check startup logs
gcloud run services logs read mentor-ai-backend \
    --region us-central1 \
    --limit 100

# Common causes:
# 1. Missing environment variable
# 2. Failed to load secrets
# 3. Port not set to 8080
# 4. Import errors in Python code
```

### Issue 2: Intermittent Timeouts

**Symptoms**:
- Some requests timeout
- Inconsistent response times

**Solutions**:
```bash
# Increase timeout
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --timeout 300s

# Increase minimum instances
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --min-instances 1
```

### Issue 3: High Memory Usage

**Symptoms**:
- Container restarts frequently
- Out of memory errors in logs

**Solutions**:
```bash
# Increase memory
gcloud run services update mentor-ai-backend \
    --region us-central1 \
    --memory 4Gi

# Check memory usage
gcloud run services describe mentor-ai-backend \
    --region us-central1 \
    --format 'value(spec.template.spec.containers[0].resources.limits.memory)'
```

### Issue 4: Authentication Errors

**Symptoms**:
- 401 Unauthorized errors
- Firebase token validation fails

**Solutions**:
```bash
# Verify Firebase credentials
gcloud secrets versions access latest --secret=FIREBASE_CREDENTIALS | jq .

# Check service account permissions
gcloud projects get-iam-policy $(gcloud config get-value project) \
    --flatten="bindings[].members" \
    --filter="bindings.members:cloud-run-backend@*"
```

---

## Testing Checklist

Before marking deployment as complete:

- [ ] Health check endpoint returns 200 OK
- [ ] API documentation accessible at /docs
- [ ] Environment variables correctly set
- [ ] Firebase authentication working
- [ ] Vertex AI integration working
- [ ] Gemini API integration working
- [ ] Razorpay payment integration working
- [ ] CORS configured for frontend domain
- [ ] Performance acceptable (< 500ms response time)
- [ ] Logs show no errors
- [ ] Monitoring and alerts configured
- [ ] Automated tests passing

---

## Next Steps

Once all tests pass:

1. **Update Frontend**: Configure frontend to use production API URL
2. **Integration Testing**: Test complete user flows end-to-end
3. **Load Testing**: Run more comprehensive load tests
4. **Security Review**: Verify authentication and authorization
5. **Documentation**: Update API documentation with production URL

---

## Quick Reference

```bash
# Get service URL
gcloud run services describe mentor-ai-backend --region us-central1 --format 'value(status.url)'

# View logs
gcloud run services logs tail mentor-ai-backend --region us-central1

# View metrics
open "https://console.cloud.google.com/run/detail/us-central1/mentor-ai-backend/metrics"

# Update service
gcloud run services update mentor-ai-backend --region us-central1 [OPTIONS]

# Rollback
gcloud run services update-traffic mentor-ai-backend --region us-central1 --to-revisions PREVIOUS_REVISION=100

# Delete service
gcloud run services delete mentor-ai-backend --region us-central1
```

**All tests passing?** Great! Your backend is live and ready for production use! 🎉

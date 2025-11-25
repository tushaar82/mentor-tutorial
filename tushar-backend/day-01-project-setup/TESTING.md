# Testing Guide for Day 1: Backend Project Setup

This document provides step-by-step instructions to test your backend implementation. All tests can be run independently without the frontend.

---

## Prerequisites

Before testing, ensure:
- ✅ All configuration steps completed (see CONFIGURATION.md)
- ✅ Virtual environment activated
- ✅ Firebase credentials configured
- ✅ All Python packages installed

---

## Test 1: Start the Backend Server

### What You're Testing
Verifying that the FastAPI server starts without errors.

### Steps

**Step 1**: Navigate to backend directory and activate virtual environment:
```bash
cd tushar-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**Step 2**: Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### Expected Result
```
INFO:     Will watch for changes in these directories: ['/path/to/tushar-backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345] using StatReload
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Verification
- ✅ No error messages in console
- ✅ Server shows "Application startup complete"
- ✅ Server is running on http://127.0.0.1:8000

### If It Fails

**Error: "ModuleNotFoundError: No module named 'fastapi'"**
- Fix: Install dependencies with `pip install -r requirements.txt`

**Error: "Address already in use"**
- Fix: Change port with `uvicorn main:app --reload --port 8001`
- Or kill existing process: `lsof -ti:8000 | xargs kill -9` (Linux/macOS)

**Error: "Firebase credentials not found"**
- Fix: Check FIREBASE_SERVICE_ACCOUNT_PATH in .env file
- Verify credentials file exists: `ls credentials/firebase-service-account.json`

---

## Test 2: Verify Health Check Endpoint

### What You're Testing
Confirming the basic health check endpoint responds correctly.

### Steps

**Step 1**: Keep the server running from Test 1

**Step 2**: Open a new terminal and run:
```bash
curl http://localhost:8000/health
```

### Expected Result
```json
{
  "status": "healthy",
  "service": "mentor-ai-backend"
}
```

### Verification
- ✅ Response status: 200 OK
- ✅ JSON response with correct fields
- ✅ No errors in server console

### If It Fails

**Error: "Connection refused"**
- Fix: Make sure server is running (Test 1)
- Check server is on port 8000

**Error: "404 Not Found"**
- Fix: Check URL is exactly `http://localhost:8000/health`
- Verify main.py has health check endpoint

---

## Test 3: Verify API Documentation

### What You're Testing
Checking that FastAPI automatic documentation is accessible.

### Steps

**Step 1**: Keep the server running

**Step 2**: Open browser and navigate to:
```
http://localhost:8000/docs
```

### Expected Result
- Interactive API documentation (Swagger UI) loads
- Shows "Mentor AI Backend" as title
- Lists authentication endpoints under "Authentication" tag:
  - POST /api/auth/register/parent/email
  - POST /api/auth/register/parent/phone
  - POST /api/auth/register/parent/google

### Verification
- ✅ Documentation page loads without errors
- ✅ All three registration endpoints visible
- ✅ Can expand endpoints to see request/response schemas

### If It Fails

**Error: "Page not found"**
- Fix: Check URL is exactly `http://localhost:8000/docs`
- Verify server is running

**Error: "No endpoints shown"**
- Fix: Check that auth_router is included in main.py
- Verify routers/auth_router.py exists

---

## Test 4: Test Email Registration Endpoint

### What You're Testing
Parent registration with email and password.

### Steps

**Step 1**: Keep the server running

**Step 2**: Run this curl command:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.parent@example.com",
    "password": "SecurePass123",
    "language": "en"
  }'
```

### Expected Result
```json
{
  "parent_id": "firebase_uid_string",
  "email": "test.parent@example.com",
  "phone": null,
  "verification_required": true,
  "message": "Parent registered successfully with email. Please verify your email."
}
```

### Verification
- ✅ Response status: 201 Created
- ✅ Returns parent_id (Firebase UID)
- ✅ Returns email address
- ✅ verification_required is true
- ✅ No errors in server console

### Check in Firebase Console
1. Go to Firebase Console → Authentication
2. You should see the new user with email "test.parent@example.com"
3. Go to Firestore Database
4. You should see a document in "parents" collection with the parent_id

### If It Fails

**Error: "422 Unprocessable Entity"**
- Fix: Check JSON format is correct
- Verify all required fields are present
- Check password is at least 8 characters

**Error: "400 Bad Request - Email already exists"**
- This is expected if you run the test twice
- Use a different email address
- Or delete the user from Firebase Console → Authentication

**Error: "500 Internal Server Error"**
- Check server console for detailed error
- Verify Firebase credentials are correct
- Check Firestore is enabled in Firebase Console

---

## Test 5: Test Phone Registration Endpoint

### What You're Testing
Parent registration with phone number.

### Steps

**Step 1**: Keep the server running

**Step 2**: Run this curl command:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/phone \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "language": "hi"
  }'
```

### Expected Result
```json
{
  "parent_id": "firebase_uid_string",
  "email": null,
  "phone": "+919876543210",
  "verification_required": true,
  "message": "Parent registered successfully with phone. Please verify with OTP."
}
```

### Verification
- ✅ Response status: 201 Created
- ✅ Returns parent_id (Firebase UID)
- ✅ Returns phone number
- ✅ verification_required is true
- ✅ No errors in server console

### Check in Firebase Console
1. Go to Firebase Console → Authentication
2. You should see the new user with phone "+919876543210"
3. Go to Firestore Database
4. You should see a document in "parents" collection with the parent_id

### If It Fails

**Error: "422 Unprocessable Entity"**
- Fix: Check phone format is +91XXXXXXXXXX
- Verify JSON format is correct

**Error: "400 Bad Request - Phone already exists"**
- Use a different phone number
- Or delete the user from Firebase Console

**Error: "Phone authentication not enabled"**
- Fix: Enable Phone authentication in Firebase Console → Authentication → Sign-in method

---

## Test 6: Test Google OAuth Registration Endpoint

### What You're Testing
Parent registration with Google OAuth ID token.

### Steps

**Note**: Testing Google OAuth requires a valid ID token, which is complex to generate manually. We'll test the endpoint structure instead.

**Step 1**: Keep the server running

**Step 2**: Test with invalid token (should fail gracefully):
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/google \
  -H "Content-Type: application/json" \
  -d '{
    "id_token": "invalid_token_for_testing",
    "language": "en"
  }'
```

### Expected Result
```json
{
  "detail": "Invalid Google ID token"
}
```

### Verification
- ✅ Response status: 400 Bad Request
- ✅ Returns error message about invalid token
- ✅ Server doesn't crash
- ✅ Error is handled gracefully

### Note
Full Google OAuth testing requires:
1. Frontend integration with Google Sign-In
2. Valid ID token from Google
3. This will be tested in integration phase

For now, we verify:
- ✅ Endpoint exists and accepts requests
- ✅ Error handling works correctly
- ✅ Invalid tokens are rejected

---

## Test 7: Test Input Validation

### What You're Testing
Verifying that Pydantic models validate input correctly.

### Test 7.1: Invalid Email Format

**Step 1**: Test with invalid email:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "password": "SecurePass123",
    "language": "en"
  }'
```

**Expected Result**:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

**Verification**: ✅ Returns 422 with validation error

### Test 7.2: Short Password

**Step 2**: Test with short password:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "short",
    "language": "en"
  }'
```

**Expected Result**:
```json
{
  "detail": [
    {
      "loc": ["body", "password"],
      "msg": "ensure this value has at least 8 characters",
      "type": "value_error.any_str.min_length"
    }
  ]
}
```

**Verification**: ✅ Returns 422 with validation error

### Test 7.3: Invalid Language

**Step 3**: Test with invalid language:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "password": "SecurePass123",
    "language": "fr"
  }'
```

**Expected Result**:
```json
{
  "detail": [
    {
      "loc": ["body", "language"],
      "msg": "value must be one of: en, hi, mr",
      "type": "value_error.const"
    }
  ]
}
```

**Verification**: ✅ Returns 422 with validation error

---

## Test 8: Test CORS Configuration

### What You're Testing
Verifying that CORS headers allow frontend requests.

### Steps

**Step 1**: Test CORS with OPTIONS request:
```bash
curl -X OPTIONS http://localhost:8000/api/auth/register/parent/email \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### Expected Result
Response headers should include:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, GET, OPTIONS, ...
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
```

### Verification
- ✅ CORS headers present in response
- ✅ Origin http://localhost:3000 is allowed
- ✅ POST method is allowed
- ✅ Credentials are allowed

### If It Fails
- Check CORS middleware configuration in main.py
- Verify allow_origins includes "http://localhost:3000"

---

## Test 9: Test Error Handling

### What You're Testing
Verifying that the backend handles errors gracefully.

### Test 9.1: Duplicate Email Registration

**Step 1**: Register a user (if not already done):
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "duplicate@example.com",
    "password": "SecurePass123",
    "language": "en"
  }'
```

**Step 2**: Try to register with same email again:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "duplicate@example.com",
    "password": "SecurePass123",
    "language": "en"
  }'
```

**Expected Result**:
```json
{
  "detail": "Email already registered"
}
```

**Verification**: ✅ Returns 400 with appropriate error message

### Test 9.2: Missing Required Fields

**Step 3**: Test with missing fields:
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Expected Result**:
```json
{
  "detail": [
    {
      "loc": ["body", "password"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Verification**: ✅ Returns 422 with missing field error

---

## Test 10: Verify Firestore Data Structure

### What You're Testing
Checking that parent data is stored correctly in Firestore.

### Steps

**Step 1**: Register a test parent (if not already done):
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "firestore.test@example.com",
    "password": "SecurePass123",
    "language": "en"
  }'
```

**Step 2**: Go to Firebase Console → Firestore Database

**Step 3**: Navigate to "parents" collection

**Step 4**: Find the document with email "firestore.test@example.com"

### Expected Data Structure
```json
{
  "parent_id": "firebase_uid_string",
  "email": "firestore.test@example.com",
  "language": "en",
  "role": "parent",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Verification
- ✅ Document exists in "parents" collection
- ✅ Document ID matches parent_id
- ✅ All required fields present
- ✅ created_at timestamp is set
- ✅ role is "parent"

---

## Test 11: Load Testing (Optional)

### What You're Testing
Verifying the backend can handle multiple concurrent requests.

### Steps

**Step 1**: Create a test script:
```bash
cat > load_test.sh << 'EOF'
#!/bin/bash
for i in {1..10}
do
  curl -X POST http://localhost:8000/api/auth/register/parent/email \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"loadtest${i}@example.com\",
      \"password\": \"SecurePass123\",
      \"language\": \"en\"
    }" &
done
wait
echo "Load test complete"
EOF

chmod +x load_test.sh
```

**Step 2**: Run the load test:
```bash
./load_test.sh
```

### Expected Result
- All 10 requests complete successfully
- Server remains responsive
- No crashes or errors

### Verification
- ✅ All requests return 201 Created
- ✅ Server logs show all requests processed
- ✅ No error messages in console
- ✅ 10 new users in Firebase Authentication

---

## Testing Complete! 🎉

### Summary of Tests

| Test | Status | Description |
|------|--------|-------------|
| 1. Start Server | ✅ | Backend starts without errors |
| 2. Health Check | ✅ | Basic endpoint responds |
| 3. API Docs | ✅ | Documentation accessible |
| 4. Email Registration | ✅ | Email auth works |
| 5. Phone Registration | ✅ | Phone auth works |
| 6. Google OAuth | ✅ | Endpoint exists and validates |
| 7. Input Validation | ✅ | Pydantic validates correctly |
| 8. CORS | ✅ | Frontend can make requests |
| 9. Error Handling | ✅ | Errors handled gracefully |
| 10. Firestore Data | ✅ | Data stored correctly |
| 11. Load Testing | ✅ | Handles concurrent requests |

### What You've Verified

- ✅ FastAPI server runs successfully
- ✅ Firebase integration works
- ✅ All authentication endpoints functional
- ✅ Input validation working
- ✅ Error handling implemented
- ✅ CORS configured for frontend
- ✅ Data persisted to Firestore
- ✅ API documentation generated

### Next Steps

1. **Open EXPECTED-OUTCOME.md** to verify all success criteria are met
2. If any tests failed, check **TROUBLESHOOTING.md** for solutions
3. Once all tests pass, you're ready for **Day 2: Firebase Authentication**

### Quick Commands Reference

**Start server:**
```bash
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

**Test health check:**
```bash
curl http://localhost:8000/health
```

**Test email registration:**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123", "language": "en"}'
```

**View API docs:**
```
http://localhost:8000/docs
```

---

## Troubleshooting

If you encounter issues during testing, check **TROUBLESHOOTING.md** for detailed solutions to common problems.

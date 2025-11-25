# Configuration Guide for Day 3: User Onboarding API

This document provides step-by-step instructions for configuring Firestore collections and setting up test data for the onboarding API.

---

## Prerequisites

Before starting configuration:
- ✅ Day 1 and Day 2 completed
- ✅ Firebase project created
- ✅ Firestore database enabled
- ✅ Service account key downloaded
- ✅ Backend server can connect to Firestore

---

## Step 1: Verify Firestore Database

### What You're Doing
Confirming that Firestore is enabled and accessible.

### Command/Action
1. Open Firebase Console: https://console.firebase.google.com
2. Select your project
3. Navigate to **Firestore Database** in the left sidebar
4. Verify you see the database (either in Native mode or Datastore mode)

### Verification
You should see the Firestore Database page with either:
- Empty database (if new)
- Existing collections from Day 1-2 (parents, auth_sessions, etc.)

### If It Fails
- **Issue**: "Firestore not enabled"
- **Fix**: Click "Create database" → Choose production mode → Select region → Enable

---

## Step 2: Create Firestore Collections Structure

### What You're Doing
Setting up the collection structure for onboarding data.

### Collections to Create
You don't need to manually create collections (Firestore creates them automatically when you add documents), but here's the structure:

```
Firestore Database
├── parents/
│   └── {parent_id}/
│       └── preferences/          # Parent preferences document
├── children/                     # Child profiles collection
│   └── {child_id}/              # Individual child document
├── exam_selections/              # Exam selections collection
│   └── {child_id}/              # Exam selection by child_id
└── diagnostic_tests/             # Diagnostic tests collection
    └── {test_id}/               # Individual test document
```

### Action
No manual action needed. Collections will be created automatically when your API stores data.

---

## Step 3: Set Up Firestore Security Rules (Optional for Development)

### What You're Doing
Configuring Firestore security rules to allow backend access.

### Command/Action
1. In Firebase Console, go to **Firestore Database**
2. Click **Rules** tab
3. Replace with these development rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow backend service account full access
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Click **Publish**

### Verification
Rules should show "Published" status with timestamp.

### Important Note
These are permissive rules for development. In production, implement proper security rules based on user authentication and ownership.

---

## Step 4: Create Test Parent Account

### What You're Doing
Creating a test parent account to use for onboarding testing.

### Command/Action
Use the registration endpoint from Day 1:

```bash
curl -X POST http://localhost:8000/api/auth/register/parent \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.parent@example.com",
    "phone": "+919876543210",
    "language": "en",
    "registration_method": "email"
  }'
```

### Expected Response
```json
{
  "parent_id": "parent_abc123",
  "email": "test.parent@example.com",
  "phone": "+919876543210",
  "language": "en",
  "verification_required": true,
  "created_at": "2025-11-25T10:00:00Z"
}
```

### Save This Information
**Important**: Save the `parent_id` from the response. You'll need it for testing.

Example: `parent_abc123`

---

## Step 5: Verify Firestore Connection from Backend

### What You're Doing
Testing that your backend can read/write to Firestore.

### Command/Action
Create a test script `test_firestore.py`:

```python
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase (if not already initialized)
try:
    firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

# Test write
test_doc = db.collection('test').document('test_doc')
test_doc.set({'message': 'Hello Firestore', 'timestamp': firestore.SERVER_TIMESTAMP})

# Test read
doc = test_doc.get()
if doc.exists:
    print(f"✅ Firestore connection successful: {doc.to_dict()}")
else:
    print("❌ Firestore connection failed")

# Clean up
test_doc.delete()
```

Run the script:
```bash
python test_firestore.py
```

### Expected Output
```
✅ Firestore connection successful: {'message': 'Hello Firestore', 'timestamp': ...}
```

### If It Fails
- **Issue**: "Could not reach Firestore backend"
- **Fix**: Check internet connection, verify service account key path
- **Issue**: "Permission denied"
- **Fix**: Verify service account has Firestore permissions in IAM

---

## Step 6: Set Up Environment Variables

### What You're Doing
Ensuring all required environment variables are set.

### Command/Action
Check your `.env` file has these variables:

```bash
# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Environment
ENVIRONMENT=development
```

### Verification
```bash
# Check if .env file exists
cat .env

# Verify service account key file exists
ls -la path/to/serviceAccountKey.json
```

---

## Step 7: Install Required Python Packages

### What You're Doing
Ensuring all dependencies for Firestore operations are installed.

### Command/Action
```bash
# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install/update dependencies
pip install firebase-admin==6.2.0
pip install google-cloud-firestore==2.13.1
```

### Verification
```bash
pip list | grep firebase
# Should show: firebase-admin 6.2.0

pip list | grep firestore
# Should show: google-cloud-firestore 2.13.1
```

---

## Step 8: Create Sample Exam Dates Data

### What You're Doing
Setting up reference data for available exam dates.

### Action
This is handled by the `date_utils.py` utility, but you can verify the logic:

**JEE Main Dates**: January 15, April 15 (current/next year)
**JEE Advanced Dates**: May 20 (current/next year)
**NEET Dates**: May 5 (current/next year)

No manual configuration needed - the API will calculate these dynamically.

---

## Step 9: Start Backend Server

### What You're Doing
Starting the FastAPI server with all Day 3 endpoints.

### Command/Action
```bash
# Make sure you're in the backend directory
cd tushar-backend

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Expected Output
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Verification
Open browser to http://localhost:8000/docs

You should see new endpoints:
- `/api/onboarding/preferences`
- `/api/onboarding/child`
- `/api/onboarding/exams/available`
- `/api/onboarding/exam/select`
- `/api/onboarding/status`

---

## Step 10: Verify API Documentation

### What You're Doing
Checking that all Day 3 endpoints are registered and documented.

### Command/Action
1. Open http://localhost:8000/docs in browser
2. Scroll to "Onboarding" sections
3. Verify you see three sections:
   - **Onboarding - Preferences**
   - **Onboarding - Child Profile**
   - **Onboarding - Exam Selection**

### Expected Result
All endpoints should be visible with:
- Request body schemas
- Response schemas
- Example values
- Try it out functionality

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ Firestore database and collections
- ✅ Security rules for development
- ✅ Test parent account
- ✅ Firestore connection verification
- ✅ Environment variables
- ✅ Python dependencies
- ✅ Backend server running
- ✅ API documentation accessible

**Next Steps:**
1. Open **TESTING.md** to test the complete onboarding flow
2. Use the `parent_id` you saved in Step 4 for testing

---

## Quick Reference

### Important Information to Save
```
Parent ID: parent_abc123  (from Step 4)
API Base URL: http://localhost:8000
API Docs: http://localhost:8000/docs
Firebase Console: https://console.firebase.google.com
```

### Common Commands
```bash
# Start server
uvicorn main:app --reload

# Check Firestore connection
python test_firestore.py

# View API docs
open http://localhost:8000/docs
```


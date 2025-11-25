# Backend Appendix - Quick Reference Guide

## 📋 Overview

This appendix provides a comprehensive quick reference for the Mentor AI backend. Use this document to quickly find environment variables, API endpoints, common errors, Firebase collections, testing commands, and deployment commands.

---

## 🔐 Environment Variables

### Firebase Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Path to Firebase service account JSON | Firebase Console → Project Settings → Service Accounts → Generate New Private Key | `./firebase-service-account.json` |
| `FIREBASE_PROJECT_ID` | Firebase project identifier | Firebase Console → Project Settings → General | `mentor-ai-dev` |
| `FIREBASE_DATABASE_URL` | Firestore database URL | Firebase Console → Firestore Database | `https://mentor-ai-dev.firebaseio.com` |

### Authentication Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `JWT_SECRET` | Secret key for JWT token signing | Generate with: `python3 -c "import secrets; print(secrets.token_urlsafe(32))"` | `your-secret-key-here` |
| `TOKEN_EXPIRY_HOURS` | JWT token expiration time in hours | Configuration | `24` |
| `REFRESH_TOKEN_EXPIRY_DAYS` | Refresh token expiration in days | Configuration | `30` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Firebase Console → Authentication → Sign-in method → Google | `123456789-abc.apps.googleusercontent.com` |

### Email Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `EMAIL_FROM_NAME` | Sender name for emails | Configuration | `Mentor AI` |
| `EMAIL_FROM_ADDRESS` | Sender email address | Configuration | `noreply@mentor-ai.com` |

### Phone Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `PHONE_OTP_LENGTH` | Length of OTP code | Configuration | `6` |
| `PHONE_OTP_EXPIRY_MINUTES` | OTP expiration time | Configuration | `10` |

### Google Cloud AI Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `VERTEX_AI_PROJECT_ID` | Google Cloud project for Vertex AI | Google Cloud Console → Project Info | `mentor-ai-vertex` |
| `VERTEX_AI_LOCATION` | Vertex AI region | Configuration | `us-central1` |
| `GEMINI_API_KEY` | Gemini Flash API key | Google AI Studio → Get API Key | `AIzaSy...` |
| `GEMINI_MODEL` | Gemini model version | Configuration | `gemini-1.5-flash` |

### Razorpay Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API key ID | Razorpay Dashboard → Settings → API Keys | `rzp_test_1234567890` |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | Razorpay Dashboard → Settings → API Keys | `abcdefghijklmnop` |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature secret | Razorpay Dashboard → Webhooks | `webhook_secret_123` |

### Application Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `ENVIRONMENT` | Application environment | Configuration | `development` / `production` |
| `API_HOST` | API server host | Configuration | `0.0.0.0` |
| `API_PORT` | API server port | Configuration | `8000` |
| `LOG_LEVEL` | Logging level | Configuration | `INFO` / `DEBUG` |

### Complete .env Template

```bash
# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_KEY=./firebase-service-account.json
FIREBASE_PROJECT_ID=mentor-ai-dev
FIREBASE_DATABASE_URL=https://mentor-ai-dev.firebaseio.com

# Authentication Configuration
JWT_SECRET=your-generated-secret-key-here
TOKEN_EXPIRY_HOURS=24
REFRESH_TOKEN_EXPIRY_DAYS=30
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Email Configuration
EMAIL_FROM_NAME=Mentor AI
EMAIL_FROM_ADDRESS=noreply@mentor-ai.com

# Phone Configuration
PHONE_OTP_LENGTH=6
PHONE_OTP_EXPIRY_MINUTES=10

# Google Cloud AI Configuration
VERTEX_AI_PROJECT_ID=mentor-ai-vertex
VERTEX_AI_LOCATION=us-central1
GEMINI_API_KEY=AIzaSy...your-key-here
GEMINI_MODEL=gemini-1.5-flash

# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=webhook_secret_123

# Application Configuration
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO
```

---

## 🌐 API Endpoints Reference

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.mentorai.com`

### Authentication Endpoints

#### POST /api/auth/register/parent
Register a new parent account.

**Request:**
```json
{
  "email": "parent@example.com",
  "phone": "+919876543210",
  "language": "en",
  "registration_method": "email"
}
```

**Response (201 Created):**
```json
{
  "parent_id": "parent_abc123",
  "email": "parent@example.com",
  "phone": "+919876543210",
  "language": "en",
  "verification_required": true,
  "created_at": "2025-11-25T10:00:00Z"
}
```

---

#### POST /api/auth/verify/email/send
Send email verification code.

**Request:**
```json
{
  "email": "parent@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Verification email sent successfully",
  "email": "parent@example.com",
  "verification_sent": true
}
```

---

#### POST /api/auth/verify/email/confirm
Confirm email with verification code.

**Request:**
```json
{
  "email": "parent@example.com",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Email verified successfully",
  "email": "parent@example.com",
  "verified": true
}
```

---

#### POST /api/auth/verify/phone/send
Send phone OTP.

**Request:**
```json
{
  "phone": "+919999999999"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP sent successfully",
  "phone": "+919999999999",
  "otp_sent": true
}
```

---

#### POST /api/auth/verify/phone/confirm
Confirm phone with OTP.

**Request:**
```json
{
  "phone": "+919999999999",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Phone verified successfully",
  "phone": "+919999999999",
  "verified": true
}
```

---

#### POST /api/auth/login/email
Login with email and password.

**Request:**
```json
{
  "email": "parent@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "parent_id": "parent_abc123",
  "email": "parent@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

#### POST /api/auth/login/phone
Login with phone and OTP.

**Request:**
```json
{
  "phone": "+919999999999",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "parent_id": "parent_abc123",
  "phone": "+919999999999",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

#### POST /api/auth/login/google
Login with Google ID token.

**Request:**
```json
{
  "id_token": "google_id_token_here"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "parent_id": "parent_abc123",
  "email": "user@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

#### GET /api/auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "parent_id": "parent_abc123",
  "email": "parent@example.com",
  "phone": "+919876543210",
  "language": "en",
  "role": "parent",
  "email_verified": true,
  "phone_verified": false,
  "created_at": "2025-11-25T10:00:00Z"
}
```

---

#### POST /api/auth/token/refresh
Refresh access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "message": "Token refreshed successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

#### POST /api/auth/logout
Logout and revoke token.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful",
  "logged_out": true
}
```

---

### Onboarding Endpoints

#### GET /api/onboarding/exams/available
Get available exams with dates.

**Response (200 OK):**
```json
{
  "exams": [
    {
      "exam_type": "JEE_MAIN",
      "exam_name": "JEE Main",
      "available_dates": ["2026-01-15", "2026-04-15"],
      "subjects": ["Physics", "Chemistry", "Mathematics"]
    },
    {
      "exam_type": "JEE_ADVANCED",
      "exam_name": "JEE Advanced",
      "available_dates": ["2026-05-20"],
      "subjects": ["Physics", "Chemistry", "Mathematics"]
    },
    {
      "exam_type": "NEET",
      "exam_name": "NEET",
      "available_dates": ["2026-05-05"],
      "subjects": ["Physics", "Chemistry", "Biology"]
    }
  ]
}
```

---

#### POST /api/onboarding/preferences
Create parent preferences.

**Query Parameters:**
- `parent_id` (required)

**Request:**
```json
{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high"
}
```

**Response (201 Created):**
```json
{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:00:00Z"
}
```

---

#### GET /api/onboarding/preferences
Get parent preferences.

**Query Parameters:**
- `parent_id` (required)

**Response (200 OK):**
```json
{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:00:00Z"
}
```

---

#### PUT /api/onboarding/preferences
Update parent preferences.

**Query Parameters:**
- `parent_id` (required)

**Request:**
```json
{
  "language": "hi",
  "teaching_involvement": "medium"
}
```

**Response (200 OK):**
```json
{
  "language": "hi",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "medium",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:05:00Z"
}
```

---

#### POST /api/onboarding/child
Create child profile (one-child limit enforced).

**Query Parameters:**
- `parent_id` (required)

**Request:**
```json
{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate"
}
```

**Response (201 Created):**
```json
{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate",
  "child_id": "child_xyz789",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:10:00Z",
  "updated_at": "2025-11-25T10:10:00Z"
}
```

---

#### GET /api/onboarding/child
Get child profile by parent ID.

**Query Parameters:**
- `parent_id` (required)

**Response (200 OK):**
```json
{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate",
  "child_id": "child_xyz789",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:10:00Z",
  "updated_at": "2025-11-25T10:10:00Z"
}
```

---

#### PUT /api/onboarding/child/{child_id}
Update child profile.

**Query Parameters:**
- `parent_id` (required)

**Request:**
```json
{
  "current_level": "advanced",
  "grade": 12
}
```

**Response (200 OK):**
```json
{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 12,
  "current_level": "advanced",
  "child_id": "child_xyz789",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:10:00Z",
  "updated_at": "2025-11-25T10:15:00Z"
}
```

---

#### DELETE /api/onboarding/child/{child_id}
Delete child profile.

**Query Parameters:**
- `parent_id` (required)

**Response (200 OK):**
```json
{
  "message": "Child profile deleted successfully",
  "child_id": "child_xyz789"
}
```

---

#### POST /api/onboarding/exam/select
Select exam and schedule diagnostic test.

**Query Parameters:**
- `parent_id` (required)
- `child_id` (required)

**Request:**
```json
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  }
}
```

**Response (201 Created):**
```json
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  },
  "child_id": "child_xyz789",
  "days_until_exam": 141,
  "diagnostic_test_id": "test_def456",
  "created_at": "2025-11-25T10:20:00Z"
}
```

---

#### GET /api/onboarding/exam/preferences
Get exam selection and preferences.

**Query Parameters:**
- `child_id` (required)

**Response (200 OK):**
```json
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  },
  "child_id": "child_xyz789",
  "days_until_exam": 141,
  "diagnostic_test_id": "test_def456",
  "created_at": "2025-11-25T10:20:00Z"
}
```

---

#### GET /api/onboarding/status
Get onboarding completion status.

**Query Parameters:**
- `parent_id` (required)

**Response (200 OK):**
```json
{
  "preferences_completed": true,
  "child_profile_completed": true,
  "exam_selected": true,
  "onboarding_complete": true
}
```

---

### Diagnostic Test Endpoints

#### POST /api/diagnostic/generate
Generate diagnostic test (200 questions).

**Request:**
```json
{
  "child_id": "child_xyz789",
  "exam_type": "JEE_MAIN"
}
```

**Response (200 OK):**
```json
{
  "test_id": "test_def456",
  "questions": [
    {
      "id": "q1",
      "topic": "Mechanics",
      "subtopic": "Newton's Laws",
      "difficulty": "medium",
      "type": "MCQ",
      "question": "A block of mass 5 kg...",
      "options": {
        "A": "10 N",
        "B": "20 N",
        "C": "30 N",
        "D": "40 N"
      },
      "weightage": 4
    }
  ],
  "duration_minutes": 180,
  "total_questions": 200
}
```

---

#### POST /api/diagnostic/submit
Submit diagnostic test answers.

**Request:**
```json
{
  "test_id": "test_def456",
  "answers": {
    "q1": "B",
    "q2": "A",
    "q3": "C"
  }
}
```

**Response (200 OK):**
```json
{
  "test_id": "test_def456",
  "overall_score": 145,
  "total_questions": 200,
  "correct_answers": 145,
  "incorrect_answers": 45,
  "unanswered": 10,
  "analytics_id": "analytics_ghi123"
}
```

---

### Analytics Endpoints

#### GET /api/analytics/{analytics_id}
Get detailed analytics report.

**Response (200 OK):**
```json
{
  "analytics_id": "analytics_ghi123",
  "test_id": "test_def456",
  "child_id": "child_xyz789",
  "weak_subjects": [
    {
      "subject": "Physics",
      "score": 45,
      "weightage": 30,
      "weak_topics": ["Thermodynamics", "Optics"]
    }
  ],
  "weak_topics": [
    {
      "topic": "Thermodynamics",
      "score": 40,
      "weightage": 10,
      "priority": "HIGH"
    }
  ],
  "strategies": [
    {
      "topic": "Thermodynamics",
      "focus_areas": ["First Law", "Second Law"],
      "study_techniques": ["Concept revision", "Numerical practice"],
      "estimated_time": "2 weeks"
    }
  ],
  "generated_at": "2025-11-25T10:30:00Z"
}
```

---

### Schedule Endpoints

#### POST /api/schedule/generate
Generate study schedule.

**Request:**
```json
{
  "child_id": "child_xyz789",
  "analytics_id": "analytics_ghi123",
  "exam_date": "2026-04-15T00:00:00Z",
  "study_hours_per_day": 6
}
```

**Response (200 OK):**
```json
{
  "schedule_id": "schedule_jkl456",
  "daily_tasks": [
    {
      "day": 1,
      "date": "2025-11-26T00:00:00Z",
      "topics": ["Thermodynamics"],
      "activities": [
        {
          "type": "CONCEPT_LEARNING",
          "topic": "Thermodynamics - First Law",
          "duration_hours": 2
        }
      ],
      "total_hours": 4
    }
  ],
  "milestones": [
    {
      "week": 1,
      "goal": "Complete Thermodynamics basics",
      "topics_covered": ["First Law", "Second Law"]
    }
  ]
}
```

---

#### GET /api/schedule/{schedule_id}
Get schedule with progress.

**Response (200 OK):**
```json
{
  "schedule_id": "schedule_jkl456",
  "child_id": "child_xyz789",
  "daily_tasks": [],
  "progress": {
    "completed_tasks": 45,
    "total_tasks": 180,
    "completion_percentage": 25
  }
}
```

---

### Payment Endpoints

#### POST /api/payment/create-order
Create Razorpay payment order.

**Request:**
```json
{
  "parent_id": "parent_abc123",
  "plan_id": "premium_annual"
}
```

**Response (200 OK):**
```json
{
  "order_id": "order_mno789",
  "razorpay_order_id": "order_MfG7xYz9Abc123",
  "amount": 99900,
  "currency": "INR",
  "razorpay_key_id": "rzp_test_1234567890"
}
```

---

#### POST /api/payment/verify
Verify payment signature.

**Request:**
```json
{
  "order_id": "order_mno789",
  "razorpay_payment_id": "pay_MfG7xYz9Abc123",
  "razorpay_signature": "abc123def456..."
}
```

**Response (200 OK):**
```json
{
  "verified": true,
  "subscription_active": true,
  "subscription_expiry": "2026-11-25T10:30:00Z"
}
```

---

## ❌ Common Errors and Fixes

### Authentication Errors

#### Error: "Firebase Admin SDK initialization failed"
**Cause**: Missing or invalid service account key file.

**Symptoms**:
- Backend fails to start
- Error message: "Could not load credentials"

**Fix**:
1. Download service account key from Firebase Console
2. Place file in project root
3. Update `FIREBASE_SERVICE_ACCOUNT_KEY` in `.env`
4. Restart backend server

**Verification**:
```bash
python -c "from utils.firebase_config import get_auth_client; print('✓ Firebase initialized')"
```

---

#### Error: "Invalid email or password"
**Cause**: Incorrect credentials or user doesn't exist.

**Symptoms**:
- Login returns 401 Unauthorized
- Error message: "Invalid email or password"

**Fix**:
1. Verify email exists in Firebase Console → Authentication → Users
2. Check password is correct (minimum 6 characters)
3. Ensure user account is enabled (not disabled)

**Test**:
```bash
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123456"}'
```

---

#### Error: "Token has expired"
**Cause**: JWT token exceeded expiration time.

**Symptoms**:
- Protected endpoints return 401
- Error message: "Token has expired"

**Fix**:
1. Use refresh token to get new access token
2. Update frontend to handle token refresh automatically

**Refresh Token**:
```bash
curl -X POST http://localhost:8000/api/auth/token/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "your-refresh-token"}'
```

---

#### Error: "Verification code has expired"
**Cause**: Email/phone verification code older than 10 minutes.

**Symptoms**:
- Verification fails
- Error message: "Verification code has expired"

**Fix**:
1. Request new verification code
2. Complete verification within 10 minutes

**Request New Code**:
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

### Firestore Errors

#### Error: "Permission denied"
**Cause**: Firestore security rules blocking access.

**Symptoms**:
- CRUD operations fail
- Error message: "Missing or insufficient permissions"

**Fix**:
1. Open Firebase Console → Firestore Database → Rules
2. Update rules to allow backend access:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

**Verification**:
```bash
python -c "from utils.firebase_config import get_firestore_client; db = get_firestore_client(); print('✓ Firestore accessible')"
```

---

#### Error: "Document not found"
**Cause**: Querying non-existent document.

**Symptoms**:
- GET requests return 404
- Error message: "Document not found"

**Fix**:
1. Verify document ID is correct
2. Check document exists in Firebase Console
3. Ensure parent/child relationships are correct

**Debug**:
```bash
# List all documents in collection
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
docs = db.collection('parents').limit(10).get()
for doc in docs:
    print(f'{doc.id}: {doc.to_dict()}')
"
```

---

### Vertex AI / Gemini Errors

#### Error: "Vertex AI API not enabled"
**Cause**: Vertex AI API not activated in Google Cloud project.

**Symptoms**:
- Vector search fails
- Error message: "API not enabled"

**Fix**:
```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Verify
gcloud services list --enabled | grep aiplatform
```

---

#### Error: "Gemini API rate limit exceeded"
**Cause**: Too many API calls in short time.

**Symptoms**:
- Analytics/schedule generation fails
- Error message: "Rate limit exceeded"

**Fix**:
1. Implement exponential backoff retry logic
2. Add caching for common requests
3. Upgrade to higher tier if needed

**Retry Logic Example**:
```python
import time
from google.api_core import retry

@retry.Retry(predicate=retry.if_exception_type(Exception))
def call_gemini_with_retry():
    return gemini_client.generate(prompt)
```

---

#### Error: "Invalid Gemini API key"
**Cause**: API key is incorrect or expired.

**Symptoms**:
- Gemini calls fail
- Error message: "Invalid API key"

**Fix**:
1. Get new API key from Google AI Studio
2. Update `GEMINI_API_KEY` in `.env`
3. Restart backend server

**Test**:
```bash
curl -X POST "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

---

### Razorpay Errors

#### Error: "Payment verification failed"
**Cause**: Invalid signature or tampered payment data.

**Symptoms**:
- Payment verification returns false
- Error message: "Signature verification failed"

**Fix**:
1. Verify `RAZORPAY_KEY_SECRET` is correct
2. Ensure signature calculation matches Razorpay's algorithm
3. Check payment_id and order_id are correct

**Verify Signature**:
```python
import hmac
import hashlib

def verify_signature(order_id, payment_id, signature, secret):
    message = f"{order_id}|{payment_id}"
    generated_signature = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    return generated_signature == signature
```

---

#### Error: "Order not found"
**Cause**: Invalid order_id or order expired.

**Symptoms**:
- Payment verification fails
- Error message: "Order not found"

**Fix**:
1. Verify order_id is correct
2. Check order exists in Razorpay Dashboard
3. Ensure order hasn't expired (orders expire after 15 minutes)

**Check Order**:
```bash
curl -X GET https://api.razorpay.com/v1/orders/order_id \
  -u "rzp_test_key:secret"
```

---

### General API Errors

#### Error: "CORS policy blocked"
**Cause**: Frontend domain not in CORS allowed origins.

**Symptoms**:
- Browser console shows CORS error
- API calls fail from frontend

**Fix**:
1. Add frontend URL to CORS origins in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
2. Restart backend server

---

#### Error: "Connection refused"
**Cause**: Backend server not running.

**Symptoms**:
- API calls fail
- Error message: "Connection refused"

**Fix**:
```bash
# Start backend server
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

**Verify**:
```bash
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

---

#### Error: "Internal Server Error (500)"
**Cause**: Unhandled exception in backend code.

**Symptoms**:
- API returns 500 status
- Generic error message

**Fix**:
1. Check backend logs for detailed error:
```bash
tail -f logs/app.log
```
2. Enable debug mode in `.env`:
```bash
LOG_LEVEL=DEBUG
```
3. Fix the specific error in code
4. Restart server

---

### Database Errors

#### Error: "One-child limit reached"
**Cause**: Attempting to create second child profile.

**Symptoms**:
- Child creation returns 400
- Error message: "Parent can only have one child profile"

**Fix**:
1. Delete existing child profile first
2. Or update existing child instead of creating new one

**Delete Child**:
```bash
curl -X DELETE "http://localhost:8000/api/onboarding/child/{child_id}?parent_id={parent_id}"
```

---

#### Error: "Subject weightages must sum to 100"
**Cause**: Subject preferences don't add up to 100.

**Symptoms**:
- Exam selection fails
- Error message: "Subject weightages must sum to 100"

**Fix**:
Adjust weightages to sum exactly to 100:
```json
{
  "Physics": 35,
  "Chemistry": 30,
  "Mathematics": 35
}
```

---

## 🗄️ Firebase Collections Structure

### parents Collection
**Path**: `/parents/{parent_id}`

**Document Structure**:
```json
{
  "parent_id": "parent_abc123",
  "email": "parent@example.com",
  "phone": "+919876543210",
  "language": "en",
  "role": "parent",
  "email_verified": true,
  "phone_verified": false,
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:00:00Z"
}
```

**Subcollection**: `/parents/{parent_id}/preferences`
```json
{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high",
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:00:00Z"
}
```

---

### children Collection
**Path**: `/children/{child_id}`

**Document Structure**:
```json
{
  "child_id": "child_xyz789",
  "parent_id": "parent_abc123",
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate",
  "created_at": "2025-11-25T10:10:00Z",
  "updated_at": "2025-11-25T10:10:00Z"
}
```

---

### exam_selections Collection
**Path**: `/exam_selections/{child_id}`

**Document Structure**:
```json
{
  "child_id": "child_xyz789",
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  },
  "days_until_exam": 141,
  "diagnostic_test_id": "test_def456",
  "created_at": "2025-11-25T10:20:00Z"
}
```

---

### diagnostic_tests Collection
**Path**: `/diagnostic_tests/{test_id}`

**Document Structure**:
```json
{
  "test_id": "test_def456",
  "child_id": "child_xyz789",
  "exam_type": "JEE_MAIN",
  "status": "completed",
  "questions": [],
  "answers": {},
  "score": 145,
  "total_questions": 200,
  "created_at": "2025-11-25T10:30:00Z",
  "submitted_at": "2025-11-25T13:30:00Z"
}
```

---

### analytics Collection
**Path**: `/analytics/{analytics_id}`

**Document Structure**:
```json
{
  "analytics_id": "analytics_ghi123",
  "test_id": "test_def456",
  "child_id": "child_xyz789",
  "weak_subjects": [],
  "weak_topics": [],
  "strategies": [],
  "generated_at": "2025-11-25T13:35:00Z"
}
```

---

### schedules Collection
**Path**: `/schedules/{schedule_id}`

**Document Structure**:
```json
{
  "schedule_id": "schedule_jkl456",
  "child_id": "child_xyz789",
  "analytics_id": "analytics_ghi123",
  "exam_date": "2026-04-15T00:00:00Z",
  "daily_tasks": [],
  "milestones": [],
  "progress": {
    "completed_tasks": 0,
    "total_tasks": 180
  },
  "generated_at": "2025-11-25T13:40:00Z"
}
```

---

### subscriptions Collection
**Path**: `/subscriptions/{parent_id}`

**Document Structure**:
```json
{
  "subscription_id": "sub_mno789",
  "parent_id": "parent_abc123",
  "plan_id": "premium_annual",
  "status": "active",
  "start_date": "2025-11-25T00:00:00Z",
  "end_date": "2026-11-25T00:00:00Z",
  "amount": 99900,
  "currency": "INR",
  "created_at": "2025-11-25T14:00:00Z"
}
```

---

### transactions Collection
**Path**: `/transactions/{transaction_id}`

**Document Structure**:
```json
{
  "transaction_id": "txn_pqr012",
  "parent_id": "parent_abc123",
  "order_id": "order_mno789",
  "razorpay_payment_id": "pay_MfG7xYz9Abc123",
  "amount": 99900,
  "currency": "INR",
  "status": "completed",
  "created_at": "2025-11-25T14:00:00Z"
}
```

---

### verification_codes Collection
**Path**: `/verification_codes/{email_or_phone}`

**Document Structure**:
```json
{
  "email": "parent@example.com",
  "code": "123456",
  "type": "email_verification",
  "expires_at": "2025-11-25T10:10:00Z",
  "created_at": "2025-11-25T10:00:00Z"
}
```

---

### sessions Collection
**Path**: `/sessions/{session_id}`

**Document Structure**:
```json
{
  "session_id": "session_stu345",
  "parent_id": "parent_abc123",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2025-11-26T10:00:00Z",
  "created_at": "2025-11-25T10:00:00Z",
  "revoked": false
}
```

---

## 🧪 Testing Commands Reference

### Start Backend Server

```bash
# Navigate to backend directory
cd tushar-backend

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start server with auto-reload
uvicorn main:app --reload --port 8000

# Start server with specific host
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Start server with debug logging
LOG_LEVEL=DEBUG uvicorn main:app --reload --port 8000
```

---

### Health Check

```bash
# Check if server is running
curl http://localhost:8000/health

# Expected response:
# {"status": "healthy"}
```

---

### Authentication Testing

```bash
# Register parent with email
curl -X POST http://localhost:8000/api/auth/register/parent \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+919876543210",
    "language": "en",
    "registration_method": "email"
  }'

# Send email verification
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Confirm email verification
curl -X POST http://localhost:8000/api/auth/verify/email/confirm \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "code": "123456"}'

# Login with email
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123456"}'

# Get current user (requires token)
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Logout
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### Onboarding Testing

```bash
# Get available exams
curl http://localhost:8000/api/onboarding/exams/available

# Create parent preferences
curl -X POST "http://localhost:8000/api/onboarding/preferences?parent_id=parent_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "email_notifications": true,
    "sms_notifications": true,
    "push_notifications": false,
    "teaching_involvement": "high"
  }'

# Get parent preferences
curl "http://localhost:8000/api/onboarding/preferences?parent_id=parent_abc123"

# Create child profile
curl -X POST "http://localhost:8000/api/onboarding/child?parent_id=parent_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "age": 16,
    "grade": 11,
    "current_level": "intermediate"
  }'

# Get child profile
curl "http://localhost:8000/api/onboarding/child?parent_id=parent_abc123"

# Select exam
curl -X POST "http://localhost:8000/api/onboarding/exam/select?parent_id=parent_abc123&child_id=child_xyz789" \
  -H "Content-Type: application/json" \
  -d '{
    "exam_type": "JEE_MAIN",
    "exam_date": "2026-04-15T00:00:00Z",
    "subject_preferences": {
      "Physics": 35,
      "Chemistry": 30,
      "Mathematics": 35
    }
  }'

# Get onboarding status
curl "http://localhost:8000/api/onboarding/status?parent_id=parent_abc123"
```

---

### Diagnostic Test Testing

```bash
# Generate diagnostic test
curl -X POST http://localhost:8000/api/diagnostic/generate \
  -H "Content-Type: application/json" \
  -d '{
    "child_id": "child_xyz789",
    "exam_type": "JEE_MAIN"
  }'

# Submit test answers
curl -X POST http://localhost:8000/api/diagnostic/submit \
  -H "Content-Type: application/json" \
  -d '{
    "test_id": "test_def456",
    "answers": {
      "q1": "B",
      "q2": "A",
      "q3": "C"
    }
  }'

# Get analytics
curl http://localhost:8000/api/analytics/analytics_ghi123
```

---

### Schedule Testing

```bash
# Generate schedule
curl -X POST http://localhost:8000/api/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "child_id": "child_xyz789",
    "analytics_id": "analytics_ghi123",
    "exam_date": "2026-04-15T00:00:00Z",
    "study_hours_per_day": 6
  }'

# Get schedule
curl http://localhost:8000/api/schedule/schedule_jkl456
```

---

### Payment Testing

```bash
# Create payment order
curl -X POST http://localhost:8000/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "parent_id": "parent_abc123",
    "plan_id": "premium_annual"
  }'

# Verify payment
curl -X POST http://localhost:8000/api/payment/verify \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "order_mno789",
    "razorpay_payment_id": "pay_MfG7xYz9Abc123",
    "razorpay_signature": "abc123def456..."
  }'
```

---

### Firebase Testing

```bash
# Test Firebase connection
python -c "
from utils.firebase_config import get_auth_client, get_firestore_client
auth = get_auth_client()
db = get_firestore_client()
print('✓ Firebase Auth connected')
print('✓ Firestore connected')
"

# List Firebase users
python -c "
from utils.firebase_config import get_auth_client
auth = get_auth_client()
users = auth.list_users()
for user in users.users[:5]:
    print(f'{user.email or user.phone_number} - {user.uid}')
"

# Query Firestore collection
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
docs = db.collection('parents').limit(5).get()
for doc in docs:
    print(f'{doc.id}: {doc.to_dict()}')
"
```

---

### Vertex AI / Gemini Testing

```bash
# Test Vertex AI connection
python -c "
from google.cloud import aiplatform
aiplatform.init(project='your-project-id', location='us-central1')
print('✓ Vertex AI initialized')
"

# Test Gemini API
curl -X POST "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello, how are you?"}]}]}'
```

---

### Database Testing

```bash
# Check Firestore collections
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
collections = ['parents', 'children', 'exam_selections', 'diagnostic_tests', 'analytics', 'schedules', 'subscriptions', 'transactions']
for coll in collections:
    count = len(db.collection(coll).limit(100).get())
    print(f'{coll}: {count} documents')
"
```

---

### API Documentation

```bash
# Open API documentation in browser
open http://localhost:8000/docs

# Or access via curl
curl http://localhost:8000/openapi.json
```

---

### Logs and Debugging

```bash
# View application logs
tail -f logs/app.log

# View error logs only
tail -f logs/app.log | grep ERROR

# Enable debug logging
export LOG_LEVEL=DEBUG
uvicorn main:app --reload --port 8000

# Check Python dependencies
pip list

# Verify environment variables
cat .env

# Check Python version
python --version
```

---

### Automated Test Scripts

```bash
# Run all tests
python -m pytest tests/

# Run specific test file
python -m pytest tests/test_auth.py

# Run with verbose output
python -m pytest tests/ -v

# Run with coverage
python -m pytest tests/ --cov=.

# Run integration tests
python tests/integration/test_onboarding_flow.py
```

---

## 🚀 Deployment Commands Reference

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install in development mode
pip install -e .

# Run development server
uvicorn main:app --reload --port 8000
```

---

### Docker Commands

```bash
# Build Docker image
docker build -t mentor-ai-backend:latest .

# Run Docker container
docker run -d \
  --name mentor-ai-backend \
  -p 8080:8080 \
  -e ENVIRONMENT=production \
  -v $(pwd)/.env:/app/.env \
  mentor-ai-backend:latest

# View container logs
docker logs -f mentor-ai-backend

# Stop container
docker stop mentor-ai-backend

# Remove container
docker rm mentor-ai-backend

# Push to Container Registry
docker tag mentor-ai-backend:latest gcr.io/PROJECT_ID/mentor-ai-backend:latest
docker push gcr.io/PROJECT_ID/mentor-ai-backend:latest
```

---

### Google Cloud Run Deployment

```bash
# Authenticate with Google Cloud
gcloud auth login

# Set project
gcloud config set project PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Build and deploy to Cloud Run
gcloud run deploy mentor-ai-backend \
  --image gcr.io/PROJECT_ID/mentor-ai-backend:latest \
  --platform managed \
  --region us-central1 \
  --port 8080 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300s \
  --min-instances 1 \
  --max-instances 10 \
  --allow-unauthenticated

# Get service URL
gcloud run services describe mentor-ai-backend \
  --region us-central1 \
  --format 'value(status.url)'

# View logs
gcloud run services logs read mentor-ai-backend \
  --region us-central1 \
  --limit 50

# Update environment variables
gcloud run services update mentor-ai-backend \
  --region us-central1 \
  --set-env-vars ENVIRONMENT=production

# Update secrets
gcloud run services update mentor-ai-backend \
  --region us-central1 \
  --set-secrets FIREBASE_CREDENTIALS=FIREBASE_CREDENTIALS:latest
```

---

### Secret Manager Commands

```bash
# Create secret
echo -n "secret-value" | gcloud secrets create SECRET_NAME --data-file=-

# Add secret version
echo -n "new-secret-value" | gcloud secrets versions add SECRET_NAME --data-file=-

# View secret
gcloud secrets versions access latest --secret=SECRET_NAME

# List secrets
gcloud secrets list

# Grant access to service account
gcloud secrets add-iam-policy-binding SECRET_NAME \
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
  --role="roles/secretmanager.secretAccessor"
```

---

### Cloud Build CI/CD

```bash
# Trigger manual build
gcloud builds submit --config cloudbuild.yaml

# Create build trigger
gcloud builds triggers create github \
  --name="deploy-backend-production" \
  --repo-name="your-repo-name" \
  --repo-owner="your-github-username" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml"

# List build triggers
gcloud builds triggers list

# View build history
gcloud builds list --limit 10

# View build logs
gcloud builds log BUILD_ID
```

---

### Database Backup and Restore

```bash
# Export Firestore data
gcloud firestore export gs://BUCKET_NAME/firestore-backup

# Import Firestore data
gcloud firestore import gs://BUCKET_NAME/firestore-backup

# Create backup bucket
gsutil mb gs://mentor-ai-backups

# List backups
gsutil ls gs://mentor-ai-backups/
```

---

### Monitoring and Alerts

```bash
# View Cloud Run metrics
gcloud run services describe mentor-ai-backend \
  --region us-central1 \
  --format json

# Create log-based alert
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="Backend Error Rate Alert" \
  --condition-display-name="Error rate > 5%"

# View service health
gcloud run services list --platform managed
```

---

## 📚 Quick Reference Tables

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unhandled server error |
| 503 | Service Unavailable | External service down |

---

### Exam Types

| Code | Name | Subjects |
|------|------|----------|
| `JEE_MAIN` | JEE Main | Physics, Chemistry, Mathematics |
| `JEE_ADVANCED` | JEE Advanced | Physics, Chemistry, Mathematics |
| `NEET` | NEET | Physics, Chemistry, Biology |
| `MHT_CET` | MHT CET | Physics, Chemistry, Mathematics/Biology |

---

### Language Codes

| Code | Language |
|------|----------|
| `en` | English |
| `hi` | Hindi |
| `mr` | Marathi |

---

### Teaching Involvement Levels

| Level | Description |
|-------|-------------|
| `high` | Parent actively teaches and monitors |
| `medium` | Parent provides guidance and support |
| `low` | Parent monitors progress only |

---

### Current Level Options

| Level | Description |
|-------|-------------|
| `beginner` | Just starting preparation |
| `intermediate` | Some preparation done |
| `advanced` | Well-prepared, needs refinement |

---

### Subscription Plans

| Plan ID | Name | Price (INR) | Duration |
|---------|------|-------------|----------|
| `free` | Free Plan | 0 | Unlimited |
| `premium_monthly` | Premium Monthly | 999 | 30 days |
| `premium_annual` | Premium Annual | 9999 | 365 days |

---

## 🔗 Useful Links

### Documentation
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Firebase Admin SDK**: https://firebase.google.com/docs/admin/setup
- **Vertex AI**: https://cloud.google.com/vertex-ai/docs
- **Gemini API**: https://ai.google.dev/docs
- **Razorpay API**: https://razorpay.com/docs/api/

### Consoles
- **Firebase Console**: https://console.firebase.google.com/
- **Google Cloud Console**: https://console.cloud.google.com/
- **Razorpay Dashboard**: https://dashboard.razorpay.com/
- **Google AI Studio**: https://aistudio.google.com/

### Tools
- **API Testing**: https://www.postman.com/
- **JSON Formatter**: https://jsonformatter.org/
- **JWT Decoder**: https://jwt.io/
- **Regex Tester**: https://regex101.com/

---

## 📞 Support and Troubleshooting

### Getting Help

1. **Check this appendix** for common issues and solutions
2. **Review task-specific TROUBLESHOOTING.md** files
3. **Check backend logs** for detailed error messages
4. **Test individual components** to isolate the issue
5. **Verify environment variables** are set correctly

### Debug Checklist

When something doesn't work:
- [ ] Backend server is running
- [ ] All environment variables are set
- [ ] Firebase credentials are valid
- [ ] External services (Firebase, Vertex AI, Razorpay) are accessible
- [ ] Dependencies are installed
- [ ] Firestore security rules allow access
- [ ] API endpoints are correct
- [ ] Request format matches expected schema
- [ ] Logs show detailed error information

### Common Commands for Debugging

```bash
# Check if server is running
curl http://localhost:8000/health

# View recent logs
tail -n 100 logs/app.log

# Test Firebase connection
python -c "from utils.firebase_config import get_auth_client; get_auth_client()"

# Verify environment variables
env | grep -E "FIREBASE|GEMINI|RAZORPAY"

# Check Python dependencies
pip list | grep -E "fastapi|firebase|google"

# Test API endpoint
curl -v http://localhost:8000/api/endpoint
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All monetary amounts are in paise (INR × 100)
- All authenticated endpoints require Bearer token
- Rate limits: 100 requests/minute per user
- File uploads: Max 10MB per file
- Response times: < 3s for AI operations, < 500ms for CRUD operations

---

**Last Updated**: November 25, 2025

**For frontend integration**, see: `vaishnavi-frontend/APPENDIX-frontend.md`

**For API contract details**, see: `shared/API-CONTRACT.md`

**For complete tutorial**, see: `README.md`


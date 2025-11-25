# Troubleshooting Guide for Day 2: Firebase Authentication

This document provides solutions to common issues you may encounter while implementing Firebase authentication.

---

## Issue 1: Email Verification Not Sending

### Symptoms
- POST /api/auth/verify/email/send returns 200 but no email received
- Verification code created in Firestore but email not delivered
- No errors in backend logs

### Possible Causes
1. Firebase email service not configured
2. Email in spam folder
3. Firebase project in development mode
4. Email template not set up

### Solutions

**Solution 1**: Check Firebase Email Configuration
```bash
# Verify in Firebase Console
1. Go to Authentication → Templates
2. Check "Email address verification" template
3. Ensure template is saved and enabled
```

**Solution 2**: Check Spam Folder
- Email verification emails often go to spam
- Check spam/junk folder in email client
- Add noreply@<your-project>.firebaseapp.com to contacts

**Solution 3**: Use Firestore Code Instead
For development, bypass email and use code from Firestore:
```bash
# Get verification code from Firestore
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
codes = db.collection('verification_codes').where('email', '==', 'test@example.com').get()
for code in codes:
    print(f'Code: {code.to_dict()[\"code\"]}')
"
```

**Solution 4**: Check Backend Logs
```bash
# Check for email sending errors
tail -f logs/app.log | grep -i email
```

### Prevention
- Set up custom email domain in Firebase Console
- Use SendGrid or similar service for production
- Test with multiple email providers (Gmail, Outlook, etc.)

---

## Issue 2: Phone OTP Not Working

### Symptoms
- POST /api/auth/verify/phone/send returns error
- Real phone numbers not receiving SMS
- Test phone numbers not working

### Possible Causes
1. Test phone numbers not configured
2. Real phone number used without SMS provider
3. Phone format incorrect
4. Firebase phone auth not enabled

### Solutions

**Solution 1**: Use Test Phone Numbers
```bash
# Configure test numbers in Firebase Console
1. Go to Authentication → Sign-in method → Phone
2. Scroll to "Phone numbers for testing"
3. Add: +919999999999 with code 123456
4. Save and try again
```

**Solution 2**: Check Phone Format
```bash
# Correct format: +[country_code][number]
✓ Correct: +919876543210
✗ Wrong: 9876543210
✗ Wrong: +91 9876543210 (no spaces)
✗ Wrong: 919876543210 (missing +)
```

**Solution 3**: Verify Phone Auth Enabled
```bash
# In Firebase Console
1. Go to Authentication → Sign-in method
2. Check "Phone" is enabled
3. If not, enable it and save
```

**Solution 4**: For Real Phone Numbers (Production)
```bash
# Firebase automatically sends SMS for real numbers
# But requires billing enabled on Google Cloud
1. Go to Google Cloud Console
2. Enable billing for your project
3. Firebase will use Cloud Functions to send SMS
```

### Prevention
- Always use test phone numbers in development
- Document test phone numbers in .env.example
- Enable billing before production deployment

---

## Issue 3: Invalid Credentials Error on Login

### Symptoms
- POST /api/auth/login/email returns 401
- Credentials are correct but login fails
- "Invalid email or password" error

### Possible Causes
1. Password is actually incorrect
2. User doesn't exist in Firebase Auth
3. User exists but not in Firestore
4. Email not verified (if required)

### Solutions

**Solution 1**: Verify User Exists
```bash
# Check Firebase Auth
python -c "
from utils.firebase_config import get_auth_client
auth = get_auth_client()
try:
    user = auth.get_user_by_email('test@example.com')
    print(f'User exists: {user.uid}')
except:
    print('User not found')
"
```

**Solution 2**: Reset Password
```bash
# In Firebase Console
1. Go to Authentication → Users
2. Find the user
3. Click three dots → Reset password
4. Use new password to login
```

**Solution 3**: Check Firestore Profile
```bash
# Verify parent profile exists
python -c "
from utils.firebase_config import get_firestore_client, get_auth_client
auth = get_auth_client()
db = get_firestore_client()
user = auth.get_user_by_email('test@example.com')
profile = db.collection('parents').document(user.uid).get()
if profile.exists:
    print('Profile exists')
else:
    print('Profile missing - run create_test_data.py')
"
```

**Solution 4**: Check Backend Logs
```bash
# See exact error from Firebase
tail -f logs/app.log | grep -i "login\|auth"
```

### Prevention
- Always create Firestore profile when creating Firebase Auth user
- Use strong, memorable passwords for test accounts
- Document test credentials in secure location

---

## Issue 4: Token Verification Fails

### Symptoms
- GET /api/auth/me returns 401
- "Invalid token" or "Token expired" error
- Token was just generated but doesn't work

### Possible Causes
1. JWT_SECRET mismatch
2. Token format incorrect
3. Token expired
4. Token revoked
5. Authorization header format wrong

### Solutions

**Solution 1**: Check Authorization Header Format
```bash
# Correct format
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Wrong formats
✗ curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  # Missing "Bearer"
✗ curl -H "Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  # Wrong header name
✗ curl -H "Authorization: Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  # Extra colon
```

**Solution 2**: Verify JWT_SECRET
```bash
# Check .env file
cat .env | grep JWT_SECRET

# If empty or default, generate new one
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Update .env and restart server
```

**Solution 3**: Check Token Expiry
```bash
# Decode token to see expiry (use jwt.io or)
python -c "
import jwt
token = 'YOUR_TOKEN_HERE'
decoded = jwt.decode(token, options={'verify_signature': False})
print(f'Expires at: {decoded[\"exp\"]}')
import time
if decoded['exp'] < time.time():
    print('Token expired!')
else:
    print('Token still valid')
"
```

**Solution 4**: Get Fresh Token
```bash
# Login again to get new token
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123456"}'
```

### Prevention
- Use long JWT_SECRET (32+ characters)
- Set reasonable token expiry (24 hours)
- Implement token refresh before expiry
- Log token verification errors for debugging

---

## Issue 5: Verification Code Expired

### Symptoms
- POST /api/auth/verify/email/confirm returns "Code expired"
- Code was just sent but already expired
- All codes expire immediately

### Possible Causes
1. System time incorrect
2. Expiry time too short
3. Code was sent more than 10 minutes ago
4. Timezone issues

### Solutions

**Solution 1**: Check System Time
```bash
# Verify system time is correct
date

# If wrong, sync time (Linux)
sudo ntpdate -s time.nist.gov

# Or (macOS)
sudo sntp -sS time.apple.com
```

**Solution 2**: Increase Expiry Time (Development Only)
```bash
# In .env file
PHONE_OTP_EXPIRY_MINUTES=30  # Increase from 10 to 30

# Restart server
```

**Solution 3**: Send New Code
```bash
# Request new verification code
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Use immediately
```

**Solution 4**: Check Firestore Timestamp
```bash
# Verify code expiry in Firestore
python -c "
from utils.firebase_config import get_firestore_client
from datetime import datetime
db = get_firestore_client()
codes = db.collection('verification_codes').where('email', '==', 'test@example.com').get()
for code in codes:
    data = code.to_dict()
    print(f'Created: {data[\"created_at\"]}')
    print(f'Expires: {data[\"expires_at\"]}')
    print(f'Now: {datetime.utcnow()}')
"
```

### Prevention
- Use UTC timestamps consistently
- Set reasonable expiry times (10 minutes for OTP)
- Clean up expired codes regularly
- Log timestamp comparisons for debugging

---

## Issue 6: Google OAuth Not Working

### Symptoms
- POST /api/auth/login/google returns error
- "Invalid ID token" error
- Token verification fails

### Possible Causes
1. Google OAuth not configured in Firebase
2. ID token expired
3. ID token from wrong project
4. GOOGLE_CLIENT_ID mismatch

### Solutions

**Solution 1**: Verify Google OAuth Configuration
```bash
# In Firebase Console
1. Go to Authentication → Sign-in method
2. Check "Google" is enabled
3. Verify support email is set
4. Check authorized domains include localhost
```

**Solution 2**: Get Fresh ID Token
```bash
# Google ID tokens expire after 1 hour
# Frontend must get new token from Google
# For testing, use Firebase Auth REST API or skip this test
```

**Solution 3**: Verify GOOGLE_CLIENT_ID
```bash
# Get from Firebase Console
1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Copy "Web API Key"
4. Update .env file:
GOOGLE_CLIENT_ID=your-web-api-key-here
```

**Solution 4**: Test with Frontend
```bash
# Google OAuth is best tested with frontend
# Backend-only testing is complex
# Skip this test until Day 2 frontend is ready
```

### Prevention
- Configure Google OAuth early
- Document OAuth setup steps
- Test with frontend integration
- Use Firebase Auth emulator for testing

---

## Issue 7: Firestore Permission Denied

### Symptoms
- 500 error when accessing Firestore
- "Permission denied" in logs
- Can't read/write to collections

### Possible Causes
1. Firestore security rules too restrictive
2. Service account lacks permissions
3. Firestore not initialized
4. Wrong project selected

### Solutions

**Solution 1**: Update Firestore Rules (Development)
```javascript
// In Firebase Console → Firestore → Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads/writes for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
// Publish rules
```

**Solution 2**: Verify Service Account Permissions
```bash
# Check service account has Firestore permissions
1. Go to Google Cloud Console
2. IAM & Admin → Service Accounts
3. Find your service account
4. Check roles include "Cloud Datastore User" or "Owner"
```

**Solution 3**: Check Firebase Initialization
```bash
# Test Firestore connection
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
print('Firestore connected')
"
```

**Solution 4**: Verify Project ID
```bash
# Check .env file
cat .env | grep GOOGLE_CLOUD_PROJECT

# Should match Firebase project ID
# Get from Firebase Console → Project Settings
```

### Prevention
- Use development rules during development
- Implement proper rules before production
- Test Firestore access early
- Document required permissions

---

## Issue 8: Session Not Persisting

### Symptoms
- User logs in but immediately logged out
- Token works once then fails
- Session not found in Firestore

### Possible Causes
1. Session not stored in Firestore
2. Session immediately revoked
3. Token not stored in frontend
4. Session collection not created

### Solutions

**Solution 1**: Verify Session Storage
```bash
# Check if session is created
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
sessions = db.collection('sessions').limit(5).get()
print(f'Found {len(sessions)} sessions')
for session in sessions:
    print(session.to_dict())
"
```

**Solution 2**: Check Login Service
```bash
# Verify login service stores session
# In services/login_service.py, ensure:
# 1. Session document is created
# 2. Token is stored (hashed)
# 3. Expiry is set correctly
```

**Solution 3**: Test Session Persistence
```bash
# Login and save token
TOKEN=$(curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test123456"}' \
  | jq -r '.token')

# Use token immediately
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Use token again (should still work)
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Solution 4**: Check Firestore Rules
```bash
# Ensure sessions collection is accessible
# Rules should allow authenticated users to read/write sessions
```

### Prevention
- Always store session on login
- Set appropriate session expiry
- Test session persistence
- Log session creation/retrieval

---

## Issue 9: Import Errors

### Symptoms
- ModuleNotFoundError when starting server
- "No module named 'services'" error
- Import errors for new files

### Possible Causes
1. Missing __init__.py files
2. Wrong import paths
3. Virtual environment not activated
4. Files not in correct location

### Solutions

**Solution 1**: Create __init__.py Files
```bash
# Ensure all directories have __init__.py
touch tushar-backend/services/__init__.py
touch tushar-backend/routers/__init__.py
touch tushar-backend/models/__init__.py
touch tushar-backend/middleware/__init__.py
touch tushar-backend/utils/__init__.py
```

**Solution 2**: Verify Import Paths
```python
# Correct imports (from project root)
from services.auth_service import register_parent_with_email
from models.auth_models import ParentEmailRegisterRequest
from utils.firebase_config import get_firestore_client

# Wrong imports
from tushar-backend.services.auth_service import ...  # Don't include project folder
from auth_service import ...  # Missing package name
```

**Solution 3**: Activate Virtual Environment
```bash
# Check if venv is activated
which python
# Should show: /path/to/tushar-backend/venv/bin/python

# If not, activate
cd tushar-backend
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

**Solution 4**: Verify File Structure
```bash
# Check all files exist
ls -la services/
ls -la routers/
ls -la models/
ls -la middleware/
ls -la utils/
```

### Prevention
- Always create __init__.py in new directories
- Use consistent import style
- Keep virtual environment activated
- Verify file structure matches expected layout

---

## Issue 10: Server Won't Start

### Symptoms
- uvicorn command fails
- "Address already in use" error
- Import errors on startup
- Firebase initialization fails

### Possible Causes
1. Port 8000 already in use
2. Import errors in code
3. Firebase credentials missing
4. Environment variables not loaded

### Solutions

**Solution 1**: Check Port Availability
```bash
# Check if port 8000 is in use
lsof -i :8000

# If in use, kill the process
kill -9 <PID>

# Or use different port
uvicorn main:app --reload --port 8001
```

**Solution 2**: Check for Syntax Errors
```bash
# Test Python syntax
python -m py_compile main.py
python -m py_compile services/*.py
python -m py_compile routers/*.py

# If errors, fix them and try again
```

**Solution 3**: Verify Firebase Credentials
```bash
# Check credentials file exists
ls -la credentials/firebase-service-account.json

# Check .env has correct path
cat .env | grep FIREBASE_SERVICE_ACCOUNT_PATH
```

**Solution 4**: Test Imports Manually
```bash
# Try importing main modules
python -c "from main import app; print('Main imports OK')"
python -c "from utils.firebase_config import get_firestore_client; print('Firebase imports OK')"
```

**Solution 5**: Check Logs
```bash
# Start server and check logs
uvicorn main:app --reload --port 8000 2>&1 | tee server.log

# Review logs for specific errors
cat server.log
```

### Prevention
- Always check port before starting
- Test imports after adding new files
- Verify credentials before starting
- Use logging to debug startup issues

---

## General Debugging Tips

### Enable Debug Logging
```bash
# In .env file
LOG_LEVEL=DEBUG

# Restart server
# Logs will show more details
```

### Check Backend Logs
```bash
# Real-time log monitoring
tail -f logs/app.log

# Search for errors
grep -i error logs/app.log

# Search for specific endpoint
grep -i "/api/auth/login" logs/app.log
```

### Test Individual Components
```bash
# Test Firebase connection
python -c "from utils.firebase_config import get_firestore_client; db = get_firestore_client(); print('OK')"

# Test service functions
python -c "from services.auth_service import register_parent_with_email; print('OK')"

# Test models
python -c "from models.auth_models import ParentEmailRegisterRequest; print('OK')"
```

### Use Python Debugger
```python
# Add to code where issue occurs
import pdb; pdb.set_trace()

# Run server, execution will pause at breakpoint
# Use commands: n (next), c (continue), p variable (print)
```

### Check Firebase Console
```bash
# Verify data in Firebase Console
1. Authentication → Users (check users exist)
2. Firestore → Data (check collections and documents)
3. Authentication → Templates (check email templates)
4. Authentication → Sign-in method (check enabled methods)
```

---

## Getting Help

If you're still stuck after trying these solutions:

1. **Check Backend Logs**: Most errors are logged with details
2. **Review Code**: Compare with PROMPTS.md expected output
3. **Test Step-by-Step**: Isolate the failing component
4. **Check Firebase Console**: Verify configuration
5. **Search Error Message**: Google the exact error message
6. **Ask for Help**: Provide error logs, steps to reproduce, and what you've tried

---

## Common Error Messages Reference

| Error Message | Likely Cause | Solution |
|--------------|--------------|----------|
| "Invalid email or password" | Wrong credentials or user doesn't exist | Verify credentials, check Firebase Auth |
| "Token expired" | JWT token past expiry time | Login again or use refresh token |
| "Token revoked" | User logged out | Login again |
| "Verification code expired" | Code older than 10 minutes | Request new code |
| "Permission denied" | Firestore rules too restrictive | Update Firestore rules |
| "User not found" | User doesn't exist in Firebase Auth | Create user or check email/phone |
| "Invalid ID token" | Google OAuth token invalid/expired | Get fresh token from Google |
| "Address already in use" | Port 8000 occupied | Kill process or use different port |
| "ModuleNotFoundError" | Missing __init__.py or wrong import | Create __init__.py files |
| "Firebase app already initialized" | Multiple Firebase initializations | Use singleton pattern |

---

## Prevention Checklist

To avoid common issues:

- [ ] Always activate virtual environment before working
- [ ] Create __init__.py in all new directories
- [ ] Test after each major change
- [ ] Keep Firebase Console open for verification
- [ ] Use test accounts for development
- [ ] Check logs regularly
- [ ] Commit working code frequently
- [ ] Document any custom configuration
- [ ] Use environment variables for all config
- [ ] Test error scenarios, not just happy path

---

## Next Steps

If all issues are resolved:
1. ✅ Complete all tests in TESTING.md
2. ✅ Verify EXPECTED-OUTCOME.md checklist
3. ✅ Review USER-FLOW.md for understanding
4. ✅ Move to Day 3: User Onboarding API

If issues persist:
1. Review this troubleshooting guide again
2. Check Firebase documentation
3. Review FastAPI documentation
4. Ask for help with specific error details

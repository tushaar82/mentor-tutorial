# Troubleshooting Guide for Day 1: Backend Project Setup

This document provides solutions to common issues you might encounter during Day 1 setup and testing.

---

## Table of Contents
1. [Python Installation Issues](#python-installation-issues)
2. [Virtual Environment Issues](#virtual-environment-issues)
3. [Dependency Installation Issues](#dependency-installation-issues)
4. [Firebase Configuration Issues](#firebase-configuration-issues)
5. [Server Startup Issues](#server-startup-issues)
6. [API Endpoint Issues](#api-endpoint-issues)
7. [Authentication Issues](#authentication-issues)
8. [Firestore Issues](#firestore-issues)
9. [CORS Issues](#cors-issues)
10. [Code Generation Issues](#code-generation-issues)

---

## Python Installation Issues

### Issue 1: Python version is too old

**Symptoms:**
```bash
python --version
# Shows: Python 3.9.x or lower
```

**Cause:** System has older Python version installed

**Solution:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.11 python3.11-venv

# macOS
brew install python@3.11

# Verify installation
python3.11 --version
```

**Alternative:** Use `python3.11` explicitly instead of `python` in all commands

---

### Issue 2: pip not found

**Symptoms:**
```bash
pip --version
# bash: pip: command not found
```

**Cause:** pip not installed or not in PATH

**Solution:**
```bash
# Ubuntu/Debian
sudo apt install python3-pip

# macOS
python3.11 -m ensurepip --upgrade

# Verify
pip3 --version
```

**Alternative:** Use `python3.11 -m pip` instead of `pip`

---

### Issue 3: Permission denied when installing Python

**Symptoms:**
```bash
sudo apt install python3.11
# E: Could not open lock file
```

**Cause:** Another package manager process is running

**Solution:**
```bash
# Wait for other processes to complete, then:
sudo apt update
sudo apt install python3.11

# Or kill the process:
sudo killall apt apt-get
sudo apt install python3.11
```

---

## Virtual Environment Issues

### Issue 4: Cannot create virtual environment

**Symptoms:**
```bash
python3.11 -m venv venv
# Error: No module named venv
```

**Cause:** venv module not installed

**Solution:**
```bash
# Ubuntu/Debian
sudo apt install python3.11-venv

# Then retry
python3.11 -m venv venv
```

---

### Issue 5: Virtual environment activation fails

**Symptoms:**
```bash
source venv/bin/activate
# bash: venv/bin/activate: No such file or directory
```

**Cause:** Virtual environment not created or wrong directory

**Solution:**
```bash
# Make sure you're in tushar-backend directory
cd tushar-backend
pwd  # Should show: /path/to/tushar-backend

# Create venv if it doesn't exist
python3.11 -m venv venv

# Activate
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

---

### Issue 6: Virtual environment not activated

**Symptoms:**
- Terminal prompt doesn't show `(venv)`
- `which python` shows system Python, not venv Python

**Cause:** Activation command not run or failed silently

**Solution:**
```bash
# Deactivate any existing venv
deactivate

# Navigate to correct directory
cd tushar-backend

# Activate again
source venv/bin/activate

# Verify
which python  # Should show: /path/to/tushar-backend/venv/bin/python
python --version  # Should show: Python 3.11.x
```

---

## Dependency Installation Issues

### Issue 7: pip install fails with "No module named pip"

**Symptoms:**
```bash
pip install -r requirements.txt
# No module named pip
```

**Cause:** pip not installed in virtual environment

**Solution:**
```bash
# Reinstall pip in venv
python -m ensurepip --upgrade

# Or recreate venv
deactivate
rm -rf venv
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### Issue 8: Dependency installation fails with network error

**Symptoms:**
```bash
pip install -r requirements.txt
# ERROR: Could not find a version that satisfies the requirement
# or: Network connection error
```

**Cause:** Network issues or PyPI unavailable

**Solution:**
```bash
# Try with different timeout
pip install -r requirements.txt --timeout 100

# Or use a mirror
pip install -r requirements.txt -i https://pypi.org/simple

# Or install packages one by one
pip install fastapi==0.104.1
pip install uvicorn[standard]==0.24.0
# ... etc
```

---

### Issue 9: Conflicting dependencies

**Symptoms:**
```bash
pip install -r requirements.txt
# ERROR: Cannot install package-a and package-b because these package versions have conflicting dependencies
```

**Cause:** Version conflicts in requirements.txt

**Solution:**
```bash
# Upgrade pip first
pip install --upgrade pip

# Try installing with --upgrade
pip install -r requirements.txt --upgrade

# Or create fresh venv
deactivate
rm -rf venv
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## Firebase Configuration Issues

### Issue 10: Firebase credentials file not found

**Symptoms:**
```bash
python test_firebase.py
# FileNotFoundError: [Errno 2] No such file or directory: './credentials/firebase-service-account.json'
```

**Cause:** Credentials file not in correct location or path wrong in .env

**Solution:**
```bash
# Check if file exists
ls -la credentials/firebase-service-account.json

# If not, check Downloads folder
ls ~/Downloads/*firebase*.json

# Move to correct location
mkdir -p credentials
mv ~/Downloads/mentor-ai-*-firebase-adminsdk-*.json credentials/firebase-service-account.json

# Verify .env has correct path
cat .env | grep FIREBASE_SERVICE_ACCOUNT_PATH
# Should show: FIREBASE_SERVICE_ACCOUNT_PATH=./credentials/firebase-service-account.json
```

---

### Issue 11: Firebase initialization fails with "Invalid credentials"

**Symptoms:**
```bash
python test_firebase.py
# google.auth.exceptions.DefaultCredentialsError: Invalid credentials
```

**Cause:** Credentials file is corrupted or wrong file

**Solution:**
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the new JSON file
4. Replace the old file:
```bash
mv ~/Downloads/mentor-ai-*-firebase-adminsdk-*.json credentials/firebase-service-account.json
```
5. Retry the test

---

### Issue 12: Firebase project not found

**Symptoms:**
```bash
python test_firebase.py
# firebase_admin.exceptions.FirebaseError: Project not found
```

**Cause:** Wrong project ID in .env or credentials

**Solution:**
```bash
# Check project ID in Firebase Console
# Go to: Project Settings → General → Project ID

# Update .env file
nano .env
# Set: GOOGLE_CLOUD_PROJECT=your-actual-project-id

# Verify credentials file has correct project_id
cat credentials/firebase-service-account.json | grep project_id
```

---

### Issue 13: Firestore not enabled

**Symptoms:**
```bash
python test_firebase.py
# google.api_core.exceptions.FailedPrecondition: Firestore API has not been used in project
```

**Cause:** Firestore not enabled in Firebase Console

**Solution:**
1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Choose location (e.g., us-central1)
4. Select "Start in test mode"
5. Click "Enable"
6. Wait 1-2 minutes for activation
7. Retry the test

---

## Server Startup Issues

### Issue 14: "Address already in use" error

**Symptoms:**
```bash
uvicorn main:app --reload --port 8000
# ERROR: [Errno 48] Address already in use
```

**Cause:** Another process is using port 8000

**Solution:**
```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
lsof -ti:8000 | xargs kill -9

# Or use a different port
uvicorn main:app --reload --port 8001
```

**On Windows:**
```bash
# Find process
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

### Issue 15: ModuleNotFoundError when starting server

**Symptoms:**
```bash
uvicorn main:app --reload
# ModuleNotFoundError: No module named 'fastapi'
```

**Cause:** Virtual environment not activated or dependencies not installed

**Solution:**
```bash
# Activate virtual environment
source venv/bin/activate

# Verify activation
which python  # Should show venv path

# Install dependencies
pip install -r requirements.txt

# Retry
uvicorn main:app --reload --port 8000
```

---

### Issue 16: Import errors for local modules

**Symptoms:**
```bash
uvicorn main:app --reload
# ModuleNotFoundError: No module named 'routers'
```

**Cause:** Missing __init__.py files or wrong directory structure

**Solution:**
```bash
# Create missing __init__.py files
touch models/__init__.py
touch routers/__init__.py
touch services/__init__.py
touch utils/__init__.py

# Verify structure
ls -la models/ routers/ services/ utils/

# Each should have __init__.py
```

---

### Issue 17: Firebase initialization error on startup

**Symptoms:**
```bash
uvicorn main:app --reload
# ValueError: The default Firebase app already exists
```

**Cause:** Firebase initialized multiple times

**Solution:**
Edit `utils/firebase_config.py` to check if app exists:
```python
import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    # Check if already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate(os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH'))
        firebase_admin.initialize_app(cred)
```

---

## API Endpoint Issues

### Issue 18: 404 Not Found for endpoints

**Symptoms:**
```bash
curl http://localhost:8000/api/auth/register/parent/email
# {"detail": "Not Found"}
```

**Cause:** Router not included in main.py or wrong URL

**Solution:**
```bash
# Check main.py includes router
grep "include_router" main.py
# Should show: app.include_router(auth_router, prefix="/api/auth")

# Verify exact URL
curl http://localhost:8000/api/auth/register/parent/email

# Check API docs for correct URL
# Open: http://localhost:8000/docs
```

---

### Issue 19: 405 Method Not Allowed

**Symptoms:**
```bash
curl http://localhost:8000/api/auth/register/parent/email
# {"detail": "Method Not Allowed"}
```

**Cause:** Using GET instead of POST

**Solution:**
```bash
# Use POST method with -X POST
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123", "language": "en"}'
```

---

### Issue 20: 422 Unprocessable Entity

**Symptoms:**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -d '{"email": "test@example.com"}'
# {"detail": [{"loc": ["body", "password"], "msg": "field required"}]}
```

**Cause:** Missing required fields or invalid data

**Solution:**
```bash
# Include all required fields
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123",
    "language": "en"
  }'

# Check Pydantic model for required fields
```

---

## Authentication Issues

### Issue 21: Email registration fails with "Email already exists"

**Symptoms:**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email ...
# {"detail": "Email already registered"}
```

**Cause:** Email already used in previous test

**Solution:**
```bash
# Use a different email
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{"email": "newtest@example.com", "password": "SecurePass123", "language": "en"}'

# Or delete user from Firebase Console:
# Firebase Console → Authentication → Find user → Delete
```

---

### Issue 22: Phone registration fails with "Invalid phone number"

**Symptoms:**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/phone ...
# {"detail": "Invalid phone number format"}
```

**Cause:** Phone number not in +91XXXXXXXXXX format

**Solution:**
```bash
# Use correct format: +91 followed by 10 digits
curl -X POST http://localhost:8000/api/auth/register/parent/phone \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "language": "hi"}'

# Not: 9876543210 or 919876543210
```

---

### Issue 23: Google OAuth fails with "Invalid ID token"

**Symptoms:**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/google ...
# {"detail": "Invalid Google ID token"}
```

**Cause:** Using test token instead of real Google ID token

**Solution:**
This is expected behavior for Day 1. Google OAuth requires:
1. Frontend integration with Google Sign-In
2. Real ID token from Google
3. Will be fully tested in integration phase

For now, verify:
- ✅ Endpoint exists
- ✅ Accepts requests
- ✅ Rejects invalid tokens gracefully
- ✅ Server doesn't crash

---

## Firestore Issues

### Issue 24: Data not appearing in Firestore

**Symptoms:**
- Registration succeeds (201 response)
- But no document in Firestore Console

**Cause:** Firestore write failed silently or wrong collection

**Solution:**
```bash
# Check server logs for errors
# Look for Firestore write errors

# Verify Firestore is enabled
# Firebase Console → Firestore Database → Should show "Cloud Firestore"

# Check collection name in code
grep "collection" services/auth_service.py
# Should be: db.collection('parents')

# Try manual write test
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
db.collection('test').document('test').set({'test': 'data'})
print('Write successful')
"
```

---

### Issue 25: Firestore permission denied

**Symptoms:**
```bash
# Server logs show:
# google.api_core.exceptions.PermissionDenied: Missing or insufficient permissions
```

**Cause:** Firestore security rules too restrictive

**Solution:**
1. Go to Firebase Console → Firestore Database → Rules
2. For development, use test mode rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
3. Click "Publish"
4. **Note:** Change to secure rules before production!

---

## CORS Issues

### Issue 26: CORS error in browser

**Symptoms:**
```
Access to fetch at 'http://localhost:8000/api/auth/register/parent/email' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Cause:** CORS not configured or wrong origin

**Solution:**
Check `main.py` has CORS middleware:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Restart server after changes.

---

### Issue 27: CORS preflight fails

**Symptoms:**
```
OPTIONS request returns 403 or 404
```

**Cause:** CORS middleware not handling OPTIONS requests

**Solution:**
Ensure CORS middleware is added BEFORE routes:
```python
# In main.py
app = FastAPI()

# Add CORS middleware FIRST
app.add_middleware(CORSMiddleware, ...)

# Then include routers
app.include_router(auth_router, ...)
```

---

## Code Generation Issues

### Issue 28: AI coding agent generates incomplete code

**Symptoms:**
- Code has `# TODO` comments
- Functions have `pass` statements
- Missing imports

**Cause:** Prompt not specific enough or AI didn't complete

**Solution:**
1. Use the exact prompts from PROMPTS.md
2. If using Windsurf/Copilot, add more specific comments:
```python
# Add complete implementation here, no TODOs
# Include all imports
# Add error handling
```
3. If using ChatGPT/Claude, ask for complete code:
```
Please provide complete, runnable code with no placeholders or TODOs.
Include all necessary imports and error handling.
```

---

### Issue 29: Generated code has syntax errors

**Symptoms:**
```bash
python main.py
# SyntaxError: invalid syntax
```

**Cause:** Copy-paste error or incomplete code generation

**Solution:**
```bash
# Check syntax
python -m py_compile main.py

# If errors, review the file
# Look for:
# - Missing colons (:)
# - Unmatched brackets
# - Incorrect indentation

# Regenerate the file using PROMPTS.md
```

---

### Issue 30: Import errors after code generation

**Symptoms:**
```bash
python main.py
# ImportError: cannot import name 'auth_router' from 'routers'
```

**Cause:** Missing __init__.py or wrong import path

**Solution:**
```bash
# Create __init__.py files
touch routers/__init__.py
touch models/__init__.py
touch services/__init__.py
touch utils/__init__.py

# Check import statement in main.py
# Should be: from routers.auth_router import router as auth_router
# Not: from routers import auth_router
```

---

## General Debugging Tips

### Enable Debug Logging

Add to main.py:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check Server Logs

Server logs show detailed error information:
```bash
# Run server and watch logs
uvicorn main:app --reload --log-level debug
```

### Test Individual Components

Test each component separately:
```bash
# Test Firebase connection
python -c "from utils.firebase_config import get_firestore_client; print(get_firestore_client())"

# Test model imports
python -c "from models.auth_models import ParentEmailRegisterRequest; print('OK')"

# Test service imports
python -c "from services.auth_service import register_parent_with_email; print('OK')"
```

### Verify Environment Variables

```bash
# Check .env file
cat .env

# Test loading
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH'))"
```

### Reset Everything

If all else fails, start fresh:
```bash
# Deactivate venv
deactivate

# Remove venv
rm -rf venv

# Recreate venv
python3.11 -m venv venv
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Restart server
uvicorn main:app --reload --port 8000
```

---

## Still Having Issues?

### Checklist Before Asking for Help

- [ ] Read the error message carefully
- [ ] Checked this troubleshooting guide
- [ ] Verified all configuration steps completed
- [ ] Tested individual components
- [ ] Checked Firebase Console for errors
- [ ] Reviewed generated code for syntax errors
- [ ] Tried restarting the server
- [ ] Checked virtual environment is activated

### When Asking for Help

Provide:
1. **What you're trying to do**: "Testing email registration endpoint"
2. **What happened**: "Got 500 error"
3. **Error message**: Full error from server logs
4. **What you've tried**: "Checked Firebase credentials, restarted server"
5. **Environment**: "Ubuntu 22.04, Python 3.11.5"

### Useful Commands for Debugging

```bash
# Check Python version
python --version

# Check installed packages
pip list

# Check virtual environment
which python

# Check file structure
tree -L 2 -I 'venv|__pycache__'

# Check environment variables
cat .env

# Check Firebase credentials
ls -la credentials/

# Check server logs
# (run server and copy error messages)

# Test Firebase connection
python test_firebase.py

# Check syntax
python -m py_compile main.py
```

---

## Quick Reference: Common Fixes

| Issue | Quick Fix |
|-------|-----------|
| Server won't start | `source venv/bin/activate && pip install -r requirements.txt` |
| Port in use | `lsof -ti:8000 \| xargs kill -9` |
| Firebase error | Check `.env` and `credentials/firebase-service-account.json` |
| Import error | Create `__init__.py` files in all folders |
| 404 error | Check URL and router configuration in `main.py` |
| 422 error | Include all required fields in request |
| CORS error | Check CORS middleware in `main.py` |
| Duplicate email | Use different email or delete user from Firebase |

---

**Remember:** Most issues are configuration-related. Double-check CONFIGURATION.md steps before debugging code!

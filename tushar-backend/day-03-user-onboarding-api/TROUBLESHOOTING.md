# Troubleshooting Guide for Day 3: User Onboarding API

This document provides solutions to common issues you might encounter while implementing and testing the onboarding API.

---

## General Issues

### Issue 1: Server Won't Start

**Symptoms**:
```
ModuleNotFoundError: No module named 'routers.preferences_router'
```

**Possible Causes**:
1. Router files not created
2. Import paths incorrect
3. Python path not set correctly

**Solutions**:

1. **Verify all router files exist**:
```bash
ls -la tushar-backend/routers/
# Should show:
# preferences_router.py
# child_router.py
# exam_router.py
```

2. **Check import statements in main.py**:
```python
# Correct imports
from routers.preferences_router import router as preferences_router
from routers.child_router import router as child_router
from routers.exam_router import router as exam_router
```

3. **Verify Python path**:
```bash
# Run from tushar-backend directory
cd tushar-backend
python -c "import sys; print(sys.path)"
```

4. **Restart server**:
```bash
# Stop server (Ctrl+C)
# Start again
uvicorn main:app --reload
```

---

### Issue 2: Import Errors for Models or Services

**Symptoms**:
```
ImportError: cannot import name 'PreferencesRequest' from 'models.preferences_models'
```

**Possible Causes**:
1. Model files not created
2. Class names don't match imports
3. Syntax errors in model files

**Solutions**:

1. **Verify model files exist**:
```bash
ls -la tushar-backend/models/
# Should show:
# preferences_models.py
# child_models.py
# exam_models.py
```

2. **Check class names match**:
```python
# In preferences_models.py
class PreferencesRequest(BaseModel):  # Must match import
    ...

# In preferences_router.py
from models.preferences_models import PreferencesRequest  # Must match class name
```

3. **Check for syntax errors**:
```bash
python -m py_compile tushar-backend/models/preferences_models.py
# Should show no errors
```

4. **Verify Pydantic imports**:
```python
# Correct Pydantic v2 imports
from pydantic import BaseModel, Field, field_validator
```

---

## Firestore Issues

### Issue 3: Firestore Permission Denied

**Symptoms**:
```
google.api_core.exceptions.PermissionDenied: 403 Missing or insufficient permissions
```

**Possible Causes**:
1. Service account key not configured
2. Firestore not enabled
3. Service account lacks permissions

**Solutions**:

1. **Verify service account key path**:
```bash
# Check .env file
cat .env | grep FIREBASE_SERVICE_ACCOUNT_KEY
# Should show path to serviceAccountKey.json

# Verify file exists
ls -la path/to/serviceAccountKey.json
```

2. **Check Firestore is enabled**:
- Open Firebase Console
- Navigate to Firestore Database
- Verify database exists

3. **Verify service account permissions**:
- Open Firebase Console → Project Settings → Service Accounts
- Verify service account has "Firebase Admin SDK" role

4. **Update Firestore security rules** (for development):
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

5. **Re-initialize Firebase**:
```python
# In your service file
import firebase_admin
from firebase_admin import credentials, firestore

# Check if already initialized
try:
    app = firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
```

---

### Issue 4: Firestore Connection Timeout

**Symptoms**:
```
google.api_core.exceptions.DeadlineExceeded: Deadline of 60.0s exceeded
```

**Possible Causes**:
1. No internet connection
2. Firewall blocking Google APIs
3. Firestore service down

**Solutions**:

1. **Check internet connection**:
```bash
ping google.com
```

2. **Test Firestore connectivity**:
```bash
curl https://firestore.googleapis.com
# Should return HTML (not connection refused)
```

3. **Check Google Cloud status**:
- Visit: https://status.cloud.google.com
- Verify Firestore is operational

4. **Increase timeout** (temporary workaround):
```python
# In service file
db = firestore.client()
db._client._http.timeout = 120  # Increase to 120 seconds
```

---

### Issue 5: Document Not Found (404)

**Symptoms**:
```
HTTPException: 404 Not Found - Preferences not found for parent
```

**Possible Causes**:
1. Document doesn't exist in Firestore
2. Wrong parent_id used
3. Collection path incorrect

**Solutions**:

1. **Verify document exists in Firestore Console**:
- Open Firebase Console → Firestore Database
- Navigate to collection
- Check if document with parent_id exists

2. **Check parent_id is correct**:
```bash
# Use the parent_id from registration
curl "http://localhost:8000/api/onboarding/preferences?parent_id=CORRECT_PARENT_ID"
```

3. **Verify collection path**:
```python
# Correct path for preferences
db.collection('parents').document(parent_id).collection('preferences').document('data')

# Or simpler structure
db.collection('parents').document(parent_id).get()
```

4. **Create document first**:
```bash
# Run POST request before GET
curl -X POST "http://localhost:8000/api/onboarding/preferences?parent_id=parent_abc123" \
  -H "Content-Type: application/json" \
  -d '{"language": "en", ...}'
```

---

## Validation Issues

### Issue 6: Age Validation Fails

**Symptoms**:
```
422 Unprocessable Entity: Age must be between 14 and 19
```

**Possible Causes**:
1. Age outside valid range
2. Age sent as string instead of integer
3. Validator logic incorrect

**Solutions**:

1. **Check age value**:
```json
{
  "age": 16  // Correct: integer between 14-19
}
```

2. **Verify data type**:
```json
// Wrong
{"age": "16"}  // String

// Correct
{"age": 16}  // Integer
```

3. **Check validator in model**:
```python
class ChildProfileRequest(BaseModel):
    age: int
    
    @field_validator('age')
    def validate_age(cls, v):
        if v < 14 or v > 19:
            raise ValueError('Age must be between 14 and 19')
        return v
```

---

### Issue 7: Subject Weightages Don't Sum to 100

**Symptoms**:
```
400 Bad Request: Subject weightages must sum to 100. Current sum: 95
```

**Possible Causes**:
1. Math error in weightages
2. Missing subject
3. Validator too strict (floating point issues)

**Solutions**:

1. **Verify weightages sum to 100**:
```json
{
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  }
}
// 35 + 30 + 35 = 100 ✓
```

2. **Check all subjects included**:
```json
// For JEE: Must have Physics, Chemistry, Mathematics
// For NEET: Must have Physics, Chemistry, Biology
```

3. **Handle floating point precision**:
```python
def validate_weightages(preferences: dict) -> bool:
    total = sum(preferences.values())
    # Allow small floating point errors
    return abs(total - 100) < 0.01
```

---

### Issue 8: Exam Date Validation Fails

**Symptoms**:
```
400 Bad Request: Exam date must be in the future
```

**Possible Causes**:
1. Date is in the past
2. Date format incorrect
3. Timezone issues

**Solutions**:

1. **Use future date**:
```json
{
  "exam_date": "2026-04-15T00:00:00Z"  // Future date
}
```

2. **Check date format**:
```json
// Correct ISO 8601 format
"exam_date": "2026-04-15T00:00:00Z"

// Also acceptable
"exam_date": "2026-04-15T00:00:00+00:00"
```

3. **Handle timezone**:
```python
from datetime import datetime, timezone

def validate_exam_date(exam_date: datetime) -> bool:
    now = datetime.now(timezone.utc)
    # Ensure both dates are timezone-aware
    if exam_date.tzinfo is None:
        exam_date = exam_date.replace(tzinfo=timezone.utc)
    return exam_date > now
```

4. **Get available dates first**:
```bash
# Check which dates are valid
curl http://localhost:8000/api/onboarding/exams/available
```

---

## Business Logic Issues

### Issue 9: One-Child Restriction Not Working

**Symptoms**:
- Parent can create multiple children
- No error when creating second child

**Possible Causes**:
1. `has_child()` method not implemented
2. Check not called before creating child
3. Query logic incorrect

**Solutions**:

1. **Verify has_child() implementation**:
```python
def has_child(self, parent_id: str) -> bool:
    children = db.collection('children').where('parent_id', '==', parent_id).limit(1).get()
    return len(children) > 0
```

2. **Check called in create_child_profile()**:
```python
def create_child_profile(self, parent_id: str, profile: ChildProfileRequest):
    # Must check first
    if self.has_child(parent_id):
        raise HTTPException(
            status_code=400,
            detail="Parent can only have one child profile"
        )
    # Then create child
    ...
```

3. **Test the restriction**:
```bash
# Create first child (should succeed)
curl -X POST "http://localhost:8000/api/onboarding/child?parent_id=test123" \
  -H "Content-Type: application/json" \
  -d '{"name": "Child 1", "age": 16, "grade": 11, "current_level": "intermediate"}'

# Create second child (should fail with 400)
curl -X POST "http://localhost:8000/api/onboarding/child?parent_id=test123" \
  -H "Content-Type: application/json" \
  -d '{"name": "Child 2", "age": 15, "grade": 10, "current_level": "beginner"}'
```

---

### Issue 10: Diagnostic Test Not Created

**Symptoms**:
- Exam selection succeeds
- But diagnostic_test_id is null or missing

**Possible Causes**:
1. `create_diagnostic_test()` not called
2. Test creation fails silently
3. Test ID not returned in response

**Solutions**:

1. **Verify create_diagnostic_test() is called**:
```python
def select_exam(self, child_id: str, parent_id: str, selection: ExamSelectionRequest):
    # ... validation ...
    
    # Must create diagnostic test
    diagnostic_test = self.create_diagnostic_test(child_id, selection.exam_type)
    
    # Must include test_id in response
    return ExamSelectionResponse(
        ...
        diagnostic_test_id=diagnostic_test.test_id,
        ...
    )
```

2. **Check test creation logic**:
```python
def create_diagnostic_test(self, child_id: str, exam_type: str) -> DiagnosticTestSchedule:
    test_id = str(uuid.uuid4())
    scheduled_date = datetime.now(timezone.utc) + timedelta(days=1)
    
    test_data = {
        'test_id': test_id,
        'child_id': child_id,
        'exam_type': exam_type,
        'scheduled_date': scheduled_date,
        'duration_minutes': 180,
        'total_questions': 200,
        'status': 'scheduled'
    }
    
    # Store in Firestore
    db.collection('diagnostic_tests').document(test_id).set(test_data)
    
    return DiagnosticTestSchedule(**test_data)
```

3. **Verify test in Firestore**:
- Open Firebase Console → Firestore Database
- Check `diagnostic_tests` collection
- Verify document exists with correct test_id

---

## API Issues

### Issue 11: 422 Unprocessable Entity

**Symptoms**:
```
422 Unprocessable Entity
{
  "detail": [
    {
      "loc": ["body", "language"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Possible Causes**:
1. Required field missing in request
2. Field name misspelled
3. Wrong data type

**Solutions**:

1. **Check all required fields included**:
```json
// Preferences - all required
{
  "language": "en",  // Required
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high"  // Required
}
```

2. **Verify field names match model**:
```python
# Model definition
class PreferencesRequest(BaseModel):
    language: str  # Must use exact name in request
    teaching_involvement: str
```

3. **Check data types**:
```json
{
  "age": 16,  // Integer, not "16"
  "email_notifications": true,  // Boolean, not "true"
  "subject_preferences": {...}  // Object, not string
}
```

---

### Issue 12: CORS Errors in Browser

**Symptoms**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Possible Causes**:
1. CORS middleware not configured
2. Frontend origin not allowed
3. Credentials not allowed

**Solutions**:

1. **Add CORS middleware in main.py**:
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

2. **Allow multiple origins**:
```python
allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001",
    "https://your-frontend.com"
]
```

3. **For development, allow all origins** (not for production):
```python
allow_origins=["*"]
```

---

## Testing Issues

### Issue 13: curl Commands Not Working

**Symptoms**:
```
curl: (7) Failed to connect to localhost port 8000
```

**Possible Causes**:
1. Server not running
2. Wrong port
3. Firewall blocking

**Solutions**:

1. **Verify server is running**:
```bash
# Check if process exists
ps aux | grep uvicorn

# Check if port is listening
lsof -i :8000
# or
netstat -an | grep 8000
```

2. **Start server if not running**:
```bash
cd tushar-backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. **Try different host**:
```bash
# Instead of localhost, try 127.0.0.1
curl http://127.0.0.1:8000/api/onboarding/exams/available
```

4. **Check firewall**:
```bash
# On Linux
sudo ufw status

# On macOS
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

---

### Issue 14: Test Data Not Persisting

**Symptoms**:
- POST request succeeds
- GET request returns 404
- Data not in Firestore Console

**Possible Causes**:
1. Using Firestore emulator instead of real Firestore
2. Data stored in wrong collection
3. Transaction not committed

**Solutions**:

1. **Verify using real Firestore**:
```python
# Check Firebase initialization
import firebase_admin
app = firebase_admin.get_app()
print(app.project_id)  # Should show your real project ID
```

2. **Check collection path**:
```python
# Correct path
db.collection('children').document(child_id).set(data)

# Wrong path (typo)
db.collection('childrens').document(child_id).set(data)  # Wrong!
```

3. **Verify data in Firestore Console**:
- Open Firebase Console
- Go to Firestore Database
- Navigate to collection
- Check if document exists

4. **Add logging**:
```python
import logging

def create_child_profile(self, parent_id: str, profile: ChildProfileRequest):
    logging.info(f"Creating child for parent: {parent_id}")
    # ... create child ...
    logging.info(f"Child created with ID: {child_id}")
```

---

## Performance Issues

### Issue 15: Slow API Responses

**Symptoms**:
- API takes > 2 seconds to respond
- Timeout errors

**Possible Causes**:
1. Multiple Firestore queries
2. No indexing
3. Large data transfers

**Solutions**:

1. **Optimize Firestore queries**:
```python
# Bad: Multiple queries
preferences = get_preferences(parent_id)
child = get_child(parent_id)
exam = get_exam(child_id)

# Good: Batch get
docs = db.get_all([
    db.collection('parents').document(parent_id),
    db.collection('children').document(child_id),
    db.collection('exam_selections').document(child_id)
])
```

2. **Add Firestore indexes**:
- Open Firebase Console → Firestore Database → Indexes
- Create composite index for common queries

3. **Cache frequently accessed data**:
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_available_exams():
    # Cached for repeated calls
    return calculate_exam_dates()
```

4. **Use async operations**:
```python
# If using async FastAPI
async def get_preferences(parent_id: str):
    doc = await db.collection('parents').document(parent_id).get()
    return doc.to_dict()
```

---

## Quick Diagnostic Checklist

When something isn't working, check these in order:

1. **Server Running?**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Firestore Connected?**
   ```bash
   python test_firestore.py
   ```

3. **All Files Created?**
   ```bash
   ls -la tushar-backend/models/
   ls -la tushar-backend/services/
   ls -la tushar-backend/routers/
   ```

4. **No Syntax Errors?**
   ```bash
   python -m py_compile tushar-backend/models/*.py
   python -m py_compile tushar-backend/services/*.py
   python -m py_compile tushar-backend/routers/*.py
   ```

5. **Correct Request Format?**
   - Check Content-Type header
   - Verify JSON syntax
   - Confirm all required fields

6. **Check Logs**:
   ```bash
   # Server logs show errors
   tail -f logs/app.log
   ```

---

## Still Stuck?

If you've tried everything and still have issues:

1. **Check server logs** for detailed error messages
2. **Verify all prerequisites** from CONFIGURATION.md are complete
3. **Review TESTING.md** to ensure you're testing correctly
4. **Compare your code** with the prompts in PROMPTS.md
5. **Check Firestore Console** to verify data structure

**Common mistakes**:
- Forgetting to start the server
- Using wrong parent_id or child_id
- Misspelling field names
- Wrong data types (string vs integer)
- Missing required fields
- Not checking one-child restriction


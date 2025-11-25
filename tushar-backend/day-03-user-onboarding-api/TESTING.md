# Testing Guide for Day 3: User Onboarding API

This document provides comprehensive testing instructions for the complete onboarding flow. Test each endpoint independently and then verify the end-to-end flow.

---

## Prerequisites

Before testing:
- ✅ Configuration completed (CONFIGURATION.md)
- ✅ Backend server running on http://localhost:8000
- ✅ Test parent account created
- ✅ Parent ID saved from configuration

**Test Parent ID**: Replace `{parent_id}` in all tests with your actual parent ID from configuration.

---

## Test 1: Get Available Exams

### Purpose
Verify the API returns available exams with dates and subjects.

### Steps
```bash
curl -X GET http://localhost:8000/api/onboarding/exams/available
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Returns list of 3 exams (JEE_MAIN, JEE_ADVANCED, NEET)
- ✅ Each exam has available_dates (future dates only)
- ✅ Each exam has correct subjects
- ✅ Dates are in "YYYY-MM-DD" format

### If It Fails
- **Issue**: "Connection refused"
- **Fix**: Ensure backend server is running
- **Issue**: "Empty dates array"
- **Fix**: Check date_utils.py logic, ensure it returns future dates

---

## Test 2: Create Parent Preferences

### Purpose
Set parent preferences for language, notifications, and teaching involvement.

### Steps
```bash
curl -X POST "http://localhost:8000/api/onboarding/preferences?parent_id={parent_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "email_notifications": true,
    "sms_notifications": true,
    "push_notifications": false,
    "teaching_involvement": "high"
  }'
```

**Replace `{parent_id}`** with your actual parent ID.

### Expected Result
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

### Success Criteria
- ✅ Status code: 201
- ✅ Returns all preference fields
- ✅ Includes parent_id, created_at, updated_at
- ✅ Data stored in Firestore (check Firebase Console)

### If It Fails
- **Issue**: "Parent already has preferences"
- **Fix**: This is expected if you run the test twice. Use Test 3 to update instead
- **Issue**: "Firestore permission denied"
- **Fix**: Check Firestore security rules, verify service account permissions

---

## Test 3: Get Parent Preferences

### Purpose
Retrieve existing parent preferences.

### Steps
```bash
curl -X GET "http://localhost:8000/api/onboarding/preferences?parent_id={parent_id}"
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Returns same data as Test 2
- ✅ All fields present

### If It Fails
- **Issue**: "404 Not Found"
- **Fix**: Run Test 2 first to create preferences

---

## Test 4: Update Parent Preferences

### Purpose
Update one or more preference fields.

### Steps
```bash
curl -X PUT "http://localhost:8000/api/onboarding/preferences?parent_id={parent_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "hi",
    "teaching_involvement": "medium"
  }'
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Updated fields reflect new values (language: "hi", teaching_involvement: "medium")
- ✅ Unchanged fields remain the same
- ✅ updated_at timestamp is newer than created_at

### If It Fails
- **Issue**: "404 Not Found"
- **Fix**: Run Test 2 first to create preferences

---


## Test 5: Create Child Profile

### Purpose
Create a child profile (enforces one-child limit).

### Steps
```bash
curl -X POST "http://localhost:8000/api/onboarding/child?parent_id={parent_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "age": 16,
    "grade": 11,
    "current_level": "intermediate"
  }'
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 201
- ✅ Returns all child fields
- ✅ Includes generated child_id
- ✅ Includes parent_id linkage
- ✅ Data stored in Firestore

### Save This Information
**Important**: Save the `child_id` from the response. You'll need it for subsequent tests.

Example: `child_xyz789`

### If It Fails
- **Issue**: "400 Parent can only have one child profile"
- **Fix**: This is expected if you already created a child. Use Test 8 to delete first, then retry
- **Issue**: "Age must be between 14 and 19"
- **Fix**: Adjust age in request to be within valid range

---

## Test 6: Get Child Profile

### Purpose
Retrieve child profile by parent ID.

### Steps
```bash
curl -X GET "http://localhost:8000/api/onboarding/child?parent_id={parent_id}"
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Returns same data as Test 5
- ✅ All fields present

### If It Fails
- **Issue**: "404 Not Found"
- **Fix**: Run Test 5 first to create child profile

---

## Test 7: Update Child Profile

### Purpose
Update child profile information.

### Steps
```bash
curl -X PUT "http://localhost:8000/api/onboarding/child/{child_id}?parent_id={parent_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "current_level": "advanced",
    "grade": 12
  }'
```

**Replace `{child_id}`** with the child_id from Test 5.

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Updated fields reflect new values (grade: 12, current_level: "advanced")
- ✅ Unchanged fields remain the same
- ✅ updated_at timestamp is newer

### If It Fails
- **Issue**: "404 Not Found"
- **Fix**: Verify child_id is correct
- **Issue**: "403 Forbidden"
- **Fix**: Verify parent_id matches the child's parent

---

## Test 8: Delete Child Profile (Optional)

### Purpose
Delete child profile to test one-child restriction.

### Steps
```bash
curl -X DELETE "http://localhost:8000/api/onboarding/child/{child_id}?parent_id={parent_id}"
```

### Expected Result
```json
{
  "message": "Child profile deleted successfully",
  "child_id": "child_xyz789"
}
```

### Success Criteria
- ✅ Status code: 200
- ✅ Returns success message
- ✅ Child removed from Firestore

### Note
After deleting, you can create a new child profile (run Test 5 again).

---

## Test 9: Select Exam and Schedule Diagnostic Test

### Purpose
Select target exam, set exam date, and automatically schedule diagnostic test.

### Steps
```bash
curl -X POST "http://localhost:8000/api/onboarding/exam/select?parent_id={parent_id}&child_id={child_id}" \
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
```

**Important**: Use a future date from Test 1 results.

### Expected Result
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

### Success Criteria
- ✅ Status code: 201
- ✅ Returns exam selection with all fields
- ✅ Includes calculated days_until_exam
- ✅ Includes generated diagnostic_test_id
- ✅ Subject weightages sum to 100
- ✅ Data stored in Firestore

### Save This Information
**Important**: Save the `diagnostic_test_id` from the response.

Example: `test_def456`

### If It Fails
- **Issue**: "400 Exam date must be in the future"
- **Fix**: Use a date from Test 1 that's in the future
- **Issue**: "400 Subject weightages must sum to 100"
- **Fix**: Adjust weightages to sum exactly to 100
- **Issue**: "404 Child not found"
- **Fix**: Verify child_id is correct and child exists

---

## Test 10: Get Exam Selection

### Purpose
Retrieve exam selection and preferences.

### Steps
```bash
curl -X GET "http://localhost:8000/api/onboarding/exam/preferences?child_id={child_id}"
```

### Expected Result
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

### Success Criteria
- ✅ Status code: 200
- ✅ Returns same data as Test 9
- ✅ All fields present

### If It Fails
- **Issue**: "404 Not Found"
- **Fix**: Run Test 9 first to select exam

---

## Test 11: Update Subject Preferences

### Purpose
Update subject weightages after initial selection.

### Steps
```bash
curl -X PUT "http://localhost:8000/api/onboarding/exam/preferences?child_id={child_id}&parent_id={parent_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "Physics": 40,
    "Chemistry": 25,
    "Mathematics": 35
  }'
```

### Expected Result
```json
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 40,
    "Chemistry": 25,
    "Mathematics": 35
  },
  "child_id": "child_xyz789",
  "days_until_exam": 141,
  "diagnostic_test_id": "test_def456",
  "created_at": "2025-11-25T10:20:00Z"
}
```

### Success Criteria
- ✅ Status code: 200
- ✅ Subject preferences updated
- ✅ Weightages still sum to 100
- ✅ Other fields unchanged

### If It Fails
- **Issue**: "400 Weightages must sum to 100"
- **Fix**: Adjust weightages to sum exactly to 100

---

## Test 12: Get Onboarding Status

### Purpose
Check overall onboarding completion status.

### Steps
```bash
curl -X GET "http://localhost:8000/api/onboarding/status?parent_id={parent_id}"
```

### Expected Result
```json
{
  "preferences_completed": true,
  "child_profile_completed": true,
  "exam_selected": true,
  "onboarding_complete": true
}
```

### Success Criteria
- ✅ Status code: 200
- ✅ All completion flags are true (if you completed Tests 2, 5, 9)
- ✅ onboarding_complete is true when all three steps done

### Partial Completion Example
If you only completed preferences and child profile:
```json
{
  "preferences_completed": true,
  "child_profile_completed": true,
  "exam_selected": false,
  "onboarding_complete": false
}
```

---

## Test 13: End-to-End Onboarding Flow

### Purpose
Verify complete onboarding flow from start to finish.

### Steps
Run tests in sequence with a new parent:

1. **Create new parent** (Day 1 endpoint)
2. **Test 2**: Create preferences
3. **Test 5**: Create child profile
4. **Test 9**: Select exam
5. **Test 12**: Verify onboarding complete

### Expected Flow
```
Parent Registration → Set Preferences → Create Child → Select Exam → Diagnostic Test Scheduled
```

### Success Criteria
- ✅ All steps complete without errors
- ✅ Each step returns 201 or 200 status
- ✅ Final status shows onboarding_complete: true
- ✅ Diagnostic test created automatically

---

## Test 14: Verify One-Child Restriction

### Purpose
Confirm that parents cannot create multiple child profiles.

### Steps
1. Run Test 5 to create first child
2. Run Test 5 again with different child data

### Expected Result (Second Attempt)
```json
{
  "detail": "Parent can only have one child profile. Delete existing profile first."
}
```

### Success Criteria
- ✅ First child creation: Status 201
- ✅ Second child creation: Status 400
- ✅ Error message explains one-child limit

---

## Test 15: Verify Data in Firestore Console

### Purpose
Confirm data is correctly stored in Firestore.

### Steps
1. Open Firebase Console: https://console.firebase.google.com
2. Navigate to Firestore Database
3. Check these collections:

**parents/{parent_id}/preferences**
- Should contain: language, notifications, teaching_involvement

**children/{child_id}**
- Should contain: name, age, grade, current_level, parent_id

**exam_selections/{child_id}**
- Should contain: exam_type, exam_date, subject_preferences, diagnostic_test_id

**diagnostic_tests/{test_id}**
- Should contain: child_id, exam_type, scheduled_date, status

### Success Criteria
- ✅ All collections exist
- ✅ Documents contain correct data
- ✅ Timestamps are present
- ✅ Relationships (parent_id, child_id) are correct

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Available exams endpoint
- ✅ Parent preferences (create, get, update)
- ✅ Child profile (create, get, update, delete)
- ✅ One-child restriction enforcement
- ✅ Exam selection with date validation
- ✅ Subject preferences with weightage validation
- ✅ Diagnostic test automatic scheduling
- ✅ Onboarding status tracking
- ✅ End-to-end onboarding flow
- ✅ Firestore data persistence

**Next Steps:**
1. Open **EXPECTED-OUTCOME.md** to verify all success criteria
2. If any tests failed, check **TROUBLESHOOTING.md**

---

## Quick Test Reference

### Test Data to Save
```
Parent ID: {your_parent_id}
Child ID: {your_child_id}
Diagnostic Test ID: {your_test_id}
```

### Quick Test Commands
```bash
# Get available exams
curl http://localhost:8000/api/onboarding/exams/available

# Create preferences
curl -X POST "http://localhost:8000/api/onboarding/preferences?parent_id={parent_id}" \
  -H "Content-Type: application/json" -d '{...}'

# Create child
curl -X POST "http://localhost:8000/api/onboarding/child?parent_id={parent_id}" \
  -H "Content-Type: application/json" -d '{...}'

# Select exam
curl -X POST "http://localhost:8000/api/onboarding/exam/select?parent_id={parent_id}&child_id={child_id}" \
  -H "Content-Type: application/json" -d '{...}'

# Check status
curl "http://localhost:8000/api/onboarding/status?parent_id={parent_id}"
```


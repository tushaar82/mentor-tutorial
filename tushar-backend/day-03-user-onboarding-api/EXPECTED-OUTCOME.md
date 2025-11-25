# Expected Outcome for Day 3: User Onboarding API

This document defines the success criteria for completing Day 3. Check off each item to verify your implementation is complete and working correctly.

---

## Code Generation Checklist

### Utilities
- [ ] `utils/date_utils.py` created with all functions:
  - [ ] `calculate_days_until()` - Calculates days from today to target date
  - [ ] `validate_exam_date()` - Validates exam date is in future
  - [ ] `get_available_exam_dates()` - Returns future exam dates for JEE/NEET
  - [ ] `format_date_for_display()` - Formats dates for display
  - [ ] `parse_date_string()` - Parses date strings to datetime
  - [ ] All functions have type hints and docstrings

### Data Models
- [ ] `models/preferences_models.py` created with:
  - [ ] `PreferencesRequest` - Request model with validation
  - [ ] `PreferencesResponse` - Response model with timestamps
  - [ ] `PreferencesUpdate` - Update model with optional fields
  - [ ] Field validators for language and teaching_involvement enums
  - [ ] Example JSON in Config

- [ ] `models/child_models.py` created with:
  - [ ] `ChildProfileRequest` - Request model with age/grade validation
  - [ ] `ChildProfileResponse` - Response model with IDs and timestamps
  - [ ] `ChildProfileUpdate` - Update model with optional fields
  - [ ] Validators: age (14-19), grade (9-12), name (not empty)
  - [ ] Example JSON in Config

- [ ] `models/exam_models.py` created with:
  - [ ] `ExamSelectionRequest` - Request model with exam type and preferences
  - [ ] `ExamSelectionResponse` - Response with days_until_exam and test_id
  - [ ] `AvailableExam` - Model for available exam information
  - [ ] `AvailableExamsResponse` - List of available exams
  - [ ] `DiagnosticTestSchedule` - Diagnostic test information
  - [ ] Validators: exam_date (future), weightages (sum to 100)
  - [ ] Example JSON in Config

### Services
- [ ] `services/preferences_service.py` created with:
  - [ ] `create_preferences()` - Creates preferences in Firestore
  - [ ] `get_preferences()` - Retrieves preferences by parent_id
  - [ ] `update_preferences()` - Updates preferences (partial update)
  - [ ] `preferences_exist()` - Checks if preferences exist
  - [ ] Error handling for Firestore operations
  - [ ] Logging for all operations

- [ ] `services/child_service.py` created with:
  - [ ] `create_child_profile()` - Creates child with one-child check
  - [ ] `get_child_profile()` - Gets child by parent_id
  - [ ] `get_child_by_id()` - Gets child by child_id
  - [ ] `update_child_profile()` - Updates child with ownership verification
  - [ ] `delete_child_profile()` - Deletes child with ownership verification
  - [ ] `has_child()` - Checks if parent has a child
  - [ ] One-child restriction enforced
  - [ ] Error handling and logging

- [ ] `services/exam_service.py` created with:
  - [ ] `get_available_exams()` - Returns available exams with dates
  - [ ] `select_exam()` - Selects exam and creates diagnostic test
  - [ ] `get_exam_selection()` - Gets exam selection by child_id
  - [ ] `update_subject_preferences()` - Updates weightages
  - [ ] `create_diagnostic_test()` - Creates test record
  - [ ] `get_diagnostic_test()` - Gets test by test_id
  - [ ] Date validation using date_utils
  - [ ] Weightage validation (sum to 100)
  - [ ] Error handling and logging

### Routers
- [ ] `routers/preferences_router.py` created with:
  - [ ] `POST /api/onboarding/preferences` - Create preferences
  - [ ] `GET /api/onboarding/preferences` - Get preferences
  - [ ] `PUT /api/onboarding/preferences` - Update preferences
  - [ ] Proper status codes (201 for create, 200 for get/update)
  - [ ] Request/response models
  - [ ] API documentation with examples
  - [ ] Error handling

- [ ] `routers/child_router.py` created with:
  - [ ] `POST /api/onboarding/child` - Create child profile
  - [ ] `GET /api/onboarding/child` - Get child profile
  - [ ] `PUT /api/onboarding/child/{child_id}` - Update child profile
  - [ ] `DELETE /api/onboarding/child/{child_id}` - Delete child profile
  - [ ] Proper status codes
  - [ ] Request/response models
  - [ ] API documentation with examples
  - [ ] Error handling

- [ ] `routers/exam_router.py` created with:
  - [ ] `GET /api/onboarding/exams/available` - Get available exams
  - [ ] `POST /api/onboarding/exam/select` - Select exam
  - [ ] `GET /api/onboarding/exam/preferences` - Get exam selection
  - [ ] `PUT /api/onboarding/exam/preferences` - Update subject preferences
  - [ ] `GET /api/onboarding/status` - Get onboarding completion status
  - [ ] Proper status codes
  - [ ] Request/response models
  - [ ] API documentation with examples
  - [ ] Error handling

### Main Application
- [ ] `main.py` updated with:
  - [ ] Import statements for new routers
  - [ ] Router registrations (preferences, child, exam)
  - [ ] Routers properly included in app

---

## Configuration Checklist

- [ ] Firestore database enabled in Firebase Console
- [ ] Firestore security rules configured for development
- [ ] Test parent account created
- [ ] Parent ID saved for testing
- [ ] Firestore connection verified from backend
- [ ] Environment variables set correctly
- [ ] Python dependencies installed (firebase-admin, google-cloud-firestore)
- [ ] Backend server starts without errors
- [ ] API documentation accessible at http://localhost:8000/docs
- [ ] All Day 3 endpoints visible in API docs

---

## Testing Checklist

### Individual Endpoint Tests
- [ ] **Test 1**: Get available exams - Returns JEE/NEET with dates
- [ ] **Test 2**: Create preferences - Status 201, data stored
- [ ] **Test 3**: Get preferences - Status 200, returns correct data
- [ ] **Test 4**: Update preferences - Status 200, fields updated
- [ ] **Test 5**: Create child profile - Status 201, child created
- [ ] **Test 6**: Get child profile - Status 200, returns correct data
- [ ] **Test 7**: Update child profile - Status 200, fields updated
- [ ] **Test 8**: Delete child profile - Status 200, child deleted
- [ ] **Test 9**: Select exam - Status 201, diagnostic test created
- [ ] **Test 10**: Get exam selection - Status 200, returns correct data
- [ ] **Test 11**: Update subject preferences - Status 200, weightages updated
- [ ] **Test 12**: Get onboarding status - Returns completion flags

### Business Logic Tests
- [ ] **Test 13**: End-to-end onboarding flow completes successfully
- [ ] **Test 14**: One-child restriction enforced (second child returns 400)
- [ ] **Test 15**: Data correctly stored in Firestore collections

### Validation Tests
- [ ] Age validation: Rejects age < 14 or > 19
- [ ] Grade validation: Rejects grade < 9 or > 12
- [ ] Language validation: Rejects invalid language codes
- [ ] Teaching involvement validation: Rejects invalid values
- [ ] Exam date validation: Rejects past dates
- [ ] Subject weightages validation: Rejects if sum ≠ 100
- [ ] Exam type validation: Rejects invalid exam types

### Error Handling Tests
- [ ] 404 returned when preferences not found
- [ ] 404 returned when child not found
- [ ] 404 returned when exam selection not found
- [ ] 400 returned when parent already has child
- [ ] 400 returned when validation fails
- [ ] 403 returned when parent doesn't own child (for update/delete)
- [ ] Firestore errors caught and logged
- [ ] Error messages are clear and helpful

---

## Firestore Data Verification

### Collections Created
- [ ] `parents/{parent_id}/preferences` - Preferences subcollection
- [ ] `children` - Child profiles collection
- [ ] `exam_selections` - Exam selections collection
- [ ] `diagnostic_tests` - Diagnostic tests collection

### Data Structure Verification
- [ ] Preferences document contains:
  - [ ] language, email_notifications, sms_notifications, push_notifications
  - [ ] teaching_involvement, parent_id, created_at, updated_at

- [ ] Child document contains:
  - [ ] name, age, grade, current_level
  - [ ] child_id, parent_id, created_at, updated_at

- [ ] Exam selection document contains:
  - [ ] exam_type, exam_date, subject_preferences
  - [ ] child_id, days_until_exam, diagnostic_test_id, created_at

- [ ] Diagnostic test document contains:
  - [ ] test_id, child_id, exam_type
  - [ ] scheduled_date, duration_minutes, total_questions, status

### Data Relationships
- [ ] Child profile links to parent via parent_id
- [ ] Exam selection links to child via child_id
- [ ] Diagnostic test links to child via child_id
- [ ] Diagnostic test ID stored in exam selection

---

## API Documentation Verification

- [ ] All endpoints visible in Swagger UI (http://localhost:8000/docs)
- [ ] Each endpoint has:
  - [ ] Clear summary and description
  - [ ] Request body schema (for POST/PUT)
  - [ ] Response schema
  - [ ] Example values
  - [ ] Error responses documented
- [ ] Endpoints organized by tags:
  - [ ] "Onboarding - Preferences"
  - [ ] "Onboarding - Child Profile"
  - [ ] "Onboarding - Exam Selection"
- [ ] "Try it out" functionality works for all endpoints

---

## Code Quality Verification

- [ ] All functions have type hints
- [ ] All functions have docstrings
- [ ] Error handling implemented throughout
- [ ] Logging added for important operations
- [ ] No hardcoded values (use environment variables)
- [ ] Code follows Python best practices
- [ ] Pydantic models use v2 syntax
- [ ] Validators properly implemented
- [ ] No placeholder code or TODOs

---

## Functional Requirements Verification

Based on requirements 3.1-3.6 from requirements.md:

### Requirement 3.1: Onboarding API Structure
- [ ] Tushar's Day 2 prompts generate onboarding endpoints
- [ ] Vaishnavi's Day 2 prompts generate onboarding UI flow
- [ ] Configuration includes Firestore rules testing
- [ ] Integration checkpoint verifies full onboarding flow

### Requirement 3.2: Onboarding Flow Implementation
- [ ] Parent preferences API created
- [ ] Child profile creation API created
- [ ] Exam selection API created
- [ ] Form validation implemented
- [ ] Error messages implemented
- [ ] Data persistence to Firestore working

### Requirement 3.3: Integration and Testing
- [ ] Day 2 complete integration checkpoint works
- [ ] Child profile creation verified
- [ ] One-child restriction enforced
- [ ] Exam date calculation working

### Requirement 3.4: Code Generation Quality
- [ ] Generated code handles form validation
- [ ] Error messages clear and helpful
- [ ] Data persistence working correctly

### Requirement 3.5: Configuration
- [ ] Firebase Firestore rules tested
- [ ] Data structure verified in Firebase Console

### Requirement 3.6: Testing
- [ ] Instructions verify child profile creation
- [ ] One-child restriction tested
- [ ] Exam date calculation verified

---

## Performance Verification

- [ ] API responds within 500ms for simple queries
- [ ] Firestore queries optimized (indexed if needed)
- [ ] No N+1 query problems
- [ ] Proper error handling doesn't slow down responses

---

## Security Verification

- [ ] Parent ID required for all authenticated endpoints
- [ ] Child ownership verified for update/delete operations
- [ ] Input validation prevents injection attacks
- [ ] Firestore security rules configured
- [ ] No sensitive data in logs
- [ ] Service account key not committed to git

---

## Final Checklist

- [ ] All code files created and complete
- [ ] All configuration steps completed
- [ ] All tests passing
- [ ] All data correctly stored in Firestore
- [ ] API documentation complete and accurate
- [ ] No errors in server logs
- [ ] Code committed to version control
- [ ] Ready to proceed to Day 4

---

## Success Criteria Summary

### Must Have (Critical)
✅ All 11 prompts executed successfully
✅ All endpoints return correct status codes
✅ One-child restriction enforced
✅ Exam date validation working
✅ Subject weightages validation working
✅ Data persisted to Firestore
✅ End-to-end onboarding flow works

### Should Have (Important)
✅ All validation rules working
✅ Error messages clear and helpful
✅ API documentation complete
✅ Logging implemented
✅ Code quality high

### Nice to Have (Optional)
✅ Performance optimized
✅ Security best practices followed
✅ Code well-commented

---

## What You Should Have Now

After completing Day 3, you should have:

1. **Complete Onboarding API** with 10 endpoints covering:
   - Parent preferences management
   - Child profile management (with one-child restriction)
   - Exam selection and scheduling
   - Onboarding status tracking

2. **Robust Data Validation** including:
   - Age and grade validation
   - Language and enum validation
   - Date validation (future dates only)
   - Weightage validation (sum to 100)

3. **Firestore Integration** with:
   - 4 collections properly structured
   - Data relationships maintained
   - Timestamps on all documents

4. **Business Logic** including:
   - One-child-per-parent restriction
   - Automatic diagnostic test creation
   - Days-until-exam calculation
   - Onboarding completion tracking

5. **Comprehensive Testing** with:
   - 15 test scenarios documented
   - All tests passing
   - Data verified in Firestore

---

## Ready for Day 4?

Before moving to Day 4 (Vector Search Setup), ensure:
- ✅ All items in this checklist are complete
- ✅ All tests passing
- ✅ No errors in logs
- ✅ Onboarding flow works end-to-end
- ✅ Code committed to version control

**If all checks pass, you're ready for Day 4: Vector Search Setup!** 🚀


# AI Coding Agent Prompts for Day 3: User Onboarding API

This document contains all prompts needed to generate the onboarding API code for Day 3. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Date Calculation Utilities

### Purpose
Generate utility functions for calculating days until exam, validating dates, and scheduling logic.

### When to Use
Start with this utility as it will be used by exam selection services.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/date_utils.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create date utility functions for exam scheduling:
# - calculate_days_until(target_date: datetime) -> int: Calculate days from today to target date
# - validate_exam_date(exam_date: datetime, min_days: int = 30) -> bool: Ensure exam is at least min_days away
# - get_available_exam_dates(exam_type: str) -> List[datetime]: Return list of valid exam dates for JEE/NEET
# - format_date_for_display(date: datetime) -> str: Format date as "DD MMM YYYY"
# - parse_date_string(date_str: str) -> datetime: Parse "YYYY-MM-DD" to datetime
# Include error handling, type hints, and docstrings
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create date utility functions for the Mentor AI EdTech platform exam scheduling system.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, datetime module
- File: tushar-backend/utils/date_utils.py

GENERATE:
Date utility module with the following functions:

REQUIREMENTS:
1. calculate_days_until(target_date: datetime) -> int
   - Calculate number of days from today to target date
   - Return positive integer for future dates
   - Raise ValueError for past dates

2. validate_exam_date(exam_date: datetime, min_days: int = 30) -> bool
   - Check if exam date is at least min_days in the future
   - Return True if valid, False otherwise

3. get_available_exam_dates(exam_type: str) -> List[datetime]
   - Return list of valid exam dates for "JEE" or "NEET"
   - JEE dates: January 15, April 15 (current/next year)
   - NEET dates: May 5 (current/next year)
   - Only return future dates

4. format_date_for_display(date: datetime) -> str
   - Format datetime as "DD MMM YYYY" (e.g., "15 Jan 2026")

5. parse_date_string(date_str: str) -> datetime
   - Parse "YYYY-MM-DD" string to datetime object
   - Raise ValueError for invalid formats

6. Include comprehensive error handling
7. Add type hints for all functions
8. Add detailed docstrings with examples
9. Include timezone awareness (UTC)

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Each function with docstring
- Example usage in comments
```

**What You'll Get**: Complete date utilities module

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/utils/date_utils.py`
3. Paste and save

---


## Prompt 2: Create Preferences Pydantic Models

### Purpose
Define data models for parent preferences (language, notifications, teaching involvement).

### When to Use
After creating date utilities, before implementing preferences service.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/preferences_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for parent preferences:
# - PreferencesRequest: language (en/hi/mr), email_notifications (bool), sms_notifications (bool), 
#   push_notifications (bool), teaching_involvement (high/medium/low)
# - PreferencesResponse: Include all request fields plus parent_id, created_at, updated_at
# - PreferencesUpdate: Optional fields for updating preferences
# Use Pydantic v2 syntax, add field validators, include examples in Config
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for parent preferences in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Pydantic v2
- File: tushar-backend/models/preferences_models.py

GENERATE:
Three Pydantic models for preferences management:

REQUIREMENTS:
1. PreferencesRequest (BaseModel):
   - language: str (enum: "en", "hi", "mr") - required
   - email_notifications: bool - default True
   - sms_notifications: bool - default True
   - push_notifications: bool - default True
   - teaching_involvement: str (enum: "high", "medium", "low") - required

2. PreferencesResponse (BaseModel):
   - All fields from PreferencesRequest
   - parent_id: str - required
   - created_at: datetime - required
   - updated_at: datetime - required

3. PreferencesUpdate (BaseModel):
   - All fields from PreferencesRequest but optional
   - Use Optional[type] for each field

4. Add field validators for language and teaching_involvement enums
5. Include Config class with json_schema_extra examples
6. Add type hints and docstrings
7. Use Pydantic v2 syntax (Field, field_validator)

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Each model with docstring
- Example JSON in Config
```

**What You'll Get**: Complete preferences models

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/preferences_models.py`
3. Paste and save

---


## Prompt 3: Create Child Profile Pydantic Models

### Purpose
Define data models for child profiles with validation for age, grade, and academic level.

### When to Use
After preferences models, before implementing child service.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/child_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for child profiles:
# - ChildProfileRequest: name (str), age (int, 14-19), grade (int, 9-12), current_level (beginner/intermediate/advanced)
# - ChildProfileResponse: Include all request fields plus child_id, parent_id, created_at, updated_at
# - ChildProfileUpdate: Optional fields for updating profile
# Add validators: age must be 14-19, grade must be 9-12, grade should match age roughly
# Use Pydantic v2, include examples
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for child profiles in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Pydantic v2
- File: tushar-backend/models/child_models.py

GENERATE:
Three Pydantic models for child profile management:

REQUIREMENTS:
1. ChildProfileRequest (BaseModel):
   - name: str - required, min 2 chars, max 100 chars
   - age: int - required, must be 14-19
   - grade: int - required, must be 9-12
   - current_level: str (enum: "beginner", "intermediate", "advanced") - required

2. ChildProfileResponse (BaseModel):
   - All fields from ChildProfileRequest
   - child_id: str - required
   - parent_id: str - required
   - created_at: datetime - required
   - updated_at: datetime - required

3. ChildProfileUpdate (BaseModel):
   - All fields from ChildProfileRequest but optional
   - Use Optional[type] for each field

4. Add field validators:
   - age: must be between 14 and 19
   - grade: must be between 9 and 12
   - name: strip whitespace, validate not empty
   - current_level: validate enum values

5. Include Config class with json_schema_extra examples
6. Add type hints and docstrings
7. Use Pydantic v2 syntax

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Each model with docstring
- Example JSON in Config
```

**What You'll Get**: Complete child profile models

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/child_models.py`
3. Paste and save

---


## Prompt 4: Create Exam Selection Pydantic Models

### Purpose
Define data models for exam selection, subject preferences, and diagnostic test scheduling.

### When to Use
After child models, before implementing exam service.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/exam_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for exam selection:
# - ExamSelectionRequest: exam_type (JEE_MAIN/JEE_ADVANCED/NEET), exam_date (datetime), 
#   subject_preferences (dict with Physics/Chemistry/Math or Biology weightages)
# - ExamSelectionResponse: Include all request fields plus child_id, days_until_exam, diagnostic_test_id, created_at
# - AvailableExamsResponse: List of available exams with dates
# - DiagnosticTestSchedule: test_id, scheduled_date, duration_minutes, total_questions
# Add validators for exam dates (must be future), weightages (must sum to 100)
# Use Pydantic v2, include examples
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for exam selection and diagnostic test scheduling in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Pydantic v2
- File: tushar-backend/models/exam_models.py

GENERATE:
Multiple Pydantic models for exam management:

REQUIREMENTS:
1. ExamSelectionRequest (BaseModel):
   - exam_type: str (enum: "JEE_MAIN", "JEE_ADVANCED", "NEET") - required
   - exam_date: datetime - required
   - subject_preferences: dict - required
     * For JEE: {"Physics": int, "Chemistry": int, "Mathematics": int}
     * For NEET: {"Physics": int, "Chemistry": int, "Biology": int}
     * Weightages must sum to 100

2. ExamSelectionResponse (BaseModel):
   - All fields from ExamSelectionRequest
   - child_id: str - required
   - days_until_exam: int - required
   - diagnostic_test_id: str - required
   - created_at: datetime - required

3. AvailableExam (BaseModel):
   - exam_type: str
   - exam_name: str
   - available_dates: List[str] (formatted as "YYYY-MM-DD")
   - subjects: List[str]

4. AvailableExamsResponse (BaseModel):
   - exams: List[AvailableExam]

5. DiagnosticTestSchedule (BaseModel):
   - test_id: str
   - child_id: str
   - exam_type: str
   - scheduled_date: datetime
   - duration_minutes: int (default 180)
   - total_questions: int (default 200)
   - status: str (enum: "scheduled", "in_progress", "completed")

6. Add field validators:
   - exam_date: must be in the future
   - subject_preferences: weightages must sum to 100
   - exam_type: validate enum values

7. Include Config class with json_schema_extra examples
8. Add type hints and docstrings
9. Use Pydantic v2 syntax

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Each model with docstring
- Example JSON in Config
```

**What You'll Get**: Complete exam selection models

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/exam_models.py`
3. Paste and save

---


## Prompt 5: Create Preferences Service

### Purpose
Implement business logic for managing parent preferences in Firestore.

### When to Use
After creating all models, start implementing services.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/preferences_service.py`

**Step 2**: Type this comment:
```python
# Create preferences service with Firebase Admin SDK:
# - create_preferences(parent_id: str, preferences: PreferencesRequest) -> PreferencesResponse
#   Store in Firestore 'parents/{parent_id}/preferences' document
# - get_preferences(parent_id: str) -> PreferencesResponse
#   Retrieve from Firestore, raise 404 if not found
# - update_preferences(parent_id: str, updates: PreferencesUpdate) -> PreferencesResponse
#   Update existing preferences, merge with existing data
# Include error handling, logging, type hints, docstrings
# Use firebase_admin.firestore for database operations
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create preferences service for managing parent preferences in Firestore.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Firebase Admin SDK, Firestore
- File: tushar-backend/services/preferences_service.py

GENERATE:
Preferences service class with Firestore integration:

REQUIREMENTS:
1. Import statements:
   - firebase_admin.firestore
   - models.preferences_models (PreferencesRequest, PreferencesResponse, PreferencesUpdate)
   - datetime, logging

2. PreferencesService class with methods:

   a) create_preferences(parent_id: str, preferences: PreferencesRequest) -> PreferencesResponse:
      - Store preferences in Firestore at 'parents/{parent_id}/preferences'
      - Add created_at and updated_at timestamps
      - Return PreferencesResponse with all data
      - Handle Firestore errors

   b) get_preferences(parent_id: str) -> PreferencesResponse:
      - Retrieve preferences from Firestore
      - Raise HTTPException 404 if not found
      - Return PreferencesResponse

   c) update_preferences(parent_id: str, updates: PreferencesUpdate) -> PreferencesResponse:
      - Update only provided fields (partial update)
      - Update updated_at timestamp
      - Return updated PreferencesResponse
      - Raise 404 if preferences don't exist

   d) preferences_exist(parent_id: str) -> bool:
      - Check if preferences document exists
      - Return boolean

3. Error handling:
   - Catch Firestore exceptions
   - Log all operations
   - Raise appropriate HTTPException with status codes

4. Add type hints, docstrings, and logging
5. Use async/await for Firestore operations if applicable

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Class with all methods
- Comprehensive error handling
```

**What You'll Get**: Complete preferences service

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/preferences_service.py`
3. Paste and save

---


## Prompt 6: Create Child Profile Service

### Purpose
Implement business logic for managing child profiles with one-child restriction.

### When to Use
After preferences service, before exam service.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/child_service.py`

**Step 2**: Type this comment:
```python
# Create child profile service with one-child restriction:
# - create_child_profile(parent_id: str, profile: ChildProfileRequest) -> ChildProfileResponse
#   Check if parent already has a child (raise 400 if yes), store in 'children' collection
# - get_child_profile(parent_id: str) -> ChildProfileResponse
#   Get child by parent_id, raise 404 if not found
# - update_child_profile(child_id: str, parent_id: str, updates: ChildProfileUpdate) -> ChildProfileResponse
#   Update child profile, verify parent owns the child
# - delete_child_profile(child_id: str, parent_id: str) -> dict
#   Delete child profile, verify ownership
# - has_child(parent_id: str) -> bool
#   Check if parent has a child
# Include error handling, logging, type hints, use Firestore
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create child profile service with one-child restriction enforcement.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Firebase Admin SDK, Firestore
- File: tushar-backend/services/child_service.py

GENERATE:
Child profile service class with Firestore integration:

REQUIREMENTS:
1. Import statements:
   - firebase_admin.firestore
   - models.child_models (ChildProfileRequest, ChildProfileResponse, ChildProfileUpdate)
   - datetime, logging, uuid

2. ChildService class with methods:

   a) create_child_profile(parent_id: str, profile: ChildProfileRequest) -> ChildProfileResponse:
      - Check if parent already has a child using has_child()
      - If yes, raise HTTPException 400 "Parent can only have one child profile"
      - Generate unique child_id using uuid
      - Store in Firestore 'children' collection
      - Add parent_id, child_id, created_at, updated_at
      - Return ChildProfileResponse

   b) get_child_profile(parent_id: str) -> ChildProfileResponse:
      - Query Firestore for child where parent_id matches
      - Raise HTTPException 404 if not found
      - Return ChildProfileResponse

   c) get_child_by_id(child_id: str) -> ChildProfileResponse:
      - Get child by child_id
      - Raise 404 if not found
      - Return ChildProfileResponse

   d) update_child_profile(child_id: str, parent_id: str, updates: ChildProfileUpdate) -> ChildProfileResponse:
      - Verify child exists and belongs to parent
      - Update only provided fields
      - Update updated_at timestamp
      - Return updated ChildProfileResponse

   e) delete_child_profile(child_id: str, parent_id: str) -> dict:
      - Verify child exists and belongs to parent
      - Delete from Firestore
      - Return success message

   f) has_child(parent_id: str) -> bool:
      - Check if parent has any child profile
      - Return boolean

3. Error handling:
   - Catch Firestore exceptions
   - Log all operations
   - Raise appropriate HTTPException with status codes
   - Verify parent ownership for all operations

4. Add type hints, docstrings, and logging

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Class with all methods
- Comprehensive error handling
```

**What You'll Get**: Complete child profile service

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/child_service.py`
3. Paste and save

---


## Prompt 7: Create Exam Selection Service

### Purpose
Implement business logic for exam selection, date validation, and diagnostic test scheduling.

### When to Use
After child service, before creating routers.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/exam_service.py`

**Step 2**: Type this comment:
```python
# Create exam selection service with diagnostic test scheduling:
# - get_available_exams() -> AvailableExamsResponse
#   Return list of JEE_MAIN, JEE_ADVANCED, NEET with available dates from date_utils
# - select_exam(child_id: str, parent_id: str, selection: ExamSelectionRequest) -> ExamSelectionResponse
#   Validate exam date is in future, verify child belongs to parent, calculate days_until_exam,
#   create diagnostic test, store in 'exam_selections' collection
# - get_exam_selection(child_id: str) -> ExamSelectionResponse
#   Get exam selection for child, raise 404 if not found
# - update_subject_preferences(child_id: str, parent_id: str, preferences: dict) -> ExamSelectionResponse
#   Update subject weightages, validate sum to 100
# - create_diagnostic_test(child_id: str, exam_type: str) -> DiagnosticTestSchedule
#   Create test record in 'diagnostic_tests' collection with scheduled status
# Include error handling, use date_utils, logging, type hints
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create exam selection service with diagnostic test scheduling.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, Firebase Admin SDK, Firestore
- File: tushar-backend/services/exam_service.py

GENERATE:
Exam selection service class with Firestore integration:

REQUIREMENTS:
1. Import statements:
   - firebase_admin.firestore
   - models.exam_models (all models)
   - utils.date_utils (calculate_days_until, validate_exam_date, get_available_exam_dates)
   - services.child_service (to verify child ownership)
   - datetime, logging, uuid

2. ExamService class with methods:

   a) get_available_exams() -> AvailableExamsResponse:
      - Get available dates for JEE_MAIN, JEE_ADVANCED, NEET using date_utils
      - Return AvailableExamsResponse with exam types, names, dates, subjects
      - JEE exams: Physics, Chemistry, Mathematics
      - NEET exam: Physics, Chemistry, Biology

   b) select_exam(child_id: str, parent_id: str, selection: ExamSelectionRequest) -> ExamSelectionResponse:
      - Verify child exists and belongs to parent (use ChildService)
      - Validate exam_date is in future using validate_exam_date()
      - Validate subject_preferences weightages sum to 100
      - Calculate days_until_exam using calculate_days_until()
      - Create diagnostic test using create_diagnostic_test()
      - Store exam selection in 'exam_selections' collection
      - Return ExamSelectionResponse with diagnostic_test_id

   c) get_exam_selection(child_id: str) -> ExamSelectionResponse:
      - Query Firestore for exam selection by child_id
      - Raise HTTPException 404 if not found
      - Return ExamSelectionResponse

   d) update_subject_preferences(child_id: str, parent_id: str, preferences: dict) -> ExamSelectionResponse:
      - Verify child belongs to parent
      - Validate weightages sum to 100
      - Update subject_preferences in Firestore
      - Return updated ExamSelectionResponse

   e) create_diagnostic_test(child_id: str, exam_type: str) -> DiagnosticTestSchedule:
      - Generate test_id using uuid
      - Set scheduled_date to now + 1 day
      - Set duration_minutes to 180 (3 hours)
      - Set total_questions to 200
      - Set status to "scheduled"
      - Store in 'diagnostic_tests' collection
      - Return DiagnosticTestSchedule

   f) get_diagnostic_test(test_id: str) -> DiagnosticTestSchedule:
      - Get test by test_id
      - Raise 404 if not found
      - Return DiagnosticTestSchedule

3. Error handling:
   - Catch Firestore exceptions
   - Validate all inputs
   - Log all operations
   - Raise appropriate HTTPException with status codes

4. Add type hints, docstrings, and logging

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Class with all methods
- Comprehensive error handling
```

**What You'll Get**: Complete exam selection service

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/exam_service.py`
3. Paste and save

---


## Prompt 8: Create Preferences Router

### Purpose
Create FastAPI endpoints for parent preferences management.

### When to Use
After all services are created, start building API routers.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/preferences_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for preferences endpoints:
# - POST /api/onboarding/preferences - Create preferences (requires auth)
# - GET /api/onboarding/preferences - Get preferences (requires auth)
# - PUT /api/onboarding/preferences - Update preferences (requires auth)
# Use PreferencesService, extract parent_id from request (assume auth middleware provides it)
# Include error handling, status codes (201 for create, 200 for get/update), response models
# Add API documentation with examples
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for parent preferences endpoints.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/routers/preferences_router.py

GENERATE:
FastAPI router with preferences endpoints:

REQUIREMENTS:
1. Import statements:
   - fastapi (APIRouter, Depends, HTTPException, status)
   - models.preferences_models (all models)
   - services.preferences_service (PreferencesService)

2. Create APIRouter with prefix="/api/onboarding" and tag="Onboarding - Preferences"

3. Endpoints:

   a) POST /preferences
      - Summary: "Create parent preferences"
      - Description: "Set language, notification, and teaching involvement preferences"
      - Request body: PreferencesRequest
      - Response: PreferencesResponse (status 201)
      - Extract parent_id from request (for now, use query param or header)
      - Call PreferencesService.create_preferences()
      - Handle errors (400 if already exists)

   b) GET /preferences
      - Summary: "Get parent preferences"
      - Description: "Retrieve current preferences for authenticated parent"
      - Response: PreferencesResponse (status 200)
      - Extract parent_id from request
      - Call PreferencesService.get_preferences()
      - Handle errors (404 if not found)

   c) PUT /preferences
      - Summary: "Update parent preferences"
      - Description: "Update one or more preference fields"
      - Request body: PreferencesUpdate
      - Response: PreferencesResponse (status 200)
      - Extract parent_id from request
      - Call PreferencesService.update_preferences()
      - Handle errors (404 if not found)

4. For now, use query parameter parent_id: str for authentication
   (Note: In production, this will come from auth middleware)

5. Add comprehensive API documentation:
   - OpenAPI descriptions
   - Example requests and responses
   - Error response documentation

6. Error handling:
   - Catch service exceptions
   - Return appropriate HTTP status codes
   - Include error messages in response

7. Add type hints and docstrings

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Router with all endpoints
- Comprehensive documentation
```

**What You'll Get**: Complete preferences router

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/preferences_router.py`
3. Paste and save

---


## Prompt 9: Create Child Profile Router

### Purpose
Create FastAPI endpoints for child profile management with one-child restriction.

### When to Use
After preferences router, before exam router.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/child_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for child profile endpoints:
# - POST /api/onboarding/child - Create child profile (enforces one-child limit, requires auth)
# - GET /api/onboarding/child - Get child profile (requires auth)
# - PUT /api/onboarding/child/{child_id} - Update child profile (requires auth, verify ownership)
# - DELETE /api/onboarding/child/{child_id} - Delete child profile (requires auth, verify ownership)
# Use ChildService, extract parent_id from request
# Include error handling, status codes, response models, API documentation
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for child profile endpoints with one-child restriction.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/routers/child_router.py

GENERATE:
FastAPI router with child profile endpoints:

REQUIREMENTS:
1. Import statements:
   - fastapi (APIRouter, Depends, HTTPException, status, Path)
   - models.child_models (all models)
   - services.child_service (ChildService)

2. Create APIRouter with prefix="/api/onboarding" and tag="Onboarding - Child Profile"

3. Endpoints:

   a) POST /child
      - Summary: "Create child profile"
      - Description: "Create child profile (one child per parent limit enforced)"
      - Request body: ChildProfileRequest
      - Response: ChildProfileResponse (status 201)
      - Extract parent_id from query param
      - Call ChildService.create_child_profile()
      - Handle errors (400 if parent already has child)

   b) GET /child
      - Summary: "Get child profile"
      - Description: "Retrieve child profile for authenticated parent"
      - Response: ChildProfileResponse (status 200)
      - Extract parent_id from query param
      - Call ChildService.get_child_profile()
      - Handle errors (404 if not found)

   c) PUT /child/{child_id}
      - Summary: "Update child profile"
      - Description: "Update child profile information"
      - Path parameter: child_id (str)
      - Request body: ChildProfileUpdate
      - Response: ChildProfileResponse (status 200)
      - Extract parent_id from query param
      - Call ChildService.update_child_profile()
      - Handle errors (404 if not found, 403 if not owner)

   d) DELETE /child/{child_id}
      - Summary: "Delete child profile"
      - Description: "Delete child profile (allows creating a new one)"
      - Path parameter: child_id (str)
      - Response: dict with success message (status 200)
      - Extract parent_id from query param
      - Call ChildService.delete_child_profile()
      - Handle errors (404 if not found, 403 if not owner)

4. For now, use query parameter parent_id: str for authentication

5. Add comprehensive API documentation:
   - OpenAPI descriptions
   - Example requests and responses
   - Error response documentation

6. Error handling:
   - Catch service exceptions
   - Return appropriate HTTP status codes
   - Include error messages in response

7. Add type hints and docstrings

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Router with all endpoints
- Comprehensive documentation
```

**What You'll Get**: Complete child profile router

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/child_router.py`
3. Paste and save

---


## Prompt 10: Create Exam Selection Router

### Purpose
Create FastAPI endpoints for exam selection and diagnostic test scheduling.

### When to Use
After child router, final router for Day 3.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/exam_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for exam selection endpoints:
# - GET /api/onboarding/exams/available - Get available exams and dates (no auth required)
# - POST /api/onboarding/exam/select - Select exam and schedule diagnostic test (requires auth)
# - GET /api/onboarding/exam/preferences - Get exam selection (requires auth)
# - PUT /api/onboarding/exam/preferences - Update subject preferences (requires auth)
# - GET /api/onboarding/status - Get overall onboarding completion status (requires auth)
# Use ExamService, extract parent_id from request
# Include error handling, status codes, response models, API documentation
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for exam selection and onboarding status endpoints.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/routers/exam_router.py

GENERATE:
FastAPI router with exam selection endpoints:

REQUIREMENTS:
1. Import statements:
   - fastapi (APIRouter, Depends, HTTPException, status)
   - models.exam_models (all models)
   - services.exam_service (ExamService)
   - services.preferences_service (PreferencesService)
   - services.child_service (ChildService)

2. Create APIRouter with prefix="/api/onboarding" and tag="Onboarding - Exam Selection"

3. Endpoints:

   a) GET /exams/available
      - Summary: "Get available exams"
      - Description: "List all available exams (JEE/NEET) with dates and subjects"
      - Response: AvailableExamsResponse (status 200)
      - No authentication required
      - Call ExamService.get_available_exams()

   b) POST /exam/select
      - Summary: "Select exam and schedule diagnostic test"
      - Description: "Choose target exam, date, and subject preferences. Creates diagnostic test."
      - Request body: ExamSelectionRequest
      - Response: ExamSelectionResponse (status 201)
      - Extract parent_id and child_id from query params
      - Call ExamService.select_exam()
      - Handle errors (404 if child not found, 400 if invalid date)

   c) GET /exam/preferences
      - Summary: "Get exam selection"
      - Description: "Retrieve exam selection and preferences for child"
      - Query param: child_id (str)
      - Response: ExamSelectionResponse (status 200)
      - Call ExamService.get_exam_selection()
      - Handle errors (404 if not found)

   d) PUT /exam/preferences
      - Summary: "Update subject preferences"
      - Description: "Update subject weightages (must sum to 100)"
      - Query params: child_id (str), parent_id (str)
      - Request body: dict (subject_preferences)
      - Response: ExamSelectionResponse (status 200)
      - Call ExamService.update_subject_preferences()
      - Handle errors (400 if weightages don't sum to 100)

   e) GET /status
      - Summary: "Get onboarding completion status"
      - Description: "Check which onboarding steps are completed"
      - Query param: parent_id (str)
      - Response: dict with completion status
      - Check: preferences_completed, child_profile_completed, exam_selected
      - Use PreferencesService, ChildService, ExamService to check each step
      - Return: {
          "preferences_completed": bool,
          "child_profile_completed": bool,
          "exam_selected": bool,
          "onboarding_complete": bool (all three true)
        }

4. For now, use query parameters for authentication

5. Add comprehensive API documentation:
   - OpenAPI descriptions
   - Example requests and responses
   - Error response documentation

6. Error handling:
   - Catch service exceptions
   - Return appropriate HTTP status codes
   - Include error messages in response

7. Add type hints and docstrings

OUTPUT FORMAT:
- Complete Python module
- All imports at top
- Router with all endpoints
- Comprehensive documentation
```

**What You'll Get**: Complete exam selection router

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/exam_router.py`
3. Paste and save

---

## Prompt 11: Update Main Application

### Purpose
Register all new routers in the main FastAPI application.

### When to Use
After all routers are created, final step for Day 3.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment where routers are registered:
```python
# Import and register Day 3 onboarding routers:
# - preferences_router from routers.preferences_router
# - child_router from routers.child_router
# - exam_router from routers.exam_router
# Use app.include_router() for each
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update the main FastAPI application to include Day 3 onboarding routers.

CONTEXT:
- Project: Mentor AI Backend (FastAPI)
- File: tushar-backend/main.py (existing file)

UPDATE:
Add the following imports and router registrations:

REQUIREMENTS:
1. Add imports at the top:
   ```python
   from routers.preferences_router import router as preferences_router
   from routers.child_router import router as child_router
   from routers.exam_router import router as exam_router
   ```

2. Register routers with the app (after existing routers):
   ```python
   # Day 3: Onboarding API
   app.include_router(preferences_router)
   app.include_router(child_router)
   app.include_router(exam_router)
   ```

3. Maintain existing code structure
4. Add comments for clarity

OUTPUT FORMAT:
- Show the complete import section
- Show the complete router registration section
- Indicate where to add the new code
```

**What You'll Get**: Updated main.py with new routers

**What to Do**:
1. Copy the generated code
2. Open `tushar-backend/main.py`
3. Add imports at top
4. Add router registrations after existing routers
5. Save

---

## Summary

You've now generated all the code for Day 3: User Onboarding API! 

**Files Created:**
- ✅ `utils/date_utils.py` - Date calculation utilities
- ✅ `models/preferences_models.py` - Preferences data models
- ✅ `models/child_models.py` - Child profile data models
- ✅ `models/exam_models.py` - Exam selection data models
- ✅ `services/preferences_service.py` - Preferences business logic
- ✅ `services/child_service.py` - Child profile business logic
- ✅ `services/exam_service.py` - Exam selection business logic
- ✅ `routers/preferences_router.py` - Preferences API endpoints
- ✅ `routers/child_router.py` - Child profile API endpoints
- ✅ `routers/exam_router.py` - Exam selection API endpoints

**Files Modified:**
- ✅ `main.py` - Added new routers

**Next Steps:**
1. Open **CONFIGURATION.md** to set up Firestore collections
2. Open **TESTING.md** to test the complete onboarding flow
3. Open **EXPECTED-OUTCOME.md** to verify success criteria


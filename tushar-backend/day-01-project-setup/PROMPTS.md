# AI Coding Agent Prompts for Day 1: Backend Project Setup

This document contains all prompts needed to generate the backend code for Day 1. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Project Structure and Main Application

### Purpose
Generate the FastAPI application entry point with CORS middleware, error handling, and health check endpoint.

### When to Use
Start with this prompt to create the foundation of your backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/main.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create a production-ready FastAPI application for Mentor AI EdTech platform
# Include:
# - FastAPI app with title "Mentor AI Backend" and version "1.0.0"
# - CORS middleware allowing origin http://localhost:3000
# - CORS should allow credentials, all methods, and all headers
# - Global exception handler for unhandled errors
# - Health check endpoint at GET /health returning {"status": "healthy", "service": "mentor-ai-backend"}
# - Include routers from auth_router with prefix /api/auth
# - Add startup event to log "Mentor AI Backend started successfully"
# - Use proper type hints and add docstrings
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review the generated code

**Step 5**: If incomplete, add:
```python
# Add exception handler that catches all exceptions
# Return JSON response with status_code 500 and error details
# Log the error with traceback
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create the main FastAPI application file for the Mentor AI EdTech platform backend.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: Python 3.11+, FastAPI, Firebase Admin SDK
- File: tushar-backend/main.py
- Purpose: Entry point for the backend API

GENERATE:
A complete FastAPI application with the following structure:

REQUIREMENTS:
1. Create FastAPI app instance with:
   - Title: "Mentor AI Backend"
   - Version: "1.0.0"
   - Description: "Backend API for Mentor AI EdTech Platform"

2. Configure CORS middleware:
   - Allow origin: http://localhost:3000 (frontend)
   - Allow credentials: True
   - Allow all methods
   - Allow all headers

3. Add global exception handler:
   - Catch all unhandled exceptions
   - Return JSON response with error details
   - Log errors with traceback
   - Return 500 status code

4. Create health check endpoint:
   - Route: GET /health
   - Response: {"status": "healthy", "service": "mentor-ai-backend"}

5. Include auth router:
   - Import from routers.auth_router
   - Mount at prefix /api/auth
   - Tag as "Authentication"

6. Add startup event:
   - Log "Mentor AI Backend started successfully"
   - Log available routes

7. Code quality:
   - Use Python type hints
   - Add comprehensive docstrings
   - Include error handling
   - Add comments explaining key sections

INTEGRATE WITH:
- routers/auth_router.py (will create next)
- Frontend at http://localhost:3000

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and run
```

**What You'll Get**: Complete main.py file with FastAPI app configuration

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/main.py`
3. Paste and save

---

## Prompt 2: Create Requirements File

### Purpose
Generate the Python dependencies file with all required packages.

### When to Use
After creating main.py, create this to define project dependencies.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/requirements.txt`

**Step 2**: Type this comment:
```python
# Python dependencies for Mentor AI Backend
# Include: FastAPI, Uvicorn with standard extras, Firebase Admin SDK, 
# Python-dotenv, Pydantic with email validation, Python-multipart for file uploads
# Use specific versions for reproducibility
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a requirements.txt file for the Mentor AI backend project.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Firebase
- File: tushar-backend/requirements.txt

GENERATE:
A requirements.txt file with the following packages and specific versions:

REQUIREMENTS:
1. FastAPI (latest stable: 0.104.1)
2. Uvicorn with standard extras (0.24.0) - ASGI server
3. Firebase Admin SDK (6.2.0) - Firebase integration
4. Python-dotenv (1.0.0) - Environment variable management
5. Pydantic with email validation (2.4.2) - Data validation
6. Python-multipart (0.0.6) - Form data handling
7. Requests (2.31.0) - HTTP client for external APIs

OUTPUT FORMAT:
- One package per line
- Format: package==version
- Include comments explaining each package's purpose
- Group related packages together
```

**What You'll Get**: Complete requirements.txt file

**What to Do**:
1. Copy the generated content
2. Create file `tushar-backend/requirements.txt`
3. Paste and save

---

## Prompt 3: Create Firebase Configuration Utility

### Purpose
Generate Firebase Admin SDK initialization code with proper error handling.

### When to Use
After requirements.txt, create this to set up Firebase connection.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/firebase_config.py`

**Step 2**: Type this comment:
```python
# Firebase Admin SDK initialization for Mentor AI Backend
# 
# Features:
# - Initialize Firebase Admin SDK with service account credentials
# - Load credentials from environment variable FIREBASE_SERVICE_ACCOUNT_PATH
# - Initialize Firestore database client
# - Provide singleton pattern to avoid multiple initializations
# - Include error handling for missing credentials
# - Export initialized firebase_admin.auth and firestore clients
# - Add function get_firestore_client() that returns db client
# - Add function get_auth_client() that returns auth client
# - Include comprehensive docstrings and type hints
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Firebase Admin SDK initialization utility for the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, Firebase Admin SDK
- File: tushar-backend/utils/firebase_config.py
- Purpose: Initialize and provide Firebase services (Auth, Firestore)

GENERATE:
A Firebase configuration module with initialization logic.

REQUIREMENTS:
1. Import necessary Firebase Admin SDK modules:
   - firebase_admin
   - firebase_admin.credentials
   - firebase_admin.auth
   - firebase_admin.firestore

2. Create initialization function:
   - Name: initialize_firebase()
   - Load service account from environment variable FIREBASE_SERVICE_ACCOUNT_PATH
   - Initialize Firebase app with credentials
   - Use singleton pattern (check if already initialized)
   - Handle errors if credentials file not found
   - Log successful initialization

3. Create Firestore client getter:
   - Function: get_firestore_client()
   - Return Firestore client instance
   - Initialize Firebase if not already done
   - Include type hints

4. Create Auth client getter:
   - Function: get_auth_client()
   - Return Auth client instance
   - Initialize Firebase if not already done
   - Include type hints

5. Module-level initialization:
   - Call initialize_firebase() when module is imported
   - Handle initialization errors gracefully

6. Code quality:
   - Use Python type hints
   - Add comprehensive docstrings
   - Include error handling for missing environment variables
   - Add logging statements
   - Include comments explaining Firebase setup

INTEGRATE WITH:
- Environment variable: FIREBASE_SERVICE_ACCOUNT_PATH
- Will be used by: services/auth_service.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete firebase_config.py with initialization logic

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/utils/firebase_config.py`
3. Create file `tushar-backend/utils/__init__.py` (empty file)
4. Paste code into firebase_config.py and save

---

## Prompt 4: Create Authentication Data Models

### Purpose
Generate Pydantic models for authentication request/response validation.

### When to Use
After Firebase config, create data models for API validation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/auth_models.py`

**Step 2**: Type this comment:
```python
# Pydantic models for authentication endpoints in Mentor AI Backend
#
# Create the following models:
# 1. ParentEmailRegisterRequest: email (EmailStr), password (min 8 chars), language (en/hi/mr)
# 2. ParentPhoneRegisterRequest: phone (str, +91 format), language (en/hi/mr)
# 3. ParentGoogleRegisterRequest: id_token (str), language (en/hi/mr)
# 4. AuthResponse: parent_id (str), email (optional str), phone (optional str), 
#    verification_required (bool), message (str)
# 
# All models should:
# - Use Pydantic BaseModel
# - Include field validation
# - Have example values in Config class
# - Include docstrings
# - Use proper type hints
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic data models for authentication endpoints in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Pydantic
- File: tushar-backend/models/auth_models.py
- Purpose: Request/response validation for authentication APIs

GENERATE:
Pydantic models for parent registration with three methods: email, phone, and Google OAuth.

REQUIREMENTS:
1. Create ParentEmailRegisterRequest model:
   - Field: email (EmailStr, required)
   - Field: password (str, min_length=8, required)
   - Field: language (str, must be one of: "en", "hi", "mr", default="en")
   - Add field validators
   - Include example in Config class

2. Create ParentPhoneRegisterRequest model:
   - Field: phone (str, must match +91 format, required)
   - Field: language (str, must be one of: "en", "hi", "mr", default="en")
   - Add validator for phone format (+91XXXXXXXXXX)
   - Include example in Config class

3. Create ParentGoogleRegisterRequest model:
   - Field: id_token (str, required) - Google OAuth ID token
   - Field: language (str, must be one of: "en", "hi", "mr", default="en")
   - Include example in Config class

4. Create AuthResponse model:
   - Field: parent_id (str, required)
   - Field: email (Optional[str])
   - Field: phone (Optional[str])
   - Field: verification_required (bool, default=False)
   - Field: message (str)
   - Include example in Config class

5. Code quality:
   - Use Pydantic v2 syntax
   - Add field descriptions
   - Include validators for data integrity
   - Add comprehensive docstrings
   - Use proper type hints
   - Include Config class with json_schema_extra for examples

INTEGRATE WITH:
- Will be used by: routers/auth_router.py
- Will be used by: services/auth_service.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete auth_models.py with all Pydantic models

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/auth_models.py`
3. Create file `tushar-backend/models/__init__.py` (empty file)
4. Paste and save

---

## Prompt 5: Create Authentication Service

### Purpose
Generate business logic for parent registration with Firebase integration.

### When to Use
After models, create the service layer that handles authentication logic.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/auth_service.py`

**Step 2**: Type this comment:
```python
# Authentication service for parent registration in Mentor AI Backend
#
# Implement three registration functions:
# 1. register_parent_with_email(email, password, language) -> dict
#    - Create Firebase user with email/password
#    - Store parent profile in Firestore collection 'parents'
#    - Return parent_id, email, verification_required=True
#    - Handle duplicate email errors
#
# 2. register_parent_with_phone(phone, language) -> dict
#    - Create Firebase user with phone number
#    - Store parent profile in Firestore
#    - Return parent_id, phone, verification_required=True
#    - Handle duplicate phone errors
#
# 3. register_parent_with_google(id_token, language) -> dict
#    - Verify Google ID token with Firebase
#    - Create or get existing user
#    - Store parent profile in Firestore
#    - Return parent_id, email, verification_required=False
#    - Handle invalid token errors
#
# All functions should:
# - Use Firebase Admin SDK from utils.firebase_config
# - Include comprehensive error handling
# - Log operations
# - Use type hints
# - Include docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create authentication service with business logic for parent registration in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, Firebase Admin SDK, Firestore
- File: tushar-backend/services/auth_service.py
- Purpose: Handle parent registration with email, phone, and Google OAuth

GENERATE:
An authentication service module with three registration functions.

REQUIREMENTS:
1. Function: register_parent_with_email
   - Parameters: email (str), password (str), language (str)
   - Create Firebase user with email and password
   - Store parent document in Firestore collection 'parents':
     * parent_id (Firebase UID)
     * email
     * language
     * created_at (timestamp)
     * role: "parent"
   - Return dict: {parent_id, email, verification_required: True, message}
   - Handle errors: duplicate email, weak password, Firebase errors
   - Include logging

2. Function: register_parent_with_phone
   - Parameters: phone (str), language (str)
   - Create Firebase user with phone number
   - Store parent document in Firestore collection 'parents':
     * parent_id (Firebase UID)
     * phone
     * language
     * created_at (timestamp)
     * role: "parent"
   - Return dict: {parent_id, phone, verification_required: True, message}
   - Handle errors: duplicate phone, invalid format, Firebase errors
   - Include logging

3. Function: register_parent_with_google
   - Parameters: id_token (str), language (str)
   - Verify Google ID token using Firebase Admin SDK
   - Extract user info (email, uid) from verified token
   - Check if user exists, create if not
   - Store/update parent document in Firestore collection 'parents'
   - Return dict: {parent_id, email, verification_required: False, message}
   - Handle errors: invalid token, Firebase errors
   - Include logging

4. Import Firebase clients:
   - Use get_firestore_client() from utils.firebase_config
   - Use firebase_admin.auth for authentication operations

5. Code quality:
   - Use Python type hints for all functions
   - Add comprehensive docstrings with Args, Returns, Raises
   - Include try-except blocks for error handling
   - Add logging statements for debugging
   - Use proper Firebase Admin SDK methods
   - Include comments explaining business logic

INTEGRATE WITH:
- utils/firebase_config.py (Firebase clients)
- Firestore collection: 'parents'
- Will be used by: routers/auth_router.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete auth_service.py with all registration functions

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/auth_service.py`
3. Create file `tushar-backend/services/__init__.py` (empty file)
4. Paste and save

---

## Prompt 6: Create Authentication Router

### Purpose
Generate FastAPI router with authentication endpoints.

### When to Use
After service layer, create the API endpoints that expose authentication functionality.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/auth_router.py`

**Step 2**: Type this comment:
```python
# FastAPI router for authentication endpoints in Mentor AI Backend
#
# Create three POST endpoints:
# 1. /register/parent/email - Register parent with email/password
#    - Request body: ParentEmailRegisterRequest
#    - Response: AuthResponse (201 Created)
#    - Call auth_service.register_parent_with_email
#
# 2. /register/parent/phone - Register parent with phone
#    - Request body: ParentPhoneRegisterRequest
#    - Response: AuthResponse (201 Created)
#    - Call auth_service.register_parent_with_phone
#
# 3. /register/parent/google - Register parent with Google OAuth
#    - Request body: ParentGoogleRegisterRequest
#    - Response: AuthResponse (201 Created)
#    - Call auth_service.register_parent_with_google
#
# All endpoints should:
# - Use APIRouter with prefix="" and tags=["Authentication"]
# - Include error handling with HTTPException
# - Return appropriate status codes
# - Include response_model
# - Add docstrings and type hints
# - Log requests
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router with authentication endpoints for parent registration in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI
- File: tushar-backend/routers/auth_router.py
- Purpose: Expose authentication APIs for parent registration

GENERATE:
A FastAPI router with three registration endpoints.

REQUIREMENTS:
1. Create APIRouter instance:
   - Prefix: "" (will be mounted at /api/auth in main.py)
   - Tags: ["Authentication"]

2. Endpoint: POST /register/parent/email
   - Request body: ParentEmailRegisterRequest model
   - Response model: AuthResponse
   - Status code: 201 Created
   - Call: auth_service.register_parent_with_email()
   - Error handling: Return 400 for duplicate email, 500 for server errors
   - Include endpoint description and summary

3. Endpoint: POST /register/parent/phone
   - Request body: ParentPhoneRegisterRequest model
   - Response model: AuthResponse
   - Status code: 201 Created
   - Call: auth_service.register_parent_with_phone()
   - Error handling: Return 400 for duplicate phone, 500 for server errors
   - Include endpoint description and summary

4. Endpoint: POST /register/parent/google
   - Request body: ParentGoogleRegisterRequest model
   - Response model: AuthResponse
   - Status code: 201 Created
   - Call: auth_service.register_parent_with_google()
   - Error handling: Return 400 for invalid token, 500 for server errors
   - Include endpoint description and summary

5. Error handling:
   - Catch exceptions from service layer
   - Return HTTPException with appropriate status codes
   - Include error messages in response
   - Log errors

6. Code quality:
   - Use Python type hints
   - Add comprehensive docstrings
   - Include request/response examples in OpenAPI docs
   - Add logging statements
   - Use proper FastAPI decorators

INTEGRATE WITH:
- models/auth_models.py (request/response models)
- services/auth_service.py (business logic)
- Will be mounted in: main.py at /api/auth

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete auth_router.py with all endpoints

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/auth_router.py`
3. Create file `tushar-backend/routers/__init__.py` (empty file)
4. Paste and save

---

## Prompt 7: Create Environment Configuration Files

### Purpose
Generate .env.example template and .gitignore for security.

### When to Use
After all code files, create configuration templates.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/.env.example`

**Step 2**: Type this comment:
```bash
# Environment variables template for Mentor AI Backend
# Copy this to .env and fill in actual values
# Include: FIREBASE_SERVICE_ACCOUNT_PATH, GOOGLE_CLOUD_PROJECT, PORT, ENVIRONMENT
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Create file `tushar-backend/.gitignore`

**Step 5**: Type this comment:
```bash
# Git ignore file for Python backend
# Ignore: .env, __pycache__, *.pyc, venv, .venv, Firebase credentials JSON
```

**Step 6**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create environment configuration files for the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Firebase
- Files: tushar-backend/.env.example and tushar-backend/.gitignore

GENERATE:
Two configuration files for environment management and Git.

FILE 1: .env.example
Create a template with the following variables:
1. FIREBASE_SERVICE_ACCOUNT_PATH - Path to Firebase service account JSON file
2. GOOGLE_CLOUD_PROJECT - Google Cloud project ID
3. PORT - Server port (default 8000)
4. ENVIRONMENT - Environment name (development/staging/production)
5. LOG_LEVEL - Logging level (INFO/DEBUG/ERROR)

Format:
- Use KEY=value format
- Include comments explaining each variable
- Provide example values (not real credentials)
- Group related variables together

FILE 2: .gitignore
Create a Python .gitignore with:
1. Environment files (.env, .env.local)
2. Python cache (__pycache__/, *.pyc, *.pyo, *.pyd)
3. Virtual environments (venv/, .venv/, env/)
4. IDE files (.vscode/, .idea/, *.swp)
5. Firebase credentials (*.json with service account)
6. Logs (*.log, logs/)
7. OS files (.DS_Store, Thumbs.db)
8. Distribution files (dist/, build/, *.egg-info/)

OUTPUT FORMAT:
- Provide both files separately
- Include comments in both files
- Ready to save and use
```

**What You'll Get**: Complete .env.example and .gitignore files

**What to Do**:
1. Copy the .env.example content
2. Create file `tushar-backend/.env.example`
3. Paste and save
4. Copy the .gitignore content
5. Create file `tushar-backend/.gitignore`
6. Paste and save

---

## Summary

You've now generated all the code for Day 1 backend setup! Here's what you created:

✅ **main.py** - FastAPI application with CORS and error handling
✅ **requirements.txt** - Python dependencies
✅ **utils/firebase_config.py** - Firebase initialization
✅ **models/auth_models.py** - Pydantic validation models
✅ **services/auth_service.py** - Authentication business logic
✅ **routers/auth_router.py** - API endpoints
✅ **.env.example** - Environment variable template
✅ **.gitignore** - Git ignore rules

## Next Steps

1. Open **CONFIGURATION.md** to set up Python, Firebase, and environment variables
2. After configuration, open **TESTING.md** to verify everything works
3. Finally, check **EXPECTED-OUTCOME.md** to confirm success

**Estimated time to complete configuration and testing: 1 hour**

# AI Coding Agent Prompts for Day 2: Firebase Authentication

This document contains all prompts needed to generate the authentication code for Day 2. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Verification Data Models

### Purpose
Generate Pydantic models for email and phone verification request/response validation.

### When to Use
Start with data models to define the API contracts for verification endpoints.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/verification_models.py`

**Step 2**: Type this comment at the top of the file:
```python
# Pydantic models for email and phone verification in Mentor AI Backend
#
# Create the following models:
# 1. SendEmailVerificationRequest: email (EmailStr)
# 2. ConfirmEmailVerificationRequest: email (EmailStr), code (str, 6 chars)
# 3. SendPhoneOTPRequest: phone (str, +91 format)
# 4. ConfirmPhoneOTPRequest: phone (str), otp (str, 6 digits)
# 5. VerificationResponse: verified (bool), message (str)
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
Create Pydantic data models for email and phone verification endpoints in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Pydantic
- File: tushar-backend/models/verification_models.py
- Purpose: Request/response validation for verification APIs

GENERATE:
Pydantic models for email verification and phone OTP verification.

REQUIREMENTS:
1. Create SendEmailVerificationRequest model:
   - Field: email (EmailStr, required)
   - Include example in Config class

2. Create ConfirmEmailVerificationRequest model:
   - Field: email (EmailStr, required)
   - Field: code (str, exactly 6 characters, required)
   - Add validator for code format
   - Include example in Config class

3. Create SendPhoneOTPRequest model:
   - Field: phone (str, must match +91 format, required)
   - Add validator for phone format (+91XXXXXXXXXX)
   - Include example in Config class

4. Create ConfirmPhoneOTPRequest model:
   - Field: phone (str, +91 format, required)
   - Field: otp (str, exactly 6 digits, required)
   - Add validators for phone and OTP format
   - Include example in Config class

5. Create VerificationResponse model:
   - Field: verified (bool, required)
   - Field: message (str, required)
   - Include example in Config class

6. Code quality:
   - Use Pydantic v2 syntax
   - Add field descriptions
   - Include validators for data integrity
   - Add comprehensive docstrings
   - Use proper type hints
   - Include Config class with json_schema_extra for examples

INTEGRATE WITH:
- Will be used by: routers/verification_router.py
- Will be used by: services/verification_service.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete verification_models.py with all Pydantic models

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/verification_models.py`
3. Paste and save

---

## Prompt 2: Create Login Data Models

### Purpose
Generate Pydantic models for login request/response validation.

### When to Use
After verification models, create login models for authentication endpoints.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/login_models.py`

**Step 2**: Type this comment:
```python
# Pydantic models for login endpoints in Mentor AI Backend
#
# Create the following models:
# 1. EmailLoginRequest: email (EmailStr), password (str, min 8 chars)
# 2. PhoneLoginRequest: phone (str, +91 format), otp (str, 6 digits)
# 3. GoogleLoginRequest: id_token (str)
# 4. TokenRefreshRequest: refresh_token (str)
# 5. LoginResponse: token (str), refresh_token (str), parent_id (str), 
#    email (optional), phone (optional), expires_in (int)
# 6. TokenResponse: token (str), refresh_token (str), expires_in (int)
# 7. LogoutResponse: message (str)
#
# All models should use Pydantic BaseModel with validation, examples, and docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic data models for login endpoints in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Pydantic
- File: tushar-backend/models/login_models.py
- Purpose: Request/response validation for login and session management APIs

GENERATE:
Pydantic models for email login, phone login, Google OAuth login, token refresh, and logout.

REQUIREMENTS:
1. Create EmailLoginRequest model:
   - Field: email (EmailStr, required)
   - Field: password (str, min_length=8, required)
   - Include example in Config class

2. Create PhoneLoginRequest model:
   - Field: phone (str, +91 format, required)
   - Field: otp (str, exactly 6 digits, required)
   - Add validators for phone and OTP format
   - Include example in Config class

3. Create GoogleLoginRequest model:
   - Field: id_token (str, required) - Google OAuth ID token
   - Include example in Config class

4. Create TokenRefreshRequest model:
   - Field: refresh_token (str, required)
   - Include example in Config class

5. Create LoginResponse model:
   - Field: token (str, required) - JWT access token
   - Field: refresh_token (str, required) - JWT refresh token
   - Field: parent_id (str, required)
   - Field: email (Optional[str])
   - Field: phone (Optional[str])
   - Field: expires_in (int, required) - Token expiry in seconds
   - Include example in Config class

6. Create TokenResponse model:
   - Field: token (str, required)
   - Field: refresh_token (str, required)
   - Field: expires_in (int, required)
   - Include example in Config class

7. Create LogoutResponse model:
   - Field: message (str, required)
   - Include example in Config class

8. Code quality:
   - Use Pydantic v2 syntax
   - Add field descriptions
   - Include validators
   - Add comprehensive docstrings
   - Use proper type hints

INTEGRATE WITH:
- Will be used by: routers/login_router.py
- Will be used by: services/login_service.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete login_models.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/login_models.py`
3. Paste and save

---

## Prompt 3: Create Token Service

### Purpose
Generate JWT token generation and validation service.

### When to Use
After models, create the token service for session management.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/token_service.py`

**Step 2**: Type this comment:
```python
# JWT token service for Mentor AI Backend
#
# Implement the following functions:
# 1. generate_access_token(parent_id: str, email: str = None, phone: str = None) -> str
#    - Create JWT with 24 hour expiry
#    - Include parent_id, email/phone in payload
#    - Use JWT_SECRET from environment
#
# 2. generate_refresh_token(parent_id: str) -> str
#    - Create JWT with 30 day expiry
#    - Include parent_id in payload
#    - Use JWT_SECRET from environment
#
# 3. verify_token(token: str) -> dict
#    - Decode and verify JWT signature
#    - Check expiry
#    - Return payload if valid
#    - Raise exception if invalid/expired
#
# 4. decode_token_without_verification(token: str) -> dict
#    - Decode token without verifying (for debugging)
#
# Use PyJWT library, include error handling, logging, type hints, and docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create JWT token service for session management in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, PyJWT
- File: tushar-backend/services/token_service.py
- Purpose: Generate and validate JWT tokens for authentication

GENERATE:
A token service module with JWT token generation and validation functions.

REQUIREMENTS:
1. Function: generate_access_token
   - Parameters: parent_id (str), email (Optional[str]), phone (Optional[str])
   - Create JWT access token with:
     * Payload: parent_id, email (if provided), phone (if provided), exp (expiry), iat (issued at)
     * Expiry: 24 hours from now
     * Algorithm: HS256
     * Secret: Load from environment variable JWT_SECRET
   - Return: JWT token string
   - Include error handling and logging

2. Function: generate_refresh_token
   - Parameters: parent_id (str)
   - Create JWT refresh token with:
     * Payload: parent_id, exp (expiry), iat (issued at), type: "refresh"
     * Expiry: 30 days from now
     * Algorithm: HS256
     * Secret: Load from environment variable JWT_SECRET
   - Return: JWT token string
   - Include error handling and logging

3. Function: verify_token
   - Parameters: token (str)
   - Decode and verify JWT token:
     * Verify signature using JWT_SECRET
     * Check expiry (raise exception if expired)
     * Validate required fields (parent_id)
   - Return: Decoded payload dict
   - Raise: Exception if invalid, expired, or malformed
   - Include error handling and logging

4. Function: decode_token_without_verification
   - Parameters: token (str)
   - Decode token without verification (for debugging/logging)
   - Return: Decoded payload dict
   - Include error handling

5. Helper function: get_token_expiry_seconds
   - Return: Number of seconds until token expires (86400 for access, 2592000 for refresh)

6. Code quality:
   - Use PyJWT library (import jwt)
   - Load JWT_SECRET from environment with python-dotenv
   - Use Python type hints
   - Add comprehensive docstrings
   - Include try-except blocks
   - Add logging statements
   - Handle edge cases (missing secret, invalid token format)

INTEGRATE WITH:
- Environment variable: JWT_SECRET
- Will be used by: services/login_service.py
- Will be used by: middleware/auth_middleware.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete token_service.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/token_service.py`
3. Paste and save

---

## Prompt 4: Create Verification Service

### Purpose
Generate business logic for email and phone verification.

### When to Use
After token service, create verification service for handling verification codes and OTPs.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/verification_service.py`

**Step 2**: Type this comment:
```python
# Verification service for email and phone verification in Mentor AI Backend
#
# Implement the following functions:
# 1. send_email_verification(email: str) -> dict
#    - Generate 6-character alphanumeric code
#    - Store in Firestore 'verification_codes' collection with 10 min expiry
#    - Send email with code (log for now, actual email in production)
#    - Return success message
#
# 2. confirm_email_verification(email: str, code: str) -> dict
#    - Find verification code in Firestore
#    - Check if code matches, not expired, not used
#    - Update Firebase Auth email_verified status
#    - Update parent profile in Firestore
#    - Mark code as used
#    - Return verification status
#
# 3. send_phone_otp(phone: str) -> dict
#    - Generate 6-digit numeric OTP
#    - Store in Firestore with 10 min expiry
#    - Send SMS with OTP (log for now, actual SMS in production)
#    - Return success message
#
# 4. confirm_phone_otp(phone: str, otp: str) -> dict
#    - Find OTP in Firestore
#    - Check if OTP matches, not expired, not used
#    - Update parent profile phone_verified status
#    - Mark OTP as used
#    - Return verification status
#
# Use Firebase Admin SDK, include error handling, logging, type hints, and docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create verification service with business logic for email and phone verification in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, Firebase Admin SDK, Firestore
- File: tushar-backend/services/verification_service.py
- Purpose: Handle email verification and phone OTP verification

GENERATE:
A verification service module with email and phone verification functions.

REQUIREMENTS:
1. Function: send_email_verification
   - Parameters: email (str)
   - Generate 6-character alphanumeric verification code (uppercase)
   - Store in Firestore collection 'verification_codes':
     * Document ID: auto-generated
     * Fields: email, code, created_at (timestamp), expires_at (timestamp, +10 minutes), used (false), type: "email"
   - Log the verification code (in production, send actual email)
   - Return dict: {message: "Verification email sent", code: <code>} (remove code field in production)
   - Handle errors: Firebase errors, duplicate requests
   - Include logging

2. Function: confirm_email_verification
   - Parameters: email (str), code (str)
   - Query Firestore 'verification_codes' for matching email and code
   - Validate:
     * Code exists
     * Code matches
     * Not expired (created_at + 10 minutes > now)
     * Not already used
   - If valid:
     * Get user from Firebase Auth by email
     * Update Firebase Auth: email_verified = true
     * Update Firestore 'parents' collection: email_verified = true
     * Mark verification code as used in Firestore
   - Return dict: {verified: true, message: "Email verified successfully"}
   - Handle errors: Invalid code, expired code, user not found
   - Include logging

3. Function: send_phone_otp
   - Parameters: phone (str)
   - Generate 6-digit numeric OTP
   - Store in Firestore collection 'verification_codes':
     * Document ID: auto-generated
     * Fields: phone, otp, created_at, expires_at (+10 minutes), used (false), type: "phone"
   - Log the OTP (in production, send actual SMS)
   - Return dict: {message: "OTP sent", otp: <otp>} (remove otp field in production)
   - Handle errors: Firebase errors, invalid phone format
   - Include logging

4. Function: confirm_phone_otp
   - Parameters: phone (str), otp (str)
   - Query Firestore 'verification_codes' for matching phone and otp
   - Validate:
     * OTP exists
     * OTP matches
     * Not expired
     * Not already used
   - If valid:
     * Get user from Firebase Auth by phone
     * Update Firestore 'parents' collection: phone_verified = true
     * Mark OTP as used in Firestore
   - Return dict: {verified: true, message: "Phone verified successfully"}
   - Handle errors: Invalid OTP, expired OTP, user not found
   - Include logging

5. Helper functions:
   - generate_verification_code() -> str (6 uppercase alphanumeric)
   - generate_otp() -> str (6 digits)
   - is_code_expired(created_at: datetime) -> bool

6. Code quality:
   - Use Firebase Admin SDK from utils.firebase_config
   - Use Python type hints
   - Add comprehensive docstrings
   - Include try-except blocks
   - Add logging statements
   - Use datetime for timestamp handling

INTEGRATE WITH:
- utils/firebase_config.py (Firebase clients)
- Firestore collections: 'verification_codes', 'parents'
- Firebase Auth for email verification status
- Will be used by: routers/verification_router.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete verification_service.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/verification_service.py`
3. Paste and save

---

## Prompt 5: Create Login Service

### Purpose
Generate business logic for login and session management.

### When to Use
After verification service, create login service for authentication flows.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/login_service.py`

**Step 2**: Type this comment:
```python
# Login service for authentication and session management in Mentor AI Backend
#
# Implement the following functions:
# 1. login_with_email(email: str, password: str) -> dict
#    - Verify credentials with Firebase Auth
#    - Get parent profile from Firestore
#    - Generate access and refresh tokens
#    - Store session in Firestore 'sessions' collection
#    - Return tokens and parent info
#
# 2. login_with_phone(phone: str, otp: str) -> dict
#    - Verify OTP from verification_codes collection
#    - Get user from Firebase Auth by phone
#    - Get parent profile from Firestore
#    - Generate tokens
#    - Store session
#    - Return tokens and parent info
#
# 3. login_with_google(id_token: str) -> dict
#    - Verify Google ID token with Firebase
#    - Get or create user
#    - Get or create parent profile
#    - Generate tokens
#    - Store session
#    - Return tokens and parent info
#
# 4. refresh_access_token(refresh_token: str) -> dict
#    - Verify refresh token
#    - Check if session is valid and not revoked
#    - Generate new access and refresh tokens
#    - Update session in Firestore
#    - Return new tokens
#
# 5. logout(token: str) -> dict
#    - Verify token
#    - Mark session as revoked in Firestore
#    - Return success message
#
# Use token_service for JWT operations, include error handling, logging, type hints
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create login service with business logic for authentication and session management in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, Firebase Admin SDK, Firestore, PyJWT
- File: tushar-backend/services/login_service.py
- Purpose: Handle login flows and session management

GENERATE:
A login service module with authentication and session management functions.

REQUIREMENTS:
1. Function: login_with_email
   - Parameters: email (str), password (str)
   - Verify credentials:
     * Use Firebase Admin SDK to verify email/password
     * Get user UID from Firebase Auth
   - Get parent profile from Firestore 'parents' collection
   - Generate tokens using token_service:
     * Access token (24 hours)
     * Refresh token (30 days)
   - Store session in Firestore 'sessions' collection:
     * Document ID: auto-generated
     * Fields: parent_id, token_hash (hash of access token), refresh_token_hash, created_at, expires_at, revoked (false)
   - Return dict: {token, refresh_token, parent_id, email, expires_in}
   - Handle errors: Invalid credentials, user not found, Firebase errors
   - Include logging

2. Function: login_with_phone
   - Parameters: phone (str), otp (str)
   - Verify OTP:
     * Query Firestore 'verification_codes' for matching phone and otp
     * Check not expired, not used
     * Mark as used
   - Get user from Firebase Auth by phone number
   - Get parent profile from Firestore
   - Generate tokens
   - Store session
   - Return dict: {token, refresh_token, parent_id, phone, expires_in}
   - Handle errors: Invalid OTP, expired OTP, user not found
   - Include logging

3. Function: login_with_google
   - Parameters: id_token (str)
   - Verify Google ID token using Firebase Admin SDK
   - Extract user info (email, uid) from verified token
   - Check if user exists in Firebase Auth:
     * If exists: Get user
     * If not: Create new user with Google info
   - Get or create parent profile in Firestore
   - Generate tokens
   - Store session
   - Return dict: {token, refresh_token, parent_id, email, expires_in}
   - Handle errors: Invalid token, Firebase errors
   - Include logging

4. Function: refresh_access_token
   - Parameters: refresh_token (str)
   - Verify refresh token using token_service
   - Extract parent_id from token payload
   - Query Firestore 'sessions' for matching refresh_token_hash
   - Validate session:
     * Session exists
     * Not revoked
     * Not expired
   - Generate new access and refresh tokens
   - Update session in Firestore with new token hashes
   - Return dict: {token, refresh_token, expires_in}
   - Handle errors: Invalid token, revoked session, expired session
   - Include logging

5. Function: logout
   - Parameters: token (str)
   - Verify token using token_service
   - Extract parent_id from token payload
   - Find session in Firestore by token_hash
   - Mark session as revoked in Firestore
   - Return dict: {message: "Logout successful"}
   - Handle errors: Invalid token, session not found
   - Include logging

6. Helper functions:
   - hash_token(token: str) -> str (use hashlib.sha256)
   - create_session(parent_id: str, token: str, refresh_token: str) -> str (returns session_id)
   - get_session_by_token_hash(token_hash: str) -> dict

7. Code quality:
   - Import token_service for JWT operations
   - Use Firebase Admin SDK from utils.firebase_config
   - Use Python type hints
   - Add comprehensive docstrings
   - Include try-except blocks
   - Add logging statements
   - Use datetime for timestamp handling

INTEGRATE WITH:
- services/token_service.py (JWT operations)
- utils/firebase_config.py (Firebase clients)
- Firestore collections: 'sessions', 'parents', 'verification_codes'
- Firebase Auth for credential verification
- Will be used by: routers/login_router.py

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete login_service.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/login_service.py`
3. Paste and save

---

## Prompt 6: Create Verification Router

### Purpose
Generate FastAPI router with verification endpoints.

### When to Use
After verification service, create the API endpoints for email and phone verification.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/verification_router.py`

**Step 2**: Type this comment:
```python
# FastAPI router for verification endpoints in Mentor AI Backend
#
# Create four POST endpoints:
# 1. /verify/email/send - Send email verification code
#    - Request body: SendEmailVerificationRequest
#    - Response: VerificationResponse (200 OK)
#    - Call verification_service.send_email_verification
#
# 2. /verify/email/confirm - Confirm email with verification code
#    - Request body: ConfirmEmailVerificationRequest
#    - Response: VerificationResponse (200 OK)
#    - Call verification_service.confirm_email_verification
#
# 3. /verify/phone/send - Send phone OTP
#    - Request body: SendPhoneOTPRequest
#    - Response: VerificationResponse (200 OK)
#    - Call verification_service.send_phone_otp
#
# 4. /verify/phone/confirm - Confirm phone with OTP
#    - Request body: ConfirmPhoneOTPRequest
#    - Response: VerificationResponse (200 OK)
#    - Call verification_service.confirm_phone_otp
#
# All endpoints should use APIRouter, include error handling with HTTPException,
# return appropriate status codes, include response_model, add docstrings and type hints
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router with verification endpoints for email and phone verification in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI
- File: tushar-backend/routers/verification_router.py
- Purpose: Expose verification APIs for email and phone verification

GENERATE:
A FastAPI router with four verification endpoints.

REQUIREMENTS:
1. Create APIRouter instance:
   - Prefix: "" (will be mounted at /api/auth in main.py)
   - Tags: ["Verification"]

2. Endpoint: POST /verify/email/send
   - Request body: SendEmailVerificationRequest model
   - Response model: VerificationResponse
   - Status code: 200 OK
   - Call: verification_service.send_email_verification()
   - Error handling: Return 400 for invalid email, 500 for server errors
   - Include endpoint description and summary

3. Endpoint: POST /verify/email/confirm
   - Request body: ConfirmEmailVerificationRequest model
   - Response model: VerificationResponse
   - Status code: 200 OK
   - Call: verification_service.confirm_email_verification()
   - Error handling: Return 400 for invalid/expired code, 404 for user not found, 500 for server errors
   - Include endpoint description and summary

4. Endpoint: POST /verify/phone/send
   - Request body: SendPhoneOTPRequest model
   - Response model: VerificationResponse
   - Status code: 200 OK
   - Call: verification_service.send_phone_otp()
   - Error handling: Return 400 for invalid phone, 500 for server errors
   - Include endpoint description and summary

5. Endpoint: POST /verify/phone/confirm
   - Request body: ConfirmPhoneOTPRequest model
   - Response model: VerificationResponse
   - Status code: 200 OK
   - Call: verification_service.confirm_phone_otp()
   - Error handling: Return 400 for invalid/expired OTP, 404 for user not found, 500 for server errors
   - Include endpoint description and summary

6. Error handling:
   - Catch exceptions from service layer
   - Return HTTPException with appropriate status codes
   - Include error messages in response
   - Log errors

7. Code quality:
   - Use Python type hints
   - Add comprehensive docstrings
   - Include request/response examples in OpenAPI docs
   - Add logging statements
   - Use proper FastAPI decorators

INTEGRATE WITH:
- models/verification_models.py (request/response models)
- services/verification_service.py (business logic)
- Will be mounted in: main.py at /api/auth

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete verification_router.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/verification_router.py`
3. Paste and save

---

## Prompt 7: Create Login Router

### Purpose
Generate FastAPI router with login and session management endpoints.

### When to Use
After login service, create the API endpoints for login, token refresh, and logout.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/login_router.py`

**Step 2**: Type this comment:
```python
# FastAPI router for login and session management endpoints in Mentor AI Backend
#
# Create five POST endpoints:
# 1. /login/email - Login with email and password
#    - Request body: EmailLoginRequest
#    - Response: LoginResponse (200 OK)
#    - Call login_service.login_with_email
#
# 2. /login/phone - Login with phone and OTP
#    - Request body: PhoneLoginRequest
#    - Response: LoginResponse (200 OK)
#    - Call login_service.login_with_phone
#
# 3. /login/google - Login with Google ID token
#    - Request body: GoogleLoginRequest
#    - Response: LoginResponse (200 OK)
#    - Call login_service.login_with_google
#
# 4. /token/refresh - Refresh access token
#    - Request body: TokenRefreshRequest
#    - Response: TokenResponse (200 OK)
#    - Call login_service.refresh_access_token
#
# 5. /logout - Logout and revoke token
#    - Header: Authorization Bearer token
#    - Response: LogoutResponse (200 OK)
#    - Call login_service.logout
#
# Create one GET endpoint:
# 6. /me - Get current user info (protected endpoint example)
#    - Header: Authorization Bearer token
#    - Response: Parent profile data
#    - Requires authentication middleware
#
# All endpoints should use APIRouter, include error handling, response models, docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router with login and session management endpoints in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI
- File: tushar-backend/routers/login_router.py
- Purpose: Expose login, token refresh, logout, and protected endpoint APIs

GENERATE:
A FastAPI router with login, session management, and protected endpoint.

REQUIREMENTS:
1. Create APIRouter instance:
   - Prefix: "" (will be mounted at /api/auth in main.py)
   - Tags: ["Login"]

2. Endpoint: POST /login/email
   - Request body: EmailLoginRequest model
   - Response model: LoginResponse
   - Status code: 200 OK
   - Call: login_service.login_with_email()
   - Error handling: Return 401 for invalid credentials, 404 for user not found, 500 for server errors
   - Include endpoint description and summary

3. Endpoint: POST /login/phone
   - Request body: PhoneLoginRequest model
   - Response model: LoginResponse
   - Status code: 200 OK
   - Call: login_service.login_with_phone()
   - Error handling: Return 401 for invalid OTP, 404 for user not found, 500 for server errors
   - Include endpoint description and summary

4. Endpoint: POST /login/google
   - Request body: GoogleLoginRequest model
   - Response model: LoginResponse
   - Status code: 200 OK
   - Call: login_service.login_with_google()
   - Error handling: Return 401 for invalid token, 500 for server errors
   - Include endpoint description and summary

5. Endpoint: POST /token/refresh
   - Request body: TokenRefreshRequest model
   - Response model: TokenResponse
   - Status code: 200 OK
   - Call: login_service.refresh_access_token()
   - Error handling: Return 401 for invalid/expired refresh token, 500 for server errors
   - Include endpoint description and summary

6. Endpoint: POST /logout
   - Header: Authorization: Bearer <token>
   - Response model: LogoutResponse
   - Status code: 200 OK
   - Extract token from Authorization header
   - Call: login_service.logout()
   - Error handling: Return 401 for invalid token, 500 for server errors
   - Include endpoint description and summary

7. Endpoint: GET /me (Protected endpoint example)
   - Header: Authorization: Bearer <token>
   - Response: Parent profile data (dict)
   - Status code: 200 OK
   - Extract token from Authorization header
   - Verify token using token_service
   - Get parent profile from Firestore
   - Return parent data
   - Error handling: Return 401 for invalid/missing token, 404 for user not found
   - Include endpoint description and summary

8. Helper function:
   - extract_token_from_header(authorization: str) -> str
   - Parse "Bearer <token>" format
   - Raise HTTPException if invalid format

9. Code quality:
   - Use Python type hints
   - Add comprehensive docstrings
   - Include request/response examples in OpenAPI docs
   - Add logging statements
   - Use proper FastAPI decorators
   - Import Header from fastapi for Authorization header

INTEGRATE WITH:
- models/login_models.py (request/response models)
- services/login_service.py (business logic)
- services/token_service.py (token verification for /me endpoint)
- Will be mounted in: main.py at /api/auth

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete login_router.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/login_router.py`
3. Paste and save

---

## Prompt 8: Create Authentication Middleware

### Purpose
Generate middleware for protecting endpoints with token verification.

### When to Use
After routers, create middleware to automatically verify tokens on protected endpoints.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/middleware/__init__.py`

**Step 2**: Leave it empty (package initialization)

**Step 3**: Create file `tushar-backend/middleware/auth_middleware.py`

**Step 4**: Type this comment:
```python
# Authentication middleware for Mentor AI Backend
#
# Create middleware function: verify_auth_token
# - Extract token from Authorization header (Bearer <token>)
# - Verify token using token_service
# - Check if token is revoked in Firestore sessions collection
# - Add user_id to request state for use in endpoints
# - Raise HTTPException 401 if token is invalid, expired, or revoked
# - Raise HTTPException 401 if Authorization header is missing
#
# Create dependency function: get_current_user
# - Use Depends() to inject into protected endpoints
# - Return user_id from request state
# - Can be used in endpoint parameters like: user_id: str = Depends(get_current_user)
#
# Include error handling, logging, type hints, and docstrings
```

**Step 5**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create authentication middleware for protecting endpoints with token verification in the Mentor AI backend.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI
- File: tushar-backend/middleware/auth_middleware.py
- Purpose: Verify JWT tokens and protect endpoints

GENERATE:
An authentication middleware module with token verification.

REQUIREMENTS:
1. Function: verify_auth_token (Middleware function)
   - Parameters: request (Request), call_next (callable)
   - Extract Authorization header from request
   - Parse "Bearer <token>" format
   - If token present:
     * Verify token using token_service.verify_token()
     * Extract parent_id from token payload
     * Query Firestore 'sessions' to check if token is revoked
     * If valid: Add parent_id to request.state.user_id
     * If invalid/revoked: Raise HTTPException 401
   - Call next middleware/endpoint
   - Return response
   - Handle errors: Missing token (skip for public endpoints), invalid token, revoked token
   - Include logging

2. Dependency function: get_current_user
   - Use FastAPI Depends() pattern
   - Parameters: authorization: str = Header(None)
   - Extract token from Authorization header
   - Verify token using token_service.verify_token()
   - Extract parent_id from token payload
   - Check if token is revoked in Firestore
   - Return parent_id (str)
   - Raise HTTPException 401 if:
     * Authorization header missing
     * Token invalid
     * Token expired
     * Token revoked
   - Include logging

3. Helper function: extract_token
   - Parameters: authorization: str
   - Parse "Bearer <token>" format
   - Return token string
   - Raise HTTPException 401 if invalid format

4. Helper function: is_token_revoked
   - Parameters: token: str
   - Hash token using hashlib.sha256
   - Query Firestore 'sessions' for matching token_hash
   - Return True if session is revoked or not found
   - Return False if session is active
   - Include error handling

5. Code quality:
   - Import token_service for JWT verification
   - Use Firebase Admin SDK from utils.firebase_config
   - Use Python type hints
   - Add comprehensive docstrings
   - Include try-except blocks
   - Add logging statements
   - Use FastAPI Request, Header, Depends, HTTPException

INTEGRATE WITH:
- services/token_service.py (token verification)
- utils/firebase_config.py (Firestore client)
- Firestore collection: 'sessions'
- Will be used by: routers/login_router.py (for /me endpoint)
- Can be used by: any protected endpoint

USAGE EXAMPLE:
```python
@router.get("/protected")
async def protected_endpoint(user_id: str = Depends(get_current_user)):
    # user_id is automatically extracted from token
    return {"user_id": user_id}
```

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
```

**What You'll Get**: Complete auth_middleware.py

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/middleware/__init__.py` (empty file)
3. Create file `tushar-backend/middleware/auth_middleware.py`
4. Paste and save

---

## Prompt 9: Update Main Application

### Purpose
Integrate new routers and middleware into the main FastAPI application.

### When to Use
After all routers and middleware are created, update main.py to include them.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment at the top (after existing imports):
```python
# Import new routers for Day 2: verification and login
# Import from routers.verification_router
# Import from routers.login_router
```

**Step 3**: Press Tab to trigger Copilot to add imports

**Step 4**: Add this comment before the router includes:
```python
# Include verification router at /api/auth with tag "Verification"
# Include login router at /api/auth with tag "Login"
```

**Step 5**: Press Tab to trigger Copilot to add router includes

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update the main FastAPI application to include new authentication routers for Day 2.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI
- File: tushar-backend/main.py (existing file from Day 1)
- Purpose: Add verification and login routers to the application

TASK:
Update the existing main.py file to include new routers.

REQUIREMENTS:
1. Add imports:
   - Import verification_router from routers.verification_router
   - Import login_router from routers.login_router

2. Include routers:
   - Include verification_router at prefix /api/auth with tag "Verification"
   - Include login_router at prefix /api/auth with tag "Login"
   - Keep existing auth_router from Day 1 (registration endpoints)

3. Maintain existing code:
   - Keep all existing imports
   - Keep CORS middleware configuration
   - Keep global exception handler
   - Keep health check endpoint
   - Keep startup event
   - Keep existing auth_router include

4. Code organization:
   - Group router imports together
   - Group router includes together
   - Add comments explaining each router's purpose

EXISTING STRUCTURE (from Day 1):
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth_router import router as auth_router

app = FastAPI(...)
app.add_middleware(CORSMiddleware, ...)
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])

@app.get("/health")
async def health_check():
    ...
```

NEW STRUCTURE (Day 2):
- Add verification_router include
- Add login_router include
- All routers should be at /api/auth prefix

OUTPUT FORMAT:
- Provide the complete updated main.py file
- Include all existing code plus new additions
- No placeholders or TODOs
- Ready to save and run
```

**What You'll Get**: Updated main.py with new routers

**What to Do**:
1. Copy the generated code
2. Replace the content of `tushar-backend/main.py`
3. Save the file

---

## Prompt 10: Update Requirements File

### Purpose
Add new Python dependencies for authentication features.

### When to Use
After all code is generated, update requirements.txt with new packages.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/requirements.txt`

**Step 2**: Add this comment at the end:
```python
# Additional dependencies for Day 2: Authentication
# Add PyJWT for JWT token generation and verification
# Add cryptography for secure token operations
```

**Step 3**: Press Tab to trigger Copilot to add packages

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update the requirements.txt file to include new dependencies for Day 2 authentication features.

CONTEXT:
- Project: Mentor AI EdTech Platform Backend
- Stack: Python 3.11+, FastAPI, Firebase, PyJWT
- File: tushar-backend/requirements.txt (existing file from Day 1)
- Purpose: Add JWT and cryptography packages

TASK:
Add new packages to the existing requirements.txt file.

EXISTING PACKAGES (from Day 1):
- fastapi==0.104.1
- uvicorn[standard]==0.24.0
- firebase-admin==6.2.0
- python-dotenv==1.0.0
- pydantic[email]==2.4.2
- python-multipart==0.0.6
- requests==2.31.0

NEW PACKAGES (for Day 2):
1. PyJWT==2.8.0 - JWT token generation and verification
2. cryptography==41.0.7 - Cryptographic operations for secure tokens

REQUIREMENTS:
- Keep all existing packages
- Add new packages at the end
- Include version numbers
- Add comments explaining each new package's purpose
- Group related packages together

OUTPUT FORMAT:
- Provide the complete updated requirements.txt file
- One package per line with version
- Include comments
- Ready to save and install
```

**What You'll Get**: Updated requirements.txt

**What to Do**:
1. Copy the generated content
2. Replace the content of `tushar-backend/requirements.txt`
3. Save the file
4. Run: `pip install -r requirements.txt`

---

## Summary

You've now generated all the code for Day 2 authentication! Here's what you created:

✅ **models/verification_models.py** - Verification request/response models
✅ **models/login_models.py** - Login request/response models
✅ **services/token_service.py** - JWT token generation and validation
✅ **services/verification_service.py** - Email and phone verification logic
✅ **services/login_service.py** - Login and session management
✅ **routers/verification_router.py** - Verification API endpoints
✅ **routers/login_router.py** - Login API endpoints
✅ **middleware/auth_middleware.py** - Token verification middleware
✅ **main.py** - Updated with new routers
✅ **requirements.txt** - Updated with new dependencies

## Next Steps

1. **Install new dependencies**:
   ```bash
   cd tushar-backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Open CONFIGURATION.md** to:
   - Configure Firebase authentication settings
   - Set up email verification templates
   - Configure phone authentication with test numbers
   - Set up Google OAuth
   - Create test user accounts
   - Configure environment variables

3. **After configuration, open TESTING.md** to:
   - Test email verification flow
   - Test phone OTP verification flow
   - Test login endpoints
   - Test token refresh and logout
   - Test protected endpoints

4. **Finally, check EXPECTED-OUTCOME.md** to verify:
   - All features are working
   - All tests pass
   - Code quality meets standards
   - Ready for Day 3

**Estimated time to complete configuration and testing: 1.5 hours**

---

## Troubleshooting

If you encounter issues during code generation:

1. **Import errors**: Make sure all files are created in the correct directories
2. **Missing dependencies**: Run `pip install -r requirements.txt`
3. **Firebase errors**: Check that firebase_config.py is properly initialized
4. **Type errors**: Ensure all imports include proper type hints
5. **Syntax errors**: Review the generated code for completeness

For detailed troubleshooting, see **TROUBLESHOOTING.md** after testing.

---

## Code Generation Complete! 🎉

You now have a complete authentication system with:
- Email verification with codes
- Phone OTP verification
- Multiple login methods (email, phone, Google)
- JWT token-based session management
- Token refresh and logout
- Protected endpoint middleware

Ready to configure and test your authentication system!


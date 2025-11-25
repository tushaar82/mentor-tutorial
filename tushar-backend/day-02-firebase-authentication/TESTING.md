# Testing Guide for Day 2: Firebase Authentication

This document provides step-by-step testing instructions for all authentication endpoints. Test each flow independently using curl commands.

---

## Prerequisites

Before testing, ensure:
- ✅ Backend server is running: `uvicorn main:app --reload --port 8000`
- ✅ Configuration complete (CONFIGURATION.md)
- ✅ Test accounts created in Firebase
- ✅ Virtual environment activated

---

## Test 1: Email Verification Flow

### What You're Testing
Sending email verification and confirming with verification code.

### Steps

**Step 1.1**: Send email verification request
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### Expected Result
```json
{
  "message": "Verification email sent successfully",
  "email": "test@example.com",
  "verification_sent": true
}
```

**Step 1.2**: Check Firebase Console for verification code
- Go to Firebase Console → Firestore Database
- Open `verification_codes` collection
- Find document for `test@example.com`
- Note the `code` field value

**Step 1.3**: Confirm email with verification code
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "code": "REPLACE_WITH_ACTUAL_CODE"
  }'
```

### Expected Result
```json
{
  "message": "Email verified successfully",
  "email": "test@example.com",
  "verified": true
}
```

### If It Fails
- **Email not found**: Check that test account exists in Firebase Auth
- **Code expired**: Codes expire after 10 minutes; send new verification
- **Invalid code**: Check that you copied the code correctly from Firestore
- **500 error**: Check backend logs for detailed error message

---

## Test 2: Phone OTP Verification Flow

### What You're Testing
Sending phone OTP and confirming with verification code.

### Steps

**Step 2.1**: Send phone OTP request
```bash
curl -X POST http://localhost:8000/api/auth/verify/phone/send \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919999999999"
  }'
```

### Expected Result
```json
{
  "message": "OTP sent successfully",
  "phone": "+919999999999",
  "otp_sent": true
}
```

**Step 2.2**: Confirm phone with OTP (use test OTP: 123456)
```bash
curl -X POST http://localhost:8000/api/auth/verify/phone/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919999999999",
    "otp": "123456"
  }'
```

### Expected Result
```json
{
  "message": "Phone verified successfully",
  "phone": "+919999999999",
  "verified": true
}
```

### If It Fails
- **Phone not found**: Check phone format (+91XXXXXXXXXX)
- **Invalid OTP**: Use test OTP `123456` for test phone numbers
- **OTP expired**: Send new OTP request
- **Real phone number**: Test numbers only work with configured test OTPs

---

## Test 3: Email Login Flow

### What You're Testing
Logging in with email and password, receiving session token.

### Steps

**Step 3.1**: Login with email and password
```bash
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Expected Result
```json
{
  "message": "Login successful",
  "parent_id": "abc123...",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

**Step 3.2**: Save the token for next tests
```bash
# Save token to variable (Linux/macOS)
export AUTH_TOKEN="<paste-token-here>"

# Or save to file
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." > token.txt
```

### Expected Result
- Token is a long string (JWT format)
- Refresh token is also provided
- Expires_in shows seconds until expiration (86400 = 24 hours)

### If It Fails
- **Invalid credentials**: Check email and password are correct
- **User not found**: Verify test account exists in Firebase
- **Email not verified**: Some flows may require verified email
- **500 error**: Check backend logs for Firebase errors

---

## Test 4: Phone Login Flow

### What You're Testing
Logging in with phone and OTP, receiving session token.

### Steps

**Step 4.1**: Request phone login OTP
```bash
curl -X POST http://localhost:8000/api/auth/login/phone/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919999999999"
  }'
```

### Expected Result
```json
{
  "message": "OTP sent successfully",
  "phone": "+919999999999",
  "otp_sent": true
}
```

**Step 4.2**: Login with phone and OTP
```bash
curl -X POST http://localhost:8000/api/auth/login/phone \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919999999999",
    "otp": "123456"
  }'
```

### Expected Result
```json
{
  "message": "Login successful",
  "parent_id": "def456...",
  "phone": "+919999999999",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

### If It Fails
- **Phone not found**: Check phone format and test account
- **Invalid OTP**: Use test OTP `123456` for test numbers
- **OTP expired**: Request new OTP
- **User not registered**: Register phone number first (Day 1 endpoint)

---

## Test 5: Google OAuth Login Flow

### What You're Testing
Logging in with Google ID token.

### Steps

**Step 5.1**: Get Google ID token (for testing, use Firebase Auth REST API)
```bash
# This is a simplified test - in production, frontend gets this from Google
curl -X POST http://localhost:8000/api/auth/login/google \
  -H "Content-Type: application/json" \
  -d '{
    "id_token": "GOOGLE_ID_TOKEN_HERE"
  }'
```

### Expected Result
```json
{
  "message": "Login successful",
  "parent_id": "ghi789...",
  "email": "user@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

### If It Fails
- **Invalid token**: Google ID tokens expire quickly; get fresh token
- **Token verification failed**: Check Firebase Google OAuth configuration
- **User not found**: User will be created automatically on first login

### Note for Testing
Google OAuth is best tested with the frontend. For backend-only testing:
1. Use Firebase Auth REST API to get test tokens
2. Or skip this test until frontend integration
3. Or use Firebase Admin SDK to create custom tokens for testing

---

## Test 6: Protected Endpoint (Get Current User)

### What You're Testing
Accessing a protected endpoint with authentication token.

### Steps

**Step 6.1**: Get current user info with token
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected Result
```json
{
  "parent_id": "abc123...",
  "email": "test@example.com",
  "phone": null,
  "language": "en",
  "role": "parent",
  "email_verified": true,
  "phone_verified": false,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### If It Fails
- **401 Unauthorized**: Token is missing or invalid
- **Token expired**: Use refresh token to get new token
- **Invalid format**: Check Authorization header format: `Bearer <token>`
- **User not found**: Token is valid but user doesn't exist in Firestore

---

## Test 7: Token Refresh Flow

### What You're Testing
Refreshing an expired or soon-to-expire token.

### Steps

**Step 7.1**: Refresh token using refresh_token
```bash
curl -X POST http://localhost:8000/api/auth/token/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

### Expected Result
```json
{
  "message": "Token refreshed successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

### If It Fails
- **Invalid refresh token**: Token is expired or invalid
- **Token not found**: Refresh token doesn't exist in database
- **User not found**: User associated with token doesn't exist

---

## Test 8: Logout Flow

### What You're Testing
Logging out and revoking the session token.

### Steps

**Step 8.1**: Logout with current token
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected Result
```json
{
  "message": "Logout successful",
  "logged_out": true
}
```

**Step 8.2**: Try to use the same token (should fail)
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected Result
```json
{
  "detail": "Token has been revoked"
}
```

### If It Fails
- **Token still works**: Check that logout properly revokes token
- **Logout fails**: Check token is valid before logout
- **500 error**: Check backend logs for database errors

---

## Test 9: Error Handling - Invalid Credentials

### What You're Testing
Proper error responses for invalid login attempts.

### Steps

**Step 9.1**: Try login with wrong password
```bash
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "WrongPassword123"
  }'
```

### Expected Result
```json
{
  "detail": "Invalid email or password"
}
```

**Step 9.2**: Try login with non-existent email
```bash
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "Test123456"
  }'
```

### Expected Result
```json
{
  "detail": "User not found"
}
```

### If It Fails
- **Wrong error message**: Check error handling in login service
- **500 error instead of 400**: Improve error handling
- **No error returned**: Check that validation is working

---

## Test 10: Error Handling - Expired Verification Codes

### What You're Testing
Proper handling of expired verification codes.

### Steps

**Step 10.1**: Send verification email
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Step 10.2**: Wait 11 minutes (or manually set expiry in Firestore to past time)

**Step 10.3**: Try to confirm with expired code
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "code": "EXPIRED_CODE"
  }'
```

### Expected Result
```json
{
  "detail": "Verification code has expired. Please request a new one."
}
```

### If It Fails
- **Code still works**: Check expiry logic in verification service
- **Wrong error message**: Update error message for clarity
- **500 error**: Check error handling for expired codes

---

## Test 11: Complete Authentication Flow (End-to-End)

### What You're Testing
Full authentication journey from registration to logout.

### Steps

**Step 11.1**: Register new parent (from Day 1)
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@example.com",
    "password": "NewParent123",
    "language": "en"
  }'
```

**Step 11.2**: Send email verification
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@example.com"
  }'
```

**Step 11.3**: Get verification code from Firestore and confirm
```bash
curl -X POST http://localhost:8000/api/auth/verify/email/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@example.com",
    "code": "CODE_FROM_FIRESTORE"
  }'
```

**Step 11.4**: Login with verified email
```bash
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newparent@example.com",
    "password": "NewParent123"
  }'
```

**Step 11.5**: Access protected endpoint
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer TOKEN_FROM_LOGIN"
```

**Step 11.6**: Logout
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer TOKEN_FROM_LOGIN"
```

### Expected Result
All steps complete successfully with appropriate responses at each stage.

### If It Fails
Identify which step failed and refer to the specific test for that endpoint.

---

## Test 12: API Documentation Check

### What You're Testing
Verifying that all endpoints are documented in FastAPI's automatic docs.

### Steps

**Step 12.1**: Open API documentation
```bash
# Open in browser
http://localhost:8000/docs
```

**Step 12.2**: Verify all authentication endpoints are listed:
- ✅ POST /api/auth/verify/email/send
- ✅ POST /api/auth/verify/email/confirm
- ✅ POST /api/auth/verify/phone/send
- ✅ POST /api/auth/verify/phone/confirm
- ✅ POST /api/auth/login/email
- ✅ POST /api/auth/login/phone/request-otp
- ✅ POST /api/auth/login/phone
- ✅ POST /api/auth/login/google
- ✅ GET /api/auth/me
- ✅ POST /api/auth/token/refresh
- ✅ POST /api/auth/logout

**Step 12.3**: Test an endpoint directly from the docs:
- Click on an endpoint (e.g., POST /api/auth/login/email)
- Click "Try it out"
- Fill in the request body
- Click "Execute"
- Verify response

### Expected Result
- All endpoints are listed
- Each has proper request/response schemas
- "Try it out" feature works
- Responses match expected format

### If It Fails
- **Endpoints missing**: Check that routers are properly included in main.py
- **Schemas wrong**: Check Pydantic models
- **Try it out fails**: Check CORS configuration

---

## Testing Complete! ✅

If all tests pass, you have successfully implemented Firebase authentication!

### What You've Verified
- ✅ Email verification flow works
- ✅ Phone OTP verification works
- ✅ Email login works
- ✅ Phone login works
- ✅ Google OAuth login works (or ready for frontend)
- ✅ Protected endpoints require authentication
- ✅ Token refresh works
- ✅ Logout revokes tokens
- ✅ Error handling works correctly
- ✅ Complete authentication flow works end-to-end
- ✅ API documentation is complete

### Next Steps

1. **Open EXPECTED-OUTCOME.md** to check final success criteria
2. **Review USER-FLOW.md** to understand the complete user journey
3. **Keep TROUBLESHOOTING.md** handy for any issues

### Quick Reference - Test Accounts

```bash
# Email accounts
test@example.com / Test123456
parent@example.com / Parent123456

# Phone accounts (test numbers)
+919999999999 / OTP: 123456
+919999999998 / OTP: 123456

# Save token for testing
export AUTH_TOKEN="your-token-here"

# Test protected endpoint
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer $AUTH_TOKEN"
```

---

## Troubleshooting

If any tests fail, check **TROUBLESHOOTING.md** for common issues and solutions.

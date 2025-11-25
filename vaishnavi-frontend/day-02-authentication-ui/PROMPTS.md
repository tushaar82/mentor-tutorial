# AI Coding Agent Prompts for Day 2: Authentication UI

This document contains all prompts needed to generate the authentication UI code for Day 2. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Authentication Types

### Purpose
Define TypeScript types for authentication requests, responses, and state management.

### When to Use
Start with this to establish type safety for all authentication components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/auth.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for authentication system
// Include: LoginRequest, LoginResponse, VerificationRequest, User, AuthState
// Support email, phone, and Google authentication methods
// Add proper type safety for all auth operations
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for authentication system in a Next.js EdTech platform.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Firebase Client SDK
- File: vaishnavi-frontend/types/auth.ts

GENERATE:
TypeScript interfaces and types for authentication

REQUIREMENTS:
1. LoginRequest types for email, phone, and Google authentication
2. LoginResponse with user data and session token
3. VerificationRequest for email and phone verification
4. User interface with all user properties
5. AuthState for managing authentication state
6. Error types for authentication failures
7. Add JSDoc comments for each type
8. Export all types

TYPES NEEDED:
- EmailLoginRequest { email, password }
- PhoneLoginRequest { phone, otp }
- GoogleLoginRequest { idToken }
- LoginResponse { user, token, expiresAt }
- EmailVerificationRequest { email }
- PhoneVerificationRequest { phone, otp }
- User { id, email, phone, displayName, photoURL, emailVerified, phoneVerified }
- AuthState { user, loading, error }
- AuthError { code, message }

OUTPUT FORMAT:
- Complete TypeScript file with all types
- Include all imports
- Add detailed JSDoc comments
```

**What You'll Get**: Complete TypeScript types file

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/types/auth.ts`
3. Paste and save

---


## Prompt 2: Create Reusable UI Components

### Purpose
Build reusable Button, Input, and Alert components for consistent UI.

### When to Use
Create these before building forms to ensure consistent styling.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/ui/Button.tsx`

**Step 2**: Type this comment:
```typescript
// Create reusable Button component with Tailwind CSS
// Support variants: primary, secondary, outline, ghost
// Support sizes: sm, md, lg
// Support loading state with spinner
// Support disabled state
// Add proper TypeScript props
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/components/ui/Input.tsx`

**Step 5**: Type this comment:
```typescript
// Create reusable Input component with Tailwind CSS
// Support types: text, email, password, tel
// Support error state with error message display
// Support label and placeholder
// Add proper TypeScript props
// Include focus and validation styles
```

**Step 6**: Press Tab, review, and accept

**Step 7**: Create file `vaishnavi-frontend/components/ui/Alert.tsx`

**Step 8**: Type this comment:
```typescript
// Create Alert component for displaying messages
// Support variants: success, error, warning, info
// Support dismissible alerts with close button
// Use Tailwind CSS for styling
// Add proper TypeScript props
```

**Step 9**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create three reusable UI components for a Next.js authentication system.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- Files: 
  - vaishnavi-frontend/components/ui/Button.tsx
  - vaishnavi-frontend/components/ui/Input.tsx
  - vaishnavi-frontend/components/ui/Alert.tsx

GENERATE:
Three reusable UI components with Tailwind CSS styling

COMPONENT 1: Button
- Support variants: primary, secondary, outline, ghost
- Support sizes: sm, md, lg
- Support loading state with spinner icon
- Support disabled state
- TypeScript props interface
- Proper accessibility attributes

COMPONENT 2: Input
- Support types: text, email, password, tel
- Support error state with red border and error message
- Support label above input
- Support placeholder text
- TypeScript props interface
- Proper accessibility attributes
- Focus styles

COMPONENT 3: Alert
- Support variants: success (green), error (red), warning (yellow), info (blue)
- Support dismissible with close button
- Support icon for each variant
- TypeScript props interface
- Smooth animations

REQUIREMENTS:
1. Use Tailwind CSS for all styling
2. Add proper TypeScript interfaces for props
3. Include JSDoc comments
4. Make components fully accessible (ARIA labels)
5. Add hover and focus states
6. Export as default

OUTPUT FORMAT:
- Three complete component files
- Include all imports (React, icons if needed)
- Ready to use without modifications
```

**What You'll Get**: Three complete UI component files

**What to Do**:
1. Copy each component code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 3: Create Authentication Helper Functions

### Purpose
Build helper functions for authentication operations (login, verification, session management).

### When to Use
Create this before building UI components to handle API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/auth.ts`

**Step 2**: Type this comment:
```typescript
// Create authentication helper functions
// Functions: loginWithEmail, loginWithPhone, loginWithGoogle
// Functions: sendEmailVerification, verifyEmail, sendPhoneOTP, verifyPhoneOTP
// Use Firebase Client SDK for Google authentication
// Call backend API for email and phone authentication
// Return typed responses with error handling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create authentication helper functions for a Next.js frontend.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Firebase Client SDK
- File: vaishnavi-frontend/lib/auth.ts
- Backend API: http://localhost:8000/api/auth

GENERATE:
Authentication helper functions that call backend API

FUNCTIONS NEEDED:
1. loginWithEmail(email, password) → LoginResponse
   - POST to /api/auth/login/email
   - Return user and token

2. loginWithPhone(phone, otp) → LoginResponse
   - POST to /api/auth/login/phone
   - Return user and token

3. loginWithGoogle(idToken) → LoginResponse
   - POST to /api/auth/login/google
   - Return user and token

4. sendEmailVerification(email) → { success, message }
   - POST to /api/auth/verify/email/send
   - Return success status

5. verifyEmail(email, code) → { success, message }
   - POST to /api/auth/verify/email/confirm
   - Return verification status

6. sendPhoneOTP(phone) → { success, message }
   - POST to /api/auth/verify/phone/send
   - Return success status

7. verifyPhoneOTP(phone, otp) → { success, message }
   - POST to /api/auth/verify/phone/confirm
   - Return verification status

8. logout() → void
   - POST to /api/auth/logout
   - Clear local session

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Add proper error handling with try-catch
3. Include TypeScript types for all parameters and returns
4. Add JSDoc comments for each function
5. Handle network errors gracefully
6. Return user-friendly error messages
7. Use types from types/auth.ts

INTEGRATE WITH:
- lib/api.ts (API client base URL)
- types/auth.ts (authentication types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete authentication helper functions

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/auth.ts`
3. Paste and save

---


## Prompt 4: Create Session Management

### Purpose
Build session management utilities for storing and managing authentication tokens.

### When to Use
Create this to handle token storage, retrieval, and refresh.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/session.ts`

**Step 2**: Type this comment:
```typescript
// Create session management utilities
// Functions: saveSession, getSession, clearSession, isSessionValid, refreshToken
// Store token in localStorage with expiration
// Check token expiration before API calls
// Auto-refresh expired tokens
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create session management utilities for a Next.js authentication system.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/session.ts

GENERATE:
Session management functions for storing and managing auth tokens

FUNCTIONS NEEDED:
1. saveSession(token, expiresAt) → void
   - Store token in localStorage
   - Store expiration timestamp
   - Store user data if provided

2. getSession() → { token, expiresAt } | null
   - Retrieve token from localStorage
   - Return null if not found or expired

3. clearSession() → void
   - Remove token from localStorage
   - Clear all auth-related data

4. isSessionValid() → boolean
   - Check if token exists and not expired
   - Return true if valid, false otherwise

5. refreshToken() → Promise<string>
   - Call backend /api/auth/token/refresh
   - Update stored token
   - Return new token

6. getAuthHeader() → { Authorization: string } | {}
   - Return Authorization header with Bearer token
   - Return empty object if no valid session

REQUIREMENTS:
1. Use localStorage for token storage
2. Handle token expiration (check timestamp)
3. Add proper error handling
4. Include TypeScript types
5. Add JSDoc comments
6. Handle edge cases (localStorage not available, expired tokens)

STORAGE KEYS:
- 'auth_token' - JWT token
- 'auth_expires_at' - Expiration timestamp
- 'auth_user' - User data (optional)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete session management utilities

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/session.ts`
3. Paste and save

---


## Prompt 5: Create Authentication Hooks

### Purpose
Build React hooks for managing authentication state across components.

### When to Use
Create these hooks to provide authentication state to all components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useAuth.ts`

**Step 2**: Type this comment:
```typescript
// Create useAuth hook for authentication state management
// Track: user, loading, error states
// Functions: login, logout, checkAuth
// Use React useState and useEffect
// Integrate with lib/auth.ts and lib/session.ts
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/hooks/useSession.ts`

**Step 5**: Type this comment:
```typescript
// Create useSession hook for session management
// Check session validity on mount
// Auto-refresh expired tokens
// Provide session data to components
// Add proper TypeScript types
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hooks for authentication state management in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- Files:
  - vaishnavi-frontend/hooks/useAuth.ts
  - vaishnavi-frontend/hooks/useSession.ts

GENERATE:
Two custom React hooks for authentication

HOOK 1: useAuth
Purpose: Manage authentication state across the app

State:
- user: User | null
- loading: boolean
- error: string | null

Functions:
- login(method, credentials) → Promise<void>
- logout() → Promise<void>
- checkAuth() → Promise<void>

Behavior:
- Check session on mount
- Update user state when logged in
- Clear user state when logged out
- Handle loading and error states

HOOK 2: useSession
Purpose: Manage session validity and auto-refresh

State:
- isValid: boolean
- expiresAt: number | null

Functions:
- refreshSession() → Promise<void>
- clearSession() → void

Behavior:
- Check session validity on mount
- Auto-refresh token before expiration
- Provide session status to components

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle errors gracefully
5. Integrate with lib/auth.ts and lib/session.ts
6. Export hooks as default

INTEGRATE WITH:
- lib/auth.ts (authentication functions)
- lib/session.ts (session management)
- types/auth.ts (authentication types)

OUTPUT FORMAT:
- Two complete hook files
- Include all imports
- Ready to use in components
```

**What You'll Get**: Two complete authentication hooks

**What to Do**:
1. Copy each hook code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 6: Create Login Forms

### Purpose
Build login form components for email and phone authentication.

### When to Use
Create these forms for the login page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/auth/LoginForm.tsx`

**Step 2**: Type this comment:
```typescript
// Create email login form component
// Fields: email (with validation), password
// Use React Hook Form for validation
// Call loginWithEmail from lib/auth.ts
// Show loading state during login
// Display error messages
// Use Button and Input components from ui/
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/components/auth/PhoneLoginForm.tsx`

**Step 5**: Type this comment:
```typescript
// Create phone login form component
// Step 1: Enter phone number, send OTP
// Step 2: Enter OTP code, verify
// Use React Hook Form for validation
// Call sendPhoneOTP and loginWithPhone from lib/auth.ts
// Show countdown timer for OTP resend
// Display error messages
// Use Button and Input components from ui/
// Add proper TypeScript types
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create login form components for email and phone authentication.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hook Form, Tailwind CSS
- Files:
  - vaishnavi-frontend/components/auth/LoginForm.tsx
  - vaishnavi-frontend/components/auth/PhoneLoginForm.tsx

GENERATE:
Two login form components with validation

COMPONENT 1: LoginForm (Email)
Fields:
- Email (required, email validation)
- Password (required, min 8 characters)

Features:
- Form validation with React Hook Form
- Submit button with loading state
- Error message display
- "Forgot password?" link
- Call loginWithEmail on submit
- Redirect to dashboard on success

COMPONENT 2: PhoneLoginForm
Step 1 - Phone Entry:
- Phone number input (required, phone format)
- "Send OTP" button
- Call sendPhoneOTP

Step 2 - OTP Entry:
- 6-digit OTP input
- "Verify" button
- "Resend OTP" button with 60s countdown
- Call loginWithPhone on verify

Features:
- Two-step flow (phone → OTP)
- Form validation
- Loading states
- Error messages
- Countdown timer for resend

REQUIREMENTS:
1. Use React Hook Form for validation
2. Use Button and Input components from components/ui/
3. Add proper TypeScript interfaces for props
4. Include JSDoc comments
5. Handle loading and error states
6. Add proper accessibility attributes
7. Use Tailwind CSS for layout
8. Integrate with lib/auth.ts functions

INTEGRATE WITH:
- lib/auth.ts (loginWithEmail, loginWithPhone, sendPhoneOTP)
- components/ui/Button.tsx
- components/ui/Input.tsx
- components/ui/Alert.tsx

OUTPUT FORMAT:
- Two complete component files
- Include all imports
- Export as default
```

**What You'll Get**: Two complete login form components

**What to Do**:
1. Copy each component code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 7: Create Google Sign-In Component

### Purpose
Build Google Sign-In button with Firebase OAuth integration.

### When to Use
Create this for Google authentication on login page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/auth/GoogleSignInButton.tsx`

**Step 2**: Type this comment:
```typescript
// Create Google Sign-In button component
// Use Firebase Client SDK signInWithPopup
// Call loginWithGoogle from lib/auth.ts with ID token
// Show loading state during authentication
// Display error messages
// Use Google brand colors and logo
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Google Sign-In button component with Firebase OAuth.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Firebase Client SDK, Tailwind CSS
- File: vaishnavi-frontend/components/auth/GoogleSignInButton.tsx

GENERATE:
Google Sign-In button component with OAuth flow

FEATURES:
1. Google-branded button with logo
2. Click triggers Firebase signInWithPopup
3. Get ID token from Firebase user
4. Call loginWithGoogle(idToken) from lib/auth.ts
5. Show loading state during authentication
6. Display error messages if OAuth fails
7. Redirect to dashboard on success

OAUTH FLOW:
1. User clicks "Sign in with Google"
2. Firebase opens Google OAuth popup
3. User selects Google account
4. Firebase returns user with ID token
5. Send ID token to backend via loginWithGoogle
6. Backend validates and returns session
7. Store session and redirect

REQUIREMENTS:
1. Use Firebase signInWithPopup with GoogleAuthProvider
2. Extract ID token from Firebase user
3. Add proper error handling
4. Include loading state
5. Use Google brand colors (#4285F4)
6. Add Google logo (use SVG or icon library)
7. Add proper TypeScript types
8. Include JSDoc comments

INTEGRATE WITH:
- lib/firebase.ts (Firebase app instance)
- lib/auth.ts (loginWithGoogle function)
- components/ui/Button.tsx (optional, or custom styling)

OUTPUT FORMAT:
- Complete component file
- Include all imports (Firebase, React)
- Export as default
```

**What You'll Get**: Complete Google Sign-In button component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/auth/GoogleSignInButton.tsx`
3. Paste and save

---


## Prompt 8: Create Verification Components

### Purpose
Build email verification and phone OTP verification UI components.

### When to Use
Create these for verification pages after registration.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/auth/EmailVerificationCard.tsx`

**Step 2**: Type this comment:
```typescript
// Create email verification card component
// Show "Verify your email" message
// "Send Verification Email" button
// "Resend" button with 60s cooldown
// Display success message when email sent
// Call sendEmailVerification from lib/auth.ts
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/components/auth/PhoneOTPInput.tsx`

**Step 5**: Type this comment:
```typescript
// Create phone OTP input component
// 6 individual input boxes for OTP digits
// Auto-focus next input on digit entry
// Auto-submit when all 6 digits entered
// "Verify" button
// "Resend OTP" button with countdown timer
// Call verifyPhoneOTP from lib/auth.ts
// Add proper TypeScript types
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create verification UI components for email and phone.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- Files:
  - vaishnavi-frontend/components/auth/EmailVerificationCard.tsx
  - vaishnavi-frontend/components/auth/PhoneOTPInput.tsx

GENERATE:
Two verification components

COMPONENT 1: EmailVerificationCard
Features:
- "Verify your email" heading
- Email address display (passed as prop)
- "Send Verification Email" button
- Success message: "Verification email sent! Check your inbox."
- "Resend" button (disabled for 60 seconds after send)
- Countdown timer display (60, 59, 58...)
- Loading state during API call
- Error message display

Behavior:
- Click "Send" → Call sendEmailVerification
- Show success message
- Start 60s countdown
- Enable "Resend" after countdown

COMPONENT 2: PhoneOTPInput
Features:
- "Enter verification code" heading
- 6 individual input boxes for digits
- Auto-focus next box on digit entry
- Auto-focus previous box on backspace
- Auto-submit when all 6 digits entered
- "Verify" button
- "Resend OTP" button with countdown (60s)
- Loading state during verification
- Error message display

Behavior:
- User types digit → Auto-focus next input
- All 6 digits entered → Enable "Verify" button
- Click "Verify" → Call verifyPhoneOTP
- Success → Redirect to dashboard
- Click "Resend" → Call sendPhoneOTP, restart countdown

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useRef)
2. Add proper TypeScript interfaces for props
3. Include JSDoc comments
4. Use Button, Input, Alert components from ui/
5. Add proper accessibility attributes
6. Use Tailwind CSS for styling
7. Handle loading and error states
8. Integrate with lib/auth.ts functions

INTEGRATE WITH:
- lib/auth.ts (sendEmailVerification, verifyPhoneOTP, sendPhoneOTP)
- components/ui/Button.tsx
- components/ui/Input.tsx
- components/ui/Alert.tsx

OUTPUT FORMAT:
- Two complete component files
- Include all imports
- Export as default
```

**What You'll Get**: Two complete verification components

**What to Do**:
1. Copy each component code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 9: Create Authentication Pages

### Purpose
Build the login, email verification, and phone verification pages.

### When to Use
Create these pages to tie all components together.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/auth/login/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create login page with method selection
// Tabs: Email, Phone, Google
// Show LoginForm for email tab
// Show PhoneLoginForm for phone tab
// Show GoogleSignInButton for Google tab
// Link to registration page
// Use AuthLayout for consistent styling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/app/auth/verify-email/page.tsx`

**Step 5**: Type this comment:
```typescript
// Create email verification page
// Use EmailVerificationCard component
// Get email from URL query params or session
// Show "Skip for now" link (for testing)
// Redirect to dashboard when verified
// Add proper TypeScript types
```

**Step 6**: Press Tab, review, and accept

**Step 7**: Create file `vaishnavi-frontend/app/auth/verify-phone/page.tsx`

**Step 8**: Type this comment:
```typescript
// Create phone verification page
// Use PhoneOTPInput component
// Get phone from URL query params or session
// Show "Skip for now" link (for testing)
// Redirect to dashboard when verified
// Add proper TypeScript types
```

**Step 9**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create authentication pages for login and verification.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- Files:
  - vaishnavi-frontend/app/auth/login/page.tsx
  - vaishnavi-frontend/app/auth/verify-email/page.tsx
  - vaishnavi-frontend/app/auth/verify-phone/page.tsx

GENERATE:
Three authentication pages

PAGE 1: Login Page (/auth/login)
Features:
- Page title: "Welcome Back"
- Tab navigation: Email | Phone | Google
- Email tab: Show LoginForm component
- Phone tab: Show PhoneLoginForm component
- Google tab: Show GoogleSignInButton component
- Link to registration: "Don't have an account? Sign up"
- Responsive layout

PAGE 2: Email Verification Page (/auth/verify-email)
Features:
- Page title: "Verify Your Email"
- EmailVerificationCard component
- Get email from URL query (?email=...) or session
- "Skip for now" link (for testing)
- Redirect to /dashboard when verified

PAGE 3: Phone Verification Page (/auth/verify-phone)
Features:
- Page title: "Verify Your Phone"
- PhoneOTPInput component
- Get phone from URL query (?phone=...) or session
- "Skip for now" link (for testing)
- Redirect to /dashboard when verified

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add proper TypeScript types
3. Include metadata for SEO
4. Use 'use client' directive (client components)
5. Handle URL query parameters
6. Add loading states
7. Use Tailwind CSS for layout
8. Responsive design (mobile-first)

INTEGRATE WITH:
- components/auth/LoginForm.tsx
- components/auth/PhoneLoginForm.tsx
- components/auth/GoogleSignInButton.tsx
- components/auth/EmailVerificationCard.tsx
- components/auth/PhoneOTPInput.tsx
- hooks/useAuth.ts

OUTPUT FORMAT:
- Three complete page files
- Include all imports
- Export as default
- Add metadata exports
```

**What You'll Get**: Three complete authentication pages

**What to Do**:
1. Copy each page code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 10: Update Mock API Server

### Purpose
Add login and verification endpoints to mock API server for standalone testing.

### When to Use
Update this to test authentication UI without backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Add this comment at the end of the file:
```javascript
// Add authentication endpoints:
// POST /api/auth/login/email - Return mock user and token
// POST /api/auth/login/phone - Return mock user and token
// POST /api/auth/login/google - Return mock user and token
// POST /api/auth/verify/email/send - Return success message
// POST /api/auth/verify/email/confirm - Return success message
// POST /api/auth/verify/phone/send - Return success message
// POST /api/auth/verify/phone/confirm - Return success message
// POST /api/auth/logout - Return success message
// All endpoints should return realistic mock data
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Open file `vaishnavi-frontend/mock-data/mock-api-responses.json`

**Step 5**: Add this comment:
```json
// Add mock responses for authentication:
// loginResponse: { user, token, expiresAt }
// verificationResponse: { success, message }
// Include realistic user data and tokens
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update mock API server with authentication endpoints for testing.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Express.js, Node.js
- Files:
  - vaishnavi-frontend/mock-data/mock-api-server.js
  - vaishnavi-frontend/mock-data/mock-api-responses.json

GENERATE:
Add authentication endpoints to existing mock server

ENDPOINTS TO ADD:

1. POST /api/auth/login/email
   - Accept: { email, password }
   - Return: { user, token, expiresAt }

2. POST /api/auth/login/phone
   - Accept: { phone, otp }
   - Return: { user, token, expiresAt }

3. POST /api/auth/login/google
   - Accept: { idToken }
   - Return: { user, token, expiresAt }

4. POST /api/auth/verify/email/send
   - Accept: { email }
   - Return: { success: true, message: "Verification email sent" }

5. POST /api/auth/verify/email/confirm
   - Accept: { email, code }
   - Return: { success: true, message: "Email verified" }

6. POST /api/auth/verify/phone/send
   - Accept: { phone }
   - Return: { success: true, message: "OTP sent" }

7. POST /api/auth/verify/phone/confirm
   - Accept: { phone, otp }
   - Return: { success: true, message: "Phone verified" }

8. POST /api/auth/logout
   - Return: { success: true, message: "Logged out" }

MOCK DATA:
- User: { id, email, phone, displayName, emailVerified, phoneVerified }
- Token: JWT-like string (fake but realistic)
- ExpiresAt: Current time + 1 hour

REQUIREMENTS:
1. Add endpoints to existing Express server
2. Return realistic mock data
3. Add 500ms delay to simulate network
4. Log requests to console
5. Handle CORS properly
6. Add error responses for invalid data

UPDATE:
- mock-api-server.js: Add endpoint handlers
- mock-api-responses.json: Add mock response data

OUTPUT FORMAT:
- Updated mock-api-server.js with new endpoints
- Updated mock-api-responses.json with mock data
- Ready to run with: node mock-data/mock-api-server.js
```

**What You'll Get**: Updated mock API server with authentication endpoints

**What to Do**:
1. Copy the updated code
2. Update files at specified paths
3. Save and test by running: `node mock-data/mock-api-server.js`

---

## Summary

You've created all the code for Day 2 Authentication UI! Here's what you generated:

**Types & Utilities:**
- ✅ Authentication TypeScript types
- ✅ Reusable UI components (Button, Input, Alert)
- ✅ Authentication helper functions
- ✅ Session management utilities
- ✅ Authentication hooks

**Components:**
- ✅ Email login form
- ✅ Phone login form
- ✅ Google Sign-In button
- ✅ Email verification card
- ✅ Phone OTP input

**Pages:**
- ✅ Login page with method selection
- ✅ Email verification page
- ✅ Phone verification page

**Testing:**
- ✅ Updated mock API server

## Next Steps

1. **Complete Configuration**: Open `CONFIGURATION.md` to set up Firebase and dependencies
2. **Test Your Work**: Open `TESTING.md` to verify everything works
3. **Verify Success**: Open `EXPECTED-OUTCOME.md` to check completion criteria
4. **Troubleshoot**: If issues arise, check `TROUBLESHOOTING.md`

Great job! Move on to **CONFIGURATION.md** to complete the setup.

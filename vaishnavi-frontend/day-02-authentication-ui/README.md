# Day 2: Authentication UI (Frontend)

## What You're Building

Complete authentication user interface with login forms, email verification UI, phone OTP input, Google Sign-In integration, and session management. This extends Day 1's registration UI with full authentication workflows.

## Why This Matters

Authentication UI is the gateway to your platform:
- **Login Forms**: Allow returning users to access their accounts securely
- **Email Verification**: Guide users through email confirmation process
- **Phone OTP**: Provide intuitive interface for entering verification codes
- **Google OAuth**: Offer seamless single sign-on experience
- **Session Management**: Handle user sessions, token refresh, and logout
- **Error Handling**: Display clear, user-friendly error messages

A well-designed authentication UI builds trust, reduces friction, and ensures users can easily access the platform.

## How It Works

**Authentication UI Flow Overview:**

1. **Login Flow**:
   - User selects login method (email, phone, or Google)
   - Enters credentials in appropriate form
   - Frontend validates input and calls backend API
   - On success: Store session token, redirect to dashboard
   - On error: Display clear error message

2. **Email Verification Flow**:
   - After registration, show "Verify Email" prompt
   - User clicks "Send Verification Email" button
   - Check email and click verification link
   - Return to app, show "Email Verified" success message

3. **Phone OTP Flow**:
   - After registration with phone, show OTP input screen
   - User clicks "Send OTP" button
   - Enter 6-digit code received via SMS
   - Frontend validates and confirms with backend
   - Show "Phone Verified" success message

4. **Google Sign-In Flow**:
   - User clicks "Sign in with Google" button
   - Google OAuth popup opens
   - User selects Google account
   - Frontend receives ID token, sends to backend
   - On success: Store session, redirect to dashboard

5. **Session Management**:
   - Store Firebase token in secure storage (httpOnly cookie or localStorage)
   - Add token to all API requests via Authorization header
   - Detect token expiration and refresh automatically
   - Provide logout button to clear session

**Technology Stack:**
- Next.js 14 (React framework with App Router)
- Firebase Client SDK (authentication)
- React Hook Form (form validation)
- Tailwind CSS (styling)
- TypeScript (type safety)

## Learning Objectives

By completing this task, you will:
- Understand how to build authentication UI with React
- Learn Firebase Client SDK authentication methods
- Implement form validation with React Hook Form
- Create reusable authentication components
- Handle authentication state management
- Implement secure session storage
- Display user-friendly error messages
- Test authentication UI with mock backend

## Time Estimate

- **LLM Code Generation**: 60 minutes (8-10 prompts)
- **Configuration**: 30 minutes (Firebase client config, form libraries)
- **Testing**: 30 minutes (Test all auth flows with mock backend)
- **Total**: 2 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Frontend Project Setup (must be complete)
- ✅ Frontend dev server runs successfully
- ✅ Firebase client SDK configured
- ✅ Registration UI working

**Required Software:**
- Node.js 18+ with npm
- Firebase project with Auth enabled
- Browser for testing (Chrome/Firefox recommended)

**Knowledge Prerequisites:**
- Basic React hooks (useState, useEffect)
- Understanding of forms and validation
- Familiarity with async/await

## Files You'll Create

```
vaishnavi-frontend/
├── app/
│   └── auth/
│       ├── login/
│       │   └── page.tsx              # Login page with method selection
│       ├── verify-email/
│       │   └── page.tsx              # Email verification UI
│       └── verify-phone/
│           └── page.tsx              # Phone OTP verification UI
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx             # Email login form
│   │   ├── PhoneLoginForm.tsx        # Phone login form
│   │   ├── GoogleSignInButton.tsx    # Google OAuth button (enhance from Day 1)
│   │   ├── EmailVerificationCard.tsx # Email verification UI
│   │   ├── PhoneOTPInput.tsx         # OTP input component
│   │   └── AuthLayout.tsx            # Shared auth page layout
│   └── ui/
│       ├── Button.tsx                # Reusable button component
│       ├── Input.tsx                 # Reusable input component
│       └── Alert.tsx                 # Alert/error message component
├── lib/
│   ├── auth.ts                       # Authentication helper functions
│   └── session.ts                    # Session management utilities
├── hooks/
│   ├── useAuth.ts                    # Authentication state hook
│   └── useSession.ts                 # Session management hook
└── types/
    └── auth.ts                       # Authentication TypeScript types
```

## Files You'll Modify

```
vaishnavi-frontend/
├── app/
│   └── layout.tsx                    # Add auth state provider
├── lib/
│   └── api.ts                        # Add authentication API calls
└── mock-data/
    ├── mock-api-server.js            # Add login and verification endpoints
    └── mock-api-responses.json       # Add mock responses for auth flows
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Login page with three authentication methods (email, phone, Google)
- ✅ Email verification UI with send/resend functionality
- ✅ Phone OTP input with 6-digit code entry
- ✅ Google Sign-In button with OAuth flow
- ✅ Session management with token storage and refresh
- ✅ Logout functionality
- ✅ Form validation with clear error messages
- ✅ Loading states for all async operations
- ✅ Responsive design for mobile and desktop
- ✅ Mock backend integration for standalone testing

## Authentication Pages You'll Create

### Login Page (`/auth/login`)
- Method selection (Email, Phone, Google)
- Email login form (email + password)
- Phone login form (phone + OTP request)
- Google Sign-In button
- Link to registration page
- "Forgot password?" link (placeholder)

### Email Verification Page (`/auth/verify-email`)
- "Verify your email" message
- "Send Verification Email" button
- "Resend" button (with cooldown timer)
- Email sent confirmation
- "Check your email" instructions
- Link to skip (for testing)

### Phone OTP Verification Page (`/auth/verify-phone`)
- "Enter verification code" message
- 6-digit OTP input boxes
- "Send OTP" button
- "Resend OTP" button (with cooldown timer)
- OTP sent confirmation
- Countdown timer (60 seconds)
- "Verify" button

## Next Steps

After completing this task, you'll move to:
- **Day 3**: Onboarding Flow UI (preferences, child profile, exam selection)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Firebase config, form libraries)
4. **TESTING.md** - Verify authentication UI works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - User authentication journey diagrams
7. **TROUBLESHOOTING.md** - Common UI and Firebase issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating authentication UI code with your AI coding agent!

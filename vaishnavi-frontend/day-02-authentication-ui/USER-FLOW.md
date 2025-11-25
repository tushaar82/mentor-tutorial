# User Flow for Day 2: Authentication UI

This document illustrates the complete user authentication journey with visual flow diagrams.

---

## Overview

This document shows how users interact with the authentication system from the user's perspective. Understanding these flows helps ensure the UI provides a smooth, intuitive experience.

---

## Flow 1: Email Login Journey

### User Story
"As a returning parent, I want to login with my email and password so I can access my child's learning dashboard."

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         START                                    │
│                  User wants to login                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 1: Navigate to Login                      │
│  • User opens app or clicks "Login" link                         │
│  • Browser navigates to /auth/login                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 2: Select Login Method                    │
│  • User sees three options: Email | Phone | Google              │
│  • User clicks "Email" tab                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: Enter Credentials                      │
│  • User enters email: parent@example.com                         │
│  • User enters password: ••••••••                                │
│  • Form validates input in real-time                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 4: Submit Form                            │
│  • User clicks "Login" button                                    │
│  • Button shows loading spinner                                  │
│  • Form inputs disabled during submission                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Success? │
                    └────┬────┘
                         │
           ┌─────────────┴─────────────┐
           │                           │
           ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │   SUCCESS    │          │    ERROR     │
    └──────┬───────┘          └──────┬───────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌──────────────────────┐
│ STEP 5a: Success     │    │ STEP 5b: Error       │
│ • Token stored       │    │ • Show error message │
│ • User data saved    │    │ • "Invalid email or  │
│ • Redirect to        │    │   password"          │
│   dashboard          │    │ • User can retry     │
└──────────────────────┘    └──────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         END                                      │
│              User logged in successfully                         │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Email Input**: Validates email format, shows error if invalid
- **Password Input**: Masked input, shows error if too short
- **Login Button**: Disabled when form invalid, shows loading spinner
- **Error Alert**: Displays clear error messages (red background)
- **Success Redirect**: Automatic redirect to dashboard

---

## Flow 2: Phone Login Journey

### User Story
"As a parent, I want to login with my phone number using OTP so I don't need to remember a password."

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         START                                    │
│              User wants to login with phone                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 1: Navigate to Login                      │
│  • User opens app or clicks "Login" link                         │
│  • Browser navigates to /auth/login                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 2: Select Phone Method                    │
│  • User sees three options: Email | Phone | Google              │
│  • User clicks "Phone" tab                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: Enter Phone Number                     │
│  • User enters phone: +919876543210                              │
│  • Form validates phone format                                   │
│  • User clicks "Send OTP" button                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 4: OTP Sent                               │
│  • Loading spinner shows                                         │
│  • Success message: "OTP sent to your phone"                     │
│  • Countdown timer starts: 60 seconds                            │
│  • OTP input boxes appear                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 5: Enter OTP                              │
│  • User receives SMS with OTP: 123456                            │
│  • User enters digits: [1] [2] [3] [4] [5] [6]                  │
│  • Auto-focus moves between inputs                               │
│  • "Verify" button enabled when all digits entered              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 6: Verify OTP                             │
│  • User clicks "Verify" button                                   │
│  • Button shows loading spinner                                  │
│  • Backend validates OTP                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Success? │
                    └────┬────┘
                         │
           ┌─────────────┴─────────────┐
           │                           │
           ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │   SUCCESS    │          │    ERROR     │
    └──────┬───────┘          └──────┬───────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌──────────────────────┐
│ STEP 7a: Success     │    │ STEP 7b: Error       │
│ • Token stored       │    │ • Show error message │
│ • User data saved    │    │ • "Invalid OTP"      │
│ • Redirect to        │    │ • User can resend    │
│   dashboard          │    │   after countdown    │
└──────────────────────┘    └──────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         END                                      │
│              User logged in successfully                         │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Phone Input**: Validates phone format (+country code)
- **Send OTP Button**: Triggers OTP send, shows loading
- **Success Message**: "OTP sent to your phone"
- **Countdown Timer**: Shows 60, 59, 58... seconds
- **OTP Input Boxes**: 6 individual inputs, auto-focus
- **Verify Button**: Enabled when all 6 digits entered
- **Resend Button**: Disabled during countdown, enabled after

---

## Flow 3: Google Sign-In Journey

### User Story
"As a parent, I want to sign in with my Google account so I can access the platform quickly without creating a new password."

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         START                                    │
│           User wants to login with Google                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 1: Navigate to Login                      │
│  • User opens app or clicks "Login" link                         │
│  • Browser navigates to /auth/login                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 2: Select Google Method                   │
│  • User sees three options: Email | Phone | Google              │
│  • User clicks "Google" tab or button                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: Click Google Button                    │
│  • User sees "Sign in with Google" button with logo             │
│  • User clicks button                                            │
│  • Button shows loading state                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 4: Google OAuth Popup                     │
│  • Firebase opens Google OAuth popup window                      │
│  • User sees Google account selection screen                     │
│  • User selects Google account                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 5: Google Authentication                  │
│  • Google validates user credentials                             │
│  • User may need to enter password (if not logged in)           │
│  • Google returns to app with ID token                           │
│  • Popup closes automatically                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 6: Send Token to Backend                  │
│  • Frontend extracts ID token from Firebase                      │
│  • Calls backend: loginWithGoogle(idToken)                       │
│  • Loading spinner shows                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Success? │
                    └────┬────┘
                         │
           ┌─────────────┴─────────────┐
           │                           │
           ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │   SUCCESS    │          │    ERROR     │
    └──────┬───────┘          └──────┬───────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌──────────────────────┐
│ STEP 7a: Success     │    │ STEP 7b: Error       │
│ • Token stored       │    │ • Show error message │
│ • User data saved    │    │ • "Google sign-in    │
│ • Redirect to        │    │   failed"            │
│   dashboard          │    │ • User can retry     │
└──────────────────────┘    └──────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         END                                      │
│              User logged in successfully                         │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Google Button**: Blue button with Google logo
- **OAuth Popup**: Firebase-managed Google account selection
- **Loading State**: Shows while waiting for OAuth response
- **Error Alert**: Displays if OAuth fails or popup blocked
- **Success Redirect**: Automatic redirect to dashboard

---

## Flow 4: Email Verification Journey

### User Story
"As a new parent, I need to verify my email address so the platform knows my email is valid."

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         START                                    │
│         User registered, needs to verify email                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 1: Navigate to Verification               │
│  • After registration, redirect to /auth/verify-email           │
│  • Or user clicks verification link in app                       │
│  • Email passed as URL parameter                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 2: View Verification Page                 │
│  • User sees "Verify Your Email" heading                         │
│  • Email address displayed: parent@example.com                   │
│  • "Send Verification Email" button visible                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: Send Verification Email                │
│  • User clicks "Send Verification Email" button                  │
│  • Button shows loading spinner                                  │
│  • Backend sends email with verification link                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 4: Email Sent Confirmation                │
│  • Success message: "Verification email sent!"                   │
│  • Instructions: "Check your inbox and click the link"          │
│  • Countdown timer starts: 60 seconds                            │
│  • "Resend" button disabled during countdown                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 5: User Checks Email                      │
│  • User opens email client (Gmail, Outlook, etc.)               │
│  • Finds verification email from Mentor AI                       │
│  • Clicks verification link in email                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 6: Email Verified                         │
│  • Link opens in browser                                         │
│  • Backend marks email as verified                               │
│  • Success page or redirect to dashboard                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         END                                      │
│              Email verified successfully                         │
└─────────────────────────────────────────────────────────────────┘

                    ALTERNATIVE PATH:
                    User didn't receive email
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Wait for Countdown                             │
│  • Countdown reaches 0                                           │
│  • "Resend" button becomes enabled                               │
│  • User clicks "Resend"                                          │
│  • Return to STEP 3                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Email Display**: Shows user's email address
- **Send Button**: Triggers verification email send
- **Success Message**: "Verification email sent! Check your inbox."
- **Instructions**: Clear steps for user to follow
- **Countdown Timer**: Shows 60, 59, 58... seconds
- **Resend Button**: Disabled during countdown, enabled after
- **Skip Link**: "Skip for now" (for testing only)

---

## Flow 5: Phone OTP Verification Journey

### User Story
"As a new parent, I need to verify my phone number so I can receive SMS notifications about my child's progress."

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         START                                    │
│         User registered, needs to verify phone                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 1: Navigate to Verification               │
│  • After registration, redirect to /auth/verify-phone           │
│  • Or user clicks verification link in app                       │
│  • Phone passed as URL parameter                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 2: View Verification Page                 │
│  • User sees "Verify Your Phone" heading                         │
│  • Phone number displayed: +919876543210                         │
│  • "Send OTP" button visible                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 3: Send OTP                               │
│  • User clicks "Send OTP" button                                 │
│  • Button shows loading spinner                                  │
│  • Backend sends SMS with 6-digit OTP                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 4: OTP Sent Confirmation                  │
│  • Success message: "OTP sent to your phone"                     │
│  • 6 OTP input boxes appear                                      │
│  • Countdown timer starts: 60 seconds                            │
│  • "Resend OTP" button disabled during countdown                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 5: User Receives SMS                      │
│  • User's phone receives SMS: "Your OTP is: 123456"             │
│  • User reads OTP code                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 6: Enter OTP                              │
│  • User enters digits: [1] [2] [3] [4] [5] [6]                  │
│  • Auto-focus moves to next input on digit entry                │
│  • "Verify" button enabled when all 6 digits entered            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STEP 7: Verify OTP                             │
│  • User clicks "Verify" button                                   │
│  • Button shows loading spinner                                  │
│  • Backend validates OTP code                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Success? │
                    └────┬────┘
                         │
           ┌─────────────┴─────────────┐
           │                           │
           ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │   SUCCESS    │          │    ERROR     │
    └──────┬───────┘          └──────┬───────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌──────────────────────┐
│ STEP 8a: Success     │    │ STEP 8b: Error       │
│ • Phone verified     │    │ • Show error message │
│ • Success message    │    │ • "Invalid OTP"      │
│ • Redirect to        │    │ • User can retry or  │
│   dashboard          │    │   resend after timer │
└──────────────────────┘    └──────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         END                                      │
│              Phone verified successfully                         │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Phone Display**: Shows user's phone number
- **Send OTP Button**: Triggers OTP SMS send
- **Success Message**: "OTP sent to your phone"
- **OTP Input Boxes**: 6 individual inputs, auto-focus
- **Countdown Timer**: Shows 60, 59, 58... seconds
- **Verify Button**: Enabled when all 6 digits entered
- **Resend Button**: Disabled during countdown, enabled after
- **Error Alert**: Shows if OTP is invalid
- **Skip Link**: "Skip for now" (for testing only)

---

## Common UI Patterns

### Loading States
All async operations show loading indicators:
- **Button Loading**: Spinner icon + "Loading..." text
- **Form Disabled**: All inputs disabled during submission
- **Overlay Loading**: Full-screen spinner for page transitions

### Error Messages
Errors displayed with clear, actionable messages:
- **Validation Errors**: Red text below input field
- **API Errors**: Red alert box at top of form
- **Network Errors**: "Unable to connect. Please try again."
- **Auth Errors**: "Invalid credentials. Please check and try again."

### Success Messages
Success feedback with positive reinforcement:
- **Green Alert**: Success message in green box
- **Checkmark Icon**: Visual confirmation
- **Auto-Redirect**: Automatic navigation after 2 seconds
- **Progress Indicator**: Shows next step in process

### Countdown Timers
Used for rate limiting (OTP resend, email resend):
- **Format**: "Resend in 60s", "Resend in 59s", etc.
- **Button State**: Disabled during countdown
- **Completion**: Button enabled, text changes to "Resend"

---

## Accessibility Considerations

### Keyboard Navigation
- All forms navigable with Tab key
- Enter key submits forms
- Escape key closes modals/popups
- Arrow keys navigate between OTP inputs

### Screen Reader Support
- All inputs have proper labels
- Error messages announced
- Loading states announced
- Success messages announced

### Visual Indicators
- Focus states clearly visible
- Error states use color + icon + text
- Loading states use spinner + text
- Success states use color + icon + text

---

## Mobile Experience

### Touch Targets
- Buttons minimum 44x44px
- Input fields large enough for fingers
- Adequate spacing between interactive elements

### Mobile-Specific Features
- Numeric keyboard for OTP input
- Email keyboard for email input
- Phone keyboard for phone input
- Auto-zoom disabled on input focus

### Responsive Layout
- Single column layout on mobile
- Larger text for readability
- Full-width buttons
- Adequate padding and spacing

---

## Next Steps

Understanding these user flows helps you:
1. **Test Effectively**: Follow each flow step-by-step during testing
2. **Debug Issues**: Identify where users might get stuck
3. **Improve UX**: Optimize transitions and feedback
4. **Communicate**: Explain flows to team members

Ready to implement? Return to **README.md** to start building!

# Testing Guide for Day 2: Authentication UI

This document provides step-by-step instructions to test all authentication UI components.

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ All configuration steps completed
- ✅ Development server running: `npm run dev`
- ✅ Mock API server running: `node mock-data/mock-api-server.js` (for standalone testing)

---

## Test 1: Verify UI Components Load

### What You're Testing
Basic UI components render without errors.

### Steps
1. Open browser: `http://localhost:3000/auth/login`
2. Check page loads without errors
3. Verify you see login form or method selection

### Expected Result
- Login page displays
- No console errors
- UI elements visible (buttons, inputs)

### If It Fails
- Check browser console for errors
- Verify all components imported correctly
- Check Tailwind CSS is configured

---

## Test 2: Test Email Login Form

### What You're Testing
Email login form validation and submission.

### Steps
1. Navigate to: `http://localhost:3000/auth/login`
2. Select "Email" tab (if tabs exist)
3. Enter email: `test@example.com`
4. Enter password: `password123`
5. Click "Login" button
6. Observe loading state
7. Check for success or error message

### Expected Result
**With Mock Server**:
- Loading spinner appears
- Success: Redirects to dashboard or shows success message
- Mock API returns user data and token

**Validation Tests**:
- Empty email: Shows "Email is required" error
- Invalid email: Shows "Invalid email format" error
- Short password: Shows "Password must be at least 8 characters" error

### If It Fails
- Check mock API server is running
- Check `NEXT_PUBLIC_API_URL` points to mock server (port 3001)
- Verify `loginWithEmail` function calls correct endpoint
- Check browser console and network tab for errors

---

## Test 3: Test Phone Login Form

### What You're Testing
Phone login with OTP flow.

### Steps

**Step 1: Send OTP**
1. Navigate to: `http://localhost:3000/auth/login`
2. Select "Phone" tab
3. Enter phone: `+919876543210`
4. Click "Send OTP" button
5. Verify success message: "OTP sent to your phone"
6. Check countdown timer starts (60 seconds)

**Step 2: Enter OTP**
7. Enter OTP: `123456` (mock OTP)
8. Click "Verify" button
9. Observe loading state
10. Check for success or redirect

### Expected Result
- OTP sent message displays
- Countdown timer shows: 60, 59, 58...
- "Resend" button disabled during countdown
- OTP input accepts 6 digits
- Auto-focuses next input on digit entry
- Success: Redirects to dashboard

### If It Fails
- Check `sendPhoneOTP` and `loginWithPhone` functions
- Verify mock API has phone endpoints
- Check OTP input component handles 6 digits
- Verify countdown timer logic

---

## Test 4: Test Google Sign-In

### What You're Testing
Google OAuth flow with Firebase.

### Steps
1. Navigate to: `http://localhost:3000/auth/login`
2. Select "Google" tab or find Google button
3. Click "Sign in with Google" button
4. Observe Firebase popup opens
5. Select Google account in popup
6. Wait for authentication
7. Check for success or redirect

### Expected Result
- Google OAuth popup opens
- User can select Google account
- Popup closes after selection
- Loading state shows during authentication
- Success: Redirects to dashboard
- Token stored in session

### If It Fails
- Check Firebase Google provider is enabled
- Verify `localhost` in authorized domains
- Check browser allows popups
- Verify `loginWithGoogle` sends ID token to backend
- Check Firebase configuration in `.env.local`

---

## Test 5: Test Email Verification UI

### What You're Testing
Email verification card and flow.

### Steps
1. Navigate to: `http://localhost:3000/auth/verify-email?email=test@example.com`
2. Verify email address displays
3. Click "Send Verification Email" button
4. Check success message appears
5. Verify countdown timer starts
6. Wait for countdown to finish
7. Click "Resend" button
8. Verify it works again

### Expected Result
- Email address displays correctly
- "Send" button triggers API call
- Success message: "Verification email sent!"
- Countdown shows: 60, 59, 58...
- "Resend" button disabled during countdown
- "Resend" button enabled after countdown
- Can resend verification email

### If It Fails
- Check `sendEmailVerification` function
- Verify mock API has email verification endpoint
- Check countdown timer logic
- Verify success/error messages display

---

## Test 6: Test Phone OTP Verification UI

### What You're Testing
Phone OTP input and verification.

### Steps
1. Navigate to: `http://localhost:3000/auth/verify-phone?phone=+919876543210`
2. Verify phone number displays
3. Click "Send OTP" button
4. Check success message
5. Enter OTP digits: 1, 2, 3, 4, 5, 6
6. Verify auto-focus between inputs
7. Click "Verify" button
8. Check for success or redirect

### Expected Result
- Phone number displays correctly
- OTP sent message appears
- 6 input boxes for OTP digits
- Auto-focus moves to next input on digit entry
- Backspace moves to previous input
- "Verify" button enabled when all 6 digits entered
- Success: Redirects to dashboard
- "Resend OTP" button works with countdown

### If It Fails
- Check `PhoneOTPInput` component logic
- Verify auto-focus functionality
- Check `verifyPhoneOTP` function
- Verify mock API has phone verification endpoint

---

## Test 7: Test Session Management

### What You're Testing
Session storage and retrieval.

### Steps
1. Login with any method (email, phone, or Google)
2. Open browser DevTools → Application → Local Storage
3. Check for stored items:
   - `auth_token`
   - `auth_expires_at`
   - `auth_user`
4. Refresh the page
5. Verify user remains logged in
6. Click logout button (if available)
7. Check session cleared

### Expected Result
- Token stored in localStorage after login
- Expiration timestamp stored
- User data stored (optional)
- Session persists across page refresh
- Logout clears all auth data from localStorage

### If It Fails
- Check `saveSession` function in `lib/session.ts`
- Verify token is saved after successful login
- Check `getSession` retrieves token correctly
- Verify `clearSession` removes all auth data

---

## Test 8: Test Form Validation

### What You're Testing
Form validation with React Hook Form.

### Steps

**Email Form Validation**:
1. Go to login page
2. Click "Login" without entering anything
3. Check error messages appear
4. Enter invalid email: `notanemail`
5. Check email format error
6. Enter short password: `123`
7. Check password length error

**Phone Form Validation**:
1. Go to phone login tab
2. Click "Send OTP" without phone
3. Check error message
4. Enter invalid phone: `123`
5. Check phone format error

### Expected Result
- Required field errors show immediately
- Email format validated
- Password length validated (min 8 characters)
- Phone format validated
- Error messages clear and user-friendly
- Submit button disabled when form invalid

### If It Fails
- Check React Hook Form validation rules
- Verify Zod schema (if using)
- Check error message display in components
- Verify validation triggers on blur/submit

---

## Test 9: Test Loading States

### What You're Testing
Loading indicators during async operations.

### Steps
1. Go to login page
2. Enter credentials
3. Click "Login"
4. Observe button during API call
5. Check for loading spinner or disabled state

### Expected Result
- Button shows loading spinner during API call
- Button disabled during loading
- Loading text changes (e.g., "Logging in...")
- Form inputs disabled during loading
- Loading state clears after response

### If It Fails
- Check loading state management in components
- Verify `useState` for loading state
- Check button component supports loading prop
- Verify loading state updates correctly

---

## Test 10: Test Error Handling

### What You're Testing
Error messages display correctly.

### Steps
1. Stop mock API server (to simulate network error)
2. Try to login
3. Check error message displays
4. Restart mock API server
5. Modify mock server to return error (status 401)
6. Try to login
7. Check error message displays

### Expected Result
- Network errors show: "Unable to connect to server"
- Authentication errors show: "Invalid credentials"
- Error messages clear and user-friendly
- Error messages dismissible
- Errors don't crash the app

### If It Fails
- Check try-catch blocks in auth functions
- Verify error state management
- Check Alert component displays errors
- Verify error messages are user-friendly

---

## Test 11: Test Responsive Design

### What You're Testing
UI works on mobile and desktop.

### Steps
1. Open browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Navigate through login pages
5. Test all forms on mobile view
6. Switch to tablet view
7. Switch to desktop view

### Expected Result
- Forms readable on mobile (no horizontal scroll)
- Buttons large enough to tap on mobile
- Text readable without zooming
- Layout adjusts for different screen sizes
- All functionality works on mobile

### If It Fails
- Check Tailwind responsive classes (sm:, md:, lg:)
- Verify mobile-first design approach
- Check touch targets are large enough (min 44x44px)
- Test on actual mobile device if possible

---

## Test 12: Test with Real Backend (Integration)

### What You're Testing
Authentication UI works with real backend API.

### Prerequisites
- Backend server running on port 8000
- Backend Day 2 authentication endpoints implemented

### Steps
1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
2. Restart frontend dev server
3. Test email login with real credentials
4. Test phone login with real OTP
5. Test Google Sign-In
6. Verify tokens work with backend

### Expected Result
- All authentication methods work with real backend
- Real OTP codes sent to phone/email
- Google OAuth validates with backend
- Session tokens work for protected routes
- Backend validates and returns real user data

### If It Fails
- Check backend is running on port 8000
- Verify CORS enabled on backend
- Check API endpoints match between frontend and backend
- Verify request/response formats match
- Check network tab for request/response details

---

## Testing Checklist

Mark each test as complete:

- [ ] UI components load without errors
- [ ] Email login form works
- [ ] Phone login form works
- [ ] Google Sign-In works
- [ ] Email verification UI works
- [ ] Phone OTP verification UI works
- [ ] Session management works
- [ ] Form validation works
- [ ] Loading states display correctly
- [ ] Error handling works
- [ ] Responsive design works
- [ ] Integration with real backend works (optional)

## Common Issues and Solutions

### Issue: "Cannot read property 'auth' of undefined"
**Solution**: Check Firebase is initialized in `lib/firebase.ts`

### Issue: "Network request failed"
**Solution**: 
- Verify mock API server is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Restart dev server after changing env variables

### Issue: "Google Sign-In popup blocked"
**Solution**: Allow popups in browser settings for localhost

### Issue: "CORS error"
**Solution**: 
- Check backend has CORS middleware
- Verify `Access-Control-Allow-Origin` header
- Check mock server has CORS enabled

### Issue: "Token not stored"
**Solution**: 
- Check `saveSession` is called after login
- Verify localStorage is available
- Check browser privacy settings

---

## Next Steps

All tests passing? Great! Move to **EXPECTED-OUTCOME.md** to verify you've completed all requirements.

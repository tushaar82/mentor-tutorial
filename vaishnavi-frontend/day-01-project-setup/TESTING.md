# Testing Guide for Day 1: Frontend Project Setup

This document provides step-by-step instructions to test your frontend implementation. Complete each test in order.

---

## Prerequisites

Before testing, ensure you've completed:
- ✅ All code generation from PROMPTS.md
- ✅ All configuration steps from CONFIGURATION.md
- ✅ Environment variables set in .env.local
- ✅ npm dependencies installed

---

## Test 1: Start Development Server

### What You're Testing
Verifying that the Next.js development server starts without errors.

### Steps
1. Open terminal in vaishnavi-frontend directory
2. Run: `npm run dev`
3. Wait for compilation to complete
4. Look for success message

### Expected Result
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

### Verification
- Server starts without errors
- No TypeScript compilation errors
- Port 3000 is accessible

### If It Fails
**Error: Port 3000 already in use**
- Solution: Stop other process or use different port: `npm run dev -- -p 3001`

**Error: Module not found**
- Solution: Run `npm install` again

**Error: Environment variables not found**
- Solution: Check .env.local exists and has all NEXT_PUBLIC_ variables

**TypeScript errors**
- Solution: Check all .tsx files are created correctly
- Run: `npm run lint` to see specific errors

---

## Test 2: Verify Home Page

### What You're Testing
Checking that the home page loads and displays correctly.

### Steps
1. Keep dev server running
2. Open browser: http://localhost:3000
3. Observe the page content

### Expected Result
- Page displays "Welcome to Mentor AI"
- Subheading: "AI-Powered JEE & NEET Exam Preparation"
- "Get Started" button is visible
- Gradient background (blue to purple)
- Responsive layout

### Verification
```
✓ Page loads without errors
✓ All text is visible and readable
✓ Button is styled correctly
✓ Background gradient is applied
✓ No console errors in browser DevTools (F12)
```

### If It Fails
**Blank page**
- Check browser console (F12) for errors
- Verify app/page.tsx exists and is correct

**Styling issues**
- Check app/globals.css has Tailwind directives
- Verify tailwind.config.js is configured correctly
- Run: `npm run dev` again to rebuild

**Button not working**
- Check Next.js Link component is imported
- Verify link points to /auth/register

---

## Test 3: Navigate to Registration Page

### What You're Testing
Verifying navigation works and registration page loads.

### Steps
1. On home page, click "Get Started" button
2. Wait for page to load
3. Observe the registration page

### Expected Result
- URL changes to: http://localhost:3000/auth/register
- Page displays "Parent Registration"
- Registration form is visible
- Two tabs: "Email" and "Phone"
- Google Sign-In button below form
- "Already have an account? Login" link at bottom

### Verification
```
✓ Navigation works without page reload
✓ Registration page loads
✓ All components are visible
✓ Layout is centered with card design
✓ No console errors
```

### If It Fails
**404 Page Not Found**
- Check app/auth/register/page.tsx exists
- Verify file is in correct directory structure

**Components not showing**
- Check components/AuthForm.tsx exists
- Check components/GoogleSignInButton.tsx exists
- Verify imports in page.tsx are correct

**Styling broken**
- Check Tailwind classes are applied
- Verify globals.css is imported in layout.tsx

---

## Test 4: Test Email Registration Form

### What You're Testing
Verifying the email registration form works with mock API.

### Steps
1. **Start mock API server** (new terminal):
   ```bash
   cd vaishnavi-frontend
   node mock-data/mock-api-server.js
   ```
2. On registration page, ensure "Email" tab is active
3. Fill in form:
   - Email: test@example.com
   - Password: password123
   - Language: English
4. Click "Register with Email" button
5. Wait for response

### Expected Result
- Button shows loading state during request
- After ~500ms, success message appears:
  "Registration successful"
- Form is cleared
- No errors in console

### Verification
```
✓ Form accepts input
✓ Validation works (try invalid email, short password)
✓ Loading state shows during API call
✓ Success message displays
✓ Form clears after success
✓ Mock server logs the request
```

### Mock Server Log
```
POST /api/auth/register/parent/email
Body: { email: 'test@example.com', password: 'password123', language: 'en' }
```

### If It Fails
**Network error / Connection refused**
- Check mock server is running on port 8000
- Verify NEXT_PUBLIC_API_URL in .env.local is http://localhost:8000

**Form doesn't submit**
- Check browser console for errors
- Verify lib/api.ts exists and has registerParentWithEmail function
- Check AuthForm.tsx has proper form submission handler

**No success message**
- Check AuthForm.tsx displays success state
- Verify API response is being handled correctly

**Validation not working**
- Check input fields have proper validation attributes
- Verify form validation logic in AuthForm.tsx

---

## Test 5: Test Phone Registration Form

### What You're Testing
Verifying the phone registration form works with mock API.

### Steps
1. Keep mock server running
2. On registration page, click "Phone" tab
3. Fill in form:
   - Phone: +919876543210
   - Language: Hindi
4. Click "Register with Phone" button
5. Wait for response

### Expected Result
- Tab switches to phone form
- Phone input shows +91 prefix
- Button shows loading state
- Success message appears after ~500ms
- Form is cleared

### Verification
```
✓ Tab switching works
✓ Phone input accepts numbers
✓ +91 prefix is displayed
✓ Validation works (try invalid phone)
✓ Loading state shows
✓ Success message displays
✓ Mock server logs the request
```

### Mock Server Log
```
POST /api/auth/register/parent/phone
Body: { phone: '+919876543210', language: 'hi' }
```

### If It Fails
**Tab doesn't switch**
- Check AuthForm.tsx has tab state management
- Verify tab click handlers are working

**Phone validation issues**
- Check phone input pattern validation
- Verify +91 format is enforced

**API call fails**
- Check lib/api.ts has registerParentWithPhone function
- Verify mock server endpoint is correct

---

## Test 6: Test Google Sign-In Button

### What You're Testing
Verifying Google OAuth flow works (with mock API, not real Google).

### Steps
1. Keep mock server running
2. On registration page, scroll to Google Sign-In button
3. Click "Sign in with Google" button
4. Observe behavior

### Expected Result
- Button shows loading state
- Firebase popup would appear (but may fail without real auth)
- If Firebase fails, error message shows
- Mock API is ready to receive Google token

### Verification
```
✓ Button is visible and styled correctly
✓ Click handler is attached
✓ Loading state shows
✓ Error handling works (Firebase may not be fully configured yet)
```

### Note
Full Google OAuth testing requires:
- Firebase Authentication fully configured
- Valid Google OAuth credentials
- This will be tested in Day 2 with real authentication

### If It Fails
**Button doesn't respond**
- Check GoogleSignInButton.tsx has click handler
- Verify Firebase is imported correctly

**Firebase errors**
- Expected at this stage if Firebase auth isn't fully set up
- Will be resolved in Day 2

---

## Test 7: Test Form Validation

### What You're Testing
Verifying client-side validation prevents invalid submissions.

### Steps

**Test 7.1: Invalid Email**
1. Switch to Email tab
2. Enter invalid email: "notanemail"
3. Try to submit

**Test 7.2: Short Password**
1. Enter valid email: test@example.com
2. Enter short password: "123"
3. Try to submit

**Test 7.3: Invalid Phone**
1. Switch to Phone tab
2. Enter invalid phone: "123"
3. Try to submit

### Expected Result
- Browser shows validation errors
- Form doesn't submit
- No API calls are made
- Error messages are clear

### Verification
```
✓ Email validation works
✓ Password length validation works
✓ Phone format validation works
✓ Form prevents invalid submissions
✓ No unnecessary API calls
```

### If It Fails
**Validation not working**
- Check input fields have validation attributes (required, type, minLength, pattern)
- Verify HTML5 validation is not disabled

**Form submits anyway**
- Check form has onSubmit handler with preventDefault
- Verify validation happens before API call

---

## Test 8: Test Error Handling

### What You're Testing
Verifying the UI handles API errors gracefully.

### Steps
1. Keep mock server running (it randomly returns errors)
2. Submit email registration form multiple times
3. Eventually, you'll get a mock error (10% chance)
4. Observe error handling

### Expected Result
- When error occurs, error message displays in red
- Message: "Mock error message" or similar
- Form doesn't clear
- User can retry
- Loading state clears

### Verification
```
✓ Error messages display
✓ Error styling is visible (red text)
✓ Form remains filled for retry
✓ Loading state clears after error
✓ User can submit again
```

### If It Fails
**No error message**
- Check AuthForm.tsx has error state
- Verify error is displayed in UI

**Error not caught**
- Check API calls have try-catch blocks
- Verify error handling in lib/api.ts

---

## Test 9: Test Responsive Design

### What You're Testing
Verifying the UI works on different screen sizes.

### Steps
1. Open browser DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1920px width
4. Navigate through home page and registration page

### Expected Result
- Layout adapts to screen size
- Text is readable on all sizes
- Buttons are tappable on mobile
- Form fits on mobile screens
- No horizontal scrolling
- Card layout adjusts width

### Verification
```
✓ Mobile (375px): Single column, full width
✓ Tablet (768px): Centered card, readable text
✓ Desktop (1920px): Centered card, max-width applied
✓ All elements visible on all sizes
✓ No layout breaks
```

### If It Fails
**Layout breaks on mobile**
- Check Tailwind responsive classes (sm:, md:, lg:)
- Verify max-width is set on card containers

**Text too small**
- Check font sizes have responsive classes
- Verify base font size in globals.css

**Horizontal scrolling**
- Check for fixed widths that exceed screen size
- Use responsive width classes (w-full, max-w-*)

---

## Test 10: Test Browser Console

### What You're Testing
Verifying there are no JavaScript errors or warnings.

### Steps
1. Open browser DevTools (F12)
2. Go to Console tab
3. Clear console
4. Navigate through the app:
   - Home page
   - Registration page
   - Submit forms
   - Switch tabs
5. Check for errors or warnings

### Expected Result
- No red errors
- No yellow warnings (or only minor warnings)
- Only informational logs from mock server

### Verification
```
✓ No JavaScript errors
✓ No React warnings
✓ No TypeScript errors
✓ No network errors (except expected Firebase)
✓ Clean console output
```

### If It Fails
**React warnings**
- Check for missing keys in lists
- Verify all components have proper props

**TypeScript errors**
- Check type definitions
- Verify imports are correct

**Network errors**
- Check API URL is correct
- Verify mock server is running

---

## Test 11: Test Mock API Server Endpoints

### What You're Testing
Verifying all mock API endpoints work correctly.

### Steps
Use curl or Postman to test each endpoint:

**Test 11.1: Email Registration**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","language":"en"}'
```

**Test 11.2: Phone Registration**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/phone \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","language":"hi"}'
```

**Test 11.3: Google Registration**
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/google \
  -H "Content-Type: application/json" \
  -d '{"idToken":"mock-token-123","language":"en"}'
```

### Expected Result
Each endpoint returns:
```json
{
  "parent_id": "mock-id-xxx",
  "email": "..." or "phone": "...",
  "verification_required": true/false,
  "message": "Registration successful"
}
```

### Verification
```
✓ All endpoints respond with 201 status
✓ Response format matches expected structure
✓ Mock delay (~500ms) is applied
✓ Server logs show requests
✓ CORS headers allow localhost:3000
```

### If It Fails
**Connection refused**
- Check mock server is running
- Verify port 8000 is not blocked

**CORS errors**
- Check mock server has CORS middleware
- Verify origin is set to http://localhost:3000

**Wrong response format**
- Check mock-api-server.js endpoint handlers
- Verify response structure matches API contract

---

## Test 12: Test Build Process

### What You're Testing
Verifying the app can be built for production.

### Steps
1. Stop dev server (Ctrl+C)
2. Run: `npm run build`
3. Wait for build to complete
4. Run: `npm start`
5. Open: http://localhost:3000

### Expected Result
```
Creating an optimized production build...
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    1.2 kB
├ ○ /auth/register                       2.5 kB
└ ○ /_not-found                          871 B

○  (Static)  automatically rendered as static HTML
```

### Verification
```
✓ Build completes without errors
✓ No TypeScript errors
✓ No linting errors
✓ Production server starts
✓ App works in production mode
```

### If It Fails
**Build errors**
- Check all TypeScript files for errors
- Run: `npm run lint` to see issues
- Fix errors and rebuild

**Production server fails**
- Check port 3000 is available
- Verify .next directory was created

---

## Testing Complete! 🎉

You've successfully tested all Day 1 frontend functionality!

### What You've Verified
- ✅ Development server starts
- ✅ Home page loads and displays correctly
- ✅ Navigation to registration page works
- ✅ Email registration form works with mock API
- ✅ Phone registration form works with mock API
- ✅ Google Sign-In button is functional
- ✅ Form validation prevents invalid submissions
- ✅ Error handling works correctly
- ✅ Responsive design works on all screen sizes
- ✅ No console errors or warnings
- ✅ Mock API server works correctly
- ✅ Production build succeeds

### Next Steps

1. **Open EXPECTED-OUTCOME.md** to verify you've met all success criteria
2. After confirmation, you're ready for **Day 2: Authentication UI**

### Quick Commands Reference

```bash
# Start development server
npm run dev

# Start mock API server (separate terminal)
node mock-data/mock-api-server.js

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Troubleshooting

If any tests failed, check **TROUBLESHOOTING.md** for detailed solutions to common issues.

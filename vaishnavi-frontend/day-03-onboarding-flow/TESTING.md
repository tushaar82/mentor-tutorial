# Testing Guide for Day 3: Onboarding Flow UI

This document provides step-by-step testing instructions to verify the onboarding flow works correctly.

---

## Prerequisites

Before testing, ensure:
- ✅ Development server is running (`npm run dev`)
- ✅ Mock API server is running (`node mock-data/mock-api-server.js`)
- ✅ You're logged in with a test user account
- ✅ Browser is open at http://localhost:3000

---

## Test 1: Access Onboarding Page

### Steps
1. Navigate to: `http://localhost:3000/onboarding`
2. Page should load without errors

### Expected Result
- Page title: "Complete Your Profile"
- Subtitle: "Help us personalize your learning experience"
- Step indicator showing Step 1 of 3
- Preferences form visible
- No console errors

### If It Fails
- **Error**: "404 Not Found"
  - **Check**: File exists at `app/onboarding/page.tsx`
  - **Fix**: Create the page file using Prompt 10
- **Error**: "Redirect to login"
  - **Check**: You're logged in
  - **Fix**: Login at `/auth/login` first
- **Error**: "Component not found"
  - **Check**: All components created from prompts
  - **Fix**: Generate missing components

---

## Test 2: Step 1 - Parent Preferences Form

### Steps
1. On onboarding page, verify Step 1 form displays:
   - Language dropdown
   - Notification checkboxes (Email, SMS, Push)
   - Teaching involvement radio buttons
   - "Next" button

2. Fill out the form:
   - Select language: "English"
   - Check all notification options
   - Select teaching involvement: "High"

3. Click "Next" button

### Expected Result
- Form validates successfully
- Loading spinner appears briefly
- Moves to Step 2 (Child Profile)
- Step indicator shows Step 2 of 3
- No errors in console

### If It Fails
- **Error**: "Validation error"
  - **Check**: All required fields filled
  - **Fix**: Ensure language and teaching involvement selected
- **Error**: "API error"
  - **Check**: Mock API server running
  - **Check**: Console for error details
  - **Fix**: Restart mock API server
- **Error**: "Doesn't move to next step"
  - **Check**: useOnboarding hook nextStep() called
  - **Fix**: Verify hook integration in PreferencesStep

---

## Test 3: Step 2 - Child Profile Form

### Steps
1. Verify Step 2 form displays:
   - Child name input
   - Age input
   - Grade dropdown
   - Current level radio buttons
   - "Back" and "Next" buttons

2. Fill out the form:
   - Name: "Rahul Sharma"
   - Age: 16
   - Grade: 11
   - Current level: "Intermediate"

3. Click "Next" button

### Expected Result
- Form validates successfully
- Loading spinner appears briefly
- Moves to Step 3 (Exam Selection)
- Step indicator shows Step 3 of 3
- No errors in console

### If It Fails
- **Error**: "Age must be between 14 and 19"
  - **Check**: Age value is 14-19
  - **Fix**: Enter valid age
- **Error**: "Parent can only have one child"
  - **Expected**: This is correct if testing one-child restriction
  - **Fix**: Delete existing child profile first or use different parent
- **Error**: "Doesn't move to next step"
  - **Check**: useOnboarding hook integration
  - **Fix**: Verify saveChildProfile called correctly

---

## Test 4: Step 2 - Back Button

### Steps
1. On Step 2, click "Back" button

### Expected Result
- Returns to Step 1 (Preferences)
- Step indicator shows Step 1 of 3
- Previously entered preferences data is still filled in
- No data loss

### If It Fails
- **Error**: "Data lost"
  - **Check**: useOnboarding hook stores data
  - **Fix**: Verify state management in hook
- **Error**: "Doesn't go back"
  - **Check**: previousStep() called on Back button
  - **Fix**: Verify button onClick handler

---

## Test 5: Step 3 - Exam Selection Form

### Steps
1. Navigate back to Step 3 (fill Steps 1 and 2 again if needed)
2. Verify Step 3 form displays:
   - Exam type dropdown
   - Exam date dropdown
   - Subject weightage sliders (3 sliders)
   - Weightage sum display
   - Days until exam display
   - "Back" and "Complete Onboarding" buttons

3. Fill out the form:
   - Exam type: "JEE Main"
   - Exam date: Select any available date
   - Subject weightages:
     * Physics: 35%
     * Chemistry: 35%
     * Mathematics: 30%

4. Verify weightage sum shows "100%"

5. Click "Complete Onboarding" button

### Expected Result
- Form validates successfully
- Weightages sum to exactly 100%
- Days until exam calculated and displayed
- Loading spinner appears briefly
- Success message displayed
- Redirects to `/dashboard` after 2 seconds
- No errors in console

### If It Fails
- **Error**: "Weightages must sum to 100%"
  - **Check**: Sliders sum to exactly 100
  - **Fix**: Adjust sliders to sum to 100
- **Error**: "Exam dates not loading"
  - **Check**: Mock API server running
  - **Check**: getAvailableExams() called on mount
  - **Fix**: Verify API call in useEffect
- **Error**: "Doesn't redirect"
  - **Check**: completeOnboarding() called
  - **Check**: useRouter redirect implemented
  - **Fix**: Verify redirect logic

---

## Test 6: Step 3 - Dynamic Subject Fields

### Steps
1. On Step 3, select exam type: "NEET"
2. Observe subject weightage sliders

### Expected Result
- Sliders change to: Physics, Chemistry, Biology
- Mathematics slider is replaced with Biology
- Weightages reset or adjust accordingly

### If It Fails
- **Error**: "Still shows Mathematics"
  - **Check**: Conditional rendering based on exam_type
  - **Fix**: Verify exam type check in component

---

## Test 7: Form Validation

### Steps
1. On Step 1, leave language unselected
2. Click "Next"

### Expected Result
- Error message: "Language is required"
- Form doesn't submit
- Stays on Step 1

### If It Fails
- **Error**: "No validation error"
  - **Check**: React Hook Form validation rules
  - **Fix**: Add required validation to language field

---

## Test 8: One-Child Restriction

### Steps
1. Complete onboarding flow once
2. Logout and login again
3. Try to access `/onboarding` again
4. Try to create another child profile on Step 2

### Expected Result
- Either:
  - Redirected to dashboard (onboarding already complete)
  - Or error message: "Parent can only have one child profile"

### If It Fails
- **Error**: "Allows creating second child"
  - **Check**: Backend enforces one-child restriction
  - **Check**: Mock API returns 400 error
  - **Fix**: Update mock API to track created children

---

## Test 9: Responsive Design

### Steps
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile (375px width)
   - Tablet (768px width)
   - Desktop (1280px width)

### Expected Result
- Forms are readable and usable on all screen sizes
- Step indicator adapts to mobile (vertical or compact)
- Buttons are accessible
- No horizontal scrolling
- Text is readable

### If It Fails
- **Error**: "Horizontal scrolling"
  - **Check**: Tailwind responsive classes used
  - **Fix**: Add responsive padding and max-width
- **Error**: "Text too small on mobile"
  - **Fix**: Use responsive text sizes (text-sm md:text-base)

---

## Test 10: Complete Flow End-to-End

### Steps
1. Start fresh (clear browser storage or use incognito)
2. Register new account at `/auth/register`
3. Login at `/auth/login`
4. Navigate to `/onboarding`
5. Complete all 3 steps:
   - Step 1: Set preferences
   - Step 2: Create child profile
   - Step 3: Select exam
6. Verify redirect to dashboard

### Expected Result
- Complete flow works without errors
- All data saved successfully
- Redirected to dashboard
- Can view saved data (if dashboard displays it)

### If It Fails
- **Error**: "Fails at any step"
  - **Check**: Previous test results
  - **Fix**: Debug specific failing step

---

## Test 11: Mock API Server Responses

### Steps
1. Open browser DevTools → Network tab
2. Complete Step 1 (Preferences)
3. Observe network request to `/api/onboarding/preferences`

### Expected Result
- Request method: POST
- Request body contains preferences data
- Response status: 200 or 201
- Response body contains parent_id and timestamps
- Response time: ~500ms (mock delay)

### If It Fails
- **Error**: "404 Not Found"
  - **Check**: Mock API server running
  - **Check**: Endpoint exists in mock-api-server.js
  - **Fix**: Add endpoint using Prompt 11
- **Error**: "CORS error"
  - **Check**: CORS enabled in mock server
  - **Fix**: Add CORS middleware to Express

---

## Test 12: Error Handling

### Steps
1. Stop mock API server
2. Try to complete Step 1
3. Click "Next"

### Expected Result
- Error message displayed: "Failed to save preferences" or similar
- Loading spinner stops
- Stays on Step 1
- User can retry

### If It Fails
- **Error**: "No error message"
  - **Check**: Error handling in savePreferences
  - **Fix**: Add try-catch and error state
- **Error**: "App crashes"
  - **Check**: Error boundaries
  - **Fix**: Add error handling to API calls

---

## Testing Complete!

If all tests pass, your onboarding flow is working correctly! 

### Summary Checklist
- ✅ Can access onboarding page
- ✅ Step 1 (Preferences) works
- ✅ Step 2 (Child Profile) works
- ✅ Step 3 (Exam Selection) works
- ✅ Navigation (Next/Back) works
- ✅ Form validation works
- ✅ One-child restriction enforced
- ✅ Responsive design works
- ✅ Complete flow end-to-end works
- ✅ Mock API integration works
- ✅ Error handling works

**All tests passing?** Move to **EXPECTED-OUTCOME.md** to verify final success criteria!

---

## Quick Test Commands

```bash
# Start dev server
npm run dev

# Start mock API server
node mock-data/mock-api-server.js

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

## Common Issues

### Issue: "Cannot read property of undefined"
- **Cause**: Component trying to access data before it's loaded
- **Fix**: Add loading state and conditional rendering

### Issue: "Form doesn't submit"
- **Cause**: Validation errors or missing required fields
- **Fix**: Check React Hook Form validation rules

### Issue: "API calls fail"
- **Cause**: Mock API server not running or wrong URL
- **Fix**: Verify mock server running on port 3001

### Issue: "Redirect doesn't work"
- **Cause**: useRouter not imported or called incorrectly
- **Fix**: Import from 'next/navigation' and call router.push()

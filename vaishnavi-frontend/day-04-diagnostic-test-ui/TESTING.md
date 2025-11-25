# Testing Guide for Day 4: Diagnostic Test UI

This document provides step-by-step testing instructions to verify the diagnostic test UI works correctly.

---

## Testing Overview

You'll test:
1. Test initialization and question loading
2. Question display and navigation
3. Answer selection and marking
4. Timer functionality
5. Question palette navigation
6. Keyboard shortcuts
7. Test submission
8. State persistence

**Time Estimate**: 30 minutes

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ All configuration steps completed
- ✅ Mock API server running on port 3001
- ✅ Next.js dev server running on port 3000
- ✅ No console errors in browser

---

## Test 1: Test Initialization

### What You're Testing
Verify test loads with 200 questions and displays correctly.

### Steps
1. Start both servers (mock API and Next.js)
2. Open browser: `http://localhost:3000/test/diagnostic_test_001`
3. Wait for test to load

### Expected Result
- ✅ Test page loads without errors
- ✅ Timer shows 03:00:00 (3 hours)
- ✅ Question 1 of 200 displayed
- ✅ Question text visible
- ✅ 4 options (A, B, C, D) visible
- ✅ Question palette shows 200 questions
- ✅ All questions show gray (not visited)

### If It Fails
- **Error**: "Failed to fetch test"
  - **Check**: Mock API server is running
  - **Fix**: Start mock server: `node mock-data/mock-api-server.js`
- **Error**: "Questions not loading"
  - **Check**: Browser console for errors
  - **Fix**: Verify mock-test-questions.json has 200 questions
- **Error**: "Timer not showing"
  - **Check**: TestTimer component imported correctly
  - **Fix**: Verify useTimer hook is working

---

## Test 2: Question Display

### What You're Testing
Verify question text and options display correctly with LaTeX.

### Steps
1. Look at Question 1
2. Check question text formatting
3. Check if LaTeX renders (if question has math)
4. Check all 4 options are visible

### Expected Result
- ✅ Question number shows "Question 1 of 200"
- ✅ Question text is readable
- ✅ LaTeX formulas render correctly (e.g., ∫x²dx)
- ✅ All 4 options (A, B, C, D) visible
- ✅ Options are clickable
- ✅ Subject and topic tags visible

### If It Fails
- **Error**: LaTeX not rendering
  - **Check**: KaTeX CSS imported
  - **Fix**: Add `import 'katex/dist/katex.min.css'` to layout.tsx
- **Error**: Options not visible
  - **Check**: QuestionDisplay component
  - **Fix**: Verify options prop is passed correctly
- **Error**: Question text cut off
  - **Check**: CSS styling
  - **Fix**: Adjust max-width or overflow settings

---

## Test 3: Answer Selection

### What You're Testing
Verify clicking options selects answer and updates state.

### Steps
1. Click option A for Question 1
2. Verify option A is highlighted
3. Click option B
4. Verify option B is now highlighted (A is deselected)
5. Check question palette
6. Verify Question 1 shows green (answered)

### Expected Result
- ✅ Clicking option highlights it
- ✅ Only one option highlighted at a time
- ✅ Question palette updates to green for answered questions
- ✅ Answer is saved in state
- ✅ Visual feedback on click (hover effect)

### If It Fails
- **Error**: Multiple options selected
  - **Check**: selectAnswer function in useTest hook
  - **Fix**: Ensure only one option can be selected
- **Error**: Palette not updating
  - **Check**: getQuestionStatus function
  - **Fix**: Verify status calculation logic
- **Error**: Answer not saving
  - **Check**: answers Map in useTest hook
  - **Fix**: Verify Map.set() is called correctly

---

## Test 4: Question Navigation

### What You're Testing
Verify Previous/Next buttons and direct navigation work.

### Steps
1. Click "Next Question" button
2. Verify Question 2 displays
3. Click "Previous Question" button
4. Verify Question 1 displays
5. Click question number 50 in palette
6. Verify Question 50 displays

### Expected Result
- ✅ Next button moves to next question
- ✅ Previous button moves to previous question
- ✅ Previous disabled on Question 1
- ✅ Next disabled on Question 200
- ✅ Clicking palette number jumps to that question
- ✅ Current question highlighted in palette (blue border)

### If It Fails
- **Error**: Navigation not working
  - **Check**: nextQuestion/previousQuestion functions
  - **Fix**: Verify currentQuestionIndex updates correctly
- **Error**: Palette click not working
  - **Check**: goToQuestion function
  - **Fix**: Verify onSelectQuestion callback is passed
- **Error**: Buttons not disabling
  - **Check**: Conditional rendering logic
  - **Fix**: Add disabled state based on currentQuestionIndex

---

## Test 5: Mark for Review

### What You're Testing
Verify marking questions for review updates status.

### Steps
1. Go to Question 1
2. Select an answer (option A)
3. Check "Mark for Review" checkbox
4. Check question palette
5. Verify Question 1 shows orange (marked for review)
6. Go to Question 2
7. Check "Mark for Review" without selecting answer
8. Verify Question 2 shows orange

### Expected Result
- ✅ Marking answered question shows orange in palette
- ✅ Marking unanswered question shows orange in palette
- ✅ Unchecking removes mark (returns to green or white)
- ✅ Mark persists when navigating away and back
- ✅ Marked count updates in summary

### If It Fails
- **Error**: Mark not saving
  - **Check**: markForReview function in useTest hook
  - **Fix**: Verify is_marked_for_review updates in answers Map
- **Error**: Color not changing
  - **Check**: getQuestionStatus function
  - **Fix**: Verify status returns "marked_for_review"
- **Error**: Mark not persisting
  - **Check**: State management
  - **Fix**: Ensure answers Map is not being reset

---

## Test 6: Timer Functionality

### What You're Testing
Verify countdown timer works and shows warnings.

### Steps
1. Note initial timer value (03:00:00)
2. Wait 5 seconds
3. Verify timer counts down (02:59:55)
4. Open browser console
5. Run: `localStorage.setItem('test_diagnostic_test_001_time', '300')` (set to 5 minutes)
6. Refresh page
7. Verify timer shows 00:05:00
8. Wait until timer shows 00:09:59
9. Verify timer turns red (warning state)

### Expected Result
- ✅ Timer counts down every second
- ✅ Timer shows HH:MM:SS format
- ✅ Timer turns red when ≤ 10 minutes
- ✅ Timer persists on page refresh
- ✅ Auto-submit triggers when timer reaches 00:00:00

### If It Fails
- **Error**: Timer not counting down
  - **Check**: useTimer hook
  - **Fix**: Verify setInterval is running
- **Error**: Timer not turning red
  - **Check**: TestTimer component
  - **Fix**: Add conditional className based on timeRemaining
- **Error**: Timer resets on refresh
  - **Check**: State persistence
  - **Fix**: Save timeRemaining to localStorage
- **Error**: Auto-submit not working
  - **Check**: onTimeUp callback
  - **Fix**: Verify submitTest is called when time reaches 0

---

## Test 7: Keyboard Shortcuts

### What You're Testing
Verify keyboard navigation works.

### Steps
1. Go to Question 1
2. Press Right Arrow key
3. Verify moves to Question 2
4. Press Left Arrow key
5. Verify moves to Question 1
6. Press "1" key
7. Verify option A is selected
8. Press "2" key
9. Verify option B is selected
10. Press "M" key
11. Verify question is marked for review
12. Press "C" key
13. Verify answer is cleared

### Expected Result
- ✅ Arrow Right: Next question
- ✅ Arrow Left: Previous question
- ✅ 1 or A: Select option A
- ✅ 2 or B: Select option B
- ✅ 3 or C: Select option C
- ✅ 4 or D: Select option D
- ✅ M: Mark for review
- ✅ C: Clear answer

### If It Fails
- **Error**: Keyboard shortcuts not working
  - **Check**: useKeyboardShortcuts hook
  - **Fix**: Verify addEventListener is set up correctly
- **Error**: Shortcuts work in input fields
  - **Check**: Event target check
  - **Fix**: Add check: `if (e.target.tagName === 'INPUT') return;`
- **Error**: Multiple keys trigger same action
  - **Check**: Key mapping logic
  - **Fix**: Use e.key instead of e.keyCode

---

## Test 8: Question Palette

### What You're Testing
Verify question palette shows correct status colors.

### Steps
1. Answer Question 1 (select any option)
2. Verify Question 1 shows green in palette
3. Go to Question 2 without answering
4. Verify Question 2 shows white in palette (visited)
5. Mark Question 2 for review
6. Verify Question 2 shows orange in palette
7. Verify Question 3 shows gray (not visited)
8. Click Question 50 in palette
9. Verify jumps to Question 50

### Expected Result
- ✅ Green: Answered questions
- ✅ Orange: Marked for review
- ✅ White: Visited but not answered
- ✅ Gray: Not visited
- ✅ Blue border: Current question
- ✅ Clicking number jumps to that question
- ✅ Palette scrolls to show current question

### If It Fails
- **Error**: Colors not showing correctly
  - **Check**: getQuestionStatus function
  - **Fix**: Verify status calculation logic
- **Error**: Palette not scrolling
  - **Check**: QuestionPalette component
  - **Fix**: Add scrollIntoView for current question
- **Error**: Click not working
  - **Check**: onSelectQuestion callback
  - **Fix**: Verify goToQuestion is called

---

## Test 9: Clear Answer

### What You're Testing
Verify clearing answer removes selection and updates status.

### Steps
1. Go to Question 1
2. Select option A
3. Verify option A is highlighted
4. Click "Clear Answer" button
5. Verify no option is highlighted
6. Check question palette
7. Verify Question 1 shows white (visited but not answered)

### Expected Result
- ✅ Clear button removes selection
- ✅ Question status updates to "visited"
- ✅ Palette color changes from green to white
- ✅ Answer removed from answers Map
- ✅ Answered count decreases

### If It Fails
- **Error**: Clear not working
  - **Check**: clearAnswer function
  - **Fix**: Verify answer is removed from Map
- **Error**: Status not updating
  - **Check**: getQuestionStatus function
  - **Fix**: Verify status recalculates after clear
- **Error**: Count not updating
  - **Check**: answeredCount calculation
  - **Fix**: Verify useMemo dependencies

---

## Test 10: Test Submission

### What You're Testing
Verify test submission shows confirmation and submits correctly.

### Steps
1. Answer 10 questions
2. Mark 2 questions for review
3. Leave 188 questions unanswered
4. Click "Submit Test" button
5. Verify confirmation dialog appears
6. Check summary:
   - Answered: 10/200
   - Marked for review: 2
   - Unanswered: 188
7. Click "Go Back"
8. Verify dialog closes
9. Click "Submit Test" again
10. Click "Submit Test" in dialog
11. Verify loading state
12. Verify redirect to results page

### Expected Result
- ✅ Submit button always visible
- ✅ Confirmation dialog shows correct counts
- ✅ Warning shown for unanswered questions
- ✅ "Go Back" closes dialog
- ✅ "Submit Test" shows loading state
- ✅ API call made to /api/test/{testId}/submit
- ✅ Redirect to /test/{testId}/results after submission
- ✅ Test state cleared from localStorage

### If It Fails
- **Error**: Dialog not showing
  - **Check**: SubmitDialog component
  - **Fix**: Verify isOpen state is set to true
- **Error**: Counts incorrect
  - **Check**: answeredCount, markedForReviewCount calculations
  - **Fix**: Verify useMemo dependencies and logic
- **Error**: Submission not working
  - **Check**: submitTest function
  - **Fix**: Verify API call is made correctly
- **Error**: Not redirecting
  - **Check**: useRouter hook
  - **Fix**: Add router.push after successful submission

---

## Test 11: State Persistence

### What You're Testing
Verify test state persists on page refresh.

### Steps
1. Answer 5 questions
2. Mark 2 for review
3. Go to Question 10
4. Note timer value
5. Refresh page (F5)
6. Verify:
   - Still on Question 10
   - 5 questions still answered (green in palette)
   - 2 questions still marked (orange in palette)
   - Timer continues from saved value

### Expected Result
- ✅ Current question index persists
- ✅ All answers persist
- ✅ Marked for review status persists
- ✅ Timer value persists
- ✅ No data loss on refresh

### If It Fails
- **Error**: State not persisting
  - **Check**: localStorage save function
  - **Fix**: Verify saveTestState is called
- **Error**: State not loading
  - **Check**: localStorage load function
  - **Fix**: Verify loadTestState is called on mount
- **Error**: Timer resets
  - **Check**: Timer persistence
  - **Fix**: Save timeRemaining to localStorage

---

## Test 12: Responsive Design

### What You're Testing
Verify test interface works on different screen sizes.

### Steps
1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
4. Verify layout adapts correctly

### Expected Result
- ✅ Desktop: Palette visible on side
- ✅ Tablet: Palette collapsible
- ✅ Mobile: Palette hidden, toggle button visible
- ✅ All buttons accessible on all sizes
- ✅ Question text readable on all sizes
- ✅ No horizontal scrolling

### If It Fails
- **Error**: Layout broken on mobile
  - **Check**: Tailwind responsive classes
  - **Fix**: Add md: and lg: prefixes for breakpoints
- **Error**: Palette not collapsing
  - **Check**: QuestionPalette component
  - **Fix**: Add state for collapsed/expanded
- **Error**: Text too small
  - **Check**: Font sizes
  - **Fix**: Increase base font size for mobile

---

## Test 13: Error Handling

### What You're Testing
Verify error states display correctly.

### Steps
1. Stop mock API server
2. Refresh test page
3. Verify error message shows
4. Start mock API server
5. Click "Retry" button
6. Verify test loads successfully

### Expected Result
- ✅ Error message shows when API fails
- ✅ Retry button available
- ✅ Error message is user-friendly
- ✅ Test loads after retry
- ✅ No console errors

### If It Fails
- **Error**: No error message
  - **Check**: Error state in useTest hook
  - **Fix**: Add error handling in fetchTest
- **Error**: Retry not working
  - **Check**: Retry function
  - **Fix**: Verify fetchTest is called again
- **Error**: Console errors
  - **Check**: Browser console
  - **Fix**: Add try-catch blocks

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Test initialization and loading
- ✅ Question display with LaTeX
- ✅ Answer selection and marking
- ✅ Question navigation (buttons and palette)
- ✅ Mark for review functionality
- ✅ Timer countdown and warnings
- ✅ Keyboard shortcuts
- ✅ Question palette with status colors
- ✅ Clear answer functionality
- ✅ Test submission with confirmation
- ✅ State persistence on refresh
- ✅ Responsive design
- ✅ Error handling

**Next Steps:**
1. Open **EXPECTED-OUTCOME.md** to verify all success criteria
2. Check **USER-FLOW.md** to understand student journey
3. Review **TROUBLESHOOTING.md** if you encounter issues

**All tests passing? Move to EXPECTED-OUTCOME.md!**

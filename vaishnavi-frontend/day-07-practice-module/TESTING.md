# Testing Guide for Day 7: Practice Module UI

This document provides step-by-step testing instructions to verify the practice module works correctly.

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ KaTeX installed (`npm list katex react-katex`)
- ✅ Mock API server configured with practice endpoints
- ✅ Dev server running (`npm run dev`)
- ✅ Mock API server running (`node mock-data/mock-api-server.js`)

---

## Test 1: Verify Practice Home Page Loads

### Steps
1. Start dev server: `npm run dev`
2. Start mock API server: `node mock-data/mock-api-server.js`
3. Open browser: `http://localhost:3000/practice`
4. Wait for page to load

### Expected Result
- Page loads without errors
- Loading state appears briefly
- Topic selector displays with topic cards
- No console errors

### If It Fails
- **Issue**: 404 Not Found
- **Fix**: Check file exists at `app/practice/page.tsx`
- **Issue**: Blank page
- **Fix**: Check browser console for errors
- **Issue**: Loading forever
- **Fix**: Verify mock API server is running and returning topics

---

## Test 2: Verify Topic Cards Display

### Steps
1. Navigate to practice home page
2. Look at topic cards grid
3. Check all elements on cards

### Expected Result
- Grid of topic cards (15-20 cards)
- Each card shows:
  - Topic name and subject badge
  - Mastery level progress bar (0-100%)
  - Color coding: red (<50%), yellow (50-75%), green (>75%)
  - Questions practiced count
  - Last practiced date
  - "Practice Now" button
  - Weak topic indicator (if applicable)
- Responsive grid layout
- Hover effects on cards

### If It Fails
- **Issue**: Cards not displaying
- **Fix**: Check TopicCard component receives correct props
- **Issue**: Progress bars not showing
- **Fix**: Verify mastery_level data in mock responses
- **Issue**: Wrong colors
- **Fix**: Check color logic based on mastery thresholds

---

## Test 3: Verify Topic Filters and Search

### Steps
1. Use subject filter dropdown
2. Select "Physics" - should show only Physics topics
3. Use mastery filter
4. Select "Weak Topics Only" - should show only topics <50%
5. Use search bar
6. Type "Mechanics" - should filter to matching topics
7. Clear filters - should show all topics again

### Expected Result
- Subject filter works (All, Physics, Chemistry, Math)
- Mastery filter works (All, Weak, Medium, Strong)
- "Weak Topics Only" toggle works
- Search filters by topic name
- Filters can be combined
- Clear filters button resets all

### If It Fails
- **Issue**: Filters not working
- **Fix**: Check filter logic in TopicSelector component
- **Issue**: Search not working
- **Fix**: Verify search implementation filters topic names
- **Issue**: Filters don't combine
- **Fix**: Ensure filter logic applies all active filters

---

## Test 4: Verify Session Configuration

### Steps
1. Click "Practice Now" on any topic card
2. Should navigate to configuration page
3. Check all configuration options

### Expected Result
- Configuration page loads
- Topic name and current mastery displayed
- Number of questions selector (5, 10, 15, 20) - radio buttons
- Difficulty selector (Easy, Medium, Hard, Mixed) - radio buttons
- Practice mode toggle (Learning Mode / Test Mode)
- Timer toggle (enable/disable)
- Configuration summary panel
- "Start Practice" button (primary)
- "Back to Topics" button (secondary)

### If It Fails
- **Issue**: Configuration page not loading
- **Fix**: Check file exists at `app/practice/[topicId]/configure/page.tsx`
- **Issue**: Options not selectable
- **Fix**: Verify radio buttons and toggles have proper state management
- **Issue**: Start button not working
- **Fix**: Check navigation to practice session page

---

## Test 5: Verify Practice Session Starts

### Steps
1. Configure session (10 questions, Mixed difficulty, Learning Mode, No timer)
2. Click "Start Practice"
3. Wait for session to load

### Expected Result
- Practice session page loads
- Loading state appears briefly
- First question displays
- Session progress shows "Question 1 of 10"
- Current accuracy shows "0/0 (0%)"
- Progress bar at 0%
- No timer (since disabled)
- Exit button visible

### If It Fails
- **Issue**: Session not starting
- **Fix**: Check usePractice hook initializes session correctly
- **Issue**: Questions not loading
- **Fix**: Verify mock API returns questions for session
- **Issue**: Blank screen
- **Fix**: Check PracticeInterface component renders correctly

---

## Test 6: Verify Question Display

### Steps
1. Look at question display
2. Check all elements

### Expected Result
- Question number: "Question 1 of 10"
- Question text with proper formatting
- LaTeX math renders correctly (if question has math)
- 4 multiple-choice options (A, B, C, D)
- Options are clickable
- Selected option highlights
- "Submit Answer" button (disabled until answer selected)
- "Clear Answer" button

### If It Fails
- **Issue**: LaTeX not rendering
- **Fix**: Verify KaTeX CSS is imported in layout.tsx
- **Issue**: Options not clickable
- **Fix**: Check PracticeQuestion component handles click events
- **Issue**: Submit button always disabled
- **Fix**: Verify selectedAnswer state updates on option click

---

## Test 7: Verify Answer Submission (Learning Mode)

### Steps
1. Select an answer (click option B)
2. Click "Submit Answer"
3. Wait for feedback

### Expected Result
- Feedback panel appears
- Shows ✓ Correct (green) or ✗ Incorrect (red)
- If incorrect, shows correct answer
- Detailed explanation displays with LaTeX rendering
- Key concepts section
- "Add to Review" button
- "Next Question" button (primary)
- Smooth animation on feedback appearance

### If It Fails
- **Issue**: Feedback not showing
- **Fix**: Check FeedbackPanel component renders after submission
- **Issue**: Wrong feedback
- **Fix**: Verify mock API returns correct is_correct value
- **Issue**: Explanation not showing
- **Fix**: Check mock data includes explanation text

---

## Test 8: Verify Question Navigation

### Steps
1. After viewing feedback, click "Next Question"
2. Should move to question 2
3. Answer and submit
4. Continue through several questions

### Expected Result
- Moves to next question smoothly
- Question counter updates (2 of 10, 3 of 10, etc.)
- Progress bar advances
- Current accuracy updates (e.g., "7/10 (70%)")
- Previous answers are saved
- Can't go back to previous questions (in Learning Mode)

### If It Fails
- **Issue**: Not advancing to next question
- **Fix**: Check nextQuestion function in usePractice hook
- **Issue**: Progress not updating
- **Fix**: Verify SessionProgress component receives updated props
- **Issue**: Accuracy calculation wrong
- **Fix**: Check correct answer counting logic

---

## Test 9: Verify Timer (Timed Mode)

### Steps
1. Start new session with timer enabled
2. Set 5 questions, 2 minutes per question (10 minutes total)
3. Watch timer count down

### Expected Result
- Timer displays in header: "09:59"
- Counts down every second
- Timer turns red when < 1 minute remaining
- Auto-submits session when timer reaches 0:00
- Timer pauses when viewing feedback (Learning Mode)

### If It Fails
- **Issue**: Timer not counting down
- **Fix**: Check timer logic in usePractice hook
- **Issue**: Timer doesn't auto-submit
- **Fix**: Verify completeSession is called when timer reaches 0
- **Issue**: Timer continues during feedback
- **Fix**: Add logic to pause timer when showFeedback is true

---

## Test 10: Verify Session Completion

### Steps
1. Answer all 10 questions
2. After last question, click "Next Question"
3. Should show session summary

### Expected Result
- Session summary displays
- Overall result: "8/10 Correct (80%)" with icon
- Mastery update: "45% → 52% (+7%)" with progress bars
- Time taken (if timed)
- Performance breakdown:
  - Easy questions: X/Y
  - Medium questions: X/Y
  - Hard questions: X/Y
- Weak concepts section (if any)
- Recommendations
- Action buttons:
  - "Practice Again" (primary)
  - "Choose Another Topic" (secondary)
  - "View Mastery Dashboard" (outline)
- Celebration animation for high scores (>80%)

### If It Fails
- **Issue**: Summary not showing
- **Fix**: Check SessionSummary component renders after completion
- **Issue**: Wrong statistics
- **Fix**: Verify mock API returns correct summary data
- **Issue**: Mastery not updating
- **Fix**: Check mastery calculation logic

---

## Test 11: Verify Test Mode (No Immediate Feedback)

### Steps
1. Start new session in Test Mode
2. Answer questions
3. Submit answers

### Expected Result
- No feedback panel after each answer
- Automatically advances to next question
- Can't see if answer was correct/incorrect
- Progress shows questions answered, not accuracy
- Summary shown only at end
- More exam-like experience

### If It Fails
- **Issue**: Feedback still showing
- **Fix**: Check mode condition in PracticeInterface component
- **Issue**: Not auto-advancing
- **Fix**: Verify nextQuestion is called after submitAnswer in Test Mode

---

## Test 12: Verify Mastery Dashboard

### Steps
1. Navigate to `/practice/mastery`
2. Check all sections

### Expected Result
- Overall statistics cards:
  - Total topics: 20
  - Mastered (>75%): 5
  - In progress (50-75%): 8
  - Weak (<50%): 7
- Topic list with mastery progress bars
- Sort options work (mastery, alphabetical, subject)
- Filter by subject works
- Practice statistics:
  - Total questions practiced: 150
  - Overall accuracy: 72%
  - Total practice time: 3h 45m
- "Start Practice" button for each topic
- Responsive layout

### If It Fails
- **Issue**: Dashboard not loading
- **Fix**: Check file exists at `app/practice/mastery/page.tsx`
- **Issue**: Statistics wrong
- **Fix**: Verify mock data calculations
- **Issue**: Sort/filter not working
- **Fix**: Check MasteryDashboard component logic

---

## Test 13: Verify Review Queue

### Steps
1. During practice, click "Add to Review" on a question
2. Complete session
3. Navigate to review queue (if implemented)
4. Check question is in queue

### Expected Result
- "Add to Review" button adds question to queue
- Review queue persists across sessions (local storage)
- Can view all review questions
- Can practice review questions
- Can remove questions from queue

### If It Fails
- **Issue**: Questions not added to review
- **Fix**: Check addToReview function in usePractice hook
- **Issue**: Review queue not persisting
- **Fix**: Verify storage utilities save/load correctly
- **Issue**: Duplicates in queue
- **Fix**: Add duplicate check before adding

---

## Test 14: Verify Keyboard Shortcuts

### Steps
1. Start practice session
2. Use keyboard to interact

### Expected Result
- Press A/B/C/D to select answers
- Press Enter to submit answer
- Press Enter to go to next question (after feedback)
- Shortcuts work consistently
- No conflicts with browser shortcuts

### If It Fails
- **Issue**: Shortcuts not working
- **Fix**: Check keyboard event listener in PracticeInterface
- **Issue**: Wrong keys triggering actions
- **Fix**: Verify key codes in event handler
- **Issue**: Shortcuts work in wrong context
- **Fix**: Add conditional logic based on showFeedback state

---

## Test 15: Verify State Persistence

### Steps
1. Start practice session
2. Answer 3 questions
3. Refresh page (F5)
4. Check state

### Expected Result
- Session resumes from where you left off
- Current question preserved
- Previous answers preserved
- Progress preserved
- Timer continues from where it was (if timed)

### If It Fails
- **Issue**: Session resets on refresh
- **Fix**: Check storage.saveSession is called on state changes
- **Issue**: State not loading
- **Fix**: Verify storage.loadSession is called on mount
- **Issue**: Partial state loss
- **Fix**: Ensure all relevant state is saved to storage

---

## Test 16: Verify Responsive Design

### Steps
1. Test on different screen sizes
2. Use browser dev tools to simulate devices

### Expected Result

**Desktop (1920x1080)**:
- Topic cards in 3-4 column grid
- Practice interface full width
- All elements visible
- Comfortable spacing

**Tablet (768x1024)**:
- Topic cards in 2 column grid
- Practice interface adapts
- Buttons accessible
- No horizontal scrolling

**Mobile (375x667)**:
- Topic cards in 1 column
- Practice interface stacks vertically
- Large touch-friendly buttons
- Question text readable
- Options clearly separated

### If It Fails
- **Issue**: Layout breaks on mobile
- **Fix**: Use Tailwind responsive classes (sm:, md:, lg:)
- **Issue**: Text too small
- **Fix**: Adjust font sizes for mobile
- **Issue**: Buttons too small to tap
- **Fix**: Increase button size and padding on mobile

---

## Test 17: Verify Error Handling

### Steps
1. Stop mock API server
2. Try to load practice page
3. Check error handling

### Expected Result
- Error message displays
- User-friendly error text
- "Retry" button available
- No app crash
- Console shows error details (for debugging)

### If It Fails
- **Issue**: App crashes
- **Fix**: Add try-catch blocks in API calls
- **Issue**: No error message
- **Fix**: Check error state is displayed in components
- **Issue**: Cryptic error message
- **Fix**: Provide user-friendly error messages

---

## Test 18: Verify Loading States

### Steps
1. Add delay to mock API (for testing)
2. Navigate through practice module
3. Check loading indicators

### Expected Result
- Loading spinner/skeleton on page load
- Loading state while fetching topics
- Loading state while starting session
- Loading state while submitting answers
- Smooth transitions between states
- No layout shift when data loads

### If It Fails
- **Issue**: No loading state
- **Fix**: Check loading state is returned from hooks
- **Issue**: Layout shifts
- **Fix**: Use skeleton loaders with same dimensions as content
- **Issue**: Loading forever
- **Fix**: Add timeout and error handling

---

## Test 19: Verify Practice Again Flow

### Steps
1. Complete a practice session
2. Click "Practice Again" on summary
3. Should start new session with same config

### Expected Result
- New session starts immediately
- Same topic, same configuration
- Different questions (or shuffled)
- Progress resets to 0
- Smooth transition

### If It Fails
- **Issue**: Not starting new session
- **Fix**: Check onPracticeAgain handler
- **Issue**: Same questions appear
- **Fix**: Verify mock API returns different questions
- **Issue**: Wrong configuration
- **Fix**: Ensure config is passed correctly

---

## Test 20: Verify Choose Another Topic Flow

### Steps
1. Complete a practice session
2. Click "Choose Another Topic" on summary
3. Should navigate back to topic selection

### Expected Result
- Navigates to `/practice`
- Topic selector displays
- Can select different topic
- Previous session cleared
- Mastery levels updated

### If It Fails
- **Issue**: Not navigating
- **Fix**: Check onChooseTopic handler uses router.push
- **Issue**: Session not cleared
- **Fix**: Verify session state is reset
- **Issue**: Mastery not updated
- **Fix**: Check mastery data is refetched

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Practice home page with topic selection
- ✅ Topic cards with mastery levels
- ✅ Filters and search functionality
- ✅ Session configuration
- ✅ Practice session with questions
- ✅ Question display with LaTeX rendering
- ✅ Answer submission and feedback (Learning Mode)
- ✅ Question navigation
- ✅ Timer functionality (Timed Mode)
- ✅ Session completion and summary
- ✅ Test Mode (no immediate feedback)
- ✅ Mastery dashboard
- ✅ Review queue
- ✅ Keyboard shortcuts
- ✅ State persistence
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Practice again flow
- ✅ Choose another topic flow

**Next Steps:**
1. Open **EXPECTED-OUTCOME.md** to verify all success criteria
2. Check off completed features
3. Move to Day 8 if all tests pass

**All tests passing? Open EXPECTED-OUTCOME.md!**

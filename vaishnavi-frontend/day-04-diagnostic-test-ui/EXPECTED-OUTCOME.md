# Expected Outcome for Day 4: Diagnostic Test UI

This document defines the success criteria for the diagnostic test UI implementation.

---

## Success Checklist

### Code Generation
- [ ] All 12 prompts executed successfully
- [ ] All TypeScript files created without errors
- [ ] All React components created and exported
- [ ] All hooks created and functional
- [ ] Mock API server updated with test endpoints
- [ ] Mock test data created with 200 questions
- [ ] No TypeScript compilation errors
- [ ] No ESLint warnings (or only minor ones)

### Configuration
- [ ] KaTeX installed and CSS imported
- [ ] LaTeX rendering works correctly
- [ ] localStorage configured for state persistence
- [ ] Mock API server running on port 3001
- [ ] Next.js dev server running on port 3000
- [ ] Environment variables set correctly
- [ ] UI components library configured (if used)
- [ ] No console errors in browser

### Test Interface Features
- [ ] Test page loads at `/test/[testId]`
- [ ] 200 questions load from API
- [ ] Timer displays and counts down (HH:MM:SS format)
- [ ] Timer turns red when ≤ 10 minutes remaining
- [ ] Current question displays with number (e.g., "Question 15 of 200")
- [ ] Question text displays correctly
- [ ] LaTeX formulas render properly
- [ ] 4 multiple-choice options (A, B, C, D) display
- [ ] Clicking option selects it (visual highlight)
- [ ] Only one option can be selected at a time
- [ ] Selected answer persists when navigating away and back

### Navigation
- [ ] "Previous Question" button works
- [ ] "Next Question" button works
- [ ] Previous button disabled on Question 1
- [ ] Next button disabled on Question 200
- [ ] Question palette displays all 200 questions
- [ ] Clicking question number in palette jumps to that question
- [ ] Current question highlighted in palette (blue border)
- [ ] Palette scrolls to show current question

### Question Status
- [ ] Not visited questions show gray in palette
- [ ] Visited but unanswered questions show white in palette
- [ ] Answered questions show green in palette
- [ ] Marked for review questions show orange in palette
- [ ] Status updates immediately when answer selected
- [ ] Status updates immediately when marked for review
- [ ] Status legend visible in palette

### Mark for Review
- [ ] "Mark for Review" checkbox visible
- [ ] Checking marks question (orange in palette)
- [ ] Unchecking unmarks question
- [ ] Can mark answered questions
- [ ] Can mark unanswered questions
- [ ] Mark persists when navigating away and back
- [ ] Marked count updates in summary

### Clear Answer
- [ ] "Clear Answer" button visible
- [ ] Clicking clears selected option
- [ ] Question status updates to "visited" after clear
- [ ] Palette color changes from green to white
- [ ] Answered count decreases after clear
- [ ] Clear button disabled when no answer selected

### Keyboard Shortcuts
- [ ] Arrow Right key moves to next question
- [ ] Arrow Left key moves to previous question
- [ ] 1 or A key selects option A
- [ ] 2 or B key selects option B
- [ ] 3 or C key selects option C
- [ ] 4 or D key selects option D
- [ ] M key marks/unmarks for review
- [ ] C key clears answer
- [ ] Shortcuts don't work when input fields focused

### Test Submission
- [ ] "Submit Test" button always visible
- [ ] Clicking shows confirmation dialog
- [ ] Dialog shows answered count (X/200)
- [ ] Dialog shows marked for review count
- [ ] Dialog shows unanswered count
- [ ] Warning displayed if unanswered > 0
- [ ] "Go Back" button closes dialog
- [ ] "Submit Test" button in dialog submits test
- [ ] Loading state shown during submission
- [ ] API call made to `/api/test/{testId}/submit`
- [ ] Redirect to results page after submission
- [ ] Test state cleared from localStorage after submission

### Timer Features
- [ ] Timer starts at 3 hours (10800 seconds)
- [ ] Timer counts down every second
- [ ] Timer persists on page refresh
- [ ] Timer turns red when ≤ 10 minutes
- [ ] Auto-submit triggers when timer reaches 0
- [ ] Confirmation dialog shown before auto-submit

### State Persistence
- [ ] Current question index saved to localStorage
- [ ] All answers saved to localStorage
- [ ] Marked for review status saved to localStorage
- [ ] Timer value saved to localStorage
- [ ] State auto-saves every 30 seconds
- [ ] State loads on page mount
- [ ] No data loss on page refresh
- [ ] State cleared after submission

### Responsive Design
- [ ] Desktop: Palette visible on side
- [ ] Tablet: Palette collapsible with toggle button
- [ ] Mobile: Palette hidden, toggle button visible
- [ ] All buttons accessible on all screen sizes
- [ ] Question text readable on all sizes
- [ ] No horizontal scrolling on any size
- [ ] Touch-friendly buttons on mobile

### Error Handling
- [ ] Error message shown if test fails to load
- [ ] Retry button available on error
- [ ] Error message is user-friendly
- [ ] Network errors handled gracefully
- [ ] No unhandled promise rejections
- [ ] No console errors during normal operation

### Performance
- [ ] Test loads in < 2 seconds
- [ ] Navigation between questions is instant
- [ ] No lag when selecting answers
- [ ] Palette renders all 200 questions smoothly
- [ ] Timer updates smoothly without jank
- [ ] No memory leaks (check with dev tools)

### Accessibility
- [ ] All buttons have proper labels
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader friendly (test with screen reader)
- [ ] ARIA labels on interactive elements

### Code Quality
- [ ] All components have TypeScript types
- [ ] All functions have JSDoc comments
- [ ] No unused imports or variables
- [ ] Consistent code formatting
- [ ] Proper error handling in all async functions
- [ ] No hardcoded values (use constants)
- [ ] Reusable components extracted
- [ ] Clean separation of concerns

---

## Visual Verification

### Test Header
```
┌─────────────────────────────────────────────────────────┐
│ JEE Main Diagnostic Test    🕐 02:45:30    [Submit Test]│
│ Question 15 of 200                                      │
└─────────────────────────────────────────────────────────┘
```

### Question Display
```
┌─────────────────────────────────────────────────────────┐
│ Question 15                    Physics | Mechanics      │
│                                                          │
│ Calculate the value of ∫₀¹ x² dx                        │
│                                                          │
│ ○ A. 1/3                                                │
│ ● B. 1/2                                                │
│ ○ C. 2/3                                                │
│ ○ D. 1                                                  │
│                                                          │
│ ☐ Mark for Review          [Clear Answer]              │
└─────────────────────────────────────────────────────────┘
```

### Navigation
```
┌─────────────────────────────────────────────────────────┐
│ [← Previous]                              [Next →]      │
│                                                          │
│ Keyboard: ← → for navigation, 1-4 for options          │
└─────────────────────────────────────────────────────────┘
```

### Question Palette
```
┌─────────────────────┐
│ Question Palette    │
├─────────────────────┤
│ ● Answered          │
│ ● Marked for Review │
│ ○ Not Visited       │
│ ○ Visited           │
├─────────────────────┤
│ [1] [2] [3] [4] [5] │
│ [6] [7] [8] [9] [10]│
│ ...                 │
│ [196][197][198][199]│
│ [200]               │
└─────────────────────┘

Legend:
[1] = Green (Answered)
[2] = Orange (Marked)
[3] = Gray (Not Visited)
[4] = White (Visited)
[5] = Blue Border (Current)
```

### Submit Dialog
```
┌─────────────────────────────────────────────────────────┐
│ Submit Test                                         [×] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Are you sure you want to submit the test?              │
│                                                          │
│ Summary:                                                │
│ • Answered: 180/200                                     │
│ • Marked for Review: 15                                 │
│ • Unanswered: 5                                         │
│                                                          │
│ ⚠️ You have 5 unanswered questions.                     │
│                                                          │
│ [Go Back]                          [Submit Test]        │
└─────────────────────────────────────────────────────────┘
```

---

## API Integration Verification

### Test Fetch Request
```bash
GET /api/test/diagnostic_test_001

Response:
{
  "test_id": "diagnostic_test_001",
  "title": "JEE Main Diagnostic Test",
  "duration": 10800,
  "total_questions": 200,
  "questions": [
    {
      "question_id": "q001",
      "question_number": 1,
      "question_text": "Calculate...",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "subject": "Mathematics",
      "topic": "Integration",
      "difficulty": "easy",
      "marks": 4
    },
    // ... 199 more questions
  ]
}
```

### Test Submit Request
```bash
POST /api/test/diagnostic_test_001/submit

Request:
{
  "test_id": "diagnostic_test_001",
  "answers": [
    {
      "question_id": "q001",
      "selected_option": "A",
      "is_marked_for_review": false,
      "time_spent": 45
    },
    // ... more answers
  ],
  "time_taken": 7200,
  "submitted_at": "2024-01-15T10:30:00Z"
}

Response:
{
  "submission_id": "sub_001",
  "score": 720,
  "total_marks": 800,
  "correct_answers": 180,
  "incorrect_answers": 15,
  "unanswered": 5
}
```

---

## Browser Compatibility

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

All features should work in all browsers.

---

## Final Verification

Before marking this task complete, verify:

1. **Functionality**: All features work as expected
2. **UI/UX**: Interface is intuitive and responsive
3. **Performance**: No lag or performance issues
4. **Code Quality**: Clean, typed, documented code
5. **Testing**: All tests pass
6. **Integration**: Works with mock API server
7. **Documentation**: All docs are clear and accurate

---

## What You Should Have

After completing this task, you should have:

### Working Features
✅ Interactive test interface with 200 questions
✅ Countdown timer with auto-submit
✅ Question navigation (buttons, palette, keyboard)
✅ Answer selection with visual feedback
✅ Mark for review functionality
✅ Clear answer functionality
✅ Test submission with confirmation
✅ State persistence on refresh
✅ Responsive design for all devices
✅ Error handling and loading states

### Code Files
✅ 11 TypeScript files (types, lib, hooks, components)
✅ 1 test page with dynamic routing
✅ Updated mock API server
✅ Mock test data with 200 questions
✅ All files properly typed and documented

### Documentation
✅ README.md - Overview and context
✅ PROMPTS.md - All AI prompts
✅ CONFIGURATION.md - Setup instructions
✅ TESTING.md - Testing procedures
✅ EXPECTED-OUTCOME.md - Success criteria (this file)
✅ USER-FLOW.md - Student journey
✅ TROUBLESHOOTING.md - Common issues

---

## Ready for Next Task?

If all checkboxes are checked and all features work correctly, you're ready to move to:

**Day 5: Analytics Visualization** - Display test results with charts and insights

---

## Need Help?

If any items are not working:
1. Check **TROUBLESHOOTING.md** for common issues
2. Review **TESTING.md** for detailed test steps
3. Verify all configuration steps in **CONFIGURATION.md**
4. Check browser console for errors
5. Verify mock API server is running

**Congratulations on completing Day 4! 🎉**

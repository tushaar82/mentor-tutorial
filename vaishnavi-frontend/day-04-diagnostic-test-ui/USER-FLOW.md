# User Flow for Day 4: Diagnostic Test UI

This document describes the student's journey through the diagnostic test interface.

---

## Overview

The diagnostic test is a critical assessment that identifies student strengths and weaknesses. The flow is designed to minimize distractions and maximize focus on answering questions accurately.

---

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DIAGNOSTIC TEST FLOW                      │
└─────────────────────────────────────────────────────────────┘

[Start] → [Test Instructions] → [Begin Test] → [Answer Questions]
                                                       ↓
                                    [Navigate] ← ─ ─ ─ ┘
                                         ↓
                    [Mark for Review] ← ─ ┴ ─ → [Clear Answer]
                                         ↓
                                    [Continue]
                                         ↓
                              [Submit Confirmation]
                                         ↓
                                  [Test Submitted]
                                         ↓
                                  [View Results]
                                         ↓
                                      [End]
```

---

## Detailed User Journey

### Step 1: Test Instructions (Initial Modal)

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│ JEE Main Diagnostic Test - Instructions                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Welcome to your diagnostic test!                        │
│                                                          │
│ Test Details:                                           │
│ • Total Questions: 200                                  │
│ • Duration: 3 hours                                     │
│ • Marking Scheme: +4 for correct, -1 for incorrect     │
│                                                          │
│ Instructions:                                           │
│ 1. Read each question carefully                        │
│ 2. Select one option (A, B, C, or D)                   │
│ 3. Use "Mark for Review" to flag questions             │
│ 4. Navigate using buttons or question palette          │
│ 5. Submit test before time expires                     │
│                                                          │
│ Keyboard Shortcuts:                                     │
│ • Arrow keys: Navigate questions                       │
│ • 1-4 or A-D: Select options                          │
│ • M: Mark for review                                   │
│ • C: Clear answer                                      │
│                                                          │
│ [Start Test]                                           │
└─────────────────────────────────────────────────────────┘
```

**Student Actions:**
- Reads instructions carefully
- Notes marking scheme and duration
- Clicks "Start Test" button

**System Actions:**
- Loads 200 questions from API
- Initializes timer (3 hours)
- Sets current question to 1
- Displays test interface

---

### Step 2: Test Interface (Main Screen)

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ JEE Main Diagnostic Test    🕐 02:58:45    [Submit Test]           │
│ Question 1 of 200                                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Question 1                              Physics | Kinematics        │
│                                                                      │
│ A particle moves with velocity v = 3t² + 2t. Calculate the         │
│ displacement from t = 0 to t = 2 seconds.                           │
│                                                                      │
│ ○ A. 10 m                                                           │
│ ○ B. 12 m                                                           │
│ ○ C. 14 m                                                           │
│ ○ D. 16 m                                                           │
│                                                                      │
│ ☐ Mark for Review          [Clear Answer]                          │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│ [← Previous]                                          [Next →]      │
│                                                                      │
│ Keyboard: ← → for navigation, 1-4 for options                      │
└─────────────────────────────────────────────────────────────────────┘

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
└─────────────────────┘
```

**Student Actions:**
- Reads question carefully
- Analyzes options
- Selects answer by clicking option or pressing key

**System Actions:**
- Highlights selected option
- Updates question status to "answered"
- Changes palette color to green
- Saves answer to state
- Auto-saves to localStorage

---

### Step 3: Answering Questions

#### Scenario A: Student Knows Answer

**Student Actions:**
1. Reads question
2. Identifies correct answer
3. Clicks option B
4. Clicks "Next" button

**System Actions:**
1. Highlights option B
2. Marks question as answered (green in palette)
3. Saves answer
4. Moves to Question 2

**Visual Feedback:**
```
Before:                After:
○ A. 10 m             ○ A. 10 m
○ B. 12 m             ● B. 12 m  ← Selected
○ C. 14 m             ○ C. 14 m
○ D. 16 m             ○ D. 16 m

Palette:
[1] Gray → [1] Green
```

---

#### Scenario B: Student Unsure, Marks for Review

**Student Actions:**
1. Reads question
2. Unsure of answer
3. Selects best guess (option C)
4. Checks "Mark for Review"
5. Clicks "Next" button

**System Actions:**
1. Highlights option C
2. Marks question as answered AND marked for review
3. Changes palette color to orange
4. Saves answer and mark status
5. Moves to Question 3

**Visual Feedback:**
```
Before:                After:
○ A. 10 m             ○ A. 10 m
○ B. 12 m             ○ B. 12 m
○ C. 14 m             ● C. 14 m  ← Selected
○ D. 16 m             ○ D. 16 m

☐ Mark for Review     ☑ Mark for Review

Palette:
[2] Gray → [2] Orange
```

---

#### Scenario C: Student Skips Question

**Student Actions:**
1. Reads question
2. Doesn't know answer
3. Clicks "Next" button without selecting

**System Actions:**
1. No option highlighted
2. Marks question as visited but not answered
3. Changes palette color to white
4. Moves to Question 4

**Visual Feedback:**
```
Options:
○ A. 10 m  ← All unselected
○ B. 12 m
○ C. 14 m
○ D. 16 m

Palette:
[3] Gray → [3] White
```

---

### Step 4: Navigation Patterns

#### Pattern A: Sequential Navigation

**Student Actions:**
- Answers Question 1 → Clicks "Next"
- Answers Question 2 → Clicks "Next"
- Answers Question 3 → Clicks "Next"
- Continues sequentially

**System Actions:**
- Moves forward one question at a time
- Updates current question indicator
- Scrolls palette to show current question

---

#### Pattern B: Jump Navigation

**Student Actions:**
- Currently on Question 5
- Sees Question 50 in palette is unanswered
- Clicks [50] in palette
- Jumps directly to Question 50

**System Actions:**
- Saves current state
- Loads Question 50
- Updates current question indicator
- Highlights Question 50 in palette with blue border

---

#### Pattern C: Review Marked Questions

**Student Actions:**
- Finishes all questions
- Wants to review marked questions
- Looks at palette for orange questions
- Clicks first orange question [15]
- Reviews and changes answer if needed

**System Actions:**
- Jumps to Question 15
- Shows previously selected answer
- Shows "Mark for Review" is checked
- Allows changing answer or unchecking mark

---

### Step 5: Using Keyboard Shortcuts

**Student Actions:**
```
Question 10:
- Reads question
- Presses "2" key → Selects option B
- Presses "M" key → Marks for review
- Presses "→" key → Moves to Question 11

Question 11:
- Reads question
- Presses "3" key → Selects option C
- Presses "C" key → Clears answer (changed mind)
- Presses "1" key → Selects option A
- Presses "→" key → Moves to Question 12
```

**System Actions:**
- Responds to all keyboard inputs
- Updates UI immediately
- Saves all changes
- Provides visual feedback

---

### Step 6: Timer Warnings

#### Normal State (> 10 minutes remaining)

**What Student Sees:**
```
🕐 02:45:30  ← Blue/gray color
```

**Student Actions:**
- Continues answering questions normally

---

#### Warning State (≤ 10 minutes remaining)

**What Student Sees:**
```
🕐 00:09:45  ← Red color, possibly blinking
```

**System Actions:**
- Changes timer color to red
- May show warning notification
- Student becomes aware of time pressure

**Student Actions:**
- Speeds up answering
- Focuses on unanswered questions
- May skip difficult questions

---

#### Critical State (≤ 1 minute remaining)

**What Student Sees:**
```
🕐 00:00:45  ← Red color, urgent
```

**System Actions:**
- Shows urgent warning
- Prepares for auto-submit

**Student Actions:**
- Rushes to answer remaining questions
- May submit manually to avoid auto-submit

---

### Step 7: Test Submission

#### Scenario A: Manual Submission

**Student Actions:**
1. Finishes answering all questions
2. Reviews marked questions
3. Clicks "Submit Test" button

**System Actions:**
1. Shows confirmation dialog

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│ Submit Test                                         [×] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Are you sure you want to submit the test?              │
│                                                          │
│ Summary:                                                │
│ • Answered: 195/200                                     │
│ • Marked for Review: 12                                 │
│ • Unanswered: 5                                         │
│                                                          │
│ ⚠️ You have 5 unanswered questions.                     │
│                                                          │
│ [Go Back]                          [Submit Test]        │
└─────────────────────────────────────────────────────────┘
```

**Student Actions:**
- Reviews summary
- Decides to go back and answer remaining questions OR
- Confirms submission

**If "Go Back":**
- Dialog closes
- Returns to test interface
- Can continue answering

**If "Submit Test":**
- Shows loading spinner
- Submits answers to API
- Redirects to results page

---

#### Scenario B: Auto-Submission (Time Expired)

**System Actions:**
1. Timer reaches 00:00:00
2. Automatically shows submission dialog
3. Countdown: "Auto-submitting in 5... 4... 3... 2... 1..."
4. Submits test automatically
5. Redirects to results page

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│ Time's Up!                                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Your test time has expired.                             │
│                                                          │
│ Auto-submitting in 5 seconds...                         │
│                                                          │
│ Summary:                                                │
│ • Answered: 180/200                                     │
│ • Marked for Review: 15                                 │
│ • Unanswered: 5                                         │
│                                                          │
│ [Submit Now]                                            │
└─────────────────────────────────────────────────────────┘
```

**Student Actions:**
- Can click "Submit Now" to submit immediately
- Or wait for auto-submit

---

### Step 8: Post-Submission

**System Actions:**
1. Clears test state from localStorage
2. Saves submission to backend
3. Redirects to `/test/[testId]/results`
4. Shows loading state during redirect

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                  Submitting your test...                │
│                                                          │
│                      [Loading...]                       │
│                                                          │
│              Please wait, do not close this page.       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Next Step:**
- Student is redirected to results/analytics page (Day 5)

---

## Edge Cases and Error Handling

### Edge Case 1: Page Refresh During Test

**Student Actions:**
- Accidentally refreshes page (F5)

**System Actions:**
1. Detects test in progress from localStorage
2. Shows recovery dialog

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│ Resume Test?                                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ You have a test in progress.                            │
│                                                          │
│ • Current Question: 45                                  │
│ • Answered: 44/200                                      │
│ • Time Remaining: 02:15:30                              │
│                                                          │
│ [Start New Test]              [Resume Test]             │
└─────────────────────────────────────────────────────────┘
```

**Student Actions:**
- Clicks "Resume Test"

**System Actions:**
- Loads saved state
- Restores current question, answers, timer
- Continues test seamlessly

---

### Edge Case 2: Network Error During Submission

**Student Actions:**
- Clicks "Submit Test"
- Network fails

**System Actions:**
1. Shows error message
2. Saves submission locally
3. Offers retry

**What Student Sees:**
```
┌─────────────────────────────────────────────────────────┐
│ Submission Failed                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ⚠️ Failed to submit your test due to network error.    │
│                                                          │
│ Your answers are saved locally.                         │
│                                                          │
│ [Retry Submission]              [Save and Exit]         │
└─────────────────────────────────────────────────────────┘
```

**Student Actions:**
- Clicks "Retry Submission"

**System Actions:**
- Attempts submission again
- If successful, redirects to results
- If fails again, shows error and saves locally

---

### Edge Case 3: Browser Crash During Test

**Student Actions:**
- Browser crashes unexpectedly
- Reopens browser
- Navigates back to test URL

**System Actions:**
1. Detects saved state in localStorage
2. Shows recovery dialog (same as refresh case)
3. Restores test state

**Result:**
- No data loss
- Student can continue from where they left off

---

## User Experience Principles

### 1. Minimize Distractions
- Clean, focused interface
- No unnecessary animations
- Clear visual hierarchy

### 2. Provide Clear Feedback
- Immediate visual feedback on actions
- Clear status indicators
- Helpful error messages

### 3. Enable Efficient Navigation
- Multiple navigation methods (buttons, palette, keyboard)
- Quick access to any question
- Easy review of marked questions

### 4. Prevent Data Loss
- Auto-save every 30 seconds
- State persistence on refresh
- Local backup before submission

### 5. Manage Time Pressure
- Always-visible timer
- Clear warnings when time is low
- Auto-submit to prevent incomplete tests

### 6. Support Different Strategies
- Sequential answering
- Skip and return later
- Mark for review
- Quick navigation to specific questions

---

## Success Metrics

A successful test-taking experience means:
- ✅ Student can focus on questions, not UI
- ✅ No confusion about navigation
- ✅ No data loss due to technical issues
- ✅ Clear understanding of time remaining
- ✅ Easy review of marked questions
- ✅ Smooth submission process
- ✅ Confidence in answer recording

---

## Next Steps

After test submission, student proceeds to:
- **Day 5: Analytics Visualization** - View detailed test results and insights

---

This user flow ensures a smooth, distraction-free test-taking experience that accurately assesses student knowledge while providing flexibility in navigation and answering strategies.

# AI Coding Agent Prompts for Day 4: Diagnostic Test UI

This document contains all prompts needed to generate the diagnostic test UI code for Day 4. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Test Types

### Purpose
Define TypeScript types for test questions, answers, state, and API responses.

### When to Use
Start with this to establish type safety for all test components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/test.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for diagnostic test system
// Include: Question, Answer, TestState, QuestionStatus, TestSubmission
// Support 200-question test with navigation and timer
// Add proper type safety for all test operations
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for diagnostic test system in a Next.js EdTech platform.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/types/test.ts

GENERATE:
TypeScript interfaces and types for diagnostic test flow


REQUIREMENTS:
1. Question interface:
   - question_id: string
   - question_number: number (1-200)
   - question_text: string (supports LaTeX)
   - options: { A: string, B: string, C: string, D: string }
   - subject: string
   - topic: string
   - difficulty: "easy" | "medium" | "hard"
   - marks: number

2. QuestionStatus type:
   - "not_visited" | "visited" | "answered" | "marked_for_review"

3. Answer interface:
   - question_id: string
   - selected_option: "A" | "B" | "C" | "D" | null
   - is_marked_for_review: boolean
   - time_spent: number (seconds)

4. TestState interface:
   - test_id: string
   - questions: Question[]
   - answers: Map<string, Answer>
   - current_question_index: number
   - time_remaining: number (seconds)
   - is_submitted: boolean
   - started_at: string

5. TestSubmission interface:
   - test_id: string
   - answers: Answer[]
   - time_taken: number
   - submitted_at: string

6. TestResponse interface for API responses
7. Add JSDoc comments for each type
8. Export all types

OUTPUT FORMAT:
- Complete TypeScript file with all types
- Include all imports
- Add detailed JSDoc comments
```

**What You'll Get**: Complete TypeScript types file

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/types/test.ts`
3. Paste and save

---

## Prompt 2: Create Test API Helper Functions

### Purpose
Build helper functions for test API calls (fetch questions, submit test).

### When to Use
Create this before building UI components to handle API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/test.ts`

**Step 2**: Type this comment:
```typescript
// Create test API helper functions
// Functions: fetchTest, submitTest, saveTestProgress
// Call backend API at /api/test endpoints
// Return typed responses with error handling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test API helper functions for a Next.js frontend.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/test.ts
- Backend API: http://localhost:8000/api/test

GENERATE:
Test helper functions that call backend API

FUNCTIONS NEEDED:
1. fetchTest(testId: string) → TestResponse
   - GET from /api/test/{testId}
   - Return test with 200 questions

2. submitTest(submission: TestSubmission) → SubmissionResponse
   - POST to /api/test/{testId}/submit
   - Return submission result with score

3. saveTestProgress(testId: string, state: TestState) → void
   - POST to /api/test/{testId}/progress
   - Save current test state (auto-save)

4. getTestProgress(testId: string) → TestState | null
   - GET from /api/test/{testId}/progress
   - Return saved progress if exists

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Add proper error handling with try-catch
3. Include TypeScript types for all parameters and returns
4. Add JSDoc comments for each function
5. Handle network errors gracefully
6. Return user-friendly error messages
7. Use types from types/test.ts

INTEGRATE WITH:
- lib/api.ts (API client base URL)
- types/test.ts (test types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete test helper functions

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/test.ts`
3. Paste and save

---

## Prompt 3: Create Timer Hook

### Purpose
Build React hook for countdown timer with auto-submit functionality.

### When to Use
Create this hook to manage test timer state across components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useTimer.ts`

**Step 2**: Type this comment:
```typescript
// Create useTimer hook for countdown timer
// Start with initial time in seconds (3 hours = 10800)
// Countdown every second
// Auto-submit when time reaches 0
// Support pause/resume (for testing)
// Return: timeRemaining, isRunning, pause, resume, reset
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for countdown timer in Next.js test interface.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useTimer.ts

GENERATE:
Custom React hook for test countdown timer

HOOK: useTimer

Parameters:
- initialTime: number (seconds, default 10800 for 3 hours)
- onTimeUp: () => void (callback when timer reaches 0)

State:
- timeRemaining: number (seconds remaining)
- isRunning: boolean (timer active or paused)

Functions:
- start() → void (start countdown)
- pause() → void (pause countdown)
- resume() → void (resume countdown)
- reset() → void (reset to initial time)

Behavior:
- Countdown by 1 second using setInterval
- Call onTimeUp when timeRemaining reaches 0
- Auto-pause when timeRemaining is 0
- Clean up interval on unmount

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback, useRef)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle edge cases (negative time, multiple intervals)
5. Clean up properly on unmount
6. Export hook as default

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete timer hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useTimer.ts`
3. Paste and save

---

## Prompt 4: Create Test State Management Hook

### Purpose
Build React hook for managing test state (questions, answers, navigation).

### When to Use
Create this hook to provide test state to all test components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useTest.ts`

**Step 2**: Type this comment:
```typescript
// Create useTest hook for test state management
// Track: questions, answers, currentQuestionIndex, testId
// Functions: selectAnswer, markForReview, clearAnswer, nextQuestion, previousQuestion, goToQuestion
// Calculate question status based on answers
// Integrate with lib/test.ts for API calls
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for test state management in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useTest.ts

GENERATE:
Custom React hook for managing diagnostic test state

HOOK: useTest

Parameters:
- testId: string

State:
- questions: Question[]
- answers: Map<string, Answer>
- currentQuestionIndex: number (0-199)
- loading: boolean
- error: string | null

Functions:
- selectAnswer(questionId: string, option: "A" | "B" | "C" | "D") → void
- markForReview(questionId: string, marked: boolean) → void
- clearAnswer(questionId: string) → void
- nextQuestion() → void (move to next question)
- previousQuestion() → void (move to previous question)
- goToQuestion(index: number) → void (jump to specific question)
- getQuestionStatus(questionId: string) → QuestionStatus
- submitTest() → Promise<void>

Computed Values:
- currentQuestion: Question | null
- answeredCount: number
- markedForReviewCount: number
- unansweredCount: number

Behavior:
- Fetch test questions on mount
- Track answer changes
- Calculate question status dynamically
- Auto-save progress every 30 seconds
- Handle test submission

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback, useMemo)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle loading and error states
5. Integrate with lib/test.ts
6. Export hook as default

INTEGRATE WITH:
- lib/test.ts (API functions)
- types/test.ts (test types)

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete test state management hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useTest.ts`
3. Paste and save

---

## Prompt 5: Create Keyboard Shortcuts Hook

### Purpose
Build React hook for keyboard navigation (arrow keys, number keys).

### When to Use
Create this hook to enhance test UX with keyboard shortcuts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useKeyboardShortcuts.ts`

**Step 2**: Type this comment:
```typescript
// Create useKeyboardShortcuts hook for test navigation
// Support: Arrow Left (previous), Arrow Right (next), 1-4 (select A-D)
// Support: M (mark for review), C (clear answer)
// Use addEventListener for keydown events
// Clean up on unmount
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for keyboard shortcuts in test interface.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useKeyboardShortcuts.ts

GENERATE:
Custom React hook for keyboard navigation

HOOK: useKeyboardShortcuts

Parameters:
- onPrevious: () => void
- onNext: () => void
- onSelectOption: (option: "A" | "B" | "C" | "D") => void
- onMarkForReview: () => void
- onClearAnswer: () => void
- enabled: boolean (default true)

Keyboard Shortcuts:
- ArrowLeft: Previous question
- ArrowRight: Next question
- 1 or A: Select option A
- 2 or B: Select option B
- 3 or C: Select option C
- 4 or D: Select option D
- M: Mark for review
- C: Clear answer

Behavior:
- Listen to keydown events
- Call appropriate callback based on key
- Prevent default browser behavior
- Only work when enabled is true
- Clean up event listener on unmount

REQUIREMENTS:
1. Use React hooks (useEffect, useCallback)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle edge cases (input fields focused)
5. Clean up properly on unmount
6. Export hook as default

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete keyboard shortcuts hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useKeyboardShortcuts.ts`
3. Paste and save

---

## Prompt 6: Create Test Timer Component

### Purpose
Build timer display component with countdown and warning states.

### When to Use
Create this to show remaining time in test header.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/test/TestTimer.tsx`

**Step 2**: Type this comment:
```typescript
// Create TestTimer component for countdown display
// Show time in HH:MM:SS format
// Red color when less than 10 minutes remaining
// Props: timeRemaining (seconds)
// Use Tailwind CSS for styling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create timer display component for test interface.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/test/TestTimer.tsx

GENERATE:
Timer component showing countdown

FEATURES:
1. Display time in HH:MM:SS format
2. Visual states:
   - Normal: Blue/gray color (> 10 minutes)
   - Warning: Red color (≤ 10 minutes)
3. Icon: Clock icon
4. Responsive design

PROPS:
- timeRemaining: number (seconds)

REQUIREMENTS:
1. Format seconds to HH:MM:SS
2. Use Tailwind CSS for styling
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Add clock icon (use emoji or icon library)
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in test header
```

**What You'll Get**: Complete timer component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/test/TestTimer.tsx`
3. Paste and save

---

## Prompt 7: Create Question Display Component

### Purpose
Build component to display question text and options with LaTeX support.

### When to Use
Create this as the main question display in test interface.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/test/QuestionDisplay.tsx`

**Step 2**: Type this comment:
```typescript
// Create QuestionDisplay component for question and options
// Show question number, text, and 4 options
// Support LaTeX rendering with react-katex
// Highlight selected option
// Props: question, selectedOption, onSelectOption
// Use Tailwind CSS for styling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question display component for test interface.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/test/QuestionDisplay.tsx

GENERATE:
Question and options display component

FEATURES:
1. Question header:
   - Question number (e.g., "Question 15 of 200")
   - Subject and topic tags
2. Question text:
   - Support LaTeX rendering (use react-katex or similar)
   - Proper formatting
3. Options display:
   - 4 options (A, B, C, D)
   - Radio button style
   - Highlight selected option
   - Click to select
4. Responsive design

PROPS:
- question: Question
- selectedOption: "A" | "B" | "C" | "D" | null
- onSelectOption: (option: "A" | "B" | "C" | "D") => void
- totalQuestions: number

REQUIREMENTS:
1. Use Tailwind CSS for styling
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Support LaTeX in question text and options
5. Add hover and selected states
6. Export as default

INTEGRATE WITH:
- types/test.ts (Question type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in test interface
```

**What You'll Get**: Complete question display component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/test/QuestionDisplay.tsx`
3. Paste and save

---

## Prompt 8: Create Question Palette Component

### Purpose
Build grid of all 200 questions with status indicators.

### When to Use
Create this for quick navigation to any question.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/test/QuestionPalette.tsx`

**Step 2**: Type this comment:
```typescript
// Create QuestionPalette component for question grid
// Show 200 question numbers in grid layout
// Color code by status: green (answered), orange (marked), gray (not visited), white (visited)
// Click to jump to question
// Props: questions, answers, currentIndex, onSelectQuestion
// Use Tailwind CSS for styling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question palette component for test navigation.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/test/QuestionPalette.tsx

GENERATE:
Grid of all questions with status indicators

FEATURES:
1. Grid layout (10 columns on desktop, 5 on mobile)
2. Each cell shows question number (1-200)
3. Color coding:
   - Green: Answered
   - Orange: Marked for review
   - Gray: Not visited
   - White: Visited but not answered
   - Blue border: Current question
4. Click to jump to question
5. Legend showing color meanings
6. Collapsible on mobile

PROPS:
- questions: Question[]
- answers: Map<string, Answer>
- currentQuestionIndex: number
- onSelectQuestion: (index: number) => void

REQUIREMENTS:
1. Use Tailwind CSS for styling
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Calculate status for each question
5. Responsive grid layout
6. Export as default

INTEGRATE WITH:
- types/test.ts (Question, Answer types)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in test interface
```

**What You'll Get**: Complete question palette component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/test/QuestionPalette.tsx`
3. Paste and save

---

## Prompt 9: Create Submit Dialog Component

### Purpose
Build confirmation dialog for test submission with summary.

### When to Use
Create this to show before final test submission.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/test/SubmitDialog.tsx`

**Step 2**: Type this comment:
```typescript
// Create SubmitDialog component for submission confirmation
// Show summary: answered count, marked for review, unanswered
// Warning for unanswered questions
// "Go Back" and "Submit Test" buttons
// Props: isOpen, onClose, onSubmit, answeredCount, markedCount, unansweredCount
// Use Dialog component from ui/
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create submit confirmation dialog for test interface.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/test/SubmitDialog.tsx

GENERATE:
Confirmation dialog for test submission

FEATURES:
1. Summary statistics:
   - Total answered: X/200
   - Marked for review: Y
   - Unanswered: Z
2. Warning message if unanswered > 0
3. Buttons:
   - "Go Back" (secondary)
   - "Submit Test" (primary, red)
4. Loading state during submission

PROPS:
- isOpen: boolean
- onClose: () => void
- onSubmit: () => Promise<void>
- answeredCount: number
- markedForReviewCount: number
- unansweredCount: number
- totalQuestions: number

REQUIREMENTS:
1. Use Dialog component from components/ui/
2. Use Button component from components/ui/
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Handle loading state
6. Use Tailwind CSS for styling
7. Export as default

INTEGRATE WITH:
- components/ui/Dialog.tsx
- components/ui/Button.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in test interface
```

**What You'll Get**: Complete submit dialog component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/test/SubmitDialog.tsx`
3. Paste and save

---

## Prompt 10: Create Test Interface Container

### Purpose
Build main test container that orchestrates all test components.

### When to Use
Create this to tie all test components together.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/test/TestInterface.tsx`

**Step 2**: Type this comment:
```typescript
// Create TestInterface container component
// Use useTest hook for state, useTimer for countdown, useKeyboardShortcuts for navigation
// Layout: header with timer, question display, navigation, palette sidebar
// Handle test submission
// Show loading and error states
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test interface container component that orchestrates all test components.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/test/TestInterface.tsx

GENERATE:
Main test container component

FEATURES:
1. Use hooks:
   - useTest for test state
   - useTimer for countdown
   - useKeyboardShortcuts for navigation
2. Layout:
   - Header: Timer, question indicator, submit button
   - Main: Question display
   - Bottom: Navigation buttons, mark for review
   - Sidebar: Question palette (collapsible)
3. Handle test submission with confirmation
4. Auto-submit when timer reaches 0
5. Show loading state while fetching test
6. Show error state if fetch fails

PROPS:
- testId: string

REQUIREMENTS:
1. Import all test components
2. Use all test hooks
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Handle loading and error states
6. Use Tailwind CSS for layout
7. Responsive design
8. Export as default

INTEGRATE WITH:
- hooks/useTest.ts
- hooks/useTimer.ts
- hooks/useKeyboardShortcuts.ts
- components/test/TestTimer.tsx
- components/test/QuestionDisplay.tsx
- components/test/QuestionPalette.tsx
- components/test/SubmitDialog.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete test interface container

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/test/TestInterface.tsx`
3. Paste and save

---

## Prompt 11: Create Test Page

### Purpose
Build the main test page that renders the test interface.

### When to Use
Create this as the entry point for the test.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/test/[testId]/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create test page with dynamic testId
// Render TestInterface component
// Add page title and metadata
// Use 'use client' directive
// Check if user is authenticated
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test page for the Next.js app with dynamic test ID.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/test/[testId]/page.tsx

GENERATE:
Test page component with dynamic routing

FEATURES:
1. Get testId from URL params
2. Page title: "Diagnostic Test"
3. Render TestInterface component
4. Check authentication (redirect to /auth/login if not authenticated)
5. Full-screen layout

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Use dynamic route params
4. Add metadata for SEO
5. Use Tailwind CSS for layout
6. Import TestInterface component
7. Add proper TypeScript types
8. Export as default

INTEGRATE WITH:
- components/test/TestInterface.tsx
- hooks/useAuth.ts (for authentication check)

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete test page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/test/[testId]/page.tsx`
3. Paste and save

---

## Prompt 12: Update Mock API Server

### Purpose
Add test endpoints to mock API server for standalone testing.

### When to Use
Update this to test test UI without backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Add this comment at the end of the file:
```javascript
// Add test endpoints:
// GET /api/test/:testId - Return 200 mock questions
// POST /api/test/:testId/submit - Return submission result with score
// POST /api/test/:testId/progress - Save test progress
// GET /api/test/:testId/progress - Return saved progress
// All endpoints should return realistic mock data
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Open file `vaishnavi-frontend/mock-data/mock-api-responses.json`

**Step 5**: Add this comment:
```json
// Add mock responses for test:
// testResponse with 200 questions, submissionResponse with score
// Include realistic data matching API contract
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update mock API server with test endpoints for testing.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Express.js, Node.js
- Files:
  - vaishnavi-frontend/mock-data/mock-api-server.js
  - vaishnavi-frontend/mock-data/mock-api-responses.json

GENERATE:
Add test endpoints to existing mock server

ENDPOINTS TO ADD:

1. GET /api/test/:testId
   - Return: { test_id, title, duration, total_questions, questions: Question[] }
   - Include 200 mock questions with LaTeX
   - Mix of subjects (Physics, Chemistry, Math)
   - Mix of difficulties (easy, medium, hard)

2. POST /api/test/:testId/submit
   - Accept: { test_id, answers: Answer[], time_taken }
   - Return: { submission_id, score, total_marks, correct_answers, incorrect_answers, unanswered }

3. POST /api/test/:testId/progress
   - Accept: { test_id, current_question_index, answers, time_remaining }
   - Return: { success: true }

4. GET /api/test/:testId/progress
   - Return: { test_id, current_question_index, answers, time_remaining } or null

MOCK DATA:
- Use realistic question text with LaTeX (e.g., "Calculate \\int x^2 dx")
- Use realistic options
- Include proper subjects and topics
- Use UUIDs for IDs

REQUIREMENTS:
1. Add endpoints to existing Express server
2. Return realistic mock data
3. Add 500ms delay to simulate network
4. Log requests to console
5. Handle CORS properly
6. Add error responses for testing

UPDATE:
- mock-api-server.js: Add endpoint handlers
- mock-api-responses.json: Add mock response data

OUTPUT FORMAT:
- Updated mock-api-server.js with new endpoints
- Updated mock-api-responses.json with mock data
- Ready to run with: node mock-data/mock-api-server.js
```

**What You'll Get**: Updated mock server with test endpoints

**What to Do**:
1. Copy the updated code
2. Update both files
3. Restart mock server

---

## Summary

You've now generated all the code for Day 4: Diagnostic Test UI!

**Files Created:**
- ✅ types/test.ts - Test types
- ✅ lib/test.ts - Test API functions
- ✅ hooks/useTimer.ts - Timer hook
- ✅ hooks/useTest.ts - Test state hook
- ✅ hooks/useKeyboardShortcuts.ts - Keyboard navigation hook
- ✅ components/test/TestTimer.tsx - Timer display
- ✅ components/test/QuestionDisplay.tsx - Question and options
- ✅ components/test/QuestionPalette.tsx - Question grid
- ✅ components/test/SubmitDialog.tsx - Submission confirmation
- ✅ components/test/TestInterface.tsx - Main container
- ✅ app/test/[testId]/page.tsx - Test page
- ✅ Updated mock-api-server.js - Test endpoints
- ✅ Updated mock-api-responses.json - Mock test data

**Next Steps:**
1. Open **CONFIGURATION.md** to set up LaTeX rendering
2. Open **TESTING.md** to test the test interface
3. Open **EXPECTED-OUTCOME.md** to verify success criteria

**Ready to configure? Open CONFIGURATION.md!**

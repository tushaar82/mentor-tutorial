# Day 4: Diagnostic Test UI (Frontend)

## What You're Building

Interactive diagnostic test interface with 200-question test display, timer, question navigation, answer selection, and test submission. This builds on Day 3's onboarding to assess student knowledge and identify strengths/weaknesses across the syllabus.

## Why This Matters

The diagnostic test is the critical first assessment that drives personalized learning:
- **Knowledge Assessment**: Identifies student's current understanding across all topics
- **Weakness Detection**: Pinpoints specific areas needing improvement
- **Strength Recognition**: Highlights topics where student excels
- **Personalized Planning**: Provides data for AI-generated study schedules
- **Progress Baseline**: Establishes starting point for tracking improvement
- **Exam Simulation**: Familiarizes students with test-taking environment

A well-designed test interface ensures students can focus on answering questions without UI distractions, leading to accurate assessment results.

## How It Works

**Diagnostic Test Flow:**

1. **Test Initialization**:
   - Fetch 200 questions from backend API
   - Questions cover all syllabus topics with proper weightage
   - Initialize timer (3 hours for full test)
   - Set up question navigation state
   - Display test instructions and rules

2. **Question Display**:
   - Show one question at a time with clear formatting
   - Display question number and total (e.g., "Question 15 of 200")
   - Show question text with proper formatting (LaTeX for math)
   - Display 4 multiple-choice options (A, B, C, D)
   - Highlight selected answer
   - Show question status (answered, unanswered, marked for review)

3. **Navigation System**:
   - "Previous" and "Next" buttons for sequential navigation
   - Question palette showing all 200 questions with status colors:
     - Green: Answered
     - Orange: Marked for review
     - Gray: Not visited
     - White: Visited but not answered
   - Click any question number to jump directly
   - "Mark for Review" button to flag questions

4. **Timer Management**:
   - Countdown timer showing hours:minutes:seconds
   - Warning when 10 minutes remaining (red color)
   - Auto-submit when time expires
   - Pause timer option (for testing only)

5. **Answer Selection**:
   - Click option to select answer
   - Visual feedback on selection (highlighted)
   - Can change answer anytime before submission
   - Clear answer button to deselect

6. **Test Submission**:
   - "Submit Test" button always visible
   - Confirmation dialog showing:
     - Total questions answered
     - Questions marked for review
     - Unanswered questions
   - Final confirmation before submission
   - Submit answers to backend API
   - Redirect to analytics page

**Technology Stack:**
- Next.js 14 (React framework with App Router)
- React Hooks (useState, useEffect, useCallback)
- Tailwind CSS (styling)
- TypeScript (type safety)
- React Markdown (for question formatting)
- KaTeX (for LaTeX math rendering)

## Learning Objectives

By completing this task, you will:
- Understand complex state management for test interfaces
- Learn how to implement countdown timers in React
- Create efficient question navigation systems
- Handle large datasets (200 questions) efficiently
- Implement keyboard shortcuts for better UX
- Build responsive test layouts
- Manage test state persistence (prevent data loss on refresh)
- Test with mock question data

## Time Estimate

- **LLM Code Generation**: 60 minutes (8-10 prompts)
- **Configuration**: 30 minutes (LaTeX rendering, state management)
- **Testing**: 30 minutes (Test complete flow with mock questions)
- **Total**: 2 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Frontend Project Setup (must be complete)
- ✅ Day 2: Authentication UI (must be complete)
- ✅ Day 3: Onboarding Flow (must be complete)
- ✅ User can complete onboarding successfully
- ✅ Mock API server configured

**Required Software:**
- Node.js 18+ with npm
- Browser for testing (Chrome/Firefox recommended)

**Knowledge Prerequisites:**
- Understanding of React hooks (useState, useEffect, useCallback)
- Familiarity with timer implementation
- Basic knowledge of state management patterns

## Files You'll Create

```
vaishnavi-frontend/
├── app/
│   └── test/
│       ├── [testId]/
│       │   └── page.tsx              # Main test page with dynamic test ID
│       └── loading.tsx               # Loading state for test
├── components/
│   ├── test/
│   │   ├── TestInterface.tsx         # Main test container
│   │   ├── TestHeader.tsx            # Header with timer and test info
│   │   ├── QuestionDisplay.tsx       # Question and options display
│   │   ├── QuestionNavigation.tsx    # Previous/Next buttons
│   │   ├── QuestionPalette.tsx       # Grid of all questions with status
│   │   ├── AnswerOptions.tsx         # Multiple choice options
│   │   ├── TestTimer.tsx             # Countdown timer component
│   │   ├── SubmitDialog.tsx          # Confirmation dialog for submission
│   │   └── TestInstructions.tsx      # Initial instructions modal
│   └── ui/
│       ├── Dialog.tsx                # Reusable dialog/modal component
│       └── Badge.tsx                 # Reusable badge component
├── lib/
│   └── test.ts                       # Test API helper functions
├── hooks/
│   ├── useTest.ts                    # Test state management hook
│   ├── useTimer.ts                   # Timer management hook
│   └── useKeyboardShortcuts.ts       # Keyboard navigation hook
└── types/
    └── test.ts                       # Test TypeScript types
```

## Files You'll Modify

```
vaishnavi-frontend/
├── lib/
│   └── api.ts                        # Add test API calls
└── mock-data/
    ├── mock-api-server.js            # Add test endpoints
    └── mock-api-responses.json       # Add mock test questions
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Interactive test interface with 200 questions
- ✅ Countdown timer with auto-submit
- ✅ Question navigation (Previous/Next, direct jump)
- ✅ Question palette with status indicators
- ✅ Answer selection with visual feedback
- ✅ Mark for review functionality
- ✅ Test submission with confirmation dialog
- ✅ Keyboard shortcuts (arrow keys, number keys)
- ✅ LaTeX math rendering for questions
- ✅ Responsive design for desktop and tablet
- ✅ State persistence (prevent data loss on refresh)
- ✅ Loading states for all operations
- ✅ Mock backend integration for standalone testing

## Test Interface Features You'll Create

### Test Header (`/test/[testId]` - Top Section)
- Test title: "JEE Main Diagnostic Test"
- Timer display: "02:45:30" (hours:minutes:seconds)
- Current question indicator: "Question 15 of 200"
- Submit button (always visible)

### Question Display (Center Section)
- Question number and text
- LaTeX rendering for mathematical expressions
- 4 multiple-choice options (A, B, C, D)
- Selected answer highlighting
- "Mark for Review" checkbox
- "Clear Answer" button

### Navigation Controls (Bottom Section)
- "Previous Question" button
- "Next Question" button
- Question palette toggle button
- Keyboard shortcut hints

### Question Palette (Side Panel)
- Grid of 200 question numbers
- Color-coded status:
  - Green: Answered
  - Orange: Marked for review
  - Gray: Not visited
  - White: Visited but not answered
- Click to jump to any question
- Collapsible on mobile

### Submit Dialog (Modal)
- Summary statistics:
  - Total answered: X/200
  - Marked for review: Y
  - Unanswered: Z
- Warning for unanswered questions
- "Go Back" and "Submit Test" buttons
- Final confirmation step

## Next Steps

After completing this task, you'll move to:
- **Day 5**: Analytics Visualization (display test results with charts and insights)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (LaTeX rendering, state management)
4. **TESTING.md** - Verify test interface works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - Student test-taking journey diagrams
7. **TROUBLESHOOTING.md** - Common UI state and timer issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating test UI code with your AI coding agent!

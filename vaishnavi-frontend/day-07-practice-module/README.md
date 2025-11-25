# Day 7: Practice Module UI (Frontend)

## What You're Building

An interactive practice module interface where students can practice specific topics with AI-generated questions, receive immediate feedback, track mastery levels, and improve their understanding through targeted practice sessions. This builds on the analytics and schedule to provide hands-on learning opportunities for weak topics.

## Why This Matters

Practice is essential for mastering concepts and improving exam performance:
- **Targeted Learning**: Focus practice on specific weak topics identified in analytics
- **Immediate Feedback**: Get instant explanations for correct and incorrect answers
- **Mastery Tracking**: Monitor improvement in each topic over time
- **Confidence Building**: Build confidence through repeated practice and success
- **Adaptive Difficulty**: Questions adapt based on performance
- **Exam Preparation**: Practice in exam-like conditions with timed sessions
- **Knowledge Retention**: Spaced repetition helps retain information longer

A well-designed practice module transforms passive learning into active engagement, helping students master difficult topics through deliberate practice.

## How It Works

**Practice Module Flow:**

1. **Topic Selection**:
   - Display list of all topics from syllabus
   - Highlight weak topics from analytics (red badges)
   - Show mastery level for each topic (0-100%)
   - Filter by subject (Physics, Chemistry, Math)
   - Search topics by name
   - Sort by: Mastery level, Weightage, Alphabetical

2. **Practice Session Configuration**:
   - Select topic to practice
   - Choose number of questions (5, 10, 15, 20)
   - Select difficulty level (Easy, Medium, Hard, Mixed)
   - Enable/disable timer (optional timed practice)
   - Choose practice mode:
     - **Learning Mode**: See explanation after each question
     - **Test Mode**: See results only at the end
   - Start practice session

3. **Question Display**:
   - Show one question at a time
   - Display question text with LaTeX rendering
   - Show 4 multiple-choice options (A, B, C, D)
   - Timer display (if enabled)
   - Question counter (e.g., "Question 3 of 10")
   - "Submit Answer" button

4. **Immediate Feedback (Learning Mode)**:
   - Show if answer is correct or incorrect
   - Display correct answer if wrong
   - Show detailed explanation
   - Highlight key concepts
   - Show related topics
   - "Next Question" button
   - "Add to Review" button

5. **Progress Tracking**:
   - Current session: X/Y correct
   - Accuracy percentage
   - Average time per question
   - Questions remaining
   - Session progress bar

6. **Session Summary**:
   - Total questions attempted
   - Correct answers count and percentage
   - Time taken (if timed)
   - Topic mastery update (before → after)
   - Weak concepts identified
   - Recommended next steps
   - "Practice Again" and "Choose Another Topic" buttons

7. **Mastery Dashboard**:
   - List all topics with mastery levels
   - Visual progress bars for each topic
   - Practice history (sessions completed, questions answered)
   - Improvement trends over time
   - Achievements and milestones
   - Recommended topics to practice next

8. **Review Queue**:
   - Questions marked for review
   - Incorrectly answered questions
   - Filter by topic and difficulty
   - Practice review questions again

**Technology Stack:**
- Next.js 14 (React framework with App Router)
- React Hooks (useState, useEffect, useCallback)
- Tailwind CSS (styling)
- TypeScript (type safety)
- React Markdown (for explanations)
- KaTeX (for LaTeX math rendering)
- Recharts (for mastery progress charts)
- Local Storage (for session persistence)

## Learning Objectives

By completing this task, you will:
- Understand practice session state management
- Learn how to implement immediate feedback systems
- Create mastery tracking and progress visualization
- Handle question rendering with LaTeX support
- Implement adaptive difficulty selection
- Build session configuration interfaces
- Manage practice history and analytics
- Test with mock practice questions

## Time Estimate

- **LLM Code Generation**: 60 minutes (10-12 prompts)
- **Configuration**: 30 minutes (LaTeX rendering, state management, local storage)
- **Testing**: 30 minutes (Test complete practice flow with mock questions)
- **Total**: 2 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Frontend Project Setup (must be complete)
- ✅ Day 2: Authentication UI (must be complete)
- ✅ Day 3: Onboarding Flow (must be complete)
- ✅ Day 4: Diagnostic Test UI (must be complete)
- ✅ Day 5: Analytics Visualization (must be complete)
- ✅ Day 6: Schedule Display (must be complete)
- ✅ User can view analytics and schedule successfully
- ✅ Mock API server configured

**Required Software:**
- Node.js 18+ with npm
- Browser for testing (Chrome/Firefox recommended)

**Knowledge Prerequisites:**
- Understanding of React hooks (useState, useEffect, useCallback)
- Familiarity with state management patterns
- Basic knowledge of local storage API
- Understanding of progress tracking systems

## Files You'll Create

```
vaishnavi-frontend/
├── app/
│   └── practice/
│       ├── page.tsx                  # Practice home with topic selection
│       ├── [topicId]/
│       │   ├── page.tsx              # Practice session page
│       │   └── configure/
│       │       └── page.tsx          # Session configuration page
│       ├── mastery/
│       │   └── page.tsx              # Mastery dashboard page
│       └── review/
│           └── page.tsx              # Review queue page
├── components/
│   ├── practice/
│   │   ├── TopicSelector.tsx         # Topic selection with filters
│   │   ├── TopicCard.tsx             # Individual topic card with mastery
│   │   ├── SessionConfig.tsx         # Practice session configuration
│   │   ├── PracticeInterface.tsx     # Main practice container
│   │   ├── PracticeQuestion.tsx      # Question display with options
│   │   ├── FeedbackPanel.tsx         # Immediate feedback after answer
│   │   ├── SessionProgress.tsx       # Progress bar and stats
│   │   ├── SessionSummary.tsx        # End-of-session results
│   │   ├── MasteryDashboard.tsx      # Overall mastery view
│   │   ├── MasteryChart.tsx          # Topic mastery visualization
│   │   ├── PracticeHistory.tsx       # Past practice sessions
│   │   └── ReviewQueue.tsx           # Questions to review
│   └── ui/
│       ├── ProgressBar.tsx           # Reusable progress bar
│       └── Badge.tsx                 # Reusable badge component
├── lib/
│   └── practice.ts                   # Practice API helper functions
├── hooks/
│   ├── usePractice.ts                # Practice session state management
│   ├── useMastery.ts                 # Mastery tracking hook
│   └── usePracticeHistory.ts         # Practice history management
└── types/
    └── practice.ts                   # Practice TypeScript types
```

## Files You'll Modify

```
vaishnavi-frontend/
├── lib/
│   └── api.ts                        # Add practice API calls
└── mock-data/
    ├── mock-api-server.js            # Add practice endpoints
    └── mock-api-responses.json       # Add mock practice questions
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Topic selection interface with mastery levels
- ✅ Practice session configuration (questions, difficulty, mode)
- ✅ Interactive practice interface with question display
- ✅ Immediate feedback with explanations (Learning Mode)
- ✅ Session progress tracking
- ✅ Session summary with mastery updates
- ✅ Mastery dashboard with progress visualization
- ✅ Practice history tracking
- ✅ Review queue for marked questions
- ✅ LaTeX math rendering for questions
- ✅ Timer support for timed practice
- ✅ Responsive design for desktop and mobile
- ✅ State persistence (prevent data loss on refresh)
- ✅ Loading and error states
- ✅ Mock backend integration for standalone testing

## Practice Module Features You'll Create

### Topic Selection Page (`/practice`)
- Grid of topic cards with:
  - Topic name and subject
  - Mastery level (0-100%) with progress bar
  - Color coding: Red (<50%), Yellow (50-75%), Green (>75%)
  - Questions practiced count
  - "Practice Now" button
- Filters: Subject, Mastery level, Weak topics only
- Search bar for topic names
- Sort options: Mastery, Weightage, Alphabetical

### Session Configuration Page (`/practice/[topicId]/configure`)
- Topic name and current mastery level
- Number of questions selector (5, 10, 15, 20)
- Difficulty level selector (Easy, Medium, Hard, Mixed)
- Practice mode toggle:
  - Learning Mode (feedback after each question)
  - Test Mode (results at end)
- Timer toggle (enable/disable)
- "Start Practice" button

### Practice Interface (`/practice/[topicId]`)
- Header with:
  - Topic name
  - Question counter: "Question 3 of 10"
  - Timer (if enabled)
  - Current accuracy: "7/10 (70%)"
  - Exit button
- Question display:
  - Question text with LaTeX rendering
  - 4 multiple-choice options
  - "Submit Answer" button
- Progress bar at bottom

### Feedback Panel (Learning Mode)
- Result indicator: ✓ Correct or ✗ Incorrect
- Correct answer highlighted
- Detailed explanation section
- Key concepts highlighted
- Related topics links
- "Add to Review" button
- "Next Question" button

### Session Summary
- Overall result: "8/10 Correct (80%)"
- Time taken (if timed)
- Mastery update: "45% → 52% (+7%)"
- Performance breakdown:
  - Easy questions: X/Y
  - Medium questions: X/Y
  - Hard questions: X/Y
- Weak concepts identified
- Recommendations
- Action buttons:
  - "Practice Again"
  - "Choose Another Topic"
  - "View Mastery Dashboard"

### Mastery Dashboard (`/practice/mastery`)
- Overall statistics:
  - Total topics: X
  - Mastered topics (>75%): Y
  - Topics in progress (50-75%): Z
  - Weak topics (<50%): W
- Topic list with mastery bars
- Mastery trend chart (improvement over time)
- Practice statistics:
  - Total questions practiced
  - Overall accuracy
  - Total practice time
- Achievements section

### Review Queue (`/practice/review`)
- List of questions to review:
  - Incorrectly answered questions
  - Questions marked for review
- Filter by topic and difficulty
- "Practice Review Questions" button
- Clear review queue option

## Next Steps

After completing this task, you'll move to:
- **Day 8**: Parent Dashboard (parent monitoring interface)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (state management, local storage)
4. **TESTING.md** - Verify practice module works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - Student practice journey diagrams
7. **TROUBLESHOOTING.md** - Common practice UI and state issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating practice module code with your AI coding agent!

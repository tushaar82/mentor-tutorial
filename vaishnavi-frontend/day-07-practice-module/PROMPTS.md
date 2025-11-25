# AI Coding Agent Prompts for Day 7: Practice Module UI

This document contains all prompts needed to generate the practice module code for Day 7. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Practice Types

### Purpose
Define TypeScript types for practice sessions, topics, questions, and mastery tracking.

### When to Use
Start with this to establish type safety for all practice components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/practice.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for practice module
// Include: Topic, PracticeSession, PracticeQuestion, SessionConfig, MasteryData, PracticeHistory
// Support topic selection, session configuration, question display, feedback, mastery tracking
// Add proper type safety for all practice operations
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for practice module in a Next.js EdTech platform.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/types/practice.ts

GENERATE:
TypeScript interfaces and types for practice module

REQUIREMENTS:
1. Topic interface:
   - topic_id: string
   - name: string
   - subject: string
   - mastery_level: number (0-100)
   - questions_practiced: number
   - last_practiced: string (ISO date)
   - is_weak: boolean

2. SessionConfig interface:
   - topic_id: string
   - num_questions: 5 | 10 | 15 | 20
   - difficulty: "easy" | "medium" | "hard" | "mixed"
   - mode: "learning" | "test"
   - timed: boolean
   - time_per_question?: number (seconds)

3. PracticeQuestion interface:
   - question_id: string
   - question_text: string
   - options: { A: string, B: string, C: string, D: string }
   - correct_answer: "A" | "B" | "C" | "D"
   - explanation: string
   - difficulty: "easy" | "medium" | "hard"
   - topic: string
   - subject: string

4. QuestionAttempt interface:
   - question_id: string
   - selected_answer: "A" | "B" | "C" | "D" | null
   - is_correct: boolean
   - time_taken: number (seconds)
   - marked_for_review: boolean

5. PracticeSession interface:
   - session_id: string
   - topic_id: string
   - config: SessionConfig
   - questions: PracticeQuestion[]
   - attempts: QuestionAttempt[]
   - current_question_index: number
   - start_time: string
   - end_time?: string
   - status: "in_progress" | "completed"

6. SessionSummary interface:
   - total_questions: number
   - correct_answers: number
   - accuracy: number (percentage)
   - time_taken: number (seconds)
   - mastery_before: number
   - mastery_after: number
   - weak_concepts: string[]

7. MasteryData interface:
   - topic_id: string
   - topic_name: string
   - subject: string
   - mastery_level: number
   - questions_practiced: number
   - correct_count: number
   - sessions_completed: number
   - last_practiced: string
   - trend: "improving" | "stable" | "declining"

8. PracticeHistory interface:
   - session_id: string
   - topic_name: string
   - date: string
   - questions_attempted: number
   - accuracy: number
   - time_taken: number

9. Add JSDoc comments for each type
10. Export all types

OUTPUT FORMAT:
- Complete TypeScript file with all types
- Include all imports
- Add detailed JSDoc comments
```

**What You'll Get**: Complete TypeScript types file

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/types/practice.ts`
3. Paste and save

---

## Prompt 2: Create Practice API Helper Functions

### Purpose
Build helper functions for practice API calls (fetch topics, start session, submit answers, get mastery).

### When to Use
Create this before building UI components to handle API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/practice.ts`

**Step 2**: Type this comment:
```typescript
// Create practice API helper functions
// Functions: fetchTopics, startPracticeSession, submitAnswer, completePracticeSession, fetchMasteryData, fetchPracticeHistory
// Call backend API at /api/practice endpoints
// Return typed responses with error handling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create practice API helper functions for a Next.js frontend.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/practice.ts
- Backend API: http://localhost:8000/api/practice

GENERATE:
Practice helper functions that call backend API

FUNCTIONS NEEDED:
1. fetchTopics(studentId: string) → Topic[]
   - GET from /api/practice/topics/{studentId}
   - Return list of topics with mastery levels

2. startPracticeSession(config: SessionConfig) → PracticeSession
   - POST to /api/practice/session/start
   - Return session with questions

3. submitAnswer(sessionId: string, questionId: string, answer: string) → { is_correct: boolean, explanation: string }
   - POST to /api/practice/session/{sessionId}/answer
   - Return immediate feedback

4. completePracticeSession(sessionId: string) → SessionSummary
   - POST to /api/practice/session/{sessionId}/complete
   - Return session summary with mastery update

5. fetchMasteryData(studentId: string) → MasteryData[]
   - GET from /api/practice/mastery/{studentId}
   - Return mastery data for all topics

6. fetchPracticeHistory(studentId: string) → PracticeHistory[]
   - GET from /api/practice/history/{studentId}
   - Return past practice sessions

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Add proper error handling with try-catch
3. Include TypeScript types for all parameters and returns
4. Add JSDoc comments for each function
5. Handle network errors gracefully
6. Return user-friendly error messages
7. Use types from types/practice.ts

INTEGRATE WITH:
- lib/api.ts (API client base URL)
- types/practice.ts (practice types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete practice helper functions

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/practice.ts`
3. Paste and save

---

## Prompt 3: Create Practice Session Hook

### Purpose
Build React hook for managing practice session state.

### When to Use
Create this hook to manage session state across practice components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/usePractice.ts`

**Step 2**: Type this comment:
```typescript
// Create usePractice hook for practice session management
// Manage session state, current question, answers, timer
// Functions: startSession, submitAnswer, nextQuestion, previousQuestion, completeSession
// Track loading and error states
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for practice session management in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/usePractice.ts

GENERATE:
Custom React hook for managing practice sessions

HOOK: usePractice

Parameters:
- sessionConfig: SessionConfig

State:
- session: PracticeSession | null
- currentQuestion: PracticeQuestion | null
- loading: boolean
- error: string | null
- timeRemaining: number (seconds)

Functions:
- startSession() → Promise<void>
- submitAnswer(answer: string) → Promise<{ is_correct: boolean, explanation: string }>
- nextQuestion() → void
- previousQuestion() → void
- markForReview() → void
- completeSession() → Promise<SessionSummary>

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback)
2. Manage timer countdown if timed mode
3. Track all question attempts
4. Handle loading and error states
5. Integrate with lib/practice.ts
6. Add proper TypeScript types
7. Include JSDoc comments
8. Export hook as default

INTEGRATE WITH:
- lib/practice.ts (API functions)
- types/practice.ts (practice types)

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete practice session hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/usePractice.ts`
3. Paste and save

---

## Prompt 4: Create Mastery Hook

### Purpose
Build React hook for fetching and managing mastery data.

### When to Use
Create this hook to provide mastery data to components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useMastery.ts`

**Step 2**: Type this comment:
```typescript
// Create useMastery hook for mastery data management
// Fetch mastery data on mount
// Track loading and error states
// Return: mastery data array, loading, error, refetch function
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for mastery data fetching in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useMastery.ts

GENERATE:
Custom React hook for fetching mastery data

HOOK: useMastery

Parameters:
- studentId: string

State:
- masteryData: MasteryData[]
- loading: boolean
- error: string | null

Functions:
- refetch() → Promise<void>

Behavior:
- Fetch mastery data on mount
- Handle loading and error states
- Provide refetch function

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Integrate with lib/practice.ts
5. Export hook as default

INTEGRATE WITH:
- lib/practice.ts (API functions)
- types/practice.ts (mastery types)

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete mastery data hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useMastery.ts`
3. Paste and save

---

## Prompt 5: Create Topic Card Component

### Purpose
Build component to display individual topic with mastery level.

### When to Use
Create this for topic selection interface.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/TopicCard.tsx`

**Step 2**: Type this comment:
```typescript
// Create TopicCard component for topic display
// Show topic name, subject, mastery level with progress bar
// Color coding: red (<50%), yellow (50-75%), green (>75%)
// Props: topic data, onClick handler
// "Practice Now" button
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create topic card component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/TopicCard.tsx

GENERATE:
Topic card component

FEATURES:
1. Topic name and subject badge
2. Mastery level progress bar (0-100%)
3. Color coding: red (<50%), yellow (50-75%), green (>75%)
4. Questions practiced count
5. Last practiced date
6. "Practice Now" button
7. Weak topic indicator (if is_weak)
8. Hover effects

PROPS:
- topic: Topic
- onClick: () => void

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Use Tailwind CSS for styling
4. Responsive design
5. Export as default

INTEGRATE WITH:
- types/practice.ts (Topic type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in topic selector
```

**What You'll Get**: Complete topic card component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/TopicCard.tsx`
3. Paste and save

---

## Prompt 6: Create Topic Selector Component

### Purpose
Build component to display all topics with filters and search.

### When to Use
Create this as the main topic selection interface.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/TopicSelector.tsx`

**Step 2**: Type this comment:
```typescript
// Create TopicSelector component for topic selection
// Display grid of TopicCard components
// Filters: subject, mastery level, weak topics only
// Search bar for topic names
// Sort options: mastery, weightage, alphabetical
// Props: topics array, onTopicSelect handler
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create topic selector component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/TopicSelector.tsx

GENERATE:
Topic selector component with filters

FEATURES:
1. Grid of TopicCard components
2. Subject filter dropdown (All, Physics, Chemistry, Math)
3. Mastery filter (All, Weak <50%, Medium 50-75%, Strong >75%)
4. "Weak Topics Only" toggle
5. Search bar for topic names
6. Sort dropdown (Mastery, Alphabetical)
7. Empty state if no topics match filters
8. Responsive grid layout

PROPS:
- topics: Topic[]
- onTopicSelect: (topicId: string) => void

REQUIREMENTS:
1. Use TopicCard component
2. Implement all filters and search
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Use Tailwind CSS for styling
6. Export as default

INTEGRATE WITH:
- components/practice/TopicCard.tsx
- types/practice.ts (Topic type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in practice page
```

**What You'll Get**: Complete topic selector component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/TopicSelector.tsx`
3. Paste and save

---

## Prompt 7: Create Session Config Component

### Purpose
Build component for configuring practice session parameters.

### When to Use
Create this for session configuration page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/SessionConfig.tsx`

**Step 2**: Type this comment:
```typescript
// Create SessionConfig component for session configuration
// Number of questions selector (5, 10, 15, 20)
// Difficulty selector (Easy, Medium, Hard, Mixed)
// Mode toggle (Learning vs Test)
// Timer toggle
// "Start Practice" button
// Props: topicId, onStart handler
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create session configuration component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/SessionConfig.tsx

GENERATE:
Session configuration component

FEATURES:
1. Topic name display with current mastery
2. Number of questions selector (5, 10, 15, 20) - radio buttons
3. Difficulty selector (Easy, Medium, Hard, Mixed) - radio buttons
4. Practice mode toggle:
   - Learning Mode (feedback after each question)
   - Test Mode (results at end)
5. Timer toggle (enable/disable)
6. "Start Practice" button (primary)
7. "Back to Topics" button (secondary)
8. Configuration summary panel

PROPS:
- topicId: string
- topicName: string
- currentMastery: number
- onStart: (config: SessionConfig) => void
- onBack: () => void

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Validate configuration before start
4. Use Tailwind CSS for styling
5. Responsive design
6. Export as default

INTEGRATE WITH:
- types/practice.ts (SessionConfig type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in configuration page
```

**What You'll Get**: Complete session config component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/SessionConfig.tsx`
3. Paste and save

---

## Prompt 8: Create Practice Question Component

### Purpose
Build component to display practice question with options.

### When to Use
Create this for question display in practice session.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/PracticeQuestion.tsx`

**Step 2**: Type this comment:
```typescript
// Create PracticeQuestion component for question display
// Show question text with LaTeX rendering
// Display 4 multiple-choice options (A, B, C, D)
// Highlight selected answer
// "Submit Answer" button
// Props: question, selectedAnswer, onAnswerSelect, onSubmit
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create practice question component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS, KaTeX
- File: vaishnavi-frontend/components/practice/PracticeQuestion.tsx

GENERATE:
Practice question display component

FEATURES:
1. Question number and total (e.g., "Question 3 of 10")
2. Question text with LaTeX rendering (use react-katex)
3. 4 multiple-choice options (A, B, C, D)
4. Option selection with visual feedback
5. Selected answer highlighting
6. "Submit Answer" button (disabled until answer selected)
7. "Clear Answer" button
8. Responsive layout

PROPS:
- question: PracticeQuestion
- questionNumber: number
- totalQuestions: number
- selectedAnswer: string | null
- onAnswerSelect: (answer: string) => void
- onSubmit: () => void
- disabled: boolean

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Use KaTeX for LaTeX rendering
4. Use Tailwind CSS for styling
5. Responsive design
6. Export as default

INTEGRATE WITH:
- types/practice.ts (PracticeQuestion type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in practice interface
```

**What You'll Get**: Complete practice question component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/PracticeQuestion.tsx`
3. Paste and save

---

## Prompt 9: Create Feedback Panel Component

### Purpose
Build component to display immediate feedback after answer submission.

### When to Use
Create this for Learning Mode feedback display.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/FeedbackPanel.tsx`

**Step 2**: Type this comment:
```typescript
// Create FeedbackPanel component for answer feedback
// Show correct/incorrect indicator
// Display correct answer if wrong
// Show detailed explanation with LaTeX
// "Add to Review" button
// "Next Question" button
// Props: isCorrect, correctAnswer, explanation, onNext, onAddToReview
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create feedback panel component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS, KaTeX
- File: vaishnavi-frontend/components/practice/FeedbackPanel.tsx

GENERATE:
Feedback panel component for Learning Mode

FEATURES:
1. Result indicator: ✓ Correct (green) or ✗ Incorrect (red)
2. Correct answer display (if incorrect)
3. Detailed explanation with LaTeX rendering
4. Key concepts section
5. "Add to Review" button
6. "Next Question" button (primary)
7. Animated entrance
8. Responsive layout

PROPS:
- isCorrect: boolean
- correctAnswer: string
- selectedAnswer: string
- explanation: string
- onNext: () => void
- onAddToReview: () => void

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Use KaTeX for LaTeX rendering
4. Color-code based on correctness
5. Use Tailwind CSS for styling
6. Add smooth animations
7. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in practice interface
```

**What You'll Get**: Complete feedback panel component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/FeedbackPanel.tsx`
3. Paste and save

---

## Prompt 10: Create Session Progress Component

### Purpose
Build component to display session progress and stats.

### When to Use
Create this for progress tracking during practice session.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/SessionProgress.tsx`

**Step 2**: Type this comment:
```typescript
// Create SessionProgress component for progress display
// Show progress bar (questions completed)
// Display current accuracy (X/Y correct)
// Show timer if timed mode
// Questions remaining count
// Props: current, total, correct, timeRemaining
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create session progress component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/SessionProgress.tsx

GENERATE:
Session progress display component

FEATURES:
1. Progress bar showing completion (X/Y questions)
2. Current accuracy: "7/10 (70%)"
3. Timer display (if timed mode): "05:30"
4. Questions remaining: "3 remaining"
5. Color-coded accuracy (green >75%, yellow 50-75%, red <50%)
6. Responsive layout

PROPS:
- currentQuestion: number
- totalQuestions: number
- correctAnswers: number
- timeRemaining?: number (seconds)
- isTimed: boolean

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Format time display (MM:SS)
4. Use Tailwind CSS for styling
5. Responsive design
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in practice interface
```

**What You'll Get**: Complete session progress component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/SessionProgress.tsx`
3. Paste and save

---

## Prompt 11: Create Session Summary Component

### Purpose
Build component to display session results and mastery update.

### When to Use
Create this for end-of-session summary display.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/SessionSummary.tsx`

**Step 2**: Type this comment:
```typescript
// Create SessionSummary component for session results
// Show overall result (X/Y correct, percentage)
// Display mastery update (before → after)
// Performance breakdown by difficulty
// Weak concepts identified
// Recommendations
// "Practice Again" and "Choose Another Topic" buttons
// Props: summary data, onPracticeAgain, onChooseTopic
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create session summary component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/SessionSummary.tsx

GENERATE:
Session summary display component

FEATURES:
1. Overall result: "8/10 Correct (80%)" with icon
2. Mastery update: "45% → 52% (+7%)" with progress bars
3. Time taken (if timed)
4. Performance breakdown:
   - Easy questions: X/Y
   - Medium questions: X/Y
   - Hard questions: X/Y
5. Weak concepts section (if any)
6. Recommendations
7. Action buttons:
   - "Practice Again" (primary)
   - "Choose Another Topic" (secondary)
   - "View Mastery Dashboard" (outline)
8. Celebration animation for high scores
9. Responsive layout

PROPS:
- summary: SessionSummary
- topicName: string
- onPracticeAgain: () => void
- onChooseTopic: () => void
- onViewMastery: () => void

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Color-code based on performance
4. Use Tailwind CSS for styling
5. Add animations for celebration
6. Responsive design
7. Export as default

INTEGRATE WITH:
- types/practice.ts (SessionSummary type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in practice interface
```

**What You'll Get**: Complete session summary component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/SessionSummary.tsx`
3. Paste and save

---

## Prompt 12: Create Mastery Dashboard Component

### Purpose
Build component to display overall mastery data for all topics.

### When to Use
Create this for mastery tracking page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/MasteryDashboard.tsx`

**Step 2**: Type this comment:
```typescript
// Create MasteryDashboard component for mastery overview
// Show overall statistics (total topics, mastered, in progress, weak)
// Display list of topics with mastery bars
// Mastery trend chart
// Practice statistics (questions practiced, accuracy, time)
// Props: mastery data array
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create mastery dashboard component for practice module.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS, Recharts
- File: vaishnavi-frontend/components/practice/MasteryDashboard.tsx

GENERATE:
Mastery dashboard component

FEATURES:
1. Overall statistics cards:
   - Total topics
   - Mastered (>75%)
   - In progress (50-75%)
   - Weak (<50%)
2. Topic list with mastery progress bars
3. Sort options (mastery, alphabetical, subject)
4. Filter by subject
5. Practice statistics:
   - Total questions practiced
   - Overall accuracy
   - Total practice time
6. Mastery trend chart (optional)
7. "Start Practice" button for each topic
8. Responsive layout

PROPS:
- masteryData: MasteryData[]
- onStartPractice: (topicId: string) => void

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Use Recharts for trend chart
4. Use Tailwind CSS for styling
5. Responsive design
6. Export as default

INTEGRATE WITH:
- types/practice.ts (MasteryData type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in mastery page
```

**What You'll Get**: Complete mastery dashboard component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/MasteryDashboard.tsx`
3. Paste and save

---

## Prompt 13: Create Practice Interface Container

### Purpose
Build main practice container that orchestrates practice session components.

### When to Use
Create this to tie all practice session components together.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/practice/PracticeInterface.tsx`

**Step 2**: Type this comment:
```typescript
// Create PracticeInterface container component
// Use usePractice hook for session management
// Layout: header with timer, question display, feedback panel (learning mode), progress bar
// Handle question navigation and answer submission
// Show loading and error states
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create practice interface container component that orchestrates practice session.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/practice/PracticeInterface.tsx

GENERATE:
Main practice interface container component

FEATURES:
1. Use usePractice hook for session management
2. Layout sections:
   - Header with topic name, timer, exit button
   - SessionProgress component
   - PracticeQuestion component
   - FeedbackPanel component (Learning Mode only)
   - Navigation buttons (Previous/Next)
3. Handle answer submission
4. Show feedback in Learning Mode
5. Auto-advance in Test Mode
6. Show loading state while fetching
7. Show error state if fetch fails
8. Responsive layout

PROPS:
- sessionConfig: SessionConfig

REQUIREMENTS:
1. Import all practice components
2. Use usePractice hook
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Handle loading and error states
6. Use Tailwind CSS for layout
7. Export as default

INTEGRATE WITH:
- hooks/usePractice.ts
- components/practice/SessionProgress.tsx
- components/practice/PracticeQuestion.tsx
- components/practice/FeedbackPanel.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete practice interface container

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/practice/PracticeInterface.tsx`
3. Paste and save

---

## Prompt 14: Create Practice Home Page

### Purpose
Build the main practice page with topic selection.

### When to Use
Create this as the entry point for practice module.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/practice/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create practice home page with topic selection
// Fetch topics using API
// Render TopicSelector component
// Navigate to configuration page on topic select
// Add page title and metadata
// Use 'use client' directive
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create practice home page for the Next.js app.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/practice/page.tsx

GENERATE:
Practice home page component

FEATURES:
1. Page title: "Practice Topics"
2. Fetch topics from API
3. Render TopicSelector component
4. Navigate to /practice/[topicId]/configure on topic select
5. Show loading state while fetching
6. Show error state if fetch fails
7. Full-width layout with padding

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Fetch topics on mount
4. Use Next.js router for navigation
5. Add metadata for SEO
6. Use Tailwind CSS for layout
7. Import TopicSelector component
8. Add proper TypeScript types
9. Export as default

INTEGRATE WITH:
- components/practice/TopicSelector.tsx
- lib/practice.ts (fetchTopics)

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete practice home page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/practice/page.tsx`
3. Paste and save

---

## Prompt 15: Create Session Configuration Page

### Purpose
Build the session configuration page.

### When to Use
Create this for configuring practice session parameters.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/practice/[topicId]/configure/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create session configuration page with dynamic topicId
// Get topicId from URL params
// Render SessionConfig component
// Navigate to practice session page on start
// Add page title and metadata
// Use 'use client' directive
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create session configuration page for the Next.js app with dynamic topic ID.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/practice/[topicId]/configure/page.tsx

GENERATE:
Session configuration page component with dynamic routing

FEATURES:
1. Get topicId from URL params
2. Fetch topic details (name, mastery)
3. Page title: "Configure Practice Session"
4. Render SessionConfig component
5. Navigate to /practice/[topicId] on start with config
6. Navigate back to /practice on back button
7. Show loading state while fetching topic
8. Full-width layout with padding

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Use dynamic route params
4. Use Next.js router for navigation
5. Add metadata for SEO
6. Use Tailwind CSS for layout
7. Import SessionConfig component
8. Add proper TypeScript types
9. Export as default

INTEGRATE WITH:
- components/practice/SessionConfig.tsx
- lib/practice.ts (fetchTopics)

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete configuration page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/practice/[topicId]/configure/page.tsx`
3. Paste and save

---

## Prompt 16: Create Practice Session Page

### Purpose
Build the practice session page where students answer questions.

### When to Use
Create this for the actual practice session.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/practice/[topicId]/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create practice session page with dynamic topicId
// Get topicId and session config from URL/state
// Render PracticeInterface component
// Show SessionSummary on completion
// Add page title and metadata
// Use 'use client' directive
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create practice session page for the Next.js app with dynamic topic ID.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/practice/[topicId]/page.tsx

GENERATE:
Practice session page component with dynamic routing

FEATURES:
1. Get topicId from URL params
2. Get session config from router state or localStorage
3. Page title: "Practice Session"
4. Render PracticeInterface component
5. Show SessionSummary when session completes
6. Prevent navigation away during session (confirmation dialog)
7. Full-screen layout

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Use dynamic route params
4. Handle session state
5. Add metadata for SEO
6. Use Tailwind CSS for layout
7. Import PracticeInterface and SessionSummary components
8. Add proper TypeScript types
9. Export as default

INTEGRATE WITH:
- components/practice/PracticeInterface.tsx
- components/practice/SessionSummary.tsx

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete practice session page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/practice/[topicId]/page.tsx`
3. Paste and save

---

## Prompt 17: Create Mastery Dashboard Page

### Purpose
Build the mastery dashboard page.

### When to Use
Create this for viewing overall mastery progress.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/practice/mastery/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create mastery dashboard page
// Fetch mastery data using useMastery hook
// Render MasteryDashboard component
// Navigate to practice on topic select
// Add page title and metadata
// Use 'use client' directive
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create mastery dashboard page for the Next.js app.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/practice/mastery/page.tsx

GENERATE:
Mastery dashboard page component

FEATURES:
1. Page title: "Mastery Dashboard"
2. Use useMastery hook to fetch data
3. Render MasteryDashboard component
4. Navigate to /practice/[topicId]/configure on start practice
5. Show loading state while fetching
6. Show error state if fetch fails
7. Full-width layout with padding

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Use useMastery hook
4. Use Next.js router for navigation
5. Add metadata for SEO
6. Use Tailwind CSS for layout
7. Import MasteryDashboard component
8. Add proper TypeScript types
9. Export as default

INTEGRATE WITH:
- components/practice/MasteryDashboard.tsx
- hooks/useMastery.ts

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete mastery dashboard page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/practice/mastery/page.tsx`
3. Paste and save

---

## Prompt 18: Update Mock API Server

### Purpose
Add practice endpoints to mock API server for standalone testing.

### When to Use
Update this to test practice UI without backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Add this comment at the end of the file:
```javascript
// Add practice endpoints:
// GET /api/practice/topics/:studentId - Return topics with mastery
// POST /api/practice/session/start - Start practice session with questions
// POST /api/practice/session/:sessionId/answer - Submit answer and get feedback
// POST /api/practice/session/:sessionId/complete - Complete session and get summary
// GET /api/practice/mastery/:studentId - Return mastery data
// GET /api/practice/history/:studentId - Return practice history
// All endpoints should return realistic mock data
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Open file `vaishnavi-frontend/mock-data/mock-api-responses.json`

**Step 5**: Add this comment:
```json
// Add mock responses for practice:
// topics array with mastery levels
// practice questions with LaTeX
// feedback with explanations
// session summary with mastery updates
// mastery data for all topics
// practice history
// Include realistic data matching API contract
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update mock API server with practice endpoints for testing.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Express.js, Node.js
- Files:
  - vaishnavi-frontend/mock-data/mock-api-server.js
  - vaishnavi-frontend/mock-data/mock-api-responses.json

GENERATE:
Add practice endpoints to existing mock server

ENDPOINTS TO ADD:

1. GET /api/practice/topics/:studentId
   - Return: Topic[] with mastery levels
   - Include: 15-20 topics across Physics, Chemistry, Math
   - Mix of weak, medium, strong topics

2. POST /api/practice/session/start
   - Body: SessionConfig
   - Return: PracticeSession with questions
   - Generate questions based on config

3. POST /api/practice/session/:sessionId/answer
   - Body: { question_id, answer }
   - Return: { is_correct, explanation }
   - Immediate feedback

4. POST /api/practice/session/:sessionId/complete
   - Return: SessionSummary with mastery update
   - Calculate accuracy and mastery change

5. GET /api/practice/mastery/:studentId
   - Return: MasteryData[] for all topics
   - Include trends and statistics

6. GET /api/practice/history/:studentId
   - Return: PracticeHistory[]
   - Past practice sessions

MOCK DATA:
- Topics: 20 topics with varying mastery (20%-95%)
- Questions: 10-15 practice questions with LaTeX
- Explanations: Detailed explanations for each question
- Mastery updates: Realistic mastery changes (+3% to +10%)

REQUIREMENTS:
1. Add endpoints to existing Express server
2. Return realistic mock data
3. Add 500ms delay to simulate network
4. Log requests to console
5. Handle CORS properly
6. Store session state in memory

UPDATE:
- mock-api-server.js: Add endpoint handlers
- mock-api-responses.json: Add mock practice data

OUTPUT FORMAT:
- Updated mock-api-server.js with new endpoints
- Updated mock-api-responses.json with mock data
- Ready to run with: node mock-data/mock-api-server.js
```

**What You'll Get**: Updated mock server with practice endpoints

**What to Do**:
1. Copy the updated code
2. Update both files
3. Restart mock server

---

## Summary

You've now generated all the code for Day 7: Practice Module UI!

**Files Created:**
- ✅ types/practice.ts - Practice types
- ✅ lib/practice.ts - Practice API functions
- ✅ hooks/usePractice.ts - Practice session hook
- ✅ hooks/useMastery.ts - Mastery data hook
- ✅ components/practice/TopicCard.tsx - Topic card
- ✅ components/practice/TopicSelector.tsx - Topic selector with filters
- ✅ components/practice/SessionConfig.tsx - Session configuration
- ✅ components/practice/PracticeQuestion.tsx - Question display
- ✅ components/practice/FeedbackPanel.tsx - Answer feedback
- ✅ components/practice/SessionProgress.tsx - Progress tracking
- ✅ components/practice/SessionSummary.tsx - Session results
- ✅ components/practice/MasteryDashboard.tsx - Mastery overview
- ✅ components/practice/PracticeInterface.tsx - Main practice container
- ✅ app/practice/page.tsx - Practice home page
- ✅ app/practice/[topicId]/configure/page.tsx - Configuration page
- ✅ app/practice/[topicId]/page.tsx - Practice session page
- ✅ app/practice/mastery/page.tsx - Mastery dashboard page
- ✅ Updated mock-api-server.js - Practice endpoints
- ✅ Updated mock-api-responses.json - Mock practice data

**Next Steps:**
1. Open **CONFIGURATION.md** to configure state management and local storage
2. Open **TESTING.md** to test the practice module
3. Open **EXPECTED-OUTCOME.md** to verify success criteria

**Ready to configure? Open CONFIGURATION.md!**

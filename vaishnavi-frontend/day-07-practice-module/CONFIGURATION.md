# Configuration Guide for Day 7: Practice Module UI

This document provides step-by-step configuration instructions for setting up the practice module with state management and local storage.

---

## Step 1: Install Required Libraries

### What You're Doing
Installing libraries for LaTeX rendering and state persistence.

### Why This Matters
- KaTeX: Renders mathematical expressions in questions
- React-KaTeX: React wrapper for KaTeX
- Local storage utilities: Persist session state

### Command/Action
```bash
cd vaishnavi-frontend
npm install katex react-katex
npm install --save-dev @types/katex
```

### Verification
```bash
npm list katex react-katex
# Should show: katex@0.16.x, react-katex@3.x.x
```

### If It Fails
- **Issue**: npm install fails
- **Fix**: Try `npm install --legacy-peer-deps katex react-katex`
- **Alternative**: Use `yarn add katex react-katex` if using Yarn

---

## Step 2: Configure KaTeX CSS

### What You're Doing
Adding KaTeX CSS for proper math rendering.

### Why This Matters
KaTeX requires CSS to render mathematical expressions correctly.

### Command/Action

**Open**: `vaishnavi-frontend/app/layout.tsx`

**Add** KaTeX CSS import at the top:
```typescript
import 'katex/dist/katex.min.css';
```

### Verification
- Save the file
- Restart dev server: `npm run dev`
- No errors in console

### If It Fails
- **Issue**: CSS not found
- **Fix**: Reinstall katex: `npm uninstall katex && npm install katex`
- **Check**: Ensure import is before other CSS imports

---

## Step 3: Test KaTeX Rendering

### What You're Doing
Verifying KaTeX can render mathematical expressions.

### Why This Matters
Ensures LaTeX rendering works before building practice components.

### Command/Action

**Create test file**: `vaishnavi-frontend/test-katex.tsx`

**Add this code**:
```typescript
'use client';
import { InlineMath, BlockMath } from 'react-katex';

export default function TestKaTeX() {
  return (
    <div className="p-4">
      <h2>Inline Math:</h2>
      <p>The quadratic formula is <InlineMath math="x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}" /></p>
      
      <h2>Block Math:</h2>
      <BlockMath math="\int_0^\infty x^2 dx" />
    </div>
  );
}
```

### Verification
```bash
# Start dev server
npm run dev

# Import and render TestKaTeX component
# Should see properly formatted mathematical expressions
```

### If It Fails
- **Issue**: Math not rendering
- **Fix**: Ensure KaTeX CSS is imported in layout.tsx
- **Issue**: Syntax errors
- **Fix**: Check LaTeX syntax (use double backslashes in strings)

### Cleanup
Delete `test-katex.tsx` after verification.

---

## Step 4: Configure Local Storage Utilities

### What You're Doing
Creating utilities for session state persistence.

### Why This Matters
Prevents data loss if user refreshes page during practice session.

### Command/Action

**Create file**: `vaishnavi-frontend/lib/storage.ts`

**Add this code**:
```typescript
// Local storage utilities for practice session persistence

export const storage = {
  // Save practice session
  saveSession: (sessionId: string, data: any) => {
    try {
      localStorage.setItem(`practice_session_${sessionId}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  },

  // Load practice session
  loadSession: (sessionId: string) => {
    try {
      const data = localStorage.getItem(`practice_session_${sessionId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load session:', error);
      return null;
    }
  },

  // Clear practice session
  clearSession: (sessionId: string) => {
    try {
      localStorage.removeItem(`practice_session_${sessionId}`);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  },

  // Save review queue
  saveReviewQueue: (studentId: string, questions: any[]) => {
    try {
      localStorage.setItem(`review_queue_${studentId}`, JSON.stringify(questions));
    } catch (error) {
      console.error('Failed to save review queue:', error);
    }
  },

  // Load review queue
  loadReviewQueue: (studentId: string) => {
    try {
      const data = localStorage.getItem(`review_queue_${studentId}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load review queue:', error);
      return [];
    }
  },
};
```

### Verification
- Save the file
- No TypeScript errors

### If It Fails
- **Issue**: TypeScript errors
- **Fix**: Ensure proper types are used
- **Check**: File is in correct location

---

## Step 5: Configure Mock API Server

### What You're Doing
Ensuring mock API server has practice endpoints.

### Why This Matters
Allows testing practice UI without backend.

### Command/Action

**Verify**: `vaishnavi-frontend/mock-data/mock-api-server.js` has practice endpoints

**Should have**:
```javascript
// GET /api/practice/topics/:studentId
// POST /api/practice/session/start
// POST /api/practice/session/:sessionId/answer
// POST /api/practice/session/:sessionId/complete
// GET /api/practice/mastery/:studentId
// GET /api/practice/history/:studentId
```

**If missing**: Use Prompt 18 from PROMPTS.md to generate

### Verification
```bash
# Start mock server
node mock-data/mock-api-server.js

# In another terminal, test endpoint
curl http://localhost:3001/api/practice/topics/student-123

# Should return JSON with topics array
```

### If It Fails
- **Issue**: Endpoint not found (404)
- **Fix**: Regenerate mock server with Prompt 18
- **Issue**: Server won't start
- **Fix**: Check for syntax errors in mock-api-server.js

---

## Step 6: Configure API Base URL

### What You're Doing
Setting API base URL to point to mock server for testing.

### Why This Matters
Allows frontend to fetch data from mock server during development.

### Command/Action

**Open**: `vaishnavi-frontend/lib/api.ts`

**Verify** base URL is set:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

**Or for mock testing**:
```typescript
const API_BASE_URL = 'http://localhost:3001'; // Mock server
```

### Verification
- Save the file
- Practice API calls should go to mock server

### If It Fails
- **Issue**: API calls fail
- **Fix**: Ensure mock server is running on port 3001
- **Check**: Browser console for CORS errors

---

## Step 7: Configure Session State Management

### What You're Doing
Setting up state management pattern for practice sessions.

### Why This Matters
Proper state management ensures smooth practice experience.

### Command/Action

**In usePractice hook**, ensure state includes:
```typescript
const [session, setSession] = useState<PracticeSession | null>(null);
const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
const [showFeedback, setShowFeedback] = useState(false);
const [feedback, setFeedback] = useState<{ is_correct: boolean, explanation: string } | null>(null);
```

**Add session persistence**:
```typescript
useEffect(() => {
  if (session) {
    storage.saveSession(session.session_id, session);
  }
}, [session]);
```

### Verification
- Practice session state updates correctly
- State persists on page refresh
- No state synchronization issues

### If It Fails
- **Issue**: State not updating
- **Fix**: Check useState and setState calls
- **Issue**: State not persisting
- **Fix**: Verify storage utilities are called correctly

---

## Step 8: Test Timer Functionality

### What You're Doing
Verifying countdown timer works correctly in timed mode.

### Why This Matters
Timer provides time pressure for realistic practice.

### Command/Action

**In usePractice hook**, add timer logic:
```typescript
const [timeRemaining, setTimeRemaining] = useState<number>(0);

useEffect(() => {
  if (session?.config.timed && timeRemaining > 0) {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-submit when time expires
          completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }
}, [session, timeRemaining]);
```

### Verification
- Timer counts down correctly
- Auto-submits when time expires
- Timer pauses when showing feedback (Learning Mode)

### If It Fails
- **Issue**: Timer not counting down
- **Fix**: Check useEffect dependencies
- **Issue**: Timer doesn't stop
- **Fix**: Ensure cleanup function clears interval

---

## Step 9: Configure Progress Bar Colors

### What You're Doing
Adding custom colors for mastery levels and progress indicators.

### Why This Matters
Visual feedback helps users understand their progress.

### Command/Action

**Open**: `vaishnavi-frontend/tailwind.config.js`

**Add** these colors to the `extend.colors` section:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Mastery level colors
        'mastery-weak': '#ef4444',      // Red for <50%
        'mastery-medium': '#f59e0b',    // Yellow for 50-75%
        'mastery-strong': '#10b981',    // Green for >75%
        // Practice colors
        'practice-correct': '#10b981',  // Green for correct answers
        'practice-incorrect': '#ef4444', // Red for incorrect answers
        'practice-neutral': '#6b7280',  // Gray for unanswered
      },
    },
  },
}
```

### Verification
- Save the file
- Restart dev server: `npm run dev`
- No errors in console

### If It Fails
- **Issue**: Syntax error in config
- **Fix**: Ensure proper JSON syntax with commas
- **Check**: Make sure you're adding to existing `extend.colors` object

---

## Step 10: Test Keyboard Shortcuts

### What You're Doing
Verifying keyboard shortcuts work for navigation.

### Why This Matters
Keyboard shortcuts improve practice efficiency.

### Command/Action

**Add keyboard event listener** in PracticeInterface:
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (showFeedback) {
      if (e.key === 'Enter') {
        nextQuestion();
      }
    } else {
      if (e.key === 'a' || e.key === 'A') setSelectedAnswer('A');
      if (e.key === 'b' || e.key === 'B') setSelectedAnswer('B');
      if (e.key === 'c' || e.key === 'C') setSelectedAnswer('C');
      if (e.key === 'd' || e.key === 'D') setSelectedAnswer('D');
      if (e.key === 'Enter' && selectedAnswer) submitAnswer();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [showFeedback, selectedAnswer]);
```

### Verification
- Press A/B/C/D to select answers
- Press Enter to submit answer
- Press Enter to go to next question (after feedback)

### If It Fails
- **Issue**: Keyboard shortcuts not working
- **Fix**: Check event listener is attached
- **Issue**: Shortcuts conflict with browser
- **Fix**: Use different key combinations

---

## Step 11: Test Responsive Design

### What You're Doing
Verifying practice interface works on different screen sizes.

### Why This Matters
Students should be able to practice on any device.

### Command/Action

**Open browser**: http://localhost:3000/practice

**Test**:
1. Desktop view (1920x1080)
2. Tablet view (768x1024) - use browser dev tools
3. Mobile view (375x667) - use browser dev tools

**Check**:
- Topic cards display in responsive grid
- Practice interface readable on all sizes
- Buttons accessible
- No horizontal scrolling

### Verification
- All components visible and usable on all screen sizes
- No layout breaks
- Touch-friendly on mobile

### If It Fails
- **Issue**: Layout breaks on mobile
- **Fix**: Use Tailwind responsive classes (sm:, md:, lg:)
- **Issue**: Text too small
- **Fix**: Adjust font sizes for mobile

---

## Step 12: Configure Review Queue

### What You're Doing
Setting up review queue for marked questions.

### Why This Matters
Students can review difficult questions later.

### Command/Action

**Add review queue functions** to usePractice hook:
```typescript
const addToReview = (questionId: string) => {
  const reviewQueue = storage.loadReviewQueue(studentId);
  const question = session?.questions.find(q => q.question_id === questionId);
  if (question && !reviewQueue.find((q: any) => q.question_id === questionId)) {
    reviewQueue.push(question);
    storage.saveReviewQueue(studentId, reviewQueue);
  }
};
```

### Verification
- "Add to Review" button adds question to queue
- Review queue persists across sessions
- Can view and practice review questions

### If It Fails
- **Issue**: Questions not added to review
- **Fix**: Check storage utilities are working
- **Issue**: Duplicates in review queue
- **Fix**: Add duplicate check before adding

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ KaTeX library installed and CSS configured
- ✅ Local storage utilities for session persistence
- ✅ Mock API server with practice endpoints
- ✅ API base URL configured
- ✅ Session state management set up
- ✅ Timer functionality configured
- ✅ Custom colors for mastery levels
- ✅ Keyboard shortcuts implemented
- ✅ Responsive design tested
- ✅ Review queue configured

**Next Steps:**
1. Open **TESTING.md** to test the complete practice module
2. Verify all practice flows work correctly
3. Test with different topics and configurations

**Ready to test? Open TESTING.md!**

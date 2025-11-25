# Troubleshooting Guide for Day 4: Diagnostic Test UI

This document provides solutions to common issues you may encounter while implementing the diagnostic test UI.

---

## Table of Contents

1. [Test Loading Issues](#test-loading-issues)
2. [Timer Issues](#timer-issues)
3. [Navigation Issues](#navigation-issues)
4. [Answer Selection Issues](#answer-selection-issues)
5. [State Persistence Issues](#state-persistence-issues)
6. [LaTeX Rendering Issues](#latex-rendering-issues)
7. [Keyboard Shortcuts Issues](#keyboard-shortcuts-issues)
8. [Question Palette Issues](#question-palette-issues)
9. [Submission Issues](#submission-issues)
10. [Performance Issues](#performance-issues)
11. [TypeScript Errors](#typescript-errors)
12. [Build and Deployment Issues](#build-and-deployment-issues)

---

## Test Loading Issues

### Issue 1: Test Not Loading / Infinite Loading

**Symptoms:**
- Loading spinner shows indefinitely
- No questions appear
- Console error: "Failed to fetch test"

**Possible Causes:**
1. Mock API server not running
2. Incorrect API URL
3. CORS issues
4. Network error

**Solutions:**

**Solution 1: Check Mock API Server**
```bash
# Check if server is running
lsof -i :3001

# If not running, start it
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

**Solution 2: Verify API URL**
```typescript
// Check .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

// Restart dev server after changing
npm run dev
```

**Solution 3: Fix CORS**
```javascript
// In mock-api-server.js, ensure CORS is enabled
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Solution 4: Check Network Tab**
- Open browser dev tools (F12)
- Go to Network tab
- Refresh page
- Look for failed requests
- Check error details

---

### Issue 2: Questions Array Empty

**Symptoms:**
- Test loads but shows "No questions"
- Console log shows empty questions array

**Possible Causes:**
1. Mock data file missing
2. Incorrect JSON format
3. API response structure mismatch

**Solutions:**

**Solution 1: Verify Mock Data File**
```bash
# Check file exists
ls mock-data/mock-test-questions.json

# Validate JSON
cat mock-data/mock-test-questions.json | python -m json.tool
```

**Solution 2: Check API Response Structure**
```javascript
// Expected structure:
{
  "test_id": "...",
  "questions": [
    {
      "question_id": "...",
      "question_number": 1,
      "question_text": "...",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      // ...
    }
  ]
}
```

**Solution 3: Add Logging**
```typescript
// In useTest hook
useEffect(() => {
  const loadTest = async () => {
    const data = await fetchTest(testId);
    console.log('Test data:', data);
    console.log('Questions count:', data.questions?.length);
    setQuestions(data.questions);
  };
  loadTest();
}, [testId]);
```

---

## Timer Issues

### Issue 3: Timer Not Counting Down

**Symptoms:**
- Timer shows initial value but doesn't change
- Time remains stuck

**Possible Causes:**
1. setInterval not running
2. Component re-rendering issues
3. State not updating

**Solutions:**

**Solution 1: Check useTimer Hook**
```typescript
// Ensure setInterval is set up correctly
useEffect(() => {
  if (!isRunning) return;
  
  const interval = setInterval(() => {
    setTimeRemaining(prev => {
      if (prev <= 0) {
        clearInterval(interval);
        onTimeUp();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(interval);
}, [isRunning, onTimeUp]);
```

**Solution 2: Add Debug Logging**
```typescript
useEffect(() => {
  console.log('Timer running:', isRunning);
  console.log('Time remaining:', timeRemaining);
}, [isRunning, timeRemaining]);
```

**Solution 3: Check Dependencies**
```typescript
// Ensure onTimeUp is memoized
const onTimeUp = useCallback(() => {
  console.log('Time up!');
  submitTest();
}, [submitTest]);
```

---

### Issue 4: Timer Resets on Page Refresh

**Symptoms:**
- Timer goes back to 3 hours after refresh
- Lost time progress

**Possible Causes:**
1. Timer not saved to localStorage
2. Timer not loaded on mount

**Solutions:**

**Solution 1: Save Timer to localStorage**
```typescript
// In useTimer hook
useEffect(() => {
  if (timeRemaining > 0) {
    localStorage.setItem(`test_${testId}_time`, timeRemaining.toString());
  }
}, [timeRemaining, testId]);
```

**Solution 2: Load Timer on Mount**
```typescript
// In useTimer hook
useEffect(() => {
  const savedTime = localStorage.getItem(`test_${testId}_time`);
  if (savedTime) {
    setTimeRemaining(parseInt(savedTime));
  }
}, [testId]);
```

---

### Issue 5: Timer Not Turning Red

**Symptoms:**
- Timer stays same color even when < 10 minutes

**Possible Causes:**
1. Conditional styling not working
2. Incorrect time comparison

**Solutions:**

**Solution 1: Check TestTimer Component**
```typescript
// Ensure conditional className is correct
<div className={`
  ${timeRemaining <= 600 ? 'text-red-600' : 'text-gray-700'}
  font-mono text-xl
`}>
  {formatTime(timeRemaining)}
</div>
```

**Solution 2: Verify Time Comparison**
```typescript
// 600 seconds = 10 minutes
const isWarning = timeRemaining <= 600;
```

---

## Navigation Issues

### Issue 6: Next/Previous Buttons Not Working

**Symptoms:**
- Clicking buttons does nothing
- No question change

**Possible Causes:**
1. Functions not called
2. State not updating
3. Event handlers not attached

**Solutions:**

**Solution 1: Check Event Handlers**
```typescript
// Ensure onClick is attached
<button onClick={nextQuestion}>Next</button>
<button onClick={previousQuestion}>Previous</button>
```

**Solution 2: Verify Functions**
```typescript
// In useTest hook
const nextQuestion = useCallback(() => {
  console.log('Next clicked, current:', currentQuestionIndex);
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
  }
}, [currentQuestionIndex, questions.length]);
```

**Solution 3: Check State Updates**
```typescript
// Add logging
useEffect(() => {
  console.log('Current question index:', currentQuestionIndex);
}, [currentQuestionIndex]);
```

---

### Issue 7: Palette Click Not Jumping to Question

**Symptoms:**
- Clicking question number in palette does nothing

**Possible Causes:**
1. onClick handler not attached
2. goToQuestion function not working
3. Event propagation issues

**Solutions:**

**Solution 1: Check Palette Component**
```typescript
// Ensure onClick is on the button
<button
  onClick={() => onSelectQuestion(index)}
  className="..."
>
  {index + 1}
</button>
```

**Solution 2: Verify goToQuestion Function**
```typescript
// In useTest hook
const goToQuestion = useCallback((index: number) => {
  console.log('Go to question:', index);
  if (index >= 0 && index < questions.length) {
    setCurrentQuestionIndex(index);
  }
}, [questions.length]);
```

---

## Answer Selection Issues

### Issue 8: Multiple Options Selected

**Symptoms:**
- Can select multiple options at once
- All options highlighted

**Possible Causes:**
1. State not clearing previous selection
2. Incorrect state management

**Solutions:**

**Solution 1: Fix selectAnswer Function**
```typescript
// Ensure only one option is selected
const selectAnswer = useCallback((questionId: string, option: string) => {
  setAnswers(prev => {
    const newAnswers = new Map(prev);
    newAnswers.set(questionId, {
      question_id: questionId,
      selected_option: option, // This replaces previous selection
      is_marked_for_review: prev.get(questionId)?.is_marked_for_review || false,
      time_spent: 0
    });
    return newAnswers;
  });
}, []);
```

**Solution 2: Check Radio Button Logic**
```typescript
// Use radio button pattern
<input
  type="radio"
  name={`question_${question.question_id}`}
  checked={selectedOption === 'A'}
  onChange={() => onSelectOption('A')}
/>
```

---

### Issue 9: Selected Answer Not Persisting

**Symptoms:**
- Select answer, navigate away, come back
- Answer is gone

**Possible Causes:**
1. Answer not saved to state
2. State not persisting
3. Wrong question ID used

**Solutions:**

**Solution 1: Verify Answer Saving**
```typescript
// Add logging
const selectAnswer = useCallback((questionId: string, option: string) => {
  console.log('Saving answer:', questionId, option);
  setAnswers(prev => {
    const newAnswers = new Map(prev);
    newAnswers.set(questionId, { /* ... */ });
    console.log('Answers after save:', newAnswers);
    return newAnswers;
  });
}, []);
```

**Solution 2: Check Question ID**
```typescript
// Ensure correct question ID is used
const currentQuestion = questions[currentQuestionIndex];
const selectedOption = answers.get(currentQuestion.question_id)?.selected_option;
```

---

## State Persistence Issues

### Issue 10: State Not Saving to localStorage

**Symptoms:**
- Refresh page, all progress lost
- localStorage empty

**Possible Causes:**
1. Save function not called
2. localStorage blocked
3. Incorrect key used

**Solutions:**

**Solution 1: Check Save Function**
```typescript
// Ensure auto-save is set up
useEffect(() => {
  const interval = setInterval(() => {
    const state = {
      currentQuestionIndex,
      answers: Array.from(answers.entries()),
      timeRemaining
    };
    localStorage.setItem(`test_${testId}`, JSON.stringify(state));
    console.log('State saved');
  }, 30000); // Every 30 seconds
  
  return () => clearInterval(interval);
}, [currentQuestionIndex, answers, timeRemaining, testId]);
```

**Solution 2: Check localStorage Availability**
```typescript
// Test localStorage
try {
  localStorage.setItem('test', 'value');
  console.log('localStorage available');
} catch (error) {
  console.error('localStorage blocked:', error);
}
```

**Solution 3: Verify Key**
```typescript
// Check what's in localStorage
console.log('localStorage keys:', Object.keys(localStorage));
console.log('Test state:', localStorage.getItem(`test_${testId}`));
```

---

### Issue 11: State Not Loading on Mount

**Symptoms:**
- State saved but not restored on refresh

**Possible Causes:**
1. Load function not called
2. Incorrect parsing
3. Wrong key used

**Solutions:**

**Solution 1: Check Load Function**
```typescript
// Ensure state loads on mount
useEffect(() => {
  const savedState = localStorage.getItem(`test_${testId}`);
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      console.log('Loaded state:', state);
      setCurrentQuestionIndex(state.currentQuestionIndex);
      setAnswers(new Map(state.answers));
      setTimeRemaining(state.timeRemaining);
    } catch (error) {
      console.error('Failed to parse state:', error);
    }
  }
}, [testId]);
```

---

## LaTeX Rendering Issues

### Issue 12: LaTeX Not Rendering

**Symptoms:**
- Math formulas show as raw text (e.g., "\\int x^2 dx")
- No proper formatting

**Possible Causes:**
1. KaTeX not installed
2. KaTeX CSS not imported
3. Incorrect LaTeX syntax

**Solutions:**

**Solution 1: Install KaTeX**
```bash
npm install katex react-katex
npm install --save-dev @types/katex
```

**Solution 2: Import KaTeX CSS**
```typescript
// In app/layout.tsx or component
import 'katex/dist/katex.min.css';
```

**Solution 3: Use Correct Component**
```typescript
import { InlineMath, BlockMath } from 'react-katex';

// For inline math
<InlineMath math="\\int x^2 dx" />

// For block math
<BlockMath math="\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" />
```

**Solution 4: Escape Backslashes**
```typescript
// In JSON, use double backslashes
"question_text": "Calculate \\\\int_0^1 x^2 dx"

// In JSX, use single backslashes
<InlineMath math="\int_0^1 x^2 dx" />
```

---

### Issue 13: LaTeX Rendering Slowly

**Symptoms:**
- Page loads slowly
- LaTeX takes time to render

**Possible Causes:**
1. Too many LaTeX expressions
2. Complex formulas
3. Not using memoization

**Solutions:**

**Solution 1: Memoize LaTeX Components**
```typescript
const MemoizedMath = React.memo(({ math }: { math: string }) => (
  <InlineMath math={math} />
));
```

**Solution 2: Lazy Load LaTeX**
```typescript
// Only render LaTeX for visible questions
{isVisible && <InlineMath math={question.question_text} />}
```

---

## Keyboard Shortcuts Issues

### Issue 14: Keyboard Shortcuts Not Working

**Symptoms:**
- Pressing keys does nothing
- No response to keyboard input

**Possible Causes:**
1. Event listener not attached
2. Input field focused
3. Wrong key codes

**Solutions:**

**Solution 1: Check Event Listener**
```typescript
// In useKeyboardShortcuts hook
useEffect(() => {
  if (!enabled) return;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    console.log('Key pressed:', e.key);
    
    // Ignore if input focused
    if (e.target instanceof HTMLInputElement) return;
    
    switch (e.key) {
      case 'ArrowRight':
        onNext();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
      // ...
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [enabled, onNext, onPrevious]);
```

**Solution 2: Check Key Values**
```typescript
// Use e.key instead of e.keyCode
// e.key values: 'ArrowRight', 'ArrowLeft', '1', '2', 'a', 'b', etc.
```

---

### Issue 15: Shortcuts Work in Input Fields

**Symptoms:**
- Typing in input triggers shortcuts
- Can't type normally

**Possible Causes:**
1. No input field check
2. Event not stopped

**Solutions:**

**Solution 1: Add Input Check**
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  // Ignore if typing in input/textarea
  const target = e.target as HTMLElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    return;
  }
  
  // Handle shortcuts
};
```

---

## Question Palette Issues

### Issue 16: Palette Colors Not Updating

**Symptoms:**
- Answer question but palette stays gray
- Colors don't match status

**Possible Causes:**
1. getQuestionStatus function incorrect
2. State not updating
3. Component not re-rendering

**Solutions:**

**Solution 1: Fix getQuestionStatus**
```typescript
const getQuestionStatus = useCallback((questionId: string): QuestionStatus => {
  const answer = answers.get(questionId);
  
  if (!answer) {
    // Check if visited
    const questionIndex = questions.findIndex(q => q.question_id === questionId);
    if (questionIndex < currentQuestionIndex) {
      return 'visited';
    }
    return 'not_visited';
  }
  
  if (answer.is_marked_for_review) {
    return 'marked_for_review';
  }
  
  if (answer.selected_option) {
    return 'answered';
  }
  
  return 'visited';
}, [answers, questions, currentQuestionIndex]);
```

**Solution 2: Force Re-render**
```typescript
// Use key prop to force re-render
<QuestionPalette
  key={answers.size} // Re-render when answers change
  // ...
/>
```

---

### Issue 17: Palette Performance Issues

**Symptoms:**
- Palette lags when clicking
- Slow rendering with 200 questions

**Possible Causes:**
1. Re-rendering all questions on every change
2. Not using virtualization
3. Complex calculations in render

**Solutions:**

**Solution 1: Memoize Palette Items**
```typescript
const PaletteItem = React.memo(({ 
  questionNumber, 
  status, 
  isCurrent, 
  onClick 
}: PaletteItemProps) => (
  <button
    onClick={onClick}
    className={getStatusColor(status, isCurrent)}
  >
    {questionNumber}
  </button>
));
```

**Solution 2: Use useMemo for Status Calculations**
```typescript
const questionStatuses = useMemo(() => {
  return questions.map(q => getQuestionStatus(q.question_id));
}, [questions, answers, currentQuestionIndex]);
```

---

## Submission Issues

### Issue 18: Submit Dialog Not Showing

**Symptoms:**
- Click Submit button, nothing happens
- No dialog appears

**Possible Causes:**
1. Dialog state not set
2. Dialog component not rendered
3. onClick handler not attached

**Solutions:**

**Solution 1: Check Dialog State**
```typescript
const [showSubmitDialog, setShowSubmitDialog] = useState(false);

// On submit button click
<button onClick={() => setShowSubmitDialog(true)}>
  Submit Test
</button>

// Render dialog
{showSubmitDialog && (
  <SubmitDialog
    isOpen={showSubmitDialog}
    onClose={() => setShowSubmitDialog(false)}
    // ...
  />
)}
```

---

### Issue 19: Submission Fails

**Symptoms:**
- Click Submit, shows error
- API call fails

**Possible Causes:**
1. Network error
2. Invalid data format
3. API endpoint incorrect

**Solutions:**

**Solution 1: Check API Call**
```typescript
const submitTest = async () => {
  try {
    const submission = {
      test_id: testId,
      answers: Array.from(answers.values()),
      time_taken: initialTime - timeRemaining,
      submitted_at: new Date().toISOString()
    };
    
    console.log('Submitting:', submission);
    
    const response = await fetch(`${API_URL}/api/test/${testId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Submission result:', result);
    
  } catch (error) {
    console.error('Submission failed:', error);
    // Show error to user
  }
};
```

**Solution 2: Add Retry Logic**
```typescript
const submitWithRetry = async (maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await submitTest();
      return; // Success
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## Performance Issues

### Issue 20: Slow Question Navigation

**Symptoms:**
- Delay when clicking Next/Previous
- UI feels sluggish

**Possible Causes:**
1. Too many re-renders
2. Heavy calculations in render
3. Not using memoization

**Solutions:**

**Solution 1: Use useMemo**
```typescript
const currentQuestion = useMemo(() => {
  return questions[currentQuestionIndex];
}, [questions, currentQuestionIndex]);

const selectedOption = useMemo(() => {
  return answers.get(currentQuestion?.question_id)?.selected_option;
}, [answers, currentQuestion]);
```

**Solution 2: Use useCallback**
```typescript
const selectAnswer = useCallback((questionId: string, option: string) => {
  // ...
}, []);

const nextQuestion = useCallback(() => {
  // ...
}, [currentQuestionIndex, questions.length]);
```

**Solution 3: Optimize Re-renders**
```typescript
// Use React.memo for components
const QuestionDisplay = React.memo(({ question, selectedOption, onSelect }) => {
  // ...
});
```

---

## TypeScript Errors

### Issue 21: Type Errors in Components

**Symptoms:**
- TypeScript compilation errors
- Red squiggly lines in IDE

**Common Errors and Solutions:**

**Error 1: "Property does not exist on type"**
```typescript
// Problem
const answer = answers.get(questionId);
answer.selected_option; // Error: answer might be undefined

// Solution
const answer = answers.get(questionId);
const option = answer?.selected_option;
```

**Error 2: "Type 'string' is not assignable to type"**
```typescript
// Problem
const option: 'A' | 'B' | 'C' | 'D' = 'E'; // Error

// Solution
const option: 'A' | 'B' | 'C' | 'D' = 'A'; // Valid value
```

**Error 3: "Argument of type 'X' is not assignable to parameter of type 'Y'"**
```typescript
// Problem
setAnswers(answers.set(questionId, answer)); // Error: returns Map, not function

// Solution
setAnswers(prev => {
  const newAnswers = new Map(prev);
  newAnswers.set(questionId, answer);
  return newAnswers;
});
```

---

## Build and Deployment Issues

### Issue 22: Build Fails

**Symptoms:**
- `npm run build` fails
- TypeScript errors in build

**Solutions:**

**Solution 1: Fix TypeScript Errors**
```bash
# Check for errors
npm run type-check

# Fix errors one by one
```

**Solution 2: Check Dependencies**
```bash
# Ensure all dependencies installed
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Solution 3: Check Environment Variables**
```bash
# Ensure .env.local has all required variables
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Getting More Help

If you're still stuck after trying these solutions:

1. **Check Browser Console**
   - Open dev tools (F12)
   - Look for error messages
   - Check Network tab for failed requests

2. **Add Debug Logging**
   - Add console.log statements
   - Track state changes
   - Verify function calls

3. **Simplify and Test**
   - Comment out complex code
   - Test basic functionality first
   - Add features back one by one

4. **Review Documentation**
   - Re-read PROMPTS.md
   - Check CONFIGURATION.md
   - Review TESTING.md

5. **Ask for Help**
   - Provide error messages
   - Share relevant code
   - Describe what you've tried

---

**Remember**: Most issues are caused by:
- Missing dependencies
- Incorrect configuration
- State management problems
- Event handler issues

Work through the solutions systematically and you'll get it working! 🚀

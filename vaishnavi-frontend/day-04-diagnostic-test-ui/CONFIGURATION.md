# Configuration Guide for Day 4: Diagnostic Test UI

This document provides step-by-step configuration instructions for setting up the diagnostic test UI.

---

## Configuration Overview

You'll configure:
1. LaTeX rendering library (KaTeX)
2. State persistence (localStorage)
3. Mock API server with test data
4. UI components library (if needed)

**Time Estimate**: 30 minutes

---

## Step 1: Install LaTeX Rendering Library

### What You're Doing
Installing KaTeX for rendering mathematical expressions in questions.

### Why This Matters
Test questions contain mathematical formulas that need proper rendering (e.g., ∫x²dx, √(a²+b²)).

### Command/Action
```bash
cd vaishnavi-frontend
npm install katex react-katex
npm install --save-dev @types/katex
```

### Verification
```bash
# Check package.json
cat package.json | grep katex
# Should show: "katex": "^0.16.x" and "react-katex": "^3.0.x"
```

### If It Fails
- **Error**: "npm ERR! code ERESOLVE"
  - **Fix**: Run `npm install katex react-katex --legacy-peer-deps`
- **Error**: "Module not found"
  - **Fix**: Restart your dev server after installation

---

## Step 2: Configure KaTeX CSS

### What You're Doing
Adding KaTeX CSS to your app for proper math rendering.

### Why This Matters
KaTeX requires CSS to display mathematical symbols correctly.

### Command/Action

**Option 1: Add to app/layout.tsx**
```typescript
// Add this import at the top of app/layout.tsx
import 'katex/dist/katex.min.css';
```

**Option 2: Add to global CSS**
```css
/* Add to app/globals.css */
@import 'katex/dist/katex.min.css';
```

### Verification
1. Start dev server: `npm run dev`
2. Open browser console
3. No CSS errors related to KaTeX

### If It Fails
- **Error**: "Module not found: Can't resolve 'katex/dist/katex.min.css'"
  - **Fix**: Ensure katex is installed: `npm install katex`
- **Error**: Math not rendering properly
  - **Fix**: Clear browser cache and restart dev server

---

## Step 3: Set Up State Persistence

### What You're Doing
Configuring localStorage to save test progress automatically.

### Why This Matters
Prevents data loss if user accidentally refreshes page during test.

### Command/Action

Create utility file for localStorage:

**File**: `vaishnavi-frontend/lib/storage.ts`
```typescript
// Create this file with the following content:

export const storage = {
  saveTestState: (testId: string, state: any) => {
    try {
      localStorage.setItem(`test_${testId}`, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save test state:', error);
    }
  },
  
  loadTestState: (testId: string) => {
    try {
      const data = localStorage.getItem(`test_${testId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load test state:', error);
      return null;
    }
  },
  
  clearTestState: (testId: string) => {
    try {
      localStorage.removeItem(`test_${testId}`);
    } catch (error) {
      console.error('Failed to clear test state:', error);
    }
  }
};
```

### Verification
1. Open browser console
2. Run: `localStorage.setItem('test', 'value')`
3. Run: `localStorage.getItem('test')`
4. Should return: "value"

### If It Fails
- **Error**: "localStorage is not defined"
  - **Fix**: This is normal in SSR. Use `typeof window !== 'undefined'` check
- **Error**: "QuotaExceededError"
  - **Fix**: Clear localStorage: `localStorage.clear()`

---

## Step 4: Configure Mock Test Data

### What You're Doing
Creating realistic mock test questions for standalone testing.

### Why This Matters
Allows you to test UI without waiting for backend implementation.

### Command/Action

**File**: `vaishnavi-frontend/mock-data/mock-test-questions.json`
```json
{
  "test_id": "diagnostic_test_001",
  "title": "JEE Main Diagnostic Test",
  "duration": 10800,
  "total_questions": 200,
  "questions": [
    {
      "question_id": "q001",
      "question_number": 1,
      "question_text": "Calculate the value of \\\\int_0^1 x^2 dx",
      "options": {
        "A": "1/3",
        "B": "1/2",
        "C": "2/3",
        "D": "1"
      },
      "subject": "Mathematics",
      "topic": "Integration",
      "difficulty": "easy",
      "marks": 4
    },
    {
      "question_id": "q002",
      "question_number": 2,
      "question_text": "What is the SI unit of force?",
      "options": {
        "A": "Joule",
        "B": "Newton",
        "C": "Watt",
        "D": "Pascal"
      },
      "subject": "Physics",
      "topic": "Units and Measurements",
      "difficulty": "easy",
      "marks": 4
    }
  ]
}
```

**Note**: For full 200 questions, use the mock data generator script or copy from mock-api-responses.json after running Prompt 12.

### Verification
```bash
# Check file exists
ls mock-data/mock-test-questions.json

# Validate JSON
cat mock-data/mock-test-questions.json | python -m json.tool
```

### If It Fails
- **Error**: "Unexpected token in JSON"
  - **Fix**: Validate JSON syntax at jsonlint.com
- **Error**: "File not found"
  - **Fix**: Ensure you're in vaishnavi-frontend directory

---

## Step 5: Update Mock API Server

### What You're Doing
Adding test endpoints to mock server (if not done in Prompt 12).

### Why This Matters
Provides API responses for test UI to function independently.

### Command/Action

Ensure `mock-data/mock-api-server.js` has test endpoints:
```javascript
// GET /api/test/:testId
app.get('/api/test/:testId', (req, res) => {
  setTimeout(() => {
    const testData = require('./mock-test-questions.json');
    res.json(testData);
  }, 500);
});

// POST /api/test/:testId/submit
app.post('/api/test/:testId/submit', (req, res) => {
  setTimeout(() => {
    res.json({
      submission_id: 'sub_001',
      score: 720,
      total_marks: 800,
      correct_answers: 180,
      incorrect_answers: 15,
      unanswered: 5
    });
  }, 1000);
});
```

### Verification
```bash
# Start mock server
node mock-data/mock-api-server.js

# In another terminal, test endpoint
curl http://localhost:3001/api/test/test_001

# Should return test data with 200 questions
```

### If It Fails
- **Error**: "Cannot find module './mock-test-questions.json'"
  - **Fix**: Create the file in Step 4
- **Error**: "Port 3001 already in use"
  - **Fix**: Kill existing process: `lsof -ti:3001 | xargs kill -9`

---

## Step 6: Configure UI Components (Optional)

### What You're Doing
Installing UI component library for Dialog, Button, Badge components.

### Why This Matters
Provides pre-built accessible components for faster development.

### Command/Action

**Option 1: Use shadcn/ui (Recommended)**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add dialog button badge
```

**Option 2: Create custom components**
Skip this step if you generated custom components in PROMPTS.md.

### Verification
```bash
# Check components exist
ls components/ui/dialog.tsx
ls components/ui/button.tsx
ls components/ui/badge.tsx
```

### If It Fails
- **Error**: "shadcn-ui command not found"
  - **Fix**: Use npx: `npx shadcn-ui@latest init`
- **Error**: "Components already exist"
  - **Fix**: Skip this step, use existing components

---

## Step 7: Configure Environment Variables

### What You're Doing
Setting API URL for test endpoints.

### Why This Matters
Allows switching between mock server and real backend.

### Command/Action

**File**: `vaishnavi-frontend/.env.local`
```bash
# Add or update these variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ENABLE_MOCK=true
```

### Verification
```bash
# Check file exists
cat .env.local

# Restart dev server to load new env vars
npm run dev
```

### If It Fails
- **Error**: "Environment variable not defined"
  - **Fix**: Restart dev server after creating .env.local
- **Error**: "Cannot read environment variable"
  - **Fix**: Ensure variable starts with NEXT_PUBLIC_

---

## Step 8: Test LaTeX Rendering

### What You're Doing
Verifying KaTeX renders mathematical expressions correctly.

### Why This Matters
Ensures questions with math formulas display properly.

### Command/Action

Create test page:

**File**: `vaishnavi-frontend/app/test-latex/page.tsx`
```typescript
'use client';

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function TestLatex() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">LaTeX Test</h1>
      
      <div className="space-y-4">
        <div>
          <p>Inline: <InlineMath math="\\int_0^1 x^2 dx = \\frac{1}{3}" /></p>
        </div>
        
        <div>
          <p>Block:</p>
          <BlockMath math="\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" />
        </div>
      </div>
    </div>
  );
}
```

### Verification
1. Start dev server: `npm run dev`
2. Open: http://localhost:3000/test-latex
3. Should see properly rendered math formulas

### If It Fails
- **Error**: Math not rendering
  - **Fix**: Check KaTeX CSS is imported
- **Error**: "InlineMath is not defined"
  - **Fix**: Install react-katex: `npm install react-katex`

---

## Step 9: Configure Keyboard Event Handling

### What You're Doing
Ensuring keyboard shortcuts work properly in test interface.

### Why This Matters
Improves test-taking experience with keyboard navigation.

### Command/Action

No installation needed, but verify browser compatibility:

**Test in browser console:**
```javascript
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
});
```

Press arrow keys and number keys to verify events fire.

### Verification
1. Open browser console
2. Run test code above
3. Press keys and verify console logs

### If It Fails
- **Error**: Events not firing
  - **Fix**: Ensure no input fields are focused
- **Error**: "addEventListener is not defined"
  - **Fix**: This is normal in SSR, use useEffect in components

---

## Step 10: Start Mock Server and Dev Server

### What You're Doing
Running both servers for testing.

### Why This Matters
Allows you to test test UI with mock backend.

### Command/Action

**Terminal 1: Start mock API server**
```bash
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

**Terminal 2: Start Next.js dev server**
```bash
cd vaishnavi-frontend
npm run dev
```

### Verification
1. Mock server running on: http://localhost:3001
2. Frontend running on: http://localhost:3000
3. No errors in either terminal

### If It Fails
- **Error**: "Port already in use"
  - **Fix**: Kill existing processes or use different ports
- **Error**: "Cannot find module"
  - **Fix**: Run `npm install` in vaishnavi-frontend

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ KaTeX for LaTeX rendering
- ✅ State persistence with localStorage
- ✅ Mock test data with 200 questions
- ✅ Mock API server with test endpoints
- ✅ Environment variables
- ✅ UI components (optional)
- ✅ Keyboard event handling
- ✅ Both servers running

**Next Steps:**
1. Open **TESTING.md** to test the test interface
2. Verify all features work correctly
3. Check **EXPECTED-OUTCOME.md** for success criteria

**Ready to test? Open TESTING.md!**

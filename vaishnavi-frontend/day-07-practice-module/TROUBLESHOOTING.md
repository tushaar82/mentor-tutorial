# Troubleshooting Guide for Day 7: Practice Module UI

This document provides solutions to common issues you might encounter while building or testing the practice module.

---

## Installation Issues

### Issue 1: KaTeX Installation Fails

**Symptoms**:
- `npm install katex` fails with errors
- Package not found errors

**Possible Causes**:
1. Network connectivity issues
2. npm cache corruption
3. Peer dependency conflicts

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install katex react-katex
   ```

2. Try with legacy peer deps:
   ```bash
   npm install --legacy-peer-deps katex react-katex
   ```

3. Use yarn instead:
   ```bash
   yarn add katex react-katex
   ```

4. Check npm registry:
   ```bash
   npm config get registry
   # Should be: https://registry.npmjs.org/
   ```

---

### Issue 2: TypeScript Type Errors for KaTeX

**Symptoms**:
- TypeScript errors: "Cannot find module 'katex'"
- Type definitions not found

**Possible Causes**:
1. Type definitions not installed
2. TypeScript can't find types

**Solutions**:
1. Install type definitions:
   ```bash
   npm install --save-dev @types/katex
   ```

2. Restart TypeScript server in VS Code:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
   - Type "TypeScript: Restart TS Server"
   - Press Enter

3. Check tsconfig.json includes node_modules:
   ```json
   {
     "compilerOptions": {
       "typeRoots": ["./node_modules/@types"]
     }
   }
   ```

---

## LaTeX Rendering Issues

### Issue 3: LaTeX Math Not Rendering

**Symptoms**:
- Math expressions show as plain text
- LaTeX syntax visible instead of formatted math

**Possible Causes**:
1. KaTeX CSS not imported
2. Wrong LaTeX syntax
3. Component not using react-katex

**Solutions**:
1. Verify KaTeX CSS is imported in `app/layout.tsx`:
   ```typescript
   import 'katex/dist/katex.min.css';
   ```

2. Check LaTeX syntax (use double backslashes):
   ```typescript
   // Wrong
   <InlineMath math="\frac{1}{2}" />
   
   // Correct
   <InlineMath math="\\frac{1}{2}" />
   ```

3. Use correct react-katex components:
   ```typescript
   import { InlineMath, BlockMath } from 'react-katex';
   
   // Inline: <InlineMath math="x^2" />
   // Block: <BlockMath math="\\int_0^\\infty x^2 dx" />
   ```

4. Restart dev server after adding CSS import

---

### Issue 4: LaTeX Rendering Errors

**Symptoms**:
- Red error messages in place of math
- "KaTeX parse error" in console

**Possible Causes**:
1. Invalid LaTeX syntax
2. Unsupported LaTeX commands
3. Missing braces or brackets

**Solutions**:
1. Check LaTeX syntax is valid:
   ```typescript
   // Common errors:
   // Missing braces: \frac12 → \frac{1}{2}
   // Wrong command: \integral → \int
   // Unescaped: _ → \_
   ```

2. Test LaTeX in online editor first:
   - Visit: https://katex.org/
   - Test your LaTeX before using in code

3. Wrap in try-catch for error handling:
   ```typescript
   try {
     return <InlineMath math={questionText} />;
   } catch (error) {
     console.error('LaTeX error:', error);
     return <span>{questionText}</span>;
   }
   ```

---

## State Management Issues

### Issue 5: Practice Session State Not Persisting

**Symptoms**:
- Page refresh resets session
- Progress lost on navigation
- Answers not saved

**Possible Causes**:
1. Local storage not saving
2. Session ID changing
3. Storage utilities not called

**Solutions**:
1. Verify storage utilities are called:
   ```typescript
   useEffect(() => {
     if (session) {
       storage.saveSession(session.session_id, session);
     }
   }, [session]);
   ```

2. Check browser allows local storage:
   ```typescript
   // Test in console:
   localStorage.setItem('test', 'value');
   console.log(localStorage.getItem('test')); // Should show 'value'
   ```

3. Verify session ID is consistent:
   ```typescript
   console.log('Session ID:', session?.session_id);
   // Should be same across refreshes
   ```

4. Check for private browsing mode (disables local storage)

---

### Issue 6: State Updates Not Reflecting in UI

**Symptoms**:
- Click answer but selection doesn't show
- Progress bar doesn't update
- Accuracy doesn't change

**Possible Causes**:
1. State not updating correctly
2. Component not re-rendering
3. Props not passed correctly

**Solutions**:
1. Check useState is used correctly:
   ```typescript
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   
   // Update state
   setSelectedAnswer('B');
   ```

2. Verify component receives updated props:
   ```typescript
   console.log('Props:', { selectedAnswer, currentQuestion });
   ```

3. Check useEffect dependencies:
   ```typescript
   useEffect(() => {
     // This runs when session changes
   }, [session]); // Add all dependencies
   ```

4. Use React DevTools to inspect state

---

## Timer Issues

### Issue 7: Timer Not Counting Down

**Symptoms**:
- Timer shows initial value but doesn't change
- Timer stuck at same time

**Possible Causes**:
1. setInterval not set up correctly
2. useEffect dependencies wrong
3. Timer not enabled in config

**Solutions**:
1. Verify timer logic in usePractice hook:
   ```typescript
   useEffect(() => {
     if (session?.config.timed && timeRemaining > 0) {
       const timer = setInterval(() => {
         setTimeRemaining(prev => prev - 1);
       }, 1000);
       
       return () => clearInterval(timer);
     }
   }, [session, timeRemaining]);
   ```

2. Check config has timed enabled:
   ```typescript
   console.log('Config:', session?.config);
   // Should show: { timed: true, ... }
   ```

3. Verify timeRemaining state updates:
   ```typescript
   console.log('Time remaining:', timeRemaining);
   ```

---

### Issue 8: Timer Doesn't Auto-Submit

**Symptoms**:
- Timer reaches 0:00 but session continues
- No auto-submit when time expires

**Possible Causes**:
1. Auto-submit logic not implemented
2. completeSession not called
3. Timer reaches negative values

**Solutions**:
1. Add auto-submit logic:
   ```typescript
   useEffect(() => {
     if (session?.config.timed && timeRemaining > 0) {
       const timer = setInterval(() => {
         setTimeRemaining(prev => {
           if (prev <= 1) {
             completeSession(); // Auto-submit
             return 0;
           }
           return prev - 1;
         });
       }, 1000);
       
       return () => clearInterval(timer);
     }
   }, [session, timeRemaining]);
   ```

2. Verify completeSession function exists and works

3. Test with short timer (30 seconds) for quick testing

---

## API and Mock Server Issues

### Issue 9: Mock API Server Not Responding

**Symptoms**:
- API calls fail with network errors
- "Failed to fetch" errors
- Topics not loading

**Possible Causes**:
1. Mock server not running
2. Wrong port number
3. CORS issues

**Solutions**:
1. Start mock server:
   ```bash
   node mock-data/mock-api-server.js
   # Should show: "Mock API server running on port 3001"
   ```

2. Verify port in API calls:
   ```typescript
   const API_BASE_URL = 'http://localhost:3001';
   ```

3. Check CORS is enabled in mock server:
   ```javascript
   app.use(cors());
   ```

4. Test endpoint directly:
   ```bash
   curl http://localhost:3001/api/practice/topics/student-123
   ```

---

### Issue 10: Mock Data Not Realistic

**Symptoms**:
- All topics have same mastery
- Questions don't have LaTeX
- No variety in difficulty

**Possible Causes**:
1. Mock data not properly generated
2. Using placeholder data

**Solutions**:
1. Regenerate mock data with Prompt 18 from PROMPTS.md

2. Manually add variety to mock-api-responses.json:
   ```json
   {
     "topics": [
       { "mastery_level": 85, "is_weak": false },
       { "mastery_level": 45, "is_weak": true },
       { "mastery_level": 62, "is_weak": false }
     ]
   }
   ```

3. Add LaTeX to questions:
   ```json
   {
     "question_text": "Calculate \\\\int_0^1 x^2 dx"
   }
   ```

---

## UI and Styling Issues

### Issue 11: Layout Breaks on Mobile

**Symptoms**:
- Horizontal scrolling on mobile
- Elements overflow screen
- Text too small to read

**Possible Causes**:
1. Fixed widths instead of responsive
2. Missing responsive classes
3. Font sizes too small

**Solutions**:
1. Use Tailwind responsive classes:
   ```typescript
   // Wrong
   <div className="w-[800px]">
   
   // Correct
   <div className="w-full max-w-4xl">
   ```

2. Add responsive grid:
   ```typescript
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   ```

3. Increase font sizes on mobile:
   ```typescript
   <p className="text-sm md:text-base">
   ```

4. Test in browser dev tools (responsive mode)

---

### Issue 12: Colors Not Showing Correctly

**Symptoms**:
- Mastery bars all same color
- No color coding by performance
- Custom colors not working

**Possible Causes**:
1. Tailwind colors not configured
2. Color logic wrong
3. CSS not applied

**Solutions**:
1. Verify colors in tailwind.config.js:
   ```javascript
   colors: {
     'mastery-weak': '#ef4444',
     'mastery-medium': '#f59e0b',
     'mastery-strong': '#10b981',
   }
   ```

2. Check color logic:
   ```typescript
   const getColor = (mastery: number) => {
     if (mastery < 50) return 'bg-mastery-weak';
     if (mastery < 75) return 'bg-mastery-medium';
     return 'bg-mastery-strong';
   };
   ```

3. Restart dev server after config changes

---

## Keyboard Shortcut Issues

### Issue 13: Keyboard Shortcuts Not Working

**Symptoms**:
- Pressing A/B/C/D doesn't select answers
- Enter doesn't submit
- No response to key presses

**Possible Causes**:
1. Event listener not attached
2. Wrong key codes
3. Input field has focus

**Solutions**:
1. Verify event listener is attached:
   ```typescript
   useEffect(() => {
     const handleKeyPress = (e: KeyboardEvent) => {
       console.log('Key pressed:', e.key);
       // Handle keys
     };
     
     window.addEventListener('keydown', handleKeyPress);
     return () => window.removeEventListener('keydown', handleKeyPress);
   }, []);
   ```

2. Check key values (case-insensitive):
   ```typescript
   if (e.key === 'a' || e.key === 'A') {
     setSelectedAnswer('A');
   }
   ```

3. Prevent default if needed:
   ```typescript
   e.preventDefault();
   ```

4. Ensure no input field has focus (blur inputs)

---

## Performance Issues

### Issue 14: Slow Question Navigation

**Symptoms**:
- Lag when clicking "Next Question"
- Slow answer selection
- UI freezes briefly

**Possible Causes**:
1. Too many re-renders
2. Heavy computations in render
3. Large state objects

**Solutions**:
1. Use useCallback for functions:
   ```typescript
   const nextQuestion = useCallback(() => {
     // Logic
   }, [dependencies]);
   ```

2. Memoize expensive calculations:
   ```typescript
   const accuracy = useMemo(() => {
     return (correctCount / totalCount) * 100;
   }, [correctCount, totalCount]);
   ```

3. Avoid inline object creation:
   ```typescript
   // Wrong
   <Component style={{ color: 'red' }} />
   
   // Correct
   const style = { color: 'red' };
   <Component style={style} />
   ```

4. Use React DevTools Profiler to find bottlenecks

---

### Issue 15: Memory Leaks During Long Sessions

**Symptoms**:
- Browser becomes slow over time
- Memory usage increases
- Tab crashes after many questions

**Possible Causes**:
1. Event listeners not cleaned up
2. Timers not cleared
3. State growing unbounded

**Solutions**:
1. Clean up event listeners:
   ```typescript
   useEffect(() => {
     const handler = () => {};
     window.addEventListener('event', handler);
     return () => window.removeEventListener('event', handler);
   }, []);
   ```

2. Clear timers:
   ```typescript
   useEffect(() => {
     const timer = setInterval(() => {}, 1000);
     return () => clearInterval(timer);
   }, []);
   ```

3. Limit state size (don't store all questions in state)

4. Use Chrome DevTools Memory Profiler

---

## Testing Issues

### Issue 16: Can't Test Without Backend

**Symptoms**:
- Need backend to test frontend
- Can't work independently

**Possible Causes**:
1. Mock server not set up
2. Frontend hardcoded to real backend

**Solutions**:
1. Use mock API server:
   ```bash
   node mock-data/mock-api-server.js
   ```

2. Configure API base URL:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   ```

3. Add mock data to mock-api-responses.json

4. Test all features with mock data

---

## Browser Compatibility Issues

### Issue 17: Works in Chrome but Not Safari

**Symptoms**:
- Features work in Chrome
- Broken in Safari or Firefox

**Possible Causes**:
1. Browser-specific APIs
2. CSS not supported
3. JavaScript features not supported

**Solutions**:
1. Check browser console for errors

2. Use polyfills for unsupported features

3. Test CSS in all browsers:
   - Use standard CSS properties
   - Avoid -webkit- prefixes

4. Use BrowserStack or similar for testing

---

## Getting More Help

If you're still stuck after trying these solutions:

1. **Check Console**: Always check browser console for errors
2. **React DevTools**: Inspect component state and props
3. **Network Tab**: Check API calls and responses
4. **Add Logging**: Add console.log statements to debug
5. **Simplify**: Remove code until it works, then add back
6. **Ask for Help**: Provide error messages and what you've tried

---

## Common Error Messages

### "Cannot read property 'X' of undefined"
- **Cause**: Trying to access property of null/undefined object
- **Fix**: Add optional chaining: `object?.property`

### "Maximum update depth exceeded"
- **Cause**: setState called in render causing infinite loop
- **Fix**: Move setState to useEffect or event handler

### "Objects are not valid as a React child"
- **Cause**: Trying to render an object directly
- **Fix**: Render object properties: `{object.property}`

### "Failed to fetch"
- **Cause**: API call failed (network or CORS)
- **Fix**: Check mock server is running and CORS enabled

---

## Prevention Tips

1. **Test Frequently**: Test after each prompt, don't wait until end
2. **Use TypeScript**: Catch errors at compile time
3. **Read Errors**: Error messages usually tell you what's wrong
4. **Check Examples**: Look at similar components for patterns
5. **Start Simple**: Get basic version working before adding features

---

**Still having issues? Review the code generated from PROMPTS.md and ensure all steps in CONFIGURATION.md are complete.**

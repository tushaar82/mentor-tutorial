# Troubleshooting Guide for Day 2: Authentication UI

This document provides solutions to common issues you might encounter while building and testing the authentication UI.

---

## General Issues

### Issue 1: "Module not found" errors

**Symptoms**:
- Import errors in console
- TypeScript errors about missing modules
- Build fails with module not found

**Possible Causes**:
1. Dependencies not installed
2. Wrong import path
3. File doesn't exist at specified path

**Solutions**:

**Solution 1**: Install missing dependencies
```bash
cd vaishnavi-frontend
npm install
```

**Solution 2**: Check import paths
```typescript
// ❌ Wrong
import { Button } from 'components/ui/Button';

// ✅ Correct
import Button from '@/components/ui/Button';
// or
import Button from '../components/ui/Button';
```

**Solution 3**: Verify file exists
```bash
ls -la components/ui/Button.tsx
```

**Solution 4**: Restart dev server
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue 2: TypeScript errors

**Symptoms**:
- Red squiggly lines in IDE
- Build fails with type errors
- "Property does not exist on type" errors

**Possible Causes**:
1. Missing type definitions
2. Incorrect prop types
3. Missing TypeScript configuration

**Solutions**:

**Solution 1**: Install type definitions
```bash
npm install --save-dev @types/react @types/node
```

**Solution 2**: Check prop interfaces
```typescript
// ❌ Wrong - missing required prop
<Button onClick={handleClick} />

// ✅ Correct - all required props provided
<Button onClick={handleClick} variant="primary">
  Login
</Button>
```

**Solution 3**: Add type annotations
```typescript
// ❌ Wrong - no type
const [user, setUser] = useState(null);

// ✅ Correct - with type
const [user, setUser] = useState<User | null>(null);
```

**Solution 4**: Check tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "jsx": "preserve"
  }
}
```

---

### Issue 3: Tailwind CSS styles not working

**Symptoms**:
- Components have no styling
- Tailwind classes not applied
- UI looks unstyled

**Possible Causes**:
1. Tailwind not configured
2. CSS not imported
3. Class names incorrect

**Solutions**:

**Solution 1**: Verify Tailwind configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Solution 2**: Import Tailwind CSS
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Solution 3**: Check class names
```typescript
// ❌ Wrong - typo
<button className="bg-blu-500">

// ✅ Correct
<button className="bg-blue-500">
```

**Solution 4**: Restart dev server
```bash
npm run dev
```

---

## Firebase Issues

### Issue 4: "Firebase app not initialized"

**Symptoms**:
- Error: "Firebase: No Firebase App '[DEFAULT]' has been created"
- Authentication doesn't work
- Console shows Firebase errors

**Possible Causes**:
1. Firebase not initialized
2. Environment variables missing
3. Firebase config incorrect

**Solutions**:

**Solution 1**: Check Firebase initialization
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

**Solution 2**: Verify environment variables
```bash
# Check .env.local exists and has values
cat .env.local | grep FIREBASE
```

**Solution 3**: Restart dev server after env changes
```bash
# Environment variables only load on server start
npm run dev
```

---

### Issue 5: Google Sign-In popup blocked

**Symptoms**:
- Popup doesn't open
- Browser shows "Popup blocked" notification
- Google Sign-In fails silently

**Possible Causes**:
1. Browser blocking popups
2. Popup blocker extension
3. User action not triggering popup

**Solutions**:

**Solution 1**: Allow popups for localhost
- Chrome: Click popup icon in address bar → "Always allow popups from localhost"
- Firefox: Preferences → Privacy & Security → Permissions → Popups → Exceptions → Add localhost

**Solution 2**: Disable popup blocker extensions
- Temporarily disable ad blockers or popup blockers

**Solution 3**: Ensure user action triggers popup
```typescript
// ❌ Wrong - popup not triggered by user action
useEffect(() => {
  signInWithPopup(auth, googleProvider);
}, []);

// ✅ Correct - popup triggered by button click
const handleGoogleSignIn = async () => {
  await signInWithPopup(auth, googleProvider);
};
```

---

### Issue 6: "Unauthorized domain" error

**Symptoms**:
- Error: "This domain is not authorized for OAuth operations"
- Google Sign-In fails
- Firebase shows domain error

**Possible Causes**:
1. Localhost not in authorized domains
2. Wrong domain in Firebase Console
3. Firebase project misconfigured

**Solutions**:

**Solution 1**: Add localhost to authorized domains
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Authentication → Settings → Authorized domains
4. Add `localhost` if not present

**Solution 2**: Check authDomain in config
```typescript
// .env.local
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
```

**Solution 3**: Verify Firebase project
- Ensure you're using the correct Firebase project
- Check project ID matches in Firebase Console

---

## API and Network Issues

### Issue 7: "Network request failed"

**Symptoms**:
- API calls fail
- Error: "Failed to fetch"
- Network tab shows failed requests

**Possible Causes**:
1. Backend not running
2. Wrong API URL
3. CORS issues
4. Network connectivity

**Solutions**:

**Solution 1**: Check backend is running
```bash
# For mock server
node mock-data/mock-api-server.js

# For real backend
# Check backend terminal shows server running
```

**Solution 2**: Verify API URL
```bash
# Check .env.local
cat .env.local | grep API_URL

# Should be:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# or for mock:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Solution 3**: Check CORS
```javascript
// Backend should have CORS enabled
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Solution 4**: Restart both servers
```bash
# Restart frontend
npm run dev

# Restart backend/mock server
node mock-data/mock-api-server.js
```

---

### Issue 8: API returns 404 Not Found

**Symptoms**:
- API calls return 404
- Endpoints not found
- Network tab shows 404 status

**Possible Causes**:
1. Wrong endpoint path
2. Backend route not implemented
3. API URL incorrect

**Solutions**:

**Solution 1**: Check endpoint path
```typescript
// ❌ Wrong
const response = await fetch('/auth/login/email');

// ✅ Correct
const response = await fetch('/api/auth/login/email');
```

**Solution 2**: Verify backend has route
```bash
# Check backend logs for registered routes
# Should show: POST /api/auth/login/email
```

**Solution 3**: Check API base URL
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

---

### Issue 9: CORS errors

**Symptoms**:
- Error: "Access-Control-Allow-Origin"
- API calls blocked by browser
- Network tab shows CORS error

**Possible Causes**:
1. Backend CORS not configured
2. Wrong origin in CORS config
3. Credentials not allowed

**Solutions**:

**Solution 1**: Enable CORS on backend
```python
# Backend main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Solution 2**: Check mock server CORS
```javascript
// mock-api-server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Solution 3**: Verify frontend origin
- Frontend must run on http://localhost:3000
- Check browser address bar

---

## Form and Validation Issues

### Issue 10: Form validation not working

**Symptoms**:
- No error messages shown
- Form submits with invalid data
- Validation rules not applied

**Possible Causes**:
1. React Hook Form not configured
2. Validation schema missing
3. Error messages not displayed

**Solutions**:

**Solution 1**: Check React Hook Form setup
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

**Solution 2**: Add validation rules
```typescript
<input
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  })}
/>
```

**Solution 3**: Display error messages
```typescript
{errors.email && (
  <span className="text-red-500">{errors.email.message}</span>
)}
```

---

### Issue 11: OTP input not working

**Symptoms**:
- Can't type in OTP boxes
- Auto-focus not working
- Backspace doesn't work

**Possible Causes**:
1. Input refs not set up
2. Focus logic incorrect
3. Event handlers missing

**Solutions**:

**Solution 1**: Use refs for inputs
```typescript
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

<input
  ref={(el) => (inputRefs.current[index] = el)}
  maxLength={1}
/>
```

**Solution 2**: Implement auto-focus
```typescript
const handleChange = (index: number, value: string) => {
  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};
```

**Solution 3**: Handle backspace
```typescript
const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
  if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};
```

---

## Session and State Issues

### Issue 12: Session not persisting

**Symptoms**:
- User logged out after refresh
- Token not stored
- Session lost on page reload

**Possible Causes**:
1. Token not saved to localStorage
2. Session retrieval not working
3. Token expired

**Solutions**:

**Solution 1**: Save session after login
```typescript
// After successful login
saveSession(token, expiresAt);
```

**Solution 2**: Check session on mount
```typescript
useEffect(() => {
  const session = getSession();
  if (session) {
    setUser(session.user);
  }
}, []);
```

**Solution 3**: Verify localStorage
```javascript
// Browser DevTools → Application → Local Storage
// Check for: auth_token, auth_expires_at
```

**Solution 4**: Check token expiration
```typescript
const isSessionValid = () => {
  const session = getSession();
  if (!session) return false;
  return Date.now() < session.expiresAt;
};
```

---

### Issue 13: State not updating

**Symptoms**:
- UI doesn't reflect state changes
- Component doesn't re-render
- State updates not visible

**Possible Causes**:
1. State mutation instead of update
2. Async state update timing
3. Missing dependencies in useEffect

**Solutions**:

**Solution 1**: Use setState correctly
```typescript
// ❌ Wrong - mutating state
user.name = 'New Name';

// ✅ Correct - creating new state
setUser({ ...user, name: 'New Name' });
```

**Solution 2**: Handle async updates
```typescript
const handleLogin = async () => {
  const response = await loginWithEmail(email, password);
  setUser(response.user); // State updates after async
};
```

**Solution 3**: Add dependencies
```typescript
useEffect(() => {
  checkAuth();
}, [checkAuth]); // Add dependencies
```

---

## UI and Styling Issues

### Issue 14: Loading spinner not showing

**Symptoms**:
- No loading indicator during API calls
- Button doesn't show loading state
- UI appears frozen

**Possible Causes**:
1. Loading state not managed
2. Spinner component missing
3. Conditional rendering incorrect

**Solutions**:

**Solution 1**: Add loading state
```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await loginWithEmail(email, password);
  } finally {
    setLoading(false);
  }
};
```

**Solution 2**: Show loading in UI
```typescript
<Button disabled={loading}>
  {loading ? 'Loading...' : 'Login'}
</Button>
```

**Solution 3**: Add spinner icon
```typescript
{loading && <Spinner className="mr-2" />}
```

---

### Issue 15: Responsive design broken

**Symptoms**:
- UI doesn't work on mobile
- Horizontal scrolling on mobile
- Elements overlapping

**Possible Causes**:
1. Missing responsive classes
2. Fixed widths
3. Viewport not configured

**Solutions**:

**Solution 1**: Use responsive Tailwind classes
```typescript
// ❌ Wrong - fixed width
<div className="w-96">

// ✅ Correct - responsive width
<div className="w-full md:w-96">
```

**Solution 2**: Add viewport meta tag
```html
<!-- app/layout.tsx -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Solution 3**: Test on mobile
```bash
# Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
# Test on different screen sizes
```

---

## Testing Issues

### Issue 16: Mock API not working

**Symptoms**:
- Mock server not responding
- API calls fail with mock server
- Mock data not returned

**Possible Causes**:
1. Mock server not running
2. Wrong port
3. Mock endpoints not implemented

**Solutions**:

**Solution 1**: Start mock server
```bash
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

**Solution 2**: Check port
```bash
# Mock server should run on port 3001
# Check terminal output: "Mock API server running on port 3001"
```

**Solution 3**: Verify API URL points to mock
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Solution 4**: Check mock endpoints
```javascript
// mock-api-server.js should have:
app.post('/api/auth/login/email', (req, res) => {
  // Mock response
});
```

---

## Browser Console Errors

### Issue 17: "Hydration failed" error

**Symptoms**:
- Error: "Hydration failed because the initial UI does not match"
- UI flickers on load
- Console shows hydration errors

**Possible Causes**:
1. Server/client mismatch
2. Using browser-only APIs during SSR
3. Conditional rendering based on client state

**Solutions**:

**Solution 1**: Use 'use client' directive
```typescript
'use client';

import { useState } from 'react';
// Component code
```

**Solution 2**: Check for browser-only code
```typescript
// ❌ Wrong - localStorage during SSR
const token = localStorage.getItem('auth_token');

// ✅ Correct - check if browser
const token = typeof window !== 'undefined' 
  ? localStorage.getItem('auth_token') 
  : null;
```

**Solution 3**: Use useEffect for client-only code
```typescript
useEffect(() => {
  // This only runs on client
  const token = localStorage.getItem('auth_token');
}, []);
```

---

## Getting More Help

If you're still stuck after trying these solutions:

### 1. Check Browser Console
- Open DevTools (F12)
- Look for error messages
- Check Network tab for failed requests

### 2. Check Terminal Output
- Frontend dev server logs
- Backend/mock server logs
- Look for error stack traces

### 3. Verify Prerequisites
- All dependencies installed
- All configuration steps completed
- All environment variables set

### 4. Review Documentation
- README.md for overview
- PROMPTS.md for code generation
- CONFIGURATION.md for setup steps
- TESTING.md for test procedures

### 5. Ask for Help
When asking for help, provide:
- Error message (full text)
- What you were trying to do
- What you've already tried
- Browser console output
- Terminal output

---

## Quick Diagnostic Checklist

Run through this checklist to diagnose issues:

- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Backend/mock server running
- [ ] Environment variables set in `.env.local`
- [ ] Firebase configured correctly
- [ ] No console errors in browser
- [ ] No TypeScript errors in IDE
- [ ] Network tab shows successful requests
- [ ] localStorage has auth token (after login)
- [ ] Tailwind CSS working (styles applied)

---

## Prevention Tips

Avoid common issues by:

1. **Test Frequently**: Test after each prompt, don't wait until the end
2. **Read Error Messages**: They usually tell you exactly what's wrong
3. **Check Types**: TypeScript errors prevent runtime issues
4. **Use DevTools**: Browser DevTools are your best debugging friend
5. **Restart Servers**: Many issues fixed by restarting dev server
6. **Clear Cache**: Sometimes browser cache causes issues
7. **Check Docs**: Review documentation before asking for help

---

Good luck with your implementation! Most issues have simple solutions. 🚀

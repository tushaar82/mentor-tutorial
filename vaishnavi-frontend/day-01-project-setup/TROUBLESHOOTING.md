# Troubleshooting Guide for Day 1: Frontend Project Setup

This document provides solutions to common issues you might encounter during Day 1 frontend setup.

---

## Installation Issues

### Issue 1: Node.js Installation Fails

**Symptoms:**
- `node: command not found`
- Installation errors during Node.js setup

**Possible Causes:**
1. Incorrect installation method
2. PATH not updated
3. Permission issues

**Solutions:**

**On Ubuntu/Debian:**
```bash
# Remove old Node.js versions
sudo apt remove nodejs npm

# Install from NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

**On macOS:**
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node@18

# Add to PATH
echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
node --version
```

**On Windows:**
1. Download installer from [nodejs.org](https://nodejs.org/)
2. Run installer as Administrator
3. Check "Add to PATH" option
4. Restart terminal
5. Verify: `node --version`

---

### Issue 2: npm install Fails

**Symptoms:**
- `npm ERR! code EACCES`
- `npm ERR! permission denied`
- Package installation errors

**Possible Causes:**
1. Permission issues
2. Corrupted node_modules
3. Network issues
4. Package conflicts

**Solutions:**

**Solution 1: Fix npm permissions (Linux/macOS)**
```bash
# Change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Try install again
npm install
```

**Solution 2: Clean install**
```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install again
npm install
```

**Solution 3: Use legacy peer deps**
```bash
npm install --legacy-peer-deps
```

**Solution 4: Check network**
```bash
# Test npm registry
npm ping

# Use different registry if needed
npm config set registry https://registry.npmjs.org/
```

---

## Development Server Issues

### Issue 3: Port 3000 Already in Use

**Symptoms:**
- `Error: listen EADDRINUSE: address already in use :::3000`
- Dev server won't start

**Possible Causes:**
1. Another Next.js app is running
2. Another process is using port 3000

**Solutions:**

**Solution 1: Find and kill the process**
```bash
# On Linux/macOS
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2: Use different port**
```bash
npm run dev -- -p 3001
```

**Solution 3: Update package.json**
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

---

### Issue 4: Module Not Found Errors

**Symptoms:**
- `Module not found: Can't resolve 'firebase'`
- `Cannot find module '@/components/AuthForm'`

**Possible Causes:**
1. Dependencies not installed
2. Incorrect import paths
3. TypeScript path aliases not configured

**Solutions:**

**Solution 1: Install missing dependencies**
```bash
npm install firebase next react react-dom
```

**Solution 2: Check import paths**
```typescript
// Wrong
import AuthForm from 'components/AuthForm'

// Correct (if using @ alias)
import AuthForm from '@/components/AuthForm'

// Or use relative paths
import AuthForm from '../components/AuthForm'
```

**Solution 3: Verify tsconfig.json**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Solution 4: Restart dev server**
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

---

## Firebase Issues

### Issue 5: Firebase Configuration Errors

**Symptoms:**
- `Firebase: Error (auth/invalid-api-key)`
- `Firebase app named '[DEFAULT]' already exists`
- Environment variables undefined

**Possible Causes:**
1. Missing or incorrect Firebase config
2. Environment variables not loaded
3. Multiple Firebase initializations

**Solutions:**

**Solution 1: Verify .env.local**
```bash
# Check file exists
ls -la .env.local

# Check all variables are set
cat .env.local | grep NEXT_PUBLIC_FIREBASE

# Should show 6 variables:
# NEXT_PUBLIC_FIREBASE_API_KEY=...
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
# NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Solution 2: Restart dev server**
```bash
# Environment variables are loaded at startup
# Stop server (Ctrl+C)
npm run dev
```

**Solution 3: Check Firebase initialization**
```typescript
// lib/firebase.ts should have singleton pattern
import { initializeApp, getApps } from 'firebase/app';

// Only initialize if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
```

**Solution 4: Get fresh config from Firebase Console**
1. Go to Firebase Console
2. Project Settings → Your apps
3. Copy config values again
4. Update .env.local
5. Restart dev server

---

### Issue 6: Firebase Auth Popup Blocked

**Symptoms:**
- Google Sign-In popup doesn't appear
- `auth/popup-blocked` error
- `auth/popup-closed-by-user` error

**Possible Causes:**
1. Browser popup blocker
2. User closed popup
3. Firebase auth not configured

**Solutions:**

**Solution 1: Allow popups**
- Click popup blocker icon in browser address bar
- Allow popups for localhost:3000
- Try sign-in again

**Solution 2: Use redirect instead of popup**
```typescript
// In GoogleSignInButton.tsx
import { signInWithRedirect } from 'firebase/auth';

// Instead of signInWithPopup
await signInWithRedirect(auth, provider);
```

**Solution 3: Handle popup closed error**
```typescript
try {
  await signInWithPopup(auth, provider);
} catch (error) {
  if (error.code === 'auth/popup-closed-by-user') {
    setError('Sign-in cancelled. Please try again.');
  }
}
```

---

## API and Network Issues

### Issue 7: Mock API Server Won't Start

**Symptoms:**
- `Error: Cannot find module 'express'`
- `Error: listen EADDRINUSE :::8000`
- Mock server crashes

**Possible Causes:**
1. Express not installed
2. Port 8000 in use
3. Syntax errors in mock-api-server.js

**Solutions:**

**Solution 1: Install Express**
```bash
npm install express cors
```

**Solution 2: Kill process on port 8000**
```bash
# On Linux/macOS
lsof -ti:8000 | xargs kill -9

# On Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Solution 3: Use different port**
```javascript
// In mock-api-server.js
const PORT = 8001; // Change port

// Update .env.local
NEXT_PUBLIC_API_URL=http://localhost:8001
```

**Solution 4: Check syntax**
```bash
# Test the file
node mock-data/mock-api-server.js

# Look for syntax errors
```

---

### Issue 8: CORS Errors

**Symptoms:**
- `Access to fetch at 'http://localhost:8000' has been blocked by CORS policy`
- Network requests fail with CORS error

**Possible Causes:**
1. CORS not enabled in mock server
2. Wrong origin in CORS config
3. Backend not running

**Solutions:**

**Solution 1: Verify CORS in mock server**
```javascript
// mock-api-server.js should have:
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Solution 2: Allow all origins (development only)**
```javascript
app.use(cors({
  origin: '*'
}));
```

**Solution 3: Check API URL**
```bash
# In .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# Not https, not different port
```

---

### Issue 9: API Requests Fail

**Symptoms:**
- `TypeError: Failed to fetch`
- `Network request failed`
- API calls timeout

**Possible Causes:**
1. Mock server not running
2. Wrong API URL
3. Network issues

**Solutions:**

**Solution 1: Start mock server**
```bash
# In separate terminal
cd vaishnavi-frontend
node mock-data/mock-api-server.js

# Should see: "Mock API server running on http://localhost:8000"
```

**Solution 2: Test API directly**
```bash
# Test with curl
curl http://localhost:8000/api/auth/register/parent/email \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","language":"en"}'

# Should return JSON response
```

**Solution 3: Check browser network tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Submit form
4. Check request details
5. Look for error messages

---

## Styling Issues

### Issue 10: Tailwind CSS Not Working

**Symptoms:**
- No styling applied
- Classes like `bg-blue-500` don't work
- Page looks unstyled

**Possible Causes:**
1. Tailwind not configured
2. globals.css not imported
3. Content paths wrong in config

**Solutions:**

**Solution 1: Verify Tailwind installation**
```bash
npm list tailwindcss
# Should show: tailwindcss@3.4.0
```

**Solution 2: Check globals.css**
```css
/* app/globals.css should have: */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Solution 3: Verify tailwind.config.js**
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

**Solution 4: Check layout.tsx imports globals.css**
```typescript
// app/layout.tsx
import './globals.css'
```

**Solution 5: Restart dev server**
```bash
# Stop and restart
npm run dev
```

---

### Issue 11: Responsive Design Broken

**Symptoms:**
- Layout doesn't adapt to screen size
- Horizontal scrolling on mobile
- Text too small on mobile

**Possible Causes:**
1. Missing responsive classes
2. Fixed widths
3. Viewport meta tag missing

**Solutions:**

**Solution 1: Add responsive classes**
```typescript
// Use Tailwind responsive prefixes
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Content */}
</div>
```

**Solution 2: Remove fixed widths**
```typescript
// Wrong
<div className="w-[500px]">

// Right
<div className="w-full max-w-md">
```

**Solution 3: Check viewport meta tag**
```typescript
// app/layout.tsx metadata
export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
}
```

---

## TypeScript Issues

### Issue 12: TypeScript Errors

**Symptoms:**
- `Type 'string' is not assignable to type 'never'`
- `Property 'X' does not exist on type 'Y'`
- Build fails with type errors

**Possible Causes:**
1. Missing type definitions
2. Incorrect types
3. Strict mode issues

**Solutions:**

**Solution 1: Install type definitions**
```bash
npm install --save-dev @types/react @types/node @types/react-dom
```

**Solution 2: Add proper types**
```typescript
// Wrong
const [data, setData] = useState();

// Right
const [data, setData] = useState<string | null>(null);
```

**Solution 3: Check tsconfig.json**
```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve"
  }
}
```

**Solution 4: Use type assertions carefully**
```typescript
// If you're sure about the type
const element = document.getElementById('root') as HTMLElement;
```

---

## Form and Validation Issues

### Issue 13: Form Validation Not Working

**Symptoms:**
- Form submits with invalid data
- No validation errors shown
- Browser validation doesn't trigger

**Possible Causes:**
1. Missing validation attributes
2. Form submission not prevented
3. Validation bypassed

**Solutions:**

**Solution 1: Add validation attributes**
```typescript
<input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>

<input
  type="password"
  required
  minLength={8}
/>

<input
  type="tel"
  required
  pattern="\+91[0-9]{10}"
/>
```

**Solution 2: Prevent default submission**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Important!
  
  // Validation logic
  if (!email || !password) {
    setError('All fields are required');
    return;
  }
  
  // API call
};
```

**Solution 3: Add client-side validation**
```typescript
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

if (!validateEmail(email)) {
  setError('Invalid email format');
  return;
}
```

---

### Issue 14: Form State Not Updating

**Symptoms:**
- Input values don't change
- Form doesn't clear after submission
- State updates don't reflect in UI

**Possible Causes:**
1. Missing onChange handlers
2. State not connected to inputs
3. Controlled vs uncontrolled components

**Solutions:**

**Solution 1: Add onChange handlers**
```typescript
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Solution 2: Clear form after submission**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // API call
  await registerParent(email, password);
  
  // Clear form
  setEmail('');
  setPassword('');
  setError(null);
};
```

**Solution 3: Use controlled components**
```typescript
// All form inputs should be controlled
<input value={email} onChange={handleChange} />
// Not uncontrolled
<input defaultValue={email} />
```

---

## Build and Production Issues

### Issue 15: Build Fails

**Symptoms:**
- `npm run build` fails
- TypeScript errors during build
- Linting errors

**Possible Causes:**
1. TypeScript errors
2. ESLint errors
3. Missing dependencies

**Solutions:**

**Solution 1: Fix TypeScript errors**
```bash
# Check for errors
npm run build

# Fix errors shown in output
# Common fixes:
# - Add missing types
# - Fix import paths
# - Add return types to functions
```

**Solution 2: Fix linting errors**
```bash
# Run linter
npm run lint

# Auto-fix some issues
npm run lint -- --fix
```

**Solution 3: Check for missing dependencies**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Solution 4: Disable strict checks temporarily**
```json
// tsconfig.json (not recommended for production)
{
  "compilerOptions": {
    "strict": false
  }
}
```

---

## Browser-Specific Issues

### Issue 16: Works in Chrome but Not Safari/Firefox

**Symptoms:**
- Features work in one browser but not others
- Styling differences between browsers
- JavaScript errors in specific browsers

**Possible Causes:**
1. Browser compatibility issues
2. Missing polyfills
3. CSS vendor prefixes

**Solutions:**

**Solution 1: Test in multiple browsers**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if on macOS)

**Solution 2: Check browser console**
- Open DevTools in the problematic browser
- Look for specific error messages
- Check for unsupported features

**Solution 3: Add polyfills if needed**
```bash
npm install core-js
```

**Solution 4: Use autoprefixer (already included)**
```javascript
// postcss.config.js should have:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Performance Issues

### Issue 17: Slow Development Server

**Symptoms:**
- Dev server takes long to start
- Hot reload is slow
- Page loads slowly

**Possible Causes:**
1. Too many files
2. Large node_modules
3. System resources

**Solutions:**

**Solution 1: Clear Next.js cache**
```bash
rm -rf .next
npm run dev
```

**Solution 2: Optimize imports**
```typescript
// Wrong (imports entire library)
import { Button } from '@/components';

// Right (imports only what's needed)
import Button from '@/components/Button';
```

**Solution 3: Increase Node memory**
```json
// package.json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev"
  }
}
```

---

## Getting More Help

### If Issues Persist

1. **Check Next.js documentation**: [nextjs.org/docs](https://nextjs.org/docs)
2. **Check Firebase documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
3. **Check Tailwind documentation**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Debugging Tips

**Enable verbose logging:**
```bash
# Start dev server with debug info
DEBUG=* npm run dev
```

**Check all logs:**
- Browser console (F12)
- Terminal output
- Network tab in DevTools
- Mock server logs

**Isolate the problem:**
1. Does it work with mock server?
2. Does it work in different browser?
3. Does it work after clean install?
4. Does it work in production build?

### Common Command Reference

```bash
# Clean everything and start fresh
rm -rf node_modules package-lock.json .next
npm install
npm run dev

# Check for errors
npm run lint
npm run build

# Test specific component
# Create a test page and import only that component

# Check environment variables
node -e "console.log(process.env)" | grep NEXT_PUBLIC
```

---

## Still Stuck?

If you've tried all solutions and still have issues:

1. **Document the problem**:
   - What you're trying to do
   - What's happening instead
   - Error messages (full text)
   - What you've tried

2. **Check the code**:
   - Compare with PROMPTS.md
   - Verify file structure
   - Check for typos

3. **Ask for help**:
   - Include error messages
   - Share relevant code
   - Mention what you've tried

Remember: Most issues are configuration or typos. Double-check everything!

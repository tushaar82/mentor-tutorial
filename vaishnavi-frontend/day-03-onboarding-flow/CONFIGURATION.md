# Configuration Guide for Day 3: Onboarding Flow UI

This document provides step-by-step configuration instructions for setting up the onboarding flow UI.

---

## Step 1: Install Form Validation Library

### What You're Doing
Installing React Hook Form for form validation and state management.

### Why This Matters
React Hook Form provides performant form validation with minimal re-renders and excellent TypeScript support.

### Command/Action
```bash
cd vaishnavi-frontend
npm install react-hook-form
```

### Verification
```bash
npm list react-hook-form
# Should show: react-hook-form@7.x.x
```

### If It Fails
- **Error**: "npm not found"
  - **Fix**: Install Node.js 18+ from nodejs.org
- **Error**: "EACCES permission denied"
  - **Fix**: Run with sudo or fix npm permissions

---

## Step 2: Install Date Utilities (Optional)

### What You're Doing
Installing date-fns for date formatting and calculations (optional, can use native Date).

### Why This Matters
Provides easy date formatting for exam date display and calculations.

### Command/Action
```bash
npm install date-fns
```

### Verification
```bash
npm list date-fns
# Should show: date-fns@2.x.x or 3.x.x
```

### If It Fails
- Skip this step if you prefer using native JavaScript Date methods
- The tutorial code will work with either approach

---

## Step 3: Verify Tailwind CSS Configuration

### What You're Doing
Ensuring Tailwind CSS is properly configured for form styling.

### Why This Matters
Tailwind provides utility classes for consistent form styling.

### Command/Action
Open `vaishnavi-frontend/tailwind.config.js` and verify it includes:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Verification
```bash
# Check if Tailwind is installed
npm list tailwindcss
# Should show: tailwindcss@3.x.x
```

### If It Fails
- **Error**: "tailwindcss not found"
  - **Fix**: Run `npm install -D tailwindcss postcss autoprefixer`
  - **Fix**: Run `npx tailwindcss init -p`

---

## Step 4: Create Environment Variables (If Needed)

### What You're Doing
Setting up environment variables for API base URL.

### Why This Matters
Allows switching between mock API and real backend easily.

### Command/Action
Create or update `vaishnavi-frontend/.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_API_URL=http://localhost:3001

# Use mock API for development (set to 'true' or 'false')
NEXT_PUBLIC_USE_MOCK_API=true
```

### Verification
- File exists at `vaishnavi-frontend/.env.local`
- Variables start with `NEXT_PUBLIC_` (required for client-side access)

### If It Fails
- **Error**: Variables not accessible in code
  - **Fix**: Ensure variables start with `NEXT_PUBLIC_`
  - **Fix**: Restart dev server after changing .env.local

---

## Step 5: Update API Client Configuration

### What You're Doing
Configuring the API client to use environment variables.

### Why This Matters
Enables switching between mock and real API based on environment.

### Command/Action
Open `vaishnavi-frontend/lib/api.ts` and update:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'
  ? process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:3001'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = {
  baseURL: API_BASE_URL,
  // ... rest of configuration
};
```

### Verification
- API client uses correct base URL based on environment
- Can switch between mock and real API by changing env variable

---

## Step 6: Set Up Mock API Server

### What You're Doing
Preparing the mock API server for standalone testing.

### Why This Matters
Allows testing onboarding flow without backend dependency.

### Command/Action
Ensure `vaishnavi-frontend/mock-data/mock-api-server.js` exists and has Express installed:

```bash
# If Express is not installed
npm install express cors
```

### Verification
```bash
# Start mock API server
node mock-data/mock-api-server.js

# Should see:
# Mock API server running on http://localhost:3001
```

### If It Fails
- **Error**: "Cannot find module 'express'"
  - **Fix**: Run `npm install express cors`
- **Error**: "Port 3001 already in use"
  - **Fix**: Kill process on port 3001 or change port in mock-api-server.js

---

## Step 7: Verify TypeScript Configuration

### What You're Doing
Ensuring TypeScript is configured for strict type checking.

### Why This Matters
Catches type errors during development for better code quality.

### Command/Action
Open `vaishnavi-frontend/tsconfig.json` and verify:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Verification
- TypeScript shows type errors in IDE
- `npm run build` catches type errors

---

## Step 8: Test Development Server

### What You're Doing
Starting the Next.js development server to verify setup.

### Why This Matters
Ensures all dependencies are installed and configured correctly.

### Command/Action
```bash
cd vaishnavi-frontend
npm run dev
```

### Verification
- Server starts without errors
- Open http://localhost:3000
- No console errors in browser

### If It Fails
- **Error**: "Module not found"
  - **Fix**: Run `npm install` to install all dependencies
- **Error**: "Port 3000 already in use"
  - **Fix**: Kill process on port 3000 or use different port: `npm run dev -- -p 3002`

---

## Step 9: Verify Authentication Setup

### What You're Doing
Ensuring authentication from Day 2 is working.

### Why This Matters
Onboarding requires authenticated users.

### Command/Action
1. Navigate to http://localhost:3000/auth/login
2. Login with test credentials
3. Verify you're redirected to dashboard or home

### Verification
- Login works successfully
- Session token is stored
- Protected routes are accessible

### If It Fails
- **Error**: "Cannot access /auth/login"
  - **Fix**: Complete Day 2: Authentication UI first
- **Error**: "Login fails"
  - **Fix**: Ensure mock API server is running or backend is available

---

## Step 10: Create Test User (If Using Mock API)

### What You're Doing
Creating a test user account for onboarding testing.

### Why This Matters
Need an authenticated user to test onboarding flow.

### Command/Action
1. Start mock API server: `node mock-data/mock-api-server.js`
2. Navigate to http://localhost:3000/auth/register
3. Register with test credentials:
   - Email: test@example.com
   - Password: Test123!
4. Login with same credentials

### Verification
- Registration successful
- Login successful
- Can access protected routes

---

## Configuration Complete!

You've successfully configured the onboarding flow UI. Next steps:

1. ✅ All dependencies installed
2. ✅ Environment variables configured
3. ✅ Mock API server ready
4. ✅ Development server running
5. ✅ Test user created

**Ready to test?** Open **TESTING.md** to verify the onboarding flow works correctly!

---

## Quick Reference

### Start Development
```bash
# Terminal 1: Start Next.js dev server
cd vaishnavi-frontend
npm run dev

# Terminal 2: Start mock API server
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

### Environment Variables
```bash
# Use mock API
NEXT_PUBLIC_USE_MOCK_API=true

# Use real backend
NEXT_PUBLIC_USE_MOCK_API=false
```

### Common Commands
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

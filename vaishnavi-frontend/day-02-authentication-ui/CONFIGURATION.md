# Configuration Guide for Day 2: Authentication UI

This document contains all manual setup steps needed to configure authentication UI components.

---

## Step 1: Install Required Dependencies

### What You're Doing
Installing React Hook Form for form validation and additional UI libraries.

### Command/Action
```bash
cd vaishnavi-frontend
npm install react-hook-form @hookform/resolvers zod
```

### Why This Matters
- **react-hook-form**: Efficient form validation with minimal re-renders
- **@hookform/resolvers**: Integrates Zod schema validation with React Hook Form
- **zod**: TypeScript-first schema validation library

### Verification
```bash
npm list react-hook-form @hookform/resolvers zod
```

**Expected Output**: Should show installed versions without errors

---

## Step 2: Configure Firebase Client SDK for Authentication

### What You're Doing
Updating Firebase client configuration to enable authentication methods.

### Action
Open `vaishnavi-frontend/lib/firebase.ts` and verify it includes:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

### Why This Matters
- Initializes Firebase authentication
- Configures Google OAuth provider
- Makes auth instance available to all components

### Verification
Check that `lib/firebase.ts` exports `auth` and `googleProvider`

---

## Step 3: Update Environment Variables

### What You're Doing
Adding backend API URL to environment configuration.

### Action
Open `vaishnavi-frontend/.env.local` and add:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Firebase Configuration (should already exist from Day 1)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Why This Matters
- `NEXT_PUBLIC_API_URL`: Points to backend API for authentication calls
- Environment variables keep sensitive config out of code

### Verification
```bash
cat .env.local | grep NEXT_PUBLIC_API_URL
```

**Expected Output**: Should show the API URL

---

## Step 4: Enable Google Sign-In in Firebase Console

### What You're Doing
Enabling Google authentication provider in Firebase.

### Steps
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Click **Enable** toggle
6. Enter **Project support email** (your email)
7. Click **Save**

### Why This Matters
Enables Google OAuth for your Firebase project, allowing users to sign in with Google accounts.

### Verification
- Google provider should show as "Enabled" in Firebase Console
- Status indicator should be green

---

## Step 5: Add Authorized Domains in Firebase

### What You're Doing
Adding localhost to authorized domains for development.

### Steps
1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll to **Authorized domains**
3. Verify `localhost` is in the list
4. If not, click **Add domain** and add `localhost`

### Why This Matters
Firebase only allows authentication from authorized domains. Localhost must be added for local development.

### Verification
- `localhost` should appear in authorized domains list

---

## Step 6: Update API Client Base URL

### What You're Doing
Configuring API client to use environment variable for backend URL.

### Action
Open `vaishnavi-frontend/lib/api.ts` and update:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
```

### Why This Matters
Centralizes API URL configuration, making it easy to switch between development and production.

### Verification
Check that `lib/api.ts` uses `process.env.NEXT_PUBLIC_API_URL`

---

## Step 7: Start Mock API Server (For Standalone Testing)

### What You're Doing
Starting the mock API server to test authentication UI without backend.

### Command/Action
```bash
# In a separate terminal
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

### Why This Matters
Allows you to test authentication UI independently without waiting for backend to be ready.

### Verification
```bash
curl http://localhost:3001/health
```

**Expected Output**:
```json
{"status": "ok", "message": "Mock API server running"}
```

### Note
- Mock server runs on port 3001 (different from backend's 8000)
- Update `NEXT_PUBLIC_API_URL` to `http://localhost:3001` to use mock server
- Switch back to `http://localhost:8000` when testing with real backend

---

## Step 8: Install Additional UI Dependencies (Optional)

### What You're Doing
Installing icon library for better UI (optional but recommended).

### Command/Action
```bash
npm install lucide-react
```

### Why This Matters
- Provides icons for buttons, alerts, and UI elements
- Improves visual design and user experience

### Verification
```bash
npm list lucide-react
```

**Expected Output**: Should show installed version

---

## Step 9: Restart Development Server

### What You're Doing
Restarting Next.js dev server to load new environment variables and dependencies.

### Command/Action
```bash
# Stop current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Why This Matters
Next.js needs restart to pick up new environment variables and dependencies.

### Verification
```bash
# Server should start without errors
# Open browser: http://localhost:3000
```

**Expected Output**: Frontend should load without errors

---

## Configuration Checklist

Before proceeding to testing, verify:

- [ ] React Hook Form and Zod installed
- [ ] Firebase client SDK configured with auth
- [ ] Environment variables updated with API URL
- [ ] Google Sign-In enabled in Firebase Console
- [ ] Localhost added to authorized domains
- [ ] API client configured with base URL
- [ ] Mock API server running (for standalone testing)
- [ ] Development server restarted and running

## Troubleshooting

### Issue: "Module not found: react-hook-form"
**Solution**: Run `npm install` again, ensure you're in `vaishnavi-frontend` directory

### Issue: "Firebase auth is not defined"
**Solution**: Check `lib/firebase.ts` exports `auth` and `googleProvider`

### Issue: "API call failed: Network error"
**Solution**: 
- Check backend or mock server is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS is enabled on backend

### Issue: "Google Sign-In popup blocked"
**Solution**: 
- Allow popups in browser settings
- Check Google provider is enabled in Firebase Console

### Issue: "Unauthorized domain"
**Solution**: Add `localhost` to authorized domains in Firebase Console

---

## Next Steps

Configuration complete! Move to **TESTING.md** to verify your authentication UI works correctly.

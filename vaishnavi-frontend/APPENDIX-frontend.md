# Frontend Appendix - Quick Reference Guide

## 📋 Overview

This appendix provides a comprehensive quick reference for the Mentor AI frontend. Use this document to quickly find environment variables, API integration points, mock data files, common issues, component structure, testing commands, and deployment commands.

---

## 🔐 Environment Variables

### Firebase Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key | Firebase Console → Project Settings → General → Web API Key | `AIzaSyAbc123...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console → Project Settings → General | `mentor-ai-dev.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings → General | `mentor-ai-dev` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Firebase Console → Project Settings → General | `mentor-ai-dev.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Firebase Console → Project Settings → Cloud Messaging | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Firebase Console → Project Settings → General | `1:123456789012:web:abc123` |

### API Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | Configuration | `http://localhost:8000` (dev) / `https://api.mentorai.com` (prod) |
| `NEXT_PUBLIC_API_TIMEOUT` | API request timeout (ms) | Configuration | `30000` |

### Razorpay Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID for checkout | Razorpay Dashboard → Settings → API Keys | `rzp_test_1234567890` |

### Application Configuration

| Variable | Description | Source | Example |
|----------|-------------|--------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name | Configuration | `Mentor AI` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | Configuration | `1.0.0` |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment name | Configuration | `development` / `production` |
| `NEXT_PUBLIC_ENABLE_MOCK_API` | Enable mock API mode | Configuration | `true` / `false` |

### Complete .env.local Template

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123...your-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mentor-ai-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mentor-ai-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mentor-ai-dev.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# Razorpay Configuration (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890

# Application Configuration
NEXT_PUBLIC_APP_NAME=Mentor AI
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

---

## 🔌 API Integration Points

### API Client Setup

**Location**: `src/lib/api-client.ts`

**Purpose**: Centralized API client with authentication and error handling

**Usage**:
```typescript
import { apiClient } from '@/lib/api-client';

// GET request
const data = await apiClient.get('/api/endpoint');

// POST request
const result = await apiClient.post('/api/endpoint', { data });

// With authentication
const user = await apiClient.get('/api/auth/me', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

### Authentication API Integration

**Register Parent**
- **Endpoint**: `POST /api/auth/register/parent`
- **Component**: `src/components/auth/RegisterForm.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `auth.register`
- **Request**:
```typescript
{
  email: string;
  phone: string;
  language: 'en' | 'hi' | 'mr';
  registration_method: 'email' | 'phone' | 'google';
}
```
- **Response**:
```typescript
{
  parent_id: string;
  email: string;
  phone: string;
  language: string;
  verification_required: boolean;
  created_at: string;
}
```

**Login with Email**
- **Endpoint**: `POST /api/auth/login/email`
- **Component**: `src/components/auth/LoginForm.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `auth.login`
- **Request**:
```typescript
{
  email: string;
  password: string;
}
```
- **Response**:
```typescript
{
  message: string;
  parent_id: string;
  email: string;
  token: string;
  refresh_token: string;
  expires_in: number;
}
```

**Google Sign-In**
- **Endpoint**: `POST /api/auth/login/google`
- **Component**: `src/components/auth/GoogleSignInButton.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `auth.googleLogin`
- **Firebase Integration**: Uses Firebase Auth `signInWithPopup()`

---

### Onboarding API Integration

**Get Available Exams**
- **Endpoint**: `GET /api/onboarding/exams/available`
- **Component**: `src/components/onboarding/ExamSelection.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `onboarding.availableExams`

**Create Preferences**
- **Endpoint**: `POST /api/onboarding/preferences?parent_id={id}`
- **Component**: `src/components/onboarding/PreferencesForm.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `onboarding.preferences`

**Create Child Profile**
- **Endpoint**: `POST /api/onboarding/child?parent_id={id}`
- **Component**: `src/components/onboarding/ChildProfileForm.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `onboarding.childProfile`

**Select Exam**
- **Endpoint**: `POST /api/onboarding/exam/select?parent_id={id}&child_id={id}`
- **Component**: `src/components/onboarding/ExamSelection.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `onboarding.examSelection`

---

### Diagnostic Test API Integration

**Get Test Questions**
- **Endpoint**: `POST /api/diagnostic/generate`
- **Component**: `src/components/test/DiagnosticTest.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `diagnostic.testQuestions`

**Submit Test Answers**
- **Endpoint**: `POST /api/diagnostic/submit`
- **Component**: `src/components/test/DiagnosticTest.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `diagnostic.testResults`

---

### Analytics API Integration

**Get Analytics Report**
- **Endpoint**: `GET /api/analytics/{analytics_id}`
- **Component**: `src/components/analytics/AnalyticsDashboard.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `analytics.report`

---

### Schedule API Integration

**Generate Schedule**
- **Endpoint**: `POST /api/schedule/generate`
- **Component**: `src/components/schedule/ScheduleGenerator.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `schedule.generated`

**Get Schedule**
- **Endpoint**: `GET /api/schedule/{schedule_id}`
- **Component**: `src/components/schedule/ScheduleDisplay.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `schedule.details`

---

### Payment API Integration

**Create Payment Order**
- **Endpoint**: `POST /api/payment/create-order`
- **Component**: `src/components/payment/PaymentCheckout.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `payment.order`

**Verify Payment**
- **Endpoint**: `POST /api/payment/verify`
- **Component**: `src/components/payment/PaymentVerification.tsx`
- **Mock Data**: `mock-data/mock-api-responses.json` → `payment.verification`

---

## 📦 Mock Data Files

### mock-api-responses.json

**Location**: `mock-data/mock-api-responses.json`

**Purpose**: Contains all mock API responses for standalone frontend testing

**Structure**:
```json
{
  "auth": {
    "register": { /* parent registration response */ },
    "login": { /* login response with token */ },
    "googleLogin": { /* Google OAuth response */ }
  },
  "onboarding": {
    "availableExams": { /* list of exams */ },
    "preferences": { /* parent preferences */ },
    "childProfile": { /* child profile data */ },
    "examSelection": { /* exam selection response */ }
  },
  "diagnostic": {
    "testQuestions": { /* 200 test questions */ },
    "testResults": { /* test submission results */ }
  },
  "analytics": {
    "report": { /* detailed analytics */ }
  },
  "schedule": {
    "generated": { /* generated schedule */ },
    "details": { /* schedule with progress */ }
  },
  "payment": {
    "order": { /* Razorpay order */ },
    "verification": { /* payment verification */ }
  }
}
```

**Usage**:
```typescript
import mockResponses from '@/mock-data/mock-api-responses.json';

// Use in development
const data = process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true'
  ? mockResponses.auth.login
  : await apiClient.post('/api/auth/login/email', credentials);
```

---

### mock-api-server.js

**Location**: `mock-data/mock-api-server.js`

**Purpose**: Express server that simulates backend API for standalone testing

**Start Server**:
```bash
node mock-data/mock-api-server.js
```

**Features**:
- Runs on `http://localhost:8000`
- Simulates all backend endpoints
- Returns data from `mock-api-responses.json`
- Includes artificial delays to simulate network latency
- Logs all requests for debugging

**Usage**:
```bash
# Start mock server
node mock-data/mock-api-server.js

# In another terminal, start frontend
npm run dev

# Frontend will connect to mock server at localhost:8000
```

---

## ❌ Common Issues and Fixes

### Firebase Authentication Issues

#### Issue: "Firebase: Error (auth/configuration-not-found)"
**Cause**: Firebase configuration not properly set in environment variables.

**Symptoms**:
- Firebase Auth fails to initialize
- Console error about missing configuration

**Fix**:
1. Verify all `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`
2. Ensure Firebase project is created in Firebase Console
3. Check Firebase config in `src/lib/firebase.ts`
4. Restart dev server after updating `.env.local`

**Verification**:
```bash
# Check environment variables
cat .env.local | grep FIREBASE

# Restart dev server
npm run dev
```

---

#### Issue: "Firebase: Error (auth/popup-blocked)"
**Cause**: Browser blocked Google Sign-In popup.

**Symptoms**:
- Google Sign-In button doesn't work
- No popup appears

**Fix**:
1. Allow popups for `localhost:3000` in browser settings
2. Use redirect method instead of popup:
```typescript
import { signInWithRedirect } from 'firebase/auth';
await signInWithRedirect(auth, googleProvider);
```

---

#### Issue: "Firebase: Error (auth/unauthorized-domain)"
**Cause**: Domain not authorized in Firebase Console.

**Symptoms**:
- Auth works locally but fails in production
- Error about unauthorized domain

**Fix**:
1. Open Firebase Console → Authentication → Settings → Authorized domains
2. Add your production domain (e.g., `mentorai.com`)
3. Add `localhost` for development
4. Save changes

---

### API Integration Issues

#### Issue: "Network Error" or "Failed to fetch"
**Cause**: Backend API not running or CORS issue.

**Symptoms**:
- All API calls fail
- Console shows network errors

**Fix**:
1. **Check backend is running**:
```bash
curl http://localhost:8000/health
```

2. **If backend not running**, start it:
```bash
cd tushar-backend
uvicorn main:app --reload --port 8000
```

3. **If CORS error**, verify backend CORS configuration includes frontend URL

4. **Use mock API** for standalone testing:
```bash
# Start mock server
node mock-data/mock-api-server.js

# Or enable mock mode
# In .env.local:
NEXT_PUBLIC_ENABLE_MOCK_API=true
```

---

#### Issue: "401 Unauthorized" on protected endpoints
**Cause**: Missing or invalid authentication token.

**Symptoms**:
- Protected API calls fail
- Error message about unauthorized access

**Fix**:
1. Verify token is stored after login:
```typescript
localStorage.getItem('auth_token')
```

2. Ensure token is included in request headers:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

3. Check token hasn't expired (24 hours default)
4. Use refresh token to get new access token if expired

---

#### Issue: "API timeout" or slow responses
**Cause**: Backend processing taking too long or network issues.

**Symptoms**:
- Requests take very long
- Timeout errors

**Fix**:
1. Increase timeout in API client:
```typescript
// In src/lib/api-client.ts
const API_TIMEOUT = 60000; // 60 seconds for AI operations
```

2. Add loading states to UI:
```typescript
const [loading, setLoading] = useState(false);
```

3. Implement retry logic for failed requests

---

### UI/Component Issues

#### Issue: "Hydration failed" error
**Cause**: Server-rendered HTML doesn't match client-rendered HTML.

**Symptoms**:
- Console error about hydration mismatch
- UI flickers or shows wrong content

**Fix**:
1. Avoid using browser-only APIs during SSR:
```typescript
// Wrong
const data = localStorage.getItem('key');

// Right
const [data, setData] = useState(null);
useEffect(() => {
  setData(localStorage.getItem('key'));
}, []);
```

2. Use `suppressHydrationWarning` for dynamic content:
```tsx
<div suppressHydrationWarning>
  {new Date().toLocaleString()}
</div>
```

---

#### Issue: Form validation not working
**Cause**: Validation library not configured or missing schema.

**Symptoms**:
- Form submits with invalid data
- No validation errors shown

**Fix**:
1. Ensure validation schema is defined:
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});
```

2. Connect schema to form:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(schema)
});
```

---

#### Issue: Charts not rendering
**Cause**: Chart library not installed or data format incorrect.

**Symptoms**:
- Empty space where chart should be
- Console errors about Recharts

**Fix**:
1. Install Recharts:
```bash
npm install recharts
```

2. Verify data format matches chart requirements:
```typescript
// For LineChart
const data = [
  { name: 'Physics', score: 65 },
  { name: 'Chemistry', score: 75 },
  { name: 'Mathematics', score: 85 }
];
```

3. Import chart components correctly:
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
```

---

### Razorpay Payment Issues

#### Issue: "Razorpay is not defined"
**Cause**: Razorpay script not loaded.

**Symptoms**:
- Payment checkout fails
- Console error about Razorpay

**Fix**:
1. Add Razorpay script to `_document.tsx`:
```tsx
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

2. Wait for script to load before opening checkout:
```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
}, []);
```

---

#### Issue: Payment verification fails
**Cause**: Signature mismatch or incorrect payment details.

**Symptoms**:
- Payment completes but verification fails
- User charged but subscription not activated

**Fix**:
1. Ensure all payment details are sent to backend:
```typescript
const verifyPayment = async (response) => {
  await apiClient.post('/api/payment/verify', {
    order_id: orderId,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
  });
};
```

2. Handle payment failure gracefully:
```typescript
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  order_id: orderId,
  handler: verifyPayment,
  modal: {
    ondismiss: () => {
      // Handle payment cancellation
    }
  }
};
```

---

### Build and Deployment Issues

#### Issue: "Module not found" during build
**Cause**: Missing dependency or incorrect import path.

**Symptoms**:
- Build fails
- Error about missing module

**Fix**:
1. Install missing dependency:
```bash
npm install <package-name>
```

2. Check import paths use correct aliases:
```typescript
// Use configured alias
import { Component } from '@/components/Component';

// Not relative paths
import { Component } from '../../../components/Component';
```

3. Clear Next.js cache and rebuild:
```bash
rm -rf .next
npm run build
```

---

#### Issue: Environment variables not available in production
**Cause**: Variables not prefixed with `NEXT_PUBLIC_` or not set in hosting platform.

**Symptoms**:
- App works locally but fails in production
- Undefined environment variables

**Fix**:
1. Ensure all client-side variables have `NEXT_PUBLIC_` prefix:
```bash
# Wrong
FIREBASE_API_KEY=abc123

# Right
NEXT_PUBLIC_FIREBASE_API_KEY=abc123
```

2. Set environment variables in Firebase Hosting or deployment platform

3. Rebuild after changing environment variables:
```bash
npm run build
```

---

## 🏗️ Component Structure

### Project Structure

```
vaishnavi-frontend/
├── src/
│   ├── app/                      # Next.js 13+ app directory
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── auth/                # Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── onboarding/          # Onboarding flow
│   │   ├── dashboard/           # Student dashboard
│   │   ├── test/                # Diagnostic test
│   │   ├── analytics/           # Analytics view
│   │   ├── schedule/            # Schedule view
│   │   ├── practice/            # Practice module
│   │   ├── parent/              # Parent dashboard
│   │   └── payment/             # Payment flow
│   │
│   ├── components/              # Reusable components
│   │   ├── auth/               # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── GoogleSignInButton.tsx
│   │   ├── onboarding/         # Onboarding components
│   │   │   ├── PreferencesForm.tsx
│   │   │   ├── ChildProfileForm.tsx
│   │   │   └── ExamSelection.tsx
│   │   ├── test/               # Test components
│   │   │   ├── DiagnosticTest.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   └── TestTimer.tsx
│   │   ├── analytics/          # Analytics components
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── SubjectChart.tsx
│   │   │   └── TopicBreakdown.tsx
│   │   ├── schedule/           # Schedule components
│   │   │   ├── ScheduleDisplay.tsx
│   │   │   ├── DailyTaskCard.tsx
│   │   │   └── ProgressTracker.tsx
│   │   ├── payment/            # Payment components
│   │   │   ├── PaymentCheckout.tsx
│   │   │   └── SubscriptionCard.tsx
│   │   └── ui/                 # UI primitives
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── firebase.ts         # Firebase configuration
│   │   ├── api-client.ts       # API client
│   │   └── utils.ts            # Helper functions
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts          # Authentication hook
│   │   ├── useApi.ts           # API hook
│   │   └── useLocalStorage.ts  # Local storage hook
│   │
│   ├── contexts/               # React contexts
│   │   ├── AuthContext.tsx     # Auth context
│   │   └── ThemeContext.tsx    # Theme context
│   │
│   ├── types/                  # TypeScript types
│   │   ├── auth.ts
│   │   ├── onboarding.ts
│   │   ├── test.ts
│   │   └── api.ts
│   │
│   └── styles/                 # Global styles
│       └── globals.css
│
├── public/                     # Static assets
│   ├── images/
│   └── icons/
│
├── mock-data/                  # Mock data for testing
│   ├── mock-api-responses.json
│   └── mock-api-server.js
│
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

### Key Components

#### Authentication Components

**LoginForm.tsx**
- Purpose: Email/password login form
- Props: `onSuccess?: () => void`
- State: email, password, loading, error
- API: `POST /api/auth/login/email`

**RegisterForm.tsx**
- Purpose: Parent registration form
- Props: `onSuccess?: () => void`
- State: email, phone, language, loading, error
- API: `POST /api/auth/register/parent`

**GoogleSignInButton.tsx**
- Purpose: Google OAuth sign-in
- Props: `onSuccess?: () => void`
- Firebase: `signInWithPopup(auth, googleProvider)`
- API: `POST /api/auth/login/google`

---

#### Onboarding Components

**PreferencesForm.tsx**
- Purpose: Collect parent preferences
- Props: `parentId: string, onNext: () => void`
- State: language, notifications, teaching_involvement
- API: `POST /api/onboarding/preferences`

**ChildProfileForm.tsx**
- Purpose: Create child profile
- Props: `parentId: string, onNext: () => void`
- State: name, age, grade, current_level
- API: `POST /api/onboarding/child`
- Validation: One child per parent

**ExamSelection.tsx**
- Purpose: Select exam and date
- Props: `parentId: string, childId: string, onComplete: () => void`
- State: exam_type, exam_date, subject_preferences
- API: `GET /api/onboarding/exams/available`, `POST /api/onboarding/exam/select`

---

#### Test Components

**DiagnosticTest.tsx**
- Purpose: Main test interface
- Props: `testId: string, questions: Question[]`
- State: currentQuestion, answers, timeRemaining
- Features: Timer, navigation, answer selection, submit
- API: `POST /api/diagnostic/submit`

**QuestionCard.tsx**
- Purpose: Display single question
- Props: `question: Question, onAnswer: (answer: string) => void`
- Features: MCQ options, mark for review, clear answer

**TestTimer.tsx**
- Purpose: Countdown timer
- Props: `duration: number, onExpire: () => void`
- Features: Auto-submit on expiry, warning at 5 minutes

---

#### Analytics Components

**AnalyticsDashboard.tsx**
- Purpose: Display test analytics
- Props: `analyticsId: string`
- Features: Subject scores, weak topics, strategies
- API: `GET /api/analytics/{analyticsId}`
- Charts: Recharts (Bar, Pie, Radar)

**SubjectChart.tsx**
- Purpose: Subject-wise performance chart
- Props: `subjects: SubjectScore[]`
- Chart: Bar chart with Recharts

**TopicBreakdown.tsx**
- Purpose: Topic-wise analysis
- Props: `topics: TopicScore[]`
- Features: Priority indicators, study time estimates

---

#### Schedule Components

**ScheduleDisplay.tsx**
- Purpose: Display study schedule
- Props: `scheduleId: string`
- Features: Calendar view, daily tasks, progress tracking
- API: `GET /api/schedule/{scheduleId}`

**DailyTaskCard.tsx**
- Purpose: Single day's tasks
- Props: `day: DailyTask, onComplete: (taskId: string) => void`
- Features: Task list, completion checkboxes, time estimates

**ProgressTracker.tsx**
- Purpose: Overall progress visualization
- Props: `completed: number, total: number`
- Features: Progress bar, percentage, milestones

---

#### Payment Components

**PaymentCheckout.tsx**
- Purpose: Razorpay payment integration
- Props: `planId: string, onSuccess: () => void`
- Features: Razorpay checkout, payment verification
- API: `POST /api/payment/create-order`, `POST /api/payment/verify`

**SubscriptionCard.tsx**
- Purpose: Display subscription plan
- Props: `plan: SubscriptionPlan, onSelect: () => void`
- Features: Plan details, pricing, features list

---

## 🧪 Testing Commands Reference

### Development Server

```bash
# Start development server
npm run dev

# Start on specific port
npm run dev -- -p 3001

# Start with turbopack (faster)
npm run dev --turbo
```

---

### Build Commands

```bash
# Create production build
npm run build

# Start production server
npm start

# Build and start
npm run build && npm start
```

---

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint -- --fix

# Format with Prettier
npm run format

# Check formatting
npm run format:check
```

---

### Type Checking

```bash
# Run TypeScript type check
npm run type-check

# Watch mode
npm run type-check -- --watch
```

---

### Testing with Mock API

```bash
# Terminal 1: Start mock API server
node mock-data/mock-api-server.js

# Terminal 2: Start frontend
npm run dev

# Frontend will connect to mock API at localhost:8000
```

---

### Component Testing

```bash
# Test specific page
# Open browser: http://localhost:3000/page-name

# Test authentication flow
# 1. Go to http://localhost:3000/auth/register
# 2. Fill form and submit
# 3. Check console for API calls
# 4. Verify redirect to dashboard

# Test with mock data
# Set in .env.local:
NEXT_PUBLIC_ENABLE_MOCK_API=true
# Restart dev server
```

---

### Browser Testing

```bash
# Open in default browser
open http://localhost:3000

# Test responsive design
# Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
# Test on: Mobile (375px), Tablet (768px), Desktop (1920px)

# Test in different browsers
# Chrome: http://localhost:3000
# Firefox: http://localhost:3000
# Safari: http://localhost:3000
```

---

### Firebase Testing

```bash
# Test Firebase Auth
# 1. Open http://localhost:3000/auth/login
# 2. Click "Sign in with Google"
# 3. Check Firebase Console → Authentication → Users

# Test Firestore (if using)
# Check Firebase Console → Firestore Database
# Verify data is being written correctly
```

---

### Performance Testing

```bash
# Lighthouse audit
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Click "Generate report"
# 4. Check Performance, Accessibility, Best Practices, SEO scores

# Bundle analysis
npm run build
npm run analyze
```

---

### Debugging

```bash
# Enable debug mode
# In .env.local:
NEXT_PUBLIC_DEBUG=true

# View console logs
# Open DevTools (F12) → Console tab

# View network requests
# Open DevTools (F12) → Network tab
# Filter by XHR to see API calls

# React DevTools
# Install React DevTools extension
# Open DevTools → Components/Profiler tabs
```

---

## 🚀 Deployment Commands Reference

### Firebase Hosting Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting

# Select options:
# - Use existing project
# - Public directory: out
# - Configure as single-page app: Yes
# - Set up automatic builds with GitHub: No

# Build for production
npm run build

# Export static site
npm run export

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy to specific site
firebase deploy --only hosting:site-name

# View deployed site
firebase hosting:channel:open live
```

---

### Firebase Hosting with GitHub Actions

**Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_API_BASE_URL: ${{ secrets.API_BASE_URL }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

---

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_API_BASE_URL

# View deployment
vercel ls
```

---

### Custom Domain Setup

**Firebase Hosting**:
```bash
# Add custom domain
firebase hosting:channel:deploy production --only hosting

# In Firebase Console:
# 1. Go to Hosting → Add custom domain
# 2. Enter domain name (e.g., mentorai.com)
# 3. Verify ownership (add TXT record to DNS)
# 4. Wait for SSL certificate provisioning
```

**Vercel**:
```bash
# Add domain via CLI
vercel domains add mentorai.com

# Or in Vercel Dashboard:
# 1. Go to Project Settings → Domains
# 2. Add domain
# 3. Configure DNS records
```

---

### Environment Variables in Production

**Firebase Hosting**:
- Set in `.env.production`
- Rebuild and redeploy after changes
- Use Firebase Functions for server-side secrets

**Vercel**:
```bash
# Add environment variable
vercel env add VARIABLE_NAME production

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME production
```

---

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
# Use Next.js Image component
import Image from 'next/image';

# Enable compression
# In next.config.js:
module.exports = {
  compress: true,
  images: {
    domains: ['your-image-domain.com'],
  },
};

# Remove unused dependencies
npm prune --production
```

---

### Monitoring and Logs

**Firebase Hosting**:
```bash
# View hosting logs
firebase hosting:channel:list

# Check deployment status
firebase hosting:channel:open live
```

**Vercel**:
```bash
# View deployment logs
vercel logs

# View production logs
vercel logs --prod

# Follow logs in real-time
vercel logs --follow
```

---

## 📚 Quick Reference Tables

### HTTP Status Codes (Frontend Handling)

| Code | Meaning | Frontend Action |
|------|---------|-----------------|
| 200 | OK | Display success message, update UI |
| 201 | Created | Show confirmation, redirect to next step |
| 400 | Bad Request | Show validation errors to user |
| 401 | Unauthorized | Redirect to login, clear auth token |
| 403 | Forbidden | Show "Access denied" message |
| 404 | Not Found | Show "Resource not found" message |
| 409 | Conflict | Show conflict message (e.g., "Email already exists") |
| 429 | Too Many Requests | Show "Please try again later" |
| 500 | Internal Server Error | Show generic error, log to console |
| 503 | Service Unavailable | Show "Service temporarily unavailable" |

---

### Component Props Patterns

| Pattern | Example | When to Use |
|---------|---------|-------------|
| Callback Props | `onSuccess?: () => void` | Parent needs to know when action completes |
| Data Props | `user: User` | Pass data down to child |
| Render Props | `render: (data) => ReactNode` | Flexible rendering logic |
| Children Props | `children: ReactNode` | Wrapper components |
| Optional Props | `className?: string` | Allow customization |

---

### State Management Patterns

| Pattern | Example | When to Use |
|---------|---------|-------------|
| Local State | `useState()` | Component-specific state |
| Context | `useContext(AuthContext)` | Share state across components |
| URL State | `useSearchParams()` | State that should persist in URL |
| Local Storage | `useLocalStorage()` | Persist state across sessions |
| Server State | `useSWR()` or `useQuery()` | Data from API |

---

### Form Validation Rules

| Field | Validation | Error Message |
|-------|------------|---------------|
| Email | Valid email format | "Please enter a valid email address" |
| Phone | 10 digits, starts with 6-9 | "Please enter a valid 10-digit phone number" |
| Password | Min 6 characters | "Password must be at least 6 characters" |
| Name | Min 2 characters, letters only | "Please enter a valid name" |
| Age | Number between 10-20 | "Age must be between 10 and 20" |
| Grade | Number between 8-12 | "Grade must be between 8 and 12" |

---

### Responsive Breakpoints

| Breakpoint | Width | Device | Tailwind Class |
|------------|-------|--------|----------------|
| xs | < 640px | Mobile | Default |
| sm | ≥ 640px | Large Mobile | `sm:` |
| md | ≥ 768px | Tablet | `md:` |
| lg | ≥ 1024px | Desktop | `lg:` |
| xl | ≥ 1280px | Large Desktop | `xl:` |
| 2xl | ≥ 1536px | Extra Large | `2xl:` |

---

## 🔗 Useful Links

### Documentation
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Firebase Web SDK**: https://firebase.google.com/docs/web/setup
- **Recharts**: https://recharts.org/en-US/
- **Razorpay Checkout**: https://razorpay.com/docs/payments/payment-gateway/web-integration/

### Tools
- **React DevTools**: https://react.dev/learn/react-developer-tools
- **Firebase Console**: https://console.firebase.google.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Can I Use**: https://caniuse.com/

### UI Libraries
- **shadcn/ui**: https://ui.shadcn.com/
- **Radix UI**: https://www.radix-ui.com/
- **Headless UI**: https://headlessui.com/
- **Lucide Icons**: https://lucide.dev/

---

## 📞 Support and Troubleshooting

### Getting Help

1. **Check this appendix** for common issues and solutions
2. **Review task-specific TROUBLESHOOTING.md** files
3. **Check browser console** for error messages
4. **Check network tab** for failed API calls
5. **Verify environment variables** are set correctly
6. **Test with mock API** to isolate frontend vs backend issues

### Debug Checklist

When something doesn't work:
- [ ] Dev server is running (`npm run dev`)
- [ ] All environment variables are set in `.env.local`
- [ ] Firebase configuration is correct
- [ ] Backend API is accessible (or mock API is running)
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls
- [ ] Component props are passed correctly
- [ ] State is updating as expected
- [ ] No TypeScript errors (`npm run type-check`)

### Common Debug Commands

```bash
# Check if dev server is running
curl http://localhost:3000

# Check environment variables
cat .env.local

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Test API connection
curl http://localhost:8000/health
```

---

## 📝 Notes

- All dates are in ISO 8601 format (UTC)
- All authenticated requests require Bearer token in Authorization header
- Use mock API for standalone frontend development
- Test responsive design on mobile, tablet, and desktop
- Optimize images using Next.js Image component
- Enable TypeScript strict mode for better type safety
- Use Tailwind CSS for styling (avoid inline styles)
- Follow React best practices (hooks, functional components)
- Implement proper error boundaries for production
- Add loading states for all async operations
- Use proper semantic HTML for accessibility
- Test keyboard navigation and screen readers

---

**Last Updated**: November 25, 2025

**For backend integration**, see: `tushar-backend/APPENDIX-backend.md`

**For API contract details**, see: `shared/API-CONTRACT.md`

**For complete tutorial**, see: `README.md`

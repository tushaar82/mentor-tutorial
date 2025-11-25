# Configuration Guide: Payment UI Setup

## Overview

This guide walks you through setting up Razorpay Checkout SDK, environment variables, and testing configuration for the payment UI.

---

## Step 1: Install Dependencies

### What You're Doing
Installing required npm packages for payment integration.

### Commands
```bash
# Navigate to frontend directory
cd vaishnavi-frontend

# Install axios for API calls (if not already installed)
npm install axios

# Install date-fns for date formatting (optional)
npm install date-fns

# Install react-icons for icons (if not already installed)
npm install react-icons
```

### Verification
```bash
# Check package.json includes the packages
cat package.json | grep axios
cat package.json | grep react-icons
```

### Expected Output
```
"axios": "^1.6.0",
"react-icons": "^4.11.0",
```

---

## Step 2: Set Up Environment Variables

### What You're Doing
Configuring Razorpay key and backend API URL.

### Action
**Create or update** `.env.local` file in `vaishnavi-frontend/` directory:

```bash
# Create .env.local file
touch .env.local
```

**Add these variables**:
```env
# Razorpay Configuration (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_NAME=Mentor AI
```

### Where to Get Razorpay Key ID

**Option 1: Use Test Key (Recommended for Day 9)**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign in or create account
3. Navigate to **Settings** → **API Keys**
4. Under **Test Mode**, find **Key Id**
5. Copy the key (starts with `rzp_test_`)
6. Paste into `.env.local`

**Option 2: Use Mock Key (If backend not ready)**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_mock_key_for_testing
```

### Important Notes
- ✅ **DO** use `NEXT_PUBLIC_` prefix (required for Next.js client-side access)
- ✅ **DO** use test key (`rzp_test_`) for development
- ❌ **DON'T** commit `.env.local` to Git (add to `.gitignore`)
- ❌ **DON'T** use live key (`rzp_live_`) until production-ready

### Verification
```bash
# Check .env.local exists and has correct variables
cat .env.local
```

### Expected Output
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Mentor AI
```

---

## Step 3: Update .gitignore

### What You're Doing
Ensuring environment variables are not committed to Git.

### Action
**Open** `.gitignore` file and ensure it includes:

```gitignore
# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Verification
```bash
# Check .gitignore includes .env.local
cat .gitignore | grep .env.local
```

---

## Step 4: Configure Razorpay SDK Loading

### What You're Doing
Ensuring Razorpay SDK loads correctly in your Next.js app.

### Action
**Option 1: Load via useRazorpay hook** (Recommended - already done in PROMPTS.md)
- The `useRazorpay` hook dynamically loads the SDK
- No additional configuration needed

**Option 2: Load via Script tag in _document.tsx** (Alternative)

**Create/Update** `pages/_document.tsx`:

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Razorpay Checkout SDK */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Verification
- Start dev server: `npm run dev`
- Open browser console
- Check for Razorpay object: `console.log(window.Razorpay)`
- Should see Razorpay constructor function

---

## Step 5: Set Up Mock Backend (For Standalone Testing)

### What You're Doing
Creating a mock API server to test payment UI without real backend.

### Action
**Create** `mock-data/mock-payment-api.js`:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock subscription plans
const plans = [
  {
    plan_id: 'free',
    name: 'Free Plan',
    price: 0,
    duration_days: 365,
    features: ['1 diagnostic test', 'Basic analytics', '50 practice questions/month'],
    currency: 'INR',
    is_active: true
  },
  {
    plan_id: 'premium_monthly',
    name: 'Premium Monthly',
    price: 99900,
    duration_days: 30,
    features: ['Unlimited tests', 'Advanced analytics', 'Unlimited practice', 'Personalized schedules'],
    currency: 'INR',
    is_active: true
  },
  {
    plan_id: 'premium_yearly',
    name: 'Premium Yearly',
    price: 999900,
    duration_days: 365,
    features: ['All Premium features', 'Priority support', 'Success manager'],
    currency: 'INR',
    is_active: true
  }
];

// GET /api/payment/plans
app.get('/api/payment/plans', (req, res) => {
  res.json(plans);
});

// POST /api/payment/create-order
app.post('/api/payment/create-order', (req, res) => {
  const { parent_id, plan_id } = req.body;
  const plan = plans.find(p => p.plan_id === plan_id);
  
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  res.status(201).json({
    order_id: `order_mock_${Date.now()}`,
    amount: plan.price,
    currency: plan.currency,
    receipt: `rcpt_${Date.now()}`,
    created_at: new Date().toISOString()
  });
});

// POST /api/payment/verify
app.post('/api/payment/verify', (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  
  // Mock verification (always succeeds)
  res.json({
    subscription_id: `sub_mock_${Date.now()}`,
    parent_id: 'parent_123',
    plan_id: 'premium_monthly',
    status: 'active',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    auto_renew: true
  });
});

// GET /api/payment/subscription/:parentId
app.get('/api/payment/subscription/:parentId', (req, res) => {
  res.json({
    is_active: true,
    plan_name: 'Premium Monthly',
    plan_id: 'premium_monthly',
    days_remaining: 25,
    expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    features: ['Unlimited tests', 'Advanced analytics', 'Unlimited practice']
  });
});

// GET /api/payment/transactions/:parentId
app.get('/api/payment/transactions/:parentId', (req, res) => {
  res.json([
    {
      transaction_id: 'txn_001',
      parent_id: req.params.parentId,
      order_id: 'order_123',
      payment_id: 'pay_123',
      amount: 99900,
      currency: 'INR',
      status: 'completed',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Mock payment API running on http://localhost:${PORT}`);
});
```

### Install Express (if needed)
```bash
npm install express cors
```

### Start Mock Server
```bash
node mock-data/mock-payment-api.js
```

### Verification
```bash
# Test plans endpoint
curl http://localhost:8000/api/payment/plans

# Should return array of plans
```

---

## Step 6: Configure TypeScript (If Needed)

### What You're Doing
Ensuring TypeScript recognizes Razorpay types.

### Action
**Create** `types/razorpay.d.ts`:

```typescript
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
```

### Verification
- TypeScript should not show errors for `window.Razorpay`
- IDE should provide autocomplete for Razorpay options

---

## Step 7: Test Configuration

### What You're Doing
Verifying all configuration is correct.

### Action
**Start dev server**:
```bash
npm run dev
```

**Open browser**: `http://localhost:3000`

**Open browser console** and run:
```javascript
// Check environment variables
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
console.log(process.env.NEXT_PUBLIC_API_URL);

// Check Razorpay SDK loaded
console.log(typeof window.Razorpay);
```

### Expected Output
```
rzp_test_xxxxxxxxxxxxxxxx
http://localhost:8000
function
```

---

## Step 8: Configure CORS (If Using Real Backend)

### What You're Doing
Ensuring backend allows requests from frontend.

### Action
**Backend must have CORS configured** to allow `http://localhost:3000`:

```python
# In backend main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Verification
- Make API call from frontend
- Should not see CORS errors in browser console

---

## Troubleshooting

### Issue 1: Razorpay SDK Not Loading

**Symptoms**: `window.Razorpay is undefined`

**Solutions**:
1. Check internet connection (SDK loads from CDN)
2. Check browser console for loading errors
3. Try loading SDK via `_document.tsx` instead of hook
4. Clear browser cache and reload

### Issue 2: Environment Variables Not Working

**Symptoms**: `process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID` is undefined

**Solutions**:
1. Ensure variable name starts with `NEXT_PUBLIC_`
2. Restart dev server after changing `.env.local`
3. Check `.env.local` is in root directory (not in subdirectory)
4. Check no typos in variable names

### Issue 3: CORS Errors

**Symptoms**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solutions**:
1. Ensure backend has CORS middleware configured
2. Check backend allows `http://localhost:3000`
3. Use mock API server for standalone testing

### Issue 4: Mock API Not Starting

**Symptoms**: "Cannot find module 'express'"

**Solutions**:
1. Install express: `npm install express cors`
2. Check Node.js is installed: `node --version`
3. Run from correct directory

---

## Configuration Checklist

Before proceeding to testing, verify:

- [ ] Dependencies installed (axios, react-icons)
- [ ] `.env.local` created with Razorpay key and API URL
- [ ] `.gitignore` includes `.env.local`
- [ ] Razorpay SDK loading (via hook or script tag)
- [ ] Mock API server running (if testing standalone)
- [ ] TypeScript types configured (no errors)
- [ ] Dev server starts without errors
- [ ] Environment variables accessible in browser console
- [ ] CORS configured (if using real backend)

---

## Next Steps

Once configuration is complete:
1. Proceed to **TESTING.md** to test payment UI
2. Test with mock backend first
3. Then test with real backend (if available)
4. Finally test with Razorpay test mode

Configuration complete! Ready to test! 🎉

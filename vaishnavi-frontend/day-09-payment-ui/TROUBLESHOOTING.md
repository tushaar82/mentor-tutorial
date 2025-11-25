# Troubleshooting Guide: Payment UI

## Overview

This guide helps you diagnose and fix common issues with the payment UI implementation.

---

## Issue 1: Razorpay SDK Not Loading

### Symptoms
- `window.Razorpay is undefined` in browser console
- Razorpay checkout doesn't open
- Error: "Razorpay is not defined"

### Possible Causes
1. Internet connection issue (SDK loads from CDN)
2. Browser blocking third-party scripts
3. Incorrect SDK URL
4. useRazorpay hook not loading SDK correctly

### Solutions

**Solution 1: Check Internet Connection**
```bash
# Test CDN connectivity
curl https://checkout.razorpay.com/v1/checkout.js
```
- Should return JavaScript code
- If fails, check internet connection

**Solution 2: Check Browser Console**
- Open browser dev tools (F12)
- Go to Console tab
- Look for loading errors
- Check Network tab for failed requests

**Solution 3: Load SDK via Script Tag**
- Open `pages/_document.tsx`
- Add script tag in `<Head>`:
```typescript
<script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
```
- Restart dev server

**Solution 4: Check useRazorpay Hook**
- Open `hooks/useRazorpay.ts`
- Verify SDK loading logic:
```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => setIsLoaded(true);
  script.onerror = () => setError('Failed to load Razorpay SDK');
  document.body.appendChild(script);
}, []);
```

**Solution 5: Clear Browser Cache**
- Clear browser cache and cookies
- Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Issue 2: Environment Variables Not Working

### Symptoms
- `process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID` is undefined
- Razorpay key not found
- API URL not configured

### Possible Causes
1. Variable name doesn't start with `NEXT_PUBLIC_`
2. `.env.local` file not in root directory
3. Dev server not restarted after changing `.env.local`
4. Typo in variable name

### Solutions

**Solution 1: Check Variable Names**
- Open `.env.local`
- Ensure all variables start with `NEXT_PUBLIC_`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Solution 2: Check File Location**
```bash
# .env.local should be in root directory
ls -la .env.local

# Should show:
# -rw-r--r-- 1 user user 123 Nov 25 14:30 .env.local
```

**Solution 3: Restart Dev Server**
```bash
# Stop dev server (Ctrl+C)
# Start again
npm run dev
```

**Solution 4: Verify in Browser Console**
```javascript
// Open browser console
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
// Should show: rzp_test_xxxxx
```

**Solution 5: Check for Typos**
- Variable names are case-sensitive
- No spaces around `=`
- No quotes needed (unless value has spaces)

---

## Issue 3: Plans Not Displaying

### Symptoms
- Plans page shows loading forever
- Empty page with no plans
- Error: "Failed to fetch plans"

### Possible Causes
1. Mock API server not running
2. Backend API not accessible
3. CORS error
4. Wrong API endpoint
5. Network error

### Solutions

**Solution 1: Check Mock API Server**
```bash
# Start mock API server
node mock-data/mock-payment-api.js

# Should show:
# Mock payment API running on http://localhost:8000
```

**Solution 2: Test API Endpoint**
```bash
# Test plans endpoint
curl http://localhost:8000/api/payment/plans

# Should return JSON array of plans
```

**Solution 3: Check Browser Console**
- Open browser dev tools (F12)
- Go to Console tab
- Look for errors:
  - CORS errors
  - Network errors
  - 404 errors

**Solution 4: Check Network Tab**
- Open browser dev tools (F12)
- Go to Network tab
- Reload page
- Look for `/api/payment/plans` request
- Check status code (should be 200)
- Check response (should be JSON array)

**Solution 5: Check API URL**
- Open `.env.local`
- Verify `NEXT_PUBLIC_API_URL=http://localhost:8000`
- No trailing slash
- Correct port number

**Solution 6: Check CORS**
- If using real backend, ensure CORS configured:
```python
# In backend main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Issue 4: Payment Modal Not Opening

### Symptoms
- Click "Select Plan" but nothing happens
- Modal doesn't appear
- No errors in console

### Possible Causes
1. Modal state not updating
2. Modal component not rendering
3. Z-index issue (modal behind other elements)
4. JavaScript error preventing modal

### Solutions

**Solution 1: Check Browser Console**
- Look for JavaScript errors
- Fix any errors before modal opens

**Solution 2: Check Modal State**
- Add console.log in component:
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);

const handleSelectPlan = (planId: string) => {
  console.log('Opening modal for plan:', planId);
  setIsModalOpen(true);
};
```

**Solution 3: Check Modal Component**
- Verify PaymentModal is imported and rendered:
```typescript
{isModalOpen && (
  <PaymentModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    plan={selectedPlan}
    onConfirm={handleConfirm}
  />
)}
```

**Solution 4: Check Z-Index**
- Modal should have high z-index:
```css
.modal-overlay {
  z-index: 9999;
}
```

**Solution 5: Check Tailwind Config**
- Ensure Tailwind is processing modal component:
```javascript
// tailwind.config.js
content: [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
],
```

---

## Issue 5: Razorpay Checkout Not Opening

### Symptoms
- Order created successfully
- But Razorpay modal doesn't open
- No errors in console

### Possible Causes
1. Razorpay SDK not loaded
2. Invalid Razorpay key
3. Incorrect Razorpay options
4. JavaScript error in useRazorpay hook

### Solutions

**Solution 1: Check Razorpay SDK**
```javascript
// In browser console
console.log(typeof window.Razorpay);
// Should show: "function"
```

**Solution 2: Check Razorpay Key**
- Open `.env.local`
- Verify key starts with `rzp_test_` (test mode)
- No extra spaces or quotes

**Solution 3: Check Razorpay Options**
```typescript
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: orderData.amount, // in paise
  currency: orderData.currency,
  order_id: orderData.order_id,
  name: 'Mentor AI',
  handler: (response) => {
    console.log('Payment success:', response);
  },
};

console.log('Razorpay options:', options);
```

**Solution 4: Check for Errors**
- Wrap Razorpay initialization in try-catch:
```typescript
try {
  const rzp = new window.Razorpay(options);
  rzp.open();
} catch (error) {
  console.error('Razorpay error:', error);
}
```

---

## Issue 6: Payment Verification Fails

### Symptoms
- Payment succeeds in Razorpay
- But verification fails on backend
- Error: "Invalid signature"

### Possible Causes
1. Signature verification logic incorrect
2. Wrong Razorpay secret key on backend
3. Order ID mismatch
4. Network error during verification

### Solutions

**Solution 1: Check Backend Logs**
- Look at backend console for errors
- Check signature verification logic

**Solution 2: Check Razorpay Keys Match**
- Frontend uses `key_id`
- Backend uses `key_secret`
- Both should be from same Razorpay account
- Both should be test keys (or both live keys)

**Solution 3: Check Verification Request**
```javascript
// In browser console, check request
console.log('Verification request:', {
  order_id: response.razorpay_order_id,
  payment_id: response.razorpay_payment_id,
  signature: response.razorpay_signature,
});
```

**Solution 4: Test with Mock Backend**
- Mock backend always returns success
- Use to isolate frontend issues

---

## Issue 7: Subscription Status Not Updating

### Symptoms
- Payment succeeds
- But subscription status still shows "Free"
- Premium features still locked

### Possible Causes
1. Subscription not activated on backend
2. Frontend not refreshing subscription data
3. Cache issue
4. API error

### Solutions

**Solution 1: Check Backend Response**
- After payment verification, check response:
```javascript
console.log('Subscription activated:', subscriptionData);
```

**Solution 2: Refresh Subscription Data**
- Call `refreshSubscription()` after payment:
```typescript
const { refreshSubscription } = useSubscription();

const handlePaymentSuccess = async () => {
  await verifyPayment();
  await refreshSubscription(); // Refresh subscription data
};
```

**Solution 3: Clear Cache**
- Clear browser cache
- Or use cache-busting:
```typescript
const getSubscription = async () => {
  const response = await fetch(`/api/subscription?t=${Date.now()}`);
};
```

**Solution 4: Check API Call**
- Verify subscription API is called after payment
- Check Network tab for `/api/payment/subscription` request

---

## Issue 8: CORS Errors

### Symptoms
- Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
- API calls fail with CORS error
- Network tab shows CORS error

### Possible Causes
1. Backend CORS not configured
2. Wrong origin in CORS config
3. Credentials not included in request

### Solutions

**Solution 1: Configure Backend CORS**
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

**Solution 2: Check Frontend Origin**
- Ensure frontend runs on `http://localhost:3000`
- Match origin in backend CORS config

**Solution 3: Include Credentials**
```typescript
// In paymentService.ts
const response = await axios.get('/api/payment/plans', {
  withCredentials: true,
});
```

**Solution 4: Use Mock API**
- Mock API has CORS enabled by default
- Use for standalone testing

---

## Issue 9: Responsive Design Broken

### Symptoms
- Layout broken on mobile
- Plans overlap
- Text too small
- Horizontal scrolling

### Possible Causes
1. Missing responsive classes
2. Fixed widths instead of responsive
3. Tailwind not processing correctly

### Solutions

**Solution 1: Use Responsive Classes**
```typescript
// Instead of fixed width
<div className="w-96"> // ❌

// Use responsive width
<div className="w-full md:w-96"> // ✅
```

**Solution 2: Test on Different Sizes**
- Open browser dev tools (F12)
- Toggle device toolbar
- Test on: 375px, 768px, 1024px

**Solution 3: Check Tailwind Config**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
};
```

**Solution 4: Use Grid for Plans**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {plans.map(plan => <PlanCard key={plan.plan_id} plan={plan} />)}
</div>
```

---

## Issue 10: TypeScript Errors

### Symptoms
- Red squiggly lines in IDE
- Build fails with TypeScript errors
- Type errors in console

### Possible Causes
1. Missing type definitions
2. Incorrect types
3. Missing imports

### Solutions

**Solution 1: Check Type Definitions**
- Ensure `types/payment.ts` exists
- All interfaces exported

**Solution 2: Import Types**
```typescript
import { SubscriptionPlan, OrderResponse } from '@/types/payment';
```

**Solution 3: Check Razorpay Types**
- Ensure `types/razorpay.d.ts` exists
- Window interface extended

**Solution 4: Run Type Check**
```bash
npm run type-check
# or
npx tsc --noEmit
```

**Solution 5: Fix Common Type Errors**
```typescript
// ❌ Wrong
const plan: any = selectedPlan;

// ✅ Correct
const plan: SubscriptionPlan | null = selectedPlan;
```

---

## Issue 11: Mock API Not Working

### Symptoms
- Mock API server won't start
- Error: "Cannot find module 'express'"
- Port already in use

### Possible Causes
1. Express not installed
2. Port 8000 already in use
3. Node.js not installed

### Solutions

**Solution 1: Install Express**
```bash
npm install express cors
```

**Solution 2: Check Port**
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill process using port
kill -9 <PID>
```

**Solution 3: Use Different Port**
```javascript
// In mock-payment-api.js
const PORT = 8001; // Change port
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
```

**Solution 4: Check Node.js**
```bash
node --version
# Should show v18.0.0 or higher
```

---

## Issue 12: Payment Success But No Confirmation

### Symptoms
- Payment succeeds in Razorpay
- Modal closes
- But no success message shown

### Possible Causes
1. Success callback not triggered
2. Success state not updating
3. Success modal not rendering

### Solutions

**Solution 1: Check Success Callback**
```typescript
const handlePaymentSuccess = (response: RazorpayResponse) => {
  console.log('Payment success callback:', response);
  setPaymentSuccess(true);
  setSuccessData(response);
};
```

**Solution 2: Check Success State**
```typescript
const [paymentSuccess, setPaymentSuccess] = useState(false);

{paymentSuccess && (
  <SuccessModal
    isOpen={paymentSuccess}
    onClose={() => setPaymentSuccess(false)}
    data={successData}
  />
)}
```

**Solution 3: Add Logging**
```typescript
useEffect(() => {
  console.log('Payment success state:', paymentSuccess);
}, [paymentSuccess]);
```

---

## Debugging Checklist

When encountering issues, check:

- [ ] Browser console for errors
- [ ] Network tab for failed requests
- [ ] Environment variables loaded correctly
- [ ] Mock API server running (if testing standalone)
- [ ] Backend API accessible (if testing with real backend)
- [ ] Razorpay SDK loaded
- [ ] CORS configured correctly
- [ ] TypeScript compiling without errors
- [ ] All dependencies installed
- [ ] Dev server restarted after config changes

---

## Getting Help

If issues persist:

1. **Check Browser Console**: Most errors show here
2. **Check Network Tab**: See API requests and responses
3. **Add Console Logs**: Debug state and data flow
4. **Test with Mock API**: Isolate frontend issues
5. **Check Backend Logs**: See backend errors
6. **Review Documentation**: Re-read PROMPTS.md and CONFIGURATION.md
7. **Ask for Help**: Provide error messages and steps to reproduce

---

## Common Error Messages

### "Razorpay is not defined"
- **Cause**: SDK not loaded
- **Fix**: Check useRazorpay hook, verify SDK URL

### "CORS policy error"
- **Cause**: Backend CORS not configured
- **Fix**: Add CORS middleware to backend

### "Invalid signature"
- **Cause**: Signature verification failed
- **Fix**: Check Razorpay keys match on frontend and backend

### "Network Error"
- **Cause**: API not accessible
- **Fix**: Check API URL, ensure backend/mock API running

### "Cannot read property of undefined"
- **Cause**: Data not loaded yet
- **Fix**: Add loading state, check for null/undefined

---

## Prevention Tips

1. **Always check browser console** before and after actions
2. **Test with mock API first** before real backend
3. **Use TypeScript** to catch errors early
4. **Add error boundaries** to prevent app crashes
5. **Log important data** for debugging
6. **Test on multiple browsers** (Chrome, Firefox, Safari)
7. **Test responsive design** on different screen sizes
8. **Handle all error cases** gracefully

---

Troubleshooting complete! Most issues can be resolved by checking browser console and Network tab. 🔧✨

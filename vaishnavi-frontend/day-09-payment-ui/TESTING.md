# Testing Guide: Payment UI

## Overview

This guide provides step-by-step instructions to test the payment UI with mock backend, real backend, and Razorpay test mode.

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ Configuration completed (CONFIGURATION.md)
- ✅ Dev server running: `npm run dev`
- ✅ Mock API server running (for standalone testing)

---

## Test 1: View Subscription Plans

### Purpose
Verify plans display correctly with pricing and features.

### Steps
1. Start dev server: `npm run dev`
2. Start mock API (if testing standalone): `node mock-data/mock-payment-api.js`
3. Open browser: `http://localhost:3000/plans`
4. You should see 3 plan cards: Free, Premium Monthly, Premium Yearly

### Expected Result
```
┌─────────────────────────────────────────────────────┐
│              Choose Your Plan                        │
├─────────────────────────────────────────────────────┤
│  FREE          │  PREMIUM MONTHLY  │  PREMIUM YEARLY │
│  ₹0/forever    │  ₹999/month       │  ₹9,999/year    │
│                │  [RECOMMENDED]    │  (Save 16.7%)   │
├────────────────┼───────────────────┼─────────────────┤
│ • 1 test       │ • Unlimited tests │ • All Premium   │
│ • Basic        │ • Advanced AI     │   Monthly       │
│   analytics    │   analytics       │ • Priority      │
│ • 50 practice  │ • Unlimited       │   support       │
│   questions    │   practice        │                 │
│                │ • Personalized    │                 │
│                │   schedules       │                 │
│                │                   │                 │
│  [Current]     │  [Select Plan]    │  [Select Plan]  │
└────────────────┴───────────────────┴─────────────────┘
```

### Verification Checklist
- [ ] All 3 plans displayed
- [ ] Prices formatted correctly (₹999, not 99900)
- [ ] Premium Monthly has "Recommended" badge
- [ ] Features list shows for each plan
- [ ] Savings percentage shown for yearly plan
- [ ] Responsive design (test on mobile width)
- [ ] Select buttons visible and clickable

### If It Fails
- **No plans shown**: Check mock API is running, check browser console for errors
- **Prices wrong**: Check formatCurrency function in utils/paymentUtils.ts
- **Layout broken**: Check Tailwind CSS classes, check responsive breakpoints

---

## Test 2: Select Plan and Open Payment Modal

### Purpose
Verify plan selection opens confirmation modal.

### Steps
1. On plans page, click "Select Plan" on Premium Monthly
2. Payment confirmation modal should open
3. Modal should show:
   - Plan name: "Premium Monthly"
   - Price: "₹999"
   - Billing: "Monthly"
   - Features list
   - Total: "₹999"
   - Cancel and Proceed buttons

### Expected Result
```
┌─────────────────────────────────────────┐
│        Confirm Your Purchase             │
├─────────────────────────────────────────┤
│  Plan: Premium Monthly                   │
│  Price: ₹999/month                       │
│  Billing: Monthly (auto-renew)           │
│                                          │
│  Features Included:                      │
│  ✓ Unlimited diagnostic tests            │
│  ✓ Advanced AI analytics                 │
│  ✓ Unlimited practice questions          │
│  ✓ Personalized study schedules          │
│                                          │
│  Total: ₹999                             │
│                                          │
│  [Cancel]  [Proceed to Payment]          │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Modal opens on button click
- [ ] Modal shows correct plan details
- [ ] Cancel button closes modal
- [ ] Proceed button is enabled
- [ ] Modal overlay darkens background
- [ ] ESC key closes modal
- [ ] Click outside modal closes it

### If It Fails
- **Modal doesn't open**: Check PaymentModal component, check state management
- **Wrong plan shown**: Check plan selection state
- **Buttons don't work**: Check onClick handlers

---

## Test 3: Create Payment Order (Mock Backend)

### Purpose
Verify order creation API call works.

### Steps
1. In payment modal, click "Proceed to Payment"
2. Watch browser console for API call
3. Should see POST request to `/api/payment/create-order`
4. Should receive order_id, amount, currency

### Expected Result (Browser Console)
```
POST http://localhost:8000/api/payment/create-order
Request: { parent_id: "parent_123", plan_id: "premium_monthly" }
Response: {
  order_id: "order_mock_1234567890",
  amount: 99900,
  currency: "INR",
  receipt: "rcpt_1234567890",
  created_at: "2024-11-25T14:30:00Z"
}
```

### Verification Checklist
- [ ] API call made to correct endpoint
- [ ] Request includes parent_id and plan_id
- [ ] Response includes order_id
- [ ] Amount is in paise (99900, not 999)
- [ ] No errors in console

### If It Fails
- **Network error**: Check mock API is running, check API URL in .env.local
- **404 error**: Check endpoint path matches backend
- **CORS error**: Check backend CORS configuration

---

## Test 4: Open Razorpay Checkout (Test Mode)

### Purpose
Verify Razorpay modal opens with correct details.

### Steps
1. After order creation, Razorpay checkout should open automatically
2. Razorpay modal should show:
   - Merchant name: "Mentor AI"
   - Amount: "₹999.00"
   - Payment options: Card, UPI, Netbanking, Wallet

### Expected Result
```
┌─────────────────────────────────────────┐
│         Razorpay Secure Checkout         │
├─────────────────────────────────────────┤
│  Mentor AI                               │
│  ₹999.00                                 │
│                                          │
│  Pay Using:                              │
│  ○ Card                                  │
│  ○ UPI                                   │
│  ○ Netbanking                            │
│  ○ Wallet                                │
│                                          │
│  [Selected: Card]                        │
│                                          │
│  Card Number: [________________]         │
│  Expiry: [MM/YY]  CVV: [___]            │
│  Name: [_____________________]           │
│                                          │
│  [Pay ₹999]                              │
│                                          │
│  🔒 Secured by Razorpay                  │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Razorpay modal opens
- [ ] Correct merchant name shown
- [ ] Correct amount shown
- [ ] Payment options available
- [ ] Modal is responsive
- [ ] Close button works

### If It Fails
- **Modal doesn't open**: Check Razorpay SDK loaded, check useRazorpay hook
- **Wrong amount**: Check amount conversion (paise to rupees)
- **SDK error**: Check Razorpay key in .env.local, check browser console

---

## Test 5: Complete Payment (Test Mode)

### Purpose
Verify payment success flow with Razorpay test card.

### Steps
1. In Razorpay modal, select "Card" payment method
2. Enter test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25` (any future date)
   - Name: `Test User`
3. Click "Pay ₹999"
4. Payment should succeed
5. Success callback should trigger
6. Verify payment API should be called
7. Success message should show

### Expected Result
```
┌─────────────────────────────────────────┐
│        Payment Successful! 🎉            │
├─────────────────────────────────────────┤
│  Thank you for upgrading to Premium!     │
│                                          │
│  Your subscription is now active.        │
│                                          │
│  Plan: Premium Monthly                   │
│  Valid until: December 25, 2024          │
│                                          │
│  You now have access to:                 │
│  ✓ Unlimited diagnostic tests            │
│  ✓ Advanced AI analytics                 │
│  ✓ Unlimited practice questions          │
│  ✓ Personalized study schedules          │
│                                          │
│  [Start Using Premium Features]          │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Payment succeeds with test card
- [ ] Success callback triggered
- [ ] Verify API called with payment_id, order_id, signature
- [ ] Success message displayed
- [ ] Subscription status updated
- [ ] User redirected to dashboard or premium features

### If It Fails
- **Payment fails**: Check test card details, check Razorpay test mode
- **Success callback not triggered**: Check handler in useRazorpay hook
- **Verify API fails**: Check backend signature verification
- **No success message**: Check success state handling

---

## Test 6: Payment Failure Handling

### Purpose
Verify error handling for failed payments.

### Steps
1. In Razorpay modal, click close button (X) without paying
2. Or use invalid card details
3. Error callback should trigger
4. Error message should show

### Expected Result
```
┌─────────────────────────────────────────┐
│        Payment Cancelled ❌              │
├─────────────────────────────────────────┤
│  Your payment was not completed.         │
│                                          │
│  You can try again anytime.              │
│                                          │
│  [Try Again]  [Back to Plans]            │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Error callback triggered on modal close
- [ ] Error message displayed
- [ ] Try Again button works
- [ ] User can retry payment
- [ ] No subscription activated

### If It Fails
- **No error message**: Check modal.ondismiss handler
- **App crashes**: Check error handling in usePayment hook

---

## Test 7: View Subscription Status

### Purpose
Verify subscription status displays correctly.

### Steps
1. Navigate to `/subscription` page
2. Should show current subscription details
3. For active subscription, should show:
   - Status: Active (green badge)
   - Plan name and price
   - Next billing date
   - Days remaining
   - Features list
   - Manage button

### Expected Result
```
┌─────────────────────────────────────────┐
│        My Subscription                   │
├─────────────────────────────────────────┤
│  Status: Active ✓                        │
│  Plan: Premium Monthly                   │
│  Price: ₹999/month                       │
│                                          │
│  Next billing: December 25, 2024         │
│  Days remaining: 25 days                 │
│                                          │
│  [Progress bar: 83% complete]            │
│                                          │
│  Features:                               │
│  ✓ Unlimited diagnostic tests            │
│  ✓ Advanced AI analytics                 │
│  ✓ Unlimited practice questions          │
│                                          │
│  [Manage Subscription]                   │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Subscription status fetched on page load
- [ ] Status badge shows correct color
- [ ] Dates formatted correctly
- [ ] Days remaining calculated correctly
- [ ] Progress bar shows correct percentage
- [ ] Features list displayed

### If It Fails
- **No data shown**: Check API call, check mock API response
- **Wrong dates**: Check date formatting in utils
- **Wrong days remaining**: Check calculation in getDaysRemaining

---

## Test 8: View Transaction History

### Purpose
Verify transaction history displays correctly.

### Steps
1. On subscription page, scroll to transaction history section
2. Should show list of past transactions
3. Each transaction should show:
   - Date and time
   - Plan name
   - Amount
   - Status badge
   - Payment ID

### Expected Result
```
┌─────────────────────────────────────────┐
│      Transaction History                 │
├─────────────────────────────────────────┤
│  Nov 25, 2024 2:35 PM                    │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_XYZ123ABC               │
├─────────────────────────────────────────┤
│  Oct 25, 2024 3:20 PM                    │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_ABC789XYZ               │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Transactions fetched on page load
- [ ] Transactions sorted by date (newest first)
- [ ] Dates formatted correctly
- [ ] Amounts formatted correctly
- [ ] Status badges show correct colors
- [ ] Responsive design (table on desktop, cards on mobile)

### If It Fails
- **No transactions**: Check API call, check mock API response
- **Wrong order**: Check sorting logic
- **Layout broken**: Check responsive design

---

## Test 9: Premium Feature Gating

### Purpose
Verify free users see upgrade prompt for premium features.

### Steps
1. Log in as free user (or clear subscription)
2. Try to access premium feature (e.g., advanced analytics)
3. Should see upgrade prompt modal
4. Modal should show:
   - Lock icon
   - "Premium Feature" heading
   - Feature name
   - Benefits of premium
   - View Plans button

### Expected Result
```
┌─────────────────────────────────────────┐
│      Premium Feature 🔒                  │
├─────────────────────────────────────────┤
│  Advanced Analytics requires Premium     │
│                                          │
│  Upgrade to Premium to unlock:           │
│  ✓ Advanced AI analytics                 │
│  ✓ Personalized study schedules          │
│  ✓ Unlimited practice questions          │
│  ✓ Teaching resources                    │
│                                          │
│  Starting at ₹999/month                  │
│                                          │
│  [View Plans]  [Maybe Later]             │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Upgrade prompt shows for free users
- [ ] Premium users don't see prompt
- [ ] View Plans button navigates to plans page
- [ ] Maybe Later button closes modal
- [ ] Modal is attractive and encouraging

### If It Fails
- **Prompt doesn't show**: Check subscription status check
- **Premium users see prompt**: Check isPremium logic

---

## Test 10: Cancel Subscription

### Purpose
Verify subscription cancellation flow.

### Steps
1. On subscription page, click "Manage Subscription"
2. Click "Cancel Subscription"
3. Confirmation modal should open
4. Modal should show:
   - Warning icon
   - Explanation of cancellation
   - Access until end date
   - Keep and Cancel buttons
5. Click "Cancel Subscription"
6. Should call cancel API
7. Should show success message

### Expected Result
```
┌─────────────────────────────────────────┐
│    Subscription Cancelled                │
├─────────────────────────────────────────┤
│  Your subscription has been cancelled.   │
│                                          │
│  You will continue to have access to     │
│  Premium features until:                 │
│                                          │
│  December 25, 2024                       │
│                                          │
│  You can reactivate anytime.             │
│                                          │
│  [Close]                                 │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Confirmation modal opens
- [ ] Cancel API called on confirm
- [ ] Success message shown
- [ ] Subscription status updated
- [ ] Access remains until end date

### If It Fails
- **Modal doesn't open**: Check CancelSubscriptionModal component
- **API not called**: Check cancel function
- **Status not updated**: Check state refresh

---

## Test 11: Responsive Design

### Purpose
Verify UI works on mobile devices.

### Steps
1. Open browser dev tools (F12)
2. Toggle device toolbar (mobile view)
3. Test on different screen sizes:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1024px width
4. Test all pages: plans, subscription

### Verification Checklist
- [ ] Plans stack vertically on mobile
- [ ] Plans show 2 columns on tablet
- [ ] Plans show 3 columns on desktop
- [ ] Modals are responsive
- [ ] Buttons are touch-friendly (min 44px height)
- [ ] Text is readable on small screens
- [ ] No horizontal scrolling

### If It Fails
- **Layout broken**: Check Tailwind responsive classes (sm:, md:, lg:)
- **Text too small**: Increase font sizes for mobile
- **Buttons too small**: Increase padding and min-height

---

## Test 12: Error Handling

### Purpose
Verify error states are handled gracefully.

### Steps
1. Stop mock API server
2. Try to load plans page
3. Should show error message with retry button
4. Click retry
5. Should attempt to reload

### Expected Result
```
┌─────────────────────────────────────────┐
│        Failed to Load Plans              │
├─────────────────────────────────────────┤
│  Unable to connect to server.            │
│                                          │
│  Please check your internet connection   │
│  and try again.                          │
│                                          │
│  [Retry]                                 │
└─────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Error message shown on API failure
- [ ] Retry button works
- [ ] Loading state shown during retry
- [ ] User-friendly error messages
- [ ] No app crashes

### If It Fails
- **App crashes**: Add try-catch blocks
- **No error message**: Check error state handling
- **Retry doesn't work**: Check retry logic

---

## Integration Test: Complete Payment Flow

### Purpose
Test the entire payment flow end-to-end.

### Steps
1. Start as free user
2. Navigate to plans page
3. Select Premium Monthly
4. Confirm in modal
5. Complete payment with test card
6. Verify subscription activated
7. Access premium feature
8. View subscription status
9. View transaction history

### Expected Flow
```
Free User → View Plans → Select Plan → Confirm → Pay → Success → Premium Access → View Status → View History
```

### Verification Checklist
- [ ] Complete flow works without errors
- [ ] Each step transitions smoothly
- [ ] Data persists across pages
- [ ] Premium access granted immediately
- [ ] All UI updates correctly

---

## Testing Checklist

Before moving to next day, verify:

- [ ] All 12 tests passing
- [ ] Plans display correctly
- [ ] Payment modal works
- [ ] Razorpay integration works
- [ ] Payment success flow works
- [ ] Payment failure handled
- [ ] Subscription status displays
- [ ] Transaction history displays
- [ ] Premium feature gating works
- [ ] Cancellation flow works
- [ ] Responsive design works
- [ ] Error handling works
- [ ] Complete flow works end-to-end

---

## Next Steps

Once all tests pass:
1. Proceed to **EXPECTED-OUTCOME.md** to verify success criteria
2. Test with real backend (if available)
3. Move to Day 10: Firebase Hosting Deployment

Testing complete! Payment UI is working! 💳✨

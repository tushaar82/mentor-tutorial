# User Flow: Payment and Subscription

## Overview

This document describes the complete user journey for payment and subscription management in the Mentor AI platform, from plan selection to premium feature access.

---

## Flow 1: Parent Upgrades to Premium (Happy Path)

### Step 1: Parent Views Subscription Plans

**User Action**: Parent clicks "Upgrade to Premium" button in app

**Frontend**:
- Calls `GET /api/payment/plans`
- Displays plans in comparison table

**Backend**:
- Loads plans from `data/subscription_plans.json`
- Returns all active plans

**User Sees**:
```
┌─────────────────────────────────────────────────────┐
│              Choose Your Plan                        │
├─────────────────────────────────────────────────────┤
│  FREE          │  PREMIUM MONTHLY  │  PREMIUM YEARLY │
│  ₹0/forever    │  ₹999/month       │  ₹9,999/year    │
│                │                   │  (Save ₹2,889)  │
├────────────────┼───────────────────┼─────────────────┤
│ • 1 test       │ • Unlimited tests │ • All Premium   │
│ • Basic        │ • Advanced AI     │   Monthly       │
│   analytics    │   analytics       │ • Priority      │
│ • 50 practice  │ • Unlimited       │   support       │
│   questions    │   practice        │ • Success       │
│                │ • Personalized    │   manager       │
│                │   schedules       │                 │
│                │ • Teaching        │                 │
│                │   resources       │                 │
│                │                   │                 │
│  [Current]     │  [Select Plan]    │  [Select Plan]  │
└────────────────┴───────────────────┴─────────────────┘
```

---

### Step 2: Parent Selects Plan

**User Action**: Parent clicks "Select Plan" on Premium Monthly

**Frontend**:
- Stores selected plan_id: "premium_monthly"
- Shows payment confirmation screen

**User Sees**:
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
│  ✓ Teaching resources for parents        │
│  ✓ Priority support                      │
│                                          │
│  Total: ₹999                             │
│                                          │
│  [Cancel]  [Proceed to Payment]          │
└─────────────────────────────────────────┘
```

---

### Step 3: Create Payment Order

**User Action**: Parent clicks "Proceed to Payment"

**Frontend**:
- Calls `POST /api/payment/create-order`
- Sends: `{ parent_id, plan_id: "premium_monthly" }`

**Backend**:
1. Validates parent exists
2. Gets plan details (₹999 = 99900 paise)
3. Generates unique receipt ID
4. Calls Razorpay API to create order
5. Stores transaction (status: "pending")
6. Returns order details

**Response**:
```json
{
  "order_id": "order_MNOPqrstuvwxyz",
  "amount": 99900,
  "currency": "INR",
  "receipt": "rcpt_20241125_143022_ABCDE"
}
```

**User Sees**: Loading spinner "Processing..."

---

### Step 4: Open Razorpay Checkout

**Frontend**:
- Initializes Razorpay checkout with order_id
- Opens Razorpay payment modal

**User Sees**:
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

---

### Step 5: Parent Enters Payment Details

**User Action**: Parent enters card details and clicks "Pay"

**Test Card** (in test mode):
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: 12/25
- Name: Test User

**Razorpay**:
1. Validates card details
2. Processes payment (simulated in test mode)
3. Generates payment_id and signature
4. Returns to frontend

**User Sees**: "Processing payment..."

---

### Step 6: Payment Success

**Razorpay**:
- Returns success callback to frontend
- Provides: payment_id, order_id, signature

**Frontend**:
- Receives payment success
- Calls `POST /api/payment/verify`
- Sends: `{ order_id, payment_id, signature }`

**Backend**:
1. Verifies signature using HMAC-SHA256
2. Confirms payment is authentic
3. Activates subscription:
   - Creates subscription document
   - Sets status: "active"
   - Calculates end_date (30 days from now)
4. Updates transaction (status: "completed")
5. Returns subscription details

**Response**:
```json
{
  "subscription_id": "sub_ABC123XYZ",
  "parent_id": "parent_123",
  "plan_id": "premium_monthly",
  "status": "active",
  "start_date": "2024-11-25T14:35:00Z",
  "end_date": "2024-12-25T14:35:00Z"
}
```

**User Sees**:
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
│  ✓ Teaching resources                    │
│                                          │
│  [Start Using Premium Features]          │
└─────────────────────────────────────────┘
```

---

### Step 7: Access Premium Features

**User Action**: Parent navigates to premium feature (e.g., Advanced Analytics)

**Frontend**:
- Calls premium endpoint (e.g., `GET /api/analytics/advanced`)

**Backend**:
1. Checks authentication (user is logged in)
2. Applies `require_premium_subscription` middleware
3. Checks subscription status:
   - Status is "active"
   - end_date > current_date
4. Allows access to premium feature

**User Sees**: Premium feature content (analytics, schedules, etc.)

---

## Flow 2: Payment Failure

### Step 1-4: Same as Happy Path

### Step 5: Payment Fails

**User Action**: Parent enters invalid card or payment is declined

**Razorpay**:
- Payment processing fails
- Returns error callback to frontend

**Frontend**:
- Receives payment failure
- Does NOT call verify endpoint
- Shows error message

**User Sees**:
```
┌─────────────────────────────────────────┐
│        Payment Failed ❌                 │
├─────────────────────────────────────────┤
│  Your payment could not be processed.    │
│                                          │
│  Reason: Card declined by bank           │
│                                          │
│  Please try:                             │
│  • Using a different card                │
│  • Checking your card balance            │
│  • Contacting your bank                  │
│  • Using UPI or other payment method     │
│                                          │
│  [Try Again]  [Contact Support]          │
└─────────────────────────────────────────┘
```

**Backend**:
- Transaction remains "pending"
- No subscription activated
- Parent remains on free plan

---

## Flow 3: Free User Tries Premium Feature

### Step 1: Free User Accesses Premium Feature

**User Action**: Free user clicks on "Advanced Analytics" or other premium feature

**Frontend**:
- Calls premium endpoint

**Backend**:
1. Checks authentication (user is logged in)
2. Applies `require_premium_subscription` middleware
3. Checks subscription:
   - No subscription found OR
   - Subscription is "free" plan OR
   - Subscription expired
4. Returns 403 Forbidden

**Response**:
```json
{
  "detail": "Premium subscription required. Please upgrade to access this feature."
}
```

**Frontend**:
- Catches 403 error
- Shows upgrade prompt

**User Sees**:
```
┌─────────────────────────────────────────┐
│      Premium Feature 🔒                  │
├─────────────────────────────────────────┤
│  This feature is available for           │
│  Premium subscribers only.               │
│                                          │
│  Upgrade to Premium to unlock:           │
│  ✓ Advanced AI analytics                 │
│  ✓ Personalized study schedules          │
│  ✓ Unlimited practice questions          │
│  ✓ Teaching resources for parents        │
│  ✓ Priority support                      │
│                                          │
│  Starting at ₹999/month                  │
│                                          │
│  [View Plans]  [Maybe Later]             │
└─────────────────────────────────────────┘
```

---

## Flow 4: Check Subscription Status

### Step 1: Parent Views Subscription

**User Action**: Parent navigates to "My Subscription" page

**Frontend**:
- Calls `GET /api/payment/subscription/{parent_id}`

**Backend**:
1. Fetches subscription from Firestore
2. Checks if active (status == "active" AND end_date > now)
3. Calculates days_remaining
4. Returns subscription status

**Response** (Active Premium):
```json
{
  "is_active": true,
  "plan_name": "Premium Monthly",
  "plan_id": "premium_monthly",
  "days_remaining": 25,
  "expires_at": "2024-12-25T14:35:00Z",
  "features": [...]
}
```

**User Sees**:
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
│  Features:                               │
│  ✓ Unlimited diagnostic tests            │
│  ✓ Advanced AI analytics                 │
│  ✓ Unlimited practice questions          │
│  ✓ Personalized study schedules          │
│  ✓ Teaching resources                    │
│  ✓ Priority support                      │
│                                          │
│  [Manage Subscription]                   │
└─────────────────────────────────────────┘
```

---

## Flow 5: View Transaction History

### Step 1: Parent Views Transactions

**User Action**: Parent clicks "Transaction History"

**Frontend**:
- Calls `GET /api/payment/transactions/{parent_id}`

**Backend**:
1. Fetches all transactions for parent
2. Orders by created_at (newest first)
3. Returns transaction list

**Response**:
```json
[
  {
    "transaction_id": "txn_001",
    "order_id": "order_MNOPqrstuvwxyz",
    "payment_id": "pay_XYZ123ABC",
    "amount": 99900,
    "currency": "INR",
    "status": "completed",
    "created_at": "2024-11-25T14:30:22Z",
    "completed_at": "2024-11-25T14:35:00Z"
  }
]
```

**User Sees**:
```
┌─────────────────────────────────────────┐
│      Transaction History                 │
├─────────────────────────────────────────┤
│  Nov 25, 2024                            │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_XYZ123ABC               │
│  [View Receipt]                          │
├─────────────────────────────────────────┤
│  Oct 25, 2024                            │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_ABC789XYZ               │
│  [View Receipt]                          │
└─────────────────────────────────────────┘
```

---

## Flow 6: Cancel Subscription

### Step 1: Parent Cancels Subscription

**User Action**: Parent clicks "Cancel Subscription" → Confirms cancellation

**Frontend**:
- Shows confirmation dialog
- Calls `POST /api/payment/cancel/{parent_id}`

**Backend**:
1. Fetches current subscription
2. Updates status to "cancelled"
3. Sets auto_renew to false
4. Keeps end_date unchanged (access until expiration)
5. Returns updated subscription

**Response**:
```json
{
  "subscription_id": "sub_ABC123XYZ",
  "status": "cancelled",
  "end_date": "2024-12-25T14:35:00Z"
}
```

**User Sees**:
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
│  After this date, your account will      │
│  revert to the Free plan.                │
│                                          │
│  You can reactivate anytime before       │
│  the expiration date.                    │
│                                          │
│  [Reactivate]  [Close]                   │
└─────────────────────────────────────────┘
```

---

## Flow 7: Subscription Expires

### Step 1: Subscription Reaches End Date

**System**:
- Subscription end_date passes
- No automatic status update (checked on access)

### Step 2: Parent Tries to Access Premium Feature

**User Action**: Parent tries to access premium feature after expiration

**Backend**:
1. Checks subscription status
2. Finds end_date < current_date
3. Returns 403 Forbidden

**User Sees**:
```
┌─────────────────────────────────────────┐
│    Subscription Expired 🔒               │
├─────────────────────────────────────────┤
│  Your Premium subscription has expired.  │
│                                          │
│  Renew now to continue enjoying:         │
│  ✓ Unlimited diagnostic tests            │
│  ✓ Advanced AI analytics                 │
│  ✓ Personalized study schedules          │
│  ✓ Teaching resources                    │
│                                          │
│  [Renew Subscription]                    │
└─────────────────────────────────────────┘
```

---

## Flow Diagram

```
┌─────────────────┐
│  Parent Views   │
│  Plans          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Selects Plan   │
│  (Premium)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create Order   │──────► Backend: Create Razorpay order
│  (Backend)      │◄────── Returns: order_id, amount
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Razorpay       │
│  Checkout       │
│  (Frontend)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enter Payment  │
│  Details        │
└────────┬────────┘
         │
         ▼
    ┌────┴────┐
    │ Success?│
    └────┬────┘
         │
    ┌────┴────┐
    │   Yes   │   No
    ▼         ▼
┌─────────┐ ┌─────────┐
│ Verify  │ │ Show    │
│ Payment │ │ Error   │
└────┬────┘ └─────────┘
     │
     ▼
┌─────────────────┐
│  Activate       │──────► Backend: Verify signature
│  Subscription   │        Create subscription
│  (Backend)      │        Update transaction
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Access Premium │
│  Features       │
└─────────────────┘
```

---

## Key Touchpoints

### 1. Plan Selection
- **Goal**: Help parent choose right plan
- **UX**: Clear comparison, highlight savings
- **Backend**: Load plans from JSON

### 2. Payment Processing
- **Goal**: Secure, smooth payment
- **UX**: Razorpay trusted checkout
- **Backend**: Create order, verify signature

### 3. Subscription Activation
- **Goal**: Instant premium access
- **UX**: Success confirmation, clear benefits
- **Backend**: Activate subscription, grant access

### 4. Premium Access
- **Goal**: Seamless feature access
- **UX**: No friction for premium users
- **Backend**: Middleware checks subscription

### 5. Subscription Management
- **Goal**: Transparency and control
- **UX**: Clear status, easy cancellation
- **Backend**: Status checks, cancellation handling

---

## Error Scenarios

### Payment Declined
- **Cause**: Insufficient funds, card blocked
- **User Action**: Try different payment method
- **Backend**: Transaction remains pending

### Invalid Signature
- **Cause**: Tampering or network error
- **User Action**: Contact support
- **Backend**: Log security incident, reject payment

### Subscription Expired
- **Cause**: End date passed
- **User Action**: Renew subscription
- **Backend**: Deny premium access, show upgrade prompt

### Network Error
- **Cause**: Internet connection lost
- **User Action**: Retry payment
- **Backend**: Order remains valid for retry

---

## Success Metrics

- **Conversion Rate**: % of users who complete payment
- **Payment Success Rate**: % of payments that succeed
- **Subscription Retention**: % of users who renew
- **Feature Usage**: Premium feature engagement
- **Support Tickets**: Payment-related issues

---

This user flow ensures a smooth, secure, and transparent payment experience for parents upgrading to premium subscriptions! 💳✨

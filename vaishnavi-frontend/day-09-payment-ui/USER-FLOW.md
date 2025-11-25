# User Flow: Payment UI

## Overview

This document describes the complete user journey through the payment UI, from viewing subscription plans to managing subscriptions.

---

## Flow 1: Parent Upgrades to Premium (Happy Path)

### Step 1: Parent Discovers Premium Features

**User Action**: Parent sees "Upgrade to Premium" banner or tries to access premium feature

**UI State**: 
- Banner shows premium benefits
- Or upgrade prompt modal appears

**User Sees**:
```
┌─────────────────────────────────────────┐
│    🔒 Unlock Premium Features            │
├─────────────────────────────────────────┤
│  Get unlimited tests, advanced analytics,│
│  and personalized study schedules.       │
│                                          │
│  [View Plans]                            │
└─────────────────────────────────────────┘
```

---

### Step 2: Parent Views Subscription Plans

**User Action**: Parent clicks "View Plans" or navigates to `/plans`

**UI State**:
- Loading skeleton while fetching plans
- Then 3 plan cards displayed

**User Sees**:
```
┌─────────────────────────────────────────────────────┐
│              Choose Your Plan                        │
│         Find the perfect plan for your needs         │
├─────────────────────────────────────────────────────┤
│  FREE          │  PREMIUM MONTHLY  │  PREMIUM YEARLY │
│  ₹0/forever    │  ₹999/month       │  ₹9,999/year    │
│                │  [RECOMMENDED]    │  (Save ₹2,889)  │
├────────────────┼───────────────────┼─────────────────┤
│ • 1 test       │ • Unlimited tests │ • All Premium   │
│ • Basic        │ • Advanced AI     │   Monthly       │
│   analytics    │   analytics       │ • Priority      │
│ • 50 practice  │ • Unlimited       │   support       │
│   questions    │   practice        │ • Success       │
│                │ • Personalized    │   manager       │
│                │   schedules       │ • Annual        │
│                │ • Teaching        │   reports       │
│                │   resources       │                 │
│                │                   │                 │
│  [Current]     │  [Select Plan]    │  [Select Plan]  │
└────────────────┴───────────────────┴─────────────────┘
```

**User Thinking**:
- "Which plan is best for me?"
- "How much does it cost?"
- "What features do I get?"
- "Is there a discount for yearly?"

---

### Step 3: Parent Compares Plans

**User Action**: Parent reads features, compares pricing

**UI Highlights**:
- Premium Monthly has "Recommended" badge
- Yearly plan shows savings percentage
- Features clearly listed with checkmarks
- Current plan highlighted (if any)

**User Thinking**:
- "Premium Monthly is recommended"
- "Yearly saves ₹2,889 (24% off)"
- "I need unlimited tests and advanced analytics"
- "Let me try monthly first"

---

### Step 4: Parent Selects Plan

**User Action**: Parent clicks "Select Plan" on Premium Monthly

**UI State**:
- Payment confirmation modal opens
- Background darkens (overlay)
- Modal shows plan details

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

**User Thinking**:
- "Let me review what I'm getting"
- "₹999/month seems reasonable"
- "I can cancel anytime"
- "Let's do this!"

---

### Step 5: Parent Confirms Purchase

**User Action**: Parent clicks "Proceed to Payment"

**UI State**:
- Button shows loading spinner
- "Processing..." text
- Button disabled to prevent double-click

**User Sees**:
```
[⟳ Processing...]
```

**Backend Action**:
- Frontend calls `POST /api/payment/create-order`
- Backend creates Razorpay order
- Returns order_id, amount, currency

**Duration**: 1-2 seconds

---

### Step 6: Razorpay Checkout Opens

**User Action**: Razorpay modal opens automatically

**UI State**:
- Razorpay secure checkout modal
- Payment options displayed
- Prefilled with parent's email and phone

**User Sees**:
```
┌─────────────────────────────────────────┐
│         Razorpay Secure Checkout         │
├─────────────────────────────────────────┤
│  Mentor AI                               │
│  ₹999.00                                 │
│                                          │
│  Pay Using:                              │
│  ● Card                                  │
│  ○ UPI                                   │
│  ○ Netbanking                            │
│  ○ Wallet                                │
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

**User Thinking**:
- "This looks secure (Razorpay badge)"
- "Multiple payment options available"
- "My details are prefilled"
- "Let me enter my card details"

---

### Step 7: Parent Enters Payment Details

**User Action**: Parent enters card number, CVV, expiry, name

**UI State**:
- Card number formatted as user types (4 digits, space)
- CVV masked (dots)
- Expiry auto-formatted (MM/YY)
- Real-time validation (red border if invalid)

**User Sees**:
```
Card Number: [4111 1111 1111 1111]
Expiry: [12/25]  CVV: [•••]
Name: [Rajesh Kumar]
```

**User Thinking**:
- "Card number looks correct"
- "Expiry is valid"
- "CVV is on the back of my card"
- "Ready to pay"

---

### Step 8: Parent Completes Payment

**User Action**: Parent clicks "Pay ₹999"

**UI State**:
- Button shows loading spinner
- "Processing payment..." text
- Modal cannot be closed during processing

**User Sees**:
```
[⟳ Processing payment...]
```

**Razorpay Action**:
- Validates card details
- Processes payment (contacts bank)
- Generates payment_id and signature
- Returns success response

**Duration**: 3-5 seconds

---

### Step 9: Payment Success

**User Action**: None (automatic)

**UI State**:
- Razorpay modal closes
- Success modal opens
- Confetti animation (optional)

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
│  ✓ Teaching resources for parents        │
│  ✓ Priority support                      │
│                                          │
│  [Start Using Premium Features]          │
└─────────────────────────────────────────┘
```

**Backend Action**:
- Frontend calls `POST /api/payment/verify`
- Backend verifies signature
- Activates subscription
- Returns subscription details

**User Thinking**:
- "Great! Payment successful!"
- "I'm now a premium member"
- "Let me explore premium features"

---

### Step 10: Parent Accesses Premium Features

**User Action**: Parent clicks "Start Using Premium Features" or navigates to premium feature

**UI State**:
- Redirected to dashboard or premium feature
- Premium badge shown in navigation
- No upgrade prompts

**User Sees**:
```
┌─────────────────────────────────────────┐
│  Dashboard                    [Premium]  │
├─────────────────────────────────────────┤
│  Welcome back, Rajesh!                   │
│                                          │
│  You now have access to:                 │
│  • Advanced Analytics                    │
│  • Personalized Schedules                │
│  • Unlimited Practice                    │
│  • Teaching Resources                    │
│                                          │
│  [Explore Features]                      │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "I can now use all features"
- "Let me check out advanced analytics"
- "This was worth it!"

---

## Flow 2: Payment Failure

### Step 1-7: Same as Happy Path

### Step 8: Payment Fails

**User Action**: Parent clicks "Pay ₹999" but payment is declined

**Razorpay Action**:
- Payment processing fails
- Bank declines transaction
- Returns error response

**UI State**:
- Razorpay modal closes
- Error modal opens

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

**User Thinking**:
- "Why did it fail?"
- "Let me check my card balance"
- "Maybe I'll try UPI instead"

### Step 9: Parent Retries Payment

**User Action**: Parent clicks "Try Again"

**UI State**:
- Returns to plans page or reopens payment modal
- Parent can select different payment method

**User Sees**: Plans page again

---

## Flow 3: Parent Cancels Payment

### Step 1-6: Same as Happy Path

### Step 7: Parent Closes Razorpay Modal

**User Action**: Parent clicks X or close button on Razorpay modal

**UI State**:
- Razorpay modal closes
- Cancellation message shown

**User Sees**:
```
┌─────────────────────────────────────────┐
│        Payment Cancelled                 │
├─────────────────────────────────────────┤
│  Your payment was not completed.         │
│                                          │
│  You can try again anytime.              │
│                                          │
│  [Try Again]  [Back to Plans]            │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "I changed my mind"
- "Let me think about it"
- "Maybe I'll upgrade later"

---

## Flow 4: Free User Tries Premium Feature

### Step 1: Free User Accesses Premium Feature

**User Action**: Free user clicks on "Advanced Analytics" or other premium feature

**UI State**:
- Upgrade prompt modal opens
- Feature is locked

**User Sees**:
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
│  ✓ Teaching resources for parents        │
│  ✓ Priority support                      │
│                                          │
│  Starting at ₹999/month                  │
│                                          │
│  [View Plans]  [Maybe Later]             │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "I need premium to access this"
- "What do I get with premium?"
- "Is it worth ₹999/month?"

### Step 2: User Decides

**Option A: User Upgrades**
- Clicks "View Plans"
- Proceeds to Flow 1 (Happy Path)

**Option B: User Declines**
- Clicks "Maybe Later"
- Modal closes
- Returns to free features

---

## Flow 5: Parent Views Subscription Status

### Step 1: Parent Navigates to Subscription Page

**User Action**: Parent clicks "My Subscription" in navigation or profile menu

**UI State**:
- Loading skeleton while fetching subscription
- Then subscription details displayed

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
│  [████████████████░░░░] 83%              │
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

**User Thinking**:
- "My subscription is active"
- "25 days until next billing"
- "I'm getting good value"

---

## Flow 6: Parent Views Transaction History

### Step 1: Parent Scrolls to Transaction History

**User Action**: Parent scrolls down on subscription page

**UI State**:
- Transaction history section visible
- Transactions listed in reverse chronological order

**User Sees**:
```
┌─────────────────────────────────────────┐
│      Transaction History                 │
├─────────────────────────────────────────┤
│  Nov 25, 2024 2:35 PM                    │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_XYZ123ABC               │
│  [View Receipt]                          │
├─────────────────────────────────────────┤
│  Oct 25, 2024 3:20 PM                    │
│  Premium Monthly Subscription            │
│  ₹999.00                                 │
│  Status: Completed ✓                     │
│  Payment ID: pay_ABC789XYZ               │
│  [View Receipt]                          │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "I can see all my past payments"
- "Everything is transparent"
- "I can download receipts if needed"

---

## Flow 7: Parent Cancels Subscription

### Step 1: Parent Decides to Cancel

**User Action**: Parent clicks "Manage Subscription" button

**UI State**:
- Dropdown or modal with management options
- "Cancel Subscription" option visible

**User Sees**:
```
┌─────────────────────────────────────────┐
│  Manage Subscription                     │
├─────────────────────────────────────────┤
│  • Update payment method                 │
│  • Change plan                           │
│  • Cancel subscription                   │
└─────────────────────────────────────────┘
```

### Step 2: Parent Clicks Cancel

**User Action**: Parent clicks "Cancel subscription"

**UI State**:
- Confirmation modal opens
- Warning message displayed

**User Sees**:
```
┌─────────────────────────────────────────┐
│    Cancel Subscription? ⚠️               │
├─────────────────────────────────────────┤
│  Are you sure you want to cancel?        │
│                                          │
│  You will continue to have access to     │
│  Premium features until:                 │
│                                          │
│  December 25, 2024                       │
│                                          │
│  After this date, your account will      │
│  revert to the Free plan.                │
│                                          │
│  Features you'll lose:                   │
│  • Unlimited diagnostic tests            │
│  • Advanced AI analytics                 │
│  • Personalized study schedules          │
│  • Teaching resources                    │
│                                          │
│  [Keep Subscription]  [Cancel]           │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "Do I really want to cancel?"
- "I'll have access until Dec 25"
- "Maybe I should keep it"

### Step 3: Parent Confirms Cancellation

**User Action**: Parent clicks "Cancel" button

**UI State**:
- Button shows loading spinner
- "Cancelling..." text

**Backend Action**:
- Frontend calls `POST /api/payment/cancel`
- Backend updates subscription status to "cancelled"
- Returns updated subscription

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
│  You can reactivate anytime before       │
│  the expiration date.                    │
│                                          │
│  [Reactivate]  [Close]                   │
└─────────────────────────────────────────┘
```

**User Thinking**:
- "Cancellation confirmed"
- "I still have access for 25 days"
- "I can reactivate if I change my mind"

---

## Flow Diagram

```
┌─────────────────┐
│  Discover       │
│  Premium        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  View Plans     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Compare Plans  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Select Plan    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Confirm        │
│  Purchase       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create Order   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Razorpay       │
│  Checkout       │
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
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Success │ │ Retry   │
│ Message │ │ Payment │
└────┬────┘ └─────────┘
     │
     ▼
┌─────────────────┐
│  Access Premium │
│  Features       │
└─────────────────┘
```

---

## Key User Touchpoints

### 1. Plan Discovery
- **Goal**: Help user understand premium value
- **UX**: Clear benefits, social proof, urgency
- **Emotion**: Curiosity, interest

### 2. Plan Comparison
- **Goal**: Help user choose right plan
- **UX**: Side-by-side comparison, highlight recommended
- **Emotion**: Consideration, evaluation

### 3. Purchase Confirmation
- **Goal**: Build confidence before payment
- **UX**: Clear summary, easy to cancel
- **Emotion**: Confidence, slight anxiety

### 4. Payment Processing
- **Goal**: Secure, smooth payment
- **UX**: Trusted Razorpay, multiple options
- **Emotion**: Trust, anticipation

### 5. Success Confirmation
- **Goal**: Celebrate and guide next steps
- **UX**: Clear success message, immediate access
- **Emotion**: Joy, satisfaction

### 6. Premium Access
- **Goal**: Deliver value immediately
- **UX**: Seamless access, no friction
- **Emotion**: Excitement, validation

### 7. Subscription Management
- **Goal**: Transparency and control
- **UX**: Clear status, easy cancellation
- **Emotion**: Trust, empowerment

---

## Success Metrics

- **Conversion Rate**: % of users who complete payment
- **Drop-off Points**: Where users abandon flow
- **Payment Success Rate**: % of payments that succeed
- **Time to Complete**: Average time from view to payment
- **Cancellation Rate**: % of users who cancel
- **Reactivation Rate**: % of cancelled users who return

---

This user flow ensures a smooth, trustworthy, and conversion-optimized payment experience! 💳✨

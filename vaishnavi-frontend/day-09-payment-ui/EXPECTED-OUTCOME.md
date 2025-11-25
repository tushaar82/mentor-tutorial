# Expected Outcome: Payment UI

## Overview

This document defines the success criteria for Day 9: Payment UI. Use this checklist to verify your implementation is complete and working correctly.

---

## Success Criteria

### 1. Code Generation Complete

**All files created from PROMPTS.md:**

- [ ] `types/payment.ts` - TypeScript types for payment data
- [ ] `services/paymentService.ts` - API service for payment calls
- [ ] `utils/paymentUtils.ts` - Utility functions for formatting
- [ ] `hooks/useRazorpay.ts` - Razorpay integration hook
- [ ] `hooks/useSubscription.ts` - Subscription state management hook
- [ ] `hooks/usePayment.ts` - Payment operations hook
- [ ] `components/payment/PlanCard.tsx` - Individual plan card component
- [ ] `components/payment/SubscriptionPlans.tsx` - Plans comparison component
- [ ] `components/payment/PaymentModal.tsx` - Payment confirmation modal
- [ ] `components/payment/SubscriptionStatus.tsx` - Subscription display component
- [ ] `components/payment/TransactionHistory.tsx` - Transaction list component
- [ ] `components/payment/UpgradePrompt.tsx` - Premium feature gate modal
- [ ] `components/payment/CancelSubscriptionModal.tsx` - Cancellation modal
- [ ] `pages/plans.tsx` - Plans selection page
- [ ] `pages/subscription.tsx` - Subscription management page

**Verification**: All files exist and contain generated code (no empty files)

---

### 2. Configuration Complete

**Environment setup:**

- [ ] `.env.local` file created with Razorpay key and API URL
- [ ] `.gitignore` includes `.env.local`
- [ ] Dependencies installed (axios, react-icons)
- [ ] Razorpay SDK loading correctly (check browser console)
- [ ] TypeScript types configured (no compilation errors)
- [ ] Mock API server created (for standalone testing)

**Verification**: Run `npm run dev` - no errors, environment variables accessible

---

### 3. Subscription Plans Display

**Plans page works correctly:**

- [ ] Navigate to `/plans` shows 3 subscription plans
- [ ] Free plan shows ₹0, basic features
- [ ] Premium Monthly shows ₹999/month, premium features
- [ ] Premium Yearly shows ₹9,999/year with savings percentage
- [ ] "Recommended" badge on Premium Monthly
- [ ] Features list displayed for each plan
- [ ] "Select Plan" buttons visible and clickable
- [ ] Current plan highlighted (if user has subscription)
- [ ] Responsive design (mobile: stack, desktop: grid)
- [ ] Loading state while fetching plans
- [ ] Error state if API fails

**Verification**: Open `/plans` page, see all 3 plans with correct pricing

---

### 4. Payment Flow Works

**Complete payment flow functional:**

- [ ] Click "Select Plan" opens payment confirmation modal
- [ ] Modal shows correct plan details and price
- [ ] Click "Proceed to Payment" creates order via API
- [ ] Razorpay checkout modal opens automatically
- [ ] Razorpay shows correct merchant name and amount
- [ ] Enter test card details: `4111 1111 1111 1111`, CVV: `123`
- [ ] Payment succeeds with test card
- [ ] Success callback triggered
- [ ] Verify payment API called with payment_id, order_id, signature
- [ ] Success message displayed
- [ ] User redirected or shown confirmation

**Verification**: Complete payment with test card, see success message

---

### 5. Payment Error Handling

**Error scenarios handled gracefully:**

- [ ] Close Razorpay modal shows cancellation message
- [ ] Network errors show user-friendly error message
- [ ] API errors (404, 500) show appropriate messages
- [ ] Retry button works after errors
- [ ] Invalid payment shows error from Razorpay
- [ ] App doesn't crash on errors
- [ ] Errors logged to console for debugging

**Verification**: Close Razorpay modal, see error message with retry option

---

### 6. Subscription Status Display

**Subscription page shows current status:**

- [ ] Navigate to `/subscription` shows subscription details
- [ ] Active subscription shows:
  - Green "Active" status badge
  - Plan name and price
  - Next billing date (formatted correctly)
  - Days remaining (calculated correctly)
  - Progress bar showing time remaining
  - Features list
  - "Manage Subscription" button
- [ ] Free/expired subscription shows:
  - Appropriate status badge
  - Upgrade prompt
  - Benefits of premium
  - "Upgrade" button
- [ ] Loading state while fetching
- [ ] Error state if API fails

**Verification**: Open `/subscription` page, see subscription details

---

### 7. Transaction History Display

**Transaction history shows past payments:**

- [ ] Transaction history section on subscription page
- [ ] Transactions displayed in list/table
- [ ] Each transaction shows:
  - Date and time (formatted)
  - Plan name
  - Amount (formatted with ₹ symbol)
  - Status badge (Completed, Pending, Failed)
  - Payment ID
- [ ] Transactions sorted by date (newest first)
- [ ] Empty state if no transactions
- [ ] Responsive design (table on desktop, cards on mobile)
- [ ] Loading state while fetching
- [ ] Error state if API fails

**Verification**: See transaction history with at least one completed transaction

---

### 8. Premium Feature Gating

**Free users see upgrade prompts:**

- [ ] Free user accessing premium feature sees upgrade modal
- [ ] Modal shows:
  - Lock icon
  - "Premium Feature" heading
  - Feature name that requires premium
  - Benefits of premium
  - Pricing information
  - "View Plans" and "Maybe Later" buttons
- [ ] "View Plans" navigates to plans page
- [ ] "Maybe Later" closes modal
- [ ] Premium users don't see upgrade prompt
- [ ] Premium users access features directly

**Verification**: As free user, try to access premium feature, see upgrade prompt

---

### 9. Subscription Cancellation

**Users can cancel subscriptions:**

- [ ] "Manage Subscription" button on subscription page
- [ ] Click opens cancellation confirmation modal
- [ ] Modal shows:
  - Warning icon
  - "Cancel Subscription?" heading
  - Explanation of cancellation
  - Access until end date
  - Features that will be lost
  - "Keep Subscription" and "Cancel Subscription" buttons
- [ ] "Keep Subscription" closes modal
- [ ] "Cancel Subscription" calls cancel API
- [ ] Success message shown after cancellation
- [ ] Subscription status updated to "Cancelled"
- [ ] Access remains until end date
- [ ] Loading state during cancellation

**Verification**: Cancel subscription, see confirmation and updated status

---

### 10. Responsive Design

**UI works on all screen sizes:**

- [ ] Mobile (375px): Plans stack vertically, single column
- [ ] Tablet (768px): Plans show 2 columns
- [ ] Desktop (1024px+): Plans show 3 columns
- [ ] Modals are responsive and centered
- [ ] Buttons are touch-friendly (min 44px height)
- [ ] Text is readable on small screens
- [ ] No horizontal scrolling on any screen size
- [ ] Images/icons scale appropriately
- [ ] Navigation works on mobile

**Verification**: Test on mobile, tablet, desktop sizes in browser dev tools

---

### 11. Accessibility

**UI is accessible:**

- [ ] All buttons have accessible labels
- [ ] Modals have proper ARIA attributes
- [ ] Keyboard navigation works (Tab, Enter, ESC)
- [ ] Focus visible on interactive elements
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader friendly (test with screen reader)
- [ ] Form inputs have labels
- [ ] Error messages are announced

**Verification**: Navigate using only keyboard, test with screen reader

---

### 12. Performance

**UI is performant:**

- [ ] Plans page loads in < 2 seconds
- [ ] Subscription page loads in < 2 seconds
- [ ] No unnecessary re-renders (check React DevTools)
- [ ] Images optimized (if any)
- [ ] API calls cached appropriately
- [ ] Loading states prevent layout shift
- [ ] Smooth animations (no jank)

**Verification**: Check Network tab, Lighthouse performance score > 80

---

### 13. Integration with Backend

**Frontend integrates with backend API:**

- [ ] API calls use correct endpoints
- [ ] Request bodies match backend expectations
- [ ] Response data parsed correctly
- [ ] Authentication token included in requests
- [ ] CORS configured correctly (no CORS errors)
- [ ] Error responses handled appropriately
- [ ] API base URL configurable via environment variable

**Verification**: Check Network tab, all API calls succeed (200/201 status)

---

### 14. Razorpay Integration

**Razorpay Checkout works correctly:**

- [ ] Razorpay SDK loads from CDN
- [ ] Checkout modal opens with correct details
- [ ] Test mode uses test key (rzp_test_)
- [ ] Payment options available (Card, UPI, etc.)
- [ ] Test card payment succeeds
- [ ] Payment response includes payment_id, order_id, signature
- [ ] Success and failure callbacks work
- [ ] Modal close handled gracefully

**Verification**: Complete payment with test card, check browser console for response

---

### 15. Code Quality

**Code follows best practices:**

- [ ] TypeScript types used throughout (no `any` types)
- [ ] Components are reusable and modular
- [ ] Proper error handling in all async operations
- [ ] Loading states for all async operations
- [ ] No console errors or warnings
- [ ] Code is formatted consistently
- [ ] Comments explain complex logic
- [ ] No hardcoded values (use environment variables)

**Verification**: Run `npm run build` - no TypeScript errors

---

## Visual Verification

### Plans Page Screenshot Checklist

Your plans page should look like this:

```
┌─────────────────────────────────────────────────────┐
│              Choose Your Plan                        │
│         Find the perfect plan for your needs         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   FREE   │  │   PREMIUM    │  │   PREMIUM    │  │
│  │          │  │   MONTHLY    │  │   YEARLY     │  │
│  │   ₹0     │  │ [RECOMMENDED]│  │   ₹9,999     │  │
│  │ forever  │  │   ₹999/mo    │  │   /year      │  │
│  │          │  │              │  │ (Save 16.7%) │  │
│  ├──────────┤  ├──────────────┤  ├──────────────┤  │
│  │ • 1 test │  │ • Unlimited  │  │ • All Premium│  │
│  │ • Basic  │  │   tests      │  │   Monthly    │  │
│  │   analytics│ │ • Advanced  │  │ • Priority   │  │
│  │ • 50     │  │   analytics  │  │   support    │  │
│  │   practice│  │ • Unlimited │  │ • Success    │  │
│  │          │  │   practice   │  │   manager    │  │
│  │          │  │ • Schedules  │  │              │  │
│  │          │  │ • Resources  │  │              │  │
│  │          │  │              │  │              │  │
│  │[Current] │  │[Select Plan] │  │[Select Plan] │  │
│  └──────────┘  └──────────────┘  └──────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Subscription Page Screenshot Checklist

Your subscription page should look like this:

```
┌─────────────────────────────────────────┐
│        My Subscription                   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ Status: Active ✓                    ││
│  │ Plan: Premium Monthly               ││
│  │ Price: ₹999/month                   ││
│  │                                     ││
│  │ Next billing: December 25, 2024     ││
│  │ Days remaining: 25 days             ││
│  │                                     ││
│  │ [████████████████░░░░] 83%          ││
│  │                                     ││
│  │ Features:                           ││
│  │ ✓ Unlimited diagnostic tests        ││
│  │ ✓ Advanced AI analytics             ││
│  │ ✓ Unlimited practice questions      ││
│  │ ✓ Personalized study schedules      ││
│  │                                     ││
│  │ [Manage Subscription]               ││
│  └─────────────────────────────────────┘│
│                                          │
│  Transaction History                     │
│  ┌─────────────────────────────────────┐│
│  │ Nov 25, 2024 2:35 PM                ││
│  │ Premium Monthly Subscription        ││
│  │ ₹999.00                             ││
│  │ Status: Completed ✓                 ││
│  │ Payment ID: pay_XYZ123ABC           ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## Final Checklist

Before marking Day 9 complete, verify:

- [ ] All 15 files created from PROMPTS.md
- [ ] Configuration complete (environment, dependencies)
- [ ] All 12 tests from TESTING.md passing
- [ ] Plans display correctly with pricing
- [ ] Payment flow works end-to-end
- [ ] Razorpay integration works with test card
- [ ] Subscription status displays correctly
- [ ] Transaction history displays correctly
- [ ] Premium feature gating works
- [ ] Cancellation flow works
- [ ] Responsive design works on all screen sizes
- [ ] Accessibility requirements met
- [ ] No console errors or warnings
- [ ] Code builds without TypeScript errors
- [ ] Integration with backend works (or mock API)

---

## What You've Accomplished

By completing Day 9, you have:

✅ Built a complete payment UI with Razorpay integration
✅ Implemented subscription plan selection and comparison
✅ Created secure payment flow with signature verification
✅ Built subscription status and management interface
✅ Implemented transaction history display
✅ Created premium feature gating system
✅ Built cancellation flow with confirmation
✅ Ensured responsive design for all devices
✅ Implemented comprehensive error handling
✅ Created reusable payment components and hooks

**Your payment UI is production-ready!** 🎉

---

## Next Steps

You're ready to move to **Day 10: Firebase Hosting Deployment**!

In Day 10, you will:
- Configure Firebase Hosting
- Build production-ready frontend
- Deploy to Firebase CDN
- Configure custom domain
- Set up CI/CD pipeline

**Congratulations on completing Day 9!** 💳✨

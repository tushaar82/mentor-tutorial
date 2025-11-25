# AI Coding Agent Prompts for Day 9: Payment UI

## Overview

This document contains all prompts needed to generate the payment UI components with Razorpay integration. Copy-paste these prompts into your AI coding agent (Windsurf/Copilot inline or ChatGPT/Claude chat) to generate the code.

**Recommended Approach**: Use ChatGPT/Claude for complex components, Windsurf/Copilot for simpler utilities.

---

## Prompt 1: Payment TypeScript Types

### Purpose
Define TypeScript interfaces for payment data structures.

### When to Use
First prompt - creates the foundation for payment UI.

### What You'll Get
Complete TypeScript types for payment and subscription data.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/payment.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for payment and subscription system
// Types needed:
// - SubscriptionPlan: plan_id, name, price, duration_days, features, currency, is_active
// - CreateOrderRequest: parent_id, plan_id
// - OrderResponse: order_id, amount, currency, receipt, created_at
// - VerifyPaymentRequest: order_id, payment_id, signature
// - SubscriptionDetails: subscription_id, parent_id, plan_id, status, start_date, end_date, auto_renew
// - TransactionRecord: transaction_id, parent_id, order_id, payment_id, amount, currency, status, created_at, completed_at
// - SubscriptionStatusResponse: is_active, plan_name, plan_id, days_remaining, expires_at, features
// - RazorpayResponse: razorpay_payment_id, razorpay_order_id, razorpay_signature
// Add JSDoc comments for each type
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for a payment and subscription UI system using Razorpay.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: React, Next.js, TypeScript, Razorpay
- File: vaishnavi-frontend/types/payment.ts

GENERATE:
Complete TypeScript interfaces for payment processing and subscription management.

REQUIREMENTS:
1. Create SubscriptionPlan interface:
   - plan_id: string
   - name: string
   - price: number (in paise)
   - duration_days: number
   - features: string[]
   - currency: string
   - is_active: boolean

2. Create CreateOrderRequest interface:
   - parent_id: string
   - plan_id: string

3. Create OrderResponse interface:
   - order_id: string
   - amount: number
   - currency: string
   - receipt: string
   - created_at: string

4. Create VerifyPaymentRequest interface:
   - order_id: string
   - payment_id: string
   - signature: string

5. Create SubscriptionDetails interface:
   - subscription_id: string
   - parent_id: string
   - plan_id: string
   - status: 'active' | 'expired' | 'cancelled'
   - start_date: string
   - end_date: string
   - auto_renew: boolean

6. Create TransactionRecord interface:
   - transaction_id: string
   - parent_id: string
   - order_id: string
   - payment_id?: string
   - amount: number
   - currency: string
   - status: 'pending' | 'completed' | 'failed'
   - created_at: string
   - completed_at?: string

7. Create SubscriptionStatusResponse interface:
   - is_active: boolean
   - plan_name: string
   - plan_id: string
   - days_remaining: number
   - expires_at: string
   - features: string[]

8. Create RazorpayResponse interface:
   - razorpay_payment_id: string
   - razorpay_order_id: string
   - razorpay_signature: string

9. Create RazorpayOptions interface:
   - key: string
   - amount: number
   - currency: string
   - name: string
   - description: string
   - order_id: string
   - prefill: { name: string; email: string; contact: string }
   - theme: { color: string }
   - handler: (response: RazorpayResponse) => void

10. Add JSDoc comments for each interface

INTEGRATE WITH:
- components/payment/* (will use these types)
- services/paymentService.ts (API type safety)

OUTPUT FORMAT:
- Complete TypeScript file with all interfaces
- JSDoc comments for documentation
- Export all types
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/types/payment.ts`
3. Paste and save

---

## Prompt 2: Payment Service (API Calls)

### Purpose
Create service functions for payment API calls.

### When to Use
After payment types - creates API integration layer.

### What You'll Get
Complete payment service with all API methods.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/services/paymentService.ts`

**Step 2**: Type this comment:
```typescript
// Create payment service for API calls
// Use axios or fetch for HTTP requests
// Base URL from environment variable
// Functions needed:
// - getSubscriptionPlans() -> Promise<SubscriptionPlan[]>
// - createPaymentOrder(parentId, planId) -> Promise<OrderResponse>
// - verifyPayment(orderData) -> Promise<SubscriptionDetails>
// - getSubscriptionStatus(parentId) -> Promise<SubscriptionStatusResponse>
// - getTransactionHistory(parentId) -> Promise<TransactionRecord[]>
// - cancelSubscription(parentId) -> Promise<SubscriptionDetails>
// Add error handling for network errors and API errors
// Add TypeScript types from types/payment.ts
// Add JSDoc comments
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a payment service for making API calls to the backend payment endpoints.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Axios
- File: vaishnavi-frontend/services/paymentService.ts

GENERATE:
A complete payment service with all API methods.

REQUIREMENTS:
1. Set up axios instance:
   - Base URL from environment variable (NEXT_PUBLIC_API_URL)
   - Include credentials for authentication
   - Add request interceptor for auth token
   - Add response interceptor for error handling

2. Implement getSubscriptionPlans:
   - GET /api/payment/plans
   - Return: Promise<SubscriptionPlan[]>
   - No authentication required
   - Handle: network errors

3. Implement createPaymentOrder:
   - POST /api/payment/create-order
   - Parameters: parentId, planId
   - Body: { parent_id, plan_id }
   - Return: Promise<OrderResponse>
   - Requires authentication
   - Handle: 404 plan not found, 400 validation errors

4. Implement verifyPayment:
   - POST /api/payment/verify
   - Parameters: orderData (order_id, payment_id, signature)
   - Body: { order_id, payment_id, signature }
   - Return: Promise<SubscriptionDetails>
   - Requires authentication
   - Handle: 400 invalid signature, 500 activation errors

5. Implement getSubscriptionStatus:
   - GET /api/payment/subscription/{parentId}
   - Parameter: parentId
   - Return: Promise<SubscriptionStatusResponse>
   - Requires authentication
   - Handle: no subscription (return free plan status)

6. Implement getTransactionHistory:
   - GET /api/payment/transactions/{parentId}
   - Parameter: parentId
   - Return: Promise<TransactionRecord[]>
   - Requires authentication
   - Handle: empty history

7. Implement cancelSubscription:
   - POST /api/payment/cancel/{parentId}
   - Parameter: parentId
   - Return: Promise<SubscriptionDetails>
   - Requires authentication
   - Handle: no active subscription

8. Add error handling:
   - Catch network errors
   - Catch API errors (4xx, 5xx)
   - Return meaningful error messages
   - Log errors for debugging

9. Add TypeScript types from types/payment.ts

10. Add JSDoc comments for all functions

INTEGRATE WITH:
- types/payment.ts (TypeScript types)
- Environment variable: NEXT_PUBLIC_API_URL
- Auth context (for authentication token)

OUTPUT FORMAT:
- Complete TypeScript file with all imports
- Axios instance configuration
- All API methods
- Error handling
- JSDoc comments
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/services/paymentService.ts`
3. Paste and save

---

## Prompt 3: Payment Utilities

### Purpose
Helper functions for payment formatting and calculations.

### When to Use
After payment service - creates utility functions.

### What You'll Get
Utility functions for payment operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/utils/paymentUtils.ts`

**Step 2**: Type this comment:
```typescript
// Create payment utility functions
// Functions needed:
// - formatCurrency(amount: number, currency: string) -> string (format 99900 paise as "₹999")
// - calculateSavings(monthlyPrice: number, yearlyPrice: number) -> number (percentage saved)
// - formatDate(dateString: string) -> string (format ISO date as "Dec 25, 2024")
// - getDaysRemaining(endDate: string) -> number (days until expiration)
// - getStatusBadgeColor(status: string) -> string (color for status badge)
// - isSubscriptionActive(subscription: SubscriptionStatusResponse) -> boolean
// Add TypeScript types and JSDoc comments
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create utility functions for payment formatting and calculations.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, TypeScript
- File: vaishnavi-frontend/utils/paymentUtils.ts

GENERATE:
Utility functions for payment operations.

REQUIREMENTS:
1. Implement formatCurrency:
   - Convert paise to rupees and format
   - Example: 99900, "INR" → "₹999"
   - Support INR currency symbol
   - Format with commas for thousands

2. Implement calculateSavings:
   - Calculate percentage saved on yearly plan
   - Example: monthly=999, yearly=9999 → 16.7%
   - Return rounded to 1 decimal place

3. Implement formatDate:
   - Format ISO date string to readable format
   - Example: "2024-12-25T14:35:00Z" → "Dec 25, 2024"
   - Use locale-aware formatting

4. Implement getDaysRemaining:
   - Calculate days between now and end date
   - Example: end_date in 25 days → 25
   - Return 0 if expired

5. Implement getStatusBadgeColor:
   - Return Tailwind color class for status
   - active → "green", expired → "red", cancelled → "gray"

6. Implement isSubscriptionActive:
   - Check if subscription is active and not expired
   - Return boolean

7. Add TypeScript types and JSDoc comments

INTEGRATE WITH:
- components/payment/* (will use these utilities)

OUTPUT FORMAT:
- Complete TypeScript file
- All utility functions
- JSDoc comments with examples
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/utils/paymentUtils.ts`
3. Paste and save

---

## Prompt 4: useRazorpay Hook

### Purpose
Create React hook for Razorpay integration.

### When to Use
After utilities - creates Razorpay integration layer.

### What You'll Get
Custom hook for loading and using Razorpay.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useRazorpay.ts`

**Step 2**: Type this comment:
```typescript
// Create useRazorpay hook for Razorpay integration
// Load Razorpay SDK from CDN dynamically
// Provide function to open Razorpay checkout
// Handle payment success and failure callbacks
// Return: { openRazorpay, isLoading, error }
// Use Razorpay key from environment variable
// Add TypeScript types from types/payment.ts
// Add error handling for SDK loading failures
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a React hook for Razorpay Checkout integration.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Razorpay
- File: vaishnavi-frontend/hooks/useRazorpay.ts

GENERATE:
A custom React hook for loading and using Razorpay Checkout.

REQUIREMENTS:
1. Load Razorpay SDK:
   - Dynamically load from CDN: https://checkout.razorpay.com/v1/checkout.js
   - Use useEffect to load on mount
   - Track loading state
   - Handle loading errors

2. Create openRazorpay function:
   - Parameters: orderData (OrderResponse), onSuccess, onFailure
   - Initialize Razorpay with options:
     - key: from environment (NEXT_PUBLIC_RAZORPAY_KEY_ID)
     - amount: from orderData
     - currency: from orderData
     - order_id: from orderData
     - name: "Mentor AI"
     - description: plan name
     - prefill: user email, phone
     - theme: { color: "#4F46E5" }
     - handler: call onSuccess with response
     - modal.ondismiss: call onFailure
   - Open Razorpay modal
   - Handle errors

3. Return from hook:
   - openRazorpay: function to open checkout
   - isLoading: boolean (SDK loading state)
   - error: string | null (loading errors)

4. Add TypeScript types:
   - Use RazorpayOptions from types/payment.ts
   - Type all parameters and return values

5. Add error handling:
   - SDK loading failures
   - Razorpay initialization errors
   - Payment processing errors

6. Add JSDoc comments

INTEGRATE WITH:
- types/payment.ts (RazorpayOptions, RazorpayResponse)
- Environment: NEXT_PUBLIC_RAZORPAY_KEY_ID
- components/payment/* (will use this hook)

OUTPUT FORMAT:
- Complete TypeScript file
- Custom React hook
- Error handling
- JSDoc comments
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/hooks/useRazorpay.ts`
3. Paste and save

---

## Prompt 5: useSubscription Hook

### Purpose
Create React hook for subscription state management.

### When to Use
After useRazorpay - creates subscription state layer.

### What You'll Get
Custom hook for managing subscription state.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useSubscription.ts`

**Step 2**: Type this comment:
```typescript
// Create useSubscription hook for subscription state management
// Fetch subscription status on mount
// Provide functions: refreshSubscription, isPremium
// Use React Query or useState + useEffect
// Cache subscription data
// Return: { subscription, isLoading, error, refreshSubscription, isPremium }
// Add TypeScript types from types/payment.ts
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a React hook for managing subscription state.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, TypeScript
- File: vaishnavi-frontend/hooks/useSubscription.ts

GENERATE:
A custom React hook for subscription state management.

REQUIREMENTS:
1. Fetch subscription on mount:
   - Use paymentService.getSubscriptionStatus()
   - Get parent_id from auth context
   - Store in state
   - Handle loading and errors

2. Provide refreshSubscription function:
   - Re-fetch subscription data
   - Update state
   - Return Promise

3. Provide isPremium computed value:
   - Check if subscription.is_active === true
   - Return boolean

4. Return from hook:
   - subscription: SubscriptionStatusResponse | null
   - isLoading: boolean
   - error: string | null
   - refreshSubscription: () => Promise<void>
   - isPremium: boolean

5. Add TypeScript types

6. Add error handling

7. Add JSDoc comments

INTEGRATE WITH:
- services/paymentService.ts
- types/payment.ts
- Auth context (for parent_id)

OUTPUT FORMAT:
- Complete TypeScript file
- Custom React hook
- Error handling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/hooks/useSubscription.ts`
3. Paste and save

---

## Prompt 6: usePayment Hook

### Purpose
Create React hook for payment operations.

### When to Use
After useSubscription - creates payment operations layer.

### What You'll Get
Custom hook for handling payment flow.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/usePayment.ts`

**Step 2**: Type this comment:
```typescript
// Create usePayment hook for payment operations
// Integrate useRazorpay and paymentService
// Provide function: initiatePayment(planId)
// Handle: create order, open Razorpay, verify payment
// Return: { initiatePayment, isProcessing, error }
// Add success and error callbacks
// Add TypeScript types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a React hook for handling the complete payment flow.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, TypeScript, Razorpay
- File: vaishnavi-frontend/hooks/usePayment.ts

GENERATE:
A custom React hook that orchestrates the payment flow.

REQUIREMENTS:
1. Use useRazorpay hook for Razorpay integration

2. Create initiatePayment function:
   - Parameter: planId, onSuccess, onError
   - Steps:
     a. Set isProcessing to true
     b. Call paymentService.createPaymentOrder(parentId, planId)
     c. Get order_id, amount, currency
     d. Call openRazorpay with order data
     e. On Razorpay success:
        - Call paymentService.verifyPayment(response)
        - Call onSuccess callback
     f. On Razorpay failure:
        - Call onError callback
     g. Set isProcessing to false
   - Handle all errors

3. Return from hook:
   - initiatePayment: function
   - isProcessing: boolean
   - error: string | null

4. Add TypeScript types

5. Add error handling for each step

6. Add JSDoc comments

INTEGRATE WITH:
- hooks/useRazorpay.ts
- services/paymentService.ts
- types/payment.ts
- Auth context (for parent_id)

OUTPUT FORMAT:
- Complete TypeScript file
- Custom React hook
- Error handling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/hooks/usePayment.ts`
3. Paste and save

---

## Prompt 7: PlanCard Component

### Purpose
Create reusable plan card component for displaying subscription plans.

### When to Use
After hooks - creates UI components.

### What You'll Get
Plan card component with pricing and features.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/payment/PlanCard.tsx`

**Step 2**: Type this comment:
```typescript
// Create PlanCard component for displaying subscription plan
// Props: plan (SubscriptionPlan), isRecommended, onSelect, isCurrentPlan
// Display: plan name, price, duration, features list, select button
// Highlight recommended plan with badge
// Show "Current Plan" for active plan
// Responsive design with Tailwind CSS
// Add hover effects and animations
// Use TypeScript and React
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a PlanCard component for displaying subscription plans.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/PlanCard.tsx

GENERATE:
A reusable plan card component.

REQUIREMENTS:
1. Props interface:
   - plan: SubscriptionPlan
   - isRecommended?: boolean
   - isCurrentPlan?: boolean
   - onSelect: (planId: string) => void

2. Display elements:
   - Plan name (heading)
   - Price (formatted with currency symbol)
   - Duration (per month/year)
   - "Recommended" badge if isRecommended
   - Features list with checkmarks
   - Select button (or "Current Plan" badge)

3. Styling:
   - Card with border and shadow
   - Highlight recommended plan (border color, badge)
   - Responsive design (mobile-first)
   - Hover effects on card and button
   - Use Tailwind CSS classes

4. Interactions:
   - Click "Select Plan" button calls onSelect
   - Disable button if isCurrentPlan

5. Use formatCurrency from utils/paymentUtils.ts

6. Add TypeScript types

7. Add accessibility (ARIA labels, keyboard navigation)

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
- Responsive design
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/PlanCard.tsx`
3. Paste and save

---

## Prompt 8: SubscriptionPlans Component

### Purpose
Create component for displaying all subscription plans.

### When to Use
After PlanCard - creates plans comparison view.

### What You'll Get
Plans comparison component with grid layout.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a SubscriptionPlans component for displaying all subscription plans.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/SubscriptionPlans.tsx

GENERATE:
A component that displays all subscription plans in a comparison grid.

REQUIREMENTS:
1. Fetch plans on mount using paymentService.getSubscriptionPlans()

2. Get current subscription using useSubscription hook

3. Display plans in responsive grid:
   - Mobile: stack vertically
   - Tablet: 2 columns
   - Desktop: 3 columns

4. Use PlanCard component for each plan

5. Mark Premium Monthly as recommended

6. Highlight current plan

7. Handle plan selection:
   - Call usePayment hook to initiate payment
   - Show loading state during payment
   - Show success/error messages

8. Add loading skeleton while fetching plans

9. Add error handling and retry button

10. Add TypeScript types

11. Add responsive design with Tailwind CSS

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
- Error handling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/SubscriptionPlans.tsx`
3. Paste and save

---

## Prompt 9: PaymentModal Component

### Purpose
Create modal for payment confirmation before opening Razorpay.

### When to Use
After SubscriptionPlans - creates confirmation modal.

### What You'll Get
Payment confirmation modal component.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a PaymentModal component for confirming payment before checkout.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/PaymentModal.tsx

GENERATE:
A modal component for payment confirmation.

REQUIREMENTS:
1. Props interface:
   - isOpen: boolean
   - onClose: () => void
   - plan: SubscriptionPlan
   - onConfirm: () => void
   - isProcessing: boolean

2. Display elements:
   - Modal overlay (dark background)
   - Modal content (centered card)
   - Plan name and price
   - Billing frequency
   - Features list
   - Total amount
   - Cancel and Proceed buttons

3. Interactions:
   - Click overlay or Cancel closes modal
   - Click Proceed calls onConfirm
   - Disable Proceed button while isProcessing
   - Show loading spinner on Proceed button when processing

4. Styling:
   - Use Tailwind CSS
   - Responsive design
   - Smooth animations (fade in/out)
   - Focus trap (accessibility)

5. Add TypeScript types

6. Add accessibility (ARIA labels, ESC key to close)

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
- Animations
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/PaymentModal.tsx`
3. Paste and save

---

## Prompt 10: SubscriptionStatus Component

### Purpose
Create component for displaying current subscription status.

### When to Use
After PaymentModal - creates subscription display.

### What You'll Get
Subscription status card component.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a SubscriptionStatus component for displaying current subscription.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/SubscriptionStatus.tsx

GENERATE:
A component that displays subscription status and details.

REQUIREMENTS:
1. Use useSubscription hook to get subscription data

2. Display for active subscription:
   - Status badge (Active with green color)
   - Plan name and price
   - Next billing date
   - Days remaining (with progress bar)
   - Features list
   - Manage Subscription button

3. Display for free/expired subscription:
   - Status badge (Free or Expired)
   - Upgrade prompt
   - Benefits of premium
   - Upgrade button

4. Handle loading state (skeleton)

5. Handle error state (retry button)

6. Use formatDate and getDaysRemaining from utils

7. Add TypeScript types

8. Add responsive design with Tailwind CSS

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
- Loading and error states
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/SubscriptionStatus.tsx`
3. Paste and save

---

## Prompt 11: TransactionHistory Component

### Purpose
Create component for displaying transaction history.

### When to Use
After SubscriptionStatus - creates transaction list.

### What You'll Get
Transaction history table/list component.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a TransactionHistory component for displaying payment transactions.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/TransactionHistory.tsx

GENERATE:
A component that displays transaction history.

REQUIREMENTS:
1. Fetch transactions on mount using paymentService.getTransactionHistory()

2. Display in responsive table/list:
   - Mobile: card list
   - Desktop: table

3. Show for each transaction:
   - Date and time
   - Plan name
   - Amount (formatted)
   - Status badge (Completed, Pending, Failed)
   - Payment ID
   - Receipt download button (optional)

4. Handle empty state (no transactions)

5. Handle loading state (skeleton)

6. Handle error state (retry button)

7. Add pagination if many transactions

8. Use formatCurrency and formatDate from utils

9. Add TypeScript types

10. Add responsive design with Tailwind CSS

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
- Responsive table/list
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/TransactionHistory.tsx`
3. Paste and save

---

## Prompt 12: UpgradePrompt Component

### Purpose
Create modal for prompting free users to upgrade.

### When to Use
After TransactionHistory - creates upgrade gate.

### What You'll Get
Upgrade prompt modal component.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create an UpgradePrompt component for premium feature gating.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/UpgradePrompt.tsx

GENERATE:
A modal component that prompts free users to upgrade.

REQUIREMENTS:
1. Props interface:
   - isOpen: boolean
   - onClose: () => void
   - featureName: string
   - onUpgrade: () => void

2. Display elements:
   - Lock icon
   - "Premium Feature" heading
   - Feature name that requires premium
   - Benefits of premium (bullet points)
   - Pricing (starting at ₹999/month)
   - View Plans and Maybe Later buttons

3. Interactions:
   - Click View Plans calls onUpgrade (navigate to plans page)
   - Click Maybe Later or overlay closes modal

4. Styling:
   - Use Tailwind CSS
   - Responsive design
   - Smooth animations
   - Attractive design to encourage upgrade

5. Add TypeScript types

6. Add accessibility

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/UpgradePrompt.tsx`
3. Paste and save

---

## Prompt 13: CancelSubscriptionModal Component

### Purpose
Create modal for subscription cancellation confirmation.

### When to Use
After UpgradePrompt - creates cancellation flow.

### What You'll Get
Cancellation confirmation modal component.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a CancelSubscriptionModal component for subscription cancellation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/payment/CancelSubscriptionModal.tsx

GENERATE:
A modal component for confirming subscription cancellation.

REQUIREMENTS:
1. Props interface:
   - isOpen: boolean
   - onClose: () => void
   - subscription: SubscriptionDetails
   - onConfirm: () => Promise<void>

2. Display elements:
   - Warning icon
   - "Cancel Subscription?" heading
   - Explanation: access until end date
   - End date display
   - Features that will be lost
   - Keep Subscription and Cancel Subscription buttons

3. Interactions:
   - Click Keep Subscription closes modal
   - Click Cancel Subscription calls onConfirm
   - Show loading state during cancellation
   - Show success message after cancellation

4. Styling:
   - Use Tailwind CSS
   - Warning colors (yellow/red)
   - Responsive design

5. Add TypeScript types

6. Add error handling

OUTPUT FORMAT:
- Complete React component
- TypeScript with proper types
- Tailwind CSS styling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/payment/CancelSubscriptionModal.tsx`
3. Paste and save

---

## Prompt 14: Plans Page

### Purpose
Create page for viewing and selecting subscription plans.

### When to Use
After all components - creates plans page.

### What You'll Get
Complete plans selection page.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a plans page for subscription plan selection.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/pages/plans.tsx

GENERATE:
A complete page for viewing and selecting subscription plans.

REQUIREMENTS:
1. Use SubscriptionPlans component

2. Add page header:
   - "Choose Your Plan" heading
   - Subtitle explaining benefits

3. Add FAQ section (optional):
   - Common questions about subscriptions
   - Collapsible accordion

4. Add trust signals:
   - Secure payment badge
   - Money-back guarantee (if applicable)
   - Customer testimonials (optional)

5. Add responsive layout

6. Add SEO meta tags

7. Add TypeScript types

OUTPUT FORMAT:
- Complete Next.js page
- TypeScript with proper types
- Tailwind CSS styling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/pages/plans.tsx`
3. Paste and save

---

## Prompt 15: Subscription Page

### Purpose
Create page for managing subscription.

### When to Use
After plans page - creates subscription management page.

### What You'll Get
Complete subscription management page.

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a subscription management page.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: React, Next.js, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/pages/subscription.tsx

GENERATE:
A complete page for managing subscription.

REQUIREMENTS:
1. Use SubscriptionStatus component

2. Use TransactionHistory component

3. Add page header:
   - "My Subscription" heading
   - Breadcrumb navigation

4. Add sections:
   - Current subscription status
   - Transaction history
   - Manage subscription (cancel, upgrade)

5. Add responsive layout

6. Require authentication (redirect if not logged in)

7. Add TypeScript types

OUTPUT FORMAT:
- Complete Next.js page
- TypeScript with proper types
- Tailwind CSS styling
```

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/pages/subscription.tsx`
3. Paste and save

---

## Prompt 16: Environment Variables

### Purpose
Add Razorpay configuration to environment.

### When to Use
After all code is generated - configures Razorpay.

### What You'll Get
Updated .env.local with Razorpay variables.

---

### Manual Update

**Open file**: `vaishnavi-frontend/.env.local`

**Add these lines**:
```
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Save the file**

**Note**: Actual keys will be added in CONFIGURATION.md

---

## Summary

You've generated all the code for payment UI! Here's what you created:

1. ✅ Payment TypeScript types
2. ✅ Payment service (API calls)
3. ✅ Payment utilities
4. ✅ useRazorpay hook
5. ✅ useSubscription hook
6. ✅ usePayment hook
7. ✅ PlanCard component
8. ✅ SubscriptionPlans component
9. ✅ PaymentModal component
10. ✅ SubscriptionStatus component
11. ✅ TransactionHistory component
12. ✅ UpgradePrompt component
13. ✅ CancelSubscriptionModal component
14. ✅ Plans page
15. ✅ Subscription page
16. ✅ Environment configuration

**Next Steps**:
1. Follow CONFIGURATION.md to set up Razorpay SDK and environment variables
2. Follow TESTING.md to test payment flow with mock backend
3. Verify all components render correctly

**Files Created**:
- `types/payment.ts`
- `services/paymentService.ts`
- `utils/paymentUtils.ts`
- `hooks/useRazorpay.ts`
- `hooks/useSubscription.ts`
- `hooks/usePayment.ts`
- `components/payment/PlanCard.tsx`
- `components/payment/SubscriptionPlans.tsx`
- `components/payment/PaymentModal.tsx`
- `components/payment/SubscriptionStatus.tsx`
- `components/payment/TransactionHistory.tsx`
- `components/payment/UpgradePrompt.tsx`
- `components/payment/CancelSubscriptionModal.tsx`
- `pages/plans.tsx`
- `pages/subscription.tsx`

Ready to configure and test! 💳✨

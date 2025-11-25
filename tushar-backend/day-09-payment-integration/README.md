# Day 9: Payment Integration (Backend)

## What You're Building

A complete payment integration system using Razorpay that handles subscription management, payment processing, order creation, payment verification, and premium feature access control. This system enables parents to upgrade from free to premium subscriptions, processes secure payments, and manages subscription lifecycle including activation, renewal, and cancellation.

## Why This Matters

Payment integration is critical for platform monetization and sustainability:
- **Revenue Generation**: Converts free users to paying customers
- **Secure Transactions**: Ensures safe payment processing with industry standards
- **Subscription Management**: Automates billing, renewals, and access control
- **User Trust**: Professional payment flow builds confidence
- **Feature Gating**: Controls access to premium features (unlimited tests, advanced analytics, personalized resources)
- **Compliance**: Meets payment security standards (PCI DSS through Razorpay)
- **Transparency**: Clear pricing, receipts, and transaction history
- **Flexibility**: Supports multiple payment methods (cards, UPI, wallets, net banking)

Without proper payment integration, the platform cannot sustain operations, scale features, or provide premium value to users willing to pay for enhanced learning experiences.

## How It Works

**Payment Flow Pipeline:**

1. **Subscription Plans Setup**:
   - Define subscription tiers (Free, Premium Monthly, Premium Yearly)
   - Set pricing: ₹0 (Free), ₹999/month (Premium Monthly), ₹9,999/year (Premium Yearly)
   - Configure features per tier:
     - Free: 1 diagnostic test, basic analytics, limited practice questions
     - Premium: Unlimited tests, advanced analytics, personalized schedules, teaching resources, priority support
   - Store plan details in Firestore

2. **Payment Order Creation**:
   - Parent selects subscription plan from frontend
   - Backend receives upgrade request with plan_id and parent_id
   - Validate parent account and current subscription status
   - Create Razorpay order with:
     - Amount (in paise: ₹999 = 99900 paise)
     - Currency (INR)
     - Receipt ID (unique transaction reference)
     - Notes (parent_id, plan_id, metadata)
   - Return order_id, amount, currency to frontend
   - Store order details in Firestore (pending status)

3. **Payment Processing** (Frontend handles this):
   - Frontend opens Razorpay checkout with order_id
   - Parent enters payment details (card/UPI/wallet)
   - Razorpay processes payment securely
   - Returns payment_id, order_id, signature to frontend
   - Frontend sends these to backend for verification

4. **Payment Verification**:
   - Backend receives payment_id, order_id, signature from frontend
   - Verify signature using Razorpay secret key:
     - Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, secret_key)
     - Compare with received signature
   - If signature matches:
     - Payment is authentic and successful
     - Proceed to subscription activation
   - If signature doesn't match:
     - Payment is potentially fraudulent
     - Reject and log security incident

5. **Subscription Activation**:
   - Update parent's subscription in Firestore:
     - subscription_tier: "premium_monthly" or "premium_yearly"
     - subscription_status: "active"
     - subscription_start_date: current timestamp
     - subscription_end_date: start_date + duration (30 days or 365 days)
     - payment_id: Razorpay payment_id
     - order_id: Razorpay order_id
   - Grant access to premium features
   - Update order status to "completed"
   - Send confirmation email/SMS (optional)

6. **Subscription Status Check**:
   - Middleware checks subscription status on premium API calls
   - Verify subscription_status == "active"
   - Verify subscription_end_date > current_date
   - If expired:
     - Return 403 Forbidden with upgrade prompt
     - Log expiration event
   - If active:
     - Allow access to premium endpoint
     - Track usage for analytics

7. **Subscription Management**:
   - List all transactions for a parent
   - Show current subscription details
   - Calculate days remaining until expiration
   - Handle subscription cancellation (mark as cancelled, no refund)
   - Handle subscription renewal (create new order)
   - Send expiration reminders (7 days, 1 day before)

8. **Webhook Handling** (Advanced):
   - Razorpay sends webhooks for payment events
   - Verify webhook signature
   - Handle events:
     - payment.captured: Payment successful
     - payment.failed: Payment failed
     - subscription.charged: Recurring payment
   - Update subscription status accordingly
   - Log all webhook events

**Technology Stack:**
- Razorpay Payment Gateway (payment processing)
- Razorpay Python SDK (API integration)
- Firestore (subscription and transaction storage)
- FastAPI (payment orchestration)
- HMAC-SHA256 (signature verification)

**Data Flow:**
```
Parent Selects Plan → Create Order → Frontend Checkout → Payment Success → Verify Signature → Activate Subscription → Grant Premium Access
```

**Security Measures:**
- Never expose Razorpay secret key to frontend
- Always verify payment signatures on backend
- Use HTTPS for all payment communications
- Store sensitive data encrypted in Firestore
- Log all payment attempts for audit
- Implement rate limiting on payment endpoints
- Validate all input data (amounts, IDs)

## Learning Objectives

By completing this task, you will:
- Understand payment gateway integration (Razorpay)
- Learn secure payment verification with HMAC signatures
- Implement subscription management systems
- Design feature gating and access control
- Handle payment webhooks and events
- Build order creation and tracking
- Implement transaction history and receipts
- Test payments in sandbox mode
- Understand PCI compliance through third-party gateways
- Handle payment failures and edge cases

## Time Estimate

- **LLM Code Generation**: 90 minutes (12-15 prompts)
- **Configuration**: 45 minutes (Razorpay account setup, test keys)
- **Testing**: 60 minutes (Test payment flow in sandbox)
- **Total**: 3 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Backend server running successfully
- ✅ Parent authentication working

**Required Software:**
- Python 3.11+ with virtual environment
- Razorpay account (free sandbox for testing)
- curl or Postman for API testing
- Valid email for Razorpay account

**Required APIs:**
- Razorpay API (will enable in CONFIGURATION.md)

**Knowledge Prerequisites:**
- Understanding of payment flows and security
- Familiarity with HMAC signature verification
- Knowledge of subscription business models
- Understanding of webhook concepts

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── payment_service.py              # Main payment orchestration
│   ├── subscription_service.py         # Subscription management
│   └── razorpay_client.py              # Razorpay API wrapper
├── models/
│   └── payment_models.py               # Payment and subscription models
├── routers/
│   └── payment_router.py               # Payment API endpoints
├── middleware/
│   └── subscription_middleware.py      # Premium access control
├── utils/
│   └── payment_utils.py                # Signature verification, helpers
├── data/
│   └── subscription_plans.json         # Plan definitions
└── tests/
    └── test_payment_service.py         # Payment tests (optional)
```

## Next Steps

After completing this task, you will:
1. Have a fully functional payment system
2. Be able to process real payments (after switching to live keys)
3. Manage subscriptions and premium access
4. Move to **Day 10: Cloud Run Deployment** to deploy the backend to production

## Important Notes

**Sandbox vs Live Mode:**
- Day 9 uses Razorpay **sandbox/test mode** (test keys)
- Test mode uses fake payment credentials (test cards)
- No real money is charged in test mode
- Switch to live keys only after thorough testing
- Live mode requires business verification with Razorpay

**Security Reminders:**
- Never commit Razorpay keys to Git (use .env)
- Always verify payment signatures
- Never trust payment data from frontend without verification
- Log all payment attempts for security audits
- Implement rate limiting to prevent abuse

**Testing Strategy:**
- Use Razorpay test cards for sandbox testing
- Test all payment scenarios (success, failure, timeout)
- Verify subscription activation and expiration
- Test premium feature access control
- Validate webhook handling

Let's build a secure, professional payment system! 💳

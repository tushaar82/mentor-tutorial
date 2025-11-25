# AI Coding Agent Prompts for Day 9: Payment Integration

## Overview

This document contains all prompts needed to generate the payment integration system with Razorpay. Copy-paste these prompts into your AI coding agent (Windsurf/Copilot inline or ChatGPT/Claude chat) to generate the code.

**Recommended Approach**: Use ChatGPT/Claude for complex services, Windsurf/Copilot for simpler utilities.

---

## Prompt 1: Payment Models

### Purpose
Define Pydantic models for payment requests, orders, subscriptions, and transactions.

### When to Use
First prompt - creates the foundation for payment system.

### What You'll Get
Complete Pydantic models for payment and subscription data structures.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/payment_models.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create Pydantic models for payment and subscription system
# Models needed:
# - SubscriptionPlan: plan_id, name, price, duration_days, features, currency
# - CreateOrderRequest: parent_id, plan_id
# - OrderResponse: order_id, amount, currency, receipt
# - VerifyPaymentRequest: order_id, payment_id, signature
# - SubscriptionDetails: subscription_id, parent_id, plan_id, status, start_date, end_date
# - TransactionRecord: transaction_id, parent_id, order_id, payment_id, amount, status, timestamp
# - SubscriptionStatusResponse: is_active, plan_name, days_remaining, features
# Add validators for amounts (must be positive), dates, and status values
# Include example values in Config
# Add type hints and docstrings
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for a payment and subscription management system using Razorpay.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: Python 3.11, FastAPI, Pydantic, Razorpay
- File: tushar-backend/models/payment_models.py

GENERATE:
Complete Pydantic models for payment processing and subscription management.

REQUIREMENTS:
1. Create SubscriptionPlan model:
   - plan_id: str (e.g., "premium_monthly")
   - name: str (e.g., "Premium Monthly")
   - price: int (in paise, e.g., 99900 for ₹999)
   - duration_days: int (30 for monthly, 365 for yearly)
   - features: List[str] (list of features included)
   - currency: str (default "INR")
   - is_active: bool (whether plan is available)

2. Create CreateOrderRequest model:
   - parent_id: str (Firebase user ID)
   - plan_id: str (subscription plan identifier)
   - Validator: plan_id must be valid plan

3. Create OrderResponse model:
   - order_id: str (Razorpay order ID)
   - amount: int (in paise)
   - currency: str
   - receipt: str (unique receipt ID)
   - created_at: datetime

4. Create VerifyPaymentRequest model:
   - order_id: str (Razorpay order ID)
   - payment_id: str (Razorpay payment ID)
   - signature: str (Razorpay signature for verification)

5. Create SubscriptionDetails model:
   - subscription_id: str
   - parent_id: str
   - plan_id: str
   - status: str (active, expired, cancelled)
   - start_date: datetime
   - end_date: datetime
   - auto_renew: bool

6. Create TransactionRecord model:
   - transaction_id: str
   - parent_id: str
   - order_id: str
   - payment_id: Optional[str]
   - amount: int
   - currency: str
   - status: str (pending, completed, failed)
   - created_at: datetime
   - completed_at: Optional[datetime]

7. Create SubscriptionStatusResponse model:
   - is_active: bool
   - plan_name: str
   - plan_id: str
   - days_remaining: int
   - expires_at: datetime
   - features: List[str]

8. Add validators:
   - Amounts must be positive integers
   - Status values must be from allowed list
   - Dates must be valid and logical (end_date > start_date)
   - Currency must be valid ISO code

9. Include Config with example values for documentation

10. Add comprehensive docstrings and type hints

INTEGRATE WITH:
- services/payment_service.py (will use these models)
- routers/payment_router.py (API request/response models)

OUTPUT FORMAT:
- Complete Python file with all imports
- All Pydantic models with validators
- Example values in Config classes
- Docstrings for each model
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/models/payment_models.py`
3. Paste and save

---

## Prompt 2: Subscription Plans Configuration

### Purpose
Define subscription plans with pricing, features, and durations.

### When to Use
After payment models - defines available subscription tiers.

### What You'll Get
JSON configuration file with all subscription plans.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/data/subscription_plans.json`

**Step 2**: Type this comment:
```json
// Define subscription plans for Mentor AI platform
// Plans: Free, Premium Monthly, Premium Yearly
// Free: ₹0, 1 diagnostic test, basic analytics, 50 practice questions/month
// Premium Monthly: ₹999/month, unlimited tests, advanced analytics, unlimited practice, personalized schedules, teaching resources
// Premium Yearly: ₹9999/year (₹833/month), all premium features + priority support
// Include: plan_id, name, price (in paise), duration_days, features array, is_active
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a subscription plans configuration file for an EdTech platform.

CONTEXT:
- Project: Mentor AI EdTech Platform
- File: tushar-backend/data/subscription_plans.json

GENERATE:
JSON configuration with three subscription tiers.

REQUIREMENTS:
Create JSON array with these plans:

1. Free Plan:
   - plan_id: "free"
   - name: "Free Plan"
   - price: 0 (in paise)
   - duration_days: 365 (perpetual, but tracked yearly)
   - features: ["1 diagnostic test", "Basic analytics", "50 practice questions per month", "Standard support"]
   - is_active: true

2. Premium Monthly:
   - plan_id: "premium_monthly"
   - name: "Premium Monthly"
   - price: 99900 (₹999 in paise)
   - duration_days: 30
   - features: ["Unlimited diagnostic tests", "Advanced AI analytics", "Unlimited practice questions", "Personalized study schedules", "Teaching resources for parents", "Progress tracking", "Priority support"]
   - is_active: true

3. Premium Yearly:
   - plan_id: "premium_yearly"
   - name: "Premium Yearly"
   - price: 999900 (₹9999 in paise, saves ₹2889)
   - duration_days: 365
   - features: ["All Premium Monthly features", "Priority support", "Early access to new features", "Dedicated success manager", "Annual progress reports"]
   - is_active: true

OUTPUT FORMAT:
- Valid JSON array
- Properly formatted and indented
- Include comments explaining pricing
```

**What to Do**:
1. Copy the generated JSON
2. Create file `tushar-backend/data/subscription_plans.json`
3. Paste and save

---

## Prompt 3: Razorpay Client Wrapper

### Purpose
Create a wrapper around Razorpay Python SDK for order creation and payment verification.

### When to Use
After subscription plans - creates Razorpay integration layer.

### What You'll Get
Complete Razorpay client with order and payment methods.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/razorpay_client.py`

**Step 2**: Type this comment:
```python
# Create Razorpay client wrapper for payment operations
# Initialize Razorpay client with key_id and key_secret from environment
# Implement functions:
# - create_order(amount, currency, receipt, notes) -> order dict
# - verify_payment_signature(order_id, payment_id, signature) -> bool
# - fetch_payment(payment_id) -> payment details
# - fetch_order(order_id) -> order details
# Use razorpay Python SDK
# Add error handling for Razorpay exceptions
# Add logging for all operations
# Add type hints and docstrings
# Validate inputs (amount > 0, currency is INR)
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a Razorpay client wrapper for payment operations.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, Razorpay Python SDK
- File: tushar-backend/services/razorpay_client.py

GENERATE:
A wrapper class around Razorpay SDK for order creation and payment verification.

REQUIREMENTS:
1. Create RazorpayClient class:
   - Initialize with key_id and key_secret from environment variables
   - Create razorpay.Client instance
   - Add error handling for missing credentials

2. Implement create_order method:
   - Parameters: amount (int, in paise), currency (str), receipt (str), notes (dict)
   - Validate: amount > 0, currency is valid
   - Call razorpay.order.create()
   - Return: order dict with order_id, amount, currency, status
   - Handle: Razorpay exceptions and network errors
   - Log: order creation attempts

3. Implement verify_payment_signature method:
   - Parameters: order_id (str), payment_id (str), signature (str)
   - Use razorpay.utility.verify_payment_signature()
   - Return: True if valid, False if invalid
   - Handle: verification exceptions
   - Log: verification attempts and results

4. Implement fetch_payment method:
   - Parameter: payment_id (str)
   - Call razorpay.payment.fetch()
   - Return: payment details (status, amount, method, etc.)
   - Handle: payment not found errors

5. Implement fetch_order method:
   - Parameter: order_id (str)
   - Call razorpay.order.fetch()
   - Return: order details
   - Handle: order not found errors

6. Add helper method generate_receipt_id:
   - Generate unique receipt ID using timestamp and random string
   - Format: "rcpt_YYYYMMDD_HHMMSS_XXXXX"

7. Add comprehensive error handling:
   - Catch razorpay.errors.BadRequestError
   - Catch razorpay.errors.ServerError
   - Catch network errors
   - Return meaningful error messages

8. Add logging for all operations (use Python logging module)

9. Add type hints and detailed docstrings

INTEGRATE WITH:
- Environment variables: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
- models/payment_models.py (for type hints)

OUTPUT FORMAT:
- Complete Python file with all imports
- RazorpayClient class with all methods
- Error handling and logging
- Example usage in docstring
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/razorpay_client.py`
3. Paste and save

---

## Prompt 4: Subscription Service

### Purpose
Manage subscription lifecycle: activation, status checks, expiration, cancellation.

### When to Use
After Razorpay client - creates subscription management logic.

### What You'll Get
Complete subscription service with CRUD operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/subscription_service.py`

**Step 2**: Type this comment:
```python
# Create subscription management service
# Load subscription plans from data/subscription_plans.json
# Implement functions:
# - get_all_plans() -> list of plans
# - get_plan_by_id(plan_id) -> plan details
# - activate_subscription(parent_id, plan_id, payment_id, order_id) -> subscription
# - get_subscription(parent_id) -> current subscription
# - check_subscription_status(parent_id) -> is_active, days_remaining
# - cancel_subscription(parent_id) -> cancelled subscription
# - is_premium_active(parent_id) -> bool
# Store subscriptions in Firestore collection "subscriptions"
# Calculate end_date based on plan duration_days
# Handle subscription expiration checks
# Add type hints, docstrings, error handling
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a subscription management service for handling subscription lifecycle.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/services/subscription_service.py

GENERATE:
A complete subscription service for managing user subscriptions.

REQUIREMENTS:
1. Load subscription plans:
   - Read from data/subscription_plans.json on initialization
   - Cache plans in memory
   - Provide get_all_plans() method
   - Provide get_plan_by_id(plan_id) method

2. Implement activate_subscription:
   - Parameters: parent_id, plan_id, payment_id, order_id
   - Get plan details from cached plans
   - Calculate start_date (now) and end_date (now + duration_days)
   - Create subscription document in Firestore:
     - Collection: "subscriptions"
     - Document ID: parent_id
     - Fields: subscription_id, parent_id, plan_id, status ("active"), start_date, end_date, payment_id, order_id, created_at
   - Return: SubscriptionDetails model
   - Handle: plan not found, Firestore errors

3. Implement get_subscription:
   - Parameter: parent_id
   - Fetch subscription from Firestore
   - Return: SubscriptionDetails or None if not found
   - Handle: Firestore errors

4. Implement check_subscription_status:
   - Parameter: parent_id
   - Get subscription from Firestore
   - Check if status == "active" and end_date > now
   - Calculate days_remaining
   - Return: SubscriptionStatusResponse
   - Handle: no subscription (return free plan status)

5. Implement is_premium_active:
   - Parameter: parent_id
   - Quick check if user has active premium subscription
   - Return: bool
   - Used by middleware for access control

6. Implement cancel_subscription:
   - Parameter: parent_id
   - Update subscription status to "cancelled"
   - Keep end_date unchanged (access until expiration)
   - Set auto_renew to False
   - Return: updated SubscriptionDetails

7. Implement get_subscription_history:
   - Parameter: parent_id
   - Fetch all past subscriptions from Firestore subcollection
   - Return: list of SubscriptionDetails
   - Ordered by created_at descending

8. Add helper method _is_subscription_expired:
   - Check if end_date < now
   - Return: bool

9. Add comprehensive error handling and logging

10. Add type hints and detailed docstrings

INTEGRATE WITH:
- models/payment_models.py (SubscriptionDetails, SubscriptionStatusResponse)
- data/subscription_plans.json (plan definitions)
- Firebase Firestore (subscriptions collection)

OUTPUT FORMAT:
- Complete Python file with all imports
- SubscriptionService class with all methods
- Firestore integration
- Error handling and logging
- Example usage in docstring
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/subscription_service.py`
3. Paste and save

---

## Prompt 5: Payment Service

### Purpose
Orchestrate payment flow: order creation, payment verification, subscription activation.

### When to Use
After subscription service - creates main payment orchestration.

### What You'll Get
Complete payment service coordinating all payment operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/payment_service.py`

**Step 2**: Type this comment:
```python
# Create payment orchestration service
# Integrate RazorpayClient and SubscriptionService
# Implement functions:
# - create_payment_order(parent_id, plan_id) -> OrderResponse
# - verify_and_activate(order_id, payment_id, signature) -> SubscriptionDetails
# - get_transaction_history(parent_id) -> list of transactions
# - record_transaction(parent_id, order_id, amount, status) -> transaction_id
# Store transactions in Firestore collection "transactions"
# Validate parent exists before creating order
# Verify payment signature before activation
# Handle payment failures and log all attempts
# Add type hints, docstrings, error handling
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a payment orchestration service that coordinates order creation, verification, and subscription activation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI, Razorpay, Firestore
- File: tushar-backend/services/payment_service.py

GENERATE:
A complete payment service that orchestrates the entire payment flow.

REQUIREMENTS:
1. Initialize with dependencies:
   - RazorpayClient instance
   - SubscriptionService instance
   - Firestore client

2. Implement create_payment_order:
   - Parameters: parent_id, plan_id
   - Validate parent exists in Firestore
   - Get plan details from SubscriptionService
   - Validate plan is active
   - Generate unique receipt ID
   - Create Razorpay order using RazorpayClient
   - Record transaction in Firestore (status: "pending")
   - Return: OrderResponse with order_id, amount, currency
   - Handle: parent not found, plan not found, Razorpay errors

3. Implement verify_and_activate:
   - Parameters: order_id, payment_id, signature
   - Verify payment signature using RazorpayClient
   - If signature invalid: raise error, log security incident
   - If signature valid:
     - Fetch order details from Razorpay
     - Extract parent_id and plan_id from order notes
     - Activate subscription using SubscriptionService
     - Update transaction status to "completed"
     - Return: SubscriptionDetails
   - Handle: verification failure, activation errors

4. Implement record_transaction:
   - Parameters: parent_id, order_id, amount, currency, status, payment_id (optional)
   - Create transaction document in Firestore:
     - Collection: "transactions"
     - Auto-generated document ID
     - Fields: transaction_id, parent_id, order_id, payment_id, amount, currency, status, created_at, completed_at
   - Return: transaction_id
   - Handle: Firestore errors

5. Implement get_transaction_history:
   - Parameter: parent_id
   - Fetch all transactions from Firestore
   - Filter by parent_id
   - Order by created_at descending
   - Return: list of TransactionRecord
   - Handle: no transactions found

6. Implement handle_payment_failure:
   - Parameters: order_id, reason
   - Update transaction status to "failed"
   - Log failure reason
   - Send notification (optional)

7. Add helper method _validate_parent_exists:
   - Check if parent exists in Firestore "parents" collection
   - Return: bool
   - Raise error if not found

8. Add comprehensive error handling:
   - Handle Razorpay errors
   - Handle Firestore errors
   - Handle validation errors
   - Provide meaningful error messages

9. Add logging for all operations

10. Add type hints and detailed docstrings

INTEGRATE WITH:
- services/razorpay_client.py (RazorpayClient)
- services/subscription_service.py (SubscriptionService)
- models/payment_models.py (all payment models)
- Firebase Firestore (transactions collection)

OUTPUT FORMAT:
- Complete Python file with all imports
- PaymentService class with all methods
- Error handling and logging
- Example usage in docstring
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/payment_service.py`
3. Paste and save

---

## Prompt 6: Payment Utilities

### Purpose
Helper functions for signature verification, amount conversion, and validation.

### When to Use
After payment service - creates utility functions.

### What You'll Get
Utility functions for payment operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/payment_utils.py`

**Step 2**: Type this comment:
```python
# Create payment utility functions
# Implement functions:
# - rupees_to_paise(rupees: float) -> int (convert ₹999 to 99900 paise)
# - paise_to_rupees(paise: int) -> float (convert 99900 paise to ₹999)
# - generate_receipt_id() -> str (unique receipt ID with timestamp)
# - validate_amount(amount: int) -> bool (check amount > 0)
# - format_currency(amount: int, currency: str) -> str (format for display)
# - calculate_discount(original_price, discounted_price) -> percentage
# Add type hints, docstrings, input validation
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create utility functions for payment operations.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11
- File: tushar-backend/utils/payment_utils.py

GENERATE:
Utility functions for payment processing and formatting.

REQUIREMENTS:
1. Implement rupees_to_paise:
   - Convert rupees (float) to paise (int)
   - Example: 999.50 → 99950
   - Handle: decimal precision

2. Implement paise_to_rupees:
   - Convert paise (int) to rupees (float)
   - Example: 99900 → 999.00
   - Return: formatted to 2 decimal places

3. Implement generate_receipt_id:
   - Generate unique receipt ID
   - Format: "rcpt_YYYYMMDD_HHMMSS_XXXXX"
   - Use timestamp and random string

4. Implement validate_amount:
   - Check if amount is positive integer
   - Return: bool

5. Implement format_currency:
   - Format amount for display
   - Example: 99900, "INR" → "₹999.00"
   - Support: INR, USD

6. Implement calculate_discount:
   - Calculate discount percentage
   - Example: original=11988, discounted=9999 → 16.6%
   - Return: float rounded to 1 decimal

7. Implement validate_signature_format:
   - Check if signature is valid hex string
   - Return: bool

8. Add type hints and docstrings for all functions

INTEGRATE WITH:
- services/payment_service.py (will use these utilities)

OUTPUT FORMAT:
- Complete Python file with all imports
- Standalone utility functions
- Docstrings with examples
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/utils/payment_utils.py`
3. Paste and save

---

## Prompt 7: Payment Router

### Purpose
Create FastAPI endpoints for payment operations.

### When to Use
After payment service - creates API layer.

### What You'll Get
Complete REST API for payment and subscription management.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/payment_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for payment endpoints
# Endpoints needed:
# - GET /api/payment/plans - Get all subscription plans
# - POST /api/payment/create-order - Create Razorpay order
# - POST /api/payment/verify - Verify payment and activate subscription
# - GET /api/payment/subscription - Get current subscription status
# - GET /api/payment/transactions - Get transaction history
# - POST /api/payment/cancel - Cancel subscription
# Use PaymentService and SubscriptionService
# Add authentication dependency (require parent login)
# Add request/response models from payment_models
# Add error handling and status codes
# Add OpenAPI documentation
# Add type hints and docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for payment and subscription endpoints.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/payment_router.py

GENERATE:
Complete REST API router for payment operations.

REQUIREMENTS:
1. Create APIRouter with prefix "/api/payment" and tag "Payment"

2. Implement GET /plans endpoint:
   - Description: "Get all available subscription plans"
   - Response: List[SubscriptionPlan]
   - No authentication required (public endpoint)
   - Return: all active plans from SubscriptionService

3. Implement POST /create-order endpoint:
   - Description: "Create Razorpay payment order"
   - Request: CreateOrderRequest (parent_id, plan_id)
   - Response: OrderResponse
   - Authentication: Required (parent must be logged in)
   - Call: PaymentService.create_payment_order()
   - Status: 201 Created on success
   - Errors: 404 if plan not found, 400 if validation fails

4. Implement POST /verify endpoint:
   - Description: "Verify payment and activate subscription"
   - Request: VerifyPaymentRequest (order_id, payment_id, signature)
   - Response: SubscriptionDetails
   - Authentication: Required
   - Call: PaymentService.verify_and_activate()
   - Status: 200 OK on success
   - Errors: 400 if signature invalid, 500 if activation fails

5. Implement GET /subscription endpoint:
   - Description: "Get current subscription status"
   - Path parameter: parent_id
   - Response: SubscriptionStatusResponse
   - Authentication: Required (parent can only view own subscription)
   - Call: SubscriptionService.check_subscription_status()
   - Status: 200 OK

6. Implement GET /transactions endpoint:
   - Description: "Get transaction history"
   - Path parameter: parent_id
   - Response: List[TransactionRecord]
   - Authentication: Required
   - Call: PaymentService.get_transaction_history()
   - Status: 200 OK

7. Implement POST /cancel endpoint:
   - Description: "Cancel subscription"
   - Path parameter: parent_id
   - Response: SubscriptionDetails
   - Authentication: Required
   - Call: SubscriptionService.cancel_subscription()
   - Status: 200 OK

8. Add authentication dependency:
   - Use get_current_user dependency (from auth)
   - Verify user is parent
   - Verify user can only access own data

9. Add comprehensive error handling:
   - 400 Bad Request for validation errors
   - 401 Unauthorized for auth failures
   - 403 Forbidden for access denied
   - 404 Not Found for missing resources
   - 500 Internal Server Error for server errors

10. Add OpenAPI documentation with examples

11. Add type hints and docstrings

INTEGRATE WITH:
- services/payment_service.py (PaymentService)
- services/subscription_service.py (SubscriptionService)
- models/payment_models.py (all models)
- routers/auth_router.py (authentication dependency)

OUTPUT FORMAT:
- Complete Python file with all imports
- APIRouter with all endpoints
- Error handling
- OpenAPI documentation
- Example requests in docstrings
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/routers/payment_router.py`
3. Paste and save

---

## Prompt 8: Subscription Middleware

### Purpose
Create middleware to check premium subscription status for protected endpoints.

### When to Use
After payment router - creates access control layer.

### What You'll Get
Middleware for premium feature gating.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/middleware/subscription_middleware.py`

**Step 2**: Type this comment:
```python
# Create subscription middleware for premium access control
# Implement dependency function require_premium_subscription
# Check if user has active premium subscription
# Use SubscriptionService.is_premium_active()
# Raise HTTPException 403 if not premium
# Return user_id if premium active
# Add clear error message with upgrade link
# Use as dependency in premium endpoints
# Add type hints and docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create middleware for premium subscription access control.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI
- File: tushar-backend/middleware/subscription_middleware.py

GENERATE:
Middleware dependency for checking premium subscription status.

REQUIREMENTS:
1. Create require_premium_subscription dependency function:
   - Parameters: current_user (from auth dependency)
   - Check: SubscriptionService.is_premium_active(current_user.id)
   - If not premium:
     - Raise HTTPException 403 Forbidden
     - Message: "Premium subscription required. Please upgrade to access this feature."
     - Include: upgrade_url in response
   - If premium:
     - Return: current_user
   - Handle: subscription check errors

2. Create check_feature_access dependency:
   - Parameters: current_user, feature_name
   - Check if user's plan includes specific feature
   - Return: bool
   - Used for granular feature gating

3. Create get_subscription_or_free dependency:
   - Always succeeds but returns subscription status
   - Used for endpoints that work differently for free vs premium
   - Return: SubscriptionStatusResponse

4. Add comprehensive error handling

5. Add type hints and docstrings

INTEGRATE WITH:
- services/subscription_service.py (SubscriptionService)
- routers/auth_router.py (get_current_user dependency)
- models/payment_models.py (SubscriptionStatusResponse)

OUTPUT FORMAT:
- Complete Python file with all imports
- Dependency functions
- Error handling
- Example usage in docstring
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/middleware/subscription_middleware.py`
3. Paste and save

---

## Prompt 9: Update Main App

### Purpose
Register payment router in main FastAPI application.

### When to Use
After payment router - integrates payment API into app.

### What You'll Get
Updated main.py with payment routes.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment where routers are registered:
```python
# Import and register payment router
# from routers.payment_router import router as payment_router
# app.include_router(payment_router)
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: Manual Update

**Open file**: `tushar-backend/main.py`

**Add import** (near other router imports):
```python
from routers.payment_router import router as payment_router
```

**Add router registration** (near other include_router calls):
```python
app.include_router(payment_router)
```

**Save the file**

---

## Prompt 10: Environment Variables

### Purpose
Add Razorpay credentials to environment configuration.

### When to Use
After all code is generated - configures Razorpay keys.

### What You'll Get
Updated .env.example with Razorpay variables.

---

### Manual Update

**Open file**: `tushar-backend/.env.example`

**Add these lines**:
```
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

**Save the file**

**Note**: Actual keys will be added in CONFIGURATION.md

---

## Prompt 11: Update Requirements

### Purpose
Add Razorpay SDK to Python dependencies.

### When to Use
After environment variables - adds required package.

### What You'll Get
Updated requirements.txt with Razorpay.

---

### Manual Update

**Open file**: `tushar-backend/requirements.txt`

**Add this line**:
```
razorpay==1.4.1
```

**Save the file**

**Install the package**:
```bash
pip install razorpay==1.4.1
```

---

## Summary

You've generated all the code for payment integration! Here's what you created:

1. ✅ Payment and subscription models
2. ✅ Subscription plans configuration
3. ✅ Razorpay client wrapper
4. ✅ Subscription management service
5. ✅ Payment orchestration service
6. ✅ Payment utility functions
7. ✅ Payment API router
8. ✅ Subscription middleware
9. ✅ Main app integration
10. ✅ Environment configuration
11. ✅ Dependencies update

**Next Steps**:
1. Follow CONFIGURATION.md to set up Razorpay account and get API keys
2. Follow TESTING.md to test payment flow in sandbox mode
3. Verify all endpoints work correctly

**Files Created**:
- `models/payment_models.py`
- `data/subscription_plans.json`
- `services/razorpay_client.py`
- `services/subscription_service.py`
- `services/payment_service.py`
- `utils/payment_utils.py`
- `routers/payment_router.py`
- `middleware/subscription_middleware.py`

Ready to configure Razorpay! 💳

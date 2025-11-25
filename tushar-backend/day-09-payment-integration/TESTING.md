# Testing Guide for Day 9: Payment Integration

## Overview

This guide provides step-by-step instructions to test the complete payment flow using Razorpay test mode. All tests use fake payment credentials and no real money is involved.

**Prerequisites**:
- ✅ Completed CONFIGURATION.md
- ✅ Backend server running on http://localhost:8000
- ✅ Razorpay test keys configured
- ✅ Test parent account created

---

## Test 1: Get Subscription Plans

### Purpose
Verify that subscription plans are loaded and accessible.

### Steps

1. **Make API request**:
   ```bash
   curl -X GET http://localhost:8000/api/payment/plans
   ```

2. **Review response**

### Expected Result

```json
[
  {
    "plan_id": "free",
    "name": "Free Plan",
    "price": 0,
    "duration_days": 365,
    "features": [
      "1 diagnostic test",
      "Basic analytics",
      "50 practice questions per month",
      "Standard support"
    ],
    "currency": "INR",
    "is_active": true
  },
  {
    "plan_id": "premium_monthly",
    "name": "Premium Monthly",
    "price": 99900,
    "duration_days": 30,
    "features": [
      "Unlimited diagnostic tests",
      "Advanced AI analytics",
      "Unlimited practice questions",
      "Personalized study schedules",
      "Teaching resources for parents",
      "Progress tracking",
      "Priority support"
    ],
    "currency": "INR",
    "is_active": true
  },
  {
    "plan_id": "premium_yearly",
    "name": "Premium Yearly",
    "price": 999900,
    "duration_days": 365,
    "features": [
      "All Premium Monthly features",
      "Priority support",
      "Early access to new features",
      "Dedicated success manager",
      "Annual progress reports"
    ],
    "currency": "INR",
    "is_active": true
  }
]
```

### If It Fails

- **Empty array**: Check `data/subscription_plans.json` exists and is valid JSON
- **500 error**: Check server logs for file read errors
- **404 error**: Verify payment router is registered in main.py

---

## Test 2: Create Payment Order

### Purpose
Test order creation with Razorpay for premium subscription.

### Steps

1. **Get parent authentication token** (from Day 2):
   ```bash
   # Login as parent to get token
   curl -X POST http://localhost:8000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "testpassword123"
     }'
   ```
   
   Save the `access_token` from response.

2. **Create payment order**:
   ```bash
   curl -X POST http://localhost:8000/api/payment/create-order \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
     -d '{
       "parent_id": "test_parent_id",
       "plan_id": "premium_monthly"
     }'
   ```

3. **Review response**

### Expected Result

```json
{
  "order_id": "order_XXXXXXXXXXXXX",
  "amount": 99900,
  "currency": "INR",
  "receipt": "rcpt_20241125_143022_ABCDE",
  "created_at": "2024-11-25T14:30:22.123456"
}
```

**Key Points**:
- `order_id` starts with `order_`
- `amount` is 99900 (₹999 in paise)
- `receipt` has timestamp format
- Order is created in Razorpay

### If It Fails

- **401 Unauthorized**: Check authentication token is valid
- **404 Plan not found**: Verify plan_id is correct ("premium_monthly")
- **400 Bad Request**: Check parent_id exists in database
- **500 Razorpay error**: Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correct
- **Connection error**: Check internet connection, Razorpay API is accessible

---

## Test 3: Verify Payment (Simulated)

### Purpose
Test payment verification and subscription activation.

### Steps

1. **Simulate payment success**:
   
   Since we can't actually complete payment via curl, we'll simulate the signature:
   
   ```bash
   # In a real scenario, frontend would:
   # 1. Open Razorpay checkout with order_id
   # 2. User enters test card: 4111 1111 1111 1111
   # 3. Razorpay returns payment_id and signature
   # 4. Frontend sends these to backend
   
   # For testing, we'll use Python to generate valid signature
   python3 << 'EOF'
   import hmac
   import hashlib
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   
   # Replace with your actual order_id from Test 2
   order_id = "order_XXXXXXXXXXXXX"
   payment_id = "pay_test_123456789"  # Simulated payment ID
   
   # Get secret from environment
   secret = os.getenv('RAZORPAY_KEY_SECRET')
   
   # Generate signature
   message = f"{order_id}|{payment_id}"
   signature = hmac.new(
       secret.encode(),
       message.encode(),
       hashlib.sha256
   ).hexdigest()
   
   print(f"Order ID: {order_id}")
   print(f"Payment ID: {payment_id}")
   print(f"Signature: {signature}")
   EOF
   ```

2. **Verify payment**:
   ```bash
   curl -X POST http://localhost:8000/api/payment/verify \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
     -d '{
       "order_id": "order_XXXXXXXXXXXXX",
       "payment_id": "pay_test_123456789",
       "signature": "GENERATED_SIGNATURE_HERE"
     }'
   ```

3. **Review response**

### Expected Result

```json
{
  "subscription_id": "sub_XXXXXXXXXXXXX",
  "parent_id": "test_parent_id",
  "plan_id": "premium_monthly",
  "status": "active",
  "start_date": "2024-11-25T14:35:00.000000",
  "end_date": "2024-12-25T14:35:00.000000",
  "auto_renew": false
}
```

**Key Points**:
- `status` is "active"
- `end_date` is 30 days after `start_date`
- Subscription is stored in Firestore
- Transaction is marked as "completed"

### If It Fails

- **400 Invalid signature**: Signature doesn't match, regenerate with correct order_id
- **404 Order not found**: Check order_id is correct
- **500 Activation error**: Check Firestore connection, permissions
- **Signature verification fails**: Ensure RAZORPAY_KEY_SECRET is correct

---

## Test 4: Check Subscription Status

### Purpose
Verify subscription status can be retrieved.

### Steps

1. **Get subscription status**:
   ```bash
   curl -X GET http://localhost:8000/api/payment/subscription/test_parent_id \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

2. **Review response**

### Expected Result

```json
{
  "is_active": true,
  "plan_name": "Premium Monthly",
  "plan_id": "premium_monthly",
  "days_remaining": 30,
  "expires_at": "2024-12-25T14:35:00.000000",
  "features": [
    "Unlimited diagnostic tests",
    "Advanced AI analytics",
    "Unlimited practice questions",
    "Personalized study schedules",
    "Teaching resources for parents",
    "Progress tracking",
    "Priority support"
  ]
}
```

**Key Points**:
- `is_active` is true
- `days_remaining` is approximately 30
- All premium features are listed

### If It Fails

- **404 Not found**: Parent has no subscription (check Test 3 succeeded)
- **is_active is false**: Subscription expired or not activated
- **401 Unauthorized**: Check authentication token

---

## Test 5: Get Transaction History

### Purpose
Verify transaction records are stored and retrievable.

### Steps

1. **Get transactions**:
   ```bash
   curl -X GET http://localhost:8000/api/payment/transactions/test_parent_id \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

2. **Review response**

### Expected Result

```json
[
  {
    "transaction_id": "txn_XXXXXXXXXXXXX",
    "parent_id": "test_parent_id",
    "order_id": "order_XXXXXXXXXXXXX",
    "payment_id": "pay_test_123456789",
    "amount": 99900,
    "currency": "INR",
    "status": "completed",
    "created_at": "2024-11-25T14:30:22.123456",
    "completed_at": "2024-11-25T14:35:00.000000"
  }
]
```

**Key Points**:
- Transaction shows "completed" status
- Amount matches order amount
- Both created_at and completed_at are present

### If It Fails

- **Empty array**: No transactions found (check Test 2 and 3 succeeded)
- **404 Not found**: Parent ID doesn't exist
- **Wrong status**: Transaction not completed (check Test 3)

---

## Test 6: Test Premium Access Control

### Purpose
Verify that premium endpoints require active subscription.

### Steps

1. **Create test premium endpoint** (if not exists):
   
   Add to `routers/payment_router.py` or any router:
   ```python
   from middleware.subscription_middleware import require_premium_subscription
   
   @router.get("/api/premium/test")
   async def test_premium_feature(
       current_user = Depends(require_premium_subscription)
   ):
       return {"message": "Welcome to premium feature!", "user_id": current_user.id}
   ```

2. **Test with premium user**:
   ```bash
   curl -X GET http://localhost:8000/api/premium/test \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

3. **Test with free user** (create new user without subscription):
   ```bash
   # Login as different user without premium
   curl -X GET http://localhost:8000/api/premium/test \
     -H "Authorization: Bearer FREE_USER_TOKEN_HERE"
   ```

### Expected Result

**Premium user**:
```json
{
  "message": "Welcome to premium feature!",
  "user_id": "test_parent_id"
}
```

**Free user**:
```json
{
  "detail": "Premium subscription required. Please upgrade to access this feature."
}
```
Status code: 403 Forbidden

### If It Fails

- **Both users get access**: Middleware not applied, check dependency
- **Premium user denied**: Subscription not active, check Test 4
- **500 error**: Check middleware implementation

---

## Test 7: Test Subscription Cancellation

### Purpose
Verify subscription can be cancelled.

### Steps

1. **Cancel subscription**:
   ```bash
   curl -X POST http://localhost:8000/api/payment/cancel/test_parent_id \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

2. **Check status after cancellation**:
   ```bash
   curl -X GET http://localhost:8000/api/payment/subscription/test_parent_id \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

### Expected Result

**Cancel response**:
```json
{
  "subscription_id": "sub_XXXXXXXXXXXXX",
  "parent_id": "test_parent_id",
  "plan_id": "premium_monthly",
  "status": "cancelled",
  "start_date": "2024-11-25T14:35:00.000000",
  "end_date": "2024-12-25T14:35:00.000000",
  "auto_renew": false
}
```

**Status check**:
- `is_active` should still be true (until end_date)
- `status` is "cancelled"
- Access continues until end_date

### If It Fails

- **404 Not found**: Subscription doesn't exist
- **Status not updated**: Check Firestore write permissions
- **Access immediately revoked**: Should maintain access until end_date

---

## Test 8: Test Payment Failure Scenario

### Purpose
Test handling of failed payments.

### Steps

1. **Create order** (same as Test 2)

2. **Simulate failed payment**:
   ```bash
   # Use invalid signature to simulate failure
   curl -X POST http://localhost:8000/api/payment/verify \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
     -d '{
       "order_id": "order_XXXXXXXXXXXXX",
       "payment_id": "pay_test_failed",
       "signature": "invalid_signature_12345"
     }'
   ```

### Expected Result

```json
{
  "detail": "Payment verification failed. Invalid signature."
}
```
Status code: 400 Bad Request

**Key Points**:
- Subscription is NOT activated
- Transaction remains "pending" or marked "failed"
- User is not charged (in test mode)

### If It Fails

- **Subscription activated**: Signature verification not working
- **500 error**: Check error handling in payment service

---

## Test 9: Test Expired Subscription

### Purpose
Verify expired subscriptions are handled correctly.

### Steps

1. **Manually expire subscription** (in Firestore):
   - Open Firebase Console
   - Go to Firestore Database
   - Find subscription document for test_parent_id
   - Update `end_date` to yesterday's date
   - Save

2. **Check subscription status**:
   ```bash
   curl -X GET http://localhost:8000/api/payment/subscription/test_parent_id \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

3. **Try to access premium feature**:
   ```bash
   curl -X GET http://localhost:8000/api/premium/test \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
   ```

### Expected Result

**Status check**:
```json
{
  "is_active": false,
  "plan_name": "Premium Monthly",
  "plan_id": "premium_monthly",
  "days_remaining": -1,
  "expires_at": "2024-11-24T14:35:00.000000",
  "features": []
}
```

**Premium access**:
```json
{
  "detail": "Premium subscription required. Please upgrade to access this feature."
}
```
Status code: 403 Forbidden

### If It Fails

- **Still shows active**: Check date comparison logic
- **Access still granted**: Middleware not checking expiration
- **Wrong days_remaining**: Check calculation logic

---

## Test 10: End-to-End Payment Flow

### Purpose
Test complete payment flow from plan selection to premium access.

### Steps

1. **Get plans** → Test 1
2. **Create order** → Test 2
3. **Verify payment** → Test 3
4. **Check subscription** → Test 4
5. **Access premium feature** → Test 6
6. **View transactions** → Test 5

### Expected Result

All steps succeed in sequence, user has active premium subscription and can access premium features.

### If It Fails

Identify which step fails and refer to that test's troubleshooting section.

---

## Testing with Razorpay Dashboard

### View Orders

1. Open Razorpay Dashboard: https://dashboard.razorpay.com/
2. Ensure "Test Mode" is active
3. Go to "Transactions" → "Orders"
4. You should see orders created in Test 2
5. Click order to view details

### View Payments

1. Go to "Transactions" → "Payments"
2. You should see simulated payments
3. In real scenario (with frontend), you'd see actual test payments here

### View Test Cards

1. Go to "Settings" → "Test Data"
2. View available test cards and UPI IDs
3. Use these for frontend testing

---

## Common Issues and Solutions

### Issue 1: "Invalid API Key"

**Symptoms**: 401 error from Razorpay

**Solutions**:
- Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env
- Ensure keys are from Test Mode (start with `rzp_test_`)
- Restart backend server after updating .env
- Check keys are not expired or regenerated

### Issue 2: "Signature Verification Failed"

**Symptoms**: Payment verification returns 400 error

**Solutions**:
- Ensure signature is generated correctly using HMAC-SHA256
- Verify order_id and payment_id match exactly
- Check RAZORPAY_KEY_SECRET is correct
- Ensure no extra spaces in signature string

### Issue 3: "Subscription Not Activated"

**Symptoms**: Payment verified but subscription not active

**Solutions**:
- Check Firestore permissions allow writes
- Verify subscription_service.py is working
- Check Firestore collection "subscriptions" exists
- Review server logs for errors

### Issue 4: "Transaction Not Recorded"

**Symptoms**: Payment succeeds but no transaction in history

**Solutions**:
- Check Firestore collection "transactions" exists
- Verify payment_service.py records transactions
- Check Firestore write permissions
- Review server logs for errors

### Issue 5: "Premium Access Denied"

**Symptoms**: User has active subscription but can't access premium features

**Solutions**:
- Verify subscription status is "active"
- Check end_date is in future
- Ensure middleware is applied to premium endpoints
- Verify authentication token is valid

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Subscription plans retrieval
- ✅ Payment order creation
- ✅ Payment verification
- ✅ Subscription activation
- ✅ Subscription status checks
- ✅ Transaction history
- ✅ Premium access control
- ✅ Subscription cancellation
- ✅ Payment failure handling
- ✅ Expired subscription handling

**Next Steps**:
1. Review EXPECTED-OUTCOME.md to verify all criteria are met
2. Test with frontend integration (Day 9 Frontend)
3. Move to Day 10: Cloud Run Deployment

**Important Notes**:
- All tests use Razorpay test mode
- No real money is involved
- Use test cards for frontend testing
- Switch to live mode only after thorough testing

Payment system is working! 💳✅

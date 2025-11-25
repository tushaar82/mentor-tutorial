# Troubleshooting Guide for Day 9: Payment Integration

## Overview

This guide helps you diagnose and fix common issues with Razorpay payment integration, subscription management, and premium access control.

---

## Issue 1: "Invalid API Key" or "Authentication Failed"

### Symptoms
- 401 Unauthorized error from Razorpay
- Error message: "Invalid API key"
- Payment order creation fails

### Possible Causes
1. Razorpay keys not set in environment
2. Wrong keys (live keys in test mode or vice versa)
3. Keys have extra spaces or newlines
4. Environment variables not loaded

### Solutions

**Solution 1: Verify environment variables**
```bash
# Check .env file
cat .env | grep RAZORPAY

# Should show:
# RAZORPAY_KEY_ID=rzp_test_...
# RAZORPAY_KEY_SECRET=...
```

**Solution 2: Check key format**
```bash
# Test mode keys start with rzp_test_
# Live mode keys start with rzp_live_

# Verify in Python
python3 << 'EOF'
import os
from dotenv import load_dotenv
load_dotenv()
key_id = os.getenv('RAZORPAY_KEY_ID')
print(f"Key ID: {key_id}")
print(f"Starts with rzp_test_: {key_id.startswith('rzp_test_') if key_id else False}")
EOF
```

**Solution 3: Regenerate keys**
1. Go to Razorpay Dashboard
2. Settings → API Keys
3. Click "Regenerate Test Keys"
4. Update .env with new keys
5. Restart backend server

**Solution 4: Restart server**
```bash
# Stop server (Ctrl+C)
# Restart
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload
```

### Verification
```bash
# Test Razorpay connection
python3 << 'EOF'
import os
from dotenv import load_dotenv
import razorpay

load_dotenv()
client = razorpay.Client(auth=(
    os.getenv('RAZORPAY_KEY_ID'),
    os.getenv('RAZORPAY_KEY_SECRET')
))
print("✅ Authentication successful")
EOF
```

---

## Issue 2: "Payment Signature Verification Failed"

### Symptoms
- Payment verification returns 400 error
- Error message: "Invalid signature"
- Subscription not activated despite payment

### Possible Causes
1. Wrong secret key used for verification
2. Order ID or payment ID mismatch
3. Signature format incorrect
4. Tampering or man-in-the-middle attack

### Solutions

**Solution 1: Verify signature generation**
```python
# Test signature generation
import hmac
import hashlib
import os
from dotenv import load_dotenv

load_dotenv()

order_id = "order_MNOPqrstuvwxyz"  # Replace with actual
payment_id = "pay_XYZ123ABC"       # Replace with actual
secret = os.getenv('RAZORPAY_KEY_SECRET')

# Generate expected signature
message = f"{order_id}|{payment_id}"
expected_signature = hmac.new(
    secret.encode(),
    message.encode(),
    hashlib.sha256
).hexdigest()

print(f"Expected signature: {expected_signature}")
```

**Solution 2: Check order and payment IDs**
```bash
# Verify IDs match exactly (no extra spaces)
# Order ID format: order_XXXXXXXXXXXXX
# Payment ID format: pay_XXXXXXXXXXXXX
```

**Solution 3: Verify secret key**
```bash
# Ensure RAZORPAY_KEY_SECRET is correct
# Check in Razorpay Dashboard: Settings → API Keys
# Click "Show" to reveal secret
# Compare with .env value
```

**Solution 4: Check for tampering**
```bash
# If signature consistently fails:
# 1. Check network security (HTTPS)
# 2. Verify frontend sends correct data
# 3. Check for proxy or middleware modifying requests
```

### Verification
```bash
# Test verification endpoint
curl -X POST http://localhost:8000/api/payment/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "order_id": "order_XXX",
    "payment_id": "pay_XXX",
    "signature": "VALID_SIGNATURE"
  }'

# Should return subscription details if signature is valid
```

---

## Issue 3: "Subscription Not Activated"

### Symptoms
- Payment verified successfully
- But subscription status shows inactive
- Premium features still blocked

### Possible Causes
1. Firestore write failed
2. Subscription service error
3. Date calculation error
4. Transaction not completed

### Solutions

**Solution 1: Check Firestore permissions**
```bash
# Verify Firebase Admin SDK is initialized
# Check Firestore rules allow backend writes
# Test Firestore connection:

python3 << 'EOF'
from firebase_admin import firestore
db = firestore.client()
test_doc = db.collection('subscriptions').document('test').set({
    'test': True
})
print("✅ Firestore write successful")
EOF
```

**Solution 2: Check subscription service logs**
```bash
# Check server logs for errors
tail -f logs/app.log | grep subscription

# Look for:
# - Firestore errors
# - Date calculation errors
# - Validation errors
```

**Solution 3: Manually verify in Firestore**
1. Open Firebase Console
2. Go to Firestore Database
3. Check `subscriptions` collection
4. Find document with parent_id
5. Verify fields:
   - status: "active"
   - end_date: future date
   - payment_id: present

**Solution 4: Check date calculation**
```python
# Test date calculation
from datetime import datetime, timedelta

start_date = datetime.now()
duration_days = 30
end_date = start_date + timedelta(days=duration_days)

print(f"Start: {start_date}")
print(f"End: {end_date}")
print(f"Is future: {end_date > datetime.now()}")
```

### Verification
```bash
# Check subscription status
curl -X GET http://localhost:8000/api/payment/subscription/PARENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should show:
# "is_active": true
# "days_remaining": 30 (approximately)
```

---

## Issue 4: "Premium Access Denied" Despite Active Subscription

### Symptoms
- Subscription shows active
- But premium endpoints return 403
- Middleware blocks access

### Possible Causes
1. Middleware not checking correctly
2. Subscription expired (end_date passed)
3. Authentication token invalid
4. Parent ID mismatch

### Solutions

**Solution 1: Verify subscription is truly active**
```bash
# Check subscription details
curl -X GET http://localhost:8000/api/payment/subscription/PARENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verify:
# - is_active: true
# - end_date: future date
# - days_remaining: positive number
```

**Solution 2: Check middleware logic**
```python
# In subscription_middleware.py
# Ensure logic is:
# 1. Get subscription
# 2. Check status == "active"
# 3. Check end_date > now
# 4. Return True if both conditions met
```

**Solution 3: Verify authentication**
```bash
# Test authentication token
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should return user details
# Verify parent_id matches subscription parent_id
```

**Solution 4: Check middleware is applied**
```python
# In router, verify dependency is used:
@router.get("/api/premium/feature")
async def premium_feature(
    current_user = Depends(require_premium_subscription)  # ← Must be present
):
    ...
```

### Verification
```bash
# Test premium endpoint
curl -X GET http://localhost:8000/api/premium/test \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should return success for premium users
# Should return 403 for free users
```

---

## Issue 5: "Transaction Not Recorded"

### Symptoms
- Payment succeeds
- Subscription activated
- But transaction history is empty

### Possible Causes
1. Transaction recording failed
2. Firestore write error
3. Transaction service not called
4. Wrong collection name

### Solutions

**Solution 1: Check Firestore collection**
1. Open Firebase Console
2. Go to Firestore Database
3. Check `transactions` collection exists
4. Verify documents are being created

**Solution 2: Check transaction service**
```python
# Verify record_transaction is called in payment_service.py
# After order creation:
transaction_id = await self.record_transaction(
    parent_id=parent_id,
    order_id=order_id,
    amount=amount,
    currency="INR",
    status="pending"
)
```

**Solution 3: Check Firestore permissions**
```bash
# Test Firestore write to transactions
python3 << 'EOF'
from firebase_admin import firestore
db = firestore.client()
doc_ref = db.collection('transactions').add({
    'test': True,
    'created_at': firestore.SERVER_TIMESTAMP
})
print(f"✅ Transaction write successful: {doc_ref[1].id}")
EOF
```

**Solution 4: Check logs**
```bash
# Look for transaction recording errors
tail -f logs/app.log | grep transaction
```

### Verification
```bash
# Get transaction history
curl -X GET http://localhost:8000/api/payment/transactions/PARENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should return array of transactions
```

---

## Issue 6: "Order Creation Fails"

### Symptoms
- Create order endpoint returns 500 error
- Error message: "Failed to create order"
- No order in Razorpay dashboard

### Possible Causes
1. Razorpay API error
2. Invalid amount (must be in paise)
3. Network connectivity issue
4. Plan not found

### Solutions

**Solution 1: Verify plan exists**
```bash
# Check subscription plans
curl -X GET http://localhost:8000/api/payment/plans

# Verify plan_id exists in response
```

**Solution 2: Check amount format**
```python
# Amount must be in paise (integer)
# ₹999 = 99900 paise
# ₹9999 = 999900 paise

# Verify in subscription_plans.json:
# "price": 99900  # Not 999 or 999.00
```

**Solution 3: Test Razorpay API directly**
```python
import razorpay
import os
from dotenv import load_dotenv

load_dotenv()
client = razorpay.Client(auth=(
    os.getenv('RAZORPAY_KEY_ID'),
    os.getenv('RAZORPAY_KEY_SECRET')
))

try:
    order = client.order.create({
        'amount': 99900,
        'currency': 'INR',
        'receipt': 'test_receipt_123'
    })
    print(f"✅ Order created: {order['id']}")
except Exception as e:
    print(f"❌ Error: {e}")
```

**Solution 4: Check network**
```bash
# Test Razorpay API connectivity
curl https://api.razorpay.com/v1/

# Should return Razorpay API response
```

### Verification
```bash
# Create order
curl -X POST http://localhost:8000/api/payment/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"parent_id": "test", "plan_id": "premium_monthly"}'

# Should return order_id
```

---

## Issue 7: "Razorpay SDK Not Found"

### Symptoms
- Import error: "No module named 'razorpay'"
- Server fails to start
- Payment endpoints not working

### Possible Causes
1. Razorpay package not installed
2. Wrong virtual environment
3. Requirements not installed

### Solutions

**Solution 1: Install Razorpay**
```bash
cd tushar-backend
source venv/bin/activate
pip install razorpay==1.4.1
```

**Solution 2: Verify installation**
```bash
pip show razorpay

# Should show:
# Name: razorpay
# Version: 1.4.1
```

**Solution 3: Update requirements.txt**
```bash
# Add to requirements.txt
echo "razorpay==1.4.1" >> requirements.txt

# Install all requirements
pip install -r requirements.txt
```

**Solution 4: Check virtual environment**
```bash
# Ensure you're in the right venv
which python

# Should show path to venv/bin/python
```

### Verification
```bash
# Test import
python -c "import razorpay; print('✅ Razorpay imported successfully')"
```

---

## Issue 8: "Subscription Plans Not Loading"

### Symptoms
- GET /plans returns empty array
- Error: "File not found"
- Plans endpoint returns 500 error

### Possible Causes
1. subscription_plans.json doesn't exist
2. Wrong file path
3. Invalid JSON syntax
4. File permissions

### Solutions

**Solution 1: Verify file exists**
```bash
ls -la tushar-backend/data/subscription_plans.json

# Should show file with read permissions
```

**Solution 2: Validate JSON**
```bash
# Check JSON syntax
python3 -m json.tool tushar-backend/data/subscription_plans.json

# Should output formatted JSON
# If error, fix JSON syntax
```

**Solution 3: Check file path in code**
```python
# In subscription_service.py
# Ensure path is correct:
with open('data/subscription_plans.json', 'r') as f:
    plans = json.load(f)
```

**Solution 4: Check file permissions**
```bash
# Ensure file is readable
chmod 644 tushar-backend/data/subscription_plans.json
```

### Verification
```bash
# Get plans
curl -X GET http://localhost:8000/api/payment/plans

# Should return 3 plans
```

---

## Issue 9: "Webhook Signature Verification Failed"

### Symptoms
- Webhook endpoint returns 400
- Error: "Invalid webhook signature"
- Webhook events not processed

### Possible Causes
1. Wrong webhook secret
2. Signature algorithm mismatch
3. Request body modified
4. Webhook secret not set

### Solutions

**Solution 1: Get webhook secret**
1. Go to Razorpay Dashboard
2. Settings → Webhooks
3. Create webhook or view existing
4. Copy webhook secret
5. Add to .env: `RAZORPAY_WEBHOOK_SECRET=whsec_...`

**Solution 2: Verify signature algorithm**
```python
# Webhook signature uses HMAC-SHA256
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

**Solution 3: Don't modify request body**
```python
# Use raw request body for verification
# Don't parse JSON before verification
raw_body = await request.body()
# Verify signature with raw_body
# Then parse JSON
```

**Solution 4: Test webhook locally**
```bash
# Use Razorpay webhook testing tool
# Or use ngrok to expose local server
ngrok http 8000

# Add ngrok URL to Razorpay webhooks
```

### Verification
```bash
# Test webhook endpoint
curl -X POST http://localhost:8000/api/payment/webhook \
  -H "Content-Type: application/json" \
  -H "X-Razorpay-Signature: VALID_SIGNATURE" \
  -d '{"event": "payment.captured", "payload": {...}}'
```

---

## Issue 10: "Firestore Permission Denied"

### Symptoms
- Error: "Permission denied"
- Subscription/transaction writes fail
- 500 error on payment endpoints

### Possible Causes
1. Firestore rules too restrictive
2. Firebase Admin SDK not initialized
3. Service account key invalid
4. Wrong project selected

### Solutions

**Solution 1: Check Firestore rules**
```javascript
// In Firebase Console → Firestore → Rules
// Ensure backend (admin SDK) can write:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscriptions/{parentId} {
      allow read: if request.auth != null && request.auth.uid == parentId;
      allow write: if false; // Only admin SDK can write
    }
    match /transactions/{transactionId} {
      allow read: if request.auth != null && 
                     resource.data.parent_id == request.auth.uid;
      allow write: if false; // Only admin SDK can write
    }
  }
}
```

**Solution 2: Verify Firebase Admin SDK**
```python
# Test Firebase initialization
import firebase_admin
from firebase_admin import credentials, firestore

# Check if initialized
if not firebase_admin._apps:
    cred = credentials.Certificate('path/to/serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("✅ Firebase initialized")
```

**Solution 3: Check service account key**
```bash
# Verify service account key exists
ls -la serviceAccountKey.json

# Verify it's valid JSON
python3 -m json.tool serviceAccountKey.json > /dev/null
echo "✅ Service account key is valid JSON"
```

**Solution 4: Test Firestore write**
```python
from firebase_admin import firestore
db = firestore.client()

try:
    db.collection('test').document('test').set({'test': True})
    print("✅ Firestore write successful")
except Exception as e:
    print(f"❌ Error: {e}")
```

### Verification
```bash
# Test subscription creation
# Should succeed without permission errors
```

---

## Common Error Messages

### "razorpay.errors.BadRequestError"
- **Cause**: Invalid request parameters
- **Fix**: Check amount, currency, receipt format

### "razorpay.errors.ServerError"
- **Cause**: Razorpay API issue
- **Fix**: Retry request, check Razorpay status

### "firebase_admin.exceptions.NotFoundError"
- **Cause**: Document doesn't exist
- **Fix**: Check document ID, create if needed

### "pydantic.ValidationError"
- **Cause**: Invalid request data
- **Fix**: Check request matches model schema

### "HTTPException: 403 Forbidden"
- **Cause**: Subscription not active
- **Fix**: Verify subscription status, renew if expired

---

## Debugging Tips

### Enable Debug Logging
```python
# In main.py or service files
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check Razorpay Dashboard
- View all orders and payments
- Check order status and details
- View webhook events
- Check API logs

### Use Razorpay Test Cards
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

### Test in Isolation
- Test Razorpay client separately
- Test subscription service separately
- Test payment service separately
- Then test integration

### Check Server Logs
```bash
# View real-time logs
tail -f logs/app.log

# Search for errors
grep ERROR logs/app.log

# Search for specific operation
grep "payment" logs/app.log
```

---

## Getting Help

### Razorpay Support
- Email: support@razorpay.com
- Dashboard: Help & Support section
- Docs: https://razorpay.com/docs/

### Firebase Support
- Console: Support tab
- Docs: https://firebase.google.com/docs/

### Community
- Stack Overflow: Tag with `razorpay`, `firebase`
- GitHub Issues: Check Razorpay SDK issues

---

## Prevention Checklist

Before deploying to production:
- [ ] Test all payment scenarios
- [ ] Verify signature verification works
- [ ] Test subscription lifecycle
- [ ] Test premium access control
- [ ] Test error handling
- [ ] Enable production logging
- [ ] Set up monitoring and alerts
- [ ] Test webhook handling
- [ ] Verify Firestore rules
- [ ] Switch to live Razorpay keys
- [ ] Test with real payment methods
- [ ] Verify SSL/HTTPS enabled

---

Most issues can be resolved by checking environment variables, verifying API keys, and ensuring Firestore permissions are correct. Always test in sandbox mode before going live! 💳🔧

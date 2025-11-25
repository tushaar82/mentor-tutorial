# Configuration Guide for Day 9: Payment Integration

## Overview

This guide walks you through setting up Razorpay payment gateway, obtaining API credentials, and configuring your backend for payment processing. All steps use Razorpay's **test/sandbox mode** for safe testing without real money.

---

## Step 1: Create Razorpay Account

### What You're Doing
Creating a free Razorpay account to access payment gateway services.

### Actions

1. **Visit Razorpay website**:
   - Go to: https://razorpay.com/
   - Click "Sign Up" or "Get Started"

2. **Fill registration form**:
   - Business Name: "Mentor AI" (or your name for testing)
   - Email: Your valid email address
   - Phone: Your phone number
   - Password: Create strong password

3. **Verify email**:
   - Check your email inbox
   - Click verification link
   - Complete email verification

4. **Verify phone**:
   - Enter OTP sent to your phone
   - Complete phone verification

5. **Skip business verification** (for now):
   - Click "Skip" or "I'll do this later"
   - Test mode doesn't require business verification
   - You can complete verification later for live mode

### Verification

- You should see Razorpay Dashboard
- Top-right corner shows "Test Mode" badge
- You have access to API Keys section

### Troubleshooting

- **Email not received**: Check spam folder, wait 5 minutes, try resend
- **Phone verification fails**: Ensure correct country code, try different number
- **Account locked**: Contact Razorpay support at support@razorpay.com

---

## Step 2: Get API Keys (Test Mode)

### What You're Doing
Obtaining test API keys for sandbox payment testing.

### Actions

1. **Navigate to API Keys**:
   - In Razorpay Dashboard, click "Settings" (gear icon)
   - Click "API Keys" in left sidebar
   - Or go directly to: https://dashboard.razorpay.com/app/keys

2. **Generate Test Keys**:
   - Ensure you're in "Test Mode" (check top-right badge)
   - You'll see "Test Key ID" and "Test Key Secret"
   - If not generated, click "Generate Test Keys"

3. **Copy Key ID**:
   - Click "Copy" next to Key ID
   - Format: `rzp_test_XXXXXXXXXXXX`
   - Save this temporarily

4. **Reveal and Copy Key Secret**:
   - Click "Show" or eye icon next to Key Secret
   - Click "Copy"
   - Format: `XXXXXXXXXXXXXXXXXXXXXXXX`
   - **IMPORTANT**: This is shown only once, save it securely

5. **Save keys securely**:
   - Do NOT share these keys
   - Do NOT commit to Git
   - Store in password manager or secure note

### Verification

```bash
# Your keys should look like:
# Key ID: rzp_test_1234567890ABCD
# Key Secret: abcdefghijklmnopqrstuvwxyz123456
```

### Troubleshooting

- **Keys not showing**: Ensure you're in Test Mode, refresh page
- **Can't reveal secret**: Click eye icon, if still hidden contact support
- **Lost secret key**: Regenerate keys (old keys will stop working)

---

## Step 3: Configure Environment Variables

### What You're Doing
Adding Razorpay credentials to your backend environment configuration.

### Actions

1. **Open .env file**:
   ```bash
   cd tushar-backend
   nano .env  # or use your preferred editor
   ```

2. **Add Razorpay configuration**:
   ```bash
   # Razorpay Configuration (Test Mode)
   RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
   RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
   RAZORPAY_WEBHOOK_SECRET=  # Leave empty for now, will set up later
   ```

3. **Replace placeholders**:
   - Replace `rzp_test_YOUR_KEY_ID_HERE` with your actual Key ID
   - Replace `YOUR_KEY_SECRET_HERE` with your actual Key Secret
   - Keep `RAZORPAY_WEBHOOK_SECRET` empty for now

4. **Save the file**:
   - Press Ctrl+O (nano) or Cmd+S (VS Code)
   - Press Ctrl+X (nano) to exit

5. **Verify .env is in .gitignore**:
   ```bash
   cat .gitignore | grep .env
   ```
   - Should show `.env` in the list
   - If not, add it:
     ```bash
     echo ".env" >> .gitignore
     ```

### Verification

```bash
# Check environment variables are set
cat .env | grep RAZORPAY

# Should output:
# RAZORPAY_KEY_ID=rzp_test_...
# RAZORPAY_KEY_SECRET=...
# RAZORPAY_WEBHOOK_SECRET=
```

### Troubleshooting

- **.env not found**: Create it: `touch .env`
- **Keys not loading**: Restart your backend server after adding keys
- **Syntax error**: Ensure no spaces around `=` sign

---

## Step 4: Install Razorpay SDK

### What You're Doing
Installing Razorpay Python SDK for payment integration.

### Actions

1. **Activate virtual environment** (if not already):
   ```bash
   cd tushar-backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Razorpay package**:
   ```bash
   pip install razorpay==1.4.1
   ```

3. **Verify installation**:
   ```bash
   pip show razorpay
   ```

4. **Update requirements.txt**:
   ```bash
   pip freeze | grep razorpay >> requirements.txt
   ```

### Verification

```bash
# Test import in Python
python -c "import razorpay; print('Razorpay SDK installed successfully')"

# Should output: Razorpay SDK installed successfully
```

### Troubleshooting

- **Installation fails**: Upgrade pip: `pip install --upgrade pip`
- **Import error**: Ensure virtual environment is activated
- **Version conflict**: Uninstall and reinstall: `pip uninstall razorpay && pip install razorpay==1.4.1`

---

## Step 5: Test Razorpay Connection

### What You're Doing
Verifying that your backend can connect to Razorpay API.

### Actions

1. **Create test script**:
   ```bash
   cd tushar-backend
   nano test_razorpay.py
   ```

2. **Add test code**:
   ```python
   import os
   from dotenv import load_dotenv
   import razorpay

   # Load environment variables
   load_dotenv()

   # Get credentials
   key_id = os.getenv('RAZORPAY_KEY_ID')
   key_secret = os.getenv('RAZORPAY_KEY_SECRET')

   print(f"Key ID: {key_id}")
   print(f"Key Secret: {'*' * len(key_secret) if key_secret else 'Not set'}")

   # Initialize client
   try:
       client = razorpay.Client(auth=(key_id, key_secret))
       print("✅ Razorpay client initialized successfully")
       
       # Test API call - fetch payment methods
       methods = client.payment.methods()
       print(f"✅ API connection successful")
       print(f"Available payment methods: {', '.join(methods.get('card', {}).get('networks', []))}")
   except Exception as e:
       print(f"❌ Error: {e}")
   ```

3. **Run test script**:
   ```bash
   python test_razorpay.py
   ```

4. **Delete test script** (after successful test):
   ```bash
   rm test_razorpay.py
   ```

### Verification

```
# Expected output:
Key ID: rzp_test_...
Key Secret: ************************
✅ Razorpay client initialized successfully
✅ API connection successful
Available payment methods: Visa, MasterCard, Maestro, RuPay
```

### Troubleshooting

- **Authentication error**: Check Key ID and Secret are correct
- **Network error**: Check internet connection, try again
- **Import error**: Ensure razorpay is installed: `pip install razorpay`

---

## Step 6: Understand Test Mode

### What You're Doing
Learning how Razorpay test mode works for safe testing.

### Key Concepts

**Test Mode vs Live Mode**:
- **Test Mode**: Uses test keys (`rzp_test_...`), no real money, fake cards
- **Live Mode**: Uses live keys (`rzp_live_...`), real money, real cards
- **Switch**: Toggle in dashboard top-right corner

**Test Cards** (use these for testing):
```
# Successful Payment
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Any name

# Failed Payment (to test failures)
Card Number: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
Name: Any name

# UPI (for testing UPI payments)
UPI ID: success@razorpay
```

**Test Mode Limitations**:
- No real money is charged
- Payments are simulated
- Webhooks work but are simulated
- SMS/Email notifications are not sent
- Some features may be limited

**When to Switch to Live Mode**:
- After thorough testing
- After business verification with Razorpay
- When ready to accept real payments
- After deploying to production

### Actions

1. **Verify you're in Test Mode**:
   - Open Razorpay Dashboard
   - Check top-right corner for "Test Mode" badge
   - If in Live Mode, click toggle to switch to Test Mode

2. **Bookmark test cards**:
   - Save test card numbers for easy access
   - Use success card for happy path testing
   - Use failure card for error handling testing

### Verification

- Dashboard shows "Test Mode" badge
- API keys start with `rzp_test_`
- You understand test cards and their purpose

---

## Step 7: Configure Firestore Collections

### What You're Doing
Setting up Firestore collections for subscriptions and transactions.

### Actions

1. **Open Firebase Console**:
   - Go to: https://console.firebase.google.com/
   - Select your project

2. **Navigate to Firestore**:
   - Click "Firestore Database" in left sidebar
   - If not enabled, click "Create database"
   - Choose "Start in test mode" (for development)
   - Select region (closest to your users)

3. **Create subscriptions collection**:
   - Click "Start collection"
   - Collection ID: `subscriptions`
   - Add first document (example):
     - Document ID: `test_parent_id`
     - Fields:
       - `subscription_id` (string): `sub_test_123`
       - `parent_id` (string): `test_parent_id`
       - `plan_id` (string): `free`
       - `status` (string): `active`
       - `start_date` (timestamp): Now
       - `end_date` (timestamp): 1 year from now
   - Click "Save"

4. **Create transactions collection**:
   - Click "Start collection"
   - Collection ID: `transactions`
   - Add first document (example):
     - Document ID: Auto-ID
     - Fields:
       - `transaction_id` (string): `txn_test_123`
       - `parent_id` (string): `test_parent_id`
       - `amount` (number): `99900`
       - `currency` (string): `INR`
       - `status` (string): `completed`
       - `created_at` (timestamp): Now
   - Click "Save"

5. **Set up indexes** (if needed):
   - Firestore will prompt if indexes are needed
   - Click "Create index" when prompted
   - Wait for index creation (1-2 minutes)

### Verification

```bash
# Check collections exist in Firebase Console
# You should see:
# - subscriptions (1 document)
# - transactions (1 document)
```

### Troubleshooting

- **Firestore not enabled**: Enable it in Firebase Console
- **Permission denied**: Update Firestore rules to allow read/write
- **Index creation fails**: Wait and retry, or create manually

---

## Step 8: Update Firestore Security Rules

### What You're Doing
Configuring Firestore security rules for subscriptions and transactions.

### Actions

1. **Open Firestore Rules**:
   - In Firebase Console, go to Firestore Database
   - Click "Rules" tab

2. **Add subscription rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       // Subscriptions - parents can read own, only backend can write
       match /subscriptions/{parentId} {
         allow read: if request.auth != null && request.auth.uid == parentId;
         allow write: if false; // Only backend (admin SDK) can write
       }
       
       // Transactions - parents can read own, only backend can write
       match /transactions/{transactionId} {
         allow read: if request.auth != null && 
                        resource.data.parent_id == request.auth.uid;
         allow write: if false; // Only backend (admin SDK) can write
       }
       
       // ... other rules ...
     }
   }
   ```

3. **Publish rules**:
   - Click "Publish"
   - Wait for deployment (few seconds)

### Verification

```bash
# Rules should prevent direct client writes
# Only authenticated users can read their own data
# Backend (admin SDK) can write
```

### Troubleshooting

- **Syntax error**: Check brackets and semicolons
- **Deployment fails**: Wait and retry
- **Permission denied in app**: Verify auth token is valid

---

## Step 9: Restart Backend Server

### What You're Doing
Restarting the backend to load new environment variables and code.

### Actions

1. **Stop current server** (if running):
   ```bash
   # Press Ctrl+C in terminal where server is running
   ```

2. **Restart server**:
   ```bash
   cd tushar-backend
   source venv/bin/activate  # If not already activated
   uvicorn main:app --reload --port 8000
   ```

3. **Verify server starts**:
   - Check terminal for "Application startup complete"
   - No errors about missing environment variables
   - Payment routes are registered

### Verification

```bash
# Check server is running
curl http://localhost:8000/health

# Should return: {"status": "healthy"}

# Check payment routes are registered
curl http://localhost:8000/docs

# Should show payment endpoints in Swagger UI
```

### Troubleshooting

- **Import errors**: Ensure all files are created and saved
- **Environment variable errors**: Check .env file has all required variables
- **Port already in use**: Kill process on port 8000 or use different port

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ Razorpay account (test mode)
- ✅ API keys (test credentials)
- ✅ Environment variables
- ✅ Razorpay SDK
- ✅ Firestore collections
- ✅ Security rules
- ✅ Backend server

**Next Steps**:
1. Go to TESTING.md to test payment flow
2. Use test cards for sandbox testing
3. Verify subscription activation works

**Important Reminders**:
- You're in TEST MODE - no real money
- Use test cards from Step 6
- Never commit .env file to Git
- Switch to live mode only after thorough testing

Ready to test payments! 💳

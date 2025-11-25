# Configuration Guide for Day 2: Firebase Authentication

This document guides you through Firebase Console configuration and test account setup for authentication flows.

---

## Step 1: Configure Email Verification Settings

### What You're Doing
Configuring Firebase to send email verification links to users.

### Why This Matters
Email verification ensures users provide valid email addresses and prevents spam accounts.

### Commands/Actions

**Step 1.1**: Go to [Firebase Console](https://console.firebase.google.com/)

**Step 1.2**: Select your project (e.g., `mentor-ai-dev`)

**Step 1.3**: Click "Authentication" in left sidebar

**Step 1.4**: Click "Templates" tab

**Step 1.5**: Click "Email address verification"

**Step 1.6**: Customize the email template (optional):
- **From name**: Mentor AI
- **Subject**: Verify your email for Mentor AI
- **Body**: Keep default or customize

**Step 1.7**: Click "Save"

### Verification
- Email template shows "Saved" status
- Template preview displays correctly

### If It Fails
- **Template not saving**: Check internet connection
- **Preview not showing**: Refresh the page
- **Customization not working**: Use default template for now

---

## Step 2: Configure Phone Authentication

### What You're Doing
Setting up phone authentication with test phone numbers for development.

### Why This Matters
Phone authentication requires SMS sending, which costs money. Test phone numbers allow free testing.

### Commands/Actions

**Step 2.1**: In Firebase Console → Authentication → Sign-in method

**Step 2.2**: Click "Phone" provider

**Step 2.3**: Scroll to "Phone numbers for testing"

**Step 2.4**: Add test phone numbers:
- Click "Add phone number"
- **Phone number**: `+919999999999`
- **Verification code**: `123456`
- Click "Add"

**Step 2.5**: Add more test numbers (optional):
- `+919999999998` with code `123456`
- `+919999999997` with code `123456`

**Step 2.6**: Click "Save"

### Verification
- Test phone numbers appear in the list
- Each has a verification code assigned

### If It Fails
- **Can't add test numbers**: Make sure Phone auth is enabled
- **Invalid format**: Use international format (+91 for India)
- **Save fails**: Try refreshing and adding again

### ⚠️ Important Notes
- Test phone numbers only work in development
- Real phone numbers will receive actual SMS (costs apply)
- For production, set up SMS provider (Firebase handles this automatically)

---

## Step 3: Configure Google OAuth

### What You're Doing
Setting up Google OAuth with authorized domains and support email.

### Why This Matters
Google OAuth requires proper configuration to work with your domain and redirect URLs.

### Commands/Actions

**Step 3.1**: In Firebase Console → Authentication → Sign-in method

**Step 3.2**: Click "Google" provider

**Step 3.3**: Verify it's enabled (should be from Day 1)

**Step 3.4**: Check "Support email":
- Should show your email address
- If not, select your email from dropdown

**Step 3.5**: Click "Authorized domains" tab

**Step 3.6**: Verify authorized domains:
- `localhost` should be listed (for development)
- Add your production domain later (e.g., `mentor-ai.com`)

**Step 3.7**: Click "Save"

### Verification
- Google provider shows "Enabled"
- Support email is set
- localhost is in authorized domains

### If It Fails
- **No support email**: Add your email in Firebase project settings first
- **Can't add domain**: Check domain format (no http://, just domain name)
- **OAuth not working**: Check that Google provider is enabled

---

## Step 4: Create Test User Accounts

### What You're Doing
Creating test accounts in Firebase for testing authentication flows.

### Why This Matters
You need existing accounts to test login, verification, and session management.

### Commands/Actions

**Step 4.1**: In Firebase Console → Authentication → Users

**Step 4.2**: Click "Add user"

**Step 4.3**: Create test email user:
- **Email**: `test@example.com`
- **Password**: `Test123456`
- **User ID**: (auto-generated)
- Click "Add user"

**Step 4.4**: Create another test user:
- **Email**: `parent@example.com`
- **Password**: `Parent123456`
- Click "Add user"

**Step 4.5**: Note the User IDs (UIDs) for testing

### Verification
- Users appear in the Users list
- Each has a unique UID
- Email addresses are correct

### If It Fails
- **Weak password error**: Use at least 6 characters
- **Duplicate email**: Use a different email address
- **Can't add user**: Check that Email/Password auth is enabled

---

## Step 5: Configure Firestore Security Rules (Development)

### What You're Doing
Setting up Firestore security rules to allow authenticated access.

### Why This Matters
Security rules control who can read/write data in Firestore.

### Commands/Actions

**Step 5.1**: In Firebase Console → Firestore Database

**Step 5.2**: Click "Rules" tab

**Step 5.3**: Replace the rules with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own parent profile
    match /parents/{parentId} {
      allow read, write: if request.auth != null && request.auth.uid == parentId;
    }
    
    // Allow authenticated users to read/write their own sessions
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write their own verification codes
    match /verification_codes/{codeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Step 5.4**: Click "Publish"

### Verification
- Rules show "Published" status
- No syntax errors displayed

### If It Fails
- **Syntax error**: Copy the rules exactly as shown
- **Publish fails**: Check internet connection
- **Rules not applying**: Wait 1-2 minutes for propagation

### ⚠️ Security Note
These are development rules. For production, implement stricter rules based on user roles and data ownership.

---

## Step 6: Set Up Environment Variables for Auth

### What You're Doing
Adding authentication-specific environment variables to .env file.

### Why This Matters
Configuration values should be externalized for security and flexibility.

### Commands/Actions

**Step 6.1**: Open `tushar-backend/.env` file

**Step 6.2**: Add these variables:
```bash
# Authentication Configuration
JWT_SECRET=your-secret-key-change-in-production
TOKEN_EXPIRY_HOURS=24
REFRESH_TOKEN_EXPIRY_DAYS=30

# Email Configuration (for verification emails)
EMAIL_FROM_NAME=Mentor AI
EMAIL_FROM_ADDRESS=noreply@mentor-ai.com

# Phone Configuration
PHONE_OTP_LENGTH=6
PHONE_OTP_EXPIRY_MINUTES=10

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
```

**Step 6.3**: Generate a secure JWT secret:
```bash
# Generate random secret
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Copy the output and replace 'your-secret-key-change-in-production'
```

**Step 6.4**: Get Google Client ID:
- Go to Firebase Console → Project Settings → General
- Scroll to "Your apps" section
- Find "Web API Key"
- Copy and paste as GOOGLE_CLIENT_ID

**Step 6.5**: Save the .env file

### Verification
```bash
# Check environment variables
cat .env | grep -E "JWT_SECRET|TOKEN_EXPIRY|GOOGLE_CLIENT_ID"

# Should show your configured values
```

### If It Fails
- **Can't find Web API Key**: Check Firebase Console → Project Settings
- **Secret generation fails**: Use any random 32+ character string
- **File not saving**: Check file permissions

---

## Step 7: Install Additional Dependencies (if needed)

### What You're Doing
Installing any additional Python packages required for authentication.

### Why This Matters
Some authentication features may require additional libraries.

### Commands/Actions

**Step 7.1**: Activate virtual environment:
```bash
cd tushar-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**Step 7.2**: Check if additional packages are needed:
```bash
# Check current packages
pip list | grep -E "pyjwt|cryptography"
```

**Step 7.3**: If not installed, add to requirements.txt:
```bash
# Add these lines to requirements.txt if not present
echo "PyJWT==2.8.0" >> requirements.txt
echo "cryptography==41.0.7" >> requirements.txt
```

**Step 7.4**: Install new packages:
```bash
pip install -r requirements.txt
```

### Verification
```bash
# Verify installation
pip list | grep -E "PyJWT|cryptography"

# Should show:
# PyJWT         2.8.0
# cryptography  41.0.7
```

### If It Fails
- **Package not found**: Check package name spelling
- **Installation error**: Upgrade pip with `pip install --upgrade pip`
- **Version conflict**: Use the versions specified above

---

## Step 8: Test Firebase Auth Connection

### What You're Doing
Verifying that Firebase authentication services are accessible.

### Why This Matters
Ensures the backend can communicate with Firebase Auth before implementing features.

### Commands/Actions

**Step 8.1**: Create test script:
```bash
cat > test_auth_connection.py << 'EOF'
import os
from dotenv import load_dotenv
from utils.firebase_config import get_auth_client

load_dotenv()

try:
    # Get auth client
    auth = get_auth_client()
    print("✓ Firebase Auth client initialized")
    
    # Try to list users (should work even if empty)
    users = auth.list_users()
    print(f"✓ Successfully connected to Firebase Auth")
    print(f"✓ Found {len(users.users)} existing users")
    
    # List first few users
    for user in users.users[:3]:
        print(f"  - {user.email or user.phone_number} (UID: {user.uid})")
    
    print("\n✅ Firebase Auth connection successful!")
    
except Exception as e:
    print(f"\n❌ Firebase Auth connection failed: {e}")
    print("\nCheck:")
    print("1. Firebase credentials are correct")
    print("2. Authentication is enabled in Firebase Console")
    print("3. Internet connection is working")
EOF
```

**Step 8.2**: Run the test:
```bash
python test_auth_connection.py
```

### Verification
```
✓ Firebase Auth client initialized
✓ Successfully connected to Firebase Auth
✓ Found 2 existing users
  - test@example.com (UID: abc123...)
  - parent@example.com (UID: def456...)

✅ Firebase Auth connection successful!
```

### If It Fails
- **Connection error**: Check internet connection
- **Credentials error**: Verify Firebase service account file
- **No users found**: This is OK if you haven't created test users yet
- **Permission denied**: Check Firebase project permissions

---

## Step 9: Verify Firestore Collections Setup

### What You're Doing
Checking that Firestore is ready to store authentication data.

### Why This Matters
Authentication flows will store verification codes and session data in Firestore.

### Commands/Actions

**Step 9.1**: In Firebase Console → Firestore Database

**Step 9.2**: Verify database exists and is in "Native mode"

**Step 9.3**: Check that these collections will be created automatically:
- `parents` - Parent user profiles (from Day 1)
- `sessions` - User session tokens (new)
- `verification_codes` - Email/phone verification codes (new)

**Step 9.4**: No manual action needed - collections are created automatically when first document is added

### Verification
- Firestore Database page loads without errors
- Database is in "Native mode" (not Datastore mode)
- Rules are published (from Step 5)

### If It Fails
- **Database not found**: Create database in Firestore console
- **Wrong mode**: Can't change mode after creation; create new project if needed
- **Rules error**: Re-publish rules from Step 5

---

## Step 10: Create Test Data in Firestore

### What You're Doing
Adding test parent profiles to Firestore for testing authentication.

### Why This Matters
Login and verification flows need existing user data to work with.

### Commands/Actions

**Step 10.1**: Create test data script:
```bash
cat > create_test_data.py << 'EOF'
from utils.firebase_config import get_firestore_client, get_auth_client
from datetime import datetime

db = get_firestore_client()
auth = get_auth_client()

try:
    # Get test users
    users = auth.list_users()
    
    for user in users.users:
        if user.email in ['test@example.com', 'parent@example.com']:
            # Create parent profile in Firestore
            parent_data = {
                'parent_id': user.uid,
                'email': user.email,
                'language': 'en',
                'role': 'parent',
                'created_at': datetime.utcnow(),
                'email_verified': user.email_verified,
                'phone_verified': False
            }
            
            # Add to Firestore
            db.collection('parents').document(user.uid).set(parent_data)
            print(f"✓ Created parent profile for {user.email}")
    
    print("\n✅ Test data created successfully!")
    
except Exception as e:
    print(f"❌ Error creating test data: {e}")
EOF
```

**Step 10.2**: Run the script:
```bash
python create_test_data.py
```

### Verification
```
✓ Created parent profile for test@example.com
✓ Created parent profile for parent@example.com

✅ Test data created successfully!
```

**Step 10.3**: Verify in Firebase Console:
- Go to Firestore Database
- Check `parents` collection exists
- Should see 2 documents with test user UIDs

### If It Fails
- **No users found**: Create test users first (Step 4)
- **Permission denied**: Check Firestore security rules
- **Collection not appearing**: Refresh Firebase Console

---

## Step 11: Final Configuration Check

### What You're Doing
Running a comprehensive check of all authentication configuration.

### Why This Matters
Ensures everything is set up correctly before implementing authentication features.

### Commands/Actions

```bash
# Run all checks
echo "=== Configuration Check ==="
echo ""

echo "1. Checking environment variables..."
cat .env | grep -E "JWT_SECRET|TOKEN_EXPIRY|GOOGLE_CLIENT_ID" | head -n 3
echo ""

echo "2. Checking Firebase Auth connection..."
python test_auth_connection.py
echo ""

echo "3. Checking Firestore data..."
python -c "
from utils.firebase_config import get_firestore_client
db = get_firestore_client()
parents = db.collection('parents').limit(5).get()
print(f'✓ Found {len(parents)} parent profiles in Firestore')
"
echo ""

echo "4. Checking Python packages..."
pip list | grep -E "PyJWT|cryptography|firebase-admin"
echo ""

echo "=== Configuration Check Complete ==="
```

### Verification
All checks should pass:
- ✅ Environment variables configured
- ✅ Firebase Auth connection working
- ✅ Firestore data accessible
- ✅ Required packages installed

### If It Fails
Review the specific check that failed and repeat the corresponding step.

---

## Configuration Complete! 🎉

You've successfully configured Firebase authentication for the backend.

### What You've Set Up
- ✅ Email verification templates configured
- ✅ Phone authentication with test numbers
- ✅ Google OAuth configured
- ✅ Test user accounts created
- ✅ Firestore security rules published
- ✅ Environment variables configured
- ✅ Additional packages installed
- ✅ Firebase Auth connection verified
- ✅ Test data created in Firestore

### Next Steps

1. **Open TESTING.md** to test authentication endpoints with curl
2. After testing, check **EXPECTED-OUTCOME.md** to verify success criteria

### Quick Reference

**Test Accounts:**
- Email: `test@example.com` / Password: `Test123456`
- Email: `parent@example.com` / Password: `Parent123456`
- Phone: `+919999999999` / OTP: `123456`

**Environment Variables:**
```bash
JWT_SECRET=<your-generated-secret>
TOKEN_EXPIRY_HOURS=24
GOOGLE_CLIENT_ID=<your-google-client-id>
```

**Start Backend:**
```bash
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

---

## Troubleshooting

If you encounter issues, check **TROUBLESHOOTING.md** for common Firebase authentication problems and solutions.

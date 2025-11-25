# Configuration Guide for Day 1: Backend Project Setup

This document guides you through all manual setup steps required to run the backend. Follow each step in order.

---

## Step 1: Install Python 3.11+

### What You're Doing
Installing Python 3.11 or higher, which is required for the FastAPI backend.

### Why This Matters
Python 3.11 provides performance improvements and modern syntax features used in this project.

### Commands/Actions

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip
```

**On macOS:**
```bash
brew install python@3.11
```

**On Windows:**
Download and install from [python.org](https://www.python.org/downloads/)

### Verification
```bash
python3.11 --version
# Should show: Python 3.11.x

pip3 --version
# Should show: pip 23.x or higher
```

### If It Fails
- **Ubuntu**: Run `sudo apt update` first
- **macOS**: Install Homebrew first: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Windows**: Make sure to check "Add Python to PATH" during installation

---

## Step 2: Create Virtual Environment

### What You're Doing
Creating an isolated Python environment for the project dependencies.

### Why This Matters
Virtual environments prevent dependency conflicts between different Python projects.

### Commands/Actions
```bash
# Navigate to backend directory
cd tushar-backend

# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Verification
```bash
# Your terminal prompt should now show (venv)
# Check Python version in venv
python --version
# Should show: Python 3.11.x
```

### If It Fails
- **Permission denied**: Use `sudo` on Linux/macOS
- **venv not found**: Install with `sudo apt install python3.11-venv` (Ubuntu)
- **Activation fails**: Check that you're in the tushar-backend directory

---

## Step 3: Install Python Dependencies

### What You're Doing
Installing all required Python packages from requirements.txt.

### Why This Matters
These packages provide FastAPI, Firebase integration, and other essential functionality.

### Commands/Actions
```bash
# Make sure virtual environment is activated (you should see (venv) in prompt)
pip install -r requirements.txt
```

### Verification
```bash
# Check installed packages
pip list

# Should see:
# fastapi         0.104.1
# uvicorn         0.24.0
# firebase-admin  6.2.0
# pydantic        2.4.2
# python-dotenv   1.0.0
```

### If It Fails
- **pip not found**: Activate virtual environment first
- **Installation errors**: Upgrade pip with `pip install --upgrade pip`
- **Network errors**: Check internet connection or try again

---

## Step 4: Create Firebase Project

### What You're Doing
Setting up a Firebase project in Google Cloud Console.

### Why This Matters
Firebase provides authentication, database (Firestore), and other backend services.

### Commands/Actions

**Step 4.1**: Go to [Firebase Console](https://console.firebase.google.com/)

**Step 4.2**: Click "Add project" or "Create a project"

**Step 4.3**: Enter project details:
- **Project name**: `mentor-ai-dev` (or your preferred name)
- **Google Analytics**: Enable (recommended) or disable
- Click "Create project"

**Step 4.4**: Wait for project creation (takes 30-60 seconds)

### Verification
- You should see the Firebase project dashboard
- Project name appears in the top-left corner

### If It Fails
- **No Google account**: Create one at [accounts.google.com](https://accounts.google.com)
- **Project creation fails**: Try a different project name
- **Billing required**: Firebase free tier should work; check quotas

---

## Step 5: Enable Firebase Services

### What You're Doing
Enabling Authentication and Firestore Database in your Firebase project.

### Why This Matters
These services must be enabled before the backend can use them.

### Commands/Actions

**Step 5.1**: In Firebase Console, click "Authentication" in left sidebar

**Step 5.2**: Click "Get started"

**Step 5.3**: Enable sign-in methods:
- Click "Email/Password" → Enable → Save
- Click "Phone" → Enable → Save
- Click "Google" → Enable → Select support email → Save

**Step 5.4**: Click "Firestore Database" in left sidebar

**Step 5.5**: Click "Create database"

**Step 5.6**: Choose location:
- Select a location close to your users (e.g., `us-central1`)
- Click "Next"

**Step 5.7**: Choose security rules:
- Select "Start in test mode" (for development)
- Click "Enable"

### Verification
- Authentication page shows enabled sign-in methods
- Firestore Database page shows "Cloud Firestore" with empty collections

### If It Fails
- **Services not appearing**: Refresh the page
- **Permission errors**: Make sure you're the project owner
- **Test mode warning**: This is normal for development; we'll secure it later

---

## Step 6: Download Firebase Service Account Key

### What You're Doing
Downloading a JSON file with credentials for Firebase Admin SDK.

### Why This Matters
The backend needs these credentials to authenticate with Firebase services.

### Commands/Actions

**Step 6.1**: In Firebase Console, click the gear icon (⚙️) → "Project settings"

**Step 6.2**: Click "Service accounts" tab

**Step 6.3**: Click "Generate new private key"

**Step 6.4**: Click "Generate key" in the confirmation dialog

**Step 6.5**: A JSON file will download (e.g., `mentor-ai-dev-firebase-adminsdk-xxxxx.json`)

**Step 6.6**: Move this file to your project:
```bash
# Create credentials directory
mkdir -p tushar-backend/credentials

# Move the downloaded file (adjust filename as needed)
mv ~/Downloads/mentor-ai-dev-firebase-adminsdk-*.json tushar-backend/credentials/firebase-service-account.json
```

### Verification
```bash
# Check file exists
ls tushar-backend/credentials/firebase-service-account.json

# File should exist and be a JSON file
cat tushar-backend/credentials/firebase-service-account.json | head -n 5
# Should show JSON content with "type": "service_account"
```

### If It Fails
- **File not found**: Check Downloads folder
- **Permission denied**: Use `sudo` or check file permissions
- **Invalid JSON**: Re-download the file from Firebase Console

### ⚠️ Security Warning
**NEVER commit this file to Git!** It contains sensitive credentials. The .gitignore file already excludes it.

---

## Step 7: Create Environment Variables File

### What You're Doing
Creating a .env file with configuration values for the backend.

### Why This Matters
Environment variables store sensitive information and configuration separately from code.

### Commands/Actions

**Step 7.1**: Copy the example file:
```bash
cd tushar-backend
cp .env.example .env
```

**Step 7.2**: Edit the .env file:
```bash
# Open in your text editor
nano .env
# or
code .env
```

**Step 7.3**: Fill in the values:
```bash
# Path to Firebase service account JSON file
FIREBASE_SERVICE_ACCOUNT_PATH=./credentials/firebase-service-account.json

# Google Cloud project ID (find in Firebase Console → Project Settings)
GOOGLE_CLOUD_PROJECT=mentor-ai-dev

# Server port
PORT=8000

# Environment
ENVIRONMENT=development

# Logging level
LOG_LEVEL=INFO
```

**Step 7.4**: Save and close the file

### Verification
```bash
# Check file exists
cat .env

# Should show your configuration values
```

### If It Fails
- **File not found**: Make sure you're in tushar-backend directory
- **Permission denied**: Use `sudo` or check file permissions
- **Wrong project ID**: Copy from Firebase Console → Project Settings → Project ID

---

## Step 8: Verify Project Structure

### What You're Doing
Confirming all files and folders are in the correct locations.

### Why This Matters
Incorrect structure will cause import errors when running the backend.

### Commands/Actions
```bash
# From tushar-backend directory, check structure
tree -L 2 -I 'venv|__pycache__'

# Or use ls if tree is not installed
ls -la
```

### Expected Structure
```
tushar-backend/
├── main.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── credentials/
│   └── firebase-service-account.json
├── models/
│   ├── __init__.py
│   └── auth_models.py
├── routers/
│   ├── __init__.py
│   └── auth_router.py
├── services/
│   ├── __init__.py
│   └── auth_service.py
├── utils/
│   ├── __init__.py
│   └── firebase_config.py
└── venv/
```

### Verification
- All folders exist
- All Python files have corresponding __init__.py files
- .env file exists and is not empty
- Firebase credentials file exists in credentials/

### If It Fails
- **Missing folders**: Create them with `mkdir -p folder_name`
- **Missing __init__.py**: Create empty files with `touch folder/__init__.py`
- **Wrong structure**: Review PROMPTS.md and regenerate missing files

---

## Step 9: Test Firebase Connection

### What You're Doing
Running a quick test to verify Firebase credentials work.

### Why This Matters
Ensures the backend can connect to Firebase before starting the server.

### Commands/Actions

**Step 9.1**: Create a test script:
```bash
# Create test file
cat > test_firebase.py << 'EOF'
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test Firebase import
try:
    from utils.firebase_config import get_firestore_client, get_auth_client
    
    print("✓ Firebase modules imported successfully")
    
    # Test Firestore connection
    db = get_firestore_client()
    print("✓ Firestore client initialized")
    
    # Test Auth connection
    auth = get_auth_client()
    print("✓ Auth client initialized")
    
    print("\n✅ Firebase connection successful!")
    
except Exception as e:
    print(f"\n❌ Firebase connection failed: {e}")
    print("\nCheck:")
    print("1. FIREBASE_SERVICE_ACCOUNT_PATH in .env is correct")
    print("2. Firebase credentials file exists")
    print("3. Firebase project is set up correctly")
EOF
```

**Step 9.2**: Run the test:
```bash
python test_firebase.py
```

### Verification
```
✓ Firebase modules imported successfully
✓ Firestore client initialized
✓ Auth client initialized

✅ Firebase connection successful!
```

### If It Fails
- **Import errors**: Check that all files were created correctly
- **Credentials error**: Verify FIREBASE_SERVICE_ACCOUNT_PATH in .env
- **File not found**: Check that firebase-service-account.json exists
- **Permission denied**: Check file permissions on credentials file

**Common fixes:**
```bash
# Fix credentials path
export FIREBASE_SERVICE_ACCOUNT_PATH=./credentials/firebase-service-account.json

# Check file exists
ls -la credentials/firebase-service-account.json

# Verify .env is loaded
cat .env | grep FIREBASE_SERVICE_ACCOUNT_PATH
```

---

## Step 10: Final Configuration Check

### What You're Doing
Running a comprehensive check of all configuration steps.

### Why This Matters
Ensures everything is set up correctly before starting the backend server.

### Commands/Actions
```bash
# Run all checks
echo "Checking Python version..."
python --version

echo "Checking virtual environment..."
which python

echo "Checking installed packages..."
pip list | grep -E "fastapi|uvicorn|firebase-admin"

echo "Checking environment variables..."
cat .env | grep -v "^#" | grep -v "^$"

echo "Checking Firebase credentials..."
ls -la credentials/firebase-service-account.json

echo "Checking project structure..."
ls -la models/ routers/ services/ utils/
```

### Verification
All commands should complete without errors and show:
- ✅ Python 3.11+
- ✅ Virtual environment activated
- ✅ All packages installed
- ✅ .env file configured
- ✅ Firebase credentials exist
- ✅ All project folders exist

### If It Fails
Review the specific step that failed and repeat it.

---

## Configuration Complete! 🎉

You've successfully configured the backend development environment. 

### What You've Set Up
- ✅ Python 3.11+ with virtual environment
- ✅ All Python dependencies installed
- ✅ Firebase project created and configured
- ✅ Firebase service account credentials downloaded
- ✅ Environment variables configured
- ✅ Project structure verified
- ✅ Firebase connection tested

### Next Steps

1. **Open TESTING.md** to start the backend server and test the authentication endpoints
2. After testing, check **EXPECTED-OUTCOME.md** to verify success criteria

### Quick Reference

**Start backend server:**
```bash
cd tushar-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

**Deactivate virtual environment:**
```bash
deactivate
```

**Reactivate virtual environment:**
```bash
cd tushar-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

---

## Troubleshooting

If you encounter issues, check **TROUBLESHOOTING.md** for common problems and solutions.

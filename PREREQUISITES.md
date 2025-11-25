# Prerequisites - Software Installation and Account Setup

This guide will help you install all required software and set up necessary accounts before starting the Mentor AI tutorial.

## 📋 Overview

You'll need to install:
- **Development Tools**: Python, Node.js, Git, IDE
- **AI Coding Agents**: Windsurf, GitHub Copilot, or ChatGPT/Claude
- **Cloud Accounts**: Firebase, Google Cloud, Razorpay

**Time Required**: 1-2 hours for complete setup

---

## 🐍 Python Installation (Backend - Tushar)

### Required Version
Python 3.11 or higher

### Installation by Operating System

#### Ubuntu/Debian Linux
```bash
# Update package list
sudo apt update

# Install Python 3.11
sudo apt install python3.11 python3.11-venv python3.11-dev

# Install pip
sudo apt install python3-pip

# Verify installation
python3.11 --version
pip3 --version
```

#### macOS
```bash
# Using Homebrew (install Homebrew first from https://brew.sh)
brew install python@3.11

# Verify installation
python3.11 --version
pip3 --version
```

#### Windows
1. Download Python 3.11 from [python.org](https://www.python.org/downloads/)
2. Run installer
3. **Important**: Check "Add Python to PATH" during installation
4. Verify in Command Prompt:
```cmd
python --version
pip --version
```

### Python Virtual Environment Setup

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Verify activation (should show (venv) in prompt)
which python  # Should point to venv/bin/python
```

---

## 📦 Node.js Installation (Frontend - Vaishnavi)

### Required Version
Node.js 18 or higher (LTS recommended)

### Installation by Operating System

#### Ubuntu/Debian Linux
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### macOS
```bash
# Using Homebrew
brew install node@18

# Verify installation
node --version
npm --version
```

#### Windows
1. Download Node.js 18 LTS from [nodejs.org](https://nodejs.org/)
2. Run installer
3. Verify in Command Prompt:
```cmd
node --version
npm --version
```

### npm Configuration

```bash
# Update npm to latest version
npm install -g npm@latest

# Verify npm version
npm --version
```

---

## 🔧 Git Installation

### Installation by Operating System

#### Ubuntu/Debian Linux
```bash
sudo apt install git

# Verify installation
git --version
```

#### macOS
```bash
# Git comes with Xcode Command Line Tools
xcode-select --install

# Or using Homebrew
brew install git

# Verify installation
git --version
```

#### Windows
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run installer (use default settings)
3. Verify in Command Prompt:
```cmd
git --version
```

### Git Configuration

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## 💻 IDE Installation

### Option 1: Windsurf (Recommended for Beginners)

**What is Windsurf?**
Windsurf is an AI-powered IDE with built-in code generation capabilities.

**Installation:**
1. Visit [windsurf.ai](https://windsurf.ai)
2. Download for your operating system
3. Install and launch
4. Sign in with your account
5. Open your project folder

**Features:**
- Built-in AI code generation
- Context-aware suggestions
- No additional extensions needed
- Beginner-friendly interface

### Option 2: VS Code + GitHub Copilot

**VS Code Installation:**

#### All Operating Systems
1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install for your operating system
3. Launch VS Code

**GitHub Copilot Setup:**
1. Install GitHub Copilot extension:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search "GitHub Copilot"
   - Click Install
2. Sign in with GitHub account
3. Authorize GitHub Copilot
4. Start coding!

**Cost**: GitHub Copilot requires a subscription ($10/month or free for students)

### Option 3: ChatGPT or Claude (Web-Based)

**ChatGPT:**
1. Visit [chat.openai.com](https://chat.openai.com)
2. Sign up or log in
3. Use GPT-4 for best results (requires ChatGPT Plus subscription)

**Claude:**
1. Visit [claude.ai](https://claude.ai)
2. Sign up or log in
3. Use Claude 3 Opus or Sonnet for best results

**Note**: Web-based AI requires copy-pasting code between browser and IDE.

---

## 🔥 Firebase Account Setup

### Step 1: Create Firebase Account

1. Visit [firebase.google.com](https://firebase.google.com)
2. Click "Get Started"
3. Sign in with Google account
4. Accept terms and conditions

### Step 2: Create Firebase Project

1. Click "Add Project"
2. Enter project name: `mentor-ai-dev`
3. Enable Google Analytics (optional)
4. Click "Create Project"
5. Wait for project creation (1-2 minutes)

### Step 3: Enable Firebase Services

#### Enable Authentication
1. In Firebase Console, click "Authentication"
2. Click "Get Started"
3. Enable sign-in methods:
   - **Email/Password**: Enable
   - **Phone**: Enable (requires billing account)
   - **Google**: Enable
4. Click "Save"

#### Enable Firestore Database
1. Click "Firestore Database"
2. Click "Create Database"
3. Select "Start in test mode" (for development)
4. Choose location: `us-central` (or closest to you)
5. Click "Enable"

#### Enable Storage
1. Click "Storage"
2. Click "Get Started"
3. Start in test mode
4. Choose location: `us-central`
5. Click "Done"

### Step 4: Get Firebase Credentials

#### For Backend (Tushar)
1. Go to Project Settings (gear icon)
2. Click "Service Accounts" tab
3. Click "Generate New Private Key"
4. Download JSON file
5. **Important**: Keep this file secure, never commit to Git
6. Rename to `firebase-service-account.json`

#### For Frontend (Vaishnavi)
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon (</>) to add web app
4. Register app name: `mentor-ai-frontend`
5. Copy Firebase configuration object:
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```
6. Save this configuration for later use

---

## ☁️ Google Cloud Account Setup

### Step 1: Create Google Cloud Account

1. Visit [cloud.google.com](https://cloud.google.com)
2. Click "Get Started for Free"
3. Sign in with Google account
4. Enter billing information (required, but $300 free credit provided)
5. Accept terms and conditions

### Step 2: Create Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click project dropdown (top left)
3. Click "New Project"
4. Enter project name: `mentor-ai-dev`
5. **Important**: Link to Firebase project (select same project ID)
6. Click "Create"

### Step 3: Enable Required APIs

```bash
# Install Google Cloud SDK first (see below)

# Enable APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable generativelanguage.googleapis.com
gcloud services enable texttospeech.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

Or enable via Console:
1. Go to "APIs & Services" > "Library"
2. Search and enable:
   - **Vertex AI API** (for Vector Search)
   - **Generative Language API** (for Gemini Flash)
   - **Cloud Text-to-Speech API** (for audio summaries)
   - **Cloud Run API** (for deployment)
   - **Cloud Build API** (for CI/CD)

### Step 4: Install Google Cloud SDK

#### Ubuntu/Debian Linux
```bash
# Add Cloud SDK repo
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import Google Cloud public key
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Install SDK
sudo apt-get update && sudo apt-get install google-cloud-sdk

# Initialize SDK
gcloud init
```

#### macOS
```bash
# Using Homebrew
brew install --cask google-cloud-sdk

# Initialize SDK
gcloud init
```

#### Windows
1. Download installer from [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
2. Run installer
3. Open Cloud SDK Shell
4. Run: `gcloud init`

### Step 5: Authenticate and Set Project

```bash
# Authenticate with Google Cloud
gcloud auth login

# Set default project
gcloud config set project mentor-ai-dev

# Verify configuration
gcloud config list
```

---

## 💳 Razorpay Account Setup

### Step 1: Create Razorpay Account

1. Visit [razorpay.com](https://razorpay.com)
2. Click "Sign Up"
3. Enter business details
4. Verify email and phone
5. Complete KYC (for production, can skip for testing)

### Step 2: Get API Keys

1. Log in to Razorpay Dashboard
2. Go to "Settings" > "API Keys"
3. Click "Generate Test Key" (for development)
4. Copy and save:
   - **Key ID**: `rzp_test_...`
   - **Key Secret**: `...` (keep secure)

### Step 3: Enable Test Mode

1. In Razorpay Dashboard, toggle to "Test Mode"
2. Use test API keys for development
3. Use test card numbers for testing:
   - **Card**: 4111 1111 1111 1111
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date

**Note**: Switch to "Live Mode" and complete KYC before production deployment.

---

## 🧪 Verification Checklist

Before starting the tutorial, verify all installations:

### Backend (Tushar)
```bash
# Check Python
python3.11 --version  # Should show 3.11.x

# Check pip
pip3 --version

# Check virtual environment
python -m venv test_venv
source test_venv/bin/activate  # Linux/macOS
# OR
test_venv\Scripts\activate  # Windows
deactivate

# Check Git
git --version

# Check Google Cloud SDK
gcloud --version

# Check Firebase CLI (install if needed)
npm install -g firebase-tools
firebase --version
```

### Frontend (Vaishnavi)
```bash
# Check Node.js
node --version  # Should show v18.x or higher

# Check npm
npm --version

# Check Git
git --version

# Check Firebase CLI
npm install -g firebase-tools
firebase --version
```

### Accounts
- [ ] Firebase project created
- [ ] Firebase Authentication enabled
- [ ] Firestore Database created
- [ ] Firebase service account key downloaded (backend)
- [ ] Firebase web config copied (frontend)
- [ ] Google Cloud project created and linked to Firebase
- [ ] Google Cloud APIs enabled
- [ ] Google Cloud SDK installed and authenticated
- [ ] Razorpay account created
- [ ] Razorpay test API keys obtained

### AI Coding Agent
- [ ] Windsurf installed and signed in
- [ ] OR GitHub Copilot installed and activated
- [ ] OR ChatGPT/Claude account created

---

## 🚀 Next Steps

Once all prerequisites are installed and verified:

1. **Tushar**: Go to `tushar-backend/day-01-project-setup/README.md`
2. **Vaishnavi**: Go to `vaishnavi-frontend/day-01-project-setup/README.md`

---

## 🆘 Troubleshooting

### Python Issues

**Issue**: `python3.11: command not found`
- **Fix**: Install Python 3.11 using instructions above
- **Verify**: `which python3.11`

**Issue**: `pip: command not found`
- **Fix**: `python3.11 -m ensurepip --upgrade`

### Node.js Issues

**Issue**: `node: command not found`
- **Fix**: Install Node.js using instructions above
- **Verify**: `which node`

**Issue**: `npm: command not found`
- **Fix**: Reinstall Node.js (npm comes with Node.js)

### Git Issues

**Issue**: `git: command not found`
- **Fix**: Install Git using instructions above

### Firebase Issues

**Issue**: Cannot create Firebase project
- **Fix**: Ensure you're signed in with Google account
- **Fix**: Check if you've reached project limit (10 projects on free tier)

### Google Cloud Issues

**Issue**: Cannot enable APIs
- **Fix**: Ensure billing is enabled (even with free credits)
- **Fix**: Check if you're using correct project

**Issue**: `gcloud: command not found`
- **Fix**: Install Google Cloud SDK
- **Fix**: Add to PATH: `export PATH=$PATH:/path/to/google-cloud-sdk/bin`

### Razorpay Issues

**Issue**: Cannot generate API keys
- **Fix**: Ensure email is verified
- **Fix**: Complete business details in profile

---

## 📚 Additional Resources

- [Python Documentation](https://docs.python.org/3.11/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)

---

**All set?** Head back to [README.md](README.md) and start your development journey!

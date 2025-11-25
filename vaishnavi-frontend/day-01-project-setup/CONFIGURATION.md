# Configuration Guide for Day 1: Frontend Project Setup

This document guides you through all manual setup steps required to run the frontend. Follow each step in order.

---

## Step 1: Install Node.js 18+

### What You're Doing
Installing Node.js 18 or higher, which is required for the Next.js frontend.

### Why This Matters
Node.js provides the JavaScript runtime and npm package manager needed for frontend development.

### Commands/Actions

**On Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**On macOS:**
```bash
brew install node@18
```

**On Windows:**
Download and install from [nodejs.org](https://nodejs.org/)

### Verification
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

### If It Fails
- **Ubuntu**: Run `sudo apt update` first
- **macOS**: Install Homebrew first: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Windows**: Make sure to check "Add to PATH" during installation

---

## Step 2: Install Project Dependencies

### What You're Doing
Installing all required npm packages from package.json.

### Why This Matters
These packages provide Next.js, React, Firebase, Tailwind CSS, and other essential functionality.

### Commands/Actions
```bash
# Navigate to frontend directory
cd vaishnavi-frontend

# Install dependencies
npm install
```

### Verification
```bash
# Check installed packages
npm list --depth=0

# Should see:
# next@14.0.4
# react@18.2.0
# firebase@10.7.1
# tailwindcss@3.4.0
# typescript@5.3.3
```

### If It Fails
- **npm not found**: Install Node.js first (Step 1)
- **Permission errors**: Don't use sudo with npm
- **Network errors**: Check internet connection or try `npm install --legacy-peer-deps`
- **Package conflicts**: Delete node_modules and package-lock.json, then run `npm install` again

---

## Step 3: Configure Firebase Project (Web App)

### What You're Doing
Adding a web app to your Firebase project and getting configuration values.

### Why This Matters
Firebase client SDK needs these configuration values to connect to your Firebase project.

### Commands/Actions

**Step 3.1**: Go to [Firebase Console](https://console.firebase.google.com/)

**Step 3.2**: Select your project (same as backend, or create new)

**Step 3.3**: Click the gear icon (⚙️) → "Project settings"

**Step 3.4**: Scroll down to "Your apps" section

**Step 3.5**: Click "Add app" → Select "Web" (</> icon)

**Step 3.6**: Register app:
- **App nickname**: `mentor-ai-frontend` (or your preferred name)
- **Firebase Hosting**: Check this box (optional, for later deployment)
- Click "Register app"

**Step 3.7**: Copy the Firebase configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "mentor-ai-dev.firebaseapp.com",
  projectId: "mentor-ai-dev",
  storageBucket: "mentor-ai-dev.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Step 3.8**: Click "Continue to console"

### Verification
- You should see the web app listed in "Your apps" section
- Configuration values are displayed

### If It Fails
- **No Firebase project**: Create one first (see backend Day 1 CONFIGURATION.md)
- **Can't add app**: Make sure you're the project owner
- **Missing values**: Refresh the page and check "Your apps" section

---

## Step 4: Enable Firebase Authentication Methods

### What You're Doing
Enabling email, phone, and Google sign-in methods in Firebase.

### Why This Matters
These authentication methods must be enabled before users can register.

### Commands/Actions

**Step 4.1**: In Firebase Console, click "Authentication" in left sidebar

**Step 4.2**: Click "Sign-in method" tab

**Step 4.3**: Enable Email/Password:
- Click "Email/Password"
- Toggle "Enable"
- Click "Save"

**Step 4.4**: Enable Phone:
- Click "Phone"
- Toggle "Enable"
- Click "Save"

**Step 4.5**: Enable Google:
- Click "Google"
- Toggle "Enable"
- Select support email from dropdown
- Click "Save"

### Verification
- Authentication → Sign-in method page shows:
  - ✅ Email/Password: Enabled
  - ✅ Phone: Enabled
  - ✅ Google: Enabled

### If It Fails
- **Methods not appearing**: Refresh the page
- **Can't enable**: Make sure Authentication is set up (click "Get started" if needed)
- **Google requires email**: Select your email from the dropdown

---

## Step 5: Create Environment Variables File

### What You're Doing
Creating a .env.local file with Firebase configuration and API URL.

### Why This Matters
Environment variables store configuration separately from code and make values available to the frontend.

### Commands/Actions

**Step 5.1**: Copy the example file:
```bash
cd vaishnavi-frontend
cp .env.local.example .env.local
```

**Step 5.2**: Edit the .env.local file:
```bash
# Open in your text editor
nano .env.local
# or
code .env.local
```

**Step 5.3**: Fill in the values from Firebase config (Step 3.7):
```bash
# Backend API URL (use mock server for now)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Firebase Configuration (copy from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mentor-ai-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mentor-ai-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mentor-ai-dev.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Step 5.4**: Save and close the file

### Verification
```bash
# Check file exists
cat .env.local

# Should show your configuration values
# Make sure all NEXT_PUBLIC_ variables are filled in
```

### If It Fails
- **File not found**: Make sure you're in vaishnavi-frontend directory
- **Permission denied**: Use `sudo` or check file permissions
- **Wrong values**: Copy again from Firebase Console → Project Settings → Your apps

### ⚠️ Important Notes
- **NEXT_PUBLIC_ prefix**: Required for variables to be available in browser
- **Never commit .env.local**: The .gitignore file already excludes it
- **API URL**: Points to mock server (port 8000) for standalone testing

---

## Step 6: Verify Project Structure

### What You're Doing
Confirming all files and folders are in the correct locations.

### Why This Matters
Incorrect structure will cause import errors when running the frontend.

### Commands/Actions
```bash
# From vaishnavi-frontend directory, check structure
tree -L 3 -I 'node_modules'

# Or use ls if tree is not installed
ls -la
```

### Expected Structure
```
vaishnavi-frontend/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── .env.local
├── .env.local.example
├── .gitignore
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── auth/
│       └── register/
│           └── page.tsx
├── components/
│   ├── AuthForm.tsx
│   └── GoogleSignInButton.tsx
├── lib/
│   ├── firebase.ts
│   └── api.ts
├── mock-data/
│   ├── mock-api-server.js
│   └── mock-api-responses.json
└── node_modules/
```

### Verification
- All folders exist
- All TypeScript/JavaScript files are in correct locations
- .env.local file exists and is not empty
- node_modules folder exists (created by npm install)

### If It Fails
- **Missing folders**: Create them with `mkdir -p folder_name`
- **Missing files**: Review PROMPTS.md and regenerate missing files
- **Wrong structure**: Check file paths in PROMPTS.md

---

## Step 7: Test Firebase Connection

### What You're Doing
Running a quick test to verify Firebase configuration works.

### Why This Matters
Ensures the frontend can connect to Firebase before starting the dev server.

### Commands/Actions

**Step 7.1**: Create a test script:
```bash
# Create test file
cat > test-firebase.js << 'EOF'
// Test Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Testing Firebase configuration...\n");

// Check all values are present
const missingVars = [];
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    missingVars.push(key);
  }
});

if (missingVars.length > 0) {
  console.log("❌ Missing environment variables:");
  missingVars.forEach(v => console.log(`  - ${v}`));
  console.log("\nCheck your .env.local file");
  process.exit(1);
}

console.log("✅ All Firebase environment variables are set");
console.log("\nConfiguration:");
console.log(`  Project ID: ${firebaseConfig.projectId}`);
console.log(`  Auth Domain: ${firebaseConfig.authDomain}`);
console.log("\n✅ Firebase configuration test passed!");
EOF
```

**Step 7.2**: Run the test:
```bash
# Load environment variables and run test
node -r dotenv/config test-firebase.js
```

### Verification
```
Testing Firebase configuration...

✅ All Firebase environment variables are set

Configuration:
  Project ID: mentor-ai-dev
  Auth Domain: mentor-ai-dev.firebaseapp.com

✅ Firebase configuration test passed!
```

### If It Fails
- **Missing variables**: Check .env.local has all NEXT_PUBLIC_FIREBASE_* variables
- **dotenv not found**: Install with `npm install dotenv`
- **Wrong values**: Copy again from Firebase Console
- **File not found**: Make sure .env.local exists

**Common fixes:**
```bash
# Install dotenv for testing
npm install dotenv

# Check environment variables
cat .env.local | grep NEXT_PUBLIC_FIREBASE

# Verify all 6 Firebase variables are present
```

---

## Step 8: Install Mock Server Dependencies

### What You're Doing
Installing Express and CORS for the mock API server.

### Why This Matters
The mock server allows you to test the frontend without the backend running.

### Commands/Actions
```bash
# Install Express and CORS
npm install express cors
```

### Verification
```bash
# Check packages are installed
npm list express cors

# Should show:
# express@4.x.x
# cors@2.x.x
```

### If It Fails
- **npm errors**: Try `npm install --legacy-peer-deps`
- **Permission errors**: Don't use sudo
- **Network errors**: Check internet connection

---

## Step 9: Test Mock API Server

### What You're Doing
Starting the mock API server to verify it works.

### Why This Matters
Ensures you can test the frontend independently before the backend is ready.

### Commands/Actions

**Step 9.1**: Start the mock server:
```bash
# From vaishnavi-frontend directory
node mock-data/mock-api-server.js
```

**Step 9.2**: You should see:
```
Mock API server running on http://localhost:8000
Available endpoints:
  POST /api/auth/register/parent/email
  POST /api/auth/register/parent/phone
  POST /api/auth/register/parent/google
```

**Step 9.3**: Test an endpoint (open new terminal):
```bash
curl -X POST http://localhost:8000/api/auth/register/parent/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","language":"en"}'
```

**Step 9.4**: Stop the server (Ctrl+C in the server terminal)

### Verification
```json
{
  "parent_id": "mock-id-123",
  "email": "test@example.com",
  "verification_required": true,
  "message": "Registration successful"
}
```

### If It Fails
- **Port in use**: Another process is using port 8000, stop it or change port
- **Module not found**: Install express and cors (Step 8)
- **Connection refused**: Check server is running
- **curl not found**: Use Postman or browser extension instead

---

## Step 10: Final Configuration Check

### What You're Doing
Running a comprehensive check of all configuration steps.

### Why This Matters
Ensures everything is set up correctly before starting the dev server.

### Commands/Actions
```bash
# Run all checks
echo "Checking Node.js version..."
node --version

echo "Checking npm packages..."
npm list --depth=0 | grep -E "next|react|firebase|tailwindcss"

echo "Checking environment variables..."
cat .env.local | grep -v "^#" | grep -v "^$"

echo "Checking project structure..."
ls -la app/ components/ lib/ mock-data/

echo "Checking TypeScript config..."
cat tsconfig.json | grep "strict"
```

### Verification
All commands should complete without errors and show:
- ✅ Node.js 18+
- ✅ All packages installed
- ✅ .env.local configured with Firebase values
- ✅ All project folders exist
- ✅ TypeScript strict mode enabled

### If It Fails
Review the specific step that failed and repeat it.

---

## Configuration Complete! 🎉

You've successfully configured the frontend development environment.

### What You've Set Up
- ✅ Node.js 18+ with npm
- ✅ All npm dependencies installed
- ✅ Firebase web app created and configured
- ✅ Firebase authentication methods enabled
- ✅ Environment variables configured
- ✅ Project structure verified
- ✅ Firebase connection tested
- ✅ Mock API server ready

### Next Steps

1. **Open TESTING.md** to start the dev server and test the registration UI
2. After testing, check **EXPECTED-OUTCOME.md** to verify success criteria

### Quick Reference

**Start development server:**
```bash
cd vaishnavi-frontend
npm run dev
```

**Start mock API server (in separate terminal):**
```bash
cd vaishnavi-frontend
node mock-data/mock-api-server.js
```

**Build for production:**
```bash
npm run build
```

**Run production build:**
```bash
npm start
```

---

## Troubleshooting

If you encounter issues, check **TROUBLESHOOTING.md** for common problems and solutions.

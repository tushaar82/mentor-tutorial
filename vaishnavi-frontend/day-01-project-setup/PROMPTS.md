# AI Coding Agent Prompts for Day 1: Frontend Project Setup

This document contains all prompts needed to generate the frontend code for Day 1. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Next.js Project Configuration

### Purpose
Generate package.json with all required dependencies and Next.js configuration files.

### When to Use
Start with this prompt to create the foundation of your frontend project.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/package.json`

**Step 2**: Type this comment at the top of the file:
```json
// Create package.json for Mentor AI Frontend with Next.js 14
// Include dependencies: next, react, react-dom, firebase, tailwindcss
// Include devDependencies: typescript, @types/react, @types/node, autoprefixer, postcss
// Add scripts: dev, build, start, lint
// Use latest stable versions
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create package.json and Next.js configuration files for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: Next.js 14, React 18, TypeScript, Firebase, Tailwind CSS
- File: vaishnavi-frontend/package.json
- Purpose: Frontend application for students and parents

GENERATE:
A complete package.json with all required dependencies and scripts.

REQUIREMENTS:
1. Create package.json with:
   - Name: "mentor-ai-frontend"
   - Version: "1.0.0"
   - Private: true

2. Add dependencies:
   - next: ^14.0.4
   - react: ^18.2.0
   - react-dom: ^18.2.0
   - firebase: ^10.7.1
   - tailwindcss: ^3.4.0
   - autoprefixer: ^10.4.16
   - postcss: ^8.4.32

3. Add devDependencies:
   - typescript: ^5.3.3
   - @types/react: ^18.2.45
   - @types/node: ^20.10.5
   - @types/react-dom: ^18.2.18
   - eslint: ^8.56.0
   - eslint-config-next: ^14.0.4

4. Add scripts:
   - "dev": "next dev" - Start development server
   - "build": "next build" - Build for production
   - "start": "next start" - Start production server
   - "lint": "next lint" - Run ESLint

5. Also generate these config files:

FILE: next.config.js
- Basic Next.js configuration
- Enable React strict mode
- Configure image domains if needed

FILE: tsconfig.json
- TypeScript configuration for Next.js
- Enable strict mode
- Configure path aliases (@/ for root)

FILE: tailwind.config.js
- Tailwind CSS configuration
- Configure content paths for Next.js app directory
- Add custom theme if needed

FILE: postcss.config.js
- PostCSS configuration
- Include tailwindcss and autoprefixer plugins

OUTPUT FORMAT:
- Provide all 5 files separately
- Include comments explaining configurations
- Use proper JSON/JS syntax
- Ready to save and use
```

**What You'll Get**: Complete package.json and all config files

**What to Do**:
1. Copy each file's content
2. Create files in vaishnavi-frontend/ directory
3. Save all files

---

## Prompt 2: Create Firebase Client Configuration

### Purpose
Generate Firebase client SDK initialization code for authentication.

### When to Use
After project configuration, create Firebase client setup.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/firebase.ts`

**Step 2**: Type this comment:
```typescript
// Firebase client SDK initialization for Mentor AI Frontend
// 
// Features:
// - Initialize Firebase app with config from environment variables
// - Export Firebase Auth instance
// - Export Firestore instance
// - Use singleton pattern to avoid multiple initializations
// - Include error handling for missing config
// - Add functions: getAuth(), getFirestore()
// - Support email, phone, and Google OAuth authentication
// - Include TypeScript types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Firebase client SDK initialization for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, TypeScript, Firebase Client SDK
- File: vaishnavi-frontend/lib/firebase.ts
- Purpose: Initialize Firebase for client-side authentication

GENERATE:
A Firebase configuration module with client-side initialization.

REQUIREMENTS:
1. Import Firebase modules:
   - firebase/app
   - firebase/auth
   - firebase/firestore

2. Define Firebase config interface:
   - apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId

3. Load config from environment variables:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID

4. Initialize Firebase app:
   - Use singleton pattern (check if already initialized)
   - Handle errors if config is missing

5. Export Firebase services:
   - Export auth instance (getAuth)
   - Export firestore instance (getFirestore)
   - Export app instance

6. Add helper functions:
   - Function to check if Firebase is initialized
   - Function to get current user

7. Code quality:
   - Use TypeScript types
   - Add comprehensive comments
   - Include error handling
   - Export all necessary instances

INTEGRATE WITH:
- Environment variables in .env.local
- Will be used by: components/AuthForm.tsx, components/GoogleSignInButton.tsx

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete firebase.ts with client initialization

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/lib/firebase.ts`
3. Paste and save

---

## Prompt 3: Create API Client for Backend Communication

### Purpose
Generate API client module for making requests to the backend.

### When to Use
After Firebase config, create API client for backend integration.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/api.ts`

**Step 2**: Type this comment:
```typescript
// API client for Mentor AI Backend communication
//
// Features:
// - Base URL from environment variable NEXT_PUBLIC_API_URL
// - Helper functions for POST requests with JSON body
// - Function: registerParentWithEmail(email, password, language)
// - Function: registerParentWithPhone(phone, language)
// - Function: registerParentWithGoogle(idToken, language)
// - Include error handling and response parsing
// - Add TypeScript interfaces for request/response types
// - Include retry logic for failed requests
// - Add request/response logging for debugging
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create API client module for backend communication in the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/api.ts
- Purpose: Handle HTTP requests to backend API

GENERATE:
An API client module with authentication registration functions.

REQUIREMENTS:
1. Define TypeScript interfaces:
   - ParentEmailRegisterRequest: { email, password, language }
   - ParentPhoneRegisterRequest: { phone, language }
   - ParentGoogleRegisterRequest: { idToken, language }
   - AuthResponse: { parent_id, email?, phone?, verification_required, message }

2. Create base API configuration:
   - Base URL from NEXT_PUBLIC_API_URL environment variable
   - Default headers (Content-Type: application/json)
   - Timeout configuration

3. Create helper function: apiRequest
   - Parameters: endpoint, method, body
   - Handle fetch with error handling
   - Parse JSON response
   - Throw errors with meaningful messages
   - Include retry logic (max 2 retries)

4. Create registration functions:
   - registerParentWithEmail(email, password, language)
     * POST to /api/auth/register/parent/email
     * Return AuthResponse
   - registerParentWithPhone(phone, language)
     * POST to /api/auth/register/parent/phone
     * Return AuthResponse
   - registerParentWithGoogle(idToken, language)
     * POST to /api/auth/register/parent/google
     * Return AuthResponse

5. Error handling:
   - Catch network errors
   - Parse API error responses
   - Throw typed errors with status codes

6. Code quality:
   - Use TypeScript types for all functions
   - Add JSDoc comments
   - Include error handling
   - Add logging for debugging

INTEGRATE WITH:
- Backend API at NEXT_PUBLIC_API_URL
- Will be used by: components/AuthForm.tsx

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete api.ts with backend communication functions

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/lib/api.ts`
3. Paste and save

---

## Prompt 4: Create Root Layout Component

### Purpose
Generate Next.js root layout with Tailwind CSS and metadata.

### When to Use
After lib files, create the root layout for the application.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/layout.tsx`

**Step 2**: Type this comment:
```typescript
// Root layout component for Mentor AI Frontend
//
// Features:
// - Import Tailwind CSS globals
// - Set up HTML structure with lang="en"
// - Add metadata: title "Mentor AI", description "AI-powered exam preparation"
// - Include Inter font from next/font/google
// - Add responsive viewport meta tags
// - Include children prop for nested pages
// - Use TypeScript with proper types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create root layout component for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/layout.tsx
- Purpose: Root layout for all pages

GENERATE:
A Next.js root layout component with Tailwind CSS.

REQUIREMENTS:
1. Import and configure font:
   - Use Inter font from next/font/google
   - Subsets: ['latin']
   - Variable: --font-inter

2. Define metadata:
   - Title: "Mentor AI - AI-Powered Exam Preparation"
   - Description: "Personalized JEE and NEET exam preparation with AI-generated study plans"
   - Viewport: width=device-width, initial-scale=1

3. Create RootLayout component:
   - Accept children prop
   - Return HTML structure with:
     * lang="en"
     * body with font className
     * Apply Tailwind base styles
   - Use TypeScript with proper types

4. Import global CSS:
   - Create and import './globals.css' with Tailwind directives

5. Code quality:
   - Use TypeScript types
   - Add JSDoc comments
   - Follow Next.js 14 app directory conventions
   - Export as default

ALSO GENERATE:
FILE: app/globals.css
- Include Tailwind directives: @tailwind base, components, utilities
- Add custom base styles for body (min-height, font smoothing)
- Add any custom CSS variables

OUTPUT FORMAT:
- Provide both files separately
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete layout.tsx and globals.css

**What to Do**:
1. Copy layout.tsx content
2. Create file `vaishnavi-frontend/app/layout.tsx`
3. Paste and save
4. Copy globals.css content
5. Create file `vaishnavi-frontend/app/globals.css`
6. Paste and save

---

## Prompt 5: Create Home Page

### Purpose
Generate the home page with navigation to registration.

### When to Use
After layout, create the landing page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/page.tsx`

**Step 2**: Type this comment:
```typescript
// Home page for Mentor AI Frontend
//
// Features:
// - Welcome message: "Welcome to Mentor AI"
// - Brief description of the platform
// - Call-to-action button linking to /auth/register
// - Use Tailwind CSS for styling (centered layout, gradient background)
// - Responsive design for mobile and desktop
// - Use Next.js Link component for navigation
// - TypeScript with proper types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create home page component for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/page.tsx
- Purpose: Landing page with call-to-action

GENERATE:
A home page component with hero section and navigation.

REQUIREMENTS:
1. Create Home component:
   - Display hero section with:
     * Main heading: "Welcome to Mentor AI"
     * Subheading: "AI-Powered JEE & NEET Exam Preparation"
     * Description: Brief explanation of platform benefits
     * CTA button: "Get Started" linking to /auth/register

2. Styling with Tailwind CSS:
   - Full-height centered layout
   - Gradient background (blue to purple)
   - White text with proper contrast
   - Responsive typography (text-4xl on mobile, text-6xl on desktop)
   - Hover effects on button
   - Proper spacing and padding

3. Use Next.js Link:
   - Import Link from 'next/link'
   - Link button to /auth/register

4. Code quality:
   - Use TypeScript
   - Export as default
   - Add comments
   - Responsive design

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete page.tsx for home page

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/app/page.tsx`
3. Paste and save

---

## Prompt 6: Create Authentication Form Component

### Purpose
Generate reusable authentication form component with email and phone registration.

### When to Use
After pages, create the main authentication form component.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/AuthForm.tsx`

**Step 2**: Type this comment:
```typescript
// Authentication form component for parent registration
//
// Features:
// - Tab interface to switch between Email and Phone registration
// - Email tab: email input, password input, language select, submit button
// - Phone tab: phone input (+91 prefix), language select, submit button
// - Form validation (email format, password min 8 chars, phone format)
// - Call API functions from lib/api.ts on submit
// - Display success/error messages
// - Loading state during API calls
// - Use React hooks: useState for form state
// - Tailwind CSS styling with proper form design
// - TypeScript with proper types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create authentication form component for parent registration in the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, React, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/AuthForm.tsx
- Purpose: Registration form with email and phone options

GENERATE:
A React component with tabbed registration form.

REQUIREMENTS:
1. Create AuthForm component:
   - Use 'use client' directive (client component)
   - State management with useState:
     * activeTab: 'email' | 'phone'
     * formData: { email, password, phone, language }
     * loading: boolean
     * error: string | null
     * success: string | null

2. Tab interface:
   - Two tabs: "Email" and "Phone"
   - Click to switch between tabs
   - Active tab highlighted with Tailwind CSS

3. Email registration form:
   - Input: email (type="email", required)
   - Input: password (type="password", minLength=8, required)
   - Select: language (options: English, Hindi, Marathi)
   - Button: "Register with Email"
   - Validation: email format, password length

4. Phone registration form:
   - Input: phone (type="tel", pattern for +91, required)
   - Display +91 prefix
   - Select: language (options: English, Hindi, Marathi)
   - Button: "Register with Phone"
   - Validation: phone format (+91XXXXXXXXXX)

5. Form submission:
   - Prevent default form submission
   - Set loading state
   - Call appropriate API function from lib/api.ts
   - Handle success: display message, clear form
   - Handle error: display error message
   - Clear loading state

6. UI/UX:
   - Tailwind CSS styling (modern form design)
   - Disabled state for button during loading
   - Error messages in red
   - Success messages in green
   - Responsive design
   - Proper spacing and alignment

7. Code quality:
   - Use TypeScript types
   - Add JSDoc comments
   - Include error handling
   - Proper form accessibility (labels, aria-labels)

INTEGRATE WITH:
- lib/api.ts (registerParentWithEmail, registerParentWithPhone)
- Will be used in: app/auth/register/page.tsx

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete AuthForm.tsx component

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/AuthForm.tsx`
3. Paste and save

---

## Prompt 7: Create Google Sign-In Button Component

### Purpose
Generate Google OAuth sign-in button with Firebase integration.

### When to Use
After AuthForm, create the Google authentication component.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/GoogleSignInButton.tsx`

**Step 2**: Type this comment:
```typescript
// Google Sign-In button component for parent registration
//
// Features:
// - Button with Google logo and "Sign in with Google" text
// - Use Firebase signInWithPopup with GoogleAuthProvider
// - Get ID token from Firebase user
// - Call registerParentWithGoogle API with token
// - Accept language prop (default: 'en')
// - Display loading state during sign-in
// - Handle errors (popup closed, network errors)
// - Display success/error messages
// - Tailwind CSS styling (Google brand colors)
// - TypeScript with proper types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Google Sign-In button component for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, React, TypeScript, Firebase Auth
- File: vaishnavi-frontend/components/GoogleSignInButton.tsx
- Purpose: Google OAuth authentication button

GENERATE:
A React component for Google Sign-In with Firebase.

REQUIREMENTS:
1. Create GoogleSignInButton component:
   - Use 'use client' directive
   - Accept props: language (default: 'en')
   - State management:
     * loading: boolean
     * error: string | null
     * success: string | null

2. Google Sign-In flow:
   - Import GoogleAuthProvider, signInWithPopup from firebase/auth
   - Import auth from lib/firebase
   - On button click:
     * Create GoogleAuthProvider instance
     * Call signInWithPopup(auth, provider)
     * Get ID token from user: user.getIdToken()
     * Call registerParentWithGoogle(idToken, language) from lib/api
     * Handle success: display message
     * Handle errors: popup closed, network errors

3. Button design:
   - Google logo (use SVG or emoji)
   - Text: "Sign in with Google"
   - Google brand colors (white background, blue text)
   - Hover effect
   - Disabled state during loading
   - Loading spinner when processing

4. Error handling:
   - Catch Firebase auth errors
   - Catch API errors
   - Display user-friendly error messages
   - Handle popup closed by user

5. UI/UX:
   - Tailwind CSS styling
   - Responsive design
   - Proper spacing
   - Accessibility (aria-label)

6. Code quality:
   - Use TypeScript types
   - Add JSDoc comments
   - Include error handling
   - Proper async/await usage

INTEGRATE WITH:
- lib/firebase.ts (Firebase auth)
- lib/api.ts (registerParentWithGoogle)
- Will be used in: app/auth/register/page.tsx

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete GoogleSignInButton.tsx component

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/components/GoogleSignInButton.tsx`
3. Paste and save

---

## Prompt 8: Create Registration Page

### Purpose
Generate registration page that combines AuthForm and GoogleSignInButton.

### When to Use
After components, create the registration page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/auth/register/page.tsx`

**Step 2**: Type this comment:
```typescript
// Registration page for parent sign-up
//
// Features:
// - Page title: "Parent Registration"
// - Import and display AuthForm component
// - Divider with "OR" text
// - Import and display GoogleSignInButton component
// - Link to login page: "Already have an account? Login"
// - Centered layout with card design
// - Tailwind CSS styling
// - TypeScript with proper types
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create registration page for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/auth/register/page.tsx
- Purpose: Parent registration page

GENERATE:
A registration page component that combines authentication methods.

REQUIREMENTS:
1. Create RegisterPage component:
   - Page heading: "Parent Registration"
   - Subheading: "Create an account to get started"

2. Layout structure:
   - Centered card layout
   - White background with shadow
   - Proper padding and spacing
   - Responsive design (full width on mobile, max-width on desktop)

3. Include components:
   - Import and render AuthForm component
   - Divider with "OR" text
   - Import and render GoogleSignInButton component
   - Link to login page at bottom

4. Navigation:
   - Use Next.js Link component
   - Link text: "Already have an account? Login"
   - Link to: /auth/login

5. Styling:
   - Tailwind CSS for layout
   - Gradient background (light blue to light purple)
   - Card with rounded corners and shadow
   - Proper typography hierarchy
   - Responsive spacing

6. Code quality:
   - Use TypeScript
   - Export as default
   - Add comments
   - Follow Next.js conventions

OUTPUT FORMAT:
- Provide complete, runnable code
- Include all necessary imports
- No placeholders or TODOs
- Ready to save and use
```

**What You'll Get**: Complete registration page

**What to Do**:
1. Copy the generated code
2. Create file `vaishnavi-frontend/app/auth/register/page.tsx`
3. Paste and save

---

## Prompt 9: Create Mock API Server

### Purpose
Generate Express server that provides mock API responses for standalone testing.

### When to Use
After all React components, create mock server for independent testing.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Type this comment:
```javascript
// Mock API server for frontend testing without backend
//
// Features:
// - Express server on port 8000
// - CORS enabled for localhost:3000
// - POST /api/auth/register/parent/email - return mock success response
// - POST /api/auth/register/parent/phone - return mock success response
// - POST /api/auth/register/parent/google - return mock success response
// - Simulate 500ms delay for realistic testing
// - Return JSON responses matching backend API contract
// - Log all requests to console
// - Include error simulation (10% chance of error)
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create mock API server for frontend testing in the Mentor AI project.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Node.js, Express
- File: vaishnavi-frontend/mock-data/mock-api-server.js
- Purpose: Standalone testing without backend dependency

GENERATE:
An Express server that mocks backend API responses.

REQUIREMENTS:
1. Set up Express server:
   - Port: 8000
   - Enable CORS for http://localhost:3000
   - Enable JSON body parsing
   - Add request logging middleware

2. Create mock endpoints:
   - POST /api/auth/register/parent/email
     * Accept: { email, password, language }
     * Return: { parent_id: "mock-id-123", email, verification_required: true, message: "Registration successful" }
     * Status: 201
   
   - POST /api/auth/register/parent/phone
     * Accept: { phone, language }
     * Return: { parent_id: "mock-id-456", phone, verification_required: true, message: "Registration successful" }
     * Status: 201
   
   - POST /api/auth/register/parent/google
     * Accept: { idToken, language }
     * Return: { parent_id: "mock-id-789", email: "user@gmail.com", verification_required: false, message: "Registration successful" }
     * Status: 201

3. Add realistic behavior:
   - Simulate 500ms delay with setTimeout
   - 10% chance of returning error (simulate network issues)
   - Log request method, path, and body
   - Return proper error responses (400, 500)

4. Error simulation:
   - Random errors for testing error handling
   - Return { error: "Mock error message" } with 500 status

5. Server startup:
   - Log "Mock API server running on http://localhost:8000"
   - Log available endpoints

6. Code quality:
   - Add comments explaining each endpoint
   - Use proper Express patterns
   - Include error handling

ALSO GENERATE:
FILE: mock-data/mock-api-responses.json
- Sample responses for each endpoint
- Use for reference in frontend code

OUTPUT FORMAT:
- Provide both files separately
- Include all necessary requires
- No placeholders or TODOs
- Ready to save and run
```

**What You'll Get**: Complete mock-api-server.js and mock-api-responses.json

**What to Do**:
1. Copy mock-api-server.js content
2. Create file `vaishnavi-frontend/mock-data/mock-api-server.js`
3. Paste and save
4. Copy mock-api-responses.json content
5. Create file `vaishnavi-frontend/mock-data/mock-api-responses.json`
6. Paste and save
7. Install Express: `npm install express cors`

---

## Prompt 10: Create Environment Configuration Files

### Purpose
Generate .env.local.example template and .gitignore for security.

### When to Use
After all code files, create configuration templates.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/.env.local.example`

**Step 2**: Type this comment:
```bash
# Environment variables template for Mentor AI Frontend
# Copy this to .env.local and fill in actual values
# Include: Firebase config (API key, auth domain, project ID, etc.), API URL
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Create file `vaishnavi-frontend/.gitignore`

**Step 5**: Type this comment:
```bash
# Git ignore file for Next.js frontend
# Ignore: .env.local, .next, node_modules, out, .DS_Store
```

**Step 6**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create environment configuration files for the Mentor AI frontend.

CONTEXT:
- Project: Mentor AI EdTech Platform Frontend
- Stack: Next.js 14, Firebase
- Files: vaishnavi-frontend/.env.local.example and vaishnavi-frontend/.gitignore

GENERATE:
Two configuration files for environment management and Git.

FILE 1: .env.local.example
Create a template with the following variables:
1. NEXT_PUBLIC_API_URL - Backend API URL (http://localhost:8000)
2. NEXT_PUBLIC_FIREBASE_API_KEY - Firebase API key
3. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN - Firebase auth domain
4. NEXT_PUBLIC_FIREBASE_PROJECT_ID - Firebase project ID
5. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET - Firebase storage bucket
6. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID - Firebase messaging sender ID
7. NEXT_PUBLIC_FIREBASE_APP_ID - Firebase app ID

Format:
- Use KEY=value format
- Include comments explaining each variable
- Provide example values (not real credentials)
- Note: NEXT_PUBLIC_ prefix makes variables available in browser

FILE 2: .gitignore
Create a Next.js .gitignore with:
1. Environment files (.env.local, .env*.local)
2. Next.js build output (.next/, out/)
3. Node modules (node_modules/)
4. IDE files (.vscode/, .idea/, *.swp)
5. OS files (.DS_Store, Thumbs.db)
6. Logs (*.log, npm-debug.log*)
7. Testing (coverage/)
8. Misc (.vercel, .turbo)

OUTPUT FORMAT:
- Provide both files separately
- Include comments in both files
- Ready to save and use
```

**What You'll Get**: Complete .env.local.example and .gitignore files

**What to Do**:
1. Copy the .env.local.example content
2. Create file `vaishnavi-frontend/.env.local.example`
3. Paste and save
4. Copy the .gitignore content
5. Create file `vaishnavi-frontend/.gitignore`
6. Paste and save

---

## Summary

You've now generated all the code for Day 1 frontend setup! Here's what you created:

✅ **package.json** - Node.js dependencies and scripts
✅ **next.config.js** - Next.js configuration
✅ **tailwind.config.js** - Tailwind CSS configuration
✅ **tsconfig.json** - TypeScript configuration
✅ **lib/firebase.ts** - Firebase client initialization
✅ **lib/api.ts** - Backend API client
✅ **app/layout.tsx** - Root layout with Tailwind
✅ **app/page.tsx** - Home page
✅ **components/AuthForm.tsx** - Registration form
✅ **components/GoogleSignInButton.tsx** - Google OAuth button
✅ **app/auth/register/page.tsx** - Registration page
✅ **mock-data/mock-api-server.js** - Mock API server
✅ **.env.local.example** - Environment variable template
✅ **.gitignore** - Git ignore rules

## Next Steps

1. Open **CONFIGURATION.md** to set up Node.js, Firebase, and environment variables
2. After configuration, open **TESTING.md** to verify everything works
3. Finally, check **EXPECTED-OUTCOME.md** to confirm success

**Estimated time to complete configuration and testing: 1 hour**

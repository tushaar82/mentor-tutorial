# Day 1: Frontend Project Setup

## What You're Building

A production-ready Next.js frontend with Firebase client SDK integration and authentication UI components. This forms the foundation of the Mentor AI platform's user interface.

## Why This Matters

The frontend serves as the user-facing application that handles:
- User authentication and registration flows
- Interactive UI components for students and parents
- Real-time data synchronization with Firebase
- Responsive design for mobile and desktop
- Secure communication with the backend API

A solid foundation ensures a smooth user experience, maintainability, and scalability throughout the project.

## How It Works

**Architecture Overview:**
1. **Next.js Framework**: Modern React framework with server-side rendering and routing
2. **Firebase Client SDK**: Client-side Firebase integration for authentication and real-time data
3. **Authentication UI**: Registration and login forms for parents with email, phone, and Google OAuth
4. **Tailwind CSS**: Utility-first CSS framework for responsive design
5. **Mock API Server**: Standalone testing without backend dependency

**Technology Stack:**
- Node.js 18+
- Next.js 14 (React framework)
- Firebase Client SDK (authentication)
- Tailwind CSS (styling)
- TypeScript (type safety)

## Learning Objectives

By completing this task, you will:
- Understand how to structure a production-ready Next.js project
- Learn Firebase Client SDK integration for authentication
- Implement registration forms with multiple authentication methods
- Configure Tailwind CSS for responsive design
- Set up mock API server for independent testing
- Test UI components without backend dependency

## Time Estimate

- **LLM Code Generation**: 45 minutes (6-8 prompts)
- **Configuration**: 45 minutes (Node.js, Firebase, environment setup)
- **Testing**: 30 minutes (UI and mock API verification)
- **Total**: 2 hours

## Prerequisites

**Required Software:**
- Node.js 18 or higher (see PREREQUISITES.md in root)
- npm (Node package manager, comes with Node.js)
- Git (version control)
- Text editor or IDE (VS Code recommended)
- AI coding agent (Windsurf, GitHub Copilot, or ChatGPT/Claude access)

**Required Accounts:**
- Firebase project (same project as backend, or create new)
- Google account for Firebase Console access

**Knowledge Prerequisites:**
- Basic JavaScript/TypeScript syntax
- Understanding of React components
- Familiarity with HTML/CSS

## Files You'll Create

```
vaishnavi-frontend/
├── package.json                  # Node.js dependencies
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── .env.local.example           # Environment variable template
├── .gitignore                   # Git ignore rules
├── app/
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── auth/
│       ├── register/
│       │   └── page.tsx         # Registration page
│       └── login/
│           └── page.tsx         # Login page (placeholder)
├── components/
│   ├── AuthForm.tsx             # Reusable auth form component
│   └── GoogleSignInButton.tsx  # Google OAuth button
├── lib/
│   ├── firebase.ts              # Firebase client initialization
│   └── api.ts                   # API client for backend calls
└── mock-data/
    ├── mock-api-server.js       # Express mock server
    └── mock-api-responses.json  # Sample API responses
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ A working Next.js frontend running on http://localhost:3000
- ✅ Firebase Client SDK integrated and configured
- ✅ Registration UI with three authentication methods:
  - Email/password registration form
  - Phone number registration form
  - Google Sign-In button
- ✅ Tailwind CSS configured for styling
- ✅ Mock API server for standalone testing
- ✅ Responsive design for mobile and desktop
- ✅ Proper error handling and validation

## Next Steps

After completing this task, you'll move to:
- **Day 2**: Authentication UI (implement login, verification, session management)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Node.js, Firebase, environment)
4. **TESTING.md** - Verify your implementation works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **TROUBLESHOOTING.md** - Common issues and solutions

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating code with your AI coding agent!

# Day 1: Backend Project Setup

## What You're Building

A production-ready FastAPI backend with Firebase Admin SDK integration and parent authentication endpoints. This forms the foundation of the Mentor AI platform's backend infrastructure.

## Why This Matters

The backend serves as the core API layer that handles:
- User authentication and authorization
- Data persistence with Firebase Firestore
- Integration with Google Cloud AI services
- Secure communication with the frontend

A solid foundation ensures scalability, maintainability, and security throughout the project.

## How It Works

**Architecture Overview:**
1. **FastAPI Framework**: Modern Python web framework with automatic API documentation
2. **Firebase Admin SDK**: Server-side Firebase integration for authentication and database
3. **Authentication Endpoints**: RESTful APIs for parent registration with email, phone, and Google OAuth
4. **Environment Configuration**: Secure credential management using environment variables
5. **CORS Middleware**: Enable secure cross-origin requests from the frontend

**Technology Stack:**
- Python 3.11+
- FastAPI (web framework)
- Firebase Admin SDK (authentication & database)
- Uvicorn (ASGI server)
- Pydantic (data validation)

## Learning Objectives

By completing this task, you will:
- Understand how to structure a production-ready FastAPI project
- Learn Firebase Admin SDK integration for server-side operations
- Implement secure authentication endpoints with multiple methods (email, phone, Google OAuth)
- Configure environment variables for secure credential management
- Set up CORS for frontend-backend communication
- Test APIs independently using curl and Python scripts

## Time Estimate

- **LLM Code Generation**: 45 minutes (6-8 prompts)
- **Configuration**: 45 minutes (Python, Firebase, environment setup)
- **Testing**: 30 minutes (API endpoint verification)
- **Total**: 2 hours

## Prerequisites

**Required Software:**
- Python 3.11 or higher (see PREREQUISITES.md in root)
- pip (Python package manager)
- Git (version control)
- Text editor or IDE (VS Code recommended)
- AI coding agent (Windsurf, GitHub Copilot, or ChatGPT/Claude access)

**Required Accounts:**
- Google Cloud account (free tier)
- Firebase project (will create during configuration)

**Knowledge Prerequisites:**
- Basic Python syntax
- Understanding of REST APIs
- Familiarity with JSON format

## Files You'll Create

```
tushar-backend/
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── services/
│   ├── __init__.py
│   └── auth_service.py       # Authentication business logic
├── routers/
│   ├── __init__.py
│   └── auth_router.py        # Authentication API endpoints
├── models/
│   ├── __init__.py
│   └── auth_models.py        # Pydantic data models
└── utils/
    ├── __init__.py
    └── firebase_config.py    # Firebase initialization
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ A working FastAPI backend running on http://localhost:8000
- ✅ Firebase Admin SDK integrated and configured
- ✅ Three authentication endpoints:
  - `POST /api/auth/register/parent/email` - Email registration
  - `POST /api/auth/register/parent/phone` - Phone registration
  - `POST /api/auth/register/parent/google` - Google OAuth registration
- ✅ Automatic API documentation at http://localhost:8000/docs
- ✅ Standalone testing capability (no frontend required)
- ✅ Proper error handling and validation

## Next Steps

After completing this task, you'll move to:
- **Day 2**: Firebase Authentication (implement verification, login, session management)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Python, Firebase, environment)
4. **TESTING.md** - Verify your implementation works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **TROUBLESHOOTING.md** - Common issues and solutions

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating code with your AI coding agent!

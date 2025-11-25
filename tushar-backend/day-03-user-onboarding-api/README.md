# Day 3: User Onboarding API (Backend)

## What You're Building

Complete user onboarding API system with parent preferences, child profile management, exam selection, and diagnostic test scheduling. This builds on Day 2's authentication to collect essential information for personalized learning.

## Why This Matters

Onboarding is critical for personalizing the learning experience:
- **Parent Preferences**: Captures language, notification preferences, and teaching involvement level
- **Child Profiles**: Collects student information (name, grade, current level) with one-child restriction
- **Exam Selection**: Determines target exam (JEE/NEET), exam date, and subject preferences
- **Diagnostic Test Scheduling**: Calculates available preparation time and schedules initial assessment
- **Data Validation**: Ensures data integrity with proper validation and business rules

A well-designed onboarding flow ensures the platform has all necessary information to generate personalized study plans and accurate diagnostic tests.

## How It Works

**Onboarding Flow Overview:**

1. **Parent Preferences** (Step 1):
   - Collect language preference (English, Hindi, Marathi)
   - Set notification preferences (email, SMS, push)
   - Determine teaching involvement level (high, medium, low)
   - Store in Firestore `parents` collection

2. **Child Profile Creation** (Step 2):
   - Collect child's name, age, grade, current academic level
   - Enforce one-child-per-parent restriction
   - Validate age and grade compatibility
   - Store in Firestore `children` collection
   - Link child to parent via `parent_id`

3. **Exam Selection** (Step 3):
   - Select target exam (JEE Main, JEE Advanced, NEET)
   - Choose exam date (from available dates)
   - Calculate days until exam
   - Select subject preferences and weightages
   - Store in Firestore `exam_preferences` collection

4. **Diagnostic Test Scheduling** (Step 4):
   - Calculate available preparation time
   - Determine diagnostic test difficulty based on grade
   - Generate test scheduling information
   - Create diagnostic test record in `diagnostic_tests` collection
   - Return test ID and scheduled date

**Technology Stack:**
- FastAPI (REST API endpoints)
- Firestore (data storage)
- Pydantic (data validation)
- Firebase Auth (authentication verification)

**Data Flow:**
```
Parent Login → Set Preferences → Create Child Profile → Select Exam → Schedule Diagnostic Test → Ready for Test
```

## Learning Objectives

By completing this task, you will:
- Understand multi-step onboarding API design
- Learn how to implement business rules (one-child restriction)
- Implement data validation with Pydantic models
- Create relationships between Firestore collections
- Handle date calculations and scheduling logic
- Implement authenticated API endpoints with middleware
- Design RESTful APIs for complex workflows
- Test multi-step flows independently

## Time Estimate

- **LLM Code Generation**: 60 minutes (8-10 prompts)
- **Configuration**: 20 minutes (Firestore collections, test data)
- **Testing**: 40 minutes (Test complete onboarding flow)
- **Total**: 2 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Authentication middleware working
- ✅ Test user accounts created

**Required Software:**
- Python 3.11+ with virtual environment
- Firebase project with Firestore enabled
- curl or Postman for API testing

**Knowledge Prerequisites:**
- Understanding of RESTful API design
- Basic knowledge of data validation
- Familiarity with Firestore data modeling

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── preferences_service.py     # Parent preferences logic
│   ├── child_service.py           # Child profile management
│   ├── exam_service.py            # Exam selection and scheduling
│   └── onboarding_service.py      # Orchestrates onboarding flow
├── routers/
│   ├── preferences_router.py      # Preferences endpoints
│   ├── child_router.py            # Child profile endpoints
│   └── exam_router.py             # Exam selection endpoints
├── models/
│   ├── preferences_models.py      # Preferences request/response models
│   ├── child_models.py            # Child profile models
│   └── exam_models.py             # Exam selection models
└── utils/
    └── date_utils.py              # Date calculation utilities
```

## Files You'll Modify

```
tushar-backend/
└── main.py                        # Add new routers
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Parent preferences API with language and notification settings
- ✅ Child profile creation with one-child restriction enforcement
- ✅ Child profile update and retrieval endpoints
- ✅ Exam selection API with date validation
- ✅ Subject preference and weightage configuration
- ✅ Diagnostic test scheduling with date calculations
- ✅ Complete onboarding status tracking
- ✅ Data validation for all inputs
- ✅ Comprehensive error handling
- ✅ Standalone testing capability

## Onboarding Endpoints You'll Create

### Preferences Endpoints
- `POST /api/onboarding/preferences` - Set parent preferences
- `GET /api/onboarding/preferences` - Get current preferences
- `PUT /api/onboarding/preferences` - Update preferences

### Child Profile Endpoints
- `POST /api/onboarding/child` - Create child profile (enforces one-child limit)
- `GET /api/onboarding/child` - Get child profile
- `PUT /api/onboarding/child/{child_id}` - Update child profile
- `DELETE /api/onboarding/child/{child_id}` - Delete child profile (allows creating new one)

### Exam Selection Endpoints
- `GET /api/onboarding/exams/available` - Get available exams and dates
- `POST /api/onboarding/exam/select` - Select exam and date
- `GET /api/onboarding/exam/preferences` - Get exam preferences
- `PUT /api/onboarding/exam/preferences` - Update subject preferences

### Onboarding Status Endpoint
- `GET /api/onboarding/status` - Get overall onboarding completion status

## Next Steps

After completing this task, you'll move to:
- **Day 4**: Vector Search Setup (semantic syllabus search for question generation)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Firestore collections, test data)
4. **TESTING.md** - Verify onboarding flow works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - Parent onboarding journey diagrams
7. **TROUBLESHOOTING.md** - Common Firestore and validation issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating onboarding API code with your AI coding agent!

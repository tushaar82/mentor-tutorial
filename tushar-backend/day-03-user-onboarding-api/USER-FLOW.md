# User Flow for Day 3: User Onboarding API

This document illustrates the complete user onboarding journey from a parent's perspective, showing how they interact with the system and what happens at each step.

---

## Overview

The onboarding flow collects essential information from parents to personalize their child's learning experience. It consists of three main steps:

1. **Set Preferences** - Language, notifications, teaching involvement
2. **Create Child Profile** - Student information and academic level
3. **Select Exam** - Target exam, date, and subject preferences

---

## Complete Onboarding Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     PARENT ONBOARDING JOURNEY                    │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│ Parent Logs  │
│ In (Day 2)   │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1: SET PREFERENCES                                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Parent sees preference form:                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 🌐 Select Language:                                     │    │
│  │    ○ English  ○ हिंदी  ○ मराठी                         │    │
│  │                                                          │    │
│  │ 🔔 Notification Preferences:                            │    │
│  │    ☑ Email notifications                                │    │
│  │    ☑ SMS notifications                                  │    │
│  │    ☐ Push notifications                                 │    │
│  │                                                          │    │
│  │ 👨‍👩‍👧 Teaching Involvement:                                │    │
│  │    ○ High (I'll teach alongside)                        │    │
│  │    ○ Medium (I'll monitor progress)                     │    │
│  │    ○ Low (Child is independent)                         │    │
│  │                                                          │    │
│  │                          [Continue] ──────────┐         │    │
│  └────────────────────────────────────────────────┘        │    │
│                                                             │    │
└─────────────────────────────────────────────────────────────┼────┘
                                                              │
                    API: POST /api/onboarding/preferences    │
                    ┌─────────────────────────────────────────┘
                    │
                    ▼
              ┌──────────────┐
              │  Firestore   │
              │  Stores:     │
              │  - Language  │
              │  - Notif.    │
              │  - Teaching  │
              └──────┬───────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2: CREATE CHILD PROFILE                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Parent sees child profile form:                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 👦 Child Information:                                   │    │
│  │                                                          │    │
│  │ Name: [Rahul Sharma________________]                    │    │
│  │                                                          │    │
│  │ Age: [16▼] (14-19 years)                                │    │
│  │                                                          │    │
│  │ Current Grade: [11▼] (9-12)                             │    │
│  │                                                          │    │
│  │ Current Academic Level:                                 │    │
│  │    ○ Beginner (Just starting preparation)              │    │
│  │    ● Intermediate (Some preparation done)               │    │
│  │    ○ Advanced (Well prepared)                           │    │
│  │                                                          │    │
│  │ ℹ️ Note: You can only add one child profile            │    │
│  │                                                          │    │
│  │                          [Continue] ──────────┐         │    │
│  └────────────────────────────────────────────────┘        │    │
│                                                             │    │
└─────────────────────────────────────────────────────────────┼────┘
                                                              │
                    API: POST /api/onboarding/child          │
                    ┌─────────────────────────────────────────┘
                    │
                    ▼
              ┌──────────────┐
              │  Firestore   │
              │  Stores:     │
              │  - Child ID  │
              │  - Name      │
              │  - Age/Grade │
              │  - Level     │
              │  - Parent ID │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ One-Child    │
              │ Check:       │
              │ ✓ First      │
              │   child OK   │
              │ ✗ Second     │
              │   child      │
              │   rejected   │
              └──────┬───────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 3: SELECT EXAM                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Parent sees exam selection form:                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 🎯 Target Exam:                                         │    │
│  │    ● JEE Main                                           │    │
│  │    ○ JEE Advanced                                       │    │
│  │    ○ NEET                                               │    │
│  │                                                          │    │
│  │ 📅 Exam Date:                                           │    │
│  │    ○ 15 Jan 2026 (142 days away)                       │    │
│  │    ● 15 Apr 2026 (232 days away)                       │    │
│  │                                                          │    │
│  │ 📚 Subject Preferences (Total must be 100%):           │    │
│  │    Physics:     [35]% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │    │
│  │    Chemistry:   [30]% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │    │
│  │    Mathematics: [35]% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │    │
│  │                                                          │    │
│  │    Total: 100% ✓                                        │    │
│  │                                                          │    │
│  │                    [Complete Onboarding] ────────┐      │    │
│  └────────────────────────────────────────────────────┘     │    │
│                                                             │    │
└─────────────────────────────────────────────────────────────┼────┘
                                                              │
                    API: POST /api/onboarding/exam/select    │
                    ┌─────────────────────────────────────────┘
                    │
                    ▼
              ┌──────────────┐
              │  Backend     │
              │  Processing: │
              │              │
              │  1. Validate │
              │     exam     │
              │     date     │
              │              │
              │  2. Validate │
              │     weights  │
              │     = 100%   │
              │              │
              │  3. Calculate│
              │     days     │
              │     until    │
              │     exam     │
              │              │
              │  4. Create   │
              │     diagnostic│
              │     test     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │  Firestore   │
              │  Stores:     │
              │              │
              │  exam_       │
              │  selections/ │
              │  {child_id}  │
              │              │
              │  diagnostic_ │
              │  tests/      │
              │  {test_id}   │
              └──────┬───────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────────┐
│ ONBOARDING COMPLETE                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Parent sees success message:                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ ✅ Onboarding Complete!                                 │    │
│  │                                                          │    │
│  │ Your child's profile is ready:                          │    │
│  │                                                          │    │
│  │ 👦 Student: Rahul Sharma                                │    │
│  │ 🎯 Target: JEE Main (15 Apr 2026)                       │    │
│  │ ⏰ Time Remaining: 232 days                             │    │
│  │ 📝 Diagnostic Test: Scheduled                           │    │
│  │                                                          │    │
│  │ Next Steps:                                             │    │
│  │ 1. Take diagnostic test (200 questions, 3 hours)       │    │
│  │ 2. Get AI-powered analytics                             │    │
│  │ 3. Receive personalized study schedule                  │    │
│  │                                                          │    │
│  │                    [Start Diagnostic Test] ──────┐      │    │
│  └────────────────────────────────────────────────────┘     │    │
│                                                             │    │
└─────────────────────────────────────────────────────────────┼────┘
                                                              │
                                                              ▼
                                                    ┌──────────────┐
                                                    │ Day 4:       │
                                                    │ Diagnostic   │
                                                    │ Test         │
                                                    └──────────────┘
```

---

## Detailed Step-by-Step Flow

### Step 1: Set Preferences

**User Action**: Parent selects language, notification preferences, and teaching involvement level.

**API Call**:
```http
POST /api/onboarding/preferences?parent_id=parent_abc123
Content-Type: application/json

{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high"
}
```

**Backend Processing**:
1. Validate language is one of: en, hi, mr
2. Validate teaching_involvement is one of: high, medium, low
3. Store in Firestore at `parents/{parent_id}/preferences`
4. Add timestamps (created_at, updated_at)

**Response**:
```json
{
  "language": "en",
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": false,
  "teaching_involvement": "high",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:00:00Z",
  "updated_at": "2025-11-25T10:00:00Z"
}
```

**User Sees**: Confirmation message, proceeds to Step 2

---

### Step 2: Create Child Profile

**User Action**: Parent enters child's name, age, grade, and current academic level.

**API Call**:
```http
POST /api/onboarding/child?parent_id=parent_abc123
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate"
}
```

**Backend Processing**:
1. Check if parent already has a child (one-child restriction)
   - If yes: Return 400 error
   - If no: Continue
2. Validate age is between 14-19
3. Validate grade is between 9-12
4. Generate unique child_id
5. Store in Firestore at `children/{child_id}`
6. Link to parent via parent_id
7. Add timestamps

**Response**:
```json
{
  "name": "Rahul Sharma",
  "age": 16,
  "grade": 11,
  "current_level": "intermediate",
  "child_id": "child_xyz789",
  "parent_id": "parent_abc123",
  "created_at": "2025-11-25T10:05:00Z",
  "updated_at": "2025-11-25T10:05:00Z"
}
```

**User Sees**: Child profile created, proceeds to Step 3

**One-Child Restriction**:
If parent tries to create a second child:
```json
{
  "detail": "Parent can only have one child profile. Delete existing profile first."
}
```

---

### Step 3: Select Exam

**User Action**: Parent selects target exam, exam date, and subject preferences.

**First, get available exams**:
```http
GET /api/onboarding/exams/available
```

**Response**:
```json
{
  "exams": [
    {
      "exam_type": "JEE_MAIN",
      "exam_name": "JEE Main",
      "available_dates": ["2026-01-15", "2026-04-15"],
      "subjects": ["Physics", "Chemistry", "Mathematics"]
    },
    {
      "exam_type": "NEET",
      "exam_name": "NEET",
      "available_dates": ["2026-05-05"],
      "subjects": ["Physics", "Chemistry", "Biology"]
    }
  ]
}
```

**Then, select exam**:
```http
POST /api/onboarding/exam/select?parent_id=parent_abc123&child_id=child_xyz789
Content-Type: application/json

{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  }
}
```

**Backend Processing**:
1. Verify child exists and belongs to parent
2. Validate exam_date is in the future
3. Validate subject_preferences sum to 100
4. Calculate days_until_exam (today to exam_date)
5. Create diagnostic test:
   - Generate test_id
   - Set scheduled_date (now + 1 day)
   - Set duration_minutes (180)
   - Set total_questions (200)
   - Set status ("scheduled")
   - Store in `diagnostic_tests/{test_id}`
6. Store exam selection in `exam_selections/{child_id}`
7. Link diagnostic_test_id to exam selection

**Response**:
```json
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 35,
    "Chemistry": 30,
    "Mathematics": 35
  },
  "child_id": "child_xyz789",
  "days_until_exam": 141,
  "diagnostic_test_id": "test_def456",
  "created_at": "2025-11-25T10:10:00Z"
}
```

**User Sees**: Onboarding complete, diagnostic test scheduled

---

## Onboarding Status Tracking

At any point, the system can check onboarding completion:

**API Call**:
```http
GET /api/onboarding/status?parent_id=parent_abc123
```

**Response (Partial Completion)**:
```json
{
  "preferences_completed": true,
  "child_profile_completed": true,
  "exam_selected": false,
  "onboarding_complete": false
}
```

**Response (Full Completion)**:
```json
{
  "preferences_completed": true,
  "child_profile_completed": true,
  "exam_selected": true,
  "onboarding_complete": true
}
```

---

## Error Scenarios

### Scenario 1: Parent Tries to Create Second Child

**User Action**: Parent already has a child, tries to create another.

**API Call**:
```http
POST /api/onboarding/child?parent_id=parent_abc123
```

**Response**:
```json
{
  "detail": "Parent can only have one child profile. Delete existing profile first."
}
```

**User Sees**: Error message explaining one-child limit, option to delete existing child.

---

### Scenario 2: Invalid Age or Grade

**User Action**: Parent enters age 13 (below minimum).

**API Call**:
```http
POST /api/onboarding/child?parent_id=parent_abc123
{
  "name": "Test",
  "age": 13,
  "grade": 9,
  "current_level": "beginner"
}
```

**Response**:
```json
{
  "detail": "Age must be between 14 and 19"
}
```

**User Sees**: Error message, form highlights age field.

---

### Scenario 3: Subject Weightages Don't Sum to 100

**User Action**: Parent sets Physics: 40, Chemistry: 30, Math: 20 (total: 90).

**API Call**:
```http
POST /api/onboarding/exam/select
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2026-04-15T00:00:00Z",
  "subject_preferences": {
    "Physics": 40,
    "Chemistry": 30,
    "Mathematics": 20
  }
}
```

**Response**:
```json
{
  "detail": "Subject weightages must sum to 100. Current sum: 90"
}
```

**User Sees**: Error message, form shows current total and required total.

---

### Scenario 4: Past Exam Date Selected

**User Action**: Parent selects a date in the past.

**API Call**:
```http
POST /api/onboarding/exam/select
{
  "exam_type": "JEE_MAIN",
  "exam_date": "2024-01-15T00:00:00Z",
  "subject_preferences": {...}
}
```

**Response**:
```json
{
  "detail": "Exam date must be in the future. Selected date is in the past."
}
```

**User Sees**: Error message, date picker highlights invalid date.

---

## Data Flow Summary

```
Parent Input → API Validation → Business Logic → Firestore Storage → Response

Preferences:
  Language, Notifications → Validate enums → Store in parents/{id}/preferences → Return with timestamps

Child Profile:
  Name, Age, Grade → Validate ranges → Check one-child → Store in children/{id} → Return with IDs

Exam Selection:
  Exam, Date, Subjects → Validate date & weights → Calculate days → Create test → Store both → Return with test_id
```

---

## Next Steps After Onboarding

Once onboarding is complete:

1. **Day 4**: Parent/child takes diagnostic test (200 questions, 3 hours)
2. **Day 5**: System generates AI-powered analytics using Gemini Flash
3. **Day 6**: System creates personalized study schedule based on analytics
4. **Day 7+**: Child follows schedule, takes practice tests, tracks progress

---

## Key Takeaways

1. **Three-Step Process**: Preferences → Child Profile → Exam Selection
2. **One-Child Restriction**: Enforced at API level, prevents multiple children
3. **Validation**: Age, grade, dates, weightages all validated
4. **Automatic Test Creation**: Diagnostic test created when exam selected
5. **Status Tracking**: System tracks completion of each step
6. **Error Handling**: Clear error messages guide parent through corrections


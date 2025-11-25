# API Contract Specification

This document defines the complete API contract between the Mentor AI backend and frontend. It ensures perfect alignment and prevents integration errors.

## 📋 Overview

- **Base URL**: `http://localhost:8000` (development) / `https://api.mentorai.com` (production)
- **API Version**: `/api/v1`
- **Authentication**: Bearer token in `Authorization` header
- **Content Type**: `application/json`
- **Date Format**: ISO 8601 (e.g., `2024-01-15T10:30:00Z`)

## 🔐 Authentication

All authenticated endpoints require:
```
Authorization: Bearer <firebase_token>
```

## 📡 API Endpoints

### Authentication Endpoints

#### POST /api/v1/auth/register/parent

Register a new parent account.

**Request:**
```json
{
  "email": "parent@example.com",
  "phone": "+919876543210",
  "google_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "language": "en"
}
```

**Response (200 OK):**
```json
{
  "parent_id": "parent_123abc",
  "verification_required": true,
  "message": "Verification code sent to email"
}
```

**Error (400 Bad Request):**
```json
{
  "error": {
    "code": "AUTH_001",
    "message": "Email already registered",
    "details": {}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### POST /api/v1/auth/login

Login with Firebase token.

**Request:**
```json
{
  "firebase_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

**Response (200 OK):**
```json
{
  "user_type": "parent",
  "profile": {
    "parent_id": "parent_123abc",
    "email": "parent@example.com",
    "language": "en",
    "preferences": {},
    "created_at": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

---

#### POST /api/v1/auth/verify

Verify email or phone with code.

**Request:**
```json
{
  "parent_id": "parent_123abc",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "verified": true,
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

---

### User Management Endpoints

#### POST /api/v1/users/parent/preferences

Set parent preferences.

**Request:**
```json
{
  "language": "hi",
  "notification_preferences": {
    "email": true,
    "sms": true,
    "push": false
  },
  "study_times": ["morning", "evening"],
  "educational_background": "Engineering graduate"
}
```

**Response (200 OK):**
```json
{
  "parent_id": "parent_123abc",
  "preferences": {
    "language": "hi",
    "notification_preferences": {
      "email": true,
      "sms": true,
      "push": false
    },
    "study_times": ["morning", "evening"],
    "educational_background": "Engineering graduate"
  },
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

#### POST /api/v1/users/child

Create child profile.

**Request:**
```json
{
  "name": "Rahul Sharma",
  "age": 17,
  "grade": 12,
  "school": "Delhi Public School",
  "prep_status": "SELF_STUDYING"
}
```

**Response (200 OK):**
```json
{
  "child_id": "child_456def",
  "student_credentials": {
    "username": "rahul_sharma_456",
    "password": "temp_pass_789"
  },
  "profile": {
    "name": "Rahul Sharma",
    "age": 17,
    "grade": 12,
    "school": "Delhi Public School",
    "prep_status": "SELF_STUDYING"
  }
}
```

---

#### PUT /api/v1/users/child/{child_id}/exam

Select exam for child.

**Request:**
```json
{
  "exam_type": "JEE_MAIN",
  "exam_session": "January 2025",
  "exam_year": 2025,
  "exam_date": "2025-01-24T09:00:00Z"
}
```

**Response (200 OK):**
```json
{
  "child_id": "child_456def",
  "exam_details": {
    "exam_type": "JEE_MAIN",
    "exam_session": "January 2025",
    "exam_year": 2025,
    "exam_date": "2025-01-24T09:00:00Z"
  },
  "days_remaining": 180
}
```

---

### Diagnostic Test Endpoints

#### POST /api/v1/diagnostic/generate

Generate diagnostic test.

**Request:**
```json
{
  "child_id": "child_456def",
  "exam_type": "JEE_MAIN"
}
```

**Response (200 OK):**
```json
{
  "test_id": "test_789ghi",
  "questions": [
    {
      "id": "q1",
      "topic": "Mechanics",
      "subtopic": "Newton's Laws",
      "difficulty": "medium",
      "type": "MCQ",
      "question": "A block of mass 5 kg is placed on a frictionless surface...",
      "options": {
        "A": "10 N",
        "B": "20 N",
        "C": "30 N",
        "D": "40 N"
      },
      "weightage": 4
    }
  ],
  "duration_minutes": 180,
  "instructions": "This is a 200-question diagnostic test..."
}
```

---

#### POST /api/v1/diagnostic/submit-answer

Submit answer for a question.

**Request:**
```json
{
  "test_id": "test_789ghi",
  "question_id": "q1",
  "answer": "B"
}
```

**Response (200 OK):**
```json
{
  "saved": true,
  "question_id": "q1"
}
```

---

#### POST /api/v1/diagnostic/submit-test

Submit complete test.

**Request:**
```json
{
  "test_id": "test_789ghi"
}
```

**Response (200 OK):**
```json
{
  "test_id": "test_789ghi",
  "overall_score": 145,
  "topic_scores": [
    {
      "topic": "Mechanics",
      "score": 28,
      "total_questions": 40,
      "correct_answers": 28,
      "category": "STRONG"
    },
    {
      "topic": "Thermodynamics",
      "score": 12,
      "total_questions": 30,
      "correct_answers": 12,
      "category": "WEAK"
    }
  ],
  "analytics_id": "analytics_101jkl"
}
```

---

### Analytics Endpoints

#### GET /api/v1/analytics/{analytics_id}

Get detailed analytics.

**Response (200 OK):**
```json
{
  "analytics_id": "analytics_101jkl",
  "test_id": "test_789ghi",
  "child_id": "child_456def",
  "weak_subjects": [
    {
      "subject": "Physics",
      "score": 45,
      "weightage": 30,
      "weak_topics": ["Thermodynamics", "Optics"],
      "reason": "Low score in high-weightage topics"
    }
  ],
  "weak_topics": [
    {
      "topic": "Thermodynamics",
      "score": 40,
      "weightage": 10,
      "priority": "HIGH",
      "reason": "High weightage, low performance"
    }
  ],
  "strategies": [
    {
      "topic": "Thermodynamics",
      "weightage": 10,
      "focus_areas": ["First Law", "Second Law", "Carnot Cycle"],
      "study_techniques": ["Concept revision", "Numerical practice"],
      "estimated_time": "2 weeks",
      "parent_guidance": "Focus on conceptual understanding first"
    }
  ],
  "visual_charts": [
    {
      "type": "radar",
      "title": "Subject-wise Performance",
      "data": {}
    }
  ],
  "generated_at": "2024-01-15T10:30:00Z"
}
```

---

### Schedule Endpoints

#### POST /api/v1/schedule/generate

Generate study schedule.

**Request:**
```json
{
  "child_id": "child_456def",
  "analytics_id": "analytics_101jkl",
  "exam_date": "2025-01-24T09:00:00Z",
  "preferences": {
    "study_hours_per_day": 6,
    "preferred_times": ["morning", "evening"],
    "current_prep_status": "SELF_STUDYING"
  }
}
```

**Response (200 OK):**
```json
{
  "schedule_id": "schedule_202mno",
  "daily_tasks": [
    {
      "day": 1,
      "date": "2024-07-28T00:00:00Z",
      "topics": ["Thermodynamics"],
      "activities": [
        {
          "type": "CONCEPT_LEARNING",
          "topic": "Thermodynamics - First Law",
          "duration_hours": 2,
          "weightage": 10,
          "description": "Study first law concepts and derivations"
        },
        {
          "type": "PRACTICE",
          "topic": "Thermodynamics - First Law",
          "duration_hours": 2,
          "description": "Solve 20 numerical problems"
        }
      ],
      "total_hours": 4,
      "milestone": "Week 1: Thermodynamics Foundation"
    }
  ],
  "milestones": [
    {
      "week": 1,
      "goal": "Complete Thermodynamics basics",
      "topics_covered": ["First Law", "Second Law"],
      "assessment": "Practice test on Thermodynamics"
    }
  ],
  "generated_at": "2024-01-15T10:30:00Z"
}
```

---

#### GET /api/v1/schedule/{schedule_id}

Get schedule with progress.

**Response (200 OK):**
```json
{
  "schedule_id": "schedule_202mno",
  "child_id": "child_456def",
  "schedule": {
    "schedule_id": "schedule_202mno",
    "daily_tasks": [],
    "milestones": [],
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "progress": {
    "completed_tasks": 45,
    "total_tasks": 180,
    "completion_percentage": 25
  },
  "adjustments": [
    {
      "date": "2024-08-15T00:00:00Z",
      "reason": "MISSED_SESSION",
      "changes": ["Rescheduled Optics to next week"]
    }
  ]
}
```

---

#### POST /api/v1/schedule/reschedule

Reschedule based on performance.

**Request:**
```json
{
  "schedule_id": "schedule_202mno",
  "reason": "PRACTICE_TEST_PERFORMANCE",
  "trigger_data": {
    "new_weak_topics": ["Optics"],
    "improved_topics": ["Thermodynamics"]
  }
}
```

**Response (200 OK):**
```json
{
  "schedule_id": "schedule_202mno",
  "updated_schedule": {
    "schedule_id": "schedule_202mno",
    "daily_tasks": [],
    "milestones": [],
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "changes": [
    "Added 3 extra days for Optics",
    "Reduced Thermodynamics revision time"
  ],
  "strategy": "MINOR_ADJUSTMENT"
}
```

---

### Question Generation Endpoints

#### POST /api/v1/questions/generate

Generate practice questions.

**Request:**
```json
{
  "topic": "Thermodynamics",
  "exam_type": "JEE_MAIN",
  "difficulty": "medium",
  "count": 10
}
```

**Response (200 OK):**
```json
{
  "questions": [
    {
      "id": "q_practice_1",
      "topic": "Thermodynamics",
      "subtopic": "First Law",
      "difficulty": "medium",
      "type": "MCQ",
      "question": "Calculate the work done in an isothermal process...",
      "options": {
        "A": "100 J",
        "B": "200 J",
        "C": "300 J",
        "D": "400 J"
      },
      "weightage": 4
    }
  ],
  "generated_at": "2024-01-15T10:30:00Z"
}
```

---

#### POST /api/v1/questions/practice-session

Start practice session.

**Request:**
```json
{
  "child_id": "child_456def",
  "topic": "Thermodynamics",
  "session_type": "PRACTICE"
}
```

**Response (200 OK):**
```json
{
  "session_id": "session_303pqr",
  "questions": [],
  "duration_minutes": 30
}
```

---

### Teaching Resources Endpoints

#### GET /api/v1/teaching/notes/{topic}

Get teaching notes for a topic.

**Query Parameters:**
- `language`: `en`, `hi`, or `mr`
- `exam_type`: `JEE_MAIN`, `JEE_ADVANCED`, `NEET`, or `MHT_CET`

**Response (200 OK):**
```json
{
  "topic": "Thermodynamics",
  "language": "en",
  "notes": "# Thermodynamics\n\n## First Law\n\nThe first law states...",
  "examples": [
    "Example 1: Calculate work done in isothermal expansion"
  ],
  "formulas": [
    "ΔU = Q - W",
    "W = nRT ln(V2/V1)"
  ],
  "generated_at": "2024-01-15T10:30:00Z"
}
```

---

#### GET /api/v1/teaching/methodology/{topic}

Get teaching methodology.

**Response (200 OK):**
```json
{
  "topic": "Thermodynamics",
  "teaching_guide": "Start with real-world examples like refrigerators...",
  "common_difficulties": [
    "Understanding sign conventions",
    "Differentiating between heat and work"
  ],
  "activities": [
    "Demonstrate with piston-cylinder model",
    "Solve numerical problems step-by-step"
  ],
  "teaching_sequence": [
    "1. Introduce concepts with examples",
    "2. Explain laws and derivations",
    "3. Solve simple problems",
    "4. Progress to complex problems"
  ]
}
```

---

#### GET /api/v1/teaching/mindmap/{topic}

Get topic mindmap.

**Query Parameters:**
- `language`: `en`, `hi`, or `mr`

**Response (200 OK):**
```json
{
  "topic": "Thermodynamics",
  "language": "en",
  "mindmap_data": {
    "id": "root",
    "label": "Thermodynamics",
    "children": [
      {
        "id": "first_law",
        "label": "First Law",
        "children": []
      },
      {
        "id": "second_law",
        "label": "Second Law",
        "children": []
      }
    ]
  },
  "image_url": "https://storage.googleapis.com/mentor-ai/mindmaps/thermodynamics.png"
}
```

---

#### GET /api/v1/teaching/audio-summary/{topic}

Get audio summary.

**Query Parameters:**
- `language`: `en`, `hi`, or `mr`

**Response (200 OK):**
```json
{
  "topic": "Thermodynamics",
  "language": "en",
  "audio_url": "https://storage.googleapis.com/mentor-ai/audio/thermodynamics_en.mp3",
  "transcript": "Welcome to the audio summary of Thermodynamics...",
  "duration_seconds": 180
}
```

---

### Payment Endpoints

#### POST /api/v1/payment/create-order

Create payment order.

**Request:**
```json
{
  "parent_id": "parent_123abc",
  "plan_id": "premium_annual"
}
```

**Response (200 OK):**
```json
{
  "order_id": "order_404stu",
  "razorpay_order_id": "order_MfG7xYz9Abc123",
  "amount": 9999,
  "currency": "INR",
  "razorpay_key_id": "rzp_test_1234567890"
}
```

---

#### POST /api/v1/payment/verify

Verify payment.

**Request:**
```json
{
  "order_id": "order_404stu",
  "razorpay_payment_id": "pay_MfG7xYz9Abc123",
  "razorpay_signature": "abc123def456..."
}
```

**Response (200 OK):**
```json
{
  "verified": true,
  "subscription_active": true,
  "subscription_expiry": "2025-01-15T10:30:00Z"
}
```

---

#### GET /api/v1/payment/history/{parent_id}

Get payment history.

**Response (200 OK):**
```json
{
  "transactions": [
    {
      "transaction_id": "txn_505vwx",
      "amount": 9999,
      "status": "SUCCESS",
      "date": "2024-01-15T10:30:00Z",
      "plan": "Premium Annual"
    }
  ],
  "current_plan": "Premium Annual",
  "renewal_date": "2025-01-15T10:30:00Z"
}
```

---

### Progress Tracking Endpoints

#### GET /api/v1/progress/{student_id}

Get student progress.

**Response (200 OK):**
```json
{
  "student_id": "student_606yza",
  "overall_progress": {
    "completion_percentage": 45,
    "mastery_score": 72,
    "topics_completed": 18,
    "total_topics": 40
  },
  "subject_progress": [
    {
      "subject": "Physics",
      "completion_percentage": 50,
      "mastery_score": 75
    }
  ],
  "topic_progress": [
    {
      "topic": "Thermodynamics",
      "completion_percentage": 100,
      "mastery_score": 85,
      "status": "MASTERED",
      "time_spent_hours": 12,
      "practice_sessions": 8,
      "last_practiced": "2024-01-15T10:30:00Z"
    }
  ],
  "timeline": [
    {
      "date": "2024-01-15T00:00:00Z",
      "topics_covered": ["Thermodynamics"],
      "time_spent_hours": 4,
      "questions_attempted": 50,
      "questions_correct": 42
    }
  ]
}
```

---

### Dashboard Endpoints

#### GET /api/v1/dashboard/parent/{parent_id}

Get parent dashboard.

**Response (200 OK):**
```json
{
  "parent_id": "parent_123abc",
  "child_profile": {
    "student_id": "student_606yza",
    "child_id": "child_456def",
    "name": "Rahul Sharma",
    "age": 17,
    "grade": 12,
    "school": "Delhi Public School",
    "exam_details": {
      "exam_type": "JEE_MAIN",
      "exam_session": "January 2025",
      "exam_year": 2025,
      "exam_date": "2025-01-24T09:00:00Z",
      "days_remaining": 180
    },
    "created_at": "2024-01-15T10:30:00Z"
  },
  "progress_summary": {
    "overall_completion": 45,
    "weak_areas": ["Thermodynamics", "Optics"],
    "strong_areas": ["Mechanics", "Electrostatics"],
    "study_streak_days": 15,
    "daily_study_hours": 5.5
  },
  "schedule_summary": {
    "today_tasks": {
      "day": 45,
      "date": "2024-08-28T00:00:00Z",
      "topics": ["Optics"],
      "activities": [],
      "total_hours": 4
    },
    "upcoming_milestones": [
      {
        "week": 10,
        "goal": "Complete Optics",
        "topics_covered": ["Ray Optics", "Wave Optics"],
        "assessment": "Practice test on Optics"
      }
    ]
  },
  "analytics_summary": {
    "recent_test_score": 145,
    "improvement_trend": "IMPROVING"
  }
}
```

---

#### GET /api/v1/dashboard/student/{student_id}

Get student dashboard.

**Response (200 OK):**
```json
{
  "student_id": "student_606yza",
  "exam_details": {
    "exam_type": "JEE_MAIN",
    "exam_session": "January 2025",
    "exam_year": 2025,
    "exam_date": "2025-01-24T09:00:00Z",
    "days_remaining": 180
  },
  "today_tasks": {
    "day": 45,
    "date": "2024-08-28T00:00:00Z",
    "topics": ["Optics"],
    "activities": [],
    "total_hours": 4
  },
  "progress_summary": {
    "topics_mastered": 18,
    "current_streak": 15,
    "total_study_hours": 220
  },
  "diagnostic_status": {
    "completed": true,
    "score": 145,
    "analytics_available": true
  },
  "practice_recommendations": [
    {
      "topic": "Thermodynamics",
      "reason": "Weak area with high weightage"
    }
  ]
}
```

---

## 🔒 Error Codes

| Code | Message | Description |
|------|---------|-------------|
| AUTH_001 | Invalid credentials | Email/password incorrect |
| AUTH_002 | Email already registered | Email exists in system |
| AUTH_003 | Verification required | Email/phone not verified |
| AUTH_004 | Invalid token | Firebase token expired/invalid |
| USER_001 | Child limit reached | Only one child allowed |
| USER_002 | Child not found | Invalid child_id |
| TEST_001 | Test not found | Invalid test_id |
| TEST_002 | Test already submitted | Cannot resubmit test |
| PAYMENT_001 | Payment verification failed | Invalid signature |
| PAYMENT_002 | Order not found | Invalid order_id |
| API_001 | Rate limit exceeded | Too many requests |
| API_002 | Service unavailable | AI service down |

---

## 🧪 Testing

### Using curl

```bash
# Register parent
curl -X POST http://localhost:8000/api/v1/auth/register/parent \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "language": "en"}'

# Get analytics (with auth)
curl -X GET http://localhost:8000/api/v1/analytics/analytics_101jkl \
  -H "Authorization: Bearer <token>"
```

### Using Frontend API Client

See `shared/types.ts` for TypeScript types and example API client implementation.

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- All authenticated endpoints require Bearer token
- Rate limits: 100 requests/minute per user
- File uploads: Max 10MB per file
- Response times: < 3s for AI operations, < 500ms for CRUD operations

---

**For implementation details, see:**
- Backend: `tushar-backend/APPENDIX-backend.md`
- Frontend: `vaishnavi-frontend/APPENDIX-frontend.md`
- Types: `shared/types.ts`

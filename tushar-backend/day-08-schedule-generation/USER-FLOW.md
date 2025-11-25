# User Flow: Analytics to Schedule to Progress Tracking

## Overview

This document describes the complete user journey from diagnostic test completion through schedule generation to daily progress tracking and adaptive rescheduling.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPLETE USER JOURNEY                        │
└─────────────────────────────────────────────────────────────────┘

Day 6: Diagnostic Test
┌──────────────────┐
│ Student Takes    │
│ Diagnostic Test  │
│ (200 questions)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Submit Answers   │
│ POST /api/test/  │
│      submit      │
└────────┬─────────┘
         │
         ▼

Day 7: Analytics Generation
┌──────────────────┐
│ Generate         │
│ Analytics        │
│ (Gemini Flash)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Analytics Report │
│ - Strengths      │
│ - Weaknesses     │
│ - Priorities     │
└────────┬─────────┘
         │
         ▼

Day 8: Schedule Generation (THIS FLOW)
┌──────────────────┐
│ Student/Parent   │
│ Requests         │
│ Study Schedule   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ System Fetches   │
│ Analytics Data   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Calculate        │
│ Topic Priorities │
│ (Algorithm)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Build Context    │
│ for Gemini       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Generate         │
│ Schedule         │
│ (Gemini Flash)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Validate &       │
│ Optimize         │
│ Schedule         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Store in         │
│ Firestore        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Return 90-Day    │
│ Schedule to      │
│ Student          │
└────────┬─────────┘
         │
         ▼

Daily Progress Tracking
┌──────────────────┐
│ Student Views    │
│ Today's Tasks    │
│ GET /progress/   │
│      today       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Student Studies  │
│ - Watches videos │
│ - Reads material │
│ - Solves problems│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Student Marks    │
│ Topics Complete  │
│ POST /progress/  │
│      update      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ System Tracks    │
│ - Time spent     │
│ - Completion %   │
│ - Notes          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Check if         │
│ Rescheduling     │
│ Needed           │
└────────┬─────────┘
         │
         ├─── No ──────────┐
         │                 │
         │ Yes             │
         ▼                 ▼
┌──────────────────┐  ┌──────────────────┐
│ Trigger          │  │ Continue with    │
│ Adaptive         │  │ Current Schedule │
│ Rescheduling     │  └──────────────────┘
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Regenerate       │
│ Remaining Days   │
│ (Gemini Flash)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Notify Student   │
│ of Schedule      │
│ Changes          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Continue Daily   │
│ Progress         │
│ Tracking         │
└──────────────────┘
```

---

## Detailed Step-by-Step Flow

### Phase 1: Schedule Request

#### Step 1: Student/Parent Initiates Schedule Generation
**Actor**: Student or Parent  
**Action**: Clicks "Generate Study Schedule" button in app  
**Location**: After viewing analytics report

**Frontend Request**:
```javascript
POST /api/schedule/generate
{
  "student_id": "student_456",
  "analytics_id": "analytics_789",
  "exam_type": "JEE_MAIN",
  "exam_date": "2024-04-15",
  "daily_study_hours": 4.0
}
```

**User Sees**:
- Loading spinner: "Generating your personalized schedule..."
- Progress indicator: "Analyzing your performance..."

---

### Phase 2: Backend Processing

#### Step 2: Fetch Analytics Data
**System Action**: Retrieve analytics report from Firestore  
**Data Retrieved**:
- Overall score and percentage
- Subject-wise scores
- Topic-wise performance
- Strengths and weaknesses
- AI-generated insights

**Code**:
```python
analytics = fetch_analytics_from_firestore(analytics_id)
student = fetch_student_profile_from_firestore(student_id)
```

#### Step 3: Calculate Topic Priorities
**System Action**: Rank topics by importance  
**Algorithm**:
```
For each topic:
  Priority Score = Weightage × (100 - Accuracy) × Difficulty
  
Sort topics by Priority Score (highest first)
```

**Result**:
```python
priority_topics = [
  {"topic": "Thermodynamics", "score": 480, "hours": 15},
  {"topic": "Organic Chemistry", "score": 450, "hours": 18},
  {"topic": "Calculus", "score": 375, "hours": 20},
  ...
]
```

#### Step 4: Calculate Time Constraints
**System Action**: Determine available study time  
**Calculations**:
```python
available_days = (exam_date - today).days  # 90 days
total_hours = available_days × daily_hours × 0.9  # 324 hours (with buffer)
revision_days = last 3 days
practice_test_days = every 7 days
```

#### Step 5: Build Context for Gemini
**System Action**: Format data into structured prompt  
**Context Sections**:
1. Student Profile (exam, date, hours)
2. Analytics Summary (scores, strengths, weaknesses)
3. Priority Topics (ranked list with scores)
4. Syllabus Weightages (topic percentages)
5. Constraints (rules for scheduling)

**Progress Update**:
- User sees: "Creating your personalized plan..."

#### Step 6: Generate Schedule with Gemini
**System Action**: Call Gemini Flash API  
**Prompt**: Complete context + task description + output format  
**Gemini Processing Time**: 10-20 seconds  
**Gemini Output**: JSON with 90 days of schedule

**Progress Update**:
- User sees: "AI is optimizing your schedule..."

#### Step 7: Parse and Validate Response
**System Action**: Convert JSON to Schedule model  
**Validations**:
- All days present (1-90)
- Daily hours within limits (2-5)
- All high-priority topics covered
- Subjects balanced
- Revision and test days included

**If Validation Fails**:
- Retry with refinement prompt
- Max 3 attempts
- Fallback to algorithmic scheduling if all fail

#### Step 8: Optimize Schedule
**System Action**: Fine-tune schedule  
**Optimizations**:
- Balance subjects across days
- Group related topics
- Ensure logical progression
- Add buffer days

#### Step 9: Store in Firestore
**System Action**: Save schedule to database  
**Collections**:
```
schedules/{schedule_id}
  - student_id
  - analytics_id
  - exam_type
  - days (array)
  - priority_topics
  - status: "active"
```

---

### Phase 3: Schedule Delivery

#### Step 10: Return Schedule to Frontend
**Backend Response**:
```json
{
  "schedule_id": "sched_abc123",
  "total_days": 90,
  "days": [...],
  "priority_topics": [...],
  "message": "Your personalized schedule is ready!"
}
```

**User Sees**:
- Success message: "Schedule generated successfully!"
- Schedule overview:
  - Total days: 90
  - Daily study hours: 4
  - Priority topics: Thermodynamics, Organic Chemistry, Calculus
  - Next revision: Day 88
  - Next practice test: Day 7

#### Step 11: Student Views Schedule
**Frontend Display**:
```
┌─────────────────────────────────────┐
│     Your 90-Day Study Schedule      │
├─────────────────────────────────────┤
│ Exam: JEE Main 2024                 │
│ Exam Date: April 15, 2024           │
│ Days Remaining: 90                  │
│ Daily Study: 4 hours                │
├─────────────────────────────────────┤
│ Priority Topics:                    │
│ 🔴 Thermodynamics (15 hours)        │
│ 🔴 Organic Chemistry (18 hours)     │
│ 🟡 Calculus (20 hours)              │
├─────────────────────────────────────┤
│ Today's Tasks (Day 1):              │
│ ✓ Thermodynamics - Laws (2.5 hrs)  │
│ ✓ Thermodynamics - Heat (1.5 hrs)  │
├─────────────────────────────────────┤
│ [View Full Schedule] [Start Today]  │
└─────────────────────────────────────┘
```

---

### Phase 4: Daily Progress Tracking

#### Step 12: Student Starts Daily Study
**Action**: Student clicks "Start Today" or "View Today's Tasks"  
**API Call**:
```javascript
GET /api/schedule/progress/today?schedule_id=sched_abc123
```

**Response**:
```json
{
  "day_number": 1,
  "date": "2024-01-16",
  "topics": [
    {
      "topic": "Thermodynamics - Laws of Thermodynamics",
      "estimated_hours": 2.5,
      "subtopics": [
        "First Law of Thermodynamics",
        "Second Law of Thermodynamics",
        "Carnot Engine"
      ],
      "resources": [
        "Watch: Thermodynamics Basics (30 min)",
        "Read: Chapter 12 - Laws of Thermodynamics",
        "Solve: 20 practice questions"
      ],
      "goals": [
        "Understand first and second laws",
        "Solve 15/20 questions correctly"
      ]
    }
  ]
}
```

**User Sees**:
```
┌─────────────────────────────────────┐
│        Today's Study Plan           │
│           Day 1 of 90               │
├─────────────────────────────────────┤
│ Topic 1: Thermodynamics - Laws      │
│ Time: 2.5 hours                     │
│                                     │
│ What to Study:                      │
│ • First Law of Thermodynamics       │
│ • Second Law of Thermodynamics      │
│ • Carnot Engine                     │
│                                     │
│ Resources:                          │
│ 📺 Watch: Thermodynamics Basics     │
│ 📖 Read: Chapter 12                 │
│ ✏️ Solve: 20 practice questions     │
│                                     │
│ Goals:                              │
│ ✓ Understand first and second laws  │
│ ✓ Solve 15/20 questions correctly   │
│                                     │
│ [Start Timer] [Mark Complete]       │
└─────────────────────────────────────┘
```

#### Step 13: Student Studies
**Actions**:
1. Watches video (30 min)
2. Reads textbook chapter (60 min)
3. Solves practice questions (60 min)
4. Reviews mistakes (30 min)

**Total Time**: 2.5 hours

#### Step 14: Student Marks Topic Complete
**Action**: Clicks "Mark Complete" button  
**Frontend Shows**: Completion form
```
┌─────────────────────────────────────┐
│     Mark Topic as Complete          │
├─────────────────────────────────────┤
│ Topic: Thermodynamics - Laws        │
│                                     │
│ Time Spent: [2.5] hours             │
│                                     │
│ Practice Questions:                 │
│ Solved: [18] / 20                   │
│ Accuracy: [90]%                     │
│                                     │
│ How do you feel about this topic?   │
│ ○ Confident ● Good ○ Need More Time │
│                                     │
│ Notes (optional):                   │
│ [Understood concepts well, need     │
│  more practice on Carnot cycle]     │
│                                     │
│ [Cancel] [Submit]                   │
└─────────────────────────────────────┘
```

**API Call**:
```javascript
POST /api/schedule/progress/update
{
  "schedule_id": "sched_abc123",
  "day_number": 1,
  "date": "2024-01-16",
  "status": "completed",
  "topics_completed": [
    {
      "topic": "Thermodynamics - Laws",
      "time_spent": 2.5,
      "completion_percentage": 100,
      "practice_questions_solved": 18,
      "practice_accuracy": 90,
      "confidence_level": "good",
      "notes": "Understood concepts well, need more practice on Carnot cycle"
    }
  ],
  "total_time_spent": 4.0,
  "completion_percentage": 100
}
```

#### Step 15: System Updates Progress
**Backend Actions**:
1. Save progress to Firestore
2. Update schedule completion percentage
3. Check if rescheduling needed
4. Calculate study streak
5. Update analytics

**User Sees**:
```
┌─────────────────────────────────────┐
│     Great Job! Day 1 Complete! 🎉   │
├─────────────────────────────────────┤
│ Time Studied: 4 hours               │
│ Topics Completed: 2/2               │
│ Practice Accuracy: 90%              │
│                                     │
│ Progress:                           │
│ ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 1/90 │
│                                     │
│ Study Streak: 1 day 🔥              │
│                                     │
│ Tomorrow's Preview (Day 2):         │
│ • Organic Chemistry - Basics        │
│ • Hydrocarbons                      │
│                                     │
│ [View Tomorrow] [View Full Schedule]│
└─────────────────────────────────────┘
```

---

### Phase 5: Adaptive Rescheduling

#### Scenario A: Student Misses Days

**Day 5**: Student hasn't studied for days 2, 3, 4

**System Detection**:
```python
missed_days = [2, 3, 4]
if len(missed_days) >= 2 and are_consecutive(missed_days):
    trigger_reschedule("missed_sessions")
```

**User Notification**:
```
┌─────────────────────────────────────┐
│     Schedule Update Needed          │
├─────────────────────────────────────┤
│ We noticed you missed 3 days.       │
│ Don't worry! We can adjust your     │
│ schedule to help you catch up.      │
│                                     │
│ Options:                            │
│ 1. Increase daily hours to 4.5      │
│ 2. Focus on highest priorities      │
│ 3. Extend schedule by 3 days        │
│                                     │
│ [Regenerate Schedule] [Continue]    │
└─────────────────────────────────────┘
```

**If User Clicks "Regenerate Schedule"**:

**API Call**:
```javascript
POST /api/schedule/sched_abc123/regenerate
{
  "current_day": 5,
  "reason": "missed_sessions",
  "notes": "Missed 3 days due to illness"
}
```

**Backend Processing**:
1. Fetch incomplete topics
2. Recalculate priorities
3. Calculate remaining days (86 days)
4. Build reschedule context
5. Generate new schedule with Gemini
6. Merge with completed days
7. Store updated schedule

**User Sees**:
```
┌─────────────────────────────────────┐
│     Schedule Updated! ✓             │
├─────────────────────────────────────┤
│ Your schedule has been adjusted     │
│ for the remaining 86 days.          │
│                                     │
│ Changes:                            │
│ • Daily hours: 4.0 → 4.2 hours      │
│ • Topics redistributed              │
│ • High priorities maintained        │
│                                     │
│ Today's New Tasks (Day 5):          │
│ • Thermodynamics - Heat Transfer    │
│ • Organic Chemistry - Basics        │
│                                     │
│ [View Updated Schedule] [Start]     │
└─────────────────────────────────────┘
```

#### Scenario B: Topic Takes Longer

**Day 10**: Calculus took 30 hours instead of 20 hours

**System Detection**:
```python
estimated = 20
actual = 30
if actual > estimated * 1.5:
    trigger_reschedule("topic_overrun")
```

**Backend Actions**:
1. Update estimated hours for similar topics
2. Adjust remaining schedule
3. May remove low-priority topics if needed

**User Notification**:
```
┌─────────────────────────────────────┐
│     Schedule Adjusted               │
├─────────────────────────────────────┤
│ We noticed Calculus took more time  │
│ than expected. Your schedule has    │
│ been adjusted to accommodate.       │
│                                     │
│ Changes:                            │
│ • Similar topics: +2 hours each     │
│ • Low-priority topics removed: 2    │
│ • Schedule remains feasible         │
│                                     │
│ [View Changes] [Continue]           │
└─────────────────────────────────────┘
```

---

## Success Metrics

### Schedule Generation
- **Generation Time**: < 30 seconds
- **Success Rate**: > 95%
- **Quality Score**: > 80/100

### User Engagement
- **Daily Active Users**: Track students using schedule daily
- **Completion Rate**: % of days completed
- **Study Streak**: Average consecutive days

### Learning Outcomes
- **Topic Completion**: % of priority topics completed
- **Practice Accuracy**: Average accuracy on practice questions
- **Exam Readiness**: Improvement in mock test scores

---

## Error Scenarios

### Error 1: Analytics Not Found
**Trigger**: analytics_id doesn't exist  
**User Message**: "Analytics report not found. Please complete diagnostic test first."  
**Action**: Redirect to diagnostic test

### Error 2: Insufficient Time
**Trigger**: Exam date too close (< 30 days)  
**User Message**: "Only 25 days until exam. Schedule may be intensive. Continue?"  
**Action**: Show warning, allow user to proceed or adjust exam date

### Error 3: Schedule Generation Failed
**Trigger**: Gemini API error after 3 retries  
**User Message**: "Unable to generate schedule. Please try again."  
**Action**: Fallback to algorithmic scheduling or retry later

---

## Conclusion

This flow ensures:
- ✅ Seamless transition from analytics to schedule
- ✅ Personalized, AI-powered schedule generation
- ✅ Daily progress tracking and motivation
- ✅ Adaptive rescheduling when needed
- ✅ Clear communication at every step
- ✅ Error handling and fallbacks

Students receive a complete, adaptive learning system that maximizes their exam preparation efficiency!

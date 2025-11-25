# Testing Guide for Day 8: Schedule Generation

## Overview

This guide provides comprehensive testing instructions for the schedule generation system. Test each component independently, then test the complete workflow.

**Time Estimate**: 60 minutes

---

## Test 1: Priority Calculator

### What You're Testing
Priority score calculation and topic ranking.

### Steps
```bash
# Start Python interactive shell
python3

# Test priority calculation
>>> from services.priority_calculator import calculate_priority_score, rank_topics
>>> import json
>>> 
>>> # Test individual priority calculation
>>> score = calculate_priority_score(
...     topic="Thermodynamics",
...     accuracy=40.0,
...     weightage=8.0,
...     difficulty=1.0
... )
>>> print(f"Priority Score: {score}")
>>> 
>>> # Load sample analytics
>>> with open('data/sample_schedules/sample_analytics_input.json') as f:
...     analytics = json.load(f)
>>> 
>>> # Load weightages
>>> with open('data/weightages/jee_main_weightages.json') as f:
...     weightages = json.load(f)
>>> 
>>> # Rank all topics
>>> ranked = rank_topics(analytics, weightages)
>>> print(f"Top 5 Priority Topics:")
>>> for i, topic in enumerate(ranked[:5], 1):
...     print(f"{i}. {topic['topic']} - Score: {topic['priority_score']}")
```

### Expected Result
```
Priority Score: 480.0
Top 5 Priority Topics:
1. Thermodynamics - Score: 480.0
2. Organic Chemistry - Score: 450.0
3. Calculus - Score: 375.0
4. Coordinate Geometry - Score: 202.5
5. Inorganic Chemistry - Score: 175.0
```

### Success Criteria
- ✅ Priority scores calculated correctly
- ✅ Topics ranked by priority (highest first)
- ✅ Weak + high-weightage topics at top
- ✅ Strong topics at bottom

### If It Fails
- **Error: "Module not found"**: Run prompts to generate priority_calculator.py
- **Wrong scores**: Check formula: Weightage × (100 - Accuracy) × Difficulty
- **Wrong ranking**: Ensure sorting by priority_score descending

---

## Test 2: Time Calculator

### What You're Testing
Time calculations and schedule feasibility.

### Steps
```bash
python3

>>> from utils.time_calculator import (
...     calculate_available_days,
...     calculate_total_study_hours,
...     validate_time_feasibility
... )
>>> from datetime import date, timedelta
>>> 
>>> # Test available days calculation
>>> start_date = date.today()
>>> exam_date = start_date + timedelta(days=90)
>>> available_days = calculate_available_days(start_date, exam_date)
>>> print(f"Available days: {available_days}")
>>> 
>>> # Test total hours calculation
>>> total_hours = calculate_total_study_hours(available_days, daily_hours=4.0)
>>> print(f"Total study hours: {total_hours}")
>>> 
>>> # Test feasibility
>>> topics = [
...     {"topic": "Topic1", "estimated_hours": 10},
...     {"topic": "Topic2", "estimated_hours": 15},
...     {"topic": "Topic3", "estimated_hours": 20}
... ]
>>> is_feasible, deficit, recommendations = validate_time_feasibility(topics, total_hours)
>>> print(f"Feasible: {is_feasible}")
>>> if not is_feasible:
...     print(f"Deficit: {deficit} hours")
...     print(f"Recommendations: {recommendations}")
```

### Expected Result
```
Available days: 90
Total study hours: 324.0
Feasible: True
```

### Success Criteria
- ✅ Available days calculated correctly
- ✅ Total hours = days × daily_hours × 0.9 (buffer)
- ✅ Feasibility check works
- ✅ Recommendations provided when not feasible

---

## Test 3: Context Builder

### What You're Testing
Context formatting for Gemini prompts.

### Steps
```bash
python3

>>> from utils.schedule_context_builder import build_complete_context
>>> import json
>>> 
>>> # Load sample data
>>> with open('data/sample_schedules/sample_analytics_input.json') as f:
...     analytics = json.load(f)
>>> 
>>> with open('data/weightages/jee_main_weightages.json') as f:
...     weightages = json.load(f)
>>> 
>>> # Build context
>>> context = build_complete_context(
...     student_profile={
...         "student_id": "student_test_001",
...         "exam_type": "JEE_MAIN",
...         "exam_date": "2024-04-15",
...         "daily_hours": 4.0
...     },
...     analytics=analytics,
...     weightages=weightages,
...     available_days=90
... )
>>> 
>>> # Print first 500 characters
>>> print(context[:500])
>>> print(f"\nTotal context length: {len(context)} characters")
```

### Expected Result
```
STUDENT PROFILE:
- Student ID: student_test_001
- Exam: JEE Main 2024
- Exam Date: April 15, 2024
- Days Available: 90 days
- Daily Study Hours: 4 hours

ANALYTICS SUMMARY:
- Overall Score: 520/800 (65%)
- Strong Topics: Mechanics (80%), Algebra (85%), Physical Chemistry (75%)
- Weak Topics: Thermodynamics (40%), Organic Chemistry (45%), Calculus (50%)

PRIORITY TOPICS (sorted by impact):
1. Thermodynamics (Physics) - 40% accuracy, 8% weightage, Priority Score: 480
...

Total context length: 2500 characters
```

### Success Criteria
- ✅ Context includes all sections
- ✅ Data formatted clearly
- ✅ Priority topics sorted correctly
- ✅ Context is readable and structured

---

## Test 4: Gemini Schedule Generation

### What You're Testing
AI-powered schedule generation with Gemini Flash.

### Steps
```bash
python3

>>> from services.gemini_scheduler_service import generate_schedule_with_gemini
>>> from utils.schedule_context_builder import build_complete_context
>>> import json
>>> 
>>> # Load sample data
>>> with open('data/sample_schedules/sample_analytics_input.json') as f:
...     analytics = json.load(f)
>>> 
>>> with open('data/weightages/jee_main_weightages.json') as f:
...     weightages = json.load(f)
>>> 
>>> # Build context
>>> context = build_complete_context(
...     student_profile={
...         "student_id": "student_test_001",
...         "exam_type": "JEE_MAIN",
...         "exam_date": "2024-04-15",
...         "daily_hours": 4.0
...     },
...     analytics=analytics,
...     weightages=weightages,
...     available_days=90
... )
>>> 
>>> # Generate schedule with Gemini
>>> print("Generating schedule with Gemini... (may take 10-20 seconds)")
>>> schedule_data = generate_schedule_with_gemini(context)
>>> 
>>> # Check result
>>> print(f"Schedule generated: {len(schedule_data['days'])} days")
>>> print(f"First day topics: {[t['topic'] for t in schedule_data['days'][0]['topics']]}")
```

### Expected Result
```
Generating schedule with Gemini... (may take 10-20 seconds)
Schedule generated: 90 days
First day topics: ['Thermodynamics - Laws of Thermodynamics', 'Thermodynamics - Heat Transfer']
```

### Success Criteria
- ✅ Gemini API call succeeds
- ✅ Schedule JSON returned
- ✅ 90 days generated
- ✅ High-priority topics in early days
- ✅ Each day has 3-4 hours of topics

### If It Fails
- **Error: "API key not found"**: Check GEMINI_API_KEY in .env
- **Error: "Rate limit"**: Wait 1 minute and retry
- **Error: "Invalid JSON"**: Check parse_gemini_schedule_response function
- **Empty schedule**: Check prompt template and context

---

## Test 5: Complete Schedule Generation API

### What You're Testing
Full schedule generation workflow via API.

### Steps
```bash
# Start backend server
uvicorn main:app --reload

# In another terminal, test API
curl -X POST http://localhost:8000/api/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "student_test_001",
    "analytics_id": "analytics_sample_001",
    "exam_type": "JEE_MAIN",
    "exam_date": "2024-04-15",
    "daily_study_hours": 4.0
  }'
```

### Expected Result
```json
{
  "schedule_id": "sched_abc123",
  "student_id": "student_test_001",
  "analytics_id": "analytics_sample_001",
  "exam_type": "JEE_MAIN",
  "exam_date": "2024-04-15",
  "generated_date": "2024-01-15T10:30:00",
  "total_days": 90,
  "daily_study_hours": 4.0,
  "status": "active",
  "days": [
    {
      "day_number": 1,
      "date": "2024-01-16",
      "subjects": ["Physics"],
      "topics": [
        {
          "topic": "Thermodynamics - Laws",
          "subject": "Physics",
          "priority": "high",
          "estimated_hours": 2.5,
          "subtopics": ["First Law", "Second Law", "Carnot Engine"],
          "resources": ["Video: Thermodynamics Basics", "Practice: 20 questions"],
          "goals": ["Understand laws", "Solve 15/20 correctly"]
        }
      ],
      "total_hours": 4.0,
      "milestones": ["Complete Thermodynamics basics"],
      "completed": false
    }
  ],
  "revision_days": [88, 89, 90],
  "practice_test_days": [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84],
  "priority_topics": [
    {
      "topic": "Thermodynamics",
      "subject": "Physics",
      "priority_score": 480.0,
      "current_accuracy": 40.0,
      "target_accuracy": 80.0,
      "weightage": 8.0,
      "estimated_hours": 12.0
    }
  ]
}
```

### Success Criteria
- ✅ API returns 201 Created
- ✅ Schedule ID generated
- ✅ 90 days in schedule
- ✅ High-priority topics in early days
- ✅ Revision days at end (88, 89, 90)
- ✅ Practice tests every 7 days
- ✅ Each day has realistic hours (3-5)
- ✅ Subjects balanced across days

---

## Test 6: Get Schedule

### What You're Testing
Retrieving generated schedule.

### Steps
```bash
# Use schedule_id from previous test
curl http://localhost:8000/api/schedule/sched_abc123
```

### Expected Result
```json
{
  "schedule_id": "sched_abc123",
  "student_id": "student_test_001",
  ...
}
```

### Success Criteria
- ✅ API returns 200 OK
- ✅ Complete schedule returned
- ✅ All days present

---

## Test 7: Progress Update

### What You're Testing
Updating daily progress.

### Steps
```bash
curl -X POST http://localhost:8000/api/schedule/progress/update \
  -H "Content-Type: application/json" \
  -d '{
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
        "practice_accuracy": 85,
        "notes": "Understood concepts well"
      }
    ],
    "total_time_spent": 4.0,
    "completion_percentage": 100
  }'
```

### Expected Result
```json
{
  "schedule_id": "sched_abc123",
  "day_number": 1,
  "status": "completed",
  "completion_percentage": 100,
  "message": "Progress updated successfully"
}
```

### Success Criteria
- ✅ API returns 200 OK
- ✅ Progress saved to Firestore
- ✅ Day marked as completed

---

## Test 8: Adaptive Rescheduling

### What You're Testing
Regenerating schedule when student falls behind.

### Steps
```bash
# Simulate student missing days 2-4
# Update progress to show only day 1 completed, now on day 5

curl -X POST http://localhost:8000/api/schedule/sched_abc123/regenerate \
  -H "Content-Type: application/json" \
  -d '{
    "current_day": 5,
    "reason": "missed_sessions",
    "notes": "Missed 3 days due to illness"
  }'
```

### Expected Result
```json
{
  "schedule_id": "sched_abc123",
  "message": "Schedule regenerated for remaining days",
  "changes": {
    "days_remaining": 86,
    "topics_redistributed": 15,
    "daily_hours_adjusted": 4.2
  },
  "days": [
    {
      "day_number": 5,
      "date": "2024-01-20",
      "topics": ["Thermodynamics - Heat Transfer", "Organic Chemistry - Basics"],
      ...
    }
  ]
}
```

### Success Criteria
- ✅ API returns 200 OK
- ✅ Remaining days regenerated
- ✅ Missed topics redistributed
- ✅ High-priority topics still prioritized
- ✅ Daily hours adjusted if needed

---

## Test 9: Get Today's Tasks

### What You're Testing
Retrieving tasks for current day.

### Steps
```bash
curl "http://localhost:8000/api/schedule/progress/today?schedule_id=sched_abc123"
```

### Expected Result
```json
{
  "day_number": 5,
  "date": "2024-01-20",
  "topics": [
    {
      "topic": "Thermodynamics - Heat Transfer",
      "subject": "Physics",
      "estimated_hours": 2.0,
      "subtopics": ["Conduction", "Convection", "Radiation"],
      "resources": ["Video: Heat Transfer (20 min)", "Practice: 15 problems"],
      "goals": ["Master heat transfer calculations"]
    }
  ],
  "total_hours": 4.0
}
```

### Success Criteria
- ✅ API returns 200 OK
- ✅ Current day's topics returned
- ✅ Includes subtopics, resources, goals

---

## Test 10: Schedule with Different Exam Types

### What You're Testing
Schedule generation for NEET exam.

### Steps
```bash
curl -X POST http://localhost:8000/api/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "student_test_002",
    "analytics_id": "analytics_sample_002",
    "exam_type": "NEET",
    "exam_date": "2024-05-05",
    "daily_study_hours": 4.0
  }'
```

### Expected Result
```json
{
  "schedule_id": "sched_xyz789",
  "exam_type": "NEET",
  "days": [
    {
      "day_number": 1,
      "subjects": ["Biology"],
      "topics": [
        {
          "topic": "Human Physiology - Digestive System",
          "subject": "Biology",
          ...
        }
      ]
    }
  ]
}
```

### Success Criteria
- ✅ NEET schedule generated
- ✅ Biology topics included (50% weightage)
- ✅ Physics and Chemistry balanced (25% each)
- ✅ NEET-specific weightages used

---

## Integration Test: Complete Workflow

### What You're Testing
End-to-end schedule generation and tracking.

### Steps
1. Generate schedule for student
2. Get schedule details
3. Update progress for day 1
4. Get today's tasks for day 2
5. Update progress for day 2
6. Simulate missed days
7. Trigger adaptive rescheduling
8. Verify new schedule

### Expected Flow
```
Generate Schedule → Store in Firestore → Retrieve Schedule → 
Update Progress Day 1 → Get Day 2 Tasks → Update Progress Day 2 → 
Miss Days 3-5 → Regenerate Schedule → Verify Adjustments
```

### Success Criteria
- ✅ All API calls succeed
- ✅ Data persists in Firestore
- ✅ Progress tracked correctly
- ✅ Rescheduling works
- ✅ Schedule adapts to student behavior

---

## Testing Complete!

You've successfully tested:
- ✅ Priority calculation
- ✅ Time calculations
- ✅ Context building
- ✅ Gemini schedule generation
- ✅ Complete API workflow
- ✅ Progress tracking
- ✅ Adaptive rescheduling
- ✅ Multiple exam types

**Next Steps:**
1. Open **EXPECTED-OUTCOME.md** to verify all success criteria
2. Review **AI-INTEGRATION.md** for detailed scheduling logic
3. Check **TROUBLESHOOTING.md** if you encountered issues

Ready to verify? Open **EXPECTED-OUTCOME.md** next!

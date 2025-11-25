# Testing Guide: Gemini Analytics

## Overview

This guide provides step-by-step instructions to test the analytics system. Each test is standalone and includes expected results.

**Total Time**: ~45 minutes

---

## Test 1: Verify Score Calculator

### What You're Testing
Score calculation with different marking schemes.

### Steps
```bash
# Create test script
cat > test_score_calculator.py << 'EOF'
from services.score_calculator import ScoreCalculator
from models.score_models import MarkingScheme, QuestionAnswer, TestSubmission

# JEE Main marking scheme
marking_scheme = MarkingScheme(
    correct_marks=4,
    incorrect_marks=-1,
    partial_marks=0,
    unattempted_marks=0
)

# Sample answers
answers = [
    QuestionAnswer(
        question_id="q1",
        student_answer="B",
        correct_answer="B",
        question_type="single_correct"
    ),  # Correct: +4
    QuestionAnswer(
        question_id="q2",
        student_answer="A",
        correct_answer="C",
        question_type="single_correct"
    ),  # Incorrect: -1
    QuestionAnswer(
        question_id="q3",
        student_answer=None,
        correct_answer="D",
        question_type="single_correct"
    ),  # Unattempted: 0
]

# Calculate score
calculator = ScoreCalculator()
result = calculator.calculate_score(answers, marking_scheme)

print(f"Total Score: {result.total_score}/{result.max_score}")
print(f"Percentage: {result.percentage}%")
print(f"Correct: {result.correct_count}")
print(f"Incorrect: {result.incorrect_count}")
print(f"Unattempted: {result.unattempted_count}")
EOF

python test_score_calculator.py
```

### Expected Result
```
Total Score: 3/12
Percentage: 25.0%
Correct: 1
Incorrect: 1
Unattempted: 1
```

### Calculation
- Question 1: Correct → +4
- Question 2: Incorrect → -1
- Question 3: Unattempted → 0
- **Total: 4 - 1 + 0 = 3**

### If It Fails
- Check marking scheme values
- Verify answer comparison logic
- Check negative marking calculation

---

## Test 2: Verify Performance Analyzer

### What You're Testing
Performance analysis and topic identification.

### Steps
```bash
cat > test_performance_analyzer.py << 'EOF'
from services.performance_analyzer import PerformanceAnalyzer
from models.score_models import ScoreResult, TopicScore

# Sample topic scores
topic_scores = [
    TopicScore(
        topic="Mechanics",
        subject="Physics",
        score=32,
        max_score=40,
        accuracy=80.0,
        weightage=10
    ),  # Strong
    TopicScore(
        topic="Thermodynamics",
        subject="Physics",
        score=12,
        max_score=40,
        accuracy=30.0,
        weightage=8
    ),  # Weak
    TopicScore(
        topic="Calculus",
        subject="Mathematics",
        score=24,
        max_score=40,
        accuracy=60.0,
        weightage=12
    ),  # Moderate
]

# Analyze
analyzer = PerformanceAnalyzer()
analysis = analyzer.analyze(topic_scores)

print("Strengths:")
for strength in analysis.strengths:
    print(f"  - {strength.topic}: {strength.accuracy}%")

print("\nWeaknesses:")
for weakness in analysis.weaknesses:
    print(f"  - {weakness.topic}: {weakness.accuracy}% (Priority: {weakness.priority})")

print("\nModerate Topics:")
for topic in analysis.moderate_topics:
    print(f"  - {topic.topic}: {topic.accuracy}%")
EOF

python test_performance_analyzer.py
```

### Expected Result
```
Strengths:
  - Mechanics: 80.0%

Weaknesses:
  - Thermodynamics: 30.0% (Priority: HIGH)

Moderate Topics:
  - Calculus: 60.0%
```

### Classification Rules
- **Strong**: Accuracy > 80%
- **Weak**: Accuracy < 40%
- **Moderate**: 40% ≤ Accuracy ≤ 80%

### If It Fails
- Check accuracy thresholds
- Verify priority calculation
- Check topic classification logic

---

## Test 3: Verify Analytics Context Builder

### What You're Testing
Context formatting for Gemini.

### Steps
```bash
cat > test_context_builder.py << 'EOF'
from utils.analytics_context_builder import AnalyticsContextBuilder
from models.score_models import ScoreResult, SubjectScore, TopicScore

# Sample data
score_result = ScoreResult(
    total_score=240,
    max_score=360,
    percentage=66.7,
    accuracy=70.0,
    subject_scores=[
        SubjectScore(
            subject_name="Physics",
            score=80,
            max_score=120,
            percentage=66.7,
            accuracy=70.0
        )
    ],
    topic_scores=[
        TopicScore(
            topic="Mechanics",
            subject="Physics",
            score=32,
            max_score=40,
            accuracy=80.0,
            weightage=10
        )
    ]
)

# Build context
builder = AnalyticsContextBuilder()
context = builder.build_context(score_result, exam_type="JEE_MAIN")

print("Generated Context:")
print(context)
print(f"\nContext length: {len(context)} characters")
EOF

python test_context_builder.py
```

### Expected Result
```
Generated Context:
STUDENT PERFORMANCE DATA:
- Exam: JEE Main Diagnostic Test
- Total Score: 240/360 (66.7%)
- Accuracy: 70.0%

SUBJECT SCORES:
- Physics: 80/120 (66.7%)

TOPIC PERFORMANCE:
1. Mechanics (Physics): 32/40 (80.0%) - Weightage: 10 marks

Context length: 245 characters
```

### Validation
- ✓ Clear section headers
- ✓ Formatted scores with percentages
- ✓ Readable structure
- ✓ Within token limits

### If It Fails
- Check formatting logic
- Verify data extraction
- Check section organization

---

## Test 4: Test Gemini Analytics Service

### What You're Testing
Gemini API integration and analytics generation.

### Steps
```bash
cat > test_gemini_analytics.py << 'EOF'
from services.gemini_analytics_service import GeminiAnalyticsService
import os

# Sample context
context = """
STUDENT PERFORMANCE DATA:
- Exam: JEE Main Diagnostic Test
- Total Score: 240/360 (67%)

SUBJECT SCORES:
- Physics: 80/120 (67%)
- Chemistry: 88/120 (73%)
- Mathematics: 72/120 (60%)

TOPIC PERFORMANCE:
1. Mechanics (Physics): 8/10 correct (80%) - STRONG
2. Thermodynamics (Physics): 4/10 correct (40%) - WEAK
3. Organic Chemistry: 9/10 correct (90%) - STRONG
4. Calculus (Math): 5/10 correct (50%) - NEEDS IMPROVEMENT
"""

# Generate analytics
service = GeminiAnalyticsService()
analytics = service.generate_analytics(context, exam_type="JEE_MAIN")

print("AI-Generated Analytics:")
print(f"\nStrengths: {len(analytics['strengths'])}")
for strength in analytics['strengths']:
    print(f"  - {strength['topic']}: {strength['reason']}")

print(f"\nWeaknesses: {len(analytics['weaknesses'])}")
for weakness in analytics['weaknesses']:
    print(f"  - {weakness['topic']}: {weakness['reason']}")
    print(f"    Priority: {weakness['priority']}, Hours: {weakness['estimated_hours']}")

print(f"\nLearning Patterns: {len(analytics['learning_patterns'])}")
for pattern in analytics['learning_patterns']:
    print(f"  - {pattern}")

print(f"\nOverall Assessment:")
print(f"  {analytics['overall_assessment'][:100]}...")
EOF

python test_gemini_analytics.py
```

### Expected Result
```
AI-Generated Analytics:

Strengths: 2
  - Organic Chemistry: Excellent accuracy (90%) showing strong conceptual understanding
  - Mechanics: High accuracy (80%) indicates solid foundation

Weaknesses: 2
  - Thermodynamics: Low accuracy (40%) indicates conceptual gaps
    Priority: high, Hours: 15
  - Calculus: Moderate accuracy (50%) needs improvement
    Priority: medium, Hours: 10

Learning Patterns: 2
  - Strong in Chemistry, needs improvement in Mathematics
  - Good at Physics mechanics, weak in thermodynamics concepts

Overall Assessment:
  The student shows strong performance in Chemistry and Physics mechanics, but needs focused...
```

### Validation
- ✓ Valid JSON response
- ✓ Has strengths and weaknesses
- ✓ Includes priority levels
- ✓ Provides estimated hours
- ✓ Actionable recommendations

### If It Fails
- **API Error**: Check GEMINI_API_KEY is set
- **Invalid JSON**: Check prompt template
- **Missing fields**: Update prompt to be more explicit
- **Timeout**: Increase timeout in service

---

## Test 5: Test Complete Analytics Pipeline

### What You're Testing
End-to-end analytics generation from test submission.

### Steps
```bash
cat > test_analytics_pipeline.py << 'EOF'
from services.analytics_service import AnalyticsService
from models.analytics_models import AnalyticsRequest, QuestionAnswer

# Sample test submission
request = AnalyticsRequest(
    test_id="test_001",
    student_id="student_001",
    answers=[
        QuestionAnswer(
            question_id="q1",
            student_answer="B",
            time_taken=120
        ),
        QuestionAnswer(
            question_id="q2",
            student_answer="A",
            time_taken=180
        ),
        # Add more answers...
    ]
)

# Generate analytics
service = AnalyticsService()
analytics_id = service.generate_analytics(
    test_id=request.test_id,
    student_id=request.student_id,
    answers=request.answers
)

print(f"Analytics generated: {analytics_id}")

# Retrieve analytics
analytics = service.get_analytics(analytics_id)

print(f"\nAnalytics Report:")
print(f"  Total Score: {analytics.overview.total_score}/{analytics.overview.max_score}")
print(f"  Percentage: {analytics.overview.percentage}%")
print(f"  Percentile: {analytics.overview.percentile}")
print(f"  Strengths: {len(analytics.ai_insights.strengths)}")
print(f"  Weaknesses: {len(analytics.ai_insights.weaknesses)}")
print(f"  Priority Topics: {len(analytics.priority_topics)}")
EOF

python test_analytics_pipeline.py
```

### Expected Result
```
Analytics generated: analytics_abc123

Analytics Report:
  Total Score: 240/360
  Percentage: 66.7%
  Percentile: 65
  Strengths: 2
  Weaknesses: 3
  Priority Topics: 5
```

### Validation
- ✓ Analytics ID returned
- ✓ Report stored in Firestore
- ✓ All sections present
- ✓ AI insights generated
- ✓ Priority topics identified

### If It Fails
- Check Firestore connection
- Verify test data exists
- Check Gemini API calls
- Review error logs

---

## Test 6: Test Analytics API Endpoints

### What You're Testing
FastAPI endpoints for analytics.

### Steps
```bash
# Start server
uvicorn main:app --reload &

# Wait for server to start
sleep 5

# Test 1: Generate analytics
curl -X POST http://localhost:8000/api/analytics/generate \
  -H "Content-Type: application/json" \
  -d '{
    "test_id": "test_001",
    "student_id": "student_001",
    "answers": [
      {
        "question_id": "q1",
        "student_answer": "B",
        "time_taken": 120
      }
    ]
  }'

# Test 2: Get analytics
curl http://localhost:8000/api/analytics/{analytics_id}

# Test 3: Get student analytics
curl http://localhost:8000/api/analytics/student/student_001

# Test 4: Get weak topics
curl http://localhost:8000/api/analytics/{analytics_id}/weak-topics
```

### Expected Results

**Test 1: Generate Analytics**
```json
{
  "analytics_id": "analytics_abc123",
  "status": "success",
  "message": "Analytics generated successfully"
}
```

**Test 2: Get Analytics**
```json
{
  "overview": {
    "total_score": 240,
    "max_score": 360,
    "percentage": 66.7,
    ...
  },
  "subject_analysis": [...],
  "topic_analysis": [...],
  "ai_insights": {...},
  "priority_topics": [...]
}
```

**Test 3: Get Student Analytics**
```json
[
  {
    "analytics_id": "analytics_abc123",
    "test_id": "test_001",
    "generated_at": "2024-01-15T10:30:00Z",
    ...
  }
]
```

**Test 4: Get Weak Topics**
```json
[
  {
    "topic": "Thermodynamics",
    "subject": "Physics",
    "priority": "high",
    "estimated_hours": 15,
    "reason": "Low accuracy indicates conceptual gaps"
  }
]
```

### If It Fails
- **404 Not Found**: Check router is registered in main.py
- **500 Internal Error**: Check logs for error details
- **422 Validation Error**: Check request body format
- **Connection Error**: Ensure server is running

---

## Test 7: Test with Sample Data File

### What You're Testing
Analytics generation using the sample data file from CONFIGURATION.md.

### Steps
```bash
# Load sample data
cat tushar-backend/data/sample_results/sample_test_submission.json | \
curl -X POST http://localhost:8000/api/analytics/generate \
  -H "Content-Type: application/json" \
  -d @-
```

### Expected Result
```json
{
  "analytics_id": "analytics_xyz789",
  "status": "success",
  "message": "Analytics generated successfully"
}
```

### Validation
- ✓ Analytics generated from file
- ✓ All fields processed correctly
- ✓ Stored in Firestore
- ✓ Retrievable via API

---

## Test 8: Verify Analytics Quality

### What You're Testing
Quality and usefulness of generated analytics.

### Steps
```bash
# Get analytics report
curl http://localhost:8000/api/analytics/{analytics_id} > analytics_report.json

# Check quality
cat > check_analytics_quality.py << 'EOF'
import json

with open('analytics_report.json') as f:
    analytics = json.load(f)

# Quality checks
checks = {
    "Has overview": 'overview' in analytics,
    "Has subject analysis": 'subject_analysis' in analytics,
    "Has topic analysis": 'topic_analysis' in analytics,
    "Has AI insights": 'ai_insights' in analytics,
    "Has priority topics": 'priority_topics' in analytics,
    "Strengths identified": len(analytics.get('ai_insights', {}).get('strengths', [])) > 0,
    "Weaknesses identified": len(analytics.get('ai_insights', {}).get('weaknesses', [])) > 0,
    "Has recommendations": 'study_strategy' in analytics.get('ai_insights', {}),
    "Priority topics sorted": len(analytics.get('priority_topics', [])) > 0,
    "Has visualization data": 'visualization_data' in analytics
}

print("Analytics Quality Checks:")
for check, passed in checks.items():
    status = "✓" if passed else "✗"
    print(f"  {status} {check}")

passed_count = sum(checks.values())
total_count = len(checks)
print(f"\nPassed: {passed_count}/{total_count}")
EOF

python check_analytics_quality.py
```

### Expected Result
```
Analytics Quality Checks:
  ✓ Has overview
  ✓ Has subject analysis
  ✓ Has topic analysis
  ✓ Has AI insights
  ✓ Has priority topics
  ✓ Strengths identified
  ✓ Weaknesses identified
  ✓ Has recommendations
  ✓ Priority topics sorted
  ✓ Has visualization data

Passed: 10/10
```

### If Any Fail
- Check analytics generation logic
- Verify Gemini response parsing
- Check report builder
- Review data completeness

---

## Test Summary

After completing all tests, you should have:
- ✅ Score calculator working correctly
- ✅ Performance analyzer identifying topics
- ✅ Context builder formatting data
- ✅ Gemini service generating insights
- ✅ Complete pipeline working end-to-end
- ✅ API endpoints responding correctly
- ✅ Sample data processing successfully
- ✅ High-quality analytics reports

## Next Steps

1. **Check EXPECTED-OUTCOME.md** for final success criteria
2. **Review analytics reports** for quality
3. **Test with different exam types** (JEE/NEET)
4. **Proceed to Day 8** (Schedule Generation)

## Troubleshooting

If tests fail, check:
1. **TROUBLESHOOTING.md** for common issues
2. **Logs** in `logs/analytics.log`
3. **Gemini API** status and quota
4. **Firestore** connection and data
5. **Environment variables** are set correctly

# Testing Guide for Day 6: Diagnostic Test Generation

## Overview

This guide provides comprehensive testing instructions for the diagnostic test generation system. Tests are organized from simple component tests to complete end-to-end test generation.

**Total Time**: 60 minutes

---

## Prerequisites

Before testing, ensure:
- ✅ Backend server is running (`uvicorn main:app --reload`)
- ✅ All configuration steps completed (CONFIGURATION.md)
- ✅ Days 4-5 services working (Vector Search, RAG)
- ✅ Exam pattern files created

---

## Test 1: Pattern Loader

### Purpose
Verify that exam patterns can be loaded correctly.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from utils.pattern_loader import PatternLoader

# Test loading all patterns
loader = PatternLoader()

# Test JEE Main
jee_main = loader.load_pattern('JEE_MAIN')
assert jee_main.total_questions == 200
assert len(jee_main.subjects) == 3
print("✓ JEE Main pattern loaded correctly")

# Test JEE Advanced
jee_adv = loader.load_pattern('JEE_ADVANCED')
assert jee_adv.total_questions == 200
print("✓ JEE Advanced pattern loaded correctly")

# Test NEET
neet = loader.load_pattern('NEET')
assert neet.total_questions == 200
assert len(neet.subjects) == 3
print("✓ NEET pattern loaded correctly")

# Test get all patterns
all_patterns = loader.get_all_patterns()
assert len(all_patterns) == 3
print("✓ All patterns loaded successfully")

print("\n✅ Test 1 PASSED: Pattern Loader working correctly")
EOF
```

### Expected Result
```
✓ JEE Main pattern loaded correctly
✓ JEE Advanced pattern loaded correctly
✓ NEET pattern loaded correctly
✓ All patterns loaded successfully

✅ Test 1 PASSED: Pattern Loader working correctly
```

### If It Fails
- **Error: File not found**: Check pattern files exist in `data/exam_patterns/`
- **Error: Invalid JSON**: Validate JSON syntax with `python -m json.tool < file.json`
- **Error: Missing fields**: Verify pattern structure matches requirements

---

## Test 2: Weightage Calculator

### Purpose
Verify question distribution calculation based on weightages.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from utils.weightage_calculator import WeightageCalculator
from utils.pattern_loader import PatternLoader

# Load pattern
loader = PatternLoader()
pattern = loader.load_pattern('JEE_MAIN')

# Create sample syllabus with weightages
sample_syllabus = [
    {"topic_id": "phy_mechanics", "subject": "Physics", "weightage": 15},
    {"topic_id": "phy_electro", "subject": "Physics", "weightage": 10},
    {"topic_id": "chem_organic", "subject": "Chemistry", "weightage": 12},
    {"topic_id": "chem_inorganic", "subject": "Chemistry", "weightage": 8},
    {"topic_id": "math_calculus", "subject": "Mathematics", "weightage": 20},
    {"topic_id": "math_algebra", "subject": "Mathematics", "weightage": 15},
]

# Calculate distribution
calculator = WeightageCalculator()
distribution = calculator.calculate_distribution(
    syllabus=sample_syllabus,
    total_questions=60,  # Test with smaller number
    pattern=pattern
)

# Verify distribution
total = sum(distribution.values())
assert total == 60, f"Total should be 60, got {total}"
print(f"✓ Distribution totals correctly: {total} questions")

# Verify high-weightage topics get more questions
assert distribution["math_calculus"] > distribution["chem_inorganic"]
print("✓ High-weightage topics prioritized")

print("\n✅ Test 2 PASSED: Weightage Calculator working correctly")
EOF
```

### Expected Result
```
✓ Distribution totals correctly: 60 questions
✓ High-weightage topics prioritized

✅ Test 2 PASSED: Weightage Calculator working correctly
```

### If It Fails
- **Total doesn't match**: Check rounding logic in calculator
- **Distribution unbalanced**: Verify proportional distribution algorithm
- **Error in calculation**: Check weightage values are positive numbers

---

## Test 3: Question Distribution Service

### Purpose
Verify complete distribution plan creation for a test.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from services.question_distribution import QuestionDistribution

# Create distribution service
dist_service = QuestionDistribution()

# Create distribution for JEE Main
# Note: This requires Firestore with syllabus data
# For testing, we'll use a mock student_id
try:
    distribution = dist_service.create_distribution(
        exam_type='JEE_MAIN',
        student_id='test_student_123'
    )
    
    # Verify distribution
    assert distribution.total_questions == 200
    print(f"✓ Distribution created: {distribution.total_questions} questions")
    
    # Verify subject distribution
    subjects = distribution.subject_distribution
    assert 'Physics' in subjects
    assert 'Chemistry' in subjects
    assert 'Mathematics' in subjects
    print("✓ All subjects included")
    
    # Verify topic distribution
    assert len(distribution.topic_distribution) > 0
    print(f"✓ Topics distributed: {len(distribution.topic_distribution)} topics")
    
    print("\n✅ Test 3 PASSED: Question Distribution working correctly")
    
except Exception as e:
    print(f"⚠️  Test 3 SKIPPED: {e}")
    print("This test requires Firestore with syllabus data")
    print("Will be tested in end-to-end test")
EOF
```

### Expected Result
```
✓ Distribution created: 200 questions
✓ All subjects included
✓ Topics distributed: 25 topics

✅ Test 3 PASSED: Question Distribution working correctly
```

### If It Fails
- **Student not found**: Create test student in Firestore or use existing student_id
- **Syllabus not found**: Ensure syllabus data exists in Firestore
- **Distribution error**: Check weightage calculator and pattern loader

---

## Test 4: Test Pattern Service

### Purpose
Verify pattern application to questions.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from services.test_pattern_service import TestPatternService
from utils.pattern_loader import PatternLoader
from models.question_models import Question

# Load pattern
loader = PatternLoader()
pattern = loader.load_pattern('JEE_MAIN')

# Create sample questions
sample_questions = [
    Question(
        question_id="q1",
        question_text="What is Newton's first law?",
        options={"A": "Inertia", "B": "Force", "C": "Motion", "D": "Energy"},
        correct_answer="A",
        explanation="Newton's first law is the law of inertia",
        difficulty="easy",
        topic="Mechanics",
        subject="Physics",
        question_type="single_correct_mcq"
    ),
    Question(
        question_id="q2",
        question_text="Calculate the derivative of x^2",
        options={"A": "x", "B": "2x", "C": "x^2", "D": "2"},
        correct_answer="B",
        explanation="Using power rule: d/dx(x^2) = 2x",
        difficulty="medium",
        topic="Calculus",
        subject="Mathematics",
        question_type="single_correct_mcq"
    )
]

# Apply pattern
pattern_service = TestPatternService()
patterned_test = pattern_service.apply_pattern(sample_questions, pattern)

# Verify pattern application
assert len(patterned_test.sections) > 0
print(f"✓ Test organized into {len(patterned_test.sections)} sections")

# Verify marking scheme applied
for section in patterned_test.sections:
    for question in section.questions:
        assert hasattr(question, 'marks')
        assert hasattr(question, 'negative_marks')
print("✓ Marking scheme applied to all questions")

print("\n✅ Test 4 PASSED: Test Pattern Service working correctly")
EOF
```

### Expected Result
```
✓ Test organized into 3 sections
✓ Marking scheme applied to all questions

✅ Test 4 PASSED: Test Pattern Service working correctly
```

### If It Fails
- **Sections not created**: Check section organization logic
- **Marking scheme missing**: Verify marking scheme application
- **Pattern mismatch**: Check pattern structure

---

## Test 5: Test Assembler

### Purpose
Verify test assembly from questions.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from services.test_assembler import TestAssembler
from services.test_pattern_service import TestPatternService
from utils.pattern_loader import PatternLoader
from models.question_models import Question

# Create sample questions (simplified for testing)
questions = []
for i in range(10):
    questions.append(Question(
        question_id=f"q{i}",
        question_text=f"Sample question {i}",
        options={"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"},
        correct_answer="A",
        explanation="Sample explanation",
        difficulty="medium",
        topic="Sample Topic",
        subject="Physics" if i < 5 else "Chemistry",
        question_type="single_correct_mcq"
    ))

# Load pattern and assemble
loader = PatternLoader()
pattern = loader.load_pattern('JEE_MAIN')
assembler = TestAssembler()

test = assembler.assemble_test(
    questions=questions,
    pattern=pattern,
    student_id="test_student_123"
)

# Verify assembly
assert test.metadata.test_id is not None
print(f"✓ Test assembled with ID: {test.metadata.test_id}")

assert len(test.sections) > 0
print(f"✓ Test has {len(test.sections)} sections")

assert test.total_marks > 0
print(f"✓ Total marks calculated: {test.total_marks}")

print("\n✅ Test 5 PASSED: Test Assembler working correctly")
EOF
```

### Expected Result
```
✓ Test assembled with ID: abc123...
✓ Test has 2 sections
✓ Total marks calculated: 40

✅ Test 5 PASSED: Test Assembler working correctly
```

### If It Fails
- **Test ID not generated**: Check UUID generation
- **Sections empty**: Verify section organization
- **Marks not calculated**: Check marking scheme application

---

## Test 6: Test Validator

### Purpose
Verify test validation logic.

### Steps
```bash
cd tushar-backend
python3 << 'EOF'
from services.test_validator import TestValidator
from services.test_assembler import TestAssembler
from utils.pattern_loader import PatternLoader
from models.question_models import Question

# Create valid test (simplified)
questions = []
for i in range(200):
    questions.append(Question(
        question_id=f"q{i}",
        question_text=f"Question {i}",
        options={"A": "A", "B": "B", "C": "C", "D": "D"},
        correct_answer="A",
        explanation="Explanation",
        difficulty="medium",
        topic="Topic",
        subject="Physics" if i < 60 else ("Chemistry" if i < 120 else "Mathematics"),
        question_type="single_correct_mcq"
    ))

loader = PatternLoader()
pattern = loader.load_pattern('JEE_MAIN')
assembler = TestAssembler()
test = assembler.assemble_test(questions, pattern, "test_student")

# Validate test
validator = TestValidator()
result = validator.validate_test(test, pattern)

# Check validation result
assert result.is_valid == True
print(f"✓ Test validation passed")
print(f"✓ Quality score: {result.quality_score}")
print(f"✓ Errors: {len(result.errors)}")
print(f"✓ Warnings: {len(result.warnings)}")

print("\n✅ Test 6 PASSED: Test Validator working correctly")
EOF
```

### Expected Result
```
✓ Test validation passed
✓ Quality score: 85
✓ Errors: 0
✓ Warnings: 0

✅ Test 6 PASSED: Test Validator working correctly
```

### If It Fails
- **Validation failed**: Check error messages for specific issues
- **Quality score low**: Review question quality criteria
- **Unexpected errors**: Verify test structure matches requirements

---

## Test 7: API Endpoint - Generate Test (Synchronous)

### Purpose
Test complete test generation via API endpoint.

### Steps
```bash
# Start server if not running
# uvicorn main:app --reload

# Generate test for JEE Main
curl -X POST http://localhost:8000/api/diagnostic-test/generate \
  -H "Content-Type: application/json" \
  -d '{
    "exam_type": "JEE_MAIN",
    "student_id": "test_student_123",
    "async_generation": false
  }'
```

### Expected Result
```json
{
  "test_id": "abc123-def456-...",
  "status": "success",
  "questions_generated": 200,
  "total_questions": 200,
  "generation_time": 145.3,
  "errors": [],
  "warnings": []
}
```

### Verification
- ✓ Status is "success"
- ✓ questions_generated equals 200
- ✓ test_id is returned
- ✓ generation_time is reasonable (2-3 minutes)

### If It Fails
- **Status 400**: Check request format
- **Status 500**: Check server logs for errors
- **Timeout**: Use async generation instead
- **Partial success**: Check warnings for failed topics

---

## Test 8: API Endpoint - Generate Test (Asynchronous)

### Purpose
Test async test generation with progress tracking.

### Steps

**Step 1: Start async generation**
```bash
curl -X POST http://localhost:8000/api/diagnostic-test/generate-async \
  -H "Content-Type: application/json" \
  -d '{
    "exam_type": "NEET",
    "student_id": "test_student_123",
    "async_generation": true
  }'
```

**Expected Response**:
```json
{
  "job_id": "job_abc123",
  "status": "queued"
}
```

**Step 2: Check progress**
```bash
# Replace job_abc123 with actual job_id from step 1
curl http://localhost:8000/api/diagnostic-test/generation/status/job_abc123
```

**Expected Response** (while in progress):
```json
{
  "job_id": "job_abc123",
  "status": "in_progress",
  "progress": 45,
  "current_step": "Generating questions for topic: Organic Chemistry",
  "test_id": null,
  "error": null
}
```

**Step 3: Check completion**
```bash
# Keep checking until status is "completed"
curl http://localhost:8000/api/diagnostic-test/generation/status/job_abc123
```

**Expected Response** (when complete):
```json
{
  "job_id": "job_abc123",
  "status": "completed",
  "progress": 100,
  "current_step": "Test generation complete",
  "test_id": "test_xyz789",
  "error": null
}
```

### Verification
- ✓ Job ID returned immediately
- ✓ Progress updates from 0 to 100
- ✓ Status changes: queued → in_progress → completed
- ✓ Test ID returned when complete

---

## Test 9: API Endpoint - Get Test

### Purpose
Retrieve generated test.

### Steps
```bash
# Replace test_xyz789 with actual test_id from previous test
curl http://localhost:8000/api/diagnostic-test/test_xyz789
```

### Expected Result
```json
{
  "test_id": "test_xyz789",
  "metadata": {
    "test_id": "test_xyz789",
    "exam_type": "NEET",
    "student_id": "test_student_123",
    "generation_date": "2024-01-15T10:30:00Z",
    "status": "pending",
    ...
  },
  "instructions": "General test instructions...",
  "sections": [
    {
      "section_name": "Section A - Physics",
      "subject": "Physics",
      "questions": [...],
      "total_marks": 160,
      "duration_minutes": 40
    },
    ...
  ],
  "total_marks": 800,
  "duration_minutes": 200
}
```

### Verification
- ✓ Test structure is complete
- ✓ All 200 questions present
- ✓ Sections organized correctly
- ✓ Marking scheme applied
- ✓ Metadata is accurate

---

## Test 10: API Endpoint - Start Test

### Purpose
Test starting a test (records start time).

### Steps
```bash
curl -X POST http://localhost:8000/api/diagnostic-test/test_xyz789/start \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "test_student_123"
  }'
```

### Expected Result
```json
{
  "success": true,
  "start_time": "2024-01-15T11:00:00Z",
  "duration_minutes": 200,
  "end_time": "2024-01-15T14:20:00Z"
}
```

### Verification
- ✓ Success is true
- ✓ Start time recorded
- ✓ End time calculated correctly
- ✓ Test status updated to "in_progress"

---

## Test 11: API Endpoint - Submit Test

### Purpose
Test submitting answers and calculating scores.

### Steps
```bash
curl -X POST http://localhost:8000/api/diagnostic-test/test_xyz789/submit \
  -H "Content-Type: application/json" \
  -d '{
    "test_id": "test_xyz789",
    "student_id": "test_student_123",
    "answers": {
      "1": "A",
      "2": "B",
      "3": "C",
      ...
    },
    "time_taken": 7200,
    "submission_time": "2024-01-15T13:00:00Z"
  }'
```

### Expected Result
```json
{
  "test_id": "test_xyz789",
  "student_id": "test_student_123",
  "total_score": 520,
  "total_marks": 800,
  "percentage": 65.0,
  "section_scores": {
    "Physics": {
      "score": 120,
      "total_marks": 160,
      "correct": 35,
      "incorrect": 5,
      "unattempted": 0
    },
    ...
  },
  "correct_count": 145,
  "incorrect_count": 30,
  "unattempted_count": 25
}
```

### Verification
- ✓ Scores calculated correctly
- ✓ Negative marking applied
- ✓ Section scores accurate
- ✓ Percentage calculated
- ✓ Test status updated to "completed"

---

## Test 12: End-to-End Test Generation

### Purpose
Complete test generation workflow from start to finish.

### Steps

**1. Generate test**:
```bash
TEST_RESPONSE=$(curl -s -X POST http://localhost:8000/api/diagnostic-test/generate \
  -H "Content-Type: application/json" \
  -d '{
    "exam_type": "JEE_MAIN",
    "student_id": "e2e_test_student"
  }')

TEST_ID=$(echo $TEST_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['test_id'])")
echo "Generated test: $TEST_ID"
```

**2. Retrieve test**:
```bash
curl -s http://localhost:8000/api/diagnostic-test/$TEST_ID | python3 -m json.tool | head -50
```

**3. Start test**:
```bash
curl -s -X POST http://localhost:8000/api/diagnostic-test/$TEST_ID/start \
  -H "Content-Type: application/json" \
  -d '{"student_id": "e2e_test_student"}' | python3 -m json.tool
```

**4. Submit test** (with sample answers):
```bash
# Generate sample answers (all "A" for simplicity)
python3 << EOF
import json
answers = {str(i): "A" for i in range(1, 201)}
print(json.dumps({"test_id": "$TEST_ID", "student_id": "e2e_test_student", "answers": answers, "time_taken": 7200}))
EOF > /tmp/answers.json

curl -s -X POST http://localhost:8000/api/diagnostic-test/$TEST_ID/submit \
  -H "Content-Type: application/json" \
  -d @/tmp/answers.json | python3 -m json.tool
```

**5. Get results**:
```bash
curl -s http://localhost:8000/api/diagnostic-test/$TEST_ID/results | python3 -m json.tool
```

### Expected Workflow
1. ✓ Test generated successfully (200 questions)
2. ✓ Test retrieved with all questions
3. ✓ Test started (status: in_progress)
4. ✓ Test submitted (answers recorded)
5. ✓ Results calculated (scores, percentages)

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Pattern loader
- ✅ Weightage calculator
- ✅ Question distribution
- ✅ Test pattern service
- ✅ Test assembler
- ✅ Test validator
- ✅ Synchronous test generation API
- ✅ Asynchronous test generation API
- ✅ Test retrieval API
- ✅ Test start API
- ✅ Test submission API
- ✅ End-to-end workflow

## Next Steps

1. **Open EXPECTED-OUTCOME.md** - Verify all success criteria
2. **Review generated tests** - Check question quality
3. **Move to Day 7** - Gemini Analytics (analyze test results)

## Troubleshooting

**Test generation fails**:
- Check Days 4-5 services are working (Vector Search, RAG)
- Verify API quotas not exceeded
- Check Firestore permissions
- Review server logs for specific errors

**Questions low quality**:
- Adjust RAG prompts for better questions
- Increase quality threshold in validator
- Review syllabus content in Vector Search

**Generation too slow**:
- Use async generation for better UX
- Implement caching for frequently requested topics
- Optimize RAG pipeline

**Scores incorrect**:
- Verify marking scheme in pattern files
- Check score calculation logic
- Test with known correct/incorrect answers

For more help, see **TROUBLESHOOTING.md**.

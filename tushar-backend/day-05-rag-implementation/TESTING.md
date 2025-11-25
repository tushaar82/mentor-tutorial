# Testing Guide for Day 5: RAG Implementation

## Overview

Test your RAG pipeline independently without requiring the frontend. Each test verifies a specific component of the pipeline.

---

## Test 1: Gemini Client Initialization

### What You're Testing
Gemini client can be initialized and make basic API calls.

### Prerequisites
- Gemini API enabled
- Environment variables set
- Dependencies installed

### Steps
1. Start Python interpreter:
   ```bash
   cd tushar-backend
   python
   ```

2. Run this code:
   ```python
   from utils.gemini_client import GeminiClient
   
   client = GeminiClient()
   response = client.generate_content("Generate a simple math question")
   print(response)
   ```

### Expected Result
```
Question: What is 2 + 2?
A) 3
B) 4
C) 5
D) 6
Answer: B
```
(Actual question will vary, but should be a valid question)

### If It Fails
**Symptom**: ImportError or initialization error
**Possible Causes**:
1. Dependencies not installed → Fix: `pip install -r requirements.txt`
2. Environment variables not set → Fix: Check `.env` file
3. API not enabled → Fix: Run configuration Step 1

**Debug Commands**:
```bash
# Check imports
python -c "from utils.gemini_client import GeminiClient; print('✓ Import successful')"

# Check environment
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print(os.getenv('GOOGLE_CLOUD_PROJECT'))"
```

---

## Test 2: Prompt Templates

### What You're Testing
Prompt templates generate properly formatted prompts.

### Steps
```bash
cd tushar-backend
python
```

```python
from utils.prompt_templates import build_prompt

prompt = build_prompt(
    exam_type="JEE_MAIN",
    topic="Limits and Continuity",
    context="Limits: Definition, properties, evaluation techniques",
    difficulty="medium",
    num_questions=3
)

print("Prompt length:", len(prompt))
print("\nFirst 500 chars:")
print(prompt[:500])
```

### Expected Result
```
Prompt length: 1500-2500 (varies)

First 500 chars:
You are an expert JEE Main question generator.

SYLLABUS CONTENT:
Limits: Definition, properties, evaluation techniques

TASK:
Generate 3 multiple-choice questions on Limits and Continuity...
```

### If It Fails
**Symptom**: Empty prompt or missing sections
**Fix**: Check prompt_templates.py has all required template components

---

## Test 3: Context Builder

### What You're Testing
Context builder formats Vector Search results correctly.

### Steps
```python
from services.context_builder import ContextBuilder

# Mock Vector Search results
mock_results = [
    {
        "text": "Limits and Continuity: A limit describes the value a function approaches as the input approaches some value.",
        "score": 0.95,
        "metadata": {
            "exam": "JEE_MAIN",
            "subject": "Mathematics",
            "chapter": "Calculus",
            "weightage": 8
        }
    },
    {
        "text": "Evaluation of limits using L'Hôpital's rule, algebraic manipulation, and standard limits.",
        "score": 0.88,
        "metadata": {
            "exam": "JEE_MAIN",
            "subject": "Mathematics",
            "chapter": "Calculus",
            "weightage": 8
        }
    }
]

builder = ContextBuilder()
context = builder.build_context(mock_results, max_tokens=1000)

print("Context length:", len(context))
print("\nContext:")
print(context)
```

### Expected Result
```
Context length: 300-800 (varies)

Context:
TOPIC: Limits and Continuity
EXAM: JEE Main | SUBJECT: Mathematics | CHAPTER: Calculus
WEIGHTAGE: 8 marks

CONTENT:
- Limits and Continuity: A limit describes the value a function approaches...
- Evaluation of limits using L'Hôpital's rule, algebraic manipulation...
```

### If It Fails
**Symptom**: Empty context or malformed structure
**Fix**: Check context_builder.py formatting logic

---

## Test 4: Response Parser

### What You're Testing
Parser can extract and validate questions from LLM responses.

### Steps
```python
from utils.response_parser import ResponseParser

# Mock Gemini response (JSON in markdown)
mock_response = '''
```json
[
  {
    "question": "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
    "options": {
      "A": "0",
      "B": "1",
      "C": "2",
      "D": "undefined"
    },
    "correct_answer": "C",
    "explanation": "Factor the numerator: (x-1)(x+1)/(x-1) = x+1. As x→1, limit = 2",
    "difficulty": "medium",
    "topic": "Limits and Continuity"
  }
]
```
'''

parser = ResponseParser()
questions = parser.parse_response(mock_response)

print(f"Parsed {len(questions)} questions")
for q in questions:
    print(f"\nQuestion: {q.question}")
    print(f"Answer: {q.correct_answer}")
    print(f"Valid: {q is not None}")
```

### Expected Result
```
Parsed 1 questions

Question: What is the limit of (x² - 1)/(x - 1) as x approaches 1?
Answer: C
Valid: True
```

### If It Fails
**Symptom**: No questions parsed or validation errors
**Possible Causes**:
1. JSON extraction failed → Check regex in parser
2. Validation too strict → Check validation rules
3. Missing fields → Check question model requirements

---

## Test 5: Question Validator

### What You're Testing
Validator correctly identifies valid and invalid questions.

### Steps
```python
from services.question_validator import QuestionValidator
from models.question_models import Question
from datetime import datetime

# Valid question
valid_q = Question(
    question="What is 2 + 2?",
    options={"A": "3", "B": "4", "C": "5", "D": "6"},
    correct_answer="B",
    explanation="2 + 2 equals 4",
    difficulty="easy",
    topic="Arithmetic",
    exam_type="JEE_MAIN",
    subject="Math",
    metadata={},
    created_at=datetime.now()
)

# Invalid question (duplicate options)
invalid_q = Question(
    question="What is 2 + 2?",
    options={"A": "4", "B": "4", "C": "4", "D": "4"},
    correct_answer="A",
    explanation="2 + 2 equals 4",
    difficulty="easy",
    topic="Arithmetic",
    exam_type="JEE_MAIN",
    subject="Math",
    metadata={},
    created_at=datetime.now()
)

validator = QuestionValidator()

result1 = validator.validate(valid_q, "Basic arithmetic")
print(f"Valid question - Score: {result1.quality_score}, Valid: {result1.is_valid}")

result2 = validator.validate(invalid_q, "Basic arithmetic")
print(f"Invalid question - Score: {result2.quality_score}, Valid: {result2.is_valid}")
print(f"Issues: {result2.issues}")
```

### Expected Result
```
Valid question - Score: 85-100, Valid: True
Invalid question - Score: 0-50, Valid: False
Issues: ['Options are not distinct', ...]
```

### If It Fails
**Symptom**: Validator accepts invalid questions
**Fix**: Check validation rules in question_validator.py

---

## Test 6: End-to-End RAG Pipeline

### What You're Testing
Complete RAG pipeline from topic to generated questions.

### Prerequisites
- Backend server running: `uvicorn main:app --reload`
- Vector Search operational (Day 4)
- All previous tests passing

### Steps
```bash
# Test RAG endpoint
curl -X POST http://localhost:8000/api/rag/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Limits and Continuity",
    "exam_type": "JEE_MAIN",
    "difficulty": "medium",
    "num_questions": 3
  }'
```

### Expected Result
```json
{
  "questions": [
    {
      "question": "What is the limit of sin(x)/x as x approaches 0?",
      "options": {
        "A": "0",
        "B": "1",
        "C": "∞",
        "D": "undefined"
      },
      "correct_answer": "B",
      "explanation": "This is a standard limit. Using L'Hôpital's rule or series expansion, lim(x→0) sin(x)/x = 1",
      "difficulty": "medium",
      "topic": "Limits and Continuity",
      "exam_type": "JEE_MAIN",
      "subject": "Mathematics"
    }
  ],
  "metadata": {
    "topic": "Limits and Continuity",
    "exam_type": "JEE_MAIN",
    "generation_method": "RAG"
  },
  "generation_time": 3.5,
  "quality_stats": {
    "avg_score": 87,
    "valid_count": 3,
    "invalid_count": 0
  },
  "cache_hit": false
}
```

### If It Fails

**Error: "Vector Search failed"**
- **Cause**: Vector Search not operational
- **Fix**: Test Vector Search endpoint separately (Day 4)

**Error: "Gemini API error"**
- **Cause**: API quota exceeded or authentication issue
- **Fix**: Check API quotas in Google Cloud Console

**Error: "No valid questions generated"**
- **Cause**: Validation too strict or LLM output malformed
- **Fix**: Check validation logs, adjust validation rules

**Debug Commands**:
```bash
# Check backend logs
tail -f logs/app.log

# Test Vector Search separately
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Limits", "top_k": 3}'

# Test context building
curl -X POST http://localhost:8000/api/rag/context/build \
  -H "Content-Type: application/json" \
  -d '{"topic": "Limits", "exam_type": "JEE_MAIN"}'
```

---

## Test 7: Batch Generation

### What You're Testing
RAG can generate questions for multiple topics efficiently.

### Steps
```bash
curl -X POST http://localhost:8000/api/rag/generate-batch \
  -H "Content-Type: application/json" \
  -d '{
    "topics": ["Limits", "Differentiation", "Integration"],
    "exam_type": "JEE_MAIN",
    "difficulty": "medium",
    "questions_per_topic": 2
  }'
```

### Expected Result
```json
{
  "Limits": {
    "questions": [...],
    "generation_time": 3.2
  },
  "Differentiation": {
    "questions": [...],
    "generation_time": 3.5
  },
  "Integration": {
    "questions": [...],
    "generation_time": 3.8
  }
}
```

### If It Fails
**Symptom**: Some topics succeed, others fail
**Cause**: Normal - some topics may not have enough syllabus content
**Fix**: Check which topics failed and verify Vector Search has content for them

---

## Test 8: Question Retrieval

### What You're Testing
Generated questions can be retrieved from Firestore.

### Steps
```bash
# Get questions for a topic
curl http://localhost:8000/api/questions/by-topic/Limits?exam_type=JEE_MAIN&limit=5
```

### Expected Result
```json
{
  "questions": [
    {
      "id": "abc123",
      "question": "...",
      "topic": "Limits",
      ...
    }
  ],
  "total_count": 5,
  "avg_quality_score": 85
}
```

### If It Fails
**Symptom**: Empty results
**Cause**: No questions generated yet or Firestore query issue
**Fix**: Generate questions first (Test 6), then retry retrieval

---

## Test 9: Pipeline Health Check

### What You're Testing
All RAG components are operational.

### Steps
```bash
curl http://localhost:8000/api/rag/pipeline/status
```

### Expected Result
```json
{
  "all_systems_ok": true,
  "components": {
    "gemini": "operational",
    "vector_search": "operational",
    "firestore": "operational"
  },
  "quotas": {
    "gemini_remaining": 1000,
    "reset_time": "2024-01-01T00:00:00Z"
  },
  "last_check": "2024-01-01T12:00:00Z"
}
```

### If It Fails
**Symptom**: Some components show "error"
**Fix**: Check the specific component that's failing and refer to its troubleshooting guide

---

## Test 10: Generation Metrics

### What You're Testing
Metrics tracking is working correctly.

### Steps
```bash
curl http://localhost:8000/api/rag/metrics
```

### Expected Result
```json
{
  "total_generated": 15,
  "success_rate": 0.93,
  "avg_quality_score": 85.5,
  "avg_generation_time": 3.4,
  "cache_hit_rate": 0.2
}
```

---

## Automated Test Script

Run all tests at once:

Create `tushar-backend/test_rag.py`:

```python
import requests
import json

BASE_URL = "http://localhost:8000"

def test_rag_generation():
    print("Testing RAG generation...")
    response = requests.post(
        f"{BASE_URL}/api/rag/generate-questions",
        json={
            "topic": "Limits",
            "exam_type": "JEE_MAIN",
            "difficulty": "medium",
            "num_questions": 2
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["questions"]) > 0
    print("✓ RAG generation works")

def test_health_check():
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/api/rag/pipeline/status")
    assert response.status_code == 200
    data = response.json()
    assert data["all_systems_ok"] == True
    print("✓ Health check works")

def test_metrics():
    print("Testing metrics...")
    response = requests.get(f"{BASE_URL}/api/rag/metrics")
    assert response.status_code == 200
    print("✓ Metrics work")

if __name__ == "__main__":
    test_rag_generation()
    test_health_check()
    test_metrics()
    print("\n✓ All tests passed!")
```

Run:
```bash
cd tushar-backend
python test_rag.py
```

---

## Performance Benchmarks

Expected performance for RAG pipeline:

| Metric | Target | Acceptable |
|--------|--------|------------|
| Generation time (5 questions) | < 5s | < 10s |
| Quality score | > 80 | > 70 |
| Success rate | > 90% | > 80% |
| Cache hit rate | > 30% | > 20% |

---

## Test Data

Use these topics for testing:

**JEE Main Mathematics:**
- Limits and Continuity
- Differentiation
- Integration
- Matrices and Determinants
- Probability

**JEE Main Physics:**
- Kinematics
- Newton's Laws
- Work and Energy
- Electrostatics
- Optics

**NEET Biology:**
- Cell Structure
- Genetics
- Ecology
- Human Physiology
- Plant Physiology

---

## Success Criteria

All tests should pass with:
- ✓ Gemini client initializes
- ✓ Prompts generate correctly
- ✓ Context builds from Vector Search results
- ✓ Parser extracts questions from LLM output
- ✓ Validator identifies quality issues
- ✓ End-to-end RAG generates valid questions
- ✓ Batch generation works for multiple topics
- ✓ Questions stored and retrieved from Firestore
- ✓ Health check shows all systems operational
- ✓ Metrics track generation statistics

---

## Next Steps

All tests passing? Move to **EXPECTED-OUTCOME.md** to verify complete success criteria!

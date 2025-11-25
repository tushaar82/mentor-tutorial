# Troubleshooting Guide for Day 6: Diagnostic Test Generation

## Overview

This guide helps you diagnose and fix common issues with diagnostic test generation. Issues are organized by category with symptoms, causes, and solutions.

---

## Test Generation Issues

### Issue 1: Test Generation Fails Completely

**Symptoms**:
- API returns 500 error
- Generation status shows "failed"
- No test_id returned

**Possible Causes**:
1. RAG service not working (Day 5 dependency)
2. Vector Search not deployed (Day 4 dependency)
3. Firestore permissions issue
4. API quota exceeded

**Solutions**:

**Check Day 4-5 services**:
```bash
# Test Vector Search
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -d '{"query": "mechanics", "top_k": 5}'

# Test RAG
curl -X POST http://localhost:8000/api/rag/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"topic": "mechanics", "exam_type": "JEE_MAIN", "count": 5}'
```

**Check Firestore permissions**:
```bash
# Verify service account has Firestore access
gcloud projects get-iam-policy $(gcloud config get-value project) \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:*"
```

**Check API quotas**:
```bash
# Check Vertex AI quota
gcloud alpha services quota list \
  --service=aiplatform.googleapis.com \
  --consumer=projects/$(gcloud config get-value project)

# Check Gemini quota
gcloud alpha services quota list \
  --service=generativelanguage.googleapis.com \
  --consumer=projects/$(gcloud config get-value project)
```

**Check server logs**:
```bash
# View recent errors
tail -f logs/app.log | grep ERROR
```

---

### Issue 2: Generation Produces < 200 Questions

**Symptoms**:
- Test generated but has fewer than 200 questions
- Status shows "partial_success"
- Warnings about failed topics

**Possible Causes**:
1. Some topics failed to generate questions
2. RAG service returned invalid questions
3. Question validation too strict
4. Insufficient syllabus content for some topics

**Solutions**:

**Check generation result**:
```python
# Review which topics failed
result = diagnostic_test_service.generate_test('JEE_MAIN', 'student_id')
print(f"Generated: {result.questions_generated}/{result.total_questions}")
print(f"Warnings: {result.warnings}")
```

**Lower validation threshold**:
```python
# In services/question_validator.py
# Change quality threshold from 70 to 60
MIN_QUALITY_SCORE = 60  # Was 70
```

**Check syllabus data**:
```bash
# Verify syllabus exists in Firestore
# Open Firebase Console → Firestore → syllabus collection
# Ensure all topics have content
```

**Retry failed topics**:
```python
# In services/diagnostic_test_service.py
# Increase retry count
MAX_RETRIES = 3  # Was 1
```

---

### Issue 3: Generation Takes Too Long (> 5 minutes)

**Symptoms**:
- Generation doesn't complete within reasonable time
- Progress stuck at certain percentage
- Timeout errors

**Possible Causes**:
1. Rate limiting too aggressive
2. Network latency to Google APIs
3. Too many API retries
4. Inefficient question generation

**Solutions**:

**Check rate limiting**:
```python
# In services/gemini_service.py
# Increase rate limit
MAX_REQUESTS_PER_MINUTE = 60  # Was 30
```

**Optimize batch generation**:
```python
# In services/diagnostic_test_service.py
# Generate questions in parallel for multiple topics
import asyncio

async def generate_questions_parallel(topics):
    tasks = [generate_for_topic(topic) for topic in topics]
    results = await asyncio.gather(*tasks)
    return results
```

**Use caching**:
```python
# In services/rag_service.py
# Enable aggressive caching
CACHE_TTL_DAYS = 30  # Was 7
```

**Check network**:
```bash
# Test latency to Google APIs
ping -c 5 aiplatform.googleapis.com
```

---

### Issue 4: Pattern Files Not Found

**Symptoms**:
- Error: "Pattern file not found"
- PatternLoader fails to load
- KeyError when accessing pattern

**Possible Causes**:
1. Pattern files not created
2. Wrong file path
3. Invalid JSON syntax
4. Missing required fields

**Solutions**:

**Verify files exist**:
```bash
ls -la tushar-backend/data/exam_patterns/
# Should show: jee_main_pattern.json, jee_advanced_pattern.json, neet_pattern.json
```

**Validate JSON**:
```bash
# Check each file
python3 -m json.tool < data/exam_patterns/jee_main_pattern.json
python3 -m json.tool < data/exam_patterns/jee_advanced_pattern.json
python3 -m json.tool < data/exam_patterns/neet_pattern.json
```

**Check file paths**:
```python
# In utils/pattern_loader.py
import os
PATTERN_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'exam_patterns')
print(f"Looking for patterns in: {os.path.abspath(PATTERN_DIR)}")
```

**Recreate pattern files**:
```bash
# Follow CONFIGURATION.md Step 1 to recreate files
```

---

## Question Quality Issues

### Issue 5: Questions Are Low Quality

**Symptoms**:
- Questions don't make sense
- Options are not plausible
- Explanations are poor
- Quality scores < 70

**Possible Causes**:
1. RAG prompts not specific enough
2. Retrieved syllabus content insufficient
3. Gemini temperature too high
4. Validation not catching issues

**Solutions**:

**Improve RAG prompts**:
```python
# In utils/prompt_templates.py
# Make prompts more specific
def get_jee_main_template():
    return """
    You are an expert JEE Main question creator.
    
    STRICT REQUIREMENTS:
    1. Question must test conceptual understanding
    2. All 4 options must be plausible
    3. Only ONE option is correct
    4. Explanation must be detailed (min 50 words)
    5. Use proper LaTeX for formulas
    6. Difficulty must match the topic complexity
    
    SYLLABUS CONTEXT:
    {context}
    
    Generate {num_questions} questions following JEE Main pattern.
    """
```

**Adjust Gemini temperature**:
```python
# In utils/gemini_client.py
# Lower temperature for more consistent output
generation_config = {
    "temperature": 0.5,  # Was 0.7
    "top_p": 0.9,
    "top_k": 40
}
```

**Enhance validation**:
```python
# In services/question_validator.py
# Add more validation rules
def _validate_quality(self, question):
    issues = []
    
    # Check explanation length
    if len(question.explanation) < 50:
        issues.append("Explanation too short")
    
    # Check options are distinct
    options = list(question.options.values())
    if len(set(options)) != 4:
        issues.append("Options not distinct")
    
    # Check for placeholder text
    if any(placeholder in question.question_text.lower() 
           for placeholder in ['[insert', 'todo', 'xxx']):
        issues.append("Contains placeholder text")
    
    return issues
```

---

### Issue 6: Duplicate Questions Generated

**Symptoms**:
- Same question appears multiple times
- Validation fails with "duplicate questions" error
- Test has < 200 unique questions

**Possible Causes**:
1. Caching returning same questions
2. Insufficient topic diversity
3. Duplicate detection not working
4. Same prompt used multiple times

**Solutions**:

**Improve duplicate detection**:
```python
# In services/test_validator.py
def _check_duplicates(self, questions):
    seen = set()
    duplicates = []
    
    for q in questions:
        # Use question text hash for comparison
        q_hash = hash(q.question_text.lower().strip())
        if q_hash in seen:
            duplicates.append(q.question_id)
        seen.add(q_hash)
    
    return duplicates
```

**Add variation to prompts**:
```python
# In services/rag_service.py
# Add random seed to prompts
import random

def generate_for_topic(topic, count):
    seed = random.randint(1000, 9999)
    prompt = f"[Seed: {seed}] Generate {count} questions for {topic}..."
    return gemini_service.generate(prompt)
```

**Clear cache**:
```python
# In services/gemini_service.py
# Clear cache before generation
cache.clear()
```

---

## Scoring Issues

### Issue 7: Scores Calculated Incorrectly

**Symptoms**:
- Total score doesn't match manual calculation
- Negative marking not applied
- Section scores don't add up

**Possible Causes**:
1. Marking scheme not applied correctly
2. Answer comparison logic wrong
3. Negative marks not negative
4. Unattempted counted as incorrect

**Solutions**:

**Verify marking scheme**:
```python
# In services/test_pattern_service.py
# Check marking scheme application
def apply_marking_scheme(question, pattern):
    scheme = pattern.marking_scheme[question.question_type]
    question.marks = scheme['correct_marks']
    question.negative_marks = scheme['incorrect_marks']  # Should be negative
    return question
```

**Debug score calculation**:
```python
# In routers/test_management_router.py
# Add detailed logging
for question in test.questions:
    student_answer = submission.answers.get(question.number)
    correct_answer = question.correct_answer
    
    if student_answer is None:
        score_delta = 0
        logger.info(f"Q{question.number}: Unattempted → +0")
    elif student_answer == correct_answer:
        score_delta = question.marks
        logger.info(f"Q{question.number}: Correct ({student_answer}) → +{score_delta}")
    else:
        score_delta = question.negative_marks
        logger.info(f"Q{question.number}: Incorrect ({student_answer} vs {correct_answer}) → {score_delta}")
    
    total_score += score_delta
```

**Test with known answers**:
```python
# Create test submission with known correct answers
test_answers = {i: test.questions[i-1].correct_answer for i in range(1, 201)}
result = submit_test(test_id, test_answers)
# Should get 100% score
assert result.percentage == 100.0
```

---

## API Issues

### Issue 8: API Endpoints Not Found (404)

**Symptoms**:
- curl returns 404 Not Found
- Endpoints not visible in /docs
- ImportError in server logs

**Possible Causes**:
1. Routers not registered in main.py
2. Import errors in router files
3. Server not restarted after changes
4. Wrong URL path

**Solutions**:

**Check router registration**:
```python
# In main.py
from routers.diagnostic_test_router import router as diagnostic_test_router
from routers.test_management_router import router as test_management_router

app.include_router(diagnostic_test_router, prefix="/api", tags=["Diagnostic Tests"])
app.include_router(test_management_router, prefix="/api", tags=["Test Management"])
```

**Check imports**:
```bash
# Test imports
cd tushar-backend
python3 -c "from routers.diagnostic_test_router import router; print('✓ Import successful')"
```

**Restart server**:
```bash
# Kill existing server
pkill -f "uvicorn main:app"

# Start fresh
uvicorn main:app --reload
```

**Verify endpoints**:
```bash
# Check OpenAPI docs
curl http://localhost:8000/openapi.json | python3 -m json.tool | grep "diagnostic-test"
```

---

### Issue 9: Authentication Fails

**Symptoms**:
- 401 Unauthorized error
- "Invalid token" message
- Student ID mismatch

**Possible Causes**:
1. Firebase Auth token not provided
2. Token expired
3. Token verification failing
4. Student ID doesn't match token

**Solutions**:

**Check token in request**:
```bash
# Include Authorization header
curl -X POST http://localhost:8000/api/diagnostic-test/generate \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"exam_type": "JEE_MAIN", "student_id": "student123"}'
```

**Verify token**:
```python
# In routers/diagnostic_test_router.py
from firebase_admin import auth

def verify_token(token: str):
    try:
        decoded = auth.verify_id_token(token)
        return decoded['uid']
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")
```

**For testing, bypass auth**:
```python
# ONLY FOR DEVELOPMENT
# In routers/diagnostic_test_router.py
def get_current_user(authorization: str = Header(None)):
    if os.getenv('ENVIRONMENT') == 'development':
        return 'test_student_123'  # Bypass auth
    # Normal auth flow...
```

---

## Performance Issues

### Issue 10: Firestore Writes Too Slow

**Symptoms**:
- Test storage takes > 5 seconds
- Timeout errors during storage
- "Deadline exceeded" errors

**Possible Causes**:
1. Large test document (200 questions)
2. Network latency
3. Firestore in wrong region
4. Too many writes at once

**Solutions**:

**Batch writes**:
```python
# In services/diagnostic_test_service.py
from google.cloud.firestore import WriteBatch

def store_test_batch(test):
    db = firestore.client()
    batch = db.batch()
    
    # Store test metadata
    test_ref = db.collection('diagnostic_tests').document(test.test_id)
    batch.set(test_ref, test.metadata.dict())
    
    # Store questions in subcollection
    for question in test.questions:
        q_ref = test_ref.collection('questions').document(question.question_id)
        batch.set(q_ref, question.dict())
    
    batch.commit()
```

**Use compression**:
```python
# Compress large fields
import gzip
import base64

def compress_questions(questions):
    json_str = json.dumps([q.dict() for q in questions])
    compressed = gzip.compress(json_str.encode())
    return base64.b64encode(compressed).decode()
```

**Check Firestore location**:
```bash
# Verify Firestore is in same region as Cloud Run
gcloud firestore databases describe --database="(default)"
```

---

## Debugging Tips

### Enable Debug Logging

```python
# In main.py
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Test Individual Components

```python
# Test pattern loader
from utils.pattern_loader import PatternLoader
loader = PatternLoader()
pattern = loader.load_pattern('JEE_MAIN')
print(pattern)

# Test distribution
from services.question_distribution import QuestionDistribution
dist = QuestionDistribution()
plan = dist.create_distribution('JEE_MAIN', 'test_student')
print(plan)

# Test RAG
from services.rag_service import RAGService
rag = RAGService()
questions = rag.generate_for_topic('mechanics', 'JEE_MAIN', 'medium', 5)
print(questions)
```

### Monitor API Calls

```python
# Add API call tracking
class APICallTracker:
    def __init__(self):
        self.calls = []
    
    def track(self, service, method, duration):
        self.calls.append({
            'service': service,
            'method': method,
            'duration': duration,
            'timestamp': datetime.now()
        })
    
    def report(self):
        print(f"Total API calls: {len(self.calls)}")
        print(f"Total time: {sum(c['duration'] for c in self.calls):.2f}s")
        for service in set(c['service'] for c in self.calls):
            service_calls = [c for c in self.calls if c['service'] == service]
            print(f"{service}: {len(service_calls)} calls")
```

---

## Getting Help

If issues persist:

1. **Check server logs**: `tail -f logs/app.log`
2. **Review Firebase Console**: Check Firestore data and errors
3. **Check Google Cloud Console**: Review API quotas and errors
4. **Test with curl**: Isolate frontend vs backend issues
5. **Review Day 4-5**: Ensure dependencies are working
6. **Check GitHub Issues**: Search for similar problems
7. **Ask for help**: Provide error logs and steps to reproduce

---

## Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Pattern not found" | Pattern file missing | Create pattern files (CONFIGURATION.md) |
| "Quota exceeded" | API limit reached | Wait or request quota increase |
| "Invalid exam_type" | Wrong exam type value | Use JEE_MAIN, JEE_ADVANCED, or NEET |
| "Test not found" | Invalid test_id | Check test_id is correct |
| "Unauthorized" | Auth token invalid | Provide valid Firebase token |
| "Generation failed" | RAG pipeline error | Check Days 4-5 services |
| "Validation failed" | Test doesn't meet criteria | Review validation errors |
| "Firestore permission denied" | Service account lacks access | Grant Firestore permissions |

---

This troubleshooting guide should help you resolve most issues. For additional help, review the logs and error messages carefully, and test components individually to isolate the problem.

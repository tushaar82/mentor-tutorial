# Troubleshooting Guide: Gemini Analytics

## Overview

This guide helps you diagnose and fix common issues with the analytics system.

---

## Issue 1: Gemini API Key Not Working

### Symptoms
- Error: "API key not valid"
- Error: "Authentication failed"
- 401 Unauthorized response

### Possible Causes
1. API key not set in environment
2. API key is incorrect
3. API key doesn't have permissions

### Solutions

**Check if API key is set**:
```bash
echo $GEMINI_API_KEY
# Should show: AIzaSy...
```

**If not set**:
```bash
# Get API key from Google AI Studio
# Visit: https://makersuite.google.com/app/apikey

# Add to .env
echo "GEMINI_API_KEY=your-actual-key" >> .env

# Reload environment
source .env
```

**Test API key**:
```bash
python -c "
import google.generativeai as genai
import os
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Hello')
print(response.text)
"
```

**If still fails**:
- Verify API key is copied correctly (no extra spaces)
- Check API key hasn't expired
- Ensure billing is enabled in Google Cloud

---

## Issue 2: Gemini Returns Invalid JSON

### Symptoms
- Error: "Could not parse JSON from response"
- Error: "JSONDecodeError"
- Analytics generation fails at parsing step

### Possible Causes
1. Gemini adds extra text around JSON
2. JSON wrapped in markdown code blocks
3. Invalid JSON syntax from Gemini
4. response_mime_type not set

### Solutions

**Ensure JSON mode is enabled**:
```python
# In gemini_analytics_service.py
model = genai.GenerativeModel(
    'gemini-1.5-flash',
    generation_config={
        "response_mime_type": "application/json"  # ← Must have this
    }
)
```

**Improve prompt**:
```python
prompt += """
CRITICAL: Return ONLY valid JSON. No extra text before or after.
Do not wrap in markdown code blocks.
"""
```

**Use robust parser**:
```python
def parse_response(text):
    # Try multiple strategies
    strategies = [
        lambda: json.loads(text),  # Direct parse
        lambda: json.loads(re.search(r'```json\n(.*?)\n```', text, re.DOTALL).group(1)),  # From markdown
        lambda: json.loads(re.search(r'\{.*\}', text, re.DOTALL).group(0))  # Extract JSON
    ]
    
    for strategy in strategies:
        try:
            return strategy()
        except:
            continue
    
    # Log the problematic response
    logger.error(f"Could not parse response: {text[:200]}...")
    raise ValueError("Invalid JSON response")
```

**Check logs**:
```bash
# See what Gemini actually returned
tail -f logs/analytics.log | grep "Gemini response"
```

---

## Issue 3: Generic or Low-Quality Insights

### Symptoms
- Insights like "needs improvement" without specifics
- No actionable recommendations
- Unrealistic study hour estimates
- Missing priority levels

### Possible Causes
1. Prompt not explicit enough
2. No examples in prompt
3. Temperature too low (too conservative)
4. Context missing important data

### Solutions

**Make prompt more explicit**:
```python
prompt += """
BAD INSIGHT: "Student needs to improve in Thermodynamics"
GOOD INSIGHT: "Student struggles with heat transfer concepts (30% accuracy). 
Specifically weak in conduction and convection problems. 
Recommendation: 1) Review fundamental definitions of heat vs temperature, 
2) Solve 30 practice problems on heat transfer, 3) Watch Khan Academy videos 
on thermodynamics laws. Estimated: 15 hours over 2 weeks."

Provide GOOD insights, not BAD ones. Be specific and actionable.
"""
```

**Add few-shot examples**:
```python
prompt += """
EXAMPLE OF GOOD ANALYTICS:
{
  "weaknesses": [
    {
      "topic": "Calculus - Integration",
      "reason": "Low accuracy (45%) due to confusion with integration by parts and substitution methods",
      "priority": "high",
      "estimated_hours": 12,
      "recommendation": "1) Review integration techniques (by parts, substitution, partial fractions), 2) Solve 40 problems starting with easy, 3) Focus on recognizing which technique to use"
    }
  ]
}

Now analyze the student's performance with this level of detail:
"""
```

**Increase temperature**:
```python
generation_config={
    "temperature": 0.8,  # More creative (was 0.7)
    "response_mime_type": "application/json"
}
```

**Verify context quality**:
```bash
# Check what context is being sent to Gemini
python -c "
from utils.analytics_context_builder import AnalyticsContextBuilder
# ... build context ...
print(context)
"
```

---

## Issue 4: Gemini API Timeout

### Symptoms
- Error: "Request timeout"
- Error: "Deadline exceeded"
- Analytics generation takes > 30 seconds

### Possible Causes
1. Context too long
2. Network issues
3. Gemini API overloaded
4. No timeout set

### Solutions

**Set appropriate timeout**:
```python
import requests
from google.api_core import retry

# Set timeout
@retry.Retry(timeout=30.0)
def generate_analytics(prompt):
    response = model.generate_content(prompt)
    return response.text
```

**Reduce context size**:
```python
def build_context(score_result, max_tokens=2000):
    # Limit context to most important information
    context = format_overview(score_result)
    context += format_top_subjects(score_result, top_n=3)
    context += format_top_topics(score_result, top_n=10)  # Not all 50 topics
    
    # Truncate if needed
    if count_tokens(context) > max_tokens:
        context = truncate_to_tokens(context, max_tokens)
    
    return context
```

**Implement retry logic**:
```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def generate_with_retry(prompt):
    try:
        return gemini_service.generate(prompt)
    except TimeoutError:
        logger.warning("Gemini timeout, retrying...")
        raise
```

---

## Issue 5: Score Calculation Incorrect

### Symptoms
- Total score doesn't match expected
- Negative marking not applied
- Subject scores don't add up

### Possible Causes
1. Marking scheme incorrect
2. Answer comparison logic wrong
3. Unattempted questions counted as incorrect

### Solutions

**Verify marking scheme**:
```python
# JEE Main
marking_scheme = MarkingScheme(
    correct_marks=4,
    incorrect_marks=-1,  # Negative!
    partial_marks=0,
    unattempted_marks=0
)

# NEET
marking_scheme = MarkingScheme(
    correct_marks=4,
    incorrect_marks=-1,  # Negative!
    partial_marks=0,
    unattempted_marks=0
)
```

**Check answer comparison**:
```python
def calculate_question_score(student_answer, correct_answer, marking_scheme):
    # Handle unattempted
    if student_answer is None or student_answer == "":
        return 0
    
    # Handle correct
    if student_answer == correct_answer:
        return marking_scheme.correct_marks
    
    # Handle incorrect (negative marking)
    return marking_scheme.incorrect_marks
```

**Test with known data**:
```python
# Test case: 1 correct, 1 incorrect, 1 unattempted
answers = [
    {"student_answer": "B", "correct_answer": "B"},  # +4
    {"student_answer": "A", "correct_answer": "C"},  # -1
    {"student_answer": None, "correct_answer": "D"}  # 0
]
# Expected: 4 - 1 + 0 = 3

score = calculate_score(answers, marking_scheme)
assert score == 3, f"Expected 3, got {score}"
```

---

## Issue 6: Analytics Not Stored in Firestore

### Symptoms
- Analytics generated but can't retrieve
- Error: "Analytics not found"
- GET /api/analytics/{id} returns 404

### Possible Causes
1. Firestore write failed
2. Analytics ID not returned
3. Collection name incorrect
4. Permissions issue

### Solutions

**Check Firestore connection**:
```python
# Test Firestore write
from firebase_admin import firestore

db = firestore.client()
test_doc = db.collection('analytics').add({
    'test': 'data',
    'timestamp': firestore.SERVER_TIMESTAMP
})
print(f"Test document created: {test_doc[1].id}")
```

**Verify collection name**:
```python
# Should be 'analytics', not 'analytic' or 'analytics_reports'
ANALYTICS_COLLECTION = 'analytics'

db.collection(ANALYTICS_COLLECTION).add(analytics_report)
```

**Check write operation**:
```python
def store_analytics(analytics_report):
    try:
        doc_ref = db.collection('analytics').add(analytics_report)
        analytics_id = doc_ref[1].id
        logger.info(f"Analytics stored: {analytics_id}")
        return analytics_id
    except Exception as e:
        logger.error(f"Failed to store analytics: {e}")
        raise
```

**Verify in Firebase Console**:
- Go to Firebase Console → Firestore
- Check if 'analytics' collection exists
- Verify documents are being created
- Check document structure matches expected

---

## Issue 7: Performance Analysis Not Identifying Topics

### Symptoms
- No strengths identified
- No weaknesses identified
- All topics marked as "moderate"

### Possible Causes
1. Accuracy thresholds incorrect
2. Topic scores not calculated
3. Classification logic wrong

### Solutions

**Check thresholds**:
```python
# Correct thresholds
STRONG_THRESHOLD = 80.0  # > 80% is strong
WEAK_THRESHOLD = 40.0    # < 40% is weak

def classify_topic(accuracy):
    if accuracy > STRONG_THRESHOLD:
        return "strong"
    elif accuracy < WEAK_THRESHOLD:
        return "weak"
    else:
        return "moderate"
```

**Verify topic scores exist**:
```python
# Check topic_scores is populated
print(f"Topic scores: {len(score_result.topic_scores)}")
for topic in score_result.topic_scores:
    print(f"{topic.name}: {topic.accuracy}%")
```

**Test classification**:
```python
# Test cases
assert classify_topic(85.0) == "strong"
assert classify_topic(30.0) == "weak"
assert classify_topic(60.0) == "moderate"
```

---

## Issue 8: API Endpoints Return 500 Error

### Symptoms
- POST /api/analytics/generate returns 500
- Error in logs
- Frontend shows "Server error"

### Possible Causes
1. Unhandled exception in code
2. Missing required fields
3. Database connection failed
4. Gemini API error not caught

### Solutions

**Check logs**:
```bash
# View recent errors
tail -100 logs/analytics.log | grep ERROR

# Watch logs in real-time
tail -f logs/analytics.log
```

**Add comprehensive error handling**:
```python
@router.post("/api/analytics/generate")
async def generate_analytics(request: AnalyticsRequest):
    try:
        # Validate request
        if not request.test_id or not request.student_id:
            raise ValueError("Missing required fields")
        
        # Generate analytics
        analytics_id = analytics_service.generate_analytics(
            test_id=request.test_id,
            student_id=request.student_id,
            answers=request.answers
        )
        
        return {"analytics_id": analytics_id, "status": "success"}
        
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        logger.error(f"Analytics generation failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Analytics generation failed")
```

**Test endpoint manually**:
```bash
curl -X POST http://localhost:8000/api/analytics/generate \
  -H "Content-Type: application/json" \
  -d '{
    "test_id": "test_001",
    "student_id": "student_001",
    "answers": []
  }' \
  -v  # Verbose output
```

---

## Issue 9: Slow Analytics Generation

### Symptoms
- Analytics takes > 30 seconds
- Frontend times out
- Users complain about slow response

### Possible Causes
1. Context too large
2. Multiple Gemini calls
3. No caching
4. Inefficient database queries

### Solutions

**Optimize context size**:
```python
# Limit to essential information
def build_optimized_context(score_result):
    # Only top 10 topics, not all 50
    top_topics = sorted(score_result.topic_scores, key=lambda t: t.weightage, reverse=True)[:10]
    
    context = format_overview(score_result)
    context += format_subjects(score_result)
    context += format_topics(top_topics)  # Only top 10
    
    return context
```

**Implement caching**:
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_analytics(test_id, student_id):
    # Check Firestore cache
    cached = db.collection('analytics').where('test_id', '==', test_id).where('student_id', '==', student_id).get()
    
    if cached:
        return cached[0].to_dict()
    
    # Generate new
    return generate_new_analytics(test_id, student_id)
```

**Use async processing**:
```python
import asyncio

async def generate_analytics_async(test_id, student_id):
    # Run in background
    task_id = create_background_task(test_id, student_id)
    return {"task_id": task_id, "status": "processing"}

# Client polls for completion
async def check_status(task_id):
    task = get_task(task_id)
    if task.status == "complete":
        return task.result
    return {"status": "processing"}
```

**Profile performance**:
```python
import time

def generate_analytics(test_id, student_id):
    start = time.time()
    
    # Score calculation
    t1 = time.time()
    scores = calculate_scores(test_id, student_id)
    logger.info(f"Score calculation: {time.time() - t1:.2f}s")
    
    # Performance analysis
    t2 = time.time()
    performance = analyze_performance(scores)
    logger.info(f"Performance analysis: {time.time() - t2:.2f}s")
    
    # Gemini generation
    t3 = time.time()
    insights = gemini_service.generate(context)
    logger.info(f"Gemini generation: {time.time() - t3:.2f}s")
    
    logger.info(f"Total time: {time.time() - start:.2f}s")
```

---

## Issue 10: Percentile Calculation Incorrect

### Symptoms
- Percentile doesn't match score
- All students get same percentile
- Percentile > 100 or < 0

### Possible Causes
1. Benchmark data missing
2. Calculation logic wrong
3. Not enough comparison data

### Solutions

**Verify benchmark data**:
```python
# Load benchmarks
benchmarks = {
    "JEE_MAIN": {
        "excellent": 85,  # 85% score = excellent
        "good": 70,
        "average": 50,
        "needs_improvement": 30
    }
}
```

**Correct percentile calculation**:
```python
def calculate_percentile(score_percentage, exam_type):
    # Get all scores for this exam type
    all_scores = db.collection('analytics').where('exam_type', '==', exam_type).get()
    scores = [doc.to_dict()['overview']['percentage'] for doc in all_scores]
    
    if not scores:
        # No comparison data, use benchmarks
        return estimate_percentile_from_benchmarks(score_percentage, exam_type)
    
    # Calculate percentile
    scores_below = sum(1 for s in scores if s < score_percentage)
    percentile = (scores_below / len(scores)) * 100
    
    return round(percentile, 1)
```

**Test calculation**:
```python
# Test cases
assert calculate_percentile(90, "JEE_MAIN") > 80  # High score = high percentile
assert calculate_percentile(30, "JEE_MAIN") < 20  # Low score = low percentile
assert 0 <= calculate_percentile(50, "JEE_MAIN") <= 100  # Valid range
```

---

## General Debugging Tips

### Enable Debug Logging
```python
import logging

logging.basicConfig(
    level=logging.DEBUG,  # Show all logs
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Test Individual Components
```bash
# Test score calculator
python -m pytest tests/test_score_calculator.py -v

# Test performance analyzer
python -m pytest tests/test_performance_analyzer.py -v

# Test Gemini service
python -m pytest tests/test_gemini_service.py -v
```

### Check Environment
```bash
# Verify all environment variables
python -c "
import os
required = ['GEMINI_API_KEY', 'GOOGLE_CLOUD_PROJECT', 'FIREBASE_PROJECT_ID']
for var in required:
    value = os.getenv(var)
    print(f'{var}: {'✓' if value else '✗ MISSING'}')
"
```

### Monitor API Usage
```bash
# Check Gemini API quota
gcloud alpha services quota list --service=generativelanguage.googleapis.com

# Check API calls in logs
grep "Gemini API" logs/analytics.log | wc -l
```

---

## Getting Help

If issues persist:

1. **Check logs**: `logs/analytics.log`
2. **Review code**: Compare with PROMPTS.md generated code
3. **Test components**: Run individual tests
4. **Check configuration**: Verify CONFIGURATION.md steps
5. **Review documentation**: AI-INTEGRATION.md for concepts

**Still stuck?**
- Check Gemini API status: https://status.cloud.google.com/
- Review Google AI documentation: https://ai.google.dev/docs
- Check Firebase status: https://status.firebase.google.com/

---

## Prevention

**Best Practices to Avoid Issues**:

1. ✅ Always validate input data
2. ✅ Use comprehensive error handling
3. ✅ Log all important operations
4. ✅ Test with sample data first
5. ✅ Monitor API usage and costs
6. ✅ Cache results when possible
7. ✅ Set appropriate timeouts
8. ✅ Validate Gemini responses
9. ✅ Keep prompts explicit and clear
10. ✅ Test edge cases (0 score, 100% score, etc.)

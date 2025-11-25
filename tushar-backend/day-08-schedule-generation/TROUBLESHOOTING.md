# Troubleshooting Guide for Day 8: Schedule Generation

## Overview

This guide helps you diagnose and fix common issues with the schedule generation system.

---

## Issue 1: Schedule Generation Fails

### Symptoms
- API returns 500 error
- "Schedule generation failed" message
- No schedule returned

### Possible Causes

#### Cause 1.1: Gemini API Key Missing or Invalid
**Check**:
```bash
echo $GEMINI_API_KEY
```

**Fix**:
```bash
# Add to .env file
GEMINI_API_KEY=your_actual_api_key_here

# Reload environment
source .env

# Or restart server
```

**Verify**:
```bash
python3 -c "
import os
import google.generativeai as genai
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Hello')
print('API working:', response.text[:50])
"
```

#### Cause 1.2: Analytics Not Found
**Check**:
```bash
# Verify analytics_id exists in Firestore
python3 -c "
from firebase_admin import firestore
db = firestore.client()
analytics = db.collection('analytics').document('analytics_id').get()
print('Analytics exists:', analytics.exists)
"
```

**Fix**:
- Ensure Day 7 analytics generation completed successfully
- Use correct analytics_id from Day 7 response
- Or use sample analytics for testing

#### Cause 1.3: Weightage Files Missing
**Check**:
```bash
ls -la data/weightages/
```

**Fix**:
```bash
# Create weightage files from CONFIGURATION.md
# Verify they exist
python3 -c "
import json
import os
files = [
    'data/weightages/jee_main_weightages.json',
    'data/weightages/jee_advanced_weightages.json',
    'data/weightages/neet_weightages.json'
]
for f in files:
    if os.path.exists(f):
        print(f'{f}: ✓')
    else:
        print(f'{f}: ✗ MISSING')
"
```


#### Cause 1.4: Gemini API Rate Limit
**Symptoms**:
- Error: "Resource exhausted"
- Error: "429 Too Many Requests"

**Fix**:
```python
# Retry logic should handle this automatically
# If persistent, wait 1 minute and try again

# Check API quota:
# Go to: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
```

**Prevention**:
- Implement exponential backoff (should be in code)
- Cache generated schedules
- Batch requests if possible

---

## Issue 2: Priority Calculation Incorrect

### Symptoms
- Wrong topics prioritized
- Priority scores don't make sense
- Low-priority topics scheduled first

### Possible Causes

#### Cause 2.1: Wrong Formula
**Check**:
```python
# Test priority calculation
from services.priority_calculator import calculate_priority_score

score = calculate_priority_score(
    topic="Thermodynamics",
    accuracy=40.0,
    weightage=8.0,
    difficulty=1.0
)
print(f"Score: {score}")
print(f"Expected: 480.0")
```

**Fix**:
- Verify formula: `Weightage × (100 - Accuracy) × Difficulty`
- Check that accuracy is 0-100, not 0-1
- Ensure weightage is percentage, not decimal

#### Cause 2.2: Weightages Not Loaded
**Check**:
```python
import json
with open('data/weightages/jee_main_weightages.json') as f:
    weightages = json.load(f)
    print(f"Loaded {len(weightages['subjects'])} subjects")
    print(f"Physics topics: {len(weightages['subjects']['Physics']['topics'])}")
```

**Fix**:
- Ensure weightage files exist and are valid JSON
- Check file paths are correct
- Verify exam_type matches file name

---

## Issue 3: Schedule Quality Poor

### Symptoms
- Same subject for many consecutive days
- Unrealistic daily hours (> 6 hours)
- Important topics missing
- Generic subtopics and resources

### Possible Causes

#### Cause 3.1: Gemini Prompt Not Specific Enough
**Check**:
```python
# Review generated context
from utils.schedule_context_builder import build_complete_context
context = build_complete_context(...)
print(context)
# Should include clear constraints and examples
```

**Fix**:
- Update prompt template to be more specific
- Add examples of good schedules
- Emphasize constraints (subject balance, daily hours)
- Include validation criteria in prompt

#### Cause 3.2: Validation Not Working
**Check**:
```python
from utils.schedule_validator import validate_schedule_structure
is_valid, errors = validate_schedule_structure(schedule_data)
print(f"Valid: {is_valid}")
print(f"Errors: {errors}")
```

**Fix**:
- Implement stricter validation rules
- Reject schedules that don't meet criteria
- Trigger refinement when validation fails

#### Cause 3.3: No Optimization Applied
**Check**:
- Verify schedule_optimizer.py is being called
- Check optimization functions are working

**Fix**:
- Ensure optimization step runs after Gemini generation
- Implement subject balancing algorithm
- Add topic grouping logic

---

## Issue 4: Progress Update Fails

### Symptoms
- Progress not saved
- Completion percentage not updating
- Error when marking topics complete

### Possible Causes

#### Cause 4.1: Schedule Not Found
**Check**:
```bash
curl http://localhost:8000/api/schedule/sched_abc123
# Should return 200, not 404
```

**Fix**:
- Verify schedule_id is correct
- Check schedule exists in Firestore
- Ensure schedule status is "active"

#### Cause 4.2: Invalid Day Number
**Check**:
```python
# Day number must be within schedule range
if day_number < 1 or day_number > total_days:
    raise ValueError("Invalid day number")
```

**Fix**:
- Verify day_number is between 1 and total_days
- Check date matches schedule day

#### Cause 4.3: Firestore Write Permission
**Check**:
```bash
# Test Firestore write
python3 -c "
from firebase_admin import firestore
db = firestore.client()
db.collection('test').document('test').set({'test': True})
print('Firestore write: ✓')
"
```

**Fix**:
- Check Firestore security rules
- Verify service account has write permissions
- Ensure GOOGLE_APPLICATION_CREDENTIALS is set

---

## Issue 5: Adaptive Rescheduling Not Triggering

### Symptoms
- Student misses days but no reschedule
- Schedule doesn't adjust for overruns
- No reschedule notification

### Possible Causes

#### Cause 5.1: Trigger Detection Not Working
**Check**:
```python
from services.adaptive_scheduler import detect_reschedule_triggers
needs_reschedule, reason, details = detect_reschedule_triggers(schedule_id, progress)
print(f"Needs reschedule: {needs_reschedule}")
print(f"Reason: {reason}")
```

**Fix**:
- Verify trigger detection logic
- Check thresholds (2+ missed days, 50% overrun)
- Ensure progress data is complete

#### Cause 5.2: Rescheduling Disabled
**Check**:
```python
# Check if adaptive rescheduling is enabled
# Should be called after progress update
```

**Fix**:
- Ensure reschedule check runs after progress update
- Verify adaptive_scheduler service is imported
- Check for any disabled flags

---

## Issue 6: Gemini Response Parsing Fails

### Symptoms
- Error: "Invalid JSON"
- Error: "Missing required fields"
- Schedule structure incorrect

### Possible Causes

#### Cause 6.1: Gemini Returns Markdown
**Check**:
```python
# Gemini often wraps JSON in ```json ... ```
# Parser should handle this
```

**Fix**:
```python
import re
import json

def extract_json_from_text(text):
    # Try to find JSON in markdown code block
    match = re.search(r'```json\s*(\{.*?\})\s*```', text, re.DOTALL)
    if match:
        return json.loads(match.group(1))
    
    # Try to parse as plain JSON
    return json.loads(text)
```

#### Cause 6.2: Incomplete Response
**Check**:
```python
# Check if response was truncated
if len(response.text) >= max_output_tokens:
    print("Response may be truncated")
```

**Fix**:
- Increase max_output_tokens in Gemini config
- Request shorter schedules (e.g., 30 days at a time)
- Use streaming for long responses

---

## Issue 7: Performance Issues

### Symptoms
- Schedule generation takes > 60 seconds
- API timeouts
- Slow response times

### Possible Causes

#### Cause 7.1: Gemini API Slow
**Check**:
```python
import time
start = time.time()
response = model.generate_content(prompt)
duration = time.time() - start
print(f"Gemini API took {duration:.2f} seconds")
```

**Fix**:
- Normal: 10-20 seconds
- If > 30 seconds: Check network, API status
- Consider caching generated schedules
- Use async/await for concurrent requests

#### Cause 7.2: Large Context
**Check**:
```python
context_length = len(context)
print(f"Context length: {context_length} characters")
# Should be < 10,000 characters
```

**Fix**:
- Reduce context size
- Summarize analytics instead of full details
- Remove unnecessary information
- Truncate priority topics list (top 20 only)

---

## Issue 8: Time Calculations Wrong

### Symptoms
- Available days incorrect
- Total hours don't match
- Infeasible schedules generated

### Possible Causes

#### Cause 8.1: Date Calculation Error
**Check**:
```python
from datetime import date
from utils.time_calculator import calculate_available_days

start = date.today()
exam_date = date(2024, 4, 15)
days = calculate_available_days(start, exam_date)
print(f"Available days: {days}")
print(f"Expected: {(exam_date - start).days}")
```

**Fix**:
- Verify date parsing is correct
- Check timezone handling
- Ensure exam_date is in future

#### Cause 8.2: Buffer Not Applied
**Check**:
```python
# Total hours should include 10% buffer
total_hours = days × daily_hours × 0.9
```

**Fix**:
- Ensure buffer factor (0.9) is applied
- Don't count revision days in available days
- Exclude practice test days from study days

---

## Issue 9: Firestore Data Not Persisting

### Symptoms
- Schedule generated but not saved
- Can't retrieve schedule later
- Progress updates lost

### Possible Causes

#### Cause 9.1: Firestore Not Initialized
**Check**:
```python
from firebase_admin import firestore
db = firestore.client()
print(f"Firestore client: {db}")
```

**Fix**:
```python
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate('path/to/serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()
```

#### Cause 9.2: Document ID Collision
**Check**:
```python
# Ensure unique schedule_id
import uuid
schedule_id = f"sched_{uuid.uuid4().hex[:12]}"
```

**Fix**:
- Use UUID for schedule_id
- Check for existing ID before creating
- Handle duplicate ID errors

---

## Issue 10: Multiple Exam Types Not Working

### Symptoms
- NEET schedule has JEE topics
- Wrong weightages applied
- Biology topics missing for NEET

### Possible Causes

#### Cause 10.1: Wrong Weightage File Loaded
**Check**:
```python
exam_type = "NEET"
weightage_file = f"data/weightages/{exam_type.lower()}_weightages.json"
print(f"Loading: {weightage_file}")
```

**Fix**:
- Verify exam_type matches file name
- Check file naming: jee_main, jee_advanced, neet
- Ensure all three weightage files exist

#### Cause 10.2: Exam-Specific Logic Missing
**Check**:
- NEET should have Biology (50% weightage)
- JEE should have Mathematics instead of Biology

**Fix**:
- Add exam-specific subject handling
- Validate subjects match exam type
- Adjust weightages per exam

---

## Debugging Tips

### Enable Detailed Logging
```python
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Log all API calls
logger.debug(f"Calling Gemini with context length: {len(context)}")
logger.debug(f"Gemini response length: {len(response.text)}")
```

### Test Components Independently
```bash
# Test priority calculator
python3 -c "from services.priority_calculator import *; test_priority_calculation()"

# Test time calculator
python3 -c "from utils.time_calculator import *; test_time_calculations()"

# Test Gemini integration
python3 -c "from services.gemini_scheduler_service import *; test_gemini_api()"
```

### Use Sample Data
```python
# Test with sample analytics instead of real data
with open('data/sample_schedules/sample_analytics_input.json') as f:
    sample_analytics = json.load(f)

# Generate schedule with sample data
schedule = generate_schedule(sample_analytics)
```

### Check API Logs
```bash
# View backend logs
tail -f logs/app.log

# Filter for errors
grep ERROR logs/app.log

# Filter for Gemini calls
grep "Gemini" logs/app.log
```

---

## Getting Help

### Still Stuck?

1. **Check Logs**: Review backend logs for detailed error messages
2. **Test Individually**: Test each component separately
3. **Use Sample Data**: Verify with sample analytics
4. **Check API Status**: Verify Gemini API is operational
5. **Review Code**: Compare with PROMPTS.md expected output

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| "API key not found" | GEMINI_API_KEY missing | Add to .env file |
| "Analytics not found" | Invalid analytics_id | Use correct ID from Day 7 |
| "Invalid JSON" | Gemini response malformed | Check parsing logic |
| "Rate limit exceeded" | Too many API calls | Wait and retry |
| "Schedule validation failed" | Generated schedule invalid | Check validation rules |
| "Firestore permission denied" | No write access | Check security rules |

---

## Prevention Checklist

Before deploying:
- [ ] All environment variables set
- [ ] Weightage files created
- [ ] Gemini API tested
- [ ] Firestore permissions verified
- [ ] Error handling comprehensive
- [ ] Logging enabled
- [ ] Sample data works
- [ ] All tests passing

---

## Success!

If you've resolved your issue:
- ✅ Document what fixed it
- ✅ Update code to prevent recurrence
- ✅ Add test case for the scenario
- ✅ Continue with testing

Need more help? Review **AI-INTEGRATION.md** for detailed system explanations!

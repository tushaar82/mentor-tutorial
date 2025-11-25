# Configuration Guide: Gemini Analytics

## Overview

This guide walks you through the manual configuration steps needed for the analytics system. These steps cannot be automated by AI coding agents and require your direct action.

**Total Time**: ~30 minutes

---

## Step 1: Verify Gemini API is Enabled

### What You're Doing
Confirming that the Gemini API is enabled in your Google Cloud project (should already be done from Day 5).

### Command/Action
```bash
# Check if Gemini API is enabled
gcloud services list --enabled --filter="name:generativelanguage.googleapis.com"
```

### Expected Output
```
NAME                                    TITLE
generativelanguage.googleapis.com       Generative Language API
```

### If Not Enabled
```bash
# Enable Gemini API
gcloud services enable generativelanguage.googleapis.com
```

### Why This Matters
The analytics system uses Gemini Flash to generate AI-powered insights from test results.

---

## Step 2: Verify Gemini API Key

### What You're Doing
Ensuring your Gemini API key is properly configured in environment variables.

### Command/Action
```bash
# Check if GEMINI_API_KEY is set
echo $GEMINI_API_KEY
```

### Expected Output
```
AIzaSy...your-api-key...
```

### If Not Set
```bash
# Get your API key from Google AI Studio
# Visit: https://makersuite.google.com/app/apikey

# Add to .env file
echo "GEMINI_API_KEY=your-api-key-here" >> .env

# Reload environment
source .env
```

### Why This Matters
The Gemini service needs authentication to generate analytics.

---

## Step 3: Test Gemini API Connection

### What You're Doing
Verifying that you can successfully call the Gemini API.

### Command/Action
```bash
# Create test script
cat > test_gemini.py << 'EOF'
import google.generativeai as genai
import os

# Configure API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Test generation
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Say "Gemini API is working!"')

print(response.text)
EOF

# Run test
python test_gemini.py
```

### Expected Output
```
Gemini API is working!
```

### If It Fails
- **Error: API key not valid**: Check your API key is correct
- **Error: API not enabled**: Go back to Step 1
- **Error: Quota exceeded**: Check your Google Cloud billing

### Why This Matters
Confirms Gemini API is accessible before generating analytics.

---

## Step 4: Install Required Dependencies

### What You're Doing
Installing Python packages needed for analytics generation.

### Command/Action
```bash
# Add to requirements.txt if not already present
cat >> requirements.txt << 'EOF'
google-generativeai==0.3.1
EOF

# Install dependencies
pip install -r requirements.txt
```

### Verification
```bash
# Verify installation
python -c "import google.generativeai; print('Installed:', google.generativeai.__version__)"
```

### Expected Output
```
Installed: 0.3.1
```

### Why This Matters
The analytics service requires the Google Generative AI library.

---

## Step 5: Create Sample Test Data

### What You're Doing
Creating sample test submission data for testing analytics generation.

### Command/Action
```bash
# Create sample data directory
mkdir -p tushar-backend/data/sample_results

# Create sample test submission
cat > tushar-backend/data/sample_results/sample_test_submission.json << 'EOF'
{
  "test_id": "test_001",
  "student_id": "student_001",
  "exam_type": "JEE_MAIN",
  "submitted_at": "2024-01-15T10:30:00Z",
  "answers": [
    {
      "question_id": "q1",
      "subject": "Physics",
      "topic": "Mechanics",
      "difficulty": "medium",
      "question_type": "single_correct",
      "correct_answer": "B",
      "student_answer": "B",
      "time_taken": 120,
      "marks": 4
    },
    {
      "question_id": "q2",
      "subject": "Physics",
      "topic": "Thermodynamics",
      "difficulty": "hard",
      "question_type": "single_correct",
      "correct_answer": "C",
      "student_answer": "A",
      "time_taken": 180,
      "marks": 4
    },
    {
      "question_id": "q3",
      "subject": "Chemistry",
      "topic": "Organic Chemistry",
      "difficulty": "easy",
      "question_type": "single_correct",
      "correct_answer": "A",
      "student_answer": "A",
      "time_taken": 90,
      "marks": 4
    }
  ]
}
EOF
```

### Why This Matters
Sample data allows you to test analytics generation without a complete test.

---

## Step 6: Configure Analytics Templates

### What You're Doing
Setting up analytics report templates for different exam types.

### Command/Action
```bash
# Create templates directory
mkdir -p tushar-backend/data/analytics_templates

# Create JEE Main template
cat > tushar-backend/data/analytics_templates/jee_main_template.json << 'EOF'
{
  "exam_type": "JEE_MAIN",
  "subjects": ["Physics", "Chemistry", "Mathematics"],
  "total_questions": 90,
  "duration_minutes": 180,
  "marking_scheme": {
    "mcq_correct": 4,
    "mcq_incorrect": -1,
    "numerical_correct": 4,
    "numerical_incorrect": 0
  },
  "benchmarks": {
    "excellent": 85,
    "good": 70,
    "average": 50,
    "needs_improvement": 30
  }
}
EOF

# Create NEET template
cat > tushar-backend/data/analytics_templates/neet_template.json << 'EOF'
{
  "exam_type": "NEET",
  "subjects": ["Physics", "Chemistry", "Biology"],
  "total_questions": 200,
  "duration_minutes": 200,
  "marking_scheme": {
    "mcq_correct": 4,
    "mcq_incorrect": -1
  },
  "benchmarks": {
    "excellent": 90,
    "good": 75,
    "average": 55,
    "needs_improvement": 35
  }
}
EOF
```

### Why This Matters
Templates provide exam-specific configuration for analytics generation.

---

## Step 7: Update Main Application

### What You're Doing
Registering the analytics router in the main FastAPI application.

### Command/Action
```python
# Edit tushar-backend/main.py
# Add these lines:

from routers import analytics_router

# Register router
app.include_router(
    analytics_router.router,
    prefix="/api/analytics",
    tags=["analytics"]
)
```

### Verification
```bash
# Start server
uvicorn main:app --reload

# Check if analytics endpoints are registered
curl http://localhost:8000/docs
# Look for /api/analytics endpoints in Swagger UI
```

### Why This Matters
Makes analytics endpoints accessible via the API.

---

## Step 8: Configure Firestore Collections

### What You're Doing
Setting up Firestore collections for storing analytics reports.

### Command/Action
```bash
# No command needed - Firestore creates collections automatically
# Just verify structure in Firebase Console
```

### Expected Collections
- `analytics` - Stores analytics reports
- `test_submissions` - Stores test submissions
- `tests` - Stores test questions (from Day 6)

### Firestore Structure
```
analytics/
  {analytics_id}/
    - test_id: string
    - student_id: string
    - generated_at: timestamp
    - overview: object
    - subject_analysis: array
    - topic_analysis: array
    - ai_insights: object
    - priority_topics: array
    - visualization_data: object
```

### Why This Matters
Analytics reports need to be stored for retrieval and history tracking.

---

## Step 9: Set Environment Variables

### What You're Doing
Ensuring all required environment variables are set.

### Command/Action
```bash
# Check .env file has all required variables
cat .env
```

### Required Variables
```bash
# Google Cloud
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Firebase
FIREBASE_PROJECT_ID=your-project-id

# Application
ENVIRONMENT=development
LOG_LEVEL=INFO
```

### If Missing
```bash
# Add missing variables to .env
echo "VARIABLE_NAME=value" >> .env
```

### Why This Matters
Services need these variables to function correctly.

---

## Step 10: Test Analytics Prompt

### What You're Doing
Testing the analytics prompt template with Gemini to ensure it generates proper output.

### Command/Action
```bash
# Create test script
cat > test_analytics_prompt.py << 'EOF'
import google.generativeai as genai
import os
import json

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Sample context
context = """
STUDENT PERFORMANCE DATA:
- Exam: JEE Main Diagnostic Test
- Total Score: 240/360 (67%)
- Time Taken: 165/180 minutes

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

prompt = f"""
You are an expert educational analytics system for JEE/NEET exam preparation.

{context}

Analyze this performance and provide insights in JSON format:
{{
  "strengths": [
    {{"topic": "...", "reason": "...", "recommendation": "..."}}
  ],
  "weaknesses": [
    {{"topic": "...", "reason": "...", "priority": "high/medium/low", "estimated_hours": 10, "recommendation": "..."}}
  ],
  "learning_patterns": ["pattern1", "pattern2"],
  "overall_assessment": "Overall performance summary...",
  "study_strategy": "Recommended study approach..."
}}

Provide actionable, specific recommendations.
"""

model = genai.GenerativeModel(
    'gemini-1.5-flash',
    generation_config={"response_mime_type": "application/json"}
)

response = model.generate_content(prompt)
print("Gemini Response:")
print(response.text)

# Try to parse as JSON
try:
    analytics = json.loads(response.text)
    print("\n✓ Valid JSON response")
    print(f"✓ Found {len(analytics.get('strengths', []))} strengths")
    print(f"✓ Found {len(analytics.get('weaknesses', []))} weaknesses")
except json.JSONDecodeError as e:
    print(f"\n✗ Invalid JSON: {e}")
EOF

# Run test
python test_analytics_prompt.py
```

### Expected Output
```
Gemini Response:
{
  "strengths": [
    {
      "topic": "Organic Chemistry",
      "reason": "Excellent accuracy (90%) showing strong conceptual understanding",
      "recommendation": "Maintain with weekly practice"
    },
    ...
  ],
  "weaknesses": [
    {
      "topic": "Thermodynamics",
      "reason": "Low accuracy (40%) indicates conceptual gaps",
      "priority": "high",
      "estimated_hours": 15,
      "recommendation": "Focus on fundamental concepts, solve 50 practice questions"
    },
    ...
  ],
  ...
}

✓ Valid JSON response
✓ Found 2 strengths
✓ Found 2 weaknesses
```

### If It Fails
- **Not JSON**: Add `response_mime_type="application/json"` to generation_config
- **Missing fields**: Make prompt more explicit about required fields
- **Poor quality**: Adjust prompt to be more specific

### Why This Matters
Validates that Gemini can generate proper analytics before integrating into the service.

---

## Step 11: Configure Logging

### What You're Doing
Setting up logging for analytics generation monitoring.

### Command/Action
```bash
# Create logging configuration
cat > tushar-backend/logging_config.py << 'EOF'
import logging
import sys

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('logs/analytics.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

# Create logs directory
mkdir -p logs
EOF
```

### Why This Matters
Logging helps debug analytics generation issues and monitor performance.

---

## Configuration Complete! ✓

You've successfully configured:
- ✅ Gemini API access
- ✅ Required dependencies
- ✅ Sample test data
- ✅ Analytics templates
- ✅ Firestore collections
- ✅ Environment variables
- ✅ Analytics prompts
- ✅ Logging

## Next Steps

1. **Proceed to TESTING.md** to test analytics generation
2. **Verify** all endpoints work correctly
3. **Test** with sample data
4. **Check** EXPECTED-OUTCOME.md for success criteria

## Troubleshooting

If you encounter issues:
1. Check **TROUBLESHOOTING.md** for common problems
2. Verify all environment variables are set
3. Ensure Gemini API is enabled and accessible
4. Check logs in `logs/analytics.log`

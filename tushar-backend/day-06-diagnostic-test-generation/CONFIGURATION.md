# Configuration Guide for Day 6: Diagnostic Test Generation

## Overview

This guide covers manual configuration steps needed for diagnostic test generation. Most APIs (Vertex AI, Gemini) are already enabled from Days 4-5, so this focuses on setting up exam patterns and test data.

**Total Time**: 30 minutes

---

## Step 1: Create Exam Pattern Files

### What You're Doing
Creating JSON files that define exam-specific patterns for JEE Main, JEE Advanced, and NEET.

### Why This Matters
These patterns control question distribution, marking schemes, and test structure.

### Commands/Actions

**Create directory**:
```bash
cd tushar-backend
mkdir -p data/exam_patterns
```

**Create JEE Main pattern**:
```bash
cat > data/exam_patterns/jee_main_pattern.json << 'EOF'
{
  "exam_name": "JEE Main",
  "exam_code": "JEE_MAIN",
  "total_questions": 200,
  "duration_minutes": 180,
  "subjects": [
    {
      "name": "Physics",
      "question_count": 60,
      "weightage_percentage": 30
    },
    {
      "name": "Chemistry",
      "question_count": 60,
      "weightage_percentage": 30
    },
    {
      "name": "Mathematics",
      "question_count": 80,
      "weightage_percentage": 40
    }
  ],
  "question_types": [
    {
      "type": "single_correct_mcq",
      "percentage": 70,
      "description": "Multiple choice with single correct answer"
    },
    {
      "type": "numerical",
      "percentage": 30,
      "description": "Numerical answer (0-9999)"
    }
  ],
  "marking_scheme": {
    "single_correct_mcq": {
      "correct_marks": 4,
      "incorrect_marks": -1,
      "unattempted_marks": 0
    },
    "numerical": {
      "correct_marks": 4,
      "incorrect_marks": 0,
      "unattempted_marks": 0
    }
  },
  "difficulty_distribution": {
    "easy": 30,
    "medium": 50,
    "hard": 20
  },
  "sections": [
    {
      "name": "Section A - Physics",
      "subject": "Physics",
      "duration_minutes": 60,
      "instructions": "This section contains Physics questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers. Marking: +4 for correct, -1 for incorrect MCQ, 0 for incorrect numerical."
    },
    {
      "name": "Section B - Chemistry",
      "subject": "Chemistry",
      "duration_minutes": 60,
      "instructions": "This section contains Chemistry questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers. Marking: +4 for correct, -1 for incorrect MCQ, 0 for incorrect numerical."
    },
    {
      "name": "Section C - Mathematics",
      "subject": "Mathematics",
      "duration_minutes": 60,
      "instructions": "This section contains Mathematics questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers. Marking: +4 for correct, -1 for incorrect MCQ, 0 for incorrect numerical."
    }
  ]
}
EOF
```

**Create JEE Advanced pattern**:
```bash
cat > data/exam_patterns/jee_advanced_pattern.json << 'EOF'
{
  "exam_name": "JEE Advanced",
  "exam_code": "JEE_ADVANCED",
  "total_questions": 200,
  "duration_minutes": 180,
  "subjects": [
    {
      "name": "Physics",
      "question_count": 67,
      "weightage_percentage": 33
    },
    {
      "name": "Chemistry",
      "question_count": 67,
      "weightage_percentage": 33
    },
    {
      "name": "Mathematics",
      "question_count": 66,
      "weightage_percentage": 34
    }
  ],
  "question_types": [
    {
      "type": "single_correct_mcq",
      "percentage": 50,
      "description": "Multiple choice with single correct answer"
    },
    {
      "type": "multiple_correct_mcq",
      "percentage": 30,
      "description": "Multiple choice with one or more correct answers"
    },
    {
      "type": "numerical",
      "percentage": 20,
      "description": "Numerical answer (0-9999)"
    }
  ],
  "marking_scheme": {
    "single_correct_mcq": {
      "correct_marks": 4,
      "incorrect_marks": -1,
      "unattempted_marks": 0
    },
    "multiple_correct_mcq": {
      "correct_marks": 4,
      "incorrect_marks": -2,
      "partial_marks": 1,
      "unattempted_marks": 0
    },
    "numerical": {
      "correct_marks": 4,
      "incorrect_marks": 0,
      "unattempted_marks": 0
    }
  },
  "difficulty_distribution": {
    "easy": 20,
    "medium": 50,
    "hard": 30
  },
  "sections": [
    {
      "name": "Section A - Physics",
      "subject": "Physics",
      "duration_minutes": 60,
      "instructions": "This section contains Physics questions. MCQs may have single or multiple correct answers. Marking: +4 for fully correct, -1/-2 for incorrect, +1 for partially correct (multiple correct type)."
    },
    {
      "name": "Section B - Chemistry",
      "subject": "Chemistry",
      "duration_minutes": 60,
      "instructions": "This section contains Chemistry questions. MCQs may have single or multiple correct answers. Marking: +4 for fully correct, -1/-2 for incorrect, +1 for partially correct (multiple correct type)."
    },
    {
      "name": "Section C - Mathematics",
      "subject": "Mathematics",
      "duration_minutes": 60,
      "instructions": "This section contains Mathematics questions. MCQs may have single or multiple correct answers. Marking: +4 for fully correct, -1/-2 for incorrect, +1 for partially correct (multiple correct type)."
    }
  ]
}
EOF
```

**Create NEET pattern**:
```bash
cat > data/exam_patterns/neet_pattern.json << 'EOF'
{
  "exam_name": "NEET",
  "exam_code": "NEET",
  "total_questions": 200,
  "duration_minutes": 200,
  "subjects": [
    {
      "name": "Physics",
      "question_count": 40,
      "weightage_percentage": 20
    },
    {
      "name": "Chemistry",
      "question_count": 40,
      "weightage_percentage": 20
    },
    {
      "name": "Biology",
      "question_count": 120,
      "weightage_percentage": 60
    }
  ],
  "question_types": [
    {
      "type": "single_correct_mcq",
      "percentage": 100,
      "description": "Multiple choice with single correct answer"
    }
  ],
  "marking_scheme": {
    "single_correct_mcq": {
      "correct_marks": 4,
      "incorrect_marks": -1,
      "unattempted_marks": 0
    }
  },
  "difficulty_distribution": {
    "easy": 40,
    "medium": 40,
    "hard": 20
  },
  "sections": [
    {
      "name": "Section A - Physics",
      "subject": "Physics",
      "duration_minutes": 40,
      "instructions": "This section contains Physics questions. Each question has 4 options with 1 correct answer. Marking: +4 for correct, -1 for incorrect, 0 for unattempted."
    },
    {
      "name": "Section B - Chemistry",
      "subject": "Chemistry",
      "duration_minutes": 40,
      "instructions": "This section contains Chemistry questions. Each question has 4 options with 1 correct answer. Marking: +4 for correct, -1 for incorrect, 0 for unattempted."
    },
    {
      "name": "Section C - Biology",
      "subject": "Biology",
      "duration_minutes": 120,
      "instructions": "This section contains Biology questions (Botany and Zoology). Each question has 4 options with 1 correct answer. Marking: +4 for correct, -1 for incorrect, 0 for unattempted."
    }
  ]
}
EOF
```

### Verification
```bash
# Verify JSON files are valid
python3 -c "import json; json.load(open('data/exam_patterns/jee_main_pattern.json')); print('✓ JEE Main pattern valid')"
python3 -c "import json; json.load(open('data/exam_patterns/jee_advanced_pattern.json')); print('✓ JEE Advanced pattern valid')"
python3 -c "import json; json.load(open('data/exam_patterns/neet_pattern.json')); print('✓ NEET pattern valid')"
```

**Expected Output**:
```
✓ JEE Main pattern valid
✓ JEE Advanced pattern valid
✓ NEET pattern valid
```

---

## Step 2: Create Generated Tests Directory

### What You're Doing
Creating directory structure for storing generated tests.

### Commands/Actions
```bash
cd tushar-backend
mkdir -p data/generated_tests
touch data/generated_tests/.gitkeep
```

### Verification
```bash
ls -la data/generated_tests/
# Should show .gitkeep file
```

---

## Step 3: Verify Firestore Collections

### What You're Doing
Ensuring required Firestore collections exist for test storage.

### Why This Matters
Tests and results are stored in Firestore for persistence.

### Commands/Actions

**Open Firebase Console**:
1. Go to https://console.firebase.google.com
2. Select your project
3. Navigate to Firestore Database

**Verify/Create Collections**:
- `diagnostic_tests` - Stores complete tests
- `test_results` - Stores test submissions and scores
- `generation_jobs` - Tracks async generation progress

**If collections don't exist**, they'll be created automatically when first test is generated.

### Verification
Check Firebase Console shows these collections (or they'll appear after first use).

---

## Step 4: Verify API Quotas

### What You're Doing
Checking that you have sufficient API quota for test generation.

### Why This Matters
Generating 200 questions requires many API calls to Gemini and Vector Search.

### Commands/Actions

**Check Vertex AI quota**:
```bash
gcloud alpha services quota list \
  --service=aiplatform.googleapis.com \
  --consumer=projects/$(gcloud config get-value project) \
  --filter="metric.type:aiplatform.googleapis.com/online_prediction_requests_per_base_model"
```

**Check Gemini quota**:
```bash
gcloud alpha services quota list \
  --service=generativelanguage.googleapis.com \
  --consumer=projects/$(gcloud config get-value project)
```

### Expected Quotas
- **Vertex AI**: 60 requests/minute (default)
- **Gemini**: 60 requests/minute (default)

**For 200 questions**:
- Approximately 20-30 topics
- 20-30 RAG calls (1 per topic)
- Each RAG call: 1 Vector Search + 1 Gemini call
- Total: ~40-60 API calls
- Time: 2-3 minutes with rate limiting

### If Quota Insufficient
Request quota increase:
1. Go to Google Cloud Console → IAM & Admin → Quotas
2. Search for "Vertex AI" or "Gemini"
3. Select quota and click "Edit Quotas"
4. Request increase (usually approved within 24 hours)

---

## Step 5: Set Environment Variables

### What You're Doing
Ensuring all required environment variables are set.

### Commands/Actions

**Check .env file**:
```bash
cd tushar-backend
cat .env
```

**Required variables** (should already be set from Days 1-5):
```bash
# Google Cloud
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1

# Firebase
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json

# Application
ENVIRONMENT=development
LOG_LEVEL=INFO
```

**If any missing**, add them to `.env` file.

### Verification
```bash
python3 -c "from dotenv import load_dotenv; import os; load_dotenv(); print('✓ Project:', os.getenv('GOOGLE_CLOUD_PROJECT'))"
```

---

## Step 6: Test Pattern Loader

### What You're Doing
Verifying that pattern loader can read exam patterns.

### Commands/Actions
```bash
cd tushar-backend
python3 << 'EOF'
from utils.pattern_loader import PatternLoader

loader = PatternLoader()
jee_main = loader.load_pattern('JEE_MAIN')
print(f"✓ Loaded JEE Main: {jee_main.total_questions} questions")

jee_adv = loader.load_pattern('JEE_ADVANCED')
print(f"✓ Loaded JEE Advanced: {jee_adv.total_questions} questions")

neet = loader.load_pattern('NEET')
print(f"✓ Loaded NEET: {neet.total_questions} questions")
EOF
```

### Expected Output
```
✓ Loaded JEE Main: 200 questions
✓ Loaded JEE Advanced: 200 questions
✓ Loaded NEET: 200 questions
```

---

## Step 7: Verify Dependencies

### What You're Doing
Ensuring all required Python packages are installed.

### Commands/Actions
```bash
cd tushar-backend
pip install -r requirements.txt
```

**Verify key packages**:
```bash
python3 << 'EOF'
import fastapi
import firebase_admin
import google.cloud.aiplatform
import pydantic
print("✓ All dependencies installed")
EOF
```

### Expected Output
```
✓ All dependencies installed
```

---

## Step 8: Start Backend Server

### What You're Doing
Starting the FastAPI server with new diagnostic test endpoints.

### Commands/Actions
```bash
cd tushar-backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Expected Output
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Verification
**Open browser**: http://localhost:8000/docs

**Check for new endpoints**:
- `/api/diagnostic-test/generate`
- `/api/diagnostic-test/generate-async`
- `/api/diagnostic-test/{test_id}`
- `/api/diagnostic-test/{test_id}/start`
- `/api/diagnostic-test/{test_id}/submit`

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ Exam pattern files (JEE Main, JEE Advanced, NEET)
- ✅ Directory structure for generated tests
- ✅ Firestore collections verified
- ✅ API quotas checked
- ✅ Environment variables set
- ✅ Pattern loader tested
- ✅ Dependencies installed
- ✅ Backend server running

## Next Steps

1. **Open TESTING.md** - Test diagnostic test generation
2. **Generate your first test** - Use the API to create a complete diagnostic test
3. **Verify results** - Check that 200 questions are generated correctly

## Troubleshooting

If you encounter issues:

**Pattern files not found**:
- Check file paths: `data/exam_patterns/*.json`
- Verify JSON syntax with `python -m json.tool < file.json`

**API quota exceeded**:
- Check quotas with gcloud commands above
- Request quota increase if needed
- Implement rate limiting in code

**Firestore permission denied**:
- Verify service account has Firestore permissions
- Check Firebase rules allow read/write

**Server won't start**:
- Check for port conflicts: `lsof -i :8000`
- Verify all imports work: `python -c "import main"`
- Check logs for specific errors

For more help, see **TROUBLESHOOTING.md**.

# Configuration Steps for Day 5: RAG Implementation

## Overview

These are manual setup steps (no coding) to enable Gemini API and configure the RAG pipeline. Each step includes exact commands and verification.

---

## Step 1: Enable Gemini API in Google Cloud

### What You're Doing
Enabling the Generative AI API (Gemini) in your Google Cloud project.

### Why This Is Needed
Gemini Flash is accessed through Google Cloud's Vertex AI platform. You need to enable the API before making calls.

### Command/Action
```bash
# Enable Generative AI API
gcloud services enable generativelanguage.googleapis.com

# Enable Vertex AI API (if not already enabled from Day 4)
gcloud services enable aiplatform.googleapis.com
```

### Expected Output
```
Operation "operations/..." finished successfully.
```

### Verification
```bash
# Check if APIs are enabled
gcloud services list --enabled | grep -E "generativelanguage|aiplatform"
```

You should see:
```
generativelanguage.googleapis.com
aiplatform.googleapis.com
```

### If It Fails
- **Issue**: Permission denied
- **Cause**: You don't have permission to enable APIs
- **Fix**: Ask project owner to grant you "Service Usage Admin" role
  ```bash
  gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="user:YOUR_EMAIL" \
    --role="roles/serviceusage.serviceUsageAdmin"
  ```

---

## Step 2: Set Up Environment Variables

### What You're Doing
Adding Gemini-specific configuration to your `.env` file.

### Why This Is Needed
The Gemini client needs to know your project ID and location.

### Command/Action

Add these lines to `tushar-backend/.env`:

```bash
# Gemini Configuration
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1

# Gemini Model Configuration
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048

# RAG Configuration
RAG_MAX_CONTEXT_TOKENS=3000
RAG_TOP_K_RESULTS=5
RAG_MIN_SIMILARITY_SCORE=0.5
```

**Replace `your-project-id` with your actual Google Cloud project ID.**

### Verification
```bash
# Check environment variables are set
cd tushar-backend
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('Project:', os.getenv('GOOGLE_CLOUD_PROJECT')); print('Location:', os.getenv('GOOGLE_CLOUD_LOCATION'))"
```

You should see your project ID and location printed.

### If It Fails
- **Issue**: Variables not loaded
- **Cause**: `.env` file not in correct location
- **Fix**: Ensure `.env` is in `tushar-backend/` directory (same level as `main.py`)

---

## Step 3: Test Gemini API Access

### What You're Doing
Verifying you can make API calls to Gemini.

### Why This Is Needed
Confirms authentication and API access are working before running the full pipeline.

### Command/Action

Create a test script `tushar-backend/test_gemini.py`:

```python
import vertexai
from vertexai.generative_models import GenerativeModel
import os
from dotenv import load_dotenv

load_dotenv()

project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
location = os.getenv("GOOGLE_CLOUD_LOCATION")

print(f"Testing Gemini API...")
print(f"Project: {project_id}")
print(f"Location: {location}")

try:
    # Initialize Vertex AI
    vertexai.init(project=project_id, location=location)
    
    # Create model
    model = GenerativeModel("gemini-1.5-flash")
    
    # Test generation
    response = model.generate_content("Say 'Hello from Gemini!'")
    
    print(f"\n✓ Gemini API is working!")
    print(f"Response: {response.text}")
    
except Exception as e:
    print(f"\n✗ Gemini API test failed: {e}")
```

Run the test:
```bash
cd tushar-backend
python test_gemini.py
```

### Expected Output
```
Testing Gemini API...
Project: your-project-id
Location: us-central1

✓ Gemini API is working!
Response: Hello from Gemini!
```

### If It Fails

**Error: "Permission denied"**
- **Cause**: Service account doesn't have Vertex AI permissions
- **Fix**: Grant permissions
  ```bash
  gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
    --role="roles/aiplatform.user"
  ```

**Error: "Quota exceeded"**
- **Cause**: No quota for Gemini API
- **Fix**: Request quota increase in Google Cloud Console → IAM & Admin → Quotas

**Error: "API not enabled"**
- **Cause**: API not properly enabled
- **Fix**: Re-run Step 1 commands

---

## Step 4: Create Question Pattern Files

### What You're Doing
Creating JSON files with example question patterns for JEE and NEET.

### Why This Is Needed
These examples are used in prompts for few-shot learning, helping Gemini generate better questions.

### Command/Action

Create `tushar-backend/data/question_patterns/jee_patterns.json`:

```json
{
  "single_correct": {
    "description": "Single correct answer MCQ",
    "example": {
      "question": "A particle moves along a straight line with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, what is the acceleration?",
      "options": {
        "A": "2.5 m/s²",
        "B": "5 m/s²",
        "C": "7.5 m/s²",
        "D": "10 m/s²"
      },
      "correct_answer": "B",
      "explanation": "Using v = u + at, we have 30 = 10 + a(4), which gives a = 5 m/s²"
    }
  },
  "numerical": {
    "description": "Numerical answer type",
    "example": {
      "question": "A body of mass 2 kg is moving with velocity 10 m/s. What is its kinetic energy in Joules?",
      "answer": "100",
      "explanation": "KE = (1/2)mv² = (1/2)(2)(10)² = 100 J"
    }
  }
}
```

Create `tushar-backend/data/question_patterns/neet_patterns.json`:

```json
{
  "single_correct": {
    "description": "Single correct answer MCQ for NEET",
    "example": {
      "question": "Which of the following is the powerhouse of the cell?",
      "options": {
        "A": "Nucleus",
        "B": "Mitochondria",
        "C": "Ribosome",
        "D": "Golgi apparatus"
      },
      "correct_answer": "B",
      "explanation": "Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration"
    }
  }
}
```

### Verification
```bash
# Check files exist
ls -la tushar-backend/data/question_patterns/
```

You should see both JSON files.

### If It Fails
- **Issue**: Directory doesn't exist
- **Fix**: Create directory first
  ```bash
  mkdir -p tushar-backend/data/question_patterns
  ```

---

## Step 5: Configure Firestore for Question Storage

### What You're Doing
Creating Firestore collection and indexes for storing generated questions.

### Why This Is Needed
Questions need to be stored for caching and retrieval.

### Command/Action

**Option 1: Using Firebase Console**
1. Go to Firebase Console → Firestore Database
2. Click "Start collection"
3. Collection ID: `questions`
4. Add a test document:
   - Document ID: (auto-generate)
   - Fields:
     - `question`: "Test question"
     - `exam_type`: "JEE_MAIN"
     - `topic`: "Test"
     - `created_at`: (timestamp)

**Option 2: Using Python Script**

Create `tushar-backend/setup_firestore.py`:

```python
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Create test question
test_question = {
    "question": "Test question for RAG setup",
    "exam_type": "JEE_MAIN",
    "topic": "Setup Test",
    "created_at": datetime.now()
}

db.collection("questions").add(test_question)
print("✓ Firestore collection created successfully")
```

Run:
```bash
cd tushar-backend
python setup_firestore.py
```

### Verification
```bash
# Query Firestore to check collection exists
python -c "from firebase_admin import credentials, firestore; import firebase_admin; cred = credentials.Certificate('path/to/serviceAccountKey.json'); firebase_admin.initialize_app(cred); db = firestore.client(); print('Collections:', [c.id for c in db.collections()])"
```

You should see `questions` in the list.

### If It Fails
- **Issue**: Permission denied
- **Cause**: Service account doesn't have Firestore permissions
- **Fix**: Grant "Cloud Datastore User" role in Google Cloud Console

---

## Step 6: Test Vector Search Integration

### What You're Doing
Verifying Vector Search from Day 4 is still working and accessible.

### Why This Is Needed
RAG depends on Vector Search for retrieval. Must confirm it's operational.

### Command/Action

```bash
# Test Vector Search endpoint
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Limits and Continuity",
    "top_k": 5,
    "filters": {"exam": "JEE_MAIN", "subject": "Mathematics"}
  }'
```

### Expected Output
```json
{
  "results": [
    {
      "text": "Limits and Continuity: Definition of limits...",
      "score": 0.92,
      "metadata": {
        "exam": "JEE_MAIN",
        "subject": "Mathematics",
        "chapter": "Calculus"
      }
    }
  ],
  "query": "Limits and Continuity",
  "total_results": 5
}
```

### If It Fails
- **Issue**: Vector Search not responding
- **Cause**: Day 4 setup incomplete or index not deployed
- **Fix**: Go back to Day 4 and complete Vector Search setup

---

## Environment Variables Summary

Your complete `.env` file should now have:

```bash
# Firebase Configuration (from Day 2)
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json

# Google Cloud Configuration (from Day 4)
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1

# Gemini Configuration (new)
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048

# RAG Configuration (new)
RAG_MAX_CONTEXT_TOKENS=3000
RAG_TOP_K_RESULTS=5
RAG_MIN_SIMILARITY_SCORE=0.5

# Vector Search Configuration (from Day 4)
VECTOR_SEARCH_INDEX_ID=your-index-id
VECTOR_SEARCH_ENDPOINT_ID=your-endpoint-id
```

---

## Verification Checklist

Before proceeding to testing, verify:

- [ ] Gemini API enabled in Google Cloud
- [ ] Environment variables set in `.env`
- [ ] Gemini API test script runs successfully
- [ ] Question pattern files created
- [ ] Firestore collection created
- [ ] Vector Search is operational
- [ ] All dependencies installed (`pip install -r requirements.txt`)

---

## Next Steps

Configuration complete! Move to **TESTING.md** to test the RAG pipeline.

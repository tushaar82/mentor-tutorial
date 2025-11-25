# Troubleshooting Guide for Vector Search Setup

## Overview

This guide helps you diagnose and fix common issues with Vector Search implementation. Issues are organized by category with symptoms, causes, and solutions.

---

## Installation and Setup Issues

### Issue 1: gcloud CLI Not Found

**Symptoms:**
```bash
$ gcloud --version
bash: gcloud: command not found
```

**Possible Causes:**
1. gcloud CLI not installed
2. gcloud not in PATH

**Solutions:**

**On Ubuntu/Debian:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud --version
```

**On macOS:**
```bash
brew install google-cloud-sdk
gcloud --version
```

**Verify Installation:**
```bash
which gcloud
# Should show: /usr/local/bin/gcloud or similar
```

---

### Issue 2: Authentication Failed

**Symptoms:**
```
Error: Could not automatically determine credentials
Error: 401 Unauthorized
```

**Possible Causes:**
1. Not authenticated with gcloud
2. Application Default Credentials not set
3. Wrong Google account

**Solutions:**

**Authenticate:**
```bash
# Login with your Google account
gcloud auth login

# Set application default credentials
gcloud auth application-default login

# Verify authentication
gcloud auth list
```

**Check Active Account:**
```bash
gcloud config get-value account
# Should show your email
```

**Set Correct Project:**
```bash
gcloud config set project YOUR_PROJECT_ID
gcloud config get-value project
```

---

### Issue 3: API Not Enabled

**Symptoms:**
```
Error: API [aiplatform.googleapis.com] not enabled
Error: 403 Forbidden
```

**Possible Causes:**
1. Vertex AI API not enabled
2. Billing not enabled on project
3. Insufficient permissions

**Solutions:**

**Enable APIs:**
```bash
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable compute.googleapis.com
```

**Verify APIs Enabled:**
```bash
gcloud services list --enabled | grep -E "aiplatform|storage|compute"
```

**Check Billing:**
```bash
gcloud beta billing projects describe YOUR_PROJECT_ID
# Should show billing account linked
```

**Enable Billing:**
- Go to: https://console.cloud.google.com/billing
- Link billing account to project

---

## Dependency Issues

### Issue 4: Module Import Errors

**Symptoms:**
```python
ModuleNotFoundError: No module named 'google.cloud.aiplatform'
ImportError: cannot import name 'VertexAI'
```

**Possible Causes:**
1. Dependencies not installed
2. Wrong virtual environment
3. Outdated package versions

**Solutions:**

**Install Dependencies:**
```bash
cd tushar-backend
source venv/bin/activate
pip install -r requirements.txt
```

**Verify Installation:**
```bash
pip list | grep google-cloud
# Should show:
# google-cloud-aiplatform  1.38.0
# google-cloud-storage     2.10.0
```

**Reinstall if Needed:**
```bash
pip uninstall google-cloud-aiplatform google-cloud-storage
pip install google-cloud-aiplatform>=1.38.0 google-cloud-storage>=2.10.0
```

**Check Python Version:**
```bash
python --version
# Should be 3.11 or higher
```

---

### Issue 5: Version Conflicts

**Symptoms:**
```
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed
ERROR: google-cloud-aiplatform 1.38.0 requires protobuf>=3.19.0
```

**Possible Causes:**
1. Conflicting package versions
2. Outdated pip

**Solutions:**

**Upgrade pip:**
```bash
pip install --upgrade pip setuptools wheel
```

**Clean Install:**
```bash
pip freeze > old_requirements.txt
pip uninstall -y -r old_requirements.txt
pip install -r requirements.txt
```

**Use Virtual Environment:**
```bash
deactivate
rm -rf venv
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## Embedding Generation Issues

### Issue 6: Quota Exceeded

**Symptoms:**
```
Error: 429 Too Many Requests
Quota exceeded for quota metric 'Embedding requests per minute'
```

**Possible Causes:**
1. Too many API calls in short time
2. Insufficient quota
3. Not using caching

**Solutions:**

**Implement Rate Limiting:**
```python
import time
from functools import wraps

def rate_limit(max_per_minute):
    min_interval = 60.0 / max_per_minute
    last_called = [0.0]
    
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            if left_to_wait > 0:
                await asyncio.sleep(left_to_wait)
            ret = await func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator
```

**Use Caching:**
```python
# Check cache before API call
cached = embedding_cache.get(text)
if cached:
    return cached
```

**Request Quota Increase:**
- Go to: https://console.cloud.google.com/iam-admin/quotas
- Search for "Vertex AI API"
- Request increase

**Batch Requests:**
```python
# Instead of 10 separate calls
embeddings = await generate_batch_embeddings(texts)
```

---

### Issue 7: Text Too Long

**Symptoms:**
```
Error: 400 Bad Request
Text exceeds maximum length of 3000 characters
```

**Possible Causes:**
1. Input text > 3000 characters
2. Not chunking long content

**Solutions:**

**Validate Input:**
```python
def validate_text(text: str, max_length: int = 3000):
    if len(text) > max_length:
        raise ValueError(f"Text too long: {len(text)} chars (max {max_length})")
    return text
```

**Chunk Long Text:**
```python
def chunk_text(text: str, max_length: int = 2500):
    """Chunk text into smaller pieces with overlap."""
    chunks = []
    words = text.split()
    current_chunk = []
    current_length = 0
    
    for word in words:
        word_length = len(word) + 1  # +1 for space
        if current_length + word_length > max_length:
            chunks.append(' '.join(current_chunk))
            current_chunk = [word]
            current_length = word_length
        else:
            current_chunk.append(word)
            current_length += word_length
    
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks
```

---

### Issue 8: Embedding Generation Slow

**Symptoms:**
- Single embedding takes > 2 seconds
- Batch embedding takes > 10 seconds

**Possible Causes:**
1. Network latency
2. Not using async/await
3. Not batching requests
4. Cold start (first request)

**Solutions:**

**Use Async/Await:**
```python
# Slow (synchronous)
def generate_embedding(text):
    return client.generate_embedding(text)

# Fast (asynchronous)
async def generate_embedding(text):
    return await client.generate_embedding_async(text)
```

**Batch Requests:**
```python
# Slow: 10 sequential calls (10 seconds)
for text in texts:
    embedding = await generate_embedding(text)

# Fast: 1 batch call (1 second)
embeddings = await generate_batch_embeddings(texts)
```

**Use Connection Pooling:**
```python
# Reuse client connection
client = get_vertex_ai_client()  # Singleton

# Don't create new client each time
# client = VertexAI(...)  # ❌ Slow
```

**Warm Up Cache:**
```python
# Generate embeddings for common queries at startup
@app.on_event("startup")
async def warm_up_cache():
    common_queries = ["calculus", "physics", "chemistry"]
    await generate_batch_embeddings(common_queries)
```

---

## Vector Search Index Issues

### Issue 9: Index Creation Failed

**Symptoms:**
```
Error: Index creation failed
Error: Invalid index configuration
```

**Possible Causes:**
1. Invalid configuration
2. Insufficient permissions
3. Billing not enabled
4. Wrong region

**Solutions:**

**Check Configuration:**
```json
{
  "displayName": "mentor-ai-syllabus-index",
  "metadata": {
    "contentsDeltaUri": "gs://your-bucket/embeddings/",
    "config": {
      "dimensions": 768,
      "approximateNeighborsCount": 150,
      "distanceMeasureType": "DOT_PRODUCT_DISTANCE"
    }
  }
}
```

**Verify Bucket Exists:**
```bash
gsutil ls gs://your-bucket/embeddings/
```

**Check Permissions:**
```bash
gcloud projects get-iam-policy YOUR_PROJECT_ID
# Should have: roles/aiplatform.user
```

**Add Permission if Missing:**
```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="user:your-email@gmail.com" \
  --role="roles/aiplatform.user"
```

---

### Issue 10: Index Deployment Stuck

**Symptoms:**
- Index status stuck at "CREATING" for > 1 hour
- Deployment never completes

**Possible Causes:**
1. Large dataset (normal for first deployment)
2. Index configuration issues
3. Resource constraints

**Solutions:**

**Check Status:**
```bash
gcloud ai indexes describe YOUR_INDEX_ID --region=us-central1
```

**Expected Timeline:**
- Index creation: 15-30 minutes
- Index deployment: 10-20 minutes
- Total: 25-50 minutes

**If Stuck > 1 Hour:**
```bash
# Cancel and recreate
gcloud ai indexes delete YOUR_INDEX_ID --region=us-central1
# Then recreate with correct configuration
```

**Check Logs:**
```bash
gcloud logging read "resource.type=aiplatform.googleapis.com/Index" \
  --limit=50 \
  --format=json
```

---

### Issue 11: No Search Results

**Symptoms:**
```json
{
  "results": [],
  "total_results": 0
}
```

**Possible Causes:**
1. Index is empty (no vectors)
2. Filters too restrictive
3. Query embedding generation failed
4. Index not deployed

**Solutions:**

**Check Index Has Vectors:**
```bash
gcloud ai indexes describe YOUR_INDEX_ID --region=us-central1
# Check: indexStats.vectorsCount > 0
```

**Verify Index Deployed:**
```bash
gcloud ai index-endpoints describe YOUR_ENDPOINT_ID --region=us-central1
# Should show deployed index
```

**Test Without Filters:**
```bash
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -d '{"query": "calculus", "top_k": 10}'
# No filters - should return results
```

**Check Query Embedding:**
```bash
curl -X POST http://localhost:8000/api/vector-search/embeddings/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "calculus"}'
# Should return 768-dimensional vector
```

**Upload Embeddings:**
```bash
# Ensure embeddings are uploaded to bucket
gsutil ls gs://your-bucket/embeddings/
```

---


## Search Quality Issues

### Issue 12: Low Similarity Scores

**Symptoms:**
- All similarity scores < 0.5
- Results don't seem relevant

**Possible Causes:**
1. Embeddings not normalized
2. Wrong distance metric
3. Query and index use different models
4. Poor quality syllabus data

**Solutions:**

**Normalize Embeddings:**
```python
import numpy as np

def normalize_embedding(embedding: List[float]) -> List[float]:
    """Normalize embedding to unit length."""
    norm = np.linalg.norm(embedding)
    if norm == 0:
        return embedding
    return (np.array(embedding) / norm).tolist()
```

**Check Distance Metric:**
```python
# Ensure index uses DOT_PRODUCT_DISTANCE
# And embeddings are normalized
```

**Verify Same Model:**
```python
# Index embeddings: textembedding-gecko@003
# Query embeddings: textembedding-gecko@003
# Must match!
```

**Improve Syllabus Data:**
```json
// Bad: Too short, no context
{
  "topic": "Limits"
}

// Good: Descriptive, with context
{
  "topic": "Limits and Continuity in Calculus",
  "description": "Study of limits, continuity, and differentiability of functions"
}
```

---

### Issue 13: Irrelevant Results

**Symptoms:**
- Query "calculus" returns chemistry topics
- Results don't match query intent

**Possible Causes:**
1. Filters not applied
2. Metadata incorrect
3. Syllabus data has errors
4. Top-k too high

**Solutions:**

**Apply Filters:**
```python
# Always filter by exam and subject
results = await search_topics(
    query="calculus",
    top_k=10,
    filters={
        "exam": "JEE_MAIN",
        "subject": "Mathematics"  # ← Important!
    }
)
```

**Verify Metadata:**
```python
# Check syllabus JSON has correct metadata
{
  "topic": "Limits and Continuity",
  "metadata": {
    "exam": "JEE_MAIN",
    "subject": "Mathematics",  # ← Must be correct
    "chapter": "Calculus"
  }
}
```

**Use Appropriate top_k:**
```python
# Too high: Returns irrelevant results
top_k = 100  # ❌

# Good: Returns most relevant
top_k = 10  # ✅
```

**Re-rank Results:**
```python
def re_rank_results(results, min_score=0.7):
    """Filter out low-scoring results."""
    return [r for r in results if r.similarity_score >= min_score]
```

---

## Performance Issues

### Issue 14: Slow API Responses

**Symptoms:**
- Embedding generation > 2 seconds
- Search queries > 500ms
- Timeout errors

**Possible Causes:**
1. Not using cache
2. Synchronous calls
3. Network latency
4. Index not optimized

**Solutions:**

**Enable Caching:**
```python
# Check cache first
cached = embedding_cache.get(text)
if cached:
    return cached  # < 1ms

# Only call API if not cached
embedding = await generate_embedding(text)
embedding_cache.set(text, embedding)
```

**Use Async/Await:**
```python
# Slow (blocks)
def search(query):
    embedding = generate_embedding(query)
    results = search_index(embedding)
    return results

# Fast (non-blocking)
async def search(query):
    embedding = await generate_embedding(query)
    results = await search_index(embedding)
    return results
```

**Optimize Index:**
```bash
# Increase leafNodesToSearchPercent for faster queries
# (at cost of slightly lower accuracy)
"leafNodesToSearchPercent": 5  # Faster
"leafNodesToSearchPercent": 10  # Slower but more accurate
```

**Use Closer Region:**
```bash
# If you're in India, use asia-south1
GOOGLE_CLOUD_LOCATION=asia-south1

# If you're in US, use us-central1
GOOGLE_CLOUD_LOCATION=us-central1
```

---

### Issue 15: High API Costs

**Symptoms:**
- Unexpected high bills
- Quota exhausted quickly

**Possible Causes:**
1. Not using cache
2. Regenerating same embeddings
3. Too many API calls
4. Unused indexes deployed

**Solutions:**

**Monitor Cache Hit Rate:**
```python
cache_stats = embedding_cache.get_stats()
print(f"Hit rate: {cache_stats['hit_rate']}")
# Should be > 60%
```

**Batch Requests:**
```python
# Expensive: 100 API calls
for text in texts:
    embedding = await generate_embedding(text)

# Cheap: 1 API call
embeddings = await generate_batch_embeddings(texts)
```

**Delete Unused Indexes:**
```bash
# List all indexes
gcloud ai indexes list --region=us-central1

# Delete unused ones
gcloud ai indexes delete UNUSED_INDEX_ID --region=us-central1
```

**Set Up Billing Alerts:**
- Go to: https://console.cloud.google.com/billing
- Set budget alert at $10, $50, $100

**Estimate Costs:**
```
Embedding generation: $0.025 per 1000 characters
- 100,000 characters = $2.50

Vector Search queries: $0.50 per 1000 queries
- 10,000 queries = $5.00

Index storage: $0.30 per GB per month
- 1 GB = $0.30/month

Total for development: ~$8/month
```

---

## Data Issues

### Issue 16: Syllabus File Not Found

**Symptoms:**
```
Error: FileNotFoundError: [Errno 2] No such file or directory: 'data/syllabus/jee_math.json'
```

**Possible Causes:**
1. File not created
2. Wrong file path
3. File in wrong location

**Solutions:**

**Check File Exists:**
```bash
ls -la tushar-backend/data/syllabus/
# Should show: jee_math.json, jee_physics.json, etc.
```

**Create Missing Files:**
```bash
mkdir -p tushar-backend/data/syllabus
# Then create JSON files from PROMPTS.md
```

**Verify File Path:**
```python
import os
from pathlib import Path

# Get absolute path
syllabus_dir = Path(__file__).parent / "data" / "syllabus"
print(f"Looking for syllabus in: {syllabus_dir}")
print(f"Exists: {syllabus_dir.exists()}")
```

---

### Issue 17: Invalid JSON Format

**Symptoms:**
```
Error: JSONDecodeError: Expecting property name enclosed in double quotes
```

**Possible Causes:**
1. Syntax error in JSON
2. Missing commas or brackets
3. Trailing commas

**Solutions:**

**Validate JSON:**
```bash
# Use jq to validate
cat data/syllabus/jee_math.json | jq .
# If valid, will pretty-print JSON
# If invalid, will show error
```

**Common JSON Errors:**
```json
// ❌ Trailing comma
{
  "exam": "JEE_MAIN",
  "subject": "Mathematics",  ← Remove this comma
}

// ✅ Correct
{
  "exam": "JEE_MAIN",
  "subject": "Mathematics"
}

// ❌ Single quotes
{
  'exam': 'JEE_MAIN'
}

// ✅ Double quotes
{
  "exam": "JEE_MAIN"
}
```

**Use JSON Validator:**
- Online: https://jsonlint.com/
- Paste your JSON and check for errors

---

## Environment Variable Issues

### Issue 18: Missing Environment Variables

**Symptoms:**
```
Error: GOOGLE_CLOUD_PROJECT environment variable not set
KeyError: 'VERTEX_AI_INDEX_ID'
```

**Possible Causes:**
1. .env file not created
2. Variables not set
3. .env not loaded

**Solutions:**

**Create .env File:**
```bash
cd tushar-backend
cat > .env << EOF
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_CLOUD_STORAGE_BUCKET=your-bucket-name
VERTEX_AI_INDEX_ID=your-index-id
VERTEX_AI_INDEX_ENDPOINT_ID=your-endpoint-id
VERTEX_AI_DEPLOYED_INDEX_ID=mentor-ai-syllabus-deployed
VERTEX_AI_EMBEDDING_MODEL=textembedding-gecko@003
VERTEX_AI_EMBEDDING_DIMENSIONS=768
EOF
```

**Load .env in Code:**
```python
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Access variables
project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
if not project_id:
    raise ValueError("GOOGLE_CLOUD_PROJECT not set")
```

**Verify Variables Loaded:**
```python
import os
print("Environment variables:")
for key in ["GOOGLE_CLOUD_PROJECT", "VERTEX_AI_INDEX_ID"]:
    print(f"{key}: {os.getenv(key)}")
```

---

## Testing Issues

### Issue 19: Authentication Token Missing

**Symptoms:**
```
Error: 401 Unauthorized
Missing Authorization header
```

**Possible Causes:**
1. No token in request
2. Token expired
3. Wrong token format

**Solutions:**

**Get Test Token:**
```bash
# From Day 2 authentication
curl -X POST http://localhost:8000/api/auth/login/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Copy the token from response
```

**Use Token in Requests:**
```bash
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"query": "calculus", "top_k": 5}'
```

**For Testing, Disable Auth:**
```python
# In router (ONLY FOR TESTING!)
@router.post("/query")
async def search_topics(request: SearchRequest):
    # Remove: dependencies=[Depends(verify_token)]
    ...
```

---

### Issue 20: Backend Server Won't Start

**Symptoms:**
```
Error: Address already in use
Error: Module not found
```

**Possible Causes:**
1. Port 8000 already in use
2. Missing dependencies
3. Syntax errors in code

**Solutions:**

**Check Port:**
```bash
lsof -i :8000
# If shows process, kill it:
kill -9 PID
```

**Use Different Port:**
```bash
uvicorn main:app --reload --port 8001
```

**Check Dependencies:**
```bash
pip install -r requirements.txt
```

**Check for Syntax Errors:**
```bash
python -m py_compile main.py
# If no output, syntax is correct
```

**Check Logs:**
```bash
uvicorn main:app --reload --log-level debug
# Look for specific error messages
```

---

## Getting Help

### When to Ask for Help

Ask for help if:
- Issue persists after trying all solutions
- Error message not covered in this guide
- Unclear what's causing the problem

### What to Include

When asking for help, provide:
1. **Error message** (full text)
2. **What you tried** (solutions attempted)
3. **Environment** (OS, Python version, package versions)
4. **Code snippet** (relevant code)
5. **Logs** (server logs, error traces)

### Where to Get Help

- **Google Cloud Support**: https://cloud.google.com/support
- **Stack Overflow**: Tag with `google-cloud-vertex-ai`
- **GitHub Issues**: For code-specific problems
- **Team/Mentor**: For project-specific questions

---

## Prevention Tips

### Best Practices to Avoid Issues

1. **Always use virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. **Pin dependency versions**
   ```
   google-cloud-aiplatform==1.38.0  # Not >=1.38.0
   ```

3. **Validate input before API calls**
   ```python
   if len(text) > 3000:
       raise ValueError("Text too long")
   ```

4. **Use caching aggressively**
   ```python
   cached = cache.get(key)
   if cached:
       return cached
   ```

5. **Implement retry logic**
   ```python
   for attempt in range(3):
       try:
           return await api_call()
       except TransientError:
           await asyncio.sleep(2 ** attempt)
   ```

6. **Monitor costs and quotas**
   - Set up billing alerts
   - Check quota usage regularly
   - Use caching to reduce API calls

7. **Test incrementally**
   - Test each component separately
   - Don't wait until everything is built
   - Fix issues as they arise

8. **Keep logs**
   ```python
   logger.info(f"API call: {endpoint}")
   logger.error(f"Error: {error}", exc_info=True)
   ```

---

## Summary

Common issues and quick fixes:

| Issue | Quick Fix |
|-------|-----------|
| Authentication failed | `gcloud auth application-default login` |
| API not enabled | `gcloud services enable aiplatform.googleapis.com` |
| Module not found | `pip install -r requirements.txt` |
| Quota exceeded | Use caching, batch requests |
| Text too long | Chunk text, validate input |
| No search results | Check index deployed, remove filters |
| Slow responses | Use async/await, enable caching |
| High costs | Monitor usage, delete unused indexes |

**Still stuck?** Check AI-INTEGRATION.md for detailed explanations or ask for help with full error details.

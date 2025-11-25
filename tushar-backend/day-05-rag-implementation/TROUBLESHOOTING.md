# Troubleshooting Guide for Day 5: RAG Implementation

## Common Issues

---

### Issue 1: Gemini API Authentication Failed

**Symptoms**:
- Error: "401 Unauthorized"
- Error: "Permission denied"
- Error: "Could not load default credentials"

**Possible Causes**:
1. Application Default Credentials not set
2. Service account doesn't have Vertex AI permissions
3. Wrong project ID in environment variables

**Solutions**:

**Solution 1**: Set up Application Default Credentials
```bash
# Authenticate with your Google account
gcloud auth application-default login

# Or use service account
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
```

**Solution 2**: Grant Vertex AI permissions
```bash
# Grant Vertex AI User role
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
  --role="roles/aiplatform.user"
```

**Solution 3**: Verify environment variables
```bash
# Check .env file
cat tushar-backend/.env | grep GOOGLE_CLOUD_PROJECT

# Should show your project ID
```

**Verification**:
```bash
cd tushar-backend
python test_gemini.py
# Should print "✓ Gemini API is working!"
```

---

### Issue 2: Gemini API Quota Exceeded

**Symptoms**:
- Error: "429 Too Many Requests"
- Error: "Quota exceeded for quota metric"
- Slow or failed generation

**Possible Causes**:
1. Free tier quota exhausted
2. Too many requests in short time
3. No billing account linked

**Solutions**:

**Solution 1**: Check quota usage
```bash
# View quotas in Google Cloud Console
# IAM & Admin → Quotas → Filter: "Vertex AI"
```

**Solution 2**: Implement rate limiting
```python
# Add to gemini_service.py
import time
from collections import deque

class GeminiService:
    def __init__(self):
        self.request_times = deque(maxlen=60)  # Track last 60 requests
        self.max_requests_per_minute = 60
    
    def _check_rate_limit(self):
        now = time.time()
        # Remove requests older than 1 minute
        while self.request_times and now - self.request_times[0] > 60:
            self.request_times.popleft()
        
        # Check if at limit
        if len(self.request_times) >= self.max_requests_per_minute:
            wait_time = 60 - (now - self.request_times[0])
            time.sleep(wait_time)
        
        self.request_times.append(now)
```

**Solution 3**: Request quota increase
1. Go to Google Cloud Console → IAM & Admin → Quotas
2. Filter for "Vertex AI" quotas
3. Select quota to increase
4. Click "Edit Quotas" and submit request

**Solution 4**: Enable billing
```bash
# Link billing account to project
gcloud billing projects link PROJECT_ID \
  --billing-account=BILLING_ACCOUNT_ID
```

**Verification**:
```bash
# Check if billing is enabled
gcloud billing projects describe PROJECT_ID
```

---

### Issue 3: Vector Search Returns No Results

**Symptoms**:
- Empty search results
- Error: "No content found for topic"
- RAG pipeline fails at retrieval step

**Possible Causes**:
1. Vector Search index not deployed (Day 4 incomplete)
2. Query doesn't match any syllabus content
3. Filters too restrictive
4. Index is empty

**Solutions**:

**Solution 1**: Verify Vector Search is working
```bash
# Test Vector Search endpoint
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Limits", "top_k": 5}'
```

**Solution 2**: Check index status
```bash
# Check if index is deployed
gcloud ai indexes list --region=us-central1
```

**Solution 3**: Broaden search query
```python
# Instead of specific query
results = vector_search("Limits and Continuity")

# Try broader query
results = vector_search("Calculus")
```

**Solution 4**: Remove or relax filters
```python
# Too restrictive
results = vector_search(
    "Limits",
    filters={"exam": "JEE_MAIN", "subject": "Mathematics", "difficulty": "hard"}
)

# More relaxed
results = vector_search(
    "Limits",
    filters={"exam": "JEE_MAIN"}
)
```

**Verification**:
```python
from services.vector_search_service import VectorSearchService

vs = VectorSearchService()
results = vs.search("Limits", top_k=5)
print(f"Found {len(results)} results")
for r in results:
    print(f"- {r['text'][:50]}... (score: {r['score']:.2f})")
```

---

### Issue 4: LLM Response Not Parseable

**Symptoms**:
- Error: "Could not extract JSON from response"
- Empty questions list after parsing
- Malformed JSON errors

**Possible Causes**:
1. LLM returning text instead of JSON
2. JSON wrapped in unexpected format
3. LLM adding extra commentary
4. Invalid JSON syntax

**Solutions**:

**Solution 1**: Strengthen prompt instructions
```python
# Add to prompt template
prompt = f"""
CRITICAL: Return ONLY a JSON array. No extra text before or after.
Do NOT add explanations or commentary.
Do NOT wrap in markdown code blocks.

Return this exact format:
[{{"question": "...", "options": {{}}, ...}}]

JSON array:
"""
```

**Solution 2**: Improve parser robustness
```python
# Add to response_parser.py
def parse_response(self, text: str) -> List[dict]:
    # Try multiple extraction methods
    
    # Method 1: Direct JSON
    try:
        return json.loads(text)
    except:
        pass
    
    # Method 2: Extract from markdown
    patterns = [
        r'```json\n(.*?)\n```',
        r'```\n(.*?)\n```',
        r'\[.*\]'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1) if '```' in pattern else match.group(0))
            except:
                continue
    
    # Method 3: Clean and retry
    cleaned = text.strip()
    cleaned = re.sub(r'^[^[]*', '', cleaned)  # Remove before [
    cleaned = re.sub(r'[^\]]*$', '', cleaned)  # Remove after ]
    try:
        return json.loads(cleaned)
    except:
        pass
    
    return []
```

**Solution 3**: Log raw responses for debugging
```python
# Add logging
import logging
logger = logging.getLogger(__name__)

response = gemini_client.generate_content(prompt)
logger.debug(f"Raw LLM response: {response}")

questions = parser.parse_response(response)
if not questions:
    logger.error(f"Failed to parse response: {response[:500]}")
```

**Verification**:
```python
# Test parser with various formats
test_responses = [
    '[{"question": "..."}]',  # Direct JSON
    '```json\n[{"question": "..."}]\n```',  # Markdown
    'Here are the questions:\n[{"question": "..."}]',  # With text
]

parser = ResponseParser()
for resp in test_responses:
    questions = parser.parse_response(resp)
    print(f"Parsed {len(questions)} questions")
```

---

### Issue 5: All Questions Fail Validation

**Symptoms**:
- Questions generated but all marked invalid
- Quality scores below threshold
- Empty results returned to user

**Possible Causes**:
1. Validation rules too strict
2. LLM generating poor quality questions
3. Context not being used by LLM
4. Validation checking wrong criteria

**Solutions**:

**Solution 1**: Review validation rules
```python
# Check current thresholds
validator = QuestionValidator()
print(f"Min quality score: {validator.min_quality_score}")
print(f"Min question length: {validator.min_question_length}")

# Adjust if too strict
validator.min_quality_score = 60  # Lower from 70
validator.min_question_length = 15  # Lower from 20
```

**Solution 2**: Improve prompt quality
```python
# Add explicit quality requirements to prompt
prompt += """
QUALITY REQUIREMENTS:
1. Question must be clear and unambiguous
2. All 4 options must be distinct and plausible
3. Correct answer must be verifiable
4. Explanation must show step-by-step reasoning
5. Use concepts from syllabus content provided

Before returning, verify each question meets these requirements.
"""
```

**Solution 3**: Check if LLM is using context
```python
# Add context usage check
def validate_context_usage(question, context):
    # Extract key terms from context
    context_terms = set(re.findall(r'\b\w{5,}\b', context.lower()))
    
    # Extract terms from question
    question_text = question['question'].lower()
    question_terms = set(re.findall(r'\b\w{5,}\b', question_text))
    
    # Check overlap
    overlap = len(context_terms & question_terms)
    print(f"Context terms: {len(context_terms)}")
    print(f"Question terms: {len(question_terms)}")
    print(f"Overlap: {overlap}")
    
    return overlap >= 2
```

**Solution 4**: Log validation failures
```python
# Add detailed logging
for q in questions:
    is_valid, score, issues = validator.validate(q, context)
    if not is_valid:
        logger.warning(f"Question failed validation (score: {score})")
        logger.warning(f"Issues: {issues}")
        logger.warning(f"Question: {q['question'][:100]}")
```

**Verification**:
```bash
# Check validation logs
tail -f logs/app.log | grep "validation"
```

---

### Issue 6: Slow Generation (>10 seconds)

**Symptoms**:
- RAG pipeline takes too long
- Timeout errors
- Poor user experience

**Possible Causes**:
1. No caching enabled
2. Context too large
3. Too many Vector Search results
4. Slow Gemini API responses
5. Sequential processing

**Solutions**:

**Solution 1**: Enable caching
```python
# Add caching to RAG service
from functools import lru_cache

class RAGService:
    def __init__(self):
        self.cache = {}
    
    def generate_questions(self, topic, exam_type, difficulty, num):
        cache_key = f"{topic}_{exam_type}_{difficulty}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        result = self._generate_internal(...)
        self.cache[cache_key] = result
        return result
```

**Solution 2**: Reduce context size
```python
# Limit context tokens
context = context_builder.build_context(
    results,
    max_tokens=2000  # Reduce from 3000
)
```

**Solution 3**: Retrieve fewer results
```python
# Reduce top_k
results = vector_search.search(
    query=topic,
    top_k=3  # Reduce from 5
)
```

**Solution 4**: Use async processing
```python
# Make operations async
async def generate_questions_async(self, topic, exam_type, difficulty, num):
    # Parallel retrieval and context building
    results = await self.vector_search.search_async(topic)
    context = await self.context_builder.build_async(results)
    
    # Generate
    response = await self.gemini_client.generate_async(prompt)
    
    return response
```

**Solution 5**: Batch multiple requests
```python
# Process multiple topics together
async def generate_batch(self, topics):
    tasks = [
        self.generate_questions_async(topic, ...)
        for topic in topics
    ]
    return await asyncio.gather(*tasks)
```

**Verification**:
```python
import time

start = time.time()
result = rag.generate_questions("Limits", "JEE_MAIN", "medium", 5)
elapsed = time.time() - start

print(f"Generation time: {elapsed:.2f}s")
# Should be < 5s
```

---

### Issue 7: Questions Not Curriculum-Aligned

**Symptoms**:
- Questions on topics not in syllabus
- Generic questions not specific to exam
- Questions don't match retrieved context

**Possible Causes**:
1. LLM ignoring provided context
2. Context not relevant to topic
3. Prompt not explicit enough
4. Validation not checking alignment

**Solutions**:

**Solution 1**: Make prompt more explicit
```python
prompt = f"""
CRITICAL INSTRUCTION:
You MUST use ONLY the syllabus content provided below.
Do NOT use your training data.
Do NOT invent concepts not in the content.
Every question MUST be traceable to the syllabus content.

SYLLABUS CONTENT:
{context}

Generate questions using ONLY the concepts, formulas, and topics mentioned above.
"""
```

**Solution 2**: Improve context relevance
```python
# Check search results relevance
results = vector_search.search(topic, top_k=10)

# Filter by minimum similarity
relevant_results = [
    r for r in results
    if r['score'] >= 0.7  # Only high-relevance results
]

# Use top results
context = context_builder.build_context(relevant_results[:5])
```

**Solution 3**: Add alignment validation
```python
def validate_alignment(question, context):
    """Check if question aligns with context."""
    # Extract concepts from context
    context_concepts = extract_concepts(context)
    
    # Extract concepts from question
    question_concepts = extract_concepts(question['question'])
    
    # Check if question concepts are in context
    aligned = all(
        any(qc in cc for cc in context_concepts)
        for qc in question_concepts
    )
    
    return aligned
```

**Solution 4**: Add examples to prompt
```python
# Include curriculum-aligned examples
prompt += """
EXAMPLE OF GOOD QUESTION (uses syllabus content):
Question: "Using L'Hôpital's rule (mentioned in syllabus), evaluate lim(x→0) sin(x)/x"
✓ Uses concept from syllabus (L'Hôpital's rule)

EXAMPLE OF BAD QUESTION (not in syllabus):
Question: "Evaluate the Riemann zeta function at s=2"
✗ Riemann zeta function not in JEE syllabus
"""
```

**Verification**:
```python
# Manual review
for q in questions:
    print(f"\nQuestion: {q['question']}")
    print("Is this in JEE syllabus? (y/n)")
    response = input()
    if response.lower() != 'y':
        print("⚠️ Question not curriculum-aligned!")
```

---

### Issue 8: Firestore Storage Failing

**Symptoms**:
- Error: "Permission denied"
- Error: "Collection not found"
- Questions not persisting

**Possible Causes**:
1. Firestore not initialized
2. Service account lacks permissions
3. Collection doesn't exist
4. Invalid document structure

**Solutions**:

**Solution 1**: Initialize Firestore
```python
# Check initialization
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("✓ Firestore initialized")
```

**Solution 2**: Grant Firestore permissions
```bash
# Grant Cloud Datastore User role
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
  --role="roles/datastore.user"
```

**Solution 3**: Create collection
```python
# Create test document to initialize collection
db.collection("questions").add({
    "test": True,
    "created_at": firestore.SERVER_TIMESTAMP
})
print("✓ Collection created")
```

**Solution 4**: Validate document structure
```python
# Ensure all required fields present
def store_question(question):
    doc_data = {
        "question": question['question'],
        "options": question['options'],
        "correct_answer": question['correct_answer'],
        "explanation": question['explanation'],
        "difficulty": question['difficulty'],
        "topic": question['topic'],
        "exam_type": question.get('exam_type', 'UNKNOWN'),
        "subject": question.get('subject', 'UNKNOWN'),
        "metadata": question.get('metadata', {}),
        "created_at": firestore.SERVER_TIMESTAMP
    }
    
    db.collection("questions").add(doc_data)
```

**Verification**:
```python
# Test Firestore write
test_doc = {
    "test": True,
    "timestamp": firestore.SERVER_TIMESTAMP
}

doc_ref = db.collection("questions").add(test_doc)
print(f"✓ Document created: {doc_ref[1].id}")

# Test Firestore read
docs = db.collection("questions").limit(1).get()
print(f"✓ Found {len(docs)} documents")
```

---

## Debug Checklist

When RAG pipeline fails, check in this order:

1. **Environment**
   - [ ] `.env` file has all required variables
   - [ ] Dependencies installed (`pip install -r requirements.txt`)
   - [ ] Backend server running

2. **Authentication**
   - [ ] Google Cloud credentials set up
   - [ ] Service account has required permissions
   - [ ] APIs enabled (Vertex AI, Gemini)

3. **Vector Search (Day 4)**
   - [ ] Index deployed and operational
   - [ ] Search endpoint responding
   - [ ] Returns relevant results

4. **Gemini API**
   - [ ] API enabled
   - [ ] Quota available
   - [ ] Test script works

5. **RAG Components**
   - [ ] Context builder formats correctly
   - [ ] Prompt templates complete
   - [ ] Response parser handles various formats
   - [ ] Validator has reasonable thresholds

6. **Storage**
   - [ ] Firestore initialized
   - [ ] Collection exists
   - [ ] Write permissions granted

---

## Getting Help

If you're still stuck:

1. **Check logs**:
   ```bash
   tail -f logs/app.log
   ```

2. **Enable debug logging**:
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

3. **Test components individually**:
   - Test Gemini client alone
   - Test Vector Search alone
   - Test parser with sample responses
   - Test validator with sample questions

4. **Review error messages carefully**:
   - Note exact error text
   - Check which component failed
   - Look for stack traces

5. **Compare with working examples**:
   - Check TESTING.md for working test cases
   - Compare your code with examples
   - Verify configuration matches examples

---

## Prevention Tips

Avoid issues by:

1. **Test incrementally**: Test each component as you build it
2. **Use logging**: Add logs at each step of pipeline
3. **Validate inputs**: Check inputs before processing
4. **Handle errors**: Add try-catch blocks with meaningful messages
5. **Monitor metrics**: Track success rates and performance
6. **Cache aggressively**: Reduce API calls and improve speed
7. **Document assumptions**: Note what each component expects

---

## Next Steps

Issues resolved? Return to **TESTING.md** to verify everything works!

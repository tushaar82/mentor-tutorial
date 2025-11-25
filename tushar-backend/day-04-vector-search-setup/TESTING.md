# Testing Guide for Vector Search Setup

## Overview

This guide provides step-by-step tests to verify your vector search implementation works correctly. All tests can be run independently without the frontend.

**Total Time**: 45 minutes

---

## Prerequisites

Before testing, ensure:
- ✅ All code from PROMPTS.md is generated and saved
- ✅ All configuration from CONFIGURATION.md is complete
- ✅ Backend server is running: `uvicorn main:app --reload`
- ✅ Vertex AI index is deployed and ready

---

## Test 1: Verify Backend Server Starts

### What You're Testing
Backend server starts without errors and loads vector search routes.

### Steps

1. Start the backend server:
```bash
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload
```

2. Check server logs for vector search routes:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

3. Open API documentation:
```bash
# Open in browser
http://localhost:8000/docs
```

### Expected Result

You should see vector search endpoints in the API docs:
- `/api/vector-search/embeddings/generate`
- `/api/vector-search/embeddings/batch`
- `/api/vector-search/query`
- `/api/vector-search/syllabus/{exam}/{subject}`

### If It Fails

- **Error: Module not found**: Run `pip install -r requirements.txt`
- **Error: Import error**: Check all files are created in correct locations
- **Error: Vertex AI credentials**: Run `gcloud auth application-default login`

---


## Test 2: Generate Single Embedding

### What You're Testing
Embedding service can generate a single embedding using Vertex AI.

### Steps

```bash
curl -X POST http://localhost:8000/api/vector-search/embeddings/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "text": "Limits and Continuity in Calculus",
    "include_metadata": true
  }'
```

### Expected Result

```json
{
  "embedding": [0.0234, -0.0156, 0.0789, ...],
  "dimensions": 768,
  "model": "textembedding-gecko@003",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Key Points**:
- Embedding array has 768 numbers
- Values are between -1 and 1
- Model is textembedding-gecko@003

### If It Fails

- **Error 401**: Add valid Firebase token (from Day 2 authentication)
- **Error 500**: Check Vertex AI API is enabled
- **Error: Quota exceeded**: Wait a few minutes, you may have hit rate limits
- **Error: Invalid credentials**: Run `gcloud auth application-default login`

---

## Test 3: Generate Batch Embeddings

### What You're Testing
Embedding service can generate multiple embeddings efficiently.

### Steps

```bash
curl -X POST http://localhost:8000/api/vector-search/embeddings/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "texts": [
      "Differentiation and its applications",
      "Integration techniques",
      "Limits and Continuity",
      "Differential Equations"
    ]
  }'
```

### Expected Result

```json
{
  "embeddings": [
    {
      "embedding": [0.0234, -0.0156, ...],
      "dimensions": 768,
      "model": "textembedding-gecko@003"
    },
    {
      "embedding": [0.0189, -0.0234, ...],
      "dimensions": 768,
      "model": "textembedding-gecko@003"
    },
    ...
  ],
  "total_count": 4
}
```

**Key Points**:
- Returns 4 embeddings
- Each has 768 dimensions
- All use same model

### If It Fails

- **Error: Batch too large**: Reduce number of texts (max 100)
- **Error: Text too long**: Each text must be < 3000 characters
- **Timeout**: Batch processing takes time, increase timeout to 60 seconds

---

## Test 4: Check Embedding Cache

### What You're Testing
Embedding cache stores and retrieves embeddings to reduce API calls.

### Steps

1. Generate an embedding (first time):
```bash
curl -X POST http://localhost:8000/api/vector-search/embeddings/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "text": "Test caching with this text"
  }'
```

2. Generate the same embedding again (should be cached):
```bash
curl -X POST http://localhost:8000/api/vector-search/embeddings/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "text": "Test caching with this text"
  }'
```

3. Check cache statistics:
```bash
curl http://localhost:8000/api/vector-search/embeddings/status \
  -H "Authorization: Bearer YOUR_TEST_TOKEN"
```

### Expected Result

```json
{
  "service_status": "healthy",
  "cache_stats": {
    "total_entries": 1,
    "cache_hits": 1,
    "cache_misses": 1,
    "hit_rate": 0.5
  },
  "api_quota": {
    "requests_today": 2,
    "limit": 10000
  }
}
```

**Key Points**:
- Second request is faster (cached)
- Cache hit rate increases
- API quota shows reduced usage

---

## Test 5: Load Syllabus Data

### What You're Testing
Syllabus service can load and parse JEE/NEET syllabus files.

### Steps

```bash
curl http://localhost:8000/api/vector-search/syllabus/JEE_MAIN/Mathematics \
  -H "Authorization: Bearer YOUR_TEST_TOKEN"
```

### Expected Result

```json
{
  "exam": "JEE_MAIN",
  "subject": "Mathematics",
  "total_chapters": 5,
  "chapters": [
    {
      "name": "Calculus",
      "chapter_number": 1,
      "topics": [
        {
          "name": "Limits and Continuity",
          "subtopics": ["Limits", "Continuity", "Differentiability"],
          "weightage": 8,
          "difficulty": "medium"
        }
      ]
    }
  ]
}
```

**Key Points**:
- Returns structured syllabus data
- Includes chapters, topics, subtopics
- Has metadata (weightage, difficulty)

### If It Fails

- **Error 404**: Check syllabus file exists at `data/syllabus/jee_math.json`
- **Error: Invalid JSON**: Validate JSON syntax in syllabus files
- **Error: Missing fields**: Ensure all required fields are present

---


## Test 6: Get Syllabus Statistics

### What You're Testing
Syllabus service provides statistics about available content.

### Steps

```bash
curl http://localhost:8000/api/vector-search/syllabus/stats \
  -H "Authorization: Bearer YOUR_TEST_TOKEN"
```

### Expected Result

```json
{
  "total_exams": 2,
  "total_subjects": 4,
  "total_chapters": 20,
  "total_topics": 150,
  "exams": ["JEE_MAIN", "NEET"],
  "subjects": {
    "JEE_MAIN": ["Mathematics", "Physics", "Chemistry"],
    "NEET": ["Biology", "Physics", "Chemistry"]
  },
  "coverage": {
    "JEE_MAIN": {
      "Mathematics": 50,
      "Physics": 45,
      "Chemistry": 40
    },
    "NEET": {
      "Biology": 60
    }
  }
}
```

**Key Points**:
- Shows all available exams and subjects
- Provides topic counts
- Indicates syllabus coverage

---

## Test 7: Semantic Search Query

### What You're Testing
Vector search can find semantically similar topics.

### Steps

```bash
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "query": "I am weak in calculus and need help with derivatives",
    "top_k": 5
  }'
```

### Expected Result

```json
{
  "results": [
    {
      "topic": "Differentiation and its applications",
      "metadata": {
        "exam": "JEE_MAIN",
        "subject": "Mathematics",
        "chapter": "Calculus",
        "weightage": 9,
        "difficulty": "medium"
      },
      "similarity_score": 0.87,
      "rank": 1
    },
    {
      "topic": "Limits and Continuity",
      "metadata": {
        "exam": "JEE_MAIN",
        "subject": "Mathematics",
        "chapter": "Calculus",
        "weightage": 8,
        "difficulty": "medium"
      },
      "similarity_score": 0.82,
      "rank": 2
    }
  ],
  "query": "I am weak in calculus and need help with derivatives",
  "total_results": 5,
  "search_time_ms": 45.3
}
```

**Key Points**:
- Returns relevant calculus topics
- Similarity scores are high (> 0.8)
- Results are ranked by relevance
- Search is fast (< 100ms)

### If It Fails

- **Error: Index not found**: Check `VERTEX_AI_INDEX_ID` in `.env`
- **Error: Index not deployed**: Wait for deployment to complete (15-30 min)
- **Error: No results**: Index may be empty, check embeddings were uploaded
- **Timeout**: Increase timeout, first query may be slow

---

## Test 8: Filtered Semantic Search

### What You're Testing
Vector search can filter results by exam, subject, or difficulty.

### Steps

```bash
curl -X POST http://localhost:8000/api/vector-search/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "query": "electromagnetic waves and optics",
    "top_k": 5,
    "filters": {
      "exam": "JEE_MAIN",
      "subject": "Physics",
      "difficulty": "hard"
    }
  }'
```

### Expected Result

```json
{
  "results": [
    {
      "topic": "Wave Optics and Interference",
      "metadata": {
        "exam": "JEE_MAIN",
        "subject": "Physics",
        "chapter": "Optics",
        "weightage": 7,
        "difficulty": "hard"
      },
      "similarity_score": 0.89,
      "rank": 1
    }
  ],
  "query": "electromagnetic waves and optics",
  "total_results": 5,
  "search_time_ms": 38.7
}
```

**Key Points**:
- Only returns Physics topics
- Only returns hard difficulty
- Filters are applied correctly

---

## Test 9: Batch Search Queries

### What You're Testing
Vector search can handle multiple queries efficiently.

### Steps

```bash
curl -X POST http://localhost:8000/api/vector-search/query/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d '{
    "queries": [
      "organic chemistry reactions",
      "thermodynamics and heat transfer",
      "coordinate geometry problems"
    ],
    "top_k": 3
  }'
```

### Expected Result

```json
{
  "results": [
    {
      "query": "organic chemistry reactions",
      "results": [
        {
          "topic": "Organic Reaction Mechanisms",
          "similarity_score": 0.91,
          "rank": 1
        }
      ],
      "total_results": 3
    },
    {
      "query": "thermodynamics and heat transfer",
      "results": [
        {
          "topic": "Laws of Thermodynamics",
          "similarity_score": 0.88,
          "rank": 1
        }
      ],
      "total_results": 3
    }
  ]
}
```

**Key Points**:
- Returns results for all queries
- Each query has separate results
- Batch processing is efficient

---

## Test 10: Check Index Status

### What You're Testing
Vector search index is deployed and healthy.

### Steps

```bash
curl http://localhost:8000/api/vector-search/index/status \
  -H "Authorization: Bearer YOUR_TEST_TOKEN"
```

### Expected Result

```json
{
  "index_status": "deployed",
  "index_id": "your-index-id",
  "endpoint_id": "your-endpoint-id",
  "total_vectors": 150,
  "dimensions": 768,
  "last_updated": "2024-01-15T10:00:00Z",
  "health": "healthy",
  "query_latency_ms": 45.2
}
```

**Key Points**:
- Status is "deployed"
- Health is "healthy"
- Total vectors matches syllabus topics
- Query latency is reasonable (< 100ms)

### If It Fails

- **Status: "creating"**: Wait for index creation to complete
- **Status: "deploying"**: Wait for deployment to complete
- **Status: "error"**: Check Google Cloud Console for error details
- **Health: "unhealthy"**: Restart index endpoint

---

## Test Summary

Run all tests and check off completed ones:

- [ ] Test 1: Backend server starts ✓
- [ ] Test 2: Generate single embedding ✓
- [ ] Test 3: Generate batch embeddings ✓
- [ ] Test 4: Embedding cache works ✓
- [ ] Test 5: Load syllabus data ✓
- [ ] Test 6: Get syllabus statistics ✓
- [ ] Test 7: Semantic search query ✓
- [ ] Test 8: Filtered semantic search ✓
- [ ] Test 9: Batch search queries ✓
- [ ] Test 10: Check index status ✓

**All tests passing?** Proceed to **EXPECTED-OUTCOME.md** to verify success criteria.

---

## Performance Benchmarks

Expected performance for vector search:

| Operation | Expected Time | Acceptable Range |
|-----------|---------------|------------------|
| Single embedding | 200-500ms | < 1000ms |
| Batch embedding (10) | 1-2s | < 5s |
| Semantic search | 30-100ms | < 200ms |
| Batch search (5) | 100-300ms | < 500ms |
| Cache hit | < 1ms | < 10ms |

If your times are significantly higher, check:
- Network latency to Google Cloud
- Index deployment region (should match your location)
- Index configuration (ANN parameters)

---

## Next Steps

All tests passing? Move to **EXPECTED-OUTCOME.md** to verify you've achieved all success criteria.

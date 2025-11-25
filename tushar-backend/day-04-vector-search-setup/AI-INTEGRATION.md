# AI Integration Deep Dive: Vector Search

## Overview

This document provides a comprehensive explanation of how Vector Search works in the Mentor AI platform, including the underlying concepts, architecture, implementation details, and best practices.

---

## What is Vector Search?

### The Problem

Traditional keyword search has limitations:
- **Exact matching only**: "calculus" won't match "differentiation" or "integration"
- **No semantic understanding**: Can't understand that "weak in derivatives" relates to "differentiation techniques"
- **Poor for educational content**: Students describe problems in natural language, not exact syllabus terms

### The Solution: Vector Search

Vector Search converts text into numerical vectors (embeddings) that capture semantic meaning. Similar concepts have similar vectors, enabling semantic search.

**Example:**
```
Text: "Limits and Continuity"
Vector: [0.023, -0.156, 0.789, ..., 0.234]  (768 numbers)

Text: "Differentiation techniques"
Vector: [0.019, -0.142, 0.801, ..., 0.221]  (768 numbers)

Similarity: 0.87 (very similar - both are calculus topics)
```

---

## How Embeddings Work

### What are Embeddings?

Embeddings are dense vector representations of text where:
- Each dimension captures a semantic feature
- Similar meanings → similar vectors
- Distance between vectors = semantic similarity

### Embedding Model: textembedding-gecko@003

Google's textembedding-gecko@003 model:
- **Input**: Text (up to 3000 characters)
- **Output**: 768-dimensional vector
- **Training**: Trained on massive text corpus to understand semantic relationships
- **Multilingual**: Supports English, Hindi, and other languages

### Embedding Generation Process

```
1. Input Text: "Limits and Continuity in Calculus"
   ↓
2. Tokenization: ["Limits", "and", "Continuity", "in", "Calculus"]
   ↓
3. Model Processing: Neural network processes tokens
   ↓
4. Output Vector: [0.023, -0.156, 0.789, ..., 0.234]
   ↓
5. Normalization: Vector normalized to unit length
```

### Why 768 Dimensions?

- **Expressiveness**: 768 dimensions can capture complex semantic relationships
- **Balance**: Trade-off between expressiveness and computational efficiency
- **Standard**: Common dimension for transformer-based models (BERT, etc.)

---

## Vector Search Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mentor AI Backend                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Student    │         │   Syllabus   │                  │
│  │    Query     │         │     Data     │                  │
│  └──────┬───────┘         └──────┬───────┘                  │
│         │                        │                           │
│         │                        │                           │
│         ▼                        ▼                           │
│  ┌──────────────────────────────────────┐                   │
│  │      Embedding Service               │                   │
│  │  (textembedding-gecko@003)           │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
│                 │ Embeddings (768-dim vectors)              │
│                 │                                            │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │    Vertex AI Vector Search Index     │                   │
│  │  - Stores syllabus embeddings        │                   │
│  │  - Performs similarity search        │                   │
│  │  - Returns top-k matches             │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
│                 │ Similar topics with scores                │
│                 │                                            │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │    Vector Search Service             │                   │
│  │  - Ranks results                     │                   │
│  │  - Applies filters                   │                   │
│  │  - Returns formatted response        │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                            │
└─────────────────┼─────────────────────────────────────────┘
                  │
                  ▼
         ┌────────────────┐
         │  API Response  │
         │  (Relevant     │
         │   Topics)      │
         └────────────────┘
```

### Component Breakdown

#### 1. Embedding Service
- **Purpose**: Convert text to vectors
- **Model**: textembedding-gecko@003
- **Caching**: Stores embeddings to reduce API calls
- **Rate Limiting**: 100 requests/minute
- **Batch Processing**: Handles multiple texts efficiently

#### 2. Syllabus Service
- **Purpose**: Load and manage syllabus data
- **Data Source**: JSON files with JEE/NEET topics
- **Chunking**: Breaks topics into embeddable chunks
- **Metadata**: Extracts exam, subject, chapter, weightage, difficulty

#### 3. Vector Search Index
- **Purpose**: Store and search embeddings
- **Technology**: Vertex AI Vector Search (managed service)
- **Algorithm**: Approximate Nearest Neighbor (ANN)
- **Scalability**: Handles millions of vectors
- **Performance**: Sub-100ms query latency

#### 4. Vector Search Service
- **Purpose**: Query index and format results
- **Filtering**: Apply metadata filters (exam, subject, difficulty)
- **Ranking**: Sort by similarity score
- **Deduplication**: Remove duplicate results

---

## Similarity Metrics

### Cosine Similarity

Measures angle between vectors (most common for text):

```
similarity = (A · B) / (||A|| × ||B||)

Where:
- A · B = dot product of vectors A and B
- ||A|| = magnitude of vector A
- ||B|| = magnitude of vector B

Range: -1 to 1
- 1 = identical
- 0 = orthogonal (unrelated)
- -1 = opposite
```

**Example:**
```python
vector_a = [0.5, 0.3, 0.2]  # "Calculus"
vector_b = [0.4, 0.4, 0.1]  # "Differentiation"

dot_product = (0.5 * 0.4) + (0.3 * 0.4) + (0.2 * 0.1) = 0.34
magnitude_a = sqrt(0.5² + 0.3² + 0.2²) = 0.62
magnitude_b = sqrt(0.4² + 0.4² + 0.1²) = 0.57

similarity = 0.34 / (0.62 * 0.57) = 0.96  (very similar!)
```

### Euclidean Distance

Measures straight-line distance between vectors:

```
distance = sqrt(Σ(A[i] - B[i])²)

Range: 0 to ∞
- 0 = identical
- larger = more different
```

### Dot Product Distance

Used by Vertex AI Vector Search:

```
distance = -1 * (A · B)

Range: -∞ to ∞
- Higher (less negative) = more similar
```

---


## Approximate Nearest Neighbor (ANN) Search

### Why ANN?

Exact nearest neighbor search is slow for large datasets:
- **Brute force**: Compare query to every vector (O(n) complexity)
- **For 10,000 vectors**: 10,000 comparisons per query
- **Too slow**: Not practical for real-time applications

ANN trades accuracy for speed:
- **Approximate**: Finds "good enough" neighbors, not guaranteed exact
- **Fast**: Sub-linear time complexity (O(log n))
- **Accurate**: 95%+ recall (finds 95% of true nearest neighbors)

### Tree-AH Algorithm

Vertex AI uses Tree-AH (Tree-based Approximate Hierarchical) algorithm:

```
1. Build hierarchical tree of vectors during indexing
2. Query traverses tree from root to leaves
3. Prunes branches unlikely to contain neighbors
4. Returns approximate nearest neighbors quickly

Tree Structure:
         Root
        /    \
      N1      N2
     / \      / \
   N3  N4   N5  N6
   |   |    |   |
  [V] [V]  [V] [V]  (Leaf nodes with vectors)
```

**Configuration Parameters:**
- `leafNodeEmbeddingCount`: Vectors per leaf node (1000)
- `leafNodesToSearchPercent`: % of leaves to search (10%)
- `approximateNeighborsCount`: Neighbors to return (150)

---

## Implementation Details

### Embedding Generation Code Flow

```python
# 1. User calls API
POST /api/vector-search/embeddings/generate
{
  "text": "Limits and Continuity"
}

# 2. Router receives request
@router.post("/embeddings/generate")
async def generate_embedding(request: EmbeddingRequest):
    # 3. Check cache first
    cached = embedding_cache.get(request.text)
    if cached:
        return cached
    
    # 4. Call Vertex AI
    embedding = await embedding_service.generate_embedding(request.text)
    
    # 5. Cache result
    embedding_cache.set(request.text, embedding)
    
    # 6. Return response
    return EmbeddingResponse(
        embedding=embedding,
        dimensions=768,
        model="textembedding-gecko@003"
    )
```

### Vector Search Code Flow

```python
# 1. User searches
POST /api/vector-search/query
{
  "query": "weak in calculus",
  "top_k": 5,
  "filters": {"exam": "JEE_MAIN", "subject": "Mathematics"}
}

# 2. Router receives request
@router.post("/query")
async def search_topics(request: SearchRequest):
    # 3. Convert query to embedding
    query_embedding = await embedding_service.generate_embedding(request.query)
    
    # 4. Query vector index
    results = await vector_search_service.search(
        embedding=query_embedding,
        top_k=request.top_k,
        filters=request.filters
    )
    
    # 5. Rank and format results
    ranked_results = rank_by_similarity(results)
    
    # 6. Return response
    return SearchResponse(
        results=ranked_results,
        query=request.query,
        total_results=len(ranked_results)
    )
```

### Caching Strategy

**Why Cache?**
- Reduce API calls (save costs)
- Improve response time
- Reduce quota usage

**Cache Implementation:**
```python
class EmbeddingCache:
    def __init__(self):
        self.cache = {}  # {text_hash: (embedding, timestamp)}
        self.ttl = 7 * 24 * 60 * 60  # 7 days
        self.max_size = 10000
    
    def get(self, text: str) -> Optional[List[float]]:
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        if text_hash in self.cache:
            embedding, timestamp = self.cache[text_hash]
            if time.time() - timestamp < self.ttl:
                return embedding
            else:
                del self.cache[text_hash]  # Expired
        return None
    
    def set(self, text: str, embedding: List[float]):
        if len(self.cache) >= self.max_size:
            # Remove oldest entry
            oldest = min(self.cache.items(), key=lambda x: x[1][1])
            del self.cache[oldest[0]]
        
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        self.cache[text_hash] = (embedding, time.time())
```

**Cache Performance:**
- **Hit rate**: 60-80% for typical usage
- **Response time**: < 1ms for cache hits vs 200-500ms for API calls
- **Cost savings**: 60-80% reduction in API costs

---

## Metadata Filtering

### Why Metadata?

Vector search finds semantically similar topics, but we need to filter by:
- **Exam**: JEE vs NEET topics
- **Subject**: Physics vs Chemistry vs Math
- **Difficulty**: Easy vs Medium vs Hard
- **Weightage**: High-weightage topics first

### Filter Implementation

```python
# Store metadata with each vector
{
  "vector_id": "jee_math_calculus_001",
  "embedding": [0.023, -0.156, ...],
  "metadata": {
    "exam": "JEE_MAIN",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits and Continuity",
    "weightage": 8,
    "difficulty": "medium"
  }
}

# Apply filters during search
results = index.search(
    query_embedding=query_vector,
    top_k=10,
    filter={
        "exam": "JEE_MAIN",
        "subject": "Mathematics",
        "difficulty": "medium"
    }
)
```

### Filter Performance

Filters are applied **after** vector search:
1. Vector search finds top-k similar vectors (fast)
2. Filters are applied to results (fast, small dataset)
3. More results fetched if needed to meet top-k after filtering

**Alternative**: Pre-filtering (slower but more accurate)
- Apply filters before vector search
- Searches only within filtered subset
- Use when filters are very selective

---

## Performance Optimization

### Batch Processing

**Problem**: Generating embeddings one-by-one is slow
**Solution**: Batch multiple texts in single API call

```python
# Slow: 10 API calls
for text in texts:
    embedding = generate_embedding(text)

# Fast: 1 API call
embeddings = generate_batch_embeddings(texts)
```

**Benefits:**
- 10x faster for 10 texts
- Reduced API overhead
- Better quota utilization

### Index Configuration Tuning

**Trade-offs:**

| Parameter | Higher Value | Lower Value |
|-----------|--------------|-------------|
| `leafNodeEmbeddingCount` | Slower indexing, faster queries | Faster indexing, slower queries |
| `leafNodesToSearchPercent` | Higher accuracy, slower | Lower accuracy, faster |
| `approximateNeighborsCount` | More candidates, higher accuracy | Fewer candidates, faster |

**Recommended Settings:**
- **Development**: Fast indexing, acceptable accuracy
  - `leafNodeEmbeddingCount`: 500
  - `leafNodesToSearchPercent`: 5%
  
- **Production**: Balanced performance
  - `leafNodeEmbeddingCount`: 1000
  - `leafNodesToSearchPercent`: 10%

### Query Optimization

**Techniques:**
1. **Cache frequent queries**: Store popular search results
2. **Prefetch**: Generate embeddings for common queries at startup
3. **Async processing**: Don't block on embedding generation
4. **Connection pooling**: Reuse Vertex AI client connections

---

## Error Handling

### Common Errors

#### 1. Quota Exceeded
```
Error: 429 Too Many Requests
Quota exceeded for embedding generation
```

**Solution:**
- Implement exponential backoff
- Use caching aggressively
- Batch requests
- Request quota increase

#### 2. Invalid Input
```
Error: 400 Bad Request
Text exceeds maximum length of 3000 characters
```

**Solution:**
- Validate input length before API call
- Chunk long texts
- Return clear error message to user

#### 3. Index Not Ready
```
Error: 503 Service Unavailable
Index is still deploying
```

**Solution:**
- Check index status before queries
- Return "service initializing" message
- Retry after delay

#### 4. Authentication Failed
```
Error: 401 Unauthorized
Invalid credentials
```

**Solution:**
- Verify Application Default Credentials
- Check service account permissions
- Re-authenticate: `gcloud auth application-default login`

### Retry Logic

```python
async def generate_embedding_with_retry(text: str, max_retries: 3):
    for attempt in range(max_retries):
        try:
            return await vertex_ai_client.generate_embedding(text)
        except QuotaExceeded:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # Exponential backoff
                await asyncio.sleep(wait_time)
            else:
                raise
        except TransientError:
            if attempt < max_retries - 1:
                await asyncio.sleep(1)
            else:
                raise
```

---

## Best Practices

### 1. Embedding Generation

✅ **Do:**
- Cache embeddings aggressively
- Batch multiple texts
- Validate input before API call
- Use async/await for non-blocking calls
- Implement retry logic

❌ **Don't:**
- Generate embeddings for same text repeatedly
- Send texts longer than 3000 characters
- Make synchronous API calls
- Ignore rate limits

### 2. Vector Search

✅ **Do:**
- Use appropriate top_k (5-20 for most cases)
- Apply filters to narrow results
- Cache frequent queries
- Monitor query latency
- Use metadata for ranking

❌ **Don't:**
- Request too many results (top_k > 100)
- Search without filters (too broad)
- Ignore similarity scores
- Return results with score < 0.5

### 3. Index Management

✅ **Do:**
- Update index regularly with new content
- Monitor index health
- Use appropriate ANN parameters
- Test index performance
- Version your indexes

❌ **Don't:**
- Deploy untested indexes to production
- Use default parameters without tuning
- Ignore index errors
- Delete indexes without backup

### 4. Cost Optimization

✅ **Do:**
- Use caching extensively
- Batch API calls
- Monitor API usage
- Set up billing alerts
- Use appropriate index size

❌ **Don't:**
- Generate embeddings unnecessarily
- Keep unused indexes deployed
- Ignore cost reports
- Use production quotas for testing

---

## Monitoring and Debugging

### Key Metrics

1. **Embedding Generation**
   - API calls per minute
   - Cache hit rate
   - Average latency
   - Error rate

2. **Vector Search**
   - Queries per minute
   - Average query latency
   - Result relevance (similarity scores)
   - Filter effectiveness

3. **Index Health**
   - Index size (number of vectors)
   - Deployment status
   - Query success rate
   - Resource utilization

### Logging

```python
import logging

logger = logging.getLogger(__name__)

# Log embedding generation
logger.info(f"Generating embedding for text: {text[:50]}...")
logger.info(f"Embedding generated in {latency_ms}ms")

# Log cache hits/misses
logger.info(f"Cache hit for text hash: {text_hash}")
logger.info(f"Cache miss, calling API")

# Log search queries
logger.info(f"Search query: {query}, top_k: {top_k}, filters: {filters}")
logger.info(f"Found {len(results)} results in {latency_ms}ms")

# Log errors
logger.error(f"Embedding generation failed: {error}", exc_info=True)
```

### Debugging Tips

1. **Low similarity scores**: Check if embeddings are normalized
2. **Slow queries**: Check index configuration and deployment status
3. **No results**: Verify index has vectors and filters aren't too restrictive
4. **High costs**: Check cache hit rate and batch processing usage

---

## Next Steps

Now that you understand how Vector Search works, you're ready to use it for RAG (Retrieval-Augmented Generation) in Day 5!

**Day 5 Preview:**
- Use Vector Search to find relevant syllabus topics
- Pass retrieved topics as context to Gemini
- Generate curriculum-aligned questions
- Implement complete RAG pipeline

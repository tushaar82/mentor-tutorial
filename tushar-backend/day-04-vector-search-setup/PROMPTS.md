# AI Coding Agent Prompts for Vector Search Setup

## Overview

This document contains all prompts needed to implement Google Cloud Vertex AI Vector Search for semantic syllabus search. Use these prompts with your AI coding agent (Windsurf/Copilot or ChatGPT/Claude) to generate the code.

**Total Prompts**: 10
**Estimated Time**: 60 minutes

---

## Prompt 1: Vertex AI Client Initialization

### Purpose
Create a reusable Vertex AI client for embedding generation and vector search operations.

### When to Use
First prompt - sets up the foundation for all Vertex AI interactions.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/vertex_ai_client.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create Vertex AI client initialization utility for Mentor AI platform
# Support: embedding generation, vector search operations
# Use: Google Cloud credentials from environment variables
# Include: project_id, location, error handling, retry logic
# Add: type hints, docstrings, logging
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Vertex AI client initialization utility for the Mentor AI EdTech platform.

CONTEXT:
- Project: Mentor AI Backend (Python FastAPI)
- Stack: Python 3.11, Google Cloud Vertex AI
- File: tushar-backend/utils/vertex_ai_client.py

GENERATE:
A utility module to initialize and manage Vertex AI clients for embedding generation and vector search.

REQUIREMENTS:
1. Initialize Vertex AI with project_id and location from environment variables
2. Create function to get embedding client (textembedding-gecko@003 model)
3. Create function to get vector search client
4. Include error handling for missing credentials
5. Add retry logic for transient API failures
6. Use Python type hints for all functions
7. Add comprehensive docstrings
8. Include logging for initialization and errors
9. Support multiple regions (us-central1, asia-south1)
10. Cache client instances to avoid re-initialization

INTEGRATE WITH:
- Environment variables: GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION
- Google Cloud credentials (Application Default Credentials)

OUTPUT FORMAT:
- Provide complete code with all imports
- Include example usage in docstring
- Add error handling examples
```

**What You'll Get**: Complete Vertex AI client utility

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/utils/vertex_ai_client.py`
3. Paste and save
4. Verify imports are correct

---


## Prompt 2: Embedding Service

### Purpose
Create service to generate embeddings for text using Vertex AI's textembedding-gecko@003 model.

### When to Use
After Prompt 1 - builds on the Vertex AI client.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/embedding_service.py`

**Step 2**: Type this comment:
```python
# Create embedding generation service for Mentor AI
# Use: Vertex AI textembedding-gecko@003 model
# Support: single text embedding, batch embedding generation
# Include: rate limiting, caching, error handling, retry logic
# Return: 768-dimensional vectors with metadata
# Add: type hints, docstrings, logging
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create embedding generation service for the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Vertex AI Embeddings API
- File: tushar-backend/services/embedding_service.py
- Model: textembedding-gecko@003 (768 dimensions)

GENERATE:
Service to generate text embeddings using Vertex AI.

REQUIREMENTS:
1. Function to generate single embedding: generate_embedding(text: str) -> List[float]
2. Function to generate batch embeddings: generate_batch_embeddings(texts: List[str]) -> List[List[float]]
3. Include rate limiting (100 requests per minute)
4. Implement caching to avoid regenerating same embeddings
5. Add retry logic with exponential backoff for API failures
6. Validate input text (max 3000 characters per text)
7. Handle empty text and special characters
8. Return embeddings with metadata (model, timestamp, dimensions)
9. Add comprehensive error handling
10. Include logging for API calls and errors
11. Use Python type hints and Pydantic models
12. Add docstrings with examples

INTEGRATE WITH:
- utils/vertex_ai_client.py (Vertex AI client)
- utils/embedding_cache.py (will create next)

OUTPUT FORMAT:
- Complete code with all imports
- Include example usage
- Add unit test examples in docstring
```

**What You'll Get**: Complete embedding service

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/services/embedding_service.py`
3. Paste and save

---


## Prompt 3: Embedding Cache Utility

### Purpose
Create caching system to store embeddings and reduce API calls/costs.

### When to Use
After Prompt 2 - supports the embedding service.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/embedding_cache.py`

**Step 2**: Type this comment:
```python
# Create embedding cache utility for Mentor AI
# Use: in-memory cache with file persistence
# Support: get, set, check existence, clear cache
# Include: TTL (time-to-live), cache size limits
# Persist: save to JSON file, load on startup
# Add: type hints, docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create embedding cache utility for the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11
- File: tushar-backend/utils/embedding_cache.py

GENERATE:
Caching system for storing embeddings to reduce API calls.

REQUIREMENTS:
1. In-memory cache using dictionary
2. Function to get embedding: get(text: str) -> Optional[List[float]]
3. Function to set embedding: set(text: str, embedding: List[float])
4. Function to check if exists: exists(text: str) -> bool
5. Function to clear cache: clear()
6. Implement TTL (time-to-live) - default 7 days
7. Implement cache size limit (max 10,000 entries)
8. Persist cache to JSON file (data/embeddings/cache.json)
9. Load cache from file on initialization
10. Use hash of text as cache key (handle long texts)
11. Include cache statistics (hits, misses, size)
12. Add type hints and docstrings
13. Thread-safe operations

INTEGRATE WITH:
- File system for persistence

OUTPUT FORMAT:
- Complete code with all imports
- Include example usage
```

**What You'll Get**: Complete caching utility

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/utils/embedding_cache.py`
3. Paste and save

---


## Prompt 4: Syllabus Service

### Purpose
Create service to load, process, and chunk syllabus data for embedding generation.

### When to Use
After Prompt 3 - prepares syllabus data for vector search.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/syllabus_service.py`

**Step 2**: Type this comment:
```python
# Create syllabus data management service for Mentor AI
# Load: JEE and NEET syllabus from JSON files
# Process: chunk topics, extract metadata (subject, chapter, weightage)
# Support: get syllabus by exam and subject, search topics
# Include: data validation, error handling
# Add: type hints, Pydantic models, docstrings
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create syllabus data management service for the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/services/syllabus_service.py
- Data: JSON files in data/syllabus/ directory

GENERATE:
Service to load and process JEE/NEET syllabus data.

REQUIREMENTS:
1. Function to load syllabus: load_syllabus(exam: str, subject: str) -> dict
2. Function to get all topics: get_topics(exam: str, subject: str) -> List[dict]
3. Function to chunk topics for embedding (max 500 words per chunk)
4. Extract metadata: subject, chapter, topic, subtopic, weightage, difficulty
5. Validate syllabus JSON structure
6. Support exams: JEE_MAIN, JEE_ADVANCED, NEET
7. Support subjects: Physics, Chemistry, Math (JEE), Biology (NEET)
8. Cache loaded syllabus in memory
9. Function to get syllabus statistics (total topics, chapters, etc.)
10. Handle missing files gracefully
11. Use Pydantic models for syllabus structure
12. Add type hints and comprehensive docstrings
13. Include logging

INTEGRATE WITH:
- data/syllabus/*.json files
- Pydantic models for validation

OUTPUT FORMAT:
- Complete code with all imports
- Include Pydantic models for syllabus structure
- Add example syllabus JSON structure in docstring
```

**What You'll Get**: Complete syllabus service

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/services/syllabus_service.py`
3. Paste and save

---


## Prompt 5: Vector Search Service

### Purpose
Create service to query Vertex AI Vector Search index for similar topics.

### When to Use
After Prompt 4 - implements semantic search functionality.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/vector_search_service.py`

**Step 2**: Type this comment:
```python
# Create vector search service for Mentor AI
# Use: Vertex AI Vector Search index
# Support: semantic query, batch queries, filtering by metadata
# Include: similarity scoring, result ranking, error handling
# Return: top-k relevant topics with metadata and scores
# Add: type hints, Pydantic models, docstrings, logging
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create vector search service for the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Vertex AI Vector Search
- File: tushar-backend/services/vector_search_service.py

GENERATE:
Service to query vector search index for similar syllabus topics.

REQUIREMENTS:
1. Function to search: search_topics(query: str, top_k: int = 10) -> List[dict]
2. Function to batch search: batch_search(queries: List[str], top_k: int = 10) -> List[List[dict]]
3. Convert query text to embedding using embedding_service
4. Query Vertex AI Vector Search index
5. Filter results by metadata (exam, subject, difficulty)
6. Return results with: topic text, metadata, similarity score
7. Implement result ranking and deduplication
8. Handle empty results gracefully
9. Add caching for frequent queries
10. Include retry logic for API failures
11. Validate query input (not empty, reasonable length)
12. Use Pydantic models for search requests/responses
13. Add type hints and comprehensive docstrings
14. Include logging for searches and errors

INTEGRATE WITH:
- services/embedding_service.py (generate query embeddings)
- utils/vertex_ai_client.py (Vector Search client)
- Vertex AI Vector Search index (will deploy in CONFIGURATION.md)

OUTPUT FORMAT:
- Complete code with all imports
- Include Pydantic models for search requests/responses
- Add example usage in docstring
```

**What You'll Get**: Complete vector search service

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/services/vector_search_service.py`
3. Paste and save

---


## Prompt 6: Pydantic Models for Embeddings and Vector Search

### Purpose
Create request/response models for embedding and vector search endpoints.

### When to Use
After Prompt 5 - defines API contracts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/embedding_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for embedding operations
# Models: EmbeddingRequest, EmbeddingResponse, BatchEmbeddingRequest, BatchEmbeddingResponse
# Include: text validation, metadata fields, error responses
# Add: type hints, field descriptions, examples
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Create file `tushar-backend/models/vector_search_models.py`

**Step 5**: Type this comment:
```python
# Create Pydantic models for vector search operations
# Models: SearchRequest, SearchResponse, SearchResult, SearchFilters
# Include: query validation, top_k limits, metadata filters
# Add: type hints, field descriptions, examples
```

**Step 6**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for embedding and vector search operations in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic 2.x, FastAPI
- Files: 
  - tushar-backend/models/embedding_models.py
  - tushar-backend/models/vector_search_models.py

GENERATE:
Pydantic models for API requests and responses.

REQUIREMENTS FOR embedding_models.py:
1. EmbeddingRequest: text (str, max 3000 chars), include_metadata (bool)
2. EmbeddingResponse: embedding (List[float]), dimensions (int), model (str), timestamp (datetime)
3. BatchEmbeddingRequest: texts (List[str], max 100 items)
4. BatchEmbeddingResponse: embeddings (List[EmbeddingResponse]), total_count (int)
5. Add field validation and descriptions
6. Include example values

REQUIREMENTS FOR vector_search_models.py:
1. SearchFilters: exam (Optional[str]), subject (Optional[str]), difficulty (Optional[str])
2. SearchRequest: query (str), top_k (int, default 10, max 50), filters (Optional[SearchFilters])
3. SearchResult: topic (str), metadata (dict), similarity_score (float), rank (int)
4. SearchResponse: results (List[SearchResult]), query (str), total_results (int), search_time_ms (float)
5. BatchSearchRequest: queries (List[str], max 20)
6. BatchSearchResponse: results (List[SearchResponse])
7. Add field validation and descriptions
8. Include example values

GENERAL REQUIREMENTS:
1. Use Pydantic v2 syntax
2. Add field descriptions for API documentation
3. Include Config class with examples
4. Add custom validators where needed
5. Use appropriate types (datetime, Literal, etc.)
6. Add docstrings for each model

OUTPUT FORMAT:
- Provide complete code for both files
- Include all imports
- Add example usage in docstrings
```

**What You'll Get**: Complete Pydantic models for both files

**What to Do**:
1. Copy the generated code for embedding_models.py
2. Create file and paste
3. Copy the generated code for vector_search_models.py
4. Create file and paste

---


## Prompt 7: Embedding Router

### Purpose
Create FastAPI router for embedding generation endpoints.

### When to Use
After Prompt 6 - exposes embedding functionality via API.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/embedding_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for embedding operations
# Endpoints: POST /generate (single), POST /batch (multiple)
# Use: embedding_service for generation
# Include: authentication middleware, error handling, rate limiting
# Return: embeddings with metadata
# Add: type hints, OpenAPI documentation, logging
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for embedding operations in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/embedding_router.py

GENERATE:
FastAPI router with embedding generation endpoints.

REQUIREMENTS:
1. POST /api/vector-search/embeddings/generate - Generate single embedding
   - Request: EmbeddingRequest
   - Response: EmbeddingResponse
   - Validate text input
   - Call embedding_service.generate_embedding()
   
2. POST /api/vector-search/embeddings/batch - Generate batch embeddings
   - Request: BatchEmbeddingRequest
   - Response: BatchEmbeddingResponse
   - Validate batch size (max 100)
   - Call embedding_service.generate_batch_embeddings()
   
3. GET /api/vector-search/embeddings/status - Get embedding service status
   - Response: service health, cache stats, API quota
   
4. Include authentication middleware (require valid Firebase token)
5. Add rate limiting (100 requests per minute per user)
6. Implement comprehensive error handling
7. Add request/response logging
8. Include OpenAPI documentation with examples
9. Add type hints for all functions
10. Use dependency injection for services

INTEGRATE WITH:
- services/embedding_service.py
- models/embedding_models.py
- middleware/auth_middleware.py (from Day 2)

OUTPUT FORMAT:
- Complete code with all imports
- Include router initialization
- Add OpenAPI tags and descriptions
```

**What You'll Get**: Complete embedding router

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/routers/embedding_router.py`
3. Paste and save

---


## Prompt 8: Vector Search Router

### Purpose
Create FastAPI router for vector search endpoints.

### When to Use
After Prompt 7 - exposes vector search functionality via API.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/vector_search_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for vector search operations
# Endpoints: POST /query (single), POST /batch (multiple), GET /index/status
# Use: vector_search_service for semantic search
# Include: authentication middleware, error handling, query validation
# Return: relevant topics with similarity scores
# Add: type hints, OpenAPI documentation, logging
```

**Step 3**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for vector search operations in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/vector_search_router.py

GENERATE:
FastAPI router with vector search endpoints.

REQUIREMENTS:
1. POST /api/vector-search/query - Search for similar topics
   - Request: SearchRequest
   - Response: SearchResponse
   - Validate query input
   - Call vector_search_service.search_topics()
   - Apply filters if provided
   
2. POST /api/vector-search/query/batch - Batch search multiple queries
   - Request: BatchSearchRequest
   - Response: BatchSearchResponse
   - Validate batch size (max 20 queries)
   - Call vector_search_service.batch_search()
   
3. GET /api/vector-search/index/status - Get index deployment status
   - Response: index health, total vectors, last update time
   
4. GET /api/vector-search/syllabus/{exam}/{subject} - Get syllabus content
   - Path params: exam (JEE_MAIN, JEE_ADVANCED, NEET), subject
   - Response: syllabus topics with metadata
   - Call syllabus_service.get_topics()
   
5. GET /api/vector-search/syllabus/stats - Get syllabus statistics
   - Response: total topics, subjects, exams covered
   
6. Include authentication middleware (require valid Firebase token)
7. Add rate limiting (50 searches per minute per user)
8. Implement comprehensive error handling
9. Add request/response logging
10. Include OpenAPI documentation with examples
11. Add type hints for all functions
12. Use dependency injection for services

INTEGRATE WITH:
- services/vector_search_service.py
- services/syllabus_service.py
- models/vector_search_models.py
- middleware/auth_middleware.py (from Day 2)

OUTPUT FORMAT:
- Complete code with all imports
- Include router initialization
- Add OpenAPI tags and descriptions
```

**What You'll Get**: Complete vector search router

**What to Do**:
1. Copy the generated code
2. Create file at `tushar-backend/routers/vector_search_router.py`
3. Paste and save

---


## Prompt 9: Sample Syllabus Data Files

### Purpose
Create sample JEE and NEET syllabus data in JSON format for testing.

### When to Use
After Prompt 8 - provides test data for vector search.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/data/syllabus/jee_math.json`

**Step 2**: Type this comment:
```json
// Create JEE Math syllabus with topics, subtopics, chapters, weightage
// Include: Calculus, Algebra, Coordinate Geometry, Trigonometry
// Format: {exam, subject, chapters: [{name, topics: [{name, subtopics, weightage, difficulty}]}]}
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Repeat for other subjects (jee_physics.json, jee_chemistry.json, neet_biology.json)

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create sample syllabus data files for JEE and NEET exams in the Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Format: JSON
- Files: data/syllabus/*.json

GENERATE:
Sample syllabus data for testing vector search.

REQUIREMENTS:
1. Create jee_math.json with:
   - Exam: JEE_MAIN
   - Subject: Mathematics
   - Chapters: Calculus, Algebra, Coordinate Geometry, Trigonometry, Vectors
   - Each chapter has 5-8 topics
   - Each topic has: name, subtopics (list), weightage (1-10), difficulty (easy/medium/hard)
   - Include realistic JEE Math topics

2. Create jee_physics.json with:
   - Exam: JEE_MAIN
   - Subject: Physics
   - Chapters: Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics
   - Similar structure to math

3. Create jee_chemistry.json with:
   - Exam: JEE_MAIN
   - Subject: Chemistry
   - Chapters: Physical Chemistry, Organic Chemistry, Inorganic Chemistry
   - Similar structure

4. Create neet_biology.json with:
   - Exam: NEET
   - Subject: Biology
   - Chapters: Cell Biology, Genetics, Ecology, Human Physiology, Plant Physiology
   - Similar structure

JSON STRUCTURE:
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
          "difficulty": "medium",
          "description": "Fundamental concepts of limits and continuity"
        }
      ]
    }
  ]
}

OUTPUT FORMAT:
- Provide complete JSON for all 4 files
- Include at least 5 chapters per subject
- Include at least 5 topics per chapter
- Use realistic exam topics
```

**What You'll Get**: Complete syllabus JSON files

**What to Do**:
1. Copy each JSON file content
2. Create files in `tushar-backend/data/syllabus/`
3. Paste and save each file

---


## Prompt 10: Update Main Application and Requirements

### Purpose
Integrate vector search routers into main FastAPI application and add dependencies.

### When to Use
After Prompt 9 - final integration step.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment at the appropriate location:
```python
# Import and include vector search routers
# Add: embedding_router, vector_search_router
# Mount at: /api/vector-search prefix
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Open file `tushar-backend/requirements.txt`

**Step 5**: Add this comment:
```python
# Add Vertex AI dependencies for vector search and embeddings
# Include: google-cloud-aiplatform, google-cloud-storage
```

**Step 6**: Press Tab to trigger Copilot

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update main FastAPI application and requirements for vector search integration in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Files: tushar-backend/main.py, tushar-backend/requirements.txt

GENERATE:
Updates to integrate vector search functionality.

REQUIREMENTS FOR main.py:
1. Import embedding_router and vector_search_router
2. Include routers with prefix /api/vector-search
3. Add tags for API documentation
4. Ensure routers are added after authentication middleware
5. Add startup event to initialize Vertex AI client
6. Add shutdown event to cleanup resources

REQUIREMENTS FOR requirements.txt:
1. Add: google-cloud-aiplatform>=1.38.0
2. Add: google-cloud-storage>=2.10.0
3. Keep existing dependencies
4. Maintain alphabetical order
5. Pin versions for reproducibility

OUTPUT FORMAT:
- Provide complete updated main.py (show only the changes needed)
- Provide complete updated requirements.txt
- Include comments explaining changes
```

**What You'll Get**: Updated main.py and requirements.txt

**What to Do**:
1. Copy the main.py changes
2. Update `tushar-backend/main.py`
3. Copy the requirements.txt content
4. Update `tushar-backend/requirements.txt`
5. Run: `pip install -r requirements.txt`

---

## Summary

You've completed all 10 prompts! You should now have:

✅ Vertex AI client initialization
✅ Embedding generation service
✅ Embedding cache utility
✅ Syllabus data management service
✅ Vector search service
✅ Pydantic models for requests/responses
✅ Embedding API router
✅ Vector search API router
✅ Sample syllabus data files
✅ Updated main application and dependencies

**Next Step**: Open **CONFIGURATION.md** to set up Vertex AI and create the vector search index.

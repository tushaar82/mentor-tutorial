# Day 4: Vector Search Setup (Backend)

## What You're Building

Google Cloud Vertex AI Vector Search system for semantic syllabus search, including syllabus embedding generation, vector index creation, and semantic query capabilities. This enables the platform to find relevant syllabus content for generating accurate, curriculum-aligned questions.

## Why This Matters

Vector Search is the foundation for intelligent question generation:
- **Semantic Understanding**: Goes beyond keyword matching to understand topic relationships and context
- **Curriculum Alignment**: Ensures questions are based on actual syllabus content, not hallucinated
- **Intelligent Retrieval**: Finds relevant topics even when query terms don't exactly match syllabus text
- **RAG Foundation**: Provides the retrieval component for Retrieval-Augmented Generation (RAG)
- **Scalability**: Handles large syllabus databases efficiently with vector similarity search

Without Vector Search, the platform would generate generic questions that may not align with JEE/NEET syllabi, reducing learning effectiveness.

## How It Works

**Vector Search Architecture:**

1. **Syllabus Preparation**:
   - Load JEE/NEET syllabus content (topics, subtopics, concepts)
   - Break down into chunks (topic-level granularity)
   - Store in structured format with metadata (subject, chapter, weightage)

2. **Embedding Generation**:
   - Use Google's text-embedding model (textembedding-gecko@003)
   - Convert each syllabus chunk into 768-dimensional vector
   - Vectors capture semantic meaning of topics
   - Store embeddings with original text and metadata

3. **Vector Index Creation**:
   - Create Vertex AI Vector Search index
   - Configure for approximate nearest neighbor (ANN) search
   - Deploy index to endpoint for querying
   - Index enables fast similarity search across thousands of topics

4. **Semantic Query**:
   - Convert user query (e.g., "weak in calculus") to embedding
   - Search vector index for similar topics
   - Return top-k most relevant syllabus topics
   - Include metadata (subject, chapter, difficulty, weightage)

**Technology Stack:**
- Google Cloud Vertex AI (Vector Search service)
- Vertex AI Embeddings API (textembedding-gecko@003)
- Google Cloud Storage (syllabus data and index storage)
- Firestore (metadata and mapping storage)

**Data Flow:**
```
Syllabus Text → Generate Embeddings → Create Vector Index → Deploy Index → Query with Embeddings → Return Relevant Topics
```

## Learning Objectives

By completing this task, you will:
- Understand vector embeddings and semantic search concepts
- Learn how to use Google Cloud Vertex AI Vector Search
- Implement embedding generation with Vertex AI APIs
- Create and deploy vector search indexes
- Design semantic query systems for educational content
- Handle large-scale embedding generation efficiently
- Implement caching and error handling for AI APIs
- Test vector search independently with sample queries

## Time Estimate

- **LLM Code Generation**: 60 minutes (8-10 prompts)
- **Configuration**: 45 minutes (Enable Vertex AI, create index, upload data)
- **Testing**: 45 minutes (Test embeddings and queries)
- **Total**: 2.5 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Backend server running successfully

**Required Software:**
- Python 3.11+ with virtual environment
- Google Cloud Project with billing enabled
- gcloud CLI installed and authenticated
- curl or Postman for API testing

**Required Google Cloud APIs:**
- Vertex AI API (will enable in CONFIGURATION.md)
- Cloud Storage API (will enable in CONFIGURATION.md)

**Knowledge Prerequisites:**
- Basic understanding of machine learning embeddings
- Familiarity with vector similarity concepts
- Understanding of semantic search vs keyword search

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── embedding_service.py       # Generate embeddings with Vertex AI
│   ├── vector_search_service.py   # Query vector index
│   └── syllabus_service.py        # Load and process syllabus data
├── routers/
│   ├── embedding_router.py        # Embedding generation endpoints
│   └── vector_search_router.py    # Vector search endpoints
├── models/
│   ├── embedding_models.py        # Embedding request/response models
│   └── vector_search_models.py    # Search request/response models
├── utils/
│   ├── vertex_ai_client.py        # Vertex AI client initialization
│   └── embedding_cache.py         # Cache embeddings to reduce API calls
└── data/
    ├── syllabus/
    │   ├── jee_physics.json       # JEE Physics syllabus
    │   ├── jee_chemistry.json     # JEE Chemistry syllabus
    │   ├── jee_math.json          # JEE Math syllabus
    │   ├── neet_physics.json      # NEET Physics syllabus
    │   ├── neet_chemistry.json    # NEET Chemistry syllabus
    │   └── neet_biology.json      # NEET Biology syllabus
    └── embeddings/
        └── .gitkeep               # Placeholder for generated embeddings
```

## Files You'll Modify

```
tushar-backend/
├── main.py                        # Add new routers
└── requirements.txt               # Add Vertex AI dependencies
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Vertex AI client setup with authentication
- ✅ Embedding generation service using textembedding-gecko@003
- ✅ Syllabus data loading and chunking system
- ✅ Batch embedding generation for entire syllabus
- ✅ Vector Search index created and deployed
- ✅ Semantic query API for finding relevant topics
- ✅ Embedding caching to reduce API costs
- ✅ Metadata storage for topic information
- ✅ Error handling and retry logic for AI APIs
- ✅ Standalone testing with sample queries

## Vector Search Endpoints You'll Create

### Embedding Endpoints
- `POST /api/vector-search/embeddings/generate` - Generate embedding for text
- `POST /api/vector-search/embeddings/batch` - Generate embeddings for multiple texts
- `GET /api/vector-search/embeddings/status` - Check embedding generation status

### Vector Search Endpoints
- `POST /api/vector-search/query` - Search for similar topics
- `POST /api/vector-search/query/batch` - Search multiple queries
- `GET /api/vector-search/index/status` - Check index deployment status

### Syllabus Endpoints
- `GET /api/vector-search/syllabus/{exam}/{subject}` - Get syllabus content
- `POST /api/vector-search/syllabus/upload` - Upload new syllabus data
- `GET /api/vector-search/syllabus/stats` - Get syllabus statistics

## Vector Search Concepts

### What are Embeddings?
Embeddings are numerical representations (vectors) of text that capture semantic meaning. Similar concepts have similar vectors, enabling semantic search.

**Example:**
- "Calculus" and "Differentiation" have similar embeddings (related concepts)
- "Calculus" and "Organic Chemistry" have different embeddings (unrelated concepts)

### What is Vector Search?
Vector Search finds items with similar embeddings using distance metrics (cosine similarity, Euclidean distance). It's much more powerful than keyword search.

**Keyword Search:**
- Query: "integration techniques"
- Matches: Only topics with exact words "integration" or "techniques"

**Vector Search:**
- Query: "integration techniques"
- Matches: Integration by parts, substitution method, partial fractions, definite integrals (semantically related)

### Why Vertex AI Vector Search?
- **Scalable**: Handles millions of vectors efficiently
- **Fast**: Approximate nearest neighbor (ANN) search in milliseconds
- **Managed**: Google handles infrastructure and optimization
- **Integrated**: Works seamlessly with other Vertex AI services

## Next Steps

After completing this task, you'll move to:
- **Day 5**: RAG Implementation (use Vector Search to generate curriculum-aligned questions)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Enable Vertex AI, create index)
4. **TESTING.md** - Verify Vector Search works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **AI-INTEGRATION.md** - Detailed Vector Search explanation and architecture
7. **TROUBLESHOOTING.md** - Common Vertex AI issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating Vector Search code with your AI coding agent!

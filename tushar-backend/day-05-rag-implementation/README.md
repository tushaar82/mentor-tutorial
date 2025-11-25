# Day 5: RAG Implementation (Backend)

## What You're Building

A complete Retrieval-Augmented Generation (RAG) pipeline that combines Vector Search with Gemini Flash to generate accurate, curriculum-aligned questions for JEE/NEET diagnostic tests. This system retrieves relevant syllabus content and uses it as context for AI question generation, ensuring questions are based on actual curriculum rather than hallucinated content.

## Why This Matters

RAG is the core intelligence of the Mentor AI platform:
- **Accuracy**: Questions are based on actual syllabus content, not AI hallucinations
- **Curriculum Alignment**: Every question maps to specific JEE/NEET topics
- **Contextual Generation**: AI understands the full context of each topic
- **Quality Control**: Retrieved content acts as ground truth for validation
- **Scalability**: Can generate unlimited questions while maintaining quality
- **Adaptability**: Easy to update with new syllabus changes

Without RAG, the platform would generate generic questions that may not align with exam patterns, reducing learning effectiveness and student trust.

## How It Works

**RAG Pipeline Architecture:**

1. **Retrieval Phase**:
   - Student takes diagnostic test or requests practice questions
   - System identifies weak topics from analytics (e.g., "Calculus - Limits")
   - Query Vector Search with topic name
   - Retrieve top-5 most relevant syllabus chunks with metadata
   - Include: topic description, subtopics, key concepts, formulas, weightage

2. **Augmentation Phase**:
   - Take retrieved syllabus content
   - Format into structured context for LLM
   - Add exam-specific requirements (JEE/NEET patterns)
   - Include difficulty level, question type, marking scheme
   - Create comprehensive prompt with all context

3. **Generation Phase**:
   - Send augmented prompt to Gemini Flash
   - Gemini generates questions using ONLY provided context
   - Questions include: question text, 4 options, correct answer, explanation
   - Validate generated questions against syllabus
   - Store questions with metadata for future use

**Technology Stack:**
- Vertex AI Vector Search (retrieval)
- Google Gemini Flash 1.5 (generation)
- Firestore (question storage and caching)
- FastAPI (RAG pipeline orchestration)

**Data Flow:**
```
Topic Request → Vector Search Query → Retrieve Syllabus → Format Context → Gemini Prompt → Generate Questions → Validate → Store → Return
```

## Learning Objectives

By completing this task, you will:
- Understand RAG (Retrieval-Augmented Generation) architecture
- Learn how to combine vector search with LLM generation
- Implement context-aware prompt engineering
- Design question generation systems for educational content
- Handle LLM response parsing and validation
- Implement caching strategies for generated content
- Build exam-specific question patterns (JEE/NEET)
- Test RAG pipelines independently with sample topics
- Optimize RAG for accuracy and performance

## Time Estimate

- **LLM Code Generation**: 75 minutes (10-12 prompts)
- **Configuration**: 30 minutes (Enable Gemini API, test prompts)
- **Testing**: 45 minutes (Test question generation with various topics)
- **Total**: 2.5 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Day 4: Vector Search Setup (CRITICAL - must be complete)
- ✅ Vector Search index deployed and working
- ✅ Backend server running successfully

**Required Software:**
- Python 3.11+ with virtual environment
- Google Cloud Project with billing enabled
- gcloud CLI installed and authenticated
- curl or Postman for API testing

**Required Google Cloud APIs:**
- Vertex AI API (already enabled from Day 4)
- Gemini API (will enable in CONFIGURATION.md)

**Knowledge Prerequisites:**
- Understanding of Vector Search from Day 4
- Basic knowledge of prompt engineering
- Familiarity with LLM capabilities and limitations
- Understanding of JEE/NEET exam patterns

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── rag_service.py              # Main RAG pipeline orchestration
│   ├── gemini_service.py           # Gemini Flash API integration
│   ├── question_generator.py      # Question generation logic
│   ├── context_builder.py         # Build context from retrieved content
│   └── question_validator.py      # Validate generated questions
├── routers/
│   ├── rag_router.py              # RAG endpoints
│   └── question_router.py         # Question generation endpoints
├── models/
│   ├── rag_models.py              # RAG request/response models
│   ├── question_models.py         # Question data models
│   └── gemini_models.py           # Gemini API models
├── utils/
│   ├── gemini_client.py           # Gemini client initialization
│   ├── prompt_templates.py        # Prompt templates for question generation
│   ├── question_cache.py          # Cache generated questions
│   └── response_parser.py         # Parse LLM responses
└── data/
    ├── question_patterns/
    │   ├── jee_patterns.json      # JEE question patterns and examples
    │   └── neet_patterns.json     # NEET question patterns and examples
    └── generated_questions/
        └── .gitkeep               # Placeholder for generated questions
```

## Files You'll Modify

```
tushar-backend/
├── main.py                        # Add RAG routers
└── requirements.txt               # Add Gemini dependencies
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Gemini Flash client setup with authentication
- ✅ RAG pipeline orchestrating retrieval and generation
- ✅ Context builder formatting syllabus for LLM prompts
- ✅ Prompt templates for different question types
- ✅ Question generation service with exam-specific patterns
- ✅ Response parser handling LLM output
- ✅ Question validator ensuring quality and accuracy
- ✅ Question caching to reduce API costs
- ✅ Metadata tagging for generated questions
- ✅ Error handling and retry logic for LLM APIs
- ✅ Standalone testing with sample topics

## RAG Endpoints You'll Create

### RAG Pipeline Endpoints
- `POST /api/rag/generate-questions` - Generate questions for a topic using RAG
- `POST /api/rag/generate-batch` - Generate questions for multiple topics
- `GET /api/rag/pipeline/status` - Check RAG pipeline health

### Question Endpoints
- `POST /api/questions/generate` - Generate questions (uses RAG internally)
- `GET /api/questions/{question_id}` - Get specific question
- `POST /api/questions/validate` - Validate question quality
- `GET /api/questions/by-topic/{topic}` - Get cached questions for topic

### Context Endpoints
- `POST /api/rag/context/build` - Build context from topic (for testing)
- `POST /api/rag/context/preview` - Preview what context will be sent to LLM

## RAG Concepts

### What is RAG?

RAG combines three steps:
1. **Retrieval**: Find relevant information from knowledge base
2. **Augmentation**: Add retrieved information to LLM prompt
3. **Generation**: LLM generates response using provided context

**Without RAG:**
```
Prompt: "Generate a calculus question"
LLM: Generates generic question from training data
Risk: May not match syllabus, could be outdated
```

**With RAG:**
```
1. Retrieve: Get "Limits and Continuity" syllabus content
2. Augment: "Using this syllabus: [content], generate question"
3. Generate: LLM creates question based on actual syllabus
Result: Accurate, curriculum-aligned question
```

### Why RAG for Education?

- **Curriculum Alignment**: Questions match exact syllabus
- **No Hallucinations**: LLM uses provided facts, not invented ones
- **Easy Updates**: Update syllabus data, not LLM training
- **Transparency**: Can trace questions back to source content
- **Quality Control**: Validate against retrieved content

### RAG vs Fine-Tuning

| Approach | RAG | Fine-Tuning |
|----------|-----|-------------|
| **Setup Time** | Hours | Weeks |
| **Cost** | Low (API calls) | High (training) |
| **Updates** | Instant (update data) | Slow (retrain) |
| **Transparency** | High (see sources) | Low (black box) |
| **Accuracy** | High (uses facts) | Variable |
| **Best For** | Factual content | Style/tone |

## Next Steps

After completing this task, you'll move to:
- **Day 6**: Diagnostic Test Generation (use RAG to create complete 200-question tests)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Enable Gemini API)
4. **TESTING.md** - Verify RAG pipeline works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **AI-INTEGRATION.md** - Detailed RAG explanation and architecture
7. **RAG-DEVELOPMENT.md** - Step-by-step RAG building guide
8. **TROUBLESHOOTING.md** - Common RAG and Gemini issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating RAG code with your AI coding agent!

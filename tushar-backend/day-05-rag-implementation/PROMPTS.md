# AI Coding Agent Prompts for Day 5: RAG Implementation

## Overview

This document contains all prompts needed to generate the RAG (Retrieval-Augmented Generation) pipeline code. Follow the prompts in order, choosing either Windsurf/Copilot (inline) or ChatGPT/Claude (chat) based on your preference.

**Total Prompts**: 12
**Estimated Time**: 75 minutes

---

## Prompt 1: Gemini Client Setup

### Purpose
Initialize Google Gemini Flash client for question generation with proper authentication and configuration.

### When to Use
First prompt - sets up the foundation for all Gemini API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/gemini_client.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create Gemini Flash client for question generation
# - Initialize Vertex AI Gemini client
# - Use gemini-1.5-flash model
# - Configure generation parameters (temperature, top_p, top_k, max_tokens)
# - Add retry logic with exponential backoff
# - Handle authentication with Application Default Credentials
# - Add error handling for API failures
# - Include logging for debugging
# - Support async operations
# 
# Requirements:
# - Use google-cloud-aiplatform library
# - Temperature: 0.7 (balanced creativity)
# - Max tokens: 2048 (long responses)
# - Add type hints
# - Add comprehensive docstrings
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a Gemini Flash client module for the Mentor AI EdTech platform.

CONTEXT:
- Project: Mentor AI Backend (Python FastAPI)
- Stack: Python 3.11, Vertex AI, Gemini Flash 1.5
- File: tushar-backend/utils/gemini_client.py
- Purpose: Initialize and manage Gemini API client for question generation

GENERATE:
A complete Gemini client class with initialization, configuration, and error handling.

REQUIREMENTS:
1. Use google-cloud-aiplatform library for Vertex AI Gemini
2. Initialize with project_id and location from environment variables
3. Use gemini-1.5-flash model
4. Configure generation parameters:
   - temperature: 0.7 (balanced creativity and consistency)
   - top_p: 0.9
   - top_k: 40
   - max_output_tokens: 2048
5. Implement retry logic with exponential backoff (max 3 retries)
6. Handle common errors: QuotaExceeded, InvalidArgument, ServiceUnavailable
7. Add comprehensive logging for debugging
8. Support both sync and async operations
9. Include type hints for all functions
10. Add detailed docstrings explaining each method

INTEGRATE WITH:
- Environment variables: GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION
- Will be used by: services/gemini_service.py, services/rag_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include GeminiClient class with methods:
  - __init__(): Initialize client
  - generate_content(): Generate text from prompt
  - generate_content_async(): Async version
  - _retry_with_backoff(): Retry logic
- Add example usage in docstring
- Include error handling for all methods

TESTING:
Test with: python -c "from utils.gemini_client import GeminiClient; client = GeminiClient(); print('✓ Client initialized')"
```

---

### What You'll Get
- File: `tushar-backend/utils/gemini_client.py`
- Contains: GeminiClient class with initialization and generation methods
- Dependencies: google-cloud-aiplatform

### Verification
```bash
cd tushar-backend
python -c "from utils.gemini_client import GeminiClient; print('✓ Import successful')"
```

---


## Prompt 2: Prompt Templates

### Purpose
Create reusable prompt templates for different question types and exam patterns.

### When to Use
After Gemini client setup - defines how we'll structure prompts for the LLM.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/prompt_templates.py`

**Step 2**: Type this comment:
```python
# Create prompt templates for question generation
# - Template for JEE Main questions (4 options, single correct)
# - Template for JEE Advanced questions (multiple correct, numerical)
# - Template for NEET questions (4 options, single correct, biology focus)
# - Include placeholders for: topic, difficulty, syllabus_context, num_questions
# - Add system instructions for LLM behavior
# - Format output as JSON array
# - Include examples in prompts (few-shot learning)
# - Add validation instructions
# 
# Requirements:
# - Use Python f-strings for templates
# - Clear structure: system message + context + task + format + examples
# - Type hints for template functions
# - Docstrings explaining each template
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create prompt template module for question generation in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Gemini Flash
- File: tushar-backend/utils/prompt_templates.py
- Purpose: Reusable prompt templates for different exam types

GENERATE:
Functions that return formatted prompts for Gemini based on exam type and requirements.

REQUIREMENTS:
1. Create template functions for:
   - JEE Main (single correct MCQ)
   - JEE Advanced (multiple correct, numerical, matrix match)
   - NEET (single correct MCQ, biology-focused)
2. Each template should include:
   - System instructions (role, behavior, constraints)
   - Syllabus context (retrieved from Vector Search)
   - Task description (what to generate)
   - Output format (JSON structure)
   - Examples (2-3 sample questions for few-shot learning)
3. Placeholders for: topic, difficulty, syllabus_context, num_questions, exam_type
4. Instructions to use ONLY provided syllabus content
5. Validation requirements (check answer correctness, explanation quality)
6. JSON output format with fields: question, options, correct_answer, explanation, difficulty, topic
7. Add type hints and docstrings
8. Include helper function to build complete prompt from components

INTEGRATE WITH:
- Will be used by: services/question_generator.py, services/rag_service.py
- Receives context from: services/context_builder.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include functions:
  - get_jee_main_template()
  - get_jee_advanced_template()
  - get_neet_template()
  - build_prompt(exam_type, topic, context, difficulty, num_questions)
- Add example usage showing how to use templates

TESTING:
Test with: python -c "from utils.prompt_templates import build_prompt; prompt = build_prompt('JEE_MAIN', 'Calculus', 'context', 'medium', 5); print(len(prompt))"
```

---

### What You'll Get
- File: `tushar-backend/utils/prompt_templates.py`
- Contains: Template functions for each exam type
- Dependencies: None (pure Python)

---


## Prompt 3: Response Parser

### Purpose
Parse and validate LLM responses, handling various output formats and errors.

### When to Use
After prompt templates - handles the output from Gemini.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/response_parser.py`

**Step 2**: Type this comment:
```python
# Create LLM response parser for question generation
# - Parse JSON responses from Gemini
# - Handle malformed JSON (extract JSON from markdown code blocks)
# - Validate question structure (required fields present)
# - Clean and normalize question text
# - Validate options format (A, B, C, D)
# - Ensure correct_answer is valid option
# - Validate explanation is not empty
# - Handle partial responses (some questions valid, some invalid)
# - Return list of validated questions
# 
# Requirements:
# - Use json library for parsing
# - Regex for extracting JSON from text
# - Pydantic models for validation
# - Type hints and docstrings
# - Comprehensive error handling
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create response parser for Gemini LLM outputs in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/utils/response_parser.py
- Purpose: Parse and validate LLM-generated questions

GENERATE:
Parser class that extracts and validates questions from LLM responses.

REQUIREMENTS:
1. Parse JSON responses from Gemini (may be wrapped in markdown code blocks)
2. Handle various formats:
   - Pure JSON array
   - JSON in ```json code blocks
   - JSON with extra text before/after
3. Extract JSON using regex if needed
4. Validate each question has required fields:
   - question (string, not empty)
   - options (dict with A, B, C, D keys)
   - correct_answer (string, must be A/B/C/D)
   - explanation (string, not empty)
   - difficulty (string, must be easy/medium/hard)
   - topic (string, not empty)
5. Clean question text (remove extra whitespace, fix formatting)
6. Validate options are distinct and non-empty
7. Return only valid questions, log invalid ones
8. Handle errors gracefully (return empty list if parsing fails completely)
9. Add type hints and comprehensive docstrings
10. Include statistics (total parsed, valid, invalid)

INTEGRATE WITH:
- Will be used by: services/question_generator.py, services/rag_service.py
- Uses models from: models/question_models.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include ResponseParser class with methods:
  - parse_response(text: str) -> List[Question]
  - _extract_json(text: str) -> str
  - _validate_question(data: dict) -> Optional[Question]
  - _clean_text(text: str) -> str
- Add example usage

TESTING:
Test with sample responses including valid JSON, malformed JSON, and edge cases
```

---

### What You'll Get
- File: `tushar-backend/utils/response_parser.py`
- Contains: ResponseParser class
- Dependencies: json, re, pydantic

---


## Prompt 4: Context Builder

### Purpose
Build structured context from Vector Search results for LLM prompts.

### When to Use
After response parser - formats retrieved syllabus content for prompts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/context_builder.py`

**Step 2**: Type this comment:
```python
# Create context builder for RAG pipeline
# - Take Vector Search results (list of syllabus chunks)
# - Extract relevant information: topic, subtopics, concepts, formulas
# - Format into structured context for LLM
# - Include metadata: exam type, subject, chapter, weightage
# - Prioritize high-weightage topics
# - Limit context length (max 3000 tokens)
# - Add topic hierarchy (chapter → topic → subtopic)
# - Include key formulas and definitions
# - Format as clear, readable text for LLM
# 
# Requirements:
# - Function: build_context(search_results, max_tokens)
# - Token counting using tiktoken
# - Type hints and docstrings
# - Handle empty results gracefully
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create context builder service for RAG pipeline in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/services/context_builder.py
- Purpose: Format Vector Search results into LLM-ready context

GENERATE:
Service class that builds structured context from retrieved syllabus content.

REQUIREMENTS:
1. Take Vector Search results (list of dicts with text, metadata, score)
2. Extract and structure information:
   - Topic name and description
   - Subtopics and concepts
   - Key formulas and definitions
   - Important notes and tips
3. Include metadata in context:
   - Exam type (JEE/NEET)
   - Subject and chapter
   - Topic weightage (marks)
   - Difficulty level
4. Format context as structured text:
   - Clear sections with headers
   - Bullet points for lists
   - Formulas in LaTeX format
   - Hierarchical structure (chapter → topic → subtopic)
5. Prioritize content:
   - Higher similarity scores first
   - Higher weightage topics first
   - More detailed content for primary topic
6. Limit context length:
   - Max 3000 tokens (use tiktoken for counting)
   - Truncate less important content if needed
   - Always include primary topic fully
7. Handle edge cases:
   - Empty search results → return minimal context
   - Single result → expand with related info
   - Too many results → select top 5
8. Add type hints and comprehensive docstrings
9. Include logging for debugging

INTEGRATE WITH:
- Receives data from: services/vector_search_service.py (Day 4)
- Will be used by: services/rag_service.py, services/question_generator.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include ContextBuilder class with methods:
  - build_context(search_results, max_tokens=3000) -> str
  - _format_topic(result) -> str
  - _count_tokens(text) -> int
  - _prioritize_results(results) -> List
- Add example usage

TESTING:
Test with mock search results to verify context formatting
```

---

### What You'll Get
- File: `tushar-backend/services/context_builder.py`
- Contains: ContextBuilder class
- Dependencies: tiktoken

---


## Prompt 5: Gemini Service

### Purpose
High-level service for interacting with Gemini API for question generation.

### When to Use
After context builder - wraps Gemini client with business logic.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/gemini_service.py`

**Step 2**: Type this comment:
```python
# Create Gemini service for question generation
# - Use GeminiClient from utils
# - Generate questions from prompt
# - Handle streaming responses (optional)
# - Add response caching (cache by prompt hash)
# - Implement rate limiting (max 60 requests/minute)
# - Track API usage and costs
# - Add retry logic for failures
# - Parse and validate responses
# - Return structured question objects
# 
# Requirements:
# - Async methods for non-blocking calls
# - Use ResponseParser for parsing
# - Cache responses in memory (LRU cache)
# - Type hints and docstrings
# - Comprehensive error handling
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Gemini service for question generation in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Gemini Flash
- File: tushar-backend/services/gemini_service.py
- Purpose: High-level service for Gemini API interactions

GENERATE:
Service class that manages Gemini API calls for question generation.

REQUIREMENTS:
1. Initialize with GeminiClient from utils/gemini_client.py
2. Main method: generate_questions(prompt, num_questions) -> List[Question]
3. Features:
   - Send prompt to Gemini
   - Parse response using ResponseParser
   - Validate question count matches request
   - Retry if insufficient valid questions (max 2 retries)
   - Cache responses by prompt hash (LRU cache, max 100 items)
   - Rate limiting (max 60 requests/minute)
   - Track API usage (calls, tokens, cost)
4. Support async operations for non-blocking calls
5. Handle errors:
   - API failures → retry with backoff
   - Invalid responses → log and return partial results
   - Rate limit exceeded → wait and retry
6. Add logging for:
   - API calls (prompt length, response time)
   - Cache hits/misses
   - Errors and retries
7. Include cost tracking:
   - Count input/output tokens
   - Calculate cost (Gemini Flash pricing)
   - Log total cost per request
8. Add type hints and comprehensive docstrings
9. Include helper methods for prompt validation

INTEGRATE WITH:
- Uses: utils/gemini_client.py, utils/response_parser.py
- Will be used by: services/rag_service.py, services/question_generator.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include GeminiService class with methods:
  - generate_questions(prompt, num_questions) -> List[Question]
  - generate_questions_async(prompt, num_questions) -> List[Question]
  - _check_rate_limit() -> bool
  - _calculate_cost(input_tokens, output_tokens) -> float
  - get_usage_stats() -> dict
- Add example usage

TESTING:
Test with sample prompt to verify question generation
```

---

### What You'll Get
- File: `tushar-backend/services/gemini_service.py`
- Contains: GeminiService class
- Dependencies: utils/gemini_client.py, utils/response_parser.py

---


## Prompt 6: Question Validator

### Purpose
Validate generated questions for quality, accuracy, and exam compliance.

### When to Use
After Gemini service - ensures question quality before storage.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/question_validator.py`

**Step 2**: Type this comment:
```python
# Create question validator for quality assurance
# - Validate question text (clear, complete, no typos)
# - Check options are distinct and plausible
# - Verify correct answer is actually correct
# - Validate explanation is clear and accurate
# - Check difficulty matches question complexity
# - Ensure topic alignment with syllabus
# - Validate LaTeX formulas are properly formatted
# - Check for common issues (ambiguous wording, trick questions)
# - Return validation result with issues list
# 
# Requirements:
# - Function: validate_question(question, context) -> ValidationResult
# - Check against syllabus context
# - Use heuristics for quality checks
# - Type hints and docstrings
# - Return detailed validation report
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question validator service for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/services/question_validator.py
- Purpose: Validate generated questions for quality and accuracy

GENERATE:
Validator class that checks questions against quality criteria.

REQUIREMENTS:
1. Validate question structure:
   - Question text is clear and complete (min 20 chars, max 500 chars)
   - Has exactly 4 options (A, B, C, D)
   - Correct answer is one of A/B/C/D
   - Explanation is present and meaningful (min 30 chars)
   - Difficulty is valid (easy/medium/hard)
   - Topic is specified
2. Validate question quality:
   - Options are distinct (no duplicates)
   - Options are plausible (not obviously wrong)
   - Question is not ambiguous
   - No grammatical errors (basic checks)
   - LaTeX formulas are properly formatted (if present)
   - No placeholder text (e.g., "[insert formula]")
3. Validate against syllabus context:
   - Question topic matches provided context
   - Concepts used are in syllabus
   - Difficulty matches content complexity
4. Check for common issues:
   - Trick questions (unfair)
   - Ambiguous wording
   - Multiple correct answers (for single-correct type)
   - Incorrect answer marked as correct
5. Return ValidationResult with:
   - is_valid (bool)
   - issues (list of problems found)
   - warnings (list of potential issues)
   - quality_score (0-100)
6. Add type hints and comprehensive docstrings
7. Include configurable validation rules

INTEGRATE WITH:
- Uses: models/question_models.py
- Will be used by: services/rag_service.py, services/question_generator.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include QuestionValidator class with methods:
  - validate(question, context) -> ValidationResult
  - _validate_structure(question) -> List[str]
  - _validate_quality(question) -> List[str]
  - _validate_against_context(question, context) -> List[str]
  - _calculate_quality_score(issues, warnings) -> int
- Add example usage

TESTING:
Test with valid and invalid questions to verify validation logic
```

---

### What You'll Get
- File: `tushar-backend/services/question_validator.py`
- Contains: QuestionValidator class
- Dependencies: models/question_models.py

---


## Prompt 7: Question Generator Service

### Purpose
Orchestrate the complete question generation process using RAG.

### When to Use
After question validator - combines all components for question generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/question_generator.py`

**Step 2**: Type this comment:
```python
# Create question generator service using RAG
# - Retrieve syllabus context from Vector Search
# - Build context using ContextBuilder
# - Generate prompt using templates
# - Call Gemini service to generate questions
# - Validate questions using QuestionValidator
# - Filter out invalid questions
# - Store valid questions in Firestore
# - Return generated questions with metadata
# 
# Requirements:
# - Async method: generate_questions(topic, exam_type, difficulty, num_questions)
# - Use all previous services (vector search, context builder, gemini, validator)
# - Handle partial success (some questions valid, some invalid)
# - Add retry logic if insufficient valid questions
# - Type hints and docstrings
# - Comprehensive error handling
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question generator service for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/services/question_generator.py
- Purpose: Orchestrate complete question generation using RAG

GENERATE:
Service class that combines all RAG components to generate questions.

REQUIREMENTS:
1. Main method: generate_questions(topic, exam_type, difficulty, num_questions) -> List[Question]
2. RAG Pipeline steps:
   a. Query Vector Search for topic (use vector_search_service from Day 4)
   b. Build context from search results (use ContextBuilder)
   c. Generate prompt using templates (use prompt_templates)
   d. Call Gemini to generate questions (use GeminiService)
   e. Validate each question (use QuestionValidator)
   f. Filter out invalid questions (quality_score < 70)
   g. Store valid questions in Firestore
   h. Return questions with metadata
3. Handle insufficient results:
   - If < 80% of requested questions are valid, retry once
   - Adjust prompt to address common issues
   - Max 2 total attempts
4. Add metadata to questions:
   - generation_timestamp
   - generation_method: "RAG"
   - vector_search_score (from retrieval)
   - validation_score
   - exam_type, difficulty, topic
5. Support batch generation (multiple topics)
6. Add caching (check Firestore for existing questions first)
7. Include logging for each pipeline step
8. Handle errors gracefully (return partial results if possible)
9. Add type hints and comprehensive docstrings
10. Track generation statistics (success rate, avg quality score)

INTEGRATE WITH:
- Uses: services/vector_search_service.py (Day 4)
- Uses: services/context_builder.py
- Uses: services/gemini_service.py
- Uses: services/question_validator.py
- Uses: utils/prompt_templates.py
- Stores in: Firestore (questions collection)

OUTPUT FORMAT:
- Provide complete code with all imports
- Include QuestionGenerator class with methods:
  - generate_questions(topic, exam_type, difficulty, num_questions) -> List[Question]
  - generate_batch(topics, exam_type, difficulty, num_per_topic) -> Dict[str, List[Question]]
  - _retrieve_context(topic, exam_type) -> str
  - _store_questions(questions) -> None
  - get_generation_stats() -> dict
- Add example usage

TESTING:
Test with sample topic to verify end-to-end question generation
```

---

### What You'll Get
- File: `tushar-backend/services/question_generator.py`
- Contains: QuestionGenerator class
- Dependencies: All previous services

---


## Prompt 8: RAG Service (Main Orchestrator)

### Purpose
Main RAG service that provides high-level interface for the entire pipeline.

### When to Use
After question generator - top-level service for RAG operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/rag_service.py`

**Step 2**: Type this comment:
```python
# Create main RAG service for question generation
# - High-level interface for RAG pipeline
# - Support different generation modes (single topic, batch, adaptive)
# - Handle exam-specific requirements (JEE vs NEET patterns)
# - Implement question diversity (avoid repetition)
# - Add performance monitoring and metrics
# - Support streaming generation (yield questions as generated)
# - Implement fallback strategies if RAG fails
# - Cache frequently requested topics
# - Return comprehensive results with metadata
# 
# Requirements:
# - Use QuestionGenerator internally
# - Async methods for all operations
# - Add health check method
# - Type hints and docstrings
# - Comprehensive logging
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create main RAG service for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/services/rag_service.py
- Purpose: High-level RAG pipeline interface

GENERATE:
Service class that provides complete RAG functionality with advanced features.

REQUIREMENTS:
1. Main methods:
   - generate_for_topic(topic, exam_type, difficulty, count) -> RAGResult
   - generate_for_weak_topics(student_id, count_per_topic) -> Dict[str, RAGResult]
   - generate_diagnostic_test(exam_type, topic_distribution) -> List[Question]
2. Use QuestionGenerator internally for actual generation
3. Add advanced features:
   - Question diversity: Track generated questions, avoid duplicates
   - Adaptive difficulty: Adjust based on student performance
   - Topic coverage: Ensure all subtopics are covered
   - Quality filtering: Only return high-quality questions (score > 80)
4. Implement caching:
   - Check cache before generation
   - Cache results by (topic, exam_type, difficulty)
   - TTL: 7 days
5. Add performance monitoring:
   - Track generation time per topic
   - Monitor success rate
   - Log API costs
   - Track cache hit rate
6. Handle errors gracefully:
   - Fallback to cached questions if generation fails
   - Return partial results if some topics fail
   - Log all errors for debugging
7. Support streaming (optional):
   - Yield questions as they're generated
   - Useful for real-time UI updates
8. Add health check:
   - Verify all dependencies are working
   - Check API quotas
   - Return system status
9. Include comprehensive logging
10. Add type hints and docstrings

INTEGRATE WITH:
- Uses: services/question_generator.py
- Will be used by: routers/rag_router.py, routers/question_router.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include RAGService class with methods:
  - generate_for_topic(...) -> RAGResult
  - generate_for_weak_topics(...) -> Dict
  - generate_diagnostic_test(...) -> List[Question]
  - health_check() -> HealthStatus
  - get_metrics() -> dict
- Define RAGResult model with: questions, metadata, generation_time, quality_stats
- Add example usage

TESTING:
Test with sample topic to verify RAG pipeline works end-to-end
```

---

### What You'll Get
- File: `tushar-backend/services/rag_service.py`
- Contains: RAGService class
- Dependencies: services/question_generator.py

---


## Prompt 9: Pydantic Models

### Purpose
Define data models for RAG requests, responses, and questions.

### When to Use
After RAG service - defines API contracts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/rag_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for RAG API
# - RAGRequest: topic, exam_type, difficulty, num_questions
# - RAGResponse: questions, metadata, generation_time, quality_stats
# - QuestionGenerationRequest: detailed generation parameters
# - ValidationResult: is_valid, issues, warnings, quality_score
# - HealthStatus: all_systems_ok, component_status, quotas
# - GenerationMetrics: success_rate, avg_quality, total_generated
# 
# Requirements:
# - Use Pydantic BaseModel
# - Add field validators
# - Include examples in schema
# - Add docstrings
# - Type hints for all fields
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for RAG API in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/models/rag_models.py
- Purpose: Define data models for RAG requests and responses

GENERATE:
Pydantic models for all RAG-related data structures.

REQUIREMENTS:
1. RAGRequest model:
   - topic: str (required)
   - exam_type: str (JEE_MAIN, JEE_ADVANCED, NEET)
   - difficulty: str (easy, medium, hard)
   - num_questions: int (1-20, default 5)
   - include_explanations: bool (default True)
2. RAGResponse model:
   - questions: List[Question]
   - metadata: dict (topic, exam_type, generation_method)
   - generation_time: float (seconds)
   - quality_stats: dict (avg_score, valid_count, invalid_count)
   - cache_hit: bool
3. QuestionGenerationRequest model:
   - topics: List[str]
   - exam_type: str
   - difficulty: str
   - questions_per_topic: int
   - filters: Optional[dict]
4. ValidationResult model:
   - is_valid: bool
   - quality_score: int (0-100)
   - issues: List[str]
   - warnings: List[str]
5. HealthStatus model:
   - all_systems_ok: bool
   - components: dict (gemini, vector_search, firestore status)
   - quotas: dict (remaining calls, reset time)
   - last_check: datetime
6. GenerationMetrics model:
   - total_generated: int
   - success_rate: float
   - avg_quality_score: float
   - avg_generation_time: float
   - cache_hit_rate: float
7. Add field validators:
   - exam_type must be valid enum
   - difficulty must be valid enum
   - num_questions must be positive
   - topic must not be empty
8. Include Config with examples for OpenAPI docs
9. Add type hints and docstrings

INTEGRATE WITH:
- Will be used by: routers/rag_router.py, services/rag_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include all models listed above
- Add validators using @validator decorator
- Include example values in Config class
- Add comprehensive docstrings

TESTING:
Test with: python -c "from models.rag_models import RAGRequest; req = RAGRequest(topic='Calculus', exam_type='JEE_MAIN', difficulty='medium'); print(req)"
```

---

### What You'll Get
- File: `tushar-backend/models/rag_models.py`
- Contains: All RAG-related Pydantic models
- Dependencies: pydantic

---


## Prompt 10: Question Models

### Purpose
Define Pydantic models for question data structures.

### When to Use
After RAG models - defines question schema.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/question_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for questions
# - Question: complete question with all fields
# - QuestionOption: single option (A/B/C/D)
# - QuestionMetadata: generation info, validation scores
# - QuestionFilter: filter criteria for queries
# - QuestionBatch: batch of questions with stats
# 
# Requirements:
# - Use Pydantic BaseModel
# - Add field validators (options must have A,B,C,D)
# - Include examples
# - Support LaTeX in question text
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question models for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/models/question_models.py
- Purpose: Define question data structures

GENERATE:
Pydantic models for question representation and management.

REQUIREMENTS:
1. Question model:
   - id: Optional[str] (Firestore document ID)
   - question: str (question text, supports LaTeX)
   - options: Dict[str, str] (A, B, C, D keys)
   - correct_answer: str (A/B/C/D)
   - explanation: str (detailed explanation)
   - difficulty: str (easy/medium/hard)
   - topic: str
   - subtopic: Optional[str]
   - exam_type: str (JEE_MAIN/JEE_ADVANCED/NEET)
   - subject: str (Physics/Chemistry/Math/Biology)
   - metadata: QuestionMetadata
   - created_at: datetime
2. QuestionMetadata model:
   - generation_method: str (RAG/manual)
   - vector_search_score: Optional[float]
   - validation_score: int (0-100)
   - quality_issues: List[str]
   - source_context: Optional[str] (syllabus used)
   - generated_by: str (model name)
3. QuestionFilter model:
   - exam_type: Optional[str]
   - subject: Optional[str]
   - topic: Optional[str]
   - difficulty: Optional[str]
   - min_quality_score: Optional[int]
4. QuestionBatch model:
   - questions: List[Question]
   - total_count: int
   - avg_quality_score: float
   - topics_covered: List[str]
   - generation_time: float
5. Add validators:
   - options must have exactly keys A, B, C, D
   - correct_answer must be one of A, B, C, D
   - difficulty must be easy/medium/hard
   - quality_score must be 0-100
6. Add helper methods:
   - to_dict() for Firestore storage
   - from_dict() for Firestore retrieval
7. Include Config with examples
8. Add type hints and docstrings

INTEGRATE WITH:
- Will be used by: All services, routers

OUTPUT FORMAT:
- Provide complete code with all imports
- Include all models listed above
- Add validators and helper methods
- Include comprehensive docstrings

TESTING:
Test with: python -c "from models.question_models import Question; q = Question(question='Test?', options={'A':'1','B':'2','C':'3','D':'4'}, correct_answer='A', explanation='Because', difficulty='easy', topic='Test', exam_type='JEE_MAIN', subject='Math'); print(q)"
```

---

### What You'll Get
- File: `tushar-backend/models/question_models.py`
- Contains: Question and related models
- Dependencies: pydantic

---


## Prompt 11: RAG Router

### Purpose
Create FastAPI router for RAG endpoints.

### When to Use
After models - exposes RAG functionality via API.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/rag_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for RAG endpoints
# - POST /api/rag/generate-questions: Generate questions for topic
# - POST /api/rag/generate-batch: Generate for multiple topics
# - POST /api/rag/context/build: Build context (testing)
# - POST /api/rag/context/preview: Preview context
# - GET /api/rag/pipeline/status: Health check
# - GET /api/rag/metrics: Generation metrics
# 
# Requirements:
# - Use RAGService for business logic
# - Add request validation
# - Include OpenAPI documentation
# - Add error handling
# - Return proper HTTP status codes
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create RAG router for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/rag_router.py
- Purpose: Expose RAG functionality via REST API

GENERATE:
FastAPI router with all RAG endpoints.

REQUIREMENTS:
1. Create APIRouter with prefix="/api/rag" and tag="RAG"
2. Endpoints:
   
   POST /generate-questions
   - Request: RAGRequest (topic, exam_type, difficulty, num_questions)
   - Response: RAGResponse (questions, metadata, stats)
   - Description: Generate questions for single topic using RAG
   
   POST /generate-batch
   - Request: QuestionGenerationRequest (topics, exam_type, etc.)
   - Response: Dict[str, RAGResponse] (results per topic)
   - Description: Generate questions for multiple topics
   
   POST /context/build
   - Request: {topic, exam_type}
   - Response: {context: str, sources: List}
   - Description: Build and return context (for testing)
   
   POST /context/preview
   - Request: {topic, exam_type}
   - Response: {context_preview: str, token_count: int}
   - Description: Preview context without generation
   
   GET /pipeline/status
   - Response: HealthStatus
   - Description: Check RAG pipeline health
   
   GET /metrics
   - Response: GenerationMetrics
   - Description: Get generation statistics

3. Use RAGService for all business logic
4. Add comprehensive error handling:
   - 400: Invalid request
   - 500: Generation failed
   - 503: Service unavailable
5. Include detailed OpenAPI documentation:
   - Descriptions for each endpoint
   - Request/response examples
   - Error response schemas
6. Add logging for all requests
7. Include rate limiting (optional)
8. Add type hints and docstrings

INTEGRATE WITH:
- Uses: services/rag_service.py, models/rag_models.py
- Will be registered in: main.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include router with all endpoints
- Add comprehensive docstrings
- Include example requests in docstrings

TESTING:
Test with: curl -X POST http://localhost:8000/api/rag/generate-questions -H "Content-Type: application/json" -d '{"topic":"Calculus","exam_type":"JEE_MAIN","difficulty":"medium","num_questions":5}'
```

---

### What You'll Get
- File: `tushar-backend/routers/rag_router.py`
- Contains: RAG API endpoints
- Dependencies: services/rag_service.py, models/rag_models.py

---


## Prompt 12: Question Router

### Purpose
Create FastAPI router for question management endpoints.

### When to Use
After RAG router - provides question CRUD operations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/question_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for question endpoints
# - POST /api/questions/generate: Generate questions (wrapper for RAG)
# - GET /api/questions/{question_id}: Get specific question
# - GET /api/questions/by-topic/{topic}: Get questions for topic
# - POST /api/questions/validate: Validate question
# - POST /api/questions/search: Search questions with filters
# - GET /api/questions/stats: Get question statistics
# 
# Requirements:
# - Use RAGService and QuestionGenerator
# - Add pagination for list endpoints
# - Include filtering and sorting
# - Add OpenAPI documentation
# - Error handling
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question router for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/routers/question_router.py
- Purpose: Question management and retrieval API

GENERATE:
FastAPI router with question management endpoints.

REQUIREMENTS:
1. Create APIRouter with prefix="/api/questions" and tag="Questions"
2. Endpoints:
   
   POST /generate
   - Request: RAGRequest
   - Response: RAGResponse
   - Description: Generate questions (uses RAG internally)
   
   GET /{question_id}
   - Response: Question
   - Description: Get specific question by ID
   - Error: 404 if not found
   
   GET /by-topic/{topic}
   - Query params: exam_type, difficulty, limit, offset
   - Response: QuestionBatch
   - Description: Get all questions for topic
   - Include pagination
   
   POST /validate
   - Request: Question
   - Response: ValidationResult
   - Description: Validate question quality
   
   POST /search
   - Request: QuestionFilter
   - Response: QuestionBatch
   - Description: Search questions with filters
   - Support filtering by: exam_type, subject, topic, difficulty, min_quality
   
   GET /stats
   - Query params: exam_type, subject
   - Response: {total_questions, by_topic, by_difficulty, avg_quality}
   - Description: Get question statistics

3. Use RAGService and Firestore for data access
4. Add pagination:
   - Default limit: 20
   - Max limit: 100
   - Include total_count in response
5. Add sorting options:
   - created_at (newest/oldest)
   - quality_score (highest/lowest)
   - difficulty (easy to hard)
6. Include comprehensive error handling
7. Add OpenAPI documentation with examples
8. Add logging for all operations
9. Add type hints and docstrings

INTEGRATE WITH:
- Uses: services/rag_service.py, models/question_models.py
- Stores in: Firestore (questions collection)
- Will be registered in: main.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include router with all endpoints
- Add comprehensive docstrings
- Include example requests

TESTING:
Test with: curl http://localhost:8000/api/questions/by-topic/Calculus?exam_type=JEE_MAIN&limit=5
```

---

### What You'll Get
- File: `tushar-backend/routers/question_router.py`
- Contains: Question management API endpoints
- Dependencies: services/rag_service.py, models/question_models.py

---

## Final Steps

### Step 13: Update main.py

Add the new routers to your FastAPI application:

```python
# In tushar-backend/main.py

from routers import rag_router, question_router

# Add these lines after existing router includes
app.include_router(rag_router.router)
app.include_router(question_router.router)
```

### Step 14: Update requirements.txt

Add new dependencies:

```txt
# Add to tushar-backend/requirements.txt

google-cloud-aiplatform>=1.38.0  # Gemini API
tiktoken>=0.5.1                   # Token counting
```

### Step 15: Install Dependencies

```bash
cd tushar-backend
pip install -r requirements.txt
```

---

## Summary

You've now generated all the code for the RAG pipeline! Here's what you have:

**Core Components:**
- ✅ Gemini client for LLM calls
- ✅ Prompt templates for question generation
- ✅ Response parser for LLM outputs
- ✅ Context builder for RAG

**Services:**
- ✅ Gemini service (API wrapper)
- ✅ Question validator (quality assurance)
- ✅ Question generator (RAG orchestration)
- ✅ RAG service (high-level interface)

**API:**
- ✅ RAG router (generation endpoints)
- ✅ Question router (management endpoints)
- ✅ Pydantic models (data structures)

**Next Steps:**
1. Open **CONFIGURATION.md** to enable Gemini API
2. Open **TESTING.md** to test the RAG pipeline
3. Open **EXPECTED-OUTCOME.md** to verify success

Great work! 🎉

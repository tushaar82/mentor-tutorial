# Day 6: Diagnostic Test Generation (Backend)

## What You're Building

A complete diagnostic test generation system that creates comprehensive 200-question tests using RAG (Retrieval-Augmented Generation) with intelligent question distribution based on exam patterns, topic weightages, and difficulty levels. This system analyzes JEE/NEET syllabi, applies exam-specific patterns, and generates balanced tests that accurately assess student knowledge across all topics.

## Why This Matters

Diagnostic tests are the entry point for personalized learning:
- **Comprehensive Assessment**: 200 questions cover entire syllabus systematically
- **Pattern-Based**: Questions follow actual JEE/NEET exam patterns and difficulty distribution
- **Weightage-Aware**: More questions for high-weightage topics (e.g., Mechanics, Organic Chemistry)
- **Adaptive Difficulty**: Mix of easy, medium, and hard questions to assess all skill levels
- **Baseline Establishment**: Identifies student strengths and weaknesses for personalized study plans
- **Analytics Foundation**: Test results drive AI-powered analytics and schedule generation

Without proper diagnostic tests, the platform cannot accurately assess student knowledge, leading to ineffective study plans and poor learning outcomes.

## How It Works

**Diagnostic Test Generation Pipeline:**

1. **Test Specification**:
   - Input: Exam type (JEE Main/Advanced/NEET), exam date
   - Load exam-specific patterns (question distribution, marking scheme)
   - Calculate topic weightages from syllabus
   - Determine question distribution (subjects, chapters, topics)
   - Define difficulty distribution (30% easy, 50% medium, 20% hard)

2. **Topic Selection**:
   - Analyze complete syllabus for selected exam
   - Group topics by subject and chapter
   - Calculate questions per topic based on weightage
   - Ensure coverage of all high-weightage topics
   - Balance across subjects (Physics, Chemistry, Math/Biology)

3. **Question Generation per Topic**:
   - For each topic, use RAG pipeline from Day 5
   - Retrieve relevant syllabus content via Vector Search
   - Generate questions using Gemini Flash with exam-specific prompts
   - Apply question type distribution (MCQ, numerical, multiple correct)
   - Validate questions for quality and curriculum alignment

4. **Test Assembly**:
   - Collect all generated questions
   - Verify total count (200 questions)
   - Ensure subject balance (e.g., JEE: 60 Physics, 60 Chemistry, 80 Math)
   - Apply difficulty distribution across all subjects
   - Shuffle questions within sections
   - Add metadata (section, subject, topic, difficulty, marks)

5. **Test Validation**:
   - Verify no duplicate questions
   - Check all topics are covered
   - Validate marking scheme (correct marks, negative marking)
   - Ensure time allocation is appropriate (3 hours for 200 questions)
   - Validate question quality scores meet threshold

6. **Test Storage**:
   - Store complete test in Firestore
   - Create test metadata (test_id, exam_type, generation_date)
   - Link to student profile
   - Set test status (pending, in_progress, completed)
   - Enable test retrieval for frontend

**Technology Stack:**
- RAG Service from Day 5 (question generation)
- Vector Search from Day 4 (syllabus retrieval)
- Gemini Flash (question generation)
- Firestore (test storage)
- FastAPI (test generation orchestration)

**Data Flow:**
```
Test Request → Load Exam Patterns → Calculate Distribution → Select Topics → Generate Questions (RAG) → Assemble Test → Validate → Store → Return Test ID
```

## Learning Objectives

By completing this task, you will:
- Understand diagnostic test design for competitive exams
- Learn how to apply exam-specific patterns and weightages
- Implement intelligent question distribution algorithms
- Design test assembly systems with multiple constraints
- Handle large-scale question generation (200 questions)
- Implement test validation and quality assurance
- Build exam-specific marking schemes (negative marking, partial credit)
- Test complete diagnostic test generation independently
- Optimize for generation time and API costs

## Time Estimate

- **LLM Code Generation**: 90 minutes (12-15 prompts)
- **Configuration**: 30 minutes (Load exam patterns, test data)
- **Testing**: 60 minutes (Generate complete test, validate results)
- **Total**: 3 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Day 4: Vector Search Setup (CRITICAL - must be complete)
- ✅ Day 5: RAG Implementation (CRITICAL - must be complete)
- ✅ RAG pipeline working and tested
- ✅ Vector Search index deployed
- ✅ Backend server running successfully

**Required Software:**
- Python 3.11+ with virtual environment
- Google Cloud Project with billing enabled
- gcloud CLI installed and authenticated
- curl or Postman for API testing

**Required Google Cloud APIs:**
- Vertex AI API (already enabled from Day 4)
- Gemini API (already enabled from Day 5)

**Knowledge Prerequisites:**
- Understanding of RAG pipeline from Day 5
- Familiarity with JEE/NEET exam patterns
- Knowledge of question distribution strategies
- Understanding of marking schemes and negative marking

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── diagnostic_test_service.py     # Main test generation orchestration
│   ├── test_pattern_service.py        # Load and apply exam patterns
│   ├── question_distribution.py       # Calculate question distribution
│   ├── test_assembler.py              # Assemble questions into test
│   └── test_validator.py              # Validate complete test
├── routers/
│   ├── diagnostic_test_router.py      # Test generation endpoints
│   └── test_management_router.py      # Test CRUD operations
├── models/
│   ├── diagnostic_test_models.py      # Test request/response models
│   ├── test_pattern_models.py         # Exam pattern models
│   └── test_metadata_models.py        # Test metadata models
├── utils/
│   ├── pattern_loader.py              # Load exam patterns from JSON
│   ├── weightage_calculator.py        # Calculate topic weightages
│   └── test_shuffler.py               # Shuffle questions intelligently
└── data/
    ├── exam_patterns/
    │   ├── jee_main_pattern.json      # JEE Main exam pattern
    │   ├── jee_advanced_pattern.json  # JEE Advanced exam pattern
    │   └── neet_pattern.json          # NEET exam pattern
    └── generated_tests/
        └── .gitkeep                   # Placeholder for generated tests
```

## Files You'll Modify

```
tushar-backend/
├── main.py                            # Add diagnostic test routers
└── requirements.txt                   # Add any new dependencies
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Exam pattern loader for JEE/NEET specifications
- ✅ Weightage calculator for topic-based distribution
- ✅ Question distribution algorithm with multiple constraints
- ✅ Test generation orchestrator using RAG pipeline
- ✅ Batch question generation for all topics
- ✅ Test assembler with section organization
- ✅ Question shuffling with intelligent ordering
- ✅ Test validator ensuring quality and completeness
- ✅ Marking scheme implementation (negative marking)
- ✅ Test storage in Firestore with metadata
- ✅ Test retrieval API for frontend
- ✅ Progress tracking during generation
- ✅ Error handling and retry logic
- ✅ Standalone testing with complete test generation

## Diagnostic Test Endpoints You'll Create

### Test Generation Endpoints
- `POST /api/diagnostic-test/generate` - Generate complete diagnostic test
- `POST /api/diagnostic-test/generate-async` - Generate test asynchronously
- `GET /api/diagnostic-test/generation/status/{job_id}` - Check generation progress

### Test Management Endpoints
- `GET /api/diagnostic-test/{test_id}` - Get complete test
- `GET /api/diagnostic-test/{test_id}/metadata` - Get test metadata only
- `GET /api/diagnostic-test/student/{student_id}` - Get student's tests
- `DELETE /api/diagnostic-test/{test_id}` - Delete test

### Test Submission Endpoints
- `POST /api/diagnostic-test/{test_id}/start` - Start test (record start time)
- `POST /api/diagnostic-test/{test_id}/submit` - Submit test answers
- `GET /api/diagnostic-test/{test_id}/results` - Get test results

### Pattern Endpoints
- `GET /api/diagnostic-test/patterns/{exam_type}` - Get exam pattern
- `GET /api/diagnostic-test/patterns/all` - Get all exam patterns
- `POST /api/diagnostic-test/patterns/validate` - Validate custom pattern

## Exam Pattern Concepts

### JEE Main Pattern
- **Total Questions**: 90 (30 per subject)
- **Subjects**: Physics, Chemistry, Mathematics
- **Question Types**: 
  - 20 MCQ (single correct) per subject
  - 10 Numerical (integer answer) per subject
- **Marking Scheme**:
  - MCQ: +4 for correct, -1 for incorrect
  - Numerical: +4 for correct, 0 for incorrect
- **Duration**: 3 hours
- **Difficulty**: 30% easy, 50% medium, 20% hard

### JEE Advanced Pattern
- **Total Questions**: 54 (18 per subject)
- **Subjects**: Physics, Chemistry, Mathematics
- **Question Types**:
  - Single correct MCQ
  - Multiple correct MCQ
  - Numerical
  - Matrix match
- **Marking Scheme**: Variable (partial marking for multiple correct)
- **Duration**: 3 hours (2 papers)
- **Difficulty**: 20% easy, 50% medium, 30% hard

### NEET Pattern
- **Total Questions**: 200 (180 to attempt)
- **Subjects**: Physics (50), Chemistry (50), Biology (100)
- **Question Types**: Single correct MCQ only
- **Marking Scheme**: +4 for correct, -1 for incorrect
- **Duration**: 3 hours 20 minutes
- **Difficulty**: 40% easy, 40% medium, 20% hard

### Diagnostic Test Adaptations
For diagnostic purposes, we generate 200 questions for all exams:
- **JEE Main**: Scale up to 200 questions maintaining pattern
- **JEE Advanced**: Simplify to single/multiple correct, scale to 200
- **NEET**: Use standard 200-question format

## Question Distribution Strategy

### Weightage-Based Distribution
```
High Weightage Topics (>10 marks): 8-10 questions
Medium Weightage Topics (5-10 marks): 5-7 questions
Low Weightage Topics (<5 marks): 2-4 questions
```

### Subject Balance
```
JEE: Physics (60), Chemistry (60), Math (80)
NEET: Physics (40), Chemistry (40), Biology (120)
```

### Difficulty Distribution
```
Easy (30%): Foundation concepts, direct application
Medium (50%): Multi-step problems, concept combination
Hard (20%): Complex problems, advanced application
```

## Next Steps

After completing this task, you'll move to:
- **Day 7**: Gemini Analytics (analyze test results and generate insights)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Load exam patterns)
4. **TESTING.md** - Verify test generation works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - Test generation to submission flow
7. **TROUBLESHOOTING.md** - Common test generation issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating diagnostic test code with your AI coding agent!

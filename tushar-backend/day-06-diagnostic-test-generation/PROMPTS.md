# AI Coding Agent Prompts for Day 6: Diagnostic Test Generation

## Overview

This document contains all prompts needed to generate the diagnostic test generation system code. Follow the prompts in order, choosing either Windsurf/Copilot (inline) or ChatGPT/Claude (chat) based on your preference.

**Total Prompts**: 15
**Estimated Time**: 90 minutes

---

## Prompt 1: Exam Pattern Loader

### Purpose
Load and parse exam-specific patterns (question distribution, marking scheme, difficulty) from JSON files.

### When to Use
First prompt - sets up the foundation for pattern-based test generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/pattern_loader.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create exam pattern loader for diagnostic test generation
# - Load exam patterns from JSON files (jee_main, jee_advanced, neet)
# - Parse pattern structure: subjects, question_types, marking_scheme, duration
# - Validate pattern completeness (all required fields present)
# - Cache loaded patterns in memory
# - Support custom pattern validation
# - Handle missing or malformed pattern files
# - Return structured pattern objects
# 
# Requirements:
# - Load from data/exam_patterns/ directory
# - Use Pydantic models for pattern validation
# - Add comprehensive error handling
# - Include type hints and docstrings
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create exam pattern loader for Mentor AI diagnostic test generation.

CONTEXT:
- Project: Mentor AI Backend (Python FastAPI)
- Stack: Python 3.11, Pydantic
- File: tushar-backend/utils/pattern_loader.py
- Purpose: Load and validate exam patterns from JSON files

GENERATE:
A pattern loader class that reads exam specifications from JSON files.

REQUIREMENTS:
1. Load patterns from data/exam_patterns/ directory
2. Support three exam types: JEE_MAIN, JEE_ADVANCED, NEET
3. Pattern structure should include:
   - exam_name: str
   - total_questions: int
   - subjects: List[dict] with name, question_count, weightage
   - question_types: List[dict] with type, count_per_subject, marks
   - marking_scheme: dict with correct_marks, incorrect_marks, unattempted_marks
   - duration_minutes: int
   - difficulty_distribution: dict with easy, medium, hard percentages
4. Validate pattern completeness using Pydantic models
5. Cache loaded patterns to avoid repeated file reads
6. Handle errors: file not found, invalid JSON, missing fields
7. Support custom pattern validation (check totals add up)
8. Include type hints for all functions
9. Add comprehensive docstrings
10. Log pattern loading for debugging

INTEGRATE WITH:
- Pattern files: data/exam_patterns/*.json
- Will be used by: services/diagnostic_test_service.py, services/test_pattern_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include PatternLoader class with methods:
  - load_pattern(exam_type: str) -> ExamPattern
  - validate_pattern(pattern: dict) -> bool
  - get_all_patterns() -> Dict[str, ExamPattern]
  - _load_from_file(filename: str) -> dict
- Define ExamPattern Pydantic model
- Add example usage in docstring

TESTING:
Test with: python -c "from utils.pattern_loader import PatternLoader; loader = PatternLoader(); print('✓ Loader initialized')"
```

---

### What You'll Get
- File: `tushar-backend/utils/pattern_loader.py`
- Contains: PatternLoader class and ExamPattern model
- Dependencies: pydantic, json

### Verification
```bash
cd tushar-backend
python -c "from utils.pattern_loader import PatternLoader; print('✓ Import successful')"
```

---


## Prompt 2: Weightage Calculator

### Purpose
Calculate question distribution based on topic weightages from syllabus.

### When to Use
After pattern loader - determines how many questions per topic.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/weightage_calculator.py`

**Step 2**: Type this comment:
```python
# Create weightage calculator for question distribution
# - Calculate questions per topic based on marks weightage
# - Ensure total questions match exam pattern requirement
# - Apply minimum questions per topic (at least 2)
# - Prioritize high-weightage topics
# - Balance across subjects and chapters
# - Handle rounding (distribute remainder questions)
# - Support custom weightage adjustments
# - Return distribution map: topic -> question_count
# 
# Requirements:
# - Input: syllabus with topic weightages, total_questions, exam_pattern
# - Output: Dict[topic_id, question_count]
# - Use proportional distribution algorithm
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create weightage calculator for diagnostic test question distribution.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11
- File: tushar-backend/utils/weightage_calculator.py
- Purpose: Calculate how many questions to generate per topic

GENERATE:
Calculator class that distributes questions based on topic weightages.

REQUIREMENTS:
1. Input parameters:
   - syllabus: List of topics with weightage (marks)
   - total_questions: int (e.g., 200)
   - exam_pattern: ExamPattern object
   - subject_distribution: Dict[subject, question_count]
2. Calculate questions per topic:
   - Proportional to topic weightage within subject
   - Minimum 2 questions per topic (if included)
   - Maximum based on topic complexity
3. Ensure constraints:
   - Total questions exactly matches requirement
   - Subject totals match pattern (e.g., Physics: 60)
   - All high-weightage topics (>10 marks) included
4. Handle rounding:
   - Use largest remainder method
   - Distribute extra questions to highest-weightage topics
5. Balance considerations:
   - Cover all chapters
   - Prioritize frequently-tested topics
   - Include mix of conceptual and numerical topics
6. Return distribution map:
   - topic_id -> question_count
   - Include metadata: subject, chapter, weightage
7. Add validation:
   - Verify totals match requirements
   - Check no topic exceeds reasonable limit
8. Include type hints and comprehensive docstrings
9. Add logging for distribution decisions

INTEGRATE WITH:
- Uses: utils/pattern_loader.py (ExamPattern)
- Will be used by: services/question_distribution.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include WeightageCalculator class with methods:
  - calculate_distribution(syllabus, total_questions, pattern) -> Dict
  - _proportional_distribution(topics, count) -> Dict
  - _apply_constraints(distribution) -> Dict
  - _validate_distribution(distribution, requirements) -> bool
- Add example usage

TESTING:
Test with sample syllabus to verify distribution adds up correctly
```

---

### What You'll Get
- File: `tushar-backend/utils/weightage_calculator.py`
- Contains: WeightageCalculator class
- Dependencies: None (pure Python)

---


## Prompt 3: Question Distribution Service

### Purpose
Orchestrate the complete question distribution calculation for a diagnostic test.

### When to Use
After weightage calculator - combines pattern and weightage into distribution plan.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/question_distribution.py`

**Step 2**: Type this comment:
```python
# Create question distribution service for diagnostic tests
# - Load exam pattern for specified exam type
# - Load syllabus with topic weightages from Firestore
# - Calculate subject-wise distribution
# - Calculate topic-wise distribution using WeightageCalculator
# - Apply difficulty distribution (easy, medium, hard)
# - Ensure question type distribution (MCQ, numerical, etc.)
# - Return complete distribution plan with metadata
# 
# Requirements:
# - Method: create_distribution(exam_type, student_id) -> DistributionPlan
# - Use PatternLoader and WeightageCalculator
# - Query Firestore for student's selected exam and syllabus
# - Type hints and docstrings
# - Comprehensive error handling
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question distribution service for Mentor AI diagnostic tests.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/services/question_distribution.py
- Purpose: Create complete question distribution plan for test generation

GENERATE:
Service class that orchestrates distribution calculation.

REQUIREMENTS:
1. Main method: create_distribution(exam_type, student_id) -> DistributionPlan
2. Steps:
   a. Load exam pattern using PatternLoader
   b. Get student's exam selection from Firestore
   c. Load relevant syllabus (JEE/NEET) from Firestore
   d. Calculate subject distribution from pattern
   e. Calculate topic distribution using WeightageCalculator
   f. Apply difficulty distribution to each topic
   g. Apply question type distribution
   h. Create DistributionPlan object
3. DistributionPlan should include:
   - exam_type, total_questions
   - subject_distribution: Dict[subject, count]
   - topic_distribution: List[TopicDistribution]
   - difficulty_distribution: Dict[difficulty, count]
   - question_type_distribution: Dict[type, count]
4. TopicDistribution should include:
   - topic_id, topic_name, subject, chapter
   - question_count, difficulty_split, question_type_split
   - weightage, priority
5. Validation:
   - All distributions sum to total_questions
   - Subject totals match pattern requirements
   - Difficulty percentages match pattern
6. Handle edge cases:
   - Student hasn't selected exam → use default
   - Syllabus not found → return error
   - Invalid exam type → return error
7. Add caching (cache distribution by exam_type)
8. Include type hints and comprehensive docstrings
9. Add logging for distribution creation

INTEGRATE WITH:
- Uses: utils/pattern_loader.py, utils/weightage_calculator.py
- Uses: Firestore (students, syllabus collections)
- Will be used by: services/diagnostic_test_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include QuestionDistribution class with methods:
  - create_distribution(exam_type, student_id) -> DistributionPlan
  - _load_syllabus(exam_type) -> List[Topic]
  - _apply_difficulty_split(distribution, pattern) -> DistributionPlan
  - _apply_question_type_split(distribution, pattern) -> DistributionPlan
- Define DistributionPlan and TopicDistribution Pydantic models
- Add example usage

TESTING:
Test with sample exam_type to verify distribution is created correctly
```

---

### What You'll Get
- File: `tushar-backend/services/question_distribution.py`
- Contains: QuestionDistribution class and models
- Dependencies: utils/pattern_loader.py, utils/weightage_calculator.py, Firestore

---


## Prompt 4: Test Pattern Service

### Purpose
Apply exam-specific patterns to test generation (marking scheme, question types, sections).

### When to Use
After question distribution - applies pattern rules during generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/test_pattern_service.py`

**Step 2**: Type this comment:
```python
# Create test pattern service for exam-specific rules
# - Apply marking scheme to questions (correct, incorrect, unattempted marks)
# - Organize questions into sections (Physics, Chemistry, Math/Biology)
# - Apply question type rules (MCQ, numerical, multiple correct)
# - Set time limits per section
# - Add section instructions
# - Apply negative marking rules
# - Handle exam-specific constraints (JEE Advanced partial marking)
# - Return pattern-compliant test structure
# 
# Requirements:
# - Method: apply_pattern(questions, exam_pattern) -> PatternedTest
# - Support all three exam types
# - Type hints and docstrings
# - Validate pattern compliance
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test pattern service for Mentor AI diagnostic tests.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/services/test_pattern_service.py
- Purpose: Apply exam-specific patterns to generated questions

GENERATE:
Service class that formats questions according to exam patterns.

REQUIREMENTS:
1. Main method: apply_pattern(questions, exam_pattern) -> PatternedTest
2. Pattern application:
   - Organize questions into sections by subject
   - Apply marking scheme to each question
   - Set question types (single_correct, multiple_correct, numerical)
   - Add section metadata (name, duration, instructions)
   - Apply negative marking rules
3. Marking schemes:
   - JEE Main MCQ: +4 correct, -1 incorrect, 0 unattempted
   - JEE Main Numerical: +4 correct, 0 incorrect
   - JEE Advanced: Variable (partial marking for multiple correct)
   - NEET: +4 correct, -1 incorrect, 0 unattempted
4. Section organization:
   - JEE: Section A (Physics), Section B (Chemistry), Section C (Math)
   - NEET: Section A (Physics), Section B (Chemistry), Section C (Biology)
   - Each section has time allocation
5. Question type handling:
   - Single correct: 4 options, 1 correct
   - Multiple correct: 4 options, 1+ correct
   - Numerical: Integer answer (0-9999)
   - Matrix match: Match columns (JEE Advanced only)
6. Add section instructions:
   - Marking scheme explanation
   - Question type description
   - Time management tips
7. Validate pattern compliance:
   - Question counts match pattern
   - Marking scheme correctly applied
   - All required fields present
8. Include type hints and comprehensive docstrings
9. Add logging for pattern application

INTEGRATE WITH:
- Uses: utils/pattern_loader.py (ExamPattern)
- Will be used by: services/test_assembler.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include TestPatternService class with methods:
  - apply_pattern(questions, pattern) -> PatternedTest
  - _organize_sections(questions, pattern) -> List[Section]
  - _apply_marking_scheme(question, pattern) -> Question
  - _add_section_instructions(section, pattern) -> Section
- Define PatternedTest and Section Pydantic models
- Add example usage

TESTING:
Test with sample questions to verify pattern is applied correctly
```

---

### What You'll Get
- File: `tushar-backend/services/test_pattern_service.py`
- Contains: TestPatternService class and models
- Dependencies: utils/pattern_loader.py

---


## Prompt 5: Test Assembler

### Purpose
Assemble generated questions into a complete, structured diagnostic test.

### When to Use
After test pattern service - combines all questions into final test format.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/test_assembler.py`

**Step 2**: Type this comment:
```python
# Create test assembler for diagnostic tests
# - Collect questions from all topics
# - Apply pattern using TestPatternService
# - Shuffle questions within sections (maintain section order)
# - Add question numbering (1-200)
# - Add test metadata (test_id, exam_type, generation_date, student_id)
# - Calculate total marks and duration
# - Add test instructions
# - Validate completeness (all questions present, no duplicates)
# - Return complete test object ready for storage
# 
# Requirements:
# - Method: assemble_test(questions, exam_pattern, student_id) -> DiagnosticTest
# - Use TestPatternService for pattern application
# - Intelligent shuffling (preserve difficulty progression)
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test assembler service for Mentor AI diagnostic tests.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/services/test_assembler.py
- Purpose: Assemble questions into complete diagnostic test

GENERATE:
Service class that creates final test structure from generated questions.

REQUIREMENTS:
1. Main method: assemble_test(questions, pattern, student_id) -> DiagnosticTest
2. Assembly steps:
   a. Apply pattern using TestPatternService
   b. Shuffle questions within each section
   c. Number questions sequentially (1-200)
   d. Add test metadata
   e. Calculate totals (marks, duration)
   f. Add test instructions
   g. Validate completeness
3. Shuffling strategy:
   - Shuffle within sections (don't mix subjects)
   - Maintain some difficulty progression (easy → hard)
   - Randomize but keep seed for reproducibility
4. Test metadata:
   - test_id: UUID
   - exam_type: str
   - student_id: str
   - generation_date: datetime
   - total_questions: int
   - total_marks: int
   - duration_minutes: int
   - status: "pending"
5. Test instructions:
   - General instructions (how to attempt)
   - Marking scheme summary
   - Time management tips
   - Section-wise breakdown
6. Validation checks:
   - Exactly 200 questions (or pattern requirement)
   - No duplicate questions
   - All questions have required fields
   - Section totals match pattern
   - Marking scheme applied correctly
7. DiagnosticTest structure:
   - metadata: TestMetadata
   - instructions: str
   - sections: List[Section]
   - total_marks: int
   - duration_minutes: int
8. Include type hints and comprehensive docstrings
9. Add logging for assembly process

INTEGRATE WITH:
- Uses: services/test_pattern_service.py
- Will be used by: services/diagnostic_test_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include TestAssembler class with methods:
  - assemble_test(questions, pattern, student_id) -> DiagnosticTest
  - _shuffle_questions(questions, seed) -> List[Question]
  - _add_numbering(questions) -> List[Question]
  - _calculate_totals(test) -> Tuple[int, int]
  - _validate_test(test) -> bool
- Define DiagnosticTest and TestMetadata Pydantic models
- Add example usage

TESTING:
Test with sample questions to verify test is assembled correctly
```

---

### What You'll Get
- File: `tushar-backend/services/test_assembler.py`
- Contains: TestAssembler class and models
- Dependencies: services/test_pattern_service.py

---


## Prompt 6: Test Validator

### Purpose
Validate complete diagnostic test for quality, completeness, and pattern compliance.

### When to Use
After test assembler - final quality check before storage.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/test_validator.py`

**Step 2**: Type this comment:
```python
# Create test validator for diagnostic tests
# - Validate test structure (all required fields present)
# - Check question count matches pattern requirement
# - Verify no duplicate questions
# - Validate all questions have correct format
# - Check marking scheme consistency
# - Verify difficulty distribution matches pattern
# - Validate subject distribution
# - Check question quality scores meet threshold
# - Return validation result with detailed issues
# 
# Requirements:
# - Method: validate_test(test, pattern) -> TestValidationResult
# - Comprehensive validation rules
# - Return detailed error messages
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test validator service for Mentor AI diagnostic tests.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, Pydantic
- File: tushar-backend/services/test_validator.py
- Purpose: Validate complete diagnostic test before storage

GENERATE:
Validator class that checks test quality and compliance.

REQUIREMENTS:
1. Main method: validate_test(test, pattern) -> TestValidationResult
2. Validation checks:
   a. Structure validation:
      - All required fields present
      - Correct data types
      - Valid UUIDs and timestamps
   b. Count validation:
      - Total questions match pattern
      - Section counts match pattern
      - Subject distribution correct
   c. Question validation:
      - No duplicate questions (check question text)
      - All questions have 4 options
      - Correct answer is valid (A/B/C/D)
      - Explanation present and non-empty
   d. Pattern compliance:
      - Marking scheme correctly applied
      - Question types match pattern
      - Difficulty distribution within tolerance (±5%)
   e. Quality validation:
      - Average question quality score > 75
      - No questions with quality score < 60
      - All questions validated individually
3. TestValidationResult:
   - is_valid: bool
   - errors: List[str] (blocking issues)
   - warnings: List[str] (non-blocking issues)
   - quality_score: int (0-100)
   - statistics: dict (counts, distributions)
4. Validation levels:
   - STRICT: All checks must pass
   - NORMAL: Allow minor warnings
   - LENIENT: Only check critical issues
5. Handle edge cases:
   - Empty test → invalid
   - Partial test → check what's present
   - Malformed questions → list specific issues
6. Include type hints and comprehensive docstrings
7. Add logging for validation results

INTEGRATE WITH:
- Uses: utils/pattern_loader.py (ExamPattern)
- Will be used by: services/diagnostic_test_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include TestValidator class with methods:
  - validate_test(test, pattern, level) -> TestValidationResult
  - _validate_structure(test) -> List[str]
  - _validate_counts(test, pattern) -> List[str]
  - _validate_questions(test) -> List[str]
  - _validate_pattern_compliance(test, pattern) -> List[str]
  - _calculate_quality_score(test) -> int
- Define TestValidationResult Pydantic model
- Add example usage

TESTING:
Test with valid and invalid tests to verify validation logic
```

---

### What You'll Get
- File: `tushar-backend/services/test_validator.py`
- Contains: TestValidator class and models
- Dependencies: utils/pattern_loader.py

---


## Prompt 7: Diagnostic Test Service (Main Orchestrator)

### Purpose
Main service that orchestrates the complete diagnostic test generation process.

### When to Use
After test validator - top-level service combining all components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/diagnostic_test_service.py`

**Step 2**: Type this comment:
```python
# Create diagnostic test service for complete test generation
# - Main orchestrator for test generation pipeline
# - Create distribution plan using QuestionDistribution
# - Generate questions for each topic using RAG (from Day 5)
# - Assemble test using TestAssembler
# - Validate test using TestValidator
# - Store test in Firestore
# - Support async generation with progress tracking
# - Handle partial failures (retry failed topics)
# - Return test_id and metadata
# 
# Requirements:
# - Method: generate_test(exam_type, student_id) -> TestGenerationResult
# - Async method: generate_test_async(exam_type, student_id) -> job_id
# - Use all previous services (distribution, RAG, assembler, validator)
# - Progress tracking (emit progress updates)
# - Type hints and docstrings
# - Comprehensive error handling
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create diagnostic test service for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/services/diagnostic_test_service.py
- Purpose: Orchestrate complete diagnostic test generation

GENERATE:
Service class that manages the entire test generation pipeline.

REQUIREMENTS:
1. Main method: generate_test(exam_type, student_id) -> TestGenerationResult
2. Generation pipeline:
   a. Load exam pattern
   b. Create distribution plan (QuestionDistribution)
   c. For each topic in distribution:
      - Generate questions using RAG service (Day 5)
      - Validate questions
      - Collect valid questions
   d. Assemble test (TestAssembler)
   e. Validate complete test (TestValidator)
   f. Store test in Firestore
   g. Return test_id and metadata
3. Async generation:
   - Method: generate_test_async(exam_type, student_id) -> job_id
   - Run generation in background
   - Store progress in Firestore (generation_jobs collection)
   - Update progress: 0% → 25% → 50% → 75% → 100%
   - Allow progress checking via job_id
4. Progress tracking:
   - Track topics completed / total topics
   - Track questions generated / total questions
   - Estimate time remaining
   - Store in Firestore for frontend polling
5. Error handling:
   - If topic generation fails, retry once
   - If retry fails, skip topic and continue
   - If < 80% questions generated, fail entire test
   - Log all errors for debugging
6. Partial failure handling:
   - Collect all successful questions
   - If sufficient (>80%), proceed with assembly
   - Adjust distribution to fill gaps
7. Test storage:
   - Store in Firestore: diagnostic_tests collection
   - Document structure: test_id, student_id, exam_type, questions, metadata, status
   - Set status: "pending" (not started)
8. TestGenerationResult:
   - test_id: str
   - status: str (success, partial_success, failed)
   - questions_generated: int
   - generation_time: float
   - errors: List[str]
   - warnings: List[str]
9. Include type hints and comprehensive docstrings
10. Add extensive logging for debugging

INTEGRATE WITH:
- Uses: services/question_distribution.py
- Uses: services/rag_service.py (Day 5)
- Uses: services/test_assembler.py
- Uses: services/test_validator.py
- Uses: utils/pattern_loader.py
- Stores in: Firestore (diagnostic_tests, generation_jobs collections)

OUTPUT FORMAT:
- Provide complete code with all imports
- Include DiagnosticTestService class with methods:
  - generate_test(exam_type, student_id) -> TestGenerationResult
  - generate_test_async(exam_type, student_id) -> str (job_id)
  - get_generation_status(job_id) -> GenerationStatus
  - _generate_questions_for_topics(distribution) -> List[Question]
  - _store_test(test, student_id) -> str (test_id)
- Define TestGenerationResult and GenerationStatus Pydantic models
- Add example usage

TESTING:
Test with sample exam_type and student_id to verify end-to-end generation
```

---

### What You'll Get
- File: `tushar-backend/services/diagnostic_test_service.py`
- Contains: DiagnosticTestService class and models
- Dependencies: All previous services, RAG service from Day 5

---


## Prompt 8: Pydantic Models for Diagnostic Tests

### Purpose
Define data models for diagnostic test requests, responses, and structures.

### When to Use
After diagnostic test service - defines API contracts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/diagnostic_test_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for diagnostic test API
# - TestGenerationRequest: exam_type, student_id, options
# - TestGenerationResult: test_id, status, questions_generated, time, errors
# - DiagnosticTest: complete test structure with sections and questions
# - TestMetadata: test_id, exam_type, student_id, dates, status
# - Section: section_name, questions, marks, duration
# - TestSubmission: test_id, student_id, answers, submission_time
# - TestResults: test_id, score, section_scores, analytics
# 
# Requirements:
# - Use Pydantic BaseModel
# - Add field validators
# - Include examples in Config
# - Type hints for all fields
# - Comprehensive docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for diagnostic test API in Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/models/diagnostic_test_models.py
- Purpose: Define data models for diagnostic test operations

GENERATE:
Pydantic models for all diagnostic test-related data structures.

REQUIREMENTS:
1. TestGenerationRequest model:
   - exam_type: str (JEE_MAIN, JEE_ADVANCED, NEET)
   - student_id: str
   - async_generation: bool (default False)
   - custom_distribution: Optional[dict]
2. TestGenerationResult model:
   - test_id: str
   - status: str (success, partial_success, failed)
   - questions_generated: int
   - total_questions: int
   - generation_time: float
   - errors: List[str]
   - warnings: List[str]
3. DiagnosticTest model:
   - test_id: str
   - metadata: TestMetadata
   - instructions: str
   - sections: List[Section]
   - total_marks: int
   - duration_minutes: int
4. TestMetadata model:
   - test_id: str
   - exam_type: str
   - student_id: str
   - generation_date: datetime
   - start_date: Optional[datetime]
   - submission_date: Optional[datetime]
   - status: str (pending, in_progress, completed, expired)
5. Section model:
   - section_name: str
   - subject: str
   - questions: List[Question]
   - total_marks: int
   - duration_minutes: int
   - instructions: str
6. Question model (from Day 5, extend if needed):
   - question_id: str
   - question_number: int
   - question_text: str
   - options: Dict[str, str] (A, B, C, D)
   - correct_answer: str
   - question_type: str (single_correct, multiple_correct, numerical)
   - marks: int
   - negative_marks: int
   - difficulty: str
   - topic: str
   - subject: str
7. TestSubmission model:
   - test_id: str
   - student_id: str
   - answers: Dict[int, str] (question_number -> answer)
   - time_taken: int (seconds)
   - submission_time: datetime
8. TestResults model:
   - test_id: str
   - student_id: str
   - total_score: int
   - total_marks: int
   - percentage: float
   - section_scores: Dict[str, SectionScore]
   - correct_count: int
   - incorrect_count: int
   - unattempted_count: int
9. SectionScore model:
   - section_name: str
   - score: int
   - total_marks: int
   - correct: int
   - incorrect: int
   - unattempted: int
10. GenerationStatus model (for async):
    - job_id: str
    - status: str (queued, in_progress, completed, failed)
    - progress: int (0-100)
    - current_step: str
    - test_id: Optional[str]
    - error: Optional[str]
11. Add field validators:
    - exam_type must be valid enum
    - student_id must not be empty
    - answers must be valid (A/B/C/D or number)
    - scores must be non-negative
12. Include Config with examples for OpenAPI docs
13. Add type hints and comprehensive docstrings

INTEGRATE WITH:
- Will be used by: routers/diagnostic_test_router.py, services/diagnostic_test_service.py

OUTPUT FORMAT:
- Provide complete code with all imports
- Include all models listed above
- Add validators using @validator decorator
- Include example values in Config class
- Add comprehensive docstrings

TESTING:
Test with: python -c "from models.diagnostic_test_models import TestGenerationRequest; print('✓ Import successful')"
```

---

### What You'll Get
- File: `tushar-backend/models/diagnostic_test_models.py`
- Contains: All diagnostic test models
- Dependencies: pydantic, datetime

---


## Prompt 9: Diagnostic Test Router

### Purpose
Create FastAPI endpoints for diagnostic test generation and management.

### When to Use
After models - exposes test generation functionality via API.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/diagnostic_test_router.py`

**Step 2**: Type this comment:
```python
# Create diagnostic test router for FastAPI
# - POST /api/diagnostic-test/generate - Generate test synchronously
# - POST /api/diagnostic-test/generate-async - Generate test asynchronously
# - GET /api/diagnostic-test/generation/status/{job_id} - Check generation progress
# - GET /api/diagnostic-test/{test_id} - Get complete test
# - GET /api/diagnostic-test/{test_id}/metadata - Get test metadata only
# - GET /api/diagnostic-test/student/{student_id} - Get student's tests
# - DELETE /api/diagnostic-test/{test_id} - Delete test
# 
# Requirements:
# - Use FastAPI APIRouter
# - Add authentication (verify student_id from token)
# - Use DiagnosticTestService for operations
# - Add request validation
# - Return appropriate status codes
# - Add error handling
# - Include OpenAPI documentation
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create diagnostic test router for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/diagnostic_test_router.py
- Purpose: Expose diagnostic test generation and management endpoints

GENERATE:
FastAPI router with all diagnostic test endpoints.

REQUIREMENTS:
1. Endpoints:
   a. POST /api/diagnostic-test/generate
      - Body: TestGenerationRequest
      - Response: TestGenerationResult
      - Generate test synchronously (may take 2-3 minutes)
   b. POST /api/diagnostic-test/generate-async
      - Body: TestGenerationRequest
      - Response: {job_id: str, status: str}
      - Start async generation, return immediately
   c. GET /api/diagnostic-test/generation/status/{job_id}
      - Response: GenerationStatus
      - Check progress of async generation
   d. GET /api/diagnostic-test/{test_id}
      - Response: DiagnosticTest
      - Get complete test with all questions
   e. GET /api/diagnostic-test/{test_id}/metadata
      - Response: TestMetadata
      - Get test metadata without questions (faster)
   f. GET /api/diagnostic-test/student/{student_id}
      - Query params: status (optional), limit (default 10)
      - Response: List[TestMetadata]
      - Get all tests for student
   g. DELETE /api/diagnostic-test/{test_id}
      - Response: {success: bool, message: str}
      - Delete test (only if not submitted)
2. Authentication:
   - Use Firebase Auth token verification
   - Extract student_id from token
   - Verify student_id matches request
3. Validation:
   - Validate exam_type is supported
   - Check student exists in database
   - Verify test_id exists for GET/DELETE
4. Error handling:
   - 400: Invalid request
   - 401: Unauthorized
   - 404: Test not found
   - 500: Generation failed
5. Add rate limiting:
   - Max 1 test generation per student per hour
   - Check existing pending tests
6. Include OpenAPI documentation:
   - Detailed descriptions
   - Request/response examples
   - Error response examples
7. Add logging for all operations
8. Include type hints and comprehensive docstrings

INTEGRATE WITH:
- Uses: services/diagnostic_test_service.py
- Uses: models/diagnostic_test_models.py
- Uses: Firebase Auth for authentication

OUTPUT FORMAT:
- Provide complete code with all imports
- Include router with all endpoints
- Add dependency for authentication
- Include error handlers
- Add comprehensive docstrings

TESTING:
Test with: curl -X POST http://localhost:8000/api/diagnostic-test/generate -H "Content-Type: application/json" -d '{"exam_type": "JEE_MAIN", "student_id": "test123"}'
```

---

### What You'll Get
- File: `tushar-backend/routers/diagnostic_test_router.py`
- Contains: FastAPI router with all endpoints
- Dependencies: services/diagnostic_test_service.py, models

---


## Prompt 10: Test Management Router

### Purpose
Create endpoints for test submission, results, and status management.

### When to Use
After diagnostic test router - handles test lifecycle after generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/test_management_router.py`

**Step 2**: Type this comment:
```python
# Create test management router for FastAPI
# - POST /api/diagnostic-test/{test_id}/start - Start test (record start time)
# - POST /api/diagnostic-test/{test_id}/submit - Submit test answers
# - GET /api/diagnostic-test/{test_id}/results - Get test results
# - GET /api/diagnostic-test/{test_id}/status - Get test status
# - PATCH /api/diagnostic-test/{test_id}/status - Update test status
# 
# Requirements:
# - Use FastAPI APIRouter
# - Add authentication
# - Calculate scores with negative marking
# - Store results in Firestore
# - Return detailed analytics
# - Type hints and docstrings
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create test management router for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/routers/test_management_router.py
- Purpose: Handle test submission and results

GENERATE:
FastAPI router for test lifecycle management.

REQUIREMENTS:
1. Endpoints:
   a. POST /api/diagnostic-test/{test_id}/start
      - Body: {student_id: str}
      - Response: {success: bool, start_time: datetime}
      - Record test start time, update status to "in_progress"
   b. POST /api/diagnostic-test/{test_id}/submit
      - Body: TestSubmission
      - Response: TestResults
      - Calculate scores, store results, update status to "completed"
   c. GET /api/diagnostic-test/{test_id}/results
      - Response: TestResults
      - Get calculated results (only if test completed)
   d. GET /api/diagnostic-test/{test_id}/status
      - Response: {status: str, start_time: datetime, time_remaining: int}
      - Get current test status
   e. PATCH /api/diagnostic-test/{test_id}/status
      - Body: {status: str}
      - Response: {success: bool}
      - Update test status (admin only)
2. Score calculation:
   - For each answer:
     - Correct: +marks
     - Incorrect: -negative_marks
     - Unattempted: 0
   - Calculate section-wise scores
   - Calculate total score and percentage
3. Results storage:
   - Store in Firestore: test_results collection
   - Include: scores, section_scores, answers, time_taken
   - Link to test_id and student_id
4. Validation:
   - Test must exist and belong to student
   - Test must be in correct status for operation
   - Start: status must be "pending"
   - Submit: status must be "in_progress"
   - Results: status must be "completed"
5. Time tracking:
   - Check if test time expired
   - Auto-submit if time exceeded
   - Calculate time remaining
6. Authentication and authorization:
   - Verify student_id from token
   - Only student who owns test can start/submit
   - Only admin can update status
7. Error handling:
   - 400: Invalid operation for current status
   - 401: Unauthorized
   - 404: Test not found
   - 409: Test already started/submitted
8. Include OpenAPI documentation
9. Add logging for all operations
10. Include type hints and comprehensive docstrings

INTEGRATE WITH:
- Uses: models/diagnostic_test_models.py
- Uses: Firestore (diagnostic_tests, test_results collections)
- Uses: Firebase Auth for authentication

OUTPUT FORMAT:
- Provide complete code with all imports
- Include router with all endpoints
- Add score calculation logic
- Include error handlers
- Add comprehensive docstrings

TESTING:
Test with: curl -X POST http://localhost:8000/api/diagnostic-test/{test_id}/start -H "Content-Type: application/json" -d '{"student_id": "test123"}'
```

---

### What You'll Get
- File: `tushar-backend/routers/test_management_router.py`
- Contains: FastAPI router for test management
- Dependencies: models, Firestore

---


## Prompt 11: Exam Pattern JSON Files

### Purpose
Create JSON files with exam-specific patterns for JEE Main, JEE Advanced, and NEET.

### When to Use
After routers - provides pattern data for test generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/data/exam_patterns/jee_main_pattern.json`

**Step 2**: Type this comment:
```json
// Create JEE Main exam pattern
// - exam_name: "JEE Main"
// - total_questions: 200 (scaled for diagnostic)
// - subjects: Physics (60), Chemistry (60), Mathematics (80)
// - question_types: MCQ (70%), Numerical (30%)
// - marking_scheme: MCQ (+4, -1), Numerical (+4, 0)
// - duration_minutes: 180
// - difficulty_distribution: easy (30%), medium (50%), hard (20%)
```

**Step 3**: Manually create the JSON structure based on the comment

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create JEE Main exam pattern JSON file for Mentor AI platform.

CONTEXT:
- Project: Mentor AI Backend
- File: tushar-backend/data/exam_patterns/jee_main_pattern.json
- Purpose: Define JEE Main exam structure for diagnostic test generation

GENERATE:
Complete JSON file with JEE Main exam pattern.

REQUIREMENTS:
1. Structure:
{
  "exam_name": "JEE Main",
  "exam_code": "JEE_MAIN",
  "total_questions": 200,
  "duration_minutes": 180,
  "subjects": [
    {
      "name": "Physics",
      "question_count": 60,
      "weightage_percentage": 30
    },
    {
      "name": "Chemistry",
      "question_count": 60,
      "weightage_percentage": 30
    },
    {
      "name": "Mathematics",
      "question_count": 80,
      "weightage_percentage": 40
    }
  ],
  "question_types": [
    {
      "type": "single_correct_mcq",
      "count_per_subject": "70%",
      "description": "Multiple choice with single correct answer"
    },
    {
      "type": "numerical",
      "count_per_subject": "30%",
      "description": "Numerical answer (0-9999)"
    }
  ],
  "marking_scheme": {
    "single_correct_mcq": {
      "correct_marks": 4,
      "incorrect_marks": -1,
      "unattempted_marks": 0
    },
    "numerical": {
      "correct_marks": 4,
      "incorrect_marks": 0,
      "unattempted_marks": 0
    }
  },
  "difficulty_distribution": {
    "easy": 30,
    "medium": 50,
    "hard": 20
  },
  "sections": [
    {
      "name": "Section A - Physics",
      "subject": "Physics",
      "duration_minutes": 60,
      "instructions": "This section contains Physics questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers."
    },
    {
      "name": "Section B - Chemistry",
      "subject": "Chemistry",
      "duration_minutes": 60,
      "instructions": "This section contains Chemistry questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers."
    },
    {
      "name": "Section C - Mathematics",
      "subject": "Mathematics",
      "duration_minutes": 60,
      "instructions": "This section contains Mathematics questions. Each MCQ has 4 options with 1 correct answer. Numerical questions require integer answers."
    }
  ]
}

2. Also create similar files for:
   - jee_advanced_pattern.json (54 questions scaled to 200, multiple correct, partial marking)
   - neet_pattern.json (200 questions, Physics 40, Chemistry 40, Biology 120, all MCQ)

OUTPUT FORMAT:
- Provide complete JSON for all three exam patterns
- Ensure valid JSON syntax
- Include all required fields
- Add comments explaining each section

TESTING:
Test with: python -c "import json; data = json.load(open('data/exam_patterns/jee_main_pattern.json')); print('✓ Valid JSON')"
```

---

### What You'll Get
- Files: jee_main_pattern.json, jee_advanced_pattern.json, neet_pattern.json
- Contains: Complete exam pattern specifications
- Dependencies: None

---


## Prompt 12: Update Main Application

### Purpose
Register new routers in the main FastAPI application.

### When to Use
After all routers are created - integrates everything.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment where routers are registered:
```python
# Add diagnostic test routers
# - Import diagnostic_test_router and test_management_router
# - Register with prefix /api
# - Add tags for OpenAPI documentation
```

**Step 3**: Let Copilot generate the import and registration code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update main FastAPI application to include diagnostic test routers.

CONTEXT:
- Project: Mentor AI Backend
- File: tushar-backend/main.py
- Purpose: Register new diagnostic test routers

GENERATE:
Code to import and register the new routers.

REQUIREMENTS:
1. Import statements:
   - from routers.diagnostic_test_router import router as diagnostic_test_router
   - from routers.test_management_router import router as test_management_router
2. Register routers:
   - app.include_router(diagnostic_test_router, prefix="/api", tags=["Diagnostic Tests"])
   - app.include_router(test_management_router, prefix="/api", tags=["Test Management"])
3. Add after existing router registrations
4. Maintain consistent formatting with existing code

OUTPUT FORMAT:
- Provide only the code to add (imports and registrations)
- Include comments explaining the additions

TESTING:
Test with: uvicorn main:app --reload (verify no errors)
```

---

### What You'll Get
- Modified: tushar-backend/main.py
- Contains: New router registrations
- Dependencies: None

---


## Prompt 13: Update Requirements

### Purpose
Add any new dependencies needed for diagnostic test generation.

### When to Use
After all code is generated - ensures all dependencies are listed.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/requirements.txt`

**Step 2**: Add comment:
```
# Check if any new dependencies needed for diagnostic test generation
# Most dependencies should already be present from Days 4-5
```

**Step 3**: Verify all required packages are listed

---

### Option B: Manual Check

**Verify these packages are in requirements.txt**:
```
fastapi>=0.104.1
uvicorn[standard]>=0.24.0
firebase-admin>=6.2.0
google-cloud-aiplatform>=1.38.0
google-cloud-firestore>=2.13.0
pydantic[email]>=2.4.2
python-dotenv>=1.0.0
tiktoken>=0.5.1
```

---

### What You'll Get
- Modified: tushar-backend/requirements.txt (if needed)
- Contains: All required dependencies
- Dependencies: None

---


## Summary

You've now generated all the code for Day 6: Diagnostic Test Generation! Here's what you created:

**Services** (7 files):
1. ✅ diagnostic_test_service.py - Main orchestrator
2. ✅ test_pattern_service.py - Pattern application
3. ✅ question_distribution.py - Distribution calculation
4. ✅ test_assembler.py - Test assembly
5. ✅ test_validator.py - Test validation

**Utils** (3 files):
6. ✅ pattern_loader.py - Load exam patterns
7. ✅ weightage_calculator.py - Calculate distribution
8. ✅ test_shuffler.py - Shuffle questions (if created separately)

**Routers** (2 files):
9. ✅ diagnostic_test_router.py - Generation endpoints
10. ✅ test_management_router.py - Submission endpoints

**Models** (1 file):
11. ✅ diagnostic_test_models.py - All data models

**Data** (3 files):
12. ✅ jee_main_pattern.json - JEE Main pattern
13. ✅ jee_advanced_pattern.json - JEE Advanced pattern
14. ✅ neet_pattern.json - NEET pattern

**Configuration** (2 files):
15. ✅ main.py - Router registration
16. ✅ requirements.txt - Dependencies

## Next Steps

1. **Open CONFIGURATION.md** - Set up exam pattern files
2. **Open TESTING.md** - Test diagnostic test generation
3. **Open EXPECTED-OUTCOME.md** - Verify success criteria

## Troubleshooting

If you encounter issues:
1. Check **TROUBLESHOOTING.md** for common problems
2. Verify all Day 4 and Day 5 services are working
3. Check Firestore permissions
4. Verify Gemini API quota

Good luck with diagnostic test generation! 🚀

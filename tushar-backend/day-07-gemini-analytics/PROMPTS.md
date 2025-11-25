# AI Coding Agent Prompts for Day 7: Gemini Analytics

## Overview

This document contains all prompts needed to generate the analytics system code. Each prompt is optimized for AI coding agents (Windsurf, Copilot, Cursor) and chat-based LLMs (ChatGPT, Claude).

**Total Prompts**: 12
**Estimated Time**: 75 minutes

---

## Prompt 1: Score Calculator Service

### Purpose
Create a service to calculate test scores with support for different marking schemes (negative marking, partial credit).

### When to Use
First prompt - creates the foundation for score calculation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/score_calculator.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create a score calculator service for diagnostic tests with:
# - Support for different marking schemes (JEE Main, JEE Advanced, NEET)
# - Calculate total score with negative marking
# - Calculate subject-wise scores
# - Calculate topic-wise scores
# - Calculate accuracy percentages
# - Handle different question types (single correct, multiple correct, numerical)
# 
# Requirements:
# - Use Pydantic models for type safety
# - Add comprehensive error handling
# - Include detailed docstrings
# - Support partial marking for multiple correct questions
# - Calculate unattempted, correct, incorrect counts
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a score calculator service for the Mentor AI diagnostic test system.

CONTEXT:
- Project: Mentor AI EdTech Platform (Backend)
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/services/score_calculator.py

GENERATE:
A ScoreCalculator class that calculates test scores with different marking schemes.

REQUIREMENTS:
1. Support marking schemes:
   - JEE Main: MCQ (+4/-1), Numerical (+4/0)
   - JEE Advanced: Single (+3/-1), Multiple (+4 full, +1 partial, -2 wrong)
   - NEET: MCQ (+4/-1)
2. Calculate total score with negative marking
3. Calculate subject-wise scores (Physics, Chemistry, Math/Biology)
4. Calculate topic-wise scores
5. Calculate accuracy percentages
6. Count: total questions, attempted, correct, incorrect, unattempted
7. Handle edge cases (None answers, invalid question types)
8. Include comprehensive error handling
9. Add Python type hints and docstrings
10. Use Pydantic models for input/output

INTEGRATE WITH:
- models/score_models.py (will create next)
- Firestore (test questions and answers)

OUTPUT FORMAT:
- Complete Python code with all imports
- Class-based design with clear methods
- Example usage in docstring
```

**What You'll Get**: Complete score calculator service

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/score_calculator.py`
3. Paste and save

---

## Prompt 2: Score Models

### Purpose
Create Pydantic models for score calculation requests and responses.


### When to Use
After Prompt 1 - defines data models for score calculation.

---

### For Windsurf/Copilot:
```python
# File: tushar-backend/models/score_models.py
# Create Pydantic models for score calculation:
# - MarkingScheme: defines marks for correct/incorrect/partial
# - QuestionAnswer: student's answer for a question
# - TestSubmission: complete test submission with all answers
# - ScoreBreakdown: detailed score breakdown by subject/topic
# - ScoreResult: final score result with all metrics
# 
# Include: total_score, max_score, percentage, accuracy, subject_scores, topic_scores
```

### For ChatGPT/Claude:
```
Create Pydantic models for score calculation in Mentor AI.

CONTEXT:
- File: tushar-backend/models/score_models.py
- Stack: Python 3.11, Pydantic v2

GENERATE:
Pydantic models for score calculation system.

MODELS NEEDED:
1. MarkingScheme: correct_marks, incorrect_marks, partial_marks, unattempted_marks
2. QuestionAnswer: question_id, student_answer, time_taken, is_marked_for_review
3. TestSubmission: test_id, student_id, answers (List[QuestionAnswer]), submitted_at
4. SubjectScore: subject_name, score, max_score, percentage, accuracy, questions_attempted
5. TopicScore: topic_name, subject, score, max_score, accuracy, weightage
6. ScoreBreakdown: subject_scores, topic_scores, difficulty_scores
7. ScoreResult: total_score, max_score, percentage, accuracy, breakdown, counts

REQUIREMENTS:
- Use Pydantic v2 syntax
- Add field descriptions
- Include validators where needed
- Add example values in Config
- Use appropriate types (int, float, datetime, List, Dict)

OUTPUT: Complete models file with all imports
```

---

## Prompt 3: Performance Analyzer Service

### Purpose
Analyze test performance to identify strengths, weaknesses, and patterns.

### For Windsurf/Copilot:
```python
# File: tushar-backend/services/performance_analyzer.py
# Create performance analyzer service:
# - Identify strong topics (>80% accuracy)
# - Identify weak topics (<40% accuracy)
# - Analyze difficulty-wise performance
# - Detect time management issues
# - Find learning patterns (e.g., good at numerical, weak at conceptual)
# - Calculate priority levels for weak topics
# - Compare against benchmarks
# 
# Use score breakdown and question details to generate insights
```

### For ChatGPT/Claude:
```
Create a performance analyzer service for Mentor AI diagnostic tests.

CONTEXT:
- File: tushar-backend/services/performance_analyzer.py
- Stack: Python 3.11, FastAPI

GENERATE:
PerformanceAnalyzer class that analyzes test performance patterns.

REQUIREMENTS:
1. Identify strong topics (accuracy > 80%)
2. Identify weak topics (accuracy < 40%)
3. Identify moderate topics (40-80%)
4. Analyze difficulty-wise performance (easy/medium/hard)
5. Detect time management issues (too fast/too slow per question)
6. Find learning patterns:
   - Question type preferences (MCQ vs numerical)
   - Difficulty preferences
   - Subject strengths
7. Calculate priority levels for topics (high/medium/low)
8. Compare performance against benchmarks
9. Generate topic-wise recommendations
10. Include error handling and logging

INTEGRATE WITH:
- services/score_calculator.py (ScoreResult)
- models/performance_models.py (will create next)

OUTPUT: Complete service with class methods and docstrings
```

---

## Prompt 4: Performance Models

### Purpose
Create models for performance analysis data structures.

### For Windsurf/Copilot:
```python
# File: tushar-backend/models/performance_models.py
# Create Pydantic models for performance analysis:
# - TopicPerformance: topic, accuracy, questions, time_spent, priority
# - StrengthArea: topic, accuracy, reason
# - WeaknessArea: topic, accuracy, reason, priority, estimated_study_hours
# - LearningPattern: pattern_type, description, evidence
# - PerformanceAnalysis: strengths, weaknesses, patterns, recommendations
# 
# Include enums for priority levels and pattern types
```

### For ChatGPT/Claude:
```
Create Pydantic models for performance analysis in Mentor AI.

CONTEXT:
- File: tushar-backend/models/performance_models.py
- Stack: Python 3.11, Pydantic v2

MODELS NEEDED:
1. PriorityLevel (Enum): HIGH, MEDIUM, LOW
2. PatternType (Enum): TIME_MANAGEMENT, DIFFICULTY_PREFERENCE, QUESTION_TYPE, CONCEPTUAL_GAP
3. TopicPerformance: topic, subject, accuracy, correct, total, time_spent, priority, weightage
4. StrengthArea: topic, subject, accuracy, reason, recommendation
5. WeaknessArea: topic, subject, accuracy, reason, priority, estimated_study_hours, recommendation
6. LearningPattern: pattern_type, description, evidence, impact
7. PerformanceAnalysis: strengths, weaknesses, moderate_topics, patterns, overall_assessment

REQUIREMENTS:
- Use Pydantic v2 with Field descriptions
- Add validators for accuracy (0-100)
- Include example values
- Use appropriate types

OUTPUT: Complete models file
```

---

## Prompt 5: Analytics Context Builder

### Purpose
Build structured context from test results for Gemini analysis.

### For Windsurf/Copilot:
```python
# File: tushar-backend/utils/analytics_context_builder.py
# Create context builder for Gemini analytics:
# - Format test results into structured text
# - Include: overview, subject scores, topic scores, question details
# - Add metadata: exam type, time taken, benchmarks
# - Format for LLM readability (clear sections, bullet points)
# - Limit to max tokens (3000)
# - Include only relevant information for analysis
# 
# Output: formatted string ready for Gemini prompt
```

### For ChatGPT/Claude:
```
Create an analytics context builder for Gemini Flash analysis.

CONTEXT:
- File: tushar-backend/utils/analytics_context_builder.py
- Stack: Python 3.11

GENERATE:
AnalyticsContextBuilder class that formats test results for Gemini.

REQUIREMENTS:
1. Build structured context from:
   - ScoreResult (total, subject, topic scores)
   - PerformanceAnalysis (strengths, weaknesses)
   - Test metadata (exam type, duration, questions)
2. Format sections:
   - OVERVIEW: total score, percentage, time taken
   - SUBJECT ANALYSIS: scores and accuracy per subject
   - TOPIC PERFORMANCE: detailed topic breakdown
   - QUESTION PATTERNS: difficulty and type analysis
3. Make LLM-readable:
   - Clear section headers
   - Bullet points for lists
   - Highlight important metrics
4. Limit to max_tokens (default 3000)
5. Prioritize most relevant information
6. Include benchmarks for comparison
7. Add error handling for missing data

OUTPUT: Complete class with build_context() method
```

---

## Prompt 6: Analytics Prompt Templates

### Purpose
Create prompt templates for Gemini analytics generation.

### For Windsurf/Copilot:
```python
# File: tushar-backend/utils/analytics_prompt_templates.py
# Create prompt templates for Gemini analytics:
# - System instructions for educational analytics
# - Task description for analyzing test performance
# - Output format specification (JSON structure)
# - Examples of good analytics
# - Validation instructions
# 
# Templates for: JEE Main, JEE Advanced, NEET
# Include: strengths, weaknesses, patterns, recommendations
```

### For ChatGPT/Claude:
```
Create prompt templates for Gemini Flash analytics generation.

CONTEXT:
- File: tushar-backend/utils/analytics_prompt_templates.py
- Stack: Python 3.11

GENERATE:
Prompt template functions for different exam types.

REQUIREMENTS:
1. Create template function: build_analytics_prompt(context, exam_type)
2. Include sections:
   - SYSTEM: Role as educational analytics expert
   - CONTEXT: Formatted test results
   - TASK: Analyze and generate insights
   - OUTPUT FORMAT: JSON structure specification
   - EXAMPLES: 1-2 example analytics
   - VALIDATION: Self-check instructions
3. Specify output JSON structure:
   {
     "strengths": [{"topic", "reason", "recommendation"}],
     "weaknesses": [{"topic", "reason", "priority", "estimated_hours", "recommendation"}],
     "learning_patterns": ["pattern1", "pattern2"],
     "overall_assessment": "text",
     "study_strategy": "text"
   }
4. Add exam-specific instructions (JEE/NEET patterns)
5. Emphasize actionable recommendations
6. Request specific study hour estimates

OUTPUT: Complete template functions
```

---

## Prompt 7: Gemini Analytics Service

### Purpose
Integrate with Gemini Flash API for analytics generation.

### For Windsurf/Copilot:
```python
# File: tushar-backend/services/gemini_analytics_service.py
# Create Gemini analytics service:
# - Initialize Gemini Flash client
# - Send analytics prompt to Gemini
# - Parse JSON response
# - Handle API errors and retries
# - Validate response structure
# - Add timeout handling
# - Log API calls for monitoring
# 
# Use google-generativeai library
# Model: gemini-1.5-flash
```

### For ChatGPT/Claude:
```
Create a Gemini Flash service for analytics generation.

CONTEXT:
- File: tushar-backend/services/gemini_analytics_service.py
- Stack: Python 3.11, google-generativeai
- Model: gemini-1.5-flash

GENERATE:
GeminiAnalyticsService class for AI-powered analytics.

REQUIREMENTS:
1. Initialize Gemini client with API key from environment
2. Method: generate_analytics(context: str, exam_type: str) -> dict
3. Build prompt using analytics_prompt_templates
4. Send to Gemini Flash with:
   - temperature=0.7 (balanced creativity)
   - max_output_tokens=2000
   - response_mime_type="application/json"
5. Parse JSON response
6. Validate response structure (has required fields)
7. Handle errors:
   - API errors (retry with exponential backoff)
   - Parsing errors (extract JSON from text)
   - Validation errors (return partial results)
8. Add timeout (30 seconds)
9. Log all API calls (request, response, latency)
10. Include comprehensive error handling

INTEGRATE WITH:
- utils/analytics_prompt_templates.py
- utils/analytics_parser.py (will create next)

OUTPUT: Complete service class
```

---

## Prompt 8: Analytics Parser

### Purpose
Parse and validate Gemini analytics responses.

### For Windsurf/Copilot:
```python
# File: tushar-backend/utils/analytics_parser.py
# Create analytics response parser:
# - Parse JSON from Gemini response
# - Extract JSON from markdown code blocks if needed
# - Validate required fields exist
# - Validate data types and ranges
# - Handle malformed responses
# - Return structured analytics object
# 
# Use Pydantic for validation
```

### For ChatGPT/Claude:
```
Create a parser for Gemini analytics responses.

CONTEXT:
- File: tushar-backend/utils/analytics_parser.py
- Stack: Python 3.11, Pydantic

GENERATE:
AnalyticsParser class to parse and validate Gemini output.

REQUIREMENTS:
1. Method: parse_response(text: str) -> AnalyticsInsights
2. Try multiple parsing strategies:
   - Direct JSON parse
   - Extract from markdown code blocks (```json...```)
   - Extract JSON array/object from text
3. Validate structure:
   - Has strengths, weaknesses, patterns
   - Each weakness has priority and estimated_hours
   - All required fields present
4. Handle errors:
   - Malformed JSON: try to fix common issues
   - Missing fields: use defaults
   - Invalid types: convert if possible
5. Create Pydantic model: AnalyticsInsights
6. Return validated object or raise descriptive error
7. Log parsing issues for debugging

OUTPUT: Complete parser class with AnalyticsInsights model
```

---

## Prompt 9: Analytics Report Builder

### Purpose
Assemble complete analytics report from all components.

### For Windsurf/Copilot:
```python
# File: tushar-backend/services/analytics_report_builder.py
# Create analytics report builder:
# - Combine score results, performance analysis, AI insights
# - Structure complete report with all sections
# - Add visualization data for frontend charts
# - Calculate priority topics for study plan
# - Generate summary statistics
# - Format for frontend consumption
# 
# Output: comprehensive analytics report ready for storage and display
```

### For ChatGPT/Claude:
```
Create an analytics report builder for Mentor AI.

CONTEXT:
- File: tushar-backend/services/analytics_report_builder.py
- Stack: Python 3.11, Pydantic

GENERATE:
AnalyticsReportBuilder class that assembles complete reports.

REQUIREMENTS:
1. Method: build_report(score_result, performance_analysis, ai_insights, test_metadata) -> AnalyticsReport
2. Report sections:
   - overview: total score, percentage, percentile, time taken
   - subject_analysis: per-subject breakdown with AI insights
   - topic_analysis: per-topic performance with priorities
   - ai_insights: strengths, weaknesses, patterns from Gemini
   - recommendations: actionable study recommendations
   - priority_topics: sorted list for study plan (top 10)
   - visualization_data: data for charts (subject pie, topic bar, difficulty line)
3. Calculate additional metrics:
   - Percentile (based on benchmarks)
   - Improvement potential per topic
   - Estimated total study hours needed
4. Format for frontend:
   - Clear structure
   - All data ready for display
   - Chart data in appropriate format
5. Add metadata: generated_at, test_id, student_id
6. Include error handling

OUTPUT: Complete builder class with AnalyticsReport model
```

---

## Prompt 10: Analytics Service (Main Orchestrator)

### Purpose
Main service that orchestrates the entire analytics generation pipeline.

### For Windsurf/Copilot:
```python
# File: tushar-backend/services/analytics_service.py
# Create main analytics orchestration service:
# - Coordinate all analytics components
# - Process test submission
# - Calculate scores
# - Analyze performance
# - Generate AI insights with Gemini
# - Build complete report
# - Store in Firestore
# - Return analytics ID
# 
# Pipeline: submission → score → analyze → AI insights → report → store
```

### For ChatGPT/Claude:
```
Create the main analytics orchestration service for Mentor AI.

CONTEXT:
- File: tushar-backend/services/analytics_service.py
- Stack: Python 3.11, FastAPI, Firestore

GENERATE:
AnalyticsService class that orchestrates analytics generation.

REQUIREMENTS:
1. Method: generate_analytics(test_id, student_id, answers) -> analytics_id
2. Pipeline steps:
   a. Retrieve test questions from Firestore
   b. Calculate scores using ScoreCalculator
   c. Analyze performance using PerformanceAnalyzer
   d. Build context using AnalyticsContextBuilder
   e. Generate AI insights using GeminiAnalyticsService
   f. Build report using AnalyticsReportBuilder
   g. Store report in Firestore
   h. Return analytics_id
3. Method: get_analytics(analytics_id) -> AnalyticsReport
4. Method: get_student_analytics(student_id) -> List[AnalyticsReport]
5. Add progress tracking for long operations
6. Implement caching for repeated requests
7. Handle errors at each step gracefully
8. Log pipeline execution time
9. Add retry logic for Gemini API calls
10. Include comprehensive error handling

INTEGRATE WITH:
- services/score_calculator.py
- services/performance_analyzer.py
- services/gemini_analytics_service.py
- services/analytics_report_builder.py
- Firestore (tests, analytics collections)

OUTPUT: Complete orchestration service
```

---

## Prompt 11: Analytics Models

### Purpose
Create Pydantic models for analytics reports and API responses.

### For Windsurf/Copilot:
```python
# File: tushar-backend/models/analytics_models.py
# Create Pydantic models for analytics:
# - AnalyticsRequest: test_id, student_id, answers
# - AnalyticsInsights: AI-generated insights from Gemini
# - VisualizationData: data for frontend charts
# - AnalyticsReport: complete analytics report
# - AnalyticsResponse: API response with analytics_id
# 
# Include all fields from report builder
```

### For ChatGPT/Claude:
```
Create Pydantic models for analytics reports in Mentor AI.

CONTEXT:
- File: tushar-backend/models/analytics_models.py
- Stack: Python 3.11, Pydantic v2

MODELS NEEDED:
1. AnalyticsRequest: test_id, student_id, answers (List[QuestionAnswer])
2. AnalyticsOverview: total_score, max_score, percentage, percentile, time_taken, accuracy
3. SubjectAnalysis: subject, score, percentage, accuracy, strengths, weaknesses, ai_insights
4. TopicAnalysis: topic, subject, accuracy, priority, estimated_hours, recommendation
5. AnalyticsInsights: strengths, weaknesses, learning_patterns, overall_assessment, study_strategy
6. VisualizationData: subject_chart, topic_chart, difficulty_chart, time_chart
7. PriorityTopic: topic, subject, priority, reason, estimated_hours
8. AnalyticsReport: overview, subject_analysis, topic_analysis, ai_insights, priority_topics, visualization_data, metadata
9. AnalyticsResponse: analytics_id, status, message

REQUIREMENTS:
- Use Pydantic v2 syntax
- Add comprehensive field descriptions
- Include validators
- Add example values
- Use appropriate types (datetime, List, Dict, Enum)

OUTPUT: Complete models file
```

---

## Prompt 12: Analytics Router

### Purpose
Create FastAPI endpoints for analytics generation and retrieval.

### For Windsurf/Copilot:
```python
# File: tushar-backend/routers/analytics_router.py
# Create FastAPI router for analytics:
# - POST /api/analytics/generate: generate analytics from test submission
# - GET /api/analytics/{analytics_id}: get analytics report
# - GET /api/analytics/student/{student_id}: get student's analytics history
# - GET /api/analytics/test/{test_id}: get analytics for specific test
# - GET /api/analytics/{analytics_id}/insights: get AI insights only
# - GET /api/analytics/{analytics_id}/weak-topics: get priority weak topics
# 
# Include authentication, error handling, response models
```

### For ChatGPT/Claude:
```
Create FastAPI router for analytics endpoints in Mentor AI.

CONTEXT:
- File: tushar-backend/routers/analytics_router.py
- Stack: Python 3.11, FastAPI

GENERATE:
FastAPI router with analytics endpoints.

ENDPOINTS:
1. POST /api/analytics/generate
   - Body: AnalyticsRequest
   - Returns: AnalyticsResponse with analytics_id
   - Calls: analytics_service.generate_analytics()

2. GET /api/analytics/{analytics_id}
   - Returns: AnalyticsReport
   - Calls: analytics_service.get_analytics()

3. GET /api/analytics/student/{student_id}
   - Query params: limit (default 10), offset (default 0)
   - Returns: List[AnalyticsReport]
   - Calls: analytics_service.get_student_analytics()

4. GET /api/analytics/test/{test_id}
   - Returns: AnalyticsReport
   - Calls: analytics_service.get_analytics_by_test()

5. GET /api/analytics/{analytics_id}/insights
   - Returns: AnalyticsInsights only
   - Extracts from full report

6. GET /api/analytics/{analytics_id}/weak-topics
   - Returns: List[PriorityTopic]
   - Filters high-priority topics

REQUIREMENTS:
- Add authentication dependency (verify student/parent)
- Include comprehensive error handling (404, 500)
- Add request validation
- Use response models
- Add API documentation (descriptions, examples)
- Include logging
- Add rate limiting considerations

OUTPUT: Complete router with all endpoints
```

---

## Testing Your Generated Code

After generating all code:

1. **Verify imports**: Ensure all imports are correct
2. **Check dependencies**: Add any new packages to requirements.txt
3. **Test individually**: Test each service independently
4. **Integration test**: Test complete pipeline
5. **Proceed to CONFIGURATION.md**: Set up Gemini API

---

## Prompt Execution Order

Follow this order for best results:

1. Score Calculator Service (Prompt 1)
2. Score Models (Prompt 2)
3. Performance Analyzer Service (Prompt 3)
4. Performance Models (Prompt 4)
5. Analytics Context Builder (Prompt 5)
6. Analytics Prompt Templates (Prompt 6)
7. Gemini Analytics Service (Prompt 7)
8. Analytics Parser (Prompt 8)
9. Analytics Report Builder (Prompt 9)
10. Analytics Service - Main (Prompt 10)
11. Analytics Models (Prompt 11)
12. Analytics Router (Prompt 12)

---

## Next Steps

After completing all prompts:
1. Open **CONFIGURATION.md** for manual setup steps
2. Test Gemini API connection
3. Proceed to **TESTING.md** to verify analytics generation

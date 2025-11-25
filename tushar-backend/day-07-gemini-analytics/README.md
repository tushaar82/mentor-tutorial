# Day 7: Gemini Analytics (Backend)

## What You're Building

An AI-powered analytics system that uses Google Gemini Flash to analyze diagnostic test results and generate comprehensive, personalized insights about student performance. This system processes test answers, calculates scores with negative marking, identifies strengths and weaknesses across topics, and generates detailed analytics reports with actionable recommendations for study planning.

## Why This Matters

Analytics transform raw test scores into actionable learning insights:
- **Personalized Insights**: AI analyzes patterns in student performance beyond simple scoring
- **Topic-Level Analysis**: Identifies specific weak topics requiring focused study
- **Strength Recognition**: Highlights areas where student excels for confidence building
- **Learning Patterns**: Detects patterns like time management issues, careless mistakes, conceptual gaps
- **Actionable Recommendations**: Provides specific study strategies for improvement
- **Study Plan Foundation**: Analytics drive personalized schedule generation in Day 8
- **Progress Tracking**: Establishes baseline for measuring improvement over time

Without intelligent analytics, students only see scores without understanding what to improve or how to improve it, making the learning process ineffective.

## How It Works

**Analytics Generation Pipeline:**

1. **Test Result Processing**:
   - Input: Test ID, student answers, time taken per question
   - Retrieve test questions and correct answers from Firestore
   - Calculate raw scores with marking scheme (negative marking)
   - Compute subject-wise and topic-wise scores
   - Calculate accuracy, speed, and completion metrics

2. **Performance Analysis**:
   - Analyze correct/incorrect patterns by topic
   - Identify consistently weak topics (< 40% accuracy)
   - Identify strong topics (> 80% accuracy)
   - Detect difficulty-specific patterns (struggles with hard questions)
   - Calculate time spent per question and identify time management issues
   - Compare performance against expected patterns

3. **Context Building for Gemini**:
   - Format test results into structured context
   - Include: overall score, subject scores, topic scores, question-level details
   - Add metadata: exam type, total questions, time taken
   - Include syllabus weightages for each topic
   - Add exam-specific benchmarks (average scores, percentiles)

4. **AI Analytics Generation**:
   - Send structured context to Gemini Flash
   - Use specialized prompt for educational analytics
   - Request: strengths, weaknesses, learning patterns, recommendations
   - Gemini analyzes data and generates human-readable insights
   - Parse and validate Gemini response

5. **Analytics Report Assembly**:
   - Combine calculated metrics with AI insights
   - Structure report: overview, subject analysis, topic analysis, recommendations
   - Add visualizations data (charts, graphs for frontend)
   - Include priority topics for study plan
   - Calculate estimated study hours needed per topic

6. **Storage and Retrieval**:
   - Store analytics report in Firestore
   - Link to student profile and test
   - Enable retrieval for frontend display
   - Cache for quick access
   - Track analytics history for progress monitoring

**Technology Stack:**
- Google Gemini Flash 1.5 (AI analytics generation)
- Firestore (test and analytics storage)
- FastAPI (analytics orchestration)
- Diagnostic Test Service from Day 6 (test retrieval)

**Data Flow:**
```
Test Submission → Calculate Scores → Analyze Performance → Build Context → Gemini Analysis → Generate Report → Store → Return Analytics
```

## Learning Objectives

By completing this task, you will:
- Understand AI-powered educational analytics
- Learn how to use Gemini Flash for data analysis and insights
- Implement scoring systems with negative marking
- Design analytics reports for educational platforms
- Build context for LLM-based analysis
- Implement prompt engineering for analytics generation
- Handle structured data analysis with AI
- Test analytics generation independently with sample test results
- Optimize for analytics quality and generation speed

## Time Estimate

- **LLM Code Generation**: 75 minutes (10-12 prompts)
- **Configuration**: 30 minutes (Test Gemini API, validate prompts)
- **Testing**: 45 minutes (Generate analytics for sample tests)
- **Total**: 2.5 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Day 4: Vector Search Setup (must be complete)
- ✅ Day 5: RAG Implementation (must be complete)
- ✅ Day 6: Diagnostic Test Generation (CRITICAL - must be complete)
- ✅ Diagnostic test generation working
- ✅ Backend server running successfully

**Required Software:**
- Python 3.11+ with virtual environment
- Google Cloud Project with billing enabled
- gcloud CLI installed and authenticated
- curl or Postman for API testing

**Required Google Cloud APIs:**
- Gemini API (already enabled from Day 5)

**Knowledge Prerequisites:**
- Understanding of Gemini Flash from Day 5
- Familiarity with diagnostic test structure from Day 6
- Knowledge of educational analytics concepts
- Understanding of JEE/NEET marking schemes

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── analytics_service.py           # Main analytics orchestration
│   ├── score_calculator.py            # Calculate scores with marking scheme
│   ├── performance_analyzer.py        # Analyze performance patterns
│   ├── gemini_analytics_service.py    # Gemini Flash analytics integration
│   └── analytics_report_builder.py   # Build complete analytics report
├── routers/
│   ├── analytics_router.py            # Analytics endpoints
│   └── test_submission_router.py      # Test submission and scoring
├── models/
│   ├── analytics_models.py            # Analytics request/response models
│   ├── score_models.py                # Score calculation models
│   └── performance_models.py          # Performance analysis models
├── utils/
│   ├── analytics_context_builder.py   # Build context for Gemini
│   ├── analytics_prompt_templates.py  # Prompt templates for analytics
│   ├── analytics_parser.py            # Parse Gemini analytics response
│   └── benchmark_calculator.py        # Calculate benchmarks and percentiles
└── data/
    ├── analytics_templates/
    │   ├── jee_analytics_template.json    # JEE analytics structure
    │   └── neet_analytics_template.json   # NEET analytics structure
    └── sample_results/
        ├── sample_test_submission.json    # Sample test answers
        └── sample_analytics_output.json   # Expected analytics output
```

## Files You'll Modify

```
tushar-backend/
├── main.py                            # Add analytics routers
└── requirements.txt                   # Add any new dependencies
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Score calculator with negative marking support
- ✅ Performance analyzer identifying strengths and weaknesses
- ✅ Topic-wise and subject-wise score computation
- ✅ Context builder for Gemini analytics
- ✅ Specialized analytics prompts for educational insights
- ✅ Gemini Flash integration for AI-powered analysis
- ✅ Response parser for structured analytics
- ✅ Analytics report builder with comprehensive insights
- ✅ Benchmark calculator for percentile computation
- ✅ Priority topic identification for study planning
- ✅ Visualization data generation for frontend charts
- ✅ Analytics storage in Firestore
- ✅ Error handling and validation
- ✅ Standalone testing with sample test results

## Analytics Endpoints You'll Create

### Test Submission Endpoints
- `POST /api/test/submit` - Submit test answers and generate analytics
- `POST /api/test/{test_id}/submit` - Submit specific test
- `GET /api/test/{test_id}/submission` - Get submission details

### Analytics Endpoints
- `POST /api/analytics/generate` - Generate analytics for test submission
- `GET /api/analytics/{analytics_id}` - Get analytics report
- `GET /api/analytics/student/{student_id}` - Get student's analytics history
- `GET /api/analytics/test/{test_id}` - Get analytics for specific test

### Score Endpoints
- `POST /api/score/calculate` - Calculate score for test submission
- `GET /api/score/{test_id}` - Get score details
- `GET /api/score/breakdown/{test_id}` - Get detailed score breakdown

### Insights Endpoints
- `GET /api/analytics/{analytics_id}/insights` - Get AI-generated insights
- `GET /api/analytics/{analytics_id}/recommendations` - Get study recommendations
- `GET /api/analytics/{analytics_id}/weak-topics` - Get priority weak topics

## Analytics Report Structure

### Overview Section
- Total score (out of maximum)
- Percentage score
- Subject-wise scores
- Overall accuracy
- Time taken vs. allocated time
- Percentile (compared to benchmarks)

### Subject Analysis
For each subject (Physics, Chemistry, Math/Biology):
- Score and percentage
- Accuracy rate
- Strong topics (> 80% accuracy)
- Weak topics (< 40% accuracy)
- Time management (avg time per question)

### Topic Analysis
For each topic:
- Questions attempted
- Correct answers
- Accuracy percentage
- Difficulty-wise performance
- Time spent
- Weightage in exam
- Priority level (high/medium/low)

### AI-Generated Insights
- **Strengths**: Topics where student excels
- **Weaknesses**: Topics requiring immediate attention
- **Learning Patterns**: Detected patterns (e.g., "struggles with numerical questions")
- **Time Management**: Analysis of time usage
- **Recommendations**: Specific study strategies

### Study Plan Inputs
- Priority topics (sorted by importance)
- Estimated study hours per topic
- Recommended difficulty progression
- Practice question requirements

## Gemini Analytics Prompt Structure

### Context Format
```
STUDENT PERFORMANCE DATA:
- Exam: JEE Main Diagnostic Test
- Total Questions: 200
- Total Score: 520/800 (65%)
- Time Taken: 165 minutes / 180 minutes

SUBJECT SCORES:
- Physics: 180/240 (75%)
- Chemistry: 160/240 (67%)
- Mathematics: 180/320 (56%)

TOPIC PERFORMANCE:
1. Mechanics (Physics): 8/10 correct (80%) - STRONG
2. Thermodynamics (Physics): 4/10 correct (40%) - WEAK
3. Organic Chemistry: 5/10 correct (50%) - NEEDS IMPROVEMENT
...

QUESTION-LEVEL DETAILS:
[Detailed breakdown of each question]

TASK:
Analyze this performance and provide:
1. Key strengths (topics with >80% accuracy)
2. Critical weaknesses (topics with <40% accuracy)
3. Learning patterns (time management, difficulty preferences)
4. Specific recommendations for improvement
```

### Expected Gemini Output
```json
{
  "strengths": [
    {
      "topic": "Mechanics",
      "reason": "Consistently high accuracy (80%) across all difficulty levels",
      "recommendation": "Maintain with periodic practice"
    }
  ],
  "weaknesses": [
    {
      "topic": "Thermodynamics",
      "reason": "Low accuracy (40%), struggles with conceptual questions",
      "recommendation": "Focus on fundamental concepts, solve 50 practice questions",
      "priority": "high",
      "estimated_hours": 15
    }
  ],
  "learning_patterns": [
    "Strong in numerical problems, weak in conceptual questions",
    "Good time management overall, but rushes through difficult questions"
  ],
  "overall_assessment": "Solid foundation in Physics mechanics and Math algebra...",
  "study_strategy": "Prioritize Thermodynamics and Organic Chemistry..."
}
```

## Scoring System

### JEE Main Marking Scheme
- **MCQ (Single Correct)**: +4 correct, -1 incorrect, 0 unattempted
- **Numerical**: +4 correct, 0 incorrect/unattempted

### JEE Advanced Marking Scheme
- **Single Correct**: +3 correct, -1 incorrect
- **Multiple Correct**: +4 full correct, +1 partial, -2 incorrect

### NEET Marking Scheme
- **MCQ**: +4 correct, -1 incorrect, 0 unattempted

### Implementation
```python
def calculate_score(question, answer, marking_scheme):
    if answer is None:  # Unattempted
        return 0
    
    if question.type == "single_correct":
        if answer == question.correct_answer:
            return marking_scheme.correct_marks
        else:
            return marking_scheme.incorrect_marks  # Negative
    
    elif question.type == "numerical":
        if abs(answer - question.correct_answer) < 0.01:
            return marking_scheme.correct_marks
        else:
            return 0  # No negative marking
    
    elif question.type == "multiple_correct":
        correct_count = len(set(answer) & set(question.correct_answers))
        total_correct = len(question.correct_answers)
        
        if correct_count == total_correct and len(answer) == total_correct:
            return marking_scheme.full_marks
        elif correct_count > 0:
            return marking_scheme.partial_marks
        else:
            return marking_scheme.incorrect_marks
```

## Next Steps

After completing this task, you'll move to:
- **Day 8**: Schedule Generation (use analytics to create personalized study plans)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Test Gemini API)
4. **TESTING.md** - Verify analytics generation works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **AI-INTEGRATION.md** - Detailed Gemini Flash analytics explanation
7. **USER-FLOW.md** - Test submission to analytics flow
8. **TROUBLESHOOTING.md** - Common analytics and Gemini issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating analytics code with your AI coding agent!

# AI Coding Agent Prompts for Day 8: Schedule Generation

## Overview

This document contains all prompts needed to generate the schedule generation system. Copy-paste these prompts into your AI coding agent (Windsurf/Copilot inline or ChatGPT/Claude chat) to generate the code.

**Recommended Approach**: Use ChatGPT/Claude for complex services, Windsurf/Copilot for simpler utilities.

---

## Prompt 1: Priority Calculator Service

### Purpose
Calculate priority scores for topics based on analytics, weightages, and difficulty.

### When to Use
First prompt - creates the foundation for schedule generation.

### What You'll Get
Complete priority calculation service with scoring algorithms.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/priority_calculator.py`

**Step 2**: Type this comment at the top of the file:
```python
# Create priority calculator service for schedule generation
# Calculate priority scores using: Priority = Weightage × (100 - Accuracy) × Difficulty
# Support JEE Main, JEE Advanced, and NEET exams
# Input: analytics data, syllabus weightages, exam type
# Output: sorted list of topics with priority scores and estimated hours
# Include functions for:
# - calculate_priority_score(topic, accuracy, weightage, difficulty)
# - estimate_study_hours(topic, accuracy, difficulty, base_hours)
# - rank_topics(analytics, weightages)
# - get_high_priority_topics(ranked_topics, threshold=200)
# Add type hints, docstrings, error handling
# Use Pydantic models for input/output
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a priority calculator service for an AI-powered study schedule generator.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: Python 3.11, FastAPI, Pydantic
- File: tushar-backend/services/priority_calculator.py

GENERATE:
A complete priority calculator service that ranks topics by importance for schedule generation.

REQUIREMENTS:
1. Implement priority score calculation:
   - Formula: Priority Score = Weightage × (100 - Current Accuracy) × Difficulty Multiplier
   - Difficulty Multipliers: Easy (0.8), Medium (1.0), Hard (1.2)
   - Handle edge cases (accuracy > 100, negative values)

2. Implement study time estimation:
   - Formula: Hours = Base Hours × Difficulty Factor × Weakness Factor
   - Weakness Factor: High accuracy (>70%): 0.5, Medium (40-70%): 1.0, Low (<40%): 1.5
   - Return realistic time estimates (0.5 to 20 hours per topic)

3. Create topic ranking function:
   - Input: analytics data (topic accuracies), syllabus weightages, exam type
   - Sort topics by priority score (highest first)
   - Include topic metadata: subject, current accuracy, target accuracy, estimated hours

4. Create high-priority filter:
   - Filter topics with priority score above threshold (default 200)
   - Return top N topics if specified
   - Include priority level labels: "critical", "high", "medium", "low"

5. Support multiple exam types:
   - JEE Main, JEE Advanced, NEET
   - Load weightages from data files or constants
   - Handle exam-specific difficulty adjustments

6. Add comprehensive error handling:
   - Validate input data (accuracies 0-100, weightages sum to 100)
   - Handle missing topics in analytics or weightages
   - Provide meaningful error messages

7. Include detailed docstrings and type hints for all functions

8. Add example usage in docstring showing typical workflow

INTEGRATE WITH:
- models/analytics_models.py (analytics data structures from Day 7)
- models/schedule_models.py (priority and topic models - will create next)
- data/weightages/*.json (syllabus weightage data)

OUTPUT FORMAT:
- Complete Python file with all imports
- Pydantic models for input/output if needed
- Helper functions for calculations
- Main service class or functions
- Example usage in module docstring
```

**What to Do**:
1. Copy the generated code
2. Create file `tushar-backend/services/priority_calculator.py`
3. Paste and save

---

## Prompt 2: Schedule Models

### Purpose
Define Pydantic models for schedule requests, responses, and data structures.

### When to Use
After priority calculator - defines data structures for schedule system.

### What You'll Get
Complete Pydantic models for schedule generation and tracking.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/models/schedule_models.py`

**Step 2**: Type this comment:
```python
# Create Pydantic models for schedule generation system
# Models needed:
# - ScheduleRequest: student_id, analytics_id, exam_date, daily_hours
# - TopicPriority: topic, subject, priority_score, accuracy, weightage, estimated_hours
# - DailyTopic: topic, subject, hours, subtopics, resources, goals
# - ScheduleDay: day_number, date, topics, total_hours, milestones, completed
# - Schedule: schedule_id, student_id, exam_type, days, revision_days, practice_test_days
# - ProgressUpdate: schedule_id, day_number, topics_completed, time_spent, notes
# - RescheduleRequest: schedule_id, reason, remaining_days
# Add validators for dates, hours, and constraints
# Include example values in Config
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Pydantic models for a schedule generation system.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, Pydantic v2
- File: tushar-backend/models/schedule_models.py

GENERATE:
Complete Pydantic models for schedule generation, storage, and progress tracking.

REQUIREMENTS:
1. ScheduleRequest model:
   - student_id: str
   - analytics_id: str
   - exam_type: Literal["JEE_MAIN", "JEE_ADVANCED", "NEET"]
   - exam_date: date
   - daily_study_hours: float (default 4.0, range 2-8)
   - preferences: Optional[dict] (subject preferences, study time preferences)

2. TopicPriority model:
   - topic: str
   - subject: str
   - priority_score: float
   - current_accuracy: float (0-100)
   - target_accuracy: float (default 80)
   - weightage: float (percentage in exam)
   - estimated_hours: float
   - difficulty: Literal["easy", "medium", "hard"]
   - priority_level: Literal["critical", "high", "medium", "low"]

3. DailyTopic model:
   - topic: str
   - subject: str
   - priority: str
   - estimated_hours: float
   - subtopics: List[str]
   - resources: List[str] (videos, readings, practice sets)
   - goals: List[str] (daily learning objectives)

4. ScheduleDay model:
   - day_number: int
   - date: date
   - subjects: List[str]
   - topics: List[DailyTopic]
   - total_hours: float
   - milestones: List[str]
   - completed: bool (default False)
   - completion_percentage: float (default 0)

5. Schedule model:
   - schedule_id: str
   - student_id: str
   - analytics_id: str
   - exam_type: str
   - exam_date: date
   - generated_date: datetime
   - total_days: int
   - daily_study_hours: float
   - status: Literal["active", "completed", "abandoned"]
   - days: List[ScheduleDay]
   - revision_days: List[int] (day numbers for revision)
   - practice_test_days: List[int]
   - buffer_days: List[int]
   - priority_topics: List[TopicPriority]

6. ProgressUpdate model:
   - schedule_id: str
   - day_number: int
   - date: date
   - status: Literal["completed", "partial", "skipped"]
   - topics_completed: List[dict] (topic, time_spent, completion_percentage, notes)
   - total_time_spent: float
   - completion_percentage: float
   - next_day_adjustments: List[str]

7. RescheduleRequest model:
   - schedule_id: str
   - reason: Literal["missed_sessions", "topic_overrun", "low_performance", "student_request"]
   - current_day: int
   - notes: Optional[str]

8. Add validators:
   - Validate exam_date is in future
   - Validate daily_study_hours between 2-8
   - Validate accuracy and weightage percentages (0-100)
   - Validate day_number is positive

9. Include Config with example values for documentation

10. Add comprehensive docstrings explaining each model's purpose

INTEGRATE WITH:
- models/analytics_models.py (analytics data from Day 7)
- services/schedule_service.py (will use these models)

OUTPUT FORMAT:
- Complete Python file with all imports
- All Pydantic models with validators
- Type hints for all fields
- Docstrings for each model
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/models/schedule_models.py`
3. Paste and save

---

## Prompt 3: Time Calculator Utility

### Purpose
Calculate time allocations, available days, and schedule constraints.

### When to Use
After models - provides time calculation utilities.

### What You'll Get
Utility functions for time-based calculations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/time_calculator.py`

**Step 2**: Type this comment:
```python
# Create time calculator utility for schedule generation
# Functions needed:
# - calculate_available_days(start_date, exam_date, exclude_days=[])
# - calculate_total_study_hours(days, daily_hours)
# - distribute_hours_across_topics(topics, total_hours)
# - calculate_revision_days(total_days, percentage=0.1)
# - calculate_practice_test_days(total_days, interval=7)
# - validate_time_feasibility(topics, available_hours)
# - adjust_daily_hours(required_hours, available_days, max_daily=8)
# Add date handling, business logic for realistic scheduling
# Include type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create time calculator utilities for schedule generation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, datetime
- File: tushar-backend/utils/time_calculator.py

GENERATE:
Utility functions for time-based calculations in schedule generation.

REQUIREMENTS:
1. calculate_available_days function:
   - Input: start_date, exam_date, exclude_days (weekends, holidays)
   - Calculate business days between dates
   - Exclude specified days
   - Return number of available study days

2. calculate_total_study_hours function:
   - Input: number of days, daily study hours
   - Calculate total available study hours
   - Account for buffer (reduce by 10% for flexibility)
   - Return realistic total hours

3. distribute_hours_across_topics function:
   - Input: list of topics with estimated hours, total available hours
   - Distribute hours proportionally if total exceeds available
   - Ensure each topic gets minimum 1 hour
   - Return adjusted topic hours

4. calculate_revision_days function:
   - Input: total days, revision percentage (default 10%)
   - Calculate number of revision days
   - Return list of day numbers for revision (last N days)

5. calculate_practice_test_days function:
   - Input: total days, test interval (default 7 days)
   - Calculate practice test days (every N days)
   - Avoid last 3 days (revision period)
   - Return list of day numbers for tests

6. validate_time_feasibility function:
   - Input: topics with hours, available hours
   - Check if schedule is feasible
   - Return (is_feasible: bool, deficit_hours: float, recommendations: List[str])

7. adjust_daily_hours function:
   - Input: required total hours, available days, max daily hours (default 8)
   - Calculate required daily hours
   - Suggest adjustments if exceeds max
   - Return adjusted daily hours and warnings

8. calculate_buffer_days function:
   - Input: total days
   - Calculate buffer days (every 30 days)
   - Return list of buffer day numbers

9. Add comprehensive error handling and validation

10. Include detailed docstrings with examples

INTEGRATE WITH:
- models/schedule_models.py (schedule data structures)
- services/schedule_planner.py (will use these utilities)

OUTPUT FORMAT:
- Complete Python file with all imports
- Pure functions (no state)
- Type hints for all parameters and returns
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/utils/time_calculator.py`
3. Paste and save

---

## Prompt 4: Schedule Context Builder

### Purpose
Build structured context from analytics and constraints for Gemini scheduling prompts.

### When to Use
After time calculator - prepares data for AI scheduling.

### What You'll Get
Context builder that formats data for Gemini prompts.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/schedule_context_builder.py`

**Step 2**: Type this comment:
```python
# Create context builder for Gemini scheduling prompts
# Build structured context from:
# - Student profile (exam type, exam date, daily hours)
# - Analytics summary (overall score, strong/weak topics)
# - Priority topics (sorted by priority score)
# - Syllabus weightages (topic percentages)
# - Time constraints (available days, total hours)
# Format context as clear, structured text for LLM
# Include functions:
# - build_student_context(student_profile)
# - build_analytics_context(analytics)
# - build_priority_context(priority_topics)
# - build_constraints_context(time_constraints)
# - build_complete_context(all_inputs) -> formatted string
# Add type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a context builder for Gemini scheduling prompts.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11
- File: tushar-backend/utils/schedule_context_builder.py

GENERATE:
Context builder that formats analytics and constraints into structured prompts for Gemini Flash.

REQUIREMENTS:
1. build_student_context function:
   - Input: student profile dict (student_id, exam_type, exam_date, daily_hours)
   - Format as: "STUDENT PROFILE:\n- Student ID: ...\n- Exam: ...\n- Exam Date: ...\n- Days Available: ...\n- Daily Study Hours: ..."
   - Calculate and include days until exam
   - Return formatted string

2. build_analytics_context function:
   - Input: analytics data (overall score, subject scores, topic accuracies)
   - Format as: "ANALYTICS SUMMARY:\n- Overall Score: X/Y (Z%)\n- Strong Topics: ...\n- Weak Topics: ..."
   - Highlight key insights
   - Return formatted string

3. build_priority_context function:
   - Input: list of priority topics with scores
   - Format as: "PRIORITY TOPICS (sorted by impact):\n1. Topic - accuracy%, weightage%, Priority Score: X"
   - Include top 20 topics
   - Add priority level labels
   - Return formatted string

4. build_weightages_context function:
   - Input: syllabus weightages dict
   - Format as: "SYLLABUS WEIGHTAGES:\n- Physics: Topic1 (X%), Topic2 (Y%)..."
   - Group by subject
   - Return formatted string

5. build_constraints_context function:
   - Input: time constraints (total days, daily hours, revision days, test days)
   - Format as: "CONSTRAINTS:\n- Must cover all high-priority topics\n- Balance subjects\n- Include revision days: ..."
   - List all scheduling rules
   - Return formatted string

6. build_complete_context function:
   - Input: all context components
   - Combine all sections in logical order
   - Add task description and output format requirements
   - Return complete prompt string ready for Gemini

7. Add helper function format_topic_list:
   - Format list of topics consistently
   - Include relevant metadata
   - Handle long lists with truncation

8. Add helper function format_date:
   - Format dates in readable format
   - Calculate relative dates (days from now)

9. Include comprehensive docstrings and type hints

10. Add example usage showing complete context building

INTEGRATE WITH:
- models/schedule_models.py (data structures)
- models/analytics_models.py (analytics data)
- services/gemini_scheduler_service.py (will use this context)

OUTPUT FORMAT:
- Complete Python file with all imports
- Helper functions for formatting
- Main context building functions
- Example usage in docstring
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/utils/schedule_context_builder.py`
3. Paste and save

---

## Prompt 5: Schedule Prompt Templates

### Purpose
Define specialized prompt templates for Gemini scheduling.

### When to Use
After context builder - provides prompt templates.

### What You'll Get
Prompt templates optimized for schedule generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/schedule_prompt_templates.py`

**Step 2**: Type this comment:
```python
# Create prompt templates for Gemini schedule generation
# Templates needed:
# - SCHEDULE_GENERATION_TEMPLATE: main scheduling prompt
# - RESCHEDULE_TEMPLATE: adaptive rescheduling prompt
# - OPTIMIZATION_TEMPLATE: schedule optimization prompt
# Each template should include:
# - Clear task description
# - Context placeholders {student_context}, {analytics_context}, etc.
# - Output format specification (JSON structure)
# - Examples of good schedules
# - Constraints and rules
# Use f-string format for easy variable substitution
# Add docstrings explaining each template's purpose
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create prompt templates for Gemini schedule generation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11
- File: tushar-backend/utils/schedule_prompt_templates.py

GENERATE:
Prompt templates optimized for AI-powered schedule generation with Gemini Flash.

REQUIREMENTS:
1. SCHEDULE_GENERATION_TEMPLATE:
   - Main template for generating new schedules
   - Include placeholders: {student_context}, {analytics_context}, {priority_context}, {weightages_context}, {constraints_context}
   - Task description: "Create a day-by-day study schedule that prioritizes high-weightage weak topics..."
   - Output format: Specify JSON structure with days, topics, subtopics, resources, goals
   - Include example of good schedule structure
   - Add constraints: balance subjects, realistic hours, include revision/tests

2. RESCHEDULE_TEMPLATE:
   - Template for adaptive rescheduling
   - Include placeholders: {current_progress}, {remaining_days}, {incomplete_topics}, {reason}
   - Task: "Regenerate schedule for remaining days considering current progress..."
   - Focus on catching up while maintaining priorities
   - Output: Updated schedule for remaining days

3. OPTIMIZATION_TEMPLATE:
   - Template for optimizing existing schedules
   - Include placeholders: {current_schedule}, {issues}, {optimization_goals}
   - Task: "Optimize this schedule to address: {issues}"
   - Maintain overall structure while improving specific aspects
   - Output: Optimized schedule with changes highlighted

4. DAILY_BREAKDOWN_TEMPLATE:
   - Template for detailed daily planning
   - Include placeholders: {topic}, {estimated_hours}, {current_level}
   - Task: "Create detailed study plan for {topic} in {hours} hours"
   - Output: Subtopics, resources, timeline, goals

5. Add OUTPUT_FORMAT_SPECIFICATION constant:
   - Define exact JSON structure expected from Gemini
   - Include all required fields
   - Provide example JSON

6. Add SCHEDULING_RULES constant:
   - List all scheduling constraints
   - Subject balance rules
   - Time allocation rules
   - Revision and test day rules

7. Add helper function get_template:
   - Input: template_name, context_dict
   - Return: formatted prompt string
   - Handle missing context gracefully

8. Include comprehensive docstrings for each template

9. Add examples showing template usage

INTEGRATE WITH:
- utils/schedule_context_builder.py (context formatting)
- services/gemini_scheduler_service.py (will use these templates)

OUTPUT FORMAT:
- Complete Python file with all imports
- Template constants as multi-line strings
- Helper functions for template formatting
- Docstrings with usage examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/utils/schedule_prompt_templates.py`
3. Paste and save

---

## Prompt 6: Gemini Scheduler Service

### Purpose
Integrate with Gemini Flash API for AI-powered schedule generation.

### When to Use
After prompt templates - core AI scheduling service.

### What You'll Get
Complete Gemini integration for schedule generation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/gemini_scheduler_service.py`

**Step 2**: Type this comment:
```python
# Create Gemini scheduler service for AI-powered schedule generation
# Use Gemini Flash 1.5 for schedule generation
# Functions needed:
# - initialize_gemini_client() -> genai.GenerativeModel
# - generate_schedule_with_gemini(context: str) -> dict
# - parse_gemini_schedule_response(response) -> Schedule
# - validate_gemini_output(schedule_data) -> bool
# - retry_with_refinement(prompt, previous_response, issues) -> dict
# Include error handling for API failures
# Add retry logic (max 3 attempts)
# Parse JSON from Gemini response
# Validate schedule structure
# Use environment variable GEMINI_API_KEY
# Add comprehensive logging
# Include type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Gemini scheduler service for AI-powered schedule generation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, google-generativeai, Gemini Flash 1.5
- File: tushar-backend/services/gemini_scheduler_service.py

GENERATE:
Complete Gemini Flash integration service for generating personalized study schedules.

REQUIREMENTS:
1. initialize_gemini_client function:
   - Load GEMINI_API_KEY from environment
   - Initialize genai.GenerativeModel with "gemini-1.5-flash"
   - Configure generation settings: temperature=0.7, top_p=0.9, max_output_tokens=8000
   - Return configured model
   - Handle initialization errors

2. generate_schedule_with_gemini function:
   - Input: formatted context string (from context builder)
   - Call Gemini API with context
   - Extract JSON from response (handle markdown code blocks)
   - Return parsed schedule dict
   - Add retry logic (max 3 attempts) for API failures
   - Log all API calls and responses

3. parse_gemini_schedule_response function:
   - Input: Gemini API response object
   - Extract text from response
   - Find and parse JSON (handle ```json blocks)
   - Convert to Schedule Pydantic model
   - Validate all required fields present
   - Return Schedule object
   - Raise ValueError if parsing fails

4. validate_gemini_output function:
   - Input: schedule data dict
   - Check required fields: days, topics, hours
   - Validate day numbers are sequential
   - Validate total hours match constraints
   - Validate all topics have required fields
   - Return (is_valid: bool, errors: List[str])

5. retry_with_refinement function:
   - Input: original prompt, previous response, validation issues
   - Create refinement prompt: "The previous schedule had issues: {issues}. Please fix..."
   - Call Gemini again with refinement
   - Parse and validate new response
   - Return improved schedule
   - Max 2 refinement attempts

6. extract_json_from_text function:
   - Input: text that may contain JSON in markdown blocks
   - Use regex to find ```json...``` blocks
   - Parse JSON from block
   - Handle plain JSON without markdown
   - Return parsed dict
   - Raise ValueError if no valid JSON found

7. Add comprehensive error handling:
   - API rate limits (wait and retry)
   - Invalid API key
   - Malformed responses
   - Timeout errors
   - JSON parsing errors

8. Add logging for debugging:
   - Log all API calls with timestamps
   - Log prompts sent (truncated)
   - Log responses received (truncated)
   - Log parsing errors with details

9. Include detailed docstrings and type hints

10. Add example usage in module docstring

INTEGRATE WITH:
- utils/schedule_context_builder.py (context formatting)
- utils/schedule_prompt_templates.py (prompt templates)
- models/schedule_models.py (Schedule model)
- google.generativeai (Gemini API)

OUTPUT FORMAT:
- Complete Python file with all imports
- Service class or functions
- Error handling and retry logic
- Logging configuration
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/services/gemini_scheduler_service.py`
3. Paste and save

---

## Prompt 7: Schedule Planner Service

### Purpose
Plan schedule structure, distribute topics across days, balance subjects.

### When to Use
After Gemini service - orchestrates schedule planning logic.

### What You'll Get
Schedule planning service with distribution algorithms.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/schedule_planner.py`

**Step 2**: Type this comment:
```python
# Create schedule planner service for distributing topics across days
# Functions needed:
# - plan_schedule_structure(total_days, daily_hours) -> structure
# - distribute_topics_across_days(priority_topics, available_days, daily_hours)
# - balance_subjects_across_days(daily_topics) -> balanced schedule
# - add_revision_days(schedule, revision_day_numbers)
# - add_practice_test_days(schedule, test_day_numbers)
# - add_buffer_days(schedule, buffer_day_numbers)
# - validate_schedule_balance(schedule) -> bool
# Ensure no subject dominates multiple consecutive days
# Distribute high-priority topics early in schedule
# Leave last 3 days for revision
# Include type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create schedule planner service for distributing topics across days.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11
- File: tushar-backend/services/schedule_planner.py

GENERATE:
Schedule planning service that distributes topics across days with subject balancing.

REQUIREMENTS:
1. plan_schedule_structure function:
   - Input: total_days, daily_hours, exam_type
   - Calculate revision days (last 3 days)
   - Calculate practice test days (every 7 days)
   - Calculate buffer days (every 30 days)
   - Return structure dict with special day assignments

2. distribute_topics_across_days function:
   - Input: priority_topics (sorted), available_days, daily_hours
   - Distribute topics to fill available hours each day
   - Prioritize high-priority topics in early days
   - Ensure each day has 3-4 hours of content
   - Group related subtopics together
   - Return list of days with assigned topics

3. balance_subjects_across_days function:
   - Input: initial schedule with topics assigned
   - Analyze subject distribution
   - Rearrange to avoid same subject for 3+ consecutive days
   - Maintain priority order as much as possible
   - Ensure each week has all subjects
   - Return balanced schedule

4. add_special_days function:
   - Input: schedule, revision_days, test_days, buffer_days
   - Mark special days in schedule
   - Adjust topic distribution around special days
   - Ensure no heavy topics on test days
   - Return updated schedule

5. validate_schedule_balance function:
   - Input: complete schedule
   - Check: no subject > 3 consecutive days
   - Check: each week has all subjects
   - Check: daily hours within limits (2-5 hours)
   - Check: high-priority topics in first 50% of schedule
   - Return (is_balanced: bool, issues: List[str])

6. optimize_topic_order function:
   - Input: topics for a day
   - Order by: difficulty (easy to hard)
   - Group related topics together
   - Return optimized topic order

7. calculate_daily_load function:
   - Input: topics for a day
   - Sum estimated hours
   - Check if within daily limit
   - Return (total_hours, is_feasible)

8. Add helper functions for topic grouping and subject rotation

9. Include comprehensive docstrings and type hints

10. Add example usage showing complete planning workflow

INTEGRATE WITH:
- models/schedule_models.py (schedule data structures)
- utils/time_calculator.py (time calculations)
- services/priority_calculator.py (priority topics)

OUTPUT FORMAT:
- Complete Python file with all imports
- Planning algorithms
- Balancing logic
- Validation functions
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/services/schedule_planner.py`
3. Paste and save

---

## Prompt 8: Schedule Parser

### Purpose
Parse and validate Gemini's schedule response into structured data.

### When to Use
After Gemini service - processes AI output.

### What You'll Get
Parser that converts Gemini JSON to Schedule models.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/utils/schedule_parser.py`

**Step 2**: Type this comment:
```python
# Create schedule parser for Gemini responses
# Functions needed:
# - parse_schedule_json(json_data) -> Schedule
# - parse_schedule_day(day_data) -> ScheduleDay
# - parse_daily_topic(topic_data) -> DailyTopic
# - validate_schedule_structure(schedule_data) -> (bool, errors)
# - fix_common_issues(schedule_data) -> fixed_data
# Handle missing fields with defaults
# Validate data types and ranges
# Convert string dates to date objects
# Ensure all required fields present
# Add type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create schedule parser for Gemini responses.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, Pydantic
- File: tushar-backend/utils/schedule_parser.py

GENERATE:
Parser that converts Gemini JSON responses into validated Schedule models.

REQUIREMENTS:
1. parse_schedule_json function:
   - Input: raw JSON dict from Gemini
   - Extract schedule data
   - Parse each day
   - Create Schedule Pydantic model
   - Handle missing optional fields
   - Return Schedule object
   - Raise ValueError with details if parsing fails

2. parse_schedule_day function:
   - Input: day data dict
   - Extract day_number, date, topics, etc.
   - Parse each topic in day
   - Create ScheduleDay model
   - Set defaults for missing fields
   - Return ScheduleDay object

3. parse_daily_topic function:
   - Input: topic data dict
   - Extract topic, subject, hours, subtopics, resources, goals
   - Create DailyTopic model
   - Validate hours > 0
   - Return DailyTopic object

4. validate_schedule_structure function:
   - Input: schedule data dict (before parsing)
   - Check required fields: days, schedule_id, student_id
   - Check days is list and not empty
   - Check each day has required fields
   - Return (is_valid: bool, errors: List[str])

5. fix_common_issues function:
   - Input: schedule data with potential issues
   - Fix: missing day_numbers (assign sequential)
   - Fix: missing dates (calculate from start date)
   - Fix: missing total_hours (sum topic hours)
   - Fix: empty subtopics (use topic name)
   - Fix: empty resources (add default "Study from textbook")
   - Return fixed schedule data

6. convert_dates function:
   - Input: date string in various formats
   - Parse to date object
   - Handle formats: "2024-01-15", "15-01-2024", "Jan 15, 2024"
   - Return date object
   - Raise ValueError if invalid format

7. validate_topic_data function:
   - Input: topic dict
   - Check required fields: topic, subject, estimated_hours
   - Validate hours between 0.5 and 8
   - Validate subject in allowed list
   - Return (is_valid: bool, errors: List[str])

8. Add comprehensive error handling with detailed messages

9. Include detailed docstrings and type hints

10. Add example usage showing parsing workflow

INTEGRATE WITH:
- models/schedule_models.py (Schedule, ScheduleDay, DailyTopic models)
- services/gemini_scheduler_service.py (will use this parser)

OUTPUT FORMAT:
- Complete Python file with all imports
- Parsing functions
- Validation functions
- Error handling
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/utils/schedule_parser.py`
3. Paste and save

---

## Prompt 9: Main Schedule Service

### Purpose
Orchestrate complete schedule generation workflow.

### When to Use
After all components - main service coordinating everything.

### What You'll Get
Complete schedule service integrating all components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/schedule_service.py`

**Step 2**: Type this comment:
```python
# Create main schedule service orchestrating schedule generation
# This is the main entry point for schedule generation
# Functions needed:
# - generate_schedule(schedule_request: ScheduleRequest) -> Schedule
# - get_schedule(schedule_id: str) -> Schedule
# - get_student_schedule(student_id: str) -> Schedule
# - update_schedule(schedule_id: str, updates: dict) -> Schedule
# - delete_schedule(schedule_id: str) -> bool
# Workflow for generate_schedule:
# 1. Fetch analytics from Firestore
# 2. Calculate priorities using priority_calculator
# 3. Calculate time constraints using time_calculator
# 4. Build context using context_builder
# 5. Generate schedule using gemini_scheduler_service
# 6. Parse and validate using schedule_parser
# 7. Optimize using schedule_optimizer (if needed)
# 8. Store in Firestore
# 9. Return Schedule object
# Add error handling, logging, and validation
# Include type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create main schedule service orchestrating complete schedule generation.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI, Firestore
- File: tushar-backend/services/schedule_service.py

GENERATE:
Main schedule service that coordinates all components for schedule generation.

REQUIREMENTS:
1. generate_schedule function:
   - Input: ScheduleRequest (student_id, analytics_id, exam_date, daily_hours)
   - Workflow:
     a. Fetch analytics from Firestore using analytics_id
     b. Fetch student profile from Firestore
     c. Load syllabus weightages for exam type
     d. Calculate topic priorities using priority_calculator
     e. Calculate time constraints using time_calculator
     f. Build context using schedule_context_builder
     g. Generate schedule using gemini_scheduler_service
     h. Parse response using schedule_parser
     i. Validate and optimize schedule
     j. Generate unique schedule_id
     k. Store schedule in Firestore
     l. Return Schedule object
   - Add comprehensive error handling at each step
   - Log progress and errors
   - Return Schedule object

2. get_schedule function:
   - Input: schedule_id
   - Fetch from Firestore collection "schedules"
   - Parse to Schedule model
   - Return Schedule object
   - Raise NotFoundError if doesn't exist

3. get_student_schedule function:
   - Input: student_id
   - Query Firestore for active schedule
   - Return most recent active schedule
   - Return None if no active schedule

4. get_schedule_history function:
   - Input: student_id
   - Query all schedules for student
   - Sort by generated_date (newest first)
   - Return List[Schedule]

5. update_schedule function:
   - Input: schedule_id, updates dict
   - Fetch existing schedule
   - Apply updates (merge with existing data)
   - Validate updated schedule
   - Save to Firestore
   - Return updated Schedule

6. delete_schedule function:
   - Input: schedule_id
   - Mark schedule as "abandoned" (soft delete)
   - Update in Firestore
   - Return True if successful

7. validate_schedule_request function:
   - Input: ScheduleRequest
   - Check exam_date is in future
   - Check analytics_id exists
   - Check student_id exists
   - Check daily_hours is reasonable (2-8)
   - Return (is_valid: bool, errors: List[str])

8. Add Firestore helper functions:
   - save_schedule_to_firestore(schedule)
   - fetch_schedule_from_firestore(schedule_id)
   - fetch_analytics_from_firestore(analytics_id)
   - fetch_student_profile_from_firestore(student_id)

9. Add comprehensive logging:
   - Log each step of generation
   - Log errors with context
   - Log API calls and durations

10. Include detailed docstrings and type hints

11. Add example usage in module docstring

INTEGRATE WITH:
- services/priority_calculator.py (calculate priorities)
- services/gemini_scheduler_service.py (AI generation)
- services/schedule_planner.py (planning logic)
- utils/time_calculator.py (time calculations)
- utils/schedule_context_builder.py (context building)
- utils/schedule_parser.py (parse responses)
- models/schedule_models.py (data models)
- firebase_admin.firestore (Firestore database)

OUTPUT FORMAT:
- Complete Python file with all imports
- Main service class or functions
- Helper functions for Firestore
- Error handling and logging
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/services/schedule_service.py`
3. Paste and save

---

## Prompt 10: Adaptive Scheduler Service

### Purpose
Handle adaptive rescheduling when students miss sessions or need adjustments.

### When to Use
After main schedule service - adds adaptive capabilities.

### What You'll Get
Service for dynamic schedule adjustments.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/adaptive_scheduler.py`

**Step 2**: Type this comment:
```python
# Create adaptive scheduler for dynamic schedule adjustments
# Functions needed:
# - detect_reschedule_triggers(schedule_id, progress_data) -> (needs_reschedule, reason)
# - regenerate_remaining_schedule(schedule_id, current_day) -> Schedule
# - adjust_for_missed_sessions(schedule, missed_days) -> Schedule
# - adjust_for_topic_overrun(schedule, topic, extra_hours) -> Schedule
# - calculate_catch_up_plan(schedule, days_behind) -> adjustments
# Triggers for rescheduling:
# - Missed 2+ consecutive days
# - Topic took 50%+ more time than estimated
# - More than 3 days behind schedule
# - Student explicitly requests reschedule
# Maintain high-priority topics when rescheduling
# Add type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create adaptive scheduler for dynamic schedule adjustments.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11
- File: tushar-backend/services/adaptive_scheduler.py

GENERATE:
Adaptive scheduler that handles schedule adjustments based on student progress.

REQUIREMENTS:
1. detect_reschedule_triggers function:
   - Input: schedule_id, progress_data (completed days, time spent)
   - Check triggers:
     a. Missed 2+ consecutive days
     b. Topic took 50%+ more time than estimated
     c. More than 3 days behind schedule
     d. Practice test accuracy < 50%
   - Return (needs_reschedule: bool, reason: str, severity: str)

2. regenerate_remaining_schedule function:
   - Input: schedule_id, current_day_number
   - Fetch existing schedule and progress
   - Identify incomplete topics
   - Recalculate priorities based on progress
   - Calculate remaining days until exam
   - Generate new schedule for remaining days using Gemini
   - Merge with completed days
   - Save updated schedule
   - Return updated Schedule

3. adjust_for_missed_sessions function:
   - Input: schedule, list of missed day numbers
   - Redistribute missed topics to future days
   - Increase daily hours slightly if needed (max 5 hours)
   - Prioritize critical topics
   - Return adjusted schedule

4. adjust_for_topic_overrun function:
   - Input: schedule, topic that took longer, actual hours spent
   - Update estimated hours for similar topics
   - Adjust remaining schedule to accommodate
   - May remove low-priority topics if needed
   - Return adjusted schedule

5. calculate_catch_up_plan function:
   - Input: schedule, days_behind
   - Calculate deficit hours
   - Options:
     a. Increase daily hours (up to 5 hours max)
     b. Remove low-priority topics
     c. Reduce revision days
     d. Extend schedule (if possible)
   - Return recommended adjustments and new schedule

6. handle_student_request function:
   - Input: schedule_id, request_type ("more_time", "skip_topic", "change_order")
   - Process request
   - Adjust schedule accordingly
   - Validate feasibility
   - Return updated schedule or error message

7. calculate_schedule_drift function:
   - Input: schedule, current progress
   - Calculate expected vs actual progress
   - Return days_behind (positive) or days_ahead (negative)

8. prioritize_remaining_topics function:
   - Input: incomplete topics, remaining days
   - Recalculate priorities considering:
     a. Original priority
     b. Time remaining
     c. Dependencies
   - Return sorted topic list

9. Add comprehensive logging for all adjustments

10. Include detailed docstrings and type hints

INTEGRATE WITH:
- services/schedule_service.py (main schedule service)
- services/gemini_scheduler_service.py (regenerate with AI)
- services/priority_calculator.py (recalculate priorities)
- models/schedule_models.py (data models)

OUTPUT FORMAT:
- Complete Python file with all imports
- Adaptive scheduling functions
- Trigger detection logic
- Adjustment algorithms
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/services/adaptive_scheduler.py`
3. Paste and save

---

## Prompt 11: Progress Tracker Service

### Purpose
Track daily progress and schedule completion.

### When to Use
After adaptive scheduler - enables progress monitoring.

### What You'll Get
Service for tracking and updating schedule progress.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/services/progress_tracker.py`

**Step 2**: Type this comment:
```python
# Create progress tracker for schedule completion monitoring
# Functions needed:
# - update_daily_progress(schedule_id, day_number, progress_data) -> ProgressUpdate
# - mark_topic_complete(schedule_id, day_number, topic, time_spent, notes)
# - get_progress_summary(schedule_id) -> summary dict
# - get_today_tasks(schedule_id) -> List[DailyTopic]
# - calculate_completion_percentage(schedule_id) -> float
# - get_progress_history(schedule_id) -> List[ProgressUpdate]
# Store progress updates in Firestore
# Calculate completion metrics
# Detect if rescheduling needed
# Add type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create progress tracker for schedule completion monitoring.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, Firestore
- File: tushar-backend/services/progress_tracker.py

GENERATE:
Progress tracking service for monitoring schedule completion and student progress.

REQUIREMENTS:
1. update_daily_progress function:
   - Input: schedule_id, day_number, ProgressUpdate data
   - Validate day exists in schedule
   - Update completion status for day
   - Store progress in Firestore (subcollection "progress")
   - Update schedule completion percentage
   - Check if rescheduling needed
   - Return ProgressUpdate object

2. mark_topic_complete function:
   - Input: schedule_id, day_number, topic_name, time_spent, completion_notes
   - Find topic in schedule day
   - Mark as complete
   - Record time spent
   - Add notes
   - Update day completion percentage
   - Save to Firestore
   - Return success status

3. get_progress_summary function:
   - Input: schedule_id
   - Calculate:
     a. Total days completed
     b. Total topics completed
     c. Total hours studied
     d. Completion percentage
     e. Days ahead/behind schedule
     f. Average daily study time
   - Return summary dict

4. get_today_tasks function:
   - Input: schedule_id
   - Get current date
   - Find corresponding day in schedule
   - Return list of topics for today
   - Include: topic, hours, subtopics, resources, goals
   - Return empty list if no tasks for today

5. calculate_completion_percentage function:
   - Input: schedule_id
   - Count completed topics vs total topics
   - Weight by estimated hours
   - Return percentage (0-100)

6. get_progress_history function:
   - Input: schedule_id, limit (optional)
   - Fetch all progress updates from Firestore
   - Sort by date (newest first)
   - Return List[ProgressUpdate]

7. get_incomplete_topics function:
   - Input: schedule_id
   - Find all topics not marked complete
   - Include topics from past days (overdue)
   - Return list with priority and due dates

8. calculate_study_streak function:
   - Input: schedule_id
   - Count consecutive days with progress
   - Return current streak length

9. Add Firestore helper functions:
   - save_progress_to_firestore(schedule_id, progress)
   - fetch_progress_from_firestore(schedule_id, day_number)
   - fetch_all_progress(schedule_id)

10. Include detailed docstrings and type hints

INTEGRATE WITH:
- services/schedule_service.py (schedule data)
- services/adaptive_scheduler.py (trigger rescheduling)
- models/schedule_models.py (ProgressUpdate model)
- firebase_admin.firestore (Firestore database)

OUTPUT FORMAT:
- Complete Python file with all imports
- Progress tracking functions
- Firestore integration
- Calculation functions
- Docstrings with examples
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/services/progress_tracker.py`
3. Paste and save

---

## Prompt 12: Schedule Router (API Endpoints)

### Purpose
Create FastAPI endpoints for schedule generation and management.

### When to Use
After all services - exposes functionality via API.

### What You'll Get
Complete REST API for schedule system.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `tushar-backend/routers/schedule_router.py`

**Step 2**: Type this comment:
```python
# Create FastAPI router for schedule endpoints
# Endpoints needed:
# POST /api/schedule/generate - Generate new schedule
# GET /api/schedule/{schedule_id} - Get schedule details
# GET /api/schedule/student/{student_id} - Get student's active schedule
# GET /api/schedule/student/{student_id}/history - Get schedule history
# POST /api/schedule/{schedule_id}/regenerate - Regenerate remaining schedule
# PUT /api/schedule/{schedule_id} - Update schedule
# DELETE /api/schedule/{schedule_id} - Delete schedule
# POST /api/schedule/progress/update - Update daily progress
# GET /api/schedule/progress/{schedule_id} - Get progress summary
# GET /api/schedule/progress/today - Get today's tasks
# Use schedule_service, adaptive_scheduler, progress_tracker
# Add request/response models
# Include error handling and validation
# Add authentication (verify student_id)
# Include type hints and docstrings
```

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create FastAPI router for schedule endpoints.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Python 3.11, FastAPI
- File: tushar-backend/routers/schedule_router.py

GENERATE:
Complete REST API router for schedule generation and management.

REQUIREMENTS:
1. Create APIRouter with prefix "/api/schedule"

2. POST /api/schedule/generate endpoint:
   - Input: ScheduleRequest body
   - Call schedule_service.generate_schedule()
   - Return Schedule response
   - Status: 201 Created
   - Handle errors: 400 (invalid request), 404 (analytics not found), 500 (generation failed)

3. GET /api/schedule/{schedule_id} endpoint:
   - Input: schedule_id path parameter
   - Call schedule_service.get_schedule()
   - Return Schedule response
   - Status: 200 OK
   - Handle errors: 404 (not found)

4. GET /api/schedule/student/{student_id} endpoint:
   - Input: student_id path parameter
   - Call schedule_service.get_student_schedule()
   - Return Schedule response or null
   - Status: 200 OK

5. GET /api/schedule/student/{student_id}/history endpoint:
   - Input: student_id path parameter, limit query parameter (optional)
   - Call schedule_service.get_schedule_history()
   - Return List[Schedule]
   - Status: 200 OK

6. POST /api/schedule/{schedule_id}/regenerate endpoint:
   - Input: schedule_id path parameter, current_day body parameter
   - Call adaptive_scheduler.regenerate_remaining_schedule()
   - Return updated Schedule
   - Status: 200 OK
   - Handle errors: 404 (not found), 400 (invalid day)

7. PUT /api/schedule/{schedule_id} endpoint:
   - Input: schedule_id path parameter, updates dict body
   - Call schedule_service.update_schedule()
   - Return updated Schedule
   - Status: 200 OK
   - Handle errors: 404 (not found), 400 (invalid updates)

8. DELETE /api/schedule/{schedule_id} endpoint:
   - Input: schedule_id path parameter
   - Call schedule_service.delete_schedule()
   - Return success message
   - Status: 200 OK
   - Handle errors: 404 (not found)

9. POST /api/schedule/progress/update endpoint:
   - Input: ProgressUpdate body
   - Call progress_tracker.update_daily_progress()
   - Return ProgressUpdate response
   - Status: 200 OK
   - Handle errors: 404 (schedule not found), 400 (invalid data)

10. GET /api/schedule/progress/{schedule_id} endpoint:
    - Input: schedule_id path parameter
    - Call progress_tracker.get_progress_summary()
    - Return progress summary dict
    - Status: 200 OK

11. GET /api/schedule/progress/today endpoint:
    - Input: schedule_id query parameter
    - Call progress_tracker.get_today_tasks()
    - Return List[DailyTopic]
    - Status: 200 OK

12. Add comprehensive error handling:
    - Use HTTPException for errors
    - Return meaningful error messages
    - Log all errors

13. Add request validation using Pydantic models

14. Include API documentation with examples

15. Add authentication middleware (verify JWT token)

INTEGRATE WITH:
- services/schedule_service.py (schedule operations)
- services/adaptive_scheduler.py (rescheduling)
- services/progress_tracker.py (progress tracking)
- models/schedule_models.py (request/response models)
- fastapi (FastAPI, APIRouter, HTTPException)

OUTPUT FORMAT:
- Complete Python file with all imports
- APIRouter with all endpoints
- Request/response models
- Error handling
- API documentation
```

**What to Do**:
1. Copy generated code
2. Create file `tushar-backend/routers/schedule_router.py`
3. Paste and save

---

## Prompt 13: Update Main Application

### Purpose
Register schedule router in main FastAPI application.

### When to Use
After creating router - integrates with main app.

### What You'll Get
Updated main.py with schedule routes.

---

### For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `tushar-backend/main.py`

**Step 2**: Add this comment at the appropriate location:
```python
# Import and include schedule router
# from routers.schedule_router import router as schedule_router
# app.include_router(schedule_router)
```

**Step 3**: Press Tab to trigger Copilot

---

### For ChatGPT/Claude (Chat Interface)

**Copy this prompt**:
```
Update the main FastAPI application to include schedule router.

CONTEXT:
- File: tushar-backend/main.py
- Already has: auth_router, onboarding_router, rag_router, analytics_router

ADD:
1. Import schedule router:
   from routers.schedule_router import router as schedule_router

2. Include router in app:
   app.include_router(schedule_router)

3. Add to router list in startup logs

Provide the complete import statement and include_router line.
```

**What to Do**:
1. Copy the generated code
2. Add to `tushar-backend/main.py`
3. Save

---

## Summary

You've created all the prompts needed for Day 8 Schedule Generation! Here's what you'll build:

**Services:**
1. ✅ Priority Calculator - Rank topics by importance
2. ✅ Schedule Planner - Distribute topics across days
3. ✅ Gemini Scheduler - AI-powered schedule generation
4. ✅ Adaptive Scheduler - Dynamic rescheduling
5. ✅ Progress Tracker - Monitor completion

**Utilities:**
6. ✅ Time Calculator - Time-based calculations
7. ✅ Context Builder - Format data for Gemini
8. ✅ Prompt Templates - Specialized scheduling prompts
9. ✅ Schedule Parser - Parse Gemini responses

**Models:**
10. ✅ Schedule Models - Data structures

**API:**
11. ✅ Schedule Router - REST API endpoints

**Next Steps:**
1. Open **CONFIGURATION.md** for manual setup steps
2. Follow **TESTING.md** to verify schedule generation
3. Check **EXPECTED-OUTCOME.md** for success criteria

Ready to configure? Open **CONFIGURATION.md** next!

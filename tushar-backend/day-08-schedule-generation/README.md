# Day 8: Schedule Generation (Backend)

## What You're Building

An AI-powered personalized study schedule generator that uses Google Gemini Flash to create day-by-day learning plans based on diagnostic test analytics. This system analyzes student weaknesses, exam dates, syllabus weightages, and available study time to generate adaptive schedules that prioritize high-impact topics and adjust dynamically based on student progress.

## Why This Matters

Personalized scheduling transforms analytics into actionable learning plans:
- **Personalization**: Every schedule is unique to the student's strengths and weaknesses
- **Priority-Based**: Focuses on high-weightage weak topics first for maximum impact
- **Time-Optimized**: Fits realistic study hours into available days before exam
- **Adaptive**: Automatically reschedules when students miss sessions or need more time
- **Goal-Oriented**: Works backward from exam date to ensure complete coverage
- **Balanced**: Distributes topics across subjects to prevent burnout
- **Progress-Aware**: Tracks completion and adjusts remaining schedule accordingly
- **Parent-Friendly**: Provides clear daily tasks parents can monitor

Without intelligent scheduling, students waste time on low-priority topics, miss critical concepts, or create unrealistic plans they can't follow, leading to poor exam preparation and stress.

## How It Works

**Schedule Generation Pipeline:**

1. **Input Analysis**:
   - Retrieve analytics report from Day 7 (strengths, weaknesses, priorities)
   - Get student profile (exam type, exam date, daily study hours)
   - Calculate available days until exam
   - Load syllabus weightages for exam type (JEE/NEET)
   - Identify completed topics and remaining topics

2. **Priority Calculation**:
   - Rank topics by: (Weightage × Weakness Score)
   - High priority: High weightage + Low accuracy (< 40%)
   - Medium priority: Medium weightage + Medium accuracy (40-70%)
   - Low priority: Low weightage or High accuracy (> 70%)
   - Calculate estimated study hours per topic based on difficulty and current level

3. **Schedule Planning**:
   - Distribute topics across available days
   - Ensure 3-4 hours study per day (realistic for students)
   - Balance subjects (don't schedule only Physics for 5 days straight)
   - Include revision days before exam (last 3 days)
   - Add practice test days (every 7 days)
   - Include buffer days for flexibility

4. **Context Building for Gemini**:
   - Format analytics, priorities, and constraints into structured prompt
   - Include: weak topics, available days, daily hours, exam date
   - Add: syllabus weightages, current performance levels
   - Specify: output format (day-by-day JSON structure)

5. **AI Schedule Generation**:
   - Send context to Gemini Flash with specialized scheduling prompt
   - Gemini creates day-by-day schedule with:
     - Topics to study each day
     - Specific subtopics and concepts
     - Recommended resources (videos, practice questions)
     - Daily goals and milestones
     - Time allocation per topic
   - Parse and validate Gemini response

6. **Schedule Optimization**:
   - Validate schedule covers all priority topics
   - Ensure realistic daily workload
   - Check subject balance across days
   - Verify revision and practice test days included
   - Adjust if needed based on validation rules

7. **Adaptive Rescheduling**:
   - Track daily progress (topics completed, time spent)
   - Detect missed sessions or incomplete topics
   - Trigger reschedule when:
     - Student misses 2+ consecutive days
     - Topic takes longer than estimated
     - Student requests more time on topic
   - Regenerate remaining schedule maintaining priorities

8. **Storage and Retrieval**:
   - Store schedule in Firestore with metadata
   - Link to student profile and analytics
   - Enable progress tracking and updates
   - Cache for quick retrieval
   - Maintain schedule history for analysis

**Technology Stack:**
- Google Gemini Flash 1.5 (AI schedule generation)
- Firestore (schedule and progress storage)
- FastAPI (schedule orchestration)
- Analytics Service from Day 7 (performance data)

**Data Flow:**
```
Analytics Report → Calculate Priorities → Build Context → Gemini Scheduling → Validate Schedule → Optimize → Store → Return Schedule
```

## Learning Objectives

By completing this task, you will:
- Understand AI-powered educational scheduling
- Learn how to use Gemini Flash for planning and optimization
- Implement priority-based scheduling algorithms
- Design adaptive systems that respond to user behavior
- Build context for complex LLM planning tasks
- Implement prompt engineering for schedule generation
- Handle time-based constraints and optimization
- Test scheduling independently with sample analytics
- Optimize for schedule quality and feasibility

## Time Estimate

- **LLM Code Generation**: 90 minutes (12-15 prompts)
- **Configuration**: 30 minutes (Test scheduling logic, validate prompts)
- **Testing**: 60 minutes (Generate schedules for different scenarios)
- **Total**: 3 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Backend Project Setup (must be complete)
- ✅ Day 2: Firebase Authentication (must be complete)
- ✅ Day 3: User Onboarding API (must be complete)
- ✅ Day 4: Vector Search Setup (must be complete)
- ✅ Day 5: RAG Implementation (must be complete)
- ✅ Day 6: Diagnostic Test Generation (must be complete)
- ✅ Day 7: Gemini Analytics (CRITICAL - must be complete)
- ✅ Analytics generation working
- ✅ Backend server running successfully

**Required Software:**
- Python 3.11+ with virtual environment
- Google Cloud Project with billing enabled
- gcloud CLI installed and authenticated
- curl or Postman for API testing

**Required Google Cloud APIs:**
- Gemini API (already enabled from Day 5)

**Knowledge Prerequisites:**
- Understanding of Gemini Flash from Day 5 and Day 7
- Familiarity with analytics structure from Day 7
- Knowledge of educational scheduling concepts
- Understanding of JEE/NEET syllabus structure

## Files You'll Create

```
tushar-backend/
├── services/
│   ├── schedule_service.py              # Main schedule orchestration
│   ├── priority_calculator.py           # Calculate topic priorities
│   ├── schedule_planner.py              # Plan schedule structure
│   ├── gemini_scheduler_service.py      # Gemini Flash scheduling integration
│   ├── schedule_optimizer.py            # Optimize and validate schedules
│   ├── adaptive_scheduler.py            # Handle rescheduling logic
│   └── progress_tracker.py              # Track schedule progress
├── routers/
│   ├── schedule_router.py               # Schedule endpoints
│   └── progress_router.py               # Progress tracking endpoints
├── models/
│   ├── schedule_models.py               # Schedule request/response models
│   ├── priority_models.py               # Priority calculation models
│   └── progress_models.py               # Progress tracking models
├── utils/
│   ├── schedule_context_builder.py      # Build context for Gemini
│   ├── schedule_prompt_templates.py     # Prompt templates for scheduling
│   ├── schedule_parser.py               # Parse Gemini schedule response
│   ├── schedule_validator.py            # Validate schedule feasibility
│   └── time_calculator.py               # Calculate time allocations
└── data/
    ├── schedule_templates/
    │   ├── jee_schedule_template.json       # JEE schedule structure
    │   └── neet_schedule_template.json      # NEET schedule structure
    ├── weightages/
    │   ├── jee_main_weightages.json         # JEE Main topic weightages
    │   ├── jee_advanced_weightages.json     # JEE Advanced weightages
    │   └── neet_weightages.json             # NEET topic weightages
    └── sample_schedules/
        ├── sample_analytics_input.json      # Sample analytics for testing
        └── sample_schedule_output.json      # Expected schedule output
```

## Files You'll Modify

```
tushar-backend/
├── main.py                              # Add schedule routers
└── requirements.txt                     # Add any new dependencies
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Priority calculator ranking topics by impact
- ✅ Schedule planner distributing topics across days
- ✅ Time calculator for realistic study hour allocation
- ✅ Context builder for Gemini scheduling prompts
- ✅ Specialized scheduling prompts for personalized plans
- ✅ Gemini Flash integration for AI-powered scheduling
- ✅ Response parser for structured schedule data
- ✅ Schedule validator ensuring feasibility
- ✅ Schedule optimizer balancing subjects and workload
- ✅ Adaptive rescheduling for missed sessions
- ✅ Progress tracker monitoring daily completion
- ✅ Schedule storage in Firestore
- ✅ Error handling and validation
- ✅ Standalone testing with sample analytics

## Schedule Endpoints You'll Create

### Schedule Generation Endpoints
- `POST /api/schedule/generate` - Generate personalized schedule from analytics
- `POST /api/schedule/{student_id}/generate` - Generate for specific student
- `GET /api/schedule/{schedule_id}` - Get schedule details
- `GET /api/schedule/student/{student_id}` - Get student's current schedule
- `GET /api/schedule/student/{student_id}/history` - Get schedule history

### Schedule Management Endpoints
- `PUT /api/schedule/{schedule_id}/update` - Update schedule manually
- `POST /api/schedule/{schedule_id}/regenerate` - Regenerate remaining schedule
- `DELETE /api/schedule/{schedule_id}` - Delete schedule

### Progress Tracking Endpoints
- `POST /api/schedule/progress/update` - Update daily progress
- `POST /api/schedule/progress/complete-topic` - Mark topic as complete
- `GET /api/schedule/progress/{schedule_id}` - Get progress details
- `GET /api/schedule/progress/today` - Get today's tasks

### Adaptive Rescheduling Endpoints
- `POST /api/schedule/reschedule` - Trigger adaptive rescheduling
- `POST /api/schedule/extend-topic` - Request more time for topic
- `POST /api/schedule/skip-topic` - Skip topic and adjust schedule

### Analytics Integration Endpoints
- `GET /api/schedule/priorities/{analytics_id}` - Get topic priorities from analytics
- `POST /api/schedule/from-analytics/{analytics_id}` - Generate schedule from analytics ID

## Schedule Structure

### Day-by-Day Format
```json
{
  "schedule_id": "sched_123",
  "student_id": "student_456",
  "analytics_id": "analytics_789",
  "exam_type": "JEE_MAIN",
  "exam_date": "2024-04-15",
  "generated_date": "2024-01-15",
  "total_days": 90,
  "daily_study_hours": 4,
  "status": "active",
  "days": [
    {
      "day_number": 1,
      "date": "2024-01-16",
      "subjects": ["Physics"],
      "topics": [
        {
          "topic": "Thermodynamics - Laws of Thermodynamics",
          "subject": "Physics",
          "priority": "high",
          "estimated_hours": 2.5,
          "subtopics": [
            "First Law of Thermodynamics",
            "Second Law of Thermodynamics",
            "Carnot Engine"
          ],
          "resources": [
            "Watch: Thermodynamics Basics (30 min)",
            "Read: Chapter 12 - Laws of Thermodynamics",
            "Solve: 20 practice questions"
          ],
          "goals": [
            "Understand first and second laws",
            "Solve 15/20 questions correctly"
          ]
        },
        {
          "topic": "Thermodynamics - Heat Transfer",
          "subject": "Physics",
          "priority": "high",
          "estimated_hours": 1.5,
          "subtopics": ["Conduction", "Convection", "Radiation"],
          "resources": [
            "Watch: Heat Transfer Methods (20 min)",
            "Solve: 15 numerical problems"
          ],
          "goals": ["Master heat transfer calculations"]
        }
      ],
      "total_hours": 4.0,
      "milestones": ["Complete Thermodynamics basics"],
      "completed": false
    }
  ],
  "revision_days": [88, 89, 90],
  "practice_test_days": [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84],
  "buffer_days": [30, 60],
  "priority_topics": [
    {
      "topic": "Thermodynamics",
      "subject": "Physics",
      "current_accuracy": 40,
      "target_accuracy": 80,
      "weightage": 8,
      "priority_score": 320,
      "estimated_hours": 12
    }
  ]
}
```

### Progress Tracking Format
```json
{
  "schedule_id": "sched_123",
  "day_number": 1,
  "date": "2024-01-16",
  "status": "completed",
  "topics_completed": [
    {
      "topic": "Thermodynamics - Laws of Thermodynamics",
      "time_spent": 2.5,
      "completion_percentage": 100,
      "practice_questions_solved": 18,
      "practice_accuracy": 85,
      "notes": "Understood concepts well, need more practice on Carnot cycle"
    }
  ],
  "total_time_spent": 4.0,
  "completion_percentage": 100,
  "next_day_adjustments": []
}
```

## Gemini Scheduling Prompt Structure

### Context Format
```
STUDENT PROFILE:
- Student ID: student_456
- Exam: JEE Main 2024
- Exam Date: April 15, 2024
- Days Available: 90 days
- Daily Study Hours: 4 hours
- Current Date: January 15, 2024

ANALYTICS SUMMARY:
- Overall Score: 520/800 (65%)
- Strong Topics: Mechanics (80%), Algebra (85%)
- Weak Topics: Thermodynamics (40%), Organic Chemistry (45%), Calculus (50%)

PRIORITY TOPICS (sorted by impact):
1. Thermodynamics (Physics) - 40% accuracy, 8% weightage, Priority Score: 320
2. Organic Chemistry (Chemistry) - 45% accuracy, 10% weightage, Priority Score: 300
3. Calculus (Math) - 50% accuracy, 12% weightage, Priority Score: 288
...

SYLLABUS WEIGHTAGES:
- Physics: Mechanics (15%), Thermodynamics (8%), Electromagnetism (12%)...
- Chemistry: Physical (25%), Organic (30%), Inorganic (25%)...
- Mathematics: Algebra (20%), Calculus (25%), Coordinate Geometry (15%)...

CONSTRAINTS:
- Must cover all high-priority topics (priority score > 200)
- Balance subjects across days (don't schedule only one subject for multiple days)
- Include revision days: Last 3 days before exam
- Include practice tests: Every 7 days
- Realistic daily workload: 3-4 hours maximum
- Leave buffer days for flexibility

TASK:
Create a day-by-day study schedule for 90 days that:
1. Prioritizes high-weightage weak topics first
2. Distributes topics logically across days
3. Balances subjects to prevent burnout
4. Includes specific subtopics and resources for each day
5. Sets clear daily goals and milestones
6. Allocates realistic time per topic
7. Includes revision and practice test days

OUTPUT FORMAT:
Provide a JSON structure with day-by-day schedule including topics, subtopics, resources, time allocation, and goals for each day.
```

### Expected Gemini Output
```json
{
  "schedule": {
    "days": [
      {
        "day": 1,
        "date": "2024-01-16",
        "focus": "Start with highest priority - Thermodynamics",
        "topics": [
          {
            "topic": "Thermodynamics - Laws",
            "hours": 2.5,
            "subtopics": ["First Law", "Second Law", "Carnot Engine"],
            "resources": ["Video: Thermodynamics Basics", "Practice: 20 questions"],
            "goals": ["Understand laws", "Solve 15/20 correctly"]
          }
        ]
      }
    ],
    "revision_strategy": "Last 3 days focus on weak topics identified during schedule",
    "practice_tests": "Every 7 days to track improvement"
  }
}
```

## Priority Calculation Algorithm

### Priority Score Formula
```
Priority Score = Weightage × (100 - Current Accuracy) × Difficulty Multiplier

Where:
- Weightage: Topic's percentage in exam (0-100)
- Current Accuracy: Student's accuracy on topic (0-100)
- Difficulty Multiplier:
  - Easy topics: 0.8
  - Medium topics: 1.0
  - Hard topics: 1.2
```

### Example Calculation
```
Topic: Thermodynamics
- Weightage: 8%
- Current Accuracy: 40%
- Difficulty: Medium (1.0)

Priority Score = 8 × (100 - 40) × 1.0 = 8 × 60 × 1.0 = 480

Topic: Mechanics
- Weightage: 15%
- Current Accuracy: 80%
- Difficulty: Medium (1.0)

Priority Score = 15 × (100 - 80) × 1.0 = 15 × 20 × 1.0 = 300

Result: Thermodynamics has higher priority despite lower weightage
```

### Time Estimation Formula
```
Estimated Hours = Base Hours × Difficulty Factor × Weakness Factor

Where:
- Base Hours: Standard time for topic (from syllabus data)
- Difficulty Factor:
  - Easy: 0.8
  - Medium: 1.0
  - Hard: 1.2
- Weakness Factor:
  - High accuracy (>70%): 0.5 (just revision)
  - Medium accuracy (40-70%): 1.0 (full study)
  - Low accuracy (<40%): 1.5 (intensive study)
```

## Adaptive Rescheduling Logic

### Trigger Conditions
1. **Missed Sessions**: Student misses 2+ consecutive days
2. **Topic Overrun**: Topic takes 50% more time than estimated
3. **Low Performance**: Practice accuracy < 60% after studying topic
4. **Student Request**: Student explicitly requests more time
5. **Schedule Drift**: More than 3 days behind schedule

### Rescheduling Process
1. Identify remaining days until exam
2. Get list of incomplete topics
3. Recalculate priorities based on current progress
4. Regenerate schedule for remaining days
5. Maintain high-priority topics
6. Adjust time allocations based on actual performance
7. Notify student of schedule changes

### Example Scenario
```
Original Schedule: 90 days, 4 hours/day
Day 15: Student has completed only 10 days worth of topics
Trigger: 5 days behind schedule

Rescheduling:
1. Remaining days: 75 days
2. Incomplete topics: 80 days worth
3. Options:
   a. Increase daily hours: 4 → 4.5 hours
   b. Remove low-priority topics
   c. Reduce revision days: 3 → 2 days
4. Generate new schedule with adjustments
5. Notify: "Schedule updated to catch up. Focus on high-priority topics."
```

## Next Steps

After completing this task, you'll move to:
- **Day 9**: Payment Integration (enable premium subscriptions)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (Test scheduling logic)
4. **TESTING.md** - Verify schedule generation works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **AI-INTEGRATION.md** - Detailed Gemini scheduling explanation
7. **USER-FLOW.md** - Analytics to schedule to progress flow
8. **TROUBLESHOOTING.md** - Common scheduling issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating schedule code with your AI coding agent!

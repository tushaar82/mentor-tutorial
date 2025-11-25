# User Flow: Diagnostic Test Generation to Submission

## Overview

This document describes the complete user journey from diagnostic test generation through submission and results. It covers both backend processes and user interactions.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    DIAGNOSTIC TEST LIFECYCLE                     │
└─────────────────────────────────────────────────────────────────┘

1. TEST GENERATION REQUEST
   │
   ├─→ Student completes onboarding (Day 3)
   │   └─→ Selects exam type (JEE Main/Advanced/NEET)
   │   └─→ Provides exam date
   │   └─→ Completes preferences
   │
   ├─→ System triggers diagnostic test generation
   │   └─→ POST /api/diagnostic-test/generate-async
   │
   └─→ Backend starts generation pipeline
       └─→ Returns job_id immediately

2. TEST GENERATION PROCESS (Backend)
   │
   ├─→ Load exam pattern
   │   └─→ JEE Main: 200 questions (60 Phy, 60 Chem, 80 Math)
   │   └─→ JEE Advanced: 200 questions (67 Phy, 67 Chem, 66 Math)
   │   └─→ NEET: 200 questions (40 Phy, 40 Chem, 120 Bio)
   │
   ├─→ Create distribution plan
   │   └─→ Load syllabus from Firestore
   │   └─→ Calculate questions per topic (weightage-based)
   │   └─→ Apply difficulty distribution (easy/medium/hard)
   │   └─→ Apply question type distribution (MCQ/numerical)
   │
   ├─→ Generate questions for each topic (RAG Pipeline)
   │   └─→ For each topic:
   │       ├─→ Query Vector Search for syllabus content
   │       ├─→ Build context from retrieved content
   │       ├─→ Generate prompt with exam-specific requirements
   │       ├─→ Call Gemini Flash to generate questions
   │       ├─→ Parse and validate questions
   │       └─→ Store valid questions
   │   └─→ Progress: 0% → 25% → 50% → 75% → 100%
   │
   ├─→ Assemble complete test
   │   └─→ Organize questions into sections (by subject)
   │   └─→ Apply marking scheme
   │   └─→ Shuffle questions within sections
   │   └─→ Number questions 1-200
   │   └─→ Add test metadata
   │
   ├─→ Validate test
   │   └─→ Check question count (200)
   │   └─→ Verify no duplicates
   │   └─→ Validate pattern compliance
   │   └─→ Check quality scores
   │
   └─→ Store test in Firestore
       └─→ Collection: diagnostic_tests
       └─→ Status: "pending"
       └─→ Return test_id

3. STUDENT VIEWS TEST AVAILABILITY
   │
   ├─→ Frontend polls generation status
   │   └─→ GET /api/diagnostic-test/generation/status/{job_id}
   │   └─→ Shows progress bar (0-100%)
   │   └─→ Displays current step
   │
   └─→ Generation complete
       └─→ Frontend receives test_id
       └─→ Shows "Test Ready" notification
       └─→ Displays "Start Test" button

4. STUDENT STARTS TEST
   │
   ├─→ Student clicks "Start Test"
   │   └─→ Frontend: POST /api/diagnostic-test/{test_id}/start
   │
   ├─→ Backend records start time
   │   └─→ Updates test status: "pending" → "in_progress"
   │   └─→ Calculates end time (start + duration)
   │   └─→ Returns start_time, end_time
   │
   └─→ Frontend displays test interface
       └─→ Shows timer (countdown from duration)
       └─→ Loads first section (Physics)
       └─→ Displays question 1

5. STUDENT TAKES TEST
   │
   ├─→ Student navigates through questions
   │   └─→ Can jump to any question
   │   └─→ Can mark for review
   │   └─→ Can change answers
   │
   ├─→ Frontend tracks answers locally
   │   └─→ Stores in browser state
   │   └─→ Auto-saves periodically (optional)
   │
   ├─→ Timer counts down
   │   └─→ Shows time remaining
   │   └─→ Warns at 10 minutes left
   │   └─→ Auto-submits at 0:00
   │
   └─→ Student can view progress
       └─→ Answered: X questions
       └─→ Unanswered: Y questions
       └─→ Marked for review: Z questions

6. STUDENT SUBMITS TEST
   │
   ├─→ Student clicks "Submit Test"
   │   └─→ Frontend shows confirmation dialog
   │   └─→ "Are you sure? You cannot change answers after submission"
   │
   ├─→ Student confirms submission
   │   └─→ Frontend: POST /api/diagnostic-test/{test_id}/submit
   │   └─→ Sends all answers: {question_number: answer}
   │   └─→ Sends time_taken (seconds)
   │
   └─→ Backend processes submission
       └─→ Validates test is in "in_progress" status
       └─→ Validates student_id matches
       └─→ Proceeds to scoring

7. BACKEND CALCULATES SCORES
   │
   ├─→ For each question:
   │   └─→ Compare student answer with correct answer
   │   └─→ If correct: +marks
   │   └─→ If incorrect: -negative_marks
   │   └─→ If unattempted: 0
   │
   ├─→ Calculate section scores
   │   └─→ Physics: score, correct, incorrect, unattempted
   │   └─→ Chemistry: score, correct, incorrect, unattempted
   │   └─→ Math/Biology: score, correct, incorrect, unattempted
   │
   ├─→ Calculate total score
   │   └─→ Sum of all section scores
   │   └─→ Calculate percentage
   │
   ├─→ Store results in Firestore
   │   └─→ Collection: test_results
   │   └─→ Document: {test_id, student_id, scores, answers}
   │
   └─→ Update test status
       └─→ Status: "in_progress" → "completed"
       └─→ Set submission_date

8. STUDENT VIEWS RESULTS
   │
   ├─→ Frontend: GET /api/diagnostic-test/{test_id}/results
   │
   ├─→ Backend returns results
   │   └─→ Total score and percentage
   │   └─→ Section-wise scores
   │   └─→ Correct/incorrect/unattempted counts
   │
   └─→ Frontend displays results dashboard
       └─→ Overall score (e.g., 520/800 - 65%)
       └─→ Section-wise breakdown
       └─→ Subject-wise performance
       └─→ "View Detailed Analytics" button

9. SYSTEM TRIGGERS ANALYTICS (Day 7)
   │
   └─→ Test results trigger Gemini Analytics
       └─→ Analyze strengths and weaknesses
       └─→ Identify weak topics
       └─→ Generate insights and recommendations
       └─→ Prepare for schedule generation (Day 8)
```

---

## Detailed Step-by-Step Flow

### Step 1: Test Generation Request

**Trigger**: Student completes onboarding

**Frontend Action**:
```javascript
// After onboarding complete
const response = await fetch('/api/diagnostic-test/generate-async', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    exam_type: 'JEE_MAIN',
    student_id: studentId,
    async_generation: true
  })
});

const { job_id } = await response.json();
// Store job_id for progress tracking
```

**Backend Process**:
1. Validate request (exam_type, student_id)
2. Create generation job in Firestore
3. Start async generation task
4. Return job_id immediately

**User Experience**:
- Sees "Generating your diagnostic test..." message
- Progress bar appears (0%)
- Can navigate away and come back

---

### Step 2: Progress Tracking

**Frontend Action**:
```javascript
// Poll every 5 seconds
const checkProgress = setInterval(async () => {
  const response = await fetch(`/api/diagnostic-test/generation/status/${job_id}`);
  const status = await response.json();
  
  // Update progress bar
  setProgress(status.progress);
  setCurrentStep(status.current_step);
  
  if (status.status === 'completed') {
    clearInterval(checkProgress);
    setTestId(status.test_id);
    showNotification('Test ready!');
  }
}, 5000);
```

**Backend Updates**:
- Progress: 0% - "Loading exam pattern"
- Progress: 10% - "Creating distribution plan"
- Progress: 20% - "Generating questions for Mechanics"
- Progress: 40% - "Generating questions for Organic Chemistry"
- Progress: 60% - "Generating questions for Calculus"
- Progress: 80% - "Assembling test"
- Progress: 90% - "Validating test"
- Progress: 100% - "Test generation complete"

**User Experience**:
- Sees real-time progress updates
- Knows what's happening at each stage
- Estimated time: 2-3 minutes

---

### Step 3: Starting the Test

**Frontend Action**:
```javascript
// Student clicks "Start Test"
const response = await fetch(`/api/diagnostic-test/${testId}/start`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ student_id: studentId })
});

const { start_time, end_time, duration_minutes } = await response.json();

// Start timer
startCountdownTimer(duration_minutes * 60);

// Load test
loadTest(testId);
```

**Backend Process**:
1. Verify test exists and belongs to student
2. Check test status is "pending"
3. Record start_time
4. Calculate end_time (start + duration)
5. Update status to "in_progress"
6. Return timing information

**User Experience**:
- Test interface loads
- Timer starts counting down (3:00:00)
- First question displayed
- Navigation panel shows all 200 questions

---

### Step 4: Taking the Test

**User Interface**:
```
┌─────────────────────────────────────────────────────────────┐
│  JEE Main Diagnostic Test          Time Remaining: 2:45:32  │
├─────────────────────────────────────────────────────────────┤
│  Section A - Physics                Question 15 of 60       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  A particle moves with constant acceleration. If its        │
│  velocity changes from 10 m/s to 30 m/s in 4 seconds,      │
│  what is the acceleration?                                   │
│                                                              │
│  ○ A. 2.5 m/s²                                              │
│  ○ B. 5 m/s²                                                │
│  ● C. 7.5 m/s²                                              │
│  ○ D. 10 m/s²                                               │
│                                                              │
│  [Mark for Review]  [Clear Response]                        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  [< Previous]  [Next >]  [Submit Test]                      │
├─────────────────────────────────────────────────────────────┤
│  Question Palette:                                           │
│  [1✓][2✓][3✓][4 ][5✓]...[15●][16 ][17 ]...[60 ]           │
│  ✓ Answered  ● Current  ⚑ Marked  □ Not Answered          │
└─────────────────────────────────────────────────────────────┘
```

**Frontend State Management**:
```javascript
const [answers, setAnswers] = useState({});
const [markedForReview, setMarkedForReview] = useState(new Set());
const [currentQuestion, setCurrentQuestion] = useState(1);

// Save answer
const saveAnswer = (questionNumber, answer) => {
  setAnswers(prev => ({ ...prev, [questionNumber]: answer }));
  // Optional: Auto-save to backend
};

// Navigate
const goToQuestion = (number) => {
  setCurrentQuestion(number);
};
```

**User Actions**:
- Select answer (radio button)
- Mark for review (flag icon)
- Clear response (reset button)
- Navigate to any question (question palette)
- Jump to next unanswered (smart navigation)

---

### Step 5: Submitting the Test

**Frontend Action**:
```javascript
// Student clicks "Submit Test"
const confirmSubmit = confirm(
  'Are you sure you want to submit? You cannot change answers after submission.'
);

if (confirmSubmit) {
  const response = await fetch(`/api/diagnostic-test/${testId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      test_id: testId,
      student_id: studentId,
      answers: answers, // {1: "A", 2: "B", 3: "C", ...}
      time_taken: elapsedSeconds,
      submission_time: new Date().toISOString()
    })
  });
  
  const results = await response.json();
  navigateToResults(results);
}
```

**Backend Scoring Process**:
```python
# For each question
for question in test.questions:
    student_answer = submission.answers.get(question.number)
    
    if student_answer is None:
        # Unattempted
        score += 0
        unattempted_count += 1
    elif student_answer == question.correct_answer:
        # Correct
        score += question.marks
        correct_count += 1
    else:
        # Incorrect
        score += question.negative_marks  # negative value
        incorrect_count += 1

# Calculate section scores
physics_score = sum(scores for q in physics_questions)
chemistry_score = sum(scores for q in chemistry_questions)
math_score = sum(scores for q in math_questions)

# Calculate percentage
percentage = (total_score / total_marks) * 100
```

**User Experience**:
- Confirmation dialog prevents accidental submission
- Loading spinner while scoring
- Redirect to results page (2-3 seconds)

---

### Step 6: Viewing Results

**Results Dashboard**:
```
┌─────────────────────────────────────────────────────────────┐
│              Diagnostic Test Results                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              Your Score: 520 / 800                          │
│              Percentage: 65.0%                              │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Physics:      156/240 (65%)  ████████░░ 45C 10I 5U │    │
│  │ Chemistry:    168/240 (70%)  █████████░ 48C  8I 4U │    │
│  │ Mathematics:  196/320 (61%)  ███████░░░ 55C 15I 10U│    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Overall Performance:                                        │
│  ✓ Correct:      148 questions (74%)                       │
│  ✗ Incorrect:     33 questions (16.5%)                     │
│  ○ Unattempted:   19 questions (9.5%)                      │
│                                                              │
│  Time Taken: 2 hours 35 minutes (of 3 hours)               │
│                                                              │
│  [View Detailed Analytics] [Download Report]                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Frontend Display**:
```javascript
// Display results
const ResultsDashboard = ({ results }) => {
  return (
    <div>
      <h1>Your Score: {results.total_score} / {results.total_marks}</h1>
      <h2>Percentage: {results.percentage}%</h2>
      
      <SectionScores sections={results.section_scores} />
      
      <OverallStats
        correct={results.correct_count}
        incorrect={results.incorrect_count}
        unattempted={results.unattempted_count}
      />
      
      <button onClick={() => navigateToAnalytics()}>
        View Detailed Analytics
      </button>
    </div>
  );
};
```

---

## Timeline

**Total Time: ~3.5 hours**

1. **Test Generation**: 2-3 minutes (async)
2. **Test Taking**: 3 hours (180 minutes)
3. **Scoring**: 2-3 seconds
4. **Results Display**: Immediate

---

## Error Scenarios

### Generation Fails
- **Cause**: API quota exceeded, network error
- **Handling**: Retry automatically, show error message
- **User Action**: Wait and try again, or contact support

### Test Expires
- **Cause**: Student doesn't start test within 7 days
- **Handling**: Mark test as expired
- **User Action**: Request new test generation

### Time Runs Out
- **Cause**: Timer reaches 0:00
- **Handling**: Auto-submit test with current answers
- **User Action**: None (automatic)

### Submission Fails
- **Cause**: Network error during submission
- **Handling**: Retry submission, save answers locally
- **User Action**: Check connection, retry

---

## Next Steps After Results

1. **View Detailed Analytics** (Day 7)
   - Gemini analyzes test results
   - Identifies weak topics
   - Provides insights and recommendations

2. **Generate Study Schedule** (Day 8)
   - Based on analytics
   - Personalized day-by-day plan
   - Prioritizes weak topics

3. **Start Practice** (Day 7)
   - Practice weak topics
   - Track improvement
   - Retake diagnostic test later

---

## Key Metrics Tracked

- **Generation Time**: How long to generate 200 questions
- **Test Completion Rate**: % of students who finish
- **Average Score**: Across all students
- **Time Taken**: Average time to complete test
- **Question Quality**: Based on student feedback
- **API Costs**: Per test generation

---

This flow ensures a smooth experience from test generation through results, with clear feedback at every step and robust error handling.

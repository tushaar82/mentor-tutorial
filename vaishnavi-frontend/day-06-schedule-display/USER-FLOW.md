# User Flow: Schedule Viewing and Tracking

This document describes the complete user journey for viewing and interacting with the AI-generated study schedule.

---

## Overview

The schedule display allows students to:
1. View their personalized study schedule in a calendar format
2. See daily task breakdowns
3. Track progress through task completion
4. Access detailed task information and resources
5. Monitor overall learning progress

---

## User Personas

### Primary User: Ravi (Student)
- **Age**: 17 years old
- **Goal**: Preparing for JEE exam in 90 days
- **Context**: Just completed diagnostic test and received analytics
- **Needs**: Clear daily tasks, progress tracking, motivation

### Secondary User: Mrs. Sharma (Parent)
- **Age**: 45 years old
- **Goal**: Monitor Ravi's study progress
- **Context**: Wants to ensure Ravi stays on track
- **Needs**: Overview of completion status, time spent studying

---

## Main User Flow

### Flow 1: First-Time Schedule View

**Trigger**: Student completes diagnostic test and analytics are generated

**Steps**:

1. **Navigate to Schedule**
   - User clicks "View Schedule" button from analytics page
   - OR clicks "Schedule" in navigation menu
   - Page loads with loading skeleton

2. **Schedule Loads**
   - API fetches schedule data
   - Calendar renders with current month
   - Today's date is highlighted
   - Days with tasks are color-coded
   - Progress tracker shows initial stats

3. **Understand the Calendar**
   - User sees color legend (optional tooltip):
     - 🟢 Green = Completed days
     - 🟡 Yellow = In progress
     - ⚪ Gray = Pending
     - 🔴 Red = Missed
   - Task count badges on days with tasks
   - Current date highlighted with border

4. **View Today's Tasks**
   - Today's date is auto-selected
   - Right panel shows "Daily Tasks for [Today's Date]"
   - List of 3-5 tasks displayed
   - Total duration shown (e.g., "3 hours")
   - Each task shows topic, subject, duration, type

5. **Understand Progress**
   - Progress tracker shows:
     - "0% Complete" (just started)
     - "0 / 90 days completed"
     - "0 topics mastered"
     - "0 hours studied"
   - Motivational message: "Let's get started! 🚀"

**Outcome**: User understands their schedule and sees today's tasks

---

### Flow 2: Starting Daily Study Session

**Trigger**: Student is ready to start studying for the day

**Steps**:

1. **Review Today's Tasks**
   - User sees list of tasks for today
   - Tasks sorted by priority (high → medium → low)
   - First task is highlighted or marked as "Start here"

2. **View Task Details**
   - User clicks on first task card
   - Task details panel slides in from right
   - Shows:
     - Topic: "Newton's Laws of Motion"
     - Subject: Physics
     - Duration: 60 minutes
     - Learning objectives (bullet list)
     - Resources: "Chapter 5 Notes", "Practice Problems Set 1"

3. **Start Task**
   - User clicks "Start Task" button
   - Timer starts (optional feature)
   - Resources links open in new tabs
   - User studies the topic

4. **Complete Task**
   - After studying, user returns to schedule
   - Clicks checkbox on completed task
   - OR clicks "Complete Task" in details panel

5. **Task Completion Feedback**
   - Checkbox checks immediately
   - Task text gets strikethrough
   - Task card fades slightly
   - Toast notification: "Task completed! Great work! 🎉 [Undo]"
   - Progress tracker updates:
     - Study hours increase by 1 hour
     - Completion percentage increases

6. **Continue to Next Task**
   - User sees next task in list
   - Repeats process for remaining tasks

**Outcome**: User completes daily tasks and sees progress

---

### Flow 3: Tracking Progress Over Time

**Trigger**: Student has been studying for several days

**Steps**:

1. **View Calendar Overview**
   - User navigates to schedule page
   - Calendar shows multiple completed days (green)
   - Some in-progress days (yellow)
   - Future days (gray)

2. **Check Progress Stats**
   - Progress tracker shows:
     - "35% Complete"
     - "15 / 90 days completed"
     - "12 topics mastered"
     - "45 hours studied"
     - Streak: "5 days in a row! 🔥"
   - Motivational message: "You're making great progress!"

3. **Review Past Days**
   - User clicks on a past completed day (green)
   - Task list shows all tasks with checkmarks
   - User can see what they studied

4. **Check Upcoming Days**
   - User clicks on future date
   - Task list shows planned tasks
   - User can preview what's coming

5. **Navigate Between Months**
   - User clicks "Next Month" arrow
   - Calendar shows next month's schedule
   - User can plan ahead

**Outcome**: User feels motivated by visible progress

---

### Flow 4: Handling Missed Days

**Trigger**: Student missed studying on a scheduled day

**Steps**:

1. **See Missed Day**
   - Calendar shows past date in red (missed)
   - User clicks on the red date
   - Task list shows incomplete tasks

2. **Understand Impact**
   - Warning message: "You missed this day. Tasks have been rescheduled."
   - Progress tracker shows impact on overall completion

3. **View Rescheduled Tasks**
   - System has automatically redistributed tasks
   - User sees updated schedule for upcoming days
   - Some days may have additional tasks

4. **Get Back on Track**
   - User completes today's tasks
   - Missed day remains red (historical record)
   - Future days adjust to new schedule

**Outcome**: User understands missed days and adapts

---

### Flow 5: Completing a Task with Undo

**Trigger**: Student accidentally marks wrong task as complete

**Steps**:

1. **Mark Task Complete**
   - User clicks checkbox on task
   - Task immediately shows as completed
   - Toast notification appears: "Task completed! [Undo]"

2. **Realize Mistake**
   - User notices they clicked wrong task
   - Undo button is visible for 5 seconds

3. **Undo Completion**
   - User clicks "Undo" button
   - Task returns to incomplete state
   - Checkbox unchecks
   - Strikethrough removed
   - Progress tracker reverts

4. **Complete Correct Task**
   - User finds correct task
   - Marks it as complete
   - Continues studying

**Outcome**: User can correct mistakes easily

---

### Flow 6: Exploring Task Resources

**Trigger**: Student wants to access learning materials

**Steps**:

1. **Select Task**
   - User clicks on task card
   - Task details panel opens

2. **View Resources**
   - Resources section shows:
     - "Chapter 5 Notes" (link)
     - "Practice Problems Set 1" (link)
     - "Video Lecture" (link)

3. **Access Resource**
   - User clicks on "Chapter 5 Notes"
   - Link opens in new tab
   - User studies from the resource

4. **Return to Schedule**
   - User closes resource tab
   - Returns to schedule page
   - Task details panel still open
   - User can access more resources

5. **Complete Task**
   - After studying all resources
   - User clicks "Complete Task" button
   - Panel closes
   - Task marked as complete

**Outcome**: User easily accesses learning materials

---

### Flow 7: Mobile Usage

**Trigger**: Student checks schedule on phone

**Steps**:

1. **Open Schedule on Mobile**
   - User navigates to schedule page on phone
   - Calendar displays in full-width format
   - Touch-friendly interface

2. **View Calendar**
   - User scrolls through calendar
   - Taps on a date
   - Calendar scrolls to show selected date

3. **View Tasks**
   - Task list appears below calendar
   - User scrolls down to see tasks
   - Taps on task to see details

4. **Task Details Full Screen**
   - Task details panel opens full screen
   - User reads task information
   - Swipes down or taps X to close

5. **Complete Task**
   - User taps checkbox
   - Task marked complete
   - Toast notification appears at bottom

**Outcome**: User can manage schedule on mobile

---

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SCHEDULE USER FLOW                        │
└─────────────────────────────────────────────────────────────┘

START: Analytics Page
    ↓
    [Click "View Schedule"]
    ↓
┌─────────────────────┐
│  Schedule Page      │
│  - Calendar View    │
│  - Today Selected   │
│  - Progress Tracker │
└─────────────────────┘
    ↓
    ├─→ [Select Different Date] ──→ View Tasks for Date
    │
    ├─→ [Click Task Card] ──→ Task Details Panel
    │                              ↓
    │                         [Start Task]
    │                              ↓
    │                         Study Resources
    │                              ↓
    │                         [Complete Task]
    │                              ↓
    ├─→ [Check Checkbox] ──→ Task Marked Complete
    │                              ↓
    │                         Progress Updates
    │                              ↓
    │                         [Undo?] ──→ Revert Completion
    │                              ↓
    │                         Continue to Next Task
    │
    ├─→ [View Progress] ──→ Progress Tracker
    │                              ↓
    │                         See Statistics
    │                              ↓
    │                         Motivational Message
    │
    ├─→ [Navigate Months] ──→ View Past/Future
    │                              ↓
    │                         Review Completed Days
    │                              ↓
    │                         Plan Ahead
    │
    └─→ [All Tasks Complete] ──→ Day Complete! 🎉
                                   ↓
                              Return Tomorrow

END: Continue Learning Journey
```

---

## Interaction Patterns

### Calendar Interaction
```
User Action          → System Response
─────────────────────────────────────────────────
Click date           → Highlight date, show tasks
Hover date           → Show task count tooltip
Click prev/next      → Navigate to prev/next month
Click today button   → Jump to current date
```

### Task Interaction
```
User Action          → System Response
─────────────────────────────────────────────────
Click checkbox       → Mark complete, update progress
Click task card      → Open details panel
Click "Start Task"   → Start timer (optional)
Click "Complete"     → Mark complete, close panel
Click "Undo"         → Revert completion
```

### Progress Interaction
```
User Action          → System Response
─────────────────────────────────────────────────
Complete task        → Update percentage, hours
Complete all tasks   → Update days completed
Achieve streak       → Show streak badge
Reach milestone      → Show celebration message
```

---

## Edge Cases and Error Handling

### No Schedule Available
**Scenario**: Student hasn't completed diagnostic test yet

**Flow**:
1. User navigates to schedule page
2. Empty state displays:
   - Icon: Calendar with question mark
   - Message: "No schedule yet"
   - Description: "Complete your diagnostic test to generate a personalized study schedule"
   - Button: "Take Diagnostic Test"
3. User clicks button → Redirected to diagnostic test

---

### API Error
**Scenario**: Backend is down or network error

**Flow**:
1. User navigates to schedule page
2. Loading state shows briefly
3. Error message displays:
   - Icon: Alert triangle
   - Message: "Failed to load schedule"
   - Description: "Please check your internet connection and try again"
   - Button: "Retry"
4. User clicks retry → Attempts to fetch again

---

### Slow Network
**Scenario**: Schedule takes time to load

**Flow**:
1. User navigates to schedule page
2. Loading skeleton displays:
   - Gray boxes for calendar
   - Gray boxes for task list
   - Pulsing animation
3. After 2-3 seconds, data loads
4. Smooth transition from skeleton to actual content

---

### Task Already Completed
**Scenario**: User tries to complete already completed task

**Flow**:
1. User clicks checkbox on completed task
2. Checkbox unchecks (toggle behavior)
3. Task returns to incomplete state
4. Toast: "Task marked as incomplete"
5. Progress tracker decreases

---

## Success Metrics

### User Engagement
- Daily active users viewing schedule
- Average time spent on schedule page
- Number of tasks completed per day
- Streak length (consecutive days)

### User Satisfaction
- Task completion rate
- Schedule adherence rate
- User feedback on schedule usefulness
- Feature usage (details panel, progress tracker)

### Learning Outcomes
- Correlation between schedule adherence and test scores
- Topics mastered over time
- Study hours logged
- Improvement in weak areas

---

## Accessibility Considerations

### Keyboard Navigation
- Tab through calendar dates
- Arrow keys to navigate dates
- Enter to select date
- Space to check/uncheck tasks
- Escape to close panels

### Screen Reader
- Calendar dates announced with task count
- Task completion status announced
- Progress percentages announced
- Descriptive button labels

### Visual
- High contrast colors for status
- Large touch targets (44x44px minimum)
- Clear focus indicators
- Readable font sizes (16px minimum)

---

## Future Enhancements

### Potential Features
1. **Study Timer**: Built-in Pomodoro timer for tasks
2. **Notes**: Add personal notes to tasks
3. **Reminders**: Push notifications for daily tasks
4. **Calendar Export**: Export to Google Calendar, iCal
5. **Study Buddy**: Share progress with friends
6. **Gamification**: Badges, achievements, leaderboards
7. **Voice Commands**: "Mark task complete", "Show today's tasks"
8. **Offline Mode**: View schedule without internet
9. **Custom Tasks**: Add personal study tasks
10. **Schedule Adjustment**: Manually reschedule tasks

---

## Conclusion

The schedule display provides students with:
- **Clarity**: Clear view of daily tasks and long-term plan
- **Motivation**: Visual progress tracking and streaks
- **Flexibility**: Easy task management and rescheduling
- **Accessibility**: Works on all devices, keyboard and screen reader friendly
- **Engagement**: Interactive interface with immediate feedback

This user flow ensures students stay on track with their exam preparation and feel motivated by their visible progress.

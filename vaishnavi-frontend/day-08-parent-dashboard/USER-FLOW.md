# User Flow for Day 8: Parent Dashboard

## Overview

This document illustrates the parent monitoring journey through the dashboard, showing how parents interact with various features to support their child's learning.

---

## Flow 1: Parent Login to Dashboard Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PARENT LOGIN FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. Parent opens app
   │
   ├─→ Already logged in?
   │   ├─→ YES: Go to step 3
   │   └─→ NO: Continue to step 2
   │
2. Parent logs in
   │
   ├─→ Enter email/phone
   ├─→ Enter password or OTP
   ├─→ Click "Login"
   │
3. System checks user role
   │
   ├─→ Role: Parent
   │   └─→ Redirect to /parent (dashboard)
   │
4. Dashboard loads
   │
   ├─→ Show loading skeletons
   ├─→ Fetch dashboard data from API
   ├─→ Display child profile card
   ├─→ Display quick stats (4 cards)
   ├─→ Display activity timeline
   ├─→ Display alerts panel
   │
5. Parent views overview
   │
   ├─→ Sees child's overall progress: 68%
   ├─→ Sees days remaining: 171 days
   ├─→ Sees study streak: 7 days
   ├─→ Sees diagnostic score: 72/100
   ├─→ Sees topics mastered: 45/60
   ├─→ Sees practice questions: 1,247
   ├─→ Sees schedule adherence: 82%
   │
6. Parent notices alert
   │
   └─→ "No practice in 2 days - Encourage your child"
       │
       ├─→ Parent clicks alert
       └─→ Navigates to communication center
```

---

## Flow 2: Checking Performance Analytics

```
┌─────────────────────────────────────────────────────────────┐
│              PERFORMANCE ANALYTICS FLOW                      │
└─────────────────────────────────────────────────────────────┘

1. Parent on dashboard
   │
2. Parent clicks "Analytics" in sidebar
   │
3. Navigate to /parent/analytics
   │
4. Analytics page loads
   │
   ├─→ Show loading skeletons for charts
   ├─→ Fetch performance data
   ├─→ Render subject breakdown bar chart
   ├─→ Render topic mastery heatmap
   ├─→ Render score trends line chart
   ├─→ Display strengths and weaknesses
   │
5. Parent views subject performance
   │
   ├─→ Physics: 72% (Yellow - needs improvement)
   ├─→ Chemistry: 65% (Yellow - needs improvement)
   ├─→ Mathematics: 78% (Green - good)
   │
6. Parent hovers over heatmap
   │
   ├─→ Tooltip shows: "Thermodynamics - 42%"
   ├─→ Cell is red (weak topic)
   │
7. Parent scrolls to weaknesses
   │
   ├─→ Sees: "Thermodynamics - 42%"
   ├─→ Sees: "Organic Chemistry - 45%"
   ├─→ Sees: "Electromagnetism - 48%"
   │
8. Parent clicks "Practice Now" on Thermodynamics
   │
   ├─→ Navigates to teaching resources
   └─→ Filtered to show Thermodynamics resources
```

---

## Flow 3: Monitoring Study Schedule

```
┌─────────────────────────────────────────────────────────────┐
│               SCHEDULE TRACKING FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. Parent clicks "Schedule" in sidebar
   │
2. Navigate to /parent/schedule
   │
3. Schedule page loads
   │
   ├─→ Display weekly calendar (7 days)
   ├─→ Display adherence metrics
   ├─→ Display time spent statistics
   ├─→ Display study pattern analysis
   ├─→ Display missed sessions list
   │
4. Parent views weekly calendar
   │
   ├─→ Monday: 4/4 tasks (Green - 100%)
   ├─→ Tuesday: 3/4 tasks (Yellow - 75%)
   ├─→ Wednesday: 4/4 tasks (Green - 100%)
   ├─→ Thursday: 2/4 tasks (Red - 50%)
   ├─→ Friday: 4/4 tasks (Green - 100%)
   ├─→ Saturday: 3/4 tasks (Yellow - 75%)
   ├─→ Sunday: 4/4 tasks (Green - 100%)
   │
5. Parent notices Thursday is red
   │
   ├─→ Clicks on Thursday card
   ├─→ Modal shows task details:
   │   ├─→ Completed: Calculus practice, Physics revision
   │   └─→ Missed: Organic Chemistry, Thermodynamics
   │
6. Parent views adherence metrics
   │
   ├─→ This week: 85% (6/7 days) ↑
   ├─→ This month: 78% (23/30 days) ↓
   ├─→ Overall: 82% →
   │
7. Parent views missed sessions
   │
   ├─→ Nov 21: Organic Chemistry (Reason: Felt tired)
   ├─→ Nov 18: Thermodynamics (Reason: School event)
   │
8. Parent clicks "Reschedule" on Organic Chemistry
   │
   ├─→ Opens schedule review session form
   ├─→ Pre-filled with: Topic = Organic Chemistry
   ├─→ Parent selects: Date = Tomorrow, Time = 6 PM
   ├─→ Parent clicks "Schedule"
   └─→ Confirmation: "Review session scheduled"
```

---

## Flow 4: Reviewing Practice Activity

```
┌─────────────────────────────────────────────────────────────┐
│               PRACTICE ACTIVITY FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. Parent clicks "Practice" in sidebar
   │
2. Navigate to /parent/practice
   │
3. Practice page loads
   │
   ├─→ Display overall statistics
   ├─→ Display topic-wise breakdown table
   ├─→ Display accuracy trends chart
   ├─→ Display most/least practiced topics
   ├─→ Display practice session history
   │
4. Parent views overall statistics
   │
   ├─→ Total questions: 1,247
   ├─→ Correct answers: 892 (71.5%)
   ├─→ Topics practiced: 45/60
   ├─→ Average accuracy: 71.5%
   │
5. Parent sorts table by accuracy (ascending)
   │
   ├─→ Clicks "Accuracy" column header
   ├─→ Table re-sorts to show lowest accuracy first
   │
6. Parent sees lowest accuracy topics
   │
   ├─→ Thermodynamics: 15 questions, 40% accuracy (Red)
   ├─→ Organic Chemistry: 22 questions, 45% accuracy (Red)
   ├─→ Electromagnetism: 18 questions, 50% accuracy (Yellow)
   │
7. Parent scrolls to "Least Practiced Topics"
   │
   ├─→ Sees: Atomic Structure (only 3 questions)
   ├─→ Sees: Chemical Bonding (only 5 questions)
   │
8. Parent clicks "Encourage practice" on Atomic Structure
   │
   ├─→ Opens communication center
   ├─→ Pre-filled message: "I noticed you haven't practiced Atomic Structure much. Let's work on it together!"
   ├─→ Parent clicks "Send"
   └─→ Message sent to child
```

---

## Flow 5: Accessing Teaching Resources

```
┌─────────────────────────────────────────────────────────────┐
│              TEACHING RESOURCES FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. Parent clicks "Resources" in sidebar
   │
2. Navigate to /parent/resources
   │
3. Resources page loads
   │
   ├─→ Display language selector (default: English)
   ├─→ Display resource categories tabs
   ├─→ Display resource cards (Weak Topics tab active)
   │
4. Parent views weak topics resources
   │
   ├─→ Thermodynamics card
   ├─→ Organic Chemistry card
   ├─→ Electromagnetism card
   │
5. Parent clicks on Thermodynamics card
   │
   ├─→ Card expands to show all sections
   │
6. Parent reads teaching tips
   │
   ├─→ "Explain using real-world examples like refrigerators and air conditioners"
   ├─→ "Use the analogy of water flowing downhill for heat transfer"
   ├─→ "Draw energy diagrams together"
   │
7. Parent reads practice exercises
   │
   ├─→ "Solve 5 problems together on heat engines"
   ├─→ "Discuss the Carnot cycle step-by-step"
   ├─→ "Create flashcards for key formulas"
   │
8. Parent reads common mistakes
   │
   ├─→ "Students often confuse heat and temperature"
   ├─→ "Forgetting to convert units (Celsius to Kelvin)"
   ├─→ "Misunderstanding the direction of heat flow"
   │
9. Parent wants to hear audio summary
   │
   ├─→ Clicks audio playback button (speaker icon)
   ├─→ Audio plays: "Thermodynamics is the study of heat and energy..."
   │
10. Parent wants Hindi version
    │
    ├─→ Clicks language selector
    ├─→ Selects "Hindi"
    ├─→ All resource content updates to Hindi
    │
11. Parent wants to save for offline
    │
    ├─→ Clicks "Download PDF" button
    ├─→ PDF generates with all teaching tips
    └─→ PDF downloads: "teaching-resources-thermodynamics.pdf"
```

---

## Flow 6: Viewing AI Insights

```
┌─────────────────────────────────────────────────────────────┐
│                  AI INSIGHTS FLOW                            │
└─────────────────────────────────────────────────────────────┘

1. Parent clicks "Insights" in sidebar
   │
2. Navigate to /parent/insights
   │
3. Insights page loads
   │
   ├─→ Display weekly insights summary
   ├─→ Display areas needing attention
   ├─→ Display improvement suggestions
   ├─→ Display study habit recommendations
   ├─→ Display milestone celebrations
   ├─→ Display intervention alerts
   │
4. Parent reads weekly insights
   │
   ├─→ "Your child showed great improvement in Calculus this week (+12%)"
   ├─→ "Thermodynamics needs more attention - only 2 practice sessions"
   ├─→ "Study consistency improved - 6/7 days completed"
   ├─→ "Time management is good - average 3.5 hours per day"
   │
5. Parent views areas needing attention
   │
   ├─→ Organic Chemistry (High severity - Red)
   │   └─→ Reason: "Low mastery (45%) and declining accuracy"
   │
   ├─→ Time Management (Medium severity - Yellow)
   │   └─→ Reason: "Spending too long on easy questions"
   │
   ├─→ Practice Consistency (Low severity - Blue)
   │   └─→ Reason: "Missed 2 practice sessions this week"
   │
6. Parent clicks "View details" on Organic Chemistry
   │
   ├─→ Modal shows detailed analysis:
   │   ├─→ Current mastery: 45%
   │   ├─→ Questions attempted: 22
   │   ├─→ Accuracy: 45%
   │   ├─→ Last practiced: 3 days ago
   │   ├─→ Recommended actions:
   │   │   ├─→ Schedule daily 30-minute practice
   │   │   ├─→ Review teaching resources together
   │   │   └─→ Focus on reaction mechanisms
   │
7. Parent views improvement suggestions
   │
   ├─→ Suggestion 1: "Schedule 30-minute daily practice for weak topics"
   │   ├─→ Actionable steps:
   │   │   1. Identify 3 weakest topics
   │   │   2. Allocate 10 minutes per topic daily
   │   │   3. Track progress weekly
   │   └─→ Parent clicks "Mark as done"
   │
8. Parent views study habit recommendations
   │
   ├─→ "Best study time: Evening (6-9 PM)"
   │   └─→ Based on: Child's performance data shows highest accuracy during evening sessions
   │
   ├─→ "Take 10-minute breaks every hour"
   │   └─→ Based on: Attention span analysis
   │
   ├─→ "Study in quiet environment"
   │   └─→ Based on: Performance improves with fewer distractions
   │
9. Parent sees milestone celebration
   │
   ├─→ 🎉 "50 topics mastered!"
   ├─→ Confetti animation plays
   ├─→ Description: "Your child has mastered 50 out of 60 topics. Great progress!"
   ├─→ Date achieved: "Nov 24, 2024"
   │
10. Parent views intervention alert
    │
    ├─→ "No practice in 3 days" (Red alert)
    ├─→ Action buttons:
    │   ├─→ "Send reminder" → Opens communication center
    │   └─→ "View schedule" → Opens schedule page
    │
11. Parent clicks "Send reminder"
    │
    ├─→ Opens communication center
    ├─→ Pre-filled message: "I noticed you haven't practiced in 3 days. Let's get back on track!"
    └─→ Parent sends message
```

---

## Flow 7: Communicating with Child

```
┌─────────────────────────────────────────────────────────────┐
│              COMMUNICATION CENTER FLOW                       │
└─────────────────────────────────────────────────────────────┘

1. Parent accesses communication center
   │
   ├─→ From dashboard alert
   ├─→ From insights page
   ├─→ Or clicks "Communication" in sidebar
   │
2. Communication center loads
   │
   ├─→ Display send message form
   ├─→ Display set reminders form
   ├─→ Display schedule session form
   ├─→ Display notes section
   ├─→ Display goal setting section
   ├─→ Display message history
   │
3. Parent wants to send encouragement
   │
   ├─→ Clicks template dropdown
   ├─→ Selects: "Great job on your practice today!"
   ├─→ Message auto-fills in text area
   ├─→ Parent adds: "Keep up the good work! I'm proud of you."
   ├─→ Character count: 78/500
   ├─→ Parent clicks "Send"
   ├─→ Success message: "Message sent to Rahul"
   │
4. Parent wants to set study reminder
   │
   ├─→ Selects time: 6:00 PM
   ├─→ Selects topic: Organic Chemistry
   ├─→ Selects frequency: Daily
   ├─→ Parent clicks "Set reminder"
   ├─→ Confirmation: "Daily reminder set for 6:00 PM - Organic Chemistry"
   │
5. Parent wants to schedule review session
   │
   ├─→ Selects date: Tomorrow (Nov 26)
   ├─→ Selects time: 7:00 PM
   ├─→ Selects topic: Thermodynamics
   ├─→ Selects duration: 1 hour
   ├─→ Adds note: "Let's review the Carnot cycle together"
   ├─→ Parent clicks "Schedule"
   ├─→ Confirmation: "Review session scheduled for Nov 26 at 7:00 PM"
   │
6. Parent wants to add private note
   │
   ├─→ Clicks "Add note" button
   ├─→ Text area appears
   ├─→ Parent types: "Rahul seems stressed about Organic Chemistry. Need to provide more support."
   ├─→ Parent clicks "Save note"
   ├─→ Note saved with timestamp: "Nov 25, 2024, 3:45 PM"
   │
7. Parent wants to set weekly goal
   │
   ├─→ Clicks "Set weekly goal" button
   ├─→ Form appears
   ├─→ Parent enters: "Complete 100 practice questions"
   ├─→ Selects target date: End of week (Dec 1)
   ├─→ Parent clicks "Set goal"
   ├─→ Goal added to tracking
   ├─→ Progress bar shows: 0/100 questions
   │
8. Parent views message history
   │
   ├─→ Sees past messages:
   │   ├─→ "Great job on your practice today!" (Nov 25, Read)
   │   ├─→ "Let's review Thermodynamics together" (Nov 24, Read)
   │   └─→ "Keep up the good work!" (Nov 23, Read)
   │
   ├─→ Filters by type: "Encouragement"
   └─→ Shows only encouragement messages
```

---

## Flow 8: Generating Progress Report

```
┌─────────────────────────────────────────────────────────────┐
│              PDF REPORT GENERATION FLOW                      │
└─────────────────────────────────────────────────────────────┘

1. Parent wants comprehensive report
   │
2. Parent clicks "Generate Report" button
   │
   ├─→ Button in header (available on all pages)
   ├─→ Or from dashboard overview
   │
3. Report generation starts
   │
   ├─→ Loading modal appears
   ├─→ Progress indicator: "Generating report..."
   ├─→ Steps shown:
   │   ├─→ ✓ Collecting data
   │   ├─→ ✓ Generating charts
   │   ├─→ ✓ Creating PDF
   │   └─→ ⏳ Preparing download
   │
4. PDF generation completes
   │
   ├─→ Success message: "Report generated successfully"
   ├─→ PDF downloads automatically
   ├─→ Filename: "progress-report-rahul-sharma-2024-11-25.pdf"
   │
5. Parent opens PDF
   │
   ├─→ Page 1: Cover page
   │   ├─→ Title: "Progress Report"
   │   ├─→ Child: Rahul Sharma
   │   ├─→ Exam: JEE
   │   ├─→ Report date: Nov 25, 2024
   │
   ├─→ Page 2: Executive summary
   │   ├─→ Overall progress: 68%
   │   ├─→ Key achievements (bullet points)
   │   ├─→ Areas needing attention (bullet points)
   │
   ├─→ Page 3: Performance analytics
   │   ├─→ Subject-wise breakdown (table)
   │   ├─→ Topic mastery summary
   │   ├─→ Score trends (chart as image)
   │
   ├─→ Page 4: Practice activity
   │   ├─→ Total questions: 1,247
   │   ├─→ Accuracy: 71.5%
   │   ├─→ Most/least practiced topics
   │
   ├─→ Page 5: Schedule adherence
   │   ├─→ Adherence: 82%
   │   ├─→ Time spent: 24 hours/week
   │   ├─→ Missed sessions list
   │
   ├─→ Page 6: AI insights
   │   ├─→ Weekly insights
   │   ├─→ Recommendations
   │   ├─→ Next steps
   │
   └─→ Footer on each page:
       ├─→ Page number
       ├─→ Generated date
       └─→ "Mentor AI - EdTech Platform"
   │
6. Parent shares report
   │
   ├─→ Saves PDF to device
   ├─→ Shares with family members
   └─→ Discusses with child during review session
```

---

## Flow 9: Updating Settings

```
┌─────────────────────────────────────────────────────────────┐
│                   SETTINGS FLOW                              │
└─────────────────────────────────────────────────────────────┘

1. Parent clicks "Settings" in sidebar
   │
2. Navigate to /parent/settings
   │
3. Settings page loads
   │
   ├─→ Display notification preferences
   ├─→ Display language selection
   ├─→ Display report frequency
   ├─→ Display privacy settings
   ├─→ Display child profile management
   │
4. Parent updates notification preferences
   │
   ├─→ Toggles "Daily progress summary" ON
   ├─→ Toggles "Weekly insights" ON
   ├─→ Toggles "Alert notifications" ON
   ├─→ Toggles "Email notifications" OFF
   ├─→ "Save" button becomes enabled
   │
5. Parent changes language
   │
   ├─→ Clicks language dropdown
   ├─→ Selects "Hindi"
   ├─→ Confirmation: "Language will apply to teaching resources"
   │
6. Parent updates report frequency
   │
   ├─→ Selects "Weekly summary" (was "Daily digest")
   │
7. Parent updates child's exam date
   │
   ├─→ Clicks date picker
   ├─→ Changes from "May 15, 2025" to "May 20, 2025"
   ├─→ Days remaining updates automatically
   │
8. Parent clicks "Save" button
   │
   ├─→ Button shows loading spinner
   ├─→ API call to update settings
   ├─→ Success toast: "Settings saved successfully"
   ├─→ Button returns to normal state
   │
9. Parent navigates away
   │
10. Parent returns to settings
    │
    └─→ All changes are persisted
```

---

## Flow 10: Mobile Experience

```
┌─────────────────────────────────────────────────────────────┐
│                MOBILE NAVIGATION FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. Parent opens app on mobile device
   │
2. Dashboard loads in mobile view
   │
   ├─→ Hamburger menu icon (top-left)
   ├─→ Child name and photo (top-center)
   ├─→ Notification bell (top-right)
   ├─→ Stats cards stack vertically (1 column)
   ├─→ Activity timeline below stats
   ├─→ Alerts panel below timeline
   │
3. Parent taps hamburger menu
   │
   ├─→ Drawer slides in from left
   ├─→ Shows navigation items:
   │   ├─→ Dashboard
   │   ├─→ Analytics
   │   ├─→ Schedule
   │   ├─→ Practice
   │   ├─→ Resources
   │   ├─→ Insights
   │   └─→ Settings
   │
4. Parent taps "Analytics"
   │
   ├─→ Drawer closes
   ├─→ Navigate to analytics page
   ├─→ Charts stack vertically
   ├─→ Charts resize to fit screen width
   │
5. Parent scrolls through analytics
   │
   ├─→ Smooth scrolling
   ├─→ Charts remain readable
   ├─→ Touch interactions work
   │
6. Parent taps on heatmap cell
   │
   ├─→ Tooltip appears
   ├─→ Shows topic name and mastery
   │
7. Parent wants to go back
   │
   ├─→ Taps hamburger menu
   ├─→ Taps "Dashboard"
   └─→ Returns to dashboard
```

---

## Summary of User Journeys

### Primary Journeys
1. **Daily Check-in**: Parent logs in → Views dashboard → Checks alerts → Takes action
2. **Performance Review**: Parent views analytics → Identifies weak topics → Accesses teaching resources
3. **Schedule Monitoring**: Parent checks schedule → Sees missed sessions → Reschedules or sends reminder
4. **Practice Tracking**: Parent reviews practice activity → Identifies gaps → Encourages child
5. **Resource Access**: Parent finds weak topic → Reads teaching tips → Downloads PDF or plays audio
6. **Insight Review**: Parent reads AI insights → Views recommendations → Takes suggested actions
7. **Communication**: Parent sends encouragement → Sets reminders → Schedules review sessions
8. **Report Generation**: Parent generates PDF → Reviews comprehensive report → Shares with family
9. **Settings Management**: Parent updates preferences → Changes language → Saves settings

### Key Interaction Patterns
- **Click → Navigate**: Sidebar links, stat cards, action buttons
- **Hover → Tooltip**: Charts, heatmap cells, info icons
- **Expand → Details**: Resource cards, activity items, session details
- **Filter → Results**: Search bars, dropdowns, tabs
- **Form → Submit**: Messages, reminders, sessions, settings
- **Generate → Download**: PDF reports, resource PDFs

### Success Indicators
- Parent can monitor child's progress independently
- Parent can identify areas needing attention quickly
- Parent can access teaching resources easily
- Parent can communicate with child effectively
- Parent can generate comprehensive reports
- Parent can work on any device (desktop, tablet, mobile)

---

## Next Steps

Understanding these user flows helps ensure the parent dashboard provides an intuitive and effective monitoring experience. Review **TROUBLESHOOTING.md** for common issues and solutions.

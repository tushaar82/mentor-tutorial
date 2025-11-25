# AI Coding Agent Prompts for Day 8: Parent Dashboard (Frontend)

## Overview

This document contains all AI coding agent prompts needed to build the parent dashboard interface. Use these prompts with Windsurf, GitHub Copilot (inline in IDE), or ChatGPT/Claude (chat interface).

**Total Prompts**: 12
**Estimated Time**: 60 minutes

---

## Prompt 1: Parent Dashboard Types and Interfaces

### Purpose
Define TypeScript types for parent dashboard data structures.

### When to Use
Start with this prompt to establish type safety for all parent dashboard components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `types/parent.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create comprehensive TypeScript types for parent dashboard
// Include: ParentDashboard, ChildProfile, QuickStats, ActivityItem, Alert
// PerformanceAnalytics, ScheduleTracking, PracticeActivity, TeachingResource
// AIInsight, Recommendation, CommunicationMessage, ParentSettings
// All types should have proper JSDoc comments
// Use proper TypeScript conventions (interfaces for objects, types for unions)
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated types

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create comprehensive TypeScript types for a parent dashboard in an EdTech platform.

CONTEXT:
- Project: Mentor AI EdTech Platform (JEE/NEET exam preparation)
- Stack: Next.js 14, TypeScript, React
- File: types/parent.ts

GENERATE:
TypeScript interfaces and types for parent dashboard data structures.

TYPES NEEDED:
1. ChildProfile (id, name, email, exam, targetDate, profilePicture, overallProgress, studyStreak)
2. QuickStats (diagnosticScore, percentile, topicsMastered, totalTopics, practiceQuestions, scheduleAdherence)
3. ActivityItem (id, type, description, timestamp, icon, metadata)
4. Alert (id, type, message, severity, timestamp, actionable, actionLink)
5. SubjectPerformance (subject, score, topicsMastered, totalTopics, trend)
6. TopicMastery (topicId, topicName, subject, masteryLevel, questionsAttempted, lastPracticed)
7. ScoreTrend (date, score, subject)
8. ScheduleDay (date, tasksCompleted, tasksTotal, adherence, missedTasks)
9. PracticeSession (id, topicId, topicName, questionsAttempted, correct, accuracy, duration, timestamp)
10. TeachingResource (id, topicId, topicName, subject, teachingTips, practiceExercises, commonMistakes, analogies, language)
11. AIInsight (id, type, message, priority, timestamp, relatedTopics)
12. Recommendation (id, category, title, description, actionable, actionLink)
13. CommunicationMessage (id, from, to, message, timestamp, read)
14. ParentSettings (notifications, language, reportFrequency, privacy)
15. ParentDashboardData (child, quickStats, activities, alerts, performance, schedule, practice, insights)

REQUIREMENTS:
1. Use TypeScript interfaces for object types
2. Use type unions for enums (e.g., AlertSeverity = 'info' | 'warning' | 'critical')
3. Add JSDoc comments for each interface
4. Include optional fields where appropriate
5. Use proper TypeScript conventions
6. Export all types

OUTPUT FORMAT:
- Complete TypeScript file with all types
- Include all imports if needed
- Add file header comment
```

**What You'll Get**: Complete `types/parent.ts` file with all TypeScript interfaces

**What to Do**:
1. Copy the generated code
2. Create file `types/parent.ts`
3. Paste and save

---

## Prompt 2: Parent Context Provider

### Purpose
Create React Context for sharing parent and child data across dashboard components.

### When to Use
After creating types, set up the context provider for state management.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `contexts/ParentContext.tsx`

**Step 2**: Type this comment:
```typescript
// Create ParentContext with React Context API
// Provide: child profile, dashboard data, loading state, error state
// Include: fetchDashboardData, refreshData, updateSettings functions
// Use TypeScript for type safety
// Add error handling and loading states
```

**Step 3**: Press Tab for Copilot generation

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a React Context provider for parent dashboard data management.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React Context API
- File: contexts/ParentContext.tsx

GENERATE:
ParentContext with provider component and custom hook.

REQUIREMENTS:
1. Create ParentContext with createContext
2. Create ParentProvider component that:
   - Fetches dashboard data from API
   - Manages loading and error states
   - Provides child profile data
   - Provides dashboard statistics
   - Provides refresh function
3. Create useParent custom hook for easy access
4. Use TypeScript interfaces from types/parent.ts
5. Include error handling
6. Add JSDoc comments

INTEGRATE WITH:
- types/parent.ts (import ParentDashboardData type)
- lib/parent-api.ts (import API functions)

OUTPUT FORMAT:
- Complete React Context file
- Include all imports
- Export ParentProvider and useParent hook
```

**What to Do**: Copy code to `contexts/ParentContext.tsx`

---

## Prompt 3: Parent API Helper Functions

### Purpose
Create API helper functions for fetching parent dashboard data.

### When to Use
After setting up context, create API functions for data fetching.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `lib/parent-api.ts`

**Step 2**: Type this comment:
```typescript
// Create parent dashboard API helper functions
// Functions: getParentDashboard, getChildProgress, getTeachingResources
// getAIInsights, sendMessage, updateParentSettings, generateReport
// Use fetch API with proper error handling
// Add TypeScript types for all parameters and return values
// Include retry logic for failed requests
```

**Step 3**: Let Copilot generate the functions

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create API helper functions for parent dashboard data fetching.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript
- File: lib/parent-api.ts
- API Base URL: process.env.NEXT_PUBLIC_API_URL or http://localhost:8000

GENERATE:
API helper functions for parent dashboard.

FUNCTIONS NEEDED:
1. getParentDashboard(parentId: string): Promise<ParentDashboardData>
2. getChildProgress(childId: string): Promise<ChildProfile>
3. getPerformanceAnalytics(childId: string): Promise<PerformanceAnalytics>
4. getScheduleTracking(childId: string): Promise<ScheduleTracking>
5. getPracticeActivity(childId: string): Promise<PracticeActivity>
6. getTeachingResources(childId: string, language: string): Promise<TeachingResource[]>
7. getAIInsights(childId: string): Promise<AIInsight[]>
8. sendMessage(parentId: string, childId: string, message: string): Promise<void>
9. updateParentSettings(parentId: string, settings: ParentSettings): Promise<void>
10. generatePDFReport(childId: string): Promise<Blob>

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Handle errors with try-catch
3. Add proper TypeScript types
4. Include authorization headers
5. Add retry logic for failed requests (max 3 retries)
6. Add request timeout (30 seconds)
7. Add JSDoc comments for each function

INTEGRATE WITH:
- types/parent.ts (import all types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What to Do**: Copy code to `lib/parent-api.ts`

---

## Prompt 4: Dashboard Overview Components

### Purpose
Create the main dashboard overview with child profile, quick stats, and activity timeline.

### When to Use
After API setup, create the main dashboard landing page components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/DashboardOverview.tsx`

**Step 2**: Type this comment:
```typescript
// Create DashboardOverview component for parent dashboard
// Display: ChildProfileCard, QuickStatsCards (4 cards), ActivityTimeline, AlertsPanel
// Use grid layout with responsive design
// Show loading skeleton while data loads
// Handle error states gracefully
// Use Tailwind CSS for styling
// Add TypeScript props interface
```

**Step 3**: Let Copilot generate the component

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create the main dashboard overview component for parent dashboard.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS
- File: components/parent/DashboardOverview.tsx

GENERATE:
DashboardOverview component that displays key metrics and activity.

COMPONENT STRUCTURE:
1. Child profile card (top):
   - Profile picture (circular)
   - Child name
   - Exam type (JEE/NEET)
   - Target date
   - Days remaining countdown
   - Overall progress (circular progress ring)

2. Quick stats cards (4 cards in grid):
   - Diagnostic test score (with percentile)
   - Topics mastered (X/Y with percentage)
   - Practice questions completed
   - Schedule adherence (with trend indicator)

3. Activity timeline (left column):
   - Last 7 days of activities
   - Icon, description, timestamp
   - Scroll if more than 5 items

4. Alerts panel (right column):
   - Important notifications
   - Color-coded by severity (info/warning/critical)
   - Action buttons where applicable

REQUIREMENTS:
1. Use TypeScript with proper prop types
2. Responsive grid layout (desktop: 2 columns, mobile: 1 column)
3. Use Tailwind CSS for styling
4. Show loading skeleton while data loads
5. Handle error states with error message
6. Use icons from lucide-react
7. Add smooth animations with Framer Motion
8. Make cards clickable to navigate to detail pages
9. Add JSDoc comments

INTEGRATE WITH:
- contexts/ParentContext (use useParent hook)
- types/parent.ts (import types)
- components/parent/ChildProfileCard
- components/parent/QuickStatsCards
- components/parent/ActivityTimeline
- components/parent/AlertsPanel

OUTPUT FORMAT:
- Complete React component file
- Include all imports
- Export default component
```

**What to Do**: Copy code to `components/parent/DashboardOverview.tsx`

---

## Prompt 5: Child Profile and Quick Stats Cards

### Purpose
Create reusable components for child profile display and quick statistics cards.

### When to Use
After creating the overview component, build the child components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/ChildProfileCard.tsx`

**Step 2**: Type this comment:
```typescript
// Create ChildProfileCard component
// Display: profile picture, name, exam type, target date, days remaining, progress ring
// Use circular progress indicator for overall progress
// Responsive design with Tailwind CSS
// Add TypeScript props for ChildProfile
```

**Step 3**: Create file `components/parent/QuickStatsCards.tsx`

**Step 4**: Type this comment:
```typescript
// Create QuickStatsCards component with 4 stat cards
// Cards: Diagnostic Score, Topics Mastered, Practice Questions, Schedule Adherence
// Each card: title, value, subtitle, trend indicator (up/down arrow)
// Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile
// Use icons from lucide-react
// Add click handlers to navigate to detail pages
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create ChildProfileCard and QuickStatsCards components for parent dashboard.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS
- Files: components/parent/ChildProfileCard.tsx and components/parent/QuickStatsCards.tsx

GENERATE:
Two components for displaying child profile and quick statistics.

COMPONENT 1: ChildProfileCard
- Props: child (ChildProfile type)
- Display:
  - Profile picture (circular, 80px)
  - Child name (text-2xl font-bold)
  - Exam type badge (JEE/NEET with color)
  - Target date (formatted as "DD MMM YYYY")
  - Days remaining (countdown with urgency color)
  - Overall progress (circular progress ring, 0-100%)
- Styling: Card with gradient background, shadow, rounded corners
- Responsive: Stack vertically on mobile

COMPONENT 2: QuickStatsCards
- Props: stats (QuickStats type), onCardClick (optional callback)
- Display 4 cards:
  1. Diagnostic Score: score/100, percentile, trophy icon
  2. Topics Mastered: X/Y topics, percentage, book icon
  3. Practice Questions: total count, accuracy, target icon
  4. Schedule Adherence: percentage, trend arrow, calendar icon
- Each card:
  - Icon (top-left, colored)
  - Title (text-sm text-gray-600)
  - Value (text-3xl font-bold)
  - Subtitle (text-sm text-gray-500)
  - Trend indicator (up/down arrow with color)
- Grid: 4 columns desktop, 2 tablet, 1 mobile
- Hover effect: scale and shadow
- Click: navigate to detail page

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Tailwind CSS for styling
3. Use lucide-react for icons
4. Add hover and click animations
5. Responsive design
6. Add JSDoc comments
7. Handle missing data gracefully

INTEGRATE WITH:
- types/parent.ts (import ChildProfile, QuickStats)
- next/navigation (useRouter for navigation)

OUTPUT FORMAT:
- Two complete React component files
- Include all imports
- Export default components
```

**What to Do**: Copy code to respective files

---

## Prompt 6: Activity Timeline and Alerts Panel

### Purpose
Create components for displaying recent activities and important alerts.

### When to Use
Continue building dashboard overview components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/ActivityTimeline.tsx`

**Step 2**: Type this comment:
```typescript
// Create ActivityTimeline component
// Display list of recent activities (last 7 days)
// Each item: icon, description, timestamp (relative time)
// Vertical timeline with connecting lines
// Scroll if more than 5 items
// Use different icons for different activity types
```

**Step 3**: Create file `components/parent/AlertsPanel.tsx`

**Step 4**: Type this comment:
```typescript
// Create AlertsPanel component
// Display important alerts and notifications
// Color-coded by severity: info (blue), warning (yellow), critical (red)
// Each alert: icon, message, timestamp, optional action button
// Dismissible alerts with X button
// Empty state when no alerts
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create ActivityTimeline and AlertsPanel components for parent dashboard.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS
- Files: components/parent/ActivityTimeline.tsx and components/parent/AlertsPanel.tsx

GENERATE:
Two components for displaying activities and alerts.

COMPONENT 1: ActivityTimeline
- Props: activities (ActivityItem[] type)
- Display:
  - Vertical timeline with connecting lines
  - Each activity item:
    - Icon (based on activity type: practice, test, schedule, mastery)
    - Description text
    - Relative timestamp ("2 hours ago", "Yesterday")
  - Show last 7 days of activities
  - Scroll container if more than 5 items
  - Empty state: "No recent activities"
- Activity types and icons:
  - practice: Target icon
  - test: FileText icon
  - schedule: Calendar icon
  - mastery: TrendingUp icon
  - missed: AlertCircle icon
- Styling: Timeline line on left, items indented

COMPONENT 2: AlertsPanel
- Props: alerts (Alert[] type), onDismiss (callback)
- Display:
  - List of alerts (max 5, show "View all" if more)
  - Each alert:
    - Severity icon and color:
      - info: Info icon, blue background
      - warning: AlertTriangle icon, yellow background
      - critical: AlertOctagon icon, red background
    - Message text
    - Timestamp (relative)
    - Action button (if actionable)
    - Dismiss X button (top-right)
  - Empty state: "No alerts - Everything looks good!"
- Styling: Card with border-left colored by severity
- Animations: Fade out on dismiss

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Tailwind CSS for styling
3. Use lucide-react for icons
4. Use date-fns for relative time formatting
5. Add smooth animations
6. Responsive design
7. Add JSDoc comments

INTEGRATE WITH:
- types/parent.ts (import ActivityItem, Alert)
- date-fns (import formatDistanceToNow)

OUTPUT FORMAT:
- Two complete React component files
- Include all imports
- Export default components
```

**What to Do**: Copy code to respective files

---

## Prompt 7: Performance Analytics Components

### Purpose
Create components for displaying detailed performance analytics with charts.

### When to Use
After dashboard overview, build the analytics detail page components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/PerformanceAnalytics.tsx`

**Step 2**: Type this comment:
```typescript
// Create PerformanceAnalytics component
// Display: SubjectBreakdown (bar chart), TopicHeatmap (grid), ScoreTrends (line chart)
// Use Recharts for charts
// Show strengths (top 5 topics) and weaknesses (bottom 5 topics)
// Predicted exam readiness score with explanation
// Responsive layout with Tailwind CSS
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create PerformanceAnalytics component with charts and visualizations.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS, Recharts
- File: components/parent/PerformanceAnalytics.tsx

GENERATE:
Comprehensive performance analytics component with multiple visualizations.

COMPONENT STRUCTURE:
1. Subject-wise performance (bar chart):
   - Physics, Chemistry, Mathematics
   - Horizontal bars showing percentage (0-100%)
   - Color-coded: Red (<50%), Yellow (50-75%), Green (>75%)
   - Show exact percentage on bars

2. Topic mastery heatmap:
   - Grid of all topics (10x6 grid)
   - Each cell: topic name (truncated), color by mastery
   - Tooltip on hover: full topic name, mastery percentage
   - Color scale: Red → Yellow → Green

3. Score trends over time (line chart):
   - X-axis: Dates (last 30 days)
   - Y-axis: Score (0-100%)
   - Multiple lines: Physics, Chemistry, Math, Overall
   - Show target score as horizontal dashed line
   - Legend at bottom

4. Strengths and weaknesses:
   - Two columns: Top 5 strong topics, Top 5 weak topics
   - Each topic: name, mastery percentage, progress bar
   - Weak topics have "Practice Now" button

5. Predicted exam readiness:
   - Large circular progress (0-100%)
   - Explanation text below
   - Based on: current mastery, time remaining, practice rate

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Recharts for all charts
3. Responsive design (stack on mobile)
4. Loading skeletons for charts
5. Handle empty data gracefully
6. Add tooltips for better UX
7. Use Tailwind CSS for styling
8. Add JSDoc comments

INTEGRATE WITH:
- types/parent.ts (import performance types)
- recharts (import BarChart, LineChart, etc.)
- contexts/ParentContext (use useParent hook)

OUTPUT FORMAT:
- Complete React component file
- Include all imports
- Export default component
```

**What to Do**: Copy code to `components/parent/PerformanceAnalytics.tsx`

---

## Prompt 8: Schedule Tracking Components

### Purpose
Create components for tracking study schedule adherence and time spent.

### When to Use
After performance analytics, build schedule tracking components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/ScheduleTracker.tsx`

**Step 2**: Type this comment:
```typescript
// Create ScheduleTracker component
// Display: WeeklyCalendar (7-day view), adherence metrics, time spent stats
// Calendar shows completed/pending/missed tasks per day
// Color coding: Green (completed), Red (missed), Gray (pending)
// Show adherence percentage for week, month, overall
// Display study pattern analysis (best time, most productive day)
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create ScheduleTracker component for monitoring study schedule adherence.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS
- File: components/parent/ScheduleTracker.tsx

GENERATE:
Schedule tracking component with calendar and metrics.

COMPONENT STRUCTURE:
1. Weekly calendar view:
   - 7 days (Mon-Sun) in grid
   - Each day card:
     - Date (e.g., "Mon 25")
     - Tasks completed / total (e.g., "3/4")
     - Circular progress indicator
     - Color: Green (100%), Yellow (50-99%), Red (<50%), Gray (0%)
   - Click day to see task details

2. Adherence metrics (3 cards):
   - This week: X% (Y/7 days)
   - This month: X% (Y/30 days)
   - Overall: X% (Y/Z days)
   - Each with trend indicator

3. Time spent statistics:
   - Today: X hours
   - This week: X hours (bar chart by day)
   - Average per day: X hours
   - Total time: X hours

4. Study pattern analysis:
   - Best study time: "6 PM - 9 PM"
   - Most productive day: "Sunday"
   - Consistency score: X%
   - Recommendations

5. Missed sessions list:
   - Date, topic, reason (if provided)
   - "Reschedule" button
   - Show last 5 missed sessions

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Tailwind CSS for styling
3. Use Recharts for time spent bar chart
4. Responsive design
5. Interactive calendar (click to see details)
6. Add JSDoc comments
7. Handle empty data gracefully

INTEGRATE WITH:
- types/parent.ts (import ScheduleDay type)
- contexts/ParentContext (use useParent hook)
- recharts (import BarChart)

OUTPUT FORMAT:
- Complete React component file
- Include all imports
- Export default component
```

**What to Do**: Copy code to `components/parent/ScheduleTracker.tsx`

---

## Prompt 9: Practice Activity and Teaching Resources

### Purpose
Create components for practice statistics and teaching resources display.

### When to Use
Continue building detail page components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/PracticeActivity.tsx`

**Step 2**: Type this comment:
```typescript
// Create PracticeActivity component
// Display: overall stats, topic-wise breakdown table, accuracy trends chart
// Most/least practiced topics, practice session history
// Use Recharts for accuracy trend line chart
// Table with sorting by column
```

**Step 3**: Create file `components/parent/TeachingResources.tsx`

**Step 4**: Type this comment:
```typescript
// Create TeachingResources component
// Display resource cards for weak topics
// Each card: topic name, teaching tips, practice exercises, common mistakes
// Language selector (English, Hindi, Marathi)
// Audio playback button for Text-to-Speech
// Download PDF button
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create PracticeActivity and TeachingResources components.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS, Recharts
- Files: components/parent/PracticeActivity.tsx and components/parent/TeachingResources.tsx

GENERATE:
Two components for practice statistics and teaching resources.

COMPONENT 1: PracticeActivity
- Display:
  1. Overall statistics (4 cards):
     - Total questions attempted
     - Correct answers (count and percentage)
     - Topics practiced (X/Y)
     - Average accuracy
  
  2. Topic-wise breakdown (sortable table):
     - Columns: Topic, Subject, Questions, Accuracy, Last Practiced
     - Sort by any column
     - Color-code accuracy: Red (<50%), Yellow (50-75%), Green (>75%)
     - Show 10 rows, pagination if more
  
  3. Accuracy trends (line chart):
     - X-axis: Last 30 days
     - Y-axis: Accuracy percentage
     - Show overall trend line
     - Target accuracy as dashed line (75%)
  
  4. Most practiced topics (top 5):
     - Topic name, questions count, bar chart
  
  5. Least practiced topics (bottom 5):
     - Topic name, questions count, "Needs attention" badge
     - "Encourage practice" button
  
  6. Practice session history (last 10):
     - Date, topic, questions, accuracy, duration
     - Expandable rows for details

COMPONENT 2: TeachingResources
- Display:
  1. Language selector (top-right):
     - Dropdown: English, Hindi, Marathi
     - Changes all resource content
  
  2. Resource categories (tabs):
     - Weak Topics (personalized)
     - General Study Tips
     - Exam Strategies
     - Motivation Techniques
  
  3. Resource cards (grid):
     - Topic name and subject
     - Teaching tips section (how to explain)
     - Practice exercises section
     - Common mistakes section
     - Helpful analogies section
     - Audio playback button (Text-to-Speech)
     - Download PDF button
     - Expand/collapse sections
  
  4. Search and filter:
     - Search by topic name
     - Filter by subject

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Tailwind CSS for styling
3. Use Recharts for charts
4. Sortable table with react-table or custom
5. Audio playback with HTML5 audio
6. PDF download with jsPDF
7. Responsive design
8. Add JSDoc comments

INTEGRATE WITH:
- types/parent.ts (import types)
- contexts/ParentContext (use useParent hook)
- lib/parent-api.ts (getTeachingResources)

OUTPUT FORMAT:
- Two complete React component files
- Include all imports
- Export default components
```

**What to Do**: Copy code to respective files

---

## Prompt 10: AI Insights and Communication Center

### Purpose
Create components for AI-generated insights and parent-child communication.

### When to Use
Build the insights and communication features.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/parent/InsightsPanel.tsx`

**Step 2**: Type this comment:
```typescript
// Create InsightsPanel component
// Display: weekly insights summary, areas needing attention, improvement suggestions
// Study habit recommendations, milestone celebrations
// Each insight: icon, message, priority badge, timestamp
// Expandable cards for detailed insights
```

**Step 3**: Create file `components/parent/CommunicationCenter.tsx`

**Step 4**: Type this comment:
```typescript
// Create CommunicationCenter component
// Features: send encouragement message, set study reminders, schedule review sessions
// Message composer with templates, notes section, goal setting
// Message history display
// Form validation and submission
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create InsightsPanel and CommunicationCenter components.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS
- Files: components/parent/InsightsPanel.tsx and components/parent/CommunicationCenter.tsx

GENERATE:
Two components for AI insights and parent-child communication.

COMPONENT 1: InsightsPanel
- Display:
  1. Weekly insights summary (card):
     - AI-generated summary paragraph
     - Key highlights (bullet points)
     - Generated date
  
  2. Areas needing attention (list):
     - Topic name, reason, severity (high/medium/low)
     - Color-coded by severity
     - "View details" button
  
  3. Improvement suggestions (cards):
     - Suggestion title
     - Description
     - Actionable steps
     - "Mark as done" button
  
  4. Study habit recommendations:
     - Best study time
     - Break recommendations
     - Environment tips
     - Based on child's patterns
  
  5. Milestone celebrations:
     - Achievement icon and title
     - Description
     - Date achieved
     - Confetti animation on new milestone
  
  6. Intervention alerts:
     - "No practice in X days"
     - "Declining performance in Y"
     - Action buttons

COMPONENT 2: CommunicationCenter
- Display:
  1. Send encouragement message (form):
     - Text area for message
     - Template dropdown (pre-written messages)
     - "Send" button
     - Character count (max 500)
  
  2. Set study reminders (form):
     - Time picker
     - Topic selector
     - Frequency (once, daily, weekly)
     - "Set reminder" button
  
  3. Schedule review session (form):
     - Date and time picker
     - Topic selector
     - Duration selector
     - Notes field
     - "Schedule" button
  
  4. Notes and observations (section):
     - Private notes for parent
     - Add/edit/delete notes
     - Date-stamped entries
  
  5. Goal setting (section):
     - Set weekly goals
     - Track goal completion
     - Progress bars
  
  6. Message history (list):
     - Past messages sent
     - Timestamp and read status
     - Filter by type

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use Tailwind CSS for styling
3. Form validation with react-hook-form
4. Confetti animation with react-confetti
5. Date/time pickers with react-datepicker
6. Responsive design
7. Add JSDoc comments
8. Handle form submission

INTEGRATE WITH:
- types/parent.ts (import types)
- contexts/ParentContext (use useParent hook)
- lib/parent-api.ts (sendMessage, etc.)
- react-hook-form (form validation)

OUTPUT FORMAT:
- Two complete React component files
- Include all imports
- Export default components
```

**What to Do**: Copy code to respective files

---

## Prompt 11: PDF Report Generator and Settings

### Purpose
Create PDF report generation functionality and parent settings interface.

### When to Use
Build utility features for report generation and settings management.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `lib/pdf-generator.ts`

**Step 2**: Type this comment:
```typescript
// Create PDF report generator using jsPDF
// Generate comprehensive progress report with:
// Child profile, performance summary, subject breakdown, topic mastery
// Practice statistics, schedule adherence, insights, recommendations
// Include charts as images, proper formatting, page breaks
// Return Blob for download
```

**Step 3**: Create file `components/parent/ParentSettings.tsx`

**Step 4**: Type this comment:
```typescript
// Create ParentSettings component
// Sections: notification preferences, language selection, report frequency
// Privacy settings, child profile management
// Form with toggles, dropdowns, save button
// Show success message on save
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create PDF report generator and ParentSettings component.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14, TypeScript, React, Tailwind CSS, jsPDF
- Files: lib/pdf-generator.ts and components/parent/ParentSettings.tsx

GENERATE:
PDF report generation utility and settings interface.

FILE 1: lib/pdf-generator.ts
- Function: generateProgressReport(data: ParentDashboardData): Promise<Blob>
- Report structure:
  1. Cover page:
     - Title: "Progress Report"
     - Child name
     - Report date
     - Exam type and target date
  
  2. Executive summary (page 2):
     - Overall progress score
     - Key achievements
     - Areas needing attention
  
  3. Performance analytics (page 3):
     - Subject-wise breakdown (table)
     - Topic mastery summary
     - Score trends (chart as image)
  
  4. Practice activity (page 4):
     - Total questions attempted
     - Accuracy statistics
     - Most/least practiced topics
  
  5. Schedule adherence (page 5):
     - Adherence percentage
     - Time spent studying
     - Missed sessions
  
  6. AI insights (page 6):
     - Weekly insights
     - Recommendations
     - Next steps
  
  7. Footer on each page:
     - Page number
     - Generated date
     - Mentor AI branding

- Use jsPDF for PDF generation
- Add charts as images (convert canvas to image)
- Proper formatting and page breaks
- Return Blob for download

COMPONENT 2: ParentSettings
- Display:
  1. Notification preferences (toggles):
     - Daily progress summary
     - Weekly insights
     - Alert notifications
     - Email notifications
  
  2. Language selection (dropdown):
     - English, Hindi, Marathi
     - Applies to teaching resources
  
  3. Report frequency (radio buttons):
     - Daily digest
     - Weekly summary
     - Monthly report
  
  4. Privacy settings (toggles):
     - Share progress with teachers
     - Allow data analytics
  
  5. Child profile management (form):
     - Update exam date
     - Update target scores
     - Update profile picture
  
  6. Save button (bottom):
     - Validate changes
     - Show success toast
     - Update context

REQUIREMENTS:
1. Use TypeScript with proper types
2. Use jsPDF for PDF generation
3. Use Tailwind CSS for styling
4. Form validation
5. Success/error notifications
6. Responsive design
7. Add JSDoc comments

INTEGRATE WITH:
- types/parent.ts (import types)
- jspdf (import jsPDF)
- contexts/ParentContext (use useParent hook)
- lib/parent-api.ts (updateParentSettings)

OUTPUT FORMAT:
- Two complete files (utility and component)
- Include all imports
- Export functions/components
```

**What to Do**: Copy code to respective files

---

## Prompt 12: Parent Dashboard Pages and Layout

### Purpose
Create Next.js pages for parent dashboard routes and layout.

### When to Use
Final step - wire up all components into pages with routing.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `app/parent/layout.tsx`

**Step 2**: Type this comment:
```typescript
// Create parent dashboard layout with ParentProvider
// Sidebar navigation: Dashboard, Analytics, Schedule, Practice, Resources, Insights, Settings
// Header with child name and logout button
// Responsive: hamburger menu on mobile
// Wrap children with ParentProvider
```

**Step 3**: Create file `app/parent/page.tsx`

**Step 4**: Type this comment:
```typescript
// Create parent dashboard home page
// Use DashboardOverview component
// Show loading state while data loads
// Handle errors gracefully
// Add page title and metadata
```

**Step 5**: Repeat for other pages (analytics, schedule, practice, resources, insights, settings)

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create Next.js pages and layout for parent dashboard.

CONTEXT:
- Project: Mentor AI EdTech Platform
- Stack: Next.js 14 (App Router), TypeScript, React, Tailwind CSS
- Files: app/parent/layout.tsx, app/parent/page.tsx, and other route pages

GENERATE:
Parent dashboard layout and all route pages.

FILE 1: app/parent/layout.tsx
- Parent dashboard layout with navigation
- Sidebar navigation (desktop):
  - Dashboard (Home icon)
  - Analytics (BarChart icon)
  - Schedule (Calendar icon)
  - Practice (Target icon)
  - Resources (Book icon)
  - Insights (Lightbulb icon)
  - Settings (Settings icon)
- Header:
  - Child name and profile picture
  - Notification bell icon
  - Logout button
- Mobile: Hamburger menu, drawer navigation
- Wrap children with ParentProvider
- Active link highlighting

FILE 2: app/parent/page.tsx
- Parent dashboard home page
- Use DashboardOverview component
- Page title: "Parent Dashboard"
- Metadata for SEO

FILE 3: app/parent/analytics/page.tsx
- Use PerformanceAnalytics component
- Page title: "Performance Analytics"

FILE 4: app/parent/schedule/page.tsx
- Use ScheduleTracker component
- Page title: "Schedule Tracking"

FILE 5: app/parent/practice/page.tsx
- Use PracticeActivity component
- Page title: "Practice Activity"

FILE 6: app/parent/resources/page.tsx
- Use TeachingResources component
- Page title: "Teaching Resources"

FILE 7: app/parent/insights/page.tsx
- Use InsightsPanel component
- Page title: "AI Insights"

FILE 8: app/parent/settings/page.tsx
- Use ParentSettings component
- Page title: "Settings"

REQUIREMENTS:
1. Use Next.js 14 App Router conventions
2. Use TypeScript with proper types
3. Use Tailwind CSS for styling
4. Responsive navigation (sidebar desktop, drawer mobile)
5. Active link highlighting
6. Loading states for all pages
7. Error boundaries
8. Add metadata for SEO
9. Add JSDoc comments

INTEGRATE WITH:
- contexts/ParentContext (ParentProvider)
- components/parent/* (all dashboard components)
- next/navigation (Link, usePathname)
- lucide-react (icons)

OUTPUT FORMAT:
- Complete files for layout and all pages
- Include all imports
- Export default components
- Proper Next.js metadata
```

**What to Do**: Copy code to respective files in app/parent/ directory

---

## Summary

You've completed all 12 prompts! You should now have:
- ✅ TypeScript types for parent dashboard
- ✅ Parent context provider
- ✅ API helper functions
- ✅ Dashboard overview components
- ✅ Child profile and stats cards
- ✅ Activity timeline and alerts
- ✅ Performance analytics with charts
- ✅ Schedule tracking components
- ✅ Practice activity display
- ✅ Teaching resources interface
- ✅ AI insights and communication
- ✅ PDF report generator
- ✅ Settings interface
- ✅ All Next.js pages and layout

**Next Step**: Open **CONFIGURATION.md** to set up charts, PDF generation, and other configurations.

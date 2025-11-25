# AI Coding Agent Prompts for Schedule Display UI

## Prompt 1: Schedule Calendar Component

### Purpose
Create the main calendar component that displays the study schedule in a monthly view with color-coded days based on task completion status.

### When to Use
Start with this prompt to create the foundation calendar component.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/schedule/ScheduleCalendar.tsx`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create a ScheduleCalendar component for displaying study schedule
// Features:
// - Monthly calendar view using react-calendar library
// - Color-coded days based on task status (completed: green, in-progress: yellow, pending: gray, missed: red)
// - Click handler to select date and show daily tasks
// - Navigation between months
// - Visual indicators showing task count per day
// - Responsive design for mobile and desktop
//
// Props:
// - schedule: Schedule object with daily tasks
// - selectedDate: Currently selected date
// - onDateSelect: Callback when date is clicked
//
// Requirements:
// - Use TypeScript with proper interfaces
// - Handle edge cases (no tasks for date, past dates, future dates)
// - Add loading and error states
// - Include accessibility features (keyboard navigation, ARIA labels)
// - Add hover effects showing task summary
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

**Step 5**: If incomplete, add more specific comments:
```typescript
// Add function to determine day tile class based on task status
// Input: date, daily tasks array
// Output: CSS class name string
// Logic: check if date has tasks, calculate completion percentage, return appropriate class
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a ScheduleCalendar component for the Mentor AI EdTech platform schedule display.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript, react-calendar library
- File: components/schedule/ScheduleCalendar.tsx
- Purpose: Display monthly calendar with color-coded study schedule

GENERATE:
A React component that displays a monthly calendar view of the student's study schedule.

REQUIREMENTS:
1. Use react-calendar library for calendar rendering
2. Accept props: schedule (Schedule type), selectedDate (Date), onDateSelect (function)
3. Color-code calendar days based on task completion status:
   - Completed (100%): Green background
   - In-progress (1-99%): Yellow background
   - Pending (0%): Gray background
   - Missed (past date, not completed): Red background
4. Show task count badge on each day with tasks
5. Implement date selection handler
6. Add month navigation (previous/next)
7. Display current month and year
8. Show hover tooltip with task summary for each day
9. Handle edge cases: no schedule data, dates without tasks
10. Include loading state while fetching schedule
11. Make responsive for mobile (smaller calendar tiles)
12. Add TypeScript interfaces for all props and state
13. Include accessibility: ARIA labels, keyboard navigation
14. Add detailed comments explaining logic

INTEGRATE WITH:
- Schedule data from useSchedule hook
- DailyTaskList component (shows tasks when date selected)
- Date utilities from utils/dateHelpers.ts

OUTPUT FORMAT:
- Complete TypeScript React component
- All necessary imports
- Proper TypeScript interfaces
- CSS module import for styling
- Example usage in comments
```

**What You'll Get**: Complete ScheduleCalendar component with calendar library integration

**What to Do**:
1. Copy the generated code
2. Create file at `components/schedule/ScheduleCalendar.tsx`
3. Paste and save
4. Install react-calendar: `npm install react-calendar @types/react-calendar`

---

## Prompt 2: Daily Task List Component

### Purpose
Create a component that displays all tasks for a selected date in a list format with completion checkboxes.

### When to Use
After creating the calendar component, use this to show task details.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/schedule/DailyTaskList.tsx`

**Step 2**: Type this comment:
```typescript
// Create DailyTaskList component to display tasks for selected date
// Features:
// - List of all tasks for the date
// - Task cards with topic, subject, duration, type
// - Completion checkboxes
// - Priority badges (high: red, medium: orange, low: green)
// - Task type icons (study: book, practice: pencil, revision: refresh)
// - Click to expand task details
// - Mark task as complete with API call
// - Show total duration for the day
// - Empty state when no tasks
//
// Props:
// - dailyTask: DailyTask object with tasks array
// - onTaskComplete: Callback when task marked complete
// - onTaskClick: Callback when task clicked for details
//
// Requirements:
// - TypeScript interfaces
// - Optimistic UI updates (mark complete immediately, sync with backend)
// - Error handling for API failures
// - Undo functionality for accidental completions
// - Smooth animations for task completion
```

**Step 3**: Let Copilot generate the component

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a DailyTaskList component for displaying tasks for a selected date.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript
- File: components/schedule/DailyTaskList.tsx
- Purpose: Show all tasks for selected date with completion tracking

GENERATE:
A React component that displays a list of study tasks for a specific date.

REQUIREMENTS:
1. Accept props: dailyTask (DailyTask type), onTaskComplete (function), onTaskClick (function)
2. Display task list with TaskCard components
3. Show date header with day number and total duration
4. Display task count and completion status
5. Show completion checkboxes for each task
6. Add priority badges with colors (high: red, medium: orange, low: green)
7. Add task type icons (study, practice, revision)
8. Implement task completion handler with optimistic UI update
9. Call backend API to sync completion status
10. Add undo functionality (5-second window to undo completion)
11. Show loading spinner during API calls
12. Handle errors gracefully with toast notifications
13. Display empty state when no tasks for date
14. Show total study hours for the day
15. Add smooth animations for task completion (fade out, check mark)
16. Make responsive for mobile
17. Include TypeScript interfaces
18. Add detailed comments

INTEGRATE WITH:
- TaskCard component for individual task display
- API service for task completion endpoint
- Toast notification system for feedback
- useSchedule hook for state management

OUTPUT FORMAT:
- Complete TypeScript React component
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete DailyTaskList component with task management

**What to Do**:
1. Copy and paste into `components/schedule/DailyTaskList.tsx`
2. Save the file

---

## Prompt 3: Task Card Component

### Purpose
Create a reusable card component for displaying individual task information.

### When to Use
After DailyTaskList, create this component for task display.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/schedule/TaskCard.tsx`

**Step 2**: Type this comment:
```typescript
// Create TaskCard component for individual task display
// Features:
// - Task topic and subject display
// - Duration badge (e.g., "45 min")
// - Task type icon and label
// - Priority indicator
// - Completion checkbox
// - Click to expand details
// - Completed state styling (strikethrough, faded)
// - Hover effects
//
// Props:
// - task: Task object
// - completed: boolean
// - onComplete: Callback for checkbox
// - onClick: Callback for card click
//
// Requirements:
// - TypeScript interfaces
// - Accessible checkbox with label
// - Smooth transitions for completed state
// - Responsive design
// - Icon library integration (lucide-react or react-icons)
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a TaskCard component for displaying individual study tasks.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript, lucide-react for icons
- File: components/schedule/TaskCard.tsx
- Purpose: Reusable card for task display in schedule

GENERATE:
A React component that displays a single task with completion tracking.

REQUIREMENTS:
1. Accept props: task (Task type), completed (boolean), onComplete (function), onClick (function)
2. Display task topic as main heading
3. Show subject badge with color coding (Physics: blue, Chemistry: green, Math: purple)
4. Display duration with clock icon (e.g., "45 min")
5. Show task type with icon (Book for study, Pencil for practice, RefreshCw for revision)
6. Add priority indicator (colored left border)
7. Include completion checkbox with smooth animation
8. Apply completed styling when checked (strikethrough, reduced opacity)
9. Add click handler for entire card to show details
10. Implement hover effects (shadow, slight scale)
11. Make responsive for mobile (stack elements vertically)
12. Use lucide-react for icons
13. Include TypeScript interfaces
14. Add accessibility: proper labels, keyboard support
15. Add detailed comments

INTEGRATE WITH:
- Task type from shared/types.ts
- Icon library (lucide-react)
- CSS modules for styling

OUTPUT FORMAT:
- Complete TypeScript React component
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete TaskCard component

**What to Do**:
1. Copy and paste into `components/schedule/TaskCard.tsx`
2. Install icons: `npm install lucide-react`
3. Save the file

---

## Prompt 4: Progress Tracker Component

### Purpose
Create a component that visualizes overall schedule progress with statistics and charts.

### When to Use
After task components, create this for progress visualization.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/schedule/ProgressTracker.tsx`

**Step 2**: Type this comment:
```typescript
// Create ProgressTracker component for schedule progress visualization
// Features:
// - Overall completion percentage with circular progress bar
// - Days completed vs total days counter
// - Topics mastered count
// - Total study hours logged
// - Subject-wise progress breakdown (mini bars)
// - Streak counter (consecutive days completed)
// - Motivational messages based on progress
//
// Props:
// - schedule: Schedule object with progress data
// - completedTasks: number of completed tasks
// - totalTasks: number of total tasks
//
// Requirements:
// - TypeScript interfaces
// - Animated progress bars
// - Color-coded progress (red < 30%, yellow 30-70%, green > 70%)
// - Responsive grid layout
// - Icons for each metric
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a ProgressTracker component for visualizing study schedule progress.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript
- File: components/schedule/ProgressTracker.tsx
- Purpose: Display progress statistics and motivational metrics

GENERATE:
A React component that shows overall schedule progress with multiple metrics.

REQUIREMENTS:
1. Accept props: schedule (Schedule type), completedTasks (number), totalTasks (number)
2. Display circular progress bar showing overall completion percentage
3. Show days completed vs total days (e.g., "15 / 90 days")
4. Display topics mastered count
5. Show total study hours logged
6. Add subject-wise progress breakdown with mini progress bars
7. Calculate and display streak (consecutive days completed)
8. Show motivational message based on progress level
9. Use color coding: red (<30%), yellow (30-70%), green (>70%)
10. Animate progress bars on mount
11. Add icons for each metric (lucide-react)
12. Make responsive with grid layout
13. Include TypeScript interfaces
14. Add detailed comments
15. Handle edge cases (no progress, 100% completion)

INTEGRATE WITH:
- Schedule data from useSchedule hook
- lucide-react for icons
- CSS modules for styling

OUTPUT FORMAT:
- Complete TypeScript React component
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete ProgressTracker component

**What to Do**:
1. Copy and paste into `components/schedule/ProgressTracker.tsx`
2. Save the file

---

## Prompt 5: Task Details Panel Component

### Purpose
Create a side panel or modal that shows expanded task details when a task is clicked.

### When to Use
After basic task display, create this for detailed task view.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `components/schedule/TaskDetailsPanel.tsx`

**Step 2**: Type this comment:
```typescript
// Create TaskDetailsPanel component for expanded task view
// Features:
// - Slide-in panel from right side
// - Task topic and subject header
// - Learning objectives list
// - Duration and time tracking
// - Resources section (notes, practice questions links)
// - Start/Complete task buttons
// - Timer for tracking study time
// - Close button
// - Backdrop overlay
//
// Props:
// - task: Task object or null
// - isOpen: boolean
// - onClose: Callback to close panel
// - onStartTask: Callback when start clicked
// - onCompleteTask: Callback when complete clicked
//
// Requirements:
// - TypeScript interfaces
// - Smooth slide-in animation
// - Backdrop click to close
// - Escape key to close
// - Prevent body scroll when open
// - Responsive (full screen on mobile)
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a TaskDetailsPanel component for displaying expanded task information.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript
- File: components/schedule/TaskDetailsPanel.tsx
- Purpose: Side panel showing detailed task information

GENERATE:
A React component that displays detailed task information in a slide-in panel.

REQUIREMENTS:
1. Accept props: task (Task | null), isOpen (boolean), onClose (function), onStartTask (function), onCompleteTask (function)
2. Implement slide-in animation from right side
3. Show task header with topic, subject, and close button
4. Display learning objectives as bullet list
5. Show duration and estimated completion time
6. Add resources section with links to notes and practice questions
7. Include Start Task and Complete Task buttons
8. Add simple timer for tracking study time
9. Show task priority and type badges
10. Implement backdrop overlay (semi-transparent black)
11. Close on backdrop click or Escape key
12. Prevent body scroll when panel open
13. Make responsive (full screen on mobile, side panel on desktop)
14. Add smooth animations (slide-in, fade-in)
15. Include TypeScript interfaces
16. Add accessibility: focus trap, ARIA labels
17. Add detailed comments

INTEGRATE WITH:
- Task type from shared/types.ts
- lucide-react for icons
- CSS modules for styling and animations

OUTPUT FORMAT:
- Complete TypeScript React component
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete TaskDetailsPanel component

**What to Do**:
1. Copy and paste into `components/schedule/TaskDetailsPanel.tsx`
2. Save the file

---

## Prompt 6: Custom Hook for Schedule Management

### Purpose
Create a custom React hook to manage schedule data, task completion, and state.

### When to Use
After creating UI components, create this hook for data management.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `hooks/useSchedule.ts`

**Step 2**: Type this comment:
```typescript
// Create useSchedule custom hook for schedule data management
// Features:
// - Fetch schedule from API
// - Manage selected date state
// - Handle task completion with API sync
// - Calculate progress statistics
// - Provide loading and error states
// - Cache schedule data
// - Auto-refresh on date change
//
// Returns:
// - schedule: Schedule object
// - selectedDate: Date
// - setSelectedDate: Function
// - dailyTask: DailyTask for selected date
// - completeTask: Function to mark task complete
// - loading: boolean
// - error: Error | null
// - progress: Progress statistics object
//
// Requirements:
// - TypeScript interfaces
// - Use React hooks (useState, useEffect, useCallback)
// - API error handling
// - Optimistic updates for task completion
// - Memoization for expensive calculations
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create a useSchedule custom hook for managing schedule data and state.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript
- File: hooks/useSchedule.ts
- Purpose: Centralized schedule data management

GENERATE:
A custom React hook that manages schedule data, task completion, and progress tracking.

REQUIREMENTS:
1. Fetch schedule from API endpoint: GET /api/schedule/:studentId
2. Manage selected date state (default to today)
3. Filter daily tasks for selected date
4. Implement completeTask function that:
   - Updates local state optimistically
   - Calls API: POST /api/schedule/task/:taskId/complete
   - Handles API errors and reverts on failure
5. Calculate progress statistics:
   - Total tasks completed
   - Overall completion percentage
   - Days completed
   - Study hours logged
6. Provide loading state during API calls
7. Handle errors with error state
8. Cache schedule data to avoid unnecessary API calls
9. Auto-refresh when selected date changes
10. Use useCallback for memoized functions
11. Use useMemo for expensive calculations
12. Include TypeScript interfaces for all return values
13. Add detailed comments explaining logic
14. Handle edge cases (no schedule, API failures, invalid dates)

INTEGRATE WITH:
- API service for schedule endpoints
- Schedule and Task types from shared/types.ts
- Date utilities from utils/dateHelpers.ts

OUTPUT FORMAT:
- Complete TypeScript custom hook
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete useSchedule hook

**What to Do**:
1. Copy and paste into `hooks/useSchedule.ts`
2. Save the file

---

## Prompt 7: Date Helper Utilities

### Purpose
Create utility functions for date manipulation and formatting used throughout the schedule components.

### When to Use
After creating components, create these utilities for date handling.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `utils/dateHelpers.ts`

**Step 2**: Type this comment:
```typescript
// Create date utility functions for schedule components
// Functions needed:
// - formatDate: Format date to readable string (e.g., "Mon, Jan 15, 2024")
// - formatDuration: Convert minutes to readable format (e.g., "1h 30m")
// - isSameDay: Check if two dates are the same day
// - isToday: Check if date is today
// - isPast: Check if date is in the past
// - isFuture: Check if date is in the future
// - getDaysBetween: Calculate days between two dates
// - getWeekNumber: Get week number of year
// - getMonthName: Get month name from date
// - addDays: Add days to date
// - startOfDay: Get start of day (00:00:00)
// - endOfDay: Get end of day (23:59:59)
//
// Requirements:
// - Use date-fns library for date manipulation
// - TypeScript with proper types
// - Handle timezone issues
// - Add JSDoc comments for each function
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create date utility functions for the schedule display components.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: TypeScript, date-fns library
- File: utils/dateHelpers.ts
- Purpose: Centralized date manipulation and formatting

GENERATE:
A collection of utility functions for date operations used in schedule components.

REQUIREMENTS:
1. Use date-fns library for all date operations
2. Create the following functions:
   - formatDate(date: Date, format?: string): string - Format date to readable string
   - formatDuration(minutes: number): string - Convert minutes to "Xh Ym" format
   - isSameDay(date1: Date, date2: Date): boolean - Check if same day
   - isToday(date: Date): boolean - Check if date is today
   - isPast(date: Date): boolean - Check if date is in the past
   - isFuture(date: Date): boolean - Check if date is in the future
   - getDaysBetween(startDate: Date, endDate: Date): number - Calculate days between
   - getWeekNumber(date: Date): number - Get ISO week number
   - getMonthName(date: Date): string - Get full month name
   - addDays(date: Date, days: number): Date - Add days to date
   - startOfDay(date: Date): Date - Get start of day
   - endOfDay(date: Date): Date - Get end of day
3. Add TypeScript types for all parameters and return values
4. Include JSDoc comments for each function with examples
5. Handle edge cases (invalid dates, null values)
6. Export all functions as named exports
7. Add detailed comments

INTEGRATE WITH:
- date-fns library
- Schedule components for date formatting

OUTPUT FORMAT:
- Complete TypeScript utility file
- All necessary imports from date-fns
- Proper TypeScript types
- JSDoc comments with examples
```

**What You'll Get**: Complete date utility functions

**What to Do**:
1. Copy and paste into `utils/dateHelpers.ts`
2. Install date-fns: `npm install date-fns`
3. Save the file

---

## Prompt 8: Schedule Page Component

### Purpose
Create the main schedule page that combines all components into a complete interface.

### When to Use
After all components are created, use this to assemble the page.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `pages/schedule.tsx`

**Step 2**: Type this comment:
```typescript
// Create Schedule page component combining all schedule components
// Layout:
// - Header with page title and progress summary
// - Left side: ScheduleCalendar (40% width)
// - Right side: DailyTaskList (60% width)
// - Top right: ProgressTracker (collapsible)
// - Overlay: TaskDetailsPanel (when task clicked)
//
// Features:
// - Use useSchedule hook for data management
// - Handle date selection from calendar
// - Show daily tasks for selected date
// - Open task details panel on task click
// - Display loading state while fetching
// - Show error message if API fails
// - Responsive layout (stack vertically on mobile)
//
// Requirements:
// - TypeScript with proper types
// - Error boundary for error handling
// - Loading skeleton while fetching
// - Empty state when no schedule
// - Smooth transitions between dates
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create the main Schedule page component that combines all schedule components.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- Stack: React, TypeScript, Next.js
- File: pages/schedule.tsx
- Purpose: Main schedule page with calendar and task display

GENERATE:
A React page component that displays the complete schedule interface.

REQUIREMENTS:
1. Use useSchedule hook to fetch and manage schedule data
2. Create layout with three main sections:
   - Header: Page title, student name, progress summary
   - Left panel (40%): ScheduleCalendar component
   - Right panel (60%): DailyTaskList component
   - Top right: ProgressTracker (collapsible with toggle button)
3. Implement date selection handler from calendar
4. Show daily tasks for selected date
5. Open TaskDetailsPanel when task is clicked
6. Display loading skeleton while fetching schedule
7. Show error message with retry button if API fails
8. Display empty state when no schedule exists
9. Make responsive:
   - Desktop: side-by-side layout
   - Tablet: stacked with calendar on top
   - Mobile: full-width stacked layout
10. Add smooth transitions when changing dates
11. Include breadcrumb navigation
12. Add export schedule button (PDF/Calendar)
13. Include TypeScript interfaces
14. Add error boundary for graceful error handling
15. Add detailed comments

INTEGRATE WITH:
- useSchedule hook for data management
- ScheduleCalendar component
- DailyTaskList component
- ProgressTracker component
- TaskDetailsPanel component
- Layout component for page structure

OUTPUT FORMAT:
- Complete TypeScript React page component
- All necessary imports
- Proper interfaces
- Example usage in comments
```

**What You'll Get**: Complete schedule page with all components integrated

**What to Do**:
1. Copy and paste into `pages/schedule.tsx`
2. Save the file

---

## Prompt 9: Schedule Styles

### Purpose
Create CSS module for schedule-specific styling.

### When to Use
After creating all components, add styling.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `styles/schedule.module.css`

**Step 2**: Type this comment:
```css
/* Schedule component styles
 * Includes:
 * - Calendar styling (color-coded days, hover effects)
 * - Task card styling (priority borders, completion states)
 * - Progress tracker styling (circular progress, bars)
 * - Task details panel styling (slide-in animation)
 * - Responsive breakpoints
 * - Color variables for task status
 * - Smooth transitions and animations
 */
```

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create CSS module for schedule component styling.

CONTEXT:
- Project: Mentor AI EdTech Platform (Frontend)
- File: styles/schedule.module.css
- Purpose: Styles for all schedule components

GENERATE:
A CSS module with styles for schedule components.

REQUIREMENTS:
1. Define CSS variables for colors:
   - Task status colors (completed, in-progress, pending, missed)
   - Priority colors (high, medium, low)
   - Subject colors (Physics, Chemistry, Math)
2. Style ScheduleCalendar:
   - Color-coded day tiles
   - Hover effects
   - Selected date highlight
   - Task count badges
3. Style TaskCard:
   - Card layout with shadow
   - Priority left border
   - Completion checkbox
   - Hover effects (scale, shadow)
   - Completed state (strikethrough, opacity)
4. Style ProgressTracker:
   - Circular progress bar
   - Progress bars for subjects
   - Metric cards with icons
5. Style TaskDetailsPanel:
   - Slide-in animation from right
   - Backdrop overlay
   - Panel layout
   - Close button
6. Add responsive breakpoints:
   - Desktop (>1024px)
   - Tablet (768px-1024px)
   - Mobile (<768px)
7. Include smooth transitions
8. Add loading skeleton styles
9. Include detailed comments

OUTPUT FORMAT:
- Complete CSS module
- Organized by component
- CSS variables at top
- Responsive media queries
```

**What You'll Get**: Complete CSS module for schedule components

**What to Do**:
1. Copy and paste into `styles/schedule.module.css`
2. Save the file

---

## Summary of Prompts

| Prompt | Component | Purpose | Estimated Time |
|--------|-----------|---------|----------------|
| 1 | ScheduleCalendar | Monthly calendar view | 8 min |
| 2 | DailyTaskList | Daily task display | 7 min |
| 3 | TaskCard | Individual task card | 5 min |
| 4 | ProgressTracker | Progress visualization | 6 min |
| 5 | TaskDetailsPanel | Expanded task view | 7 min |
| 6 | useSchedule | Data management hook | 8 min |
| 7 | dateHelpers | Date utilities | 5 min |
| 8 | schedule page | Main page assembly | 6 min |
| 9 | schedule.module.css | Component styling | 5 min |

**Total Code Generation Time**: ~45 minutes

## Tips for Success

1. **Generate in order**: Follow the prompt sequence for proper dependencies
2. **Test after each prompt**: Verify each component works before moving to next
3. **Install dependencies**: Run `npm install react-calendar date-fns lucide-react @types/react-calendar`
4. **Use mock data**: Test with mock schedule data before connecting to backend
5. **Check types**: Ensure TypeScript interfaces match between components
6. **Review generated code**: Always review and understand the code before accepting
7. **Customize as needed**: Adjust colors, layouts, and features to match your design

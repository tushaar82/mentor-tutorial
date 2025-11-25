# Testing Guide for Schedule Display UI

This guide provides step-by-step instructions to test the schedule display interface with mock data.

---

## Prerequisites

Before testing, ensure:
- [ ] All components generated from PROMPTS.md
- [ ] All configuration steps completed
- [ ] Mock API server running
- [ ] Dev server running

---

## Test 1: Calendar Display

### What You're Testing
Verify the calendar component displays correctly with color-coded days.

### Steps
1. Start mock API server:
   ```bash
   node vaishnavi-frontend/mock-data/mock-api-server.js
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Navigate to: `http://localhost:3000/schedule`

4. Observe the calendar display

### Expected Result
- Calendar shows current month
- Days with tasks have colored backgrounds:
  - Green: Completed days (100% tasks done)
  - Yellow: In-progress days (some tasks done)
  - Gray: Pending days (no tasks done)
  - Red: Missed days (past date, not completed)
- Task count badges visible on days with tasks
- Current date highlighted

### If It Fails
- **Calendar not visible**: Check react-calendar CSS imported in globals.css
- **No colors**: Check schedule data is loading (open browser console)
- **Wrong colors**: Verify color logic in ScheduleCalendar component
- **No task badges**: Check dailyTasks data structure

---

## Test 2: Date Selection

### What You're Testing
Verify clicking a date shows tasks for that day.

### Steps
1. In the calendar, click on a date with tasks (should have colored background)
2. Observe the right panel

### Expected Result
- Selected date is highlighted with border/background
- Right panel shows "Daily Tasks for [Date]"
- Task list displays all tasks for that date
- Task count shown (e.g., "3 tasks")
- Total duration shown (e.g., "3 hours")

### If It Fails
- **No tasks shown**: Check onDateSelect handler in calendar
- **Wrong tasks**: Verify date filtering logic in useSchedule hook
- **Date not highlighted**: Check selected date state management

---

## Test 3: Task Card Display

### What You're Testing
Verify individual task cards display correctly with all information.

### Steps
1. Select a date with tasks
2. Observe each task card in the list

### Expected Result
Each task card shows:
- Task topic as heading
- Subject badge with color (Physics: blue, Chemistry: green, Math: purple)
- Duration with clock icon (e.g., "60 min")
- Task type icon and label (Book for study, Pencil for practice, Refresh for revision)
- Priority indicator (colored left border: red/orange/green)
- Completion checkbox
- Hover effect (shadow, slight scale)

### If It Fails
- **Missing information**: Check Task interface and data structure
- **No icons**: Verify lucide-react installed and imported
- **Wrong colors**: Check CSS variables in globals.css
- **No hover effect**: Check CSS hover styles

---

## Test 4: Task Completion

### What You're Testing
Verify marking a task as complete updates the UI and syncs with backend.

### Steps
1. Select a date with incomplete tasks
2. Click the checkbox on an incomplete task
3. Observe the changes

### Expected Result
- Checkbox becomes checked immediately (optimistic update)
- Task text gets strikethrough
- Task card opacity reduces
- Task moves to bottom of list (optional)
- Browser console shows API call: `POST /api/schedule/task/:taskId/complete`
- Success toast notification appears
- Progress tracker updates (completion percentage increases)

### If It Fails
- **Checkbox doesn't check**: Verify onClick handler on checkbox
- **No visual change**: Check completed state styling in CSS
- **No API call**: Check completeTask function in useSchedule hook
- **API error**: Check mock API server is running and endpoint exists

---

## Test 5: Progress Tracker

### What You're Testing
Verify progress statistics display correctly and update when tasks completed.

### Steps
1. Navigate to schedule page
2. Observe the progress tracker (top right or collapsible panel)
3. Complete a task
4. Observe progress updates

### Expected Result
Progress tracker shows:
- Circular progress bar with percentage (e.g., "35%")
- Days completed vs total (e.g., "15 / 90 days")
- Topics mastered count
- Total study hours logged
- Subject-wise progress bars
- Streak counter (consecutive days)
- Motivational message based on progress

After completing task:
- Percentage increases
- Study hours increase
- Smooth animation on progress bar

### If It Fails
- **Wrong percentage**: Check calculation logic in useSchedule hook
- **Not updating**: Verify progress recalculation after task completion
- **No animation**: Check CSS transition on progress bar

---

## Test 6: Task Details Panel

### What You're Testing
Verify clicking a task opens detailed view in side panel.

### Steps
1. Select a date with tasks
2. Click on a task card (not the checkbox)
3. Observe the side panel

### Expected Result
- Panel slides in from right side
- Backdrop overlay appears (semi-transparent)
- Panel shows:
  - Task topic and subject header
  - Close button (X)
  - Learning objectives list
  - Duration and time estimate
  - Resources section with links
  - Start Task button
  - Complete Task button
- Clicking backdrop closes panel
- Pressing Escape key closes panel
- Body scroll is prevented when panel open

### If It Fails
- **Panel doesn't open**: Check onClick handler on TaskCard
- **No animation**: Verify CSS transition on panel
- **Can't close**: Check onClose handler and backdrop click
- **Body still scrolls**: Add `overflow: hidden` to body when panel open

---

## Test 7: Calendar Navigation

### What You're Testing
Verify navigating between months works correctly.

### Steps
1. Click "Previous Month" button (left arrow)
2. Observe calendar updates
3. Click "Next Month" button (right arrow)
4. Observe calendar updates

### Expected Result
- Calendar shows previous/next month
- Month and year label updates
- Days are color-coded based on task data for that month
- Selected date persists if in visible month
- Navigation is smooth without flicker

### If It Fails
- **Calendar doesn't update**: Check react-calendar navigation props
- **Wrong month shown**: Verify date state management
- **Colors disappear**: Check task data includes all months

---

## Test 8: Responsive Design

### What You're Testing
Verify the interface works on different screen sizes.

### Steps
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test these sizes:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667

### Expected Result

**Desktop (>1024px)**:
- Calendar on left (40% width)
- Task list on right (60% width)
- Progress tracker visible in top right
- Side-by-side layout

**Tablet (768-1024px)**:
- Calendar on top (full width)
- Task list below (full width)
- Progress tracker collapsible
- Stacked layout

**Mobile (<768px)**:
- Full-width stacked layout
- Calendar shows week view (optional)
- Task cards full width
- Task details panel full screen
- Touch-friendly tap targets

### If It Fails
- **Layout broken**: Check CSS media queries
- **Elements overlapping**: Verify responsive CSS
- **Text too small**: Increase font sizes for mobile
- **Buttons too small**: Increase tap target size (min 44x44px)

---

## Test 9: Empty States

### What You're Testing
Verify appropriate messages when no data is available.

### Steps
1. Modify mock data to return empty schedule
2. Reload page
3. Observe empty states

### Expected Result
- Calendar shows but no colored days
- Task list shows: "No tasks scheduled for this date"
- Progress tracker shows: "No progress yet"
- Helpful message: "Complete your diagnostic test to generate schedule"

### If It Fails
- **Error instead of empty state**: Add null checks in components
- **No message**: Add empty state JSX in components

---

## Test 10: Loading States

### What You're Testing
Verify loading indicators display while fetching data.

### Steps
1. Add artificial delay to mock API (setTimeout 2 seconds)
2. Reload page
3. Observe loading states

### Expected Result
- Loading skeleton for calendar (gray boxes)
- Loading skeleton for task list
- Loading spinner for progress tracker
- No layout shift when data loads

### If It Fails
- **No loading state**: Add loading check in components
- **Layout shifts**: Use skeleton with same dimensions as actual content

---

## Test 11: Error Handling

### What You're Testing
Verify error messages display when API fails.

### Steps
1. Stop mock API server
2. Reload page
3. Observe error handling

### Expected Result
- Error message: "Failed to load schedule"
- Retry button displayed
- Clicking retry attempts to fetch again
- Error doesn't crash the app

### If It Fails
- **App crashes**: Add error boundary
- **No error message**: Add error state in useSchedule hook
- **Can't retry**: Add retry function

---

## Test 12: Task Completion Undo

### What You're Testing
Verify ability to undo accidental task completion.

### Steps
1. Mark a task as complete
2. Observe undo notification (5-second window)
3. Click "Undo" button
4. Observe task returns to incomplete state

### Expected Result
- Toast notification: "Task completed. Undo?"
- Undo button visible for 5 seconds
- Clicking undo reverts task to incomplete
- Checkbox unchecks
- Strikethrough removed
- Progress tracker decreases

### If It Fails
- **No undo option**: Add undo logic to completeTask function
- **Undo doesn't work**: Check state reversion logic

---

## Test 13: Multiple Date Selection

### What You're Testing
Verify switching between dates works smoothly.

### Steps
1. Click date 1 with tasks
2. Observe tasks load
3. Click date 2 with different tasks
4. Observe tasks update
5. Click date 3 with no tasks
6. Observe empty state

### Expected Result
- Tasks update immediately when date selected
- Smooth transition between task lists
- No flicker or layout shift
- Empty state shows for dates without tasks

### If It Fails
- **Tasks don't update**: Check selectedDate state and filtering logic
- **Slow updates**: Add loading state during date change

---

## Test 14: Progress Calculation

### What You're Testing
Verify progress statistics are calculated correctly.

### Steps
1. Note initial progress percentage
2. Count total tasks and completed tasks manually
3. Calculate expected percentage: (completed / total) * 100
4. Compare with displayed percentage

### Expected Result
- Displayed percentage matches manual calculation
- Days completed count is accurate
- Study hours total is correct
- Subject-wise progress is accurate

### If It Fails
- **Wrong percentage**: Check calculation logic in useSchedule hook
- **Wrong counts**: Verify filtering logic for completed tasks

---

## Test 15: Integration with Mock Backend

### What You're Testing
Verify all API calls work correctly with mock server.

### Steps
1. Open browser DevTools Network tab
2. Reload schedule page
3. Observe API calls

### Expected Result
Network tab shows:
- `GET /api/schedule/student123` - Status 200
- Response contains schedule data with daily_tasks array

When completing task:
- `POST /api/schedule/task/:taskId/complete` - Status 200
- Response contains success: true

### If It Fails
- **404 errors**: Check mock API server endpoints
- **CORS errors**: Add CORS headers to mock server
- **Wrong data**: Verify mock-api-responses.json structure

---

## Performance Testing

### Test 16: Large Schedule Performance

### What You're Testing
Verify UI performs well with large schedule (90 days, 270 tasks).

### Steps
1. Update mock data with 90 days of tasks (3 tasks per day)
2. Reload page
3. Observe performance

### Expected Result
- Calendar renders in < 1 second
- Smooth scrolling in task list
- No lag when selecting dates
- No memory leaks (check DevTools Memory tab)

### If It Fails
- **Slow rendering**: Add React.memo to components
- **Lag on scroll**: Virtualize task list with react-window
- **Memory issues**: Check for event listener cleanup

---

## Accessibility Testing

### Test 17: Keyboard Navigation

### What You're Testing
Verify all functionality accessible via keyboard.

### Steps
1. Navigate to schedule page
2. Use only keyboard (Tab, Enter, Arrow keys, Escape)
3. Try to:
   - Navigate calendar dates
   - Select a date
   - Check/uncheck task
   - Open task details
   - Close task details

### Expected Result
- Tab key moves focus through interactive elements
- Focus indicators visible (outline/border)
- Enter/Space activates buttons and checkboxes
- Arrow keys navigate calendar dates
- Escape closes task details panel
- All functionality accessible without mouse

### If It Fails
- **Can't tab to element**: Add tabIndex={0}
- **No focus indicator**: Add CSS :focus styles
- **Can't activate**: Add onKeyDown handlers

---

## Test 18: Screen Reader Compatibility

### What You're Testing
Verify screen readers can understand the interface.

### Steps
1. Enable screen reader (NVDA on Windows, VoiceOver on Mac)
2. Navigate through schedule page
3. Listen to announcements

### Expected Result
- Calendar dates announced with task count
- Task cards announced with topic, subject, duration
- Completion status announced
- Progress percentages announced
- Buttons have descriptive labels

### If It Fails
- **Missing announcements**: Add ARIA labels
- **Confusing announcements**: Improve ARIA descriptions
- **No context**: Add aria-describedby for additional context

---

## Testing Checklist

Before moving to next task, verify:

- [ ] Calendar displays with color-coded days
- [ ] Date selection shows correct tasks
- [ ] Task cards display all information
- [ ] Task completion works and syncs
- [ ] Progress tracker shows accurate stats
- [ ] Task details panel opens and closes
- [ ] Calendar navigation works
- [ ] Responsive on mobile, tablet, desktop
- [ ] Empty states display appropriately
- [ ] Loading states show while fetching
- [ ] Errors handled gracefully
- [ ] Undo functionality works
- [ ] Multiple date selection smooth
- [ ] Progress calculations accurate
- [ ] All API calls successful
- [ ] Performance good with large data
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

---

## Common Issues and Solutions

### Issue: Tasks not displaying

**Check**:
1. Mock API server running
2. API URL correct in .env.local
3. Network tab shows successful API call
4. Data structure matches TypeScript interfaces

**Fix**:
```bash
# Restart mock server
node vaishnavi-frontend/mock-data/mock-api-server.js

# Check API response
curl http://localhost:3001/api/schedule/student123
```

---

### Issue: Calendar colors not showing

**Check**:
1. CSS variables defined in globals.css
2. Task status logic in ScheduleCalendar component
3. Daily tasks have status field

**Fix**:
```typescript
// Verify status calculation
const getTaskStatus = (tasks: Task[]) => {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percentage = (completed / total) * 100;
  
  if (percentage === 100) return 'completed';
  if (percentage > 0) return 'in-progress';
  return 'pending';
};
```

---

### Issue: Task completion not persisting

**Check**:
1. API call succeeds (check Network tab)
2. State updates after API response
3. Optimistic update reverts on error

**Fix**:
```typescript
// Add error handling
try {
  await scheduleApi.completeTask(taskId);
  // Update state
} catch (error) {
  // Revert optimistic update
  console.error('Failed to complete task:', error);
}
```

---

## Next Steps

After all tests pass:
1. Take screenshots of working UI
2. Test with real backend (when available)
3. Proceed to EXPECTED-OUTCOME.md to verify completion
4. Move to next task: Day 7 - Practice Module UI

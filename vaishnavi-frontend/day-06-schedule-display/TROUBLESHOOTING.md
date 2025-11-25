# Troubleshooting Guide for Schedule Display UI

This guide helps you diagnose and fix common issues with the schedule display interface.

---

## Quick Diagnostics

Before diving into specific issues, run these quick checks:

```bash
# 1. Check all dependencies installed
npm list react-calendar date-fns lucide-react

# 2. Check dev server running
curl http://localhost:3000

# 3. Check mock API server running
curl http://localhost:3001/api/schedule/student123

# 4. Check for TypeScript errors
npm run type-check

# 5. Check browser console for errors
# Open DevTools (F12) → Console tab
```

---

## Calendar Issues

### Issue 1: Calendar Not Displaying

**Symptoms**:
- Blank space where calendar should be
- No calendar component visible
- Console error: "Calendar is not defined"

**Possible Causes**:
1. react-calendar not installed
2. Calendar CSS not imported
3. Import statement incorrect

**Solutions**:

**Solution 1**: Install react-calendar
```bash
npm install react-calendar @types/react-calendar
```

**Solution 2**: Import Calendar CSS

Add to `styles/globals.css`:
```css
@import 'react-calendar/dist/Calendar.css';
```

Or add to `pages/_app.tsx`:
```typescript
import 'react-calendar/dist/Calendar.css';
```

**Solution 3**: Fix import statement

Correct import:
```typescript
import Calendar from 'react-calendar';
```

NOT:
```typescript
import { Calendar } from 'react-calendar'; // ❌ Wrong
```

**Verification**:
```bash
# Restart dev server
npm run dev

# Navigate to schedule page
# Calendar should now display
```

---

### Issue 2: Calendar Days Not Color-Coded

**Symptoms**:
- Calendar displays but all days are same color
- No green/yellow/red/gray colors
- Task status not reflected visually

**Possible Causes**:
1. CSS variables not defined
2. tileClassName function not working
3. Schedule data not loading
4. Status calculation logic incorrect

**Solutions**:

**Solution 1**: Define CSS variables

Add to `styles/globals.css`:
```css
:root {
  --schedule-completed: #10b981;
  --schedule-in-progress: #f59e0b;
  --schedule-pending: #6b7280;
  --schedule-missed: #ef4444;
}
```

**Solution 2**: Check tileClassName function

In `ScheduleCalendar.tsx`:
```typescript
const tileClassName = ({ date, view }: { date: Date; view: string }) => {
  if (view !== 'month') return null;
  
  // Find tasks for this date
  const dailyTask = schedule?.daily_tasks.find(
    task => isSameDay(new Date(task.date), date)
  );
  
  if (!dailyTask) return null;
  
  // Return class based on status
  return `schedule-day-${dailyTask.status}`;
};
```

**Solution 3**: Add CSS for status classes

In `styles/schedule.module.css`:
```css
.scheduleCalendar :global(.schedule-day-completed) {
  background-color: var(--schedule-completed);
  color: white;
}

.scheduleCalendar :global(.schedule-day-in-progress) {
  background-color: var(--schedule-in-progress);
  color: white;
}

.scheduleCalendar :global(.schedule-day-pending) {
  background-color: var(--schedule-pending);
  color: white;
}

.scheduleCalendar :global(.schedule-day-missed) {
  background-color: var(--schedule-missed);
  color: white;
}
```

**Solution 4**: Verify schedule data loading

Check browser console:
```typescript
console.log('Schedule data:', schedule);
console.log('Daily tasks:', schedule?.daily_tasks);
```

**Verification**:
- Days with tasks should have colored backgrounds
- Completed days: green
- In-progress days: yellow
- Pending days: gray
- Missed days: red

---

### Issue 3: Date Selection Not Working

**Symptoms**:
- Clicking dates does nothing
- Selected date doesn't change
- Task list doesn't update

**Possible Causes**:
1. onChange handler not connected
2. State not updating
3. Event handler error

**Solutions**:

**Solution 1**: Check onChange handler

In `ScheduleCalendar.tsx`:
```typescript
<Calendar
  onChange={(value) => {
    if (value instanceof Date) {
      onDateSelect(value);
    }
  }}
  value={selectedDate}
/>
```

**Solution 2**: Verify state management

In `useSchedule.ts`:
```typescript
const [selectedDate, setSelectedDate] = useState<Date>(new Date());

// Make sure setSelectedDate is returned
return {
  selectedDate,
  setSelectedDate,
  // ... other values
};
```

**Solution 3**: Check parent component

In `pages/schedule.tsx`:
```typescript
const { selectedDate, setSelectedDate } = useSchedule();

<ScheduleCalendar
  schedule={schedule}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
/>
```

**Verification**:
- Click a date
- Check console: `console.log('Selected date:', selectedDate)`
- Task list should update

---

## Task Display Issues

### Issue 4: Tasks Not Displaying

**Symptoms**:
- Calendar works but task list is empty
- "No tasks" message shows even when tasks exist
- Right panel is blank

**Possible Causes**:
1. Date filtering not working
2. API data not loading
3. Data structure mismatch
4. Date comparison issue

**Solutions**:

**Solution 1**: Check date filtering logic

In `useSchedule.ts`:
```typescript
const dailyTask = useMemo(() => {
  if (!schedule?.daily_tasks) return null;
  
  return schedule.daily_tasks.find(task => {
    const taskDate = new Date(task.date);
    return isSameDay(taskDate, selectedDate);
  });
}, [schedule, selectedDate]);
```

**Solution 2**: Verify API response

Check browser Network tab:
```bash
# Should see successful API call
GET /api/schedule/student123 → 200 OK

# Response should have daily_tasks array
{
  "daily_tasks": [
    {
      "date": "2024-03-20",
      "tasks": [...]
    }
  ]
}
```

**Solution 3**: Check date format

Ensure dates are in ISO format (YYYY-MM-DD):
```typescript
// Mock data should have:
"date": "2024-03-20"  // ✓ Correct

// NOT:
"date": "03/20/2024"  // ❌ Wrong
"date": "20-03-2024"  // ❌ Wrong
```

**Solution 4**: Debug date comparison

Add logging:
```typescript
console.log('Selected date:', selectedDate.toISOString());
console.log('Task dates:', schedule?.daily_tasks.map(t => t.date));
console.log('Matching task:', dailyTask);
```

**Verification**:
- Select a date with tasks
- Task list should display
- Task count should be correct

---

### Issue 5: Task Completion Not Working

**Symptoms**:
- Clicking checkbox does nothing
- Task doesn't mark as complete
- No visual feedback

**Possible Causes**:
1. onClick handler not connected
2. API call failing
3. State not updating
4. Optimistic update not working

**Solutions**:

**Solution 1**: Check checkbox handler

In `TaskCard.tsx`:
```typescript
<input
  type="checkbox"
  checked={completed}
  onChange={(e) => {
    e.stopPropagation(); // Prevent card click
    onComplete(task.task_id);
  }}
/>
```

**Solution 2**: Verify completeTask function

In `useSchedule.ts`:
```typescript
const completeTask = useCallback(async (taskId: string) => {
  try {
    // Optimistic update
    setSchedule(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        daily_tasks: prev.daily_tasks.map(day => ({
          ...day,
          tasks: day.tasks.map(task =>
            task.task_id === taskId
              ? { ...task, completed: true }
              : task
          )
        }))
      };
    });
    
    // API call
    await scheduleApi.completeTask(taskId);
  } catch (error) {
    console.error('Failed to complete task:', error);
    // Revert optimistic update
    // ... revert logic
  }
}, []);
```

**Solution 3**: Check API endpoint

Test manually:
```bash
curl -X POST http://localhost:3001/api/schedule/task/task1/complete
```

Should return:
```json
{
  "success": true,
  "task_id": "task1",
  "completed": true
}
```

**Solution 4**: Check mock API server

In `mock-api-server.js`:
```javascript
app.post('/api/schedule/task/:taskId/complete', (req, res) => {
  const { taskId } = req.params;
  res.json({
    success: true,
    task_id: taskId,
    completed: true,
    timestamp: new Date().toISOString()
  });
});
```

**Verification**:
- Click checkbox
- Task should show strikethrough
- Console should show API call
- Progress should update

---

### Issue 6: Task Details Panel Not Opening

**Symptoms**:
- Clicking task card does nothing
- Panel doesn't slide in
- No backdrop appears

**Possible Causes**:
1. onClick handler not connected
2. State not managing panel visibility
3. CSS animation not working
4. z-index issue

**Solutions**:

**Solution 1**: Check click handler

In `TaskCard.tsx`:
```typescript
<div
  className={styles.taskCard}
  onClick={() => onClick(task)}
  role="button"
  tabIndex={0}
>
  {/* Task content */}
</div>
```

**Solution 2**: Verify panel state

In `pages/schedule.tsx`:
```typescript
const [selectedTask, setSelectedTask] = useState<Task | null>(null);

<TaskDetailsPanel
  task={selectedTask}
  isOpen={selectedTask !== null}
  onClose={() => setSelectedTask(null)}
/>
```

**Solution 3**: Check CSS animation

In `styles/schedule.module.css`:
```css
.taskDetailsPanel {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background: white;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.taskDetailsPanel.open {
  transform: translateX(0);
}
```

**Solution 4**: Check z-index hierarchy

Ensure panel is above other content:
```css
.backdrop {
  z-index: 999;
}

.taskDetailsPanel {
  z-index: 1000;
}
```

**Verification**:
- Click task card
- Panel should slide in from right
- Backdrop should appear
- Clicking backdrop should close panel

---

## Progress Tracking Issues

### Issue 7: Progress Not Updating

**Symptoms**:
- Progress percentage stays at 0%
- Completing tasks doesn't update progress
- Statistics don't change

**Possible Causes**:
1. Progress calculation logic incorrect
2. State not recalculating
3. useMemo dependencies missing

**Solutions**:

**Solution 1**: Check progress calculation

In `useSchedule.ts`:
```typescript
const progress = useMemo(() => {
  if (!schedule?.daily_tasks) {
    return {
      completedTasks: 0,
      totalTasks: 0,
      percentage: 0,
      daysCompleted: 0,
      totalDays: 0,
      studyHours: 0
    };
  }
  
  const allTasks = schedule.daily_tasks.flatMap(day => day.tasks);
  const completedTasks = allTasks.filter(task => task.completed).length;
  const totalTasks = allTasks.length;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const daysCompleted = schedule.daily_tasks.filter(
    day => day.status === 'completed'
  ).length;
  
  const studyHours = allTasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + task.duration, 0) / 60;
  
  return {
    completedTasks,
    totalTasks,
    percentage: Math.round(percentage),
    daysCompleted,
    totalDays: schedule.total_days,
    studyHours: Math.round(studyHours)
  };
}, [schedule]);
```

**Solution 2**: Verify dependencies

Ensure useMemo recalculates when schedule changes:
```typescript
const progress = useMemo(() => {
  // ... calculation
}, [schedule]); // ← Must include schedule
```

**Solution 3**: Force re-render after task completion

```typescript
const completeTask = useCallback(async (taskId: string) => {
  // ... update schedule state
  
  // Force recalculation by updating schedule object
  setSchedule(prev => ({ ...prev }));
}, []);
```

**Verification**:
- Complete a task
- Check console: `console.log('Progress:', progress)`
- Progress percentage should increase
- Study hours should increase

---

## Styling Issues

### Issue 8: Icons Not Displaying

**Symptoms**:
- Empty boxes where icons should be
- Console error: "Cannot find module 'lucide-react'"
- Icons show as text

**Possible Causes**:
1. lucide-react not installed
2. Incorrect import syntax
3. Icon name typo

**Solutions**:

**Solution 1**: Install lucide-react
```bash
npm install lucide-react
```

**Solution 2**: Use correct import syntax
```typescript
import { Calendar, Clock, CheckCircle, Book, Pencil, RefreshCw } from 'lucide-react';
```

**Solution 3**: Use icons correctly
```typescript
<Clock size={16} className={styles.icon} />
<Book size={20} />
<CheckCircle size={24} color="green" />
```

**Verification**:
- Icons should display as SVG graphics
- No console errors

---

### Issue 9: Responsive Layout Broken

**Symptoms**:
- Layout doesn't adapt to mobile
- Elements overlap on small screens
- Horizontal scrolling on mobile

**Possible Causes**:
1. Missing media queries
2. Fixed widths instead of percentages
3. Viewport meta tag missing

**Solutions**:

**Solution 1**: Add viewport meta tag

In `pages/_app.tsx` or `_document.tsx`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Solution 2**: Add responsive CSS

In `styles/schedule.module.css`:
```css
/* Desktop */
.scheduleLayout {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 20px;
}

/* Tablet */
@media (max-width: 1024px) {
  .scheduleLayout {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .scheduleLayout {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .taskDetailsPanel {
    width: 100%;
  }
}
```

**Solution 3**: Use flexible units
```css
/* ❌ Don't use fixed widths */
.calendar {
  width: 600px;
}

/* ✓ Use percentages or max-width */
.calendar {
  width: 100%;
  max-width: 600px;
}
```

**Verification**:
- Resize browser window
- Layout should adapt smoothly
- No horizontal scrolling
- All content visible

---

## API and Data Issues

### Issue 10: Mock API Not Responding

**Symptoms**:
- Network errors in console
- "Failed to fetch" errors
- Schedule data not loading

**Possible Causes**:
1. Mock API server not running
2. Wrong port in API URL
3. CORS issues
4. Endpoint not defined

**Solutions**:

**Solution 1**: Start mock API server
```bash
node vaishnavi-frontend/mock-data/mock-api-server.js
```

Should see:
```
Mock API server running on http://localhost:3001
```

**Solution 2**: Check API URL

In `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Restart dev server after changing .env:
```bash
npm run dev
```

**Solution 3**: Add CORS to mock server

In `mock-api-server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

Install cors if needed:
```bash
npm install cors
```

**Solution 4**: Verify endpoint exists

In `mock-api-server.js`:
```javascript
app.get('/api/schedule/:studentId', (req, res) => {
  const mockData = require('./mock-api-responses.json');
  res.json(mockData.schedule);
});
```

**Verification**:
```bash
# Test endpoint manually
curl http://localhost:3001/api/schedule/student123

# Should return JSON with schedule data
```

---

### Issue 11: TypeScript Errors

**Symptoms**:
- Red squiggly lines in IDE
- Build fails with type errors
- "Property does not exist on type" errors

**Possible Causes**:
1. Missing type definitions
2. Interface mismatch
3. Incorrect prop types

**Solutions**:

**Solution 1**: Define proper interfaces

In `shared/types.ts`:
```typescript
export interface Schedule {
  student_id: string;
  exam_date: string;
  total_days: number;
  daily_tasks: DailyTask[];
  overall_progress: number;
}

export interface DailyTask {
  date: string;
  day_number: number;
  status: 'pending' | 'in-progress' | 'completed' | 'missed';
  total_duration: number;
  tasks: Task[];
}

export interface Task {
  task_id: string;
  topic: string;
  subject: string;
  type: 'study' | 'practice' | 'revision';
  duration: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  resources: string[];
}
```

**Solution 2**: Import and use types
```typescript
import { Schedule, DailyTask, Task } from '@/shared/types';

interface ScheduleCalendarProps {
  schedule: Schedule | null;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}
```

**Solution 3**: Add null checks
```typescript
// ❌ Can cause errors
const tasks = schedule.daily_tasks;

// ✓ Safe
const tasks = schedule?.daily_tasks ?? [];
```

**Verification**:
```bash
# Run type check
npm run type-check

# Should show no errors
```

---

## Performance Issues

### Issue 12: Slow Rendering

**Symptoms**:
- Calendar takes long to render
- Lag when selecting dates
- Slow scrolling in task list

**Possible Causes**:
1. Too many re-renders
2. Missing memoization
3. Large data set
4. Inefficient calculations

**Solutions**:

**Solution 1**: Memoize components
```typescript
import React, { memo } from 'react';

export const TaskCard = memo(({ task, completed, onComplete, onClick }) => {
  // Component code
});
```

**Solution 2**: Use useMemo for expensive calculations
```typescript
const coloredDays = useMemo(() => {
  return schedule?.daily_tasks.map(day => ({
    date: new Date(day.date),
    status: day.status
  })) ?? [];
}, [schedule]);
```

**Solution 3**: Use useCallback for handlers
```typescript
const handleDateSelect = useCallback((date: Date) => {
  setSelectedDate(date);
}, []);
```

**Solution 4**: Virtualize long lists

For 90+ days of tasks, use react-window:
```bash
npm install react-window
```

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={tasks.length}
  itemSize={80}
>
  {({ index, style }) => (
    <div style={style}>
      <TaskCard task={tasks[index]} />
    </div>
  )}
</FixedSizeList>
```

**Verification**:
- Open React DevTools Profiler
- Record interaction
- Check render times
- Should be < 16ms per frame

---

## Browser-Specific Issues

### Issue 13: Works in Chrome but not Safari

**Symptoms**:
- Calendar displays in Chrome
- Broken in Safari or Firefox
- Different behavior across browsers

**Possible Causes**:
1. CSS not cross-browser compatible
2. JavaScript features not supported
3. Date handling differences

**Solutions**:

**Solution 1**: Add vendor prefixes
```css
.taskCard {
  display: flex;
  -webkit-display: flex;
  transition: transform 0.3s;
  -webkit-transition: -webkit-transform 0.3s;
}
```

**Solution 2**: Use date-fns for date handling

Instead of native Date methods:
```typescript
// ❌ May behave differently
new Date('2024-03-20')

// ✓ Consistent across browsers
import { parseISO } from 'date-fns';
parseISO('2024-03-20')
```

**Solution 3**: Check browser support

Use caniuse.com to check feature support.

Add polyfills if needed:
```bash
npm install core-js
```

**Verification**:
- Test in Chrome, Firefox, Safari
- All features should work consistently

---

## Getting Help

If you're still stuck after trying these solutions:

1. **Check browser console** for error messages
2. **Check Network tab** for failed API calls
3. **Check React DevTools** for component state
4. **Search error message** on Google/Stack Overflow
5. **Ask for help** with:
   - Exact error message
   - Steps to reproduce
   - What you've tried
   - Browser and OS version

---

## Prevention Tips

To avoid issues in the future:

1. **Test frequently**: Test after each component
2. **Use TypeScript**: Catch errors before runtime
3. **Check console**: Monitor for warnings
4. **Use linter**: Run ESLint to catch issues
5. **Read documentation**: Check library docs
6. **Version control**: Commit working code often
7. **Code review**: Have someone review your code

---

## Quick Reference

### Common Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Start mock API
node vaishnavi-frontend/mock-data/mock-api-server.js

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

### Common Fixes
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Restart everything
# Stop all servers (Ctrl+C)
npm run dev
node vaishnavi-frontend/mock-data/mock-api-server.js
```

---

## Still Having Issues?

If none of these solutions work:

1. Create a minimal reproduction
2. Check if issue exists in a fresh project
3. File an issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots
   - Error messages
   - Environment details

Good luck! 🚀

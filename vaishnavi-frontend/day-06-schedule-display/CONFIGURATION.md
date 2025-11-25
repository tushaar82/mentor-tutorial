# Configuration Guide for Schedule Display UI

This guide covers all manual setup steps required for the schedule display interface.

---

## Step 1: Install Calendar Library

### What You're Doing
Installing react-calendar library for displaying the monthly calendar view.

### Why This Matters
react-calendar provides a robust, accessible calendar component with built-in date navigation and customization options.

### Command/Action
```bash
npm install react-calendar @types/react-calendar
```

### Verification
```bash
# Check package.json
cat package.json | grep react-calendar
# Should show: "react-calendar": "^4.x.x"
```

### What This Installs
- `react-calendar`: Calendar component library
- `@types/react-calendar`: TypeScript type definitions

---

## Step 2: Install Date Manipulation Library

### What You're Doing
Installing date-fns for date formatting and manipulation utilities.

### Why This Matters
date-fns provides lightweight, modular date utilities that are easier to use than native Date methods.

### Command/Action
```bash
npm install date-fns
```

### Verification
```bash
# Check package.json
cat package.json | grep date-fns
# Should show: "date-fns": "^2.x.x" or "^3.x.x"
```

### What This Installs
- `date-fns`: Date utility library with functions for formatting, comparing, and manipulating dates

---

## Step 3: Install Icon Library

### What You're Doing
Installing lucide-react for icons used in task cards and UI elements.

### Why This Matters
lucide-react provides a comprehensive set of clean, consistent icons for React applications.

### Command/Action
```bash
npm install lucide-react
```

### Verification
```bash
# Check package.json
cat package.json | grep lucide-react
# Should show: "lucide-react": "^0.x.x"
```

### What This Installs
- `lucide-react`: Icon library with React components

---

## Step 4: Import Calendar Styles

### What You're Doing
Importing default styles for react-calendar in your application.

### Why This Matters
react-calendar requires base CSS styles to display properly. You'll customize these later.

### Command/Action

**Option A: Import in global CSS file** (Recommended)

Edit `styles/globals.css` or `app/globals.css`:
```css
/* Add at the top of the file */
@import 'react-calendar/dist/Calendar.css';
```

**Option B: Import in _app.tsx** (Next.js)

Edit `pages/_app.tsx`:
```typescript
import 'react-calendar/dist/Calendar.css';
```

### Verification
1. Start dev server: `npm run dev`
2. Navigate to schedule page
3. Calendar should display with default styling

---

## Step 5: Configure TypeScript for Date Types

### What You're Doing
Ensuring TypeScript properly handles Date types and date-fns imports.

### Why This Matters
Proper TypeScript configuration prevents type errors when working with dates.

### Command/Action

Check `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "lib": ["es2015", "dom"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Verification
No action needed if your project already has a working TypeScript setup.

---

## Step 6: Set Up Mock Schedule Data

### What You're Doing
Creating mock schedule data for testing without backend connection.

### Why This Matters
Allows you to develop and test the UI independently of backend availability.

### Command/Action

Create or update `vaishnavi-frontend/mock-data/mock-api-responses.json`:

```json
{
  "schedule": {
    "student_id": "student123",
    "exam_date": "2024-06-15",
    "total_days": 90,
    "overall_progress": 35,
    "daily_tasks": [
      {
        "date": "2024-03-20",
        "day_number": 1,
        "status": "completed",
        "total_duration": 180,
        "tasks": [
          {
            "task_id": "task1",
            "topic": "Newton's Laws of Motion",
            "subject": "Physics",
            "type": "study",
            "duration": 60,
            "priority": "high",
            "completed": true,
            "resources": [
              "Chapter 5 Notes",
              "Practice Problems Set 1"
            ]
          },
          {
            "task_id": "task2",
            "topic": "Force and Acceleration",
            "subject": "Physics",
            "type": "practice",
            "duration": 45,
            "priority": "high",
            "completed": true,
            "resources": [
              "Practice Questions"
            ]
          },
          {
            "task_id": "task3",
            "topic": "Previous Day Revision",
            "subject": "Physics",
            "type": "revision",
            "duration": 30,
            "priority": "medium",
            "completed": true,
            "resources": []
          }
        ]
      },
      {
        "date": "2024-03-21",
        "day_number": 2,
        "status": "in-progress",
        "total_duration": 200,
        "tasks": [
          {
            "task_id": "task4",
            "topic": "Friction and Motion",
            "subject": "Physics",
            "type": "study",
            "duration": 60,
            "priority": "high",
            "completed": true,
            "resources": [
              "Chapter 6 Notes"
            ]
          },
          {
            "task_id": "task5",
            "topic": "Organic Chemistry Basics",
            "subject": "Chemistry",
            "type": "study",
            "duration": 60,
            "priority": "high",
            "completed": false,
            "resources": [
              "Chapter 12 Notes"
            ]
          },
          {
            "task_id": "task6",
            "topic": "Nomenclature Practice",
            "subject": "Chemistry",
            "type": "practice",
            "duration": 45,
            "priority": "medium",
            "completed": false,
            "resources": [
              "Practice Set 3"
            ]
          }
        ]
      },
      {
        "date": "2024-03-22",
        "day_number": 3,
        "status": "pending",
        "total_duration": 180,
        "tasks": [
          {
            "task_id": "task7",
            "topic": "Quadratic Equations",
            "subject": "Mathematics",
            "type": "study",
            "duration": 60,
            "priority": "high",
            "completed": false,
            "resources": [
              "Chapter 4 Notes"
            ]
          },
          {
            "task_id": "task8",
            "topic": "Problem Solving",
            "subject": "Mathematics",
            "type": "practice",
            "duration": 60,
            "priority": "high",
            "completed": false,
            "resources": [
              "Practice Problems"
            ]
          },
          {
            "task_id": "task9",
            "topic": "Previous Topics Revision",
            "subject": "Physics",
            "type": "revision",
            "duration": 30,
            "priority": "low",
            "completed": false,
            "resources": []
          }
        ]
      }
    ]
  }
}
```

### Verification
File should be valid JSON. Check with:
```bash
cat vaishnavi-frontend/mock-data/mock-api-responses.json | python -m json.tool
```

---

## Step 7: Update Mock API Server

### What You're Doing
Adding schedule endpoint to the mock API server for testing.

### Why This Matters
Allows frontend to fetch schedule data without real backend.

### Command/Action

Edit `vaishnavi-frontend/mock-data/mock-api-server.js`:

Add this endpoint:
```javascript
// Schedule endpoint
app.get('/api/schedule/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  // Load mock data
  const mockData = require('./mock-api-responses.json');
  
  // Return schedule
  res.json(mockData.schedule);
});

// Task completion endpoint
app.post('/api/schedule/task/:taskId/complete', (req, res) => {
  const { taskId } = req.params;
  
  // Simulate successful completion
  res.json({
    success: true,
    task_id: taskId,
    completed: true,
    timestamp: new Date().toISOString()
  });
});
```

### Verification
1. Start mock server: `node vaishnavi-frontend/mock-data/mock-api-server.js`
2. Test endpoint: `curl http://localhost:3001/api/schedule/student123`
3. Should return schedule JSON

---

## Step 8: Configure API Base URL

### What You're Doing
Setting up environment variable for API base URL to easily switch between mock and real backend.

### Why This Matters
Allows you to test with mock data during development and switch to real backend when ready.

### Command/Action

Create or update `.env.local`:
```bash
# For mock API server
NEXT_PUBLIC_API_URL=http://localhost:3001

# For real backend (when ready)
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Verification
1. Restart dev server (environment variables require restart)
2. Check in code: `console.log(process.env.NEXT_PUBLIC_API_URL)`
3. Should print: `http://localhost:3001`

---

## Step 9: Create API Service for Schedule

### What You're Doing
Creating a centralized API service for schedule-related API calls.

### Why This Matters
Centralizes API logic, making it easier to switch between mock and real backend.

### Command/Action

Create `services/scheduleApi.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const scheduleApi = {
  // Fetch schedule for student
  async getSchedule(studentId: string) {
    const response = await fetch(`${API_URL}/api/schedule/${studentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch schedule');
    }
    return response.json();
  },

  // Mark task as complete
  async completeTask(taskId: string) {
    const response = await fetch(`${API_URL}/api/schedule/task/${taskId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to complete task');
    }
    return response.json();
  },
};
```

### Verification
No immediate verification needed. Will be tested when using the hook.

---

## Step 10: Configure Color Theme

### What You're Doing
Setting up CSS variables for consistent colors across schedule components.

### Why This Matters
Ensures consistent styling and makes it easy to change colors globally.

### Command/Action

Add to `styles/globals.css`:
```css
:root {
  /* Task Status Colors */
  --schedule-completed: #10b981;
  --schedule-in-progress: #f59e0b;
  --schedule-pending: #6b7280;
  --schedule-missed: #ef4444;

  /* Priority Colors */
  --priority-high: #ef4444;
  --priority-medium: #f59e0b;
  --priority-low: #10b981;

  /* Subject Colors */
  --subject-physics: #3b82f6;
  --subject-chemistry: #10b981;
  --subject-mathematics: #8b5cf6;

  /* Task Type Colors */
  --task-study: #3b82f6;
  --task-practice: #f59e0b;
  --task-revision: #8b5cf6;

  /* UI Colors */
  --schedule-bg: #ffffff;
  --schedule-border: #e5e7eb;
  --schedule-hover: #f3f4f6;
  --schedule-shadow: rgba(0, 0, 0, 0.1);
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --schedule-bg: #1f2937;
    --schedule-border: #374151;
    --schedule-hover: #374151;
  }
}
```

### Verification
Colors will be used in component styles. No immediate verification needed.

---

## Step 11: Test Calendar Library Installation

### What You're Doing
Creating a simple test component to verify react-calendar works.

### Why This Matters
Ensures the library is properly installed before building complex components.

### Command/Action

Create `components/test/CalendarTest.tsx`:
```typescript
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function CalendarTest() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calendar Test</h2>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
}
```

### Verification
1. Import and render CalendarTest in a test page
2. Calendar should display
3. Clicking dates should update the selected date text

---

## Step 12: Verify All Dependencies

### What You're Doing
Final check that all required packages are installed.

### Why This Matters
Ensures you have everything needed before starting development.

### Command/Action
```bash
npm list react-calendar date-fns lucide-react
```

### Expected Output
```
├── react-calendar@4.x.x
├── date-fns@2.x.x or 3.x.x
└── lucide-react@0.x.x
```

### If Missing
Run: `npm install react-calendar @types/react-calendar date-fns lucide-react`

---

## Configuration Checklist

Before proceeding to development, verify:

- [ ] react-calendar installed
- [ ] date-fns installed
- [ ] lucide-react installed
- [ ] Calendar CSS imported
- [ ] Mock schedule data created
- [ ] Mock API server updated with schedule endpoint
- [ ] API base URL configured in .env.local
- [ ] API service created (scheduleApi.ts)
- [ ] Color theme variables added to globals.css
- [ ] Calendar test component works
- [ ] All dependencies verified

---

## Troubleshooting

### Issue: Calendar doesn't display

**Possible Causes**:
1. Calendar CSS not imported
2. react-calendar not installed

**Solutions**:
1. Add `@import 'react-calendar/dist/Calendar.css';` to globals.css
2. Run `npm install react-calendar @types/react-calendar`
3. Restart dev server

---

### Issue: TypeScript errors with date-fns

**Possible Causes**:
1. Incorrect import syntax
2. TypeScript configuration issue

**Solutions**:
1. Use named imports: `import { format, addDays } from 'date-fns';`
2. Check tsconfig.json has `"esModuleInterop": true`

---

### Issue: Mock API server not responding

**Possible Causes**:
1. Server not started
2. Wrong port
3. CORS issues

**Solutions**:
1. Start server: `node vaishnavi-frontend/mock-data/mock-api-server.js`
2. Check port in .env.local matches server port
3. Ensure CORS is enabled in mock server

---

### Issue: Icons not displaying

**Possible Causes**:
1. lucide-react not installed
2. Incorrect import syntax

**Solutions**:
1. Run `npm install lucide-react`
2. Use correct import: `import { Calendar, Clock, CheckCircle } from 'lucide-react';`

---

## Next Steps

After completing all configuration steps:
1. Verify all items in the checklist are complete
2. Start mock API server: `node vaishnavi-frontend/mock-data/mock-api-server.js`
3. Start dev server: `npm run dev`
4. Proceed to PROMPTS.md to generate components
5. Test each component as you build it

## Additional Resources

- **react-calendar docs**: https://github.com/wojtekmaj/react-calendar
- **date-fns docs**: https://date-fns.org/docs/Getting-Started
- **lucide-react docs**: https://lucide.dev/guide/packages/lucide-react
- **TypeScript Date types**: https://www.typescriptlang.org/docs/handbook/utility-types.html

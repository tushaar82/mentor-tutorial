# Configuration Guide for Day 8: Parent Dashboard

## Overview

This guide covers manual configuration steps needed for the parent dashboard, including chart libraries, PDF generation, date formatting, and context setup.

**Total Time**: 30 minutes

---

## Step 1: Install Required Dependencies

### What You're Doing
Installing npm packages for charts, PDF generation, forms, and date handling.

### Commands
```bash
# Navigate to frontend directory
cd vaishnavi-frontend

# Install chart library
npm install recharts

# Install PDF generation
npm install jspdf

# Install form handling
npm install react-hook-form

# Install date utilities
npm install date-fns

# Install date picker
npm install react-datepicker
npm install --save-dev @types/react-datepicker

# Install confetti animation
npm install react-confetti

# Install icons (if not already installed)
npm install lucide-react
```

### Verification
```bash
# Check package.json includes new dependencies
cat package.json | grep -E "recharts|jspdf|react-hook-form|date-fns|react-datepicker|react-confetti"
```

### Expected Output
```
"recharts": "^2.10.0",
"jspdf": "^2.5.1",
"react-hook-form": "^7.48.0",
"date-fns": "^2.30.0",
"react-datepicker": "^4.21.0",
"react-confetti": "^6.1.0",
"lucide-react": "^0.292.0"
```

---

## Step 2: Configure Recharts Theme

### What You're Doing
Setting up consistent chart colors and styling for all visualizations.

### Action
Create file `lib/chart-config.ts`:

```typescript
// Chart color palette
export const chartColors = {
  primary: '#3b82f6',    // Blue
  success: '#10b981',    // Green
  warning: '#f59e0b',    // Yellow
  danger: '#ef4444',     // Red
  physics: '#8b5cf6',    // Purple
  chemistry: '#ec4899',  // Pink
  mathematics: '#06b6d4', // Cyan
  gray: '#6b7280',       // Gray
};

// Chart configuration
export const chartConfig = {
  margin: { top: 20, right: 30, left: 20, bottom: 20 },
  fontSize: 12,
  fontFamily: 'Inter, sans-serif',
};

// Responsive chart dimensions
export const getChartDimensions = (containerWidth: number) => ({
  width: containerWidth,
  height: Math.min(containerWidth * 0.6, 400),
});
```

### Why This Matters
Consistent colors and styling across all charts improve visual coherence and user experience.

---

## Step 3: Configure jsPDF Settings

### What You're Doing
Setting up PDF generation defaults and helper functions.

### Action
Add to `lib/pdf-generator.ts` (at the top):

```typescript
import jsPDF from 'jspdf';

// PDF configuration
const PDF_CONFIG = {
  orientation: 'portrait' as const,
  unit: 'mm' as const,
  format: 'a4' as const,
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  fontSize: {
    title: 24,
    heading: 18,
    subheading: 14,
    body: 11,
    small: 9,
  },
  colors: {
    primary: [59, 130, 246],    // Blue
    text: [31, 41, 55],          // Dark gray
    lightText: [107, 114, 128],  // Light gray
    border: [229, 231, 235],     // Very light gray
  },
};

// Helper function to add page header
const addPageHeader = (doc: jsPDF, title: string, pageNumber: number) => {
  doc.setFontSize(PDF_CONFIG.fontSize.small);
  doc.setTextColor(...PDF_CONFIG.colors.lightText);
  doc.text(title, PDF_CONFIG.margins.left, 10);
  doc.text(
    `Page ${pageNumber}`,
    doc.internal.pageSize.width - PDF_CONFIG.margins.right,
    10,
    { align: 'right' }
  );
};

// Helper function to add page footer
const addPageFooter = (doc: jsPDF, pageNumber: number) => {
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(PDF_CONFIG.fontSize.small);
  doc.setTextColor(...PDF_CONFIG.colors.lightText);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    PDF_CONFIG.margins.left,
    pageHeight - 10
  );
  doc.text(
    'Mentor AI - EdTech Platform',
    doc.internal.pageSize.width - PDF_CONFIG.margins.right,
    pageHeight - 10,
    { align: 'right' }
  );
};
```

### Why This Matters
Consistent PDF formatting ensures professional-looking reports.

---

## Step 4: Configure Date Formatting

### What You're Doing
Setting up consistent date and time formatting across the dashboard.

### Action
Create file `lib/date-utils.ts`:

```typescript
import { format, formatDistanceToNow, differenceInDays } from 'date-fns';

// Format date as "25 Nov 2024"
export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'dd MMM yyyy');
};

// Format date and time as "25 Nov 2024, 3:30 PM"
export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'dd MMM yyyy, h:mm a');
};

// Format relative time as "2 hours ago"
export const formatRelativeTime = (date: Date | string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

// Calculate days remaining until exam
export const getDaysRemaining = (targetDate: Date | string): number => {
  return differenceInDays(new Date(targetDate), new Date());
};

// Format days remaining with urgency color
export const formatDaysRemaining = (days: number): { text: string; color: string } => {
  if (days < 0) {
    return { text: 'Exam passed', color: 'text-gray-500' };
  } else if (days === 0) {
    return { text: 'Today!', color: 'text-red-600' };
  } else if (days === 1) {
    return { text: '1 day left', color: 'text-red-600' };
  } else if (days <= 7) {
    return { text: `${days} days left`, color: 'text-orange-600' };
  } else if (days <= 30) {
    return { text: `${days} days left`, color: 'text-yellow-600' };
  } else {
    return { text: `${days} days left`, color: 'text-green-600' };
  }
};
```

### Verification
Test in browser console:
```javascript
import { formatDate, formatRelativeTime } from '@/lib/date-utils';
console.log(formatDate(new Date())); // Should show: "25 Nov 2024"
console.log(formatRelativeTime(new Date())); // Should show: "less than a minute ago"
```

---

## Step 5: Configure React Datepicker Styles

### What You're Doing
Adding CSS for react-datepicker to match your design system.

### Action
Add to `app/globals.css`:

```css
/* React Datepicker Styles */
.react-datepicker-wrapper {
  width: 100%;
}

.react-datepicker {
  font-family: inherit;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.react-datepicker__header {
  background-color: #3b82f6;
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  padding-top: 0.5rem;
}

.react-datepicker__current-month,
.react-datepicker__day-name {
  color: white;
}

.react-datepicker__day--selected,
.react-datepicker__day--keyboard-selected {
  background-color: #3b82f6;
  color: white;
}

.react-datepicker__day:hover {
  background-color: #dbeafe;
}

.react-datepicker__time-container {
  border-left: 1px solid #e5e7eb;
}

.react-datepicker__time-list-item--selected {
  background-color: #3b82f6 !important;
  color: white !important;
}
```

### Why This Matters
Styled datepicker matches your application's design system.

---

## Step 6: Set Up Parent Context Provider

### What You're Doing
Wrapping the parent dashboard with the context provider.

### Action
Verify `app/parent/layout.tsx` includes ParentProvider:

```typescript
import { ParentProvider } from '@/contexts/ParentContext';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParentProvider>
      <div className="flex h-screen">
        {/* Sidebar navigation */}
        <aside className="w-64 bg-white border-r">
          {/* Navigation items */}
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </ParentProvider>
  );
}
```

### Verification
Check that context is accessible in child components:
```typescript
// In any parent dashboard component
import { useParent } from '@/contexts/ParentContext';

const { child, dashboardData, loading, error } = useParent();
console.log('Child:', child);
```

---

## Step 7: Configure Mock API Endpoints

### What You're Doing
Adding parent dashboard endpoints to mock API server for standalone testing.

### Action
Add to `mock-data/mock-api-server.js`:

```javascript
// Parent dashboard endpoint
app.get('/api/parent/dashboard/:parentId', (req, res) => {
  const mockData = {
    child: {
      id: 'child-1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      exam: 'JEE',
      targetDate: '2025-05-15',
      profilePicture: '/avatars/student.jpg',
      overallProgress: 68,
      studyStreak: 7,
    },
    quickStats: {
      diagnosticScore: 72,
      percentile: 85,
      topicsMastered: 45,
      totalTopics: 60,
      practiceQuestions: 1247,
      scheduleAdherence: 82,
    },
    activities: [
      {
        id: '1',
        type: 'practice',
        description: 'Completed Physics practice - 15 questions',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: 'target',
      },
      // Add more activities...
    ],
    alerts: [
      {
        id: '1',
        type: 'warning',
        message: 'No practice in 2 days - Encourage your child',
        severity: 'warning',
        timestamp: new Date().toISOString(),
        actionable: true,
        actionLink: '/parent/practice',
      },
      // Add more alerts...
    ],
  };
  
  res.json(mockData);
});

// Teaching resources endpoint
app.get('/api/parent/resources/:childId', (req, res) => {
  const { language = 'en' } = req.query;
  
  const mockResources = [
    {
      id: '1',
      topicId: 'topic-1',
      topicName: 'Thermodynamics',
      subject: 'Physics',
      teachingTips: 'Explain using real-world examples like refrigerators...',
      practiceExercises: 'Try solving problems together...',
      commonMistakes: 'Students often confuse heat and temperature...',
      analogies: 'Think of heat as water flowing...',
      language,
    },
    // Add more resources...
  ];
  
  res.json(mockResources);
});

// AI insights endpoint
app.get('/api/parent/insights/:childId', (req, res) => {
  const mockInsights = [
    {
      id: '1',
      type: 'improvement',
      message: 'Great improvement in Calculus this week (+12%)',
      priority: 'high',
      timestamp: new Date().toISOString(),
      relatedTopics: ['calculus', 'derivatives'],
    },
    // Add more insights...
  ];
  
  res.json(mockInsights);
});
```

### Verification
Start mock server and test endpoints:
```bash
node mock-data/mock-api-server.js

# In another terminal
curl http://localhost:3001/api/parent/dashboard/parent-1
```

---

## Step 8: Configure Environment Variables

### What You're Doing
Setting up environment variables for API endpoints and feature flags.

### Action
Add to `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_API_URL=http://localhost:3001

# Feature Flags
NEXT_PUBLIC_ENABLE_PDF_REPORTS=true
NEXT_PUBLIC_ENABLE_COMMUNICATION=true
NEXT_PUBLIC_ENABLE_AUDIO_RESOURCES=true

# Parent Dashboard Settings
NEXT_PUBLIC_MAX_ACTIVITIES=10
NEXT_PUBLIC_MAX_ALERTS=5
NEXT_PUBLIC_CHART_ANIMATION_DURATION=1000
```

### Verification
Check environment variables are loaded:
```typescript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('PDF Reports:', process.env.NEXT_PUBLIC_ENABLE_PDF_REPORTS);
```

---

## Step 9: Configure Responsive Breakpoints

### What You're Doing
Setting up consistent responsive design breakpoints.

### Action
Add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        // sm: 640px (default)
        // md: 768px (default)
        // lg: 1024px (default)
        // xl: 1280px (default)
        '2xl': '1536px',
      },
      gridTemplateColumns: {
        'stats': 'repeat(auto-fit, minmax(250px, 1fr))',
        'resources': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
};
```

### Why This Matters
Consistent breakpoints ensure responsive design works across all components.

---

## Step 10: Configure Chart Responsiveness

### What You're Doing
Setting up responsive chart containers that adapt to screen size.

### Action
Create file `hooks/useChartDimensions.ts`:

```typescript
import { useState, useEffect, useRef } from 'react';

export const useChartDimensions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(width * 0.6, 400); // Maintain aspect ratio
        setDimensions({ width, height });
      }
    };

    // Initial measurement
    updateDimensions();

    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return { containerRef, dimensions };
};
```

### Usage in Components
```typescript
import { useChartDimensions } from '@/hooks/useChartDimensions';

const MyChart = () => {
  const { containerRef, dimensions } = useChartDimensions();
  
  return (
    <div ref={containerRef} className="w-full">
      <LineChart width={dimensions.width} height={dimensions.height}>
        {/* Chart content */}
      </LineChart>
    </div>
  );
};
```

---

## Step 11: Configure Loading Skeletons

### What You're Doing
Creating reusable loading skeleton components for better UX.

### Action
Create file `components/ui/Skeleton.tsx`:

```typescript
export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-label="Loading..."
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <Skeleton className="h-4 w-1/4 mb-4" />
    <Skeleton className="h-8 w-1/2 mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <Skeleton className="h-6 w-1/3 mb-4" />
    <Skeleton className="h-64 w-full" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4 border-b">
      <Skeleton className="h-4 w-1/4" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);
```

### Usage
```typescript
import { CardSkeleton, ChartSkeleton } from '@/components/ui/Skeleton';

const Dashboard = () => {
  const { loading } = useParent();
  
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <ChartSkeleton />
      </div>
    );
  }
  
  // Render actual content
};
```

---

## Step 12: Verify All Configurations

### What You're Doing
Final verification that all configurations are working correctly.

### Checklist
- [ ] All npm packages installed successfully
- [ ] Chart colors configured in `lib/chart-config.ts`
- [ ] PDF settings configured in `lib/pdf-generator.ts`
- [ ] Date utilities created in `lib/date-utils.ts`
- [ ] Datepicker styles added to `globals.css`
- [ ] ParentProvider wraps parent layout
- [ ] Mock API endpoints added and tested
- [ ] Environment variables set in `.env.local`
- [ ] Responsive breakpoints configured in `tailwind.config.js`
- [ ] Chart dimensions hook created
- [ ] Loading skeletons created
- [ ] Dev server starts without errors

### Verification Commands
```bash
# Check all imports resolve
npm run build

# Start dev server
npm run dev

# Start mock API server (in another terminal)
node mock-data/mock-api-server.js

# Open browser
open http://localhost:3000/parent
```

### Expected Result
- ✅ No TypeScript errors
- ✅ No build errors
- ✅ Dev server runs on http://localhost:3000
- ✅ Mock API runs on http://localhost:3001
- ✅ Parent dashboard loads without errors
- ✅ Charts render correctly
- ✅ Loading skeletons show while data loads
- ✅ All components styled consistently

---

## Troubleshooting

### Issue: Recharts not rendering
**Solution**: Ensure you're using client components (`'use client'` at top of file)

### Issue: PDF generation fails
**Solution**: Check jsPDF is imported correctly and canvas elements exist

### Issue: Dates showing as "Invalid Date"
**Solution**: Ensure date strings are in ISO format (YYYY-MM-DD)

### Issue: Context not accessible
**Solution**: Verify ParentProvider wraps the layout and useParent is called inside provider

### Issue: Mock API not responding
**Solution**: Check mock server is running on port 3001 and CORS is enabled

---

## Next Steps

Configuration complete! Move to **TESTING.md** to verify all parent dashboard features work correctly.

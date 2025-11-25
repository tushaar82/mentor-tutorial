# Troubleshooting Guide for Day 8: Parent Dashboard

## Overview

This guide helps you diagnose and fix common issues with the parent dashboard implementation.

---

## Issue 1: Dashboard Not Loading / Blank Page

### Symptoms
- Navigate to `/parent` but page is blank
- Loading spinner shows indefinitely
- No content displays

### Possible Causes
1. ParentProvider not wrapping layout
2. API endpoint not responding
3. Mock API server not running
4. Context hook called outside provider

### Solutions

**Solution 1: Verify ParentProvider**
```typescript
// Check app/parent/layout.tsx
import { ParentProvider } from '@/contexts/ParentContext';

export default function ParentLayout({ children }) {
  return (
    <ParentProvider>  {/* Must wrap children */}
      {children}
    </ParentProvider>
  );
}
```

**Solution 2: Check Mock API Server**
```bash
# Ensure mock server is running
node mock-data/mock-api-server.js

# Should see: "Mock API server running on port 3001"

# Test endpoint
curl http://localhost:3001/api/parent/dashboard/parent-1
```

**Solution 3: Check Browser Console**
```javascript
// Open DevTools (F12) → Console
// Look for errors like:
// "useParent must be used within ParentProvider"
// "Failed to fetch"
// "Network error"
```

**Solution 4: Verify Environment Variables**
```bash
# Check .env.local exists and has:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_API_URL=http://localhost:3001
```

---

## Issue 2: Charts Not Rendering

### Symptoms
- Dashboard loads but charts are missing
- Empty space where charts should be
- Console error: "Cannot read property 'map' of undefined"

### Possible Causes
1. Recharts not installed
2. Component not marked as client component
3. Data format incorrect
4. Chart dimensions not calculated

### Solutions

**Solution 1: Install Recharts**
```bash
npm install recharts
# Restart dev server
npm run dev
```

**Solution 2: Add 'use client' Directive**
```typescript
// At top of chart component file
'use client';

import { LineChart, Line, XAxis, YAxis } from 'recharts';
// ... rest of component
```

**Solution 3: Verify Data Format**
```typescript
// Recharts expects array of objects
const data = [
  { date: '2024-11-01', score: 65 },
  { date: '2024-11-02', score: 68 },
  // ...
];

// NOT this:
const data = { dates: [...], scores: [...] };
```

**Solution 4: Use Chart Dimensions Hook**
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

## Issue 3: PDF Generation Fails

### Symptoms
- Click "Generate Report" but nothing happens
- Error: "jsPDF is not defined"
- PDF downloads but is blank or corrupted

### Possible Causes
1. jsPDF not installed
2. Charts not converted to images
3. PDF generation function has errors
4. Browser blocks download

### Solutions

**Solution 1: Install jsPDF**
```bash
npm install jspdf
# Restart dev server
```

**Solution 2: Convert Charts to Images**
```typescript
// Before adding to PDF, convert chart canvas to image
const chartElement = document.getElementById('chart-canvas');
const chartImage = chartElement.toDataURL('image/png');

// Then add to PDF
doc.addImage(chartImage, 'PNG', x, y, width, height);
```

**Solution 3: Check PDF Generation Function**
```typescript
// Ensure function returns Blob
export const generateProgressReport = async (data): Promise<Blob> => {
  const doc = new jsPDF();
  
  // Add content...
  
  return doc.output('blob');  // Must return Blob
};
```

**Solution 4: Check Browser Settings**
```
1. Open browser settings
2. Search for "downloads"
3. Ensure "Ask where to save each file" is enabled
4. Or check if downloads are blocked
```

---

## Issue 4: Date Formatting Issues

### Symptoms
- Dates show as "Invalid Date"
- Relative times show as "NaN days ago"
- Date pickers don't work

### Possible Causes
1. date-fns not installed
2. Date strings in wrong format
3. Timezone issues

### Solutions

**Solution 1: Install date-fns**
```bash
npm install date-fns
```

**Solution 2: Ensure ISO Date Format**
```typescript
// Correct format: YYYY-MM-DD or ISO 8601
const date = '2024-11-25';  // ✓ Good
const date = '2024-11-25T10:30:00Z';  // ✓ Good

// Incorrect formats:
const date = '11/25/2024';  // ✗ Bad
const date = '25-11-2024';  // ✗ Bad
```

**Solution 3: Use Date Utilities**
```typescript
import { formatDate, formatRelativeTime } from '@/lib/date-utils';

// Always use utility functions
const formatted = formatDate(dateString);
const relative = formatRelativeTime(dateString);
```

---

## Issue 5: Context Data Not Updating

### Symptoms
- Dashboard shows stale data
- Changes don't reflect in UI
- Refresh required to see updates

### Possible Causes
1. Context not re-fetching data
2. State not updating correctly
3. Component not re-rendering

### Solutions

**Solution 1: Add Refresh Function**
```typescript
// In ParentContext
const refreshData = async () => {
  setLoading(true);
  try {
    const data = await getParentDashboard(parentId);
    setDashboardData(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

// Expose in context
return (
  <ParentContext.Provider value={{ dashboardData, refreshData }}>
    {children}
  </ParentContext.Provider>
);
```

**Solution 2: Call Refresh After Updates**
```typescript
const handleSendMessage = async (message) => {
  await sendMessage(parentId, childId, message);
  await refreshData();  // Refresh dashboard data
};
```

**Solution 3: Use useEffect Dependencies**
```typescript
useEffect(() => {
  fetchDashboardData();
}, [parentId, childId]);  // Re-fetch when IDs change
```

---

## Issue 6: Responsive Design Not Working

### Symptoms
- Mobile view looks broken
- Sidebar doesn't collapse on mobile
- Charts overflow screen
- Touch interactions don't work

### Possible Causes
1. Tailwind responsive classes not applied
2. Hamburger menu not implemented
3. Charts not responsive
4. Touch events not handled

### Solutions

**Solution 1: Add Responsive Classes**
```typescript
// Use Tailwind responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 column mobile, 2 tablet, 4 desktop */}
</div>
```

**Solution 2: Implement Mobile Navigation**
```typescript
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    {/* Hamburger button (mobile only) */}
    <button 
      className="lg:hidden"
      onClick={() => setIsOpen(true)}
    >
      <Menu />
    </button>
    
    {/* Drawer sidebar */}
    <aside className={`
      fixed inset-y-0 left-0 z-50
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0
      transition-transform
    `}>
      {/* Navigation items */}
    </aside>
  </>
);
```

**Solution 3: Make Charts Responsive**
```typescript
// Use responsive container
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    {/* Chart content */}
  </LineChart>
</ResponsiveContainer>
```

**Solution 4: Test on Real Device**
```bash
# Get your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile device
http://192.168.1.X:3000/parent
```

---

## Issue 7: Loading Skeletons Not Showing

### Symptoms
- Blank screen while data loads
- No loading indicator
- Sudden content appearance

### Possible Causes
1. Loading state not checked
2. Skeleton components not created
3. Conditional rendering incorrect

### Solutions

**Solution 1: Check Loading State**
```typescript
const { dashboardData, loading, error } = useParent();

if (loading) {
  return <DashboardSkeleton />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

return <DashboardContent data={dashboardData} />;
```

**Solution 2: Create Skeleton Components**
```typescript
// components/ui/Skeleton.tsx
export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);
```

**Solution 3: Use Skeleton While Loading**
```typescript
{loading ? (
  <div className="grid grid-cols-4 gap-4">
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
) : (
  <QuickStatsCards stats={dashboardData.quickStats} />
)}
```

---

## Issue 8: Form Validation Not Working

### Symptoms
- Forms submit with empty fields
- No error messages shown
- Validation rules ignored

### Possible Causes
1. react-hook-form not installed
2. Validation rules not defined
3. Error messages not displayed

### Solutions

**Solution 1: Install react-hook-form**
```bash
npm install react-hook-form
```

**Solution 2: Define Validation Rules**
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

<input
  {...register('message', {
    required: 'Message is required',
    maxLength: {
      value: 500,
      message: 'Message must be less than 500 characters'
    }
  })}
/>
```

**Solution 3: Display Error Messages**
```typescript
{errors.message && (
  <p className="text-red-500 text-sm mt-1">
    {errors.message.message}
  </p>
)}
```

**Solution 4: Handle Form Submission**
```typescript
const onSubmit = handleSubmit(async (data) => {
  try {
    await sendMessage(data.message);
    // Show success message
  } catch (error) {
    // Show error message
  }
});

<form onSubmit={onSubmit}>
  {/* Form fields */}
</form>
```

---

## Issue 9: Navigation Not Working

### Symptoms
- Clicking sidebar links does nothing
- URL changes but page doesn't update
- Active link not highlighted

### Possible Causes
1. Using <a> instead of <Link>
2. Incorrect href paths
3. Active link logic incorrect

### Solutions

**Solution 1: Use Next.js Link**
```typescript
import Link from 'next/navigation';

// Correct
<Link href="/parent/analytics">Analytics</Link>

// Incorrect
<a href="/parent/analytics">Analytics</a>
```

**Solution 2: Verify Paths**
```typescript
// Paths must match folder structure
/parent          → app/parent/page.tsx
/parent/analytics → app/parent/analytics/page.tsx
/parent/schedule  → app/parent/schedule/page.tsx
```

**Solution 3: Highlight Active Link**
```typescript
import { usePathname } from 'next/navigation';

const pathname = usePathname();

<Link
  href="/parent/analytics"
  className={pathname === '/parent/analytics' ? 'bg-blue-100' : ''}
>
  Analytics
</Link>
```

---

## Issue 10: Mock API Not Responding

### Symptoms
- API calls fail with network error
- Console shows "Failed to fetch"
- CORS errors in console

### Possible Causes
1. Mock server not running
2. Wrong API URL
3. CORS not configured
4. Port conflict

### Solutions

**Solution 1: Start Mock Server**
```bash
# In separate terminal
cd vaishnavi-frontend
node mock-data/mock-api-server.js

# Should see: "Mock API server running on port 3001"
```

**Solution 2: Check API URL**
```typescript
// In API functions, use correct URL
const API_URL = process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:3001';

const response = await fetch(`${API_URL}/api/parent/dashboard/${parentId}`);
```

**Solution 3: Enable CORS in Mock Server**
```javascript
// In mock-api-server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for all routes
```

**Solution 4: Check Port Availability**
```bash
# If port 3001 is in use, change port
# In mock-api-server.js
const PORT = 3002;  // Use different port

# Update .env.local
NEXT_PUBLIC_MOCK_API_URL=http://localhost:3002
```

---

## Issue 11: TypeScript Errors

### Symptoms
- Red squiggly lines in editor
- Build fails with type errors
- "Property does not exist on type" errors

### Possible Causes
1. Types not defined
2. Incorrect type usage
3. Missing type imports

### Solutions

**Solution 1: Define All Types**
```typescript
// types/parent.ts
export interface ChildProfile {
  id: string;
  name: string;
  email: string;
  exam: 'JEE' | 'NEET';
  targetDate: string;
  profilePicture: string;
  overallProgress: number;
  studyStreak: number;
}

// Export all types
```

**Solution 2: Import Types Correctly**
```typescript
import type { ChildProfile, QuickStats } from '@/types/parent';

// Use in component
interface Props {
  child: ChildProfile;
  stats: QuickStats;
}
```

**Solution 3: Fix Type Mismatches**
```typescript
// If API returns string but type expects number
const progress = parseInt(data.overallProgress);  // Convert to number

// If property might be undefined
const name = child?.name ?? 'Unknown';  // Use optional chaining
```

---

## Issue 12: Performance Issues

### Symptoms
- Dashboard loads slowly
- Scrolling is laggy
- Charts take long to render
- High memory usage

### Possible Causes
1. Too many re-renders
2. Large data sets
3. Unoptimized images
4. Memory leaks

### Solutions

**Solution 1: Memoize Components**
```typescript
import { memo } from 'react';

const QuickStatsCard = memo(({ stat }) => {
  return (
    <div>{/* Card content */}</div>
  );
});
```

**Solution 2: Paginate Large Data**
```typescript
// Don't render all 1000 items at once
const [page, setPage] = useState(1);
const itemsPerPage = 10;
const paginatedData = data.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
```

**Solution 3: Optimize Images**
```typescript
import Image from 'next/image';

// Use Next.js Image component
<Image
  src={child.profilePicture}
  alt={child.name}
  width={80}
  height={80}
  className="rounded-full"
/>
```

**Solution 4: Clean Up Effects**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  
  // Clean up on unmount
  return () => clearInterval(interval);
}, []);
```

---

## Common Error Messages

### "useParent must be used within ParentProvider"
**Fix**: Ensure ParentProvider wraps the component tree in layout.tsx

### "Cannot read property 'map' of undefined"
**Fix**: Check if data exists before mapping: `data?.map()` or `data || []`

### "Hydration failed"
**Fix**: Ensure server and client render the same content. Use 'use client' for dynamic content.

### "Module not found: Can't resolve '@/types/parent'"
**Fix**: Check tsconfig.json has path alias configured: `"@/*": ["./*"]`

### "Failed to fetch"
**Fix**: Ensure mock API server is running and CORS is enabled

---

## Debugging Checklist

When something doesn't work, check:
- [ ] Dev server is running (`npm run dev`)
- [ ] Mock API server is running (`node mock-data/mock-api-server.js`)
- [ ] No errors in browser console (F12)
- [ ] No TypeScript errors in editor
- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables set in `.env.local`
- [ ] ParentProvider wraps layout
- [ ] Components marked as 'use client' if needed
- [ ] API URLs are correct
- [ ] Data format matches types
- [ ] Loading and error states handled

---

## Getting Help

If you're still stuck:

1. **Check Browser Console**: F12 → Console tab for errors
2. **Check Network Tab**: F12 → Network tab to see API calls
3. **Check React DevTools**: Install React DevTools extension
4. **Simplify**: Comment out code until it works, then add back
5. **Compare**: Check working examples from other days
6. **Search**: Search error message online
7. **Ask**: Provide error message, code snippet, and what you've tried

---

## Prevention Tips

To avoid issues:
- ✅ Test frequently (after each prompt)
- ✅ Check console for errors immediately
- ✅ Use TypeScript types consistently
- ✅ Handle loading and error states
- ✅ Test on different screen sizes
- ✅ Keep mock data realistic
- ✅ Follow naming conventions
- ✅ Comment complex logic
- ✅ Use ESLint and Prettier
- ✅ Commit working code frequently

---

## Next Steps

Issues resolved? Return to **TESTING.md** to continue verification, or proceed to **EXPECTED-OUTCOME.md** for the final checklist.

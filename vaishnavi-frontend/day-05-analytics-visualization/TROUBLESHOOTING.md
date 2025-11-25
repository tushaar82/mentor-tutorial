# Troubleshooting Guide for Day 5: Analytics Visualization

This document provides solutions to common issues you might encounter while building the analytics dashboard.

---

## Chart Rendering Issues

### Issue 1: Charts Not Rendering at All

**Symptoms**:
- Blank space where chart should be
- No errors in console
- Other content displays fine

**Possible Causes**:
1. Recharts not installed
2. Missing ResponsiveContainer
3. Data format incorrect
4. Component not imported

**Solutions**:

**Solution 1**: Verify Recharts installation
```bash
npm list recharts
# If not installed:
npm install recharts
```

**Solution 2**: Wrap chart in ResponsiveContainer
```typescript
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <Bar dataKey="value" fill="#10b981" />
  </BarChart>
</ResponsiveContainer>
```

**Solution 3**: Check data format
```typescript
// Correct format for BarChart
const data = [
  { name: 'Physics', value: 70 },
  { name: 'Chemistry', value: 75 },
  { name: 'Math', value: 72 },
];

// Incorrect format (will not render)
const data = [70, 75, 72]; // ❌ Missing name/value structure
```

**Solution 4**: Verify imports
```typescript
// Correct
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

// Incorrect
import BarChart from 'recharts'; // ❌ Named import required
```

---

### Issue 2: Chart Renders But Shows No Data

**Symptoms**:
- Chart axes visible
- No bars/lines/segments
- Tooltip doesn't work

**Possible Causes**:
1. Data is empty array
2. Wrong dataKey specified
3. Data not passed to chart
4. Data format mismatch

**Solutions**:

**Solution 1**: Check data is not empty
```typescript
console.log('Chart data:', data);
// Should show array with objects

if (!data || data.length === 0) {
  return <div>No data available</div>;
}
```

**Solution 2**: Verify dataKey matches data structure
```typescript
// Data structure
const data = [{ subject: 'Physics', score: 70 }];

// Correct dataKey
<Bar dataKey="score" /> // ✅

// Incorrect dataKey
<Bar dataKey="value" /> // ❌ 'value' doesn't exist in data
```

**Solution 3**: Ensure data prop is passed
```typescript
// Correct
<BarChart data={data}>

// Incorrect
<BarChart> // ❌ Missing data prop
```

---

### Issue 3: Gauge Chart Not Displaying Correctly

**Symptoms**:
- Gauge shows wrong percentage
- Gauge is empty
- Gauge colors wrong

**Possible Causes**:
1. Value not in 0-100 range
2. RadialBarChart config incorrect
3. Color logic wrong

**Solutions**:

**Solution 1**: Normalize value to 0-100
```typescript
// If value is decimal (0.725)
const percentage = value * 100; // Convert to 72.5

// If value is already percentage
const percentage = Math.min(100, Math.max(0, value)); // Clamp to 0-100
```

**Solution 2**: Check RadialBarChart config
```typescript
<RadialBarChart
  width={200}
  height={200}
  innerRadius="70%"
  outerRadius="100%"
  data={[{ value: percentage, fill: getColor(percentage) }]}
  startAngle={180}
  endAngle={0}
>
  <RadialBar dataKey="value" />
</RadialBarChart>
```

**Solution 3**: Fix color logic
```typescript
const getColor = (percentage: number) => {
  if (percentage >= 75) return '#10b981'; // Green
  if (percentage >= 50) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red
};
```

---

## Data Fetching Issues

### Issue 4: Analytics Data Not Loading

**Symptoms**:
- Loading state never ends
- Error: "Failed to fetch"
- Console shows network error

**Possible Causes**:
1. Mock API server not running
2. Wrong API URL
3. CORS error
4. Network error

**Solutions**:

**Solution 1**: Start mock API server
```bash
# Check if server is running
curl http://localhost:3001/api/analytics/test-123

# If not running, start it
node mock-data/mock-api-server.js
```

**Solution 2**: Verify API URL
```typescript
// In lib/api.ts or lib/analytics.ts
const API_BASE_URL = 'http://localhost:3001'; // Mock server
// OR
const API_BASE_URL = 'http://localhost:8000'; // Real backend

console.log('Fetching from:', `${API_BASE_URL}/api/analytics/${testId}`);
```

**Solution 3**: Fix CORS error
```javascript
// In mock-api-server.js
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));
```

**Solution 4**: Check network tab
- Open browser dev tools (F12)
- Go to Network tab
- Reload page
- Look for analytics API call
- Check status code and response

---

### Issue 5: Analytics Data Structure Mismatch

**Symptoms**:
- Data loads but charts show wrong values
- TypeScript errors about missing properties
- Undefined errors in console

**Possible Causes**:
1. Mock data doesn't match types
2. API response format changed
3. Missing fields in data

**Solutions**:

**Solution 1**: Verify mock data structure
```json
// In mock-api-responses.json
{
  "analyticsResponse": {
    "test_id": "test-123",
    "overall_score": {
      "obtained": 145,
      "total": 200,
      "percentage": 72.5
    },
    "subjects": [
      {
        "subject": "Physics",
        "obtained_marks": 45,
        "total_marks": 66,
        "percentage": 68.2
      }
    ],
    "topics": [...],
    "patterns": {...},
    "recommendations": {...}
  }
}
```

**Solution 2**: Add type checking
```typescript
// In useAnalytics hook
const analytics = await fetchAnalytics(testId);

// Validate structure
if (!analytics.overall_score || !analytics.subjects) {
  throw new Error('Invalid analytics data structure');
}
```

**Solution 3**: Add default values
```typescript
const subjects = analytics?.subjects || [];
const topics = analytics?.topics || [];
```

---

## Color Coding Issues

### Issue 6: Colors Not Showing Correctly

**Symptoms**:
- All bars same color
- Colors don't match performance levels
- Tailwind colors not working

**Possible Causes**:
1. Color logic incorrect
2. Tailwind colors not configured
3. Fill prop not set
4. CSS not loaded

**Solutions**:

**Solution 1**: Fix color logic
```typescript
const getPerformanceColor = (percentage: number) => {
  if (percentage >= 75) return '#10b981'; // Green
  if (percentage >= 50) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red
};

// Use in chart
<Bar dataKey="percentage" fill={getPerformanceColor(data.percentage)} />
```

**Solution 2**: Configure Tailwind colors
```javascript
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'chart-green': '#10b981',
        'chart-yellow': '#f59e0b',
        'chart-red': '#ef4444',
      },
    },
  },
};
```

**Solution 3**: Use Cell for individual colors
```typescript
<Bar dataKey="percentage">
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={getPerformanceColor(entry.percentage)} />
  ))}
</Bar>
```

---

## Responsive Design Issues

### Issue 7: Charts Overflow on Mobile

**Symptoms**:
- Horizontal scrolling on mobile
- Charts too wide
- Text cut off

**Possible Causes**:
1. Fixed width on charts
2. Missing ResponsiveContainer
3. Container not responsive

**Solutions**:

**Solution 1**: Use ResponsiveContainer
```typescript
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    {/* Chart content */}
  </BarChart>
</ResponsiveContainer>
```

**Solution 2**: Add responsive container classes
```typescript
<div className="w-full max-w-full overflow-hidden">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      {/* Chart content */}
    </BarChart>
  </ResponsiveContainer>
</div>
```

**Solution 3**: Adjust chart margins for mobile
```typescript
const isMobile = window.innerWidth < 768;

<BarChart
  data={data}
  margin={{
    top: 20,
    right: isMobile ? 10 : 30,
    left: isMobile ? 0 : 20,
    bottom: 5,
  }}
>
```

---

### Issue 8: Text Labels Too Small on Mobile

**Symptoms**:
- Can't read axis labels
- Legend text tiny
- Tooltip text small

**Possible Causes**:
1. Fixed font sizes
2. No responsive text sizing
3. Chart too small

**Solutions**:

**Solution 1**: Use responsive font sizes
```typescript
<XAxis
  dataKey="name"
  tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
/>
```

**Solution 2**: Rotate labels on mobile
```typescript
<XAxis
  dataKey="name"
  angle={window.innerWidth < 768 ? -45 : 0}
  textAnchor="end"
  height={60}
/>
```

**Solution 3**: Increase chart height on mobile
```typescript
const chartHeight = window.innerWidth < 768 ? 400 : 300;

<ResponsiveContainer width="100%" height={chartHeight}>
```

---

## Performance Issues

### Issue 9: Slow Chart Rendering

**Symptoms**:
- Page takes long to load
- Charts render slowly
- Laggy interactions

**Possible Causes**:
1. Too many data points
2. Complex calculations
3. Re-rendering unnecessarily
4. Large bundle size

**Solutions**:

**Solution 1**: Limit data points
```typescript
// For topic chart with many topics
const displayTopics = topics.slice(0, 20); // Show top 20 only
```

**Solution 2**: Memoize calculations
```typescript
import { useMemo } from 'react';

const chartData = useMemo(() => {
  return subjects.map(s => ({
    name: s.subject,
    value: s.percentage,
    color: getPerformanceColor(s.percentage),
  }));
}, [subjects]);
```

**Solution 3**: Use React.memo for chart components
```typescript
import React from 'react';

const BarChartComponent = React.memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Chart content */}
      </BarChart>
    </ResponsiveContainer>
  );
});
```

**Solution 4**: Lazy load charts
```typescript
import dynamic from 'next/dynamic';

const AnalyticsDashboard = dynamic(
  () => import('@/components/analytics/AnalyticsDashboard'),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
```

---

## TypeScript Issues

### Issue 10: Type Errors in Chart Components

**Symptoms**:
- TypeScript errors about missing properties
- "Type 'X' is not assignable to type 'Y'"
- Red squiggly lines in IDE

**Possible Causes**:
1. Missing type definitions
2. Incorrect prop types
3. Recharts types not installed

**Solutions**:

**Solution 1**: Install Recharts types
```bash
npm install --save-dev @types/recharts
```

**Solution 2**: Define proper interfaces
```typescript
interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: ChartData[];
  height?: number;
  colors?: {
    low: string;
    medium: string;
    high: string;
  };
}
```

**Solution 3**: Use type assertions carefully
```typescript
// If you're sure about the type
const chartData = data as ChartData[];

// Better: validate and transform
const chartData: ChartData[] = data.map(item => ({
  name: item.subject,
  value: item.percentage,
}));
```

---

## Tooltip Issues

### Issue 11: Tooltips Not Appearing

**Symptoms**:
- Hover over chart, no tooltip
- Tooltip component added but not visible
- No errors in console

**Possible Causes**:
1. Tooltip component not imported
2. Tooltip not added to chart
3. Z-index issue
4. Pointer events disabled

**Solutions**:

**Solution 1**: Import and add Tooltip
```typescript
import { BarChart, Bar, Tooltip } from 'recharts';

<BarChart data={data}>
  <Bar dataKey="value" />
  <Tooltip /> {/* Add this */}
</BarChart>
```

**Solution 2**: Customize Tooltip
```typescript
<Tooltip
  contentStyle={{
    backgroundColor: '#1f2937',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
  }}
  labelStyle={{ color: '#fff' }}
  itemStyle={{ color: '#fff' }}
/>
```

**Solution 3**: Fix z-index
```typescript
<div className="relative z-10">
  <ResponsiveContainer>
    <BarChart>
      <Tooltip />
    </BarChart>
  </ResponsiveContainer>
</div>
```

---

## Loading State Issues

### Issue 12: Loading State Not Showing

**Symptoms**:
- Page blank while loading
- No loading indicator
- Sudden appearance of content

**Possible Causes**:
1. Loading state not implemented
2. Loading state not returned from hook
3. Conditional rendering incorrect

**Solutions**:

**Solution 1**: Implement loading state in hook
```typescript
// In useAnalytics.ts
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalytics(testId);
      setAnalytics(data);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [testId]);

return { analytics, loading, error };
```

**Solution 2**: Show loading UI
```typescript
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
}
```

**Solution 3**: Use skeleton loaders
```typescript
if (loading) {
  return (
    <div className="space-y-6">
      <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
    </div>
  );
}
```

---

## Common Error Messages

### Error: "Cannot read property 'map' of undefined"

**Cause**: Data array is undefined

**Fix**:
```typescript
// Add optional chaining and default value
const subjects = analytics?.subjects || [];

subjects.map(subject => (
  <div key={subject.subject}>{subject.subject}</div>
))
```

---

### Error: "Hydration failed"

**Cause**: Server-rendered HTML doesn't match client-rendered HTML

**Fix**:
```typescript
// Add 'use client' directive
'use client';

// Or use dynamic import with ssr: false
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

---

### Error: "Module not found: Can't resolve 'recharts'"

**Cause**: Recharts not installed

**Fix**:
```bash
npm install recharts
# Restart dev server
npm run dev
```

---

## Getting More Help

If you're still stuck after trying these solutions:

1. **Check browser console**: Look for error messages
2. **Check network tab**: Verify API calls are working
3. **Check React DevTools**: Inspect component props and state
4. **Simplify**: Remove complexity until it works, then add back
5. **Search**: Google the exact error message
6. **Ask**: Post question with:
   - What you're trying to do
   - What's happening instead
   - Error messages
   - Code snippets
   - What you've tried

---

## Prevention Tips

To avoid issues in the future:

1. **Test incrementally**: Test each component as you build it
2. **Use TypeScript**: Catch errors at compile time
3. **Validate data**: Check data structure before using
4. **Handle errors**: Always have error handling
5. **Use defaults**: Provide default values for optional props
6. **Check types**: Ensure data matches expected types
7. **Test responsive**: Test on different screen sizes
8. **Monitor performance**: Use React DevTools Profiler

---

## Quick Reference

### Common Fixes Checklist

When something doesn't work, try these in order:

- [ ] Check browser console for errors
- [ ] Verify data is loading (console.log)
- [ ] Check component is imported correctly
- [ ] Verify props are passed correctly
- [ ] Check data format matches expected structure
- [ ] Ensure Recharts is installed
- [ ] Verify ResponsiveContainer is used
- [ ] Check Tailwind classes are correct
- [ ] Test in different browsers
- [ ] Restart dev server

---

**Still having issues? Don't hesitate to ask for help! Provide as much detail as possible about the problem.**

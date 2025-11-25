# Configuration Guide for Day 5: Analytics Visualization

This document provides step-by-step configuration instructions for setting up the analytics dashboard with Recharts.

---

## Step 1: Install Recharts Library

### What You're Doing
Installing Recharts, a composable charting library built on React components.

### Why This Matters
Recharts provides ready-to-use chart components (bar, pie, line, etc.) that are responsive and customizable.

### Command/Action
```bash
cd vaishnavi-frontend
npm install recharts
```

### Verification
```bash
npm list recharts
# Should show: recharts@2.x.x
```

### If It Fails
- **Issue**: npm install fails
- **Fix**: Try `npm install --legacy-peer-deps recharts`
- **Alternative**: Use `yarn add recharts` if using Yarn

---

## Step 2: Install React-to-PDF (Optional)

### What You're Doing
Installing library for PDF export functionality (optional feature).

### Why This Matters
Allows users to download analytics report as PDF.

### Command/Action
```bash
npm install react-to-pdf
```

### Verification
```bash
npm list react-to-pdf
# Should show: react-to-pdf@1.x.x
```

### If It Fails
- **Issue**: npm install fails
- **Fix**: This is optional, can skip if not implementing PDF export
- **Alternative**: Use browser print functionality instead

---

## Step 3: Configure Tailwind for Chart Colors

### What You're Doing
Adding custom colors to Tailwind config for chart color coding.

### Why This Matters
Consistent color scheme across charts and UI components.

### Command/Action

**Open**: `vaishnavi-frontend/tailwind.config.js`

**Add** these colors to the `extend.colors` section:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Chart colors
        'chart-green': '#10b981',    // For good performance (>75%)
        'chart-yellow': '#f59e0b',   // For average performance (50-75%)
        'chart-red': '#ef4444',      // For poor performance (<50%)
        'chart-blue': '#3b82f6',     // For neutral/info
        'chart-gray': '#6b7280',     // For unanswered/not visited
      },
    },
  },
}
```

### Verification
- Save the file
- Restart dev server: `npm run dev`
- No errors in console

### If It Fails
- **Issue**: Syntax error in config
- **Fix**: Ensure proper JSON syntax with commas
- **Check**: Make sure you're adding to existing `extend.colors` object

---

## Step 4: Test Recharts Import

### What You're Doing
Verifying Recharts components can be imported.

### Why This Matters
Ensures library is installed correctly before building charts.

### Command/Action

**Create test file**: `vaishnavi-frontend/test-recharts.tsx`

**Add this code**:
```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function TestChart() {
  const data = [
    { name: 'Physics', score: 70 },
    { name: 'Chemistry', score: 75 },
    { name: 'Math', score: 72 },
  ];

  return (
    <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="score" fill="#10b981" />
    </BarChart>
  );
}
```

### Verification
```bash
# Start dev server
npm run dev

# Open browser: http://localhost:3000
# Import and render TestChart component
# Should see a simple bar chart
```

### If It Fails
- **Issue**: Import errors
- **Fix**: Reinstall recharts: `npm uninstall recharts && npm install recharts`
- **Issue**: Chart not rendering
- **Fix**: Ensure component is client component (add 'use client' at top)

### Cleanup
Delete `test-recharts.tsx` after verification.

---

## Step 5: Configure Mock API Server

### What You're Doing
Ensuring mock API server has analytics endpoints.

### Why This Matters
Allows testing analytics UI without backend.

### Command/Action

**Verify**: `vaishnavi-frontend/mock-data/mock-api-server.js` has analytics endpoints

**Should have**:
```javascript
// GET /api/analytics/:testId
app.get('/api/analytics/:testId', (req, res) => {
  // Return mock analytics data
});
```

**If missing**: Use Prompt 17 from PROMPTS.md to generate

### Verification
```bash
# Start mock server
node mock-data/mock-api-server.js

# In another terminal, test endpoint
curl http://localhost:3001/api/analytics/test-123

# Should return JSON with analytics data
```

### If It Fails
- **Issue**: Endpoint not found (404)
- **Fix**: Regenerate mock server with Prompt 17
- **Issue**: Server won't start
- **Fix**: Check for syntax errors in mock-api-server.js

---

## Step 6: Configure API Base URL

### What You're Doing
Setting API base URL to point to mock server for testing.

### Why This Matters
Allows frontend to fetch data from mock server during development.

### Command/Action

**Open**: `vaishnavi-frontend/lib/api.ts`

**Verify** base URL is set:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

**Or for mock testing**:
```typescript
const API_BASE_URL = 'http://localhost:3001'; // Mock server
```

### Verification
- Save the file
- Analytics API calls should go to mock server

### If It Fails
- **Issue**: API calls fail
- **Fix**: Ensure mock server is running on port 3001
- **Check**: Browser console for CORS errors

---

## Step 7: Test Chart Responsiveness

### What You're Doing
Verifying charts resize properly on different screen sizes.

### Why This Matters
Charts should be readable on desktop, tablet, and mobile.

### Command/Action

**Open browser**: http://localhost:3000/analytics/test-123

**Test**:
1. Desktop view (1920x1080)
2. Tablet view (768x1024) - use browser dev tools
3. Mobile view (375x667) - use browser dev tools

**Check**:
- Charts resize to fit container
- Text labels remain readable
- No horizontal scrolling
- Tooltips work on all sizes

### Verification
- All charts visible and readable on all screen sizes
- No layout breaks
- Tooltips functional

### If It Fails
- **Issue**: Charts overflow container
- **Fix**: Use ResponsiveContainer from Recharts
- **Issue**: Text too small on mobile
- **Fix**: Adjust font sizes in chart config

---

## Step 8: Configure Chart Tooltips

### What You're Doing
Customizing tooltip appearance and content.

### Why This Matters
Tooltips provide detailed information on hover.

### Command/Action

**In chart components**, customize Tooltip:
```typescript
<Tooltip
  contentStyle={{
    backgroundColor: '#1f2937',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
  }}
  formatter={(value: number) => [`${value}%`, 'Score']}
/>
```

### Verification
- Hover over chart elements
- Tooltip appears with custom styling
- Shows formatted values

### If It Fails
- **Issue**: Tooltip not appearing
- **Fix**: Ensure Tooltip component is imported and added to chart
- **Issue**: Styling not applied
- **Fix**: Check contentStyle object syntax

---

## Step 9: Test Color Coding

### What You're Doing
Verifying performance-based color coding works correctly.

### Why This Matters
Colors provide quick visual feedback on performance levels.

### Command/Action

**Test with mock data**:
- Score > 75%: Should be green
- Score 50-75%: Should be yellow
- Score < 50%: Should be red

**Check in**:
- Subject performance bars
- Topic performance bars
- Gauge chart colors

### Verification
- Colors match performance thresholds
- Consistent across all charts
- Accessible (sufficient contrast)

### If It Fails
- **Issue**: Wrong colors
- **Fix**: Check color logic in chart components
- **Issue**: Colors not showing
- **Fix**: Verify Tailwind colors are configured

---

## Step 10: Test Loading States

### What You're Doing
Verifying loading indicators appear while fetching data.

### Why This Matters
Provides feedback to users during data loading.

### Command/Action

**Add delay to mock server** (for testing):
```javascript
app.get('/api/analytics/:testId', (req, res) => {
  setTimeout(() => {
    res.json(mockAnalyticsData);
  }, 2000); // 2 second delay
});
```

**Test**:
1. Navigate to analytics page
2. Should see loading spinner/skeleton
3. After 2 seconds, charts appear

### Verification
- Loading state visible during fetch
- Smooth transition to loaded state
- No layout shift when data loads

### If It Fails
- **Issue**: No loading state
- **Fix**: Check useAnalytics hook returns loading state
- **Issue**: Layout shifts
- **Fix**: Use skeleton loaders with same dimensions as charts

---

## Configuration Complete! ✅

You've successfully configured:
- ✅ Recharts library installed
- ✅ Custom chart colors in Tailwind
- ✅ Mock API server with analytics endpoints
- ✅ API base URL configured
- ✅ Chart responsiveness tested
- ✅ Tooltips customized
- ✅ Color coding verified
- ✅ Loading states tested

**Next Steps:**
1. Open **TESTING.md** to test the complete analytics dashboard
2. Verify all charts render correctly
3. Test with different mock data scenarios

**Ready to test? Open TESTING.md!**

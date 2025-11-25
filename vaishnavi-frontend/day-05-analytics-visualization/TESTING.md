# Testing Guide for Day 5: Analytics Visualization

This document provides step-by-step testing instructions to verify the analytics dashboard works correctly.

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ Recharts installed (`npm list recharts`)
- ✅ Mock API server configured with analytics endpoints
- ✅ Dev server running (`npm run dev`)
- ✅ Mock API server running (`node mock-data/mock-api-server.js`)

---

## Test 1: Verify Analytics Page Loads

### Steps
1. Start dev server: `npm run dev`
2. Start mock API server: `node mock-data/mock-api-server.js`
3. Open browser: `http://localhost:3000/analytics/test-123`
4. Wait for page to load

### Expected Result
- Page loads without errors
- Loading state appears briefly
- Analytics dashboard renders
- No console errors

### If It Fails
- **Issue**: 404 Not Found
- **Fix**: Check file exists at `app/analytics/[testId]/page.tsx`
- **Issue**: Blank page
- **Fix**: Check browser console for errors
- **Issue**: Loading forever
- **Fix**: Verify mock API server is running and returning data

---

## Test 2: Verify Overall Score Display

### Steps
1. Navigate to analytics page
2. Look at top section (Overall Score)
3. Check all elements are visible

### Expected Result
- Large score display: "145/200 (72.5%)"
- Interpretation badge: "Good Performance" (colored)
- Gauge chart showing 72.5%
- Percentile: "Top 35%" or similar
- Time taken: "2h 45m / 3h"

### If It Fails
- **Issue**: Score not displaying
- **Fix**: Check OverallScore component receives correct props
- **Issue**: Gauge chart not rendering
- **Fix**: Verify GaugeChart component imports Recharts correctly
- **Issue**: Wrong calculations
- **Fix**: Check mock data in mock-api-responses.json

---

## Test 3: Verify Subject Performance Chart

### Steps
1. Scroll to "Subject-Wise Performance" section
2. Check bar chart displays
3. Hover over bars

### Expected Result
- Bar chart with 3 bars (Physics, Chemistry, Math)
- Bars colored based on performance:
  - Green if > 75%
  - Yellow if 50-75%
  - Red if < 50%
- Tooltip appears on hover showing exact score
- Legend visible
- X-axis shows subject names
- Y-axis shows percentage (0-100%)

### If It Fails
- **Issue**: Chart not rendering
- **Fix**: Check BarChart component imports and props
- **Issue**: Wrong colors
- **Fix**: Verify color logic in SubjectPerformance component
- **Issue**: Tooltip not working
- **Fix**: Ensure Tooltip component is added to BarChart

---

## Test 4: Verify Topic Performance Chart

### Steps
1. Scroll to "Topic-Wise Performance" section
2. Check horizontal bar chart displays
3. Try sort controls (if implemented)
4. Hover over bars

### Expected Result
- Horizontal bar chart with all topics (15-20 bars)
- Bars colored by performance level
- Topics sorted (default: by score, lowest first)
- Sort controls work (by score, weightage, name)
- Tooltip shows topic details
- High-weightage weak topics highlighted with icon

### If It Fails
- **Issue**: Chart not rendering
- **Fix**: Check HorizontalBarChart component
- **Issue**: Sort not working
- **Fix**: Verify sort logic in TopicPerformance component
- **Issue**: Too many topics, chart too tall
- **Fix**: Add scrolling or pagination

---

## Test 5: Verify Strengths and Weaknesses

### Steps
1. Scroll to "Strengths and Weaknesses" section
2. Check both columns display
3. Count badges in each column

### Expected Result
- Two-column layout (strengths left, weaknesses right)
- Strengths section:
  - Green badges
  - Topics with > 75% score
  - Sorted by score (highest first)
  - Congratulatory message
- Weaknesses section:
  - Red badges
  - Topics with < 50% score
  - Sorted by weightage (highest first)
  - Encouraging message
- Each badge shows: topic name, score %, weightage

### If It Fails
- **Issue**: No strengths/weaknesses
- **Fix**: Check mock data has topics with varied scores
- **Issue**: Wrong filtering
- **Fix**: Verify threshold logic (>75% for strengths, <50% for weaknesses)
- **Issue**: Layout broken on mobile
- **Fix**: Check responsive classes (stack columns on mobile)

---

## Test 6: Verify Question Pattern Analysis

### Steps
1. Scroll to "Question Pattern Analysis" section
2. Check pie chart displays
3. Check difficulty breakdown table
4. Hover over pie segments

### Expected Result
- Pie chart with 3 segments:
  - Green: Correct answers
  - Red: Incorrect answers
  - Gray: Unanswered
- Percentages shown on segments
- Legend visible
- Tooltip on hover
- Difficulty-wise breakdown table below
- Average time per question displayed
- Negative marking impact shown

### If It Fails
- **Issue**: Pie chart not rendering
- **Fix**: Check PieChart component and data format
- **Issue**: Percentages wrong
- **Fix**: Verify calculation logic
- **Issue**: Colors not showing
- **Fix**: Ensure Cell components have fill prop

---

## Test 7: Verify AI Recommendations

### Steps
1. Scroll to "AI-Powered Recommendations" section
2. Read all recommendation content
3. Check formatting

### Expected Result
- Section title with AI icon/badge
- Priority topics list (badges)
- Study approach (paragraph text)
- Estimated improvement time
- Next steps (numbered list)
- Motivational message (highlighted)
- All text readable and well-formatted

### If It Fails
- **Issue**: Recommendations not showing
- **Fix**: Check mock data has recommendations object
- **Issue**: Text formatting broken
- **Fix**: Verify Tailwind classes for typography
- **Issue**: Too much text, overwhelming
- **Fix**: Consider truncating or collapsing long text

---

## Test 8: Verify Action Buttons

### Steps
1. Scroll to bottom (Action Buttons section)
2. Check all 4 buttons are visible
3. Click each button

### Expected Result
- 4 buttons visible:
  - "Generate Study Schedule" (primary, blue)
  - "Practice Weak Topics" (secondary, gray)
  - "Download Report" (outline)
  - "Share with Parent" (outline)
- Buttons responsive (stack on mobile)
- Click "Generate Study Schedule": Navigate to `/schedule/test-123`
- Click "Practice Weak Topics": Navigate to `/practice`
- Click "Download Report": Trigger download (or show message)
- Click "Share": Open share dialog (or show message)

### If It Fails
- **Issue**: Buttons not visible
- **Fix**: Check AnalyticsActions component renders
- **Issue**: Navigation not working
- **Fix**: Verify Next.js Link components
- **Issue**: Download/Share not working
- **Fix**: These can be placeholder functions for now

---

## Test 9: Test Responsive Design

### Steps
1. Open analytics page in browser
2. Open browser dev tools (F12)
3. Toggle device toolbar (Ctrl+Shift+M)
4. Test different screen sizes:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667

### Expected Result
- **Desktop**:
  - Two-column layout for strengths/weaknesses
  - Charts full width
  - All content visible without scrolling horizontally
- **Tablet**:
  - Charts resize appropriately
  - Text remains readable
  - Buttons stack if needed
- **Mobile**:
  - Single column layout
  - Charts resize to fit screen
  - Strengths/weaknesses stack vertically
  - Buttons stack vertically
  - No horizontal scrolling

### If It Fails
- **Issue**: Horizontal scrolling on mobile
- **Fix**: Add `overflow-x-hidden` to container
- **Issue**: Charts too small on mobile
- **Fix**: Adjust chart height/width for mobile
- **Issue**: Text too small
- **Fix**: Use responsive text sizes (text-sm md:text-base)

---

## Test 10: Test Loading States

### Steps
1. Add delay to mock API server (see CONFIGURATION.md Step 10)
2. Navigate to analytics page
3. Observe loading state
4. Wait for data to load

### Expected Result
- Loading spinner or skeleton appears immediately
- Loading state shows for ~2 seconds
- Smooth transition to loaded state
- No layout shift when data loads
- Charts appear with animation (if implemented)

### If It Fails
- **Issue**: No loading state
- **Fix**: Check useAnalytics hook returns loading state
- **Fix**: Verify AnalyticsDashboard shows loading UI
- **Issue**: Layout shifts when data loads
- **Fix**: Use skeleton loaders with same dimensions as final charts

---

## Test 11: Test Error Handling

### Steps
1. Stop mock API server
2. Navigate to analytics page
3. Observe error state

### Expected Result
- Error message appears: "Failed to load analytics"
- Retry button visible
- Click retry: Attempts to fetch again
- Helpful error message (not technical jargon)

### If It Fails
- **Issue**: No error state
- **Fix**: Check useAnalytics hook handles errors
- **Fix**: Verify AnalyticsDashboard shows error UI
- **Issue**: Unhelpful error message
- **Fix**: Improve error message text

---

## Test 12: Test with Different Mock Data

### Steps
1. Edit `mock-api-responses.json`
2. Change analytics data:
   - Test with high scores (>90%)
   - Test with low scores (<40%)
   - Test with all subjects equal
   - Test with no weaknesses
   - Test with no strengths
3. Reload analytics page for each scenario

### Expected Result
- **High scores**: All green colors, many strengths, few/no weaknesses
- **Low scores**: All red colors, many weaknesses, few/no strengths
- **Equal scores**: All same color, balanced display
- **No weaknesses**: Weaknesses section shows encouraging message
- **No strengths**: Strengths section shows motivational message

### If It Fails
- **Issue**: Colors don't change
- **Fix**: Verify color logic uses correct thresholds
- **Issue**: Empty sections break layout
- **Fix**: Add empty state messages
- **Issue**: Calculations wrong
- **Fix**: Check percentage calculation logic

---

## Test 13: Test Chart Interactions

### Steps
1. Navigate to analytics page
2. Interact with each chart:
   - Hover over bars/segments
   - Click legend items (if interactive)
   - Resize browser window

### Expected Result
- **Hover**: Tooltip appears with details
- **Legend click**: Toggle data series (if implemented)
- **Resize**: Charts resize smoothly
- **Animations**: Smooth transitions (if implemented)

### If It Fails
- **Issue**: Tooltips not appearing
- **Fix**: Ensure Tooltip component added to all charts
- **Issue**: Charts don't resize
- **Fix**: Use ResponsiveContainer from Recharts
- **Issue**: Interactions laggy
- **Fix**: Optimize chart rendering (use React.memo if needed)

---

## Test 14: Test Browser Compatibility

### Steps
1. Test analytics page in different browsers:
   - Chrome/Chromium
   - Firefox
   - Safari (if on Mac)
   - Edge

### Expected Result
- Page loads in all browsers
- Charts render correctly
- Colors display correctly
- Interactions work
- No console errors

### If It Fails
- **Issue**: Charts not rendering in specific browser
- **Fix**: Check Recharts browser compatibility
- **Issue**: Colors different in Safari
- **Fix**: Use standard color formats (hex, rgb)
- **Issue**: Layout broken in Firefox
- **Fix**: Test Tailwind classes in Firefox

---

## Test 15: Test Performance

### Steps
1. Open browser dev tools
2. Go to Performance tab
3. Record page load
4. Navigate to analytics page
5. Stop recording
6. Analyze results

### Expected Result
- Page loads in < 3 seconds
- Charts render in < 1 second after data loads
- No performance warnings
- Smooth scrolling
- No memory leaks

### If It Fails
- **Issue**: Slow page load
- **Fix**: Optimize bundle size, lazy load components
- **Issue**: Slow chart rendering
- **Fix**: Reduce number of data points, optimize chart config
- **Issue**: Memory leaks
- **Fix**: Clean up useEffect hooks, remove event listeners

---

## Testing Complete! ✅

You've successfully tested:
- ✅ Analytics page loads
- ✅ Overall score displays correctly
- ✅ Subject performance chart works
- ✅ Topic performance chart works
- ✅ Strengths and weaknesses display
- ✅ Question pattern analysis works
- ✅ AI recommendations display
- ✅ Action buttons work
- ✅ Responsive design works
- ✅ Loading states work
- ✅ Error handling works
- ✅ Different data scenarios work
- ✅ Chart interactions work
- ✅ Browser compatibility verified
- ✅ Performance acceptable

**Next Steps:**
1. Open **EXPECTED-OUTCOME.md** to verify success criteria
2. Check off all items in the success checklist
3. If all tests pass, mark Day 5 as complete!

**Ready to verify? Open EXPECTED-OUTCOME.md!**

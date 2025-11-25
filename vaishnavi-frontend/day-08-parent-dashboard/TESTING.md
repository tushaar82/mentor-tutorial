# Testing Guide for Day 8: Parent Dashboard

## Overview

This guide provides step-by-step testing instructions to verify all parent dashboard features work correctly. Test with mock data to ensure standalone functionality.

**Total Time**: 30 minutes

---

## Prerequisites

Before testing, ensure:
- ✅ All code generated from PROMPTS.md
- ✅ All configurations from CONFIGURATION.md completed
- ✅ Dev server running: `npm run dev`
- ✅ Mock API server running: `node mock-data/mock-api-server.js`

---

## Test 1: Dashboard Overview Display

### Steps
1. Open browser: `http://localhost:3000/parent`
2. Wait for data to load (should see loading skeletons first)
3. Verify dashboard overview displays

### Expected Result
**Child Profile Card:**
- Profile picture displayed (circular)
- Child name: "Rahul Sharma"
- Exam badge: "JEE" (blue badge)
- Target date: "15 May 2025"
- Days remaining: "X days left" (with appropriate color)
- Overall progress: Circular progress ring showing 68%

**Quick Stats Cards (4 cards):**
1. Diagnostic Score: 72/100, 85th percentile, trophy icon
2. Topics Mastered: 45/60 (75%), book icon
3. Practice Questions: 1,247, target icon
4. Schedule Adherence: 82%, calendar icon, trend arrow

**Activity Timeline:**
- Shows last 7 activities
- Each with icon, description, relative timestamp
- Example: "Completed Physics practice - 15 questions" "2 hours ago"

**Alerts Panel:**
- Shows important alerts
- Color-coded by severity
- Example: "No practice in 2 days - Encourage your child" (yellow)

### If It Fails
- Check: Mock API server is running
- Check: ParentProvider wraps the layout
- Check: API URL in environment variables
- Check: Browser console for errors

---

## Test 2: Performance Analytics Page

### Steps
1. Click "Analytics" in sidebar navigation
2. Navigate to: `http://localhost:3000/parent/analytics`
3. Wait for charts to load

### Expected Result
**Subject Breakdown (Bar Chart):**
- Three horizontal bars: Physics (72%), Chemistry (65%), Math (78%)
- Color-coded: Green (>75%), Yellow (50-75%), Red (<50%)
- Percentages displayed on bars

**Topic Mastery Heatmap:**
- Grid of topic cells (10x6)
- Each cell colored by mastery level
- Hover shows tooltip with topic name and percentage
- Color scale: Red → Yellow → Green

**Score Trends (Line Chart):**
- X-axis: Last 30 days
- Y-axis: Score (0-100%)
- Three lines: Physics, Chemistry, Math
- Dashed line: Target score (75%)
- Legend at bottom

**Strengths and Weaknesses:**
- Left column: Top 5 strong topics (green)
- Right column: Top 5 weak topics (red) with "Practice Now" buttons

**Predicted Exam Readiness:**
- Large circular progress: 68%
- Explanation text below

### If It Fails
- Check: Recharts installed correctly
- Check: Chart dimensions hook working
- Check: Mock data includes performance analytics
- Check: Charts are in client components ('use client')

---

## Test 3: Schedule Tracking Page

### Steps
1. Click "Schedule" in sidebar
2. Navigate to: `http://localhost:3000/parent/schedule`
3. Verify schedule tracking displays

### Expected Result
**Weekly Calendar:**
- 7 day cards (Mon-Sun)
- Each shows: Date, tasks completed/total, circular progress
- Color coding:
  - Green: 100% completion
  - Yellow: 50-99% completion
  - Red: <50% completion
  - Gray: 0% completion

**Adherence Metrics (3 cards):**
- This week: 85% (6/7 days)
- This month: 78% (23/30 days)
- Overall: 82%
- Each with trend indicator (up/down arrow)

**Time Spent Statistics:**
- Today: 3.5 hours
- This week: 24 hours (bar chart by day)
- Average per day: 3.4 hours

**Study Pattern Analysis:**
- Best study time: "6 PM - 9 PM"
- Most productive day: "Sunday"
- Consistency score: 85%

**Missed Sessions List:**
- Shows last 5 missed sessions
- Each with: Date, topic, reason
- "Reschedule" button for each

### If It Fails
- Check: Calendar component renders correctly
- Check: Bar chart for time spent displays
- Check: Mock data includes schedule tracking
- Check: Date formatting works correctly

---

## Test 4: Practice Activity Page

### Steps
1. Click "Practice" in sidebar
2. Navigate to: `http://localhost:3000/parent/practice`
3. Verify practice statistics display

### Expected Result
**Overall Statistics (4 cards):**
- Total questions: 1,247
- Correct answers: 892 (71.5%)
- Topics practiced: 45/60
- Average accuracy: 71.5%

**Topic-wise Breakdown (Table):**
- Columns: Topic, Subject, Questions, Accuracy, Last Practiced
- Sortable by clicking column headers
- Color-coded accuracy: Red (<50%), Yellow (50-75%), Green (>75%)
- Shows 10 rows with pagination

**Accuracy Trends (Line Chart):**
- X-axis: Last 30 days
- Y-axis: Accuracy percentage
- Shows overall accuracy trend
- Target line at 75%

**Most Practiced Topics (Top 5):**
- Topic name, questions count, horizontal bar chart

**Least Practiced Topics (Bottom 5):**
- Topic name, questions count, "Needs attention" badge
- "Encourage practice" button

**Practice Session History:**
- Last 10 sessions
- Each shows: Date, topic, questions, accuracy, duration
- Expandable rows for details

### If It Fails
- Check: Table sorting functionality works
- Check: Line chart renders correctly
- Check: Mock data includes practice activity
- Check: Pagination works if more than 10 rows

---

## Test 5: Teaching Resources Page

### Steps
1. Click "Resources" in sidebar
2. Navigate to: `http://localhost:3000/parent/resources`
3. Test language switching and resource display

### Expected Result
**Language Selector:**
- Dropdown in top-right: English, Hindi, Marathi
- Selecting language updates all resource content

**Resource Categories (Tabs):**
- Weak Topics (personalized)
- General Study Tips
- Exam Strategies
- Motivation Techniques

**Resource Cards (Grid):**
Each card shows:
- Topic name and subject
- Teaching tips section (expandable)
- Practice exercises section (expandable)
- Common mistakes section (expandable)
- Helpful analogies section (expandable)
- Audio playback button (speaker icon)
- Download PDF button

**Search and Filter:**
- Search bar filters by topic name
- Subject filter dropdown (Physics, Chemistry, Math)

### Test Language Switching
1. Select "Hindi" from language dropdown
2. Verify resource content changes to Hindi
3. Select "Marathi"
4. Verify resource content changes to Marathi
5. Select "English" to return to default

### Test Audio Playback
1. Click audio button on a resource card
2. Verify audio plays (or shows "Audio not available" if mock)

### Test PDF Download
1. Click "Download PDF" button
2. Verify PDF download starts (or shows download dialog)

### If It Fails
- Check: Language selector updates state correctly
- Check: Resource cards render with all sections
- Check: Audio element exists (even if mock)
- Check: PDF generation function is called

---

## Test 6: AI Insights Page

### Steps
1. Click "Insights" in sidebar
2. Navigate to: `http://localhost:3000/parent/insights`
3. Verify AI insights display

### Expected Result
**Weekly Insights Summary (Card):**
- AI-generated summary paragraph
- Key highlights (3-5 bullet points)
- Generated date

**Areas Needing Attention (List):**
- Topic name, reason, severity badge
- Color-coded: Red (high), Yellow (medium), Blue (low)
- "View details" button for each

**Improvement Suggestions (Cards):**
- Suggestion title
- Description text
- Actionable steps (numbered list)
- "Mark as done" button

**Study Habit Recommendations:**
- Best study time: "Evening (6-9 PM)"
- Break recommendations: "10 minutes every hour"
- Environment tips
- Based on child's patterns

**Milestone Celebrations:**
- Achievement icon (trophy, star, etc.)
- Achievement title: "50 topics mastered!"
- Description
- Date achieved
- Confetti animation on new milestone (if enabled)

**Intervention Alerts:**
- "No practice in 3 days" (red alert)
- "Declining performance in Thermodynamics" (yellow alert)
- Action buttons: "Send reminder", "View topic"

### Test Confetti Animation
1. If new milestone exists, verify confetti animation plays
2. Animation should be brief (2-3 seconds)

### If It Fails
- Check: Insights data loads from API
- Check: Severity colors display correctly
- Check: Confetti library installed (react-confetti)
- Check: Action buttons are clickable

---

## Test 7: Communication Center

### Steps
1. Click "Communication" in sidebar (if available)
2. Or access from dashboard via "Send message" button
3. Test all communication features

### Expected Result
**Send Encouragement Message:**
- Text area for message (max 500 characters)
- Character count display
- Template dropdown with pre-written messages
- "Send" button
- Success message after sending

**Set Study Reminders:**
- Time picker (hours and minutes)
- Topic selector dropdown
- Frequency selector (once, daily, weekly)
- "Set reminder" button
- Confirmation message

**Schedule Review Session:**
- Date picker (calendar)
- Time picker
- Topic selector
- Duration selector (30 min, 1 hour, 2 hours)
- Notes field (optional)
- "Schedule" button
- Confirmation message

**Notes and Observations:**
- List of parent's private notes
- "Add note" button
- Each note: text, date, edit/delete buttons
- Notes are date-stamped

**Goal Setting:**
- "Set weekly goal" button
- Goal input field
- Target date picker
- Progress tracking
- "Mark complete" button

**Message History:**
- List of past messages sent
- Each shows: message text, timestamp, read status
- Filter by type (encouragement, reminder, session)

### Test Form Validation
1. Try sending empty message → Should show error
2. Try setting reminder without time → Should show error
3. Try scheduling session without date → Should show error

### If It Fails
- Check: react-hook-form installed and configured
- Check: Form validation rules defined
- Check: Date/time pickers render correctly
- Check: API calls for sending messages work

---

## Test 8: PDF Report Generation

### Steps
1. From any page, click "Generate Report" button (usually in header)
2. Or navigate to dashboard and click "Download Report"
3. Wait for PDF generation

### Expected Result
**PDF Report Contents:**
1. Cover page:
   - Title: "Progress Report"
   - Child name: "Rahul Sharma"
   - Report date: Current date
   - Exam: "JEE"
   - Target date: "15 May 2025"

2. Executive summary (page 2):
   - Overall progress: 68%
   - Key achievements (bullet points)
   - Areas needing attention (bullet points)

3. Performance analytics (page 3):
   - Subject-wise breakdown (table)
   - Topic mastery summary
   - Score trends (chart as image)

4. Practice activity (page 4):
   - Total questions: 1,247
   - Accuracy: 71.5%
   - Most/least practiced topics

5. Schedule adherence (page 5):
   - Adherence: 82%
   - Time spent: 24 hours/week
   - Missed sessions list

6. AI insights (page 6):
   - Weekly insights
   - Recommendations
   - Next steps

7. Footer on each page:
   - Page number
   - Generated date
   - "Mentor AI - EdTech Platform"

**PDF Download:**
- File downloads as: `progress-report-rahul-sharma-YYYY-MM-DD.pdf`
- File opens in PDF viewer
- All pages formatted correctly
- Charts visible as images

### If It Fails
- Check: jsPDF installed correctly
- Check: PDF generation function doesn't have errors
- Check: Charts convert to images before adding to PDF
- Check: Browser allows PDF downloads

---

## Test 9: Parent Settings Page

### Steps
1. Click "Settings" in sidebar
2. Navigate to: `http://localhost:3000/parent/settings`
3. Test all settings options

### Expected Result
**Notification Preferences (Toggles):**
- Daily progress summary (on/off)
- Weekly insights (on/off)
- Alert notifications (on/off)
- Email notifications (on/off)
- Each toggle works independently

**Language Selection (Dropdown):**
- Options: English, Hindi, Marathi
- Selecting language shows confirmation
- Applies to teaching resources

**Report Frequency (Radio Buttons):**
- Daily digest
- Weekly summary
- Monthly report
- Only one can be selected

**Privacy Settings (Toggles):**
- Share progress with teachers (on/off)
- Allow data analytics (on/off)

**Child Profile Management (Form):**
- Update exam date (date picker)
- Update target scores (number inputs)
- Update profile picture (file upload)

**Save Button:**
- At bottom of page
- Disabled if no changes
- Enabled when changes made
- Shows loading spinner while saving
- Success toast: "Settings saved successfully"
- Error toast if save fails

### Test Settings Persistence
1. Change notification preferences
2. Click "Save"
3. Navigate away from settings page
4. Return to settings page
5. Verify changes are still applied

### If It Fails
- Check: Form state management works
- Check: API call to update settings succeeds
- Check: Toast notifications display
- Check: Settings persist in context/state

---

## Test 10: Responsive Design

### Steps
1. Open parent dashboard in browser
2. Open browser DevTools (F12)
3. Toggle device toolbar (Ctrl+Shift+M)
4. Test different screen sizes

### Expected Result
**Desktop (1280px+):**
- Sidebar visible on left
- 4-column grid for stats cards
- Charts display full width
- Tables show all columns

**Tablet (768px - 1024px):**
- Sidebar visible or collapsible
- 2-column grid for stats cards
- Charts responsive width
- Tables may scroll horizontally

**Mobile (< 768px):**
- Hamburger menu for navigation
- Drawer sidebar (slides in from left)
- 1-column grid for stats cards
- Charts stack vertically
- Tables scroll horizontally
- Touch-friendly buttons (larger)

### Test Navigation on Mobile
1. Set viewport to 375px (iPhone)
2. Click hamburger menu icon
3. Verify drawer opens
4. Click navigation item
5. Verify drawer closes
6. Verify page navigates

### Test Charts on Mobile
1. Verify charts resize to fit screen
2. Verify charts maintain readability
3. Verify tooltips work on touch

### If It Fails
- Check: Tailwind responsive classes applied
- Check: Hamburger menu toggle works
- Check: Charts use responsive dimensions
- Check: Touch events work on mobile

---

## Test 11: Loading and Error States

### Steps
1. Simulate slow network (DevTools → Network → Slow 3G)
2. Refresh parent dashboard
3. Observe loading states

### Expected Result
**Loading States:**
- Loading skeletons display immediately
- Skeletons match layout of actual content
- Smooth transition from skeleton to content
- No layout shift when content loads

**Error States:**
- If API fails, error message displays
- Error message: "Failed to load dashboard data"
- "Retry" button available
- Clicking retry attempts to reload data

### Test Error Handling
1. Stop mock API server
2. Refresh dashboard
3. Verify error message displays
4. Start mock API server
5. Click "Retry" button
6. Verify data loads successfully

### If It Fails
- Check: Loading skeletons created
- Check: Error boundaries implemented
- Check: Retry logic works
- Check: Error messages are user-friendly

---

## Test 12: Navigation and Routing

### Steps
1. Test all navigation links in sidebar
2. Test browser back/forward buttons
3. Test direct URL access

### Expected Result
**Sidebar Navigation:**
- Dashboard → `/parent`
- Analytics → `/parent/analytics`
- Schedule → `/parent/schedule`
- Practice → `/parent/practice`
- Resources → `/parent/resources`
- Insights → `/parent/insights`
- Settings → `/parent/settings`

**Active Link Highlighting:**
- Current page link highlighted (blue background)
- Other links normal state

**Browser Navigation:**
- Back button returns to previous page
- Forward button goes to next page
- URL updates correctly

**Direct URL Access:**
- Typing `/parent/analytics` directly works
- Page loads with correct data
- No 404 errors

### If It Fails
- Check: Next.js routing configured correctly
- Check: All page files exist in app/parent/
- Check: Active link logic works
- Check: Layout persists across routes

---

## Final Verification Checklist

Before moving to next task, verify:
- [ ] Dashboard overview displays all sections correctly
- [ ] Performance analytics shows charts and visualizations
- [ ] Schedule tracking displays calendar and metrics
- [ ] Practice activity shows statistics and history
- [ ] Teaching resources display with language switching
- [ ] AI insights show recommendations and alerts
- [ ] Communication center allows sending messages
- [ ] PDF report generates and downloads successfully
- [ ] Settings page allows updating preferences
- [ ] Responsive design works on all screen sizes
- [ ] Loading skeletons display while data loads
- [ ] Error states handle failures gracefully
- [ ] Navigation works correctly across all pages
- [ ] No console errors in browser DevTools
- [ ] All interactive elements are clickable
- [ ] Forms validate input correctly
- [ ] Mock API provides realistic data

---

## Success Criteria

✅ **All tests passing** means:
- Parent dashboard loads without errors
- All pages accessible via navigation
- Charts and visualizations render correctly
- Forms work with validation
- PDF generation succeeds
- Responsive design works on mobile/tablet/desktop
- Loading and error states display appropriately
- Mock data integration works for standalone testing

---

## Next Steps

All tests passing? Great! Move to **EXPECTED-OUTCOME.md** to review the complete success checklist.

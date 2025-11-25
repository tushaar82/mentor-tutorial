# AI Coding Agent Prompts for Day 5: Analytics Visualization

This document contains all prompts needed to generate the analytics dashboard code for Day 5. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Analytics Types

### Purpose
Define TypeScript types for analytics data, charts, and API responses.

### When to Use
Start with this to establish type safety for all analytics components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/analytics.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for analytics system
// Include: AnalyticsData, SubjectPerformance, TopicPerformance, QuestionPattern, Recommendation
// Support overall score, subject breakdown, topic breakdown, strengths, weaknesses
// Add proper type safety for all analytics operations
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for analytics dashboard in a Next.js EdTech platform.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/types/analytics.ts

GENERATE:
TypeScript interfaces and types for analytics visualization

REQUIREMENTS:
1. AnalyticsData interface:
   - test_id: string
   - student_id: string
   - overall_score: { obtained: number, total: number, percentage: number }
   - percentile: number
   - time_taken: number (seconds)
   - interpretation: "Excellent" | "Good" | "Average" | "Needs Improvement"

2. SubjectPerformance interface:
   - subject: string
   - obtained_marks: number
   - total_marks: number
   - percentage: number
   - correct_answers: number
   - incorrect_answers: number
   - unanswered: number

3. TopicPerformance interface:
   - topic: string
   - subject: string
   - obtained_marks: number
   - total_marks: number
   - percentage: number
   - weightage: number
   - questions_attempted: number
   - correct_answers: number

4. QuestionPattern interface:
   - correct: number
   - incorrect: number
   - unanswered: number
   - difficulty_wise: { easy: number, medium: number, hard: number }
   - average_time_per_question: number
   - negative_marking_impact: number

5. Recommendation interface:
   - priority_topics: string[]
   - study_approach: string
   - estimated_improvement_time: string
   - next_steps: string[]
   - motivational_message: string

6. AnalyticsResponse interface combining all above
7. Add JSDoc comments for each type
8. Export all types

OUTPUT FORMAT:
- Complete TypeScript file with all types
- Include all imports
- Add detailed JSDoc comments
```

**What You'll Get**: Complete TypeScript types file

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/types/analytics.ts`
3. Paste and save

---

## Prompt 2: Create Analytics API Helper Functions

### Purpose
Build helper functions for analytics API calls (fetch analytics).

### When to Use
Create this before building UI components to handle API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/analytics.ts`

**Step 2**: Type this comment:
```typescript
// Create analytics API helper functions
// Functions: fetchAnalytics, downloadAnalyticsReport
// Call backend API at /api/analytics endpoints
// Return typed responses with error handling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create analytics API helper functions for a Next.js frontend.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/analytics.ts
- Backend API: http://localhost:8000/api/analytics

GENERATE:
Analytics helper functions that call backend API

FUNCTIONS NEEDED:
1. fetchAnalytics(testId: string) → AnalyticsResponse
   - GET from /api/analytics/{testId}
   - Return complete analytics data

2. downloadAnalyticsReport(testId: string) → Blob
   - GET from /api/analytics/{testId}/report
   - Return PDF blob for download

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Add proper error handling with try-catch
3. Include TypeScript types for all parameters and returns
4. Add JSDoc comments for each function
5. Handle network errors gracefully
6. Return user-friendly error messages
7. Use types from types/analytics.ts

INTEGRATE WITH:
- lib/api.ts (API client base URL)
- types/analytics.ts (analytics types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete analytics helper functions

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/analytics.ts`
3. Paste and save

---

## Prompt 3: Create Analytics Data Hook

### Purpose
Build React hook for fetching and managing analytics data.

### When to Use
Create this hook to provide analytics data to all components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useAnalytics.ts`

**Step 2**: Type this comment:
```typescript
// Create useAnalytics hook for analytics data fetching
// Fetch analytics on mount
// Track loading and error states
// Return: analytics data, loading, error, refetch function
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for analytics data fetching in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useAnalytics.ts

GENERATE:
Custom React hook for fetching analytics data

HOOK: useAnalytics

Parameters:
- testId: string

State:
- analytics: AnalyticsResponse | null
- loading: boolean
- error: string | null

Functions:
- refetch() → Promise<void> (refetch analytics data)

Behavior:
- Fetch analytics on mount
- Handle loading state
- Handle error state
- Provide refetch function

REQUIREMENTS:
1. Use React hooks (useState, useEffect, useCallback)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle loading and error states
5. Integrate with lib/analytics.ts
6. Export hook as default

INTEGRATE WITH:
- lib/analytics.ts (API functions)
- types/analytics.ts (analytics types)

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete analytics data hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useAnalytics.ts`
3. Paste and save

---

## Prompt 4: Create Gauge Chart Component

### Purpose
Build reusable circular gauge chart for score display.

### When to Use
Create this for visual score representation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/charts/GaugeChart.tsx`

**Step 2**: Type this comment:
```typescript
// Create GaugeChart component using Recharts
// Display percentage as circular gauge (0-100%)
// Color coding: red (<50%), yellow (50-75%), green (>75%)
// Props: value (percentage), size, label
// Use Recharts RadialBarChart
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create reusable gauge chart component using Recharts.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Recharts, Tailwind CSS
- File: vaishnavi-frontend/components/charts/GaugeChart.tsx

GENERATE:
Circular gauge chart component

FEATURES:
1. Display percentage value (0-100%)
2. Color coding:
   - Red: < 50%
   - Yellow: 50-75%
   - Green: > 75%
3. Center label showing percentage
4. Responsive sizing

PROPS:
- value: number (0-100)
- size?: number (default 200)
- label?: string

REQUIREMENTS:
1. Use Recharts RadialBarChart
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Responsive design
5. Use Tailwind CSS for styling
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete gauge chart component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/charts/GaugeChart.tsx`
3. Paste and save

---

## Prompt 5: Create Bar Chart Component

### Purpose
Build reusable vertical bar chart for subject performance.

### When to Use
Create this for subject-wise performance visualization.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/charts/BarChart.tsx`

**Step 2**: Type this comment:
```typescript
// Create BarChart component using Recharts
// Display vertical bars with labels
// Color coding based on value thresholds
// Props: data array, xKey, yKey, colors
// Use Recharts BarChart with tooltip and legend
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create reusable bar chart component using Recharts.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Recharts, Tailwind CSS
- File: vaishnavi-frontend/components/charts/BarChart.tsx

GENERATE:
Vertical bar chart component

FEATURES:
1. Vertical bars with labels
2. Color coding based on value
3. Tooltip on hover
4. Legend
5. Responsive design
6. Grid lines

PROPS:
- data: Array<{ name: string, value: number }>
- xKey: string (default "name")
- yKey: string (default "value")
- colors?: { low: string, medium: string, high: string }
- height?: number (default 300)

REQUIREMENTS:
1. Use Recharts BarChart, Bar, XAxis, YAxis, Tooltip, Legend
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Color bars based on value thresholds
5. Responsive design
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete bar chart component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/charts/BarChart.tsx`
3. Paste and save

---

## Prompt 6: Create Horizontal Bar Chart Component

### Purpose
Build reusable horizontal bar chart for topic performance.

### When to Use
Create this for topic-wise performance visualization.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/charts/HorizontalBarChart.tsx`

**Step 2**: Type this comment:
```typescript
// Create HorizontalBarChart component using Recharts
// Display horizontal bars with topic names
// Color coding based on performance
// Props: data array, sortable, colors
// Use Recharts BarChart with layout="vertical"
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create reusable horizontal bar chart component using Recharts.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Recharts, Tailwind CSS
- File: vaishnavi-frontend/components/charts/HorizontalBarChart.tsx

GENERATE:
Horizontal bar chart component

FEATURES:
1. Horizontal bars with topic names on Y-axis
2. Color coding based on percentage
3. Tooltip showing details
4. Sort controls (by score, weightage, name)
5. Responsive design
6. Show marks obtained / total marks

PROPS:
- data: Array<{ topic: string, percentage: number, obtained: number, total: number, weightage: number }>
- height?: number (default 400)
- sortBy?: "score" | "weightage" | "name"

REQUIREMENTS:
1. Use Recharts BarChart with layout="vertical"
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Color bars: green (>75%), yellow (50-75%), red (<50%)
5. Responsive design
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete horizontal bar chart component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/charts/HorizontalBarChart.tsx`
3. Paste and save

---

## Prompt 7: Create Pie Chart Component

### Purpose
Build reusable pie chart for question pattern analysis.

### When to Use
Create this for visualizing question distribution.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/charts/PieChart.tsx`

**Step 2**: Type this comment:
```typescript
// Create PieChart component using Recharts
// Display pie chart with labels and percentages
// Props: data array with name and value
// Use Recharts PieChart with Cell for colors
// Show legend and tooltip
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create reusable pie chart component using Recharts.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Recharts, Tailwind CSS
- File: vaishnavi-frontend/components/charts/PieChart.tsx

GENERATE:
Pie chart component

FEATURES:
1. Pie chart with segments
2. Labels showing percentages
3. Legend
4. Tooltip on hover
5. Custom colors for each segment
6. Responsive design

PROPS:
- data: Array<{ name: string, value: number, color: string }>
- size?: number (default 300)

REQUIREMENTS:
1. Use Recharts PieChart, Pie, Cell, Tooltip, Legend
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Show percentage labels on segments
5. Responsive design
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete pie chart component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/charts/PieChart.tsx`
3. Paste and save

---

## Prompt 8: Create Overall Score Component

### Purpose
Build component to display overall score with gauge.

### When to Use
Create this as the main score display in analytics dashboard.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/OverallScore.tsx`

**Step 2**: Type this comment:
```typescript
// Create OverallScore component for score display
// Show score (obtained/total), percentage, interpretation badge
// Display gauge chart for visual representation
// Show percentile rank and time taken
// Props: analytics data
// Use GaugeChart component
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create overall score display component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/OverallScore.tsx

GENERATE:
Overall score display component

FEATURES:
1. Large score display: "145/200 (72.5%)"
2. Interpretation badge: "Good Performance" (color-coded)
3. Gauge chart showing percentage
4. Percentile rank: "Top 35%"
5. Time taken: "2h 45m / 3h"
6. Responsive layout

PROPS:
- overallScore: { obtained: number, total: number, percentage: number }
- interpretation: string
- percentile: number
- timeTaken: number (seconds)
- totalTime: number (seconds)

REQUIREMENTS:
1. Use GaugeChart component from components/charts/
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Color-code interpretation badge
5. Format time display (hours:minutes)
6. Use Tailwind CSS for styling
7. Export as default

INTEGRATE WITH:
- components/charts/GaugeChart.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete overall score component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/OverallScore.tsx`
3. Paste and save

---

## Prompt 9: Create Subject Performance Component

### Purpose
Build component to display subject-wise performance with bar chart.

### When to Use
Create this to show performance breakdown by subject.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/SubjectPerformance.tsx`

**Step 2**: Type this comment:
```typescript
// Create SubjectPerformance component for subject breakdown
// Show bar chart with Physics, Chemistry, Math scores
// Display percentage for each subject
// Color code bars based on performance
// Props: subject performance array
// Use BarChart component
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create subject performance component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/SubjectPerformance.tsx

GENERATE:
Subject-wise performance display component

FEATURES:
1. Section title: "Subject-Wise Performance"
2. Bar chart showing 3 subjects
3. Table below chart with detailed breakdown
4. Color coding: green (>75%), yellow (50-75%), red (<50%)
5. Responsive layout

PROPS:
- subjects: SubjectPerformance[]

REQUIREMENTS:
1. Use BarChart component from components/charts/
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Show chart and table
5. Use Tailwind CSS for styling
6. Export as default

INTEGRATE WITH:
- components/charts/BarChart.tsx
- types/analytics.ts (SubjectPerformance type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete subject performance component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/SubjectPerformance.tsx`
3. Paste and save

---

## Prompt 10: Create Topic Performance Component

### Purpose
Build component to display topic-wise performance with horizontal bar chart.

### When to Use
Create this to show detailed topic breakdown.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/TopicPerformance.tsx`

**Step 2**: Type this comment:
```typescript
// Create TopicPerformance component for topic breakdown
// Show horizontal bar chart with all topics
// Sort controls (by score, weightage, name)
// Highlight high-weightage weak topics
// Props: topic performance array
// Use HorizontalBarChart component
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create topic performance component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/TopicPerformance.tsx

GENERATE:
Topic-wise performance display component

FEATURES:
1. Section title: "Topic-Wise Performance"
2. Sort controls (dropdown or buttons)
3. Horizontal bar chart with all topics
4. Highlight high-weightage weak topics with icon
5. Responsive layout

PROPS:
- topics: TopicPerformance[]

REQUIREMENTS:
1. Use HorizontalBarChart component from components/charts/
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Implement sort functionality
5. Use Tailwind CSS for styling
6. Export as default

INTEGRATE WITH:
- components/charts/HorizontalBarChart.tsx
- types/analytics.ts (TopicPerformance type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete topic performance component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/TopicPerformance.tsx`
3. Paste and save

---

## Prompt 11: Create Strengths and Weaknesses Component

### Purpose
Build component to display strengths and weaknesses in two columns.

### When to Use
Create this to highlight student's strong and weak areas.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/StrengthsWeaknesses.tsx`

**Step 2**: Type this comment:
```typescript
// Create StrengthsWeaknesses component for strengths/weaknesses display
// Two-column layout: strengths (green) and weaknesses (red)
// Show topic badges with score and weightage
// Strengths: topics with >75% score
// Weaknesses: topics with <50% score
// Props: topics array
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create strengths and weaknesses component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/StrengthsWeaknesses.tsx

GENERATE:
Strengths and weaknesses display component

FEATURES:
1. Two-column layout (strengths left, weaknesses right)
2. Strengths section:
   - Green badges
   - Topics with >75% score
   - Sorted by score (highest first)
   - Congratulatory message
3. Weaknesses section:
   - Red badges
   - Topics with <50% score
   - Sorted by weightage (highest first)
   - Encouraging message
4. Each badge shows: topic name, score %, weightage
5. Responsive layout (stack on mobile)

PROPS:
- topics: TopicPerformance[]

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Filter topics by score threshold
4. Use Tailwind CSS for styling
5. Export as default

INTEGRATE WITH:
- types/analytics.ts (TopicPerformance type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete strengths and weaknesses component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/StrengthsWeaknesses.tsx`
3. Paste and save

---

## Prompt 12: Create Question Patterns Component

### Purpose
Build component to display question pattern analysis with pie chart.

### When to Use
Create this to show question distribution and difficulty analysis.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/QuestionPatterns.tsx`

**Step 2**: Type this comment:
```typescript
// Create QuestionPatterns component for question analysis
// Show pie chart for correct/incorrect/unanswered distribution
// Display difficulty-wise breakdown table
// Show average time per question
// Props: question pattern data
// Use PieChart component
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create question patterns component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/QuestionPatterns.tsx

GENERATE:
Question pattern analysis display component

FEATURES:
1. Section title: "Question Pattern Analysis"
2. Pie chart showing:
   - Correct (green)
   - Incorrect (red)
   - Unanswered (gray)
3. Difficulty-wise breakdown table
4. Average time per question
5. Negative marking impact
6. Responsive layout

PROPS:
- patterns: QuestionPattern

REQUIREMENTS:
1. Use PieChart component from components/charts/
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Format time display
5. Use Tailwind CSS for styling
6. Export as default

INTEGRATE WITH:
- components/charts/PieChart.tsx
- types/analytics.ts (QuestionPattern type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete question patterns component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/QuestionPatterns.tsx`
3. Paste and save

---

## Prompt 13: Create AI Recommendations Component

### Purpose
Build component to display AI-generated recommendations.

### When to Use
Create this to show personalized study recommendations.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/AIRecommendations.tsx`

**Step 2**: Type this comment:
```typescript
// Create AIRecommendations component for AI recommendations display
// Show priority topics list
// Display study approach and next steps
// Show estimated improvement time
// Motivational message
// Props: recommendations data
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create AI recommendations component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/AIRecommendations.tsx

GENERATE:
AI-generated recommendations display component

FEATURES:
1. Section title: "AI-Powered Recommendations"
2. Priority topics list (badges)
3. Study approach (paragraph)
4. Estimated improvement time
5. Next steps (numbered list)
6. Motivational message (highlighted)
7. AI icon/badge

PROPS:
- recommendations: Recommendation

REQUIREMENTS:
1. Add proper TypeScript interface for props
2. Include JSDoc comments
3. Use Tailwind CSS for styling
4. Highlight important information
5. Export as default

INTEGRATE WITH:
- types/analytics.ts (Recommendation type)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete AI recommendations component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/AIRecommendations.tsx`
3. Paste and save

---

## Prompt 14: Create Analytics Actions Component

### Purpose
Build component with action buttons for next steps.

### When to Use
Create this to provide navigation to schedule, practice, etc.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/AnalyticsActions.tsx`

**Step 2**: Type this comment:
```typescript
// Create AnalyticsActions component for action buttons
// Buttons: Generate Study Schedule, Practice Weak Topics, Download Report, Share
// Props: testId for navigation
// Use Next.js Link for navigation
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create analytics actions component for analytics dashboard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/AnalyticsActions.tsx

GENERATE:
Action buttons component

FEATURES:
1. Four buttons:
   - "Generate Study Schedule" (primary, navigate to /schedule/{testId})
   - "Practice Weak Topics" (secondary, navigate to /practice)
   - "Download Report" (outline, trigger PDF download)
   - "Share with Parent" (outline, open share dialog)
2. Responsive layout (stack on mobile)

PROPS:
- testId: string
- onDownload: () => void
- onShare: () => void

REQUIREMENTS:
1. Use Next.js Link for navigation
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Use Tailwind CSS for styling
5. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in analytics dashboard
```

**What You'll Get**: Complete analytics actions component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/AnalyticsActions.tsx`
3. Paste and save

---

## Prompt 15: Create Analytics Dashboard Container

### Purpose
Build main analytics container that orchestrates all analytics components.

### When to Use
Create this to tie all analytics components together.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/analytics/AnalyticsDashboard.tsx`

**Step 2**: Type this comment:
```typescript
// Create AnalyticsDashboard container component
// Use useAnalytics hook for data fetching
// Layout: overall score, subject performance, topic performance, strengths/weaknesses, patterns, recommendations, actions
// Show loading and error states
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create analytics dashboard container component that orchestrates all analytics components.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/analytics/AnalyticsDashboard.tsx

GENERATE:
Main analytics dashboard container component

FEATURES:
1. Use useAnalytics hook for data fetching
2. Layout sections (in order):
   - Overall Score
   - Subject Performance
   - Topic Performance
   - Strengths and Weaknesses
   - Question Patterns
   - AI Recommendations
   - Actions
3. Show loading state while fetching
4. Show error state if fetch fails
5. Responsive layout

PROPS:
- testId: string

REQUIREMENTS:
1. Import all analytics components
2. Use useAnalytics hook
3. Add proper TypeScript interface for props
4. Include JSDoc comments
5. Handle loading and error states
6. Use Tailwind CSS for layout
7. Export as default

INTEGRATE WITH:
- hooks/useAnalytics.ts
- components/analytics/OverallScore.tsx
- components/analytics/SubjectPerformance.tsx
- components/analytics/TopicPerformance.tsx
- components/analytics/StrengthsWeaknesses.tsx
- components/analytics/QuestionPatterns.tsx
- components/analytics/AIRecommendations.tsx
- components/analytics/AnalyticsActions.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete analytics dashboard container

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/analytics/AnalyticsDashboard.tsx`
3. Paste and save

---

## Prompt 16: Create Analytics Page

### Purpose
Build the main analytics page that renders the analytics dashboard.

### When to Use
Create this as the entry point for analytics.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/analytics/[testId]/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create analytics page with dynamic testId
// Render AnalyticsDashboard component
// Add page title and metadata
// Use 'use client' directive
// Check if user is authenticated
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create analytics page for the Next.js app with dynamic test ID.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/analytics/[testId]/page.tsx

GENERATE:
Analytics page component with dynamic routing

FEATURES:
1. Get testId from URL params
2. Page title: "Test Analytics"
3. Render AnalyticsDashboard component
4. Check authentication (redirect to /auth/login if not authenticated)
5. Full-width layout with padding

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Use dynamic route params
4. Add metadata for SEO
5. Use Tailwind CSS for layout
6. Import AnalyticsDashboard component
7. Add proper TypeScript types
8. Export as default

INTEGRATE WITH:
- components/analytics/AnalyticsDashboard.tsx
- hooks/useAuth.ts (for authentication check)

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete analytics page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/analytics/[testId]/page.tsx`
3. Paste and save

---

## Prompt 17: Update Mock API Server

### Purpose
Add analytics endpoints to mock API server for standalone testing.

### When to Use
Update this to test analytics UI without backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Add this comment at the end of the file:
```javascript
// Add analytics endpoints:
// GET /api/analytics/:testId - Return complete analytics data
// GET /api/analytics/:testId/report - Return PDF blob (mock)
// All endpoints should return realistic mock data with charts data
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Open file `vaishnavi-frontend/mock-data/mock-api-responses.json`

**Step 5**: Add this comment:
```json
// Add mock responses for analytics:
// analyticsResponse with overall score, subjects, topics, patterns, recommendations
// Include realistic data matching API contract
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update mock API server with analytics endpoints for testing.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Express.js, Node.js
- Files:
  - vaishnavi-frontend/mock-data/mock-api-server.js
  - vaishnavi-frontend/mock-data/mock-api-responses.json

GENERATE:
Add analytics endpoints to existing mock server

ENDPOINTS TO ADD:

1. GET /api/analytics/:testId
   - Return: Complete AnalyticsResponse
   - Include: overall_score, subjects (3), topics (15-20), patterns, recommendations
   - Use realistic data

2. GET /api/analytics/:testId/report
   - Return: Mock PDF blob
   - Content-Type: application/pdf

MOCK DATA:
- Overall score: 145/200 (72.5%)
- Interpretation: "Good Performance"
- Percentile: 65
- Time taken: 9900 seconds (2h 45m)
- Subjects: Physics (70%), Chemistry (75%), Math (72%)
- Topics: Mix of high/medium/low performance
- Patterns: 145 correct, 35 incorrect, 20 unanswered
- Recommendations: Realistic AI-generated text

REQUIREMENTS:
1. Add endpoints to existing Express server
2. Return realistic mock data
3. Add 500ms delay to simulate network
4. Log requests to console
5. Handle CORS properly

UPDATE:
- mock-api-server.js: Add endpoint handlers
- mock-api-responses.json: Add mock analytics data

OUTPUT FORMAT:
- Updated mock-api-server.js with new endpoints
- Updated mock-api-responses.json with mock data
- Ready to run with: node mock-data/mock-api-server.js
```

**What You'll Get**: Updated mock server with analytics endpoints

**What to Do**:
1. Copy the updated code
2. Update both files
3. Restart mock server

---

## Summary

You've now generated all the code for Day 5: Analytics Visualization!

**Files Created:**
- ✅ types/analytics.ts - Analytics types
- ✅ lib/analytics.ts - Analytics API functions
- ✅ hooks/useAnalytics.ts - Analytics data hook
- ✅ components/charts/GaugeChart.tsx - Gauge chart
- ✅ components/charts/BarChart.tsx - Bar chart
- ✅ components/charts/HorizontalBarChart.tsx - Horizontal bar chart
- ✅ components/charts/PieChart.tsx - Pie chart
- ✅ components/analytics/OverallScore.tsx - Overall score display
- ✅ components/analytics/SubjectPerformance.tsx - Subject performance
- ✅ components/analytics/TopicPerformance.tsx - Topic performance
- ✅ components/analytics/StrengthsWeaknesses.tsx - Strengths/weaknesses
- ✅ components/analytics/QuestionPatterns.tsx - Question patterns
- ✅ components/analytics/AIRecommendations.tsx - AI recommendations
- ✅ components/analytics/AnalyticsActions.tsx - Action buttons
- ✅ components/analytics/AnalyticsDashboard.tsx - Main container
- ✅ app/analytics/[testId]/page.tsx - Analytics page
- ✅ Updated mock-api-server.js - Analytics endpoints
- ✅ Updated mock-api-responses.json - Mock analytics data

**Next Steps:**
1. Open **CONFIGURATION.md** to install Recharts and configure charts
2. Open **TESTING.md** to test the analytics dashboard
3. Open **EXPECTED-OUTCOME.md** to verify success criteria

**Ready to configure? Open CONFIGURATION.md!**

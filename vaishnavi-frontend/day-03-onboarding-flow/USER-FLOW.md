# User Flow for Day 3: Onboarding Flow UI

This document illustrates the complete user journey through the onboarding process.

---

## Overview

The onboarding flow is a 3-step wizard that collects essential information from parents to personalize their child's learning experience.

**Flow Duration**: 3-5 minutes  
**Steps**: 3 (Preferences → Child Profile → Exam Selection)  
**Outcome**: Personalized learning plan and diagnostic test scheduled

---

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     ONBOARDING USER FLOW                        │
└─────────────────────────────────────────────────────────────────┘

START: User completes registration/login
  │
  ├─→ Redirect to /onboarding
  │
  ▼
┌─────────────────────────────────────────┐
│  STEP 1: PARENT PREFERENCES             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                          │
│  User Actions:                          │
│  1. Select preferred language           │
│     • English                           │
│     • Hindi                             │
│     • Marathi                           │
│                                          │
│  2. Configure notifications             │
│     • Email notifications (default: ✓)  │
│     • SMS notifications (default: ✓)    │
│     • Push notifications (default: ✓)   │
│                                          │
│  3. Set teaching involvement            │
│     • High (daily involvement)          │
│     • Medium (weekly check-ins)         │
│     • Low (monthly updates)             │
│                                          │
│  4. Click "Next" button                 │
│                                          │
│  System Actions:                        │
│  • Validate form (language & involvement required)
│  • Call API: POST /api/onboarding/preferences
│  • Save preferences to database         │
│  • Store data in component state        │
│  • Move to Step 2                       │
└─────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────┐
│  STEP 2: CHILD PROFILE                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                          │
│  User Actions:                          │
│  1. Enter child's name                  │
│     • Example: "Rahul Sharma"           │
│                                          │
│  2. Enter child's age                   │
│     • Must be 14-19 years               │
│     • Example: 16                       │
│                                          │
│  3. Select grade                        │
│     • Options: 9, 10, 11, 12            │
│     • Example: Grade 11                 │
│                                          │
│  4. Select current academic level       │
│     • Beginner (starting preparation)   │
│     • Intermediate (some preparation)   │
│     • Advanced (well-prepared)          │
│                                          │
│  5. Click "Next" button                 │
│     (or "Back" to return to Step 1)     │
│                                          │
│  System Actions:                        │
│  • Validate form (all fields required)  │
│  • Validate age (14-19)                 │
│  • Validate grade (9-12)                │
│  • Call API: POST /api/onboarding/child │
│  • Check one-child restriction          │
│  • Save child profile to database       │
│  • Store data in component state        │
│  • Move to Step 3                       │
│                                          │
│  Error Handling:                        │
│  • If parent already has child:         │
│    Show error: "You can only have one   │
│    child profile. Delete existing to    │
│    create new one."                     │
└─────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────┐
│  STEP 3: EXAM SELECTION                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                          │
│  User Actions:                          │
│  1. Select target exam                  │
│     • JEE Main                          │
│     • JEE Advanced                      │
│     • NEET                              │
│                                          │
│  2. Select exam date                    │
│     • Fetched from API                  │
│     • Example: "15 Jan 2026"            │
│     • Shows available dates only        │
│                                          │
│  3. Configure subject weightages        │
│     For JEE:                            │
│     • Physics: 0-100%                   │
│     • Chemistry: 0-100%                 │
│     • Mathematics: 0-100%               │
│                                          │
│     For NEET:                           │
│     • Physics: 0-100%                   │
│     • Chemistry: 0-100%                 │
│     • Biology: 0-100%                   │
│                                          │
│     • Must sum to exactly 100%          │
│     • Real-time sum display             │
│                                          │
│  4. Review calculated info              │
│     • Days until exam (auto-calculated) │
│     • Example: "425 days until exam"    │
│                                          │
│  5. Click "Complete Onboarding"         │
│     (or "Back" to return to Step 2)     │
│                                          │
│  System Actions:                        │
│  • Validate form (all fields required)  │
│  • Validate weightages sum to 100%      │
│  • Calculate days until exam            │
│  • Call API: POST /api/onboarding/exam/select
│  • Create diagnostic test record        │
│  • Save exam selection to database      │
│  • Mark onboarding as complete          │
│  • Show success message                 │
│  • Redirect to /dashboard (2s delay)    │
└─────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────┐
│  SUCCESS & REDIRECT                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                          │
│  ✓ Onboarding Complete!                 │
│                                          │
│  Your personalized learning plan is     │
│  ready. Redirecting to dashboard...     │
│                                          │
│  [Loading spinner]                      │
└─────────────────────────────────────────┘
  │
  ▼
END: User lands on /dashboard
  │
  └─→ Can now take diagnostic test
```

---

## Detailed Step-by-Step Flow

### Step 1: Parent Preferences

**Entry Point**: User navigates to `/onboarding` after login

**User Sees**:
- Page title: "Complete Your Profile"
- Subtitle: "Help us personalize your learning experience"
- Step indicator: "Step 1 of 3"
- Form with 3 sections:
  1. Language dropdown
  2. Notification checkboxes
  3. Teaching involvement radio buttons
- "Next" button (disabled until form valid)

**User Interactions**:
1. Clicks language dropdown → Sees options (English, Hindi, Marathi)
2. Selects "English"
3. Reviews notification checkboxes (all checked by default)
4. Unchecks "SMS notifications" (optional)
5. Clicks "High" for teaching involvement
6. "Next" button becomes enabled
7. Clicks "Next"

**System Response**:
1. Validates form (language and involvement required)
2. Shows loading spinner on button
3. Calls API: `POST /api/onboarding/preferences`
4. Receives response with parent_id and timestamps
5. Stores preferences in component state
6. Advances to Step 2
7. Updates step indicator to "Step 2 of 3"

**Validation Rules**:
- Language: Required
- Teaching involvement: Required
- Notifications: Optional (defaults to all checked)

**Error Scenarios**:
- Missing language: "Please select a language"
- Missing involvement: "Please select teaching involvement level"
- API error: "Failed to save preferences. Please try again."

---

### Step 2: Child Profile

**Entry Point**: Completed Step 1 successfully

**User Sees**:
- Step indicator: "Step 2 of 3"
- Form with 4 fields:
  1. Child name (text input)
  2. Age (number input)
  3. Grade (dropdown)
  4. Current level (radio buttons)
- "Back" button (returns to Step 1)
- "Next" button (disabled until form valid)

**User Interactions**:
1. Types child's name: "Rahul Sharma"
2. Enters age: 16
3. Selects grade: 11
4. Clicks "Intermediate" for current level
5. "Next" button becomes enabled
6. Clicks "Next"

**System Response**:
1. Validates form (all fields required, age 14-19, grade 9-12)
2. Shows loading spinner on button
3. Calls API: `POST /api/onboarding/child`
4. Receives response with child_id
5. Stores child profile in component state
6. Advances to Step 3
7. Updates step indicator to "Step 3 of 3"

**Validation Rules**:
- Name: Required, 2-100 characters
- Age: Required, must be 14-19
- Grade: Required, must be 9-12
- Current level: Required

**Error Scenarios**:
- Age < 14 or > 19: "Age must be between 14 and 19"
- Name too short: "Name must be at least 2 characters"
- One-child restriction: "You can only have one child profile"
- API error: "Failed to create child profile. Please try again."

**Back Button Behavior**:
- Returns to Step 1
- Preserves entered data
- Can edit preferences and return

---

### Step 3: Exam Selection

**Entry Point**: Completed Step 2 successfully

**User Sees**:
- Step indicator: "Step 3 of 3"
- Form with 4 sections:
  1. Exam type dropdown
  2. Exam date dropdown
  3. Subject weightage sliders (3 sliders)
  4. Summary display (weightage sum, days until exam)
- "Back" button (returns to Step 2)
- "Complete Onboarding" button (disabled until form valid)

**User Interactions**:
1. Clicks exam type dropdown → Sees options (JEE Main, JEE Advanced, NEET)
2. Selects "JEE Main"
3. Clicks exam date dropdown → Sees available dates
4. Selects "15 Jan 2026"
5. Adjusts subject weightages:
   - Physics slider: 35%
   - Chemistry slider: 35%
   - Mathematics slider: 30%
6. Sees real-time sum: "Total: 100% ✓"
7. Sees calculated days: "425 days until exam"
8. "Complete Onboarding" button becomes enabled
9. Clicks "Complete Onboarding"

**System Response**:
1. Validates form (all fields required, weightages sum to 100%)
2. Shows loading spinner on button
3. Calls API: `POST /api/onboarding/exam/select`
4. Receives response with diagnostic_test_id
5. Shows success message: "Onboarding Complete!"
6. Waits 2 seconds
7. Redirects to `/dashboard`

**Validation Rules**:
- Exam type: Required
- Exam date: Required, must be future date
- Subject weightages: Required, must sum to exactly 100%

**Dynamic Behavior**:
- When exam type changes:
  - JEE Main/Advanced: Shows Physics, Chemistry, Mathematics
  - NEET: Shows Physics, Chemistry, Biology
- When exam date changes:
  - Recalculates days until exam
- When weightages change:
  - Updates real-time sum display
  - Shows ✓ if sum = 100%, ✗ if not

**Error Scenarios**:
- Weightages ≠ 100%: "Subject weightages must sum to exactly 100%"
- Past exam date: "Exam date must be in the future"
- API error: "Failed to save exam selection. Please try again."

**Back Button Behavior**:
- Returns to Step 2
- Preserves entered data
- Can edit child profile and return

---

## Navigation Flow Diagram

```
┌──────────────┐
│   Register   │
│   / Login    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  /onboarding │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Step 1: Preferences                     │
│  • Language                              │
│  • Notifications                         │
│  • Teaching involvement                  │
│                                          │
│  [        Next →        ]                │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Step 2: Child Profile                   │
│  • Name                                  │
│  • Age                                   │
│  • Grade                                 │
│  • Current level                         │
│                                          │
│  [← Back]      [    Next →    ]          │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Step 3: Exam Selection                  │
│  • Exam type                             │
│  • Exam date                             │
│  • Subject weightages                    │
│                                          │
│  [← Back]  [Complete Onboarding]         │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────┐
│  Success     │
│  Message     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  /dashboard  │
└──────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────┐
│  useOnboarding Hook State               │
├─────────────────────────────────────────┤
│  currentStep: 1                         │
│  preferences: null                      │
│  childProfile: null                     │
│  examSelection: null                    │
│  isComplete: false                      │
│  loading: false                         │
│  error: null                            │
└─────────────────────────────────────────┘
       │
       │ User completes Step 1
       ▼
┌─────────────────────────────────────────┐
│  currentStep: 2                         │
│  preferences: { language: "en", ... }   │
│  childProfile: null                     │
│  examSelection: null                    │
│  isComplete: false                      │
└─────────────────────────────────────────┘
       │
       │ User completes Step 2
       ▼
┌─────────────────────────────────────────┐
│  currentStep: 3                         │
│  preferences: { language: "en", ... }   │
│  childProfile: { name: "Rahul", ... }   │
│  examSelection: null                    │
│  isComplete: false                      │
└─────────────────────────────────────────┘
       │
       │ User completes Step 3
       ▼
┌─────────────────────────────────────────┐
│  currentStep: 3                         │
│  preferences: { language: "en", ... }   │
│  childProfile: { name: "Rahul", ... }   │
│  examSelection: { exam_type: "JEE", ...}│
│  isComplete: true                       │
└─────────────────────────────────────────┘
       │
       │ Redirect to dashboard
       ▼
```

---

## API Call Sequence

```
User Action                 API Call                      Response
───────────────────────────────────────────────────────────────────
Complete Step 1      →  POST /api/onboarding/preferences
                     ←  { parent_id, ...preferences }

Complete Step 2      →  POST /api/onboarding/child
                     ←  { child_id, parent_id, ...profile }

Load Step 3          →  GET /api/onboarding/exams/available
                     ←  { exams: [...available exams] }

Complete Step 3      →  POST /api/onboarding/exam/select
                     ←  { ...selection, diagnostic_test_id }

Redirect to dashboard
```

---

## Error Handling Flow

```
User submits form
  │
  ├─→ Validation fails
  │   └─→ Show error message
  │       └─→ Stay on current step
  │           └─→ User can fix and retry
  │
  ├─→ Validation passes
  │   └─→ Call API
  │       │
  │       ├─→ API succeeds
  │       │   └─→ Move to next step
  │       │
  │       └─→ API fails
  │           └─→ Show error message
  │               └─→ Stay on current step
  │                   └─→ User can retry
```

---

## Mobile vs Desktop Experience

### Desktop (≥768px)
- Wider form fields
- Horizontal step indicator
- Side-by-side buttons (Back | Next)
- More whitespace

### Mobile (<768px)
- Full-width form fields
- Vertical or compact step indicator
- Stacked buttons (Next above Back)
- Optimized touch targets

---

## Accessibility Considerations

- **Keyboard Navigation**: All form fields and buttons accessible via Tab
- **Screen Readers**: All fields have proper labels and ARIA attributes
- **Error Announcements**: Errors announced to screen readers
- **Focus Management**: Focus moves to first error on validation failure
- **Color Contrast**: All text meets WCAG AA standards
- **Touch Targets**: Buttons and inputs ≥44px for mobile

---

## Success Metrics

- **Completion Rate**: % of users who complete all 3 steps
- **Drop-off Points**: Which step has highest abandonment
- **Time to Complete**: Average time from start to finish
- **Error Rate**: % of submissions with validation errors
- **Back Button Usage**: How often users go back to edit

---

## User Journey Summary

1. **Entry**: User completes registration/login
2. **Step 1**: Sets preferences (language, notifications, involvement)
3. **Step 2**: Creates child profile (name, age, grade, level)
4. **Step 3**: Selects exam (type, date, subject weightages)
5. **Completion**: Sees success message, redirects to dashboard
6. **Outcome**: Personalized learning plan ready, diagnostic test scheduled

**Total Time**: 3-5 minutes  
**Total Steps**: 3  
**Total Fields**: 11  
**API Calls**: 4 (3 POST, 1 GET)

# Day 3: Onboarding Flow UI (Frontend)

## What You're Building

Complete multi-step onboarding wizard with parent preferences, child profile creation, exam selection, and diagnostic test scheduling. This builds on Day 2's authentication to collect essential information for personalized learning.

## Why This Matters

Onboarding is the bridge between registration and personalized learning:
- **Parent Preferences**: Captures language, notification settings, and teaching involvement level
- **Child Profile**: Collects student information (name, age, grade, current level) with validation
- **Exam Selection**: Determines target exam (JEE/NEET), exam date, and subject preferences
- **Progress Tracking**: Visual stepper shows completion progress through the flow
- **Form Validation**: Ensures data quality with real-time validation and clear error messages
- **Responsive Design**: Works seamlessly on mobile and desktop devices

A well-designed onboarding flow ensures users provide all necessary information while maintaining a smooth, frustration-free experience.

## How It Works

**Onboarding Flow Overview:**

1. **Step 1: Parent Preferences**:
   - Select preferred language (English, Hindi, Marathi)
   - Configure notification preferences (email, SMS, push)
   - Set teaching involvement level (high, medium, low)
   - Call backend API: `POST /api/onboarding/preferences`
   - Store response and move to Step 2

2. **Step 2: Child Profile**:
   - Enter child's name, age, grade
   - Select current academic level (beginner, intermediate, advanced)
   - Validate age (14-19) and grade (9-12) compatibility
   - Call backend API: `POST /api/onboarding/child`
   - Handle one-child restriction error if parent already has a child
   - Store response and move to Step 3

3. **Step 3: Exam Selection**:
   - Display available exams (JEE Main, JEE Advanced, NEET)
   - Select target exam and exam date
   - Configure subject preferences and weightages
   - Validate weightages sum to 100%
   - Call backend API: `POST /api/onboarding/exam/select`
   - Receive diagnostic test schedule
   - Complete onboarding and redirect to dashboard

4. **Progress Tracking**:
   - Visual stepper shows current step (1/3, 2/3, 3/3)
   - "Back" button allows returning to previous steps
   - "Next" button validates current step before proceeding
   - Data persists across steps (stored in component state)

**Technology Stack:**
- Next.js 14 (React framework with App Router)
- React Hook Form (form validation)
- Tailwind CSS (styling)
- TypeScript (type safety)
- Zustand or Context API (state management across steps)

## Learning Objectives

By completing this task, you will:
- Understand multi-step form design patterns
- Learn how to manage state across multiple form steps
- Implement complex form validation with React Hook Form
- Create reusable form components
- Handle API calls in sequence (step-by-step)
- Build visual progress indicators (stepper component)
- Implement responsive wizard layouts
- Test multi-step flows with mock data

## Time Estimate

- **LLM Code Generation**: 60 minutes (8-10 prompts)
- **Configuration**: 30 minutes (Form libraries, state management)
- **Testing**: 30 minutes (Test complete onboarding flow with mock backend)
- **Total**: 2 hours

## Prerequisites

**Required Completion:**
- ✅ Day 1: Frontend Project Setup (must be complete)
- ✅ Day 2: Authentication UI (must be complete)
- ✅ User can register and login successfully
- ✅ Mock API server configured

**Required Software:**
- Node.js 18+ with npm
- Browser for testing (Chrome/Firefox recommended)

**Knowledge Prerequisites:**
- Understanding of React hooks (useState, useEffect)
- Familiarity with multi-step forms
- Basic knowledge of form validation

## Files You'll Create

```
vaishnavi-frontend/
├── app/
│   └── onboarding/
│       └── page.tsx                  # Main onboarding wizard page
├── components/
│   ├── onboarding/
│   │   ├── OnboardingWizard.tsx      # Main wizard container with stepper
│   │   ├── StepIndicator.tsx         # Visual progress stepper (1/3, 2/3, 3/3)
│   │   ├── PreferencesStep.tsx       # Step 1: Parent preferences form
│   │   ├── ChildProfileStep.tsx      # Step 2: Child profile form
│   │   ├── ExamSelectionStep.tsx     # Step 3: Exam selection form
│   │   └── OnboardingLayout.tsx      # Shared layout for onboarding steps
│   └── ui/
│       ├── Select.tsx                # Reusable select/dropdown component
│       ├── RadioGroup.tsx            # Reusable radio button group
│       └── Checkbox.tsx              # Reusable checkbox component
├── lib/
│   └── onboarding.ts                 # Onboarding API helper functions
├── hooks/
│   └── useOnboarding.ts              # Onboarding state management hook
└── types/
    └── onboarding.ts                 # Onboarding TypeScript types
```

## Files You'll Modify

```
vaishnavi-frontend/
├── lib/
│   └── api.ts                        # Add onboarding API calls
└── mock-data/
    ├── mock-api-server.js            # Add onboarding endpoints
    └── mock-api-responses.json       # Add mock responses for onboarding
```

## What You'll Accomplish

By the end of this task, you will have:
- ✅ Multi-step onboarding wizard with 3 steps
- ✅ Visual progress indicator (stepper component)
- ✅ Parent preferences form with language and notification settings
- ✅ Child profile form with age/grade validation
- ✅ Exam selection form with subject weightage configuration
- ✅ Navigation between steps (Next, Back buttons)
- ✅ Form validation with clear error messages
- ✅ Loading states for all API calls
- ✅ Success confirmation and redirect to dashboard
- ✅ Responsive design for mobile and desktop
- ✅ Mock backend integration for standalone testing

## Onboarding Steps You'll Create

### Step 1: Parent Preferences (`/onboarding` - Step 1)
- Language selection dropdown (English, Hindi, Marathi)
- Notification preferences checkboxes (Email, SMS, Push)
- Teaching involvement radio buttons (High, Medium, Low)
- "Next" button to proceed to Step 2
- Form validation (language and involvement required)

### Step 2: Child Profile (`/onboarding` - Step 2)
- Child name input (text field)
- Age input (number, 14-19)
- Grade selection (dropdown, 9-12)
- Current level radio buttons (Beginner, Intermediate, Advanced)
- "Back" button to return to Step 1
- "Next" button to proceed to Step 3
- Form validation (all fields required, age/grade validation)
- Handle one-child restriction error

### Step 3: Exam Selection (`/onboarding` - Step 3)
- Exam type selection (JEE Main, JEE Advanced, NEET)
- Exam date picker (from available dates)
- Subject weightage sliders (Physics, Chemistry, Math/Biology)
- Real-time weightage sum display (must equal 100%)
- Days until exam calculation display
- "Back" button to return to Step 2
- "Complete Onboarding" button to finish
- Form validation (exam, date, weightages required)
- Success message and redirect to dashboard

## Next Steps

After completing this task, you'll move to:
- **Day 4**: Diagnostic Test UI (test interface with timer and question navigation)

## Document Navigation

Follow these documents in order:
1. **README.md** (you are here) - Overview and context
2. **PROMPTS.md** - AI coding agent prompts to generate code
3. **CONFIGURATION.md** - Manual setup steps (form libraries, state management)
4. **TESTING.md** - Verify onboarding flow works
5. **EXPECTED-OUTCOME.md** - Success criteria checklist
6. **USER-FLOW.md** - Parent onboarding journey diagrams
7. **TROUBLESHOOTING.md** - Common form validation and state management issues

## Quick Start

Ready to begin? Open **PROMPTS.md** and start generating onboarding UI code with your AI coding agent!

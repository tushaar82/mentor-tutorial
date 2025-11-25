# AI Coding Agent Prompts for Day 3: Onboarding Flow UI

This document contains all prompts needed to generate the onboarding flow UI code for Day 3. Choose between **Inline prompts** (for Windsurf/Copilot) or **Chat prompts** (for ChatGPT/Claude).

---

## Prompt 1: Create Onboarding Types

### Purpose
Define TypeScript types for onboarding requests, responses, and state management.

### When to Use
Start with this to establish type safety for all onboarding components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/types/onboarding.ts`

**Step 2**: Type this comment at the top of the file:
```typescript
// Create TypeScript types for onboarding system
// Include: PreferencesData, ChildProfileData, ExamSelectionData, OnboardingState
// Support multi-step form with validation
// Add proper type safety for all onboarding operations
```

**Step 3**: Press Tab to trigger Copilot

**Step 4**: Review and accept the generated code

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create TypeScript types for onboarding system in a Next.js EdTech platform.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/types/onboarding.ts

GENERATE:
TypeScript interfaces and types for onboarding flow

REQUIREMENTS:
1. PreferencesData interface:
   - language: "en" | "hi" | "mr"
   - email_notifications: boolean
   - sms_notifications: boolean
   - push_notifications: boolean
   - teaching_involvement: "high" | "medium" | "low"

2. ChildProfileData interface:
   - name: string
   - age: number (14-19)
   - grade: number (9-12)
   - current_level: "beginner" | "intermediate" | "advanced"

3. ExamSelectionData interface:
   - exam_type: "JEE_MAIN" | "JEE_ADVANCED" | "NEET"
   - exam_date: string (ISO date)
   - subject_preferences: Record<string, number> (weightages)

4. OnboardingState interface:
   - currentStep: number (1-3)
   - preferences: PreferencesData | null
   - childProfile: ChildProfileData | null
   - examSelection: ExamSelectionData | null
   - isComplete: boolean

5. OnboardingResponse interfaces for API responses
6. AvailableExam interface for exam options
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
2. Create file at `vaishnavi-frontend/types/onboarding.ts`
3. Paste and save

---


## Prompt 2: Create Reusable Form Components

### Purpose
Build reusable Select, RadioGroup, and Checkbox components for forms.

### When to Use
Create these before building onboarding forms to ensure consistent styling.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/ui/Select.tsx`

**Step 2**: Type this comment:
```typescript
// Create reusable Select component with Tailwind CSS
// Support options array with label and value
// Support error state with error message display
// Support label and placeholder
// Add proper TypeScript props
// Include focus and validation styles
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Create file `vaishnavi-frontend/components/ui/RadioGroup.tsx`

**Step 5**: Type this comment:
```typescript
// Create RadioGroup component for radio button groups
// Support options array with label and value
// Support horizontal and vertical layouts
// Support error state with error message
// Use Tailwind CSS for styling
// Add proper TypeScript props
```

**Step 6**: Press Tab, review, and accept

**Step 7**: Create file `vaishnavi-frontend/components/ui/Checkbox.tsx`

**Step 8**: Type this comment:
```typescript
// Create Checkbox component with label
// Support checked state
// Support disabled state
// Use Tailwind CSS for styling
// Add proper TypeScript props
// Include proper accessibility attributes
```

**Step 9**: Press Tab, review, and accept

---


### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create three reusable form components for a Next.js onboarding system.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- Files: 
  - vaishnavi-frontend/components/ui/Select.tsx
  - vaishnavi-frontend/components/ui/RadioGroup.tsx
  - vaishnavi-frontend/components/ui/Checkbox.tsx

GENERATE:
Three reusable form components with Tailwind CSS styling

COMPONENT 1: Select
- Support options array: { label: string, value: string }[]
- Support label above select
- Support placeholder text
- Support error state with red border and error message
- TypeScript props interface
- Proper accessibility attributes

COMPONENT 2: RadioGroup
- Support options array: { label: string, value: string }[]
- Support horizontal and vertical layouts
- Support label for the group
- Support error state with error message
- TypeScript props interface
- Proper accessibility attributes

COMPONENT 3: Checkbox
- Support label text
- Support checked state
- Support disabled state
- Support error state
- TypeScript props interface
- Proper accessibility attributes

REQUIREMENTS:
1. Use Tailwind CSS for all styling
2. Add proper TypeScript interfaces for props
3. Include JSDoc comments
4. Make components fully accessible (ARIA labels)
5. Add hover and focus states
6. Export as default

OUTPUT FORMAT:
- Three complete component files
- Include all imports (React)
- Ready to use without modifications
```

**What You'll Get**: Three complete form component files

**What to Do**:
1. Copy each component code
2. Create files at specified paths
3. Paste and save each file

---


## Prompt 3: Create Onboarding API Helper Functions

### Purpose
Build helper functions for onboarding API calls (preferences, child profile, exam selection).

### When to Use
Create this before building UI components to handle API calls.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/lib/onboarding.ts`

**Step 2**: Type this comment:
```typescript
// Create onboarding API helper functions
// Functions: savePreferences, getPreferences, createChildProfile, getChildProfile
// Functions: getAvailableExams, selectExam, getOnboardingStatus
// Call backend API at /api/onboarding endpoints
// Return typed responses with error handling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create onboarding API helper functions for a Next.js frontend.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript
- File: vaishnavi-frontend/lib/onboarding.ts
- Backend API: http://localhost:8000/api/onboarding

GENERATE:
Onboarding helper functions that call backend API

FUNCTIONS NEEDED:
1. savePreferences(data: PreferencesData) → PreferencesResponse
   - POST to /api/onboarding/preferences
   - Return preferences with parent_id

2. getPreferences() → PreferencesResponse
   - GET from /api/onboarding/preferences
   - Return current preferences

3. createChildProfile(data: ChildProfileData) → ChildProfileResponse
   - POST to /api/onboarding/child
   - Return child profile with child_id
   - Handle 400 error (one-child restriction)

4. getChildProfile() → ChildProfileResponse
   - GET from /api/onboarding/child
   - Return child profile

5. getAvailableExams() → AvailableExamsResponse
   - GET from /api/onboarding/exams/available
   - Return list of exams with dates

6. selectExam(data: ExamSelectionData) → ExamSelectionResponse
   - POST to /api/onboarding/exam/select
   - Return exam selection with diagnostic_test_id

7. getOnboardingStatus() → OnboardingStatusResponse
   - GET from /api/onboarding/status
   - Return completion status for each step

REQUIREMENTS:
1. Use fetch API for HTTP requests
2. Add proper error handling with try-catch
3. Include TypeScript types for all parameters and returns
4. Add JSDoc comments for each function
5. Handle network errors gracefully
6. Return user-friendly error messages
7. Use types from types/onboarding.ts

INTEGRATE WITH:
- lib/api.ts (API client base URL)
- types/onboarding.ts (onboarding types)

OUTPUT FORMAT:
- Complete TypeScript file
- Include all imports
- Export all functions
```

**What You'll Get**: Complete onboarding helper functions

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/lib/onboarding.ts`
3. Paste and save

---


## Prompt 4: Create Onboarding State Management Hook

### Purpose
Build React hook for managing onboarding state across multiple steps.

### When to Use
Create this hook to provide onboarding state to all step components.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/hooks/useOnboarding.ts`

**Step 2**: Type this comment:
```typescript
// Create useOnboarding hook for multi-step state management
// Track: currentStep, preferences, childProfile, examSelection, isComplete
// Functions: nextStep, previousStep, saveStepData, completeOnboarding
// Use React useState for state management
// Integrate with lib/onboarding.ts for API calls
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create React hook for onboarding state management in Next.js.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hooks
- File: vaishnavi-frontend/hooks/useOnboarding.ts

GENERATE:
Custom React hook for managing multi-step onboarding state

HOOK: useOnboarding

State:
- currentStep: number (1-3)
- preferences: PreferencesData | null
- childProfile: ChildProfileData | null
- examSelection: ExamSelectionData | null
- isComplete: boolean
- loading: boolean
- error: string | null

Functions:
- nextStep() → void (move to next step)
- previousStep() → void (move to previous step)
- savePreferences(data: PreferencesData) → Promise<void>
- saveChildProfile(data: ChildProfileData) → Promise<void>
- saveExamSelection(data: ExamSelectionData) → Promise<void>
- completeOnboarding() → Promise<void>
- resetOnboarding() → void

Behavior:
- Initialize with currentStep = 1
- Save data for each step when moving forward
- Persist data across steps
- Call API functions from lib/onboarding.ts
- Handle loading and error states
- Mark isComplete when all steps done

REQUIREMENTS:
1. Use React hooks (useState, useCallback)
2. Add proper TypeScript types
3. Include JSDoc comments
4. Handle errors gracefully
5. Integrate with lib/onboarding.ts
6. Export hook as default

INTEGRATE WITH:
- lib/onboarding.ts (API functions)
- types/onboarding.ts (onboarding types)

OUTPUT FORMAT:
- Complete hook file
- Include all imports
- Ready to use in components
```

**What You'll Get**: Complete onboarding state management hook

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/hooks/useOnboarding.ts`
3. Paste and save

---


## Prompt 5: Create Step Indicator Component

### Purpose
Build visual progress stepper showing current step (1/3, 2/3, 3/3).

### When to Use
Create this before building step components for visual progress tracking.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/onboarding/StepIndicator.tsx`

**Step 2**: Type this comment:
```typescript
// Create StepIndicator component for progress visualization
// Show 3 steps with circles and connecting lines
// Highlight current step, show completed steps with checkmark
// Props: currentStep (1-3), stepLabels (array of strings)
// Use Tailwind CSS for styling
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create step indicator component for multi-step onboarding wizard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/onboarding/StepIndicator.tsx

GENERATE:
Visual progress stepper component

FEATURES:
1. Display 3 steps horizontally
2. Each step shows:
   - Circle with step number or checkmark (if completed)
   - Step label below circle
   - Connecting line to next step
3. Visual states:
   - Completed: Green circle with checkmark, green line
   - Current: Blue circle with number, gray line
   - Upcoming: Gray circle with number, gray line
4. Responsive design (stack vertically on mobile)

PROPS:
- currentStep: number (1-3)
- stepLabels: string[] (e.g., ["Preferences", "Child Profile", "Exam Selection"])

REQUIREMENTS:
1. Use Tailwind CSS for styling
2. Add proper TypeScript interface for props
3. Include JSDoc comments
4. Use icons for checkmarks (or Unicode ✓)
5. Responsive design
6. Export as default

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Ready to use in wizard
```

**What You'll Get**: Complete step indicator component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/onboarding/StepIndicator.tsx`
3. Paste and save

---


## Prompt 6: Create Preferences Step Component

### Purpose
Build Step 1 form for parent preferences (language, notifications, teaching involvement).

### When to Use
Create this as the first step component in the onboarding flow.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/onboarding/PreferencesStep.tsx`

**Step 2**: Type this comment:
```typescript
// Create PreferencesStep component for Step 1
// Fields: language (select), email/sms/push notifications (checkboxes), teaching_involvement (radio)
// Use React Hook Form for validation
// Call savePreferences from useOnboarding hook
// Show loading state during save
// Display error messages
// Use Select, Checkbox, RadioGroup components from ui/
// "Next" button to proceed
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create preferences step component for onboarding wizard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hook Form, Tailwind CSS
- File: vaishnavi-frontend/components/onboarding/PreferencesStep.tsx

GENERATE:
Step 1 form component for parent preferences

FIELDS:
1. Language (Select dropdown):
   - Options: English, Hindi, Marathi
   - Values: "en", "hi", "mr"
   - Required field

2. Notification Preferences (Checkboxes):
   - Email notifications (default: checked)
   - SMS notifications (default: checked)
   - Push notifications (default: checked)

3. Teaching Involvement (Radio buttons):
   - Options: High, Medium, Low
   - Values: "high", "medium", "low"
   - Required field

FEATURES:
- Form validation with React Hook Form
- "Next" button with loading state
- Error message display
- Call savePreferences from useOnboarding hook
- Move to next step on success

REQUIREMENTS:
1. Use React Hook Form for validation
2. Use Select, Checkbox, RadioGroup components from components/ui/
3. Use Button component from components/ui/
4. Add proper TypeScript interfaces for props
5. Include JSDoc comments
6. Handle loading and error states
7. Use Tailwind CSS for layout
8. Integrate with useOnboarding hook

INTEGRATE WITH:
- hooks/useOnboarding.ts (savePreferences, nextStep)
- components/ui/Select.tsx
- components/ui/Checkbox.tsx
- components/ui/RadioGroup.tsx
- components/ui/Button.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete preferences step component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/onboarding/PreferencesStep.tsx`
3. Paste and save

---


## Prompt 7: Create Child Profile Step Component

### Purpose
Build Step 2 form for child profile (name, age, grade, current level).

### When to Use
Create this as the second step component in the onboarding flow.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/onboarding/ChildProfileStep.tsx`

**Step 2**: Type this comment:
```typescript
// Create ChildProfileStep component for Step 2
// Fields: name (text), age (number 14-19), grade (select 9-12), current_level (radio)
// Use React Hook Form with validation
// Call saveChildProfile from useOnboarding hook
// Handle one-child restriction error (400)
// Show loading state during save
// Display error messages
// "Back" button to previous step, "Next" button to proceed
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create child profile step component for onboarding wizard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hook Form, Tailwind CSS
- File: vaishnavi-frontend/components/onboarding/ChildProfileStep.tsx

GENERATE:
Step 2 form component for child profile

FIELDS:
1. Child Name (Text input):
   - Required field
   - Min 2 characters, max 100 characters

2. Age (Number input):
   - Required field
   - Must be between 14 and 19
   - Validation message: "Age must be between 14 and 19"

3. Grade (Select dropdown):
   - Options: 9, 10, 11, 12
   - Required field

4. Current Level (Radio buttons):
   - Options: Beginner, Intermediate, Advanced
   - Values: "beginner", "intermediate", "advanced"
   - Required field

FEATURES:
- Form validation with React Hook Form
- "Back" button to return to Step 1
- "Next" button with loading state
- Error message display
- Handle one-child restriction error (show alert)
- Call saveChildProfile from useOnboarding hook
- Move to next step on success

REQUIREMENTS:
1. Use React Hook Form for validation
2. Use Input, Select, RadioGroup components from components/ui/
3. Use Button, Alert components from components/ui/
4. Add proper TypeScript interfaces for props
5. Include JSDoc comments
6. Handle loading and error states
7. Use Tailwind CSS for layout
8. Integrate with useOnboarding hook

INTEGRATE WITH:
- hooks/useOnboarding.ts (saveChildProfile, nextStep, previousStep)
- components/ui/Input.tsx
- components/ui/Select.tsx
- components/ui/RadioGroup.tsx
- components/ui/Button.tsx
- components/ui/Alert.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete child profile step component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/onboarding/ChildProfileStep.tsx`
3. Paste and save

---


## Prompt 8: Create Exam Selection Step Component

### Purpose
Build Step 3 form for exam selection (exam type, date, subject weightages).

### When to Use
Create this as the final step component in the onboarding flow.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/onboarding/ExamSelectionStep.tsx`

**Step 2**: Type this comment:
```typescript
// Create ExamSelectionStep component for Step 3
// Fields: exam_type (select), exam_date (select from available), subject weightages (sliders)
// Fetch available exams on mount
// Show different subjects based on exam type (JEE: Physics/Chemistry/Math, NEET: Physics/Chemistry/Biology)
// Validate weightages sum to 100%
// Show real-time sum display
// Calculate and display days until exam
// Use React Hook Form with validation
// Call saveExamSelection from useOnboarding hook
// "Back" button to previous step, "Complete Onboarding" button to finish
// Show success message and redirect to dashboard
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create exam selection step component for onboarding wizard.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, React Hook Form, Tailwind CSS
- File: vaishnavi-frontend/components/onboarding/ExamSelectionStep.tsx

GENERATE:
Step 3 form component for exam selection

FIELDS:
1. Exam Type (Select dropdown):
   - Options: JEE Main, JEE Advanced, NEET
   - Values: "JEE_MAIN", "JEE_ADVANCED", "NEET"
   - Required field
   - Fetch available exams on mount

2. Exam Date (Select dropdown):
   - Options: Available dates from API
   - Format: "DD MMM YYYY"
   - Required field
   - Update when exam type changes

3. Subject Weightages (Range sliders):
   - For JEE: Physics, Chemistry, Mathematics
   - For NEET: Physics, Chemistry, Biology
   - Each slider: 0-100%
   - Must sum to exactly 100%
   - Show real-time sum display
   - Validation: "Weightages must sum to 100%"

4. Days Until Exam (Display only):
   - Calculate from selected exam date
   - Show: "X days until exam"

FEATURES:
- Form validation with React Hook Form
- "Back" button to return to Step 2
- "Complete Onboarding" button with loading state
- Error message display
- Success message on completion
- Redirect to /dashboard after success
- Call saveExamSelection from useOnboarding hook
- Dynamic subject fields based on exam type

REQUIREMENTS:
1. Use React Hook Form for validation
2. Use Select, Input (range) components from components/ui/
3. Use Button, Alert components from components/ui/
4. Add proper TypeScript interfaces for props
5. Include JSDoc comments
6. Handle loading and error states
7. Use Tailwind CSS for layout
8. Integrate with useOnboarding hook
9. Use useEffect to fetch available exams
10. Calculate days until exam dynamically

INTEGRATE WITH:
- hooks/useOnboarding.ts (saveExamSelection, previousStep, completeOnboarding)
- lib/onboarding.ts (getAvailableExams)
- components/ui/Select.tsx
- components/ui/Input.tsx
- components/ui/Button.tsx
- components/ui/Alert.tsx
- next/navigation (useRouter for redirect)

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete exam selection step component

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/onboarding/ExamSelectionStep.tsx`
3. Paste and save

---


## Prompt 9: Create Onboarding Wizard Container

### Purpose
Build main wizard container that orchestrates all steps with stepper.

### When to Use
Create this to tie all step components together with navigation.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/components/onboarding/OnboardingWizard.tsx`

**Step 2**: Type this comment:
```typescript
// Create OnboardingWizard container component
// Use useOnboarding hook for state management
// Show StepIndicator at top
// Render current step component based on currentStep
// Step 1: PreferencesStep, Step 2: ChildProfileStep, Step 3: ExamSelectionStep
// Handle step navigation
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create onboarding wizard container component that orchestrates all steps.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/components/onboarding/OnboardingWizard.tsx

GENERATE:
Main wizard container component

FEATURES:
1. Use useOnboarding hook for state management
2. Display StepIndicator at top showing current progress
3. Render appropriate step component based on currentStep:
   - Step 1: PreferencesStep
   - Step 2: ChildProfileStep
   - Step 3: ExamSelectionStep
4. Responsive layout with max-width container
5. Card-style design with shadow

LAYOUT:
- Container: max-w-4xl, centered, padding
- StepIndicator: at top
- Step content: in card with padding
- Responsive design

REQUIREMENTS:
1. Use useOnboarding hook
2. Import all step components
3. Import StepIndicator component
4. Add proper TypeScript types
5. Include JSDoc comments
6. Use Tailwind CSS for layout
7. Export as default

INTEGRATE WITH:
- hooks/useOnboarding.ts
- components/onboarding/StepIndicator.tsx
- components/onboarding/PreferencesStep.tsx
- components/onboarding/ChildProfileStep.tsx
- components/onboarding/ExamSelectionStep.tsx

OUTPUT FORMAT:
- Complete component file
- Include all imports
- Export as default
```

**What You'll Get**: Complete onboarding wizard container

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/components/onboarding/OnboardingWizard.tsx`
3. Paste and save

---


## Prompt 10: Create Onboarding Page

### Purpose
Build the main onboarding page that renders the wizard.

### When to Use
Create this as the entry point for the onboarding flow.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Create file `vaishnavi-frontend/app/onboarding/page.tsx`

**Step 2**: Type this comment:
```typescript
// Create onboarding page
// Render OnboardingWizard component
// Add page title and metadata
// Use 'use client' directive
// Check if user is authenticated (redirect to login if not)
// Add proper TypeScript types
```

**Step 3**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Create onboarding page for the Next.js app.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- File: vaishnavi-frontend/app/onboarding/page.tsx

GENERATE:
Onboarding page component

FEATURES:
1. Page title: "Complete Your Profile"
2. Subtitle: "Help us personalize your learning experience"
3. Render OnboardingWizard component
4. Check authentication (redirect to /auth/login if not authenticated)
5. Responsive layout

REQUIREMENTS:
1. Use Next.js App Router (page.tsx)
2. Add 'use client' directive (client component)
3. Add metadata for SEO
4. Use Tailwind CSS for layout
5. Import OnboardingWizard component
6. Add proper TypeScript types
7. Export as default

INTEGRATE WITH:
- components/onboarding/OnboardingWizard.tsx
- hooks/useAuth.ts (for authentication check)

OUTPUT FORMAT:
- Complete page file
- Include all imports
- Export as default
- Add metadata export
```

**What You'll Get**: Complete onboarding page

**What to Do**:
1. Copy the generated code
2. Create file at `vaishnavi-frontend/app/onboarding/page.tsx`
3. Paste and save

---


## Prompt 11: Update Mock API Server

### Purpose
Add onboarding endpoints to mock API server for standalone testing.

### When to Use
Update this to test onboarding UI without backend.

---

### Option A: For Windsurf/Copilot (Inline in IDE)

**Step 1**: Open file `vaishnavi-frontend/mock-data/mock-api-server.js`

**Step 2**: Add this comment at the end of the file:
```javascript
// Add onboarding endpoints:
// POST /api/onboarding/preferences - Return mock preferences response
// GET /api/onboarding/preferences - Return mock preferences
// POST /api/onboarding/child - Return mock child profile (handle one-child restriction)
// GET /api/onboarding/child - Return mock child profile
// GET /api/onboarding/exams/available - Return available exams with dates
// POST /api/onboarding/exam/select - Return exam selection with diagnostic_test_id
// GET /api/onboarding/status - Return onboarding completion status
// All endpoints should return realistic mock data
```

**Step 3**: Press Tab, review, and accept

**Step 4**: Open file `vaishnavi-frontend/mock-data/mock-api-responses.json`

**Step 5**: Add this comment:
```json
// Add mock responses for onboarding:
// preferencesResponse, childProfileResponse, availableExamsResponse, examSelectionResponse
// Include realistic data matching API contract
```

**Step 6**: Press Tab, review, and accept

---

### Option B: For ChatGPT/Claude (Chat Interface)

**Copy this entire prompt**:
```
Update mock API server with onboarding endpoints for testing.

CONTEXT:
- Project: Mentor AI Frontend
- Stack: Express.js, Node.js
- Files:
  - vaishnavi-frontend/mock-data/mock-api-server.js
  - vaishnavi-frontend/mock-data/mock-api-responses.json

GENERATE:
Add onboarding endpoints to existing mock server

ENDPOINTS TO ADD:

1. POST /api/onboarding/preferences
   - Accept: { language, email_notifications, sms_notifications, push_notifications, teaching_involvement }
   - Return: { parent_id, ...preferences, created_at, updated_at }

2. GET /api/onboarding/preferences
   - Return: { parent_id, ...preferences, created_at, updated_at }

3. POST /api/onboarding/child
   - Accept: { name, age, grade, current_level }
   - Return: { child_id, parent_id, ...profile, created_at, updated_at }
   - Handle: Return 400 error if parent already has child (for testing)

4. GET /api/onboarding/child
   - Return: { child_id, parent_id, ...profile, created_at, updated_at }

5. GET /api/onboarding/exams/available
   - Return: { exams: [{ exam_type, exam_name, available_dates, subjects }] }
   - JEE_MAIN: dates in Jan and Apr
   - JEE_ADVANCED: dates in May
   - NEET: dates in May

6. POST /api/onboarding/exam/select
   - Accept: { exam_type, exam_date, subject_preferences }
   - Return: { child_id, exam_type, exam_date, subject_preferences, days_until_exam, diagnostic_test_id, created_at }

7. GET /api/onboarding/status
   - Return: { preferences_complete, child_profile_complete, exam_selection_complete, is_complete }

MOCK DATA:
- Use realistic IDs (UUIDs)
- Use realistic dates (future dates for exams)
- Include proper timestamps

REQUIREMENTS:
1. Add endpoints to existing Express server
2. Return realistic mock data
3. Add 500ms delay to simulate network
4. Log requests to console
5. Handle CORS properly
6. Add error responses for testing

UPDATE:
- mock-api-server.js: Add endpoint handlers
- mock-api-responses.json: Add mock response data

OUTPUT FORMAT:
- Updated mock-api-server.js with new endpoints
- Updated mock-api-responses.json with mock data
- Ready to run with: node mock-data/mock-api-server.js
```

**What You'll Get**: Updated mock API server with onboarding endpoints

**What to Do**:
1. Copy the updated code
2. Update files at specified paths
3. Save and test by running: `node mock-data/mock-api-server.js`

---

## Summary

You've created all the code for Day 3 Onboarding Flow UI! Here's what you generated:

**Types & Utilities:**
- ✅ Onboarding TypeScript types
- ✅ Reusable form components (Select, RadioGroup, Checkbox)
- ✅ Onboarding API helper functions
- ✅ Onboarding state management hook

**Components:**
- ✅ Step indicator (progress stepper)
- ✅ Preferences step form
- ✅ Child profile step form
- ✅ Exam selection step form
- ✅ Onboarding wizard container

**Pages:**
- ✅ Onboarding page

**Testing:**
- ✅ Mock API server with onboarding endpoints
- ✅ Mock data for standalone testing

## Next Steps

1. Open **CONFIGURATION.md** to set up form libraries and dependencies
2. Follow **TESTING.md** to verify the complete onboarding flow
3. Check **EXPECTED-OUTCOME.md** for success criteria
4. Review **USER-FLOW.md** for the complete user journey
5. Use **TROUBLESHOOTING.md** if you encounter issues

Ready to configure and test? Open **CONFIGURATION.md** next!

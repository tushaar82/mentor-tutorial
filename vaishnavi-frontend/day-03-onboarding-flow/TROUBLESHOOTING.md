# Troubleshooting Guide for Day 3: Onboarding Flow UI

This document provides solutions to common issues you may encounter while building or testing the onboarding flow.

---

## Form Validation Issues

### Issue 1: Form Submits Without Validation

**Symptoms**:
- "Next" button works even when fields are empty
- No validation errors shown
- Form advances to next step with invalid data

**Possible Causes**:
1. React Hook Form not properly configured
2. Validation rules not defined
3. Form submission not using handleSubmit

**Solutions**:

**Solution 1**: Verify React Hook Form setup
```typescript
// In your step component
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

// Button should call handleSubmit
<Button onClick={handleSubmit(onSubmit)}>Next</Button>
```

**Solution 2**: Add validation rules
```typescript
<Input
  {...register('name', {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  })}
/>
```

**Solution 3**: Check form submission
```typescript
const onSubmit = async (data) => {
  // This only runs if validation passes
  await saveData(data);
  nextStep();
};
```

---

### Issue 2: Validation Errors Not Displaying

**Symptoms**:
- Form doesn't submit but no error messages shown
- User doesn't know what's wrong

**Possible Causes**:
1. Error messages not rendered
2. Errors object not accessed correctly
3. CSS hiding error messages

**Solutions**:

**Solution 1**: Display error messages
```typescript
{errors.name && (
  <span className="text-red-500 text-sm">{errors.name.message}</span>
)}
```

**Solution 2**: Use Alert component
```typescript
{errors.name && (
  <Alert variant="error">{errors.name.message}</Alert>
)}
```

**Solution 3**: Check CSS
```css
/* Ensure error messages are visible */
.error-message {
  display: block;
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

---

### Issue 3: Age Validation Not Working

**Symptoms**:
- Can enter age < 14 or > 19
- Validation message doesn't show

**Possible Causes**:
1. Validation rules not set correctly
2. Input type not "number"
3. Min/max attributes missing

**Solutions**:

**Solution 1**: Add proper validation
```typescript
<Input
  type="number"
  {...register('age', {
    required: 'Age is required',
    min: { value: 14, message: 'Age must be at least 14' },
    max: { value: 19, message: 'Age must be at most 19' },
    valueAsNumber: true
  })}
/>
```

**Solution 2**: Add HTML5 validation
```typescript
<Input
  type="number"
  min={14}
  max={19}
  {...register('age', { /* validation rules */ })}
/>
```

---

### Issue 4: Weightages Don't Sum to 100%

**Symptoms**:
- Can submit form even when weightages don't sum to 100%
- Or can't submit even when they do sum to 100%

**Possible Causes**:
1. Custom validation not implemented
2. Floating point precision issues
3. Validation logic incorrect

**Solutions**:

**Solution 1**: Add custom validation
```typescript
const { watch } = useForm();
const physics = watch('physics', 0);
const chemistry = watch('chemistry', 0);
const mathematics = watch('mathematics', 0);

const sum = physics + chemistry + mathematics;
const isValid = sum === 100;

// In button
<Button disabled={!isValid}>Complete Onboarding</Button>
```

**Solution 2**: Handle floating point
```typescript
const sum = Math.round(physics + chemistry + mathematics);
const isValid = sum === 100;
```

**Solution 3**: Show real-time feedback
```typescript
<div className={sum === 100 ? 'text-green-500' : 'text-red-500'}>
  Total: {sum}% {sum === 100 ? '✓' : '✗'}
</div>
```

---

## State Management Issues

### Issue 5: Data Lost When Going Back

**Symptoms**:
- Click "Back" button
- Previous step shows empty form
- Have to re-enter all data

**Possible Causes**:
1. State not persisted in useOnboarding hook
2. Form not initialized with saved data
3. State cleared on step change

**Solutions**:

**Solution 1**: Persist state in hook
```typescript
// In useOnboarding hook
const [preferences, setPreferences] = useState<PreferencesData | null>(null);

const savePreferences = async (data: PreferencesData) => {
  setPreferences(data); // Save to state
  await api.savePreferences(data);
  nextStep();
};
```

**Solution 2**: Initialize form with saved data
```typescript
// In PreferencesStep component
const { preferences } = useOnboarding();

const { register } = useForm({
  defaultValues: preferences || {}
});
```

**Solution 3**: Use localStorage as backup
```typescript
// Save to localStorage
localStorage.setItem('onboarding_preferences', JSON.stringify(data));

// Load from localStorage
const saved = localStorage.getItem('onboarding_preferences');
const defaultValues = saved ? JSON.parse(saved) : {};
```

---

### Issue 6: Can't Move to Next Step

**Symptoms**:
- Click "Next" button
- Loading spinner shows
- But doesn't advance to next step

**Possible Causes**:
1. nextStep() not called after API success
2. Error in API call not handled
3. currentStep not updating

**Solutions**:

**Solution 1**: Ensure nextStep() is called
```typescript
const onSubmit = async (data) => {
  try {
    await savePreferences(data);
    nextStep(); // Make sure this is called
  } catch (error) {
    setError(error.message);
  }
};
```

**Solution 2**: Check useOnboarding hook
```typescript
const nextStep = () => {
  setCurrentStep(prev => Math.min(prev + 1, 3));
};
```

**Solution 3**: Debug with console.log
```typescript
const nextStep = () => {
  console.log('Current step:', currentStep);
  setCurrentStep(prev => {
    const next = prev + 1;
    console.log('Next step:', next);
    return next;
  });
};
```

---

### Issue 7: Wrong Step Component Renders

**Symptoms**:
- Step indicator shows Step 2
- But Step 1 component is still visible

**Possible Causes**:
1. Conditional rendering logic incorrect
2. currentStep not updating
3. Component not re-rendering

**Solutions**:

**Solution 1**: Check conditional rendering
```typescript
// In OnboardingWizard
{currentStep === 1 && <PreferencesStep />}
{currentStep === 2 && <ChildProfileStep />}
{currentStep === 3 && <ExamSelectionStep />}
```

**Solution 2**: Use switch statement
```typescript
const renderStep = () => {
  switch (currentStep) {
    case 1:
      return <PreferencesStep />;
    case 2:
      return <ChildProfileStep />;
    case 3:
      return <ExamSelectionStep />;
    default:
      return <PreferencesStep />;
  }
};

return <div>{renderStep()}</div>;
```

---

## API Integration Issues

### Issue 8: API Calls Fail with CORS Error

**Symptoms**:
- Console error: "CORS policy: No 'Access-Control-Allow-Origin' header"
- API calls fail
- Network tab shows failed requests

**Possible Causes**:
1. Mock API server doesn't have CORS enabled
2. Backend doesn't allow frontend origin
3. Wrong API URL

**Solutions**:

**Solution 1**: Enable CORS in mock server
```javascript
// In mock-api-server.js
const cors = require('cors');
app.use(cors());
```

**Solution 2**: Configure CORS with options
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Solution 3**: Check API URL
```typescript
// Verify correct URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

---

### Issue 9: API Returns 404 Not Found

**Symptoms**:
- Network tab shows 404 error
- API endpoint not found
- Mock server logs show no request

**Possible Causes**:
1. Endpoint not implemented in mock server
2. Wrong endpoint URL
3. Mock server not running

**Solutions**:

**Solution 1**: Verify mock server running
```bash
# Check if server is running
curl http://localhost:3001/health

# If not, start it
node mock-data/mock-api-server.js
```

**Solution 2**: Check endpoint exists
```javascript
// In mock-api-server.js
app.post('/api/onboarding/preferences', (req, res) => {
  // Handler code
});
```

**Solution 3**: Verify URL in API call
```typescript
// Should match mock server endpoint
const response = await fetch('http://localhost:3001/api/onboarding/preferences', {
  method: 'POST',
  // ...
});
```

---

### Issue 10: One-Child Restriction Not Working

**Symptoms**:
- Can create multiple child profiles
- No error shown when trying to create second child

**Possible Causes**:
1. Mock API doesn't track created children
2. Backend doesn't enforce restriction
3. Error not handled in frontend

**Solutions**:

**Solution 1**: Track children in mock server
```javascript
// In mock-api-server.js
const children = {}; // Store by parent_id

app.post('/api/onboarding/child', (req, res) => {
  const parentId = req.headers['parent-id'];
  
  if (children[parentId]) {
    return res.status(400).json({
      error: 'Parent can only have one child profile'
    });
  }
  
  children[parentId] = req.body;
  res.status(201).json({ child_id: 'child_123', ...req.body });
});
```

**Solution 2**: Handle 400 error in frontend
```typescript
try {
  await createChildProfile(data);
  nextStep();
} catch (error) {
  if (error.status === 400) {
    setError('You can only have one child profile');
  }
}
```

---

## UI/UX Issues

### Issue 11: Step Indicator Not Updating

**Symptoms**:
- Move to next step
- Step indicator still shows previous step
- Visual progress not reflected

**Possible Causes**:
1. StepIndicator not receiving currentStep prop
2. Component not re-rendering
3. Prop not passed correctly

**Solutions**:

**Solution 1**: Pass currentStep prop
```typescript
// In OnboardingWizard
<StepIndicator currentStep={currentStep} stepLabels={labels} />
```

**Solution 2**: Check prop usage in StepIndicator
```typescript
// In StepIndicator component
interface Props {
  currentStep: number;
  stepLabels: string[];
}

const StepIndicator: React.FC<Props> = ({ currentStep, stepLabels }) => {
  // Use currentStep to highlight active step
};
```

---

### Issue 12: Loading Spinner Doesn't Show

**Symptoms**:
- Click "Next" button
- No visual feedback
- User doesn't know if something is happening

**Possible Causes**:
1. Loading state not set
2. Spinner not rendered
3. API call too fast to see spinner

**Solutions**:

**Solution 1**: Set loading state
```typescript
const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
  setLoading(true);
  try {
    await saveData(data);
    nextStep();
  } finally {
    setLoading(false);
  }
};
```

**Solution 2**: Show spinner on button
```typescript
<Button disabled={loading}>
  {loading ? 'Saving...' : 'Next'}
</Button>
```

**Solution 3**: Add minimum delay for testing
```typescript
// In mock server
app.post('/api/onboarding/preferences', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
  res.json({ /* response */ });
});
```

---

### Issue 13: Buttons Not Responsive on Mobile

**Symptoms**:
- Hard to tap buttons on mobile
- Buttons too small
- Touch targets overlap

**Possible Causes**:
1. Buttons too small (< 44px)
2. Not enough spacing between buttons
3. Missing touch-friendly styles

**Solutions**:

**Solution 1**: Increase button size
```typescript
<Button className="min-h-[44px] px-6 py-3">
  Next
</Button>
```

**Solution 2**: Add spacing between buttons
```typescript
<div className="flex gap-4">
  <Button>Back</Button>
  <Button>Next</Button>
</div>
```

**Solution 3**: Use responsive classes
```typescript
<Button className="w-full md:w-auto">
  Next
</Button>
```

---

## TypeScript Issues

### Issue 14: Type Errors in Components

**Symptoms**:
- TypeScript errors in IDE
- Build fails with type errors
- "Property does not exist on type"

**Possible Causes**:
1. Types not imported
2. Props interface incorrect
3. Type mismatch

**Solutions**:

**Solution 1**: Import types
```typescript
import { PreferencesData } from '@/types/onboarding';
```

**Solution 2**: Define props interface
```typescript
interface PreferencesStepProps {
  onNext: (data: PreferencesData) => void;
  onBack?: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ onNext, onBack }) => {
  // Component code
};
```

**Solution 3**: Fix type mismatches
```typescript
// If expecting number but getting string
const age = parseInt(formData.age, 10);

// If expecting Date but getting string
const examDate = new Date(formData.exam_date);
```

---

### Issue 15: useOnboarding Hook Type Errors

**Symptoms**:
- "Cannot find name 'useOnboarding'"
- Type errors when using hook

**Possible Causes**:
1. Hook not exported
2. Import path incorrect
3. Hook not typed correctly

**Solutions**:

**Solution 1**: Export hook
```typescript
// In hooks/useOnboarding.ts
export default function useOnboarding() {
  // Hook code
}
```

**Solution 2**: Import correctly
```typescript
import useOnboarding from '@/hooks/useOnboarding';
```

**Solution 3**: Add return type
```typescript
interface UseOnboardingReturn {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  // ... other properties
}

export default function useOnboarding(): UseOnboardingReturn {
  // Hook code
}
```

---

## Performance Issues

### Issue 16: Form Re-renders Too Often

**Symptoms**:
- Typing is laggy
- Sliders are slow to respond
- High CPU usage

**Possible Causes**:
1. Too many re-renders
2. Not using React.memo
3. Expensive calculations on every render

**Solutions**:

**Solution 1**: Use React.memo
```typescript
export default React.memo(PreferencesStep);
```

**Solution 2**: Memoize expensive calculations
```typescript
const weightageSum = useMemo(() => {
  return physics + chemistry + mathematics;
}, [physics, chemistry, mathematics]);
```

**Solution 3**: Debounce input handlers
```typescript
import { debounce } from 'lodash';

const handleSliderChange = debounce((value) => {
  setValue('physics', value);
}, 100);
```

---

## Deployment Issues

### Issue 17: Environment Variables Not Working

**Symptoms**:
- API calls go to wrong URL
- Environment variables undefined
- Works locally but not in production

**Possible Causes**:
1. Variables not prefixed with NEXT_PUBLIC_
2. .env.local not deployed
3. Build doesn't include env vars

**Solutions**:

**Solution 1**: Use correct prefix
```bash
# Must start with NEXT_PUBLIC_ for client-side
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Solution 2**: Set in deployment platform
```bash
# In Vercel/Netlify dashboard
NEXT_PUBLIC_API_URL=https://api.production.com
```

**Solution 3**: Rebuild after env changes
```bash
npm run build
```

---

## Getting More Help

If you're still stuck after trying these solutions:

1. **Check Console**: Look for error messages in browser console
2. **Check Network Tab**: Inspect API requests and responses
3. **Check React DevTools**: Inspect component state and props
4. **Add Logging**: Use console.log to debug state changes
5. **Simplify**: Comment out code to isolate the issue
6. **Compare**: Check against working examples in other days

---

## Quick Debugging Checklist

When something doesn't work:

- [ ] Is the dev server running?
- [ ] Is the mock API server running?
- [ ] Are there errors in the console?
- [ ] Are there failed network requests?
- [ ] Is the component receiving correct props?
- [ ] Is the state updating correctly?
- [ ] Are all dependencies installed?
- [ ] Did you restart the server after changes?
- [ ] Is TypeScript showing any errors?
- [ ] Did you save all files?

---

## Common Error Messages

### "Cannot read property 'map' of undefined"
- **Cause**: Trying to map over data that hasn't loaded yet
- **Fix**: Add conditional rendering: `{data && data.map(...)}`

### "Maximum update depth exceeded"
- **Cause**: Infinite re-render loop
- **Fix**: Check useEffect dependencies, ensure state updates are conditional

### "Hydration failed"
- **Cause**: Server and client render different content
- **Fix**: Use 'use client' directive, avoid using window/document on initial render

### "Module not found"
- **Cause**: Import path incorrect or package not installed
- **Fix**: Check import path, run `npm install`

---

## Still Having Issues?

If none of these solutions work:

1. Review the TESTING.md file for step-by-step testing
2. Compare your code with the prompts in PROMPTS.md
3. Check that all files from EXPECTED-OUTCOME.md exist
4. Review the USER-FLOW.md to understand expected behavior
5. Start fresh with a clean implementation of the failing component

Remember: Most issues are caused by typos, missing imports, or incorrect prop passing. Double-check the basics first!

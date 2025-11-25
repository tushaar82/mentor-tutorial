/**
 * Shared TypeScript Types for Mentor AI Platform
 * 
 * This file contains all TypeScript interfaces and types used across
 * the frontend and backend API contract. These types ensure type safety
 * and consistency between frontend and backend implementations.
 * 
 * Usage:
 * - Frontend: Import types for API calls and component props
 * - Backend: Reference these types when defining Pydantic models
 */

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface ParentRegistrationRequest {
  email?: string;
  phone?: string;
  google_token?: string;
  language: "en" | "hi" | "mr";
}

export interface ParentRegistrationResponse {
  parent_id: string;
  verification_required: boolean;
  message: string;
}

export interface LoginRequest {
  firebase_token: string;
}

export interface LoginResponse {
  user_type: "parent" | "student";
  profile: ParentProfile | StudentProfile;
  token: string;
}

export interface VerifyRequest {
  parent_id: string;
  code: string;
}

export interface VerifyResponse {
  verified: boolean;
  token: string;
}

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

export interface ParentProfile {
  parent_id: string;
  email?: string;
  phone?: string;
  language: string;
  preferences: UserPreferences;
  created_at: string;  // ISO 8601
}

export interface StudentProfile {
  student_id: string;
  child_id: string;
  name: string;
  age: number;
  grade: number;
  school: string;
  exam_details?: ExamDetails;
  created_at: string;  // ISO 8601
}

export interface UserPreferences {
  language: string;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  study_times: string[];  // ["morning", "evening"]
  educational_background: string;
}

export interface PreferencesRequest {
  language: string;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  study_times: string[];
  educational_background: string;
}

export interface PreferencesResponse {
  parent_id: string;
  preferences: PreferencesRequest;
  updated_at: string;  // ISO 8601
}

export interface ChildProfileRequest {
  name: string;
  age: number;
  grade: number;
  school: string;
  prep_status: "NOT_STARTED" | "SELF_STUDYING" | "ATTENDING_COACHING";
}

export interface ChildProfileResponse {
  child_id: string;
  student_credentials: {
    username: string;
    password: string;
  };
  profile: ChildProfileRequest;
}

export interface ExamDetails {
  exam_type: "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "MHT_CET";
  exam_session: string;  // "January 2024"
  exam_year: number;
  exam_date: string;  // ISO 8601
  days_remaining: number;
}

export interface ExamSelectionRequest {
  exam_type: "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "MHT_CET";
  exam_session: string;
  exam_year: number;
  exam_date: string;  // ISO 8601
}

export interface ExamSelectionResponse {
  child_id: string;
  exam_details: ExamSelectionRequest;
  days_remaining: number;
}

// ============================================================================
// DIAGNOSTIC TEST TYPES
// ============================================================================

export interface Question {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: "easy" | "medium" | "hard";
  type: "MCQ" | "MULTIPLE_CORRECT" | "INTEGER";
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  weightage: number;
  correct_answer?: string | string[];  // Only for backend validation
  explanation?: string;  // Only shown after submission
}

export interface DiagnosticGenerateRequest {
  child_id: string;
  exam_type: string;
}

export interface DiagnosticGenerateResponse {
  test_id: string;
  questions: Question[];
  duration_minutes: number;
  instructions: string;
}

export interface SubmitAnswerRequest {
  test_id: string;
  question_id: string;
  answer: string | string[];
}

export interface SubmitAnswerResponse {
  saved: boolean;
  question_id: string;
}

export interface SubmitTestRequest {
  test_id: string;
}

export interface SubmitTestResponse {
  test_id: string;
  overall_score: number;
  topic_scores: TopicScore[];
  analytics_id: string;
}

export interface TopicScore {
  topic: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  category: "WEAK" | "MODERATE" | "STRONG";
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsResponse {
  analytics_id: string;
  test_id: string;
  child_id: string;
  weak_subjects: SubjectAnalysis[];
  weak_topics: TopicAnalysis[];
  strategies: ImprovementStrategy[];
  visual_charts: ChartData[];
  generated_at: string;  // ISO 8601
}

export interface SubjectAnalysis {
  subject: string;
  score: number;
  weightage: number;
  weak_topics: string[];
  reason: string;
}

export interface TopicAnalysis {
  topic: string;
  score: number;
  weightage: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  reason: string;
}

export interface ImprovementStrategy {
  topic: string;
  weightage: number;
  focus_areas: string[];
  study_techniques: string[];
  estimated_time: string;
  parent_guidance: string;
}

export interface ChartData {
  type: "bar" | "line" | "radar" | "pie";
  title: string;
  data: any;  // Chart-specific data format
}

// ============================================================================
// SCHEDULE TYPES
// ============================================================================

export interface ScheduleGenerateRequest {
  child_id: string;
  analytics_id: string;
  exam_date: string;  // ISO 8601
  preferences: {
    study_hours_per_day: number;
    preferred_times: string[];
    current_prep_status: string;
  };
}

export interface ScheduleGenerateResponse {
  schedule_id: string;
  daily_tasks: DailyTask[];
  milestones: Milestone[];
  generated_at: string;  // ISO 8601
}

export interface DailyTask {
  day: number;
  date: string;  // ISO 8601
  topics: string[];
  activities: Activity[];
  total_hours: number;
  milestone?: string;
  completed?: boolean;
}

export interface Activity {
  type: "CONCEPT_LEARNING" | "PRACTICE" | "REVIEW" | "MOCK_TEST";
  topic: string;
  duration_hours: number;
  weightage?: number;
  description: string;
  completed?: boolean;
}

export interface Milestone {
  week: number;
  goal: string;
  topics_covered: string[];
  assessment: string;
}

export interface ScheduleResponse {
  schedule_id: string;
  child_id: string;
  schedule: ScheduleGenerateResponse;
  progress: {
    completed_tasks: number;
    total_tasks: number;
    completion_percentage: number;
  };
  adjustments: ScheduleAdjustment[];
}

export interface ScheduleAdjustment {
  date: string;  // ISO 8601
  reason: "MISSED_SESSION" | "PRACTICE_TEST_PERFORMANCE";
  changes: string[];
}

export interface RescheduleRequest {
  schedule_id: string;
  reason: "MISSED_SESSION" | "PRACTICE_TEST_PERFORMANCE";
  trigger_data: {
    missed_sessions?: number;
    new_weak_topics?: string[];
    improved_topics?: string[];
  };
}

export interface RescheduleResponse {
  schedule_id: string;
  updated_schedule: ScheduleGenerateResponse;
  changes: string[];
  strategy: "MINOR_ADJUSTMENT" | "MAJOR_REPLAN" | "PRIORITY_BOOST";
}

// ============================================================================
// QUESTION GENERATION TYPES
// ============================================================================

export interface QuestionGenerateRequest {
  topic: string;
  exam_type: string;
  difficulty: "easy" | "medium" | "hard";
  count: number;
}

export interface QuestionGenerateResponse {
  questions: Question[];
  generated_at: string;  // ISO 8601
}

export interface PracticeSessionRequest {
  child_id: string;
  topic: string;
  session_type: "PRACTICE" | "REVIEW";
}

export interface PracticeSessionResponse {
  session_id: string;
  questions: Question[];
  duration_minutes: number;
}

// ============================================================================
// TEACHING RESOURCES TYPES
// ============================================================================

export interface TeachingNotesQuery {
  language: string;
  exam_type: string;
}

export interface TeachingNotesResponse {
  topic: string;
  language: string;
  notes: string;  // Markdown format
  examples: string[];
  formulas: string[];
  generated_at: string;  // ISO 8601
}

export interface TeachingMethodologyResponse {
  topic: string;
  teaching_guide: string;
  common_difficulties: string[];
  activities: string[];
  teaching_sequence: string[];
}

export interface MindmapQuery {
  language: string;
}

export interface MindmapResponse {
  topic: string;
  language: string;
  mindmap_data: MindmapNode;
  image_url?: string;
}

export interface MindmapNode {
  id: string;
  label: string;
  children: MindmapNode[];
}

export interface AudioSummaryQuery {
  language: string;
}

export interface AudioSummaryResponse {
  topic: string;
  language: string;
  audio_url: string;
  transcript: string;
  duration_seconds: number;
}

// ============================================================================
// PAYMENT TYPES
// ============================================================================

export interface PaymentOrderRequest {
  parent_id: string;
  plan_id: string;
}

export interface PaymentOrderResponse {
  order_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  razorpay_key_id: string;  // For frontend integration
}

export interface PaymentVerifyRequest {
  order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentVerifyResponse {
  verified: boolean;
  subscription_active: boolean;
  subscription_expiry: string;  // ISO 8601
}

export interface PaymentHistoryResponse {
  transactions: Transaction[];
  current_plan: string;
  renewal_date: string;  // ISO 8601
}

export interface Transaction {
  transaction_id: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
  date: string;  // ISO 8601
  plan: string;
}

// ============================================================================
// PROGRESS TRACKING TYPES
// ============================================================================

export interface ProgressResponse {
  student_id: string;
  overall_progress: {
    completion_percentage: number;
    mastery_score: number;
    topics_completed: number;
    total_topics: number;
  };
  subject_progress: SubjectProgress[];
  topic_progress: TopicProgress[];
  timeline: ProgressTimeline[];
}

export interface SubjectProgress {
  subject: string;
  completion_percentage: number;
  mastery_score: number;
}

export interface TopicProgress {
  topic: string;
  completion_percentage: number;
  mastery_score: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "MASTERED";
  time_spent_hours: number;
  practice_sessions: number;
  last_practiced: string;  // ISO 8601
}

export interface ProgressTimeline {
  date: string;  // ISO 8601
  topics_covered: string[];
  time_spent_hours: number;
  questions_attempted: number;
  questions_correct: number;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface ParentDashboardResponse {
  parent_id: string;
  child_profile: StudentProfile;
  progress_summary: {
    overall_completion: number;
    weak_areas: string[];
    strong_areas: string[];
    study_streak_days: number;
    daily_study_hours: number;
  };
  schedule_summary: {
    today_tasks: DailyTask;
    upcoming_milestones: Milestone[];
  };
  analytics_summary: {
    recent_test_score: number;
    improvement_trend: "IMPROVING" | "STABLE" | "DECLINING";
  };
}

export interface StudentDashboardResponse {
  student_id: string;
  exam_details: ExamDetails;
  today_tasks: DailyTask;
  progress_summary: {
    topics_mastered: number;
    current_streak: number;
    total_study_hours: number;
  };
  diagnostic_status: {
    completed: boolean;
    score?: number;
    analytics_available: boolean;
  };
  practice_recommendations: {
    topic: string;
    reason: string;
  }[];
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;  // ISO 8601
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ExamType = "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "MHT_CET";
export type Language = "en" | "hi" | "mr";
export type Difficulty = "easy" | "medium" | "hard";
export type QuestionType = "MCQ" | "MULTIPLE_CORRECT" | "INTEGER";
export type ActivityType = "CONCEPT_LEARNING" | "PRACTICE" | "REVIEW" | "MOCK_TEST";
export type TopicCategory = "WEAK" | "MODERATE" | "STRONG";
export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type TopicStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "MASTERED";
export type ImprovementTrend = "IMPROVING" | "STABLE" | "DECLINING";
export type TransactionStatus = "SUCCESS" | "FAILED" | "PENDING";

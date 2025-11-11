/**
 * Application-wide constants and configuration values
 */

// Budget and Bidding
export const DEFAULT_STUDENT_BUDGET = 100;
export const DEFAULT_TOTAL_EDOLLARS = 120;
export const EDOLLAR_RANGE_MIN = 100;
export const EDOLLAR_RANGE_MAX = 150;

// Bidding Risk Thresholds
export const SUBSCRIBER_RATIO_HIGH_RISK = 1.8;
export const SUBSCRIBER_RATIO_MEDIUM_RISK = 1.4;
export const SUBSCRIBER_RATIO_LOW_RISK = 1.0;

// Assessment Load Thresholds
export const ASSESSMENT_LOAD_HIGH = 3;
export const ASSESSMENT_LOAD_VERY_HIGH = 4;
export const ASSESSMENT_CLASH_WARNING_DAYS = 7;
export const ASSESSMENT_CLASH_CAUTION_DAYS = 14;

// Course Colors - Consistent across all views
export const COURSE_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-cyan-500'
];

// Chart Colors for Data Visualization
export const CHART_COLORS = {
  primary: '#003D7C',
  secondary: '#0055A5',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6'
};

// Credit Distribution Colors
export const CREDIT_TYPE_COLORS = {
  core: '#003D7C',
  elective: '#0055A5',
  discipline: '#10b981',
  free: '#f59e0b'
};

// AI Recommendation Confidence Thresholds
export const CONFIDENCE_HIGH = 70;
export const CONFIDENCE_MEDIUM = 50;

// Career Pathway Match Threshold
export const CAREER_MATCH_THRESHOLD = 60;

// Time Formats
export const TIME_FORMAT_24H = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';

// Validation
export const EMAIL_DOMAIN = '@smu.edu.sg';
export const MIN_PASSWORD_LENGTH = 8;

// LocalStorage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  COURSE_RATINGS: 'courseRatings',
  COMPLETED_COURSES: 'completedCourses',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed'
};

// Academic Progress
export const TOTAL_CREDITS_REQUIRED = 120;
export const MIN_CORE_CREDITS = 30;
export const MIN_DISCIPLINE_CREDITS = 45;

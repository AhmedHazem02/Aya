// ===== Application Constants =====

// API Base URL — يُقرأ من .env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Auth token storage key
export const TOKEN_KEY = 'skills_center_token';
export const USER_KEY = 'skills_center_user';
export const REFRESH_TOKEN_KEY = 'skills_center_refresh_token';

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  ENGINEER: 'engineer',
  ADMIN: 'admin',
};

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

export const COURSE_LEVELS_AR = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

// Routes
export const ROUTES = {
  HOME: '/',
  // Auth
  STUDENT_LOGIN: '/auth/student/login',
  STUDENT_REGISTER: '/auth/student/register',
  ENGINEER_LOGIN: '/auth/engineer/login',
  ENGINEER_JOIN: '/auth/engineer/join',
  // Student
  DASHBOARD: '/dashboard',
  MY_COURSES: '/my-courses',
  // Courses (public)
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  // Rating
  RATE_COURSE: '/courses/:id/rate',
  // Engineer
  ENGINEER_DASHBOARD: '/engineer/dashboard',
};

// Navigation Links (after login)
export const NAV_LINKS_STUDENT = [
  { label: 'الكورسات', path: ROUTES.COURSES },
  { label: 'كورساتي', path: ROUTES.MY_COURSES },
  { label: 'الدعم', path: '/support' },
];

// Footer Links
export const FOOTER_QUICK_LINKS = [
  { label: 'الكورسات', path: ROUTES.COURSES },
  { label: 'الدعم الفني', path: '/support' },
  { label: 'من نحن', path: '/about' },
];

// Platform Stats (Home Page)
export const PLATFORM_STATS = [
  { value: '95%', label: 'نسبة رضا الطلاب', icon: '📈' },
  { value: '150+', label: 'مدرب محترف', icon: '👨‍🏫' },
  { value: '10,000+', label: 'طالب نشط', icon: '👥' },
  { value: '500+', label: 'كورس تعليمي', icon: '📚' },
];

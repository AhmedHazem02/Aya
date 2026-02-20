// ===== Mock Data — يُستخدم عند تشغيل VITE_MOCK_MODE=true =====
// ⚠️ هذا الملف للتطوير فقط — لا يُستخدم في الإنتاج

// بيانات المستخدمين الوهميين
export const MOCK_USERS = {
  student: {
    id: 1,
    name: 'أحمد علي',
    email: 'student@test.com',
    role: 'student',
    avatar: null,
  },
  engineer: {
    id: 2,
    name: 'م / سارة أحمد',
    email: 'engineer@test.com',
    role: 'engineer',
    avatar: null,
  },
  admin: {
    id: 3,
    name: 'الإدارة',
    email: 'admin@test.com',
    role: 'admin',
    avatar: null,
  },
};

// توكنات وهمية
export const MOCK_TOKEN = 'mock_access_token_dev_only';
export const MOCK_REFRESH_TOKEN = 'mock_refresh_token_dev_only';

// تأخير وهمي يحاكي استجابة السيرفر (ms)
export const mockDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// كورسات وهمية
export const MOCK_COURSES = [
  {
    id: 1,
    title: 'تصميم واجهات المستخدم UI/UX',
    level: 'advanced',
    price: 1800,
    thumbnail: null,
    duration_weeks: 10,
    students_count: 178,
    start_date: '2025-03-25',
    instructor: { id: 10, name: 'أ / ياسمين حسن' },
  },
  {
    id: 2,
    title: 'أساسيات البرمجة بلغة Python',
    level: 'beginner',
    price: 1200,
    thumbnail: null,
    duration_weeks: 6,
    students_count: 389,
    start_date: '2025-03-20',
    instructor: { id: 11, name: 'د / سارة علي' },
  },
  {
    id: 3,
    title: 'تطوير مواقع ويب باستخدام React',
    level: 'intermediate',
    price: 1500,
    thumbnail: null,
    duration_weeks: 8,
    students_count: 245,
    start_date: '2025-03-15',
    instructor: { id: 12, name: 'م / أحمد محمد' },
  },
  {
    id: 4,
    title: 'التسويق الرقمي ووسائل التواصل الاجتماعي',
    level: 'beginner',
    price: 1000,
    thumbnail: null,
    duration_weeks: 6,
    students_count: 412,
    start_date: '2025-04-10',
    instructor: { id: 13, name: 'أ / ليلى سعيد' },
  },
  {
    id: 5,
    title: 'علم البيانات والتحليل باستخدام Python',
    level: 'advanced',
    price: 2200,
    thumbnail: null,
    duration_weeks: 10,
    students_count: 92,
    start_date: '2025-04-05',
    instructor: { id: 14, name: 'د / نور الدين' },
  },
  {
    id: 6,
    title: 'تطوير تطبيقات الجوال باستخدام Flutter',
    level: 'intermediate',
    price: 2000,
    thumbnail: null,
    duration_weeks: 12,
    students_count: 156,
    start_date: '2025-04-01',
    instructor: { id: 15, name: 'م / محمود خالد' },
  },
];

// إحصائيات الطالب الوهمية
export const MOCK_STUDENT_STATS = {
  progress_percent: 48,
  earned_certificates: 0,
  learning_hours: 45,
  enrolled_courses: 2,
};

// كورسات الطالب المسجل بها
export const MOCK_STUDENT_COURSES = [
  {
    course: {
      id: 2,
      title: 'أساسيات البرمجة بلغة Python',
      thumbnail: null,
      instructor: { name: 'د / سارة علي' },
    },
    progress_percent: 30,
    completed_lessons: 8,
    total_lessons: 28,
    next_lesson: { title: 'الدوال والمعاملات' },
  },
  {
    course: {
      id: 3,
      title: 'تطوير مواقع ويب باستخدام React',
      thumbnail: null,
      instructor: { name: 'م / أحمد محمد' },
    },
    progress_percent: 65,
    completed_lessons: 23,
    total_lessons: 36,
    next_lesson: { title: 'استخدام useEffect Hook' },
  },
];

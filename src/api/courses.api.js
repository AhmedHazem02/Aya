// ===== Courses API Endpoints =====
import axiosInstance from './axios';
import {
  MOCK_COURSES,
  MOCK_STUDENT_COURSES,
  MOCK_STUDENT_STATS,
  mockDelay,
} from './mockData';

// ⚠️ وضع التطوير — يُفعَّل بوضع VITE_MOCK_MODE=true في .env
const IS_MOCK = import.meta.env.VITE_MOCK_MODE === 'true';

/**
 * جلب جميع الكورسات (مع فلترة وبحث)
 * GET /courses
 */
export const getAllCourses = async ({ search = '', level = '', price = '', page = 1 } = {}) => {
  if (IS_MOCK) {
    await mockDelay();
    let results = [...MOCK_COURSES];
    if (search) results = results.filter((c) => c.title.includes(search));
    if (level) results = results.filter((c) => c.level === level);
    return { courses: results, total: results.length, page: 1, pages: 1 };
  }

  const params = {};
  if (search) params.search = search;
  if (level) params.level = level;
  if (price) params.price = price;
  params.page = page;

  const { data } = await axiosInstance.get('/courses', { params });
  return data;
  /* المتوقع: { courses: [...], total, page, pages } */
};

/**
 * جلب تفاصيل كورس معين
 * GET /courses/:id
 */
export const getCourseById = async (id) => {
  if (IS_MOCK) {
    await mockDelay();
    const course = MOCK_COURSES.find((c) => c.id === Number(id)) || MOCK_COURSES[0];
    return course;
  }
  const { data } = await axiosInstance.get(`/courses/${id}`);
  return data;
};

/**
 * جلب الكورسات المميزة للصفحة الرئيسية
 * GET /courses/featured
 */
export const getFeaturedCourses = async () => {
  if (IS_MOCK) {
    await mockDelay();
    return MOCK_COURSES.slice(0, 3);
  }
  const { data } = await axiosInstance.get('/courses/featured');
  return data;
};

/**
 * الاشتراك في كورس
 * POST /courses/:id/enroll
 */
export const enrollInCourse = async (courseId) => {
  if (IS_MOCK) {
    await mockDelay();
    return { message: 'تم الاشتراك بنجاح (Mock)', course_id: courseId };
  }
  const { data } = await axiosInstance.post(`/courses/${courseId}/enroll`);
  return data;
};

/**
 * جلب كورسات الطالب المسجل بها
 * GET /student/courses
 */
export const getStudentCourses = async () => {
  if (IS_MOCK) {
    await mockDelay();
    return MOCK_STUDENT_COURSES;
  }
  const { data } = await axiosInstance.get('/student/courses');
  return data;
};

/**
 * جلب تقدم الطالب في كورس معين
 * GET /student/courses/:id/progress
 */
export const getCourseProgress = async (courseId) => {
  if (IS_MOCK) {
    await mockDelay();
    const enrollment = MOCK_STUDENT_COURSES.find((e) => e.course.id === Number(courseId));
    return enrollment || MOCK_STUDENT_COURSES[0];
  }
  const { data } = await axiosInstance.get(`/student/courses/${courseId}/progress`);
  return data;
};

/**
 * إرسال تقييم كورس
 * POST /courses/:id/rate
 */
export const rateCourse = async (courseId, { rating, review }) => {
  if (IS_MOCK) {
    await mockDelay();
    return { message: 'تم إرسال التقييم بنجاح (Mock)', rating, review };
  }
  const { data } = await axiosInstance.post(`/courses/${courseId}/rate`, {
    rating,
    review: review || null,
  });
  return data;
};

/**
 * جلب إحصائيات الطالب (dashboard)
 * GET /student/stats
 */
export const getStudentStats = async () => {
  if (IS_MOCK) {
    await mockDelay();
    return MOCK_STUDENT_STATS;
  }
  const { data } = await axiosInstance.get('/student/stats');
  return data;
};

// ===== Auth API Endpoints =====
import axiosInstance from './axios';
import {
  MOCK_USERS,
  MOCK_TOKEN,
  MOCK_REFRESH_TOKEN,
  mockDelay,
} from './mockData';

// ⚠️ وضع التطوير — يُفعَّل بوضع VITE_MOCK_MODE=true في .env
const IS_MOCK = import.meta.env.VITE_MOCK_MODE === 'true';

// ---- Student Auth ----

/**
 * تسجيل دخول الطالب
 * POST /auth/student/login
 */
export const studentLogin = async ({ email, password }) => {
  if (IS_MOCK) {
    await mockDelay();
    // يقبل أي إيميل/باسورد في وضع Mock
    return {
      access_token: MOCK_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: { ...MOCK_USERS.student, email: email || MOCK_USERS.student.email },
    };
  }
  const { data } = await axiosInstance.post('/auth/student/login', { email, password });
  return data;
  /* المتوقع: { access_token, refresh_token, user: { id, name, email, role } } */
};

/**
 * إنشاء حساب طالب جديد
 * POST /auth/student/register
 */
export const studentRegister = async ({ fullName, email, password, confirmPassword }) => {
  if (IS_MOCK) {
    await mockDelay();
    return {
      access_token: MOCK_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: { ...MOCK_USERS.student, name: fullName, email },
    };
  }
  const { data } = await axiosInstance.post('/auth/student/register', {
    full_name: fullName,
    email,
    password,
    password_confirmation: confirmPassword,
  });
  return data;
};

/**
 * طلب استعادة كلمة المرور
 * POST /auth/forgot-password
 */
export const forgotPassword = async ({ email }) => {
  if (IS_MOCK) {
    await mockDelay();
    return { message: 'تم إرسال رابط الاسترداد إلى بريدك الإلكتروني (Mock)' };
  }
  const { data } = await axiosInstance.post('/auth/forgot-password', { email });
  return data;
};

/**
 * إعادة تعيين كلمة المرور
 * POST /auth/reset-password
 */
export const resetPassword = async ({ token, password, confirmPassword }) => {
  if (IS_MOCK) {
    await mockDelay();
    return { message: 'تم تغيير كلمة المرور بنجاح (Mock)' };
  }
  const { data } = await axiosInstance.post('/auth/reset-password', {
    token,
    password,
    password_confirmation: confirmPassword,
  });
  return data;
};

// ---- Engineer Auth ----

/**
 * تسجيل دخول المهندس
 * POST /auth/engineer/login
 */
export const engineerLogin = async ({ email, password }) => {
  if (IS_MOCK) {
    await mockDelay();
    return {
      access_token: MOCK_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: { ...MOCK_USERS.engineer, email: email || MOCK_USERS.engineer.email },
    };
  }
  const { data } = await axiosInstance.post('/auth/engineer/login', { email, password });
  return data;
};

/**
 * طلب انضمام مهندس جديد
 * POST /auth/engineer/join-request
 * يرسل FormData لأن فيه ملف السيرة الذاتية
 */
export const engineerJoinRequest = async (formValues) => {
  const formData = new FormData();
  formData.append('full_name', formValues.fullName);
  formData.append('email', formValues.email);
  formData.append('phone', formValues.phone);
  formData.append('specialization', formValues.specialization);
  formData.append('experience_years', formValues.experience);
  formData.append('cv', formValues.cv); // File object

  if (IS_MOCK) {
    await mockDelay(800);
    return { message: 'تم إرسال طلب الانضمام بنجاح، سيتم مراجعته من الإدارة (Mock)' };
  }

  const { data } = await axiosInstance.post('/auth/engineer/join-request', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// ---- Shared ----

/**
 * تسجيل الخروج
 * POST /auth/logout
 */
export const logout = async () => {
  if (IS_MOCK) {
    await mockDelay(300);
    return { message: 'تم تسجيل الخروج (Mock)' };
  }
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

/**
 * الحصول على بيانات المستخدم الحالي
 * GET /auth/me
 */
export const getMe = async () => {
  if (IS_MOCK) {
    await mockDelay(300);
    // إرجاع المستخدم المخزن في localStorage لو موجود
    const stored = localStorage.getItem('skills_center_user');
    return stored ? JSON.parse(stored) : MOCK_USERS.student;
  }
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

// ===== Axios Instance Configuration =====
import axios from 'axios';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/constants';
import { getFromStorage, saveToStorage, removeFromStorage } from '../utils/helpers';

// إنشاء instance مخصص
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ===== Request Interceptor — إضافة التوكن تلقائياً =====
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFromStorage(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response Interceptor — معالجة الأخطاء وتجديد التوكن =====
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // إذا كان الخطأ 401 وليس طلب تجديد التوكن نفسه
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getFromStorage(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/auth/refresh`,
            { refresh_token: refreshToken }
          );
          const newToken = data.access_token;
          saveToStorage(TOKEN_KEY, newToken);
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // تسجيل الخروج تلقائياً
          removeFromStorage(TOKEN_KEY);
          removeFromStorage(REFRESH_TOKEN_KEY);
          window.location.href = '/auth/student/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        isRefreshing = false;
        removeFromStorage(TOKEN_KEY);
        window.location.href = '/auth/student/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

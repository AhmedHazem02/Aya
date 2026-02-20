// ===== Auth Context =====
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { studentLogin, engineerLogin, logout as apiLogout, getMe } from '../api/auth.api';
import { TOKEN_KEY, USER_KEY, REFRESH_TOKEN_KEY, USER_ROLES } from '../utils/constants';
import { saveToStorage, getFromStorage, removeFromStorage } from '../utils/helpers';

// إنشاء الـ Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // جارٍ التحقق من الجلسة
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- التحقق من الجلسة عند تحميل التطبيق ---
  useEffect(() => {
    const initAuth = async () => {
      const token = getFromStorage(TOKEN_KEY);
      const cachedUser = getFromStorage(USER_KEY);

      if (token && cachedUser) {
        setUser(cachedUser);
        setIsAuthenticated(true);
        // محاولة تحديث بيانات المستخدم من الـ API
        try {
          const freshUser = await getMe();
          setUser(freshUser);
          saveToStorage(USER_KEY, freshUser);
        } catch {
          // إذا فشل، نستمر بالبيانات المخزنة
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // --- تسجيل دخول الطالب ---
  const loginStudent = useCallback(async (credentials) => {
    const data = await studentLogin(credentials);
    saveToStorage(TOKEN_KEY, data.access_token);
    if (data.refresh_token) saveToStorage(REFRESH_TOKEN_KEY, data.refresh_token);
    saveToStorage(USER_KEY, data.user);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, []);

  // --- تسجيل دخول المهندس ---
  const loginEngineer = useCallback(async (credentials) => {
    const data = await engineerLogin(credentials);
    saveToStorage(TOKEN_KEY, data.access_token);
    if (data.refresh_token) saveToStorage(REFRESH_TOKEN_KEY, data.refresh_token);
    saveToStorage(USER_KEY, data.user);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, []);

  // --- تسجيل الخروج ---
  const logoutUser = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // حتى لو فشل الطلب، نسجّل الخروج محلياً
    } finally {
      removeFromStorage(TOKEN_KEY);
      removeFromStorage(REFRESH_TOKEN_KEY);
      removeFromStorage(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // --- فحص الدور ---
  const isStudent = user?.role === USER_ROLES.STUDENT;
  const isEngineer = user?.role === USER_ROLES.ENGINEER;
  const isAdmin = user?.role === USER_ROLES.ADMIN;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    isStudent,
    isEngineer,
    isAdmin,
    loginStudent,
    loginEngineer,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook مخصص للوصول لـ Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;

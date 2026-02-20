import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES, USER_ROLES } from '../utils/constants';
import Spinner from '../components/common/Spinner/Spinner';

/**
 * ProtectedRoute — يحمي الصفحات التي تحتاج تسجيل دخول
 * Props:
 *  - allowedRoles: مصفوفة الأدوار المسموح لها (اختياري — إذا فارغة يُسمح لأي مستخدم مسجل)
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // بينما بيتحقق من الجلسة
  if (isLoading) {
    return <Spinner fullPage />;
  }

  // لو مش مسجل دخول — نوجهه لصفحة الدخول مع حفظ المسار
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.STUDENT_LOGIN} state={{ from: location }} replace />;
  }

  // لو تم تحديد أدوار معينة ومستخدم دوره مش مسموح
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute;

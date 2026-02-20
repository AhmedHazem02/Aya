import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

// ===== Auth Pages =====
import AuthLanding from '../pages/Auth/AuthLanding/index';
import StudentLogin from '../pages/Auth/StudentLogin/index';
import StudentRegister from '../pages/Auth/StudentRegister/index';
import EngineerLogin from '../pages/Auth/EngineerLogin/index';
import EngineerJoinRequest from '../pages/Auth/EngineerJoinRequest/index';

// ===== Public Pages =====
import Home from '../pages/Home/index';
import AllCourses from '../pages/Courses/AllCourses/index';

// ===== Protected Pages =====
import Dashboard from '../pages/Dashboard/index';
import CourseRating from '../pages/Rating/index';

/**
 * التوجيه المركزي للتطبيق
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* ===== Auth / Landing ===== */}
      <Route path={ROUTES.HOME} element={<AuthLanding />} />

      {/* ===== Auth Routes ===== */}
      <Route path={ROUTES.STUDENT_LOGIN} element={<StudentLogin />} />
      <Route path={ROUTES.STUDENT_REGISTER} element={<StudentRegister />} />
      <Route path={ROUTES.ENGINEER_LOGIN} element={<EngineerLogin />} />
      <Route path={ROUTES.ENGINEER_JOIN} element={<EngineerJoinRequest />} />

      {/* ===== Public Routes (يحتاج تسجيل دخول) ===== */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path={ROUTES.COURSES} element={<AllCourses />} />

      {/* ===== Protected Student Routes ===== */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.MY_COURSES}
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
            <Dashboard />  {/* TODO: replace with MyCourses page */}
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id/rate"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
            <CourseRating />
          </ProtectedRoute>
        }
      />

      {/* ===== Engineer Routes ===== */}
      <Route
        path={ROUTES.ENGINEER_DASHBOARD}
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ENGINEER, USER_ROLES.ADMIN]}>
            <div style={{ padding: '100px 20px', textAlign: 'center' }}>
              <h2>لوحة تحكم المهندس — قيد الإنشاء</h2>
            </div>
          </ProtectedRoute>
        }
      />

      {/* ===== 404 Fallback ===== */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRouter;

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROUTES } from '../../../utils/constants';
import { validateLoginForm } from '../../../utils/validators';
import { extractApiError } from '../../../utils/helpers';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import styles from './StudentLogin.module.css';

/**
 * صفحة تسجيل دخول الطالب
 * المسار: /auth/student/login
 */
const StudentLogin = () => {
  const { loginStudent } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // بعد الدخول، نرجع للصفحة اللي كان عاوز يدخلها
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // مسح خطأ الحقل لما المستخدم يبدأ يكتب
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await loginStudent(form);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(extractApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <Link to={ROUTES.HOME} className={styles.logoLink}>
            <span className={styles.logoIcon}>🎓</span>
            <span className={styles.logoText}>مركز المهارات</span>
          </Link>
        </div>

        {/* Icon + Title */}
        <div className={styles.titleArea}>
          <div className={styles.avatarIcon}>👤</div>
          <h1 className={styles.title}>تسجيل دخول الطالب</h1>
          <p className={styles.subtitle}>أدخل بياناتك للوصول إلى حسابك</p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className={styles.errorBanner}>
            <span>⚠️</span> {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            id="student-email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            icon={<span>✉️</span>}
            autoComplete="email"
            autoFocus
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            id="student-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            icon={<span>🔒</span>}
            autoComplete="current-password"
          />

          {/* Forgot Password */}
          <div className={styles.forgotWrap}>
            <Link to="/auth/forgot-password" className={styles.forgotLink}>
              نسيت كلمة المرور؟
            </Link>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            تسجيل الدخول
          </Button>
        </form>

        {/* Register Link */}
        <p className={styles.switchText}>
          ليس لديك حساب؟{' '}
          <Link to={ROUTES.STUDENT_REGISTER} className={styles.switchLink}>
            إنشاء حساب جديد
          </Link>
        </p>

        {/* Back to Home */}
        <Link to={ROUTES.HOME} className={styles.backLink}>
          ← العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default StudentLogin;

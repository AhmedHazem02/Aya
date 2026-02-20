import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROUTES } from '../../../utils/constants';
import { validateLoginForm } from '../../../utils/validators';
import { extractApiError } from '../../../utils/helpers';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import styles from './EngineerLogin.module.css';

/**
 * صفحة تسجيل دخول المهندس
 * المسار: /auth/engineer/login
 */
const EngineerLogin = () => {
  const { loginEngineer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.ENGINEER_DASHBOARD;

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      await loginEngineer(form);
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
        {/* Engineer Icon */}
        <div className={styles.iconWrap}>
          <div className={styles.iconBox}>🔧</div>
        </div>

        {/* Title */}
        <div className={styles.titleArea}>
          <h1 className={styles.title}>تسجيل الدخول</h1>
          <p className={styles.subtitle}>للمهندسين المعتمدين</p>
        </div>

        {/* Info Banner */}
        <div className={styles.infoBanner}>
          <span>ℹ️</span>
          <p>
            هذه الصفحة خاصة بالمهندسين المعتمدين من إدارة مركز المهارات فقط. لا يمكن
            إنشاء حساب مدرس بدون موافقة الإدارة.
          </p>
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
            id="eng-email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            autoFocus
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            id="eng-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="md">
            تسجيل الدخول
          </Button>
        </form>

        {/* Join Request Link */}
        <p className={styles.joinText}>
          تريد الانضمام كمهندس؟{' '}
          <Link to={ROUTES.ENGINEER_JOIN} className={styles.joinLink}>
            قدّم طلب الانضمام
          </Link>
        </p>

        {/* Back Link */}
        <Link to={ROUTES.HOME} className={styles.backLink}>
          ← العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default EngineerLogin;

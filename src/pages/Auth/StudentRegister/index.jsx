import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROUTES } from '../../../utils/constants';
import { validateStudentRegisterForm } from '../../../utils/validators';
import { extractApiError } from '../../../utils/helpers';
import { studentRegister } from '../../../api/auth.api';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import styles from './StudentRegister.module.css';

/**
 * صفحة إنشاء حساب طالب
 * المسار: /auth/student/register
 */
const StudentRegister = () => {
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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
    const validationErrors = validateStudentRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await studentRegister(form);
      // بعد التسجيل، ندخّل المستخدم مباشرة
      await loginStudent({ email: form.email, password: form.password });
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setApiError(extractApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header Logo */}
        <div className={styles.header}>
          <Link to={ROUTES.HOME} className={styles.logoLink}>
            <span className={styles.logoIcon}>🎓</span>
            <span className={styles.logoText}>مركز المهارات</span>
          </Link>
        </div>

        {/* Title */}
        <div className={styles.titleArea}>
          <div className={styles.avatarIcon}>👤➕</div>
          <h1 className={styles.title}>إنشاء حساب طالب</h1>
          <p className={styles.subtitle}>أدخل بياناتك للانضمام إلى منصة مركز المهارات</p>
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
            label="الاسم الكامل"
            type="text"
            name="fullName"
            id="reg-fullname"
            placeholder="أدخل اسمك الكامل"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            icon={<span>👤</span>}
            autoComplete="name"
            autoFocus
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            id="reg-email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            icon={<span>✉️</span>}
            autoComplete="email"
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            id="reg-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            icon={<span>🔒</span>}
            autoComplete="new-password"
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            name="confirmPassword"
            id="reg-confirm-password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<span>🔒</span>}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            إنشاء حساب
          </Button>
        </form>

        {/* Login Link */}
        <p className={styles.switchText}>
          لديك حساب بالفعل؟{' '}
          <Link to={ROUTES.STUDENT_LOGIN} className={styles.switchLink}>
            تسجيل الدخول
          </Link>
        </p>

        {/* Back Links */}
        <div className={styles.backLinks}>
          <Link to={ROUTES.HOME} className={styles.backLink}>
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;

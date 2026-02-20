import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import { validateEngineerJoinForm } from '../../../utils/validators';
import { extractApiError } from '../../../utils/helpers';
import { engineerJoinRequest } from '../../../api/auth.api';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import styles from './EngineerJoinRequest.module.css';

/**
 * صفحة طلب انضمام مهندس
 * المسار: /auth/engineer/join
 */
const EngineerJoinRequest = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    cv: null,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cvFileName, setCvFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, cv: file }));
    setCvFileName(file ? file.name : '');
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEngineerJoinForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await engineerJoinRequest(form);
      setSuccessMsg(
        'تم إرسال طلبك بنجاح! سيتم مراجعته من قِبَل الإدارة والتواصل معك خلال 3-5 أيام عمل.'
      );
    } catch (err) {
      setApiError(extractApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // إذا تم الإرسال بنجاح
  if (successMsg) {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✅</div>
          <h2 className={styles.successTitle}>تم إرسال طلبك!</h2>
          <p className={styles.successText}>{successMsg}</p>
          <Link to={ROUTES.ENGINEER_LOGIN} className={styles.loginBtn}>
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Title outside card */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>🎓 طلب الانضمام كمهندس</h1>
        <p className={styles.pageSubtitle}>املأ البيانات التالية لتقديم طلب الانضمام</p>
      </div>

      <div className={styles.card}>
        {/* API Error */}
        {apiError && (
          <div className={styles.errorBanner}>
            <span>⚠️</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="الاسم الكامل *"
            type="text"
            name="fullName"
            id="join-fullname"
            placeholder="محمد أحمد"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            autoFocus
          />

          <Input
            label="البريد الإلكتروني *"
            type="email"
            name="email"
            id="join-email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="رقم الهاتف *"
            type="tel"
            name="phone"
            id="join-phone"
            placeholder="01xxxxxxxxx"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="التخصص *"
            type="text"
            name="specialization"
            id="join-specialization"
            placeholder="مثال: تطوير الويب، تصميم UI/UX"
            value={form.specialization}
            onChange={handleChange}
            error={errors.specialization}
          />

          <Input
            label="سنوات الخبرة *"
            type="number"
            name="experience"
            id="join-experience"
            placeholder="5"
            value={form.experience}
            onChange={handleChange}
            error={errors.experience}
            min={0}
            max={50}
          />

          {/* CV Upload */}
          <div className={styles.fileFieldWrap}>
            <label className={styles.fileLabel}>رفع السيرة الذاتية (image) *</label>
            <div
              className={[styles.fileDropZone, errors.cv ? styles.fileError : ''].join(' ')}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="رفع السيرة الذاتية"
            >
              {cvFileName ? (
                <span className={styles.fileName}>📎 {cvFileName}</span>
              ) : (
                <span className={styles.filePlaceholder}>اضغط لاختيار ملف (jpeg, png, pdf)</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={handleFileChange}
              className={styles.hiddenInput}
              id="join-cv"
            />
            {errors.cv && <span className={styles.fieldError}>{errors.cv}</span>}
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            إرسال الطلب
          </Button>
        </form>

        {/* Back Link */}
        <Link to={ROUTES.ENGINEER_LOGIN} className={styles.backLink}>
          ← العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default EngineerJoinRequest;

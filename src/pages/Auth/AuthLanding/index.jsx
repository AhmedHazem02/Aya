import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import styles from './AuthLanding.module.css';

/**
 * الصفحة الرئيسية للمصادقة — يختار فيها المستخدم نوع حسابه
 * المسار: /
 */
const AuthLanding = () => {
  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <div className={styles.logoBox}>
          <span className={styles.logoIcon}>🎓</span>
        </div>
        <h1 className={styles.appName}>مركز المهارات</h1>
        <p className={styles.tagline}>منصتك التعليمية لتطوير مهاراتك</p>
      </div>

      {/* Buttons */}
      <div className={styles.btnGroup}>
        <Link to={ROUTES.STUDENT_LOGIN} className={styles.btnPrimary}>
          <span>👤</span>
          الدخول كطالب
        </Link>

        <Link to={ROUTES.ENGINEER_LOGIN} className={styles.btnOutline}>
          <span>🔧</span>
          الدخول كمهندس
        </Link>
      </div>

      {/* Footer Note */}
      <p className={styles.footNote}>
        © {new Date().getFullYear()} مركز المهارات. جميع الحقوق محفوظة.
      </p>
    </div>
  );
};

export default AuthLanding;

import { Link } from 'react-router-dom';
import { FOOTER_QUICK_LINKS } from '../../../utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>🎓</span>
            <span className={styles.logoText}>مركز المهارات</span>
          </div>
          <p className={styles.tagline}>
            منصة تعليمية متكاملة تقدم أفضل الكورسات التعليمية لتطوير مهاراتك المهنية
          </p>
          {/* Social */}
          <div className={styles.social}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <span>📸</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
              <span>🐦</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <span>📘</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>روابط سريعة</h4>
          <ul className={styles.linkList}>
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={styles.footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>تواصل معنا</h4>
          <ul className={styles.contactList}>
            <li>
              <span>✉️</span>
              <a href="mailto:info@skillscenter.com" className={styles.footerLink}>
                info@skillscenter.com
              </a>
            </li>
            <li>
              <span>📞</span>
              <a href="tel:+201234567890" className={styles.footerLink}>
                +20 123 456 7890
              </a>
            </li>
            <li>
              <span>📍</span>
              <span>القاهرة، مصر</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} مركز المهارات. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROUTES } from '../../../utils/constants';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        {/* ===== Logo (Right — RTL) ===== */}
        <Link to={isAuthenticated ? '/home' : ROUTES.HOME} className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <span className={styles.logoText}>مركز المهارات</span>
        </Link>

        {/* ===== Desktop Nav Links ===== */}
        {isAuthenticated && (
          <ul className={styles.navLinks}>
            <li>
              <NavLink
                to={ROUTES.COURSES}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.active : ''].join(' ')
                }
              >
                الكورسات
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.MY_COURSES}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.active : ''].join(' ')
                }
              >
                كورساتي
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.active : ''].join(' ')
                }
              >
                الدعم
              </NavLink>
            </li>
          </ul>
        )}

        {/* ===== Left Actions (RTL: logout | name | profile | bell) ===== */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              {/* Bell */}
              <button className={styles.iconBtn} aria-label="الإشعارات">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className={styles.notifDot} />
              </button>

              {/* Profile icon */}
              <button className={styles.iconBtn} aria-label="الملف الشخصي" onClick={() => navigate('/profile')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>

              {/* User Name + dropdown */}
              <div className={styles.userMenu}>
                <button
                  className={styles.userBtn}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label="قائمة المستخدم"
                >
                  <span className={styles.userName}>{user?.name}</span>
                </button>

                {menuOpen && (
                  <div className={styles.dropdown} onClick={() => setMenuOpen(false)}>
                    <Link to={ROUTES.DASHBOARD} className={styles.dropItem}>
                      📊 لوحة التحكم
                    </Link>
                    <Link to="/profile" className={styles.dropItem}>
                      👤 الملف الشخصي
                    </Link>
                    <hr className={styles.divider} />
                    <button onClick={handleLogout} className={styles.dropItem}>
                      🚪 تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>

              {/* Logout icon */}
              <button className={styles.iconBtn} onClick={handleLogout} aria-label="تسجيل الخروج">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </>
          ) : (
            // لو مش مسجل دخول — يظهر زر دخول فقط في الـ Navbar
            <Link to={ROUTES.HOME} className={styles.loginBtn}>
              تسجيل الدخول
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="القائمة"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

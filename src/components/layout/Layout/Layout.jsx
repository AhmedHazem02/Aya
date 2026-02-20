import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

/**
 * Layout الرئيسي — يُلف كل الصفحات التي تحتاج Navbar + Footer
 * Props:
 *  - showFooter: boolean (default true)
 *  - className: string
 */
const Layout = ({ children, showFooter = true, className = '' }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={[styles.main, className].filter(Boolean).join(' ')}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;

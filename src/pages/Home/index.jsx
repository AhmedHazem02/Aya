import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, PLATFORM_STATS } from '../../utils/constants';
import { getFeaturedCourses } from '../../api/courses.api';
import { formatPrice, getLevelInArabic, getLevelClass, formatDate } from '../../utils/helpers';
import Layout from '../../components/layout/Layout/Layout';
import Spinner from '../../components/common/Spinner/Spinner';
import styles from './Home.module.css';

/* ===================== STAT ICONS ===================== */
const StatIcon = ({ index }) => {
  const icons = [
    // trending up
    <svg key={0} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    // award
    <svg key={1} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    // users
    <svg key={2} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    // book-open
    <svg key={3} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  ];
  return icons[index] || icons[0];
};

/* ===================== COURSE CARD ===================== */
const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.courseCard}>
      {/* Thumbnail */}
      <div className={styles.cardThumb}>
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
        ) : (
          <div className={styles.cardThumbPlaceholder}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Price + Level Row */}
      <div className={styles.cardTopRow}>
        <span className={styles.priceTag}>{formatPrice(course.price)}</span>
        <span className={`badge ${getLevelClass(course.level)}`}>
          {getLevelInArabic(course.level)}
        </span>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardInstructor}>
          المدرب: {course.instructor?.name || 'غير محدد'}
        </p>

        {/* Meta — كل سطر لوحده */}
        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{course.duration_weeks} أسابيع</span>
          </div>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>{course.students_count?.toLocaleString('ar-EG') || 0} طالب</span>
          </div>
          {course.start_date && (
            <div className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>يبدأ في {formatDate(course.start_date)}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA — خارج cardBody، لاصقة أسفل الكارت */}
      <button
        className={styles.cardBtn}
        onClick={() => navigate(`/courses/${course.id}`)}
      >
        عرض التفاصيل
      </button>
    </div>
  );
};

/* ===================== HOME PAGE ===================== */
const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getFeaturedCourses();
        setFeaturedCourses(data?.courses || data || []);
      } catch {
        // في حالة فشل API نعرض placeholder
        setFeaturedCourses(MOCK_COURSES);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <Layout>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {isAuthenticated
                ? `مرحباً بك، ${user?.name?.split(' ')[0]} 👋`
                : 'مرحباً بك في مركز المهارات'}
            </h1>
            <p className={styles.heroSubtitle}>
              منصة تعليمية متكاملة تقدم أفضل الكورسات التعليمية لتطوير مهاراتك المهنية وتحقيق أهدافك
            </p>
            <div className={styles.heroBtns}>
              {isAuthenticated ? (
                <>
                  <Link to={ROUTES.MY_COURSES} className={styles.heroBtnPrimary}>
                    كورساتي
                  </Link>
                  <Link to={ROUTES.COURSES} className={styles.heroBtnOutline}>
                    تصفح الكورسات
                  </Link>
                </>
              ) : (
                <>
                  <Link to={ROUTES.STUDENT_REGISTER} className={styles.heroBtnPrimary}>
                    ابدأ مجاناً
                  </Link>
                  <Link to={ROUTES.COURSES} className={styles.heroBtnOutline}>
                    تصفح الكورسات
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className={styles.wave}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statIconWrap}>
                  <StatIcon index={idx} />
                </div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES SECTION ===== */}
      <section className={styles.coursesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="section-title">الكورسات المميزة</h2>
            <p className="section-subtitle">اختر من بين أفضل الكورسات التعليمية المتاحة</p>
          </div>

          {isLoading ? (
            <div className={styles.loadingWrap}>
              <Spinner size="lg" />
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {featuredCourses.map((course, idx) => (
                <CourseCard key={course.id} course={course} index={idx} />
              ))}
            </div>
          )}

          <div className={styles.viewAllWrap}>
            <Link to={ROUTES.COURSES} className={styles.viewAllBtn}>
              عرض جميع الكورسات
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>ابدأ رحلتك التعليمية اليوم</h2>
            <p className={styles.ctaText}>
              انضم إلى آلاف الطلاب الذين طوروا مهاراتهم معنا
            </p>
            <button
              className={styles.ctaBtn}
              onClick={() => navigate(isAuthenticated ? ROUTES.COURSES : ROUTES.STUDENT_REGISTER)}
            >
              {isAuthenticated ? 'تصفح الكورسات' : 'اشترك الآن'}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

// ===== Mock Data (تُستخدم عند فشل API أثناء التطوير) =====
const MOCK_COURSES = [
  {
    id: 1,
    title: 'تصميم واجهات المستخدم UI/UX',
    level: 'advanced',
    price: 1800,
    instructor: { name: 'أ / ياسمين حسن' },
    duration_weeks: 10,
    students_count: 178,
    start_date: '2025-03-25',
    thumbnail: null,
  },
  {
    id: 2,
    title: 'أساسيات البرمجة بلغة Python',
    level: 'beginner',
    price: 1200,
    instructor: { name: 'د / سارة علي' },
    duration_weeks: 6,
    students_count: 389,
    start_date: '2025-03-20',
    thumbnail: null,
  },
  {
    id: 3,
    title: 'تطوير مواقع ويب باستخدام React',
    level: 'intermediate',
    price: 1500,
    instructor: { name: 'م / أحمد محمد' },
    duration_weeks: 8,
    students_count: 245,
    start_date: '2025-03-15',
    thumbnail: null,
  },
];

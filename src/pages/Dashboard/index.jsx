import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import { getStudentStats, getStudentCourses } from '../../api/courses.api';
import Layout from '../../components/layout/Layout/Layout';
import Spinner from '../../components/common/Spinner/Spinner';
import styles from './Dashboard.module.css';

/* ====== Stat Icons ====== */
const STAT_ICONS = [
  <svg key={0} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  <svg key={1} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  <svg key={2} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key={3} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
];
const STAT_COLORS = ['#64748b', '#f59e0b', '#10b981', '#3b82f6'];
const STAT_BG    = ['#f1f5f9', '#fef3c7', '#d1fae5', '#dbeafe'];

/* ====== Course Progress Card ====== */
const CourseProgressCard = ({ enrollment }) => {
  const navigate = useNavigate();
  const { course, progress_percent, completed_lessons, total_lessons, next_lesson } = enrollment;
  const progressColor =
    progress_percent >= 70 ? '#10b981' :
    progress_percent >= 40 ? '#1e3494' : '#f59e0b';

  return (
    <div className={styles.courseCard}>
      {/* Thumbnail */}
      <div className={styles.cardThumb}>
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
        ) : (
          <div className={styles.cardThumbPlaceholder} />
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Title row */}
        <div className={styles.titleRow}>
          <span className={styles.progressPct} style={{ color: progressColor }}>
            {progress_percent}%
          </span>
          <div className={styles.titleBlock}>
            <h3 className={styles.cardTitle}>{course.title}</h3>
            <p className={styles.cardInstructor}>المدرب: {course.instructor?.name || 'غير محدد'}</p>
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressLabelRow}>
            <span className={styles.lessonsCount}>{completed_lessons} / {total_lessons} درس</span>
            <span className={styles.progressLabel}>التقدم</span>
          </div>
          <div className={styles.progressBarWrap}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress_percent}%`, background: progressColor }}
            />
          </div>
        </div>

        {/* Next Lesson */}
        {next_lesson && (
          <div className={styles.nextLesson}>
            <span className={styles.nextLessonLabel}>الدرس التالي:</span>
            <span className={styles.nextLessonTitle}>{next_lesson.title}</span>
          </div>
        )}

        {/* Actions */}
        <div className={styles.cardActions}>
          <button
            className={styles.continueBtn}
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            استكمال الكورس
          </button>
          <button
            className={styles.rateBtn}
            onClick={() => navigate(`/courses/${course.id}/rate`)}
          >
            تقييم
          </button>
        </div>
      </div>
    </div>
  );
};

/* ====== Dashboard Page ====== */
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats]     = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, coursesData] = await Promise.all([
          getStudentStats(),
          getStudentCourses(),
        ]);
        setStats(statsData);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = stats
    ? [
        { label: 'معدل التقدم',       value: `${stats.progress_percent}%` },
        { label: 'الشهادات المكتسبة', value: stats.earned_certificates },
        { label: 'ساعات التعلم',      value: stats.learning_hours },
        { label: 'الكورسات المسجلة',  value: stats.enrolled_courses },
      ]
    : [];

  return (
    <Layout>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>مرحباً، {user?.name}</h1>
          <p className={styles.heroSub}>استكمل رحلتك التعليمية اليوم</p>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div className={styles.loadingWrap}><Spinner size="lg" /></div>
        ) : (
          <>
            {/* ===== Stats ===== */}
            <div className={styles.statsGrid}>
              {statCards.map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statLeft}>
                    <span className={styles.statLabel}>{s.label}</span>
                    <span className={styles.statValue}>{s.value}</span>
                  </div>
                  <div
                    className={styles.statIconWrap}
                    style={{ background: STAT_BG[i], color: STAT_COLORS[i] }}
                  >
                    {STAT_ICONS[i]}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== My Courses ===== */}
            <section className={styles.coursesSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitles}>
                  <h2 className={styles.sectionTitle}>كورساتي</h2>
                  <p className={styles.sectionSub}>الكورسات المسجل بها حالياً</p>
                </div>
                <Link to={ROUTES.COURSES} className={styles.browseBtn}>
                  تصفح المزيد من الكورسات
                </Link>
              </div>

              {courses.length === 0 ? (
                <div className={styles.empty}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <p>لم تسجّل في أي كورس بعد</p>
                  <Link to={ROUTES.COURSES} className={styles.browseBtn}>تصفح الكورسات</Link>
                </div>
              ) : (
                <div className={styles.coursesGrid}>
                  {courses.map((enrollment, idx) => (
                    <CourseProgressCard key={idx} enrollment={enrollment} />
                  ))}
                </div>
              )}
            </section>

            {/* ===== Recommended ===== */}
            <section className={styles.recommendedSection}>
              <h2 className={styles.recommendedTitle}>كورسات موصى بها لك</h2>
              <div className={styles.recommendedCard}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#1e3494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <h3 className={styles.recommendedCardTitle}>استكشف كورسات جديدة</h3>
                <p className={styles.recommendedCardSub}>لدينا المئات من الكورسات في مختلف المجالات</p>
                <Link to={ROUTES.COURSES} className={styles.recommendedBtn}>استكشف الآن</Link>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

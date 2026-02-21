import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../../api/courses.api';
import {
  formatPrice,
  getLevelInArabic,
  getLevelClass,
  formatDate,
} from '../../../utils/helpers';
import Layout from '../../../components/layout/Layout/Layout';
import Spinner from '../../../components/common/Spinner/Spinner';
import styles from './AllCourses.module.css';

/* ──────────────────── GRADIENT FALLBACKS ──────────────────── */
const CARD_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

/* ──────────────────── COURSE CARD ──────────────────── */
const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <div className={styles.courseCard}>
      {/* Thumbnail */}
      <div className={styles.cardThumb}>
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
        ) : (
          <div
            className={styles.cardThumbPlaceholder}
            style={{ background: gradient }}
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Price + Level */}
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

        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            {/* clock */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{course.duration_weeks} أسابيع</span>
          </div>
          <div className={styles.metaItem}>
            {/* users */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{course.students_count?.toLocaleString('ar-EG') || 0} طالب</span>
          </div>
          {course.start_date && (
            <div className={styles.metaItem}>
              {/* calendar */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>يبدأ في {formatDate(course.start_date)}</span>
            </div>
          )}
        </div>
      </div>

      <button
        className={styles.cardBtn}
        onClick={() => navigate(`/courses/${course.id}`)}
      >
        عرض التفاصيل
      </button>
    </div>
  );
};

/* ──────────────────── FILTER BAR ──────────────────── */
const LEVEL_OPTIONS = [
  { value: '', label: 'الكل' },
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
];

const PRICE_OPTIONS = [
  { value: '', label: 'الكل' },
  { value: 'free', label: 'مجاني' },
  { value: 'lt1000', label: 'أقل من 1,000 ج.م' },
  { value: '1000-2000', label: '1,000 – 2,000 ج.م' },
  { value: 'gt2000', label: 'أكثر من 2,000 ج.م' },
];

/* ──────────────────── PAGE ──────────────────── */
const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');

  /* load once */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllCourses();
        const list = data?.courses || data || [];
        setAllCourses(list);
        setFiltered(list);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  /* client-side filter */
  const applyFilters = useCallback(
    (searchVal, levelVal, priceVal) => {
      let results = [...allCourses];
      if (searchVal.trim()) {
        const q = searchVal.trim().toLowerCase();
        results = results.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.instructor?.name?.toLowerCase().includes(q)
        );
      }
      if (levelVal) results = results.filter((c) => c.level === levelVal);
      if (priceVal) {
        results = results.filter((c) => {
          if (priceVal === 'free') return c.price === 0;
          if (priceVal === 'lt1000') return c.price > 0 && c.price < 1000;
          if (priceVal === '1000-2000') return c.price >= 1000 && c.price <= 2000;
          if (priceVal === 'gt2000') return c.price > 2000;
          return true;
        });
      }
      setFiltered(results);
    },
    [allCourses]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, level, price);
  };
  const handleLevel = (e) => {
    setLevel(e.target.value);
    applyFilters(search, e.target.value, price);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
    applyFilters(search, level, e.target.value);
  };
  const handleReset = () => {
    setSearch('');
    setLevel('');
    setPrice('');
    setFiltered(allCourses);
  };

  const hasActiveFilter = search.trim() || level || price;

  return (
    <Layout>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>جميع الكورسات</h1>
          <p className={styles.heroSubtitle}>
            اكتشف مجموعة واسعة من الكورسات في مختلف المجالات
          </p>
        </div>
        <div className={styles.wave}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ===== MAIN PAGE ===== */}
      <section className={styles.page}>
        <div className="container">

          {/* ── FILTER BAR ── */}
          <div className={styles.filterBar}>
            <div className={styles.filterFields}>
              {/* Search */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>البحث</label>
                <div className={styles.searchWrap}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="ابحث عن كورس أو مدرس..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>

              {/* Price */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>السعر</label>
                <div className={styles.selectWrap}>
                  <select className={styles.select} value={price} onChange={handlePrice}>
                    {PRICE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Level */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>المستوى</label>
                <div className={styles.selectWrap}>
                  <select className={styles.select} value={level} onChange={handleLevel}>
                    {LEVEL_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter bottom row */}
            <div className={styles.filterFooter}>
              <button
                className={`${styles.resetBtn} ${hasActiveFilter ? styles.resetActive : ''}`}
                onClick={handleReset}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4" />
                </svg>
                إعادة تعيين
              </button>
              {!isLoading && (
                <span className={styles.resultsCount}>
                  عرض {filtered.length} من {allCourses.length} كورس
                </span>
              )}
            </div>
          </div>

          {/* ── GRID ── */}
          {isLoading ? (
            <div className={styles.loadingWrap}>
              <Spinner size="lg" />
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>لا توجد كورسات تطابق بحثك</p>
              <button className={styles.resetBtnLg} onClick={handleReset}>عرض جميع الكورسات</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AllCourses;

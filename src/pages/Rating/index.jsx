import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, rateCourse } from '../../api/courses.api';
import Layout from '../../components/layout/Layout/Layout';
import toast from 'react-hot-toast';
import styles from './Rating.module.css';

/* ====== Star Rating Component ====== */
const StarRating = ({ value, onChange, hovered, onHover, onLeave }) => {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={[
            styles.star,
            (hovered || value) >= star ? styles.starFilled : '',
          ].join(' ')}
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          aria-label={`تقييم ${star}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="38" height="38">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

/* ====== Rating Page ====== */
const CourseRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse]     = useState(null);
  const [rating, setRating]     = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [review, setReview]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch {
        setCourse({ id, title: 'الكورس', instructor: { name: 'غير محدد' } });
      }
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async () => {
    if (!rating) { setShowWarn(true); return; }
    setShowWarn(false);
    setLoading(true);
    try {
      await rateCourse(id, { rating, review });
      setSubmitted(true);
      toast.success('تم إرسال تقييمك بنجاح!');
      setTimeout(() => navigate(-1), 1800);
    } catch {
      toast.error('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const STAR_LABELS = ['', 'سيئ', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.wrapper}>

          {/* ===== Main Card ===== */}
          <div className={styles.card}>

            {/* Header */}
            <div className={styles.cardHeader}>
              <div className={styles.starIconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1e3494" strokeWidth="1.8" width="28" height="28">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h1 className={styles.pageTitle}>تقييم الكورس</h1>
              <p className={styles.pageSubtitle}>شاركنا تجربتك مع الكورس لمساعدة الطلاب الآخرين</p>
            </div>

            {/* Course Info */}
            {course && (
              <div className={styles.courseInfo}>
                <p className={styles.courseName}>{course.title}</p>
                <p className={styles.courseInstructor}>المدرب: {course.instructor?.name}</p>
              </div>
            )}

            {submitted ? (
              /* ===== Success ===== */
              <div className={styles.successBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" width="48" height="48" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p>شكراً على تقييمك! يتم تحويلك الآن…</p>
              </div>
            ) : (
              <>
                {/* Stars */}
                <div className={styles.ratingSection}>
                  <p className={styles.ratingLabel}>قيّم الكورس</p>
                  <StarRating
                    value={rating}
                    onChange={(v) => { setRating(v); setShowWarn(false); }}
                    hovered={hovered}
                    onHover={setHovered}
                    onLeave={() => setHovered(0)}
                  />
                  {(hovered || rating) > 0 && (
                    <span className={styles.starLabel}>
                      {STAR_LABELS[hovered || rating]}
                    </span>
                  )}
                </div>

                {/* Review */}
                <div className={styles.reviewSection}>
                  <label className={styles.reviewLabel}>اكتب مراجعتك (اختياري)</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="شاركنا رأيك عن الكورس، المحتوى، أسلوب الشرح، وما أعجبك أو لم يعجبك..."
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    maxLength={500}
                  />
                  <p className={styles.reviewHint}>مراجعتك ستساعد الطلاب الآخرين في اتخاذ القرار</p>
                </div>

                {/* Warning */}
                {showWarn && (
                  <div className={styles.warnBox}>
                    الرجاء اختيار تقييم بالنجوم
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'جاري الإرسال...' : 'إرسال التقييم'}
                  </button>
                  <button
                    className={styles.skipBtn}
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    تخطي
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ===== Guidelines Card ===== */}
          <div className={styles.guideCard}>
            <h2 className={styles.guideTitle}>إرشادات كتابة المراجعة</h2>
            <ul className={styles.guideList}>
              <li>كن صادقاً وموضوعياً في تقييمك</li>
              <li>اذكر النقاط الإيجابية والسلبية</li>
              <li>تجنب اللغة غير اللائقة</li>
              <li>ركّز على جودة المحتوى وأسلوب الشرح</li>
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CourseRating;


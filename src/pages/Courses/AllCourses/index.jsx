import Layout from '../../../components/layout/Layout/Layout';
import styles from './AllCourses.module.css';

/**
 * صفحة جميع الكورسات — سيكملها التيم
 * المسار: /courses
 */
const AllCourses = () => {
  return (
    <Layout>
      <section className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1>جميع الكورسات</h1>
            <p>اكتشف مجموعة واسعة من الكورسات في مختلف المجالات</p>
          </div>
          {/* TODO: سيتم بناؤها من قِبَل التيم */}
          <div className={styles.placeholder}>
            <span>📚</span>
            <p>قيد الإنشاء — سيتم اكتمالها قريباً</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllCourses;

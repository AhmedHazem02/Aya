import styles from './Spinner.module.css';

/**
 * مكون تحميل
 * Props:
 *  - size: 'sm' | 'md' | 'lg'
 *  - fullPage: boolean
 */
const Spinner = ({ size = 'md', fullPage = false }) => {
  const spinner = (
    <div
      className={[styles.spinner, styles[size]].join(' ')}
      role="status"
      aria-label="جاري التحميل"
    />
  );

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>;
  }

  return spinner;
};

export default Spinner;


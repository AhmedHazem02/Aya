import styles from './Button.module.css';

/**
 * زر موحد قابل لإعادة الاستخدام
 * Props:
 *  - variant: 'primary' | 'outline' | 'ghost' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - isLoading: boolean
 *  - fullWidth: boolean
 *  - type: 'button' | 'submit' | 'reset'
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  type = 'button',
  disabled,
  className = '',
  onClick,
  ...rest
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isLoading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <span className={styles.spinnerWrap}>
          <span className={styles.spinner} />
          <span>جارٍ التحميل...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

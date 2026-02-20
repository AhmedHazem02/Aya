import styles from './Input.module.css';

/**
 * حقل إدخال موحد
 * Props:
 *  - label: string
 *  - error: string
 *  - icon: ReactNode (أيقونة يمين الحقل)
 *  - type: string
 *  - fullWidth: boolean
 */
const Input = ({
  label,
  error,
  icon,
  type = 'text',
  fullWidth = true,
  className = '',
  id,
  ...rest
}) => {
  const inputId = id || label;

  return (
    <div className={[styles.wrapper, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        <input
          id={inputId}
          type={type}
          className={[styles.input, error ? styles.hasError : ''].filter(Boolean).join(' ')}
          {...rest}
        />
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
};

export default Input;

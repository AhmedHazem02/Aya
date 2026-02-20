// ===== Utility Helpers =====

/**
 * تنسيق السعر بالجنيه المصري
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '';
  return `${Number(price).toLocaleString('ar-EG')} ج.م`;
};

/**
 * تنسيق التاريخ بالعربية
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * حساب نسبة التقدم
 */
export const calcProgress = (completed, total) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * اختصار النص إذا تجاوز حداً معيناً
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * استخراج الخطأ من استجابة Axios
 */
export const extractApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.'
  );
};

/**
 * حفظ بيانات في localStorage
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage');
  }
};

/**
 * قراءة بيانات من localStorage
 */
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

/**
 * حذف بيانات من localStorage
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.error('Failed to remove from localStorage');
  }
};

/**
 * تحويل مستوى الكورس للعربية
 */
export const getLevelInArabic = (level) => {
  const map = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
  };
  return map[level] || level;
};

/**
 * الحصول على class اسم مستوى الكورس
 */
export const getLevelClass = (level) => {
  const map = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced',
  };
  return map[level] || '';
};

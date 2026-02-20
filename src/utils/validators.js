// ===== Form Validators =====

/**
 * التحقق من صحة البريد الإلكتروني
 */
export const validateEmail = (email) => {
  if (!email) return 'البريد الإلكتروني مطلوب';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'صيغة البريد الإلكتروني غير صحيحة';
  return null;
};

/**
 * التحقق من كلمة المرور
 */
export const validatePassword = (password) => {
  if (!password) return 'كلمة المرور مطلوبة';
  if (password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  return null;
};

/**
 * التحقق من تطابق كلمتي المرور
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'تأكيد كلمة المرور مطلوب';
  if (password !== confirmPassword) return 'كلمتا المرور غير متطابقتين';
  return null;
};

/**
 * التحقق من الاسم الكامل
 */
export const validateFullName = (name) => {
  if (!name || !name.trim()) return 'الاسم الكامل مطلوب';
  if (name.trim().length < 3) return 'الاسم يجب أن يكون 3 أحرف على الأقل';
  return null;
};

/**
 * التحقق من رقم الهاتف (مصري)
 */
export const validatePhone = (phone) => {
  if (!phone) return 'رقم الهاتف مطلوب';
  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'أدخل رقم هاتف مصري صحيح (يبدأ بـ 010، 011، 012، أو 015)';
  }
  return null;
};

/**
 * التحقق من سنوات الخبرة
 */
export const validateExperience = (years) => {
  if (years === '' || years === null || years === undefined) return 'سنوات الخبرة مطلوبة';
  const num = Number(years);
  if (isNaN(num) || num < 0 || num > 50) return 'أدخل عدد سنوات خبرة صحيح (0-50)';
  return null;
};

/**
 * التحقق من التخصص
 */
export const validateSpecialization = (value) => {
  if (!value || !value.trim()) return 'التخصص مطلوب';
  if (value.trim().length < 3) return 'أدخل تخصصاً واضحاً';
  return null;
};

/**
 * التحقق من رفع السيرة الذاتية
 */
export const validateCV = (file) => {
  if (!file) return 'يرجى رفع السيرة الذاتية';
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) return 'صيغة الملف غير مدعومة (jpeg, png, pdf فقط)';
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) return 'حجم الملف يجب أن يكون أقل من 5 ميجابايت';
  return null;
};

/**
 * التحقق من نموذج تسجيل الدخول
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
};

/**
 * التحقق من نموذج إنشاء حساب طالب
 */
export const validateStudentRegisterForm = ({ fullName, email, password, confirmPassword }) => {
  const errors = {};
  const nameError = validateFullName(fullName);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmError = validateConfirmPassword(password, confirmPassword);
  if (nameError) errors.fullName = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmError) errors.confirmPassword = confirmError;
  return errors;
};

/**
 * التحقق من نموذج طلب الانضمام كمهندس
 */
export const validateEngineerJoinForm = ({ fullName, email, phone, specialization, experience, cv }) => {
  const errors = {};
  const nameError = validateFullName(fullName);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  const specError = validateSpecialization(specialization);
  const expError = validateExperience(experience);
  const cvError = validateCV(cv);
  if (nameError) errors.fullName = nameError;
  if (emailError) errors.email = emailError;
  if (phoneError) errors.phone = phoneError;
  if (specError) errors.specialization = specError;
  if (expError) errors.experience = expError;
  if (cvError) errors.cv = cvError;
  return errors;
};

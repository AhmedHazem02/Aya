# 🎓 مركز المهارات — Skills Center Platform

> **منصة تعليمية متكاملة** — Frontend built with React + Vite  
> هذا الـ README موجه لتيم الفرونت والباك ليكونوا على علم بكل ما تم بناؤه وما تبقى.

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [المكتبات والتقنيات](#المكتبات-والتقنيات)
3. [كيفية تشغيل المشروع](#كيفية-تشغيل-المشروع)
4. [متغيرات البيئة](#متغيرات-البيئة)
5. [هيكل المجلدات الكامل](#هيكل-المجلدات-الكامل)
6. [ما تم إنجازه](#ما-تم-إنجازه)
7. [ما تبقى للتيم](#ما-تبقى-للتيم)
8. [جدول الـ Routes](#جدول-الـ-routes)
9. [API Endpoints المطلوبة من الباك](#api-endpoints-المطلوبة-من-الباك)
10. [Auth Flow](#auth-flow)
11. [المكونات المشتركة](#المكونات-المشتركة)
12. [ملاحظات مهمة للتيم](#ملاحظات-مهمة-للتيم)

---

## نظرة عامة

مشروع **مركز المهارات** هو منصة تعليمية تدعم:

| نوع المستخدم | الصلاحيات |
|---|---|
| **طالب (student)** | تسجيل الدخول، إنشاء حساب، تصفح الكورسات، الاشتراك، متابعة التقدم، تقييم |
| **مهندس/مدرب (engineer)** | تسجيل الدخول فقط (الحساب يُنشأ من الإدارة بعد قبول الطلب) |
| **أدمن (admin)** | إدارة كاملة للمنصة |

النظام مقسم **Frontend + Backend** منفصلين، والفرونت يتواصل مع الباك عبر **REST API**.

---

## المكتبات والتقنيات

| المكتبة | الإصدار | الغرض |
|---|---|---|
| React | 19.x | UI library |
| Vite | 7.x | Build tool + Dev server |
| react-router-dom | 7.x | Client-side routing |
| axios | 1.x | HTTP requests + interceptors |
| react-hot-toast | 2.x | Toast notifications |
| CSS Modules | — | Scoped component styles |
| Cairo Font (Google Fonts) | — | الخط العربي |

---

## كيفية تشغيل المشروع

```bash
# 1 — استنسخ (أو افتح) المجلد
cd skills-center

# 2 — انسخ ملف البيئة
cp .env.example .env

# 3 — عدّل VITE_API_BASE_URL في .env ليشير لـ Backend
# مثال: VITE_API_BASE_URL=http://localhost:8000/api

# 4 — ثبّت الـ packages
npm install

# 5 — شغّل Dev Server
npm run dev
# → http://localhost:5173

# Build للإنتاج
npm run build
```

---

## متغيرات البيئة

الملف: `.env` (انسخه من `.env.example`)

```env
# URL الـ Backend API — الوحيد المطلوب
VITE_API_BASE_URL=http://localhost:8000/api

# اسم التطبيق (اختياري)
VITE_APP_NAME=مركز المهارات

# تفعيل Mock Mode — بيانات وهمية بدون Backend (اضبطها false عند الربط الحقيقي)
VITE_MOCK_MODE=true
```

> **⚠️ مهم للباك:** كل طلبات الـ API تبدأ بـ `VITE_API_BASE_URL` — اضمن إن الباك شغال على نفس الـ URL ده.

---

## هيكل المجلدات الكامل

```
skills-center/
├── public/
├── src/
│   │
│   ├── api/                          # ← طبقة التواصل مع الـ Backend
│   │   ├── axios.js                  # Axios instance مع interceptors
│   │   ├── auth.api.js               # كل Auth endpoints
│   │   └── courses.api.js            # كل Courses endpoints
│   │
│   ├── assets/
│   │   └── images/                   # الصور المحلية
│   │
│   ├── components/
│   │   ├── common/                   # مكونات UI قابلة لإعادة الاستخدام
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Input.module.css
│   │   │   └── Spinner/
│   │   │       ├── Spinner.jsx
│   │   │       └── Spinner.module.css
│   │   │
│   │   └── layout/                   # مكونات الهيكل العام
│   │       ├── Navbar/
│   │       │   ├── Navbar.jsx
│   │       │   └── Navbar.module.css
│   │       ├── Footer/
│   │       │   ├── Footer.jsx
│   │       │   └── Footer.module.css
│   │       └── Layout/
│   │           ├── Layout.jsx        # Wrapper: Navbar + children + Footer
│   │           └── Layout.module.css
│   │
│   ├── context/
│   │   └── AuthContext.jsx           # Global Auth State (user, token, login, logout)
│   │
│   ├── hooks/
│   │   └── useAuth.js                # re-export لـ useAuth hook
│   │
│   ├── pages/
│   │   ├── Auth/                     # ✅ مكتملة
│   │   │   ├── AuthLanding/          # الصفحة الرئيسية (اختيار: طالب / مهندس)
│   │   │   ├── StudentLogin/         # تسجيل دخول الطالب
│   │   │   ├── StudentRegister/      # إنشاء حساب طالب جديد
│   │   │   ├── EngineerLogin/        # تسجيل دخول المهندس
│   │   │   └── EngineerJoinRequest/  # طلب انضمام مهندس (مع رفع السيرة الذاتية)
│   │   │
│   │   ├── Home/                     # ✅ مكتملة (Hero + Stats + Featured Courses + CTA)
│   │   │
│   │   ├── Courses/
│   │   │   └── AllCourses/           # ✅ مكتملة (جميع الكورسات + فلترة + بحث)
│   │   │       ├── index.jsx
│   │   │       └── AllCourses.module.css
│   │   │
│   │   ├── Dashboard/                # ✅ مكتملة (لوحة تحكم الطالب)
│   │   │   ├── index.jsx
│   │   │   └── Dashboard.module.css
│   │   │
│   │   └── Rating/                   # ✅ مكتملة (تقييم الكورس)
│   │       ├── index.jsx
│   │       └── Rating.module.css
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx             # جميع الـ Routes في مكان واحد
│   │   └── ProtectedRoute.jsx        # حماية الصفحات + Role-based access
│   │
│   ├── styles/
│   │   ├── variables.css             # CSS Custom Properties (ألوان، خطوط، spacing...)
│   │   └── global.css                # Global reset + utility classes
│   │
│   ├── utils/
│   │   ├── constants.js              # ROUTES, USER_ROLES, PLATFORM_STATS...
│   │   ├── helpers.js                # formatPrice, formatDate, localStorage utils...
│   │   └── validators.js             # Form validation functions
│   │
│   ├── App.jsx                       # Root component (BrowserRouter + AuthProvider + Toaster)
│   └── main.jsx                      # Entry point
│
├── .env                              # متغيرات البيئة (لا يُرفع على Git)
├── .env.example                      # نموذج متغيرات البيئة
├── index.html
├── vite.config.js
└── package.json
```

---

## ما تم إنجازه

### ✅ 1. Auth Layer (الجزء الكامل)

#### صفحة الاختيار الرئيسية — `AuthLanding`
- خلفية gradient زرقاء مثل الـ UI
- زر "الدخول كطالب" → `/auth/student/login`
- زر "الدخول كمهندس" → `/auth/engineer/login`

#### صفحة دخول الطالب — `StudentLogin`
- حقول: البريد الإلكتروني + كلمة المرور
- Validation فوري على كل حقل
- رابط "نسيت كلمة المرور"
- رابط "إنشاء حساب جديد"
- بعد الدخول → يُحوَّل للصفحة التي كان يريد الوصول إليها (أو Dashboard)

#### صفحة إنشاء حساب طالب — `StudentRegister`
- حقول: الاسم الكامل + البريد + كلمة المرور + تأكيد كلمة المرور
- Validation كامل مع رسائل خطأ عربية
- بعد التسجيل → يسجل الدخول تلقائياً ويحول للـ Dashboard

#### صفحة دخول المهندس — `EngineerLogin`
- نفس نموذج الدخول مع Banner توضيحي (الصفحة للمهندسين المعتمدين فقط)
- رابط "قدّم طلب انضمام"

#### صفحة طلب انضمام مهندس — `EngineerJoinRequest`
- حقول: الاسم + البريد + الهاتف + التخصص + سنوات الخبرة
- **رفع السيرة الذاتية** (image/pdf) مع Drag-click zone
- بعد الإرسال → صفحة نجاح مخصصة

---

### ✅ 2. API Layer (جاهزة للربط)

#### `src/api/axios.js`
- Axios instance موحد يقرأ الـ Base URL من `.env`
- **Request Interceptor:** يضيف `Authorization: Bearer <token>` تلقائياً على كل طلب
- **Response Interceptor:**
  - عند 401 → يحاول تجديد التوكن عبر `/auth/refresh`
  - إذا فشل التجديد → يمسح البيانات ويحول للـ Login تلقائياً
  - Queue system: طلبات معلقة تنتظر التجديد ثم تُرسل

#### `src/api/auth.api.js`
```
studentLogin(email, password)
studentRegister(fullName, email, password, password_confirmation)
forgotPassword(email)
resetPassword(token, password, password_confirmation)
engineerLogin(email, password)
engineerJoinRequest(formData)  ← FormData لأن فيه file upload
logout()
getMe()
```

#### `src/api/courses.api.js`
```
getAllCourses({ search, level, price, page })
getCourseById(id)
getFeaturedCourses()
enrollInCourse(courseId)
getStudentCourses()
getCourseProgress(courseId)
rateCourse(courseId, { rating, review })
getStudentStats()
```

---

### ✅ 3. AuthContext — إدارة الجلسة

الملف: `src/context/AuthContext.jsx`

```javascript
// ما يوفره الـ Context:
const {
  user,            // بيانات المستخدم الحالي
  isLoading,       // هل لا يزال يتحقق من الجلسة؟
  isAuthenticated, // هل المستخدم مسجل دخول؟
  isStudent,       // هل دوره student؟
  isEngineer,      // هل دوره engineer؟
  isAdmin,         // هل دوره admin؟
  loginStudent,    // دالة لتسجيل دخول الطالب
  loginEngineer,   // دالة لتسجيل دخول المهندس
  logoutUser,      // دالة لتسجيل الخروج
} = useAuth();
```

**آلية العمل:**
1. عند تحميل التطبيق → يقرأ التوكن من `localStorage`
2. إذا وجد توكن → يستدعي `/auth/me` للتحقق وتحديث البيانات
3. التوكن والمستخدم محفوظان في `localStorage` تحت مفاتيح:
   - `skills_center_token`
   - `skills_center_refresh_token`
   - `skills_center_user`

---

### ✅ 4. Routing & ProtectedRoute

الملف: `src/routes/ProtectedRoute.jsx`

```jsx
// استخدام بدون تحديد role — أي مستخدم مسجل
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// استخدام مع role محدد
<ProtectedRoute allowedRoles={['student']}>
  <MyCourses />
</ProtectedRoute>

// إذا لم يكن مسجلاً → يحوّل للـ Login مع حفظ المسار
// إذا كان دوره مختلف → يحوّل للـ Home
```

---

### ✅ 5. Navbar (مكتمل)

- Fixed navbar (70px ارتفاع) بـ backdrop-filter
- Logo يحوّل للـ Home
- روابط التنقل: الكورسات / كورساتي / الدعم (تظهر فقط بعد الدخول)
- User Dropdown: اسم المستخدم + زر الخروج + الملف الشخصي
- زر الإشعارات (Bell) مع نقطة حمراء
- Responsive: على الموبايل يختفي النص ويظهر Hamburger

---

### ✅ 6. Mock Mode (للتطوير بدون Backend)

بإضافة `VITE_MOCK_MODE=true` في `.env`، كل طلبات الـ API تُستبدل ببيانات وهمية محلية من `src/api/mockData.js` — لا يحتاج الفرونت لأي باك شغال.

```env
# .env
VITE_MOCK_MODE=true
```

عند الربط الفعلي مع الباك، اضبطها على `false` أو احذفها.

---

### ✅ 7. Home Page (مكتملة)

- **Hero Section:** عنوان ترحيبي + subtitle + زرين (كورساتي / تصفح الكورسات)
- **Stats Section:** 4 إحصائيات (95% رضا / 150+ مدرب / 10,000+ طالب / 500+ كورس)
- **Featured Courses:** شبكة 3 بطاقات — يجلب من `/courses/featured` وعند الفشل يعرض mock data
- **CTA Section:** Gradient section مع زر اشتراك

---

### ✅ 8. Design System (CSS Variables)

الملف: `src/styles/variables.css`

```css
/* الألوان الرئيسية */
--color-primary: #1e3a8a;
--color-primary-light: #2563eb;
--color-secondary: #3b82f6;

/* الظلال */
--shadow-sm / --shadow-md / --shadow-lg / --shadow-xl

/* الـ Border Radius */
--border-radius-sm / --border-radius-md / --border-radius-lg / --border-radius-xl

/* الـ Spacing */
--spacing-xs (4px) → --spacing-3xl (64px)

/* الـ Font Sizes */
--font-size-xs (0.75rem) → --font-size-4xl (2.5rem)

/* Transitions */
--transition-fast / --transition-normal / --transition-slow

/* Navbar */
--navbar-height: 70px
```

---

### ✅ 9. Validators (جاهزة للاستخدام)

الملف: `src/utils/validators.js`

| الدالة | الوصف |
|---|---|
| `validateEmail(email)` | صحة البريد الإلكتروني |
| `validatePassword(password)` | 6 أحرف على الأقل |
| `validateConfirmPassword(pass, confirm)` | تطابق كلمتي المرور |
| `validateFullName(name)` | 3 أحرف على الأقل |
| `validatePhone(phone)` | رقم مصري (010/011/012/015) |
| `validateExperience(years)` | رقم بين 0 و50 |
| `validateCV(file)` | jpeg/png/pdf أقل من 5MB |
| `validateLoginForm({email, password})` | نموذج دخول كامل |
| `validateStudentRegisterForm({...})` | نموذج تسجيل كامل |
| `validateEngineerJoinForm({...})` | نموذج انضمام مهندس كامل |

---

### ✅ 10. Helpers (جاهزة للاستخدام)

الملف: `src/utils/helpers.js`

| الدالة | الوصف |
|---|---|
| `formatPrice(price)` | `1800` → `"1,800 ج.م"` |
| `formatDate(dateString)` | ISO date → تاريخ عربي |
| `calcProgress(completed, total)` | نسبة مئوية |
| `truncateText(text, maxLength)` | اختصار النص |
| `extractApiError(error)` | استخراج رسالة الخطأ من Axios |
| `saveToStorage(key, value)` | حفظ في localStorage |
| `getFromStorage(key)` | قراءة من localStorage |
| `removeFromStorage(key)` | حذف من localStorage |
| `getLevelInArabic(level)` | `"beginner"` → `"مبتدئ"` |
| `getLevelClass(level)` | CSS class اسم المستوى |

---

### ✅ 11. Dashboard — لوحة تحكم الطالب (`/dashboard`)

- **Hero Section:** بانر أزرق gradient مع ترحيب باسم المستخدم
- **Stats Grid (4 بطاقات):** نسبة الإنجاز / الشهادات / ساعات التعلم / الكورسات المسجل بها — كل بطاقة لها أيقونة ملونة
- **كورساتي Section:** قائمة الكورسات المسجل بها مع:
  - صورة الكورس + عنوانه + اسم المدرب
  - شريط تقدم مع نسبة مئوية + عدد الدروس
  - صندوق "الدرس التالي"
  - زرّان: "استكمال الكورس" + "تقييم"
- **كورسات موصى بها:** قسم CTA يحوّل لصفحة الكورسات
- يستدعي: `getStudentStats()` + `getStudentCourses()`

---

### ✅ 12. Rating — تقييم الكورس (`/courses/:id/rate`)

- بطاقة مركزية تحتوي:
  - أيقونة نجمة في دائرة `#eef2ff`
  - اسم الكورس + المدرب (يجلب عبر `getCourseById(id)`)
  - 5 نجوم تفاعلية مع hover + label عربي (سيئ / مقبول / جيد / جيد جداً / ممتاز)
  - Textarea لكتابة المراجعة
  - تحذير إذا ضغط إرسال بدون تقييم
  - زرّان: "إرسال التقييم" + "تخطي"
- بطاقة ثانية: إرشادات كتابة المراجعة
- عند الإرسال: `rateCourse(id, { rating, review })` ← toast نجاح ← navigate(-1)

---

### ✅ 13. All Courses — جميع الكورسات (`/courses`)

- **Hero Section:** خلفية gradient زرقاء مع عنوان + وصف فرعي
- **Filter Bar (3 حقول):**
  - حقل بحث باسم الكورس أو اسم المدرب
  - فلتر السعر (الكل / مجاني / أقل من 1000 / 1000-2000 / أكثر من 2000)
  - فلتر المستوى (مبتدئ / متوسط / متقدم)
  - زر "إعادة تعيين" + عداد النتائج
- **شبكة 3 أعمدة:** بطاقات كورسات (gradient فوتو فللباك) مع صورة + سعر + مستوى + عنوان + مدرب + ميتا + "عرض التفاصيل"
- **Responsive:** عمودين عند 900px، عمود واحد عند 600px
- **Empty State:** رسالة وزر إعادة تعيين عند عدم تطابق النتائج
- الفلترة client-side عبر `getAllCourses()`

---

## ما تبقى للتيم

| الصفحة | المسار | الأولوية |
|---|---|---|
| **Course Details** — تفاصيل الكورس | `/courses/:id` | 🔴 عالية |
| **My Courses** — الكورسات المسجل بها + تقدم | `/my-courses` | 🔴 عالية |
| **Engineer Dashboard** — إدارة الكورسات | `/engineer/dashboard` | 🟡 متوسطة |
| **Forgot Password Flow** | `/auth/forgot-password` | 🟡 متوسطة |
| **Profile Page** | `/profile` | 🟢 منخفضة |
| **Support Page** | `/support` | 🟢 منخفضة |

**ملاحظة للتيم:** كل صفحة stub موجودة بالفعل في المجلدات الصحيحة ومربوطة في AppRouter، فقط ابدأ بناء المحتوى داخلها مباشرة.

---

## جدول الـ Routes

| المسار | الصفحة | الحماية |
|---|---|---|
| `/` | AuthLanding | عام |
| `/auth/student/login` | StudentLogin | عام |
| `/auth/student/register` | StudentRegister | عام |
| `/auth/engineer/login` | EngineerLogin | عام |
| `/auth/engineer/join` | EngineerJoinRequest | عام |
| `/home` | Home | مسجل دخول |
| `/courses` | AllCourses | عام |
| `/courses/:id` | CourseDetails | عام |
| `/courses/:id/rate` | CourseRating | student فقط |
| `/dashboard` | Dashboard | student فقط |
| `/my-courses` | MyCourses | student فقط |
| `/engineer/dashboard` | EngineerDashboard | engineer/admin |
| `/profile` | Profile | مسجل دخول |

---

## API Endpoints المطلوبة من الباك

> **⚠️ للتيم الباك:** هذه القائمة الكاملة بالـ Endpoints التي يستدعيها الفرونت حالياً. كل الطلبات ترسل `Authorization: Bearer <token>` في الـ Header عدا صفحات الـ Auth.

### Auth Endpoints

```
POST   /auth/student/login
       Body: { email, password }
       Return: { access_token, refresh_token, user: { id, name, email, role } }

POST   /auth/student/register
       Body: { full_name, email, password, password_confirmation }
       Return: { message } أو { access_token, refresh_token, user }

POST   /auth/engineer/login
       Body: { email, password }
       Return: { access_token, refresh_token, user: { id, name, email, role } }

POST   /auth/engineer/join-request
       Body: FormData { full_name, email, phone, specialization, experience_years, cv (file) }
       Return: { message }

POST   /auth/forgot-password
       Body: { email }
       Return: { message }

POST   /auth/reset-password
       Body: { token, password, password_confirmation }
       Return: { message }

POST   /auth/logout
       Header: Authorization Bearer token
       Return: { message }

POST   /auth/refresh
       Body: { refresh_token }
       Return: { access_token }

GET    /auth/me
       Header: Authorization Bearer token
       Return: { id, name, email, role, avatar? }
```

### Courses Endpoints

```
GET    /courses
       Query: ?search=&level=beginner|intermediate|advanced&price=&page=1
       Return: { courses: [...], total, page, pages }

GET    /courses/featured
       Return: { courses: [...] } (3-6 كورسات مميزة للهوم)

GET    /courses/:id
       Return: { id, title, description, level, price, instructor, duration_weeks,
                  students_count, start_date, thumbnail, lessons: [...] }

POST   /courses/:id/enroll
       Header: Authorization Bearer token
       Return: { message, enrollment_id }

POST   /courses/:id/rate
       Header: Authorization Bearer token
       Body: { rating (1-5), review (optional string) }
       Return: { message }
```

### Student Endpoints

```
GET    /student/courses
       Header: Authorization Bearer token
       Return: [{ course, progress_percent, completed_lessons, total_lessons,
                  next_lesson: { title } }]

GET    /student/courses/:id/progress
       Header: Authorization Bearer token
       Return: { progress_percent, completed_lessons, total_lessons, next_lesson }

GET    /student/stats
       Header: Authorization Bearer token
       Return: { progress_percent, earned_certificates, learning_hours, enrolled_courses }
```

### نموذج User Object (مهم)

```json
{
  "id": 1,
  "name": "أحمد علي",
  "email": "ahmed@example.com",
  "role": "student",
  "avatar": "https://..." 
}
```

**قيم الـ role المقبولة:** `student` | `engineer` | `admin`

### نموذج Course Object

```json
{
  "id": 1,
  "title": "تطوير مواقع ويب باستخدام React",
  "level": "intermediate",
  "price": 1500,
  "thumbnail": "https://...",
  "duration_weeks": 8,
  "students_count": 245,
  "start_date": "2025-03-15",
  "instructor": {
    "id": 3,
    "name": "م / أحمد محمد"
  }
}
```

**قيم الـ level المقبولة:** `beginner` | `intermediate` | `advanced`

---

## Auth Flow

```
المستخدم يفتح التطبيق
         ↓
App.jsx يشغل AuthProvider
         ↓
AuthContext يقرأ التوكن من localStorage
         ↓
إذا وجد توكن → يستدعي GET /auth/me
  ↓ نجح              ↓ فشل (401)
يحفظ User        يمسح localStorage
isAuthenticated=true   isAuthenticated=false
         ↓
كل Request → axios interceptor يضيف Bearer token
         ↓
عند 401 Response → يحاول POST /auth/refresh
  ↓ نجح              ↓ فشل
يحدث التوكن    يمسح كل شيء → يحول للـ Login
يُعيد الـ Request
```

---

## المكونات المشتركة

### `<Button />`

```jsx
import Button from '../components/common/Button/Button';

// Variants
<Button variant="primary">حفظ</Button>
<Button variant="outline">إلغاء</Button>
<Button variant="ghost">تجاهل</Button>
<Button variant="danger">حذف</Button>

// Sizes
<Button size="sm">صغير</Button>
<Button size="md">متوسط</Button>
<Button size="lg">كبير</Button>

// Props أخرى
<Button fullWidth isLoading={isSubmitting} type="submit">
  تسجيل الدخول
</Button>
```

---

### `<Input />`

```jsx
import Input from '../components/common/Input/Input';

<Input
  label="البريد الإلكتروني"
  type="email"
  name="email"
  placeholder="example@email.com"
  value={form.email}
  onChange={handleChange}
  error={errors.email}     // رسالة الخطأ (string)
  icon={<span>✉️</span>}  // أيقونة يسار الحقل (اختياري)
/>
```

---

### `<Spinner />`

```jsx
import Spinner from '../components/common/Spinner/Spinner';

<Spinner size="md" />             // inline spinner
<Spinner size="lg" fullPage />    // overlay يغطي الشاشة
```

---

### `<Layout />`

```jsx
import Layout from '../components/layout/Layout/Layout';

// يلف الصفحة بـ Navbar + Footer تلقائياً
const MyPage = () => (
  <Layout>
    <section>محتوى الصفحة</section>
  </Layout>
);

// بدون Footer
<Layout showFooter={false}>...</Layout>
```

---

## ملاحظات مهمة للتيم

### للفرونت تيم 🖥️

1. **استخدم `useAuth()`** للوصول لبيانات المستخدم في أي مكون بدل ما تمرر props.
2. **كل طلبات API** اعملها في `src/api/` وفي function منفصلة — لا تكتب axios مباشرة في الـ components.
3. **CSS Variables** موجودة في `variables.css` — استخدمها دائماً بدل القيم الثابتة. مثال: `color: var(--color-primary)`.
4. **CSS Modules** هو النظام المستخدم — كل component له ملف `.module.css` خاص به.
5. **Protected pages:** لف الصفحة بـ `<ProtectedRoute>` في `AppRouter.jsx`.
6. **Toast:** استخدم `react-hot-toast` للإشعارات:
   ```javascript
   import toast from 'react-hot-toast';
   toast.success('تم الحفظ بنجاح!');
   toast.error('حدث خطأ!');
   ```
7. **الكورسات Stub pages** موجودة — ابدأ البناء فيها مباشرة.

---

### للباك تيم ⚙️

1. **CORS:** الفرونت شغال على `http://localhost:5173` — تأكد من السماح له في CORS settings.
2. **Response Format:** كل الـ Errors ترجع بهذا الشكل حتى يعرض الفرونت الرسالة صح:
   ```json
   { "message": "البريد الإلكتروني أو كلمة المرور غير صحيحة" }
   ```
3. **Token:** Bearer token في الـ Authorization Header — الـ Interceptor يضيفه تلقائياً.
4. **Refresh Token:** الـ endpoint هو `POST /auth/refresh` ويقبل `{ refresh_token }`.
5. **File Upload:** endpoint طلب المهندس يستقبل `multipart/form-data`.
6. **User Role:** الـ field اسمه `role` وقيمه: `student` | `engineer` | `admin`.
7. **Featured Courses:** endpoint خاص `GET /courses/featured` بيرجع 3-6 كورسات للـ Home.

---

## معلومات المشروع

```
اسم المشروع:     مركز المهارات — Skills Center
الإصدار:         1.0.0
التقنية:         React 19 + Vite 7
اللغة:           JavaScript (JSX)
الاتجاه:         RTL (Arabic)
تاريخ البناء:    فبراير 2026
الصفحات المكتملة: Auth (5 صفحات) + Home + AllCourses + Dashboard + Rating
```

---

*© 2026 مركز المهارات. جميع الحقوق محفوظة.*


# Agent.md — سجل التغييرات التلقائية

> هذا الملف يوثّق كل تغيير نفّذه AI Agent على المشروع.
> آخر تحديث: وضع Mock Mode للتنقل المحلي بدون Backend.

---

## الهدف من هذه التغييرات

تمكين التنقل بين جميع صفحات التطبيق **بدون الحاجة لتشغيل Backend**،
من خلال إضافة "وضع Mock" يُعيد بيانات وهمية بدلاً من استدعاء API حقيقي.

---

## الملفات التي تم تعديلها

### 1. `.env`

**ما تغيّر:** إضافة متغير `VITE_MOCK_MODE=true`

```dotenv
# قبل:
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=مركز المهارات

# بعد:
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=مركز المهارات

# وضع التطوير — تعيين true لتشغيل بدون باك أند
VITE_MOCK_MODE=true
```

**لماذا:** هذا المتغير هو المفتاح الذي يتحكم في وضع Mock على مستوى المشروع كله.

---

### 2. `.env.example`

**ما تغيّر:** إضافة `VITE_MOCK_MODE` مع شرح

**لماذا:** توثيق المتغير لأي مطور يقوم بنسخ المشروع لأول مرة.

---

### 3. `src/api/mockData.js` ✨ (ملف جديد)

**ما هو:** ملف البيانات الوهمية — يحتوي على:

| المُصدَّر | الوصف |
|-----------|-------|
| `MOCK_USERS` | 3 مستخدمين وهميين: student, engineer, admin |
| `MOCK_TOKEN` | توكن وهمي للجلسة |
| `MOCK_REFRESH_TOKEN` | توكن تحديث وهمي |
| `mockDelay(ms)` | دالة تأخير تحاكي وقت الاستجابة الحقيقي |
| `MOCK_COURSES` | 6 كورسات وهمية بمستويات مختلفة |
| `MOCK_STUDENT_STATS` | إحصائيات وهمية للـ Dashboard |
| `MOCK_STUDENT_COURSES` | كورسان مسجل بهما الطالب |

**لماذا:** تمركز البيانات الوهمية في ملف واحد بدلاً من تكرارها.

---

### 4. `src/api/auth.api.js`

**ما تغيّر:** إضافة `IS_MOCK` check في بداية كل دالة

```js
// أُضيف في أعلى الملف:
import { MOCK_USERS, MOCK_TOKEN, MOCK_REFRESH_TOKEN, mockDelay } from './mockData';
const IS_MOCK = import.meta.env.VITE_MOCK_MODE === 'true';
```

**الدوال المعدّلة:**

| الدالة | سلوك Mock |
|--------|-----------|
| `studentLogin` | يقبل أي email/password — يرجع mock student user |
| `studentRegister` | يرجع mock student user باسم المدخل |
| `engineerLogin` | يقبل أي email/password — يرجع mock engineer user |
| `engineerJoinRequest` | يرجع رسالة نجاح وهمية |
| `forgotPassword` | يرجع رسالة إرسال بريد وهمية |
| `resetPassword` | يرجع رسالة نجاح وهمية |
| `logout` | يرجع رسالة خروج وهمية |
| `getMe` | يرجع المستخدم من localStorage أو mock student |

**لماذا:** بهذا الشكل كل صفحات Auth تعمل بشكل كامل بدون API.

---

### 5. `src/api/courses.api.js`

**ما تغيّر:** إضافة `IS_MOCK` check في كل دالة

```js
// أُضيف في أعلى الملف:
import { MOCK_COURSES, MOCK_STUDENT_COURSES, MOCK_STUDENT_STATS, mockDelay } from './mockData';
const IS_MOCK = import.meta.env.VITE_MOCK_MODE === 'true';
```

**الدوال المعدّلة:**

| الدالة | سلوك Mock |
|--------|-----------|
| `getAllCourses` | يرجع 6 كورسات، مع دعم فلتر `search` و `level` |
| `getCourseById` | يبحث عن الكورس بالـ id في MOCK_COURSES |
| `getFeaturedCourses` | يرجع أول 3 كورسات |
| `enrollInCourse` | يرجع رسالة نجاح وهمية |
| `getStudentCourses` | يرجع MOCK_STUDENT_COURSES |
| `getCourseProgress` | يبحث عن تقدم الطالب بالـ courseId |
| `rateCourse` | يرجع رسالة نجاح مع قيمة التقييم |
| `getStudentStats` | يرجع MOCK_STUDENT_STATS |

**لماذا:** صفحة AllCourses والـ Dashboard والـ Rating تحتاج هذه البيانات.

---

## طريقة الاستخدام

### تشغيل التطبيق بدون Backend (وضع Mock)

```bash
# .env يجب أن يحتوي على:
VITE_MOCK_MODE=true

# ثم شغّل كالمعتاد:
npm run dev
```

### بيانات الدخول في وضع Mock

| نوع المستخدم | Email | Password |
|-------------|-------|----------|
| طالب | أي email | أي password |
| مهندس | أي email | أي password |

> في وضع Mock، أي بيانات دخول تنجح — لا يوجد تحقق حقيقي.

---

## كيفية التبديل للـ Backend الحقيقي

عندما يُسلّمك فريق الـ Backend الـ API:

1. افتح ملف `.env`
2. غيّر `VITE_MOCK_MODE=true` إلى `VITE_MOCK_MODE=false`
3. تأكد أن `VITE_API_BASE_URL` يشير للـ URL الصحيح
4. أوقف السيرفر وأعد تشغيله (`npm run dev`)

```dotenv
# وضع الإنتاج / الباك الحقيقي:
VITE_API_BASE_URL=https://api.skills-center.com/api
VITE_MOCK_MODE=false
```

**لا يلزم حذف أي كود** — الـ `IS_MOCK=false` سيتجاهل كل بيانات Mock تلقائياً.

---

## ملاحظات تقنية

- **ملف `mockData.js` لا يُحذف** عند الانتقال للـ Backend الحقيقي — يبقى مرجعاً لتنسيق البيانات المتوقع
- **`mockDelay()`** تُحاكي وقت استجابة حقيقي لاختبار الـ loading states
- **`AuthContext.jsx` لم يُعدَّل** — لأن `getMe()` موجودة بالفعل في try/catch فلا تؤثر على الجلسة لو رجعت خطأ
- **صفحة Home** كانت تحتوي بالفعل على `MOCK_COURSES` fallback — الآن `getFeaturedCourses()` نفسها ترجع بيانات حقيقية في وضع Mock

---

## ملخص الملفات

| الملف | النوع | الغرض |
|-------|-------|--------|
| `src/api/mockData.js` | جديد | مصدر البيانات الوهمية |
| `src/api/auth.api.js` | معدّل | إضافة mock لكل دوال Auth |
| `src/api/courses.api.js` | معدّل | إضافة mock لكل دوال Courses |
| `.env` | معدّل | تفعيل `VITE_MOCK_MODE=true` |
| `.env.example` | معدّل | توثيق المتغير الجديد |
| `Agent.md` | جديد | هذا الملف — توثيق كل التغييرات |

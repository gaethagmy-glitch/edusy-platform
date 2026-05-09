'use client';
import { useState } from 'react';
import styles from './login.module.css';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (remember) {
      localStorage.setItem('edusy_remember', email);
    }

    const result = await loginUser(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // حفظ بيانات المستخدم
    localStorage.setItem('edusy_user', JSON.stringify(result));

    // توجيه حسب الدور
    if (result.role === 'admin') {
      window.location.href = '/admin';
    } else if (result.role === 'teacher') {
      window.location.href = '/teacher';
    } else {
      window.location.href = '/student';
    }
  }


  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.formSide}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <span className={styles.logoText}>EduSy</span>
          </a>

          <h1 className={styles.title}>تسجيل الدخول</h1>
          <p className={styles.subtitle}>أدخل بياناتك للوصول لحسابك</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>البريد الإلكتروني</label>
              <input type="email" placeholder="example@edusy.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className={styles.field}>
              <label>كلمة المرور</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <label className={styles.rememberMe}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <span>تذكرني</span>
            </label>
            {error && <div className={styles.errorMsg}>❌ {error}</div>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className={styles.registerNote}>
            <p>🆕 ما عندك حساب؟</p>
            <p>اذهب لصفحة <a href="/browse">المراحل الدراسية</a> واضغط "سجّل اشتراكك" لإرسال طلبك عبر واتساب</p>
          </div>

          <div className={styles.adminHint}>
            💡 <strong>تجربة:</strong><br/>
            أدمن: <code>admin@edusy.com</code> / <code>admin123</code>
          </div>
        </div>

        <div className={styles.visualSide}>
          <div className={styles.visualContent}>
            <h2>تعلّم بدون حدود 🚀</h2>
            <p>منصة تعليمية متكاملة مع فيديوهات حصرية، اختبارات تفاعلية، وتواصل مباشر مع المدرسين</p>
            <div className={styles.features}>
              <div className={styles.featureItem}>✅ +120 كورس متاح</div>
              <div className={styles.featureItem}>✅ +45 مدرس متميّز</div>
              <div className={styles.featureItem}>✅ دفع عبر شام كاش</div>
              <div className={styles.featureItem}>✅ محتوى حصري ومحمي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.bgOverlay}></div>
      <div className={`container ${styles.ctaContainer}`}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>جاهز تبدأ رحلتك التعليمية؟</h2>
          <p className={styles.ctaSubtitle}>
            انضم لأكثر من 2,500 طالب يتعلمون يومياً على منصتنا.
            سجّل الآن مجاناً وابدأ التعلم فوراً!
          </p>
          <div className={styles.ctaActions}>
            <a href="/login" className={`btn btn-accent btn-lg ${styles.ctaBtn}`}>
              <span>سجّل الآن مجاناً</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>
            <a href="/browse" className={`btn ${styles.ctaSecondaryBtn}`}>
              تصفّح المراحل الدراسية
            </a>
          </div>
          <div className={styles.ctaTrust}>
            <span>✓ بدون بطاقة بنكية</span>
            <span>✓ حساب مجاني</span>
            <span>✓ إلغاء في أي وقت</span>
          </div>
        </div>
      </div>
    </section>
  );
}

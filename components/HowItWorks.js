import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '👤',
      title: 'أنشئ حسابك',
      description: 'سجّل حساب مجاني في ثوانٍ وابدأ تصفّح الكورسات المتاحة.',
    },
    {
      number: '02',
      icon: '📚',
      title: 'اختر كورسك',
      description: 'تصفّح الكورسات واختر ما يناسبك. شاهد التفاصيل وتقييمات الطلاب.',
    },
    {
      number: '03',
      icon: '💳',
      title: 'ادفع بسهولة',
      description: 'ادفع عبر شام كاش أو سيرياتيل كاش. تأكيد فوري وبدء التعلم مباشرة.',
    },
    {
      number: '04',
      icon: '🎓',
      title: 'تعلّم وتطوّر',
      description: 'شاهد الفيديوهات، حل الاختبارات، وتواصل مع مدرسك في أي وقت.',
    },
  ];

  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">🚀</span>
            كيف تبدأ؟
          </div>
          <h2 className="section-title">
            ابدأ رحلتك في <span className="gradient-text">4 خطوات</span>
          </h2>
          <p className="section-subtitle">
            عملية سهلة وسريعة للبدء بالتعلم على منصتنا
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={styles.stepConnector}>
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                    <path d="M0 6H36M36 6L30 1M36 6L30 11" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

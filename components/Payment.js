import styles from './Payment.module.css';

export default function Payment() {
  return (
    <section className={styles.payment} id="payment">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">💳</span>
            طرق الدفع
          </div>
          <h2 className="section-title">
            ادفع بسهولة <span className="gradient-text">من داخل سوريا</span>
          </h2>
          <p className="section-subtitle">
            طرق دفع محلية سهلة ومريحة. بدون بطاقة بنكية أو حسابات دولية
          </p>
        </div>

        <div className={styles.paymentGrid}>
          {/* ShamCash */}
          <div className={styles.paymentCard}>
            <div className={styles.paymentHeader}>
              <div className={styles.paymentLogo} style={{ background: 'linear-gradient(135deg, #1B5E20, #4CAF50)' }}>
                <span>💰</span>
              </div>
              <div>
                <h3 className={styles.paymentName}>شام كاش</h3>
                <p className={styles.paymentNameEn}>ShamCash</p>
              </div>
            </div>
            
            <ul className={styles.paymentFeatures}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                تحويل سريع وآمن
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                تأكيد الدفع خلال دقائق
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                متاح في جميع المحافظات
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                بدون عمولة إضافية
              </li>
            </ul>

            <div className={styles.paymentSteps}>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>1</span>
                <span>حوّل المبلغ عبر شام كاش</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>2</span>
                <span>أدخل رقم العملية</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>3</span>
                <span>يتم تفعيل الكورس فوراً</span>
              </div>
            </div>
          </div>

          {/* Syriatel Cash */}
          <div className={styles.paymentCard}>
            <div className={styles.paymentHeader}>
              <div className={styles.paymentLogo} style={{ background: 'linear-gradient(135deg, #B71C1C, #F44336)' }}>
                <span>📱</span>
              </div>
              <div>
                <h3 className={styles.paymentName}>سيرياتيل كاش</h3>
                <p className={styles.paymentNameEn}>Syriatel Cash</p>
              </div>
            </div>

            <ul className={styles.paymentFeatures}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                من رصيد موبايلك مباشرة
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                دفع عبر كود USSD
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                آمن وموثوق 100%
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                إيصال إلكتروني فوري
              </li>
            </ul>

            <div className={styles.paymentSteps}>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>1</span>
                <span>ادفع عبر سيرياتيل كاش</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>2</span>
                <span>أدخل رقم العملية</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniStepNum}>3</span>
                <span>يتم تفعيل الكورس فوراً</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.securityNote}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>جميع عمليات الدفع محمية ومشفرة. أموالك في أمان تام.</span>
        </div>
      </div>
    </section>
  );
}

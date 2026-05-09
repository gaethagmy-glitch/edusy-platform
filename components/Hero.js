import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      {/* Background Decorations */}
      <div className={styles.bgDecor}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Text Content */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            منصة تعليمية سورية 🇸🇾
          </div>

          <h1 className={styles.title}>
            تعلّم من أفضل
            <br />
            <span className={styles.titleHighlight}>المدرسين في سوريا</span>
          </h1>

          <p className={styles.subtitle}>
            منصة تعليمية متكاملة توفر لك كورسات حصرية، اختبارات تفاعلية بعد كل
            درس، وتواصل مباشر مع المدرسين. ادفع بسهولة عبر شام كاش وسيرياتيل كاش.
          </p>

          <div className={styles.heroActions}>
            <a href="/browse" className="btn btn-primary btn-lg">
              <span>ابدأ التعلم الآن</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>
            <a href="#how-it-works" className="btn btn-secondary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              <span>كيف تعمل المنصة؟</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <div className={styles.trustAvatars}>
                <div className={styles.avatar} style={{ background: '#6366F1' }}>أ</div>
                <div className={styles.avatar} style={{ background: '#EC4899' }}>س</div>
                <div className={styles.avatar} style={{ background: '#F59E0B' }}>م</div>
                <div className={styles.avatar} style={{ background: '#10B981' }}>ل</div>
              </div>
              <span className={styles.trustText}>+2,500 طالب مسجّل</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <span className={styles.trustStars}>⭐⭐⭐⭐⭐</span>
              <span className={styles.trustText}>تقييم 4.9/5</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.mainCard}>
            <div className={styles.videoPreview}>
              <div className={styles.videoThumbnail}>
                <div className={styles.playButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="8 5 20 12 8 19 8 5" />
                  </svg>
                </div>
                <div className={styles.videoDuration}>12:35</div>
              </div>
              <div className={styles.videoInfo}>
                <h4>مقدمة في البرمجة بلغة Python</h4>
                <p>أ. محمد الأحمد</p>
              </div>
            </div>

            {/* Floating Cards */}
            <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
              <div className={styles.floatingIcon}>🎓</div>
              <div>
                <strong>120+</strong>
                <span>كورس متاح</span>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
              <div className={styles.floatingIcon}>✅</div>
              <div>
                <strong>اختبار ناجح!</strong>
                <span>أحسنت، قارن إجابتك</span>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatingCard3}`}>
              <div className={styles.floatingIcon}>💬</div>
              <div>
                <strong>رسالة جديدة</strong>
                <span>من أ. سارة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

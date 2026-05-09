import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)" />
                  <path d="M8 22V12L16 8L24 12V22L16 26L8 22Z" fill="white" fillOpacity="0.9" />
                  <path d="M16 8V18M8 12L16 18L24 12" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                  <defs><linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#60A5FA" /></linearGradient></defs>
                </svg>
              </div>
              <span className={styles.logoText}>EduSy</span>
            </div>
            <p className={styles.brandDesc}>منصة تعليمية سورية متكاملة. تعلّم من أفضل المدرسين، بمحتوى حصري واختبارات تفاعلية.</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" className={styles.socialLink} aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a>
              <a href="#" className={styles.socialLink} aria-label="Telegram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 7.5a2.25 2.25 0 00.2 4.177l3.624 1.21 1.5 4.5a1.5 1.5 0 002.544.568l2.16-2.16 3.78 2.835a2.25 2.25 0 003.449-1.216l3.75-15a2.25 2.25 0 00-1.485-2.634z"/></svg></a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.linksTitle}>المنصة</h4>
            <ul>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/browse">المراحل الدراسية</a></li>
              <li><a href="/#teachers">المدرسين</a></li>
              <li><a href="/#payment">طرق الدفع</a></li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.linksTitle}>الدعم</h4>
            <ul>
              <li><a href="#">الأسئلة الشائعة</a></li>
              <li><a href="#">تواصل معنا</a></li>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">شروط الاستخدام</a></li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.linksTitle}>تواصل معنا</h4>
            <ul>
              <li className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@edusy.com">info@edusy.com</a>
              </li>
              <li className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <a href="#">+963 XX XXX XXXX</a>
              </li>
              <li className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>سوريا - دمشق</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 EduSy. جميع الحقوق محفوظة.</p>
          <p className={styles.madeWith}>صُنع بـ ❤️ في سوريا</p>
        </div>
      </div>
    </footer>
  );
}

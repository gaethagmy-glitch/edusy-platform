'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
              <path d="M8 22V12L16 8L24 12V22L16 26L8 22Z" fill="white" fillOpacity="0.9" />
              <path d="M16 8V18M8 12L16 18L24 12" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
              <defs><linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#60A5FA" /></linearGradient></defs>
            </svg>
          </div>
          <span className={styles.logoText}>EduSy</span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <li><a href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>الرئيسية</a></li>
          <li><a href="/browse" className={styles.navLink} onClick={() => setMenuOpen(false)}>المراحل الدراسية</a></li>
          <li><a href="/#features" className={styles.navLink} onClick={() => setMenuOpen(false)}>المميزات</a></li>
          <li><a href="/#teachers" className={styles.navLink} onClick={() => setMenuOpen(false)}>المدرسين</a></li>
          <li><a href="/#payment" className={styles.navLink} onClick={() => setMenuOpen(false)}>طرق الدفع</a></li>
        </ul>

        <div className={styles.authButtons}>
          <a href="/login" className={styles.loginBtn}>تسجيل الدخول</a>
          <a href="/login" className={styles.signupBtn}>إنشاء حساب</a>
        </div>

        <button className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleActive : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

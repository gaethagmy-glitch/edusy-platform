'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString('ar-EG')}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { icon: '👨‍🎓', number: 2500, suffix: '+', label: 'طالب مسجّل', color: '#2563EB' },
    { icon: '📚', number: 120, suffix: '+', label: 'كورس متاح', color: '#F97316' },
    { icon: '👨‍🏫', number: 45, suffix: '+', label: 'مدرس متميّز', color: '#10B981' },
    { icon: '✅', number: 8500, suffix: '+', label: 'اختبار مُنجز', color: '#8B5CF6' },
  ];

  return (
    <section className={styles.stats}>
      <div className={`container ${styles.statsGrid}`}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${stat.color}12`, color: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className={styles.statNumber}>
              <AnimatedCounter end={stat.number} suffix={stat.suffix} />
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

import styles from './Teachers.module.css';

export default function Teachers() {
  const teachers = [
    {
      name: 'أ. محمد الأحمد',
      specialty: 'مدرس برمجة وعلوم حاسوب',
      courses: 8,
      students: 1200,
      rating: 4.9,
      color: '#2563EB',
    },
    {
      name: 'أ. سارة المحمود',
      specialty: 'مصممة UI/UX ومدربة تصميم',
      courses: 6,
      students: 890,
      rating: 4.8,
      color: '#EC4899',
    },
    {
      name: 'أ. أحمد الخليل',
      specialty: 'مدرس لغة إنكليزية معتمد',
      courses: 10,
      students: 2100,
      rating: 4.7,
      color: '#10B981',
    },
    {
      name: 'أ. خالد سليمان',
      specialty: 'مدرس رياضيات وفيزياء',
      courses: 12,
      students: 1800,
      rating: 4.9,
      color: '#F97316',
    },
  ];

  return (
    <section className={styles.teachers} id="teachers">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">👨‍🏫</span>
            مدرسينا المتميزين
          </div>
          <h2 className="section-title">
            تعلّم من <span className="gradient-text">خبراء حقيقيين</span>
          </h2>
          <p className="section-subtitle">
            مدرسين ذوي خبرة عالية، ملتزمين بنجاحك ومتاحين للتواصل المباشر في أي وقت
          </p>
        </div>

        <div className={styles.teachersGrid}>
          {teachers.map((teacher, index) => (
            <div key={index} className={styles.teacherCard}>
              <div className={styles.avatarWrap}>
                <div className={styles.teacherAvatar} style={{ background: `linear-gradient(135deg, ${teacher.color}, ${teacher.color}99)` }}>
                  <span>{teacher.name.charAt(2)}{teacher.name.charAt(3)}</span>
                </div>
                <div className={styles.onlineBadge}></div>
              </div>

              <h3 className={styles.teacherName}>{teacher.name}</h3>
              <p className={styles.teacherSpecialty}>{teacher.specialty}</p>

              <div className={styles.teacherStats}>
                <div className={styles.teacherStat}>
                  <strong>{teacher.courses}</strong>
                  <span>كورس</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.teacherStat}>
                  <strong>{teacher.students.toLocaleString('ar-EG')}</strong>
                  <span>طالب</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.teacherStat}>
                  <strong>⭐ {teacher.rating}</strong>
                  <span>تقييم</span>
                </div>
              </div>

              <div className={styles.teacherActions}>
                <button className={styles.viewProfileBtn}>عرض الملف الشخصي</button>
                <button className={styles.messageBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

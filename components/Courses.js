import styles from './Courses.module.css';

export default function Courses() {
  const courses = [
    {
      title: 'البرمجة بلغة Python من الصفر',
      teacher: 'أ. محمد الأحمد',
      price: '45,000',
      oldPrice: '75,000',
      rating: 4.9,
      students: 342,
      lessons: 24,
      hours: '18',
      category: 'برمجة',
      color: '#2563EB',
      thumbnail: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
    },
    {
      title: 'تصميم واجهات UI/UX الاحترافي',
      teacher: 'أ. سارة المحمود',
      price: '55,000',
      oldPrice: '90,000',
      rating: 4.8,
      students: 256,
      lessons: 32,
      hours: '22',
      category: 'تصميم',
      color: '#EC4899',
      thumbnail: 'linear-gradient(135deg, #BE185D, #EC4899)',
    },
    {
      title: 'اللغة الإنكليزية - المستوى المتوسط',
      teacher: 'أ. أحمد الخليل',
      price: '35,000',
      oldPrice: '60,000',
      rating: 4.7,
      students: 589,
      lessons: 40,
      hours: '30',
      category: 'لغات',
      color: '#10B981',
      thumbnail: 'linear-gradient(135deg, #047857, #10B981)',
    },
    {
      title: 'الرياضيات للبكالوريا العلمي',
      teacher: 'أ. خالد سليمان',
      price: '40,000',
      oldPrice: '65,000',
      rating: 4.9,
      students: 478,
      lessons: 36,
      hours: '28',
      category: 'أكاديمي',
      color: '#F97316',
      thumbnail: 'linear-gradient(135deg, #C2410C, #F97316)',
    },
    {
      title: 'التسويق الرقمي من البداية',
      teacher: 'أ. لينا عبّاس',
      price: '50,000',
      oldPrice: '80,000',
      rating: 4.6,
      students: 198,
      lessons: 28,
      hours: '20',
      category: 'تسويق',
      color: '#8B5CF6',
      thumbnail: 'linear-gradient(135deg, #6D28D9, #8B5CF6)',
    },
    {
      title: 'الفيزياء للبكالوريا - شرح مبسّط',
      teacher: 'أ. عمر حسن',
      price: '38,000',
      oldPrice: '60,000',
      rating: 4.8,
      students: 367,
      lessons: 30,
      hours: '25',
      category: 'أكاديمي',
      color: '#14B8A6',
      thumbnail: 'linear-gradient(135deg, #0F766E, #14B8A6)',
    },
  ];

  return (
    <section className={styles.courses} id="courses">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">📚</span>
            الكورسات المتاحة
          </div>
          <h2 className="section-title">
            اكتشف <span className="gradient-text">كورساتنا المميزة</span>
          </h2>
          <p className="section-subtitle">
            كورسات متنوعة في مختلف المجالات، مقدّمة من أفضل المدرسين مع اختبارات تفاعلية بعد كل درس
          </p>
        </div>

        <div className={styles.coursesGrid}>
          {courses.map((course, index) => (
            <div key={index} className={styles.courseCard}>
              {/* Thumbnail */}
              <div className={styles.cardTop}>
                <div className={styles.thumbnail} style={{ background: course.thumbnail }}>
                  <div className={styles.playOverlay}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                      <polygon points="8 5 20 12 8 19 8 5" />
                    </svg>
                  </div>
                </div>
                <span className={styles.category} style={{ background: `${course.color}15`, color: course.color }}>
                  {course.category}
                </span>
                <span className={styles.discount}>خصم {Math.round((1 - parseInt(course.price.replace(',', '')) / parseInt(course.oldPrice.replace(',', ''))) * 100)}%</span>
              </div>

              {/* Info */}
              <div className={styles.cardBody}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                
                <div className={styles.teacherRow}>
                  <div className={styles.teacherAvatar} style={{ background: course.color }}>
                    {course.teacher.charAt(2)}
                  </div>
                  <span className={styles.teacherName}>{course.teacher}</span>
                </div>

                <div className={styles.courseMeta}>
                  <span>📖 {course.lessons} درس</span>
                  <span>⏱ {course.hours} ساعة</span>
                  <span>⭐ {course.rating}</span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceBox}>
                    <span className={styles.price}>{course.price} ل.س</span>
                    <span className={styles.oldPrice}>{course.oldPrice} ل.س</span>
                  </div>
                  <button className={styles.enrollBtn}>اشترك الآن</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="#" className="btn btn-secondary btn-lg">
            عرض جميع الكورسات
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

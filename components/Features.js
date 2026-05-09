import styles from './Features.module.css';

export default function Features() {
  const features = [
    {
      icon: '🎬',
      title: 'فيديوهات حصرية',
      description: 'محتوى تعليمي حصري على المنصة فقط، محمي بالكامل وغير متاح على يوتيوب أو أي منصة أخرى.',
      color: '#2563EB',
    },
    {
      icon: '📝',
      title: 'اختبارات تفاعلية',
      description: 'بعد كل فيديو، حل الاختبار وقارن إجابتك مع الإجابة الصحيحة للمدرس لتعرف مدى فهمك.',
      color: '#F97316',
    },
    {
      icon: '💬',
      title: 'تواصل مع المدرسين',
      description: 'تواصل مباشر ومستمر مع المدرسين. اسأل، استفسر، واحصل على إجابات في أي وقت.',
      color: '#10B981',
    },
    {
      icon: '💳',
      title: 'دفع سهل داخل سوريا',
      description: 'ادفع بسهولة عبر شام كاش أو سيرياتيل كاش. بدون بطاقة بنكية أو حسابات دولية.',
      color: '#8B5CF6',
    },
    {
      icon: '📱',
      title: 'متوافق مع كل الأجهزة',
      description: 'تعلّم من موبايلك، تابلت، أو كمبيوتر. المنصة مصممة لتعمل بسلاسة على جميع الأجهزة.',
      color: '#EC4899',
    },
    {
      icon: '📊',
      title: 'تتبّع تقدّمك',
      description: 'شاهد تقدمك في كل كورس، الدروس المنجزة، والاختبارات المحلولة في لوحة تحكم خاصة بك.',
      color: '#14B8A6',
    },
  ];

  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">✨</span>
            لماذا EduSy؟
          </div>
          <h2 className="section-title">
            كل ما تحتاجه في <span className="gradient-text">منصة واحدة</span>
          </h2>
          <p className="section-subtitle">
            منصة مصممة خصيصاً للطلاب في سوريا، مع كل الأدوات اللازمة للتعلم بفعالية
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div
                className={styles.featureIcon}
                style={{ background: `${feature.color}10`, border: `2px solid ${feature.color}20` }}
              >
                <span>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
              <div className={styles.featureHoverLine} style={{ background: feature.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

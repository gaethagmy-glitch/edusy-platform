'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './browse.module.css';

const stagesData = [
  { id: 1, name: 'بكالوريا علمي', icon: '🔬', color: '#2563EB', subjects: [
    { id: 1, name: 'رياضيات', icon: '📐', teachers: [
      { id: 1, name: 'أ. خالد سليمان', rating: 4.9, students: 478, videos: [
        { id: 1, title: 'الدرس 1: المشتقات', duration: '25:30', locked: false },
        { id: 2, title: 'الدرس 2: التكامل', duration: '30:15', locked: true },
        { id: 3, title: 'الدرس 3: النهايات', duration: '22:45', locked: true },
      ]},
      { id: 2, name: 'أ. عمر حسن', rating: 4.7, students: 320, videos: [
        { id: 4, title: 'الدرس 1: مقدمة الرياضيات', duration: '20:00', locked: false },
        { id: 5, title: 'الدرس 2: المعادلات', duration: '28:10', locked: true },
      ]},
    ]},
    { id: 2, name: 'فيزياء', icon: '⚛️', teachers: [
      { id: 3, name: 'أ. أحمد محمد', rating: 4.8, students: 367, videos: [
        { id: 6, title: 'الدرس 1: الحركة', duration: '18:20', locked: false },
        { id: 7, title: 'الدرس 2: القوة', duration: '24:50', locked: true },
      ]},
    ]},
    { id: 3, name: 'كيمياء', icon: '🧪', teachers: [] },
  ]},
  { id: 2, name: 'بكالوريا أدبي', icon: '📖', color: '#EC4899', subjects: [
    { id: 4, name: 'عربي', icon: '📝', teachers: [
      { id: 4, name: 'أ. فاطمة علي', rating: 4.6, students: 290, videos: [
        { id: 8, title: 'الدرس 1: النحو', duration: '22:30', locked: false },
      ]},
    ]},
    { id: 5, name: 'تاريخ', icon: '🏛️', teachers: [] },
    { id: 6, name: 'جغرافيا', icon: '🌍', teachers: [] },
  ]},
  { id: 3, name: 'تاسع', icon: '📚', color: '#10B981', subjects: [
    { id: 7, name: 'رياضيات', icon: '📐', teachers: [
      { id: 1, name: 'أ. خالد سليمان', rating: 4.9, students: 478, videos: [
        { id: 9, title: 'الدرس 1: الجبر', duration: '20:00', locked: false },
      ]},
    ]},
    { id: 8, name: 'علوم', icon: '🔭', teachers: [] },
    { id: 9, name: 'إنكليزي', icon: '🇬🇧', teachers: [] },
  ]},
];

export default function BrowsePage() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subName, setSubName] = useState('');
  const [subPhone, setSubPhone] = useState('');
  const [subStage, setSubStage] = useState('');

  const stage = stagesData.find(s => s.id === selectedStage);
  const subject = stage?.subjects.find(s => s.id === selectedSubject);
  const teacher = subject?.teachers.find(t => t.id === selectedTeacher);

  function handleSubscribe(e) {
    e.preventDefault();
    const msg = `مرحباً EduSy، أريد الاشتراك في المنصة\n------------------\nالاسم: ${subName}\nالموبايل: ${subPhone}\nالمرحلة: ${subStage}`;
    const whatsappUrl = `https://wa.me/963940925679?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setShowSubscribe(false);
  }

  function goBack() {
    if (selectedTeacher) setSelectedTeacher(null);
    else if (selectedSubject) setSelectedSubject(null);
    else if (selectedStage) setSelectedStage(null);
  }

  // Breadcrumb
  function Breadcrumb() {
    return (
      <div className={styles.breadcrumb}>
        <button onClick={() => { setSelectedStage(null); setSelectedSubject(null); setSelectedTeacher(null); }} className={!selectedStage ? styles.breadActive : ''}>المراحل</button>
        {stage && <><span>›</span><button onClick={() => { setSelectedSubject(null); setSelectedTeacher(null); }} className={selectedStage && !selectedSubject ? styles.breadActive : ''}>{stage.name}</button></>}
        {subject && <><span>›</span><button onClick={() => setSelectedTeacher(null)} className={selectedSubject && !selectedTeacher ? styles.breadActive : ''}>{subject.name}</button></>}
        {teacher && <><span>›</span><button className={styles.breadActive}>{teacher.name}</button></>}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.browsePage}>
        <div className="container">
          <div className={styles.browseHeader}>
            <div>
              <h1 className={styles.browseTitle}>📚 اختر مرحلتك الدراسية</h1>
              <p className={styles.browseSubtitle}>اختر المرحلة ← المادة ← الأستاذ لمشاهدة الدروس</p>
            </div>
            <button className={styles.subscribeBtn} onClick={() => setShowSubscribe(true)}>📝 سجّل اشتراكك</button>
          </div>

          <Breadcrumb />

          {(selectedStage || selectedSubject || selectedTeacher) && (
            <button className={styles.backBtn} onClick={goBack}>→ رجوع</button>
          )}

          {/* STEP 1: Select Stage */}
          {!selectedStage && (
            <div className={styles.cardsGrid}>
              {stagesData.map(s => (
                <div key={s.id} className={styles.stageCard} style={{ borderTop: `5px solid ${s.color}` }} onClick={() => setSelectedStage(s.id)}>
                  <div className={styles.stageIcon}>{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.subjects.length} مادة متاحة</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Select Subject */}
          {selectedStage && !selectedSubject && (
            <div className={styles.cardsGrid}>
              {stage.subjects.map(sub => (
                <div key={sub.id} className={styles.subjectCard} onClick={() => setSelectedSubject(sub.id)}>
                  <div className={styles.subjectIcon}>{sub.icon}</div>
                  <h3>{sub.name}</h3>
                  <p>{sub.teachers.length} أستاذ</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Select Teacher */}
          {selectedSubject && !selectedTeacher && (
            <div className={styles.cardsGrid}>
              {subject.teachers.length === 0 ? (
                <div className={styles.emptyState}><p>🚧 لا يوجد أساتذة حالياً لهذه المادة</p></div>
              ) : subject.teachers.map(t => (
                <div key={t.id} className={styles.teacherCard} onClick={() => setSelectedTeacher(t.id)}>
                  <div className={styles.tAvatar}>👨‍🏫</div>
                  <h3>{t.name}</h3>
                  <div className={styles.tMeta}>
                    <span>⭐ {t.rating}</span>
                    <span>👨‍🎓 {t.students} طالب</span>
                    <span>🎬 {t.videos.length} درس</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Videos */}
          {selectedTeacher && teacher && (
            <div className={styles.videosList}>
              <div className={styles.teacherBanner}>
                <div className={styles.tAvatarLg}>👨‍🏫</div>
                <div>
                  <h2>{teacher.name}</h2>
                  <p>{subject.name} - {stage.name}</p>
                </div>
              </div>
              {teacher.videos.map(v => (
                <div key={v.id} className={`${styles.videoItem} ${v.locked ? styles.videoLocked : ''}`}>
                  <div className={styles.videoPlay}>{v.locked ? '🔒' : '▶️'}</div>
                  <div className={styles.videoInfo}>
                    <h4>{v.title}</h4>
                    <span>{v.duration}</span>
                  </div>
                  {v.locked && <span className={styles.lockBadge}>يحتاج اشتراك</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subscribe Modal */}
        {showSubscribe && (
          <div className={styles.modalOverlay} onClick={() => setShowSubscribe(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}><h3>📝 تسجيل اشتراك</h3><button onClick={() => setShowSubscribe(false)}>✕</button></div>
              <form className={styles.modalBody} onSubmit={handleSubscribe}>
                <label className={styles.formLabel}>الاسم الكامل<input className={styles.formInput} value={subName} onChange={e => setSubName(e.target.value)} placeholder="أدخل اسمك" required /></label>
                <label className={styles.formLabel}>رقم الموبايل<input className={styles.formInput} value={subPhone} onChange={e => setSubPhone(e.target.value)} placeholder="09XXXXXXXX" required /></label>
                <label className={styles.formLabel}>المرحلة التعليمية
                  <select className={styles.formInput} value={subStage} onChange={e => setSubStage(e.target.value)} required>
                    <option value="">اختر المرحلة</option>
                    {stagesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </label>
                <button type="submit" className={styles.whatsappBtn}>📲 إرسال عبر واتساب</button>
                <p className={styles.hint}>سيتم إرسال بياناتك لرقم المنصة على واتساب</p>
              </form>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

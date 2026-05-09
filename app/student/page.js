'use client';
import { useState } from 'react';
import styles from './student.module.css';

const studentData = {
  name: 'سارة أحمد',
  stage: 'بكالوريا علمي',
  subscriptions: [
    {
      id: 1, teacher: { name: 'أ. خالد سليمان', subject: 'رياضيات', whatsapp: '0912345678', avatar: 'خ' },
      package: { name: 'باقة المشتقات والتكامل', price: '50,000 ل.س' },
      videos: [
        { id:1,title:'الدرس 1: المشتقات',duration:'25:30',watched:true,quiz:{question:'ما هي مشتقة f(x)=x²؟',options:['2x','x²','2','x'],teacherAnswer:'2x',teacherExplanation:'نطبق قاعدة الأس:\nf\'(x) = 2x^(2-1) = 2x'} },
        { id:2,title:'الدرس 2: التكامل',duration:'30:15',watched:false,quiz:{question:'ما تكامل 2x؟',options:['x²+C','2x²+C','x+C','2+C'],teacherAnswer:'x²+C',teacherExplanation:'∫2x dx = 2×(x²/2)+C = x²+C'} },
        { id:3,title:'الدرس 3: النهايات',duration:'22:45',watched:false,quiz:null },
      ],
    },
    {
      id: 2, teacher: { name: 'أ. أحمد محمد', subject: 'فيزياء', whatsapp: '0933456789', avatar: 'أ' },
      package: { name: 'باقة الحركة والقوة', price: '45,000 ل.س' },
      videos: [
        { id:4,title:'الدرس 1: الحركة',duration:'18:20',watched:true,quiz:{question:'ما وحدة السرعة؟',options:['م/ث','كغ','نيوتن','جول'],teacherAnswer:'م/ث',teacherExplanation:'السرعة = المسافة ÷ الزمن\nوحدتها: متر/ثانية (م/ث)'} },
        { id:5,title:'الدرس 2: القوة',duration:'24:50',watched:false,quiz:null },
      ],
    },
  ],
  standaloneQuizzes: [
    { id:1,title:'اختبار شامل - المشتقات',isFree:true,question:'ما مشتقة 3x³؟',options:['9x²','3x²','x³','9x'],teacherAnswer:'9x²',teacherExplanation:'3×3=9, x^(3-1)=x²\nالنتيجة: 9x²' },
  ]
};

export default function StudentDashboard() {
  const [tab, setTab] = useState('lessons');
  const [activeSub, setActiveSub] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTeacherAnswer, setShowTeacherAnswer] = useState(false);

  const { name, stage, subscriptions, standaloneQuizzes } = studentData;
  const currentSub = subscriptions[activeSub];
  const allVideos = subscriptions.flatMap(s=>s.videos);
  const totalProgress = Math.round((allVideos.filter(v=>v.watched).length / allVideos.length) * 100);

  function openQuiz(quiz) {
    setSelectedAnswer(null);
    setShowTeacherAnswer(false);
    setShowQuiz(quiz);
  }

  const navTabs = [{id:'lessons',l:'دروسي',i:'🎬'},{id:'quizzes',l:'الاختبارات',i:'📝'},{id:'teachers',l:'أساتذتي',i:'👨‍🏫'},{id:'browse',l:'تصفح المنصة',i:'🌐'}];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}><span>🎓</span><span className={styles.logoText}>EduSy</span></div>
        <div className={styles.studentInfo}>
          <div className={styles.studentAvatar}>{name[0]}</div>
          <div><div className={styles.studentName}>{name}</div><div className={styles.studentStage}>{stage}</div></div>
        </div>
        <nav className={styles.sidebarNav}>
          {navTabs.map(t => t.id === 'browse'
            ? <a key={t.id} href="/browse" className={styles.navItem}><span>{t.i}</span><span>{t.l}</span></a>
            : <button key={t.id} className={`${styles.navItem} ${tab===t.id?styles.navItemActive:''}`} onClick={()=>{setTab(t.id);setPlayingVideo(null)}}><span>{t.i}</span><span>{t.l}</span></button>
          )}
        </nav>
        <div className={styles.progressBox}>
          <div className={styles.progressLabel}>تقدمك الكلي</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width:`${totalProgress}%`}}></div></div>
          <div className={styles.progressText}>{allVideos.filter(v=>v.watched).length}/{allVideos.length} دروس</div>
        </div>
        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.backLink}>→ الصفحة الرئيسية</a>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <h1>{playingVideo ? allVideos.find(v=>v.id===playingVideo)?.title : navTabs.find(t=>t.id===tab)?.l}</h1>
          <div className={styles.topActions}>
            {playingVideo && <button className={styles.backBtn} onClick={()=>setPlayingVideo(null)}>→ رجوع</button>}
            <a href="/login" className={styles.logoutBtn}>تسجيل خروج</a>
          </div>
        </header>

        <div className={styles.content}>

          {/* === LESSONS === */}
          {tab==='lessons' && !playingVideo && (
            <div>
              {/* Package Tabs */}
              {subscriptions.length > 1 && (
                <div className={styles.subTabs}>
                  {subscriptions.map((sub, i) => (
                    <button key={sub.id} className={`${styles.subTab} ${activeSub===i?styles.subTabActive:''}`} onClick={()=>setActiveSub(i)}>
                      {sub.teacher.subject} - {sub.teacher.name}
                    </button>
                  ))}
                </div>
              )}

              <div className={styles.packageBanner}>
                <div><h3>📦 {currentSub.package.name}</h3><p>{currentSub.teacher.name} • {currentSub.teacher.subject} • {currentSub.package.price}</p></div>
              </div>

              <div className={styles.videoList}>
                {currentSub.videos.map((v,i) => (
                  <div key={v.id} className={`${styles.videoCard} ${v.watched?styles.videoWatched:''}`} onClick={()=>setPlayingVideo(v.id)}>
                    <div className={styles.videoNum}>{v.watched ? '✅' : i+1}</div>
                    <div className={styles.videoInfo}><h4>{v.title}</h4><span>{v.duration} {v.quiz?'• 📝 فيه اختبار':''}</span></div>
                    <div className={styles.playIcon}>▶</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === VIDEO PLAYER === */}
          {tab==='lessons' && playingVideo && (() => {
            const sub = subscriptions.find(s=>s.videos.some(v=>v.id===playingVideo));
            const video = sub?.videos.find(v=>v.id===playingVideo);
            return (
              <div>
                <div className={styles.playerWrapper}>
                  <div className={styles.fakePlayer}><div className={styles.playerOverlay}><div className={styles.bigPlay}>▶</div><p>مشغل الفيديو (Demo)</p></div></div>
                  <div className={styles.playerInfo}><h3>{video?.title}</h3><p>{sub?.teacher.name} • {sub?.teacher.subject}</p></div>
                </div>
                {video?.quiz && (
                  <div className={styles.quizSection}><h3>📝 اختبار بعد الدرس</h3><button className={styles.startQuizBtn} onClick={()=>openQuiz(video.quiz)}>ابدأ الاختبار</button></div>
                )}
              </div>
            );
          })()}

          {/* === QUIZZES === */}
          {tab==='quizzes' && (
            <div>
              {subscriptions.map(sub => (
                <div key={sub.id}>
                  <h2 className={styles.sectionTitle}>{sub.teacher.subject} - {sub.teacher.name}</h2>
                  <div className={styles.quizList}>
                    {sub.videos.filter(v=>v.quiz).map(v=>(
                      <div key={v.id} className={styles.quizCard} onClick={()=>openQuiz(v.quiz)}>
                        <div className={styles.quizIcon}>📝</div>
                        <div className={styles.quizInfo}><h4>اختبار: {v.title}</h4><span>بعد الدرس</span></div>
                        <div className={styles.quizArrow}>←</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {standaloneQuizzes.length>0 && <>
                <h2 className={styles.sectionTitle} style={{marginTop:32}}>📋 اختبارات مستقلة</h2>
                <div className={styles.quizList}>{standaloneQuizzes.map(q=>(
                  <div key={q.id} className={styles.quizCard} onClick={()=>openQuiz(q)}>
                    <div className={styles.quizIcon}>📋</div>
                    <div className={styles.quizInfo}><h4>{q.title}</h4><span>{q.isFree?'مجاني':'مدفوع'}</span></div>
                    <div className={styles.quizArrow}>←</div>
                  </div>
                ))}</div>
              </>}
            </div>
          )}

          {/* === TEACHERS === */}
          {tab==='teachers' && (
            <div>
              <h2 className={styles.sectionTitle}>أساتذتي ({subscriptions.length})</h2>
              <div className={styles.teachersGrid}>
                {subscriptions.map(sub => (
                  <div key={sub.id} className={styles.teacherProfileCard}>
                    <div className={styles.teacherAvatar}>{sub.teacher.avatar}</div>
                    <h3>{sub.teacher.name}</h3>
                    <p className={styles.teacherSubject}>{sub.teacher.subject}</p>
                    <p className={styles.teacherPkg}>📦 {sub.package.name}</p>
                    <p className={styles.teacherPrice}>{sub.package.price}</p>
                    <div className={styles.teacherMeta}>
                      <span>🎬 {sub.videos.length} درس</span>
                      <span>✅ {sub.videos.filter(v=>v.watched).length} مكتمل</span>
                    </div>
                    <a href={`https://wa.me/963${sub.teacher.whatsapp?.slice(1)}`} target="_blank" className={styles.whatsappContact}>
                      📲 تواصل عبر واتساب
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* === QUIZ MODAL === */}
      {showQuiz && (
        <div className={styles.modalOverlay} onClick={()=>setShowQuiz(null)}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <div className={styles.modalHeader}><h3>📝 الاختبار</h3><button onClick={()=>setShowQuiz(null)}>✕</button></div>
            <div className={styles.modalBody}>
              <div className={styles.questionBox}><h3>{showQuiz.question}</h3></div>
              <div className={styles.optionsList}>
                {showQuiz.options.map((opt,i)=>(
                  <button key={i}
                    className={`${styles.optionBtn} ${selectedAnswer===opt?styles.optionSelected:''} ${showTeacherAnswer&&opt===showQuiz.teacherAnswer?styles.optionCorrect:''} ${showTeacherAnswer&&selectedAnswer===opt&&opt!==showQuiz.teacherAnswer?styles.optionWrong:''}`}
                    onClick={()=>{if(!showTeacherAnswer)setSelectedAnswer(opt)}}
                    disabled={showTeacherAnswer}>
                    <span className={styles.optionLetter}>{['أ','ب','ج','د'][i]}</span>
                    <span>{opt}</span>
                    {showTeacherAnswer && opt===showQuiz.teacherAnswer && <span className={styles.checkMark}>✅</span>}
                    {showTeacherAnswer && selectedAnswer===opt && opt!==showQuiz.teacherAnswer && <span className={styles.checkMark}>❌</span>}
                  </button>
                ))}
              </div>
              {selectedAnswer && !showTeacherAnswer && (
                <button className={styles.compareBtn} onClick={()=>setShowTeacherAnswer(true)}>🔍 قارن إجابتك مع حل الأستاذ</button>
              )}
              {showTeacherAnswer && (
                <div className={styles.answerComparison}>
                  <div className={selectedAnswer===showQuiz.teacherAnswer?styles.resultCorrect:styles.resultWrong}>
                    {selectedAnswer===showQuiz.teacherAnswer ? '🎉 إجابتك صحيحة! أحسنت!' : '❌ إجابتك خاطئة'}
                  </div>
                  <div className={styles.teacherSolution}>
                    <h4>📖 حل الأستاذ وشرحه:</h4>
                    <div className={styles.correctAnswer}>الإجابة الصحيحة: <strong>{showQuiz.teacherAnswer}</strong></div>
                    <p className={styles.explanation}>{showQuiz.teacherExplanation || showQuiz.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

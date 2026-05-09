'use client';
import { useState, useEffect } from 'react';
import styles from './teacher.module.css';
import { supabase } from '@/lib/supabase';

export default function TeacherDashboard() {
  const [tab, setTab] = useState('overview');
  const [teacher, setTeacher] = useState(null);
  const [videos, setVideos] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');

  const navTabs = [
    {id:'overview', l:'نظرة عامة', i:'📊'},
    {id:'packages', l:'الباقات', i:'💰'},
    {id:'videos', l:'دروسي', i:'🎬'},
    {id:'settings', l:'إعداداتي', i:'⚙️'}
  ];

  useEffect(() => {
    // جلب بيانات المدرس من localStorage
    const savedUser = localStorage.getItem('edusy_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setTeacher(user);
      loadTeacherData(user.id);
    }
  }, []);

  async function loadTeacherData(teacherId) {
    setLoading(true);
    // جلب باقات المدرس
    const { data: pkgs } = await supabase.from('packages').select('*').eq('teacher_id', teacherId);
    setPackages(pkgs || []);
    
    // جلب فيديوهات المدرس (عبر الباقات أو بشكل مباشر)
    // ملاحظة: حالياً الفيديوهات مرتبطة بالباقات
    if (pkgs && pkgs.length > 0) {
      const pkgIds = pkgs.map(p => p.id);
      const { data: vids } = await supabase.from('videos').select('*').in('package_id', pkgIds);
      setVideos(vids || []);
    }
    
    setLoading(false);
  }

  async function savePackage() {
    if (!teacher) return;
    const pkgData = {
      name: pkgName,
      price: parseInt(pkgPrice),
      teacher_id: teacher.id
    };

    if (editId) {
      await supabase.from('packages').update(pkgData).eq('id', editId);
    } else {
      await supabase.from('packages').insert(pkgData);
    }
    
    setShowModal(null);
    loadTeacherData(teacher.id);
  }

  if (!teacher) return <div className={styles.layout}>جاري التحميل...</div>;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}><span>👨‍🏫</span><span className={styles.logoText}>لوحة المدرس</span></div>
        <nav className={styles.sidebarNav}>{navTabs.map(t=><button key={t.id} className={`${styles.navItem} ${tab===t.id?styles.navItemActive : ''}`} onClick={()=>setTab(t.id)}><span>{t.i}</span><span>{t.l}</span></button>)}</nav>
        <div className={styles.sidebarFooter}><a href="/" className={styles.backLink}>→ العودة للموقع</a></div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <h1>{navTabs.find(t=>t.id===tab)?.l}</h1>
          <div className={styles.userInfo}>
            <span>أهلاً، أ. {teacher?.full_name || 'المدرس'}</span>
            <div className={styles.avatar}>{teacher?.full_name?.[0] || '👨‍🏫'}</div>
          </div>
        </header>

        <div className={styles.content}>
          {tab === 'overview' && (
            <div className={styles.statsRow}>
              {[{i:'💰',v:packages.length,l:'باقة',c:'#8B5CF6'},{i:'🎬',v:videos.length,l:'درس',c:'#2563EB'}].map((s,i)=>
                <div key={i} className={styles.statBox} style={{borderRight:`4px solid ${s.c}`}}><span className={styles.statEmoji}>{s.i}</span><div><div className={styles.statNum}>{s.v}</div><div className={styles.statTxt}>{s.l}</div></div></div>
              )}
            </div>
          )}

          {tab === 'packages' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                <h2 className={styles.pageTitle} style={{margin:0}}>💰 باقاتي التعليمية</h2>
                <button className={styles.quizBtn} style={{padding:'10px 20px',background:'var(--primary-600)',color:'white'}} onClick={() => {setEditId(null); setPkgName(''); setPkgPrice(''); setShowModal('package');}}>+ إنشاء باقة</button>
              </div>
              {loading ? <p>جاري التحميل...</p> : (
                <div className={styles.videoList}>
                  {packages.map(pkg => (
                    <div key={pkg.id} className={styles.videoRow}>
                      <div className={styles.videoIcon}>💰</div>
                      <div className={styles.videoDetails}><h4>{pkg.name}</h4><span>السعر: {pkg.price} ل.س</span></div>
                      <button className={styles.quizBtn} onClick={() => {setEditId(pkg.id); setPkgName(pkg.name); setPkgPrice(pkg.price); setShowModal('package');}}>✏️ تعديل</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'videos' && (
            <div>
              <h2 className={styles.pageTitle}>دروسي المرفوعة</h2>
              <div className={styles.videoList}>
                {videos.length === 0 ? <p>لا يوجد فيديوهات مرفوعة بعد.</p> : videos.map(v => (
                  <div key={v.id} className={styles.videoRow}>
                    <div className={styles.videoIcon}>🎬</div>
                    <div className={styles.videoDetails}><h4>{v.title}</h4><span>باقة: {packages.find(p=>p.id===v.package_id)?.name}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {tab === 'settings' && (
            <div className={styles.settingsCard}>
              <h3>⚙️ إعدادات الحساب</h3>
              <p>الاسم: {teacher.full_name}</p>
              <p>الإيميل: {teacher.email}</p>
              <p>الموبايل: {teacher.phone}</p>
            </div>
          )}
        </div>
      </main>

      {showModal === 'package' && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}><h3>إدارة الباقة</h3><button onClick={() => setShowModal(null)}>✕</button></div>
            <div className={styles.modalBody}>
              <label className={styles.formLabel}>اسم الباقة<input className={styles.formInput} value={pkgName} onChange={e=>setPkgName(e.target.value)} placeholder="مثلاً: باقة الرياضيات"/></label>
              <label className={styles.formLabel}>سعر الباقة (ل.س)<input className={styles.formInput} value={pkgPrice} onChange={e=>setPkgPrice(e.target.value)} placeholder="مثلاً: 50000"/></label>
              <button className={styles.submitBtn} onClick={savePackage}>✅ حفظ الباقة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

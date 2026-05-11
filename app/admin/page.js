'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { getStudents, getTeachers, createUser, getAllPackages } from '@/lib/auth';

const initialCategories = [
  { id:1,name:'بكالوريا علمي',subjects:[{id:1,name:'رياضيات',teachers:[]},{id:2,name:'فيزياء',teachers:[]},{id:3,name:'كيمياء',teachers:[]}]},
  { id:2,name:'بكالوريا أدبي',subjects:[{id:4,name:'عربي',teachers:[]},{id:5,name:'تاريخ',teachers:[]}]},
  { id:3,name:'تاسع',subjects:[{id:6,name:'رياضيات',teachers:[]},{id:7,name:'علوم',teachers:[]}]},
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [expandCat, setExpandCat] = useState(null);
  const [expandSub, setExpandSub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Form
  const [fn, setFn] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [fPackage, setFPackage] = useState('');
  const [fTeacherId, setFTeacherId] = useState('');
  const [fSpecialty, setFSpecialty] = useState('');
  const [fWhatsapp, setFWhatsapp] = useState('');
  const [catId, setCatId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [lastGen, setLastGen] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const tabs = [
    {id:'dashboard', l:'لوحة التحكم', i:'📊'},
    {id:'students', l:'الطلاب', i:'👨‍🎓'},
    {id:'teachers', l:'المدرسين', i:'👨‍🏫'},
    {id:'categories', l:'المراحل والمواد', i:'📚'},
    {id:'videos', l:'الفيديوهات', i:'🎬'}
  ];

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        const [studentsData, teachersData, packagesData] = await Promise.all([
          getStudents(),
          getTeachers(),
          getAllPackages()
        ]);
        setStudents(studentsData || []);
        setTeachers(teachersData || []);
        setPackages(packagesData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  function openModal(type, cid, sid) {
    setFn(''); setFPhone(''); setFPackage(''); setFTeacherId(''); setFSpecialty(''); setFWhatsapp('');
    setCatId(cid || null); setSubId(sid || null);
    setLastGen(null); setErrorMsg(''); setModal(type);
  }

  async function addStudent() {
    if (!fn || !fPhone) return;
    setLoading(true);
    const result = await createUser({ fullName: fn, phone: fPhone, role: 'student', packageId: fPackage || null });
    if (result.error) { setErrorMsg(result.error); setLoading(false); return; }
    setStudents([result.user, ...students]);
    setLastGen({ email: result.email, password: result.password, name: fn });
    setLoading(false);
  }

  async function addTeacher() {
    if (!fn) return;
    setLoading(true);
    const result = await createUser({ fullName: fn, phone: fPhone, role: 'teacher', whatsapp: fWhatsapp, specialty: fSpecialty });
    if (result.error) { setErrorMsg(result.error); setLoading(false); return; }
    setTeachers([result.user, ...teachers]);
    setLastGen({ email: result.email, password: result.password, name: fn });
    setLoading(false);
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}><span className={styles.logoIcon}>🎓</span><span className={styles.logoText}>EduSy Admin</span></div>
        <nav className={styles.sidebarNav}>{tabs.map(t => (
          <button key={t.id} className={`${styles.navItem} ${tab === t.id ? styles.navItemActive : ''}`} onClick={() => setTab(t.id)}>
            <span className={styles.navIcon}>{t.i}</span><span className={styles.navLabel}>{t.l}</span>
          </button>
        ))}</nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}><h1>{tabs.find(t => t.id === tab)?.l}</h1></header>
        <div className={styles.contentArea}>
          {loadingData ? <div className={styles.loadingState}>⏳ جاري التحميل...</div> : (
            <>
              {tab === 'dashboard' && (
                <div className={styles.statsGrid}>
                  {[{l:'الطلاب',v:students.length,i:'👨‍🎓',c:'#2563EB'},{l:'المدرسين',v:teachers.length,i:'👨‍🏫',c:'#10B981'},{l:'المراحل',v:categories.length,i:'📚',c:'#F97316'}].map((s, idx) => (
                    <div key={idx} className={styles.statCard} style={{borderTop:`4px solid ${s.c}`}}><div className={styles.statIconD}>{s.i}</div><div className={styles.statValue}>{s.v}</div><div className={styles.statLabel}>{s.l}</div></div>
                  ))}
                </div>
              )}

              {tab === 'students' && (
                <div className={styles.tableWrap}><table className={styles.table}>
                  <thead><tr><th>الاسم</th><th>الإيميل</th><th>كلمة السر</th><th>الموبايل</th></tr></thead>
                  <tbody>{students.map(s => <tr key={s.id}><td><strong>{s.full_name}</strong></td><td>{s.email}</td><td className={styles.passCell}>{s.plain_password}</td><td>{s.phone}</td></tr>)}</tbody>
                </table></div>
              )}

              {tab === 'teachers' && (
                <div className={styles.tableWrap}><table className={styles.table}>
                  <thead><tr><th>الاسم</th><th>الإيميل</th><th>كلمة السر</th><th>الموبايل</th></tr></thead>
                  <tbody>{teachers.map(t => <tr key={t.id}><td><strong>{t.full_name}</strong></td><td>{t.email}</td><td className={styles.passCell}>{t.plain_password}</td><td>{t.phone}</td></tr>)}</tbody>
                </table></div>
              )}

              {tab === 'categories' && (
                <div className={styles.categoriesList}>{categories.map(cat => (
                  <div key={cat.id} className={styles.categoryCard}>
                    <div className={styles.categoryHeader} onClick={() => setExpandCat(expandCat === cat.id ? null : cat.id)}>
                      <span className={styles.categoryName}>🎓 {cat.name}</span>
                      <button className={styles.addSmall} onClick={(e) => {e.stopPropagation(); openModal('subject', cat.id)}}>+ مادة</button>
                    </div>
                    {expandCat === cat.id && (
                      <div className={styles.subjectsList}>{cat.subjects.map(sub => <div key={sub.id} className={styles.subjectItem}>📖 {sub.name}</div>)}</div>
                    )}
                  </div>
                ))}</div>
              )}

              {tab === 'videos' && (
                <div className={styles.uploadZone}><h3>🎬 إدارة الفيديوهات</h3><p>ارفع فيديوهاتك هنا واربطها بالباقات</p><button className={styles.addBtn}>+ رفع فيديو</button></div>
              )}
            </>
          )}
        </div>
      </main>

      {modal && <div className={styles.modalOverlay} onClick={() => setModal(null)}><div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}><h3>إضافة بيانات</h3></div>
        <div className={styles.modalBody}>
          {lastGen && <div className={styles.generatedBox}><h4>✅ تم التوليد!</h4><p>الإيميل: <code>{lastGen.email}</code></p><p>السر: <code>{lastGen.password}</code></p></div>}
          {!lastGen && <>
            {modal === 'student' && <>
              <input className={styles.formInput} value={fn} onChange={e => setFn(e.target.value)} placeholder="الاسم الكامل" />
              <input className={styles.formInput} value={fPhone} onChange={e => setFPhone(e.target.value)} placeholder="الموبايل" />
              <select className={styles.formInput} value={fPackage} onChange={e => setFPackage(e.target.value)}>
                <option value="">اختر باقة</option>
                {packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button className={styles.submitBtn} onClick={addStudent} disabled={loading}>تأكيد الإضافة</button>
            </>}
          </>}
        </div>
      </div></div>}
    </div>
  );
}

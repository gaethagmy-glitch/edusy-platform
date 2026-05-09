'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { 
  getStudents, getTeachers, createUser, getAllPackages, addVideo, 
  getCategories, addCategory, getSubjects, addSubject 
} from '@/lib/auth';

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Form states
  const [modal, setModal] = useState(null);
  const [fn, setFn] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [fPackage, setFPackage] = useState('');
  const [vTitle, setVTitle] = useState('');
  const [vUrl, setVUrl] = useState('');
  const [catId, setCatId] = useState('');
  const [lastGen, setLastGen] = useState(null);
  const [expandCat, setExpandCat] = useState(null);

  const tabs = [
    {id:'dashboard', l:'لوحة التحكم', i:'📊'},
    {id:'students', l:'الطلاب', i:'👨‍🎓'},
    {id:'teachers', l:'المدرسين', i:'👨‍🏫'},
    {id:'categories', l:'المراحل والمواد', i:'📚'},
    {id:'videos', l:'الفيديوهات', i:'🎬'}
  ];

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoadingData(true);
    const [st, tc, pk, ct, sb] = await Promise.all([
      getStudents(), getTeachers(), getAllPackages(), getCategories(), getSubjects()
    ]);
    setStudents(st || []);
    setTeachers(tc || []);
    setPackages(pk || []);
    setCategories(ct || []);
    setSubjects(sb || []);
    setLoadingData(false);
  }

  async function handleAddCategory() {
    if (!fn) return;
    setLoading(true);
    const { data } = await addCategory(fn);
    if (data) { setCategories([...categories, data]); setModal(null); setFn(''); }
    setLoading(false);
  }

  async function handleAddSubject() {
    if (!fn || !catId) return;
    setLoading(true);
    const { data } = await addSubject(fn, catId);
    if (data) { setSubjects([...subjects, data]); setModal(null); setFn(''); }
    setLoading(false);
  }

  return (
    <div className={styles.adminLayout}>
      {/* SIDEBAR - restored professional design */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoIcon}>🎓</span>
          <span className={styles.logoText}>EduSy Admin</span>
        </div>
        <nav className={styles.sidebarNav}>
          {tabs.map(t => (
            <button 
              key={t.id} 
              className={`${styles.navItem} ${tab === t.id ? styles.navItemActive : ''}`} 
              onClick={() => setTab(t.id)}
            >
              <span className={styles.navIcon}>{t.i}</span>
              <span className={styles.navLabel}>{t.l}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.backLink}>→ العودة للموقع</a>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <h1 className={styles.topTitle}>{tabs.find(t => t.id === tab)?.l}</h1>
          <div className={styles.adminInfo}>
            <span>مرحباً، الأدمن</span>
            <div className={styles.adminAvatar}>👤</div>
          </div>
        </header>
        
        <div className={styles.contentArea}>
          {loadingData ? <div className={styles.loadingState}>⏳ جاري تحميل البيانات الفخمة...</div> : (
            <>
              {tab === 'dashboard' && (
                <div className={styles.statsGrid}>
                  {[{l:'الطلاب',v:students.length,i:'👨‍🎓',c:'#2563EB'},{l:'المدرسين',v:teachers.length,i:'👨‍🏫',c:'#10B981'},{l:'الباقات',v:packages.length,i:'💰',c:'#F97316'},{l:'المواد',v:subjects.length,i:'📖',c:'#8B5CF6'}].map((s, idx) => (
                    <div key={idx} className={styles.statCard} style={{borderTop:`4px solid ${s.c}`}}>
                      <div className={styles.statIconD}>{s.i}</div>
                      <div className={styles.statValue}>{s.v}</div>
                      <div className={styles.statLabel}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'categories' && (
                <div>
                  <div className={styles.pageHeader}>
                    <h2 className={styles.pageTitle}>إدارة الهيكل التعليمي</h2>
                    <button className={styles.addBtn} onClick={() => setModal('category')}>+ إضافة مرحلة</button>
                  </div>
                  <div className={styles.categoriesList}>
                    {categories.map(cat => (
                      <div key={cat.id} className={styles.categoryCard}>
                        <div className={styles.categoryHeader} onClick={() => setExpandCat(expandCat === cat.id ? null : cat.id)}>
                          <span className={styles.expandIcon}>{expandCat === cat.id ? '▼' : '◀'}</span>
                          <span className={styles.categoryName}>🎓 {cat.name}</span>
                          <button className={styles.addSmall} onClick={(e) => {e.stopPropagation(); setCatId(cat.id); setModal('subject')}}>+ مادة</button>
                        </div>
                        {expandCat === cat.id && (
                          <div className={styles.subjectsList}>
                            {subjects.filter(s => s.category_id === cat.id).map(sub => (
                              <div key={sub.id} className={styles.subjectItem}>
                                <span>📖 {sub.name}</span>
                                <div className={styles.subActions}>
                                  <button className={styles.deleteSmall}>✕</button>
                                </div>
                              </div>
                            ))}
                            {subjects.filter(s => s.category_id === cat.id).length === 0 && <p className={styles.emptyNote}>لا يوجد مواد بعد</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'students' && (
                <div>
                  <div className={styles.pageHeader}><h2 className={styles.pageTitle}>قائمة الطلاب</h2></div>
                  <div className={styles.tableWrap}><table className={styles.table}>
                    <thead><tr><th>الاسم</th><th>الإيميل</th><th>كلمة السر</th><th>الموبايل</th></tr></thead>
                    <tbody>{students.map(s => <tr key={s.id}>
                      <td><strong>{s.full_name}</strong></td><td className={styles.emailCell}>{s.email}</td><td className={styles.passCell}>{s.plain_password}</td><td>{s.phone}</td>
                    </tr>)}</tbody>
                  </table></div>
                </div>
              )}

              {tab === 'teachers' && (
                <div>
                  <div className={styles.pageHeader}><h2 className={styles.pageTitle}>قائمة المدرسين</h2></div>
                  <div className={styles.tableWrap}><table className={styles.table}>
                    <thead><tr><th>الاسم</th><th>الإيميل</th><th>كلمة السر</th><th>واتساب</th></tr></thead>
                    <tbody>{teachers.map(t => <tr key={t.id}>
                      <td><strong>{t.full_name}</strong></td><td className={styles.emailCell}>{t.email}</td><td className={styles.passCell}>{t.plain_password}</td><td>{t.whatsapp}</td>
                    </tr>)}</tbody>
                  </table></div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODAL - Restored design */}
      {modal && (
        <div className={styles.modalOverlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{modal === 'category' ? 'إضافة مرحلة جديدة' : 'إضافة مادة جديدة'}</h3>
              <button className={styles.modalClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.formLabel}>
                الاسم
                <input className={styles.formInput} value={fn} onChange={e => setFn(e.target.value)} placeholder="مثلاً: بكالوريا علمي" />
              </label>
              <button className={styles.submitBtn} onClick={modal === 'category' ? handleAddCategory : handleAddSubject} disabled={loading}>
                {loading ? '⏳ جاري الحفظ...' : '✅ تأكيد الإضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

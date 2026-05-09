// --- المراحل والمواد ---
export async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('created_at')
  return data || []
}
export async function addCategory(name) {
  return await supabase.from('categories').insert({ name }).select().single()
}
export async function getSubjects() {
  const { data } = await supabase.from('subjects').select('*, categories(name)')
  return data || []
}
export async function addSubject(name, categoryId) {
  return await supabase.from('subjects').insert({ name, category_id: categoryId }).select().single()
}

// تحويل الأحرف العربية لإنكليزية تقريبية للإيميل
function transliterate(text) {
  const map = {
    'أ': 'a', 'إ': 'i', 'آ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'th', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 't', 'ؤ': 'o', 'ئ': 'i'
  };
  return text.split('').map(char => map[char] || char).join('').replace(/[^a-z0-9]/gi, '');
}

// توليد إيميل تلقائي بالإنكليزي
export function generateEmail(fullName, role) {
  const cleanName = transliterate(fullName.trim().toLowerCase());
  const namePart = cleanName.substring(0, 8) || 'user';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const roleTag = role === 'teacher' ? '.t' : '';
  return `${namePart}${roleTag}.${randomNum}@edusy.com`;
}

// توليد كلمة سر عشوائية
export function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let password = 'Edu@'
  for (let i = 0; i < 4; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// جلب قائمة الطلاب
export async function getStudents() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'student')
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

// جلب قائمة المدرسين
export async function getTeachers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'teacher')
    .order('created_at', { ascending: false })
  if (error) return []
  return data
}

// جلب كل الباقات المتاحة
export async function getAllPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*, users(full_name)')
  if (error) return []
  return data
}

// إنشاء مستخدم جديد مع إمكانية إضافة اشتراك فوري
export async function createUser({ fullName, phone, role, whatsapp, packageId }) {
  const email = generateEmail(fullName, role)
  const password = generatePassword()

  // 1. إضافة المستخدم لجدول users
  const { data: userData, error: userError } = await supabase.from('users').insert({
    email,
    full_name: fullName,
    role,
    phone: phone || null,
    whatsapp: whatsapp || null,
    plain_password: password, // حفظ كلمة السر هنا للعرض
    is_active: true,
  }).select().single()

  if (userError) return { error: userError.message }

  // 2. إذا كان طالب ومعه packageId، نضيف له اشتراك فوراً
  if (role === 'student' && packageId) {
    const { error: subError } = await supabase.from('subscriptions').insert({
      student_id: userData.id,
      package_id: packageId,
      status: 'active',
      expires_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0] // اشتراك سنة تلقائياً
    })
    if (subError) console.error("Error creating subscription:", subError)
  }

  return { success: true, email, password, user: userData }
}

// إضافة فيديو جديد لباقة
export async function addVideo({ title, url, packageId }) {
  const { data, error } = await supabase.from('videos').insert({
    title,
    video_url: url,
    package_id: packageId
  }).select().single()

  if (error) return { error: error.message }
  return { success: true, video: data }
}

// تسجيل الدخول
export async function loginUser(email, password) {
  // أدمن ثابت
  if (email === 'admin@edusy.com' && password === 'admin123') {
    return { success: true, role: 'admin', name: 'الأدمن' }
  }

  // بحث عن المستخدم بالإيميل
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single()

  if (error || !data) return { error: 'الإيميل أو كلمة السر غلط' }

  return { success: true, role: data.role, name: data.full_name, user: data }
}

// جلب باقات مدرس معين
export async function getTeacherPackages(teacherId) {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('teacher_id', teacherId)
  if (error) return []
  return data
}

// جلب اشتراكات طالب
export async function getStudentSubscriptions(studentId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      packages (
        *,
        users (full_name, whatsapp)
      )
    `)
    .eq('student_id', studentId)
    .eq('status', 'active')
  if (error) return []
  return data
}

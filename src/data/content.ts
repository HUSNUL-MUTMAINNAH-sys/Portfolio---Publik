// Semua konten website — 100% statis, tidak ada backend/API/admin.
// Untuk mengubah isi portofolio, cukup edit nilai-nilai di file ini.

import type {
  Profile,
  Skill,
  Project,
  Experience,
  Achievement,
  TechStack,
  Contact,
} from '../services/api'

const profileBase: Profile = {
  name: 'Husnul Mutmainnah',
  role: 'Information Systems Student, Web Developer, UI/UX Enthusiast',
  tagline:
    'Saya membangun produk digital yang rapi secara sistem dan enak dipakai — dari rancangan database sampai interaksi terakhir yang pengguna sentuh.',
  shortBio:
    'Mahasiswa Sistem Informasi yang fokus pada pengembangan web dan pengalaman pengguna.',
  aboutBio:
    'Mahasiswa Sistem Informasi yang senang menerjemahkan masalah nyata menjadi aplikasi web yang terstruktur. Fokus saya ada di titik temu antara logika backend yang kuat dan pengalaman pengguna yang terasa ringan.',
  university: 'Universitas Contoh Indonesia',
  semester: 'Semester 7',
  interest: 'Pengembangan Web & Desain Antarmuka',
  projectsCount: 6,
  yearsLearning: 3,
  techCount: 12,
  photoUrl: '',
}

export const skillsContent: Skill[] = [
  { id: 'sk-html', name: 'HTML', category: 'FRONTEND', level: 92, order: 1 },
  { id: 'sk-css', name: 'CSS', category: 'FRONTEND', level: 88, order: 2 },
  { id: 'sk-js', name: 'JavaScript', category: 'FRONTEND', level: 85, order: 3 },
  { id: 'sk-ts', name: 'TypeScript', category: 'FRONTEND', level: 78, order: 4 },
  { id: 'sk-react', name: 'React', category: 'FRONTEND', level: 82, order: 5 },
  { id: 'sk-tw', name: 'Tailwind CSS', category: 'FRONTEND', level: 86, order: 6 },
  { id: 'sk-node', name: 'Node.js', category: 'BACKEND', level: 75, order: 7 },
  { id: 'sk-rest', name: 'REST API', category: 'BACKEND', level: 78, order: 8 },
  { id: 'sk-jwt', name: 'JWT', category: 'BACKEND', level: 70, order: 9 },
  { id: 'sk-mysql', name: 'MySQL', category: 'DATABASE', level: 74, order: 10 },
  { id: 'sk-postgres', name: 'PostgreSQL', category: 'DATABASE', level: 66, order: 11 },
  { id: 'sk-git', name: 'Git', category: 'TOOLS', level: 84, order: 12 },
  { id: 'sk-github', name: 'GitHub', category: 'TOOLS', level: 84, order: 13 },
  { id: 'sk-figma', name: 'Figma', category: 'TOOLS', level: 80, order: 14 },
  { id: 'sk-vscode', name: 'VS Code', category: 'TOOLS', level: 90, order: 15 },
  { id: 'sk-postman', name: 'Postman', category: 'TOOLS', level: 76, order: 16 },
]

export const techStackContent: TechStack[] = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS',
  'Node.js', 'Express', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'Figma',
  'VS Code', 'Postman',
].map((name, i) => ({
  id: `ts-${i + 1}`,
  name,
  category: 'TECH',
  order: i + 1,
}))

const projectsBase: Project[] = [
  {
    id: 'pr-1',
    title: 'LaundryKu',
    slug: 'laundryku',
    description:
      'Sistem manajemen laundry berbasis web untuk mencatat pesanan, status cucian, dan pembayaran pelanggan secara real-time.',
    technologies: 'React, Node.js, MySQL, Tailwind CSS',
    imageUrl: '/projects/laundryku.svg',
    category: 'Web',
    status: 'Selesai',
    year: 2025,
    featured: true,
    order: 1,
  },
  {
    id: 'pr-2',
    title: 'Todo App',
    slug: 'todo-app',
    description:
      'Aplikasi manajemen tugas dengan autentikasi JWT, drag-and-drop task board, dan sinkronisasi data antar perangkat.',
    technologies: 'React, TypeScript, Express, JWT',
    imageUrl: '/projects/todoapp.svg',
    category: 'Web',
    status: 'Selesai',
    year: 2025,
    featured: true,
    order: 2,
  },
  {
    id: 'pr-3',
    title: 'Portfolio CMS',
    slug: 'portfolio-cms',
    description:
      'Website portofolio dengan dashboard admin untuk mengelola profil, proyek, dan sertifikat tanpa menyentuh kode.',
    technologies: 'React, Express, JWT, PostgreSQL',
    imageUrl: '/projects/portfolio.svg',
    category: 'Web',
    status: 'Berjalan',
    year: 2026,
    featured: true,
    order: 3,
  },
  {
    id: 'pr-4',
    title: 'Analisis Kepuasan Pengguna Aplikasi Kampus',
    slug: 'analisis-kepuasan-pengguna-kampus',
    description:
      'Penelitian kuantitatif menggunakan metode UEQ untuk mengevaluasi pengalaman pengguna sistem akademik kampus.',
    technologies: 'SPSS, Google Forms, UEQ',
    imageUrl: '/projects/research.svg',
    category: 'Research',
    status: 'Selesai',
    year: 2024,
    featured: false,
    order: 4,
  },
  {
    id: 'pr-5',
    title: 'Redesign UI Aplikasi Perpustakaan',
    slug: 'redesign-ui-perpustakaan',
    description:
      'Perancangan ulang antarmuka aplikasi perpustakaan digital kampus dengan pendekatan design thinking dan usability testing.',
    technologies: 'Figma, Design Thinking',
    imageUrl: '/projects/library-ui.svg',
    category: 'UI/UX',
    status: 'Selesai',
    year: 2024,
    featured: false,
    order: 5,
  },
  {
    id: 'pr-6',
    title: 'Catatan Keuangan Mahasiswa',
    slug: 'catatan-keuangan-mahasiswa',
    description:
      'Aplikasi mobile pencatat pengeluaran harian mahasiswa dengan ringkasan visual dan target menabung mingguan.',
    technologies: 'React Native, Firebase',
    imageUrl: '/projects/finance-app.svg',
    category: 'Mobile',
    status: 'Selesai',
    year: 2023,
    featured: false,
    order: 6,
  },
]

// item.company dipakai komponen Experience sebagai label/ikon tipe pengalaman,
// dan item.location menampilkan tempat/institusi sebenarnya.
const experienceBase: Experience[] = [
  {
    id: 'ex-1',
    title: 'S1 Sistem Informasi',
    company: 'Pendidikan',
    location: 'Universitas Contoh Indonesia',
    startDate: '2022-08-01',
    description:
      'Fokus pada pengembangan perangkat lunak, basis data, dan interaksi manusia-komputer.',
    order: 1,
  },
  {
    id: 'ex-2',
    title: 'Frontend Developer Intern',
    company: 'Magang',
    location: 'PT Teknologi Contoh',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    description:
      'Membangun komponen UI reusable dengan React dan Tailwind untuk dashboard internal perusahaan.',
    order: 2,
  },
  {
    id: 'ex-3',
    title: 'Koordinator Divisi Teknologi',
    company: 'Organisasi',
    location: 'Himpunan Mahasiswa Sistem Informasi',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    description:
      'Mengelola tim pengembang untuk membangun dan memelihara situs resmi himpunan.',
    order: 3,
  },
  {
    id: 'ex-4',
    title: 'Bootcamp Full-Stack Web Development',
    company: 'Pelatihan',
    location: 'Dicoding Indonesia',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    description:
      'Pelatihan intensif pengembangan aplikasi web full-stack menggunakan JavaScript modern.',
    order: 4,
  },
]

// a.issuer dipakai komponen Achievements sebagai label/ikon tipe pencapaian;
// organisasi pemberi sebenarnya disebut di dalam deskripsi.
const achievementsBase: Achievement[] = [
  {
    id: 'ac-1',
    title: 'Beasiswa Prestasi Akademik',
    issuer: 'Beasiswa',
    description: 'Diberikan oleh Universitas Contoh Indonesia atas pencapaian akademik.',
    issueDate: '2024-01-01',
    order: 1,
  },
  {
    id: 'ac-2',
    title: 'Finalis Hackathon Nasional',
    issuer: 'Kompetisi',
    description: 'Kompetisi tingkat nasional yang diselenggarakan oleh Kemendikbudristek.',
    issueDate: '2025-01-01',
    order: 2,
  },
  {
    id: 'ac-3',
    title: 'Front-End Web Developer',
    issuer: 'Sertifikat',
    description: 'Sertifikasi kompetensi dari Dicoding Indonesia.',
    issueDate: '2024-01-01',
    order: 3,
  },
  {
    id: 'ac-4',
    title: 'UI/UX Design Fundamentals',
    issuer: 'Workshop',
    description: 'Workshop yang diselenggarakan oleh Google Developer Student Club.',
    issueDate: '2023-01-01',
    order: 4,
  },
  {
    id: 'ac-5',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'Sertifikat',
    description: 'Sertifikasi dari freeCodeCamp.',
    issueDate: '2023-01-01',
    order: 5,
  },
  {
    id: 'ac-6',
    title: 'Juara 2 Lomba UI/UX Design',
    issuer: 'Kompetisi',
    description: 'Kompetisi desain UI/UX tingkat kampus, Universitas Contoh Indonesia.',
    issueDate: '2024-01-01',
    order: 6,
  },
]

export const contactContent: Contact = {
  email: 'husnul.mutmainnah@example.com',
  github: 'https://github.com/husnulmutmainnah',
  linkedin: 'https://linkedin.com/in/husnulmutmainnah',
  instagram: 'https://instagram.com/husnulmutmainnah',
  whatsapp: 'https://wa.me/6281234567890',
}

// ---------- Terjemahan English untuk data contoh ----------
const merge = <T extends { id: string }>(base: T[], en: Record<string, Partial<T>>): T[] =>
  base.map((item) => ({ ...item, ...(en[item.id] || {}) }))

export const profileContent: Profile = {
  ...profileBase,
  roleEn: 'Information Systems Student, Web Developer, UI/UX Enthusiast',
  taglineEn:
    'I build digital products that are well-structured and a pleasure to use — from database design to the last interaction a user touches.',
  shortBioEn: 'Information Systems student focused on web development and user experience.',
  aboutBioEn:
    'An Information Systems student who enjoys turning real problems into well-structured web applications. My focus sits where solid backend logic meets a user experience that feels effortless.',
  universityEn: 'Contoh Indonesia University',
  semesterEn: 'Semester 7',
  interestEn: 'Web Development & Interface Design',
}

export const projectsContent: Project[] = merge(projectsBase, {
  'pr-1': { descriptionEn: 'A web-based laundry management system to record orders, laundry status, and customer payments in real time.' },
  'pr-2': { descriptionEn: 'A task management app with JWT authentication, a drag-and-drop task board, and data sync across devices.' },
  'pr-3': { descriptionEn: 'A portfolio website with an admin dashboard to manage profile, projects, and certificates without touching code.' },
  'pr-4': {
    titleEn: 'User Satisfaction Analysis of a Campus Application',
    descriptionEn: 'Quantitative research using the UEQ method to evaluate the user experience of the campus academic system.',
  },
  'pr-5': {
    titleEn: 'UI Redesign of a Library Application',
    descriptionEn: 'Redesigning the interface of the campus digital library app using design thinking and usability testing.',
  },
  'pr-6': {
    titleEn: 'Student Finance Tracker',
    descriptionEn: "A mobile app for tracking students' daily spending with visual summaries and weekly saving goals.",
  },
})

export const experienceContent: Experience[] = merge(experienceBase, {
  'ex-1': {
    titleEn: "Bachelor's in Information Systems",
    locationEn: 'Contoh Indonesia University',
    descriptionEn: 'Focused on software development, databases, and human-computer interaction.',
  },
  'ex-2': { descriptionEn: "Built reusable UI components with React and Tailwind for the company's internal dashboard." },
  'ex-3': {
    titleEn: 'Technology Division Coordinator',
    locationEn: 'Information Systems Student Association',
    descriptionEn: "Led a team of developers to build and maintain the association's official website.",
  },
  'ex-4': { descriptionEn: 'Intensive training in full-stack web application development using modern JavaScript.' },
})

export const achievementsContent: Achievement[] = merge(achievementsBase, {
  'ac-1': { titleEn: 'Academic Achievement Scholarship', descriptionEn: 'Awarded by Contoh Indonesia University for academic achievement.' },
  'ac-2': {
    titleEn: 'National Hackathon Finalist',
    descriptionEn: 'A national-level competition organized by the Ministry of Education, Culture, Research, and Technology.',
  },
  'ac-3': { descriptionEn: 'Competency certification from Dicoding Indonesia.' },
  'ac-4': { descriptionEn: 'A workshop organized by Google Developer Student Club.' },
  'ac-5': { descriptionEn: 'Certification from freeCodeCamp.' },
  'ac-6': {
    titleEn: 'UI/UX Design Competition, 2nd Place',
    descriptionEn: 'A campus-level UI/UX design competition at Contoh Indonesia University.',
  },
})

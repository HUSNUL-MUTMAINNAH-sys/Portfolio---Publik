import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  // terjemahkan nilai data seperti tipe/status ("Magang" -> "Internship"); jika tak ada, nilai asli dipakai
  tv: (value: string) => string;
  locale: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  id: {
    'nav.about': 'Tentang',
    'nav.skills': 'Skill',
    'nav.projects': 'Project',
    'nav.experience': 'Pengalaman',
    'nav.achievements': 'Pencapaian',
    'nav.contact': 'Kontak',
    'hero.greeting': 'Halo, Saya',
    'hero.viewProjects': 'Lihat Project',
    'hero.downloadCV': 'Download CV',
    'stats.projects': 'Project',
    'stats.years': 'Tahun Belajar',
    'stats.tech': 'Teknologi',
    'about.title': 'Tentang Saya',
    'about.subtitle': 'Mengenal saya lebih dekat',
    'about.university': 'Universitas',
    'about.semester': 'Semester',
    'about.interest': 'Bidang yang Diminati',
    'skills.title': 'Kemampuan',
    'skills.subtitle': 'Tools & teknologi yang saya kuasai',
    'projects.title': 'Karya Pilihan',
    'projects.subtitle': 'Project Unggulan',
    'projects.viewAll': 'Lihat semua project',
    'projects.liveDemo': 'Demo Langsung',
    'gallery.title': 'Semua Karya',
    'gallery.subtitle': 'Galeri Project',
    'gallery.all': 'Semua',
    'experience.title': 'Perjalanan',
    'experience.subtitle': 'Pengalaman',
    'exp.present': 'Sekarang',
    'achievements.title': 'Pencapaian',
    'achievements.subtitle': 'Penghargaan & Sertifikat',
    'techstack.title': 'Tech Stack',
    'techstack.subtitle': 'Teknologi yang saya gunakan',
    'contact.title': 'Hubungi Saya',
    'contact.subtitle': 'Mari berkolaborasi',
    'contact.description': 'Terbuka untuk proyek magang, kolaborasi, atau sekadar diskusi seputar teknologi.',
    'contact.name': 'Nama',
    'contact.email': 'Email',
    'contact.message': 'Pesan',
    'contact.namePlaceholder': 'Nama kamu',
    'contact.emailPlaceholder': 'email@contoh.com',
    'contact.messagePlaceholder': 'Ceritakan proyek atau ide kamu...',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.sent': 'Terkirim',
    'contact.error': 'Gagal mengirim. Coba lagi atau hubungi langsung lewat email.',
    'contact.chat': 'Chat langsung',
    'footer.allRights': 'Hak cipta dilindungi',
  },
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.achievements': 'Achievements',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hello, I am',
    'hero.viewProjects': 'View Projects',
    'hero.downloadCV': 'Download CV',
    'stats.projects': 'Projects',
    'stats.years': 'Years Learning',
    'stats.tech': 'Technologies',
    'about.title': 'About Me',
    'about.subtitle': 'Getting to know me better',
    'about.university': 'University',
    'about.semester': 'Semester',
    'about.interest': 'Interests',
    'skills.title': 'Skills',
    'skills.subtitle': 'Tools & technologies I master',
    'projects.title': 'Featured Work',
    'projects.subtitle': 'Featured Projects',
    'projects.viewAll': 'View all projects',
    'projects.liveDemo': 'Live Demo',
    'gallery.title': 'All Works',
    'gallery.subtitle': 'Project Gallery',
    'gallery.all': 'All',
    'experience.title': 'Journey',
    'experience.subtitle': 'Experience',
    'exp.present': 'Present',
    'achievements.title': 'Achievements',
    'achievements.subtitle': 'Awards & Certificates',
    'techstack.title': 'Tech Stack',
    'techstack.subtitle': 'Technologies I use',
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's collaborate",
    'contact.description': 'Open to internship projects, collaborations, or tech discussions.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'email@example.com',
    'contact.messagePlaceholder': 'Tell me about your project or idea...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Sent',
    'contact.error': 'Failed to send. Try again or contact me directly via email.',
    'contact.chat': 'Chat directly',
    'footer.allRights': 'All rights reserved',
    // nilai data (tipe pengalaman/pencapaian, status, kategori project)
    'val.Pendidikan': 'Education',
    'val.Magang': 'Internship',
    'val.Organisasi': 'Organization',
    'val.Pelatihan': 'Training',
    'val.Sertifikat': 'Certificate',
    'val.Beasiswa': 'Scholarship',
    'val.Kompetisi': 'Competition',
    'val.Selesai': 'Completed',
    'val.Berjalan': 'In Progress',
    'val.Rencana': 'Planned',
    'val.Research': 'Research',
  },
};

const readStored = (): Language => {
  try {
    return window.localStorage.getItem('lang') === 'en' ? 'en' : 'id';
  } catch {
    return 'id';
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStored);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('lang', language);
    } catch {
      /* penyimpanan diblokir — abaikan */
    }
  }, [language]);

  const t = (key: string): string => translations[language][key] ?? key;
  const tv = (value: string): string => translations[language][`val.${value}`] ?? value;
  const locale = language === 'id' ? 'id-ID' : 'en-US';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tv, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

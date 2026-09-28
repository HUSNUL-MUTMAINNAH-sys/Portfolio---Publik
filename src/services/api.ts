// Tipe data & helper konten — pure frontend, tanpa panggilan API/backend.
// Konten sebenarnya ada di src/data/content.ts.

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  aboutBio: string;
  university: string;
  semester: string;
  interest: string;
  projectsCount: number;
  yearsLearning: number;
  techCount: number;
  photoUrl: string;
  roleEn?: string;
  taglineEn?: string;
  shortBioEn?: string;
  aboutBioEn?: string;
  universityEn?: string;
  semesterEn?: string;
  interestEn?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  titleId?: string;
  titleEn?: string;
  slug: string;
  description: string;
  descriptionId?: string;
  descriptionEn?: string;
  technologies: string;
  imageUrl?: string;
  category: string;
  status: string;
  year: number;
  featured: boolean;
  order: number;
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  title: string;
  titleId?: string;
  titleEn?: string;
  company: string;
  location?: string;
  locationId?: string;
  locationEn?: string;
  startDate: string;
  endDate?: string;
  description: string;
  descriptionId?: string;
  descriptionEn?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleId?: string;
  titleEn?: string;
  description: string;
  descriptionId?: string;
  descriptionEn?: string;
  issuer: string;
  issueDate: string;
  imageUrl?: string;
  order: number;
}

export interface TechStack {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  order: number;
}

export interface Contact {
  email: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  cv?: string;
}

// Helper untuk mengambil konten sesuai bahasa aktif (id/en), dengan fallback
// ke field default jika versi berbahasa tersebut tidak diisi.
export function getLocalizedContent(obj: any, field: string, language: 'id' | 'en'): string {
  if (!obj) return '';
  if (language === 'id') {
    return obj[`${field}Id`] || obj[field] || '';
  } else {
    return obj[`${field}En`] || obj[field] || '';
  }
}

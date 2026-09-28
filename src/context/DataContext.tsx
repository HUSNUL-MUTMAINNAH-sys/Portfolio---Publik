import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Profile, Skill, Project, Experience, Achievement, TechStack, Contact } from '../services/api';
import {
  profileContent, skillsContent, projectsContent, experienceContent,
  achievementsContent, techStackContent, contactContent,
} from '../data/content';
import { supabase, supabaseReady, fromDb } from '../lib/supabase';

interface DataContextType {
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  techStack: TechStack[];
  contact: Contact | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const byOrder = <T extends { order: number }>(a: T[]) => [...a].sort((x, y) => x.order - y.order);
const byDateDesc = (a: Experience[]) =>
  [...a].sort((x, y) => new Date(y.startDate).getTime() - new Date(x.startDate).getTime());

// Data bawaan (content.ts) dipakai sebagai fallback: saat Supabase belum
// dikonfigurasi, database masih kosong, atau koneksi gagal.
const staticData: DataContextType = {
  profile: profileContent,
  skills: byOrder(skillsContent),
  projects: byOrder(projectsContent),
  experience: byDateDesc(experienceContent),
  achievements: byOrder(achievementsContent),
  techStack: byOrder(techStackContent),
  contact: contactContent,
  loading: false,
  error: null,
};

async function getTable(table: string): Promise<Record<string, any>[] | null> {
  try {
    const { data, error } = await supabase.from(table).select('*');
    if (error || !data) return null;
    return data.map(fromDb);
  } catch {
    return null;
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataContextType>(staticData);

  useEffect(() => {
    if (!supabaseReady) return;
    let cancelled = false;

    const fetchData = async () => {
      const [pf, sk, pr, ex, ac, ts, ct] = await Promise.all(
        ['profile', 'skills', 'projects', 'experience', 'achievements', 'tech_stack', 'contact'].map(getTable),
      );
      // database kosong / gagal -> tetap pakai data bawaan
      if (cancelled || [pf, sk, pr, ex, ac, ts, ct].every((r) => !r || r.length === 0)) return;
      setData((prev) => ({
        ...prev,
        profile: pf && pf[0] ? ({ ...pf[0], photoUrl: pf[0].photoUrl || prev.profile?.photoUrl || '' } as unknown as Profile) : prev.profile,
        skills: sk ? byOrder(sk as unknown as Skill[]) : prev.skills,
        projects: pr ? byOrder(pr as unknown as Project[]) : prev.projects,
        experience: ex ? byDateDesc(ex as unknown as Experience[]) : prev.experience,
        achievements: ac ? byOrder(ac as unknown as Achievement[]) : prev.achievements,
        techStack: ts ? byOrder(ts as unknown as TechStack[]) : prev.techStack,
        contact: ct && ct[0] ? (ct[0] as unknown as Contact) : prev.contact,
      }));
    };

    // Fetch data immediately
    fetchData();
    
    // Refresh data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => { 
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

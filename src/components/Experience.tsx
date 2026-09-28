import type { ElementType } from 'react'
import { GraduationCap, Users, Award, FileBadge, Briefcase } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import Reveal from './Reveal'

const icons: Record<string, ElementType> = {
  Pendidikan: GraduationCap,
  Organisasi: Users,
  Pelatihan: Award,
  Sertifikat: FileBadge,
  Magang: Briefcase,
}

export default function Experience() {
  const { experience, loading } = useData()
  const { language, t, tv, locale } = useLanguage()

  if (loading || !experience.length) return null

  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="eyebrow text-accent mb-3">{t('experience.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight max-w-lg">
            {t('experience.subtitle')}
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line dark:bg-white/10" />
          <div className="space-y-10">
            {experience.map((item, i) => {
              const Icon = icons[item.company] ?? Briefcase
              const title = getLocalizedContent(item, 'title', language);
              const description = getLocalizedContent(item, 'description', language);
              return (
                <Reveal key={item.id} delay={i * 0.08}>
                  <div className="relative pl-14">
                    <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-ink border-2 border-accent text-accent">
                      <Icon size={17} />
                    </div>
                    <div className="rounded-xl2 border border-line dark:border-white/10 p-5 hover:border-accent/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wide">{tv(item.company)}</span>
                        <span className="text-xs text-ink/45 dark:text-white/45">
                          {new Date(item.startDate).toLocaleDateString(locale, { month: 'short', year: 'numeric' })} -{' '}
                          {item.endDate ? new Date(item.endDate).toLocaleDateString(locale, { month: 'short', year: 'numeric' }) : t('exp.present')}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg">{title}</h3>
                      <p className="text-sm text-ink/50 dark:text-white/50 mb-2">{getLocalizedContent(item, 'location', language)}</p>
                      <p className="text-sm text-ink/65 dark:text-white/65 leading-relaxed">{description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

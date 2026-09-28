import type { ElementType } from 'react'
import { GraduationCap, FileBadge, Trophy, Users2 } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import Reveal from './Reveal'

const icons: Record<string, ElementType> = {
  Beasiswa: GraduationCap,
  Sertifikat: FileBadge,
  Kompetisi: Trophy,
  Workshop: Users2,
}

export default function Achievements() {
  const { achievements, loading } = useData()
  const { language, t, tv, locale } = useLanguage()

  if (loading || !achievements.length) return null

  return (
    <section id="achievements" className="section-pad bg-mist dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-accent mb-3">{t('achievements.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight max-w-lg">
            {t('achievements.subtitle')}
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => {
            const Icon = icons[a.issuer] ?? Trophy
            const title = getLocalizedContent(a, 'title', language);
            const description = getLocalizedContent(a, 'description', language);
            return (
              <Reveal key={a.id} delay={i * 0.06}>
                <div className="h-full rounded-xl2 border border-line dark:border-white/10 bg-white dark:bg-ink p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={19} />
                    </div>
                    <span className="text-xs font-semibold text-ink/40 dark:text-white/40">
                      {new Date(a.issueDate).toLocaleDateString(locale, { year: 'numeric' })}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wide">{tv(a.issuer)}</span>
                  <h3 className="font-display font-bold mt-1.5 leading-snug">{title}</h3>
                  <p className="text-sm text-ink/50 dark:text-white/50 mt-1">{description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

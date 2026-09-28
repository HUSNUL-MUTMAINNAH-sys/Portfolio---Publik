import { GraduationCap, MapPin, BookOpen } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import { photos } from '../lib/photos'
import Reveal from './Reveal'

export default function About() {
  const { profile, loading } = useData()
  const { t, language } = useLanguage()

  if (loading || !profile) return null

  // path lama '/photos/...' (dari data/DB sebelumnya) diabaikan -> pakai foto depan terbaru
  const photoSrc = profile.photoUrl && !profile.photoUrl.startsWith('/photos/') ? profile.photoUrl : photos.front

  const stats = [
    { value: `${profile.projectsCount}+`, label: t('stats.projects') },
    { value: `${profile.yearsLearning}+`, label: t('stats.years') },
    { value: `${profile.techCount}+`, label: t('stats.tech') },
  ]

  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-accent mb-3">{t('about.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight max-w-lg">
            {t('about.subtitle')}
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-5 gap-12 items-start">
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="relative aspect-square rounded-xl3 overflow-hidden bg-mist dark:bg-white/5 shadow-card">
              <img src={photoSrc} alt={profile.name} className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            <p className="text-lg leading-relaxed text-ink/70 dark:text-white/70">{getLocalizedContent(profile, 'aboutBio', language)}</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-xl2 border border-line dark:border-white/10 p-4">
                <GraduationCap size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink/45 dark:text-white/45">{t('about.university')}</p>
                  <p className="font-semibold text-sm mt-0.5">{getLocalizedContent(profile, 'university', language)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl2 border border-line dark:border-white/10 p-4">
                <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink/45 dark:text-white/45">{t('about.semester')}</p>
                  <p className="font-semibold text-sm mt-0.5">{getLocalizedContent(profile, 'semester', language)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl2 border border-line dark:border-white/10 p-4 sm:col-span-2">
                <BookOpen size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink/45 dark:text-white/45">{t('about.interest')}</p>
                  <p className="font-semibold text-sm mt-0.5">{getLocalizedContent(profile, 'interest', language)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 divide-x divide-line dark:divide-white/10 rounded-xl2 border border-line dark:border-white/10 overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-5">
                  <p className="font-display font-extrabold text-2xl sm:text-3xl text-accent">{s.value}</p>
                  <p className="text-xs mt-1 text-ink/50 dark:text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

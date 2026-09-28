import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import InteractiveAvatar from './InteractiveAvatar'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const { profile, loading } = useData()
  const { t, language } = useLanguage()

  if (loading || !profile) return null

  const roles = getLocalizedContent(profile, 'role', language).split(',').map((r) => r.trim())
  const [firstName, ...rest] = profile.name.split(' ')
  const lastName = rest.join(' ')

  const stats = [
    { value: `${profile.projectsCount}+`, label: t('stats.projects') },
    { value: `${profile.yearsLearning}+`, label: t('stats.years') },
    { value: `${profile.techCount}+`, label: t('stats.tech') },
  ]

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 lg:pt-32 bg-[linear-gradient(115deg,#FAFAFF_0%,#F6F4FF_45%,#E9E5FF_100%)] dark:bg-[linear-gradient(115deg,#17151F_0%,#1B1830_55%,#241E48_100%)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-x-8 min-h-[calc(100vh-7rem)] lg:min-h-[calc(100vh-8rem)]">
        {/* left */}
        <div className="flex flex-col justify-center pb-10 lg:pb-16">
          <motion.div {...fade(0)} className="flex items-center gap-4 mb-5 text-sm font-medium tracking-[0.12em] uppercase text-accent dark:text-accent-light">
            {t('hero.greeting')}
            <span className="h-px w-14 bg-accent/60" />
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-[clamp(3.25rem,8.5vw,6rem)] text-ink dark:text-white"
          >
            {firstName}
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">{lastName}</span>
          </motion.h1>

          <motion.div {...fade(0.16)} className="mt-6">
            <span className="inline-block rounded-full bg-lavender dark:bg-accent/20 px-5 py-2.5 text-base font-medium text-ink dark:text-white">
              {roles[0]}
            </span>
          </motion.div>

          <motion.p
            {...fade(0.24)}
            className="mt-6 max-w-[34rem] text-[1.05rem] sm:text-lg leading-relaxed text-muted dark:text-white/60"
          >
            {getLocalizedContent(profile, 'tagline', language)}
          </motion.p>

          <motion.div {...fade(0.32)} className="mt-8">
            <a
              href="#projects"
              className="group inline-flex items-center gap-4 rounded-full bg-accent hover:bg-accent-dark text-white pl-7 pr-2 py-2 text-base font-semibold shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              {t('hero.viewProjects')}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={18} />
              </span>
            </a>
          </motion.div>

          <motion.dl {...fade(0.4)} className="mt-10 flex items-stretch">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`pr-5 sm:pr-9 ${i > 0 ? 'pl-5 sm:pl-9 border-l border-accent/30' : ''}`}
              >
                <dt className="font-display font-extrabold text-2xl sm:text-3xl text-accent dark:text-accent-light leading-none">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-sm text-ink/80 dark:text-white/70">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* right — photo */}
        <div className="relative min-h-[26rem] sm:min-h-[32rem] lg:min-h-0">
          {/* decorative layers, kept behind the photo */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div className="absolute -right-[18%] -bottom-[38%] aspect-square w-[125%] rounded-full bg-gradient-to-b from-lavender/90 to-[#B9AEFA]/70 dark:from-accent/25 dark:to-accent/40" />
            <div className="absolute right-[6%] top-[14%] aspect-square w-[62%] rounded-full border border-accent/15" />
            <div className="absolute left-[8%] top-[24%] h-40 w-40 rounded-full bg-accent-light/25 blur-3xl" />
            <div className="absolute right-[4%] top-[26%] hidden sm:block">
              <div className="relative h-14 w-14 rounded-full bg-accent-light/35 grid place-items-center">
                <span className="h-6 w-6 rounded-full bg-accent-light/40" />
              </div>
              <svg className="absolute -left-14 -top-7 text-accent" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 12 L13 2" />
                <path d="M11 22 L27 18" />
                <path d="M9 31 L21 33" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-10 h-[104%] max-h-[48rem] -translate-x-1/2 aspect-[445/561]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="h-full w-full"
            >
              <InteractiveAvatar alt={profile.name} className="h-full w-full" />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll"
        className="hidden xl:block absolute bottom-6 left-1/2 -translate-x-1/2 h-9 w-5 rounded-full border border-accent/40"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="mx-auto mt-2 block h-1.5 w-1 rounded-full bg-accent" />
      </motion.a>
    </section>
  )
}

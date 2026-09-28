import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function TechStack() {
  const { techStack, loading } = useData()
  const { t } = useLanguage()

  if (loading || !techStack.length) return null

  const loop = [...techStack, ...techStack]

  return (
    <section className="section-pad overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow text-accent mb-3">{t('techstack.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight">
            {t('techstack.subtitle')}
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-ink to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-4">
          {loop.map((tech, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl border border-line dark:border-white/10 px-8 py-5 text-center min-w-[160px] hover:border-accent hover:text-accent transition-colors"
            >
              <span className="font-display font-bold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

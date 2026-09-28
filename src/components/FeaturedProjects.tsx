import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import Reveal from './Reveal'

export default function FeaturedProjects() {
  const { projects, loading } = useData()
  const { language, t, tv } = useLanguage()

  if (loading || !projects.length) return null

  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent mb-3">{t('projects.title')}</p>
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight max-w-lg">
              {t('projects.subtitle')}
            </h2>
          </div>
          <a href="#gallery" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
            {t('projects.viewAll')} <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="mt-14 space-y-8">
          {featured.map((p, i) => {
            const description = getLocalizedContent(p, 'description', language);
            return (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="group grid md:grid-cols-2 gap-0 rounded-xl3 border border-line dark:border-white/10 overflow-hidden bg-white dark:bg-ink shadow-soft hover:shadow-card transition-all duration-500">
                  <div className={`relative aspect-[4/3] md:aspect-auto overflow-hidden bg-mist dark:bg-white/5 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={p.imageUrl || 'https://via.placeholder.com/500x400'}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full glass border border-line dark:border-white/10">
                        {p.year}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-white">
                        {tv(p.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="font-display font-bold text-2xl mb-3">{getLocalizedContent(p, 'title', language)}</h3>
                    <p className="text-ink/60 dark:text-white/60 leading-relaxed">{description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.technologies.split(',').map((t) => (
                        <span key={t.trim()} className="text-xs font-medium px-2.5 py-1 rounded-full bg-mist dark:bg-white/10 text-ink/60 dark:text-white/60">
                          {t.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {p.link && (
                        <a href={p.link} className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white dark:bg-white dark:text-ink px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                          <ExternalLink size={14} /> {t('projects.liveDemo')}
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} className="inline-flex items-center gap-1.5 rounded-full border border-line dark:border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all">
                          <Github size={14} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

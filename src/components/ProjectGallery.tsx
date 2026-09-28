import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedContent } from '../services/api'
import Reveal from './Reveal'

export default function ProjectGallery() {
  const { projects, loading } = useData()
  const { language, t, tv } = useLanguage()
  const [active, setActive] = useState<string>('All')

  const categories = useMemo(() => {
    if (!projects.length) return ['All']
    const cats = new Set(projects.map((p) => p.category))
    return ['All', ...Array.from(cats).sort()]
  }, [projects])

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  )

  if (loading || !projects.length) return null

  return (
    <section id="gallery" className="section-pad bg-mist dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent dark:text-accent-light mb-3">{t('gallery.title')}</p>
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight">
              {t('gallery.subtitle')}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`relative text-sm font-semibold px-5 py-2 rounded-full border transition-colors ${
                  active === f
                    ? 'text-white border-transparent'
                    : 'text-ink/70 dark:text-white/70 bg-white dark:bg-white/5 border-line dark:border-white/10 hover:text-accent hover:border-accent/40'
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-glow"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f === 'All' ? t('gallery.all') : tv(f)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const description = getLocalizedContent(p, 'description', language);
              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="mb-6 break-inside-avoid group rounded-3xl overflow-hidden border border-line dark:border-white/10 bg-white dark:bg-ink shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-[box-shadow,transform] duration-300"
                >
                  <div className="relative overflow-hidden bg-lavender/60 m-2.5 rounded-2xl">
                    <img src={p.imageUrl || 'https://via.placeholder.com/400x300'} alt={p.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-accent-dark border border-line">
                      {tv(p.category)}
                    </span>
                  </div>
                  <div className="px-6 pb-6 pt-3">
                    <h3 className="font-display font-bold text-lg leading-snug">{getLocalizedContent(p, 'title', language)}</h3>
                    <p className="text-sm leading-relaxed text-muted dark:text-white/55 mt-2 line-clamp-3">{description}</p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

import type { ElementType } from 'react'
import { motion } from 'framer-motion'
import { Code2, Server, Database, Wrench } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'

const icons: Record<string, ElementType> = {
  FRONTEND: Code2,
  BACKEND: Server,
  DATABASE: Database,
  TOOLS: Wrench,
}

export default function Skills() {
  const { skills, loading } = useData()
  const { t } = useLanguage()

  if (loading || !skills.length) return null

  const skillGroups = skills.reduce((acc, skill) => {
    const group = acc.find((g) => g.category === skill.category)
    if (group) {
      group.items.push(skill)
    } else {
      acc.push({ category: skill.category, items: [skill] })
    }
    return acc
  }, [] as Array<{ category: string; items: typeof skills }>)

  return (
    <section id="skills" className="section-pad bg-mist dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-accent mb-3">{t('skills.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight max-w-lg">
            {t('skills.subtitle')}
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.category as keyof typeof icons] ?? Code2
            return (
              <Reveal key={group.category} delay={gi * 0.08}>
                <div className="h-full rounded-xl3 border border-line dark:border-white/10 bg-white dark:bg-ink p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-5">{group.category}</h3>

                  <div className="space-y-4">
                    {group.items.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-ink/75 dark:text-white/75">{skill.name}</span>
                          <span className="text-ink/40 dark:text-white/40">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-line dark:bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
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

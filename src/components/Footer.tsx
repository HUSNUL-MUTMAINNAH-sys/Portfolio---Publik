import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { contact, profile, loading } = useData()
  const { t } = useLanguage()

  if (loading || !profile || !contact) return null

  const socials = [
    { icon: Mail, href: `mailto:${contact.email}` },
    { icon: Linkedin, href: contact.linkedin },
    { icon: Github, href: contact.github },
    { icon: Instagram, href: contact.instagram },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-line dark:border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-ink/50 dark:text-white/50">
          © {new Date().getFullYear()} {profile.name}. {t('footer.allRights')}.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-line dark:border-white/15 hover:border-accent hover:text-accent transition-colors"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>

        <a
          href="#home"
          aria-label="Back to top"
          className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white dark:bg-white dark:text-ink hover:-translate-y-1 transition-transform"
        >
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isDark, toggle } = useDarkMode()
  const { t } = useLanguage()

  const links = [
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#achievements', label: t('nav.achievements') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`relative flex items-center justify-between rounded-full px-5 py-2.5 border border-line/80 dark:border-white/10 bg-white/80 dark:bg-ink/70 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-soft' : 'shadow-[0_8px_30px_-16px_rgba(84,54,217,0.25)]'
          }`}
        >
          <a href="#home" className="font-display font-extrabold text-xl tracking-tight">
            H.M
          </a>

          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-ink/70 dark:text-white/70 hover:text-accent dark:hover:text-accent-light transition-colors group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 rounded-full w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="grid h-9 w-9 place-items-center rounded-full border border-line dark:border-white/15 bg-white/70 dark:bg-transparent hover:border-accent hover:text-accent transition-colors"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line dark:border-white/15 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 glass border border-line dark:border-white/10 rounded-3xl p-4 flex flex-col gap-1 md:hidden shadow-soft"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2.5 px-3 rounded-xl hover:bg-lavender/60 hover:text-accent transition-colors">
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}


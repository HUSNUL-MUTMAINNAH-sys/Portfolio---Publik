import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-full border border-line dark:border-white/15 p-1 bg-white/80 dark:bg-ink">
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
          language === 'id'
            ? 'bg-accent text-white shadow-[0_4px_12px_-4px_rgba(108,79,246,0.6)]'
            : 'text-ink/60 dark:text-white/60 hover:text-accent'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
          language === 'en'
            ? 'bg-accent text-white shadow-[0_4px_12px_-4px_rgba(108,79,246,0.6)]'
            : 'text-ink/60 dark:text-white/60 hover:text-accent'
        }`}
      >
        EN
      </button>
    </div>
  )
}

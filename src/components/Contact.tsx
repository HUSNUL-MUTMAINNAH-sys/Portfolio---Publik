import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Linkedin, Github, Instagram, MessageCircle, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useLanguage } from '../context/LanguageContext'
import { supabase, supabaseReady } from '../lib/supabase'
import Reveal from './Reveal'

export default function Contact() {
  const { contact, loading } = useData()
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  // Pesan disimpan ke tabel `messages` di Supabase (dibaca lewat web admin).
  // Jika Supabase belum dikonfigurasi, form membuka aplikasi email (mailto:).
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      if (supabaseReady) {
        const { error } = await supabase
          .from('messages')
          .insert({ name: form.name, email: form.email, message: form.message })
        if (error) throw error
      } else if (contact?.email) {
        const subject = encodeURIComponent(`Pesan dari ${form.name} lewat Portfolio`)
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      } else {
        throw new Error('no channel')
      }
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3500)
  }

  if (loading || !contact) return null

  const contactLinks = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: contact.linkedin?.replace('https://linkedin.com/in/', '@') || '', href: contact.linkedin },
    { icon: Github, label: 'GitHub', value: contact.github?.replace('https://github.com/', '@') || '', href: contact.github },
    { icon: Instagram, label: 'Instagram', value: contact.instagram?.replace('https://instagram.com/', '@') || '', href: contact.instagram },
    { icon: MessageCircle, label: 'WhatsApp', value: t('contact.chat'), href: contact.whatsapp },
  ].filter((c) => c.href)

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center max-w-xl mx-auto">
          <p className="eyebrow text-accent mb-3">{t('contact.title')}</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] tracking-tight">
            {t('contact.subtitle')}
          </h2>
          <p className="mt-4 text-ink/55 dark:text-white/55">
            {t('contact.description')}
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          <Reveal delay={0.1} className="lg:col-span-2 grid content-start gap-4">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-xl2 border border-line dark:border-white/10 p-4 hover:border-accent hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <c.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-ink/45 dark:text-white/45">{c.label}</p>
                  <p className="font-semibold text-sm truncate">{c.value}</p>
                </div>
              </a>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-xl3 border border-line dark:border-white/10 p-6 sm:p-8 shadow-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-ink/50 dark:text-white/50">{t('contact.name')}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-line dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink/50 dark:text-white/50">{t('contact.email')}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-line dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/50 dark:text-white/50">{t('contact.message')}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-line dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-white dark:bg-white dark:text-ink px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t('contact.sending')}
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle2 size={16} /> {t('contact.sent')}
                  </>
                ) : (
                  <>
                    <Send size={16} /> {t('contact.send')}
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="text-sm text-red-500">
                  {t('contact.error')}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

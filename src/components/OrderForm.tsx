'use client'

import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { upload } from '@vercel/blob/client'
import { site } from '@/site.config'

const SERVICE_GROUPS = [
  ['Formátování', 'Bibliografické citace', 'Kontrola plagiátorství'],
  ['Překlad abstraktu', 'Tisk a vazba práce', 'Tvorba prezentace'],
  ['Analýza využití AI', 'Písemné doporučení'],
]

const ACCEPTED_TYPES = '.pdf,.doc,.docx,.rtf,.odt,.txt,.xls,.xlsx,.ods,.jpg,.jpeg,.png,.zip'
const MAX_FILES = 5
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB

const inputCls =
  'w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand'

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ backgroundColor: '#1a7a68' }}
      >
        {num}
      </div>
      <h3 className="font-headings font-bold text-navy text-base">{title}</h3>
      <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(13,31,45,0.12)' }} />
    </div>
  )
}

const labelCls = 'block text-xs font-semibold text-gray-600 mb-1'

export default function OrderForm() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [urgency, setUrgency] = useState<'standard' | 'smart' | 'express' | 'custom'>('smart')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [progressMsg, setProgressMsg] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formLoadedAt = useRef(Date.now())

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const allowedExts = ACCEPTED_TYPES.split(',')
    const valid = Array.from(newFiles).filter((f) => {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase()
      if (!allowedExts.includes(ext)) {
        alert(`Soubor \u201E${f.name}\u201C má nepodporovaný formát. Povolené: PDF, DOC, DOCX, RTF, ODT, TXT, XLS, XLSX, ODS, JPG, PNG, ZIP.`)
        return false
      }
      if (f.size > MAX_FILE_SIZE) {
        alert(`Soubor \u201E${f.name}\u201C je příliš velký. Maximální velikost je 25 MB.`)
        return false
      }
      return true
    })
    setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES))
  }

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index))

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Client-side upload přímo do Vercel Blob (podporuje soubory do 25 MB)
      const fileUrls: string[] = []
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx]
        if (file && file.size > 0) {
          try {
            setProgressMsg(`Nahrávám soubor ${idx + 1} z ${files.length}…`)

            const blob = await upload(
              `korektura-dp/${Date.now()}_${file.name}`,
              file,
              {
                access: 'public',
                handleUploadUrl: '/api/blob-upload',
              }
            )

            fileUrls.push(blob.url)
          } catch (uploadErr) {
            console.error('Upload souboru selhal:', uploadErr)
            setStatus('error')
            setErrorMsg(
              `Nahrání souboru „${file.name}" se nezdařilo. Zkuste to prosím znovu, ` +
                `případně nám práci pošlete e-mailem na ${site.email}.`
            )
            return
          }
        }
      }
      setProgressMsg('Odesílám objednávku…')

      // Odeslání dat formuláře jako JSON
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        services: formData.getAll('services'),
        deadline: formData.get('deadline') ?? formData.get('urgency'),
        fileUrls,
        newsletterConsent: newsletter,
        website: formData.get('website'),
        elapsedMs: Date.now() - formLoadedAt.current,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        setStatus('error')
        setErrorMsg(
          json?.error ??
            `Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám napište na ${site.email}.`
        )
        return
      }
      setStatus('success')
      setTimeout(() => router.push('/dekujeme-za-objednavku'), 3000)
    } catch (err) {
      console.error('Odeslání objednávky selhalo:', err)
      setStatus('error')
      setErrorMsg(
        'Odeslání se nezdařilo. Zkontrolujte prosím připojení a zkuste to znovu, ' +
          `případně nám napište na ${site.email}.`
      )
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="objednavka" className="py-24" style={{ backgroundColor: '#eef2f0' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title text-navy text-center mb-3">Objednávkový formulář</h2>
        <p className="text-center text-text-dark text-base leading-relaxed mb-10">
          Pošlete nám svou diplomovou práci a my vám obratem připravíme cenovou nabídku
          na korekturu. Komunikujeme převážně e&#x2011;mailem &ndash; pokud preferujete telefon, rádi
          se domluvíme i osobně.
        </p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded p-8 text-center">
            <div className="text-4xl mb-3">{'\u2713'}</div>
            <h3 className="font-bold text-xl mb-2">Objednávka odeslána!</h3>
            <p>Děkujeme za vaši poptávku. Ozveme se vám co nejdříve s naceněním korektury.</p>
            <p className="text-sm text-gray-500 mt-3">Přesměrování...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white p-6 md:p-8 shadow-sm space-y-8">

          {/* ── SEKCE 1: Kontaktní údaje ── */}
          <div>
            <SectionHeader num="1" title="Vaše kontaktní údaje" />

            {/* Honeypot – skryté pole proti spam botům, lidé jej nevidí ani nevyplní */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
              <label htmlFor="website">Web</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="name" className={labelCls}>
                  Jméno <span className="text-brand">*</span>
                </label>
                <input type="text" id="name" name="name" required
                  placeholder="Celé jméno" className={inputCls} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  E&#x2011;mail <span className="text-brand">*</span>
                </label>
                <input type="email" id="email" name="email" required
                  placeholder="e&#x2011;mailová adresa" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className={labelCls}>Telefon</label>
                <input type="tel" id="phone" name="phone"
                  placeholder="+420 xxx xxx xxx" className={inputCls} />
              </div>
              <div>
                <label htmlFor="message" className={labelCls}>Zpráva</label>
                <textarea id="message" name="message" rows={3}
                  placeholder="Počet stran, škola, poznámky..."
                  className={`${inputCls} resize-none`} />
              </div>
            </div>
          </div>

          {/* ── SEKCE 2: Soubory + Chci také ── */}
          <div>
            <SectionHeader num="2" title="Soubory a doplňkové služby" />

            {/* File drop zone */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Nahrát soubory – otevřít výběr souborů"
              onDrop={onDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              className={`border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-brand ${
                isDragging
                  ? 'border-brand bg-brand/5'
                  : 'border-gray-300 hover:border-brand hover:bg-brand/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES}
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
              />
              <p className="text-sm text-gray-500">
                Přetáhněte soubory nebo{' '}
                <span className="text-brand font-semibold">vyberte v počítači</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Max. {MAX_FILES} souborů, každý do 25 MB
              </p>
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700 mb-1.5">
                  Přidané soubory ({files.length})
                </p>
                <ul className="space-y-1.5">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 bg-green-50 border border-green-300 px-3 py-2.5 text-sm">
                      <svg className="w-5 h-5 flex-shrink-0 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate font-semibold text-green-800">{f.name}</span>
                      <span className="text-xs text-green-700/70 flex-shrink-0">
                        {f.size < 1048576 ? `${Math.max(1, Math.round(f.size / 1024))} kB` : `${(f.size / 1048576).toFixed(1)} MB`}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        aria-label={`Odebrat soubor ${f.name}`}
                        className="ml-auto text-green-700 hover:text-red-600 font-bold text-lg leading-none flex-shrink-0"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Chci také */}
            <label className="block text-xs font-semibold text-gray-600 mb-2">Chci také</label>
            <div className="grid grid-cols-2 gap-x-8 gap-y-0">
              {SERVICE_GROUPS.flat().map((service) => (
                <label key={service} className="flex items-center gap-2 cursor-pointer py-1.5">
                  <input type="checkbox" name="services" value={service}
                    className="w-3.5 h-3.5 accent-brand flex-shrink-0" />
                  <span className="text-xs text-gray-600">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ── SEKCE 3: Termín + odeslání ── */}
          <div>
            <SectionHeader num="3" title="Termín a odeslání" />

            {/* Radio tiles */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {[
                { id: 'standard' as const, label: 'Standard', note: 'do 4 dnů' },
                { id: 'smart' as const, label: 'Smart', note: 'do 2 dnů' },
                { id: 'express' as const, label: 'Express', note: 'do 24 hodin' },
                { id: 'custom' as const, label: 'Vlastní datum', note: 'zvolím sám/a' },
              ].map((o) => (
                <label
                  key={o.id}
                  className="flex items-center gap-3 flex-1 border-2 px-4 py-3.5 cursor-pointer transition-all"
                  style={{
                    borderColor: urgency === o.id ? '#1a7a68' : '#e5e7eb',
                    backgroundColor: urgency === o.id ? 'rgba(26,122,104,0.04)' : 'white',
                  }}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={o.id}
                    checked={urgency === o.id}
                    onChange={() => setUrgency(o.id)}
                    className="accent-brand w-4 h-4 flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold"
                      style={{ color: urgency === o.id ? '#1a7a68' : '#1f2937' }}>
                      {o.label}
                    </div>
                    <div className="text-xs text-gray-400">{o.note}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Custom date */}
            {urgency === 'custom' && (
              <input
                type="date"
                id="deadline"
                name="deadline"
                min={today}
                className="border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700
                           focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand mb-4"
                style={{ minWidth: '190px' }}
              />
            )}

            {/* Průběh odesílání */}
            {status === 'loading' && progressMsg && (
              <div className="mb-4 bg-blue-50 border border-blue-300 text-blue-700 px-4 py-2 text-sm">
                {progressMsg}
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-2 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Newsletter */}
            <div className="mb-5 pt-4 border-t border-gray-100">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-3.5 h-3.5 accent-brand flex-shrink-0 mt-0.5"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Chci dostávat e&#x2011;mailem tipy, slevy a nabídky.{' '}
                  <span className="text-gray-400">
                    Souhlas můžete kdykoliv odvolat.
                  </span>
                </span>
              </label>
            </div>

            {/* Právní text */}
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Odesláním formuláře berete na vědomí zpracování osobních údajů a potvrzujete
              seznámení s{' '}
              <a href="/ochrana-osobnich-udaju" className="underline hover:text-brand transition-colors" style={{ textDecorationColor: '#1a7a68' }}>
                ochranou osobních údajů
              </a>{' '}
              a{' '}
              <a href="/obchodni-podminky" className="underline hover:text-brand transition-colors" style={{ textDecorationColor: '#1a7a68' }}>
                obchodními podmínkami
              </a>
              .
            </p>

            {/* Navy CTA bar */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5"
              style={{ backgroundColor: '#0d1f2d' }}
            >
              <div>
                <p className="text-white font-semibold text-base">
                  Máte vše vyplněno? Odešlete poptávku.
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Odpovíme co nejdříve s cenovou nabídkou.
                </p>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="whitespace-nowrap px-8 py-3 font-bold text-sm text-white
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1a7a68' }}
              >
                {status === 'loading' ? 'Odesílám\u2026' : 'Odeslat objednávku \u2192'}
              </button>
            </div>
          </div>

        </form>
        )}
      </div>
    </section>
  )
}

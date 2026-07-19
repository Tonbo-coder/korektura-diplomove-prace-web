'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const radioGroupCls = 'flex flex-col gap-2'
const labelCls = 'text-sm font-bold text-gray-800 mb-3 block'
const optionLabelCls = 'flex items-center gap-2 text-sm text-gray-700 cursor-pointer'

const DISCOVERY_OPTIONS = [
  'Google.cz – Internetové vyhledávání',
  'Seznam.cz – Internetové vyhledávání',
  'Doporučení od známého',
  'Venkovní reklama',
  'Sociální sítě',
  'Jiné',
]

const REASON_OPTIONS = [
  'Přehledný a intuitivní web',
  'Cena a kvalita',
  'Doporučení od známého',
  'Celkový dojem a přístup',
  'Dlouhodobá spolupráce',
]

const CLARITY_OPTIONS = [
  'Velmi dobrý',
  'Dobrý',
  'Průměrný',
  'Podprůměrný',
  'Nelíbí se mi',
]

export default function ReviewForm() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/review', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Chyba serveru')
      router.push('/dekujeme-za-hodnoceni')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Neznámá chyba')
    }
  }

  return (
    <section id="hodnoceni" className="py-16" style={{ backgroundColor: '#eef2f0' }}>
      <div className="max-w-6xl mx-auto px-4">

        <form onSubmit={handleSubmit} noValidate className="bg-white p-6 md:p-8 shadow-sm">

            {/* Honeypot – skryté pole proti spam botům, lidé jej nevidí ani nevyplní */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
              <label htmlFor="review-website">Web</label>
              <input type="text" id="review-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* 4-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

              {/* Column 1 – Discovery */}
              <div>
                <span className={labelCls}>Kde jste se dozvěděli o naší firmě?</span>
                <div className={radioGroupCls}>
                  {DISCOVERY_OPTIONS.map((opt) => (
                    <label key={opt} className={optionLabelCls}>
                      <input
                        type="radio"
                        name="discovery"
                        value={opt}
                        className="accent-brand w-4 h-4 shrink-0"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Column 2 – Reason */}
              <div>
                <span className={labelCls}>Důvod výběru naší společnosti</span>
                <div className={radioGroupCls}>
                  {REASON_OPTIONS.map((opt) => (
                    <label key={opt} className={optionLabelCls}>
                      <input
                        type="checkbox"
                        name="reason"
                        value={opt}
                        className="accent-brand w-4 h-4 shrink-0"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Column 3 – Clarity */}
              <div>
                <span className={labelCls}>Ohodnoťte přehlednost webu</span>
                <div className={radioGroupCls}>
                  {CLARITY_OPTIONS.map((opt) => (
                    <label key={opt} className={optionLabelCls}>
                      <input
                        type="radio"
                        name="clarity"
                        value={opt}
                        className="accent-brand w-4 h-4 shrink-0"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Column 4 – Comment */}
              <div className="flex flex-col">
                <span className={labelCls}>Napadá Vás, co zlepšit? Budeme vděční za Váš názor!</span>
                <textarea
                  name="comment"
                  rows={7}
                  placeholder="(Služba, kterou byste ocenil/a; bylo něco, čemu jste nerozuměl/a; Měla/a jste při objednání nějaké komplikace; a vše další co Vás napadá :-))"
                  className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700
                             placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1
                             focus:ring-brand resize-none flex-1"
                />
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-2 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary px-12 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Odesílám…' : 'Odeslat'}
              </button>
            </div>

          </form>

          <div className="flex justify-center mt-10">
            <a href="/" className="btn-secondary">
              Zpět na hlavní stránku
            </a>
          </div>
      </div>
    </section>
  )
}

'use client'

/**
 * COOKIE CONSENT – GDPR compliant, Google Consent Mode v2
 */

import { useState, useEffect } from 'react'

const LS_CONSENT   = 'cookie_consent'
const LS_MARKETING = 'marketing_cookies'

function getMarketingConsent(): boolean {
  try { return localStorage.getItem(LS_MARKETING) === 'true' } catch { return false }
}

function isDecided(): boolean {
  try { return !!localStorage.getItem(LS_CONSENT) } catch { return false }
}

function saveConsent(consent: 'accepted' | 'rejected' | 'custom', marketing: boolean) {
  try {
    localStorage.setItem(LS_CONSENT,   consent)
    localStorage.setItem(LS_MARKETING, String(marketing))
  } catch {
    // localStorage nedostupný
  }
}

function updateGoogleConsent(marketing: boolean) {
  if (typeof window === 'undefined') return
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer ?? []
  if (!w.gtag) {
    w.gtag = function (...args: unknown[]) { w.dataLayer!.push(args) }
  }
  const status = marketing ? 'granted' : 'denied'
  w.gtag('consent', 'update', {
    ad_storage:          status,
    analytics_storage:   status,
    ad_user_data:        status,
    ad_personalization:  status,
  })
}

type View = 'banner' | 'settings' | 'hidden'

export default function CookieConsent() {
  const [view, setView]       = useState<View>('hidden')
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const alreadyDecided = isDecided()
    const marketingValue = getMarketingConsent()

    if (alreadyDecided) {
      updateGoogleConsent(marketingValue)
      setView('hidden')
    } else {
      setView('banner')
    }

    const openHandler = () => {
      setMarketing(getMarketingConsent())
      setView('settings')
    }
    window.addEventListener('openCookieSettings', openHandler)
    return () => window.removeEventListener('openCookieSettings', openHandler)
  }, [])

  const acceptAll = () => {
    saveConsent('accepted', true)
    updateGoogleConsent(true)
    setMarketing(true)
    setView('hidden')
  }

  const declineAll = () => {
    saveConsent('rejected', false)
    updateGoogleConsent(false)
    setMarketing(false)
    setView('hidden')
  }

  const saveSettings = () => {
    saveConsent('custom', marketing)
    updateGoogleConsent(marketing)
    setView('hidden')
  }

  const openSettings = () => {
    setMarketing(getMarketingConsent())
    setView('settings')
  }

  if (view === 'hidden') return null

  const sBtn: React.CSSProperties = {
    flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.8125rem',
    fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db',
    background: 'white', color: '#4b5563', transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  }
  const pBtn: React.CSSProperties = {
    flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.8125rem',
    fontWeight: 700, cursor: 'pointer', border: 'none',
    background: '#0d1f2d', color: 'white', transition: 'background 0.15s',
    fontFamily: 'inherit',
  }
  const rBtn: React.CSSProperties = {
    ...pBtn, flex: 'none', width: '100%', background: '#1a7a68',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Nastavení souhlasu s cookies"
      style={{
        position: 'fixed', bottom: '1.25rem', right: '1.25rem',
        zIndex: 9999, width: '320px', backgroundColor: '#fff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
        borderTop: '3px solid #1a7a68',
      }}
    >

      {/* BANNER */}
      {view === 'banner' && (
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-source-sans)', fontWeight: 700, color: '#0d1f2d', fontSize: '1.125rem', marginBottom: '0.75rem' }}>
            Používáme Cookies
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: '#495057', marginBottom: '1.25rem' }}>
            Používáme nezbytné cookies pro fungování webu a volitelné marketingové cookies pro
            reklamu a měření kampaní. Volbu můžete kdykoliv změnit.{' '}
            <a href="/ochrana-osobnich-udaju" style={{ color: '#1a7a68', textDecoration: 'underline', fontSize: '0.8125rem' }}>
              Více informací
            </a>
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem' }}>
            <button style={sBtn} onClick={openSettings}>Nastavení</button>
            <button style={pBtn} onClick={acceptAll}>Přijmout vše</button>
          </div>
          <button onClick={declineAll} style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#9ca3af', paddingTop: '0.25rem', textAlign: 'center', fontFamily: 'inherit' }}>
            Odmítnout
          </button>
        </div>
      )}

      {/* NASTAVENÍ */}
      {view === 'settings' && (
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-source-sans)', fontWeight: 700, color: '#0d1f2d', fontSize: '1.125rem', marginBottom: '1rem' }}>
            Nastavení cookies
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0d1f2d', marginBottom: '0.2rem' }}>
                Nezbytné cookies
              </div>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                Tyto cookies jsou nutné pro fungování webu.
              </p>
            </div>
            <span style={{ flexShrink: 0, fontSize: '0.7rem', fontWeight: 600, color: '#9ca3af', background: '#f3f4f6', padding: '0.25rem 0.5rem', whiteSpace: 'nowrap', marginTop: '0.125rem' }}>
              Vždy aktivní
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0d1f2d', marginBottom: '0.2rem' }}>
                Marketingové cookies
              </div>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                Reklama a měření kampaní.
              </p>
            </div>
            <button
              role="switch"
              aria-checked={marketing}
              aria-label="Marketingové cookies"
              onClick={() => setMarketing(p => !p)}
              style={{
                flexShrink: 0, position: 'relative',
                width: '40px', height: '22px', borderRadius: '11px',
                border: 'none', cursor: 'pointer', padding: 0,
                backgroundColor: marketing ? '#1a7a68' : '#d1d5db',
                transition: 'background-color 0.2s',
                marginTop: '0.125rem',
              }}
            >
              <span style={{
                position: 'absolute', top: '3px',
                left: marketing ? '21px' : '3px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left 0.2s', display: 'block',
              }} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <button style={sBtn} onClick={declineAll}>Odmítnout</button>
            <button style={pBtn} onClick={acceptAll}>Přijmout vše</button>
          </div>
          <button style={rBtn} onClick={saveSettings}>
            Uložit nastavení
          </button>
        </div>
      )}

    </div>
  )
}

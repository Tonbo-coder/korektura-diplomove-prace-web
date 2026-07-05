import CookieSettingsLink from '@/components/CookieSettingsLink'
import { site } from '@/site.config'

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      {/* Hlavní řádek – copyright + sociální sítě */}
      <div className="max-w-6xl mx-auto px-4 pt-5 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
        <span>
          ©2014–2026. Vytvořeno ve spolupráci s{' '}
          <a
            href="https://www.profiformatovani.cz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
          >
            Profiformatovani.cz
          </a>
        </span>
        <div className="flex gap-4">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            Facebook
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Právní řádek – OOU, OP, Nastavení cookies */}
      <div className="max-w-6xl mx-auto px-4 pb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-white/8">
        <a
          href="/ochrana-osobnich-udaju"
          className="text-xs text-white/45 hover:text-white/70 transition-colors py-2"
        >
          Ochrana osobních údajů
        </a>
        <span className="text-white/20 text-xs select-none">·</span>
        <a
          href="/obchodni-podminky"
          className="text-xs text-white/45 hover:text-white/70 transition-colors py-2"
        >
          Obchodní podmínky
        </a>
        <span className="text-white/20 text-xs select-none">·</span>
        <CookieSettingsLink />
      </div>
    </footer>
  )
}

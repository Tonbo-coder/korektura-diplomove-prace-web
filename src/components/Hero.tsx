import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative min-h-[440px] md:min-h-[540px]">
        {/* Text block – left half */}
        <div className="relative z-10 max-w-[540px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-widest px-3 py-1.5"
            style={{ backgroundColor: 'rgba(26,122,104,0.10)', color: '#1a7a68' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Profesionální korektura
          </div>
          <h1
            className="font-headings font-normal leading-tight mb-6"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              lineHeight: '1.2',
              color: '#0d1f2d',
              textShadow:
                '2px 2px 10px #eef2f0, 4px 4px 10px #eef2f0, -2px -2px 10px #eef2f0, -4px -4px 10px #eef2f0',
            }}
          >
            Korektura<br />
            <strong>diplomové práce</strong>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{
              color: '#0d1f2d',
              textShadow: '1px 1px 8px #eef2f0, -1px -1px 8px #eef2f0, 0 0 12px #eef2f0',
            }}
          >
            Odevzdejte diplomovou práci bez stylistických a gramatických chyb. Provedeme důkladnou
            jazykovou a stylistickou korekturu, opravíme gramatiku, interpunkci i slovosled –
            aby text působil přirozeně a byl bez chyb.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#objednavka" className="btn-primary">
              Objednat korekturu
            </a>
            <a href="#cenik" className="btn-secondary">
              Ceník
            </a>
          </div>
        </div>

        {/* Hero decorative image – right side, desktop only */}
        <div
          className="hidden md:block absolute bottom-0 right-0 pointer-events-none"
          style={{ width: '48%', maxWidth: '540px' }}
        >
          <Image
            src="/images/korektura-diplomove-prace-hero.png"
            alt="Korektura diplomové práce – profesionální jazyková úprava"
            width={600}
            height={520}
            className="object-contain object-right-bottom"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </div>
    </section>
  )
}

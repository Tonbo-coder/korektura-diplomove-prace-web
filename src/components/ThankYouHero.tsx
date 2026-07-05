import { site } from '@/site.config'

export default function ThankYouHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0d1f2d' }}>
      {/* Subtle diagonal stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(135deg, transparent 60%, rgba(26,122,104,0.08) 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 md:py-28 text-center text-white">
        {/* Checkmark circle */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#1a7a68' }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 19L16 27L30 11"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-headings font-normal leading-tight mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Děkujeme za <strong>objednávku!</strong>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-4"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          Vaše objednávka korektury diplomové práce byla úspěšně přijata. V nejbližší
          době se vám ozveme s cenovou nabídkou a potvrzením termínu.
        </p>
        <p
          className="text-base leading-relaxed max-w-lg mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          Máte doplňující dotaz? Zavolejte nám nebo napište na{' '}
          <a
            href={`mailto:${site.email}`}
            className="underline hover:text-white transition-colors"
            style={{ color: 'rgba(255,255,255,0.75)', textDecorationColor: '#1a7a68' }}
          >
            {site.email}
          </a>
        </p>

        <a href="/" className="btn-secondary-outline-white">
          Zpět na hlavní stránku
        </a>
      </div>
    </section>
  )
}

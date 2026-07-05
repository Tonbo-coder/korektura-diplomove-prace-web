import { site } from '@/site.config'

const korrekturaOptions = [
  {
    name: 'Formátování Standard',
    price: '40 Kč',
    unit: 'za normostranu',
    delivery: 'Vyhotovení do 4 dnů',
  },
  {
    name: 'Formátování Smart',
    price: '45 Kč',
    unit: 'za normostranu',
    delivery: 'Vyhotovení do 2 dnů',
  },
  {
    name: 'Formátování Express',
    price: '50 Kč',
    unit: 'za normostranu',
    delivery: 'Vyhotovení do 24 hodin',
  },
]

export default function Pricing() {
  return (
    <section id="cenik" className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="section-title text-navy mb-4">Kolik stojí korektura diplomové práce?</h2>
        <p className="section-subtitle text-text-dark mb-12">
          Diplomová práce si zaslouží bezchybný jazyk a&nbsp;precizní stylistiku na úrovni
          magisterského studia. Nabízíme profesionální korekturu diplomových prací za férové
          ceny – od gramatiky přes interpunkci po celkovou stylistickou úpravu textu.
        </p>

        {/* Korektura + stylistika – navy full-width row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-8 py-8 min-h-[140px] sm:min-h-0"
          style={{ backgroundColor: '#0d1f2d' }}
        >
          <h3 className="text-white font-headings font-normal text-3xl md:text-4xl leading-snug text-left">
            <strong>Korektura</strong> a&nbsp;stylistika
          </h3>
          <div className="flex-shrink-0 text-right">
            <div
              className="text-white font-bold leading-none px-3 py-1 inline-block"
              style={{ backgroundColor: '#1a7a68', fontSize: '40px' }}
            >
              {site.pricing.mainService.price}&nbsp;Kč
            </div>
            <div className="text-white/70 text-sm mt-1 text-right">za&nbsp;normostranu</div>
          </div>
        </div>

        {/* Korrektura options – dark gray cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {korrekturaOptions.map((opt) => (
            <div
              key={opt.name}
              className="flex flex-col justify-between min-h-[160px] p-6 text-left border-t-4 border-brand"
              style={{ backgroundColor: '#2d3336' }}
            >
              {/* Title – top left */}
              <div className="text-white font-headings font-bold text-xl leading-snug">
                {opt.name}
              </div>

              {/* Price + delivery – bottom right */}
              <div className="text-right mt-4">
                <div className="text-white text-lg font-bold">
                  {opt.price}{' '}
                  <span className="font-normal text-white/80">{opt.unit}</span>
                </div>
                <div className="text-white/70 text-sm mt-0.5">{opt.delivery}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="#objednavka"
            className="btn-primary"
            title="Objednat korekturu diplomové práce"
          >
            Objednat
          </a>
        </div>
      </div>
    </section>
  )
}

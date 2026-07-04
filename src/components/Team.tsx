import Image from 'next/image'

const members = [
  {
    img: '/images/clenove/korektura-diplomove-prace-antonin.jpg',
    alt: 'Antonín – Komunikace, formátování',
    name: 'Antonín',
    role: 'Komunikace, formátování',
  },
  {
    img: '/images/clenove/korektura-diplomove-prace-hanka.jpg',
    alt: 'Hanka – Úprava citací a zdrojů',
    name: 'Hanka',
    role: 'Úprava citací a zdrojů',
  },
  {
    img: '/images/clenove/korektura-diplomove-prace-veronika.jpg',
    alt: 'Veronika – Korektura, přepis textů',
    name: 'Veronika',
    role: 'Korektura, přepis textů',
  },
  {
    img: '/images/clenove/korektura-diplomove-prace-frantisek.jpg',
    alt: 'František – Korektura, stylistika',
    name: 'František',
    role: 'Korektura, stylistika',
  },
  {
    img: '/images/clenove/korektura-diplomove-prace-eva.png',
    alt: 'Eva – Sociální sítě, úprava citací',
    name: 'Eva',
    role: 'Sociální sítě, úprava citací',
  },
  {
    img: '/images/clenove/korektura-diplomove-prace-jakub.jpg',
    alt: 'Jakub – Překlady, formátování',
    name: 'Jakub',
    role: 'Překlady, formátování',
  },
]

export default function Team() {
  return (
    <section
      id="tym"
      style={{
        backgroundImage: 'url(/images/nas-tym-pozadi.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 40%',
      }}
    >
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">

          {/* Heading block */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
            <div className="flex-1">
              <h2 className="section-title text-navy mb-3">Kdo stojí za korekturou vaší diplomky?</h2>
              <div className="h-1 w-14 mb-4" style={{ backgroundColor: '#1a7a68' }} />
              <p className="text-lg leading-relaxed max-w-xl text-text-dark">
                Tým zkušených korektorů a jazykových specialistů, kteří každý den pracují
                s akademickými texty. Postaráme se o kompletní jazykovou a stylistickou
                úpravu vaší diplomové práce – od gramatiky přes interpunkci po slovosled.
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <Image
                src="/images/icons/korektura-stylistika-diplomove-prace.png"
                alt="Korektura a stylistika diplomové práce"
                width={80}
                height={80}
                className="object-contain"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
          </div>

          {/* Team members grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
            {members.map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center">
                {/* Photo */}
                <div
                  className="relative rounded overflow-hidden shadow-lg mb-2 border-2 border-gray-200"
                  style={{ width: '80px', height: '80px' }}
                >
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                    quality={90}
                  />
                </div>

                {/* Name + role */}
                <div
                  className="w-full px-1 py-1.5 rounded"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                  <div className="font-headings font-bold text-navy text-sm leading-tight">
                    {m.name}
                  </div>
                  <div className="text-xs mt-0.5 leading-tight text-text-dark">
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

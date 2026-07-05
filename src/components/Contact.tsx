import { site } from '@/site.config'

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a68" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8l10 7 10-7" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a68" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}
function IconLocation() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a68" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
function IconCompany() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a68" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  )
}

const contactItems = [
  {
    Icon: IconMail,
    label: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    Icon: IconPhone,
    label: site.phoneDisplay,
    href: `tel:${site.phone}`,
    external: false,
  },
  {
    Icon: IconLocation,
    label: site.address.display,
    href: site.address.mapsUrl,
    external: true,
  },
  {
    Icon: IconCompany,
    label: `IČO: ${site.legal.company.ico}`,
    href: site.legal.registerUrl,
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="zastihnout" className="py-20" style={{ backgroundColor: '#0d1f2d' }}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading + teal accent line */}
        <div className="text-center mb-10">
          <h2 className="section-title text-white mb-3">Ozvěte se nám</h2>
          <div className="flex justify-center mb-5">
            <div className="h-1 w-16" style={{ backgroundColor: '#1a7a68' }} />
          </div>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Máte dotaz ohledně korektury diplomové práce? Napište nebo zavolejte.
          </p>
        </div>

        {/* Contact items – 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 max-w-2xl mx-auto mb-10">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-3 py-4 group"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(26,122,104,0.14)' }}
                >
                  <item.Icon />
                </span>
                <span className="text-sm group-hover:underline" style={{ textDecorationColor: '#1a7a68' }}>
                  {item.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="#objednavka" className="btn-primary" title="Objednat korekturu diplomové práce">
            Objednat
          </a>
        </div>
      </div>
    </section>
  )
}

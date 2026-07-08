import { site } from '@/site.config'

const faqs = [
  {
    q: 'Co korektura diplomové práce zahrnuje?',
    a: 'Opravíme pravopis, gramatiku, interpunkci, překlepy a shodu podmětu s přísudkem. V rámci stylistiky upravíme neobratné formulace, slovosled a opakující se slova tak, aby text zněl přirozeně a odborně. Do odborného obsahu, argumentace ani zdrojů nezasahujeme – práce zůstává vaše. Všechny úpravy vyznačujeme v režimu revizí, takže každou změnu vidíte a můžete ji přijmout, nebo odmítnout.',
  },
  {
    q: 'Kolik stojí korektura diplomové práce?',
    a: `Korektura a stylistika stojí ${site.pricing.mainService.price} Kč za normostranu (1 800 znaků včetně mezer). Formátování podle směrnice školy vychází na 40–50 Kč za normostranu podle zvoleného termínu. Přesnou cenu se dozvíte předem – po nahrání práce vám zdarma a nezávazně spočítáme rozsah a pošleme nabídku. Platí se až po dokončení, převodem na účet.`,
  },
  {
    q: 'Jak rychle korekturu zvládnete?',
    a: 'Standardní termín se odvíjí od rozsahu práce – běžnou diplomovou práci o 60–100 stranách zvládáme obvykle do několika dnů. Pokud hoří termín odevzdání, nabízíme expresní zpracování do 24 hodin (podle aktuální kapacity). Konkrétní termín vám potvrdíme při nacenění a je pro nás závazný.',
  },
  {
    q: 'Je bezpečné nahrát diplomovou práci online?',
    a: 'Ano. Soubory se přenášejí šifrovaně a ukládají se v zabezpečeném úložišti, ze kterého se automaticky mažou nejpozději po 14 dnech. S textem pracuje pouze korektor, který má práci na starosti – nikomu dalšímu ji nepředáváme ani ji nikde nezveřejňujeme. Diskrétnost je pro nás samozřejmost.',
  },
  {
    q: 'Jak spolupráce probíhá?',
    a: 'Nahrajete práci přes objednávkový formulář, my ji zdarma naceníme a pošleme vám nabídku s termínem. Po vašem odsouhlasení začneme s korekturou. Hotový text dostanete e-mailem s vyznačenými revizemi i v čisté verzi. Pokud máte k úpravám připomínky, doladíme je. Platba probíhá až na závěr, na základě faktury.',
  },
  {
    q: 'V jakém formátu mám práci poslat?',
    a: 'Nejlépe ve Wordu (DOC/DOCX) – v něm opravy vyznačíme v režimu revizí. Přijímáme ale i PDF, ODT, RTF a další běžné formáty; s formátem si poradíme a případně se domluvíme na nejvhodnějším řešení. K práci můžete rovnou přiložit i směrnici školy, pokud chcete zkontrolovat či upravit také formální stránku.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Faq() {
  return (
    <section id="faq" className="py-20" style={{ backgroundColor: '#0d1f2d' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-white mb-4">Na co se studenti ptají nejčastěji</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vše podstatné o ceně, termínech i průběhu korektury na jednom místě.
            Nenašli jste odpověď? Napište nám na{' '}
            <a href={`mailto:${site.email}`} className="underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.9)', textDecorationColor: '#1a7a68' }}>
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="p-7 border-t-2" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: '#1a7a68' }}>
              <h3 className="font-headings font-bold text-white text-base mb-3 leading-snug">
                {f.q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { PT_Sans, Source_Sans_3 } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import CookieConsent from '@/components/CookieConsent'
import ScrollToTop from '@/components/ScrollToTop'
import { site } from '@/site.config'
import './globals.css'

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-pt-sans',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Korektura diplomové práce | Jazyková a stylistická korektura',
  description:
    'Odborná korektura diplomové práce zaměřená na gramatiku, stylistiku i celkovou jazykovou úroveň textu. Spolehlivé zpracování, individuální přístup a návazné služby pro studenty vysokých škol.',
  metadataBase: new URL(site.url),
  alternates: {
    canonical: `${site.url}/`,
  },
  authors: [{ name: site.domain }],
  robots: {
    index: true,
    follow: true,
    googleBot: { 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: `${site.url}/`,
    siteName: site.name,
    title: 'Korektura diplomové práce | Jazyková a stylistická korektura',
    description:
      'Odborná korektura diplomové práce zaměřená na gramatiku, stylistiku i celkovou jazykovou úroveň textu. Spolehlivé zpracování, individuální přístup a návazné služby pro studenty vysokých škol.',
    images: [
      {
        url: `${site.url}/images/korektura-diplomove-prace.jpg`,
        width: 1200,
        height: 630,
        alt: 'Korektura diplomové práce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korektura diplomové práce | Jazyková a stylistická korektura',
    description:
      'Odborná korektura diplomové práce zaměřená na gramatiku, stylistiku i celkovou jazykovou úroveň textu.',
    images: [`${site.url}/images/korektura-diplomove-prace.jpg`],
  },
  icons: {
    icon: [{ url: '/images/favicon.ico', type: 'image/x-icon' }],
  },
  other: {
    'format-detection': 'telephone=no',
    'content-language': 'cs',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      email: site.email,
      telephone: site.phone,
      logo: `${site.url}/images/logo-korektura-diplomove-prace.png`,
      image: `${site.url}/images/korektura-diplomove-prace.jpg`,
      priceRange: '40–75 Kč za normostranu',
      sameAs: [site.social.facebook, site.social.instagram],
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        postalCode: site.address.zip,
        addressCountry: site.address.country,
      },
      areaServed: ['CZ', 'SK'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: site.email,
        telephone: site.phone,
        availableLanguage: ['cs', 'sk'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Služby pro diplomové práce',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Korektura a stylistika diplomové práce' },
            price: String(site.pricing.mainService.price),
            priceCurrency: 'CZK',
          },
          {
            '@type': 'AggregateOffer',
            itemOffered: { '@type': 'Service', name: 'Formátování diplomové práce' },
            lowPrice: '40',
            highPrice: '50',
            priceCurrency: 'CZK',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Kontrola plagiátorství' },
            price: '390',
            priceCurrency: 'CZK',
          },
          {
            '@type': 'AggregateOffer',
            itemOffered: { '@type': 'Service', name: 'Překlad abstraktu do angličtiny nebo němčiny' },
            lowPrice: '490',
            highPrice: '590',
            priceCurrency: 'CZK',
          },
          {
            '@type': 'AggregateOffer',
            itemOffered: { '@type': 'Service', name: 'Tisk a vazba diplomové práce' },
            lowPrice: '950',
            highPrice: '1050',
            priceCurrency: 'CZK',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Písemné doporučení k diplomové práci' },
            price: '1500',
            priceCurrency: 'CZK',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Tvorba prezentace k obhajobě' },
            price: '2500',
            priceCurrency: 'CZK',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      inLanguage: 'cs',
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      name: 'Korektura diplomové práce | Jazyková a stylistická korektura',
      url: `${site.url}/`,
      description:
        'Jazyková a stylistická korektura diplomové práce pro studenty, kteří chtějí odevzdat text v profesionální a bezchybné podobě.',
      inLanguage: 'cs',
      isPartOf: { '@id': `${site.url}/#website` },
    },
    {
      '@type': 'Service',
      '@id': `${site.url}/#service`,
      name: 'Korektura diplomové práce',
      serviceType: 'Jazyková a stylistická korektura diplomových prací',
      areaServed: 'Czech Republic',
      availableLanguage: ['cs', 'sk'],
      provider: { '@id': `${site.url}/#organization` },
      offers: {
        '@type': 'Offer',
        name: site.pricing.mainService.name,
        price: String(site.pricing.mainService.price),
        priceCurrency: site.pricing.mainService.currency,
        unitText: site.pricing.mainService.unit,
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${ptSans.variable} ${sourceSans3.variable}`}>
      <head>
        <meta httpEquiv="content-language" content="cs" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script id="consent-mode-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage:         'denied',
            analytics_storage:  'denied',
            ad_user_data:       'denied',
            ad_personalization: 'denied',
            wait_for_update:    2000
          });
        `}</Script>

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <ScrollToTop />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}

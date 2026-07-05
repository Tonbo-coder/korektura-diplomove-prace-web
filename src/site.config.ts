/**
 * Centrální konfigurace webu.
 *
 * Při klonování na další microsite se mění POUZE tento soubor
 * (+ texty v komponentách, obrázky a právní stránky).
 * Texty (nadpisy, popisy, meta descriptions) sem záměrně nepatří —
 * každý web je musí mít unikátní, jinak hrozí duplicitní obsah.
 */

export const site = {
  name: 'Korektura diplomové práce',
  domain: 'korektura-diplomove-prace.cz',
  url: 'https://korektura-diplomove-prace.cz',

  email: 'info@korektura-diplomove-prace.cz',
  phone: '+420736729646',
  phoneDisplay: '+420 736 729 646',

  gtmId: 'GTM-KCT4VB4X',

  social: {
    facebook: 'https://www.facebook.com/profiformatovani.cz',
    instagram: 'https://www.instagram.com/profiformatovani.cz/',
  },

  address: {
    street: 'Václavské náměstí 66/808',
    city: 'Praha 1',
    zip: '110 00',
    country: 'CZ',
    display: 'Václavské náměstí 66/808, Praha 1 – 110 00',
    mapsUrl:
      'https://www.google.cz/maps/place/V%C3%A1clavsk%C3%A9+n%C3%A1m.+808%2F66,+110+00+Praha+1',
  },

  legal: {
    company: {
      name: 'Prodocum, s.r.o.',
      ico: '10745041',
      address: 'Korunní 2569/108, 101 00 Praha',
    },
    owner: {
      name: 'Bc. Antonín Bouchal',
      ico: '04484631',
      address: 'Václavské náměstí 808/66, 110 00 Praha',
    },
    registerUrl:
      'https://or.justice.cz/ias/ui/rejstrik-firma.vysledky?subjektId=1118356&typ=UPLNY',
  },

  pricing: {
    mainService: {
      name: 'Korektura a stylistika',
      price: 75,
      currency: 'CZK',
      unit: 'normostrana',
    },
  },
} as const

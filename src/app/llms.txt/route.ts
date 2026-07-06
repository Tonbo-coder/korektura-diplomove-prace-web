import { site } from '@/site.config'

export const dynamic = 'force-static'

export function GET() {
  const body = `# ${site.name}
> Jazyková a stylistická korektura diplomových prací pro studenty vysokých škol v Česku a na Slovensku. Kromě korektury nabízíme formátování dle směrnic škol, úpravu citací, kontrolu originality, překlad abstraktu, tisk a vazbu i tvorbu prezentace k obhajobě.

## Služby a ceny
- Korektura a stylistika diplomové práce: ${site.pricing.mainService.price} Kč za normostranu (1 normostrana = 1 800 znaků včetně mezer). Oprava pravopisu, gramatiky, interpunkce, překlepů a stylistiky; do odborného obsahu nezasahujeme.
- Formátování dle směrnice školy: 40–50 Kč za normostranu podle termínu (Standard do 4 dnů, Smart do 2 dnů, Express do 24 hodin).
- Kontrola plagiátorství (originality): 390 Kč.
- Překlad abstraktu do angličtiny nebo němčiny: 490–590 Kč.
- Tisk a pevná vazba diplomové práce: cca 950–1050 Kč za kus.
- Písemné doporučení (rozbor práce s komentáři): cca 1500 Kč.
- Tvorba prezentace k obhajobě: cca 2500 Kč.
- Každou službu lze objednat i samostatně.

## Postup a termíny
- Objednávka probíhá online přes formulář: student nahraje práci (Word, PDF a další formáty) a případně směrnici školy.
- Nacenění je zdarma a nezávazné; nabídku s cenou a termínem zasíláme obratem e-mailem.
- Po odsouhlasení nabídky začíná korektura. Hotový text vracíme s vyznačenými revizemi i v čisté verzi.
- Expresní zpracování je možné do 24 hodin podle kapacity.
- Platba probíhá až po dokončení, převodem na účet na základě faktury.
- Nahrané soubory jsou uloženy v zabezpečeném úložišti a automaticky se mažou nejpozději po 14 dnech.

## Hlavní stránky
- [Homepage](${site.url}/): služby, ceník, postup spolupráce, reference studentů, časté dotazy a objednávkový formulář.
- [Ochrana osobních údajů](${site.url}/ochrana-osobnich-udaju): nakládání s osobními údaji a nahranými soubory dle GDPR.
- [Obchodní podmínky](${site.url}/obchodni-podminky): podmínky služby, průběh objednávky a reklamace.

## Kontakt a provozovatel
- E-mail: ${site.email}
- Telefon: ${site.phoneDisplay}
- Adresa: ${site.address.display}
- Provozovatel: ${site.legal.company.name}, IČO ${site.legal.company.ico}, ${site.legal.company.address}.
- Působnost: Česká republika a Slovensko.
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

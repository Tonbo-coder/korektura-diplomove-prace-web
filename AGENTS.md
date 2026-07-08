# AGENTS.md — Korektura diplomové práce

## O projektu

Komerční web pro služby korektur a formátování diplomových prací. Zákazník vyplní objednávkový formulář, nahraje soubory a obdrží potvrzovací e-mail. Provozovatel dostane notifikaci s přílohami ke zpracování.

## Stack

| Vrstva | Technologie |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Jazyk | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Hosting | Vercel |
| File storage | Vercel Blob |
| E-mail | Nodemailer + SMTP |
| Analytika | Vercel Analytics, Google Tag Manager |
| Obrázky | Lokální v `public/images` + next/image |

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx                        # Homepage (skládá sekce)
│   ├── layout.tsx                      # Root layout (SEO, GTM, fonty, JSON-LD)
│   ├── globals.css
│   ├── dekujeme-za-objednavku/page.tsx # Poděkování po objednávce
│   ├── dekujeme-za-hodnoceni/page.tsx  # Poděkování po hodnocení
│   ├── obchodni-podminky/              # Právní stránka
│   ├── ochrana-osobnich-udaju/         # Právní stránka
│   └── api/
│       ├── contact/route.ts            # Zpracování objednávky + odesílání e-mailů
│       ├── blob-upload/route.ts        # Upload souborů do Vercel Blob
│       ├── review/route.ts             # Zpracování hodnocení
│       └── cron/cleanup-blobs/route.ts # Automatické čištění starých souborů (14 dní)
└── components/
    ├── OrderForm.tsx       # Hlavní objednávkový formulář (3 sekce: kontakt, soubory, termín)
    ├── ReviewForm.tsx      # Hodnoticí formulář (na stránce poděkování)
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── TrustBar.tsx
    ├── Pricing.tsx
    ├── Services.tsx
    ├── Process.tsx
    ├── Testimonials.tsx
    ├── Gallery.tsx
    ├── Team.tsx
    ├── Universities.tsx
    ├── Contact.tsx
    ├── Footer.tsx
    ├── CookieConsent.tsx
    └── LegalLayout.tsx
```

## Klíčové toky

### Objednávka
1. Zákazník vyplní `OrderForm.tsx`
2. Soubory se nahrají do Vercel Blob (`/api/blob-upload`)
3. Formulář POSTuje JSON na `/api/contact`
4. API odešle 2 e-maily: interní notifikace + potvrzení zákazníkovi
5. Redirect na `/dekujeme-za-objednavku`

### Čištění souborů
- Cron job (`/api/cron/cleanup-blobs`) maže soubory starší 14 dní

## Bezpečnostní pravidla

**Nikdy neporušuj bez výslovného písemného souhlasu:**

- **Neměň formulářovou ani e-mailovou logiku** (`OrderForm.tsx`, `api/contact/route.ts`) bez potvrzení — chyba může způsobit ztrátu objednávek.
- **Nespouštěj reálné objednávky ani e-maily** v průběhu vývoje nebo testování.
- **Necommituj `.env`, `.env.local` ani žádné citlivé údaje** (SMTP hesla, Blob tokeny, API klíče).
- **Nezasahuj do produkčního prostředí Vercel** bez potvrzení.

## Pracovní pravidla

- **Větší změna = nejdřív plán.** Před refaktorem, přidáním funkce nebo změnou API navrhni postup a počkej na souhlas.
- **Pracuj v branchi, ne přímo do `main`.** Pro každou větší změnu vytvoř feature branch.
- **Zachovej URL strukturu a SEO.** Nesmazávej ani nepřejmenovávej existující routes bez konzultace — stránky mohou být indexované a prolinkované.
- **Neupravuj `layout.tsx` metadata ani JSON-LD** bez konzultace — ovlivňuje SEO a strukturovaná data.
- **Žádné komentáře do kódu** pokud důvod není neintuitivní. Dobré pojmenování je lepší než komentáře.

## Prostředí

```
npm run dev    # vývojový server (localhost:3000)
npm run build  # produkční build
npm run start  # spuštění produkčního buildu
```

Vyžadované env proměnné (nikdy necommitovat):
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — e-mail
- `EMAIL_FROM`, `ORDER_TO_EMAIL` — e-mailové adresy
- `CRON_SECRET` — autorizace cron jobu `/api/cron/cleanup-blobs`

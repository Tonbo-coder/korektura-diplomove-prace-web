import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'
import { site } from '@/site.config'

export const metadata: Metadata = {
  title: `Ochrana osobních údajů – ${site.name}`,
  description: `Zásady ochrany osobních údajů webu ${site.domain} dle GDPR.`,
  robots: { index: false, follow: false },
}

export default function OchranaOsobnichUdajuPage() {
  return (
    <LegalLayout title="Ochrana osobních údajů" lastUpdated="2026">
      <div className="prose-legal">

        <h2>Správce osobních údajů</h2>
        <p>Správcem osobních údajů jsou:</p>
        <p>
          <strong>{site.legal.company.name}</strong>, IČO: {site.legal.company.ico}, se sídlem {site.legal.company.address}<br />
          a<br />
          <strong>{site.legal.owner.name}</strong>, IČO: {site.legal.owner.ico}, se sídlem {site.legal.owner.address}
        </p>
        <p>(dále jen „Správce").</p>
        <p>
          Správce zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR).
        </p>

        <h2>Rozsah zpracovávaných osobních údajů</h2>
        <p>Správce zpracovává osobní údaje, které mu poskytnete v souvislosti s využitím služeb, zejména:</p>
        <ul>
          <li>jméno a příjmení</li>
          <li>e‑mailová adresa</li>
          <li>telefonní číslo</li>
          <li>případně další údaje uvedené ve formuláři nebo v zaslaných dokumentech</li>
        </ul>
        <p>
          V rámci poskytovaných služeb může dojít také ke zpracování údajů obsažených v zaslaných
          souborech (např. texty závěrečných prací).
        </p>

        <h2>Účel zpracování osobních údajů</h2>
        <p>Osobní údaje jsou zpracovávány za účelem:</p>
        <ul>
          <li>vyřízení objednávky a poskytování služeb</li>
          <li>komunikace s klientem</li>
          <li>zaslání cenové nabídky a souvisejících informací</li>
          <li>vyřízení případných reklamací</li>
          <li>zasílání obchodních sdělení a nabídek služeb (pokud je to relevantní)</li>
        </ul>

        <h2>Právní základ zpracování</h2>
        <p>Zpracování osobních údajů probíhá na základě:</p>
        <ul>
          <li>plnění smlouvy (poskytnutí služby)</li>
          <li>oprávněného zájmu správce (např. navazující komunikace se zákazníkem)</li>
          <li>případně souhlasu (např. zasílání newsletteru)</li>
        </ul>

        <h2>Doba uchování osobních údajů</h2>
        <p>Osobní údaje jsou uchovávány:</p>
        <ul>
          <li>po dobu trvání smluvního vztahu</li>
          <li>po jeho ukončení po dobu nezbytnou k ochraně práv a oprávněných zájmů (max. 3 roky)</li>
          <li>v případě marketingových aktivit nejdéle po dobu 5 let nebo do odvolání souhlasu</li>
        </ul>

        <h2>Předávání osobních údajů třetím stranám</h2>
        <p>
          Správce může osobní údaje předávat třetím stranám, které zajišťují dílčí služby, zejména:
        </p>
        <ul>
          <li>dalším spolupracujícím subjektům nezbytným pro realizaci služby</li>
          <li><strong>Vercel Inc.</strong> (vercel.com) – poskytovatel hostingu webu a úložiště nahraných souborů (Vercel Blob), ve kterém jsou dočasně uloženy soubory zaslané v rámci objednávky (např. diplomové práce). Soubory jsou uchovávány po dobu nezbytnou ke zpracování zakázky a automaticky mazány nejpozději po 14 dnech. Vercel splňuje standard SOC 2 Type 2.</li>
          <li>poskytovateli e‑mailových služeb, jehož prostřednictvím probíhá e‑mailová komunikace související s objednávkou</li>
        </ul>
        <p>
          Tyto subjekty zpracovávají osobní údaje výhradně na základě pokynů správce a jsou vázány
          povinností mlčenlivosti a zabezpečení údajů.
        </p>

        <h2>Zabezpečení osobních údajů</h2>
        <p>
          Správce přijal technická a organizační opatření k zabezpečení osobních údajů proti
          neoprávněnému přístupu, ztrátě nebo zneužití.
        </p>

        <h2>Práva subjektu údajů</h2>
        <p>Jako subjekt údajů máte právo:</p>
        <ul>
          <li>požadovat přístup ke svým osobním údajům</li>
          <li>požadovat opravu nepřesných údajů</li>
          <li>požadovat výmaz osobních údajů</li>
          <li>požadovat omezení zpracování</li>
          <li>vznést námitku proti zpracování</li>
          <li>podat stížnost u dozorového úřadu</li>
        </ul>
        <p>Dozorovým úřadem je Úřad pro ochranu osobních údajů.</p>

        <h2>Zasílání obchodních sdělení</h2>
        <p>
          Správce může zasílat obchodní sdělení týkající se vlastních služeb na základě oprávněného
          zájmu nebo uděleného souhlasu.
        </p>
        <p>
          Uživatel má vždy možnost se z odběru těchto sdělení odhlásit, a to prostřednictvím odkazu
          v e‑mailu nebo kontaktováním správce.
        </p>

        <h2>Kontakt</h2>
        <p>
          V případě dotazů týkajících se zpracování osobních údajů nás můžete kontaktovat na
          e‑mailové adrese:{' '}
          <a href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>

        <h2>Závěrečná ustanovení</h2>
        <p>
          Tyto zásady mohou být průběžně aktualizovány. Aktuální verze je vždy dostupná na
          webových stránkách správce.
        </p>

      </div>
    </LegalLayout>
  )
}

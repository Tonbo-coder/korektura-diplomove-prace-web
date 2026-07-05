import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'
import { site } from '@/site.config'

export const metadata: Metadata = {
  title: `Obchodní podmínky – ${site.name}`,
  description: `Obchodní podmínky pro využití služeb ${site.domain}.`,
  robots: { index: false, follow: false },
}

export default function ObchodniPodminkyPage() {
  return (
    <LegalLayout title="Obchodní podmínky" lastUpdated="2026">
      <div className="prose-legal">

        <h2>Úvodní ustanovení</h2>
        <p>Tyto obchodní podmínky upravují práva a povinnosti mezi:</p>
        <p>
          <strong>{site.legal.company.name}</strong>, IČO: {site.legal.company.ico}, se sídlem {site.legal.company.address}<br />
          a<br />
          <strong>{site.legal.owner.name}</strong>, IČO: {site.legal.owner.ico}, se sídlem {site.legal.owner.address}
        </p>
        <p>(dále jen „Poskytovatel") a klientem (dále jen „Klient").</p>

        <h2>Terminologie</h2>
        <ul>
          <li><strong>Klient</strong> – osoba, která objednává úpravu písemné práce.</li>
          <li><strong>Objednávka</strong> – formulář obsahující povinné údaje (zejména jméno a e‑mail) a případně další informace, jako telefonní kontakt, termín dodání, specifikace služby či nahrané dokumenty.</li>
          <li><strong>Směrnice</strong> – požadavky dané školy nebo instituce na formální úpravu práce.</li>
          <li><strong>Šablona</strong> – dokument definující formát a vzhled práce.</li>
          <li><strong>Normostrana (NS)</strong> – standardizovaná strana textu o rozsahu 1 800 znaků včetně mezer.</li>
          <li><strong>Smluvní vztah</strong> – vzniká mezi Klientem a Poskytovatelem na základě potvrzené objednávky.</li>
          <li><strong>Předmět služby</strong> – úprava písemné práce (diplomové, bakalářské a jiné).</li>
        </ul>

        <h2>Způsob objednání a vznik smlouvy</h2>
        <p>Klient objednává službu prostřednictvím webového formuláře.</p>
        <p>
          Po odeslání objednávky obdrží potvrzení o jejím přijetí, které nepředstavuje závazné
          přijetí zakázky. Následně je Klientovi zaslána cenová kalkulace.
        </p>
        <p>Smluvní vztah vzniká jejím potvrzením ze strany Klienta.</p>
        <p>
          Poskytovatel si vyhrazuje právo objednávku nepřijmout, zejména z důvodu kapacity,
          nesplnitelných požadavků nebo nevhodně stanoveného termínu.
        </p>

        <h2>Charakter služby a průběh úprav</h2>
        <p>
          Úprava textových dokumentů má individuální charakter a může existovat více správných
          způsobů zpracování.
        </p>
        <p>
          Je běžné, že po dodání práce má Klient další připomínky nebo požadavky na úpravy.
          Tyto mohou být následně zapracovány dle dohody.
        </p>
        <p>
          Hodnocení textu může být subjektivní. Klient je proto povinen předem sdělit všechny
          důležité požadavky (např. od vedoucího práce nebo školy).
        </p>
        <p>Dodatečné požadavky po odevzdání mohou být řešeny jako další úpravy dle dohody.</p>

        <h2>Dodací a platební podmínky</h2>
        <p>Není-li dohodnuto jinak, orientační termíny dodání jsou:</p>
        <ul>
          <li>do 4 dnů při volbě „Standard"</li>
          <li>do 2 dnů při volbě „Express"</li>
          <li>do 24 hodin nebo následující den při volbě „Speed Express" (dle kapacity)</li>
        </ul>
        <p>Přesný termín je vždy potvrzen při nacenění objednávky.</p>
        <p>
          Po dokončení je práce zaslána e‑mailem, zpravidla ve formátu MS Word nebo PDF.
          Platba probíhá bankovním převodem na základě vystavené faktury.
        </p>

        <h2>Reklamace a jejich uplatnění</h2>
        <p>Klient je povinen oznámit vady bez zbytečného odkladu.</p>
        <p>
          Pokud Klient do dokumentu po dodání zasahuje (např. přeformátování), nelze na takto
          upravený dokument uplatnit reklamaci. Poskytovatel má právo vadu odstranit v přiměřené lhůtě.
        </p>
        <p>Reklamaci nelze uplatnit v případě, že:</p>
        <ul>
          <li>Klient neposkytl potřebné podklady (směrnice, šablona apod.)</li>
          <li>Klient neupozornil na nedostatky bezprostředně po jejich zjištění</li>
          <li>nedostatky vyplývají z individuálních požadavků, které nebyly předem sděleny</li>
        </ul>

        <h2>Storno podmínky</h2>
        <p>Objednávka je považována za závaznou po jejím potvrzení.</p>
        <p>Klient má právo objednávku zrušit.</p>
        <p>
          Pokud již bylo započato plnění, může být účtován storno poplatek odpovídající rozsahu
          provedené práce (obvykle do 50 % ceny). Pokud byla práce dokončena, nelze objednávku zrušit.
        </p>

        <h2>Dodatek dle jednotlivých služeb</h2>

        <h3>Formátování</h3>
        <p>Minimální cena služby je 1 000 Kč.</p>
        <p>
          Služba zahrnuje úpravu dokumentu dle požadavků klienta nebo dodané směrnice (nastavení
          stylů, okrajů, nadpisů, číslování, titulkování, obsah apod.).
        </p>
        <p>
          Pokud Klient neposkytne potřebné podklady, Poskytovatel vychází z dostupných šablon,
          což může vést k odlišnostem. Služba nezahrnuje kompletní jazykovou korekturu.
        </p>

        <h3>Korektura a stylistika</h3>
        <p>Poskytovatel provádí úpravy na základě dodaného textu.</p>
        <p>
          Služba nezahrnuje kompletní přepis textu. Výsledná kvalita závisí na kvalitě vstupního textu.
          Je možné, že i po úpravě nebude text plně odpovídat všem požadavkům vedoucího nebo oponenta.
          Reklamace se vztahuje pouze na zjevné chyby, nikoli na subjektivní stylistické preference.
        </p>

        <h3>Tvorba citací a seznamu zdrojů</h3>
        <p>Služba zahrnuje úpravu citací pouze u označených částí textu.</p>
        <p>
          Klient je povinen dodat potřebné údaje (např. autor, název, rok, URL, ISBN).
          Poskytovatel neodpovídá za chybějící nebo nesprávně dodané podklady.
        </p>

        <h3>Kontrola plagiátorství</h3>
        <p>Kontrola probíhá pomocí dostupných nástrojů.</p>
        <p>Poskytovatel nemůže garantovat shodu výsledků s univerzitními systémy.</p>

        <h3>Tvorba prezentace</h3>
        <p>Služba zahrnuje vytvoření prezentace na základě dodaných podkladů.</p>
        <p>Poskytovatel neodpovídá za věcnou správnost obsahu.</p>

        <h3>Tisk a vazba</h3>
        <p>
          Klient je povinen schválit finální verzi dokumentu.
          Po schválení nelze uplatnit reklamaci na obsah ani formát.
        </p>

        <h3>Zpracování šablony</h3>
        <p>Služba zahrnuje vytvoření nebo úpravu šablony dle požadavků Klienta.</p>
        <p>Poskytovatel odpovídá za technické provedení, nikoli za obsah dokumentu.</p>

        <h2>Závěrečná ustanovení</h2>
        <p>Právní vztahy se řídí právním řádem České republiky, zejména občanským zákoníkem.</p>
        <p>Poskytovatel nenese odpovědnost za konečné hodnocení práce.</p>
        <p>
          Zásady zpracování osobních údajů jsou uvedeny{' '}
          <a href="/ochrana-osobnich-udaju">samostatně</a>.
        </p>
        <p>Tyto obchodní podmínky mohou být aktualizovány.</p>

      </div>
    </LegalLayout>
  )
}

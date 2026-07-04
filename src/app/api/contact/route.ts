import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { escapeHtml, isSameOrigin, isValidEmail, sanitizeBlobUrls } from '@/lib/api-utils'

const MIN_SUBMIT_TIME_MS = 3000
const MAX_FILES = 5

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Neplatný požadavek.' }, { status: 403 })
    }

    const body = await request.json()
    const { name, email, phone, message, services, deadline, fileUrls, newsletterConsent, website, elapsedMs } = body

    // Honeypot a příliš rychlé odeslání = bot; odpovídáme úspěchem bez odeslání e-mailů
    const isSpam =
      (typeof website === 'string' && website.trim() !== '') ||
      typeof elapsedMs !== 'number' ||
      elapsedMs < MIN_SUBMIT_TIME_MS

    if (isSpam) {
      return NextResponse.json({ success: true })
    }

    if (typeof name !== 'string' || !name.trim() || name.length > 200) {
      return NextResponse.json({ error: 'Vyplňte prosím jméno.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Zadejte prosím platnou e-mailovou adresu.' }, { status: 400 })
    }

    const safeName = escapeHtml(name.trim().slice(0, 200))
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(typeof phone === 'string' ? phone.slice(0, 50) : '')
    const safeMessage = escapeHtml(typeof message === 'string' ? message.slice(0, 5000) : '')
    const safeDeadline = escapeHtml(typeof deadline === 'string' ? deadline.slice(0, 100) : '')
    const safeServices = Array.isArray(services)
      ? services
          .filter((s): s is string => typeof s === 'string')
          .slice(0, 20)
          .map((s) => escapeHtml(s.slice(0, 100)))
      : []
    const safeFileUrls = sanitizeBlobUrls(fileUrls, MAX_FILES)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const newsletterRow = newsletterConsent
      ? `<tr><td style="padding:10px 8px;font-weight:bold;background:#fff3cd;">📧 NEWSLETTER</td><td style="padding:10px 8px;background:#fff3cd;font-weight:bold;color:#856404;">✅ ANO – lze přidat do databáze</td></tr>`
      : `<tr><td style="padding:10px 8px;font-weight:bold;background:#f8d7da;">📧 NEWSLETTER</td><td style="padding:10px 8px;background:#f8d7da;font-weight:bold;color:#721c24;">❌ NE – nepřidávat do databáze</td></tr>`

    const filesHtml = safeFileUrls.length
      ? safeFileUrls.map((url) => {
          const fileName = escapeHtml(decodeURIComponent(url.split('/').pop() ?? url))
          return `<a href="${escapeHtml(url)}" style="color:#1a7a68;">${fileName}</a>`
        }).join('<br>')
      : '–'

    // ── E-mail pro firmu (interní notifikace) ──
    const htmlBody = `
      <h2>Nová objednávka z korektura-diplomove-prace.cz</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Jméno</td><td style="padding:8px;">${safeName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Email</td><td style="padding:8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Telefon</td><td style="padding:8px;">${safePhone || '–'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Zpráva</td><td style="padding:8px;">${safeMessage || '–'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Datum vyhotovení</td><td style="padding:8px;">${safeDeadline || '–'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Další služby</td><td style="padding:8px;">${safeServices.length ? safeServices.join(', ') : '–'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#eaf4f1;">Soubory</td><td style="padding:8px;">${filesHtml}</td></tr>
        ${newsletterRow}
      </table>
      ${safeFileUrls.length ? '<p style="color:#666;font-size:12px;margin-top:12px;">⚠️ Soubory budou automaticky smazány po 14 dnech.</p>' : ''}
    `

    // ── Potvrzující e-mail zákazníkovi ──
    const confirmHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        <div style="background:#0d1f2d;padding:24px 32px;">
          <h1 style="color:#ffffff;font-size:20px;margin:0;">Korektura diplomové práce</h1>
        </div>
        <div style="padding:32px;background:#ffffff;">
          <p style="font-size:16px;margin-top:0;">Dobrý den, <strong>${safeName}</strong>,</p>
          <p>děkujeme za Vaši objednávku korektury diplomové práce. Vaši poptávku jsme úspěšně přijali a budeme se jí věnovat co nejdříve.</p>

          <div style="background:#f8faf9;border-left:4px solid #1a7a68;padding:16px 20px;margin:24px 0;">
            <p style="margin:0 0 8px;font-weight:bold;color:#1a7a68;">Shrnutí objednávky:</p>
            <table style="border-collapse:collapse;width:100%;font-size:14px;">
              <tr><td style="padding:4px 0;font-weight:bold;width:140px;">Termín:</td><td style="padding:4px 0;">${safeDeadline || 'Smart (do 2 dnů)'}</td></tr>
              ${safeServices.length ? `<tr><td style="padding:4px 0;font-weight:bold;">Doplňkové služby:</td><td style="padding:4px 0;">${safeServices.join(', ')}</td></tr>` : ''}
              ${safeFileUrls.length ? `<tr><td style="padding:4px 0;font-weight:bold;">Počet souborů:</td><td style="padding:4px 0;">${safeFileUrls.length}</td></tr>` : ''}
              ${safeMessage ? `<tr><td style="padding:4px 0;font-weight:bold;">Vaše zpráva:</td><td style="padding:4px 0;">${safeMessage}</td></tr>` : ''}
            </table>
          </div>

          <p><strong>Co bude následovat?</strong></p>
          <ol style="padding-left:20px;line-height:1.8;">
            <li>Projdeme Vaši práci a připravíme cenovou nabídku.</li>
            <li>Nabídku Vám zašleme e‑mailem – obvykle do několika hodin.</li>
            <li>Po Vašem odsouhlasení zahájíme korekturu.</li>
          </ol>

          <p>Pokud máte jakékoliv dotazy, neváhejte nám odpovědět na tento e‑mail nebo nás kontaktujte na <a href="mailto:info@korektura-diplomove-prace.cz" style="color:#1a7a68;">info@korektura-diplomove-prace.cz</a>.</p>

          <p style="margin-top:24px;">S pozdravem,<br><strong>Tým Korektura diplomové práce</strong></p>
        </div>
        <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center;">
          <p style="margin:0;">&copy; 2026 korektura-diplomove-prace.cz | <a href="https://korektura-diplomove-prace.cz/ochrana-osobnich-udaju" style="color:#999;">Ochrana osobních údajů</a></p>
        </div>
      </div>
    `

    // Odeslání obou e-mailů paralelně
    await Promise.all([
      // 1) Interní notifikace
      transporter.sendMail({
        from: `"Web Korektura DP" <${process.env.EMAIL_FROM}>`,
        to: process.env.ORDER_TO_EMAIL || process.env.EMAIL_FROM,
        replyTo: email,
        subject: `Nová objednávka korektury DP – ${name.trim().slice(0, 100)}`,
        html: htmlBody,
      }),
      // 2) Potvrzení zákazníkovi
      transporter.sendMail({
        from: `"Korektura diplomové práce" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Potvrzení objednávky – Korektura diplomové práce',
        html: confirmHtml,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Chyba při odeslání. Zkuste to prosím znovu nebo nás kontaktujte emailem.' }, { status: 500 })
  }
}

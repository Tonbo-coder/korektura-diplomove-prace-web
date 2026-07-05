import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { escapeHtml, isSameOrigin } from '@/lib/api-utils'
import { site } from '@/site.config'

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Neplatný požadavek.' }, { status: 403 })
    }

    const formData = await request.formData()

    // Honeypot – vyplněné pole = bot; odpovídáme úspěchem bez odeslání e-mailu
    const website = (formData.get('website') as string) ?? ''
    if (website.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const discovery = escapeHtml(((formData.get('discovery') as string) ?? '').slice(0, 200))
    const reasons = (formData.getAll('reason') as string[])
      .slice(0, 10)
      .map((r) => escapeHtml(String(r).slice(0, 200)))
    const clarity = ((formData.get('clarity') as string) ?? '').replace(/[\r\n]/g, ' ').slice(0, 100)
    const comment = escapeHtml(((formData.get('comment') as string) ?? '').slice(0, 5000))

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlBody = `
      <h2>Nové hodnocení z ${site.domain}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr>
          <td style="padding:8px;font-weight:bold;background:#eef2f0;">Kde se dozvěděli o firmě</td>
          <td style="padding:8px;">${discovery || '–'}</td>
        </tr>
        <tr>
          <td style="padding:8px;font-weight:bold;background:#eef2f0;">Důvod výběru</td>
          <td style="padding:8px;">${reasons.length ? reasons.join(', ') : '–'}</td>
        </tr>
        <tr>
          <td style="padding:8px;font-weight:bold;background:#eef2f0;">Přehlednost webu</td>
          <td style="padding:8px;">${escapeHtml(clarity) || '–'}</td>
        </tr>
        <tr>
          <td style="padding:8px;font-weight:bold;background:#eef2f0;">Komentář</td>
          <td style="padding:8px;">${comment || '–'}</td>
        </tr>
      </table>
    `

    await transporter.sendMail({
      from: `"Web Korektura DP – Hodnocení" <${process.env.EMAIL_FROM}>`,
      to: process.env.ORDER_TO_EMAIL || process.env.EMAIL_FROM,
      subject: `Nové hodnocení – přehlednost: ${clarity || 'neuvedeno'}`,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review form error:', error)
    return NextResponse.json(
      { error: 'Chyba při odeslání. Zkuste to prosím znovu nebo nás kontaktujte e‑mailem.' },
      { status: 500 }
    )
  }
}

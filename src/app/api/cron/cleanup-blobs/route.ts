import { NextResponse } from 'next/server'
import { list, del } from '@vercel/blob'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  // Ověření, že request přichází z Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000
  let deleted = 0

  try {
    let cursor: string | undefined

    do {
      const result = await list({
        prefix: 'korektura-dp/',
        cursor,
        limit: 100,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      for (const blob of result.blobs) {
        const uploadedAt = new Date(blob.uploadedAt).getTime()
        if (uploadedAt < fourteenDaysAgo) {
          await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN })
          deleted++
        }
      }

      cursor = result.cursor
    } while (cursor)

    return NextResponse.json({ success: true, deleted })
  } catch (error) {
    console.error('Blob cleanup error:', error)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}

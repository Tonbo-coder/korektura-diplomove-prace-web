import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { isSameOrigin } from '@/lib/api-utils'

const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/rtf',
  'text/rtf',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.oasis.opendocument.spreadsheet',
  'image/jpeg',
  'image/png',
  'application/zip',
  'application/x-zip-compressed',
]

const ALLOWED_EXTENSIONS = [
  '.pdf', '.doc', '.docx', '.rtf', '.odt', '.txt',
  '.xls', '.xlsx', '.ods',
  '.jpg', '.jpeg', '.png',
  '.zip',
]

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as HandleUploadBody

    // Tokeny pro upload vydáváme jen prohlížeči z vlastního webu; callback
    // blob.upload-completed přichází ze serverů Vercelu bez Origin hlavičky
    if (body.type === 'blob.generate-client-token' && !isSameOrigin(request)) {
      return NextResponse.json({ error: 'Neplatný požadavek.' }, { status: 403 })
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        // Validace přípony souboru na serveru
        const ext = pathname.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] || ''
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
          throw new Error(`Nepodporovaný typ souboru: ${ext}`)
        }

        return {
          maximumSizeInBytes: 25 * 1024 * 1024,
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
        }
      },
      onUploadCompleted: async () => {},
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Blob upload error:', error)
    return NextResponse.json(
      { error: 'Nahrání souboru se nezdařilo. Zkuste to prosím znovu.' },
      { status: 500 }
    )
  }
}

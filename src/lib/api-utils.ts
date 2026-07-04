const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 200 && EMAIL_REGEX.test(value)
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

const BLOB_URL_REGEX = /^https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\//

export function sanitizeBlobUrls(value: unknown, maxCount: number): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((url): url is string => typeof url === 'string' && BLOB_URL_REGEX.test(url))
    .slice(0, maxCount)
}

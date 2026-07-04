const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Alias undici to browser shim that exports native fetch
      // @vercel/blob/client imports fetch from undici (Node.js only)
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: path.resolve(__dirname, 'src/undici-browser-shim.js'),
      }
    }
    return config
  },
}

module.exports = nextConfig

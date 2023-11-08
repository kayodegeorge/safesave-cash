/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dv7b45oo546j4.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig

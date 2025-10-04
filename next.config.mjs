/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/calculator', permanent: false }, // 302
    ]
  },
}
export default nextConfig

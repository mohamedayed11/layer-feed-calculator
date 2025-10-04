/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/calculator', permanent: true },
    ]
  },
}
export default nextConfig

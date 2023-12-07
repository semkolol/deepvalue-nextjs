/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mvwkqxmuupvzbdqhbdao.supabase.co'],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  }
};

module.exports = nextConfig;

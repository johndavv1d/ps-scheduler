/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Desabilitar Turbopack se continuar com problemas
  // experimental: {
  //   turbo: false,
  // },
}

module.exports = nextConfig

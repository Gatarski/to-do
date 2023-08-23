/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      output: 'standalone',
      serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
  }
}

module.exports = nextConfig

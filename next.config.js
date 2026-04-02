/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  unstable_allowDynamicExport: true,

  images: {
    remotePatterns: [
      // GitHub RAW content (main data source)
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/berriescherry8-cell/mool-gyan-assets/**',
      },
      // Other domains for external content
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Disable image optimization for static export
  },
  // Capacitor configuration
  // output: 'export', // disabled for dev
  trailingSlash: true,
  distDir: 'dist',
assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
};

module.exports = nextConfig;

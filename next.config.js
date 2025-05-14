/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove unoptimized images setting as it can cause hydration issues
  images: {
    domains: ['localhost']
  },
  // Simplify experimental features
  experimental: {
    appDir: true
  },
  // Optimize webpack configuration
  webpack: (config) => {
    // Keep cache enabled for better performance
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true
          }
        }
      }
    };

    return config;
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Keep powered by header for proper WebSocket handling
  poweredByHeader: true
};

module.exports = nextConfig;
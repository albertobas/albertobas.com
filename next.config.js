/** @type {import('next').NextConfig} */

const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

const ContentSecurityPolicy = `
  default-src 'self'; 
  child-src 'self'; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data:; 
  media-src 'none'; 
  connect-src *; 
  font-src 'self'; 
  frame-ancestors 'none'; 
  base-uri 'none'; 
  form-action 'none'; 
  script-src 'self' 'unsafe-eval';
`;

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    if (!dev) {
      config.output.crossOriginLoading = 'anonymous';
      config.plugins.push(
        new SubresourceIntegrityPlugin({
          hashFuncNames: ['sha256', 'sha384'],
          enabled: true,
        })
      );
    }
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
};

module.exports = nextConfig;

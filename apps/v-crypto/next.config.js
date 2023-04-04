const withTM = require('next-transpile-modules')([
  '@villetrex/ui',
  '@villetrex/rest-client',
]);
const { i18n } = require('./next-i18next.config.js')
module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    config.module.rules.push({
      test: /\.(gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },

  async headers() {
    return [
      {
        // Force disable caching for any NextAuth api routes.
        source: '/api/auth/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: [
      'localhost',
      'media.geeksforgeeks.org'
    ],
  },
  i18n,
  trailingSlash: false,
  publicRuntimeConfig: {
    WORLD_CUP_KICK_OFF_DATE: process.env.WORLD_CUP_KICK_OFF_DATE,
    BETKING_NG: process.env.BETKING_NG,
  },
});

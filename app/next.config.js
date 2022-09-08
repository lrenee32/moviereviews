const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ['splatterandscream.s3.amazonaws.com', 'splatterandscream-dev.s3.amazonaws.com', 'image.tmdb.org', 'www.rollingstone.com', 'belcourt-production.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;

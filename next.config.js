const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Define alias '@assets' to point to the 'assets' folder at project root
      '@assets': path.resolve(__dirname, 'assets'),
    };
    return config;
  },
};

module.exports = nextConfig;

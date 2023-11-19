/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
};

// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2)$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
};

module.exports = nextConfig;

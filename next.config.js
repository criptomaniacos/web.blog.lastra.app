/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "img.youtube.com" },
      { hostname: "ghost.lastra.app" },
    ],
  },
};

module.exports = nextConfig;

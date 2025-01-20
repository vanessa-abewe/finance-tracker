/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for catching issues in React
  swcMinify: true, // For optimizing JavaScript
  images: {
    domains: ['your-image-domain.com'], // Add any external image domains if using <Image>
  },
};

module.exports = nextConfig;

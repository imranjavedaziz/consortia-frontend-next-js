/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["consortiamedia.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'platform-lookaside.fbsbx.com'
      }
    ],
  }
};

export default nextConfig;

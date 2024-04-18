/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["logos-world.net", "content.rustmaps.com", "i.imgur.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

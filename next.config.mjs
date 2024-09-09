/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["clone-deep"],
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-recaptcha",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "content.rustmaps.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.rusticated.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.rustafied.systems",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.rapidmate.fr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.rapidmate.fr",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
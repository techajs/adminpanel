/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.rapidmate.fr",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.rapidmate.fr",
        port: "3009",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.rapidmate.fr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

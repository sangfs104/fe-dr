/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/img/**", // ảnh sp6.webp, sp6_2.webp, ...
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**", // ảnh kiểu public/storage/...
      },
    ],
  },
};

module.exports = nextConfig;

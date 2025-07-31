/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**", // Cho phép tất cả đường dẫn từ 127.0.0.1:8000
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**", // Cho phép tất cả đường dẫn từ localhost:8000
      }
    ],
  },
};

module.exports = nextConfig;
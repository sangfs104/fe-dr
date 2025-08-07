// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/img/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/storage/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/img/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/storage/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/**", 
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/**", 
//       }
//     ],
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").hostname,
        port: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").port,
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").hostname,
        port: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").port,
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").hostname,
        port: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").port,
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
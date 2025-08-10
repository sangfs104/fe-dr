// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "dreams-admin.io.vn",
//         port: "",
//         pathname: "/img/**",
//       },
//       {
//         protocol: "https",
//         hostname: "dreams-admin.io.vn",
//         port: "",
//         pathname: "/storage/**",
//       },
//       {
//         protocol: "https",
//         hostname: "dreams-admin.io.vn",
//         port: "",
//         pathname: "/**",
//       },
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
        protocol: "https",
        hostname: "dreams-admin.io.vn",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "dreams-admin.io.vn",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "dreams-admin.io.vn",
        port: "",
        pathname: "/public/img/**",
      },
      {
        protocol: "https",
        hostname: "dreams-admin.io.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
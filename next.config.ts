// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "dreams-admin.io.vn",
// //         port: "",
// //         pathname: "/img/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "dreams-admin.io.vn",
// //         port: "",
// //         pathname: "/storage/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "dreams-admin.io.vn",
// //         port: "",
// //         pathname: "/**",
// //       },
// //     ],
// //   },
// // };

// // module.exports = nextConfig;
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
//         pathname: "/public/img/**",
//       },
//       {
//         protocol: "https",
//         hostname: "dreams-admin.io.vn",
//         port: "",
//         pathname: "/**",
//       },

//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/**",
//       },
//       // Thêm cho ảnh Google
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      // Thêm cho ảnh Google
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // Thêm mẫu mới cho avatar
      {
        protocol: "https",
        hostname: "dreams-admin.io.vn",
        port: "",
        pathname: "/storage/avatars/**",
      },
    ],
  },
};

module.exports = nextConfig;
// // // // // /** @type {import('next').NextConfig} */
// // // // // const nextConfig = {
// // // // //   reactStrictMode: true,
// // // // //   swcMinify: true,
// // // // //   images: {
// // // // //     remotePatterns: [
// // // // //       {
// // // // //         protocol: "http",
// // // // //         hostname: "127.0.0.1",
// // // // //         port: "8000",
// // // // //         pathname: "/storage/**",
// // // // //       },
// // // // //     ],
// // // // //   },
// // // // // };

// // // // // module.exports = nextConfig;
// // // // /** @type {import('next').NextConfig} */
// // // // const nextConfig = {
// // // //   reactStrictMode: true,
// // // //   images: {
// // // //     remotePatterns: [
// // // //       {
// // // //         protocol: "http",
// // // //         hostname: "127.0.0.1",
// // // //         port: "8000",
// // // //         pathname: "/storage/**",
// // // //       },
// // // //     ],
// // // //   },
// // // // };

// // // // module.exports = nextConfig;
// // // /** @type {import('next').NextConfig} */
// // // const nextConfig = {
// // //   reactStrictMode: true,
// // //   images: {
// // //     remotePatterns: [
// // //       {
// // //         protocol: "http",
// // //         hostname: "127.0.0.1",
// // //         port: "8000",
// // //         pathname: "/storage/**", // giữ nguyên
// // //       },
// // //       {
// // //         protocol: "http",
// // //         hostname: "127.0.0.1",
// // //         port: "8000",
// // //         pathname: "/img/**", // ✅ thêm vào cho ảnh từ folder /img
// // //       },
// // //     ],
// // //   },
// // // };

// // // module.exports = nextConfig;

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "http",
// //         hostname: "127.0.0.1",
// //         port: "8000",
// //         pathname: "/storage/**",
// //       },
// //       {
// //         protocol: "http",
// //         hostname: "127.0.0.1",
// //         port: "8000",
// //         pathname: "/img/**",
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
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/storage/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/img/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost", // 👈 thêm cái này
//         port: "8000",
//         pathname: "/img/**",
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
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
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
        pathname: "/storage/**",
      },
    ],
    // 👇 THÊM NẾU bạn đang dùng <Image src="http://localhost:8000/xxx">
    domains: ["localhost", "127.0.0.1"],
  },
};

module.exports = nextConfig;

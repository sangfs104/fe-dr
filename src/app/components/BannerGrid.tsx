// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const banners = [
//   {
//     title: "Giày thiết kế",
//     image: "/img/banner1.webp", // ảnh giày
//     href: "/products?tag=shoes",
//   },
//   {
//     title: "Giảm 50% Sale cuối năm",
//     image: "/img/banner2.webp", // ảnh áo khoác
//     href: "/products?sale=true",
//   },
//   {
//     title: 'Bộ sưu tập "Summer Hot"',
//     image: "/img/banner3.webp", // ảnh bikini
//     href: "/products?collection=summer",
//   },
// ];

// export default function BannerGrid() {
//   return (
//     <section className="px-6 sm:px-10 md:px-20 lg:px-40 py-12 bg-white">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {banners.map((item, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
//           >
//             <div className="w-full h-[220px] relative">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="text-center p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {item.title}
//               </h3>
//               <Link
//                 href={item.href}
//                 className="inline-block text-sm font-medium text-gray-900 hover:text-[#ee4d2d] border-b border-gray-900 hover:border-[#ee4d2d] transition"
//               >
//                 XEM NGAY
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    title: "Giày thiết kế",
    image: "/img/banner1.webp",
    href: "/products?tag=shoes",
  },
  {
    title: "Giảm 50% Sale cuối năm",
    image: "/img/banner2.webp",
    href: "/products?sale=true",
  },
  {
    title: 'Bộ sưu tập "Summer Hot"',
    image: "/img/banner3.webp",
    href: "/products?collection=summer",
  },
];

export default function BannerGrid() {
  return (
    <section className="px-6 sm:px-10 md:px-20 lg:px-40 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((item, index) => (
          <div
            key={index}
            className="bg-[#f9f9f9] rounded-xl overflow-hidden flex flex-col items-center text-center group transition-all duration-300"
          >
            {/* Hình ảnh nằm trên */}
            <div className="relative w-full h-[260px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Nội dung phía dưới */}
            <div className="py-4 px-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2 leading-snug">
                {item.title}
              </h3>
              <Link
                href={item.href}
                className="inline-block text-sm font-semibold text-gray-800 hover:text-[#ee4d2d] border-b-[1.5px] border-gray-800 hover:border-[#ee4d2d] transition-all"
              >
                XEM NGAY
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

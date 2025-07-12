"use client";

import Image from "next/image";
import Link from "next/link";

export default function HorizontalFeatureCards() {
  return (
    <section className="px-6 sm:px-10 md:px-20 lg:px-40 py-16 bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* CARD 1 */}
        <div className="flex-1 bg-[#fefefe] rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center">
          {/* Text section */}
          <div className="flex-1 space-y-4 md:pr-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
              Thousands of free templates
            </h2>
            <p className="text-gray-600 text-base">
              Free and easy way to bring your ideas to life
            </p>
            <Link
              href="#"
              className="inline-block bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] 
              text-white font-semibold px-6 py-2 rounded-full text-sm md:text-base 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Explore More →
            </Link>
          </div>

          {/* Image grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 mt-6 md:mt-0">
            {["sp1", "sp2", "sp3", "sp4"].map((img, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-xl shadow-md flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Image
                  src={`/img/${img}.webp`}
                  alt={`Product ${idx + 1}`}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2 */}
        <div className="flex-1 bg-[#fefefe] rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center">
          {/* Text */}
          <div className="flex-1 space-y-4 md:pr-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
              Create your unique style
            </h2>
            <p className="text-gray-600 text-base">
              Free and easy way to create your ideas to life
            </p>
            <Link
              href="#"
              className="inline-block bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] 
              text-white font-semibold px-6 py-2 rounded-full text-sm md:text-base 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Shop Now →
            </Link>
          </div>

          {/* Single Image */}
          <div className="flex-1 mt-6 md:mt-0 bg-white p-4 rounded-xl shadow-md flex items-center justify-center hover:scale-105 transition-transform">
            <Image
              src="/img/sp5.webp"
              alt="Red Shirt"
              width={300}
              height={260}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Star,
  Heart,
  ShoppingBag,
  Users,
  Award,
  ChevronDown,
  Play,
  Quote,
  CheckCircle,
  Zap,
  Camera,
  TrendingUp,
  Palette,
  Crown,
  Diamond,
} from "lucide-react";

const FashionIntro3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Dữ liệu hình ảnh và thông tin
  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=800&fit=crop",
  ];

  const teamMembers = [
    {
      name: "Vinh Võ",
      role: "Creative Director",
      image: "z6899203655714_5deb655bad3925f4ac103a3ddc39101d.jpg",
      description: "Với hơn 10 năm kinh nghiệm trong ngành thời trang",
    },
    {
      name: "Bảo Lê",
      role: "Fashion Designer",
      image: "cv avt.jpg",
      description: "Chuyên gia thiết kế với tầm nhìn sáng tạo độc đáo",
    },
    {
      name: "Quyền Hứa",
      role: "Style Consultant",
      image: "z6899200362085_eeb071a22c7b71ce59471c11c1e91b35.jpg",
      description: "Tư vấn phong cách cá nhân cho khách hàng VIP",
    },
    {
      name: "Đăng Lê",
      role: "Style Consultant",
      image: "z6395017736866_a46ee65a02ad4d564d0f13b601489f81.jpg",
      description: "Tư vấn phong cách cá nhân cho khách hàng VIP",
    },
    {
      name: "Sang Nguyễn",
      role: "Style Consultant",
      image: "sang.webp",
      description: "Tư vấn phong cách cá nhân cho khách hàng VIP",
    },
  ];

  const achievements = [
    { icon: Users, number: "50K+", label: "Khách Hàng Hài Lòng" },
    { icon: Award, number: "100+", label: "Giải Thưởng Thời Trang" },
    { icon: Star, number: "4.9", label: "Đánh Giá Trung Bình" },
    { icon: ShoppingBag, number: "1M+", label: "Sản Phẩm Đã Bán" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Auto change hero images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll(".section-observer");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActiveSection(index);
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearInterval(imageInterval);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [heroImages.length]);

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        >
          {i % 3 === 0 && <Crown className="w-6 h-6 text-orange-400" />}
          {i % 3 === 1 && <Diamond className="w-5 h-5 text-yellow-400" />}
          {i % 3 === 2 && <Sparkles className="w-4 h-4 text-red-400" />}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden px-10"
    >
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 0.8);
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>

      <FloatingElements />

      {/* Hero Section với 5D Effects */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center section-observer"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x *
            100}% ${mousePosition.y * 100}%, 
            rgba(255, 87, 34, 0.1) 0%, 
            rgba(255, 152, 0, 0.08) 25%, 
            rgba(244, 67, 54, 0.12) 50%, 
            rgba(255, 255, 255, 0.95) 100%)`,
        }}
      >
        {/* Background Images with 3D Transform */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x -
                  0.5) *
                  10}deg) rotateX(${(mousePosition.y - 0.5) *
                  -5}deg) translateZ(${
                  index === currentImageIndex ? "0px" : "-50px"
                })`,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={image}
                alt={`Fashion ${index + 1}`}
                className="w-full h-full object-cover transform scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-transparent to-red-900/30"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-8 max-w-6xl transition-all duration-1000 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-[100px] opacity-0"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 mb-6 transform hover:scale-105 transition-transform duration-500">
              FASHION ELITE
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full animate-pulse-glow"></div>
          </div>

          <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed">
            Nơi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-bold">
              Phong Cách
            </span>{" "}
            Gặp Gỡ
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 font-bold">
              {" "}
              Đẳng Cấp
            </span>
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Chúng tôi mang đến những bộ sưu tập thời trang cao cấp, kết hợp hoàn
            hảo giữa xu hướng quốc tế và phong cách Việt Nam hiện đại.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg transform hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" />
              <span>Khám Phá Ngay</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </button>

            <button className="group px-8 py-4 bg-transparent border-2 border-orange-400 text-orange-400 rounded-full font-bold text-lg transform hover:scale-110 hover:bg-orange-400 hover:text-white transition-all duration-300 flex items-center space-x-3">
              <Play className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
              <span>Xem Video</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-orange-400" />
        </div>
      </section>

      {/* About Section với 4D Effects */}
      <section className="relative py-20 section-observer">
        <div className="max-w-7xl mx-auto px-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 pt-16 ${
              activeSection >= 1
                ? "animate-slide-up"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-6">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">
            <div
              className={`transition-all duration-1000 delay-300 ${
                activeSection >= 1
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[-100px] opacity-0"
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x -
                  0.5) *
                  5}deg) translateZ(10px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative">
                <Quote className="w-16 h-16 text-orange-500 mb-6 opacity-50" />
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Được thành lập vào năm 2015, Fashion Elite bắt đầu từ ước mơ
                  mang đến những sản phẩm thời trang chất lượng cao với giá cả
                  hợp lý cho người Việt Nam.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Chúng tôi tin rằng mọi người đều xứng đáng có được những bộ
                  trang phục đẹp, chất lượng và thể hiện được cá tính riêng của
                  mình.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl backdrop-blur-sm border border-orange-200 shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        {item.number}
                      </div>
                      <div className="text-sm text-gray-700">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                activeSection >= 1
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[100px] opacity-0"
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x -
                  0.5) *
                  -5}deg) translateZ(10px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Fashion Store"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 to-transparent rounded-2xl"></div>

                {/* Floating badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-full shadow-lg animate-pulse">
                  <Crown className="inline w-4 h-4 mr-1" />
                  Premium Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section với 3D Cards */}
      <section className="relative py-20 section-observer bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-8 bg-white rounded-3xl shadow-xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 pt-16 ${
              activeSection >= 2
                ? "animate-slide-up"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-6">
              Đội Ngũ Chuyên Gia
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những người tài năng đứng sau thành công của Fashion Elite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-1000 ${
                  activeSection >= 2
                    ? "animate-slide-up"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transform: `perspective(1000px) rotateY(${(mousePosition.x -
                    0.5) *
                    10}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl backdrop-blur-sm border border-orange-200 shadow-lg transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-orange-300 shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-orange-200 to-red-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Floating icons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Star className="w-6 h-6 text-orange-400 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section với hiệu ứng 5D */}
      <section className="relative py-20 section-observer">
        <div className="max-w-7xl mx-auto px-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 pt-16 ${
              activeSection >= 3
                ? "animate-slide-up"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-6">
              Bộ Sưu Tập Nổi Bật
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-16">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-1000 ${
                  activeSection >= 3
                    ? "animate-slide-up"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    transform: `perspective(1000px) rotateY(${(mousePosition.x -
                      0.5) *
                      8}deg) rotateX(${(mousePosition.y - 0.5) * -4}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={image}
                    alt={`Fashion ${index + 1}`}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Overlay content */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h4 className="font-bold">Bộ Sưu Tập {index + 1}</h4>
                        <p className="text-sm opacity-80">Xu hướng mới nhất</p>
                      </div>
                      <Heart className="w-6 h-6 hover:text-orange-400 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Floating effect */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Camera className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8 text-center bg-white rounded-3xl shadow-xl py-16">
          <div
            className={`transition-all duration-1000 ${
              activeSection >= 4
                ? "animate-slide-up"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-8">
              Sẵn Sàng Khám Phá?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Hãy cùng chúng tôi tạo nên phong cách thời trang độc đáo của riêng
              bạn
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <button className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center space-x-4">
                <ShoppingBag className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-300" />
                <span>Mua Sắm Ngay</span>
                <Zap className="w-6 h-6 animate-pulse" />
              </button>

              <button className="group px-10 py-5 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-full font-bold text-xl transform hover:scale-110 hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-4">
                <Users className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" />
                <span>Tham Gia Cộng Đồng</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FashionIntro3D;

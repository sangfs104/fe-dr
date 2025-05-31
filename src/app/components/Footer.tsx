// components/Footer.tsx
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 px-6 py-12 border-t border-gray-200">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Cột 1: Logo và mô tả */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/img/favicon.jpg" alt="EGA Bike" className="h-10" />
            <span className="font-bold text-lg">
              Cửa hàng thời trang Dreams
            </span>
          </div>
          <p className="text-sm mb-4">
            Cửa hàng uy tín và chất lượng, cam kết mang đến trải nghiệm mua sắm
            tiện lợi và hiện đại.
          </p>
          <p className="text-sm mb-1">
            Mã số thuế: <strong>12345678999</strong>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" /> 70 Lữ Gia, Quận 11, TP.HCM
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" /> 19006750
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" /> support@sapo.vn
          </p>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div>
          <h4 className="font-semibold mb-3">HỖ TRỢ KHÁCH HÀNG</h4>
          <ul className="text-sm space-y-2">
            <li>Cửa hàng</li>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Câu hỏi thường gặp</li>
            <li>Khuyến mãi Combo</li>
            <li>Khuyến mãi Mua X tặng Y</li>
          </ul>
        </div>

        {/* Cột 3: Chính sách */}
        <div>
          <h4 className="font-semibold mb-3">CHÍNH SÁCH</h4>
          <ul className="text-sm space-y-2">
            <li>Chính sách giao hàng</li>
            <li>Điều khoản dịch vụ</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách đổi trả</li>
            <li>Chương trình cộng tác viên</li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký nhận tin */}
        <div>
          <h4 className="font-semibold mb-3">ĐĂNG KÝ NHẬN TIN</h4>
          <p className="text-sm mb-2">Bạn muốn nhận khuyến mãi đặc biệt?</p>
          <p className="text-sm mb-4">Đăng ký ngay.</p>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
              Đăng ký
            </button>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-red-600" />
            {/* Bạn có thể thêm icon TikTok hoặc Zalo bằng ảnh hoặc SVG nếu cần */}
          </div>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500 text-center">
        © Bản quyền thuộc về <strong>EGANY</strong> | Cung cấp bởi{" "}
        <strong>4SA8NG</strong>
      </div>
    </footer>
  );
}

import React from "react";

export default function CheckoutForm() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4">
      {/* Thông tin nhận hàng */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border p-3 rounded"
          />
          <input
            type="tel"
            placeholder="Số điện thoại (tùy chọn)"
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Địa chỉ (tùy chọn)"
            className="w-full border p-3 rounded"
          />

          <div className="flex gap-2">
            <select className="w-1/3 border p-3 rounded">
              <option>---</option>
              <option>TP. HCM</option>
              <option>Hà Nội</option>
            </select>
            <select className="w-1/3 border p-3 rounded">
              <option>Quận huyện (tùy chọn)</option>
            </select>
            <select className="w-1/3 border p-3 rounded">
              <option>Phường xã (tùy chọn)</option>
            </select>
          </div>

          <textarea
            placeholder="Ghi chú (tùy chọn)"
            className="w-full border p-3 rounded"
          ></textarea>

          <div className="flex justify-between items-center pt-2">
            <a href="#" className="text-blue-500">
              &lt; Giỏ hàng
            </a>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Tiếp tục chọn phương thức vận chuyển
            </button>
          </div>
        </form>
      </div>

      {/* Đơn hàng */}
      <div className="w-full lg:w-1/3 border rounded p-4 bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Đơn hàng (3 sản phẩm)</h3>

        {/* Sản phẩm */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src="https://via.placeholder.com/60"
              alt="product"
              className="w-14 h-14 object-cover rounded"
            />
            <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </div>
          </div>
          <div>
            <div>Quần legging lửng tập yoga</div>
            <div className="text-sm text-gray-500">Đen / S</div>
          </div>
          <div className="ml-auto text-sm">750.000₫</div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src="https://via.placeholder.com/60"
              alt="product"
              className="w-14 h-14 object-cover rounded"
            />
            <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full">
              1
            </div>
          </div>
          <div>
            <div>Áo bra tập gym yoga</div>
            <div className="text-sm text-gray-500">Xanh đen / S</div>
          </div>
          <div className="ml-auto text-sm">245.000₫</div>
        </div>

        {/* Mã giảm giá */}
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="flex-1 border p-2 rounded-l"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r">
            Áp dụng
          </button>
        </div>

        {/* Tính toán giá */}
        <div className="border-t mt-4 pt-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>995.000₫</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>-</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-blue-600">
            <span>Tổng cộng</span>
            <span>995.000₫</span>
          </div>
        </div>
      </div>
    </div>
  );
}

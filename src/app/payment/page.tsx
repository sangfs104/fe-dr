"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CheckoutProgress from "../components/ui/CheckoutProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@/store/store";
import Footer from "../components/ui/Footer";
import HeaderHome from "../components/ui/Header";

export default function PaymentPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // giá trị giảm (VND)
  const [couponId, setCouponId] = useState<number | null>(null); // Lưu ID coupon
  const [shippingFee, setShippingFee] = useState<number>(0); //tính tiền ship
  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Tính phí ship nếu address hoặc city thay đổi
      if (name === "address" || name === "city") {
        const fullAddress = `${updated.address || ""}, ${updated.city || ""}`;
        const fee = calculateShippingFee(fullAddress);
        setShippingFee(fee);
      }

      return updated;
    });
  };

  const totalCart = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalTotal = totalCart + shippingFee;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập tên";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập họ";
    if (!formData.country) newErrors.country = "Vui lòng chọn quốc gia";
    if (!formData.city) newErrors.city = "Vui lòng chọn thành phố";
    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    // ✅ Kiểm tra nếu chưa đăng nhập
    if (!token) {
      toast.error("Không thể đặt hàng vì quý khách chưa đăng nhập.");
      return;
    }

    // 1. Kiểm tra form trước
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 2. Chuẩn bị dữ liệu giỏ hàng
      const cartData = cartItems.map((item) => ({
        variant_id: item.variantId,
        price: item.price,
        quantity: item.quantity,
      }));

      // 3. Body gửi đi
      const requestBody = {
        cart: cartData,
        coupon_id: couponId,
        shipping_id: 1,
        address_id: 1,
        payment_id: paymentMethod === "cod" ? 2 : 1,
        order_desc:
          paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán đơn hàng VNPAY",
        bank_code: "",
        shipping_fee: shippingFee, //thêm giá tiền ship
        customer_info: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          note: formData.note,
        },
      };

      // 4. Gửi đơn hàng tới API phù hợp
      const apiUrl =
        paymentMethod === "cod"
          ? "http://localhost:8000/api/payment/cod"
          : "http://localhost:8000/api/payment/vnpay";

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 5. Xử lý phản hồi
      const order = response.data.order;

      // ✅ Gộp thêm payment_method để lưu vào localStorage
      const orderWithPaymentMethod = {
        ...order,
        // total_price: response.data.total_price,
        total_price:
          response.data.total_price ?? response.data.order?.total_price ?? 0,
        payment_method: paymentMethod,
        items: cartItems.map((item) => ({
          quantity: item.quantity,
          variant: {
            name: item.name,
            price: item.price,
            image_url: item.img, // đảm bảo có image
          },
        })),
      };

      if (paymentMethod === "bank" && response.data.payment_url) {
        localStorage.setItem(
          "latestOrder",
          JSON.stringify(orderWithPaymentMethod)
        );
        window.location.href = response.data.payment_url;
      } else if (paymentMethod === "cod") {
        toast.success("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
        localStorage.setItem(
          "latestOrder",
          JSON.stringify(orderWithPaymentMethod)
        );
        window.location.href = "/order-success";
      }
    } catch (err) {
      console.error("Payment error", err);
      toast.error("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
    }
  };

  //Lấy địa chỉ mặc định
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchDefaultAddress = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        const addresses = result.data || [];

        const defaultAddress = addresses.find(
          (addr: any) => addr.is_default === 1
        );

        if (defaultAddress) {
          setFormData((prev) => ({
            ...prev,
            address: defaultAddress.adress,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ mặc định:", error);
      }
    };

    fetchDefaultAddress();
  }, []);

  //Lấy profile cá nhân
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        const userData = result.data;

        if (userData) {
          setFormData((prev) => ({
            ...prev,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      const fullName = parsed.name || "";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts.slice(1).join(" ") || ""; // Tên
      const lastName = nameParts[0] || ""; // Họ

      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: parsed.email || "",
        phone: parsed.phone || "",
      }));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal");
      const windowHeight = window.innerHeight;
      reveals.forEach((el) => {
        const top = (el as HTMLElement).getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  // tính phí ship
  const calculateShippingFee = (address: string) => {
    const addr = address.toLowerCase();

    if (
      addr.includes("quận 1") ||
      addr.includes("quận 3") ||
      addr.includes("quận 7") ||
      addr.includes("quận 9") ||
      addr.includes("quận 12") ||
      addr.includes("tp.hcm") ||
      addr.includes("thành phố hồ chí minh")
    ) {
      return 10000;
    } else {
      return 50000;
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleApplyCoupon = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/coupons/check",
        {
          code: couponCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (result && result.data && result.data.discount_amount) {
        setDiscount(result.data.discount_amount);
        setCouponId(result.data.id); // lưu lại ID coupon
        toast.success("Áp dụng mã giảm giá thành công!");
      } else {
        setDiscount(0);
        setCouponId(null);
        toast.error("Mã giảm giá không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error);
      toast.error("Có lỗi xảy ra khi kiểm tra mã giảm giá.");
    }
  };

  return (
    <>
      <HeaderHome />
      <ToastContainer />
      <CheckoutProgress currentStep="checkout" />

      <div className="flex justify-center gap-10 mx-auto my-10 flex-wrap max-w-[1200px]">
        {/* Thông tin thanh toán */}
        <div className="w-full lg:w-[600px] bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-center text-xl font-bold uppercase mb-4">
            THÔNG TIN THANH TOÁN
          </h2>
          <hr className="mb-6" />
          <form>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Tên *"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-4 mb-2 border border-gray-300 rounded-md text-base"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mb-2">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Họ *"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-4 mb-2 border border-gray-300 rounded-md text-base"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mb-2">{errors.lastName}</p>
                )}
              </div>
            </div>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-4 mb-4 border border-gray-300 rounded-md bg-gray-50"
            >
              <option value="">Quốc gia/Khu vực *</option>
              <option value="VN">Việt Nam</option>
            </select>
            {errors.country && (
              <p className="text-red-600 text-sm mb-2">{errors.country}</p>
            )}

            <input
              type="text"
              name="address"
              placeholder="Địa chỉ *"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-4 mb-4 border border-gray-300 rounded-md text-base"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mb-2">{errors.address}</p>
            )}

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-4 mb-4 border border-gray-300 rounded-md bg-gray-50"
            >
              <option value="">Tỉnh / Thành phố *</option>
              <option value="HCM">TP. Hồ Chí Minh</option>
              <option value="HN">Hà Nội</option>
              <option value="DN">Đà Nẵng</option>
            </select>
            {errors.city && (
              <p className="text-red-600 text-sm mb-2">{errors.city}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 mb-2 border border-gray-300 rounded-md text-base"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mb-2">{errors.phone}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Địa chỉ email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 mb-2 border border-gray-300 rounded-md text-base"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mb-2">{errors.email}</p>
                )}
              </div>
            </div>

            <textarea
              name="note"
              placeholder="Ghi chú về đơn hàng..."
              value={formData.note}
              onChange={handleChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-md min-h-[80px]"
            ></textarea>
          </form>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="w-full lg:w-[400px] bg-gray-100 p-6 rounded-xl shadow-md">
          <h2 className="text-center text-xl font-bold mb-4 pb-4 border-b border-gray-300">
            THÔNG TIN ĐƠN HÀNG
          </h2>

          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex justify-between font-bold text-sm text-gray-600 border-b pb-2">
              <span>SẢN PHẨM</span>
              <span>TỔNG PHỤ</span>
            </div>

            {cartItems.map((item) => (
              <div
                className="flex justify-between items-center gap-3 py-3 border-b"
                key={`${item.productId}-${item.variantId}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[60px] h-[60px] object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.size} / Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-right font-bold text-sm min-w-[80px]">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}

            <div className="pt-4">
              <p className="flex justify-between text-base font-bold mb-2">
                Tổng phụ:{" "}
                <span className="font-normal">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </p>
              {discount > 0 && (
                <p className="flex justify-between text-base font-bold mb-2">
                  Giảm giá:{" "}
                  <span className="font-normal">
                    -{discount.toLocaleString("vi-VN")}đ
                  </span>
                </p>
              )}
              <p className="flex justify-between text-base font-bold mb-2">
                Giao hàng:{" "}
                <span className="font-normal">
                  {shippingFee === 0
                    ? "Miễn phí"
                    : shippingFee.toLocaleString("vi-VN") + " đ"}
                </span>
              </p>

              <div className="flex justify-between items-center text-lg font-bold text-red-600 pt-4 border-t mt-4">
                <span>TỔNG</span>
                <span>{finalTotal.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          </div>

          {/* Mã giảm giá */}
          <div className="mt-4 border-t border-dashed pt-4">
            <p className="text-sm">
              Có mã giảm giá?{" "}
              <a
                href="#"
                className="font-semibold cursor-pointer text-black hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCoupon(!showCoupon);
                }}
              >
                Nhấn vào đây để nhập mã giảm giá{" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </a>
            </p>
            {showCoupon && (
              <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <p className="text-sm text-gray-700 mb-3">
                  Nếu bạn có mã giảm giá, vui lòng nhập bên dưới:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
                    placeholder="Nhập mã giảm giá..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200 text-sm"
                    onClick={handleApplyCoupon}
                  >
                    ÁP DỤNG
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Phương thức thanh toán */}
          <div className="mt-6 p-4 rounded-lg">
            <label className="flex items-center gap-2 font-semibold text-base py-2 hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="w-[18px] h-[18px]"
              />
              <span>Thanh toán qua VNPAY</span>
            </label>
            {paymentMethod === "bank" && (
              <div className="text-sm text-gray-700 ml-6 p-3 border border-gray-300 rounded bg-gray-50 animate-fade-in">
                <p>Thực hiện thanh toán qua cổng VNPAY.</p>
              </div>
            )}

            <label className="flex items-center gap-2 font-semibold text-base py-2 hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="w-[18px] h-[18px]"
              />
              <span>Trả tiền mặt khi nhận hàng</span>
            </label>
            {paymentMethod === "cod" && (
              <div className="text-sm text-gray-700 ml-6 p-3 border border-gray-300 rounded bg-gray-50 animate-fade-in">
                <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</p>
              </div>
            )}
          </div>

          <button
            className="w-full py-4 bg-orange-600 text-white text-lg font-bold rounded mt-6 hover:bg-orange-700"
            onClick={handlePayment}
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

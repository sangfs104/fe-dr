"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@/store/store";

export default function PaymentPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // giá trị giảm (VND)
  const [couponId, setCouponId] = useState<number | null>(null); // Lưu ID coupon

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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    // Kiểm tra form trước
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const cartData = cartItems.map((item) => ({
        variant_id: item.variantId,
        price: item.price,
        quantity: item.quantity,
      }));

      const requestBody = {
        cart: cartData,
        coupon_id: couponId, // Sử dụng couponId (ID), không phải code
        shipping_id: 1,
        address_id: 1,
        payment_id: paymentMethod === "cod" ? 2 : 1,
        order_desc:
          paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán đơn hàng VNPAY",
        bank_code: "",
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

      const apiUrl =
        paymentMethod === "cod"
          ? "http://localhost:8000/api/payment/cod"
          : "http://localhost:8000/api/payment/vnpay";

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (paymentMethod === "bank" && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else if (paymentMethod === "cod") {
        toast.success("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
        // window.location.href = "/order-success";
      }
    } catch (err) {
      console.error("Payment error", err);
      toast.error("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
    }
  };

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

  return (
    <>
      <HeaderHome />
      <ToastContainer />
      <CheckoutProgress currentStep="checkout" />

      <div className="top-notice">
        <p>
          Có mã giảm giá?{" "}
          <a
            href="#"
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
          <div id="coupon-box">
            <p>Nếu bạn có mã giảm giá, vui lòng áp dụng nó bên dưới.</p>
            <div className="coupon-container">
              <input
                type="text"
                className="coupon-input"
                placeholder="Mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="apply-btn"
                onClick={async (e) => {
                  e.preventDefault();
                  if (!couponCode.trim()) {
                    toast.error("Vui lòng nhập mã giảm giá.");
                    return;
                  }

                  try {
                    // Gọi API lấy danh sách coupon
                    const response = await axios.get(
                      "http://127.0.0.1:8000/api/coupons"
                    );
                    const coupons = response.data;

                    // Tìm mã hợp lệ và còn hạn
                    const now = new Date();
                    const found = coupons.find(
                      (c: any) =>
                        c.code === couponCode.trim() &&
                        new Date(c.expiry_date) >= now
                    );

                    if (found) {
                      setDiscount(Number(found.discount_value));
                      setCouponId(found.id); // Lưu lại ID của coupon
                      toast.success("Áp dụng mã giảm giá thành công!");
                    } else {
                      setDiscount(0);
                      setCouponId(null);
                      toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
                    }
                  } catch (error) {
                    setDiscount(0);
                    setCouponId(null);
                    toast.error("Đã xảy ra lỗi khi kiểm tra mã.");
                  }
                }}
              >
                ÁP DỤNG
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="wrapper">
        {/* Thông tin thanh toán */}
        <div className="container">
          <h2>THÔNG TIN THANH TOÁN</h2>
          <hr />
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Tên *"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
                )}
              </div>
              <div className="col">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Họ *"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName}</p>
                )}
              </div>
            </div>

            <input
              type="text"
              name="company"
              placeholder="Tên công ty"
              value={formData.company}
              onChange={handleChange}
            />

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Quốc gia/Khu vực *</option>
              <option value="VN">Việt Nam</option>
            </select>
            {errors.country && <p className="error-text">{errors.country}</p>}

            <input
              type="text"
              name="address"
              placeholder="Địa chỉ *"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Tỉnh / Thành phố *</option>
              <option value="HCM">TP. Hồ Chí Minh</option>
              <option value="HN">Hà Nội</option>
              <option value="DN">Đà Nẵng</option>
            </select>
            {errors.city && <p className="error-text">{errors.city}</p>}

            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại *"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div className="col">
                <input
                  type="email"
                  name="email"
                  placeholder="Địa chỉ email *"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>

            <textarea
              name="note"
              placeholder="Ghi chú về đơn hàng..."
              value={formData.note}
              onChange={handleChange}
            ></textarea>
          </form>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="order-container">
          <h2>THÔNG TIN ĐƠN HÀNG</h2>
          <div className="order-summary">
            <div className="order-header">
              <span>SẢN PHẨM</span>
              <span>TỔNG PHỤ</span>
            </div>

            {cartItems.map((item) => (
              <div
                className="order-item"
                key={`${item.productId}-${item.variantId}`}
              >
                <div className="item-left">
                  <img src={item.img} alt={item.name} />
                  <div className="item-details">
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <p className="small-text">
                      {item.size} / Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="price">{item.price.toLocaleString("vi-VN")}đ</p>
              </div>
            ))}

            <div className="summary-box">
              <p>
                Tổng phụ: <span>{subtotal.toLocaleString("vi-VN")}đ</span>
              </p>
              {discount > 0 && (
                <p>
                  Giảm giá: <span>-{discount.toLocaleString("vi-VN")}đ</span>
                </p>
              )}
              <p>
                Giao hàng: <span>Miễn phí</span>
              </p>
              <div className="total-line">
                <span>TỔNG</span>
                <span>{total.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="payment-method">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <span>Thanh toán qua VNPAY</span>
            </label>
            {paymentMethod === "bank" && (
              <div className="payment-info">
                <p>Thực hiện thanh toán qua cổng VNPAY.</p>
              </div>
            )}

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Trả tiền mặt khi nhận hàng</span>
            </label>
            {paymentMethod === "cod" && (
              <div className="payment-info">
                <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</p>
              </div>
            )}
          </div>

          <button className="order-btn" onClick={handlePayment}>
            ĐẶT HÀNG
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

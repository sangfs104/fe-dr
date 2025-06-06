"use client";

import { useEffect } from "react";
import "../css/payment.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CheckoutProgress from "../components/CheckoutProgress";
import axios from "axios";

import { RootState } from "@/store/store";

export default function PaymentPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      // Chuyển đổi cartItems sang định dạng API yêu cầu
      const cartData = cartItems.map((item) => ({
        variant_id: item.variantId,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:8000/api/payment/vnpay",
        {
          cart: cartData,
          coupon_id: null,
          shipping_id: 1,
          address_id: 1,
          payment_id: 1,
          order_desc: "Thanh toán đơn hàng VNPAY",
          bank_code: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (err) {
      console.error("Payment error", err);
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

  return (
    <>
      <HeaderHome></HeaderHome>
      <CheckoutProgress currentStep="checkout" />
      <div>
        <div className="top-notice">
          {/* <p>
            Khách hàng phản hồi?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLogin(!showLogin);
              }}
            >
              Ấn vào đây để đăng nhập <FontAwesomeIcon icon={faChevronDown} />
            </a>
          </p> */}

          {showLogin && (
            <div id="login-box">
              <p>Vui lòng nhập thông tin bên dưới để đăng nhập.</p>
              <input type="text" placeholder="Tên tài khoản hoặc email *" />
              <input type="password" placeholder="Mật khẩu *" />
              <div className="options">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" /> Ghi nhớ
                </label>
                <a href="#">Quên mật khẩu?</a>
              </div>
              <button>ĐĂNG NHẬP</button>
            </div>
          )}

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
                />
                <button className="apply-btn">ÁP DỤNG</button>
              </div>
            </div>
          )}
        </div>

        <div className="wrapper">
          {/* Cột trái: Thông tin thanh toán */}
          <div className="container">
            <h2>THÔNG TIN THANH TOÁN</h2>
            <hr />
            <form>
              <div className="row">
                <div className="col">
                  <input type="text" placeholder="Tên *" required />
                </div>
                <div className="col">
                  <input type="text" placeholder="Họ *" required />
                </div>
              </div>
              <input type="text" placeholder="Tên công ty" />
              <select required>
                <option value="">Quốc gia/Khu vực *</option>
                <option value="VN">Việt Nam</option>
                {/* <option value="JP">Nhật Bản</option>
                <option value="KH">Campuchia</option>
                <option value="TH">Thái Lan</option>
                <option value="CA">Canada</option> */}
              </select>
              <input type="text" placeholder="Địa chỉ" />

              <select required>
                <option value="">Tỉnh / Thành phố *</option>
                <option value="HCM">TP. Hồ Chí Minh</option>
                <option value="HN">Hà Nội</option>
                <option value="DN">Đà Nẵng</option>
                <option value="CT">Cần Thơ</option>
                <option value="HP">Hải Phòng</option>
                <option value="BD">Bình Dương</option>
                <option value="LA">Long An</option>
                <option value="KH">Khánh Hòa</option>
                <option value="QN">Quảng Ninh</option>
                {/* Thêm các tỉnh/thành khác nếu muốn */}
              </select>

              <div className="row">
                <div className="col">
                  <input type="text" placeholder="Số điện thoại *" required />
                </div>
                <div className="col">
                  <input type="email" placeholder="Địa chỉ email *" required />
                </div>
              </div>

              <textarea placeholder="Ghi chú về đơn hàng..."></textarea>
            </form>
          </div>

          {/* Cột phải: Thông tin đơn hàng */}
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
                  Tổng phụ:{" "}
                  <span>
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toLocaleString("vi-VN")}
                    đ
                  </span>
                </p>
                <p>
                  Giao hàng: <span>Giao hàng miễn phí</span>
                </p>
                <div className="total-line">
                  <span>TỔNG</span>
                  <span>
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>
              </div>
            </div>

            <div className="payment-method">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span>Thực hiện thanh toán qua VNPAY</span>
              </label>
              {paymentMethod === "bank" && (
                <div id="bank-info" className="payment-info">
                  <p>Thực hiện thanh toán qua VNPAY.</p>
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
                <div id="cod-info" className="payment-info">
                  <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng...</p>
                </div>
              )}
            </div>
            <button className="order-btn" onClick={handlePayment}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

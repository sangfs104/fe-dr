"use client";

import { useEffect } from "react";
import "../css/payment.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import HeaderHome from "../components/Header";
export default function PaymentPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");

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
      <div>
        <div className="top-notice">
          <p>
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
          </p>

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
                <option value="JP">Nhật Bản</option>
                <option value="KH">Campuchia</option>
                <option value="TH">Thái Lan</option>
                <option value="CA">Canada</option>
              </select>
              <input type="text" placeholder="Địa chỉ" />
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
              <input type="text" placeholder="Mã bưu điện" />
              <input type="text" placeholder="Tỉnh / Thành phố *" required />
              <div className="row">
                <div className="col">
                  <input type="text" placeholder="Số điện thoại *" required />
                </div>
                <div className="col">
                  <input type="email" placeholder="Địa chỉ email *" required />
                </div>
              </div>
              <div className="checkbox-container">
                <div className="checkbox">
                  <input type="checkbox" id="new-account" />
                  <label htmlFor="new-account">Tạo tài khoản mới?</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="ship-different" />
                  <label htmlFor="ship-different">
                    <strong>Giao hàng tới địa chỉ khác?</strong>
                  </label>
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
              <div className="order-item">
                <img
                  src="https://coutura.monamedia.net/wp-content/uploads/2024/04/5232502622_2_6_1.jpg"
                  alt="Sản phẩm"
                />
                <div>
                  <p>
                    <strong>Short Sleeved Kaws</strong>
                  </p>
                  <p className="small-text">LADIES-TEE / PINK / L</p>
                </div>
                <p className="price">345,000đ</p>
              </div>
              <div className="order-item">
                <img
                  src="https://coutura.monamedia.net/wp-content/uploads/2018/02/9471507600_2_6_1.jpg"
                  alt="Sản phẩm"
                />
                <div>
                  <p>
                    <strong>Short Sleeved Kaws</strong>
                  </p>
                  <p className="small-text">LADIES-TEE / PINK / L</p>
                </div>
                <p className="price">345,000đ</p>
              </div>
              <div className="summary-box">
                <p>
                  Tổng phụ: <span>345,000đ</span>
                </p>
                <p>
                  Giao hàng: <span>Giao hàng miễn phí</span>
                </p>
                <div className="total-line">
                  <span>TỔNG</span>
                  <span>345,000đ</span>
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
                <span>Chuyển khoản ngân hàng</span>
              </label>
              {paymentMethod === "bank" && (
                <div id="bank-info" className="payment-info">
                  <p>
                    Thực hiện thanh toán vào tài khoản ngân hàng của chúng
                    tôi...
                  </p>
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
            <button className="order-btn">ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </>
  );
}

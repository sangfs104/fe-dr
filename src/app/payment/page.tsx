// "use client";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import CheckoutProgress from "../components/ui/CheckoutProgress";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { RootState } from "@/store/store";

// export default function PaymentPage() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showCoupon, setShowCoupon] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0); // giá trị giảm (VND)
//   const [couponId, setCouponId] = useState<number | null>(null); // Lưu ID coupon
//   const [shippingFee, setShippingFee] = useState<number>(0); //tính tiền ship

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     company: "",
//     country: "",
//     address: "",
//     city: "",
//     phone: "",
//     email: "",
//     note: "",
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };

//       // Tính phí ship nếu address hoặc city thay đổi
//       if (name === "address" || name === "city") {
//         const fullAddress = `${updated.address || ""}, ${updated.city || ""}`;
//         const fee = calculateShippingFee(fullAddress);
//         setShippingFee(fee);
//       }

//       return updated;
//     });
//   };

//   const totalCart = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const finalTotal = totalCart + shippingFee;

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập tên";
//     if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập họ";
//     if (!formData.country) newErrors.country = "Vui lòng chọn quốc gia";
//     if (!formData.city) newErrors.city = "Vui lòng chọn thành phố";
//     if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
//     if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
//     if (!formData.email.trim()) {
//       newErrors.email = "Vui lòng nhập email";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Email không hợp lệ";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePayment = async () => {
//     // 1. Kiểm tra form trước
//     if (!validateForm()) {
//       toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       // 2. Chuẩn bị dữ liệu giỏ hàng
//       const cartData = cartItems.map((item) => ({
//         variant_id: item.variantId,
//         price: item.price,
//         quantity: item.quantity,
//       }));

//       // 3. Body gửi đi
//       const requestBody = {
//         cart: cartData,
//         coupon_id: couponId,
//         shipping_id: 1,
//         address_id: 1,
//         payment_id: paymentMethod === "cod" ? 2 : 1,
//         order_desc:
//           paymentMethod === "cod"
//             ? "Thanh toán khi nhận hàng"
//             : "Thanh toán đơn hàng VNPAY",
//         bank_code: "",
//         shipping_fee: shippingFee, //thêm giá tiền ship
//         customer_info: {
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           company: formData.company,
//           country: formData.country,
//           address: formData.address,
//           city: formData.city,
//           phone: formData.phone,
//           email: formData.email,
//           note: formData.note,
//         },
//       };

//       // 4. Gửi đơn hàng tới API phù hợp
//       const apiUrl =
//         paymentMethod === "cod"
//           ? "http://localhost:8000/api/payment/cod"
//           : "http://localhost:8000/api/payment/vnpay";

//       const response = await axios.post(apiUrl, requestBody, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // 5. Xử lý phản hồi
//       const order = response.data.order;

//       // ✅ Gộp thêm payment_method để lưu vào localStorage
//       const orderWithPaymentMethod = {
//         ...order,
//         // total_price: response.data.total_price,
//         total_price:
//           response.data.total_price ?? response.data.order?.total_price ?? 0,
//         payment_method: paymentMethod,
//         items: cartItems.map((item) => ({
//           quantity: item.quantity,
//           variant: {
//             name: item.name,
//             price: item.price,
//             image_url: item.img, // đảm bảo có image
//           },
//         })),
//       };

//       if (paymentMethod === "bank" && response.data.payment_url) {
//         localStorage.setItem(
//           "latestOrder",
//           JSON.stringify(orderWithPaymentMethod)
//         );
//         window.location.href = response.data.payment_url;
//       } else if (paymentMethod === "cod") {
//         toast.success("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
//         localStorage.setItem(
//           "latestOrder",
//           JSON.stringify(orderWithPaymentMethod)
//         );
//         window.location.href = "/order-success";
//       }
//     } catch (err) {
//       console.error("Payment error", err);
//       toast.error("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
//     }
//   };

//   //Lấy địa chỉ mặc định
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const fetchDefaultAddress = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/addresses", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await res.json();
//         const addresses = result.data || [];

//         const defaultAddress = addresses.find(
//           (addr: any) => addr.is_default === 1
//         );

//         if (defaultAddress) {
//           setFormData((prev) => ({
//             ...prev,
//             address: defaultAddress.adress,
//           }));
//         }
//       } catch (error) {
//         console.error("Lỗi khi lấy địa chỉ mặc định:", error);
//       }
//     };

//     fetchDefaultAddress();
//   }, []);

//   //Lấy profile cá nhân
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const fetchUserInfo = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/user/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await res.json();
//         const userData = result.data;

//         if (userData) {
//           setFormData((prev) => ({
//             ...prev,
//             name: userData.name,
//             email: userData.email,
//             phone: userData.phone,
//           }));
//         }
//       } catch (error) {
//         console.error("Lỗi khi lấy thông tin người dùng:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       const fullName = parsed.name || "";
//       const nameParts = fullName.trim().split(" ");
//       const firstName = nameParts.slice(1).join(" ") || ""; // Tên
//       const lastName = nameParts[0] || ""; // Họ

//       setFormData((prev) => ({
//         ...prev,
//         firstName,
//         lastName,
//         email: parsed.email || "",
//         phone: parsed.phone || "",
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const reveals = document.querySelectorAll(".reveal");
//       const windowHeight = window.innerHeight;
//       reveals.forEach((el) => {
//         const top = (el as HTMLElement).getBoundingClientRect().top;
//         if (top < windowHeight - 100) {
//           el.classList.add("active");
//         } else {
//           el.classList.remove("active");
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("load", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("load", handleScroll);
//     };
//   }, []);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const total = subtotal - discount;

//   // tính phí ship
//   const calculateShippingFee = (address: string) => {
//     const addr = address.toLowerCase();

//     if (
//       addr.includes("quận 1") ||
//       addr.includes("quận 3") ||
//       addr.includes("quận 7") ||
//       addr.includes("quận 9") ||
//       addr.includes("quận 12") ||
//       addr.includes("tp.hcm") ||
//       addr.includes("thành phố hồ chí minh")
//     ) {
//       return 10000;
//     } else {
//       return 50000;
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <CheckoutProgress currentStep="checkout" />

//       <div className="wrapper">
//         {/* Thông tin thanh toán */}
//         <div className="container">
//           <h2>THÔNG TIN THANH TOÁN</h2>
//           <hr />
//           <form>
//             <div className="row">
//               <div className="col">
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="Tên *"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <p className="error-text">{errors.firstName}</p>
//                 )}
//               </div>
//               <div className="col">
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Họ *"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <p className="error-text">{errors.lastName}</p>
//                 )}
//               </div>
//             </div>

//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Quốc gia/Khu vực *</option>
//               <option value="VN">Việt Nam</option>
//             </select>
//             {errors.country && <p className="error-text">{errors.country}</p>}

//             <input
//               type="text"
//               name="address"
//               placeholder="Địa chỉ *"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             {errors.address && <p className="error-text">{errors.address}</p>}

//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Tỉnh / Thành phố *</option>
//               <option value="HCM">TP. Hồ Chí Minh</option>
//               <option value="HN">Hà Nội</option>
//               <option value="DN">Đà Nẵng</option>
//             </select>

//             {errors.city && <p className="error-text">{errors.city}</p>}

//             <div className="row">
//               <div className="col">
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Số điện thoại *"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 {errors.phone && <p className="error-text">{errors.phone}</p>}
//               </div>
//               <div className="col">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Địa chỉ email *"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className="error-text">{errors.email}</p>}
//               </div>
//             </div>

//             <textarea
//               name="note"
//               placeholder="Ghi chú về đơn hàng..."
//               value={formData.note}
//               onChange={handleChange}
//             ></textarea>
//           </form>
//         </div>

//         {/* Thông tin đơn hàng */}
//         <div className="order-container">
//           <h2>THÔNG TIN ĐƠN HÀNG</h2>
//           <div className="order-summary">
//             <div className="order-header">
//               <span>SẢN PHẨM</span>
//               <span>TỔNG PHỤ</span>
//             </div>

//             {cartItems.map((item) => (
//               <div
//                 className="order-item"
//                 key={`${item.productId}-${item.variantId}`}
//               >
//                 <div className="item-left">
//                   <img src={item.img} alt={item.name} />
//                   <div className="item-details">
//                     <p>
//                       <strong>{item.name}</strong>
//                     </p>
//                     <p className="small-text">
//                       {item.size} / Số lượng: {item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="price">{item.price.toLocaleString("vi-VN")}đ</p>
//               </div>
//             ))}

//             <div className="summary-box">
//               <p>
//                 Tổng phụ: <span>{subtotal.toLocaleString("vi-VN")}đ</span>
//               </p>
//               {discount > 0 && (
//                 <p>
//                   Giảm giá: <span>-{discount.toLocaleString("vi-VN")}đ</span>
//                 </p>
//               )}
//               <p>
//                 Giao hàng:{" "}
//                 <span>
//                   {shippingFee === 0
//                     ? "Miễn phí"
//                     : shippingFee.toLocaleString("vi-VN") + " đ"}
//                 </span>
//               </p>

//               <div className="total-line">
//                 <span>TỔNG</span>
//                 <span>{finalTotal.toLocaleString("vi-VN")} đ</span>
//               </div>
//             </div>

//             <div className="coupon-section">
//               <p>
//                 Có mã giảm giá?{" "}
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowCoupon(!showCoupon);
//                   }}
//                 >
//                   Nhấn vào đây để nhập mã giảm giá{" "}
//                   <FontAwesomeIcon icon={faChevronDown} />
//                 </a>
//               </p>

//               {showCoupon && (
//                 <div id="coupon-box">
//                   <p>Nếu bạn có mã giảm giá, vui lòng áp dụng nó bên dưới.</p>
//                   <div className="coupon-container">
//                     <input
//                       type="text"
//                       className="coupon-input"
//                       placeholder="Mã giảm giá"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value)}
//                     />
//                     <button
//                       className="apply-btn"
//                       onClick={async (e) => {
//                         e.preventDefault();
//                         if (!couponCode.trim()) {
//                           toast.error("Vui lòng nhập mã giảm giá.");
//                           return;
//                         }

//                         try {
//                           const token = localStorage.getItem("token");
//                           const response = await axios.post(
//                             "http://localhost:8000/api/apply-coupon",
//                             { code: couponCode.trim() },
//                             {
//                               headers: {
//                                 Authorization: `Bearer ${token}`,
//                               },
//                             }
//                           );
//                           const data = response.data;
//                           if (data.status === 200) {
//                             setDiscount(Number(data.coupon.discount_value));
//                             setCouponId(data.coupon.id);
//                             toast.success(
//                               data.message || "Áp dụng mã giảm giá thành công!"
//                             );
//                           } else {
//                             setDiscount(0);
//                             setCouponId(null);
//                             toast.error(
//                               data.message || "Mã giảm giá không hợp lệ."
//                             );
//                           }
//                         } catch (error) {
//                           setDiscount(0);
//                           setCouponId(null);
//                           toast.error(
//                             error.response?.data?.message ||
//                               "Đã xảy ra lỗi khi kiểm tra mã giảm giá."
//                           );
//                         }
//                       }}
//                     >
//                       ÁP DỤNG
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Phương thức thanh toán */}
//           <div className="payment-method">
//             <label className="payment-option">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="bank"
//                 checked={paymentMethod === "bank"}
//                 onChange={() => setPaymentMethod("bank")}
//               />
//               <span>Thanh toán qua VNPAY</span>
//             </label>
//             {paymentMethod === "bank" && (
//               <div className="payment-info">
//                 <p>Thực hiện thanh toán qua cổng VNPAY.</p>
//               </div>
//             )}

//             <label className="payment-option">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               <span>Trả tiền mặt khi nhận hàng</span>
//             </label>
//             {paymentMethod === "cod" && (
//               <div className="payment-info">
//                 <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</p>
//               </div>
//             )}
//           </div>

//           <button className="order-btn" onClick={handlePayment}>
//             ĐẶT HÀNG
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faReceipt,
  faCreditCard,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import CheckoutProgress from "../components/ui/CheckoutProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@/store/store";

export default function PaymentPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState<number | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(0);

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
  const finalTotal = totalCart + shippingFee - discount;

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
        coupon_id: couponId,
        shipping_id: 1,
        address_id: 1,
        payment_id: paymentMethod === "cod" ? 2 : 1,
        order_desc:
          paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán đơn hàng VNPAY",
        bank_code: "",
        shipping_fee: shippingFee,
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

      const order = response.data.order;
      const orderWithPaymentMethod = {
        ...order,
        total_price:
          response.data.total_price ?? response.data.order?.total_price ?? 0,
        payment_method: paymentMethod,
        items: cartItems.map((item) => ({
          quantity: item.quantity,
          variant: {
            name: item.name,
            price: item.price,
            image_url: item.img,
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
      const firstName = nameParts.slice(1).join(" ") || "";
      const lastName = nameParts[0] || "";
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: parsed.email || "",
        phone: parsed.phone || "",
      }));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

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

  return (
    <>
      <ToastContainer />
      <CheckoutProgress currentStep="checkout" />

      <div className="flex flex-col md:flex-row gap-10 max-w-[1400px] mx-auto my-10 px-[40px]">
        {/* Thông tin thanh toán */}
        {/* <div className="flex-1 bg-[#fffff]/80 border border-[#ffd6c0] rounded-3xl shadow-2xl p-10 relative overflow-hidden"> */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-lg p-10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-gradient-to-br from-[#374151] to-[#111827] text-white rounded-xl p-2 shadow-lg">
              <FontAwesomeIcon icon={faReceipt} className="text-xl" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] drop-shadow-sm tracking-tight">
              THÔNG TIN THANH TOÁN
            </h2>
          </div>
          <hr className="mb-6 border-[#FFD6C0]" />
          <form className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f88d4d] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#374151]">
                    Tên *
                  </label>
                </div>
                {errors.firstName && (
                  <p className="text-sm text-rose-500 pl-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f88d4d] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#374151]">
                    Họ *
                  </label>
                </div>
                {errors.lastName && (
                  <p className="text-sm text-rose-500 pl-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
              >
                <option value="">Quốc gia/Khu vực *</option>
                <option value="VN">Việt Nam</option>
              </select>
              <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[#374151]">
                Quốc gia/Khu vực *
              </label>
              {errors.country && (
                <p className="text-sm text-rose-500 pl-1">{errors.country}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f88d4d] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#374151]">
                Địa chỉ *
              </label>
              {errors.address && (
                <p className="text-sm text-rose-500 pl-1">{errors.address}</p>
              )}
            </div>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
              >
                <option value="">Tỉnh / Thành phố *</option>
                <option value="HCM">TP. Hồ Chí Minh</option>
                <option value="HN">Hà Nội</option>
                <option value="DN">Đà Nẵng</option>
              </select>
              <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[#374151]">
                Tỉnh / Thành phố *
              </label>
              {errors.city && (
                <p className="text-sm text-rose-500 pl-1">{errors.city}</p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f88d4d] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#374151]">
                    Số điện thoại *
                  </label>
                </div>
                {errors.phone && (
                  <p className="text-sm text-rose-500 pl-1">{errors.phone}</p>
                )}
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f88d4d] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#374151]">
                    Địa chỉ email *
                  </label>
                </div>
                {errors.email && (
                  <p className="text-sm text-rose-500 pl-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="peer w-full px-4 pt-5 pb-2 bg-[#fff] border-2 border-[#ffd6c0] rounded-xl text-base font-semibold text-[#111827] focus:outline-none focus:border-[#374151] transition h-20"
                placeholder=" "
              ></textarea>
              <label className="absolute left-4 top-2 text-sm text-[#374151] font-bold opacity-80 pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[#374151]">
                Ghi chú về đơn hàng...
              </label>
            </div>
          </form>
        </div>
        {/* Thông tin đơn hàng */}
        <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-gradient-to-br from-[#374151] to-[#111827] text-white rounded-xl p-2 shadow-lg">
              <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] drop-shadow-sm tracking-tight">
              THÔNG TIN ĐƠN HÀNG
            </h2>
          </div>
          <div className="mt-7">
            <div className="flex justify-between font-bold text-[1.07rem] border-b border-[#FFD6C0] pb-2 mb-3 text-[#374151]">
              <span>SẢN PHẨM</span>
              <span>TỔNG PHỤ</span>
            </div>
            {cartItems.map((item) => (
              <div
                className="flex items-center justify-between py-3 border-b border-dashed border-[#FFD6C0] gap-4 hover:bg-[#fff0e7] rounded-xl transition"
                key={`${item.productId}-${item.variantId}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#ffd6c0] bg-[#fff4ef] shadow"
                  />
                  <div>
                    <p className="font-semibold text-[#374151]">{item.name}</p>
                    <p className="text-sm text-[#f88d4d] font-medium">
                      {item.size} / Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-[#111827] text-lg min-w-[92px] text-right">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-[#FFD6C0]">
              <div className="flex justify-between mb-2 text-[1.07em] text-[#374151]">
                <span>Tổng phụ:</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-[1.07em] text-[#374151]">
                  <span>Giảm giá:</span>
                  <span className="font-semibold text-rose-500">
                    -{discount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}
              <div className="flex justify-between mb-2 text-[1.07em] text-[#374151]">
                <span>Giao hàng:</span>
                <span className="font-semibold">
                  {shippingFee === 0
                    ? "Miễn phí"
                    : shippingFee.toLocaleString("vi-VN") + " đ"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-[#374151] text-xl font-extrabold text-[#111827]">
                <span>TỔNG</span>
                <span>{finalTotal.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
            {/* Coupon */}
            <div className="mt-6 text-[1.05em] text-[#374151]">
              <p>
                Có mã giảm giá?{" "}
                <button
                  type="button"
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="text-[#111827] font-bold underline underline-offset-2 hover:text-[#374151] transition"
                >
                  Nhấn vào đây để nhập mã giảm giá{" "}
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
              </p>
              {showCoupon && (
                <div className="mt-3 p-4 rounded-xl border border-[#ffd6c0] bg-[#fff0e7] shadow animate-fadein flex flex-col">
                  <span className="mb-2 text-[#f88d4d]">
                    Nếu bạn có mã giảm giá, vui lòng áp dụng nó bên dưới.
                  </span>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-[#ffd6c0] bg-white px-3 py-2 focus:ring-2 focus:ring-[#374151]/40 font-medium"
                      placeholder="Mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#374151] to-[#111827] text-white font-bold shadow hover:from-[#111827] hover:to-[#374151] transition"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!couponCode.trim()) {
                          toast.error("Vui lòng nhập mã giảm giá.");
                          return;
                        }
                        try {
                          const token = localStorage.getItem("token");
                          const response = await axios.post(
                            "http://localhost:8000/api/apply-coupon",
                            { code: couponCode.trim() },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          const data = response.data;
                          if (data.status === 200) {
                            setDiscount(Number(data.coupon.discount_value));
                            setCouponId(data.coupon.id);
                            toast.success(
                              data.message || "Áp dụng mã giảm giá thành công!"
                            );
                          } else {
                            setDiscount(0);
                            setCouponId(null);
                            toast.error(
                              data.message || "Mã giảm giá không hợp lệ."
                            );
                          }
                        } catch (error) {
                          setDiscount(0);
                          setCouponId(null);
                          toast.error(
                            error.response?.data?.message ||
                              "Đã xảy ra lỗi khi kiểm tra mã giảm giá."
                          );
                        }
                      }}
                    >
                      ÁP DỤNG
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Payment method */}
            <div className="mt-6">
              <label className="flex items-center gap-3 font-semibold cursor-pointer mb-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="accent-[#374151] w-5 h-5"
                />
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-[#374151]"
                  />
                  Thanh toán qua VNPAY
                </span>
              </label>
              {paymentMethod === "bank" && (
                <div className="ml-7 mt-1 text-[#374151] bg-[#fff0e7] border-l-4 border-[#374151] rounded-r-lg px-4 py-2 shadow animate-fadein">
                  Thực hiện thanh toán qua cổng VNPAY.
                </div>
              )}
              <label className="flex items-center gap-3 font-semibold cursor-pointer mb-2 mt-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-[#111827] w-5 h-5"
                />
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-[#111827]"
                  />
                  Trả tiền mặt khi nhận hàng
                </span>
              </label>
              {paymentMethod === "cod" && (
                <div className="ml-7 mt-1 text-[#374151] bg-[#fff0e7] border-l-4 border-[#111827] rounded-r-lg px-4 py-2 shadow animate-fadein">
                  Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.
                </div>
              )}
            </div>
            <button
              className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-[#374151] to-[#111827] text-white font-extrabold text-xl shadow-xl transition-all hover:scale-105 hover:from-[#111827] hover:to-[#374151] focus:ring-2 focus:ring-[#374151]/50 animate-pulse"
              onClick={handlePayment}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.6s;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-pulse {
          animation: pulseBtn 1.7s infinite alternate
            cubic-bezier(0.2, 0.7, 0.4, 1);
        }
        @keyframes pulseBtn {
          0% {
            box-shadow: 0 4px 22px 0 #ffb28440;
          }
          100% {
            box-shadow: 0 8px 36px 0 #ffb28488;
          }
        }
      `}</style>
    </>
  );
}

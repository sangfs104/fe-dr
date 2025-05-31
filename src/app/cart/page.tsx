// "use client";

// import "../css/card.css";
// import HeaderHome from "../components/header";
// export default function CartPage() {
//   return (
//     <>
//       <HeaderHome></HeaderHome>
//       <div className="cart-content">
//         <div className="cart-items">
//           <p className="cart-summary-text">
//             Bạn đang có <strong>8 sản phẩm</strong> trong giỏ hàng
//           </p>

//           {[1, 2].map((_, i) => (
//             <div className="scroll-container" key={i}>
//               <div className="cart-item">
//                 <img src="/img/sp1.webp" alt="" className="item-image" />
//                 <div className="item-info">
//                   <h2 className="item-name">sang</h2>
//                   <p className="item-desc">Size M</p>
//                   <p className="item-price">100.000₫</p>
//                 </div>
//                 <div className="item-actions">
//                   <div className="quantity-controls">
//                     <button className="quantity-btn">-</button>
//                     <input
//                       type="number"
//                       className="quantity-input"
//                       value={1}
//                       min={1}
//                       readOnly
//                     />
//                     <button className="quantity-btn">+</button>
//                   </div>
//                   <p className="item-total-price">100.000₫</p>
//                   <button className="remove-btn">🗑</button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="cart-note-policy">
//             <div className="cart-note">
//               <label htmlFor="order-note">Ghi chú đơn hàng:</label>
//               <textarea
//                 id="order-note"
//                 placeholder="Nhập ghi chú của bạn..."
//               ></textarea>
//             </div>
//             <div className="cart-policy">
//               <h4>Chính sách Đổi/Trả</h4>
//               <ul>
//                 <li>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</li>
//                 <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
//                 <li>
//                   Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ thống.
//                 </li>
//                 <li>
//                   Sản phẩm sale chỉ hỗ trợ đổi size (nếu cửa hàng còn) trong 7
//                   ngày.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="cart-summary">
//           <h2>Thông tin đơn hàng</h2>
//           <p className="summary-item">
//             Tổng tiền: <span className="total-price">₫</span>
//           </p>
//           <p>Bạn có thể nhập mã giảm giá ở trang thanh toán</p>
//           <button className="checkout-btn">THANH TOÁN</button>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx}>
            <p>Product ID: {item.productId}</p>
            <p>Variant ID: {item.variantId}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { X, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// import CheckoutProgress from "../components/ui/CheckoutProgress";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { removeFromCart, updateQuantity } from "@/store/cartSlice";
// import { RootState } from "@/store/store";
// import { CartItem } from "../types/cart";

// export default function CartPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const cartItems = useAppSelector((state: RootState) => state.cart.items);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const totalPrice = isClient
//     ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     : 0;

//   return (
//     <>
//       <CheckoutProgress currentStep="cart" />

//       <div className="mt-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-col lg:flex-row gap-8">
//         {/* Cart Items */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex-[6] max-h-[600px] overflow-y-auto border border-gray-200 bg-white p-6 rounded-xl shadow-lg"
//         >
//           {isClient && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-lg font-semibold mb-6 text-gray-800"
//             >
//               Giỏ hàng của bạn{" "}
//               <span className="text-rose-600 font-bold">
//                 ({cartItems.length} sản phẩm)
//               </span>
//             </motion.p>
//           )}

//           <AnimatePresence>
//             {isClient &&
//               cartItems.map((item: CartItem, i: number) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <Image
//                     src={item.img}
//                     alt={item.name}
//                     width={80}
//                     height={80}
//                     className="w-20 h-20 object-cover rounded-lg shadow-sm"
//                   />
//                   <div className="flex-1 min-w-0 text-center sm:text-left">
//                     <h2 className="text-lg font-semibold text-gray-800 truncate">
//                       {item.name}
//                     </h2>
//                     <p className="text-sm text-gray-500">Size {item.size}</p>
//                     <p className="text-sm font-medium text-rose-600">
//                       {item.price.toLocaleString("vi-VN")}₫
//                     </p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row items-center justify-between min-w-[200px] gap-4 w-full sm:w-auto">
//                     <div className="flex items-center gap-2">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors"
//                         onClick={() =>
//                           dispatch(
//                             updateQuantity({
//                               productId: +item.productId,
//                               variantId: +item.variantId,
//                               newQuantity: item.quantity - 1,
//                             })
//                           )
//                         }
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </motion.button>
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         readOnly
//                         className="w-12 h-8 border border-gray-300 rounded-md text-center text-sm bg-gray-50"
//                       />
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//                         onClick={() =>
//                           dispatch(
//                             updateQuantity({
//                               productId: +item.productId,
//                               variantId: +item.variantId,
//                               newQuantity: item.quantity + 1,
//                             })
//                           )
//                         }
//                       >
//                         +
//                       </motion.button>
//                     </div>
//                     <p className="font-semibold text-gray-800 min-w-[100px] text-right">
//                       {(item.price * item.quantity).toLocaleString("vi-VN")}₫
//                     </p>
//                     <motion.button
//                       whileHover={{ scale: 1.2, rotate: 90 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="text-red-500 hover:text-red-600 transition-colors"
//                       onClick={() =>
//                         dispatch(
//                           removeFromCart({
//                             productId: +item.productId,
//                             variantId: +item.variantId,
//                           })
//                         )
//                       }
//                     >
//                       <X size={20} />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//           </AnimatePresence>

//           {/* Policy Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm"
//           >
//             <h4 className="text-lg font-semibold text-gray-800 mb-3">
//               Chính sách Đổi/Trả
//             </h4>
//             <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
//               <li>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</li>
//               <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
//               <li>
//                 Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ thống.
//               </li>
//               <li>Sản phẩm sale chỉ hỗ trợ đổi size trong 7 ngày.</li>
//             </ul>
//           </motion.div>
//         </motion.div>

//         {/* Cart Summary */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex-[4] p-6 border border-gray-200 bg-white rounded-xl shadow-lg h-fit"
//         >
//           <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
//             <ShoppingCart size={24} className="text-rose-600" />
//             Thông tin đơn hàng
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-600">Tổng tiền:</p>
//               <motion.span
//                 key={totalPrice}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-xl font-bold text-rose-600"
//               >
//                 {isClient ? totalPrice.toLocaleString("vi-VN") : "0"}₫
//               </motion.span>
//             </div>
//             <p className="text-sm text-gray-500 italic">
//               Bạn có thể nhập mã giảm giá ở trang thanh toán
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/payment")}
//               className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 px-4 text-base font-semibold rounded-xl shadow-md transition-all duration-300"
//             >
//               THANH TOÁN
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CheckoutProgress from "../components/ui/CheckoutProgress";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { CartItem } from "../types/cart";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = isClient
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  // Handle quantity update
  const handleUpdateQuantity = (
    productId: number,
    variantId: number,
    newQuantity: number
  ) => {
    console.log("Updating quantity:", { productId, variantId, newQuantity }); // Debugging
    dispatch(
      updateQuantity({
        productId,
        variantId,
        newQuantity,
      })
    );
  };

  // Handle item removal
  const handleRemoveFromCart = (productId: number, variantId: number) => {
    console.log("Removing item:", { productId, variantId }); // Debugging
    dispatch(
      removeFromCart({
        productId,
        variantId,
      })
    );
  };

  return (
    <>
      <CheckoutProgress currentStep="cart" />

      <div className="mt-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-[6] max-h-[600px] overflow-y-auto border border-gray-200 bg-white p-6 rounded-xl shadow-lg"
        >
          {isClient && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold mb-6 text-gray-800"
            >
              Giỏ hàng của bạn{" "}
              <span className="text-rose-600 font-bold">
                ({cartItems.length} sản phẩm)
              </span>
            </motion.p>
          )}

          <AnimatePresence>
            {isClient &&
              cartItems.map((item: CartItem, i: number) => (
                <motion.div
                  key={`${item.productId}-${item.variantId}`} // Ensure unique key
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">Size {item.size}</p>
                    <p className="text-sm font-medium text-rose-600">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between min-w-[200px] gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.variantId,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </motion.button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-12 h-8 border border-gray-300 rounded-md text-center text-sm bg-gray-50"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.variantId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </motion.button>
                    </div>
                    <p className="font-semibold text-gray-800 min-w-[100px] text-right">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        handleRemoveFromCart(item.productId, item.variantId)
                      }
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Policy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Chính sách Đổi/Trả
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</li>
              <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
              <li>
                Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ thống.
              </li>
              <li>Sản phẩm sale chỉ hỗ trợ đổi size trong 7 ngày.</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Cart Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-[4] p-6 border border-gray-200 bg-white rounded-xl shadow-lg h-fit"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
            <ShoppingCart size={24} className="text-rose-600" />
            Thông tin đơn hàng
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Tổng tiền:</p>
              <motion.span
                key={totalPrice}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold text-rose-600"
              >
                {isClient ? totalPrice.toLocaleString("vi-VN") : "0"}₫
              </motion.span>
            </div>
            <p className="text-sm text-gray-500 italic">
              Bạn có thể nhập mã giảm giá ở trang thanh toán
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/payment")}
              className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 px-4 text-base font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              THANH TOÁN
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

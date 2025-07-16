// "use client";

// import * as Dialog from "@radix-ui/react-dialog";
// import { useRouter } from "next/navigation";
// import { CheckCircle2, X } from "lucide-react";
// import { motion } from "framer-motion";

// interface CartConfirmationModalProps {
//   open: boolean;
//   onClose: () => void;
//   quantity: number;
//   productName: string;
// }

// export default function CartConfirmationModal({
//   open,
//   onClose,
//   quantity,
//   productName,
// }: CartConfirmationModalProps) {
//   const router = useRouter();

//   const handleRedirect = (path: string) => {
//     onClose();
//     router.push(path);
//   };

//   return (
//     <Dialog.Root open={open} onOpenChange={onClose}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
//         <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl space-y-4">
//           <div className="flex justify-between items-start">
//             <div className="flex items-center gap-2 text-green-600">
//               <CheckCircle2 size={24} />
//               <Dialog.Title className="text-lg font-semibold">
//                 Đã thêm vào giỏ hàng!
//               </Dialog.Title>
//             </div>
//             <Dialog.Close asChild>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={20} />
//               </button>
//             </Dialog.Close>
//           </div>

//           <p className="text-sm text-gray-700">
//             {quantity} sản phẩm <strong>{productName}</strong> đã được thêm vào
//             giỏ hàng của bạn.
//           </p>

//           <div className="flex justify-end gap-2 pt-2">
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleRedirect("/cart")}
//               className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
//             >
//               Xem giỏ hàng
//             </motion.button>
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleRedirect("/checkout")}
//               className="px-4 py-2 text-sm rounded-lg bg-[#FF5722] text-white hover:bg-[#e64a19]"
//             >
//               Thanh toán ngay
//             </motion.button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AddToCartModalProps {
  open: boolean;
  onClose: () => void;
  quantity: number;
  productName: string;
  price: number;
  salePrice?: string | null;
  image: string;
}

export default function AddToCartModal({
  open,
  onClose,
  quantity,
  productName,
  price,
  salePrice,
  image,
}: AddToCartModalProps) {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={24} />
              <Dialog.Title className="text-lg font-semibold">
                Đã thêm vào giỏ hàng!
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Hình ảnh và chi tiết sản phẩm */}
          <div className="flex gap-4 items-start">
            <Image
              src={`/img/${image}`}
              alt={productName}
              width={80}
              height={80}
              className="rounded-lg border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{productName}</p>
              <p className="text-sm text-gray-600">
                Số lượng: <strong>{quantity}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Giá:{" "}
                {salePrice ? (
                  <>
                    <span className="line-through mr-1 text-gray-400">
                      {price.toLocaleString("vi-VN")} ₫
                    </span>
                    <span className="text-red-500 font-semibold">
                      {parseInt(salePrice).toLocaleString("vi-VN")} ₫
                    </span>
                  </>
                ) : (
                  <span className="text-blue-600 font-semibold">
                    {price.toLocaleString("vi-VN")} ₫
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRedirect("/cart")}
              className="bg-[#FF5722] hover:bg-[#F44336] text-white px-4 py-2 rounded-xl text-sm font-medium shadow"
            >
              Xem giỏ hàng
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium"
            >
              Tiếp tục mua sắm
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";
// import { CheckCircle, Circle } from "lucide-react";

// type Step = "detail" | "cart" | "checkout";

// interface CheckoutProgressProps {
//   currentStep: Step;
// }

// const steps: { key: Step; label: string }[] = [
//   { key: "detail", label: "Xem chi tiết" },
//   { key: "cart", label: "Thêm giỏ hàng" },
//   { key: "checkout", label: "Thanh toán" },
// ];

// export default function CheckoutProgress({
//   currentStep,
// }: CheckoutProgressProps) {
//   const currentIndex = steps.findIndex((step) => step.key === currentStep);

//   return (
//     <div className="flex items-center justify-center gap-4 md:gap-8 my-6">
//       {steps.map((step, index) => {
//         const isActive = index === currentIndex;
//         const isDone = index < currentIndex;

//         return (
//           <div key={step.key} className="flex items-center gap-2">
//             <div
//               className={cn(
//                 "w-6 h-6 flex items-center justify-center rounded-full border",
//                 isDone
//                   ? "bg-green-500 text-white border-green-500"
//                   : isActive
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-400 border-gray-300"
//               )}
//             >
//               {isDone ? <CheckCircle size={16} /> : <Circle size={16} />}
//             </div>
//             <span
//               className={cn(
//                 "text-sm font-medium",
//                 isActive
//                   ? "text-blue-600"
//                   : isDone
//                   ? "text-green-600"
//                   : "text-gray-400"
//               )}
//             >
//               {step.label}
//             </span>
//             {index < steps.length - 1 && (
//               <div
//                 className={cn(
//                   "h-0.5 w-6 md:w-10 bg-gray-300 mx-2",
//                   isDone ? "bg-green-500" : isActive ? "bg-blue-600" : ""
//                 )}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

type Step = "detail" | "cart" | "checkout";

interface CheckoutProgressProps {
  currentStep: Step;
}

const steps: { key: Step; label: string }[] = [
  { key: "detail", label: "Xem chi tiết" },
  { key: "cart", label: "Thêm giỏ hàng" },
  { key: "checkout", label: "Thanh toán" },
];

export default function CheckoutProgress({
  currentStep,
}: CheckoutProgressProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 my-8 px-4">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isDone = index < currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2 relative">
            <div
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm",
                isDone
                  ? "bg-green-500 text-white border-green-500"
                  : isActive
                  ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                  : "bg-white text-gray-300 border-gray-300"
              )}
            >
              {isDone ? <CheckCircle size={18} /> : <Circle size={18} />}
            </div>
            <span
              className={cn(
                "text-[13px] sm:text-sm font-medium transition-colors",
                isActive
                  ? "text-blue-600"
                  : isDone
                  ? "text-green-600"
                  : "text-gray-400"
              )}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-6 sm:w-8 md:w-10 mx-1 rounded-full transition-all",
                  isDone
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : isActive
                    ? "bg-blue-500"
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

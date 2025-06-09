// // components/DreamToast.tsx
// import { toast, Toaster, ToastBar } from "react-hot-toast";
// import { Fragment } from "react";

// export function DreamToast() {
//   return (
//     <Toaster position="top-right" reverseOrder={false}>
//       {(t) => (
//         <ToastBar toast={t}>
//           {({ icon, message }) => (
//             <div className="flex flex-col items-start gap-1 p-2">
//               <div className="text-xs font-semibold text-pink-500 animate-pulse">
//                 DREAMS ✨
//               </div>
//               <div className="flex items-center gap-2">
//                 {icon}
//                 <span>{message}</span>
//               </div>
//             </div>
//           )}
//         </ToastBar>
//       )}
//     </Toaster>
//   );
// }
// components/DreamToast.tsx
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { cn } from "@/lib/utils"; // Nếu có utils tailwind để combine class
import { Fragment } from "react";

export function DreamToast() {
  return (
    <Toaster position="top-right" reverseOrder={false}>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div
              className={cn(
                "flex flex-col items-start px-4 py-3 shadow-lg rounded-xl border border-orange-300 bg-white/95 backdrop-blur-sm",
                t.visible ? "animate-enter" : "animate-leave"
              )}
            >
              <div className="text-sm font-bold text-[#ff5722] tracking-wide uppercase drop-shadow-sm">
                DREAMS ✨
              </div>
              <div className="flex items-center gap-2 mt-1 text-gray-800 text-sm">
                {icon}
                <span>{message}</span>
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

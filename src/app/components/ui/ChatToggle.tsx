// // "use client";

// // import { useState } from "react";
// // import ChatBox from "./ChatBot";
// // import { MessageCircle } from "lucide-react";

// // export default function ChatToggle() {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       <div
// //         onClick={() => setOpen(!open)}
// //         className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 transition-all duration-300"
// //         title="Trò chuyện với AI"
// //       >
// //         <MessageCircle size={26} />
// //       </div>

// //       {open && <ChatBox onClose={() => setOpen(false)} />}
// //     </>
// //   );
// // }
// import { MessageCircle } from "lucide-react";

// type ChatToggleProps = {
//   onOpen?: () => void;
// };

// export default function ChatToggle({ onOpen }: ChatToggleProps) {
//   return (
//     <div
//       onClick={onOpen}
//       className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 transition-all duration-300"
//       title="Trò chuyện với AI"
//     >
//       <MessageCircle size={26} />
//     </div>
//   );
// }

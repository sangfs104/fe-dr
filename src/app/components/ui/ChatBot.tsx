// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Image from "next/image";
// import {
//   MessageCircle,
//   Send,
//   Loader2,
//   Sparkles,
//   Tag,
//   Shirt,
//   Stars,
//   X,
//   Mic,
// } from "lucide-react";

// type ApiVariant = {
//   id: number;
//   product_id?: number;
//   img_id?: number | null;
//   size?: string | null;
//   color?: string | null;
//   price?: number | null;
//   sale_price?: number | null;
//   stock_quantity?: number | null;
//   status?: number | null;
// };

// type ApiCategory = {
//   id?: number | null;
//   name?: string | null;
// };

// type ApiProductBasic = {
//   id: number;
//   name: string;
//   description?: string | null;
//   price?: number | null;
//   images: string[];
// };

// type ApiProductFull = {
//   id: number;
//   name: string;
//   description?: string | null;
//   images: string[];
//   variant?: ApiVariant[];
//   category?: ApiCategory;
// };

// type ApiResponse = {
//   message?: string;
//   style_name?: string | null;
//   description?: string | null;
//   keywords?: string[];
//   products?: (ApiProductBasic | ApiProductFull)[];
//   mix_and_match?: string[] | null;
// };

// type ChatRole = "user" | "assistant" | "system";

// type ChatAttachment = {
//   kind: "style";
//   style_name?: string | null;
//   description?: string | null;
//   keywords?: string[];
//   products?: (ApiProductBasic | ApiProductFull)[];
//   mix_and_match?: string[] | null;
// };

// type ChatMessage = {
//   id: string;
//   role: ChatRole;
//   text: string;
//   attachment?: ChatAttachment;
// };

// function clsx(...args: (string | false | null | undefined)[]): string {
//   return args.filter(Boolean).join(" ");
// }

// function formatPrice(p?: number | null): string {
//   if (p == null) return "";
//   try {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//       maximumFractionDigits: 0,
//     }).format(p);
//   } catch {
//     return `${p}`;
//   }
// }

// const SpeechRecognition =
//   typeof window !== "undefined"
//     ? window.SpeechRecognition || window.webkitSpeechRecognition
//     : null;

// const recognition = SpeechRecognition ? new SpeechRecognition() : null;

// if (recognition) {
//   recognition.lang = "vi-VN";
//   recognition.interimResults = true;
//   recognition.continuous = false;
// }

// export default function ChatBoxStylistAI({
//   apiUrl,
//   title = "Stylist AI",
//   onClose,
// }: {
//   apiUrl?: string;
//   title?: string;
//   onClose?: () => void;
// }) {
//   const endpoint = useMemo(() => {
//     const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL ??
//       ""}/api/stylist/analyze`;
//     if (!process.env.NEXT_PUBLIC_API_URL) {
//       console.warn("NEXT_PUBLIC_API_URL is not set. Using default endpoint.");
//     }
//     return apiUrl || defaultUrl;
//   }, [apiUrl]);

//   const [isOpen, setIsOpen] = useState<boolean>(true);
//   const [input, setInput] = useState<string>("");
//   const [sending, setSending] = useState<boolean>(false);
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: crypto.randomUUID(),
//       role: "assistant",
//       text:
//         "Xin chào! Mình là Stylist AI 👗 Hãy nói cho mình biết bạn muốn tìm sản phẩm gì, hỏi size, xem ưu đãi/flash sale, hoặc mình có thể phối một set đồ theo gu của bạn nhé!",
//     },
//   ]);

//   const listRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     listRef.current?.scrollTo({
//       top: listRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages.length, sending]);

//   useEffect(() => {
//     if (!textareaRef.current) return;
//     const el = textareaRef.current;
//     el.style.height = "0px";
//     el.style.height = `${Math.min(120, el.scrollHeight)}px`;
//   }, [input]);

//   const sendInput = useCallback(async () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const userMsg: ChatMessage = {
//       id: crypto.randomUUID(),
//       role: "user",
//       text: trimmed,
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setSending(true);

//     try {
//       const res = await axios.post<ApiResponse>(endpoint, {
//         answers: [trimmed],
//       });

//       const data = res.data || {};

//       const attachment: ChatAttachment | undefined =
//         data.style_name ||
//         data.description ||
//         data.keywords ||
//         data.products ||
//         data.mix_and_match
//           ? {
//               kind: "style",
//               style_name: data.style_name,
//               description: data.description,
//               keywords: data.keywords,
//               products: data.products ?? [],
//               mix_and_match: data.mix_and_match ?? null,
//             }
//           : undefined;

//       const assistantMsg: ChatMessage = {
//         id: crypto.randomUUID(),
//         role: "assistant",
//         text: data.message || "Mình đã tìm thấy một số gợi ý cho bạn!",
//         attachment,
//       };

//       setMessages((prev) => [...prev, assistantMsg]);
//     } catch (err) {
//       console.error("API Error:", err);
//       let msg = "Đã có lỗi xảy ra. Vui lòng thử lại.";
//       if (err instanceof axios.AxiosError && err.response?.data?.message) {
//         msg = err.response.data.message;
//       }
//       toast.error(msg);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           role: "assistant",
//           text: msg,
//         },
//       ]);
//     } finally {
//       setSending(false);
//     }
//   }, [input, endpoint]);

//   const startRecording = useCallback(() => {
//     if (!recognition) {
//       toast.error("Trình duyệt không hỗ trợ nhận diện giọng nói.");
//       return;
//     }
//     setIsRecording(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0].transcript)
//         .join("");
//       setInput(transcript);
//     };

//     recognition.onend = () => {
//       setIsRecording(false);
//       if (input.trim()) sendInput();
//     };

//     recognition.onerror = (event) => {
//       setIsRecording(false);
//       toast.error("Lỗi nhận diện giọng nói: " + event.error);
//     };
//   }, [input, sendInput]);

//   const stopRecording = useCallback(() => {
//     if (recognition && isRecording) {
//       recognition.stop();
//     }
//   }, [isRecording]);

//   const handleClose = () => {
//     setIsOpen(false);
//     if (onClose) onClose(); // Notify parent to close the modal
//   };

//   const onKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         if (!sending) sendInput();
//       }
//     },
//     [sending, sendInput]
//   );

//   return (
//     <>
//       {/* Backdrop only when open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={handleClose}
//         ></div>
//       )}
//       <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
//         <Toaster position="top-right" />
//         <div className="rounded-2xl shadow-2xl bg-zinc-900 text-zinc-100 border border-zinc-800 overflow-hidden">
//           <div className="flex items-center justify-between p-3 border-b border-zinc-800">
//             <div className="flex items-center gap-2">
//               <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800">
//                 <Sparkles className="h-4 w-4" />
//               </div>
//               <div className="font-semibold">{title}</div>
//             </div>
//             <button
//               onClick={handleClose}
//               className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors"
//             >
//               {isOpen ? (
//                 <>
//                   <X className="h-4 w-4" /> Đóng
//                 </>
//               ) : (
//                 <>
//                   <MessageCircle className="h-4 w-4" /> Mở
//                 </>
//               )}
//             </button>
//           </div>

//           {isOpen && (
//             <>
//               <div
//                 ref={listRef}
//                 className="max-h-[60vh] overflow-y-auto p-3 space-y-3"
//               >
//                 {messages.map((m) => (
//                   <MessageBubble key={m.id} msg={m} />
//                 ))}
//                 {sending && (
//                   <div className="flex items-center gap-2 text-zinc-400 text-sm">
//                     <Loader2 className="h-4 w-4 animate-spin" /> Đang soạn trả
//                     lời...
//                   </div>
//                 )}
//               </div>

//               <div className="border-t border-zinc-800 p-3">
//                 <div className="relative">
//                   <textarea
//                     ref={textareaRef}
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={onKeyDown}
//                     placeholder="Nhập hoặc nói để hỏi: tìm sản phẩm, hỏi size, xem giảm giá/flash sale, hoặc nhờ phối đồ..."
//                     className="w-full resize-none bg-zinc-800 text-zinc-100 rounded-2xl p-3 pr-20 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-700"
//                     rows={1}
//                   />
//                   <button
//                     onClick={isRecording ? stopRecording : startRecording}
//                     disabled={sending || !SpeechRecognition}
//                     className={clsx(
//                       "absolute right-12 bottom-2 inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm transition-colors",
//                       sending || !SpeechRecognition
//                         ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
//                         : isRecording
//                         ? "bg-red-600 text-white hover:bg-red-700"
//                         : "bg-blue-600 text-white hover:bg-blue-700"
//                     )}
//                   >
//                     <Mic className="h-4 w-4" />
//                     {isRecording ? "Dừng" : "Nói"}
//                   </button>
//                   <button
//                     onClick={sendInput}
//                     disabled={sending || !input.trim()}
//                     className={clsx(
//                       "absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm transition-colors",
//                       sending || !input.trim()
//                         ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
//                         : "bg-white text-zinc-900 hover:bg-zinc-200"
//                     )}
//                   >
//                     {sending ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Gửi
//                       </>
//                     ) : (
//                       <>
//                         <Send className="h-4 w-4" /> Gửi
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 <div className="mt-2 text-[11px] text-zinc-500">
//                   Nhấn Enter để gửi • Shift+Enter để xuống dòng
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function MessageBubble({ msg }: { msg: ChatMessage }) {
//   const isUser = msg.role === "user";
//   const [highlightedText, setHighlightedText] = useState<string[]>([]);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

//   useEffect(() => {
//     if (msg.role === "assistant" && msg.text) {
//       const utterance = new SpeechSynthesisUtterance(msg.text);
//       utterance.lang = "vi-VN";
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.volume = 1;

//       const words = msg.text.split(" ");
//       let wordIndex = 0;

//       utterance.onboundary = (event) => {
//         if (event.name === "word" && event.charIndex != null) {
//           setHighlightedText(words.slice(0, wordIndex + 1));
//           wordIndex++;
//         }
//       };

//       utterance.onend = () => {
//         setHighlightedText([]);
//         utteranceRef.current = null;
//       };

//       utteranceRef.current = utterance;
//       window.speechSynthesis.speak(utterance);

//       return () => {
//         if (utteranceRef.current) {
//           window.speechSynthesis.cancel();
//           utteranceRef.current = null;
//           setHighlightedText([]);
//         }
//       };
//     }
//   }, [msg.text, msg.role]);

//   const renderText = () => {
//     if (!msg.text) return null;
//     const words = msg.text.split(" ");
//     return (
//       <span>
//         {words.map((word, index) => (
//           <span
//             key={index}
//             className={clsx(
//               highlightedText.includes(word) ? "bg-yellow-500 text-black" : ""
//             )}
//           >
//             {word}{" "}
//           </span>
//         ))}
//       </span>
//     );
//   };

//   return (
//     <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
//       <div
//         className={clsx(
//           "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
//           isUser ? "bg-zinc-700 text-zinc-100" : "bg-zinc-800 text-zinc-100"
//         )}
//       >
//         {msg.text && (
//           <div className="whitespace-pre-wrap leading-relaxed">
//             {renderText()}
//           </div>
//         )}
//         {!isUser && msg.attachment?.kind === "style" && (
//           <div className="mt-2 space-y-3">
//             <StyleSummary
//               name={msg.attachment.style_name}
//               desc={msg.attachment.description}
//               keywords={msg.attachment.keywords}
//             />
//             {Array.isArray(msg.attachment.mix_and_match) &&
//               msg.attachment.mix_and_match.length > 0 && (
//                 <MixAndMatch names={msg.attachment.mix_and_match} />
//               )}
//             {Array.isArray(msg.attachment.products) &&
//               msg.attachment.products.length > 0 && (
//                 <ProductsGrid products={msg.attachment.products} />
//               )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function StyleSummary({
//   name,
//   desc,
//   keywords,
// }: {
//   name?: string | null;
//   desc?: string | null;
//   keywords?: string[];
// }) {
//   if (!name && !desc && (!keywords || keywords.length === 0)) return null;
//   return (
//     <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
//       <div className="flex items-center gap-2 text-sm font-semibold">
//         <Stars className="h-4 w-4" />
//         {name || "Gu thời trang của bạn"}
//       </div>
//       {desc && (
//         <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{desc}</p>
//       )}
//       {keywords && keywords.length > 0 && (
//         <div className="mt-2 flex flex-wrap gap-2">
//           {keywords.map((k, i) => (
//             <span
//               key={i}
//               className="inline-flex items-center gap-1 rounded-full border border-zinc-700 px-2 py-1 text-[11px] text-zinc-300"
//             >
//               <Tag className="h-3 w-3" /> {k}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MixAndMatch({ names }: { names: string[] }) {
//   return (
//     <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
//       <div className="flex items-center gap-2 text-sm font-semibold">
//         <Shirt className="h-4 w-4" /> Set phối đồ gợi ý
//       </div>
//       <ul className="mt-2 list-disc list-inside text-sm text-zinc-300 space-y-1">
//         {names.map((n, i) => (
//           <li key={i}>{n}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ProductsGrid({
//   products,
// }: {
//   products: (ApiProductBasic | ApiProductFull)[];
// }) {
//   return (
//     <div className="grid grid-cols-1 gap-3">
//       {products.map((p) => (
//         <ProductCard
//           key={p.id + ((p as ApiProductFull).variant ? "-full" : "-basic")}
//           product={p}
//         />
//       ))}
//     </div>
//   );
// }

// function ProductCard({
//   product,
// }: {
//   product: ApiProductBasic | ApiProductFull;
// }) {
//   const cover = product.images?.[0];
//   const hasVariants = Array.isArray((product as ApiProductFull).variant);
//   const variants = (product as ApiProductFull).variant || [];

//   const basePrice = "price" in product ? product.price ?? null : null;
//   const firstSale =
//     variants.find((v) => v.sale_price != null)?.sale_price ?? null;
//   const firstPrice = variants.find((v) => v.price != null)?.price ?? null;
//   const displayPrice = basePrice ?? firstSale ?? firstPrice ?? null;

//   return (
//     <div className="rounded-2xl overflow-hidden border border-zinc-700">
//       <div className="aspect-[16/9] bg-zinc-800">
//         {cover ? (
//           <Image
//             src={cover}
//             alt={product.name}
//             className="h-full w-full object-cover"
//             width={500}
//             height={281}
//             unoptimized
//             loading="lazy"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-zinc-500 text-xs">
//             Không có ảnh
//           </div>
//         )}
//       </div>

//       <div className="p-3">
//         <div className="font-medium text-zinc-100 line-clamp-2">
//           {product.name}
//         </div>
//         {displayPrice != null && (
//           <div className="mt-1 text-sm text-zinc-300">
//             {formatPrice(displayPrice)}
//           </div>
//         )}
//         {product.description && (
//           <div className="mt-1 text-xs text-zinc-400 line-clamp-2">
//             {product.description}
//           </div>
//         )}

//         {hasVariants && variants.length > 0 && (
//           <div className="mt-3 overflow-x-auto">
//             <table className="min-w-full text-xs">
//               <thead>
//                 <tr className="text-zinc-400">
//                   <th className="text-left font-normal pr-3 py-1">Size</th>
//                   <th className="text-left font-normal pr-3 py-1">Màu</th>
//                   <th className="text-left font-normal pr-3 py-1">Giá</th>
//                   <th className="text-left font-normal pr-3 py-1">Giá KM</th>
//                   <th className="text-left font-normal pr-3 py-1">Kho</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variants.map((v, i) => (
//                   <tr key={v.id ?? i} className="text-zinc-300">
//                     <td className="pr-3 py-1">{v.size ?? "-"}</td>
//                     <td className="pr-3 py-1">{v.color ?? "-"}</td>
//                     <td className="pr-3 py-1">
//                       {v.price != null ? formatPrice(v.price) : "-"}
//                     </td>
//                     <td className="pr-3 py-1">
//                       {v.sale_price != null ? formatPrice(v.sale_price) : "-"}
//                     </td>
//                     <td className="pr-3 py-1">{v.stock_quantity ?? "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import {
  Send,
  Loader2,
  Sparkles,
  Tag,
  Shirt,
  Stars,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  ShoppingBag,
  Palette,
  Zap,
} from "lucide-react";

type ApiVariant = {
  id: number;
  product_id?: number;
  img_id?: number | null;
  size?: string | null;
  color?: string | null;
  price?: number | null;
  sale_price?: number | null;
  stock_quantity?: number | null;
  status?: number | null;
};

type ApiCategory = {
  id?: number | null;
  name?: string | null;
};

type ApiProductBasic = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  images: string[];
};

type ApiProductFull = {
  id: number;
  name: string;
  description?: string | null;
  images: string[];
  variant?: ApiVariant[];
  category?: ApiCategory;
};

type ApiResponse = {
  message?: string;
  style_name?: string | null;
  description?: string | null;
  keywords?: string[];
  products?: (ApiProductBasic | ApiProductFull)[];
  mix_and_match?: string[] | null;
};

type ChatRole = "user" | "assistant" | "system";

type ChatAttachment = {
  kind: "style";
  style_name?: string | null;
  description?: string | null;
  keywords?: string[];
  products?: (ApiProductBasic | ApiProductFull)[];
  mix_and_match?: string[] | null;
};

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  attachment?: ChatAttachment;
  timestamp?: Date;
};

function clsx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}

function formatPrice(p?: number | null): string {
  if (p == null) return "";
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(p);
  } catch {
    return `${p}`;
  }
}

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "vi-VN";
  recognition.interimResults = true;
  recognition.continuous = false;
}

export default function ChatBoxStylistAI({
  apiUrl,
  title = "Stylist AI",
  onClose,
}: {
  apiUrl?: string;
  title?: string;
  onClose?: () => void;
}) {
  const endpoint = useMemo(() => {
    const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL ??
      ""}/api/stylist/analyze`;
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL is not set. Using default endpoint.");
    }
    return apiUrl || defaultUrl;
  }, [apiUrl]);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "Xin chào! Mình là Stylist AI 👗 Hãy nói cho mình biết bạn muốn tìm sản phẩm gì, hỏi size, xem ưu đãi/flash sale, hoặc mình có thể phối một set đồ theo gu của bạn nhé!",
      timestamp: new Date(),
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (listRef.current && !isMinimized) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, sending, isMinimized]);

  useEffect(() => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "0px";
    el.style.height = `${Math.min(120, el.scrollHeight)}px`;
  }, [input]);

  const sendInput = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await axios.post<ApiResponse>(endpoint, {
        answers: [trimmed],
      });

      const data = res.data || {};

      const attachment: ChatAttachment | undefined =
        data.style_name ||
        data.description ||
        data.keywords ||
        data.products ||
        data.mix_and_match
          ? {
              kind: "style",
              style_name: data.style_name,
              description: data.description,
              keywords: data.keywords,
              products: data.products ?? [],
              mix_and_match: data.mix_and_match ?? null,
            }
          : undefined;

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.message || "Mình đã tìm thấy một số gợi ý cho bạn!",
        attachment,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("API Error:", err);
      let msg = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      if (err instanceof axios.AxiosError && err.response?.data?.message) {
        msg = err.response.data.message;
      }
      toast.error(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: msg,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }, [input, endpoint]);

  const startRecording = useCallback(() => {
    if (!recognition) {
      toast.error("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }
    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (input.trim()) sendInput();
    };

    recognition.onerror = (event) => {
      setIsRecording(false);
      toast.error("Lỗi nhận diện giọng nói: " + event.error);
    };
  }, [input, sendInput]);

  const stopRecording = useCallback(() => {
    if (recognition && isRecording) {
      recognition.stop();
    }
  }, [isRecording]);

  const toggleSpeech = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
    }
  }, [isSpeaking]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sending) sendInput();
      }
    },
    [sending, sendInput]
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="fixed bottom-6 right-6 z-50 w-full max-w-md transition-all duration-300 ease-in-out">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#f4f4f5",
              border: "1px solid #27272a",
            },
          }}
        />

        {/* Main Chat Container */}
        <div
          className={clsx(
            "rounded-3xl shadow-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-100 border border-zinc-700/50 overflow-hidden backdrop-blur-xl transition-all duration-500 ease-out",
            isMinimized ? "h-16" : "h-auto"
          )}
        >
          {/* Header with gradient and glassmorphism effect */}
          <div className="relative p-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 border-b border-zinc-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce" />
                </div>
                <div>
                  <div className="font-bold text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {title}
                  </div>
                  <div className="text-xs text-zinc-400">
                    AI Fashion Assistant
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSpeech}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                >
                  {isSpeaking ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={toggleMinimize}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area with custom scrollbar */}
              <div
                ref={listRef}
                className="max-h-[70vh] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#52525b transparent",
                }}
              >
                {messages.map((m, index) => (
                  <MessageBubble
                    key={m.id}
                    msg={m}
                    isLast={index === messages.length - 1}
                    isSpeaking={isSpeaking}
                    setIsSpeaking={setIsSpeaking}
                  />
                ))}
                {sending && (
                  <div className="flex items-center gap-3 text-zinc-400 text-sm animate-fade-in">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    Đang soạn trả lời...
                  </div>
                )}
              </div>

              {/* Enhanced Input Area */}
              <div className="border-t border-zinc-700/50 p-4 bg-zinc-900/50 backdrop-blur-sm">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="✨ Nhập hoặc nói để hỏi về thời trang, size, giảm giá..."
                      className="w-full resize-none bg-zinc-800/50 backdrop-blur-sm text-zinc-100 rounded-3xl p-4 pr-28 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 border border-zinc-700/50"
                      rows={1}
                    />

                    {/* Voice Recording Button */}
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={sending || !SpeechRecognition}
                      className={clsx(
                        "absolute right-16 bottom-3 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110",
                        sending || !SpeechRecognition
                          ? "bg-zinc-700/50 text-zinc-500 cursor-not-allowed"
                          : isRecording
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                      )}
                    >
                      {isRecording ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={sendInput}
                      disabled={sending || !input.trim()}
                      className={clsx(
                        "absolute right-3 bottom-3 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110",
                        sending || !input.trim()
                          ? "bg-zinc-700/50 text-zinc-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                      )}
                    >
                      {sending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                  <span>Enter để gửi • Shift+Enter xuống dòng</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      AI Powered
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function MessageBubble({
  msg,
  isLast,
  isSpeaking,
  setIsSpeaking,
}: {
  msg: ChatMessage;
  isLast: boolean;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
}) {
  const isUser = msg.role === "user";
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (msg.role === "assistant" && msg.text && isLast && isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(msg.text);
      utterance.lang = "vi-VN";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const words = msg.text.split(" ");
      let wordIndex = 0;

      utterance.onboundary = (event) => {
        if (event.name === "word" && event.charIndex != null) {
          setHighlightedText(words.slice(0, wordIndex + 1));
          wordIndex++;
        }
      };

      utterance.onend = () => {
        setHighlightedText([]);
        setIsSpeaking(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);

      return () => {
        if (utteranceRef.current) {
          window.speechSynthesis.cancel();
          utteranceRef.current = null;
          setHighlightedText([]);
        }
      };
    }
  }, [msg.text, msg.role, isLast, isSpeaking, setIsSpeaking]);

  const renderText = () => {
    if (!msg.text) return null;
    const words = msg.text.split(" ");
    return (
      <span>
        {words.map((word, index) => (
          <span
            key={index}
            className={clsx(
              "transition-all duration-200",
              highlightedText.includes(word)
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-1 rounded"
                : ""
            )}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    );
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={clsx(
        "flex items-end gap-3 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="flex flex-col max-w-[85%]">
        <div
          className={clsx(
            "rounded-3xl px-4 py-3 text-sm transition-all duration-300 hover:shadow-lg",
            isUser
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "bg-zinc-800/50 backdrop-blur-sm text-zinc-100 border border-zinc-700/50"
          )}
        >
          {msg.text && (
            <div className="whitespace-pre-wrap leading-relaxed">
              {renderText()}
            </div>
          )}

          {!isUser && msg.attachment?.kind === "style" && (
            <div className="mt-4 space-y-4">
              <StyleSummary
                name={msg.attachment.style_name}
                desc={msg.attachment.description}
                keywords={msg.attachment.keywords}
              />
              {Array.isArray(msg.attachment.mix_and_match) &&
                msg.attachment.mix_and_match.length > 0 && (
                  <MixAndMatch names={msg.attachment.mix_and_match} />
                )}
              {Array.isArray(msg.attachment.products) &&
                msg.attachment.products.length > 0 && (
                  <ProductsGrid products={msg.attachment.products} />
                )}
            </div>
          )}
        </div>

        {msg.timestamp && (
          <div
            className={clsx(
              "text-xs text-zinc-500 mt-1 px-2",
              isUser ? "text-right" : "text-left"
            )}
          >
            {formatTime(msg.timestamp)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-white/80" />
        </div>
      )}
    </div>
  );
}

function StyleSummary({
  name,
  desc,
  keywords,
}: {
  name?: string | null;
  desc?: string | null;
  keywords?: string[];
}) {
  if (!name && !desc && (!keywords || keywords.length === 0)) return null;

  return (
    <div className="rounded-3xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-4 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 text-sm font-semibold mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
          <Stars className="h-5 w-5 text-yellow-400" />
        </div>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          {name || "Gu thời trang của bạn"}
        </span>
      </div>

      {desc && (
        <p className="text-zinc-300 text-sm leading-relaxed mb-3 pl-11">
          {desc}
        </p>
      )}

      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-11">
          {keywords.map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 px-3 py-1 text-xs text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-200"
            >
              <Tag className="h-3 w-3" />
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MixAndMatch({ names }: { names: string[] }) {
  return (
    <div className="rounded-3xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-4 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 text-sm font-semibold mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
          <Shirt className="h-5 w-5 text-cyan-400" />
        </div>
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Set phối đồ gợi ý
        </span>
      </div>

      <div className="space-y-2 pl-11">
        {names.map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-zinc-300"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsGrid({
  products,
}: {
  products: (ApiProductBasic | ApiProductFull)[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id + ((p as ApiProductFull).variant ? "-full" : "-basic")}
          product={p}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: ApiProductBasic | ApiProductFull;
}) {
  const cover = product.images?.[0];
  const hasVariants = Array.isArray((product as ApiProductFull).variant);
  const variants = (product as ApiProductFull).variant || [];

  const basePrice = "price" in product ? product.price ?? null : null;
  const firstSale =
    variants.find((v) => v.sale_price != null)?.sale_price ?? null;
  const firstPrice = variants.find((v) => v.price != null)?.price ?? null;
  const displayPrice = basePrice ?? firstSale ?? firstPrice ?? null;

  const hasDiscount = firstSale && firstPrice && firstSale < firstPrice;

  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-700/50 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm hover:border-purple-500/30 hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[16/9] bg-zinc-800/50 overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            width={500}
            height={281}
            unoptimized
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-zinc-500">
            <ShoppingBag className="h-12 w-12 opacity-50" />
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-2xl text-xs font-bold animate-pulse">
            🔥 SALE
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-zinc-100 line-clamp-2 mb-2 group-hover:text-purple-400 transition-colors duration-200">
          {product.name}
        </h3>

        {displayPrice != null && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {formatPrice(displayPrice)}
            </span>
            {hasDiscount && firstPrice && (
              <span className="text-sm text-zinc-400 line-through">
                {formatPrice(firstPrice)}
              </span>
            )}
          </div>
        )}

        {product.description && (
          <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {hasVariants && variants.length > 0 && (
          <div className="mt-4 bg-zinc-800/30 rounded-2xl p-3 border border-zinc-700/30">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                Chi tiết sản phẩm
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-700/30">
                    <th className="text-left font-medium pr-3 py-2">Size</th>
                    <th className="text-left font-medium pr-3 py-2">Màu</th>
                    <th className="text-left font-medium pr-3 py-2">Giá gốc</th>
                    <th className="text-left font-medium pr-3 py-2">Giá KM</th>
                    <th className="text-left font-medium pr-3 py-2">Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, i) => (
                    <tr
                      key={v.id ?? i}
                      className="text-zinc-300 hover:bg-zinc-700/20 transition-colors duration-200"
                    >
                      <td className="pr-3 py-2">
                        <span className="px-2 py-1 bg-zinc-700/50 rounded-lg text-xs">
                          {v.size ?? "-"}
                        </span>
                      </td>
                      <td className="pr-3 py-2">
                        <div className="flex items-center gap-2">
                          {v.color && (
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border border-zinc-600" />
                          )}
                          {v.color ?? "-"}
                        </div>
                      </td>
                      <td className="pr-3 py-2">
                        {v.price != null ? (
                          <span
                            className={clsx(
                              v.sale_price != null && v.sale_price < v.price
                                ? "line-through text-zinc-500"
                                : "text-green-400"
                            )}
                          >
                            {formatPrice(v.price)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="pr-3 py-2">
                        {v.sale_price != null ? (
                          <span className="text-red-400 font-medium">
                            {formatPrice(v.sale_price)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="pr-3 py-2">
                        <span
                          className={clsx(
                            "px-2 py-1 rounded-lg text-xs",
                            (v.stock_quantity ?? 0) > 0
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          )}
                        >
                          {v.stock_quantity ?? "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom CSS for animations and scrollbar
const customStyles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #52525b;
    border-radius: 3px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #71717a;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

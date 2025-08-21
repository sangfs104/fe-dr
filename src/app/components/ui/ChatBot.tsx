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
  Bot,
  User,
  ShoppingBag,
  Zap,
  Heart,
  Palette,
  Wand2,
  ChevronDown,
  TrendingUp,
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
  timestamp: number;
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
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [typingEffect, setTypingEffect] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "Chào bạn! ✨ Tôi là AI Stylist thế hệ mới. Hãy cho tôi biết phong cách bạn muốn khám phá - từ minimalist đến maximalist, từ streetwear đến haute couture. Tôi sẽ tạo ra những outfit hoàn hảo chỉ riêng cho bạn! 🎨",
      timestamp: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, sending]);

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
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setTypingEffect(true);

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

      // Simulate typing delay for better UX
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            data.message || "Tôi đã tìm thấy những gợi ý tuyệt vời cho bạn! ✨",
          attachment,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setTypingEffect(false);
      }, 1200);
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
          timestamp: Date.now(),
        },
      ]);
      setTypingEffect(false);
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

  const quickActions = [
    {
      icon: TrendingUp,
      label: "Xu hướng hot",
      action: () =>
        setInput("Cho tôi xem những xu hướng thời trang hot nhất hiện tại"),
    },
    {
      icon: Heart,
      label: "Outfit yêu thích",
      action: () => setInput("Gợi ý outfit cho buổi hẹn hò lãng mạn"),
    },
    {
      icon: Palette,
      label: "Mix & Match",
      action: () => setInput("Phối đồ với màu sắc nổi bật"),
    },
    {
      icon: ShoppingBag,
      label: "Sale hot",
      action: () => setInput("Có sản phẩm nào đang sale không?"),
    },
  ];

  return (
    <>
      {/* Enhanced Backdrop with blur effect */}
      {isOpen && !isMinimized && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={handleClose}
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "bg-gray-900/90 backdrop-blur-xl text-white border border-gray-700",
            duration: 4000,
          }}
        />

        {/* Main Chat Container */}
        <div
          className={clsx(
            "rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl",
            "text-white border border-gray-700/50 overflow-hidden transition-all duration-500 ease-out",
            "before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:bg-gradient-to-r before:from-violet-500/20 before:via-purple-500/20 before:to-pink-500/20 before:content-[''] before:-z-10",
            isMinimized
              ? "transform scale-95 opacity-90"
              : "transform scale-100 opacity-100"
          )}
        >
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  {title}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Fashion Expert
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              >
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 transition-transform duration-200",
                    isMinimized && "rotate-180"
                  )}
                />
              </button>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-gray-800/50 hover:bg-red-500/20 transition-all duration-200 hover:scale-105 group"
              >
                <X className="h-4 w-4 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Quick Actions Bar */}
              <div className="p-3 border-b border-gray-700/30 bg-gray-800/20">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 
                               border border-gray-600/30 text-sm hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-200 hover:scale-105"
                    >
                      <action.icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
              >
                {messages.map((m, index) => (
                  <MessageBubble
                    key={m.id}
                    msg={m}
                    isLatest={index === messages.length - 1}
                  />
                ))}

                {/* Typing Indicator */}
                {(sending || typingEffect) && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-sm">
                        Đang tạo gợi ý tuyệt vời...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Input Area */}
              <div className="border-t border-gray-700/50 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                <div
                  ref={inputRef}
                  className="relative rounded-2xl bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 focus-within:border-violet-500/50 transition-all duration-200"
                >
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Mô tả phong cách bạn muốn, hoặc hỏi về xu hướng, size, giá cả..."
                    className="w-full resize-none bg-transparent text-white rounded-2xl p-4 pr-24 placeholder:text-gray-400 
                             outline-none min-h-[52px] max-h-32"
                    rows={1}
                  />

                  {/* Input Controls */}
                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    {/* Voice Input */}
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={sending || !SpeechRecognition}
                      className={clsx(
                        "p-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5",
                        sending || !SpeechRecognition
                          ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                          : isRecording
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/25 animate-pulse"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                      )}
                    >
                      <Mic className="h-4 w-4" />
                      {SpeechRecognition && (
                        <span className="text-xs font-medium">
                          {isRecording ? "●" : "🎤"}
                        </span>
                      )}
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={sendInput}
                      disabled={sending || !input.trim()}
                      className={clsx(
                        "p-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 font-medium",
                        sending || !input.trim()
                          ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
                      )}
                    >
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <Zap className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <Sparkles className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Helper Text */}
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                  <span>Enter để gửi • Shift+Enter xuống dòng</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered Fashion
                  </span>
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
  isLatest,
}: {
  msg: ChatMessage;
  isLatest: boolean;
}) {
  const isUser = msg.role === "user";
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (msg.role === "assistant" && msg.text && isLatest) {
      const utterance = new SpeechSynthesisUtterance(msg.text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

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
  }, [msg.text, msg.role, isLatest]);

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
                ? "bg-yellow-400/30 text-yellow-200 px-0.5 rounded"
                : ""
            )}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      className={clsx(
        "flex transition-all duration-500 ease-out",
        isUser ? "justify-end" : "justify-start",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div
        className={clsx("flex gap-3 max-w-[85%]", isUser && "flex-row-reverse")}
      >
        {/* Avatar */}
        <div
          className={clsx(
            "flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center shadow-md",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
              : "bg-gradient-to-br from-violet-500 to-purple-600"
          )}
        >
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={clsx(
            "rounded-3xl px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl",
            isUser
              ? "bg-gradient-to-br from-blue-500/90 to-cyan-500/90 text-white border border-blue-400/30"
              : "bg-gradient-to-br from-gray-800/90 to-gray-700/90 text-white border border-gray-600/30"
          )}
        >
          {msg.text && (
            <div className="whitespace-pre-wrap leading-relaxed text-sm font-medium">
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

          {/* Timestamp */}
          <div
            className={clsx(
              "mt-2 text-xs opacity-60",
              isUser ? "text-right" : "text-left"
            )}
          >
            {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
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
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm font-bold mb-3">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
          <Stars className="h-4 w-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          {name || "Phong Cách Của Bạn"}
        </span>
      </div>

      {desc && (
        <p className="text-gray-300 text-sm leading-relaxed mb-3 pl-8">
          {desc}
        </p>
      )}

      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-8">
          {keywords.map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 
                         border border-violet-400/30 px-3 py-1.5 text-xs font-medium text-violet-200 
                         hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-200"
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
    <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-purple-500/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm font-bold mb-3">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600">
          <Shirt className="h-4 w-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Mix & Match Suggestions
        </span>
      </div>

      <div className="space-y-2 pl-8">
        {names.map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded-lg bg-gray-800/30 
                       hover:bg-gray-700/40 transition-all duration-200"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />
            <span>{n}</span>
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
    <div className="rounded-2xl overflow-hidden border border-gray-600/30 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-violet-500/10">
      {/* Product Image */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={500}
            height={281}
            unoptimized
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
            <div className="text-center">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <span>Không có ảnh</span>
            </div>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold shadow-lg">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              SALE
            </span>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
              <Heart className="h-4 w-4 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
              <ShoppingBag className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-violet-300 transition-colors">
          {product.name}
        </div>

        {/* Price Section */}
        {displayPrice != null && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-violet-400">
              {formatPrice(displayPrice)}
            </span>
            {hasDiscount && firstPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(firstPrice)}
              </span>
            )}
          </div>
        )}

        {product.description && (
          <div className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </div>
        )}

        {/* Variants Table */}
        {hasVariants && variants.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-medium text-gray-300 mb-2 flex items-center gap-1">
              <Palette className="h-3 w-3" />
              Tùy chọn sản phẩm
            </div>
            <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-gray-800/80 backdrop-blur-sm">
                  <tr className="text-gray-400">
                    <th className="text-left font-medium py-2 px-1">Size</th>
                    <th className="text-left font-medium py-2 px-1">Màu</th>
                    <th className="text-left font-medium py-2 px-1">Giá</th>
                    <th className="text-left font-medium py-2 px-1">Sale</th>
                    <th className="text-left font-medium py-2 px-1">Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, i) => (
                    <tr
                      key={v.id ?? i}
                      className="text-gray-300 hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="py-2 px-1">
                        {v.size ? (
                          <span className="px-2 py-0.5 rounded bg-gray-700/50 text-xs">
                            {v.size}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-2 px-1">
                        {v.color ? (
                          <span className="flex items-center gap-1">
                            <div
                              className="w-3 h-3 rounded-full border border-gray-600"
                              style={{ backgroundColor: v.color.toLowerCase() }}
                            />
                            <span className="text-xs">{v.color}</span>
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-2 px-1 font-medium">
                        {v.price != null ? (
                          <span className="text-gray-300">
                            {formatPrice(v.price)}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-2 px-1 font-medium">
                        {v.sale_price != null ? (
                          <span className="text-red-400 flex items-center gap-1">
                            <Zap className="h-2 w-2" />
                            {formatPrice(v.sale_price)}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-2 px-1">
                        {v.stock_quantity != null ? (
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-xs",
                              v.stock_quantity > 10
                                ? "bg-green-500/20 text-green-400"
                                : v.stock_quantity > 0
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            )}
                          >
                            {v.stock_quantity > 0 ? v.stock_quantity : "Hết"}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1">
            <ShoppingBag className="h-3 w-3" />
            Thêm vào giỏ
          </button>
          <button className="py-2 px-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-white text-xs font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1">
            <Heart className="h-3 w-3" />
            Yêu thích
          </button>
        </div>
      </div>
    </div>
  );
}

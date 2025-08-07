// "use client";
// import { useRef, useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import ProductCard from "../ui/ProductList";
// import { toast } from "react-hot-toast";
// import type { Product } from "@/app/types/Product";
// import { DreamToast } from "../ui/DreamToast";
// import {
//   ThumbsUp,
//   Heart,
//   Laugh,
//   Smile,
//   Frown,
//   Angry,
//   Newspaper,
//   MessageSquareText,
//   MessageCircleOff,
//   ShoppingBag,
//   EyeOff,
// } from "lucide-react";

// interface PostListProps {
//   limit?: number;
//   showMore?: boolean;
// }
// interface PostItemProps {
//   post: Post;
//   token: string | null;
// }
// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   image?: string;
//   excerpt?: string;
//   meta_description?: string;
//   created_at: string;
//   slug: string;
//   tags?: string;
//   author_id: string;
//   type?: string;
//   product?: Product;
// }

// export default function PostList({ limit, showMore }: PostListProps) {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     fetch("http://localhost:8000/api/posts", {
//       headers: { ...(token && { Authorization: `Bearer ${token}` }) },
//     })
//       .then((res) => res.json())
//       .then(setPosts);
//   }, [token]);

//   const displayPosts = limit ? posts.slice(0, limit) : posts;
//   return (
//     <section className="bg-white py-12 px-4 md:px-20 lg:px-40 my-12 rounded-3xl shadow-sm">
//       <DreamToast />
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-10">
//           <h1 className="text-3xl font-bold flex items-center gap-3 drop-shadow">
//             <Newspaper className="w-8 h-8 text-blue-600 animate-bounce" />
//             <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
//               Bài viết mới nhất
//             </span>
//           </h1>
//           {showMore && (
//             <a
//               href="/blog"
//               className="text-indigo-600 text-base font-semibold px-5 py-2 rounded-full bg-white/60 shadow-lg backdrop-blur hover:bg-indigo-50 transition"
//             >
//               Xem thêm →
//             </a>
//           )}
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <AnimatePresence>
//             {displayPosts.map((post, i) => (
//               <motion.div
//                 key={post.id}
//                 initial={{ opacity: 0, y: 40, scale: 0.97 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: 40 }}
//                 transition={{ delay: i * 0.06, duration: 0.45, type: "spring" }}
//               >
//                 <PostItem post={post} token={token} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }
// function PostItem({ post, token }: PostItemProps) {
//   const [comments, setComments] = useState<any[]>([]);
//   const [reactions, setReactions] = useState<any[]>([]);
//   const [commentInput, setCommentInput] = useState("");
//   const [myReaction, setMyReaction] = useState<string | null>(null);
//   const [showComments, setShowComments] = useState(false);
//   const [showProduct, setShowProduct] = useState(false);
//   const [showFullImage, setShowFullImage] = useState(false);
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [isImageOverflow, setIsImageOverflow] = useState(false);
//   const [isContentOverflow, setIsContentOverflow] = useState(false);

//   const imageRef = useRef<HTMLDivElement | null>(null);
//   const contentRef = useRef<HTMLDivElement | null>(null);
//   const commentEndRef = useRef<HTMLDivElement | null>(null);

//   // Fetch comments & reactions
//   useEffect(() => {
//     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
//       .then((res) => res.json())
//       .then(setComments);

//     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
//       .then((res) => res.json())
//       .then((data) => {
//         setReactions(data);
//         // highlight my previous reaction if any
//         if (token) {
//           const my = data.find((r: any) => r.is_me);
//           if (my) setMyReaction(my.reaction);
//         }
//       });
//   }, [post.id, token]);

//   // Overflow detection
//   useEffect(() => {
//     if (imageRef.current)
//       setIsImageOverflow(imageRef.current.scrollHeight > 300);
//     if (contentRef.current)
//       setIsContentOverflow(contentRef.current.scrollHeight > 120);
//   }, [post.image, post.content, showFullImage, showFullContent]);

//   // Auto-scroll to latest comment
//   useEffect(() => {
//     if (showComments && commentEndRef.current) {
//       commentEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [comments, showComments]);

//   // Handle comment post
//  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//     if (!token) {
//       toast.error("Bạn cần đăng nhập để bình luận nha!");
//       return;
//     }
//     if (!commentInput.trim()) return;

//     await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       body: JSON.stringify({ content: commentInput }),
//     });
//     setCommentInput("");
//     const res = await fetch(
//       `http://localhost:8000/api/posts/${post.id}/comments`
//     );
//     setComments(await res.json());
//   };

//   // Handle react
//   const handleReact = async (reaction: string) => {
//     if (!token) {
//       toast.error("Bạn cần đăng nhập để thả biểu cảm nhé!");
//       return;
//     }

//     await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       body: JSON.stringify({ reaction }),
//     });

//     setMyReaction(reaction);
//     const res = await fetch(`http://localhost:8000/api/posts/${post.id}/react`);
//     setReactions(await res.json());
//   };

//   // Modern Reaction Icons
//   const reactionIcons = {
//     like: <ThumbsUp size={18} />,
//     love: <Heart size={18} />,
//     haha: <Laugh size={18} />,
//     wow: <Smile size={18} />,
//     sad: <Frown size={18} />,
//     angry: <Angry size={18} />,
//   };
//   const reactionColors = {
//     like: "text-blue-600",
//     love: "text-pink-500",
//     haha: "text-yellow-500",
//     wow: "text-orange-400",
//     sad: "text-gray-500",
//     angry: "text-red-600",
//   };

//   return (
//     <motion.article
//       className="rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 bg-white/70 backdrop-blur-lg relative overflow-hidden"
//       whileHover={{ scale: 1.015, y: -2 }}
//     >
//       {/* Author */}
//       <div className="flex items-center px-6 pt-6 pb-4">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white/70 drop-shadow-lg animate-gradient-x">
//           {post.author_id}
//         </div>
//         <div className="ml-4">
//           <span className="text-base font-semibold text-gray-900">
//             Tác giả #{post.author_id}
//           </span>
//           <p className="text-xs text-gray-500">
//             {new Date(post.created_at).toLocaleString()}
//           </p>
//         </div>
//         <span className="ml-auto text-[11px] text-gray-400 italic bg-gray-50 px-2 py-0.5 rounded-lg select-text">
//           #{post.slug}
//         </span>
//       </div>

//       {/* Image */}
//       {post.image && (
//         <div className="relative">
//           <motion.div
//             ref={imageRef}
//             className={`overflow-hidden transition-all duration-500 rounded-2xl ${
//               showFullImage ? "max-h-[650px]" : "max-h-[320px]"
//             }`}
//             layout
//           >
//             <Image
//               src={`http://127.0.0.1:8000/storage/${post.image}`}
//               alt={post.title}
//               width={800}
//               height={340}
//               className="w-full object-cover rounded-2xl shadow"
//               priority
//             />
//           </motion.div>
//           {isImageOverflow && (
//             <button
//               onClick={() => setShowFullImage((s) => !s)}
//               className="absolute bottom-3 right-6 text-sm bg-white/80 px-4 py-1.5 rounded-full shadow text-indigo-600 font-semibold hover:bg-indigo-50 hover:text-indigo-800 transition z-10"
//             >
//               {showFullImage ? "Thu gọn" : "Xem thêm ảnh"}
//             </button>
//           )}
//         </div>
//       )}

//       {/* Content */}
//       <div className="px-6 py-5">
//         <h2 className="text-2xl font-bold mb-2 text-gray-900 leading-tight">
//           {post.title}
//         </h2>
//         {(post.excerpt || post.meta_description) && (
//           <p className="text-gray-500 italic text-[15px] mb-4">
//             {post.excerpt || post.meta_description}
//           </p>
//         )}

//         {/* Post Content */}
//         <div className="relative">
//           <motion.div
//             ref={contentRef}
//             className={`prose prose-sm prose-indigo max-w-none text-gray-800 mb-5 overflow-hidden transition-all duration-400 ${
//               showFullContent ? "max-h-[900px]" : "max-h-[120px]"
//             }`}
//             style={{
//               maskImage:
//                 !showFullContent && isContentOverflow
//                   ? "linear-gradient(180deg, #fff 60%, transparent)"
//                   : undefined,
//               WebkitMaskImage:
//                 !showFullContent && isContentOverflow
//                   ? "linear-gradient(180deg, #fff 60%, transparent)"
//                   : undefined,
//             }}
//             dangerouslySetInnerHTML={{ __html: post.content }}
//           />
//           {isContentOverflow && (
//             <button
//               onClick={() => setShowFullContent((v) => !v)}
//               className="absolute bottom-0 right-0 text-sm bg-white/80 px-4 py-1 rounded-full shadow text-indigo-600 hover:text-indigo-900 font-semibold hover:bg-indigo-50 transition"
//             >
//               {showFullContent ? "Thu gọn" : "Xem thêm nội dung"}
//             </button>
//           )}
//         </div>

//         {/* Tags */}
//         {post.tags && (
//           <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
//             {post.tags.split(",").map((tag) => (
//               <span
//                 key={tag}
//                 className="bg-gradient-to-r from-indigo-100 to-pink-100 px-3 py-1 rounded-full border border-pink-200 shadow-sm font-semibold hover:scale-105 transition-all cursor-pointer"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Reactions */}
//   <div className="flex gap-1 justify-start items-center border-t pt-4 mb-1">
//           {Object.keys(reactionIcons).map((r) => {
//             const isActive = myReaction === r;
//             const colorClass = reactionColors[r];
//             return (
//               <motion.button
//                 key={r}
//                 title={r}
//                 whileTap={{ scale: 0.9 }}
//                 whileHover={{ scale: 1.08 }}
//                 onClick={() => handleReact(r)}
//                 className={`flex items-center gap-1 text-[13px] px-3 py-1 rounded-full border transition font-semibold shadow-sm
//                   ${
//                     isActive
//                       ? `${colorClass} bg-white/80 border-indigo-200 ring-2 ring-indigo-100`
//                       : "bg-white/80 text-gray-600 border-gray-200 hover:border-indigo-200"
//                   }
//                 `}
//                 style={{ minWidth: "59px" }}
//               >
//                 <span
//                   className={`${colorClass} transition-colors ${
//                     isActive
//                       ? "text-opacity-100"
//                       : "text-opacity-60 hover:text-opacity-100"
//                   }`}
//                 >
//                   {reactionIcons[r]}
//                 </span>
//                 <span>
//                   {reactions.find((x) => x.reaction === r)?.total || 0}
//                 </span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Comments */}
//       <div className="px-6 pb-5 pt-2">
//         <motion.button
//           layout
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setShowComments((v) => !v)}
//           className="text-[15px] font-semibold mb-2 text-indigo-600 hover:text-pink-600 transition flex items-center gap-2"
//         >
//           {showComments ? (
//             <>
//               <MessageCircleOff className="inline w-5 h-5" />
//               Ẩn bình luận
//             </>
//           ) : (
//             <>
//               <MessageSquareText className="inline w-5 h-5" />
//               Hiện bình luận ({comments.length})
//             </>
//           )}
//         </motion.button>
//         <AnimatePresence>
//           {showComments && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.35 }}
//             >
//               <ul className="space-y-3 mb-3 mt-2 max-h-60 overflow-y-auto pr-2">
//                 {comments.map((c) => (
//                   <li key={c.id} className="flex gap-3 items-start">
//                     <div className="w-9 h-9 bg-gradient-to-tr from-gray-400 to-gray-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow">
//                       {c.user?.name?.[0] || "A"}
//                     </div>
//                     <div className="bg-white/70 px-4 py-2 rounded-2xl text-[15px] border border-gray-100 shadow-sm">
//                       <span className="font-semibold text-gray-700">
//                         {c.user?.name || "Ẩn danh"}
//                       </span>
//                       <span className="mx-1 text-gray-400 select-none">:</span>
//                       <span>{c.content}</span>
//                     </div>
//                   </li>
//                 ))}
//                 <div ref={commentEndRef} />
//               </ul>
//               {/* Comment box */}
//               <form onSubmit={handleComment} className="flex flex-col gap-1">
//                 <div className="flex gap-2">
//                   <input
//                     className="flex-1 border px-4 py-2 rounded-full text-[15px] shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 placeholder-gray-400"
//                     value={commentInput}
//                     onChange={(e) => setCommentInput(e.target.value)}
//                     placeholder="Gửi bình luận yêu thương..."
//                   />
//                   <motion.button
//                     whileTap={{ scale: 0.93 }}
//                     type="submit"
//                     className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:from-pink-500 hover:to-indigo-500 transition"
//                   >
//                     Gửi
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Related Product */}
//       {post.type === "product" && post.product && (
//         <div className="border-t bg-gradient-to-r from-indigo-50 via-white to-pink-50 px-6 py-5">
//           <motion.button
//             layout
//             whileTap={{ scale: 0.97 }}
//             onClick={() => setShowProduct((v) => !v)}
//             className="text-[15px] font-semibold mb-2 text-indigo-600 hover:text-pink-600 transition flex items-center gap-2"
//           >
//             {showProduct ? (
//               <>
//                 <EyeOff className="inline w-5 h-5" />
//                 Ẩn sản phẩm liên quan
//               </>
//             ) : (
//               <>
//                 <ShoppingBag className="inline w-5 h-5" />
//                 Hiện sản phẩm liên quan
//               </>
//             )}
//           </motion.button>
//           <AnimatePresence>
//             {showProduct && (
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 12 }}
//                 transition={{ duration: 0.4 }}
//                 className="not-prose mt-3"
//               >
//                 <ProductCard product={post.product} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}
//     </motion.article>
//   );
// }
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductCard from "../ui/ProductList";
import { toast } from "react-hot-toast";
import type { Product } from "@/app/types/Product";
import { DreamToast } from "../ui/DreamToast";
import {
  ThumbsUp,
  Heart,
  Laugh,
  Smile,
  Frown,
  Angry,
  Newspaper,
  MessageSquareText,
  MessageCircleOff,
  ShoppingBag,
  EyeOff,
} from "lucide-react";

interface PostListProps {
  limit?: number;
  showMore?: boolean;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
  meta_description?: string;
  created_at: string;
  slug: string;
  tags?: string;
  author_id: string;
  type?: string;
  product?: Product;
}

interface Comment {
  id: number;
  content: string;
  user?: {
    name?: string;
  };
}

interface Reaction {
  reaction: string;
  total: number;
  is_me?: boolean;
}

interface PostItemProps {
  post: Post;
  token: string | null;
}

export default function PostList({ limit, showMore }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch("http://localhost:8000/api/posts", {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    })
      .then((res) => res.json())
      .then(setPosts);
  }, [token]);

  const displayPosts = limit ? posts.slice(0, limit) : posts;
  return (
    <section className="bg-white py-12 px-4 md:px-20 lg:px-40 my-12 rounded-3xl shadow-sm">
      <DreamToast />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-3 drop-shadow">
            <Newspaper className="w-8 h-8 text-blue-600 animate-bounce" />
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
              Bài viết mới nhất
            </span>
          </h1>
          {showMore && (
            <a
              href="/blog"
              className="text-indigo-600 text-base font-semibold px-5 py-2 rounded-full bg-white/60 shadow-lg backdrop-blur hover:bg-indigo-50 transition"
            >
              Xem thêm →
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ delay: i * 0.06, duration: 0.45, type: "spring" }}
              >
                <PostItem post={post} token={token} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PostItem({ post, token }: PostItemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [myReaction, setMyReaction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isImageOverflow, setIsImageOverflow] = useState(false);
  const [isContentOverflow, setIsContentOverflow] = useState(false);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const commentEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch comments & reactions
  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
      .then((res) => res.json())
      .then(setComments);

    fetch(`http://localhost:8000/api/posts/${post.id}/react`)
      .then((res) => res.json())
      .then((data: Reaction[]) => {
        setReactions(data);
        // highlight my previous reaction if any
        if (token) {
          const my = data.find((r) => r.is_me);
          if (my) setMyReaction(my.reaction);
        }
      });
  }, [post.id, token]);

  // Overflow detection
  useEffect(() => {
    if (imageRef.current)
      setIsImageOverflow(imageRef.current.scrollHeight > 300);
    if (contentRef.current)
      setIsContentOverflow(contentRef.current.scrollHeight > 120);
  }, [post.image, post.content, showFullImage, showFullContent]);

  // Auto-scroll to latest comment
  useEffect(() => {
    if (showComments && commentEndRef.current) {
      commentEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, showComments]);

  // Handle comment post
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("Bạn cần đăng nhập để bình luận nha!");
      return;
    }
    if (!commentInput.trim()) return;

    await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ content: commentInput }),
    });
    setCommentInput("");
    const res = await fetch(
      `http://localhost:8000/api/posts/${post.id}/comments`
    );
    setComments(await res.json());
  };

  // Handle react
  const handleReact = async (reaction: string) => {
    if (!token) {
      toast.error("Bạn cần đăng nhập để thả biểu cảm nhé!");
      return;
    }

    await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ reaction }),
    });

    setMyReaction(reaction);
    const res = await fetch(`http://localhost:8000/api/posts/${post.id}/react`);
    setReactions(await res.json());
  };

  // Modern Reaction Icons
const reactionIcons: { [key: string]: JSX.Element } = {
  like: <ThumbsUp size={18} />,
  love: <Heart size={18} />,
  haha: <Laugh size={18} />,
  wow: <Smile size={18} />,
  sad: <Frown size={18} />,
  angry: <Angry size={18} />,
};
const reactionColors: { [key: string]: string } = {
  like: "text-blue-600",
  love: "text-pink-500",
  haha: "text-yellow-500",
  wow: "text-orange-400",
  sad: "text-gray-500",
  angry: "text-red-600",
};

  return (
    <motion.article
      className="rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 bg-white/70 backdrop-blur-lg relative overflow-hidden"
      whileHover={{ scale: 1.015, y: -2 }}
    >
      {/* Author */}
      <div className="flex items-center px-6 pt-6 pb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white/70 drop-shadow-lg animate-gradient-x">
          {post.author_id}
        </div>
        <div className="ml-4">
          <span className="text-base font-semibold text-gray-900">
            Tác giả #{post.author_id}
          </span>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
        <span className="ml-auto text-[11px] text-gray-400 italic bg-gray-50 px-2 py-0.5 rounded-lg select-text">
          #{post.slug}
        </span>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative">
          <motion.div
            ref={imageRef}
            className={`overflow-hidden transition-all duration-500 rounded-2xl ${
              showFullImage ? "max-h-[650px]" : "max-h-[320px]"
            }`}
            layout
          >
            <Image
              src={`http://127.0.0.1:8000/storage/${post.image}`}
              alt={post.title}
              width={800}
              height={340}
              className="w-full object-cover rounded-2xl shadow"
              priority
            />
          </motion.div>
          {isImageOverflow && (
            <button
              onClick={() => setShowFullImage((s) => !s)}
              className="absolute bottom-3 right-6 text-sm bg-white/80 px-4 py-1.5 rounded-full shadow text-indigo-600 font-semibold hover:bg-indigo-50 hover:text-indigo-800 transition z-10"
            >
              {showFullImage ? "Thu gọn" : "Xem thêm ảnh"}
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 leading-tight">
          {post.title}
        </h2>
        {(post.excerpt || post.meta_description) && (
          <p className="text-gray-500 italic text-[15px] mb-4">
            {post.excerpt || post.meta_description}
          </p>
        )}

        {/* Post Content */}
        <div className="relative">
          <motion.div
            ref={contentRef}
            className={`prose prose-sm prose-indigo max-w-none text-gray-800 mb-5 overflow-hidden transition-all duration-400 ${
              showFullContent ? "max-h-[900px]" : "max-h-[120px]"
            }`}
            style={{
              maskImage:
                !showFullContent && isContentOverflow
                  ? "linear-gradient(180deg, #fff 60%, transparent)"
                  : undefined,
              WebkitMaskImage:
                !showFullContent && isContentOverflow
                  ? "linear-gradient(180deg, #fff 60%, transparent)"
                  : undefined,
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {isContentOverflow && (
            <button
              onClick={() => setShowFullContent((v) => !v)}
              className="absolute bottom-0 right-0 text-sm bg-white/80 px-4 py-1 rounded-full shadow text-indigo-600 hover:text-indigo-900 font-semibold hover:bg-indigo-50 transition"
            >
              {showFullContent ? "Thu gọn" : "Xem thêm nội dung"}
            </button>
          )}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
            {post.tags.split(",").map((tag) => (
              <span
                key={tag}
                className="bg-gradient-to-r from-indigo-100 to-pink-100 px-3 py-1 rounded-full border border-pink-200 shadow-sm font-semibold hover:scale-105 transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Reactions */}
        <div className="flex gap-1 justify-start items-center border-t pt-4 mb-1">
          {Object.keys(reactionIcons).map((r) => {
            const isActive = myReaction === r;
            const colorClass = reactionColors[r];
            return (
              <motion.button
                key={r}
                title={r}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => handleReact(r)}
                className={`flex items-center gap-1 text-[13px] px-3 py-1 rounded-full border transition font-semibold shadow-sm
                  ${
                    isActive
                      ? `${colorClass} bg-white/80 border-indigo-200 ring-2 ring-indigo-100`
                      : "bg-white/80 text-gray-600 border-gray-200 hover:border-indigo-200"
                  }
                `}
                style={{ minWidth: "59px" }}
              >
                <span
                  className={`${colorClass} transition-colors ${
                    isActive
                      ? "text-opacity-100"
                      : "text-opacity-60 hover:text-opacity-100"
                  }`}
                >
                  {reactionIcons[r]}
                </span>
                <span>
                  {reactions.find((x) => x.reaction === r)?.total || 0}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Comments */}
      <div className="px-6 pb-5 pt-2">
        <motion.button
          layout
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments((v) => !v)}
          className="text-[15px] font-semibold mb-2 text-indigo-600 hover:text-pink-600 transition flex items-center gap-2"
        >
          {showComments ? (
            <>
              <MessageCircleOff className="inline w-5 h-5" />
              Ẩn bình luận
            </>
          ) : (
            <>
              <MessageSquareText className="inline w-5 h-5" />
              Hiện bình luận ({comments.length})
            </>
          )}
        </motion.button>
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
            >
              <ul className="space-y-3 mb-3 mt-2 max-h-60 overflow-y-auto pr-2">
                {comments.map((c) => (
                  <li key={c.id} className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-gradient-to-tr from-gray-400 to-gray-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow">
                      {c.user?.name?.[0] || "A"}
                    </div>
                    <div className="bg-white/70 px-4 py-2 rounded-2xl text-[15px] border border-gray-100 shadow-sm">
                      <span className="font-semibold text-gray-700">
                        {c.user?.name || "Ẩn danh"}
                      </span>
                      <span className="mx-1 text-gray-400 select-none">:</span>
                      <span>{c.content}</span>
                    </div>
                  </li>
                ))}
                <div ref={commentEndRef} />
              </ul>
              {/* Comment box */}
              <form onSubmit={handleComment} className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <input
                    className="flex-1 border px-4 py-2 rounded-full text-[15px] shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 placeholder-gray-400"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Gửi bình luận yêu thương..."
                  />
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:from-pink-500 hover:to-indigo-500 transition"
                  >
                    Gửi
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Product */}
      {post.type === "product" && post.product && (
        <div className="border-t bg-gradient-to-r from-indigo-50 via-white to-pink-50 px-6 py-5">
          <motion.button
            layout
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowProduct((v) => !v)}
            className="text-[15px] font-semibold mb-2 text-indigo-600 hover:text-pink-600 transition flex items-center gap-2"
          >
            {showProduct ? (
              <>
                <EyeOff className="inline w-5 h-5" />
                Ẩn sản phẩm liên quan
              </>
            ) : (
              <>
                <ShoppingBag className="inline w-5 h-5" />
                Hiện sản phẩm liên quan
              </>
            )}
          </motion.button>
          <AnimatePresence>
            {showProduct && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
                className="not-prose mt-3"
              >
                <ProductCard product={post.product} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.article>
  );
}

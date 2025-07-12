// // // // // "use client";
// // // // // import { useEffect, useState } from "react";

// // // // // export default function PostList() {
// // // // //   const [posts, setPosts] = useState([]);
// // // // //   const token =
// // // // //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

// // // // //   useEffect(() => {
// // // // //     fetch("http://localhost:8000/api/posts", {
// // // // //       headers: {
// // // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // // //       },
// // // // //     })
// // // // //       .then((res) => res.json())
// // // // //       .then(setPosts);
// // // // //   }, [token]);

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <h1 className="text-2xl font-bold mb-6">Danh sách bài viết</h1>

// // // // //       {posts.map((post) => (
// // // // //         <PostItem key={post.id} post={post} token={token} />
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function PostItem({ post, token }) {
// // // // //   const [comments, setComments] = useState([]);
// // // // //   const [reactions, setReactions] = useState([]);
// // // // //   const [commentInput, setCommentInput] = useState("");
// // // // //   const [myReaction, setMyReaction] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // // // //       .then((res) => res.json())
// // // // //       .then(setComments);

// // // // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // // // //       .then((res) => res.json())
// // // // //       .then(setReactions);
// // // // //   }, [post.id]);

// // // // //   const handleComment = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!commentInput.trim()) return;

// // // // //     await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // // //       },
// // // // //       body: JSON.stringify({ content: commentInput }),
// // // // //     });

// // // // //     setCommentInput("");
// // // // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // // // //       .then((res) => res.json())
// // // // //       .then(setComments);
// // // // //   };

// // // // //   const handleReact = async (reaction) => {
// // // // //     await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // // //       },
// // // // //       body: JSON.stringify({ reaction }),
// // // // //     });

// // // // //     setMyReaction(reaction);
// // // // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // // // //       .then((res) => res.json())
// // // // //       .then(setReactions);
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-white border p-4 rounded-md shadow-sm mb-6">
// // // // //       <h2 className="text-xl font-semibold">{post.title}</h2>
// // // // //       <p className="text-sm text-gray-500">Slug: {post.slug}</p>
// // // // //       <img
// // // // //         src={`http://localhost:8000/storage/${post.image}`}
// // // // //         alt={post.title}
// // // // //         className="w-full max-w-md mb-2 rounded"
// // // // //       />
// // // // //       <p className="italic text-gray-600 mb-2">{post.excerpt}</p>

// // // // //       <div
// // // // //         className="prose mb-4"
// // // // //         dangerouslySetInnerHTML={{ __html: post.content }}
// // // // //       />

// // // // //       <ul className="text-sm text-gray-700 space-y-1 mb-4">
// // // // //         <li>
// // // // //           <strong>Loại:</strong> {post.type}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Product ID:</strong> {post.product_id}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Tags:</strong> {post.tags}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Trạng thái:</strong> {post.status}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Lượt xem:</strong> {post.views}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Nổi bật:</strong> {post.is_featured ? "Có" : "Không"}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Meta title:</strong> {post.meta_title}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Meta description:</strong> {post.meta_description}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Ngày tạo:</strong>{" "}
// // // // //           {new Date(post.created_at).toLocaleString()}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Ngày cập nhật:</strong>{" "}
// // // // //           {new Date(post.updated_at).toLocaleString()}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Tác giả:</strong> {post.author_id}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Bắt đầu:</strong> {post.start_date || "Không có"}
// // // // //         </li>
// // // // //         <li>
// // // // //           <strong>Kết thúc:</strong> {post.end_date || "Không có"}
// // // // //         </li>
// // // // //       </ul>

// // // // //       {/* Biểu cảm */}
// // // // //       <div className="mb-4">
// // // // //         <strong>Biểu cảm:</strong>
// // // // //         {["like", "love", "haha", "wow", "sad", "angry"].map((r) => (
// // // // //           <button
// // // // //             key={r}
// // // // //             className={`mx-1 px-2 py-1 rounded ${
// // // // //               myReaction === r ? "bg-blue-200" : "bg-gray-200"
// // // // //             }`}
// // // // //             onClick={() => handleReact(r)}
// // // // //           >
// // // // //             {r} ({reactions.find((x) => x.reaction === r)?.total || 0})
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Bình luận */}
// // // // //       <div className="mb-2">
// // // // //         <strong>Bình luận:</strong>
// // // // //         <ul className="mb-2">
// // // // //           {comments.map((c) => (
// // // // //             <li key={c.id} className="border-b py-1">
// // // // //               <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
// // // // //             </li>
// // // // //           ))}
// // // // //         </ul>
// // // // //         <form onSubmit={handleComment} className="flex gap-2">
// // // // //           <input
// // // // //             className="border px-2 py-1 rounded flex-1"
// // // // //             value={commentInput}
// // // // //             onChange={(e) => setCommentInput(e.target.value)}
// // // // //             placeholder="Viết bình luận..."
// // // // //           />
// // // // //           <button
// // // // //             className="bg-indigo-500 text-white px-3 py-1 rounded"
// // // // //             type="submit"
// // // // //           >
// // // // //             Gửi
// // // // //           </button>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";
// // // // import { useEffect, useState } from "react";

// // // // export default function PostList() {
// // // //   const [posts, setPosts] = useState([]);
// // // //   const token =
// // // //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

// // // //   useEffect(() => {
// // // //     fetch("http://localhost:8000/api/posts", {
// // // //       headers: {
// // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // //       },
// // // //     })
// // // //       .then((res) => res.json())
// // // //       .then(setPosts);
// // // //   }, [token]);

// // // //   return (
// // // //     <div className="p-4">
// // // //       <h1 className="text-2xl font-bold mb-6">Danh sách bài viết</h1>

// // // //       {posts.map((post) => (
// // // //         <PostItem key={post.id} post={post} token={token} />
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // function PostItem({ post, token }) {
// // // //   const [comments, setComments] = useState([]);
// // // //   const [reactions, setReactions] = useState([]);
// // // //   const [commentInput, setCommentInput] = useState("");
// // // //   const [myReaction, setMyReaction] = useState(null);

// // // //   useEffect(() => {
// // // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // // //       .then((res) => res.json())
// // // //       .then(setComments);

// // // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // // //       .then((res) => res.json())
// // // //       .then(setReactions);
// // // //   }, [post.id]);

// // // //   const handleComment = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!commentInput.trim()) return;

// // // //     await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // //       },
// // // //       body: JSON.stringify({ content: commentInput }),
// // // //     });

// // // //     setCommentInput("");
// // // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // // //       .then((res) => res.json())
// // // //       .then(setComments);
// // // //   };

// // // //   const handleReact = async (reaction) => {
// // // //     await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //         ...(token && { Authorization: `Bearer ${token}` }),
// // // //       },
// // // //       body: JSON.stringify({ reaction }),
// // // //     });

// // // //     setMyReaction(reaction);
// // // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // // //       .then((res) => res.json())
// // // //       .then(setReactions);
// // // //   };

// // // //   return (
// // // //     <div className="bg-white border p-4 rounded-md shadow-sm mb-6">
// // // //       <h2 className="text-xl font-semibold">{post.title}</h2>
// // // //       <p className="text-sm text-gray-500">Slug: {post.slug}</p>
// // // //       <img
// // // //         src={`http://localhost:8000/storage/${post.image}`}
// // // //         alt={post.title}
// // // //         className="w-full max-w-md mb-2 rounded"
// // // //       />
// // // //       <p className="italic text-gray-600 mb-2">{post.excerpt}</p>

// // // //       <div
// // // //         className="prose mb-4"
// // // //         dangerouslySetInnerHTML={{ __html: post.content }}
// // // //       />

// // // //       <ul className="text-sm text-gray-700 space-y-1 mb-4">
// // // //         <li>
// // // //           <strong>Loại:</strong> {post.type}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Product ID:</strong> {post.product_id}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Tags:</strong> {post.tags}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Trạng thái:</strong> {post.status}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Lượt xem:</strong> {post.views}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Nổi bật:</strong> {post.is_featured ? "Có" : "Không"}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Meta title:</strong> {post.meta_title}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Meta description:</strong> {post.meta_description}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Ngày tạo:</strong>{" "}
// // // //           {new Date(post.created_at).toLocaleString()}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Ngày cập nhật:</strong>{" "}
// // // //           {new Date(post.updated_at).toLocaleString()}
// // // //         </li>
// // // //         <li>
// // // //           <strong>Tác giả:</strong> {post.author_id}
// // // //         </li>
// // // //       </ul>

// // // //       {/* Biểu cảm */}
// // // //       <div className="mb-4">
// // // //         <strong>Biểu cảm:</strong>
// // // //         {["like", "love", "haha", "wow", "sad", "angry"].map((r) => (
// // // //           <button
// // // //             key={r}
// // // //             className={`mx-1 px-2 py-1 rounded ${
// // // //               myReaction === r ? "bg-blue-200" : "bg-gray-200"
// // // //             }`}
// // // //             onClick={() => handleReact(r)}
// // // //           >
// // // //             {r} ({reactions.find((x) => x.reaction === r)?.total || 0})
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {/* Bình luận */}
// // // //       <div className="mb-2">
// // // //         <strong>Bình luận:</strong>
// // // //         <ul className="mb-2">
// // // //           {comments.map((c) => (
// // // //             <li key={c.id} className="border-b py-1">
// // // //               <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //         <form onSubmit={handleComment} className="flex gap-2">
// // // //           <input
// // // //             className="border px-2 py-1 rounded flex-1"
// // // //             value={commentInput}
// // // //             onChange={(e) => setCommentInput(e.target.value)}
// // // //             placeholder="Viết bình luận..."
// // // //           />
// // // //           <button
// // // //             className="bg-indigo-500 text-white px-3 py-1 rounded"
// // // //             type="submit"
// // // //           >
// // // //             Gửi
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // fe-dr/src/app/components/post/PostList.tsx
// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import ProductCard from "../ProductList"; // Import ProductCard

// // // export default function PostList() {
// // //   const [posts, setPosts] = useState([]);
// // //   const token =
// // //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

// // //   useEffect(() => {
// // //     fetch("http://localhost:8000/api/posts", {
// // //       headers: {
// // //         ...(token && { Authorization: `Bearer ${token}` }),
// // //       },
// // //     })
// // //       .then((res) => res.json())
// // //       .then(setPosts);
// // //   }, [token]);

// // //   return (
// // //     <div className="p-4">
// // //       <h1 className="text-2xl font-bold mb-6">Danh sách bài viết</h1>

// // //       {posts.map((post) => (
// // //         <PostItem key={post.id} post={post} token={token} />
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // function PostItem({ post, token }) {
// // //   const [comments, setComments] = useState([]);
// // //   const [reactions, setReactions] = useState([]);
// // //   const [commentInput, setCommentInput] = useState("");
// // //   const [myReaction, setMyReaction] = useState(null);

// // //   useEffect(() => {
// // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // //       .then((res) => res.json())
// // //       .then(setComments);

// // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // //       .then((res) => res.json())
// // //       .then(setReactions);
// // //   }, [post.id]);

// // //   const handleComment = async (e) => {
// // //     e.preventDefault();
// // //     if (!commentInput.trim()) return;

// // //     await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         ...(token && { Authorization: `Bearer ${token}` }),
// // //       },
// // //       body: JSON.stringify({ content: commentInput }),
// // //     });

// // //     setCommentInput("");
// // //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// // //       .then((res) => res.json())
// // //       .then(setComments);
// // //   };

// // //   const handleReact = async (reaction) => {
// // //     await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         ...(token && { Authorization: `Bearer ${token}` }),
// // //       },
// // //       body: JSON.stringify({ reaction }),
// // //     });

// // //     setMyReaction(reaction);
// // //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// // //       .then((res) => res.json())
// // //       .then(setReactions);
// // //   };

// // //   return (
// // //     <div className="bg-white border p-4 rounded-md shadow-sm mb-6">
// // //       <h2 className="text-xl font-semibold">{post.title}</h2>
// // //       <p className="text-sm text-gray-500">Slug: {post.slug}</p>
// // //       <img
// // //         src={`http://localhost:8000/storage/${post.image}`}
// // //         alt={post.title}
// // //         className="w-full max-w-md mb-2 rounded"
// // //       />
// // //       <p className="italic text-gray-600 mb-2">{post.excerpt}</p>

// // //       <div
// // //         className="prose mb-4"
// // //         dangerouslySetInnerHTML={{ __html: post.content }}
// // //       />

// // //       <ul className="text-sm text-gray-700 space-y-1 mb-4">
// // //         <li>
// // //           <strong>Loại:</strong> {post.type}
// // //         </li>
// // //         {/* Conditional rendering for product_id */}
// // //         {post.product_id && (
// // //           <li>
// // //             <strong>Product ID:</strong> {post.product_id}
// // //           </li>
// // //         )}
// // //         <li>
// // //           <strong>Tags:</strong> {post.tags}
// // //         </li>
// // //         <li>
// // //           <strong>Trạng thái:</strong> {post.status}
// // //         </li>
// // //         <li>
// // //           <strong>Lượt xem:</strong> {post.views}
// // //         </li>
// // //         <li>
// // //           <strong>Nổi bật:</strong> {post.is_featured ? "Có" : "Không"}
// // //         </li>
// // //         <li>
// // //           <strong>Meta title:</strong> {post.meta_title}
// // //         </li>
// // //         <li>
// // //           <strong>Meta description:</strong> {post.meta_description}
// // //         </li>
// // //         <li>
// // //           <strong>Ngày tạo:</strong>{" "}
// // //           {new Date(post.created_at).toLocaleString()}
// // //         </li>
// // //         <li>
// // //           <strong>Ngày cập nhật:</strong>{" "}
// // //           {new Date(post.updated_at).toLocaleString()}
// // //         </li>
// // //         <li>
// // //           <strong>Tác giả:</strong> {post.author_id}
// // //         </li>
// // //         {/* Conditional rendering for start_date and end_date */}
// // //         {post.start_date && (
// // //           <li>
// // //             <strong>Bắt đầu:</strong> {post.start_date}
// // //           </li>
// // //         )}
// // //         {post.end_date && (
// // //           <li>
// // //             <strong>Kết thúc:</strong> {post.end_date}
// // //           </li>
// // //         )}
// // //       </ul>

// // //       {/* Product Information (if available) */}
// // //       {post.type === "product" && post.product && (
// // //         <div>
// // //           {/* // <div className="mt-6 border-t pt-4">
// // //         //   <h3 className="text-xl font-semibold mb-4">Sản phẩm liên quan</h3> */}
// // //           {/* ProductCard expects a 'product' prop */}
// // //           <ProductCard product={post.product} />
// // //         </div>
// // //       )}

// // //       {/* Biểu cảm */}
// // //       <div className="mb-4">
// // //         <strong>Biểu cảm:</strong>
// // //         {["like", "love", "haha", "wow", "sad", "angry"].map((r) => (
// // //           <button
// // //             key={r}
// // //             className={`mx-1 px-2 py-1 rounded ${
// // //               myReaction === r ? "bg-blue-200" : "bg-gray-200"
// // //             }`}
// // //             onClick={() => handleReact(r)}
// // //           >
// // //             {r} ({reactions.find((x) => x.reaction === r)?.total || 0})
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Bình luận */}
// // //       <div className="mb-2">
// // //         <strong>Bình luận:</strong>
// // //         <ul className="mb-2">
// // //           {comments.map((c) => (
// // //             <li key={c.id} className="border-b py-1">
// // //               <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //         <form onSubmit={handleComment} className="flex gap-2">
// // //           <input
// // //             className="border px-2 py-1 rounded flex-1"
// // //             value={commentInput}
// // //             onChange={(e) => setCommentInput(e.target.value)}
// // //             placeholder="Viết bình luận..."
// // //           />
// // //           <button
// // //             className="bg-indigo-500 text-white px-3 py-1 rounded"
// // //             type="submit"
// // //           >
// // //             Gửi
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useEffect, useState } from "react";
// // import ProductCard from "../ProductList";
// // import { ThumbsUp, Heart, Laugh, Meh, Frown, Angry } from "lucide-react";

// // export default function PostList() {
// //   const [posts, setPosts] = useState([]);
// //   const token =
// //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

// //   useEffect(() => {
// //     fetch("http://localhost:8000/api/posts", {
// //       headers: {
// //         ...(token && { Authorization: `Bearer ${token}` }),
// //       },
// //     })
// //       .then((res) => res.json())
// //       .then(setPosts);
// //   }, [token]);

// //   return (
// //     <div className="max-w-2xl mx-auto py-6 px-4">
// //       <h1 className="text-3xl font-bold mb-6">📰 Bài viết</h1>
// //       {posts.map((post) => (
// //         <PostItem key={post.id} post={post} token={token} />
// //       ))}
// //     </div>
// //   );
// // }

// // function PostItem({ post, token }) {
// //   const [comments, setComments] = useState([]);
// //   const [reactions, setReactions] = useState([]);
// //   const [commentInput, setCommentInput] = useState("");
// //   const [myReaction, setMyReaction] = useState(null);

// //   useEffect(() => {
// //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// //       .then((res) => res.json())
// //       .then(setComments);

// //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// //       .then((res) => res.json())
// //       .then(setReactions);
// //   }, [post.id]);

// //   const handleComment = async (e) => {
// //     e.preventDefault();
// //     if (!commentInput.trim()) return;

// //     await fetch(`http://localhost:8000/api/posts/${post.id}/comments`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         ...(token && { Authorization: `Bearer ${token}` }),
// //       },
// //       body: JSON.stringify({ content: commentInput }),
// //     });

// //     setCommentInput("");
// //     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
// //       .then((res) => res.json())
// //       .then(setComments);
// //   };

// //   const handleReact = async (reaction) => {
// //     await fetch(`http://localhost:8000/api/posts/${post.id}/react`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         ...(token && { Authorization: `Bearer ${token}` }),
// //       },
// //       body: JSON.stringify({ reaction }),
// //     });

// //     setMyReaction(reaction);
// //     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
// //       .then((res) => res.json())
// //       .then(setReactions);
// //   };

// //   const reactionIcons = {
// //     like: <ThumbsUp className="w-4 h-4" />,
// //     love: <Heart className="w-4 h-4 text-red-500" />,
// //     haha: <Laugh className="w-4 h-4 text-yellow-400" />,
// //     wow: <Meh className="w-4 h-4 text-blue-400" />,
// //     sad: <Frown className="w-4 h-4 text-gray-500" />,
// //     angry: <Angry className="w-4 h-4 text-red-600" />,
// //   };

// //   return (
// //     <div className="bg-white shadow rounded-lg p-5 mb-8">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-3">
// //         <h2 className="text-lg font-semibold">{post.title}</h2>
// //         <span className="text-xs text-gray-500">
// //           {new Date(post.created_at).toLocaleString()}
// //         </span>
// //       </div>

// //       {/* Image */}
// //       {post.image && (
// //         <img
// //           src={`http://localhost:8000/storage/${post.image}`}
// //           alt={post.title}
// //           className="w-full rounded-md mb-4"
// //         />
// //       )}

// //       {/* Content */}
// //       <div
// //         className="prose prose-sm max-w-none text-gray-800 mb-4"
// //         dangerouslySetInnerHTML={{ __html: post.content }}
// //       />

// //       {/* Product Preview */}
// //       {post.type === "product" && post.product && (
// //         <div className="my-4 border-t pt-4">
// //           <ProductCard product={post.product} />
// //         </div>
// //       )}

// //       {/* Meta Info */}
// //       <div className="text-sm text-gray-600 space-y-1 mb-4">
// //         <div>
// //           <strong>Tags:</strong> {post.tags}
// //         </div>
// //         <div>
// //           <strong>Lượt xem:</strong> {post.views}
// //         </div>
// //         <div>
// //           <strong>Nổi bật:</strong> {post.is_featured ? "✅" : "❌"}
// //         </div>
// //         <div>
// //           <strong>Tác giả:</strong> {post.author_id}
// //         </div>
// //       </div>

// //       {/* Reactions */}
// //       <div className="flex flex-wrap items-center gap-2 mb-4">
// //         {Object.keys(reactionIcons).map((r) => (
// //           <button
// //             key={r}
// //             onClick={() => handleReact(r)}
// //             className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition ${
// //               myReaction === r
// //                 ? "bg-blue-100 border-blue-300"
// //                 : "hover:bg-gray-100"
// //             }`}
// //           >
// //             {reactionIcons[r]}
// //             {reactions.find((x) => x.reaction === r)?.total || 0}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Comments */}
// //       <div className="border-t pt-4">
// //         <h3 className="text-sm font-semibold mb-2">Bình luận</h3>
// //         <ul className="mb-3 space-y-2 text-sm">
// //           {comments.map((c) => (
// //             <li key={c.id} className="bg-gray-100 p-2 rounded">
// //               <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Comment Input */}
// //         <form onSubmit={handleComment} className="flex gap-2">
// //           <input
// //             className="flex-1 border rounded px-3 py-1 text-sm"
// //             placeholder="Viết bình luận..."
// //             value={commentInput}
// //             onChange={(e) => setCommentInput(e.target.value)}
// //           />
// //           <button className="bg-indigo-600 text-white px-4 py-1 rounded text-sm">
// //             Gửi
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useEffect, useState } from "react";
// import ProductCard from "../ProductList";

// export default function PostList() {
//   const [posts, setPosts] = useState([]);
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     fetch("http://localhost:8000/api/posts", {
//       headers: { ...(token && { Authorization: `Bearer ${token}` }) },
//     })
//       .then((res) => res.json())
//       .then(setPosts);
//   }, [token]);

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">📰 Bài viết mới nhất</h1>
//       {posts.map((post) => (
//         <PostItem key={post.id} post={post} token={token} />
//       ))}
//     </div>
//   );
// }

// function PostItem({ post, token }) {
//   const [comments, setComments] = useState([]);
//   const [reactions, setReactions] = useState([]);
//   const [commentInput, setCommentInput] = useState("");
//   const [myReaction, setMyReaction] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
//       .then((res) => res.json())
//       .then(setComments);
//     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
//       .then((res) => res.json())
//       .then(setReactions);
//   }, [post.id]);

//   const handleComment = async (e) => {
//     e.preventDefault();
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

//   const handleReact = async (reaction) => {
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

//   return (
//     <div className="bg-white rounded-xl shadow mb-6 border overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-4">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold">
//           {post.author_id}
//         </div>
//         <div>
//           <p className="font-semibold text-sm text-gray-800">
//             Tác giả #{post.author_id}
//           </p>
//           <p className="text-xs text-gray-500">
//             {new Date(post.created_at).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Image */}
//       {post.image && (
//         <img
//           src={`http://localhost:8000/storage/${post.image}`}
//           alt={post.title}
//           className="w-full object-cover max-h-[400px]"
//         />
//       )}

//       {/* Nội dung bài viết */}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
//         <p className="text-sm italic text-gray-500 mb-3">{post.excerpt}</p>
//         <div
//           className="prose max-w-none text-gray-800 mb-4"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         {/* Reactions */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {["like", "love", "haha", "wow", "sad", "angry"].map((r) => (
//             <button
//               key={r}
//               className={`text-xs px-3 py-1 rounded-full transition ${
//                 myReaction === r
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//               onClick={() => handleReact(r)}
//             >
//               {r} ({reactions.find((x) => x.reaction === r)?.total || 0})
//             </button>
//           ))}
//         </div>

//         {/* Comments */}
//         <div>
//           <p className="font-semibold text-sm mb-2 text-gray-800">
//             💬 Bình luận
//           </p>
//           <ul className="space-y-2 mb-3">
//             {comments.map((c) => (
//               <li key={c.id} className="flex gap-2 items-start">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                   {c.user?.name?.[0] || "A"}
//                 </div>
//                 <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
//                   <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <form onSubmit={handleComment} className="flex gap-2">
//             <input
//               className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//               placeholder="Viết bình luận..."
//             />
//             <button
//               className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-600"
//               type="submit"
//             >
//               Gửi
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* ProductCard */}
//       {post.type === "product" && post.product && (
//         <div className="border-t bg-gray-50 p-4">
//           <h3 className="text-base font-semibold mb-3 text-gray-800">
//             🛍 Sản phẩm liên quan
//           </h3>
//           <div className="not-prose">
//             <ProductCard product={post.product} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState } from "react";
// import ProductCard from "../ProductList";
// import { ThumbsUp, Heart, Laugh, Smile, Frown, Angry } from "lucide-react";

// export default function PostList() {
//   const [posts, setPosts] = useState([]);
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     fetch("http://localhost:8000/api/posts", {
//       headers: { ...(token && { Authorization: `Bearer ${token}` }) },
//     })
//       .then((res) => res.json())
//       .then(setPosts);
//   }, [token]);

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">📰 Bài viết mới nhất</h1>
//       {posts.map((post) => (
//         <PostItem key={post.id} post={post} token={token} />
//       ))}
//     </div>
//   );
// }

// function PostItem({ post, token }) {
//   const [comments, setComments] = useState([]);

//   const [reactions, setReactions] = useState([]);
//   const [commentInput, setCommentInput] = useState("");
//   const [myReaction, setMyReaction] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
//       .then((res) => res.json())
//       .then(setComments);
//     fetch(`http://localhost:8000/api/posts/${post.id}/react`)
//       .then((res) => res.json())
//       .then(setReactions);
//   }, [post.id]);

//   const handleComment = async (e) => {
//     e.preventDefault();
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

//   const handleReact = async (reaction) => {
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

//   const reactionIcons = {
//     like: <ThumbsUp size={18} />,
//     love: <Heart size={18} />,
//     haha: <Laugh size={18} />,
//     wow: <Smile size={18} />,
//     sad: <Frown size={18} />,
//     angry: <Angry size={18} />,
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow mb-6 border overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-4">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold">
//           {post.author_id}
//         </div>
//         <div>
//           <p className="font-semibold text-sm text-gray-800">
//             Tác giả #{post.author_id}
//           </p>
//           <p className="text-xs text-gray-500">
//             {new Date(post.created_at).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Image */}
//       {post.image && (
//         <img
//           src={`http://localhost:8000/storage/${post.image}`}
//           alt={post.title}
//           className="w-full object-cover max-h-[400px]"
//         />
//       )}

//       {/* Nội dung */}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
//         <p className="text-sm italic text-gray-500 mb-3">{post.excerpt}</p>
//         <div
//           className="prose max-w-none text-gray-800 mb-4"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         {/* Reactions */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {Object.keys(reactionIcons).map((r) => (
//             <button
//               key={r}
//               title={r}
//               onClick={() => handleReact(r)}
//               className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition border ${
//                 myReaction === r
//                   ? "bg-blue-100 text-blue-600 border-blue-400"
//                   : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-300"
//               }`}
//             >
//               {reactionIcons[r]}
//               <span>{reactions.find((x) => x.reaction === r)?.total || 0}</span>
//             </button>
//           ))}
//         </div>

//         {/* Comments */}
//         <div>
//           <p className="font-semibold text-sm mb-2 text-gray-800">
//             💬 Bình luận
//           </p>
//           <ul className="space-y-2 mb-3">
//             {comments.map((c) => (
//               <li key={c.id} className="flex gap-2 items-start">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                   {c.user?.name?.[0] || "A"}
//                 </div>
//                 <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
//                   <span className="font-medium">
//                     {c.user?.name || "Ẩn danh"}:
//                   </span>{" "}
//                   {c.content}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <form onSubmit={handleComment} className="flex gap-2">
//             <input
//               className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//               placeholder="Viết bình luận..."
//             />
//             <button
//               className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-600"
//               type="submit"
//             >
//               Gửi
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* ProductCard */}
//       {post.type === "product" && post.product && (
//         <div className="border-t bg-gray-50 p-4">
//           <h3 className="text-base font-semibold mb-3 text-gray-800">
//             🛍 Sản phẩm liên quan
//           </h3>
//           <div className="not-prose">
//             <ProductCard product={post.product} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ProductList";
import { ThumbsUp, Heart, Laugh, Smile, Frown, Angry } from "lucide-react";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch("http://localhost:8000/api/posts", {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    })
      .then((res) => res.json())
      .then(setPosts);
  }, [token]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📰 Bài viết mới nhất</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} token={token} />
        ))}
      </div>
    </div>
  );
}

function PostItem({ post, token }) {
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [myReaction, setMyReaction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${post.id}/comments`)
      .then((res) => res.json())
      .then(setComments);

    fetch(`http://localhost:8000/api/posts/${post.id}/react`)
      .then((res) => res.json())
      .then(setReactions);
  }, [post.id]);

  const handleComment = async (e) => {
    e.preventDefault();
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

  const handleReact = async (reaction) => {
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

  const reactionIcons = {
    like: <ThumbsUp size={16} />,
    love: <Heart size={16} />,
    haha: <Laugh size={16} />,
    wow: <Smile size={16} />,
    sad: <Frown size={16} />,
    angry: <Angry size={16} />,
  };
  return (
    <div className="bg-white rounded-3xl shadow-lg mb-8 overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Top bar - avatar & info */}
      <div className="flex items-center px-6 pt-6 pb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-base font-bold shadow-md">
          {post.author_id}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">
            Tác giả #{post.author_id}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
        <div className="ml-auto text-xs text-gray-400 italic">#{post.slug}</div>
      </div>

      {/* Hình ảnh bài viết */}
      {post.image && (
        <img
          src={`http://localhost:8000/storage/${post.image}`}
          alt={post.title}
          className="w-full h-[300px] object-cover"
        />
      )}

      {/* Nội dung bài viết */}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
        <p className="text-gray-500 italic text-sm mb-4">
          {post.excerpt || post.meta_description}
        </p>

        <div
          className="prose prose-sm prose-indigo max-w-none text-gray-800 mb-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
          {post.tags?.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex gap-1 justify-start items-center flex-wrap border-t pt-4">
          {Object.keys(reactionIcons).map((r) => (
            <button
              key={r}
              title={r}
              onClick={() => handleReact(r)}
              className={`flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-full transition border ${
                myReaction === r
                  ? "bg-indigo-100 text-indigo-600 border-indigo-400"
                  : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
              style={{ minWidth: "48px" }}
            >
              {reactionIcons[r]}
              <span>{reactions.find((x) => x.reaction === r)?.total || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      {/* <div className="px-6 pb-5 pt-2">
        <p className="font-semibold text-sm mb-2 text-gray-800">💬 Bình luận</p>
        <ul className="space-y-2 mb-3">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-gradient-to-tr from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                {c.user?.name?.[0] || "A"}
              </div>
              <div className="bg-gray-50 px-4 py-2 rounded-2xl text-sm border">
                <span className="font-medium">
                  {c.user?.name || "Ẩn danh"}:
                </span>{" "}
                {c.content}
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleComment} className="flex gap-2">
          <input
            className="flex-1 border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Gửi bình luận yêu thương..."
          />
          <button
            className="bg-indigo-500 text-white px-5 py-2 rounded-full text-sm hover:bg-indigo-600"
            type="submit"
          >
            Gửi
          </button>
        </form>
      </div> */}

      {/* Sản phẩm liên quan */}
      {/* {post.type === "product" && post.product && (
        <div className="border-t bg-gray-50 px-6 py-5">
          <h3 className="text-base font-semibold mb-3 text-gray-800">
            🛍 Sản phẩm liên quan
          </h3>
          <div className="not-prose">
            <ProductCard product={post.product} />
          </div>
        </div>
      )} */}
      <div className="px-6 pb-5 pt-2">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm font-semibold mb-2 text-indigo-600 hover:underline"
        >
          {showComments ? "Ẩn bình luận" : "💬 Hiện bình luận"}
        </button>

        {showComments && (
          <>
            <ul className="space-y-2 mb-3 mt-2">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-3 items-start">
                  <div className="w-8 h-8 bg-gradient-to-tr from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {c.user?.name?.[0] || "A"}
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-2xl text-sm border">
                    <span className="font-medium">
                      {c.user?.name || "Ẩn danh"}:
                    </span>{" "}
                    {c.content}
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={handleComment} className="flex gap-2">
              <input
                className="flex-1 border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Gửi bình luận yêu thương..."
              />
              <button
                className="bg-indigo-500 text-white px-5 py-2 rounded-full text-sm hover:bg-indigo-600"
                type="submit"
              >
                Gửi
              </button>
            </form>
          </>
        )}
      </div>
      {post.type === "product" && post.product && (
        <div className="border-t bg-gray-50 px-6 py-5">
          <button
            onClick={() => setShowProduct(!showProduct)}
            className="text-sm font-semibold mb-2 text-indigo-600 hover:underline"
          >
            {showProduct
              ? "Ẩn sản phẩm liên quan"
              : "🛍 Hiện sản phẩm liên quan"}
          </button>

          {showProduct && (
            <div className="not-prose mt-3">
              <ProductCard product={post.product} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

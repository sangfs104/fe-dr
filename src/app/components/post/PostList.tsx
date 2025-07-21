"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductList";
import Image from "next/image";
import { ThumbsUp, Heart, Laugh, Smile, Frown, Angry } from "lucide-react";
import { Newspaper } from "lucide-react";
import { MessageSquareText, MessageCircleOff } from "lucide-react";
import { ShoppingBag, EyeOff } from "lucide-react";
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
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Newspaper className="w-6 h-6 text-blue-600" />
        Bài viết mới nhất
      </h1>
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
        <Image
          src={`http://127.0.0.1:8000/storage/${post.image}`}
          alt={post.title}
          width={800}
          height={300}
          className="w-full h-[300px] object-cover"
        />
      )}

      {/* Nội dung bài viết */}
      <div className="px-6 py-5">
        <h2 className="text-1xl font-bold mb-2 text-gray-800">{post.title}</h2>
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

      <div className="px-6 pb-5 pt-2">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm font-semibold mb-2 text-indigo-600 hover:underline"
        >
          {showComments ? (
            <>
              <MessageCircleOff className="inline w-4 h-4 mr-1" />
              Ẩn bình luận
            </>
          ) : (
            <>
              <MessageSquareText className="inline w-4 h-4 mr-1" />
              Hiện bình luận
            </>
          )}
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
            {showProduct ? (
              <>
                <EyeOff className="inline w-4 h-4 mr-1" />
                Ẩn sản phẩm liên quan
              </>
            ) : (
              <>
                <ShoppingBag className="inline w-4 h-4 mr-1" />
                Hiện sản phẩm liên quan
              </>
            )}
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

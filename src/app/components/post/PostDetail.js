"use client";
import { useEffect, useState } from "react";

export default function PostDetail({ postId, onClose }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [myReaction, setMyReaction] = useState(null);

  // Lấy token từ localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${postId}`)
      .then((res) => res.json())
      .then(setPost);

    fetch(`http://localhost:8000/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments);

    fetch(`http://localhost:8000/api/posts/${postId}/react`)
      .then((res) => res.json())
      .then(setReactions);
  }, [postId]);

  // Gửi bình luận
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    await fetch(`http://localhost:8000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ content: commentInput }),
    });
    setCommentInput("");
    fetch(`http://localhost:8000/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments);
  };

  // Gửi biểu cảm
  const handleReact = async (reaction) => {
    await fetch(`http://localhost:8000/api/posts/${postId}/react`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ reaction }),
    });
    setMyReaction(reaction);
    fetch(`http://localhost:8000/api/posts/${postId}/react`)
      .then((res) => res.json())
      .then(setReactions);
  };

  if (!post) return <div>Đang tải...</div>;

  return (
    <div className="bg-gray-50 p-4 rounded shadow mt-2">
      <button className="float-right text-red-500" onClick={onClose}>
        Đóng
      </button>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <div className="mb-2 text-gray-600">
        Loại: {post.type} | Trạng thái: {post.status}
      </div>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Biểu cảm */}
      <div className="mb-4">
        <strong>Biểu cảm: </strong>
        {["like", "love", "haha", "wow", "sad", "angry"].map((r) => (
          <button
            key={r}
            className={`mx-1 px-2 py-1 rounded ${
              myReaction === r ? "bg-blue-200" : "bg-gray-200"
            }`}
            onClick={() => handleReact(r)}
          >
            {r} ({reactions.find((x) => x.reaction === r)?.total || 0})
          </button>
        ))}
      </div>

      {/* Bình luận */}
      <div className="mb-2">
        <strong>Bình luận:</strong>
        <ul className="mb-2">
          {comments.map((c) => (
            <li key={c.id} className="border-b py-1">
              <b>{c.user?.name || "Ẩn danh"}:</b> {c.content}
            </li>
          ))}
        </ul>
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            className="border px-2 py-1 rounded flex-1"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Viết bình luận..."
          />
          <button
            className="bg-indigo-500 text-white px-3 py-1 rounded"
            type="submit"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

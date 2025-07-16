"use client";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews?.length)
    return <p className="text-gray-500">Chưa có đánh giá nào</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Đánh giá từ người dùng</h3>
      <ul className="space-y-4">
        {reviews.map((r, i) => (
          <li key={i} className="border-b pb-2">
            <p className="font-medium">{r.user?.name || "Ẩn danh"}</p>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

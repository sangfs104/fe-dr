"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DreamToast } from "../ui/DreamToast"; // Đường dẫn tùy theo cấu trúc dự án

type Address = {
  id: number;
  adress: string;
  user_id: number;
  is_default: number;
  created_at: string;
  updated_at: string;
};

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [defaultLoadingId, setDefaultLoadingId] = useState<number | null>(null);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Không tìm thấy token!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      const sorted = (result.data || []).sort(
        (a, b) => b.is_default - a.is_default
      );
      setAddresses(sorted);
    } catch (error) {
      toast.error("Lỗi khi lấy địa chỉ!");
      console.error("Lỗi khi lấy địa chỉ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token || !newAddress.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ adress: newAddress }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("Thêm địa chỉ thành công!");
        setNewAddress("");
        fetchAddresses();
      } else {
        toast.error("Lỗi: " + result.message);
      }
    } catch (error) {
      toast.error("Lỗi khi thêm địa chỉ!");
      console.error("Lỗi khi thêm địa chỉ:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Không tìm thấy token!");
      return;
    }

    setDefaultLoadingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${id}/set-default`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (res.ok || res.status === 204) {
        toast.success("Đặt địa chỉ làm mặc định thành công!");
        await fetchAddresses();
      } else {
        const result = await res.json();
        toast.error(
          "Lỗi: " + (result.message || "Không thể cập nhật địa chỉ mặc định!")
        );
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật địa chỉ mặc định!");
      console.error("Lỗi khi gọi API set-default:", error);
    } finally {
      setDefaultLoadingId(null);
    }
  };

  return (
    <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm space-y-4 sm:space-y-6">
      <DreamToast />
      <h2 className="text-lg sm:text-xl font-semibold text-orange-600">
        Danh sách địa chỉ nhận hàng
      </h2>

      {/* Form thêm địa chỉ mới */}
      <form
        onSubmit={handleAddAddress}
        className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Nhập địa chỉ mới..."
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm hover:bg-orange-600 w-full sm:w-auto disabled:bg-orange-300"
          disabled={submitting}
        >
          {submitting ? "Đang thêm..." : "Thêm"}
        </button>
      </form>

      {/* Danh sách địa chỉ */}
      {loading ? (
        <p className="text-xs sm:text-sm text-gray-500">Đang tải địa chỉ...</p>
      ) : addresses.length === 0 ? (
        <p className="text-xs sm:text-sm text-gray-500">
          Không có địa chỉ nào.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded-lg p-3 sm:p-4 text-xs sm:text-sm relative break-words transition-all duration-300 ${
                addr.is_default === 1
                  ? "border-[2px] border-orange-600 bg-gradient-to-r from-orange-50 to-white shadow-lg scale-[1.02]"
                  : "hover:border-orange-300"
              }`}
            >
              {addr.is_default === 1 && (
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-orange-600 text-white px-2 py-1 text-xs rounded shadow-md animate-bounce">
                  ⭐ Mặc định
                </div>
              )}

              <p className="text-gray-800 font-semibold">{addr.adress}</p>
              <p className="text-gray-500 mt-1 sm:mt-1.5">
                Ngày tạo: {new Date(addr.created_at).toLocaleDateString()}
              </p>

              {addr.is_default !== 1 && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="mt-2 sm:mt-3 inline-block text-orange-600 text-[10px] sm:text-xs font-semibold hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={defaultLoadingId === addr.id}
                >
                  {defaultLoadingId === addr.id
                    ? "Đang cập nhật..."
                    : "Đặt làm mặc định"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type Address = {
//   id: number;
//   adress: string;
//   user_id: number;
//   is_default: number;
//   created_at: string;
//   updated_at: string;
// };

// export default function AddressList() {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [newAddress, setNewAddress] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const fetchAddresses = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.warn("Không tìm thấy token!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8000/api/addresses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await res.json();
//       setAddresses(result.data || []);
//     } catch (error) {
//       console.error("Lỗi khi lấy địa chỉ:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const handleAddAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token || !newAddress.trim()) return;

//     setSubmitting(true);
//     try {
//       const res = await fetch("http://localhost:8000/api/addresses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ adress: newAddress }), // đúng key 'adress'
//       });

//       const result = await res.json();
//       if (res.ok) {
//         alert("Thêm địa chỉ thành công!");
//         setNewAddress("");
//         fetchAddresses();
//       } else {
//         alert("Lỗi: " + result.message);
//       }
//     } catch (error) {
//       console.error("Lỗi khi thêm địa chỉ:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Thêm hàm này để đặt địa chỉ mặc định
//   const handleSetDefault = async (id: number) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/addresses/${id}/set-default`,
//         {
//           method: "PATCH", // Đổi từ POST sang PATCH
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );
//       const result = await res.json();
//       if (res.ok) {
//         alert(result.message || "Đã cập nhật địa chỉ mặc định!");
//         fetchAddresses();
//       } else {
//         alert("Lỗi: " + (result.message || "Không thể cập nhật!"));
//       }
//     } catch (error) {
//       alert("Lỗi khi cập nhật địa chỉ mặc định!");
//       console.error(error);
//     }
//   };

//   return (
//     <section className="bg-white p-6 rounded-xl shadow hover:shadow-md transition space-y-6">
//       <h2 className="text-xl font-semibold text-orange-600">
//         🏠 Danh sách địa chỉ
//       </h2>

//       <form onSubmit={handleAddAddress} className="space-y-3">
//         <label className="block">
//           <span className="text-sm text-gray-600">Nhập địa chỉ mới:</span>
//           <input
//             type="text"
//             className="mt-1 p-2 border rounded w-full focus:ring focus:outline-none"
//             value={newAddress}
//             onChange={(e) => setNewAddress(e.target.value)}
//             placeholder="VD: 123 Đường ABC, Quận X, TP.HCM"
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//           disabled={submitting}
//         >
//           {submitting ? "Đang thêm..." : "Thêm địa chỉ"}
//         </button>
//       </form>

//       {loading ? (
//         <p>Đang tải địa chỉ...</p>
//       ) : (
//         <div className="space-y-4 text-sm">
//           {addresses.length > 0 ? (
//             addresses.map((addr) => (
//               <div
//                 key={addr.id}
//                 className="border p-4 rounded hover:border-orange-300 transition"
//               >
//                 <p>
//                   <strong>ID:</strong> {addr.id}
//                 </p>
//                 <p>
//                   <strong>Địa chỉ:</strong> {addr.adress}
//                 </p>
//                 <p>
//                   <strong>User ID:</strong> {addr.user_id}
//                 </p>
//                 <p>
//                   <strong>Loại:</strong>{" "}
//                   {addr.is_default === 1 ? "Địa chỉ mặc định" : "Địa chỉ phụ"}
//                 </p>
//                 <p>
//                   <strong>Ngày tạo:</strong>{" "}
//                   {new Date(addr.created_at).toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Ngày cập nhật:</strong>{" "}
//                   {new Date(addr.updated_at).toLocaleString()}
//                 </p>
//                 {/* Nút đặt làm mặc định cho địa chỉ phụ */}
//                 {addr.is_default !== 1 && (
//                   <button
//                     className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs"
//                     onClick={() => handleSetDefault(addr.id)}
//                   >
//                     Đặt làm mặc định
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>Không có địa chỉ nào.</p>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";

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

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Không tìm thấy token!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setAddresses(result.data || []);
    } catch (error) {
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
      const res = await fetch("http://localhost:8000/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adress: newAddress }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Thêm địa chỉ thành công!");
        setNewAddress("");
        fetchAddresses();
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/addresses/${id}/set-default`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        alert(result.message || "Đã cập nhật địa chỉ mặc định!");
        fetchAddresses();
      } else {
        alert("Lỗi: " + (result.message || "Không thể cập nhật!"));
      }
    } catch (error) {
      alert("Lỗi khi cập nhật địa chỉ mặc định!");
      console.error(error);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-orange-600">
        Danh sách địa chỉ nhận hàng
      </h2>

      {/* Form thêm địa chỉ mới */}
      <form onSubmit={handleAddAddress} className="flex gap-4 items-center">
        <input
          type="text"
          className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Nhập địa chỉ mới..."
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
          disabled={submitting}
        >
          {submitting ? "Đang thêm..." : "Thêm"}
        </button>
      </form>

      {/* Danh sách địa chỉ */}
      {loading ? (
        <p className="text-sm text-gray-500">Đang tải địa chỉ...</p>
      ) : addresses.length === 0 ? (
        <p className="text-sm text-gray-500">Không có địa chỉ nào.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded-lg p-4 text-sm relative ${
                addr.is_default === 1
                  ? "border-orange-500 bg-orange-50"
                  : "hover:border-orange-300"
              }`}
            >
              {addr.is_default === 1 && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
                  Mặc định
                </div>
              )}

              <p className="text-gray-800 font-medium">{addr.adress}</p>
              <p className="text-gray-500 mt-1">
                Ngày tạo: {new Date(addr.created_at).toLocaleDateString()}
              </p>

              {addr.is_default !== 1 && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="mt-3 inline-block text-orange-600 text-xs font-semibold hover:underline"
                >
                  Đặt làm mặc định
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

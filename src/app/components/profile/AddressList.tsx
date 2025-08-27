// // "use client";
// // import { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import { DreamToast } from "../ui/DreamToast";

// // type Address = {
// //   id: number;
// //   adress: string;
// //   user_id: number;
// //   is_default: number;
// //   created_at: string;
// //   updated_at: string;
// // };

// // export default function AddressList() {
// //   const [addresses, setAddresses] = useState<Address[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [newAddress, setNewAddress] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [defaultLoadingId, setDefaultLoadingId] = useState<number | null>(null);

// //   const fetchAddresses = async () => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Không tìm thấy token!");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       const result = await res.json();
// //       const sorted = ((result.data || []) as Address[]).sort(
// //         (a, b) => b.is_default - a.is_default
// //       );

// //       setAddresses(sorted);
// //     } catch (error) {
// //       toast.error("Lỗi khi lấy địa chỉ!");
// //       console.error("Lỗi khi lấy địa chỉ:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAddresses();
// //   }, []);

// //   const handleAddAddress = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem("token");

// //     if (!token || !newAddress.trim()) return;

// //     setSubmitting(true);
// //     try {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify({ adress: newAddress }),
// //         }
// //       );

// //       const result = await res.json();
// //       if (res.ok) {
// //         toast.success("Thêm địa chỉ thành công!");
// //         setNewAddress("");
// //         fetchAddresses();
// //       } else {
// //         toast.error("Lỗi: " + result.message);
// //       }
// //     } catch (error) {
// //       toast.error("Lỗi khi thêm địa chỉ!");
// //       console.error("Lỗi khi thêm địa chỉ:", error);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleSetDefault = async (id: number) => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Không tìm thấy token!");
// //       return;
// //     }

// //     setDefaultLoadingId(id);
// //     try {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${id}/set-default`,
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: "application/json",
// //           },
// //         }
// //       );

// //       if (res.ok || res.status === 204) {
// //         toast.success("Đặt địa chỉ làm mặc định thành công!");
// //         await fetchAddresses();
// //       } else {
// //         const result = await res.json();
// //         toast.error(
// //           "Lỗi: " + (result.message || "Không thể cập nhật địa chỉ mặc định!")
// //         );
// //       }
// //     } catch (error) {
// //       toast.error("Lỗi khi cập nhật địa chỉ mặc định!");
// //       console.error("Lỗi khi gọi API set-default:", error);
// //     } finally {
// //       setDefaultLoadingId(null);
// //     }
// //   };

// //   return (
// //     <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm space-y-4 sm:space-y-6">
// //       <DreamToast />
// //       <h2 className="text-lg sm:text-xl font-semibold text-orange-600">
// //         Danh sách địa chỉ nhận hàng
// //       </h2>

// //       {/* Form thêm địa chỉ mới */}
// //       <form
// //         onSubmit={handleAddAddress}
// //         className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center"
// //       >
// //         <input
// //           type="text"
// //           className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
// //           value={newAddress}
// //           onChange={(e) => setNewAddress(e.target.value)}
// //           placeholder="Nhập địa chỉ mới..."
// //           required
// //         />
// //         <button
// //           type="submit"
// //           className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm hover:bg-orange-600 w-full sm:w-auto disabled:bg-orange-300"
// //           disabled={submitting}
// //         >
// //           {submitting ? "Đang thêm..." : "Thêm"}
// //         </button>
// //       </form>

// //       {/* Danh sách địa chỉ */}
// //       {loading ? (
// //         <p className="text-xs sm:text-sm text-gray-500">Đang tải địa chỉ...</p>
// //       ) : addresses.length === 0 ? (
// //         <p className="text-xs sm:text-sm text-gray-500">
// //           Không có địa chỉ nào.
// //         </p>
// //       ) : (
// //         <div className="space-y-3 sm:space-y-4">
// //           {addresses.map((addr) => (
// //             <div
// //               key={addr.id}
// //               className={`border rounded-lg p-3 sm:p-4 text-xs sm:text-sm relative break-words transition-all duration-300 ${
// //                 addr.is_default === 1
// //                   ? "border-[2px] border-orange-600 bg-gradient-to-r from-orange-50 to-white shadow-lg scale-[1.02]"
// //                   : "hover:border-orange-300"
// //               }`}
// //             >
// //               {addr.is_default === 1 && (
// //                 <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-orange-600 text-white px-2 py-1 text-xs rounded shadow-md animate-bounce">
// //                   ⭐ Mặc định
// //                 </div>
// //               )}

// //               <p className="text-gray-800 font-semibold">{addr.adress}</p>
// //               <p className="text-gray-500 mt-1 sm:mt-1.5">
// //                 Ngày tạo: {new Date(addr.created_at).toLocaleDateString()}
// //               </p>

// //               {addr.is_default !== 1 && (
// //                 <button
// //                   onClick={() => handleSetDefault(addr.id)}
// //                   className="mt-2 sm:mt-3 inline-block text-orange-600 text-[10px] sm:text-xs font-semibold hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
// //                   disabled={defaultLoadingId === addr.id}
// //                 >
// //                   {defaultLoadingId === addr.id
// //                     ? "Đang cập nhật..."
// //                     : "Đặt làm mặc định"}
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </section>
// //   );
// // }
// "use client";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { DreamToast } from "../ui/DreamToast";

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
//   const [defaultLoadingId, setDefaultLoadingId] = useState<number | null>(null);
//   const [highlightedId, setHighlightedId] = useState<number | null>(null);

//   const fetchAddresses = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Không tìm thấy token!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const result = await res.json();
//       const sorted = ((result.data || []) as Address[]).sort(
//         (a, b) => b.is_default - a.is_default
//       );

//       setAddresses(sorted);
//     } catch (error) {
//       toast.error("Lỗi khi lấy địa chỉ!");
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
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ adress: newAddress }),
//         }
//       );

//       const result = await res.json();
//       if (res.ok) {
//         toast.success("Thêm địa chỉ thành công!");
//         setNewAddress("");
//         fetchAddresses();
//       } else {
//         toast.error("Lỗi: " + result.message);
//       }
//     } catch (error) {
//       toast.error("Lỗi khi thêm địa chỉ!");
//       console.error("Lỗi khi thêm địa chỉ:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSetDefault = async (id: number) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Không tìm thấy token!");
//       return;
//     }

//     setDefaultLoadingId(id);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${id}/set-default`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       if (res.ok || res.status === 204) {
//         toast.success("Đặt địa chỉ làm mặc định thành công!");

//         // Highlight địa chỉ mới được đặt làm mặc định
//         setHighlightedId(id);

//         await fetchAddresses();

//         // Tự động tắt highlight sau 3 giây
//         setTimeout(() => {
//           setHighlightedId(null);
//         }, 3000);
//       } else {
//         const result = await res.json();
//         toast.error(
//           "Lỗi: " + (result.message || "Không thể cập nhật địa chỉ mặc định!")
//         );
//       }
//     } catch (error) {
//       toast.error("Lỗi khi cập nhật địa chỉ mặc định!");
//       console.error("Lỗi khi gọi API set-default:", error);
//     } finally {
//       setDefaultLoadingId(null);
//     }
//   };

//   return (
//     <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm space-y-4 sm:space-y-6">
//       <DreamToast />
//       <h2 className="text-lg sm:text-xl font-semibold text-orange-600">
//         Danh sách địa chỉ nhận hàng
//       </h2>

//       {/* Form thêm địa chỉ mới */}
//       <form
//         onSubmit={handleAddAddress}
//         className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center"
//       >
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
//           value={newAddress}
//           onChange={(e) => setNewAddress(e.target.value)}
//           placeholder="Nhập địa chỉ mới..."
//           required
//         />
//         <button
//           type="submit"
//           className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm hover:bg-orange-600 w-full sm:w-auto disabled:bg-orange-300"
//           disabled={submitting}
//         >
//           {submitting ? "Đang thêm..." : "Thêm"}
//         </button>
//       </form>

//       {/* Danh sách địa chỉ */}
//       {loading ? (
//         <p className="text-xs sm:text-sm text-gray-500">Đang tải địa chỉ...</p>
//       ) : addresses.length === 0 ? (
//         <p className="text-xs sm:text-sm text-gray-500">
//           Không có địa chỉ nào.
//         </p>
//       ) : (
//         <div className="space-y-3 sm:space-y-4">
//           {addresses.map((addr) => (
//             <div
//               key={addr.id}
//               className={`border rounded-lg p-3 sm:p-4 text-xs sm:text-sm relative break-words transition-all duration-500 ${
//                 addr.is_default === 1
//                   ? `border-[3px] border-orange-600 bg-gradient-to-r from-orange-50 via-orange-25 to-white shadow-xl transform scale-105 ${
//                       highlightedId === addr.id
//                         ? "animate-pulse shadow-2xl ring-4 ring-orange-300 ring-opacity-50 bg-gradient-to-r from-orange-100 via-orange-50 to-white scale-110"
//                         : ""
//                     }`
//                   : "border-gray-200 hover:border-orange-300 hover:shadow-md transform hover:scale-[1.01]"
//               }`}
//             >
//               {addr.is_default === 1 && (
//                 <div
//                   className={`absolute top-1 sm:top-2 right-1 sm:right-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-2 py-1 text-xs rounded-full shadow-lg transform transition-all duration-300 ${
//                     highlightedId === addr.id
//                       ? "animate-bounce scale-110 bg-gradient-to-r from-orange-500 to-red-500"
//                       : ""
//                   }`}
//                 >
//                   <span className="flex items-center gap-1">
//                     <span className="text-yellow-200">⭐</span>
//                     <span className="font-semibold">Mặc định</span>
//                   </span>
//                 </div>
//               )}

//               <p
//                 className={`text-gray-800 font-semibold transition-colors duration-300 ${
//                   highlightedId === addr.id ? "text-orange-700" : ""
//                 }`}
//               >
//                 {addr.adress}
//               </p>
//               <p className="text-gray-500 mt-1 sm:mt-1.5">
//                 Ngày tạo: {new Date(addr.created_at).toLocaleDateString()}
//               </p>

//               {addr.is_default !== 1 && (
//                 <button
//                   onClick={() => handleSetDefault(addr.id)}
//                   className="mt-2 sm:mt-3 inline-block bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold hover:from-orange-200 hover:to-orange-100 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:from-gray-100 disabled:to-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
//                   disabled={defaultLoadingId === addr.id}
//                 >
//                   {defaultLoadingId === addr.id ? (
//                     <span className="flex items-center gap-1">
//                       <span className="animate-spin">⏳</span>
//                       <span>Đang cập nhật...</span>
//                     </span>
//                   ) : (
//                     "Đặt làm mặc định"
//                   )}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DreamToast } from "../ui/DreamToast";

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
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

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
      const sorted = ((result.data || []) as Address[]).sort(
        (a, b) => b.is_default - a.is_default
      );

      setAddresses(sorted);
      console.log("Addresses data:", sorted); // Debug để xem dữ liệu
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

        // Highlight địa chỉ mới được đặt làm mặc định
        setHighlightedId(id);

        await fetchAddresses();

        // Tự động tắt highlight sau 3 giây
        setTimeout(() => {
          setHighlightedId(null);
        }, 3000);
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

      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Danh sách địa chỉ nhận hàng
        </h2>
      </div>

      {/* Form thêm địa chỉ mới */}
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-orange-500">📍</span>
          Thêm địa chỉ mới
        </h3>
        <form
          onSubmit={handleAddAddress}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center"
        >
          <input
            type="text"
            className="flex-1 border-2 border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none w-full transition-all duration-200"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Nhập địa chỉ mới..."
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Đang thêm...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <span>➕</span>
                Thêm địa chỉ
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Danh sách địa chỉ */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
            <p className="text-sm text-gray-600">Đang tải địa chỉ...</p>
          </div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm text-gray-500">
            Chưa có địa chỉ nào. Hãy thêm địa chỉ đầu tiên!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => {
            // Debug log
            console.log(`Address ${addr.id}: is_default = ${addr.is_default}`);

            // Kiểm tra địa chỉ mặc định (is_default = 1)
            const isDefault = addr.is_default === 1;

            return (
              <div
                key={addr.id}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  isDefault
                    ? /* ĐỊA CHỈ MẶC ĐỊNH - SIÊU NỔI BẬT */
                      `bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 
                       border-4 border-orange-500 
                       shadow-xl 
                       transform scale-105
                       ${
                         highlightedId === addr.id
                           ? "animate-pulse ring-4 ring-orange-400 ring-opacity-50"
                           : ""
                       }
                      `
                    : /* ĐỊA CHỈ THƯỜNG - ĐƠN GIẢN */
                      `bg-white 
                       border border-gray-200 
                       hover:border-orange-300 hover:shadow-md
                      `
                }`}
              >
                {/* Header với icon */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isDefault ? (
                      /* Icon cho địa chỉ mặc định */
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-bold">🏠</span>
                      </div>
                    ) : (
                      /* Icon cho địa chỉ thường */
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-lg">📍</span>
                      </div>
                    )}

                    <div>
                      <p
                        className={`font-semibold text-base ${
                          isDefault ? "text-orange-800" : "text-gray-800"
                        }`}
                      >
                        {addr.adress}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        📅{" "}
                        {new Date(addr.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  {/* Badge MẶC ĐỊNH */}
                  {isDefault && (
                    <div
                      className={`transition-all duration-300 ${
                        highlightedId === addr.id ? "animate-bounce" : ""
                      }`}
                    >
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                        <span className="text-yellow-200 text-sm">⭐</span>
                        <span>MẶC ĐỊNH</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nút đặt làm mặc định (chỉ hiện với địa chỉ thường) */}
                {!isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="w-full bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-3 rounded-lg text-sm font-semibold hover:from-orange-200 hover:to-orange-100 hover:shadow-md transform hover:scale-105 transition-all duration-200 border border-orange-200 hover:border-orange-300 disabled:from-gray-100 disabled:to-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={defaultLoadingId === addr.id}
                  >
                    {defaultLoadingId === addr.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"></span>
                        <span>Đang cập nhật...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>⭐</span>
                        <span>Đặt làm địa chỉ mặc định</span>
                      </span>
                    )}
                  </button>
                )}

                {/* Đường viền nổi bật cho địa chỉ mặc định */}
                {isDefault && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-t-xl"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

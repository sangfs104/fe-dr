// // // // // "use client";
// // // // // import { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import { toast } from "react-hot-toast";
// // // // // import { Pencil, Save, X } from "lucide-react";
// // // // // import Image from "next/image";
// // // // // type UserInfo = {
// // // // //   name: string;
// // // // //   email: string;
// // // // //   phone: string;
// // // // //   role: string;
// // // // //   day_of_birth?: string;
// // // // //   avatar?: string;
// // // // //   is_active?: string;
// // // // //   created_at?: string;
// // // // //   updated_at?: string;
// // // // // };
// // // // // const API_BASE = process.env.NEXT_PUBLIC_API_URL;
// // // // // export default function UserInfo() {
// // // // //   const [user, setUser] = useState<UserInfo | null>(null);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [form, setForm] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     phone: "",
// // // // //     day_of_birth: "",
// // // // //   });
// // // // //   const [passwordForm, setPasswordForm] = useState({
// // // // //     old_password: "",
// // // // //     new_password: "",
// // // // //   });
// // // // //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
// // // // //   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     const stored = localStorage.getItem("user");
// // // // //     if (stored) {
// // // // //       const parsed = JSON.parse(stored);
// // // // //       setUser(parsed);
// // // // //       setForm({
// // // // //         name: parsed.name || "",
// // // // //         email: parsed.email || "",
// // // // //         phone: parsed.phone || "",
// // // // //         day_of_birth: parsed.day_of_birth
// // // // //           ? parsed.day_of_birth.slice(0, 10)
// // // // //           : "",
// // // // //       });
// // // // //     }
// // // // //   }, []);

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handleSave = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const formData = new FormData();
// // // // //       formData.append("name", form.name);
// // // // //       formData.append("email", form.email);
// // // // //       formData.append("phone", form.phone);
// // // // //       formData.append("day_of_birth", form.day_of_birth);
// // // // //       formData.append("_method", "PATCH");
// // // // //       if (avatarFile) {
// // // // //         formData.append("avatar", avatarFile);
// // // // //       }

// // // // //       const res = await axios.post(`${API_BASE}/api/user/profile`, formData, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           "Content-Type": "multipart/form-data",
// // // // //         },
// // // // //         transformResponse: [
// // // // //           (data) => {
// // // // //             const jsonStart = data.indexOf("{");
// // // // //             return JSON.parse(data.slice(jsonStart));
// // // // //           },
// // // // //         ],
// // // // //       });

// // // // //       toast.success("Cập nhật thông tin thành công!");
// // // // //       setUser(res.data.data);
// // // // //       localStorage.setItem("user", JSON.stringify(res.data.data));
// // // // //       setAvatarFile(null);
// // // // //       setAvatarPreview(null);
// // // // //       setIsEditing(false);
// // // // //     } catch (err) {
// // // // //       toast.error("❌ Có lỗi xảy ra khi cập nhật.");
// // // // //       console.error(err);
// // // // //     }
// // // // //   };

// // // // //   const handleChangePassword = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       await axios.post(`${API_BASE}/api/change-password`, passwordForm, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //       });
// // // // //       toast.success("Đổi mật khẩu thành công!");
// // // // //       setPasswordForm({ old_password: "", new_password: "" });
// // // // //     } catch (error) {
// // // // //       toast.error("❌ Đổi mật khẩu thất bại!");
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   if (!user) return null;

// // // // //   return (
// // // // //     <section className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg border border-gray-200 py-5 shadow-sm">
// // // // //       <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 gap-2">
// // // // //         <div>
// // // // //           <h2 className="text-lg font-semibold text-gray-800">
// // // // //             Thông tin cá nhân
// // // // //           </h2>
// // // // //           <p className="text-sm text-gray-500">
// // // // //             Quản lý thông tin hồ sơ để bảo mật tài khoản
// // // // //           </p>
// // // // //         </div>
// // // // //         {!isEditing ? (
// // // // //           <button
// // // // //             onClick={() => setIsEditing(true)}
// // // // //             className="text-sm sm:text-base text-orange-600 hover:text-orange-700 flex items-center gap-1"
// // // // //           >
// // // // //             <Pencil size={16} /> Chỉnh sửa
// // // // //           </button>
// // // // //         ) : (
// // // // //           <div className="flex gap-2 flex-wrap">
// // // // //             <button
// // // // //               onClick={handleSave}
// // // // //               className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base px-3 py-1.5 rounded flex items-center gap-1"
// // // // //             >
// // // // //               <Save size={16} /> Lưu
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => {
// // // // //                 setIsEditing(false);
// // // // //                 setAvatarFile(null);
// // // // //                 setAvatarPreview(null);
// // // // //               }}
// // // // //               className="text-gray-600 hover:text-gray-800 text-sm sm:text-base flex items-center gap-1"
// // // // //             >
// // // // //               <X size={16} /> Hủy
// // // // //             </button>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
// // // // //         {avatarPreview ? (
// // // // //           <Image
// // // // //             width={96} // 👈 Thêm
// // // // //             height={96} // 👈 Thêm
// // // // //             src={avatarPreview}
// // // // //             alt="Avatar Preview"
// // // // //             className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
// // // // //           />
// // // // //         ) : user.avatar ? (
// // // // //           <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
// // // // //             <Image
// // // // //               src={avatarPreview || `${API_BASE}/storage/${user.avatar}`}
// // // // //               alt="Avatar"
// // // // //               fill
// // // // //               className="rounded-full object-cover border"
// // // // //               sizes="96px"
// // // // //             />
// // // // //             {isEditing && (
// // // // //               <>
// // // // //                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
// // // // //                   <span className="text-white text-sm">Thay ảnh</span>
// // // // //                 </div>
// // // // //                 <input
// // // // //                   type="file"
// // // // //                   accept="image/*"
// // // // //                   onChange={(e) => {
// // // // //                     const file = e.target.files?.[0];
// // // // //                     if (file) {
// // // // //                       setAvatarFile(file);
// // // // //                       setAvatarPreview(URL.createObjectURL(file));
// // // // //                     }
// // // // //                   }}
// // // // //                   className="absolute inset-0 opacity-0 cursor-pointer"
// // // // //                 />
// // // // //               </>
// // // // //             )}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
// // // // //             {user.name.charAt(0)}
// // // // //           </div>
// // // // //         )}
// // // // //         <div>
// // // // //           <div className="font-semibold text-base">{user.name}</div>
// // // // //           <span
// // // // //             className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
// // // // //               user.role === "admin"
// // // // //                 ? "bg-red-100 text-red-600"
// // // // //                 : "bg-blue-100 text-blue-600"
// // // // //             }`}
// // // // //           >
// // // // //             {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
// // // // //           </span>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // // //         {isEditing ? (
// // // // //           <>
// // // // //             <InputField
// // // // //               label="Họ tên"
// // // // //               name="name"
// // // // //               value={form.name}
// // // // //               onChange={handleChange}
// // // // //             />
// // // // //             <InputField
// // // // //               label="Email"
// // // // //               name="email"
// // // // //               value={form.email}
// // // // //               onChange={handleChange}
// // // // //             />
// // // // //             <InputField
// // // // //               label="Số điện thoại"
// // // // //               name="phone"
// // // // //               value={form.phone}
// // // // //               onChange={handleChange}
// // // // //             />
// // // // //             <InputField
// // // // //               label="Ngày sinh"
// // // // //               name="day_of_birth"
// // // // //               type="date"
// // // // //               value={form.day_of_birth}
// // // // //               onChange={handleChange}
// // // // //             />
// // // // //             <div>
// // // // //               <label className="block text-sm text-gray-600 mb-1">
// // // // //                 Ảnh đại diện
// // // // //               </label>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept="image/*"
// // // // //                 onChange={(e) => {
// // // // //                   const file = e.target.files?.[0];
// // // // //                   if (file) {
// // // // //                     setAvatarFile(file);
// // // // //                     setAvatarPreview(URL.createObjectURL(file));
// // // // //                   }
// // // // //                 }}
// // // // //               />
// // // // //               {avatarPreview && (
// // // // //                 <Image
// // // // //                   src={avatarPreview}
// // // // //                   alt="Preview"
// // // // //                   width={80}
// // // // //                   height={80}
// // // // //                   className="w-20 h-20 rounded-full mt-2 object-cover border"
// // // // //                 />
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Đổi mật khẩu */}
// // // // //             <div className="md:col-span-2 border-t pt-4 mt-4">
// // // // //               <h3 className="text-sm font-semibold text-gray-700 mb-2">
// // // // //                 Đổi mật khẩu
// // // // //               </h3>
// // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // //                 <InputField
// // // // //                   label="Mật khẩu cũ"
// // // // //                   name="old_password"
// // // // //                   type="password"
// // // // //                   value={passwordForm.old_password}
// // // // //                   onChange={(e) =>
// // // // //                     setPasswordForm({
// // // // //                       ...passwordForm,
// // // // //                       old_password: e.target.value,
// // // // //                     })
// // // // //                   }
// // // // //                 />
// // // // //                 <InputField
// // // // //                   label="Mật khẩu mới"
// // // // //                   name="new_password"
// // // // //                   type="password"
// // // // //                   value={passwordForm.new_password}
// // // // //                   onChange={(e) =>
// // // // //                     setPasswordForm({
// // // // //                       ...passwordForm,
// // // // //                       new_password: e.target.value,
// // // // //                     })
// // // // //                   }
// // // // //                 />
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={handleChangePassword}
// // // // //                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
// // // // //               >
// // // // //                 Đổi mật khẩu
// // // // //               </button>
// // // // //             </div>
// // // // //           </>
// // // // //         ) : (
// // // // //           <>
// // // // //             <Field label="Họ tên" value={user.name} />
// // // // //             <Field label="Email" value={user.email} />
// // // // //             <Field label="Số điện thoại" value={user.phone} />
// // // // //             <Field
// // // // //               label="Ngày sinh"
// // // // //               value={
// // // // //                 user.day_of_birth
// // // // //                   ? new Date(user.day_of_birth).toLocaleDateString("vi-VN")
// // // // //                   : ""
// // // // //               }
// // // // //             />
// // // // //             {/* <Field
// // // // //               label="Tình trạng"
// // // // //               value={user.is_active === "on" ? "Đang hoạt động" : "Bị khóa"}
// // // // //             />
// // // // //             <Field
// // // // //               label="Ngày tạo"
// // // // //               value={
// // // // //                 user.created_at
// // // // //                   ? new Date(user.created_at).toLocaleString("vi-VN")
// // // // //                   : ""
// // // // //               }
// // // // //             />
// // // // //             <Field
// // // // //               label="Cập nhật gần nhất"
// // // // //               value={
// // // // //                 user.updated_at
// // // // //                   ? new Date(user.updated_at).toLocaleString("vi-VN")
// // // // //                   : ""
// // // // //               }
// // // // //             /> */}
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // function Field({ label, value }: { label: string; value: string }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <div className="text-sm text-gray-500 mb-1">{label}</div>
// // // // //       <div className="text-base text-gray-800">{value}</div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function InputField({
// // // // //   label,
// // // // //   name,
// // // // //   value,
// // // // //   onChange,
// // // // //   type = "text",
// // // // // }: {
// // // // //   label: string;
// // // // //   name: string;
// // // // //   value: string;
// // // // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // // //   type?: string;
// // // // // }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <label className="block text-sm text-gray-600 mb-1">{label}</label>
// // // // //       <input
// // // // //         name={name}
// // // // //         value={value}
// // // // //         onChange={onChange}
// // // // //         type={type}
// // // // //         className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Pencil, Save, X } from "lucide-react";
// import Image from "next/image";

// type UserInfo = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string | null;
//   role: string;
//   day_of_birth?: string | null;
//   avatar_url?: string | null;
//   avatar?: string | null;
//   is_active?: string;
//   created_at?: string;
//   updated_at?: string;
//   google_id?: string;
// };

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// export default function UserInfo() {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     day_of_birth: "",
//   });
//   const [passwordForm, setPasswordForm] = useState({
//     old_password: "",
//     new_password: "",
//   });
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       setUser(parsed);
//       setForm({
//         name: parsed.name || "",
//         email: parsed.email || "",
//         phone: parsed.phone || "",
//         day_of_birth: parsed.day_of_birth
//           ? parsed.day_of_birth.slice(0, 10)
//           : "",
//       });
//     }
//   }, []);

//   // Clean up avatar preview URL to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (avatarPreview) {
//         URL.revokeObjectURL(avatarPreview);
//       }
//     };
//   }, [avatarPreview]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("email", form.email);
//       formData.append("phone", form.phone);
//       formData.append("day_of_birth", form.day_of_birth);
//       formData.append("_method", "PATCH");
//       if (avatarFile) {
//         formData.append("avatar", avatarFile);
//       }

//       const res = await axios.post(`${API_BASE}/api/user/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         transformResponse: [
//           (data) => {
//             const jsonStart = data.indexOf("{");
//             return JSON.parse(data.slice(jsonStart));
//           },
//         ],
//       });

//       toast.success("Cập nhật thông tin thành công!");
//       setUser(res.data.data);
//       localStorage.setItem("user", JSON.stringify(res.data.data));
//       setAvatarFile(null);
//       setAvatarPreview(null);
//       setIsEditing(false);
//     } catch (err) {
//       toast.error("❌ Có lỗi xảy ra khi cập nhật.");
//       console.error(err);
//     }
//   };

//   const handleChangePassword = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(`${API_BASE}/api/change-password`, passwordForm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Đổi mật khẩu thành công!");
//       setPasswordForm({ old_password: "", new_password: "" });
//     } catch (error) {
//       toast.error("❌ Đổi mật khẩu thất bại!");
//       console.error(error);
//     }
//   };

//   if (!user) return null;

//   return (
//     <section className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg border border-gray-200 py-5 shadow-sm">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 gap-2">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">
//             Thông tin cá nhân
//           </h2>
//           <p className="text-sm text-gray-500">
//             Quản lý thông tin hồ sơ để bảo mật tài khoản
//           </p>
//         </div>
//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-sm sm:text-base text-orange-600 hover:text-orange-700 flex items-center gap-1"
//           >
//             <Pencil size={16} /> Chỉnh sửa
//           </button>
//         ) : (
//           <div className="flex gap-2 flex-wrap">
//             <button
//               onClick={handleSave}
//               className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base px-3 py-1.5 rounded flex items-center gap-1"
//             >
//               <Save size={16} /> Lưu
//             </button>
//             <button
//               onClick={() => {
//                 setIsEditing(false);
//                 setAvatarFile(null);
//                 setAvatarPreview(null);
//               }}
//               className="text-gray-600 hover:text-gray-800 text-sm sm:text-base flex items-center gap-1"
//             >
//               <X size={16} /> Hủy
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
//         {avatarPreview ? (
//           <Image
//             width={96}
//             height={96}
//             src={avatarPreview}
//             alt="Avatar Preview"
//             className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
//           />
//         ) : user.avatar ? (
//           <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
//             <Image
//               src={user.avatar_url}
//               alt="Avatar"
//               fill
//               className="rounded-full object-cover border"
//               sizes="96px"
//             />
//             {isEditing && (
//               <>
//                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <span className="text-white text-sm">Thay ảnh</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       setAvatarFile(file);
//                       setAvatarPreview(URL.createObjectURL(file));
//                     }
//                   }}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
//             {user.name.charAt(0)}
//           </div>
//         )}
//         <div>
//           <div className="font-semibold text-base">{user.name}</div>
//           <span
//             className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
//               user.role === "admin"
//                 ? "bg-red-100 text-red-600"
//                 : "bg-blue-100 text-blue-600"
//             }`}
//           >
//             {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
//           </span>
//         </div>
//       </div>
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
//         {avatarPreview ? (
//           <Image
//             width={96}
//             height={96}
//             src={avatarPreview} // Safe to use since avatarPreview is checked
//             alt="Avatar Preview"
//             className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
//           />
//         ) : user.avatar_url ? (
//           <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
//             <Image
//               src={user.avatar_url}
//               alt="Avatar"
//               fill
//               className="rounded-full object-cover border"
//               sizes="96px"
//             />
//             {isEditing && (
//               <>
//                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <span className="text-white text-sm">Thay ảnh</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       setAvatarFile(file);
//                       setAvatarPreview(URL.createObjectURL(file));
//                     }
//                   }}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
//             {user.name.charAt(0)}
//           </div>
//         )}
//         <div>
//           <div className="font-semibold text-base">{user.name}</div>
//           <span
//             className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
//               user.role === "admin"
//                 ? "bg-red-100 text-red-600"
//                 : "bg-blue-100 text-blue-600"
//             }`}
//           >
//             {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
//           </span>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {isEditing ? (
//           <>
//             <InputField
//               label="Họ tên"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Số điện thoại"
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Ngày sinh"
//               name="day_of_birth"
//               type="date"
//               value={form.day_of_birth}
//               onChange={handleChange}
//             />
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">
//                 Ảnh đại diện
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     setAvatarFile(file);
//                     setAvatarPreview(URL.createObjectURL(file));
//                   }
//                 }}
//               />
//               {avatarPreview && (
//                 <Image
//                   src={avatarPreview}
//                   alt="Preview"
//                   width={80}
//                   height={80}
//                   className="w-20 h-20 rounded-full mt-2 object-cover border"
//                 />
//               )}
//             </div>

//             {/* Đổi mật khẩu */}
//             <div className="md:col-span-2 border-t pt-4 mt-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">
//                 Đổi mật khẩu
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <InputField
//                   label="Mật khẩu cũ"
//                   name="old_password"
//                   type="password"
//                   value={passwordForm.old_password}
//                   onChange={(e) =>
//                     setPasswordForm({
//                       ...passwordForm,
//                       old_password: e.target.value,
//                     })
//                   }
//                 />
//                 <InputField
//                   label="Mật khẩu mới"
//                   name="new_password"
//                   type="password"
//                   value={passwordForm.new_password}
//                   onChange={(e) =>
//                     setPasswordForm({
//                       ...passwordForm,
//                       new_password: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <button
//                 onClick={handleChangePassword}
//                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
//               >
//                 Đổi mật khẩu
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <Field label="Họ tên" value={user.name} />
//             <Field label="Email" value={user.email} />
//             <Field
//               label="Số điện thoại"
//               value={user.phone || "Chưa cập nhật"}
//             />
//             <Field
//               label="Ngày sinh"
//               value={
//                 user.day_of_birth
//                   ? new Date(user.day_of_birth).toLocaleDateString("vi-VN")
//                   : "Chưa cập nhật"
//               }
//             />
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <div className="text-sm text-gray-500 mb-1">{label}</div>
//       <div className="text-base text-gray-800">{value}</div>
//     </div>
//   );
// }

// function InputField({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
// }) {
//   return (
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">{label}</label>
//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//       />
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pencil, Save, X } from "lucide-react";
import Image from "next/image";

type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  day_of_birth?: string | null;
  avatar_url?: string | null;
  is_active?: string;
  created_at?: string;
  updated_at?: string;
  google_id?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function UserInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    day_of_birth: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Load user data from API or localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(`${API_BASE}/api/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const updatedUser = res.data.data;
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setForm({
            name: updatedUser.name || "",
            email: updatedUser.email || "",
            phone: updatedUser.phone || "",
            day_of_birth: updatedUser.day_of_birth
              ? updatedUser.day_of_birth.slice(0, 10)
              : "",
          });
        } else {
          const stored = localStorage.getItem("user");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setForm({
              name: parsed.name || "",
              email: parsed.email || "",
              phone: parsed.phone || "",
              day_of_birth: parsed.day_of_birth
                ? parsed.day_of_birth.slice(0, 10)
                : "",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Không thể tải thông tin người dùng.");
      }
    };

    fetchUserData();
  }, []);

  // Clean up avatar preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("day_of_birth", form.day_of_birth);
      formData.append("_method", "PATCH");
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.post(`${API_BASE}/api/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        transformResponse: [
          (data) => {
            const jsonStart = data.indexOf("{");
            return JSON.parse(data.slice(jsonStart));
          },
        ],
      });

      const updatedUser = {
        ...res.data.data,
        avatar_url: res.data.data.avatar_url || user?.avatar_url,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Cập nhật thông tin thành công!");
      setAvatarFile(null);
      setAvatarPreview(null);
      setIsEditing(false);
    } catch (err) {
      toast.error("❌ Có lỗi xảy ra khi cập nhật.");
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }
      await axios.post(`${API_BASE}/api/change-password`, passwordForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Đổi mật khẩu thành công!");
      setPasswordForm({ old_password: "", new_password: "" });
    } catch (error) {
      toast.error("❌ Đổi mật khẩu thất bại!");
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg border border-gray-200 py-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Thông tin cá nhân
          </h2>
          <p className="text-sm text-gray-500">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm sm:text-base text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <Pencil size={16} /> Chỉnh sửa
          </button>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base px-3 py-1.5 rounded flex items-center gap-1"
            >
              <Save size={16} /> Lưu
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setAvatarFile(null);
                setAvatarPreview(null);
              }}
              className="text-gray-600 hover:text-gray-800 text-sm sm:text-base flex items-center gap-1"
            >
              <X size={16} /> Hủy
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
        {avatarPreview ? (
          <Image
            width={96}
            height={96}
            src={avatarPreview}
            alt="Avatar Preview"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
          />
        ) : user.avatar_url ? (
          <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src={user.avatar_url}
              alt="Avatar"
              fill
              className="rounded-full object-cover border"
              sizes="96px"
            />
            {isEditing && (
              <>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-sm">Thay ảnh</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatarFile(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
            {user.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-base">{user.name}</div>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
              user.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isEditing ? (
          <>
            <InputField
              label="Họ tên"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <InputField
              label="Ngày sinh"
              name="day_of_birth"
              type="date"
              value={form.day_of_birth}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Ảnh đại diện
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatarFile(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {avatarPreview && (
                <Image
                  src={avatarPreview}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mt-2 object-cover border"
                />
              )}
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Đổi mật khẩu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Mật khẩu cũ"
                  name="old_password"
                  type="password"
                  value={passwordForm.old_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      old_password: e.target.value,
                    })
                  }
                />
                <InputField
                  label="Mật khẩu mới"
                  name="new_password"
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      new_password: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
              >
                Đổi mật khẩu
              </button>
            </div>
          </>
        ) : (
          <>
            <Field label="Họ tên" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field
              label="Số điện thoại"
              value={user.phone || "Chưa cập nhật"}
            />
            <Field
              label="Ngày sinh"
              value={
                user.day_of_birth
                  ? new Date(user.day_of_birth).toLocaleDateString("vi-VN")
                  : "Chưa cập nhật"
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-base text-gray-800">{value}</div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      />
    </div>
  );
}

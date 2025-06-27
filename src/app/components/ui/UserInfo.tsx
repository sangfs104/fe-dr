// // "use client";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { Pencil, Save, X } from "lucide-react";

// // type UserInfo = {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   role: string;
// // };

// // export default function UserInfo() {
// //   const [user, setUser] = useState<UserInfo | null>(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [form, setForm] = useState({ name: "", email: "", phone: "" });

// //   useEffect(() => {
// //     const stored = localStorage.getItem("user");
// //     if (stored) {
// //       const parsed = JSON.parse(stored);
// //       setUser(parsed);
// //       setForm({
// //         name: parsed.name || "",
// //         email: parsed.email || "",
// //         phone: parsed.phone || "",
// //       });
// //     }
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.patch(
// //         "http://127.0.0.1:8000/api/user/profile",
// //         form,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       toast.success("✅ Cập nhật thông tin thành công!");
// //       setUser(res.data.data);
// //       localStorage.setItem("user", JSON.stringify(res.data.data));
// //       setIsEditing(false);
// //     } catch (err: any) {
// //       toast.error("❌ Có lỗi xảy ra khi cập nhật.");
// //       console.error(err);
// //     }
// //   };

// //   if (!user) return null;

// //   return (
// //     <section className="bg-white rounded-lg border border-gray-200 px-6 py-5 shadow-sm">
// //       <div className="flex items-center justify-between border-b pb-4 mb-4">
// //         <div>
// //           <h2 className="text-lg font-semibold text-gray-800">
// //             Thông tin cá nhân
// //           </h2>
// //           <p className="text-sm text-gray-500">
// //             Quản lý thông tin hồ sơ để bảo mật tài khoản
// //           </p>
// //         </div>
// //         {!isEditing ? (
// //           <button
// //             onClick={() => setIsEditing(true)}
// //             className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
// //           >
// //             <Pencil size={16} /> Chỉnh sửa
// //           </button>
// //         ) : (
// //           <div className="flex gap-2">
// //             <button
// //               onClick={handleSave}
// //               className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1"
// //             >
// //               <Save size={16} /> Lưu
// //             </button>
// //             <button
// //               onClick={() => setIsEditing(false)}
// //               className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
// //             >
// //               <X size={16} /> Hủy
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       <div className="flex items-center gap-4 mb-6">
// //         <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
// //           {user.name.charAt(0)}
// //         </div>
// //         <div>
// //           <div className="font-semibold text-base">{user.name}</div>
// //           <span
// //             className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
// //               user.role === "admin"
// //                 ? "bg-red-100 text-red-600"
// //                 : "bg-blue-100 text-blue-600"
// //             }`}
// //           >
// //             {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
// //           </span>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //         {isEditing ? (
// //           <>
// //             <InputField
// //               label="Họ tên"
// //               name="name"
// //               value={form.name}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               label="Email"
// //               name="email"
// //               value={form.email}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               label="Số điện thoại"
// //               name="phone"
// //               value={form.phone}
// //               onChange={handleChange}
// //             />
// //           </>
// //         ) : (
// //           <>
// //             <Field label="Họ tên" value={user.name} />
// //             <Field label="Email" value={user.email} />
// //             <Field label="Số điện thoại" value={user.phone} />
// //           </>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }

// // function Field({ label, value }: { label: string; value: string }) {
// //   return (
// //     <div>
// //       <div className="text-sm text-gray-500 mb-1">{label}</div>
// //       <div className="text-base text-gray-800">{value}</div>
// //     </div>
// //   );
// // }

// // function InputField({
// //   label,
// //   name,
// //   value,
// //   onChange,
// // }: {
// //   label: string;
// //   name: string;
// //   value: string;
// //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // }) {
// //   return (
// //     <div>
// //       <label className="block text-sm text-gray-600 mb-1">{label}</label>
// //       <input
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
// //       />
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast"; // ✅ đổi từ 'sonner' sang 'react-hot-toast'
// import { Pencil, Save, X } from "lucide-react";

// type UserInfo = {
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
// };

// export default function UserInfo() {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       setUser(parsed);
//       setForm({
//         name: parsed.name || "",
//         email: parsed.email || "",
//         phone: parsed.phone || "",
//       });
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.patch(
//         "http://127.0.0.1:8000/api/user/profile",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success(" Cập nhật thông tin thành công!");
//       setUser(res.data.data);
//       localStorage.setItem("user", JSON.stringify(res.data.data));
//       setIsEditing(false);
//     } catch (err) {
//       toast.error(" Có lỗi xảy ra khi cập nhật.");
//       console.error(err);
//     }
//   };

//   if (!user) return null;

//   return (
//     <section className="bg-white rounded-lg border border-gray-200 px-6 py-5 shadow-sm">
//       <div className="flex items-center justify-between border-b pb-4 mb-4">
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
//             className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
//           >
//             <Pencil size={16} /> Chỉnh sửa
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <button
//               onClick={handleSave}
//               className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1"
//             >
//               <Save size={16} /> Lưu
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
//             >
//               <X size={16} /> Hủy
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
//           {user.name.charAt(0)}
//         </div>
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
//           </>
//         ) : (
//           <>
//             <Field label="Họ tên" value={user.name} />
//             <Field label="Email" value={user.email} />
//             <Field label="Số điện thoại" value={user.phone} />
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
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">{label}</label>
//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//       />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pencil, Save, X } from "lucide-react";

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  role: string;
  day_of_birth?: string; // Thêm trường ngày sinh
};

export default function UserInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    day_of_birth: "",
  });

  useEffect(() => {
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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://127.0.0.1:8000/api/user/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ Cập nhật thông tin thành công!");
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setIsEditing(false);
    } catch (err) {
      toast.error("❌ Có lỗi xảy ra khi cập nhật.");
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <section className="bg-white rounded-lg border border-gray-200 px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
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
            className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <Pencil size={16} /> Chỉnh sửa
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1"
            >
              <Save size={16} /> Lưu
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
            >
              <X size={16} /> Hủy
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl uppercase">
          {user.name.charAt(0)}
        </div>
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
              value={form.day_of_birth}
              onChange={handleChange}
              type="date"
            />
          </>
        ) : (
          <>
            <Field label="Họ tên" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field label="Số điện thoại" value={user.phone} />
            <Field
              label="Ngày sinh"
              value={
                user.day_of_birth
                  ? new Date(user.day_of_birth).toLocaleDateString("vi-VN")
                  : ""
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
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      />
    </div>
  );
}

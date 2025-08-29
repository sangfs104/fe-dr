"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faReceipt,
  faCreditCard,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import CheckoutProgress from "../components/ui/CheckoutProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Suspense } from "react";
import { useCallback } from "react";

interface Address {
  id: number;
  adress: string;
  city?: string;
  country?: string;
  ward?: string;
  is_default: number;
  [key: string]: unknown;
}

const countryCityMap: {
  [key: string]: { value: string; label: string }[];
} = {
  VN: [
    { value: "HCM", label: "TP. Hồ Chí Minh" },
    { value: "HN", label: "Hà Nội" },
    { value: "DN", label: "Đà Nẵng" },
    { value: "VL", label: "Vĩnh Long" },
    { value: "CT", label: "Cần Thơ" },
    { value: "DNK", label: "Đắk Lắk" },
    { value: "QN", label: "Quảng Ninh" },
  ],
  TL: [
    { value: "BKK", label: "Bangkok" },
    { value: "CNX", label: "Chiang Mai" },
  ],
  NB: [
    { value: "TOK", label: "Tokyo" },
    { value: "OSA", label: "Osaka" },
  ],
  HQ: [
    { value: "SEO", label: "Seoul" },
    { value: "BSN", label: "Busan" },
  ],
};

const countryCityWardMap: {
  [key: string]: {
    [key: string]: { value: string; label: string }[];
  };
} = {
  VN: {
    HCM: [
      { value: "Q1W1", label: "Phường Bến Thành, quận 1" },
      { value: "Q1W2", label: "Phường Cầu Ông Lãnh, quận 1" },
      { value: "Q3W1", label: "Phường Bàn Cờ, quận 3" },
      { value: "Q7W1", label: "Phường Tân Mỹ, quận 7" },
      { value: "TBW1", label: "Phường Tân Sơn Nhất, quận Tân Bình" },
    ],
    HN: [
      { value: "BDW1", label: "Phường Cửa Nam, Ba Đình" },
      { value: "BDW2", label: "Phường Quán Thánh, Ba Đình" },
      { value: "HKW1", label: "Phường Hàng Bông, Hoàn Kiếm" },
      { value: "CADW1", label: "Phường Cầu Giấy, Cầu Giếm" },
    ],
    DN: [
      { value: "HCW1", label: "Phường Hải Châu 1, Hải Châu" },
      { value: "HCW2", label: "Phường Thạch Thang, Hải Châu" },
      { value: "SLW1", label: "Phường Sơn Trà, Sơn Trà" },
    ],
    VL: [
      { value: "VLW1", label: "Phường 1, TP. Vĩnh Long" },
      { value: "VLW2", label: "Phường 2, TP. Vĩnh Long" },
      { value: "VLW3", label: "Xã Tân Quới, Vĩnh Long" },
      { value: "VLW4", label: "Xã Hòa Ninh, Vĩnh Long" },
    ],
    CT: [
      { value: "NKW1", label: "Phường An Bình, Ninh Kiều" },
      { value: "NKW2", label: "Phường An Phú, Ninh Kiều" },
      { value: "BLW1", label: "Phường Bình Thủy, Bình Thủy" },
    ],
    NT: [
      { value: "VPW1", label: "Phường Vĩnh Phước, Nha Trang" },
      { value: "VTW1", label: "Phường Vĩnh Thọ, Nha Trang" },
      { value: "XLW1", label: "Phường Xương Huân, Nha Trang" },
    ],
    DNK: [
      { value: "BTHW1", label: "Xã Ea Tu, Buôn Hồ" },
      { value: "KRBW1", label: "Xã Krông Búk, Krông Búk" },
    ],
    QN: [
      { value: "HLCW1", label: "Phường Hồng Lĩnh, Hạ Long" },
      { value: "HCW2", label: "Phường Hà Khánh, Hạ Long" },
      { value: "HCMW1", label: "Phường Hùng Thắng, Hạ Long" },
    ],
  },
  TL: {
    BKK: [
      { value: "BKKW1", label: "Phra Nakhon District" },
      { value: "BKKW2", label: "Bang Rak District" },
    ],
    CNX: [
      { value: "CNXW1", label: "Chang Phueak Subdistrict" },
      { value: "CNXW2", label: "Nong Hoi Subdistrict" },
    ],
  },
  NB: {
    TOK: [
      { value: "TKW1", label: "Chiyoda Ward" },
      { value: "TKW2", label: "Minato Ward" },
    ],
    OSA: [
      { value: "OSW1", label: "Kita Ward" },
      { value: "OSW2", label: "Chuo Ward" },
    ],
  },
  HQ: {
    SEO: [
      { value: "SEW1", label: "Jung-gu District" },
      { value: "SEW2", label: "Yongsan-gu District" },
    ],
    BSN: [
      { value: "BSW1", label: "Jung-gu District" },
      { value: "BSW2", label: "Haeundae-gu District" },
    ],
  },
};

function PaymentPage() {
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState<number | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const selectedItems = useSelector(
    (state: RootState) => state.wishlist.selectedForPayment
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsToPay = selectedItems.length > 0 ? selectedItems : cartItems;

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [wardOptions, setWardOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    city: "",
    ward: "",
    phone: "",
    email: "",
    note: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (formData.country && countryCityMap[formData.country]) {
      setCityOptions(countryCityMap[formData.country]);
    } else {
      setCityOptions([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (
      formData.city &&
      countryCityWardMap[formData.country]?.[formData.city]
    ) {
      setWardOptions(countryCityWardMap[formData.country][formData.city]);
    } else {
      setWardOptions([]);
    }
  }, [formData.country, formData.city]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "address" || name === "city" || name === "ward") {
        const fullAddress = `${updated.address || ""}, ${updated.city ||
          ""}, ${updated.ward || ""}`;
        const fee = calculateShippingFee(fullAddress);
        setShippingFee(fee);
      }
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập tên";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập họ";
    if (!formData.country) newErrors.country = "Vui lòng chọn quốc gia";
    if (!formData.city) newErrors.city = "Vui lòng chọn thành phố";
    if (!formData.ward) newErrors.ward = "Vui lòng chọn xã/phường";
    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  interface Voucher {
    code: string;
    quantity: number;
    [key: string]: unknown;
  }

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập trước khi thanh toán.", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
      return;
    }

    if (itemsToPay.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống.", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }

    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc để thanh toán.", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }

    if (!selectedAddressId) {
      toast.error("Vui lòng chọn địa chỉ giao hàng.", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }

    try {
      const cartData = itemsToPay.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity || 1,
      }));

      const requestBody = {
        cart: cartData,
        coupon_id: couponId,
        shipping_id: 1,
        address_id: selectedAddressId,
        payment_id: paymentMethod === "cod" ? 2 : 1,
        order_desc:
          paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán đơn hàng VNPAY",
        bank_code: "",
        shipping_fee: shippingFee,
        customer_info: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          ward: formData.ward,
          phone: formData.phone,
          email: formData.email,
          note: formData.note,
        },
      };

      const apiUrl =
        paymentMethod === "cod"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/payment/cod`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/payment/vnpay`;
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const order = response.data.order;
      const orderWithPaymentMethod = {
        ...order,
        total_price: finalTotal,
        payment_method: paymentMethod,
        items: itemsToPay.map((item) => ({
          quantity: item.quantity || 1,
          variant: {
            name: item.name,
            price: item.price,
            image_url: item.img,
          },
        })),
      };

      if (paymentMethod === "bank" && response.data.payment_url) {
        localStorage.setItem(
          "latestOrder",
          JSON.stringify(orderWithPaymentMethod)
        );
        window.location.href = response.data.payment_url;
      } else if (paymentMethod === "cod") {
        const voucherCode = localStorage.getItem("voucher_in_use");
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (voucherCode && user?.id) {
          const stored = localStorage.getItem(`vouchers_${user.id}`);
          if (stored) {
            const vouchers: Voucher[] = JSON.parse(stored);
            const updated = vouchers
              .map((v: Voucher) =>
                v.code === voucherCode ? { ...v, quantity: v.quantity - 1 } : v
              )
              .filter((v: Voucher) => v.quantity > 0);

            localStorage.setItem(
              `vouchers_${user.id}`,
              JSON.stringify(updated)
            );
          }
          localStorage.removeItem("voucher_in_use");
        }

        toast.success("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.", {
          style: {
            borderRadius: "16px",
            background: "#F0FDF4",
            color: "#16A34A",
            border: "1px solid #BBF7D0",
          },
        });
        localStorage.setItem(
          "latestOrder",
          JSON.stringify(orderWithPaymentMethod)
        );
        setTimeout(() => {
          window.location.href = "/order-success";
        }, 1500);
      }
    } catch (err) {
      console.error("Lỗi thanh toán", err);
      toast.error("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
    }
  };

  // Hàm fetch addresses
  const fetchAddresses = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      const addresses = (result.data || []) as Address[];
      setAddresses(addresses);

      const defaultAddress = addresses.find((addr) => addr.is_default === 1);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setFormData((prev) => ({
          ...prev,
          address: defaultAddress.adress,
          city: defaultAddress.city || "HCM",
          country: defaultAddress.country || "VN",
          ward: defaultAddress.ward || "Q1W1",
        }));
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      toast.error("Lỗi khi lấy địa chỉ!");
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddressChange = (addressId: number) => {
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setSelectedAddressId(addressId);
      setFormData((prev) => ({
        ...prev,
        address: selectedAddress.adress,
        city: selectedAddress.city || "HCM",
        country: selectedAddress.country || "VN",
        ward: selectedAddress.ward || "Q1W1",
      }));
      // Cập nhật tùy chọn xã/phường dựa trên quốc gia và thành phố được chọn
      if (
        selectedAddress.country &&
        selectedAddress.city &&
        countryCityWardMap[selectedAddress.country]?.[selectedAddress.city]
      ) {
        setWardOptions(
          countryCityWardMap[selectedAddress.country][selectedAddress.city]
        );
      } else {
        setWardOptions([]);
      }
      const fullAddress = `${selectedAddress.adress}, ${selectedAddress.city ||
        "HCM"}, ${selectedAddress.ward || "Q1W1"}`;
      setShippingFee(calculateShippingFee(fullAddress));
      setIsAddressDropdownOpen(false);
    }
  };

  // Gọi thông tin người dùng
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        firstName:
          userData.name
            ?.split(" ")
            .slice(1)
            .join(" ") || "",
        lastName: userData.name?.split(" ")[0] || "",
        email: userData.email || "",
        phone: userData.phone || "",
      }));
    }
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        const userData = result.data;
        if (userData) {
          setFormData((prev) => ({
            ...prev,
            firstName: userData.name?.split(" ").join(" ") || "",
            lastName: userData.name?.split(" ")[0] || "",
            email: userData.email || "",
            phone: userData.phone || "",
          }));
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (itemsToPay.length === 0 && selectedItems.length > 0) {
      toast.error(
        "Các sản phẩm đã chọn không có trong giỏ hàng. Vui lòng kiểm tra lại."
      );
    }
  }, [itemsToPay, selectedItems]);

  const subtotal = itemsToPay.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const finalTotal = subtotal + shippingFee - discount;

  const calculateShippingFee = (address: string) => {
    const addr = address.toLowerCase();
    if (
      addr.includes("quận 1") ||
      addr.includes("quận 3") ||
      addr.includes("quận 7") ||
      addr.includes("quận 9") ||
      addr.includes("quận 12") ||
      addr.includes("tp.hcm") ||
      addr.includes("thành phố hồ chí minh")
    ) {
      return 10000;
    } else {
      return 50000;
    }
  };

  return (
    <>
      <ToastContainer />
      <CheckoutProgress currentStep="checkout" />

      <div className="flex flex-col md:flex-row gap-10 max-w-[1400px] mx-auto my-10 px-[40px]">
        {/* Thông tin thanh toán */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-lg p-10 relative overflow-hidden">
          <div className="flex items-center justify-center gap-4 mb-6 text-center">
            <span className="bg-gradient-to-br from-[#374151] to-[#111827] text-white rounded-xl p-2 shadow-lg">
              <FontAwesomeIcon icon={faReceipt} className="text-xl" />
            </span>
            <h5 className="text-xl md:text-2xl font-normal text-[#111827] drop-shadow-sm tracking-tight no-underline">
              THÔNG TIN THANH TOÁN
            </h5>
          </div>

          <hr className="mb-6 border-gray" />
          <form className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Tên"
                    className="w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <div className="w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Họ"
                    className="w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="relative w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="appearance-none w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                  >
                    <option value="">Quốc gia/Khu vực *</option>
                    <option value="VN">Việt Nam</option>
                    <option value="TL">Thái Lan</option>
                    <option value="NB">Nhật Bản</option>
                    <option value="HQ">Hàn Quốc</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.country && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Dropdown Tỉnh/Thành phố */}
              <div>
                <div className="relative w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="appearance-none w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                    disabled={cityOptions.length === 0}
                  >
                    <option value="">Chọn Tỉnh / Thành phố *</option>
                    {cityOptions.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.city && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              {/* Dropdown Xã/Phường */}
              <div>
                <div className="relative w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    required
                    className="appearance-none w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                    disabled={wardOptions.length === 0}
                  >
                    <option value="">Chọn Xã / Phường *</option>
                    {wardOptions.map((ward) => (
                      <option key={ward.value} value={ward.value}>
                        {ward.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.ward && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.ward}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition flex items-center">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Địa chỉ *"
                    className="flex-1 px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsAddressDropdownOpen(!isAddressDropdownOpen)
                    }
                    className="px-4 py-2 text-base text-orange-500 hover:text-orange-600 focus:outline-none"
                  >
                    Chọn địa chỉ
                  </button>
                </div>
                {isAddressDropdownOpen && addresses.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => handleAddressChange(addr.id)}
                        className="px-4 py-3 text-base text-gray-900 hover:bg-gray-100 cursor-pointer"
                      >
                        {addr.adress}{" "}
                        {addr.is_default === 1 ? "(Mặc định)" : ""}
                      </div>
                    ))}
                  </div>
                )}
                {isAddressDropdownOpen && addresses.length === 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg px-4 py-3">
                    <p className="text-base text-gray-500">
                      Không có địa chỉ nào.{" "}
                      <a
                        href="/account"
                        className="text-orange-500 hover:underline"
                      >
                        Thêm địa chỉ
                      </a>
                    </p>
                  </div>
                )}
                {errors.address && (
                  <p className="text-sm text-rose-500 pl-1 mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại *"
                      className="w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-rose-500 pl-1 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="w-full rounded-md bg-white border-2 border-gray-300 focus-within:border-gray-800 transition">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Địa chỉ email *"
                      className="w-full px-4 py-3 bg-transparent text-base font-normal text-gray-900 focus:outline-none rounded-md"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-rose-500 pl-1 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 focus:border-gray-800 rounded-xl text-base font-normal text-gray-900 focus:outline-none transition h-24 resize-none"
                  placeholder="Ghi chú về đơn hàng..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          <div className="flex items-center justify-center gap-4 mb-4 text-center">
            <span className="bg-gradient-to-br from-[#374151] to-[#111827] text-white rounded-xl p-2 shadow-lg">
              <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
            </span>
            <h5 className="text-xl md:text-2xl font-normal text-[#111827] drop-shadow-sm tracking-tight no-underline">
              THÔNG TIN ĐƠN HÀNG
            </h5>
          </div>

          <hr className="mb-6 border-t border-gray-300" />
          <div className="mt-7">
            <div className="flex justify-between font-medium text-gray border-b border-gray pb-2 mb-3 text-gray">
              <span>SẢN PHẨM</span>
            </div>
            {itemsToPay.map((item) => (
              <div
                className="flex items-center justify-between py-3 border-dashed gap-4 rounded-xl transition"
                key={`${item.productId}-${item.variantId}`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      Array.isArray(item.img)
                        ? item.img[0]
                        : item.img || "/placeholder.png"
                    }
                    alt={item.name}
                    width={56}
                    height={56}
                    className="rounded-xl object-cover border"
                  />
                  <div>
                    <p className="font-normal text-gray">{item.name}</p>
                    <p className="text-sm text-gray font-normal no-underline">
                      {item.size} / Số lượng: {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-black text-lg min-w-[92px] text-right">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-gray">
              <div className="font-medium flex justify-between mb-2 text-[1.07em] text-gray">
                <span>Tạm tính:</span>
                <span className="font-normal">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
              {discount > 0 && (
                <div className="font-medium flex justify-between mb-2 text-[1.07em] text-gray">
                  <span>Giảm giá:</span>
                  <span className="font-normal text-rose-500">
                    -{discount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}
              <div className="font-medium flex justify-between mb-2 text-[1.07em] text-gray">
                <span>Phí vận chuyển:</span>
                <span className="font-normal">
                  {shippingFee === 0
                    ? "-"
                    : shippingFee.toLocaleString("vi-VN") + " đ"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray text-xl font-bold">
                <span className="text-red-600">TỔNG</span>
                <span className="text-red-600">
                  {finalTotal.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>

            {/* <div className="mt-6 text-[1.05em] text-[#374151]">
              <div className="flex items-center flex-wrap gap-1">
                <span>Có mã giảm giá?</span>
                <button
                  type="button"
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="text-[#111827] font-bold hover:text-[#374151] transition"
                >
                  Nhấn vào đây để nhập mã giảm giá
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
              </div>
              {showCoupon && (
                <div className="mt-3 p-4 rounded-xl border border-dashed border-gray-400 bg-white shadow animate-fadein flex flex-col">
                  <span className="mb-2 text-gray">
                    Nếu bạn có mã giảm giá, vui lòng áp dụng nó bên dưới.
                  </span>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-400 bg-white px-3 py-2 font-normal focus:outline-none focus:ring-0 focus:border-gray-400"
                      placeholder="Mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="px-5 py-2 rounded-lg bg-[#FF5722] text-white font-bold shadow hover:bg-[#ea580c] transition"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!couponCode.trim()) {
                          toast.error("Vui lòng nhập mã giảm giá.");
                          return;
                        }
                        try {
                          const token = localStorage.getItem("token");
                          const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/apply-coupon`,
                            { code: couponCode.trim() },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          const data = response.data;
                          if (data.status === 200) {
                            setDiscount(Number(data.coupon.discount_value));
                            setCouponId(data.coupon.id);
                            toast.success(
                              data.message || "Áp dụng mã giảm giá thành công!"
                            );
                          } else {
                            setDiscount(0);
                            setCouponId(null);
                            toast.error(
                              data.message || "Mã giảm giá không hợp lệ."
                            );
                          }
                        } catch {
                          setDiscount(0);
                          setCouponId(null);
                          toast.error(
                            "Đã xảy ra lỗi khi kiểm tra mã giảm giá."
                          );
                        }
                      }}
                    >
                      ÁP DỤNG
                    </button>
                  </div>
                </div>
              )}
            </div> */}
            <div className="mt-6 text-[1.05em] text-[#374151]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="whitespace-nowrap">Có mã giảm giá?</span>
                <button
                  type="button"
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="flex items-center text-[#111827] font-bold hover:text-[#374151] transition"
                >
                  <span className="whitespace-nowrap">
                    Nhấn vào đây để nhập mã giảm giá
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-1 text-sm"
                  />
                </button>
              </div>

              {showCoupon && (
                <div className="mt-3 p-4 rounded-xl border border-dashed border-gray-400 bg-white shadow animate-fadein flex flex-col">
                  <span className="mb-2 text-gray">
                    Nếu bạn có mã giảm giá, vui lòng áp dụng nó bên dưới.
                  </span>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 min-w-0 rounded-lg border border-gray-400 bg-white px-3 py-2 font-normal focus:outline-none focus:ring-0 focus:border-gray-400"
                      placeholder="Mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />

                    <button
                      disabled={couponApplied}
                      className={`shrink-0 px-5 py-2 rounded-lg text-white font-bold shadow transition
                      ${
                        couponApplied
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF5722] hover:bg-[#ea580c]"
                      }`}
                      onClick={async (e) => {
                        e.preventDefault();

                        if (couponApplied) {
                          toast.error("Bạn đã áp dụng mã giảm giá rồi!");
                          return;
                        }

                        if (!couponCode.trim()) {
                          toast.error("Vui lòng nhập mã giảm giá.");
                          return;
                        }

                        try {
                          const token = localStorage.getItem("token");
                          const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/apply-coupon`,
                            { code: couponCode.trim() },
                            { headers: { Authorization: `Bearer ${token}` } }
                          );

                          const data = response.data;
                          if (data.status === 200) {
                            setDiscount(Number(data.coupon.discount_value));
                            setCouponId(data.coupon.id);
                            setCouponApplied(true); // đánh dấu đã áp dụng
                            toast.success(
                              data.message || "Áp dụng mã giảm giá thành công!"
                            );
                          } else {
                            setDiscount(0);
                            setCouponId(null);
                            toast.error(
                              data.message || "Mã giảm giá không hợp lệ."
                            );
                          }
                        } catch (err) {
                          setDiscount(0);
                          setCouponId(null);
                          const error = err as AxiosError<{ message: string }>;
                          toast.error(
                            error.response?.data?.message ||
                              "Đã xảy ra lỗi khi kiểm tra mã giảm giá."
                          );
                        }
                      }}
                    >
                      {couponApplied ? "ĐÃ ÁP DỤNG" : "ÁP DỤNG"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <label className="flex items-center gap-3 font-semibold cursor-pointer mb-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="accent-[#374151] w-5 h-5"
                />
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-[#374151]"
                  />
                  Thanh toán qua VNPAY
                </span>
              </label>
              {paymentMethod === "bank" && (
                <div className="ml-7 mt-1 text-[#374151] bg-[#fffaf0] border-l-4 border-[#eab308] rounded-r-lg px-4 py-2 shadow animate-fadein">
                  Thực hiện thanh toán qua cổng VNPAY.
                </div>
              )}
              <label className="flex items-center gap-3 font-semibold cursor-pointer mb-2 mt-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-[#111827] w-5 h-5"
                />
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-[#111827]"
                  />
                  Trả tiền mặt khi nhận hàng
                </span>
              </label>
              {paymentMethod === "cod" && (
                <div className="ml-7 mt-1 text-[#374151] bg-[#fffaf0] border-l-4 border-[#eab308] rounded-r-lg px-4 py-2 shadow animate-fadein">
                  Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.
                </div>
              )}
            </div>
            <button
              className="mt-10 w-full py-4 rounded-xl bg-[#FF5722] from-[#374151] to-[#111827] text-white font-bold text-xl shadow-xl transition-all hover:scale-105 hover:from-[#111827] hover:to-[#374151] focus:ring-2 focus:ring-[#374151]/50 animate-pulse"
              onClick={handlePayment}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.6s;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-pulse {
          animation: pulseBtn 1.7s infinite alternate
            cubic-bezier(0.2, 0.7, 0.4, 1);
        }
        @keyframes pulseBtn {
          0% {
            box-shadow: 0 4px 22px 0 #ffb28440;
          }
          100% {
            box-shadow: 0 8px 36px 0 #ffb28488;
          }
        }
      `}</style>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <PaymentPage />
    </Suspense>
  );
}

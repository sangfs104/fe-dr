// // components/PromotionList.tsx
// import PromotionCard from "./PromotionCard";

// const promotions = [
//   {
//     title: "MIỄN PHÍ VẬN CHUYỂN",
//     description: "Freeship cho đơn hàng từ 500k",
//     code: "EGAFREESHIP",
//     expiry: "30/12/2024",
//     expired: true,
//     icon: "truck",
//   },
//   {
//     title: "GIẢM 50K",
//     description: "Áp dụng cho đơn hàng từ 600k",
//     code: "GIAM50K",
//     expiry: "31/12/2024",
//     expired: false,
//     icon: "ticket",
//   },
//   {
//     title: "GIẢM 30%",
//     description: "Cho các sản phẩm trong Set đồ tập",
//     code: "GIAM30",
//     expiry: "01/09/2023",
//     expired: true,
//     icon: "percent",
//   },
//   {
//     title: "GIẢM 40%",
//     description: "Cho sản phẩm thứ 4 trong đơn hàng",
//     code: "GIAM40",
//     expiry: "20/05/2023",
//     expired: true,
//     icon: "percent",
//   },
// ];

// const PromotionList = () => {
//   return (
//     <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {promotions.map((promo, index) => (
//         <PromotionCard key={index} promo={promo} />
//       ))}
//     </div>
//   );
// };

// export default PromotionList;
import PromotionCard from "./PromotionCard";

const promotions = [
  {
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Freeship cho đơn hàng từ 500k",
    code: "EGAFREESHIP",
    expiry: "30/12/2024",
    expired: true,
    icon: "truck",
  },
  {
    title: "GIẢM 50K",
    description: "Áp dụng cho đơn hàng từ 600k",
    code: "GIAM50K",
    expiry: "31/12/2024",
    expired: false,
    icon: "ticket",
  },
  {
    title: "GIẢM 30%",
    description: "Cho các sản phẩm trong Set đồ tập",
    code: "GIAM30",
    expiry: "01/09/2023",
    expired: true,
    icon: "percent",
  },
  {
    title: "GIẢM 40%",
    description: "Cho sản phẩm thứ 4 trong đơn hàng",
    code: "GIAM40",
    expiry: "20/05/2023",
    expired: true,
    icon: "percent",
  },
];

const PromotionList = () => {
  return (
    <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {promotions.map((promo, index) => (
        <PromotionCard key={index} promo={promo} />
      ))}
    </div>
  );
};

export default PromotionList;

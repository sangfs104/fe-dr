"use client";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: "1",
    message: "Xin chào! Bạn cần hỗ trợ gì?",
    trigger: "user-input",
  },
  {
    id: "user-input",
    user: true,
    trigger: "answer",
  },
  {
    id: "answer",
    message: ({ previousValue }) => {
      const text = previousValue.toLowerCase();
      // Size
      if (text.includes("size s")) return "Size S phù hợp cho cân nặng 40–49kg";
      if (text.includes("size m")) return "Size M phù hợp cho cân nặng 50–60kg";
      if (text.includes("size l")) return "Size L phù hợp cho cân nặng 61–70kg";
      if (text.includes("size xl"))
        return "Size XL phù hợp cho cân nặng 71–80kg";
      if (text.includes("size xxl"))
        return "Size XXL phù hợp cho cân nặng trên 80kg";

      // Giá
      if (
        text.includes("giá") ||
        text.includes("bao nhiêu") ||
        text.includes("cost")
      ) {
        return "Bạn vui lòng chọn sản phẩm để xem giá chính xác nhé!";
      }

      // Đổi trả
      if (
        text.includes("đổi trả") ||
        text.includes("đổi hàng") ||
        text.includes("trả hàng")
      ) {
        return "Shop hỗ trợ đổi trả trong 7 ngày với sản phẩm chưa qua sử dụng và còn tag mác.";
      }

      // Chất liệu
      if (text.includes("chất liệu") || text.includes("vải gì")) {
        return "Sản phẩm của shop chủ yếu là cotton, thấm hút mồ hôi, thoáng mát.";
      }

      // Ship/giao hàng
      if (
        text.includes("ship") ||
        text.includes("giao hàng") ||
        text.includes("vận chuyển")
      ) {
        return "Shop giao hàng toàn quốc, thời gian từ 2-5 ngày tùy khu vực.";
      }

      // Khuyến mãi
      if (
        text.includes("khuyến mãi") ||
        text.includes("giảm giá") ||
        text.includes("sale")
      ) {
        return "Shop thường xuyên có khuyến mãi, bạn theo dõi fanpage hoặc website để cập nhật nhé!";
      }

      // Hotline
      if (
        text.includes("hotline") ||
        text.includes("số điện thoại") ||
        text.includes("liên hệ")
      ) {
        return "Bạn có thể liên hệ hotline: 0123 456 789 để được hỗ trợ nhanh nhất.";
      }

      // Địa chỉ
      if (
        text.includes("địa chỉ") ||
        text.includes("ở đâu") ||
        text.includes("cửa hàng")
      ) {
        return "Shop hiện bán online, nếu cần xem hàng trực tiếp bạn vui lòng liên hệ trước qua hotline.";
      }

      // Thanh toán
      if (
        text.includes("thanh toán") ||
        text.includes("trả tiền") ||
        text.includes("payment")
      ) {
        return "Shop hỗ trợ thanh toán khi nhận hàng (COD) hoặc chuyển khoản ngân hàng.";
      }

      // Mặc thử
      if (text.includes("mặc thử") || text.includes("thử đồ")) {
        return "Bạn có thể mặc thử khi nhận hàng tại cửa hàng hoặc đổi trả nếu không vừa.";
      }

      // Default
      return "Cảm ơn bạn đã hỏi! Shop hỗ trợ trả lời về size, giá, đổi trả, chất liệu, ship, khuyến mãi, hotline, địa chỉ, thanh toán...";
    },
    trigger: "user-input",
  },
];

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#1976d2",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "#1976d2",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

export default function SimpleChatBot() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        floating={true}
        headerTitle="Trợ lý Shop"
        placeholder="Nhập câu hỏi..."
        recognitionEnable={false}
      />
    </ThemeProvider>
  );
}

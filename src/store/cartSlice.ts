
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface ProductVariant {
//   id: number;
//   size: string;
//   price: number;
//   sale_price?: string | null;
// }

// export interface CartItem {
//   productId: number;
//   variantId: number;
//   quantity: number;
//   name: string;
//   img: string;
//   price: number;  
//   size: string;
//   color?: string;
//   variantList: ProductVariant[];
// }

// interface CartState {
//   items: CartItem[];
// }


// export function getEffectivePrice(variant: ProductVariant): number {
//   if (variant.sale_price && Number(variant.sale_price) > 0) {
//     return Number(variant.sale_price);
//   }
//   return variant.price;
// }


// const initialState: CartState = {
//   items:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cartItems") || "[]")
//       : [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const existing = state.items.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.variantId === action.payload.variantId
//       );
//       if (existing) {
//         existing.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//     clearCart(state) {
//       state.items = [];
//       localStorage.setItem("cartItems", "[]");
//     },
//     updateVariant(
//       state,
//       action: PayloadAction<{
//         productId: number;
//         oldVariantId: number;
//         newData: Partial<Pick<CartItem, "variantId" | "price" | "size">>;
//       }>
//     ) {
//       const item = state.items.find(
//         (i) =>
//           i.productId === action.payload.productId &&
//           i.variantId === action.payload.oldVariantId
//       );
//       if (item) {
//         Object.assign(item, action.payload.newData);
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//     removeFromCart(
//       state,
//       action: PayloadAction<{ productId: number; variantId: number }>
//     ) {
//       state.items = state.items.filter(
//         (item) =>
//           !(
//             item.productId === action.payload.productId &&
//             item.variantId === action.payload.variantId
//           )
//       );
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//     updateQuantity(
//       state,
//       action: PayloadAction<{
//         productId: number;
//         variantId: number;
//         newQuantity: number;
//       }>
//     ) {
//       const item = state.items.find(
//         (i) =>
//           i.productId === action.payload.productId &&
//           i.variantId === action.payload.variantId
//       );
//       if (item) {
//         item.quantity = Math.max(1, action.payload.newQuantity);
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//   },
// });

// export const {
//   addToCart,
//   clearCart,
//   updateVariant,
//   removeFromCart,
//   updateQuantity,
// } = cartSlice.actions;

// export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =======================
// Interfaces
// =======================

export interface ProductVariant {
  id: number;
  size: string;
  price: number;
  sale_price?: string | null;
}

export interface CartItem {
  productId: number;
  variantId: number;
  quantity: number;
  name: string;
  img: string; // Full URL từ product.images[0]
  price: number;
  size: string;
  color?: string;
  variantList: ProductVariant[];
}

interface CartState {
  items: CartItem[];
}

// =======================
// Helper: Get sale price nếu có
// =======================

export function getEffectivePrice(variant: ProductVariant): number {
  if (variant.sale_price && Number(variant.sale_price) > 0) {
    return Number(variant.sale_price);
  }
  return variant.price;
}

// =======================
// Load initial state từ localStorage
// =======================

const isClient = typeof window !== "undefined";
const initialState: CartState = {
  items: isClient
    ? JSON.parse(localStorage.getItem("cartItems") || "[]")
    : [],
};

// =======================
// Slice
// =======================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    clearCart(state) {
      state.items = [];
      if (isClient) {
        localStorage.setItem("cartItems", "[]");
      }
    },

    updateVariant(
      state,
      action: PayloadAction<{
        productId: number;
        oldVariantId: number;
        newData: Partial<Pick<CartItem, "variantId" | "price" | "size">>;
      }>
    ) {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.oldVariantId
      );

      if (item) {
        Object.assign(item, action.payload.newData);
      }

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: number; variantId: number }>
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
          )
      );

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{
        productId: number;
        variantId: number;
        newQuantity: number;
      }>
    ) {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
      );

      if (item) {
        item.quantity = Math.max(1, action.payload.newQuantity);
      }

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

// =======================
// Exports
// =======================

export const {
  addToCart,
  clearCart,
  updateVariant,
  removeFromCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

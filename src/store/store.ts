// // src/store/store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../store/cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import wishlistReducer from "../store/wishlistSlice"; // 👈 import thêm

export const store = configureStore({
  reducer: {
    cart: cartReducer,
        wishlist: wishlistReducer, // thêm dòng này
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

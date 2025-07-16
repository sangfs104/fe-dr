import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface WishlistItem {
  productId: number;
  variantId: number;
  name: string;
  img: string | string[]; 
  price: number;
  size: string;
  userId?: number; 
}
interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk<WishlistItem[]>(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Lỗi lấy wishlist");
      const data = await res.json();
      return data.map((item: any) => ({
        productId: item.id,
        variantId: item.pivot?.variant_id ?? 0, 
        name: item.name,
        img: Array.isArray(item.img) ? item.img[0]?.name ?? "" : item.img, 
        price: Number(item.price) ?? 0,
        size: item.size ?? "",
        userId: item.pivot?.user_id, 
      }));
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const addToWishlistAPI = createAsyncThunk<
  WishlistItem,
  WishlistItem
>("wishlist/addToWishlistAPI", async (item, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return rejectWithValue("Bạn cần đăng nhập để thêm vào danh sách yêu thích.");
  }
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/wishlist/${item.productId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Lỗi thêm vào wishlist");
    return item;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const removeFromWishlistAPI = createAsyncThunk<
  number,
  number
>("wishlist/removeFromWishlistAPI", async (productId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://127.0.0.1:8000/api/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) throw new Error("Lỗi xóa khỏi wishlist");
    return productId;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        const exists = state.items.find(
          (item) =>
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
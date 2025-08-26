import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface WishlistItem {
  productId: number;
  variantId: number;
  name: string;
  img: string | string[];
  price: number;
  size: string;
  userId?: number;
  quantity?: number; // Thêm quantity nếu cần
}

interface RawWishlistItem {
  id: number;
  name: string;
  price: string | number;
  size?: string;
  image_url?: string;
  img?: { name: string }[];
  pivot?: {
    variant_id?: number;
    user_id?: number;
  };
}

interface WishlistState {
  items: WishlistItem[];
  selectedForPayment: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  selectedForPayment: [],
  loading: false,
  error: null,
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error("Thiếu biến môi trường NEXT_PUBLIC_API_URL");
}

export const fetchWishlist = createAsyncThunk<WishlistItem[]>(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Lỗi lấy wishlist");
      const data = await res.json();

      const baseImgUrl = `${API_BASE}/img/`;

      return data.map((item: RawWishlistItem) => {
        const fallbackImg =
          Array.isArray(item.img) && item.img.length > 0
            ? `${baseImgUrl}${item.img[0].name}`
            : "/img/no-image.png";

        return {
          productId: item.id,
          variantId: item.pivot?.variant_id ?? 0,
          name: item.name,
          img: item.image_url || fallbackImg,
          price: Number(item.price) ?? 0,
          size: item.size ?? "",
          userId: item.pivot?.user_id,
          quantity: 1, // Mặc định quantity
        };
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Lỗi không xác định";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addToWishlistAPI = createAsyncThunk<WishlistItem, WishlistItem>(
  "wishlist/addToWishlistAPI",
  async (item, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Bạn cần đăng nhập để thêm vào danh sách yêu thích.");
    }

    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${item.productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Lỗi thêm vào wishlist");
      return item;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Lỗi không xác định";
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeFromWishlistAPI = createAsyncThunk<
  { productId: number; variantId: number },
  { productId: number; variantId: number }
>("wishlist/removeFromWishlistAPI", async ({ productId, variantId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Lỗi xóa khỏi wishlist");
    }

    return { productId, variantId };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Lỗi không xác định";
    return rejectWithValue(errorMessage);
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state) {
      state.items = [];
    },
    setSelectedForPayment(state, action) {
      state.selectedForPayment = action.payload;
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
        const { productId, variantId } = action.payload;
        state.items = state.items.filter(
          (item) => !(item.productId === productId && item.variantId === variantId)
        );
        state.selectedForPayment = state.selectedForPayment.filter(
          (item) => !(item.productId === productId && item.variantId === variantId)
        );
      })
      .addCase(removeFromWishlistAPI.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearWishlist, setSelectedForPayment } = wishlistSlice.actions;
export default wishlistSlice.reducer;
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ProductVariant {
  id: number;
  size: string;
  price: number;
  sale_price?: string | null;
}

interface CartItem {
  productId: number;
  variantId: number;
  quantity: number;
  name: string;
  img: string;
  price: number;
  size: string;
  color?: string;
  variantList: ProductVariant[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  updateVariant: (
    productId: number,
    oldVariantId: number,
    newData: Partial<Pick<CartItem, "variantId" | "price" | "size">>
  ) => void;
  removeFromCart: (productId: number, variantId: number) => void; // ✅ Thêm khai báo
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const clearCart = () => setCartItems([]);

  const updateVariant = (
    productId: number,
    oldVariantId: number,
    newData: Partial<Pick<CartItem, "variantId" | "price" | "size">>
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === oldVariantId
          ? { ...item, ...newData }
          : item
      )
    );
  };

  const removeFromCart = (productId: number, variantId: number) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, updateVariant, removeFromCart }} // ✅ Truyền vào đây
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

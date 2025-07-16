"use client";

import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";

export default function getCategoryIcon(name: string) {
  const lower = name?.toLowerCase() || "";

  if (lower.includes("bomber") || lower.includes("áo khoác"))
    return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
  if (lower.includes("hoodie"))
    return <MoveDiagonal size={48} strokeWidth={1.5} />;
  if (lower.includes("túi") || lower.includes("bag"))
    return <ShoppingBag size={48} strokeWidth={1.5} />;

  return <Tags size={48} strokeWidth={1.5} />;
}

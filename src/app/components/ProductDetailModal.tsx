// components/ProductDetailModal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Product } from "../types"; // nếu bạn có file types.ts

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}) {
  if (!product) return null;

  const defaultImg = product.img?.[0]?.name;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white max-w-lg w-full rounded-lg p-4 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-2">
            {product.name}
          </Dialog.Title>
          {defaultImg && (
            <Image
              src={`/img/${defaultImg}`}
              alt={product.name}
              width={400}
              height={500}
              className="rounded"
            />
          )}
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Danh mục: {product.category.name}
          </p>
          <div className="mt-4 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

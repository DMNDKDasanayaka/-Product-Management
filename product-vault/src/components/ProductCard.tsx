// src/components/ProductCard.tsx
"use client";

import { Pencil, Trash2, ImageOff, Calendar } from "lucide-react";
import { Product, CATEGORY_COLORS } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onEdit, onDelete, index }: ProductCardProps) {
  const delay = (index % 8) * 0.05;

  return (
    <div
      className="group bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 
                 dark:border-slate-700/50 overflow-hidden card-hover shadow-sm
                 fade-in-up"
      style={{ animationDelay: `${delay}s`, opacity: 0 }}
    >
      {/* Image */}
      <div className="relative h-48 bg-slate-100 dark:bg-slate-700/50 overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`${product.imageUrl ? "hidden" : "flex"} w-full h-full items-center justify-center flex-col gap-2`}
        >
          <ImageOff className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          <span className="text-xs text-slate-400 dark:text-slate-500">No image</span>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl 
                       shadow-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 
                       text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400
                       transition-colors"
            title="Edit product"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl 
                       shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 
                       text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400
                       transition-colors"
            title="Delete product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${CATEGORY_COLORS[product.category]}`}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-base leading-tight 
                       line-clamp-1 mb-1.5">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-display font-bold text-violet-600 dark:text-violet-400">
            Rs{product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>{new Date(product.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Bottom action bar — visible on mobile */}
      <div className="px-4 pb-4 flex gap-2 sm:hidden">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 btn-secondary text-sm justify-center py-2"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 btn-danger text-sm justify-center py-2"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
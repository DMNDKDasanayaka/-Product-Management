// src/components/ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { Product, ProductFormData, CATEGORIES, Category } from "@/types/product";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
  editProduct?: Product | null;
  isSubmitting?: boolean;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  price: 0,
  description: "",
  imageUrl: "",
  category: "Electronics",
};

interface Errors {
  name?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export default function ProductForm({
  onSubmit,
  onClose,
  editProduct,
  isSubmitting = false,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
        imageUrl: editProduct.imageUrl,
        category: editProduct.category,
      });
      setImagePreview(editProduct.imageUrl);
    }
  }, [editProduct]);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    else if (form.name.trim().length > 80) newErrors.name = "Name cannot exceed 80 characters.";

    if (!form.price || form.price <= 0) newErrors.price = "Price must be greater than 0.";
    else if (form.price > 1_000_000) newErrors.price = "Price seems too large.";

    if (!form.description.trim()) newErrors.description = "Description is required.";
    else if (form.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters.";
    else if (form.description.trim().length > 500) newErrors.description = "Description cannot exceed 500 characters.";

    if (form.imageUrl && !/^https?:\/\/.+/.test(form.imageUrl.trim())) {
      newErrors.imageUrl = "Please enter a valid URL (starting with http:// or https://).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
    });
  };

  const handleImageBlur = () => {
    if (form.imageUrl && /^https?:\/\/.+/.test(form.imageUrl.trim())) {
      setImagePreview(form.imageUrl.trim());
    } else {
      setImagePreview("");
    }
  };

  const set = (field: keyof ProductFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg 
                      border border-slate-200 dark:border-slate-700/60 modal-enter max-h-[92vh] 
                      overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {editProduct ? "Update the product details below." : "Fill in the details for your new product."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Name */}
          <div>
            <label className="label-base">Product Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Wireless Headphones Pro"
              className={`input-base ${errors.name ? "border-red-400 focus:ring-red-400/60" : ""}`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-base">Price (Rs) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rs</span>
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => set("price", parseInt(e.target.value) || 0)}
                 
                  min="0"
                  step="1"
                  className={`input-base pl-8 ${errors.price ? "border-red-400 focus:ring-red-400/60" : ""}`}
                />
              </div>
              {errors.price && <p className="mt-1.5 text-xs text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label className="label-base">Category *</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value as Category)}
                className="input-base"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label-base">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the product features, materials, or specifications…"
              rows={3}
              className={`input-base resize-none ${errors.description ? "border-red-400 focus:ring-red-400/60" : ""}`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.description
                ? <p className="text-xs text-red-500">{errors.description}</p>
                : <span />}
              <span className={`text-xs ml-auto ${form.description.length > 450 ? "text-amber-500" : "text-slate-400"}`}>
                {form.description.length}/500
              </span>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="label-base">Image URL (Optional)</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => set("imageUrl", e.target.value)}
              onBlur={handleImageBlur}
              placeholder="https://example.com/product.jpg"
              className={`input-base ${errors.imageUrl ? "border-red-400 focus:ring-red-400/60" : ""}`}
            />
            {errors.imageUrl && <p className="mt-1.5 text-xs text-red-500">{errors.imageUrl}</p>}

            {/* Image Preview */}
            {imagePreview ? (
              <div className="mt-3 relative rounded-xl overflow-hidden h-40 bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview("")}
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                    Preview
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3 rounded-xl h-24 bg-slate-100 dark:bg-slate-800 border-2 border-dashed 
                              border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
                <ImageIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                <span className="text-xs text-slate-400 dark:text-slate-500">Image preview will appear here</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 justify-center"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              ) : editProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
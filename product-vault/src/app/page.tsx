// src/app/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Moon, Sun, Package, LayoutGrid, List } from "lucide-react";
import toast from "react-hot-toast";

import { useProducts } from "@/hooks/useProducts";
import { Product, ProductFormData, Category } from "@/types/product";

import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import StatsBar from "@/components/StatsBar";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

type ViewMode = "grid" | "list";

export default function HomePage() {
  const { products, isLoaded, addProduct, updateProduct, deleteProduct } = useProducts();

  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

  // Dark mode toggle
  useEffect(() => {
    const saved = localStorage.getItem("productvault_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);
    document.body.classList.toggle("dark", dark);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("productvault_theme", next ? "dark" : "light");
  };

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    // Simulate brief async for UX feel
    await new Promise((r) => setTimeout(r, 300));
    try {
      if (editProduct) {
        updateProduct(editProduct.id, data);
        toast.success(`"${data.name}" updated successfully!`);
      } else {
        addProduct(data);
        toast.success(`"${data.name}" added to catalog!`);
      }
      setShowForm(false);
      setEditProduct(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDeleteRequest = (product: Product) => {
    setDeleteTarget(product);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success(`"${deleteTarget.name}" removed from catalog.`);
    setDeleteTarget(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("All");
  };

  const hasFilters = !!query || selectedCategory !== "All";

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d0f14]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading ProductVault…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0f14] transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-400/10 dark:bg-violet-600/5 
                        rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-400/10 dark:bg-sky-600/5 
                        rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                           border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-600 rounded-xl shadow-lg shadow-violet-500/30">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-none">
                    ProductVault
                  </h1>
                  <p className="text-xs text-slate-400 leading-none mt-0.5 hidden sm:block">
                    Product Management
                  </p>
                </div>
              </div>

              {/* Header actions */}
              <div className="flex items-center gap-2">
                {/* View toggle */}
                <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Dark mode */}
                <button
                  onClick={toggleDark}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl 
                             transition-colors text-slate-500 dark:text-slate-400"
                  title="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Add product */}
                <button
                  onClick={() => { setEditProduct(null); setShowForm(true); }}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Stats */}
          <StatsBar products={products} />

          {/* Search + Filter */}
          <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 
                          dark:border-slate-700/50 p-5 shadow-sm">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              resultCount={filtered.length}
              totalCount={products.length}
            />
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              onAdd={() => { setEditProduct(null); setShowForm(true); }}
              onClearFilters={clearFilters}
            />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                  index={i}
                />
              ))}
            </div>
          ) : (
            /* List view */
            <div className="space-y-3">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 
                             dark:border-slate-700/50 p-4 flex items-center gap-4 card-hover shadow-sm
                             fade-in-up"
                  style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 
                                  flex-shrink-0">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-display font-bold text-slate-900 dark:text-white truncate">
                        {product.name}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0
                                        ${CATEGORY_COLORS_IMPORT[product.category]}`}>
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {product.description}
                    </p>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-display font-bold text-violet-600 dark:text-violet-400 text-lg">
                      ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-violet-50 dark:hover:bg-violet-900/30 
                                   text-slate-400 hover:text-violet-600 dark:hover:text-violet-400
                                   rounded-xl transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(product)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 
                                   text-slate-400 hover:text-red-500 dark:hover:text-red-400
                                   rounded-xl transition-colors"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showForm && (
        <ProductForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          editProduct={editProduct}
          isSubmitting={isSubmitting}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          confirmLabel="Delete Product"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// Inline icons for list view (avoids re-import issues)
function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

// Inline color map for list view
const CATEGORY_COLORS_IMPORT: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Clothing: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Food: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Books: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Home: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Sports: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Other: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};
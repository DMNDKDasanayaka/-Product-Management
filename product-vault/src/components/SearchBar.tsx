// src/components/SearchBar.tsx
"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { Category, CATEGORIES } from "@/types/product";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: Category | "All";
  onCategoryChange: (c: Category | "All") => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchBar({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const allCategories: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products by name or description…"
          className="input-base pl-11 pr-10"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 
                       dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Category filters + result count */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="font-medium">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2 flex-1">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto whitespace-nowrap">
          {resultCount === totalCount
            ? `${totalCount} product${totalCount !== 1 ? "s" : ""}`
            : `${resultCount} of ${totalCount}`}
        </span>
      </div>
    </div>
  );
}
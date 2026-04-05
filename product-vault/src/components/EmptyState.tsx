// src/components/EmptyState.tsx
"use client";

import { PackageOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onAdd: () => void;
  onClearFilters: () => void;
}

export default function EmptyState({ hasFilters, onAdd, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="p-5 bg-violet-50 dark:bg-violet-900/20 rounded-2xl mb-5">
        <PackageOpen className="w-10 h-10 text-violet-400" />
      </div>
      {hasFilters ? (
        <>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6">
            No products match your current search or filter. Try adjusting your criteria.
          </p>
          <button onClick={onClearFilters} className="btn-secondary">
            Clear Filters
          </button>
        </>
      ) : (
        <>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
            No products yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6">
            Start building your product catalog by adding your first product.
          </p>
          <button onClick={onAdd} className="btn-primary">
            <Plus className="w-4 h-4" />
            Add First Product
          </button>
        </>
      )}
    </div>
  );
}
// src/components/StatsBar.tsx
"use client";

import { Package, DollarSign, TrendingUp, Tag } from "lucide-react";
import { Product } from "@/types/product";

interface StatsBarProps {
  products: Product[];
}

export default function StatsBar({ products }: StatsBarProps) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
  const categories = new Set(products.map((p) => p.category)).size;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toString(),
      icon: Package,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-900/20",
    },
    {
      label: "Catalog Value",
      value: `Rs${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Average Price",
      value: `Rs${avgPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      label: "Categories",
      value: categories.toString(),
      icon: Tag,
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`bg-white dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-100 
                        dark:border-slate-700/60 shadow-sm fade-in-up stagger-${i + 1}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bg} p-2.5 rounded-xl`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
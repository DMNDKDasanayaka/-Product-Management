// src/types/product.ts

export type Category =
  | "Electronics"
  | "Clothing"
  | "Food"
  | "Books"
  | "Home"
  | "Sports"
  | "Other";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

export const CATEGORIES: Category[] = [
  "Electronics",
  "Clothing",
  "Food",
  "Books",
  "Home",
  "Sports",
  "Other",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Electronics: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Clothing: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Food: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Books: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Home: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Sports: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Other: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};
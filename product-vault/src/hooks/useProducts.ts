// src/hooks/useProducts.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductFormData } from "@/types/product";

const STORAGE_KEY = "productvault_products";

const SEED_PRODUCTS: Product[] = [
  {
    id: uuidv4(),
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    description: "Premium over-ear headphones with 30hr battery life and crystal-clear audio.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Electronics",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Minimalist Leather Jacket",
    price: 189.0,
    description: "Genuine leather jacket with clean lines and a modern silhouette.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    category: "Clothing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Artisan Coffee Blend",
    price: 24.5,
    description: "Single-origin Ethiopian beans, medium roast with notes of berry and citrus.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
    category: "Food",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProducts(JSON.parse(raw));
      } else {
        // Seed with demo data on first load
        setProducts(SEED_PRODUCTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
      }
    } catch {
      setProducts([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist to localStorage whenever products change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = useCallback((data: ProductFormData): Product => {
    const newProduct: Product = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback(
    (id: string, data: ProductFormData): Product | null => {
      let updated: Product | null = null;
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            updated = { ...p, ...data, updatedAt: new Date().toISOString() };
            return updated;
          }
          return p;
        })
      );
      return updated;
    },
    []
  );

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, isLoaded, addProduct, updateProduct, deleteProduct };
}
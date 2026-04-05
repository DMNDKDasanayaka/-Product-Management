# Product-Management
# 🛍️ ProductVault — Product Management App

A clean product management dashboard built with Next.js 16, Tailwind CSS v4, and localStorage.

---

## ⚙️ Setup Instructions

**1. Create the project**
```bash
npx create-next-app@latest product-vault --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd product-vault
```

**2. Install dependencies**
```bash
npm install lucide-react react-hot-toast uuid
npm install -D @types/uuid
```

**3. Copy source files** into their paths:
```
src/
├── app/
│   ├── globals.css      ← replace
│   ├── layout.tsx       ← replace
│   └── page.tsx         ← replace
├── components/
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ConfirmDialog.tsx
│   ├── SearchBar.tsx
│   ├── StatsBar.tsx
│   └── EmptyState.tsx
├── hooks/
│   └── useProducts.ts
└── types/
    └── product.ts
```

> ⚠️ **Delete `tailwind.config.ts`** — Next.js 16 uses Tailwind v4, which needs no config file.

**4. Run**
```bash
npm run dev
```
Open http://localhost:3000 ✅

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |
| react-hot-toast | Toast notifications |
| uuid | Unique product IDs |
| localStorage | Data persistence (no backend) |

---

## 💡 Assumptions

- **Images are URL-based** — file upload is optional per spec; URLs keep the app fully frontend.
- **Categories are predefined** — (Electronics, Clothing, Food, Books, Home, Sports, Other) for consistent filtering and color badges.
- **Price stored as a number** — enables accurate stats (total value, average price).
- **Seed data on first visit** — 3 demo products load if localStorage is empty, so the UI isn't blank.
- **Dark mode via CSS variables** — Tailwind v4 dropped the `dark:` class config, so dark mode is applied by toggling CSS custom properties on `:root`.

---

## 🚀 Improvements

- File upload for product images (instead of URL)
- Sort products by price, name, or date
- Bulk delete / select all
- Export catalog to CSV or JSON
- Real backend (e.g. Supabase) for multi-device sync
- Unit tests with Vitest + Testing Library

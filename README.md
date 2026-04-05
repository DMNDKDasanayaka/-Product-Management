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


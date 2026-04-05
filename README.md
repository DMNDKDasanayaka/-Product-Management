# Product-Management
# 🛍️ ProductVault — Product Management App

> A sleek, full-featured product management dashboard built with Next.js 16, Tailwind CSS v4, and localStorage persistence. Add, view, edit, search, and delete products — all without a backend.

---

## 📸 Preview

The app features:
- A sticky header with logo, view toggle, dark mode switch, and Add Product button
- A stats bar showing total products, catalog value, average price, and category count
- Live search + category filter bar
- Responsive product grid (or list) with card hover actions
- Modal forms with image preview and real-time validation
- Toast notifications for all CRUD actions
- Full dark mode support

---

## ⚙️ Setup Instructions

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18 or higher |
| npm | 9 or higher |

---

### Step 1 — Create the Next.js project

```bash
npx create-next-app@latest product-vault \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd product-vault
```

---

### Step 2 — Install dependencies

```bash
npm install lucide-react react-hot-toast uuid
npm install -D @types/uuid
```

---

### Step 3 — Copy source files

Create the following folder structure inside your project and copy each file:

```
product-vault/
├── src/
│   ├── app/
│   │   ├── globals.css         ← replace existing
│   │   ├── layout.tsx          ← replace existing
│   │   └── page.tsx            ← replace existing
│   ├── components/
│   │   ├── ProductCard.tsx     ← new file
│   │   ├── ProductForm.tsx     ← new file
│   │   ├── ConfirmDialog.tsx   ← new file
│   │   ├── SearchBar.tsx       ← new file
│   │   ├── StatsBar.tsx        ← new file
│   │   └── EmptyState.tsx      ← new file
│   ├── hooks/
│   │   └── useProducts.ts      ← new file
│   └── types/
│       └── product.ts          ← new file
```

> ⚠️ **Tailwind v4 Note:** Delete `tailwind.config.ts` from your project root.
> Next.js 16 ships with Tailwind CSS v4, which is configured entirely inside `globals.css`
> using `@import "tailwindcss"` and `@theme {}`. No config file is needed or supported.

---

### Step 4 — Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. ✅

---

### Step 5 — Build for production (optional)

```bash
npm run build
npm run start
```

---

## 🧱 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 (App Router) | React framework, routing, SSR/CSR |
| **TypeScript** | 5+ | Static type safety across all files |
| **Tailwind CSS** | v4 | Utility-first styling via `@import "tailwindcss"` |
| **Lucide React** | latest | Consistent, lightweight icon set |
| **react-hot-toast** | 2.x | Toast notification system |
| **uuid** | 10.x | Collision-free unique product IDs |
| **localStorage** | Browser API | Client-side data persistence (no backend) |

---

## ✨ Features Implemented

### Core (Required)
- ✅ **Add Product** — Name, price, description, image URL, category
- ✅ **View Products** — Responsive card grid with image previews
- ✅ **Edit Product** — Pre-filled modal form with update support
- ✅ **Delete Product** — Confirmation dialog before permanent removal
- ✅ **localStorage** — All data persists across page refreshes

### Bonus (All implemented)
- ✅ **Form Validation** — Required fields, min/max length, URL format, price > 0
- ✅ **Search & Filter** — Live search by name/description + category pill filters
- ✅ **Toast Notifications** — Success/error feedback on every action
- ✅ **Dark Mode** — Full dark/light toggle with system preference detection

### Extra (Beyond requirements)
- ✅ **Stats Bar** — Live totals: product count, catalog value, average price, categories
- ✅ **List / Grid toggle** — Switch between card grid and compact list view
- ✅ **Image preview** — Live image preview inside the Add/Edit form
- ✅ **Seed data** — Three demo products load on first visit for instant preview
- ✅ **Staggered animations** — Cards fade in with CSS keyframe animations
- ✅ **Empty state** — Contextual message when no products or no search results
- ✅ **Category badges** — Color-coded category labels on every product card

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css         # Global styles, Tailwind v4 config, CSS variables, animations
│   ├── layout.tsx          # Root layout, Google Fonts <link>, toast provider
│   └── page.tsx            # Main page — state management, filtering, layout
│
├── components/
│   ├── ProductCard.tsx     # Individual product card (grid view)
│   ├── ProductForm.tsx     # Add/Edit modal form with validation
│   ├── ConfirmDialog.tsx   # Delete confirmation modal
│   ├── SearchBar.tsx       # Search input + category filter pills
│   ├── StatsBar.tsx        # Summary stats (count, value, avg, categories)
│   └── EmptyState.tsx      # Shown when product list is empty
│
├── hooks/
│   └── useProducts.ts      # Custom hook — CRUD operations + localStorage sync
│
└── types/
    └── product.ts          # Product interface, Category type, color maps
```

---

## 💡 Assumptions Made

1. **No backend required** — The spec states localStorage only. All data is stored under the key `productvault_products` in the browser.

2. **Images are URL-based** — File upload is marked as optional in the spec. This implementation uses image URLs, which avoids base64 bloat in localStorage and keeps the app purely frontend.

3. **Categories are predefined** — Seven categories are defined (Electronics, Clothing, Food, Books, Home, Sports, Other) rather than a free-text field, to enable consistent filtering and color-coded badges.

4. **Price is stored as a number** — Not a string, to enable accurate catalog value and average price calculations in the stats bar.

5. **Seed data on first visit** — Three demo products are pre-loaded if localStorage is empty, so the UI never opens to a blank screen during a demo or assessment review.

6. **Dark mode uses CSS variables** — Instead of Tailwind's `dark:` prefix (which requires `darkMode: "class"` in a config file that v4 no longer uses), dark mode is implemented by toggling CSS custom properties on `:root` via JavaScript.

7. **Tailwind v4 compatibility** — Next.js 16 ships with Tailwind CSS v4, which introduced breaking changes from v3 (new `@import` syntax, removal of `tailwind.config.ts`, no `@apply` with custom utilities). All styling was written to be v4-compatible using plain CSS classes and inline styles where needed.

---

## 🚀 Possible Improvements

Given more time, the following enhancements would be worth adding:

| Improvement | Benefit |
|---|---|
| File upload for images | No reliance on external image URLs; works offline |
| Sort options (price, name, date) | Better product browsing experience |
| Bulk delete / select all | Faster catalog cleanup |
| Pagination or infinite scroll | Performance at scale with many products |
| Export to CSV / JSON | Useful for backup or sharing the catalog |
| Drag-and-drop reordering | Intuitive manual product ordering |
| Unit tests (Vitest + Testing Library) | Code quality and regression safety |
| Real backend (Supabase / PlanetScale) | Multi-device sync and data durability |
| Image upload via Cloudinary/S3 | Production-grade asset management |

---

## 👤 Author Notes

This project was built as part of a Full Stack Intern Assessment. The focus was on:
- Clean, maintainable component architecture
- High-quality UI/UX with professional visual design
- Full implementation of all required and bonus features
- Correct use of Next.js App Router patterns and TypeScript

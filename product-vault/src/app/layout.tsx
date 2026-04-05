// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ProductVault — Product Management",
  description: "Beautiful product management dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              borderRadius: "12px",
              border: "1px solid #334155",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#a78bfa",
                secondary: "#1e293b",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#1e293b",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
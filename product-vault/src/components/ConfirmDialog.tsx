// src/components/ConfirmDialog.tsx
"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border border-slate-200 dark:border-slate-700 modal-enter">
        <div className="flex items-start justify-between px-6 pt-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <p className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 
                       text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 
                       shadow-lg shadow-red-500/25 active:scale-[0.98] flex items-center gap-2"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
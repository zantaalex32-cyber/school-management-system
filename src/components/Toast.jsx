import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    error: 'border-rose-200 bg-rose-50 text-rose-900',
    info: 'border-blue-200 bg-blue-50 text-blue-900'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl animate-in slide-in-from-bottom-5 duration-200 max-w-md">
      <div className={`flex items-center gap-3 p-3 rounded-lg border w-full ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


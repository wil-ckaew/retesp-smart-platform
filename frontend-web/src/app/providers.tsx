// frontend-web/src/app/providers.tsx
"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/hooks/useTheme";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
          },
        }}
      />
    </ThemeProvider>
  );
}
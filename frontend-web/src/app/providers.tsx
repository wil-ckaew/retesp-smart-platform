// src/app/providers.tsx
"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeWrapper } from "./ThemeWrapper";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeWrapper>
      {children}
      <Toaster position="top-right" />
    </ThemeWrapper>
  );
}

// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

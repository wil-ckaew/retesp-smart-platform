// src/app/ThemeWrapper.tsx
"use client";

import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Menu, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname(); // para saber a rota atual

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
          <Image src="/imagens/retesp.png" alt="RETESP" width={40} height={40} />
          <span
            className={`text-2xl font-bold ${
              pathname === "/" ? "text-red-600" : "text-gray-800 dark:text-white"
            }`}
          >
            RETESP
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-4 space-y-2 text-gray-700 dark:text-gray-300">
          <Link
            href="/"
            className={`flex items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              pathname === "/" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            Página Inicial
          </Link>

          <Link
            href="/dashboard"
            className={`flex items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              pathname.startsWith("/dashboard") && pathname !== "/" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/overview"
            className={`flex items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              pathname === "/dashboard/overview" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
          >
            Visão Geral
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Topbar */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 z-40">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Painel Administrativo
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark/Light toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Sun className="w-5 h-5 text-yellow-500 dark:hidden" />
              <Moon className="w-5 h-5 text-gray-800 hidden dark:inline" />
            </button>
          </div>
        </header>

        <main className="mt-16 p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

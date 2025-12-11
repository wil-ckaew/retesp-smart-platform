"use client";

import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed left-64 top-0 right-0 h-16 bg-white shadow z-40 px-6 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">Administrador</span>
        <User className="w-6 h-6 text-gray-600" />
      </div>
    </header>
  );
}

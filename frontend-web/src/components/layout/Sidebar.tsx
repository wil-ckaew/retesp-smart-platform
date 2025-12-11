"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertTriangle, BarChart3, PackageSearch, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/overview", label: "Visão Geral", icon: BarChart3 },
  { href: "/dashboard/seals", label: "Selos", icon: PackageSearch },
  { href: "/dashboard/alerts", label: "Alertas", icon: AlertTriangle },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-xl h-screen fixed left-0 top-0 p-6 flex flex-col gap-6 z-50">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">RETESP</h2>

      <nav className="flex flex-col gap-2">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${isActive ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

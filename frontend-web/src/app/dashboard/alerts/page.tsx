//src/app/dashboard/alerts/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import AlertsTable from "@/components/alerts/AlertsTable";

export default function AlertsPage() {
  const mockAlerts = [
    {
      id: "1",
      seal_number: "SEL-002",
      level: "Crítico",
      message: "Temperatura acima do limite!",
      created_at: "2025-01-12 10:32",
    },
    {
      id: "2",
      seal_number: "SEL-004",
      level: "Alto",
      message: "Oscilação anormal detectada.",
      created_at: "2025-01-12 09:10",
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Alertas
      </motion.h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/alerts/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusCircle size={18} /> Criar Alerta
        </Link>
      </div>

      <AlertsTable alerts={mockAlerts} />
    </div>
  );
}

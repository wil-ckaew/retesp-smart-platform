//src/app/dashboard/seals/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import SealsTable from "@/components/seals/SealsTable";

export default function SealsPage() {
  const sealsMock = [
    {
      id: "1",
      number: "SEL-001",
      status: "Ativo",
      temperature: 58,
      vibration: 3,
      last_update: "2025-01-12 13:20",
    },
    {
      id: "2",
      number: "SEL-002",
      status: "Alerta",
      temperature: 89,
      vibration: 7,
      last_update: "2025-01-12 13:15",
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Selos Inteligentes
      </motion.h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/seals/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusCircle size={18} /> Adicionar Selo
        </Link>
      </div>

      <SealsTable seals={sealsMock} />
    </div>
  );
}

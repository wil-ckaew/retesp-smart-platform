//src/app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Dashboard
      </motion.h1>

      <p className="text-neutral-600 dark:text-neutral-400">
        Bem-vindo ao painel administrativo da Retesp Smart Platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/overview" className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Visão Geral</h2>
          <p className="text-neutral-500 dark:text-neutral-300">Veja gráficos, análises e previsões dos selos inteligentes.</p>
        </Link>

        <Link href="#" className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Selos Ativos</h2>
          <p className="text-neutral-500 dark:text-neutral-300">Gerencie e monitore todos os selos ativos no sistema.</p>
        </Link>

        <Link href="#" className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Alertas Recentes</h2>
          <p className="text-neutral-500 dark:text-neutral-300">Confira alertas e notificações em tempo real.</p>
        </Link>
      </div>
    </div>
  );
}

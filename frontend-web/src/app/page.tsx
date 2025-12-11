//src/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Cpu, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-red-600 mb-6"
      >
        RETESP Smart Seal Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-600 max-w-2xl mb-10"
      >
        Plataforma inteligente de monitoramento e rastreamento para retentores
        industriais, utilizando IoT, análise de vibração e manutenção preditiva.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex gap-4"
      >
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          Entrar no Dashboard <ArrowRight size={18} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow">
          <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Rastreamento Seguro</h3>
          <p className="text-gray-600 text-sm">
            Tecnologia criptografada e rastreamento contínuo dos selos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <Cpu className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">IoT em Tempo Real</h3>
          <p className="text-gray-600 text-sm">
            Alertas instantâneos com dados enviados por sensores inteligentes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <Activity className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Manutenção Preditiva</h3>
          <p className="text-gray-600 text-sm">
            Previsão de falhas baseada em vibração, temperatura e desgaste.
          </p>
        </div>
      </div>
    </main>
  );
}

//src/app/dashboard/overview/page.tsx
"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const lineData = [
  { month: "Jan", selos: 30 },
  { month: "Fev", selos: 45 },
  { month: "Mar", selos: 28 },
  { month: "Abr", selos: 60 },
  { month: "Mai", selos: 50 },
];

const barData = [
  { status: "Ativos", qtd: 120 },
  { status: "Inativos", qtd: 30 },
  { status: "Em alerta", qtd: 15 },
];

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Visão Geral
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Aqui você poderá visualizar gráficos, previsões de falhas e análises completas dos selos inteligentes.
      </p>

      {/* Gráfico de Linhas */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Selos Monitorados nos Últimos Meses</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="dark:stroke-neutral-700" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="selos" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Status dos Selos</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="dark:stroke-neutral-700" />
              <XAxis dataKey="status" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Bar dataKey="qtd" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

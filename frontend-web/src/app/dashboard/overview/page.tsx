// src/app/dashboard/overview/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Visão Geral Analítica
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gráficos, previsões de falhas e análises completas dos selos inteligentes.
            </p>
          </div>
        </motion.div>

        {/* Gráfico de Linhas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Selos Monitorados nos Últimos Meses
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={lineData} 
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    color: '#F9FAFB'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="selos" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Status dos Selos
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="status" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    color: '#F9FAFB'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="qtd" 
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total de Selos", value: "165", change: "+12%", color: "text-blue-600" },
            { title: "Taxa de Sucesso", value: "94.5%", change: "+2.1%", color: "text-green-600" },
            { title: "Previsão de Falhas", value: "8", change: "-3", color: "text-red-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
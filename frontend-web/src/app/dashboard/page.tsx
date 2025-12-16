// frontend-web/src/app/dashboard/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Activity, 
  AlertCircle, 
  BarChart3, 
  Battery, 
  CheckCircle, 
  Clock, 
  Cpu, 
  Download, 
  Filter, 
  Shield, 
  Thermometer, 
  TrendingUp, 
  Users,
  Wifi
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("day");

  // Métricas principais
  const metrics = [
    { label: "Selos Ativos", value: "42", change: "+2.3%", icon: Shield, color: "text-blue-600" },
    { label: "Alertas Ativos", value: "8", change: "-1", icon: AlertCircle, color: "text-red-600" },
    { label: "Temperatura Média", value: "38.5°C", change: "-0.5°C", icon: Thermometer, color: "text-orange-600" },
    { label: "Eficiência", value: "94.2%", change: "+1.8%", icon: TrendingUp, color: "text-green-600" },
  ];

  // Alertas recentes
  const recentAlerts = [
    { id: 1, device: "Retentor A-12", type: "Temperatura", status: "high", time: "10 min atrás", value: "52°C" },
    { id: 2, device: "Retentor B-07", type: "Vibração", status: "medium", time: "25 min atrás", value: "3.8mm/s" },
    { id: 3, device: "Retentor C-03", type: "Pressão", status: "low", time: "1h atrás", value: "9.2 bar" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER SIMPLES - APENAS TÍTULO E CONTROLES */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Visão geral do sistema de monitoramento</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filtros de tempo */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {["day", "week", "month"].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeRange === range
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {range === "day" ? "Hoje" : 
                   range === "week" ? "Semana" : "Mês"}
                </button>
              ))}
            </div>
            
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* CARDS DE MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${metric.color} bg-opacity-20`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.change.startsWith('+') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GRÁFICO */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Atividade dos Selos</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select className="bg-transparent text-sm text-gray-600 dark:text-gray-400">
                  <option>Últimos 7 dias</option>
                  <option>Último mês</option>
                </select>
              </div>
            </div>
            
            {/* Gráfico simplificado */}
            <div className="h-64 flex items-end justify-between gap-2 pt-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {i+8}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ALERTAS RECENTES */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alertas Recentes</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Ver todos
              </button>
            </div>
            
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      alert.status === "high" ? "bg-red-100 dark:bg-red-900/20" :
                      alert.status === "medium" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                      "bg-blue-100 dark:bg-blue-900/20"
                    }`}>
                      <AlertCircle className={`w-4 h-4 ${
                        alert.status === "high" ? "text-red-600 dark:text-red-400" :
                        alert.status === "medium" ? "text-yellow-600 dark:text-yellow-400" :
                        "text-blue-600 dark:text-blue-400"
                      }`} />
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{alert.device}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{alert.type}: {alert.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* DISPOSITIVOS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Dispositivos Conectados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Gateway Central", status: "online", icon: Wifi, devices: 24 },
              { name: "Sensor Hub A", status: "online", icon: Cpu, devices: 12 },
              { name: "Sensor Hub B", status: "warning", icon: Cpu, devices: 8 },
              { name: "Gateway Backup", status: "offline", icon: Wifi, devices: 0 },
            ].map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      device.status === "online" ? "bg-green-100 dark:bg-green-900/20 text-green-600" :
                      device.status === "warning" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600" :
                      "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      device.status === "online" ? "bg-green-100 dark:bg-green-900/30 text-green-700" :
                      device.status === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700" :
                      "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}>
                      {device.status === "online" ? "Online" : 
                       device.status === "warning" ? "Conectando" : "Offline"}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{device.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{device.devices}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">dispositivos</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
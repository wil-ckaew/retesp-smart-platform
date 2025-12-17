// src/app/dashboard/monitoring/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Activity, 
  AlertCircle, 
  Battery, 
  Clock, 
  Cpu, 
  Download, 
  Filter, 
  Gauge, 
  MapPin, 
  RefreshCw, 
  Shield, 
  Thermometer, 
  Wifi,
  Play,
  Pause,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MonitoringPage() {
  const [selectedSensor, setSelectedSensor] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState("realtime");

  const sensors = [
    { 
      id: "SEN-001", 
      name: "Retentor Principal A", 
      type: "Temperatura", 
      value: "42°C", 
      status: "normal",
      location: "Linha A - Pos. 3",
      lastUpdate: "Agora"
    },
    { 
      id: "SEN-002", 
      name: "Retentor Secundário B", 
      type: "Vibração", 
      value: "3.5mm/s", 
      status: "warning",
      location: "Linha B - Pos. 7",
      lastUpdate: "2 min atrás"
    },
    { 
      id: "SEN-003", 
      name: "Retentor de Alta Pressão", 
      type: "Pressão", 
      value: "12.5 bar", 
      status: "normal",
      location: "Linha C - Pos. 12",
      lastUpdate: "5 min atrás"
    },
    { 
      id: "SEN-004", 
      name: "Retentor de Vedação", 
      type: "Temperatura", 
      value: "52°C", 
      status: "critical",
      location: "Linha A - Pos. 5",
      lastUpdate: "Agora"
    },
    { 
      id: "SEN-005", 
      name: "Gateway Central", 
      type: "Conectividade", 
      value: "98%", 
      status: "normal",
      location: "Sala de Controle",
      lastUpdate: "Agora"
    },
    { 
      id: "SEN-006", 
      name: "Sensor Hub A", 
      type: "Bateria", 
      value: "85%", 
      status: "normal",
      location: "Área 12",
      lastUpdate: "10 min atrás"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "warning": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
      case "critical": return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monitoramento em Tempo Real</h2>
            <p className="text-gray-600 dark:text-gray-400">Acompanhamento contínuo de sensores e dispositivos</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                autoRefresh 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {autoRefresh ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {autoRefresh ? "Pausar" : "Iniciar"} Atualização
            </button>
            
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </button>
          </div>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["all", "temperature", "vibration", "pressure"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedSensor(type)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  selectedSensor === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {type === "all" ? "Todos" :
                 type === "temperature" ? "Temperatura" :
                 type === "vibration" ? "Vibração" : "Pressão"}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            {["realtime", "1h", "6h", "24h"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {range === "realtime" ? "Tempo Real" :
                 range === "1h" ? "1 hora" :
                 range === "6h" ? "6 horas" : "24 horas"}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard de Monitoramento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico Principal */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leituras em Tempo Real</h3>
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-gray-400 cursor-pointer" />
                <ZoomOut className="w-4 h-4 text-gray-400 cursor-pointer" />
                <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
            
            {/* Simulação de gráfico */}
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center mx-0.5">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-300"
                      style={{ 
                        height: `${Math.sin(i * 0.3) * 30 + 50}%`,
                        opacity: 0.8
                      }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{i}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Estatísticas</h3>
            <div className="space-y-4">
              {[
                { label: "Sensores Ativos", value: "48", icon: Activity, color: "text-green-600" },
                { label: "Taxa de Amostragem", value: "100Hz", icon: Cpu, color: "text-blue-600" },
                { label: "Latência Média", value: "32ms", icon: Clock, color: "text-purple-600" },
                { label: "Taxa de Erro", value: "0.02%", icon: AlertCircle, color: "text-red-600" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20`}>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lista de Sensores */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sensores Monitorados</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Atualização em tempo real</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Sensor</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Tipo</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Valor</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Localização</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Última Atualização</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sensors.map((sensor, index) => (
                  <motion.tr
                    key={sensor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{sensor.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{sensor.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {sensor.type === "Temperatura" ? <Thermometer className="w-4 h-4 text-red-500" /> :
                         sensor.type === "Vibração" ? <Activity className="w-4 h-4 text-purple-500" /> :
                         sensor.type === "Pressão" ? <Gauge className="w-4 h-4 text-blue-500" /> :
                         sensor.type === "Bateria" ? <Battery className="w-4 h-4 text-green-500" /> :
                         <Wifi className="w-4 h-4 text-orange-500" />}
                        <span className="text-gray-700 dark:text-gray-300">{sensor.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className={`font-medium ${
                        sensor.status === "critical" ? "text-red-600" :
                        sensor.status === "warning" ? "text-yellow-600" : "text-gray-900 dark:text-white"
                      }`}>
                        {sensor.value}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                        {sensor.status === "normal" ? "Normal" :
                         sensor.status === "warning" ? "Alerta" : "Crítico"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {sensor.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {sensor.lastUpdate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Detalhes
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                          Histórico
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
// frontend-web/src/app/dashboard/alerts/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  AlertCircle, 
  Bell, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AlertsPage() {
  const [filter, setFilter] = useState("all");

  const alerts = [
    { 
      id: "ALT-001", 
      title: "Vibração Excessiva", 
      description: "Sensor #23 detectou vibração acima do limite seguro", 
      severity: "high", 
      time: "10 minutos atrás",
      status: "unread"
    },
    { 
      id: "ALT-002", 
      title: "Temperatura Elevada", 
      description: "Temperatura no sensor #45 atingiu 52°C", 
      severity: "high", 
      time: "25 minutos atrás",
      status: "read"
    },
    { 
      id: "ALT-003", 
      title: "Conexão Perdida", 
      description: "Sensor #12 está offline há 1 hora", 
      severity: "medium", 
      time: "1 hora atrás",
      status: "read"
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 dark:bg-red-900/20";
      case "medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
      case "low": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alertas do Sistema</h2>
            <p className="text-gray-600 dark:text-gray-400">Monitoramento e notificações em tempo real</p>
          </div>
          <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Marcar Todos como Lidos
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {["all", "unread", "high", "medium", "low"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                filter === filterOption
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {filterOption === "all" ? "Todos" :
               filterOption === "unread" ? "Não Lidos" :
               filterOption === "high" ? "Alta" :
               filterOption === "medium" ? "Média" : "Baixa"}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === "high" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                        alert.severity === "medium" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      }`}>
                        {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Média" : "Baixa"}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>ID: {alert.id}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {alert.status === "unread" && (
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Marcar como Lido
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
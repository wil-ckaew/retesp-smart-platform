// src/app/dashboard/analytics/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Calendar,
  PieChart,
  LineChart,
  Activity,
  Shield,
  AlertCircle,
  Database,
  Clock,
  Target,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("performance");

  const performanceData = [
    { month: "Jan", eficiencia: 85, disponibilidade: 92 },
    { month: "Fev", eficiencia: 88, disponibilidade: 94 },
    { month: "Mar", eficiencia: 82, disponibilidade: 91 },
    { month: "Abr", eficiencia: 90, disponibilidade: 96 },
    { month: "Mai", eficiencia: 92, disponibilidade: 98 },
    { month: "Jun", eficiencia: 94, disponibilidade: 99 },
  ];

  const kpiData = [
    { label: "MTBF", value: "2450h", change: "+12%", icon: Clock, color: "text-blue-600" },
    { label: "Disponibilidade", value: "99.2%", change: "+0.8%", icon: Zap, color: "text-green-600" },
    { label: "OEE", value: "87.5%", change: "+3.2%", icon: Target, color: "text-purple-600" },
    { label: "TMPR", value: "4.2h", change: "-1.3h", icon: Activity, color: "text-orange-600" },
  ];

  const insights = [
    { title: "Pico de Vibração", description: "Aumento de 23% na vibração média", impact: "Médio", icon: AlertCircle },
    { title: "Melhoria de Eficiência", description: "Redução de 15% no consumo energético", impact: "Alto", icon: TrendingUp },
    { title: "Previsão de Falha", description: "Selo #B-07 com 85% de probabilidade de falha em 30 dias", impact: "Crítico", icon: Shield },
    { title: "Otimização Identificada", description: "Redução de 2°C na temperatura operacional", impact: "Baixo", icon: TrendingDown },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h2>
            <p className="text-gray-600 dark:text-gray-400">Análises preditivas e indicadores de performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {["week", "month", "quarter", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {period === "week" ? "Semana" :
                   period === "month" ? "Mês" :
                   period === "quarter" ? "Trimestre" : "Ano"}
                </button>
              ))}
            </div>
            
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${kpi.color} bg-opacity-20`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.change.startsWith('+') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{kpi.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Gráficos e Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Performance */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance ao Longo do Tempo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Tendência de eficiência e disponibilidade</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select className="bg-transparent text-sm text-gray-600 dark:text-gray-400">
                  <option>Últimos 6 meses</option>
                  <option>Último ano</option>
                </select>
              </div>
            </div>
            
            {/* Gráfico simplificado */}
            <div className="h-64 flex items-end justify-between gap-2 pt-8">
              {performanceData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex gap-0.5 justify-center" style={{ height: '100%' }}>
                    <div 
                      className="w-1/2 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                      style={{ height: `${data.eficiencia}%` }}
                    />
                    <div 
                      className="w-1/2 bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg"
                      style={{ height: `${data.disponibilidade}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Eficiência</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Disponibilidade</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Insights Recentes</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Ver todos
              </button>
            </div>
            
            <div className="space-y-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.impact === "Crítico" ? "bg-red-100 dark:bg-red-900/20 text-red-600" :
                        insight.impact === "Alto" ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600" :
                        insight.impact === "Médio" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600" :
                        "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{insight.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            insight.impact === "Crítico" ? "bg-red-100 dark:bg-red-900/30 text-red-700" :
                            insight.impact === "Alto" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700" :
                            insight.impact === "Médio" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700" :
                            "bg-blue-100 dark:bg-blue-900/30 text-blue-700"
                          }`}>
                            {insight.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Métricas Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribuição */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Distribuição por Status</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Gráfico de pizza simplificado */}
                <div className="absolute inset-0 rounded-full border-8 border-blue-500" 
                     style={{ clipPath: 'inset(0 50% 0 0)' }} />
                <div className="absolute inset-0 rounded-full border-8 border-green-500" 
                     style={{ clipPath: 'inset(0 0 0 50%)', transform: 'rotate(180deg)' }} />
                <div className="absolute inset-0 rounded-full border-8 border-yellow-500" 
                     style={{ clipPath: 'inset(50% 0 0 0)', transform: 'rotate(90deg)' }} />
                <div className="absolute inset-0 rounded-full border-8 border-red-500" 
                     style={{ clipPath: 'inset(0 0 50% 0)', transform: 'rotate(270deg)' }} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: "Operacional", value: "68%", color: "bg-blue-500" },
                { label: "Manutenção", value: "18%", color: "bg-green-500" },
                { label: "Alerta", value: "10%", color: "bg-yellow-500" },
                { label: "Crítico", value: "4%", color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de Métricas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Métricas Detalhadas</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-transparent text-sm text-gray-600 dark:text-gray-400"
                >
                  <option value="performance">Performance</option>
                  <option value="quality">Qualidade</option>
                  <option value="efficiency">Eficiência</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { metric: "MTBF (Mean Time Between Failures)", current: "2450h", target: "2000h", status: "exceeded" },
                { metric: "MTTR (Mean Time To Repair)", current: "4.2h", target: "6h", status: "achieved" },
                { metric: "OEE (Overall Equipment Effectiveness)", current: "87.5%", target: "85%", status: "exceeded" },
                { metric: "Taxa de Falhas", current: "2.1%", target: "3%", status: "achieved" },
                { metric: "Disponibilidade", current: "99.2%", target: "98%", status: "exceeded" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{item.metric}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Meta: {item.target}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      item.status === "exceeded" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {item.current}
                    </p>
                    <p className={`text-xs ${
                      item.status === "exceeded" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {item.status === "exceeded" ? "Excedida" : "Atingida"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
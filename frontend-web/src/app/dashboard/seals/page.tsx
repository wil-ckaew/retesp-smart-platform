// frontend-web/src/app/seals/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter,
  Download,
  Plus,
  MoreVertical,
  Battery,
  Thermometer,
  Activity,
  MapPin,
  RefreshCw,
  BarChart
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SealsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedSeals, setSelectedSeals] = useState<string[]>([]);

  const seals = [
    { 
      id: "SEL-001", 
      name: "Retentor Principal A", 
      status: "active", 
      temperature: "42°C", 
      vibration: "2.1mm/s", 
      battery: "85%", 
      pressure: "8.5 bar",
      lastCheck: "2 horas atrás",
      location: "Linha A - Posição 3",
      health: 92
    },
    { 
      id: "SEL-002", 
      name: "Retentor Secundário B", 
      status: "warning", 
      temperature: "48°C", 
      vibration: "3.5mm/s", 
      battery: "92%", 
      pressure: "9.2 bar",
      lastCheck: "30 min atrás",
      location: "Linha B - Posição 7",
      health: 76
    },
    { 
      id: "SEL-003", 
      name: "Retentor de Reserva", 
      status: "inactive", 
      temperature: "25°C", 
      vibration: "0.0mm/s", 
      battery: "100%", 
      pressure: "0.0 bar",
      lastCheck: "1 dia atrás",
      location: "Armazém",
      health: 100
    },
    { 
      id: "SEL-004", 
      name: "Retentor de Alta Pressão", 
      status: "active", 
      temperature: "38°C", 
      vibration: "1.8mm/s", 
      battery: "78%", 
      pressure: "12.5 bar",
      lastCheck: "4 horas atrás",
      location: "Linha C - Posição 12",
      health: 88
    },
    { 
      id: "SEL-005", 
      name: "Retentor de Vedação", 
      status: "critical", 
      temperature: "52°C", 
      vibration: "4.2mm/s", 
      battery: "65%", 
      pressure: "7.8 bar",
      lastCheck: "15 min atrás",
      location: "Linha A - Posição 5",
      health: 45
    },
    { 
      id: "SEL-006", 
      name: "Retentor Auxiliar", 
      status: "active", 
      temperature: "40°C", 
      vibration: "2.0mm/s", 
      battery: "88%", 
      pressure: "8.0 bar",
      lastCheck: "3 horas atrás",
      location: "Linha B - Posição 9",
      health: 95
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "warning": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
      case "critical": return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertCircle className="w-4 h-4" />;
      case "critical": return <XCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const filteredSeals = seals.filter(seal => {
    if (filter === "all") return true;
    return seal.status === filter;
  }).filter(seal => 
    seal.name.toLowerCase().includes(search.toLowerCase()) ||
    seal.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedSeals.length === filteredSeals.length) {
      setSelectedSeals([]);
    } else {
      setSelectedSeals(filteredSeals.map(seal => seal.id));
    }
  };

  const handleSelectSeal = (id: string) => {
    setSelectedSeals(prev =>
      prev.includes(id)
        ? prev.filter(sealId => sealId !== id)
        : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciamento de Selos</h2>
            <p className="text-gray-600 dark:text-gray-400">Monitoramento e controle dos retentores industriais</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
              <RefreshCw className="w-5 h-5 mr-2" />
              Atualizar
            </button>
            <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <Plus className="w-5 h-5 mr-2" />
              Novo Selo
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total de Selos", value: "48", color: "text-blue-600", icon: Shield, change: "+2" },
            { label: "Em Operação", value: "36", color: "text-green-600", icon: CheckCircle, change: "+1" },
            { label: "Em Alerta", value: "8", color: "text-yellow-600", icon: AlertCircle, change: "-2" },
            { label: "Críticos", value: "4", color: "text-red-600", icon: XCircle, change: "+1" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')} bg-opacity-20`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar selos por nome ou ID..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "active", "warning", "critical", "inactive"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === filterOption
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {filterOption === "all" ? "Todos" :
                 filterOption === "active" ? "Ativos" :
                 filterOption === "warning" ? "Alerta" :
                 filterOption === "critical" ? "Crítico" : "Inativos"}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        {selectedSeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedSeals.length} selo(s) selecionado(s)
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ações em massa disponíveis</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Manutenção
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Exportar
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                  Desmarcar
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Seals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeals.map((seal, index) => (
            <motion.div
              key={seal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                selectedSeals.includes(seal.id)
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedSeals.includes(seal.id)}
                      onChange={() => handleSelectSeal(seal.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{seal.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(seal.status)}`}>
                          {getStatusIcon(seal.status)}
                          <span className="ml-1 font-medium capitalize">
                            {seal.status === "active" ? "Ativo" :
                             seal.status === "warning" ? "Alerta" :
                             seal.status === "critical" ? "Crítico" : "Inativo"}
                          </span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{seal.id} • {seal.location}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Thermometer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Temperatura</p>
                      <p className={`font-semibold ${seal.temperature > "45" ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
                        {seal.temperature}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Vibração</p>
                      <p className={`font-semibold ${seal.vibration > "3.0" ? "text-yellow-600" : "text-gray-900 dark:text-white"}`}>
                        {seal.vibration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Battery className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Bateria</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{seal.battery}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                      <BarChart className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pressão</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{seal.pressure}</p>
                    </div>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Saúde do Equipamento</span>
                    <span className={`text-sm font-medium ${
                      seal.health >= 80 ? "text-green-600" :
                      seal.health >= 60 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {seal.health}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full ${
                        seal.health >= 80 ? "bg-green-500" :
                        seal.health >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${seal.health}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {seal.location}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {seal.lastCheck}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">
                    Detalhes
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Monitorar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSeals.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nenhum selo encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400">Tente ajustar os filtros ou a busca.</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {filteredSeals.length} de {seals.length} selos
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </button>
            <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
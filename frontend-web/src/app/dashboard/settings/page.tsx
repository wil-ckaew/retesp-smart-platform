// frontend-web/src/app/settings/page.tsx
"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Users, 
  Wifi,
  Save,
  Moon,
  Sun,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  Key,
  Globe,
  Clock,
  Mail,
  User,
  Eye,
  EyeOff,
  Server,
  Cloud,
  Cpu,
  Activity,
  LogOut,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true,
    reports: false,
    updates: true,
    maintenance: true
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30",
    loginAlerts: true,
    ipWhitelist: false
  });

  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupInterval: "daily",
    retention: "30",
    exportFormat: "csv",
    compressBackups: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoUpdate: true,
    performanceMode: false,
    debugMode: false,
    logLevel: "info"
  });

  const [profile, setProfile] = useState({
    name: "Administrador",
    email: "admin@retesp.com",
    role: "Super Admin",
    language: "pt-BR",
    timezone: "America/Sao_Paulo"
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSecurityChange = (key: keyof typeof security, value: string | boolean) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataSettingChange = (key: keyof typeof dataSettings, value: string | boolean) => {
    setDataSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSystemSettingChange = (key: keyof typeof systemSettings, value: string | boolean) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleProfileChange = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    { id: "general", label: "Geral", icon: Settings },
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "data", label: "Dados", icon: Database },
    { id: "system", label: "Sistema", icon: Server },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações do Sistema</h2>
            <p className="text-gray-600 dark:text-gray-400">Personalize e gerencie as configurações da plataforma</p>
          </div>
          <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <Save className="w-5 h-5 mr-2" />
            Salvar Alterações
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* General Settings */}
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configurações Gerais</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Preferências do sistema</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Tema da Interface</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Escolha entre tema claro ou escuro</p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium"
                      >
                        {theme === 'dark' ? (
                          <>
                            <Moon className="w-4 h-4" />
                            <span>Escuro</span>
                          </>
                        ) : (
                          <>
                            <Sun className="w-4 h-4" />
                            <span>Claro</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Idioma</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Selecione o idioma da interface</p>
                      </div>
                      <select 
                        value={profile.language}
                        onChange={(e) => handleProfileChange("language", e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Fuso Horário</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Defina o fuso horário do sistema</p>
                      </div>
                      <select 
                        value={profile.timezone}
                        onChange={(e) => handleProfileChange("timezone", e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* System Preferences */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferências do Sistema</h3>
                  <div className="space-y-3">
                    {Object.entries(systemSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {key === 'autoUpdate' ? 'Atualizações Automáticas' :
                             key === 'performanceMode' ? 'Modo Performance' :
                             key === 'debugMode' ? 'Modo Debug' : 'Nível de Log'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {key === 'autoUpdate' ? 'Instalar atualizações automaticamente' :
                             key === 'performanceMode' ? 'Otimizar para melhor performance' :
                             key === 'debugMode' ? 'Habilitar logs detalhados' : 'Definir nível de log do sistema'}
                          </p>
                        </div>
                        {typeof value === 'boolean' ? (
                          <button
                            onClick={() => handleSystemSettingChange(key as keyof typeof systemSettings, !value)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                              value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              value ? 'left-7' : 'left-1'
                            }`} />
                          </button>
                        ) : (
                          <select
                            value={value}
                            onChange={(e) => handleSystemSettingChange(key as keyof typeof systemSettings, e.target.value)}
                            className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            <option value="debug">Debug</option>
                            <option value="info">Info</option>
                            <option value="warn">Warn</option>
                            <option value="error">Error</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Perfil do Usuário</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Gerencie suas informações pessoais</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {profile.name.charAt(0)}
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium">
                          Alterar Foto
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">JPG, PNG ou GIF. Máx. 5MB</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleProfileChange("name", e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleProfileChange("email", e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cargo/Função
                        </label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) => handleProfileChange("role", e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          placeholder="+55 (11) 99999-9999"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Biografia
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Descreva sua função na empresa..."
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Alterar Senha</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Senha Atual
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nova Senha
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirmar Nova Senha
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <button className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium">
                      Alterar Senha
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notificações</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Configure suas preferências de notificação</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {key === 'email' ? 'Notificações por Email' :
                           key === 'push' ? 'Notificações Push' :
                           key === 'alerts' ? 'Alertas em Tempo Real' :
                           key === 'reports' ? 'Relatórios Automáticos' :
                           key === 'updates' ? 'Atualizações do Sistema' : 'Alertas de Manutenção'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'email' ? 'Receba notificações por email' :
                           key === 'push' ? 'Notificações no navegador' :
                           key === 'alerts' ? 'Alertas instantâneos do sistema' :
                           key === 'reports' ? 'Relatórios periódicos enviados por email' :
                           key === 'updates' ? 'Notificações sobre novas funcionalidades' : 'Alertas de manutenção agendada'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          value ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Notification Channels */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Canais de Notificação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Email</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Notificações por email</p>
                      <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                      />
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Bell className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Push</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Notificações no navegador</p>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Ativo • 2 dispositivos
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Webhook</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Integrações externas</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Configurar Webhook
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Segurança</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Configurações de segurança e acesso</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Two Factor Auth */}
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Autenticação em Dois Fatores</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Adicione uma camada extra de segurança</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSecurityChange("twoFactor", !security.twoFactor)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            security.twoFactor ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            security.twoFactor ? 'left-7' : 'left-1'
                          }`} />
                        </button>
                      </div>
                      {security.twoFactor && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-sm text-green-700 dark:text-green-400">
                            ✅ 2FA está ativo. Configurado com app autenticador.
                          </p>
                          <button className="text-sm text-green-700 dark:text-green-400 hover:underline mt-2">
                            Gerenciar dispositivos
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Session Timeout */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Timeout de Sessão</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tempo de inatividade antes do logout</p>
                      </div>
                      <select
                        value={security.sessionTimeout}
                        onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="120">2 horas</option>
                      </select>
                    </div>

                    {/* Login Alerts */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Alertas de Login</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notificar sobre logins suspeitos</p>
                      </div>
                      <button
                        onClick={() => handleSecurityChange("loginAlerts", !security.loginAlerts)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          security.loginAlerts ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          security.loginAlerts ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    {/* IP Whitelist */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Whitelist de IP</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Restringir acesso a IPs específicos</p>
                      </div>
                      <button
                        onClick={() => handleSecurityChange("ipWhitelist", !security.ipWhitelist)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          security.ipWhitelist ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          security.ipWhitelist ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sessões Ativas</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Gerencie suas sessões ativas</p>
                    </div>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Ver todas
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { device: "Chrome • Windows", location: "São Paulo, BR", time: "Agora", current: true },
                      { device: "Firefox • MacOS", location: "São Paulo, BR", time: "2 horas atrás", current: false },
                      { device: "Mobile • iOS", location: "Rio de Janeiro, BR", time: "1 dia atrás", current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{session.location} • {session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current && (
                            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                              Atual
                            </span>
                          )}
                          <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                            Encerrar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Data Settings */}
            {activeTab === "data" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciamento de Dados</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Configurações de backup e exportação</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Backup Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Backup Automático</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Criar backups automáticos do sistema</p>
                      </div>
                      <button
                        onClick={() => handleDataSettingChange("autoBackup", !dataSettings.autoBackup)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          dataSettings.autoBackup ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          dataSettings.autoBackup ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    {dataSettings.autoBackup && (
                      <div className="ml-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Intervalo</span>
                          <select
                            value={dataSettings.backupInterval}
                            onChange={(e) => handleDataSettingChange("backupInterval", e.target.value)}
                            className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                          >
                            <option value="hourly">A cada hora</option>
                            <option value="daily">Diariamente</option>
                            <option value="weekly">Semanalmente</option>
                            <option value="monthly">Mensalmente</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Retenção (dias)</span>
                          <input
                            type="number"
                            value={dataSettings.retention}
                            onChange={(e) => handleDataSettingChange("retention", e.target.value)}
                            className="w-24 px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Comprimir Backups</span>
                          <button
                            onClick={() => handleDataSettingChange("compressBackups", !dataSettings.compressBackups)}
                            className={`w-10 h-5 rounded-full transition-colors relative ${
                              dataSettings.compressBackups ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                              dataSettings.compressBackups ? 'left-6' : 'left-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Export Settings */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Formato de Exportação</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Formato padrão para exportação de dados</p>
                    </div>
                    <select
                      value={dataSettings.exportFormat}
                      onChange={(e) => handleDataSettingChange("exportFormat", e.target.value)}
                      className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                      <option value="excel">Excel</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>

                  {/* Export Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                      <Download className="w-5 h-5" />
                      Exportar Dados
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                      <Upload className="w-5 h-5" />
                      Importar Dados
                    </button>
                  </div>

                  {/* Data Retention */}
                  <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">Política de Retenção de Dados</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Dados antigos são automaticamente excluídos após 90 dias para otimizar o armazenamento.
                        </p>
                        <button className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline mt-2">
                          Configurar retenção
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Server className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sistema</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Configurações avançadas do sistema</p>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Versão</p>
                      <p className="font-medium text-gray-900 dark:text-white">v2.5.1</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Última Atualização</p>
                      <p className="font-medium text-gray-900 dark:text-white">2024-01-15</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Licença</p>
                      <p className="font-medium text-gray-900 dark:text-white">Enterprise</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium text-gray-900 dark:text-white">Online</span>
                      </div>
                    </div>
                  </div>

                  {/* System Actions */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ações do Sistema</h4>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Reiniciar Serviços</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reinicie todos os serviços do sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600 dark:text-blue-400">Executar</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Limpar Cache</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Limpar dados temporários do sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 dark:text-green-400">Executar</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Verificar Integridade</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Verificar saúde e integridade do sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-purple-600 dark:text-purple-400">Executar</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Cloud className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Backup Manual</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Criar backup manual do sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-orange-600 dark:text-orange-400">Executar</span>
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Zona de Perigo</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Ações irreversíveis. Proceda com cautela.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Redefinir Configurações</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Restaurar todas as configurações padrão</p>
                        </div>
                      </div>
                      <span className="text-sm text-red-600 dark:text-red-400">Redefinir</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Limpar Todos os Dados</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Excluir todos os dados do sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-red-600 dark:text-red-400">Limpar</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Desativar Sistema</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Desativar completamente o sistema</p>
                        </div>
                      </div>
                      <span className="text-sm text-red-600 dark:text-red-400">Desativar</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
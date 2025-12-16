// frontend-web/src/components/layout/AppLayout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { 
  Sun, 
  Moon, 
  Menu, 
  Home, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Bell, 
  User,
  Search,
  ChevronDown,
  HelpCircle,
  Download,
  Upload,
  Wifi,
  Battery,
  Activity,
  X,
  MapPin,
  AlertCircle,
  LineChart,
  Database,
  Shield
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Chatbot } from "@/components/chatbot/Chatbot";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  description?: string;
  subItems?: { name: string; href: string }[];
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation: NavItem[] = [
    { 
      name: "Página Inicial", 
      href: "/", 
      icon: Home,
      description: "Voltar para a página inicial"
    },
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
      description: "Visão geral do sistema"
    },
    { 
      name: "Monitoramento", 
      href: "/monitoring", 
      icon: Activity,
      badge: 3,
      description: "Sensores em tempo real",
      subItems: [
        { name: "Mapa de Sensores", href: "/monitoring/map" },
        { name: "Temperatura", href: "/monitoring/temperature" },
        { name: "Vibração", href: "/monitoring/vibration" },
      ]
    },
    { 
      name: "Selos", 
      href: "/seals", 
      icon: Shield,
      description: "Gerenciar retentores"
    },
    { 
      name: "Alertas", 
      href: "/alerts", 
      icon: AlertCircle,
      badge: 5,
      description: "Notificações do sistema"
    },
    { 
      name: "Analytics", 
      href: "/analytics", 
      icon: BarChart3,
      description: "Análises preditivas"
    },
    { 
      name: "Configurações", 
      href: "/settings", 
      icon: Settings,
      description: "Configurar sistema"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getPageTitle = () => {
    if (pathname === "/") return "RETESP Smart Platform";
    if (pathname === "/dashboard") return "Dashboard Principal";
    if (pathname === "/seals") return "Gerenciamento de Selos";
    if (pathname === "/alerts") return "Alertas do Sistema";
    if (pathname === "/settings") return "Configurações";
    
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      {/* Top Navigation Bar - VISÍVEL EM TODAS AS PÁGINAS */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-800/30"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Left: Logo & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button - Hamburger Moderno */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                aria-label="Abrir menu"
              >
                <div className="space-y-1.5">
                  <span className={cn(
                    "block h-0.5 w-6 transition-all duration-300 rounded-full",
                    "bg-gray-700 dark:bg-gray-300",
                    "group-hover:bg-blue-600 dark:group-hover:bg-blue-400"
                  )} />
                  <span className={cn(
                    "block h-0.5 w-5 transition-all duration-300 rounded-full ml-auto",
                    "bg-gray-700 dark:bg-gray-300",
                    "group-hover:bg-blue-600 dark:group-hover:bg-blue-400",
                    "group-hover:w-6"
                  )} />
                  <span className={cn(
                    "block h-0.5 w-4 transition-all duration-300 rounded-full",
                    "bg-gray-700 dark:bg-gray-300",
                    "group-hover:bg-blue-600 dark:group-hover:bg-blue-400",
                    "group-hover:w-6"
                  )} />
                </div>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Image 
                      src="/imagens/retesp.png" 
                      alt="RETESP" 
                      width={32} 
                      height={32}
                      className="lg:w-8 lg:h-8"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl lg:text-2xl font-bold gradient-text">
                      RETESP
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      AI v2.0
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Smart Seal Platform</p>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.name)}
                  onMouseLeave={() => setTimeout(() => setActiveDropdown(null), 150)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronDown className="w-4 h-4 ml-1 opacity-60 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors group/subitem"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover/subitem:scale-125 transition-transform"></div>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions & User */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                  5
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                aria-label="Alternar tema"
              >
                <Sun className="w-5 h-5 text-yellow-500 dark:hidden group-hover:rotate-45 transition-transform" />
                <Moon className="w-5 h-5 text-blue-400 hidden dark:inline group-hover:rotate-12 transition-transform" />
              </button>

              {/* User Profile */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-t border-gray-200/30 dark:border-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center space-x-6 overflow-x-auto scrollbar-thin">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">Sistema Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">24/7 Power</span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">50 Sensores Ativos</span>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                {new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumb & Page Title */}
        <div className="mb-6 lg:mb-8 animate-fade-in">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            {pathname !== "/" && pathname.split('/').filter(Boolean).map((segment, index, array) => (
              <div key={segment} className="flex items-center">
                <ChevronDown className="w-4 h-4 rotate-270 mx-2" />
                <Link
                  href={`/${array.slice(0, index + 1).join('/')}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
                >
                  {segment.replace(/-/g, ' ')}
                </Link>
              </div>
            ))}
          </nav>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {pathname === "/" && "Monitoramento inteligente em tempo real dos seus retentores industriais"}
                {pathname === "/dashboard" && "Visão geral do sistema e métricas em tempo real"}
                {pathname === "/seals" && "Gerenciamento e monitoramento de selos industriais"}
                {pathname === "/alerts" && "Alertas e notificações do sistema"}
                {pathname === "/settings" && "Configurações do sistema e preferências"}
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              {pathname !== "/" && (
                <>
                  <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Exportar
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <HelpCircle className="w-4 h-4 inline mr-2" />
                    Ajuda
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        isActive={isActive}
      />

      {/* Chatbot Integration */}
      <Chatbot />

      {/* Floating Search Button for Mobile */}
      <button className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300">
        <Search className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

// MobileMenu Component
function MobileMenu({ isOpen, onClose, navigation, isActive }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">R</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">RETESP</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Menu</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Profile */}
              <div className="mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">Administrador</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">admin@retesp.com</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigation.map((item: any) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center p-3 rounded-xl ${
                        isActive(item.href)
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                    
                    {/* Sub-items */}
                    {item.subItems && isActive(item.href) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem: any) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={onClose}
                            className="flex items-center p-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Download, label: "Exportar", color: "text-blue-600" },
                    { icon: Upload, label: "Importar", color: "text-green-600" },
                    { icon: Settings, label: "Config", color: "text-purple-600" },
                    { icon: HelpCircle, label: "Ajuda", color: "text-orange-600" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={onClose}
                      className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <action.icon className={`w-5 h-5 ${action.color} mb-1`} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
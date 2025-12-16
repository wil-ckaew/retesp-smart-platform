// frontend-web/src/components/layout/DashboardLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { 
  Sun, 
  Moon, 
  Menu, 
  X,
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Bell, 
  User,
  Shield,
  AlertCircle,
  Database,
  Activity,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Chatbot } from "@/components/chatbot/Chatbot";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Monitoramento", href: "/dashboard/monitoring", icon: Activity },
    { name: "Selos", href: "/dashboard/seals", icon: Shield },
    { name: "Alertas", href: "/dashboard/alerts", icon: AlertCircle, badge: 5 },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    // Lógica de logout aqui
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30",
        collapsed ? "lg:w-20" : "lg:w-64"
      )}>
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                {collapsed ? (
                  <span className="text-white font-bold text-lg">R</span>
                ) : (
                  <Image 
                    src="/imagens/retesp.png" 
                    alt="RETESP" 
                    width={28} 
                    height={28}
                    className="rounded-md"
                    priority
                  />
                )}
              </div>
            </div>
            {!collapsed && (
              <div className="overflow-hidden transition-all duration-300">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                  RETESP
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Smart Seal Platform</p>
              </div>
            )}
          </Link>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow z-40"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive(item.href)
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300",
                collapsed ? "justify-center p-3" : "px-3 py-2.5"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn("flex-shrink-0", collapsed ? "w-5 h-5" : "w-5 h-5 mr-3")} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.name}</span>
              )}
              {!collapsed && item.badge && (
                <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User & Theme */}
        <div className={cn(
          "p-4 border-t border-gray-200 dark:border-gray-700",
          collapsed ? "flex flex-col items-center space-y-4" : ""
        )}>
          <div className={cn(
            "flex items-center justify-between",
            collapsed ? "flex-col space-y-3" : ""
          )}>
            <div className={cn(
              "flex items-center",
              collapsed ? "flex-col" : "space-x-3"
            )}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Administrador</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-2 lg:mt-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
                title="Alternar tema"
              >
                {theme === 'dark' ? 
                  <Sun className="w-5 h-5 text-yellow-500" /> : 
                  <Moon className="w-5 h-5 text-gray-600" />
                }
              </button>
              
              {!collapsed && (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "min-h-screen transition-all duration-300",
        collapsed ? "lg:pl-20" : "lg:pl-64"
      )}>
        {/* Top Header - Apenas em mobile */}
        <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">R</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {navigation.find(nav => isActive(nav.href))?.name || "Dashboard"}
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  {theme === 'dark' ? 
                    <Sun className="w-5 h-5 text-yellow-500" /> : 
                    <Moon className="w-5 h-5 text-gray-600" />
                  }
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="py-4 lg:py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Image 
                        src="/imagens/retesp.png" 
                        alt="RETESP" 
                        width={28} 
                        height={28}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        RETESP
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Smart Seal Platform</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
                
                {/* User Info Mobile */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Administrador</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@retesp.com</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
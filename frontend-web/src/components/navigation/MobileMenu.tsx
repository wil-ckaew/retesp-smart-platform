// src/components/navigation/MobileMenu.tsx
"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  Home, 
  Search, 
  Settings, 
  HelpCircle,
  Bell,
  User,
  ChevronRight,
  Zap,
  Battery,
  Wifi
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: any[];
  isActive: (href: string) => boolean;
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-gray-900 to-purple-900/20" />
                  
                  {/* Content */}
                  <div className="flex h-full flex-col overflow-y-auto bg-white/10 backdrop-blur-xl shadow-2xl">
                    
                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <Image 
                              src="/imagens/retesp.png" 
                              alt="RETESP" 
                              width={32} 
                              height={32}
                            />
                          </div>
                          <div>
                            <Dialog.Title className="text-xl font-bold text-white">
                              RETESP
                            </Dialog.Title>
                            <p className="text-sm text-blue-200">Smart Seal Platform</p>
                          </div>
                        </div>
                        <button
                          onClick={onClose}
                          className="rounded-full p-2 hover:bg-white/10 transition-colors"
                        >
                          <X className="h-6 w-6 text-white" />
                        </button>
                      </div>

                      {/* User Profile */}
                      <div className="mt-6 flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">Administrador</p>
                          <p className="text-sm text-blue-200">admin@retesp.com</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="px-6 py-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                        <input
                          type="text"
                          placeholder="Buscar no sistema..."
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 pb-4">
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href="/"
                            onClick={onClose}
                            className="flex items-center px-4 py-3.5 rounded-xl text-white hover:bg-white/10 transition-colors group"
                          >
                            <Home className="w-5 h-5 mr-3 text-blue-300" />
                            <span className="font-medium">Página Inicial</span>
                            <ChevronRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                        
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center px-4 py-3.5 rounded-xl text-white hover:bg-white/10 transition-colors group"
                            >
                              <item.icon className="w-5 h-5 mr-3 text-blue-300" />
                              <div className="flex-1">
                                <span className="font-medium">{item.name}</span>
                                {item.description && (
                                  <p className="text-xs text-blue-200 mt-0.5">{item.description}</p>
                                )}
                              </div>
                              {item.badge && (
                                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* System Status */}
                    <div className="p-4 border-t border-white/10">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-green-400" />
                            <span className="text-blue-200">Status do Sistema</span>
                          </div>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Online
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                            <Wifi className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-xs text-blue-200">Conectados</p>
                              <p className="text-sm font-semibold text-white">50</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                            <Battery className="w-4 h-4 text-green-400" />
                            <div>
                              <p className="text-xs text-blue-200">Uptime</p>
                              <p className="text-sm font-semibold text-white">99.9%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: Bell, label: "Alertas", count: 5 },
                          { icon: Settings, label: "Config" },
                          { icon: HelpCircle, label: "Ajuda" },
                        ].map((action) => (
                          <button
                            key={action.label}
                            onClick={onClose}
                            className="flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <action.icon className="w-5 h-5 text-blue-300 mb-1" />
                            <span className="text-xs text-blue-200">{action.label}</span>
                            {action.count && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {action.count}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
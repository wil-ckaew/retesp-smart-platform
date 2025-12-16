// src/components/layout/MobileNav.tsx
"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileNavProps {
  navigation: any[];
  isActive: (href: string) => boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function MobileNav({ 
  navigation, 
  isActive, 
  sidebarOpen, 
  setSidebarOpen 
}: MobileNavProps) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image 
                      src="/imagens/retesp.png" 
                      alt="RETESP" 
                      width={40} 
                      height={40}
                      className="rounded-lg"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      RETESP
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-md p-2 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        <li>
                          <Link
                            href="/"
                            className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                              isActive("/")
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <Home className="h-5 w-5" />
                            Página Inicial
                          </Link>
                        </li>
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                                isActive(item.href)
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon className="h-5 w-5" />
                              {item.name}
                              {item.badge && (
                                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
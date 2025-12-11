"use client";

import Link from "next/link";

export default function SettingsIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-sm text-gray-500">Gerencie perfil, empresa, notificações e integrações</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/settings/profile" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
          <h3 className="font-medium">Perfil</h3>
          <p className="text-sm text-gray-500 mt-2">Informações do usuário e senha</p>
        </Link>

        <Link href="/dashboard/settings/company" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
          <h3 className="font-medium">Empresa</h3>
          <p className="text-sm text-gray-500 mt-2">Dados da conta e cobrança</p>
        </Link>

        <Link href="/dashboard/settings/notifications" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
          <h3 className="font-medium">Notificações</h3>
          <p className="text-sm text-gray-500 mt-2">Preferências de envio e alertas</p>
        </Link>

        <Link href="/dashboard/settings/integrations" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
          <h3 className="font-medium">Integrações</h3>
          <p className="text-sm text-gray-500 mt-2">API keys, webhooks e integrações</p>
        </Link>
      </div>
    </div>
  );
}

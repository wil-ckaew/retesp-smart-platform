"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NotificationsSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: salvar via API
    toast.success("Preferências de notificação salvas");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Notificações</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium">Notificações por email</label>
            <p className="text-xs text-gray-500">Receber alertas e relatórios por email</p>
          </div>
          <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium">Notificações por SMS</label>
            <p className="text-xs text-gray-500">Enviar SMS em alertas críticos</p>
          </div>
          <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} className="w-5 h-5" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Webhook (para integrações)</label>
          <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://seu-servico.com/webhook" className="w-full px-3 py-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Receba eventos em tempo real via webhook</p>
        </div>

        <div className="flex justify-end gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Salvar Preferências</button>
        </div>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Eye, Pencil, BellRing } from "lucide-react";

interface AlertItem {
  id: string;
  seal_number: string;
  level: string;
  message: string;
  created_at: string;
}

export default function AlertsTable({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-3">Selo</th>
            <th className="p-3">Nível</th>
            <th className="p-3">Mensagem</th>
            <th className="p-3">Criado em</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{alert.seal_number}</td>
              <td className="p-3">{alert.level}</td>
              <td className="p-3">{alert.message}</td>
              <td className="p-3">{alert.created_at}</td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href={`/dashboard/alerts/${alert.id}`}
                    className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/dashboard/alerts/${alert.id}/edit`}
                    className="p-2 rounded hover:bg-yellow-100 text-yellow-600"
                  >
                    <Pencil size={18} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

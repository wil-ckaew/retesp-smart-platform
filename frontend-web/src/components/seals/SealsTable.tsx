"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Seal {
  id: string;
  number: string;
  status: string;
  temperature: number;
  vibration: number;
  last_update: string;
}

export default function SealsTable({ seals }: { seals: Seal[] }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-3">Selo</th>
            <th className="p-3">Status</th>
            <th className="p-3">Temperatura</th>
            <th className="p-3">Vibração</th>
            <th className="p-3">Última Atualização</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {seals.map((seal) => (
            <tr key={seal.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{seal.number}</td>
              <td className="p-3">{seal.status}</td>
              <td className="p-3">{seal.temperature} °C</td>
              <td className="p-3">{seal.vibration} mm/s</td>
              <td className="p-3">{seal.last_update}</td>
              <td className="p-3 text-center flex items-center justify-center gap-3">
                <Link
                  href={`/dashboard/seals/${seal.id}/edit`}
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                >
                  <Pencil size={18} />
                </Link>
                <button className="p-2 rounded hover:bg-red-100 text-red-600">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

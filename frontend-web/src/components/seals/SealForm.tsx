"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SealFormProps {
  initialData?: {
    number: string;
    status: string;
    temperature: number;
    vibration: number;
  };
  submitLabel: string;
  onSubmit: (data: any) => Promise<void>;
}

export default function SealForm({ initialData, submitLabel, onSubmit }: SealFormProps) {
  const router = useRouter();

  const [number, setNumber] = useState(initialData?.number || "");
  const [status, setStatus] = useState(initialData?.status || "Ativo");
  const [temperature, setTemperature] = useState(initialData?.temperature || 0);
  const [vibration, setVibration] = useState(initialData?.vibration || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ number, status, temperature, vibration });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Número do Selo</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option>Ativo</option>
          <option>Manutenção</option>
          <option>Alerta</option>
          <option>Crítico</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Temperatura (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Vibração (mm/s)</label>
        <input
          type="number"
          value={vibration}
          onChange={(e) => setVibration(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </motion.form>
  );
}

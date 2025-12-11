"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface AlertFormProps {
  initialData?: {
    seal_number: string;
    level: string;
    message: string;
  };
  submitLabel: string;
  onSubmit: (data: any) => Promise<void>;
}

export default function AlertForm({ initialData, submitLabel, onSubmit }: AlertFormProps) {
  const router = useRouter();

  const [sealNumber, setSealNumber] = useState(initialData?.seal_number || "");
  const [level, setLevel] = useState(initialData?.level || "Baixo");
  const [message, setMessage] = useState(initialData?.message || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ seal_number: sealNumber, level, message });
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
          required
          value={sealNumber}
          onChange={(e) => setSealNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nível</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option>Baixo</option>
          <option>Médio</option>
          <option>Alto</option>
          <option>Crítico</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mensagem</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.back()}
          type="button"
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

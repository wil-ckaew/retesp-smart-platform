"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CompanySettings() {
  const [companyName, setCompanyName] = useState("RETESP Indústria");
  const [companyCode, setCompanyCode] = useState("RETS-001");
  const [country, setCountry] = useState("BR");
  const [contactEmail, setContactEmail] = useState("contato@retesp.com");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar backend
    toast.success("Dados da empresa salvos");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Empresa</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da empresa</label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Código</label>
          <input value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">País</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email de contato</label>
            <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Salvar</button>
        </div>
      </form>
    </div>
  );
}

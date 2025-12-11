"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfileSettings() {
  const [name, setName] = useState("Admin RETESP");
  const [email, setEmail] = useState("admin@retesp.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: enviar para backend
    toast.success("Perfil atualizado com sucesso");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Meu Perfil</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Senha atual</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nova senha</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 border rounded-lg">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Salvar</button>
        </div>
      </form>
    </div>
  );
}

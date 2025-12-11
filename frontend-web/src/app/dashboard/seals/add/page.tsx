"use client";

import SealForm from "@/components/seals/SealForm";

export default function AddSealPage() {
  const handleCreate = async (data: any) => {
    console.log("Criando selo:", data);
    // TODO: integração backend
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Adicionar Selo</h1>
      <SealForm submitLabel="Criar Selo" onSubmit={handleCreate} />
    </div>
  );
}

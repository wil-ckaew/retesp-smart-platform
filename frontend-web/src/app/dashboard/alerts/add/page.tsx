"use client";

import AlertForm from "@/components/alerts/AlertForm";

export default function AddAlertPage() {
  const handleCreate = async (data: any) => {
    console.log("Criando alerta:", data);
    // TODO: conectar ao backend
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar Alerta</h1>
      <AlertForm submitLabel="Criar Alerta" onSubmit={handleCreate} />
    </div>
  );
}

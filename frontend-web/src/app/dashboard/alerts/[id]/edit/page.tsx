"use client";

import AlertForm from "@/components/alerts/AlertForm";

export default function EditAlertPage({ params }: { params: { id: string } }) {
  const mockData = {
    seal_number: "SEL-002",
    level: "Alto",
    message: "Oscilação detectada",
  };

  const handleUpdate = async (data: any) => {
    console.log("Atualizando alerta:", params.id, data);
    // TODO: backend
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Alerta</h1>
      <AlertForm initialData={mockData} submitLabel="Salvar Alterações" onSubmit={handleUpdate} />
    </div>
  );
}

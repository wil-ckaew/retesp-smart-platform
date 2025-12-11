"use client";

import SealForm from "@/components/seals/SealForm";

export default function EditSealPage({ params }: { params: { id: string } }) {
  const mockData = {
    number: "SEL-001",
    status: "Ativo",
    temperature: 60,
    vibration: 4,
  };

  const handleUpdate = async (data: any) => {
    console.log("Atualizando selo:", params.id, data);
    // TODO: integração backend
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Selo: {params.id}</h1>
      <SealForm initialData={mockData} submitLabel="Salvar Alterações" onSubmit={handleUpdate} />
    </div>
  );
}

"use client";

export default function ViewAlert({ params }: { params: { id: string } }) {
  const mockAlert = {
    seal_number: "SEL-002",
    level: "Crítico",
    message: "Temperatura acima do limite máximo!",
    created_at: "2025-01-12 10:32",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Alerta #{params.id}</h1>

      <p><b>Selo:</b> {mockAlert.seal_number}</p>
      <p><b>Nível:</b> {mockAlert.level}</p>
      <p><b>Mensagem:</b> {mockAlert.message}</p>
      <p><b>Criado em:</b> {mockAlert.created_at}</p>
    </div>
  );
}

"use client";

export default function SettingsCard({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h4 className="font-medium">{title}</h4>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

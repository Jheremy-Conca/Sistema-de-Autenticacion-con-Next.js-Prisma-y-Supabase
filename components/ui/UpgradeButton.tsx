"use client";

import { useState } from "react";

interface UpgradeButtonProps {
  role: string; // Rol actual del usuario
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ role }) => {
  const [currentRole, setCurrentRole] = useState<string>(role);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/user/upgrade", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        const newRole = data.newRole;
        setCurrentRole(newRole);
        alert(`✅ Tu rol ha sido actualizado a ${newRole.toUpperCase()}. Vuelve a inicar sesion para ver cambios`);
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (error) {
      alert(`❌ Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={handleRoleChange}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold transition border-2 ${
          currentRole === "admin"
            ? "text-black bg-white border-gray-500 hover:bg-gray-300"
            : "text-white bg-black border-gray-700 hover:bg-gray-800"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Cambiando rol..." : currentRole === "admin" ? "Volver a User" : "Convertirse en Admin"}
      </button>
    </div>
  );
};

export default UpgradeButton;

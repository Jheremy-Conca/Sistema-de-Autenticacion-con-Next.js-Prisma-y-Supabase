import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Homepage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <div className="p-10 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Página Principal</h1>
        <p className="text-lg text-gray-300 mb-6">
          Explora nuestra plataforma con un diseño elegante y moderno.
        </p>
        
        {/* Botón para ir al login */}
        <Link href="/login">
          <Button className="mt-4 bg-gradient-to-r from-gray-700 to-black text-white hover:from-black hover:to-gray-700">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

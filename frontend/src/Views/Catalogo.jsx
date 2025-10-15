import React, { useState } from "react";
import Card from "../components/Card";
import autos from "../data/autos";


const Catalogo = () => {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado automático por marca o modelo
  const autosFiltrados = autos.filter(
    (auto) =>
      auto.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      auto.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w-full mx-auto mt-20 p-4 flex flex-col min-h-screen">
        <h2 className="flex justify-center font-bold text-2xl">Catálogo de autos en stock</h2>
        <h3 className="flex justify-center text-md mb-6">Encuentra el auto perfecto para ti</h3>
        <div>
            <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            className="mb-6 p-2 border border-gray-300 rounded w-full md:w-1/2 mx-auto"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
        
        <section className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md w-full">
            <select className="p-2 border border-gray-300 rounded bg-white">
                <option value="">Marca</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
            </select>
            <select className="p-2 border border-gray-300 rounded bg-white">
                <option value="">Modelo</option>
                <option value="civic">Civic</option>
                <option value="corolla">Corolla</option>
            </select>
            <select className="p-2 border border-gray-300 rounded bg-white">
                <option value="">Año</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </select>
            <select className="p-2 border border-gray-300 rounded bg-white">
                <option value="">Precio</option>
                <option value="10000">10,000</option>
                <option value="20000">20,000</option>
            </select>
            <select className="p-2 border border-gray-300 rounded bg-white font-bold">
                <option value="">Kilometraje</option>
                <option value="0-10000">0-10,000</option>
                <option value="10001-20000">10,001-20,000</option>
            </select>
        </section>
        <h3 className="mt-3">Ordenar por</h3>
        <div className="flex row justify-evenly gap-2 m-4">
                
                <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Precio
                </button>
                <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    KM 
                </button>
            </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {autosFiltrados.map((auto) => (
                <Card key={auto.id} auto={auto} />
            ))}
        </div>
    </div>
  );
};

export default Catalogo;

import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Catalogo = () => {
  const [autos, setAutos] = useState([]); // Estado para guardar los autos de la API
  const [busqueda, setBusqueda] = useState("");

  // useEffect se ejecuta cuando el componente se monta por primera vez
  useEffect(() => {
    // Hacemos la llamada a la API del backend
    fetch("http://localhost:4002/vehicles")
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        return response.json();
      })
      .then(data => {
        setAutos(data); // Guardamos los datos recibidos en el estado
      })
      .catch(error => {
        console.error("Error al obtener los vehículos:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  }, []); // El array vacío `[]` significa que este efecto se ejecuta solo una vez

  // El resto de la lógica de filtrado funciona igual, pero con los datos del estado
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
        
        {/* Aquí puedes mantener tus filtros estáticos o conectarlos a la API en el futuro */}
        <section className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md w-full">
            {/* ... tus selects de filtros ... */}
        </section>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {autosFiltrados.length > 0 ? (
                autosFiltrados.map((auto) => (
                    <Card key={auto.idVehiculo} auto={auto} /> // Asegúrate de que la key sea única
                ))
            ) : (
                <p>Cargando vehículos o no se encontraron resultados...</p>
            )}
        </div>
    </div>
    );
}
export default Catalogo;
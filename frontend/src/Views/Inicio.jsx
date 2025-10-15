import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    // Hacemos la llamada a la API para obtener todos los vehículos
    fetch("http://localhost:4002/vehicles")
      .then(res => res.json())
      .then(data => {
        // Tomamos solo los primeros 3 como destacados
        setFeaturedCars(data.slice(0, 3));
      })
      .catch(error => console.error("Error al cargar los autos destacados:", error));
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-24">
      <div className="flex flex-col justify-center items-center h-[350px] bg-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center drop-shadow">
          Experimenta el Futuro de la Conducción
        </h1>
        <p className="text-lg max-w-xl text-gray-700 text-center">
          Descubre una selección de vehículos premium, meticulosamente diseñados para rendimiento y lujo.
        </p>
      </div>

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Autos Destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <div key={car.idVehiculo} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              {/* Asumimos que la imagen no viene en el JSON, la consigna pide cargarla por separado */}
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center">Imagen no disponible</div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{car.marca} {car.modelo} {car.anio}</h3>
                <p className="text-gray-500 mb-4">KM: {car.kilometraje.toLocaleString()}</p>
                <Link
                  to={`/catalogo/${car.idVehiculo}`}
                  className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Ver Más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
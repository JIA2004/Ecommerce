import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function AutoDetalle() {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    // Hacemos un fetch para obtener los detalles del vehículo específico por su ID
    fetch(`http://localhost:4002/vehicles/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Vehículo no encontrado');
        }
        return res.json();
      })
      .then(data => setAuto(data))
      .catch(error => {
        console.error("Error al obtener detalle del vehículo:", error);
        setAuto(null); // Limpiamos el estado en caso de error
      });
  }, [id]); // El efecto se vuelve a ejecutar si el ID en la URL cambia

  if (!auto) {
    return <div className="p-8 mt-20 text-center">Cargando o vehículo no encontrado...</div>;
  }

  const sinStock = !auto.stock || auto.stock <= 0;

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded shadow">
      {/* Suponiendo que la imagen no se carga en el JSON principal, podrías cargarla por separado si es necesario */}
      {/* <img src={...} /> */}
      <h2 className="text-2xl font-bold mb-2">{auto.marca} {auto.modelo} ({auto.anio})</h2>
      <p className="mb-2 text-gray-700">Kilometraje: {auto.kilometraje.toLocaleString()} km</p>
      <p className="mb-4 font-semibold">Precio: ${auto.precioBase.toLocaleString()}</p>

      <p className="mb-4 font-semibold">Stock disponible: {sinStock ? "Agotado" : `${auto.stock} unidades`}</p>

      {/* Aquí podrías añadir la descripción si la incluyes en la entidad */}
      {/* <p className="mb-4 text-gray-600">{auto.descripcion}</p> */}

      <button
        className={`px-6 py-2 rounded text-white transition ${sinStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={() => agregarAlCarrito(auto)}
        disabled={sinStock}
      >
        {sinStock ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
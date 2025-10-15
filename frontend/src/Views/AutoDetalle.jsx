import { useParams } from "react-router-dom";
import autos from "../data/autos";
import { useCarrito } from "../context/CarritoContext";

export default function AutoDetalle() {
  const { id } = useParams();
  const auto = autos.find((a) => a.id === Number(id));
  const { agregarAlCarrito } = useCarrito();

  if (!auto) return <div className="p-8">Auto no encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded shadow">
      <img src={auto.imagen} alt={`${auto.marca} ${auto.modelo}`} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{auto.marca} {auto.modelo} {auto.año}</h2>
      <p className="mb-2 text-gray-700">Kilometraje: {auto.kilometraje.toLocaleString()} km</p>

      {/* Mostramos el stock disponible */}
      <p className="mb-4 font-semibold">Stock disponible: {auto.stock > 0 ? `${auto.stock} unidades` : "Agotado"}</p>

      <p className="mb-4 text-gray-600">{auto.descripcion}</p>

      <button
        className={`px-6 py-2 rounded text-white transition ${auto.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        onClick={() => agregarAlCarrito(auto)}
        disabled={auto.stock === 0}
      >
        {auto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
      </button>
    </div>
  );
}
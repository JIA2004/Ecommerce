import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded shadow min-h-[300px]">
      <h2 className="text-2xl font-bold mb-6">Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((auto) => (
              <li key={auto.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={auto.imagen}
                    alt={`${auto.marca} ${auto.modelo}`}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <Link
                    to={`/catalogo/${auto.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {auto.marca} {auto.modelo} {auto.año}
                  </Link>
                  <span className="ml-2 text-gray-500">{auto.kilometraje.toLocaleString()} km</span>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => quitarDelCarrito(auto.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={vaciarCarrito}
          >
            Vaciar carrito
          </button>
          <button
            className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => alert("¡Compra realizada!")}
          >
            Comprar
          </button>
        </>
      )}
      <div className="mt-6">
        <Link to="/catalogo" className="text-blue-600 hover:underline">Volver al catálogo</Link>
      </div>
    </div>
  );
}
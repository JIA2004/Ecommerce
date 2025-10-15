import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const Card = ({ auto }) => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="relative group">
      <Link to={`/catalogo/${auto.id}`}>
        <div className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
          <img className="w-full h-48 object-cover" src={auto.imagen} alt={`${auto.marca} ${auto.modelo}`} />
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg">{`${auto.marca} ${auto.modelo}`}</h3>
            <p className="text-gray-400 text-sm">{`${auto.marca}, ${auto.modelo}, ${auto.año}, ${auto.kilometraje} km`}</p>
          </div>
        </div>
      </Link>
      {/* Botón de agregar al carrito, aparece solo al hacer hover */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          agregarAlCarrito(auto);
        }}
        className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Agregar al carrito"
      >
        {/* Ícono de carrito SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3" />
        </svg>
      </button>
    </div>
  );
};

export default Card;
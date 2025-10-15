import { useState } from "react";

export default function Registrarse() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    repetirPassword: "",
    telefono: "",
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = "Correo inválido";
    }
    if (!formData.password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.password !== formData.repetirPassword) {
      nuevosErrores.repetirPassword = "Las contraseñas no coinciden";
    }
    if (formData.telefono) {
      if (!/^\d{8,}$/.test(formData.telefono)) {
        nuevosErrores.telefono = "El teléfono debe tener al menos 8 dígitos y solo números";
      }
    }
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length === 0) {
      // No enviar repetirPassword al backend
      const { repetirPassword, ...dataEnviar } = formData;

      fetch("http://localhost:3000/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataEnviar),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Registro exitoso:", data);
          alert("Usuario registrado correctamente");
        })
        .catch((err) => {
          console.error("Error al registrarse:", err);
          alert("Ocurrió un error");
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.nombre && (
              <p className="text-red-500 text-sm">{errores.nombre}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.email && (
              <p className="text-red-500 text-sm">{errores.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.password && (
              <p className="text-red-500 text-sm">{errores.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="repetirPassword"
              placeholder="Repetir contraseña"
              value={formData.repetirPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.repetirPassword && (
              <p className="text-red-500 text-sm">{errores.repetirPassword}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono (opcional)"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errores.telefono && (
              <p className="text-red-500 text-sm">{errores.telefono}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

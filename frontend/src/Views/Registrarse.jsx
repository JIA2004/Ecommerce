import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrarse() {
  // 1. El estado ahora coincide con los campos de la API (firstName, lastName)
  const [formData, setFormData] = useState({
    username: "",
    firstName: "", // Cambiado
    lastName: "",  // Cambiado
    email: "",
    password: "",
    repetirPassword: "",
    telefono: "",
    documento: "",
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar tu lógica de validación si lo deseas.

    // 2. Ya no necesitamos dividir el nombre, los datos están listos.
    const { repetirPassword, ...restoData } = formData;
    const dataParaApi = {
      ...restoData,
      telefono: parseInt(formData.telefono),
      documento: parseInt(formData.documento),
      role: 'USER'
    };

    console.log("Datos que se enviarán a la API:", dataParaApi);

    fetch("http://localhost:4002/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataParaApi),
    })
    .then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json();
            // Usamos el mensaje de error del backend para ser más precisos.
            throw new Error(errorData.trace || 'El usuario, email o documento ya existen.');
        }
        return res.json();
    })
    .then((data) => {
      alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      console.log("Token recibido:", data.access_token);
      navigate('/login');
    })
    .catch((err) => {
      console.error("Error al registrarse:", err);
      alert(err.message);
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          
          {/* 3. Reemplazamos el input de "Nombre y Apellido" por dos separados */}
          <div className="flex gap-4">
              <input type="text" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} className="w-1/2 border p-3 rounded-md" required />
              <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} className="w-1/2 border p-3 rounded-md" required />
          </div>

          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          <input type="password" name="repetirPassword" placeholder="Repetir contraseña" value={formData.repetirPassword} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          
          <input type="number" name="documento" placeholder="Documento" value={formData.documento} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          <input type="number" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
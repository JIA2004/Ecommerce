import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos para redirigir

export default function Registrarse() {
  const [formData, setFormData] = useState({
    username: "", // Añadimos username al formulario
    nombre: "",
    email: "",
    password: "",
    repetirPassword: "",
    telefono: "",
    documento: "", // Añadimos documento
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ... (tu función validar() se mantiene igual)

  const handleSubmit = (e) => {
    e.preventDefault();
    // const erroresValidados = validar(); // Puedes reactivar tu validación
    // setErrores(erroresValidados);

    // if (Object.keys(erroresValidados).length === 0) {
      const { repetirPassword, nombre, ...restoData } = formData;
      const dataParaApi = {
        ...restoData,
        firstName: nombre.split(' ')[0] || '',
        lastName: nombre.split(' ').slice(1).join(' ') || '',
        telefono: parseInt(formData.telefono),
        documento: parseInt(formData.documento),
        role: 'USER'
      };

      fetch("http://localhost:4002/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataParaApi),
      })
      .then((res) => {
          if (!res.ok) {
              throw new Error('Error en el registro. El usuario o email ya pueden existir.');
          }
          return res.json();
      })
      .then(() => {
        alert("Usuario registrado correctamente. Serás redirigido al login.");
        navigate('/login');
      })
      .catch((err) => {
        console.error("Error al registrarse:", err);
        alert(err.message);
      });
    // }
  };

  // EL RETURN DEBE ESTAR FUERA DEL HANDLESUBMIT
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Añadimos campos que faltaban y que el backend requiere */}
          <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} className="w-full border p-3 rounded-md" required />
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
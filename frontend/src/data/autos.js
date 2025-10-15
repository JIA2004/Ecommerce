import lexus2022 from "../assets/lexus_ls_2022.jpg";
import porsche911 from "../assets/Porsche_911_2022.jpg";
import corolla2021 from "../assets/corolla_2021.jpg";

const autos = [
  {
    id: 1,
    marca: "Lexus",
    modelo: "LS",
    año: 2022,
    kilometraje: 14000,
    imagen: lexus2022,
    descripcion: "Lexus LS 2022 en excelente estado, único dueño, mantenimiento al día, tapizado de cuero, sistema de navegación y sensores de estacionamiento.",
  },
  {
    id: 2,
    marca: "Porsche",
    modelo: "911",
    año: 2022,
    kilometraje: 15000,
    imagen: porsche911,
    descripcion: "Porsche 911 2022, deportivo de alta gama, motor potente, historial de servicio completo, ideal para amantes de la velocidad y el lujo.",
  },
  {
    id: 3,
    marca: "Toyota",
    modelo: "Corolla",
    año: 2021,
    kilometraje: 20000,
    imagen: corolla2021,
    descripcion: "Toyota Corolla 2021, bajo consumo, ideal para ciudad, muy cómodo y seguro, con todos los papeles al día y listo para transferir.",
  },
];

export default autos;
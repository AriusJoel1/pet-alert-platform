import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Dashboard</Link>
      <Link to="/pets">Mascotas Perdidas</Link>
      <Link to="/sightings">Avistamientos</Link>
      <Link to="/search">Buscar Imagen</Link>
      <Link to="/caregivers">Cuidadores</Link>
      <Link to="/alerts">Alertas</Link>
    </div>
  );
}
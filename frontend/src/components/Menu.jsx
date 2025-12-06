import logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

export default function Menu() {
  return (
    <div className="menu">
      <img className="logo-menu" src={logo} alt="logo vetmais" />

      <ul className="menu-lista">
        <li>
          <Link to="/informacoesPessoais" className="menu-link">Perfil</Link>
        </li>

        <li>
          <Link to="/prontuarios/vet" className="menu-link">Prontuários</Link>
        </li>

        <li>
          <Link to="/agenda" className="menu-link">Agenda</Link>
        </li>

        <li>
          <Link to="/horarios" className="menu-link">Meus Horários</Link>
        </li>

        <li>
          <Link to="/AboutUs" className="menu-link">Sair</Link>
        </li>
      </ul>
    </div>
  );
}

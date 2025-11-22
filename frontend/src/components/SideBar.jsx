import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SideBar.css";
import logo from "../assets/Logo.png";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar_Tutor">
      <h2 className="logo">
        <img src={logo} alt="Logo Vet+" />
      </h2>

      <nav className="sidebar-links_Tutor">
        <Link
          to="/perfil"
          className={location.pathname === "/perfil" ? "active" : ""}
        >
          Perfil
        </Link>

        <Link
          to="/meus-pets"
          className={location.pathname.includes("/MyPets") ? "active" : ""}
        >
          Meus Pets
        </Link>

        <Link
          to="/agenda"
          className={location.pathname === "/agenda" ? "active" : ""}
        >
          Agenda
        </Link>

        <Link
          to="/prontuarios"
          className={location.pathname === "/prontuarios" ? "active" : ""}
        >
          Prontuários
        </Link>

        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Sair
        </Link>
      </nav>
    </div>
  );
}

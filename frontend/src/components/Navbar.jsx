import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAboutUs = location.pathname === "/AboutUs";
  const isSignIn = location.pathname === "/cadastro";
  const isLogin = location.pathname === "/LoginEntrar";
  return (
    <nav
      className={`navbar-component navbar ${
        isHome ? "navbar-home" : "navbar-default"
      }`}
    >
      <div className="navbar-content">
        <img src={logo} alt="Logo Vet+" width="100px" />
        <ul className="nav-links">
          <li>
            <Link to="/" className={isHome ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" className={isAboutUs ? "active" : ""}>
              Sobre Nós
            </Link>
          </li>
          <li>
            <Link to="/cadastro" className={isSignIn ? "active" : ""}>
              Cadastrar Pet
            </Link>
          </li>
          <li>
            <Link to="/LoginEntrar" className={isLogin ? "active" : ""}>
              Meus serviços
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

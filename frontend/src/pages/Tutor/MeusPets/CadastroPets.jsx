import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "../../../styles/CadastroPets.css";
import Sidebar from "../../../components/SideBar.jsx";

export default function CadastrarPet() {
  return (
    <div className="cad-layout">
      <Sidebar />

      <div className="cad-container">
        <h1 className="cad-title">Meus PETS</h1>

        <div className="cad-header">
          <h2 className="cad-subtitle">Cadastrar Pet</h2>

          <Link to="/MyPets" className="cad-close">
            <FaTimes />
          </Link>
        </div>

        <form className="cad-form-grid">
          <div>
            <label>Nome</label>
            <input className="cad-input" placeholder="Nome" />
          </div>

          <div>
            <label>Data de nascimento</label>
            <input className="cad-input" placeholder="Data de nascimento" />
          </div>

          <div>
            <label>RGA</label>
            <input className="cad-input" placeholder="RGA" />
          </div>

          <div>
            <label>Raça</label>
            <input className="cad-input" placeholder="Raça" />
          </div>

          <div>
            <label>Espécie</label>
            <select className="cad-input">
              <option>Selecione</option>
            </select>
          </div>

          <div>
            <label>Gênero</label>
            <select className="cad-input">
              <option>Selecione</option>
            </select>
          </div>
        </form>

        <div className="cad-buttons">
          <Link to="/MyPets" className="cad-btn cad-cancel">
            Cancelar
          </Link>
          <button className="cad-btn cad-save">Salvar</button>
        </div>
      </div>
    </div>
  );
}

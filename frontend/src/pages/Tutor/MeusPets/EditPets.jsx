import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "../../../styles/EditPets.css";
import Sidebar from "../../../components/SideBar.jsx";

export default function EditarPet() {
  return (
    <div className="edit-layout">
      <Sidebar />

      <div className="edit-container">
        <h1 className="edit-title">Meus PETS</h1>

        <div className="edit-header">
          <h2 className="edit-subtitle">Editar informações do Pet</h2>

          <Link to="/MyPets" className="edit-close">
            <FaTimes />
          </Link>
        </div>

        <form className="edit-form-grid">
          <div>
            <label>Nome</label>
            <input className="input-field" placeholder="Nome" />
          </div>

          <div>
            <label>Data de nascimento</label>
            <input className="input-field" placeholder="Data de nascimento" />
          </div>

          <div>
            <label>RGA</label>
            <input className="input-field" placeholder="RGA" />
          </div>

          <div>
            <label>Raça</label>
            <input className="input-field" placeholder="Raça" />
          </div>

          <div>
            <label>Espécie</label>
            <select className="input-field">
              <option>Selecione</option>
            </select>
          </div>

          <div>
            <label>Gênero</label>
            <select className="input-field">
              <option>Selecione</option>
            </select>
          </div>
        </form>

        <div className="edit-buttons">
          <Link to="/MyPets" className="btn-cancel">
            Cancelar
          </Link>

          <button className="btn-save">Salvar</button>
        </div>
      </div>
    </div>
  );
}

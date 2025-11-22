import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/MyPets.css";
import {
  FaPaw, // 🐾
  FaBook, // 📘
  FaRegCalendarAlt, // 📅
  FaEdit, // ✏️
  FaTrashAlt, // 🗑️
  FaVenus, // ♀ Fêmea
} from "react-icons/fa";
import Sidebar from "../../../components/SideBar.jsx";

export default function MyPets() {
  return (
    <div className="layout mypets-layout">
      <Sidebar />

      <div className="pets-container">
        <h1 className="pets-title">Meus PETS</h1>

        <div className="pets-header">
          <h2 className="pets-subtitle">Pets cadastrados</h2>
          <Link to="/MyPets/Cadastro" className="btn-cadastrar">
            Cadastrar Novo
          </Link>
        </div>

        <div className="pets-grid">
          {/* CARD 1 */}
          <div className="pet-card">
            <p className="pet-name">Lessie Rosa Silva</p>
            <div className="pet-info">
              <p>
                <FaPaw /> Canina
              </p>
              <p>
                <FaVenus /> Fêmea
              </p>
              <p>
                <FaBook /> Golden
              </p>
              <p>
                <FaRegCalendarAlt /> 09/01/2018
              </p>
            </div>

            <div className="pet-actions">
              <Link to="/MyPets/Editar/1" className="edit-icon">
                <FaEdit />
              </Link>
              <button className="delete-icon">
                <FaTrashAlt />
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="pet-card">
            <p className="pet-name">Lilica Rosa Silva</p>
            <div className="pet-info">
              <p>
                <FaPaw /> Felina
              </p>
              <p>
                <FaVenus /> Fêmea
              </p>
              <p>
                <FaBook /> SDR
              </p>
              <p>
                <FaRegCalendarAlt /> 09/06/2025
              </p>
            </div>

            <div className="pet-actions">
              <Link to="/MyPets/Editar/2" className="edit-icon">
                <FaEdit />
              </Link>
              <button className="delete-icon">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>

        {/* Paginação */}
        <div className="pagination">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
        </div>
      </div>
    </div>
  );
}

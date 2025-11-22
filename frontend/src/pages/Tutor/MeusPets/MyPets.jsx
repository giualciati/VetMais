import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/MyPets.css";
import {
  FaPaw,
  FaBook,
  FaRegCalendarAlt,
  FaEdit,
  FaTrashAlt,
  FaVenus,
} from "react-icons/fa";

import Sidebar from "../../../components/SideBar.jsx";
import { listarPets, deletarPet } from "../../../services/petService";

export default function MyPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    listarPets().then((res) => setPets(res.data));
  }, []);

  function handleDelete(id) {
    deletarPet(id).then(() => {
      setPets((prev) => prev.filter((p) => p.id !== id));
    });
  }

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
          {pets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <p className="pet-name">{pet.nome}</p>

              <div className="pet-info">
                <p>
                  <FaPaw /> {pet.especie}
                </p>
                <p>
                  <FaVenus /> {pet.genero}
                </p>
                <p>
                  <FaBook /> {pet.raca}
                </p>
                <p>
                  <FaRegCalendarAlt /> {pet.dataNascimento}
                </p>
              </div>

              <div className="pet-actions">
                <Link to={`/MyPets/Editar/${pet.id}`} className="edit-icon">
                  <FaEdit />
                </Link>

                <button
                  className="delete-icon"
                  onClick={() => handleDelete(pet.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
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

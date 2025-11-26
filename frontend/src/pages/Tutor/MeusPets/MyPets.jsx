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
    const idTutor = localStorage.getItem("idTutor") || 2;

    listarPets(idTutor)
      .then((res) => {
        console.log("Dados recebidos:", res.data);
        setPets(res.data);
      })
      .catch((err) => console.error("Erro ao buscar pets:", err));
  }, []);

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      deletarPet(id).then(() => {
        setPets((prev) => prev.filter((p) => (p.id || p.id_animal) !== id));
      });
    }
  }

  function formatarData(dataString) {
    if (!dataString) return "---";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
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
            <div className="pet-card" key={pet.id || pet.id_animal}>
              
              <p className="pet-name">
                 {pet.nome || pet.nm_animal}
              </p>

              <div className="pet-info">
                <p>
                  <FaPaw /> {pet.especie || pet.especie_animal}
                </p>

                <p>
                  <FaVenus /> {pet.sexo || pet.sexo_animal || pet.genero}
                </p>

                <p>
                  <FaBook /> {pet.raca || pet.raca_animal}
                </p>

                <p>
                  <FaRegCalendarAlt /> {formatarData(pet.dt_nasc_animal || pet.dataNascimento)}
                </p>
              </div>

              <div className="pet-actions">
                <Link to={`/MyPets/Editar/${pet.id || pet.id_animal}`} className="edit-icon">
                  <FaEdit />
                </Link>

                <button
                  className="delete-icon"
                  onClick={() => handleDelete(pet.id || pet.id_animal)}
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
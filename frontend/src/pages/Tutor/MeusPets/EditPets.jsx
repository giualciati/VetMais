import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../styles/EditPets.css";
import Sidebar from "../../../components/SideBar.jsx";
import { buscarPet, atualizarPet } from "../../../services/petService";

export default function EditarPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    nome: "",
    dataNascimento: "",
    rga: "",
    raca: "",
    especie: "",
    genero: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      buscarPet(id)
        .then((res) => {
          const dados = res.data; 
          
          let dataFormatada = "";
          if (dados.dt_nasc_animal) {
            dataFormatada = dados.dt_nasc_animal.split('T')[0];
          }

          setPet({
            nome: dados.nm_animal,
            dataNascimento: dataFormatada,
            raca: dados.raca_animal,
            especie: dados.especie_animal,
            genero: dados.sexo_animal, 
          });
        })
        .catch((err) => console.error("Erro ao buscar pet:", err));
    }
  }, [id]);

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validação
    if (!pet.nome || !pet.dataNascimento || !pet.raca) {
      setError("Preencha todos os campos!");
      return;
    }

  
    const petParaSalvar = {
      nm_animal: pet.nome,
      dt_nasc_animal: pet.dataNascimento,
      raca_animal: pet.raca,
      especie_animal: pet.especie,
      sexo_animal: pet.genero
    };

    atualizarPet(id, petParaSalvar)
      .then(() => navigate("/MyPets"))
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        setError("Erro ao salvar alterações.");
      });
  }

  return (
    <div className="edit-layout">
      <Sidebar />

      <div className="edit-container">
        <h1 className="edit-title">Meus PETS</h1>

        <div className="edit-header">
          <h2 className="edit-subtitle">Editar informações do Pet</h2>

          <Link to="/MyPets" className="edit-close">
            ✖
          </Link>
        </div>

        <form className="edit-form-grid" onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input
              name="nome"
              className="input-field"
              value={pet.nome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Data de nascimento</label>
            <input
              name="dataNascimento"
              className="input-field"
              type="date"
              value={pet.dataNascimento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>RGA</label>
            <input
              name="rga"
              className="input-field"
              value={pet.rga}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Raça</label>
            <input
              name="raca"
              className="input-field"
              value={pet.raca}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Espécie</label>
            <select
              name="especie"
              className="input-field"
              value={pet.especie}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Roedor">Roedor</option>
            </select>
          </div>

          <div>
            <label>Gênero</label>
            <select
              name="genero"
              className="input-field"
              value={pet.genero}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
        </form>

        <div className="edit-buttons">
          <Link to="/MyPets" className="btn-cancel">
            Cancelar
          </Link>

          <button className="btn-save" onClick={handleSubmit}>
            Salvar
          </button>

          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
    </div>
  );
}

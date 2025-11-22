import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/CadastroPets.css";
import Sidebar from "../../../components/SideBar.jsx";
import { salvarPet } from "../../../services/petService";

export default function CadastrarPet() {
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    nome: "",
    dataNascimento: "",
    rga: "",
    raca: "",
    especie: "",
    genero: "",
  });

  const [erro, setErro] = useState("");

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const camposObrigatorios = [
      "nome",
      "dataNascimento",
      "rga",
      "raca",
      "especie",
      "genero",
    ];

    for (let campo of camposObrigatorios) {
      if (!pet[campo] || pet[campo].trim() === "") {
        setErro(`O campo "${campo}" é obrigatório.`);
        return;
      }
    }

    setErro("");
    salvarPet(pet).then(() => navigate("/MyPets"));
  }

  return (
    <div className="cad-layout">
      <Sidebar />

      <div className="cad-container">
        <h1 className="cad-title">Meus PETS</h1>

        <div className="cad-header">
          <h2 className="cad-subtitle">Cadastrar Pet</h2>
          <Link to="/MyPets" className="cad-close">
            ✖
          </Link>
        </div>

        <form className="cad-form-grid" onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input name="nome" className="cad-input" onChange={handleChange} />
          </div>

          <div>
            <label>Data de nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              className="cad-input"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>RGA</label>
            <input name="rga" className="cad-input" onChange={handleChange} />
          </div>

          <div>
            <label>Raça</label>
            <input name="raca" className="cad-input" onChange={handleChange} />
          </div>

          <div>
            <label>Espécie</label>
            <select
              name="especie"
              className="cad-input"
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label>Gênero</label>
            <select name="genero" className="cad-input" onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
          <div className="cad-buttons">
            <Link to="/MyPets" className="cad-btn cad-cancel">
              Cancelar
            </Link>
            <button className="cad-btn cad-save">Salvar</button>
            {erro && <span className="cad-error">{erro}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

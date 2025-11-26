import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../styles/EditPets.css";
import Sidebar from "../../../components/SideBar.jsx";
import { buscarPet, atualizarPet } from "../../../services/petService";

export default function EditarPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial vazio
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
          console.log("Recebi do Java:", dados); // Confirma o recebimento

          // Formata a data (YYYY-MM-DD)
          let dataFormatada = "";
          if (dados.dt_nasc_animal) {
            dataFormatada = dados.dt_nasc_animal.split('T')[0];
          }

          setPet({
            nome: dados.nm_animal,          
            dataNascimento: dataFormatada,   
            rga: dados.rga_animal || "",      
            raca: dados.raca_animal,          
            especie: dados.especie_animal,    
            genero: dados.sexo_animal          
          });
        })
        .catch((err) => console.error("Erro:", err));
    }
  }, [id]);

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validação básica
    if (!pet.nome || !pet.dataNascimento || !pet.raca) {
      setError("Preencha os campos obrigatórios!");
      return;
    }

    // Prepara o objeto para mandar de volta para o Java (Traduzindo de volta)
    const petParaSalvar = {
      nm_animal: pet.nome,
      dt_nasc_animal: pet.dataNascimento,
      rga_animal: pet.rga,
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
          <Link to="/MyPets" className="edit-close">✖</Link>
        </div>

        <form className="edit-form-grid" onSubmit={handleSubmit}>
          {/* Campo NOME */}
          <div>
            <label>Nome</label>
            <input
              name="nome"
              className="input-field"
              value={pet.nome} // Vinculado ao estado
              onChange={handleChange}
            />
          </div>

          {/* Campo DATA */}
          <div>
            <label>Data de nascimento</label>
            <input
              name="dataNascimento"
              className="input-field"
              type="date"
              value={pet.dataNascimento} // Vinculado ao estado
              onChange={handleChange}
            />
          </div>

          {/* Campo RGA */}
          <div>
            <label>RGA</label>
            <input
              name="rga"
              className="input-field"
              value={pet.rga} // Vinculado ao estado
              onChange={handleChange}
            />
          </div>

          {/* Campo RAÇA */}
          <div>
            <label>Raça</label>
            <input
              name="raca"
              className="input-field"
              value={pet.raca} // Vinculado ao estado
              onChange={handleChange}
            />
          </div>

          {/* Campo ESPÉCIE */}
          <div>
            <label>Espécie</label>
            <select
              name="especie"
              className="input-field"
              value={pet.especie} // Vinculado ao estado
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Roedor">Roedor</option>
            </select>
          </div>

          {/* Campo GÊNERO */}
          <div>
            <label>Gênero</label>
            <select
              name="genero"
              className="input-field"
              value={pet.genero} // Vinculado ao estado
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
        </form>

        <div className="edit-buttons">
          <Link to="/MyPets" className="btn-cancel">Cancelar</Link>
          <button className="btn-save" onClick={handleSubmit}>Salvar</button>
        </div>
        
        {error && <p className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
      </div>
    </div>
  );
}
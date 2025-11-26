import React, { useState, useEffect } from "react";
import "./cadastroColaborador.css";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import Menu from "../../../components/Menu";

export default function CadastroColaborador() {
  const [hospitais, setHospitais] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    dataNascimento: "",
    email: "",
    rg: "",
    senha: "",
    cpf: "",
    especialidade: "",
    crm: "",
  });

  useEffect(() => {
    const buscarHospitais = async () => {
      try {
        const response = await fetch("http://localhost:8080/hospitais");
        if (response.ok) {
          const data = await response.json();
          setHospitais(data);
        } else {
          console.error("Erro ao carregar hospitais do Backend.");
        }
      } catch (error) {
        console.error("Erro de conexão ao buscar hospitais:", error);
      }
    };
    buscarHospitais();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHospitalId || selectedHospitalId === "") {
      alert("Por favor, selecione um Hospital.");
      return;
    }

    const dadosCompletos = {
      ...formData,
      hospitalId: selectedHospitalId,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/veterinarios/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosCompletos),
        }
      );

      if (response.ok) {
        alert("✅ Veterinário cadastrado com sucesso!");
        window.location.replace("/informacoesPessoais");
      } else {
        const erroMsg = await response.text();
        alert("❌ Erro no cadastro: " + erroMsg);
        console.error("Erro da API:", erroMsg);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com o servidor. Verifique o console.");
    }
  };

  return (
    <div className="cc-pagina">
      <Navbar />
      <Menu></Menu>

      <main className="cc-main">
        <h1 className="cc-titulo">Seja nosso colaborador</h1>

        <div className="cc-gradiente-wrapper">
          <form onSubmit={handleSubmit} className="cc-formulario">
            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                name="nome"
                placeholder="Nome"
                required
                onChange={handleChange}
              />
              <input
                className="cc-input"
                type="tel"
                name="telefone"
                placeholder="Telefone"
                required
                onChange={handleChange}
              />
            </div>

            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                name="dataNascimento"
                placeholder="Data de Nascimento"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => {
                  if (!e.currentTarget.value) e.currentTarget.type = "text";
                }}
                onChange={handleChange}
              />
              <input
                className="cc-input"
                type="email"
                name="email"
                placeholder="E-mail"
                required
                onChange={handleChange}
              />
            </div>

            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                name="rg"
                placeholder="RG"
                required
                onChange={handleChange}
              />
              <input
                className="cc-input"
                type="password"
                name="senha"
                placeholder="Senha"
                required
                onChange={handleChange}
              />
            </div>

            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                name="cpf"
                placeholder="CPF"
                required
                onChange={handleChange}
              />
              <input
                className="cc-input"
                type="text"
                name="especialidade"
                placeholder="Especialidade"
                required
                onChange={handleChange}
              />
            </div>

            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                name="crm"
                placeholder="CRM"
                required
                onChange={handleChange}
              />

              <select
                className="cc-input"
                name="hospitalId"
                value={selectedHospitalId}
                onChange={(e) => setSelectedHospitalId(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecione o Hospital
                </option>
                {hospitais.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="cc-botao">
              Cadastrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

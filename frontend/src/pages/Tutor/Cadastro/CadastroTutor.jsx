import "./cadastroTutor.scss";
import cao from '../../../assets/images/cao-cadastro.jpg'
import { useState } from "react";
import axios from "axios";

export default function CadastroTutor() {
  const [formData, setFormData] = useState({
    nm_pessoa: "",
    dt_nasc_pessoa: "",
    tel_pessoa: "",
    rg_pessoa: "",
    cpf_pessoa: "",
    email_pessoa: "",
    senha_pessoa: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      pessoa: {
        nm_pessoa: formData.nm_pessoa,
        dt_nasc_pessoa: formData.dt_nasc_pessoa,
        tel_pessoa: formData.tel_pessoa,
        rg_pessoa: formData.rg_pessoa,
        cpf_pessoa: formData.cpf_pessoa,
        email_pessoa: formData.email_pessoa,
        senha_pessoa: formData.senha_pessoa,
      },
    };

    try {
      const response = await axios.post("http://localhost:8080/tutores", payload);
      alert("Tutor cadastrado com sucesso!");
      console.log(response.data);
      window.location.replace("/infPessoaisTutor");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar tutor!");
    }
  }

  return (
    <section className="cadastro-section">
      <div className="cadastro-main-container">

        <div className="cadastro-img-container">
          <img
            className="cadastro-img-cao"
            src={cao}
            alt="cao"
          />
        </div>

        <div className="cadastro-form-wrapper">
          <form className="cadastro-form" onSubmit={handleSubmit}>

            <h1 className="cadastro-title">Faça seu cadastro</h1>

            <input
              className="cadastro-input"
              type="text"
              placeholder="Nome Completo"
              name="nm_pessoa"
              onChange={handleChange}
              required
            />

            <div className="cadastro-inputs-row">
              <input
                className="cadastro-input"
                type="date"
                name="dt_nasc_pessoa"
                onChange={handleChange}
                required
              />

              <input
                className="cadastro-input"
                type="tel"
                placeholder="Telefone"
                name="tel_pessoa"
                onChange={handleChange}
                required
              />
            </div>

            <div className="cadastro-inputs-row">
              <input
                className="cadastro-input"
                type="text"
                placeholder="RG"
                name="rg_pessoa"
                onChange={handleChange}
                required
              />

              <input
                className="cadastro-input"
                type="text"
                placeholder="CPF"
                name="cpf_pessoa"
                onChange={handleChange}
                required
              />
            </div>

            <input
              className="cadastro-input"
              type="email"
              placeholder="Email"
              name="email_pessoa"
              onChange={handleChange}
              required
            />

            <input
              className="cadastro-input"
              type="password"
              placeholder="Senha"
              name="senha_pessoa"
              onChange={handleChange}
              required
            />

            <div className="cadastro-button-link-container">
              <button className="cadastro-button" type="submit">
                Cadastrar
              </button>

              <a className="cadastro-link" href="/cadastroColaborador">
                Seja nosso colaborador
              </a>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

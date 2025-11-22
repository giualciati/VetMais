import "./cadastroTutor.scss";
import { useState } from "react";
import axios from "axios";
import "./cadastroTutor.css";

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
      const response = await axios.post(
        "http://localhost:8080/tutores",
        payload
      );
      alert("Tutor cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar tutor!");
    }
  }

  return (
    <section className="teste">
      <div className="imagens">
        <img className="cao" src="/images/cao-cadastro.jpg" alt="cao" />

        <div className="form-cadastro">
          <form onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <input
              type="text"
              placeholder="Nome Completo"
              name="nm_pessoa"
              onChange={handleChange}
              required
            />

            <div className="inputs-form">
              <input
                className="input-form"
                type="date"
                name="dt_nasc_pessoa"
                onChange={handleChange}
                required
              />

              <input
                className="input-form"
                type="tel"
                placeholder="Telefone"
                name="tel_pessoa"
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputs-form">
              <input
                type="text"
                placeholder="RG"
                name="rg_pessoa"
                onChange={handleChange}
                required
              />

              <input
                className="input-form"
                type="text"
                placeholder="CPF"
                name="cpf_pessoa"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              name="email_pessoa"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              name="senha_pessoa"
              onChange={handleChange}
              required
            />

            <div className="botao-link">
              <button type="submit">Cadastrar</button>
              <a href="#">Seja nosso colaborador</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

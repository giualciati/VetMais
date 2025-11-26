import React from "react";
import "./cadastroColaborador.css";
import Navbar from "../../../components/Navbar";


// --- Página Cadastro ---
export default function CadastroColaborador() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
  };

  return (
    <div className="cc-pagina">
      <Navbar />

      <main className="cc-main">
        <h1 className="cc-titulo">Seja nosso colaborador</h1>

        <div className="cc-gradiente-wrapper">
          <form onSubmit={handleSubmit} className="cc-formulario">

            <div className="cc-linha">
              <input className="cc-input" type="text" placeholder="Nome" required />
              <input className="cc-input" type="tel" placeholder="Telefone" required />
            </div>

            <div className="cc-linha">
              <input
                className="cc-input"
                type="text"
                placeholder="Data de Nascimento"
                onFocus={(e) => e.currentTarget.type = 'date'}
                onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text' }}
              />
              <input className="cc-input" type="email" placeholder="E-mail" required />
            </div>

            <div className="cc-linha">
              <input className="cc-input" type="text" placeholder="RG" required />
              <input className="cc-input" type="password" placeholder="Senha" required />
            </div>

            <div className="cc-linha">
              <input className="cc-input" type="text" placeholder="CPF" required />
              <input className="cc-input" type="text" placeholder="Especialidade" required />
            </div>

            <div className="cc-linha">
              <input className="cc-input" type="text" placeholder="CRM" required />
              <input className="cc-input" type="text" placeholder="Hospital" required />
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

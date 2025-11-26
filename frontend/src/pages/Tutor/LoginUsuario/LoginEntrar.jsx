import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginEntrar.css";
import loginImg from "../../../assets/images/Cachorro3.png";

const LoginEntrar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentando logar com:", email, senha);
  };

  return (
    <main className="login-page">
      <div className="login-page__container">
        {/* PAINEL DA IMAGEM */}
        <div className="login-page__image-panel">
          <img
            src={loginImg}
            alt="Imagem de Login"
            className="login-page__image"
          />
        </div>

        {/* PAINEL DO FORMULÁRIO */}
        <div className="login-page__form-panel">
          <form onSubmit={handleLogin}>
            <h2 className="login-page__title">Entrar</h2>

            <label htmlFor="usuario" className="login-page__label">
              Usuário (E-mail)
            </label>
            <input
              type="text"
              id="usuario"
              className="login-page__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="senha" className="login-page__label">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="login-page__input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <a href="/TrocarSenha" className="login-page__forgot-link">
              Esqueceu a senha?
            </a>

            <button type="submit" className="login-page__submit-btn">
              Entrar
            </button>

            <p className="login-page__signup">
              Ainda não tem uma conta?
              <a href="/cadastro" className="login-page__signup-link">
                {" "}
                Crie uma aqui
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginEntrar;

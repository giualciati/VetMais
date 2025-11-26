import { useState } from "react";
import "./TrocarSenha.css";
import loginImg from "../../../assets/images/Cachorro3.png";

const TrocarSenha = () => {
  const [email, setEmail] = useState("");

  const handleRecuperar = (e) => {
    e.preventDefault();
    console.log("Enviar e-mail de recuperação para:", email);
    alert("Se o e-mail existir, enviamos um link de recuperação!");
  };

  return (
    <main className="trocarSenha-main">
      <div className="trocarSenha-container">
        <div className="trocarSenha-imagePanel">
          <img src={loginImg} alt="Imagem de Login" />
        </div>

        <div className="trocarSenha-formPanel">
          <form onSubmit={handleRecuperar}>
            <h2 className="trocarSenha-title">Esqueceu a senha?</h2>

            <label htmlFor="email" className="trocarSenha-label">
              Digite seu e-mail
            </label>

            <input
              type="email"
              id="email"
              className="trocarSenha-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="trocarSenha-button">
              Enviar
            </button>

            <p className="trocarSenha-signupText">
              Ainda não tem uma conta?
              <a href="/cadastro"> Crie uma aqui</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TrocarSenha;

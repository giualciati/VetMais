import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginEntrar.css";
import loginImg from "../../../assets/images/Cachorro3.png";
import { login } from "../../../services/authService";

const LoginEntrar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores
    setLoading(true);

    // Valida campos vazios
    if (!email || !senha) {
      setError("Por favor, preencha todos os campos!");
      setLoading(false);
      return;
    }

    // Faz login usando o serviço
    const result = await login(email, senha);

    if (result.success) {
      // Login bem-sucedido - redireciona para home
      console.log("Login realizado com sucesso!");
      navigate("/home");
    } else {
      // Erro no login - exibe mensagem
      setError(result.error || "Erro ao fazer login!");
    }

    setLoading(false);
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

            {/* Exibe mensagem de erro */}
            {error && (
              <div className="login-page__error">
                {error}
              </div>
            )}

            <label htmlFor="usuario" className="login-page__label">
              Usuário (E-mail)
            </label>
            <input
              type="text"
              id="usuario"
              className="login-page__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
            />

            <a href="/TrocarSenha" className="login-page__forgot-link">
              Esqueceu a senha?
            </a>

            <button
              type="submit"
              className="login-page__submit-btn"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
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

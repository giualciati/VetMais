import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // navegar entre telas
import './LoginEntrar.css'; 
import loginImg from '../../../assets/Cachorro1.png'; 

const LoginEntrar = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentando logar com:", email, senha);
    
    // AQUI VAI ENTRAR A CONEXÃO COM O JAVA 
    // Se der certo:
    // navigate('/infoPessoais');
  };

  return (
    <main>
      <div className="login-container">
        <div className="image-panel">
          <img src={loginImg} alt="Imagem de Login" />
        </div>
        <div className="form-panel">
          <form onSubmit={handleLogin}>
            <h2>Entrar</h2>
            
            <label htmlFor="usuario">Usuário (E-mail)</label>
            <input 
              type="text" 
              id="usuario" 
              name="usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} 
            />
            
            <a href="/esqueciSenha" className="forgot-pass">Esqueceu a senha?</a>
            
            <button type="submit" className="btn-primary">entrar</button>
            
            <p className="signup-link">
              Ainda não tem uma conta? <a href="/cadastro">Crie uma aqui</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginEntrar;
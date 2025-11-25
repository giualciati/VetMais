import { useState } from 'react';
import './TrocarSenha.css'; 
import loginImg from '../../../assets/Cachorro1.png';

const TrocarSenha = () => {
  const [email, setEmail] = useState('');

  const handleRecuperar = (e) => {
    e.preventDefault();
    console.log("Enviar e-mail de recuperação para:", email);
    // AQUI ENTRA A CONEXÃO COM O JAVA
    alert("Se o e-mail existir, enviamos um link de recuperação!");
  };

  return (
    <main>
      <div className="login-container">
        <div className="image-panel">
          <img src={loginImg} alt="Imagem de Login" />
        </div>
        <div className="form-panel">
          <form onSubmit={handleRecuperar}>
            <h2>Esqueceu a senha?</h2>
            
            <label htmlFor="email">Digite seu e-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                            
            <button type="submit" className="btn-primary">enviar</button>
            
            <p className="signup-link">
              Ainda não tem uma conta? <a href="/cadastro">Crie uma aqui</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TrocarSenha;
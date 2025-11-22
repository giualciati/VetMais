import './LoginEntrar.css'; 

const LoginEntrar = () => {
  return (
    <main>
      <div className="login-container">
        <div className="image-panel">
          <img src={loginImg} alt="Imagem de Login" />
        </div>
        <div className="form-panel">
          <form>
            <h2>Entrar</h2>
            
            <label htmlFor="usuario">Usuário</label>
            <input type="text" id="usuario" name="usuario" />
            
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" />
            
            <a href="#" className="forgot-pass">Esqueceu a senha?</a>
            
            <button type="submit" className="btn-primary">entrar</button>
            
            <p className="signup-link">
              Ainda não tem uma conta? <a href="#">Crie uma aqui</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginEntrar;
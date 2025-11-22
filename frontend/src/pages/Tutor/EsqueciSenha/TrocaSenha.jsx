import './TrocarSenha.css'; 

const TrocarSenha = () => {
  return (
    <main>
      <div className="login-container">
        <div className="image-panel">
          <img src={loginImg} alt="Imagem de Login" />
        </div>
        <div className="form-panel">
          <form>
            <h2>Esqueceu a senha?</h2>
            
            <label htmlFor="email">Digite seu e-mail</label>
            <input type="email" id="email" name="email" />
                            
            <button type="submit" className="btn-primary">enviar</button>
            
            <p className="signup-link">
              Ainda não tem uma conta? <a href="#">Crie uma aqui</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TrocarSenha;
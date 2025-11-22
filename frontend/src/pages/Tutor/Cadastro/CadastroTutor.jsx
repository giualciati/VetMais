import './cadastroTutor.scss';


export default function CadastroTutor() {
  return (
    <section>
      <div className="imagens">
        <img className="cao" src="/images/cao-cadastro.jpg" alt="cao" />
        <div className="form-cadastro">
          <img
            className="fundo-cadastro"
            src="/images/Group 82.png"
            alt="fundo"
          />
          <form>
            <h1>Faça seu cadastro</h1>
            <div className="inputs-form">
                <input className='input1' type="text" placeholder="Nome Completo" required />
            </div>
           
            <div className="inputs-form">
              <input className='input1' type="date" placeholder="Nascimento" required />
              <input
                className="input-margin"
                type="tel"
                placeholder="Telefone"
                required
              />
            </div>

            <div className="inputs-form">
              <input className='input1' type="text" placeholder="RG" required />
              <input
                className="input-margin"
                type="text"
                placeholder="CPF"
                required
              />
            </div>

            <input className='input1' type="email" placeholder="Email" required />
            <input className='input1' type="password" placeholder="Senha" required />

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

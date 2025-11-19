import Navbar from '../../../components/Navbar';
import './cadastroColaborador.css'; 


export default function CadastroColaborador() {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Seja nosso colaborador</h1>

        <form className="formulario">

          <div className="linha">
            <input type="text" placeholder="Nome" required />
            <input type="tel" placeholder="Telefone" required />
          </div>

          <div className="linha">
            <input type="date" required />
            <input type="email" placeholder="E-mail" required />
          </div>

          <div className="linha">
            <input type="text" placeholder="RG" required />
            <input type="password" placeholder="Senha" required />
          </div>

          <div className="linha">
            <input type="text" placeholder="CPF" required />
            <input type="text" placeholder="Especialidade" required />
          </div>

          <div className="linha">
            <input type="text" placeholder="CRM" required />
            <input type="text" placeholder="Hospital" required />
          </div>

          <button type="submit" className="botao">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}

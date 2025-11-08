import './prontuarios.css';

export default function Prontuarios() {
  return (
    <section>
      <div className="menu">
        <img
          src="/images/logo.png"
          alt="logo vetmais"
        />
        <ul>
          <li>Perfil</li>
          <li>Prontuários</li>
          <li>Agenda</li>
          <li>Meus Horários</li>
          <li>Sair</li>
        </ul>
      </div>

      <div className="infos">
        <h1>Prontuários</h1>
        <div className="botao">
          <button className="btnNovo" type="button">
            Novo
          </button>
        </div>

        <div>
          <div className="cabecalho">
            <p>Número de Protocolo</p>
            <p>Nome</p>
            <p>Espécie</p>
            <p>Sexo</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import "./prontuarios.scss";
import ListaProntuarios from "../../../components/ListaProntuarios.jsx";

export default function Prontuarios() {
  return (
    <section className="prontuarios-page">
      <div className="menu">
        <img src="/logo.png" alt="logo vetmais" />
        <ul>
          <li>Perfil</li>
          <li>Prontuários</li>
          <li>Agenda</li>
          <li>Meus Horários</li>
          <li>Sair</li>
        </ul>
        <ul>
        </ul>
      </div>

      <div className="infos">
        <h1>Prontuários</h1>
        <div className="botao1">
          <button className="button-novo" type="button">
            Novo
          </button>
        </div>

        <div>
          <div className="cabecalho">
            <p className="p-prontuario">Número de Protocolo</p>
            <p className="p-prontuario">Nome</p>
            <p className="p-prontuario">Espécie</p>
            <p className="p-prontuario">Sexo</p>
            <p className="p-prontuario">Data Atendimento</p>
          </div>
          <div>
                <ListaProntuarios/>
          </div>
        </div>
      </div>
    </section>
  );
}

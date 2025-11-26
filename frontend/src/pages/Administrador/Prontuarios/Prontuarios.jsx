import "./prontuarios.scss";
import ListaProntuarios from "../../../components/ListaProntuarios.jsx";
import Menu from "../../../components/Menu.jsx";
import { Link } from "react-router-dom";

export default function Prontuarios() {
  return (
    <section className="prontuarios-container">
      <div className="prontuarios-menu">
        <Menu />
      </div>

      <div className="prontuarios-infos">
        <h1 className="prontuarios-titulo">Prontuários</h1>

        <div className="prontuarios-botao-container">
          <button className="prontuarios-botao-novo">
            <Link to="/novoProntuario" className="prontuarios-link-novo">
              Novo
            </Link>
          </button>
        </div>

        <div className="prontuarios-lista-container">
          <div className="prontuarios-cabecalho">
            <p className="prontuarios-coluna">Número de Protocolo</p>
            <p className="prontuarios-coluna">Nome</p>
            <p className="prontuarios-coluna">Espécie</p>
            <p className="prontuarios-coluna">Sexo</p>
            <p className="prontuarios-coluna">Data Atendimento</p>
          </div>

          <ListaProntuarios />
        </div>
      </div>
    </section>
  );
}

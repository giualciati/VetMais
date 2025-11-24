import "./prontuarios.scss";
import ListaProntuarios from "../../../components/ListaProntuarios.jsx";
import Menu from "../../../components/Menu.jsx";
import { Link } from "react-router-dom";

export default function Prontuarios() {
  return (
    <section className="prontuarios-page">
      <div className="menu">
        <Menu/>
      </div>

      <div className="infos">
        <h1>Prontuários</h1>
        <div className="botao1">
          <button className="button-novo" type="button">
            <Link to="/novoProntuario" className="link-novo">Novo</Link>
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

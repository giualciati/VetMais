import { useEffect, useState } from "react";
import { listarProntuarios } from "../services/prontuarioService";
import "../styles/ListaProntuarios.css";
import editar from "../assets/pencil 1.png";

export default function ListaProntuarios() {
  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarProntuarios()
      .then((response) => {
        setProntuarios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar prontuários:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  function formatarSomenteData(isoString) {
    return new Date(isoString).toLocaleDateString("pt-BR");
  }

  return (
    <div className="lista-prontuarios-container">
      {prontuarios.length === 0 && <p>Nenhum prontuário encontrado.</p>}

      {prontuarios.map((p) => (
        <div className="linha-prontuario" key={p.id_prontuario}>
          <p className="coluna-prontuario">{p.id_prontuario}</p>
          <p className="coluna-prontuario">{p.animal?.nm_animal}</p>
          <p className="coluna-prontuario">{p.animal?.especie_animal}</p>
          <p className="coluna-prontuario">{p.animal?.sexo_animal}</p>
          <p className="coluna-prontuario">{formatarSomenteData(p.dt_atendimento)}</p>

          <div className="area-acoes">
            <img className="icone-editar" src={editar} alt="Editar" />
            <p className="texto-ver-mais">Ver mais</p>
          </div>
        </div>
      ))}
    </div>
  );
}

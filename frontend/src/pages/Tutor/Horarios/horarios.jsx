import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './horarios.css';

function Horarios(props) {
  const navigate = useNavigate();


  const [horarios, setHorarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;

  useEffect(() => {
    // Altere a URL abaixo conforme o endereço do seu backend
    fetch('http://localhost:8080/agendas')
      .then((res) => res.json())
      .then((data) => {
        const horariosAdaptados = data.map((agenda) => {
          let dataFormatada = '';
          let horaFormatada = '';
          if (agenda.data_hora) {
            const dataObj = new Date(agenda.data_hora);
            dataFormatada = dataObj.toLocaleDateString('pt-BR');
            horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          }
          return {
            id: agenda.id,
            tutor: agenda.veterinario && agenda.veterinario.pessoa ? agenda.veterinario.pessoa.nm_pessoa : '---',
            especialidade: agenda.veterinario ? agenda.veterinario.especialidade_vet : '---',
            data: dataFormatada,
            hora: horaFormatada
          };
        });
        console.log(horariosAdaptados);
        setHorarios(horariosAdaptados);
      })
      .catch(() => setHorarios([]));
  }, []);

  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const horariosPaginados = horarios.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(horarios.length / itensPorPagina);

 
  const handleNovoClick = () => {
    navigate("/controlDispo");
  };

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <div className="prontuarios-pagina">

      {/* --- BARRA LATERAL (Sidebar) --- */}
      <aside className="sidebar-prontuarios">
        <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />

        <nav className="sidebar-nav">
          <Link to="/perfil">Perfil</Link>
          <Link to="/prontuario">Prontuários</Link>
          <Link to="/agenda">Agenda</Link>
          <Link to="/horarios" className="active">Meus Horários</Link>
          <Link to="/">Sair</Link>
        </nav>

      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="main-content-prontuarios">

        
        <div className="horarios-header">
          <h1 className="titulo-prontuarios">Horários Disponíveis</h1>

          <button type="button" className="btn-novo" onClick={handleNovoClick}>
            Novo
          </button>
        </div>

        {/* Lista de horários */}
        <section className="horarios-grid">
          {horariosPaginados.length > 0 ? (
            horariosPaginados.map((horario) => (
              <article
                key={horario.id}
                className="horario-card"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/controlDispo/${horario.id}`)}
              >
                <p className="horario-tutor">{horario.tutor}</p>
                <p className="horario-especialidade">{horario.especialidade}</p>

                <div className="horario-info">
                  <span className="horario-icon" aria-hidden="true">📅</span>
                  <span>{horario.data}</span>
                </div>

                <div className="horario-info">
                  <span className="horario-icon" aria-hidden="true">⏰</span>
                  <span>{horario.hora}</span>
                </div>
              </article>
            ))
          ) : (
            <p className="lista-vazia">Nenhum horário disponível.</p>
          )}
        </section>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <nav className="paginacao" aria-label="Paginação de horários">
            {Array.from({ length: totalPaginas }, (_, index) => {
              const numeroPagina = index + 1;
              return (
                <button
                  key={numeroPagina}
                  type="button"
                  className={`page-link${numeroPagina === paginaAtual ? ' active' : ''}`}
                  onClick={() => mudarPagina(numeroPagina)}
                >
                  {numeroPagina}
                </button>
              );
            })}
          </nav>
        )}
      </main>
    </div>
  );
}

export default Horarios;

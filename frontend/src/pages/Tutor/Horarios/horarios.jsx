import React, { useState } from 'react';
import './horarios.css';

// O componente recebe 'prontuarios' (array) e 'onVerMaisClick' (função) das props
function Horarios(props) {
  const dadosExemplo = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    tutor: 'Camile Vitória',
    especialidade: 'Ortopedia',
    data: '04/11/2025',
    hora: '09h00'
  }));

  const { horarios = dadosExemplo, onNovoClick } = props;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const horariosPaginados = horarios.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(horarios.length / itensPorPagina);

  const handleNovoClick = () => {
    if (typeof onNovoClick === 'function') {
      onNovoClick();
    }
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
          <a href="#">Perfil</a>
          <a href="#" >Prontuários</a>
          <a href="#" >Agenda</a>
          <a href="#" className="active">Meus Horarios</a>
          <a href="#">Sair</a>
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

        <section className="horarios-grid">
          {horariosPaginados.length > 0 ? (
            horariosPaginados.map((horario) => (
              <article key={horario.id} className="horario-card">
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

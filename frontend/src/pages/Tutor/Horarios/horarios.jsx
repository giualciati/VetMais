import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './horarios.css';
import Menu from '../../../components/Menu';

function Horarios(props) {
  const navigate = useNavigate();

  // Removendo dadosExemplo
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função auxiliar para formatar data e hora (do LocalDateTime do Java)
  const formatarDataHora = (dataHoraString) => {
    try {
      if (!dataHoraString) return { data: 'N/A', hora: 'N/A' };
      
      const dataHora = new Date(dataHoraString);
      
      // Formata a data para dd/mm/aaaa
      const data = dataHora.toLocaleDateString('pt-BR'); 

      // Formata a hora para hh:mm
      const hora = dataHora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
      
      return { data, hora };
    } catch (e) {
      return { data: 'Data Inválida', hora: 'Hora Inválida' };
    }
  };

  // ⭐️ useEffect para buscar os dados do backend
  useEffect(() => {
    const buscarHorarios = async () => {
      try {
        // MUDANÇA: Chamando o endpoint /agendas/todos
        // SUBSTITUA 'SUA_URL_DO_BACKEND' pela sua URL base (ex: http://localhost:8080)
        const resposta = await fetch('http://localhost:8080/agendas/todos'); 

        if (!resposta.ok) {
          throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        
        const horariosFormatados = dados.map(horario => {
            const { data, hora } = formatarDataHora(horario.dataHora);
            return {
                id: horario.id,
                tutor: horario.tutor, 
                especialidade: horario.especialidade, 
                data: data,
                hora: hora,
                status: horario.status 
            };
        });

        setHorarios(horariosFormatados); 
        setErro(null); 

      } catch (error) {
        console.error("Erro ao buscar horários:", error);
        setErro("Não foi possível carregar os horários. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    buscarHorarios();
  }, []); 


  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

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
  

  if (carregando) {
    return (
      <div className="prontuarios-pagina">
        <Menu />
        <main className="main-content-prontuarios">
          <h1 className="titulo-prontuarios">Horários Disponíveis</h1>
          <p>Carregando todos os horários...</p>
        </main>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="prontuarios-pagina">
        <Menu />
        <main className="main-content-prontuarios">
          <h1 className="titulo-prontuarios">Horários Disponíveis</h1>
          <p className="erro-mensagem">{erro}</p>
        </main>
      </div>
    );
  }


  return (
    <div className="prontuarios-pagina">

      {/* --- BARRA LATERAL (Sidebar) --- */}
      <Menu></Menu>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="main-content-prontuarios">

        {/* Título e botão "Novo" */}
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
              // Adicionei uma classe baseada no status para diferenciação visual (ex: status-agendado)
              <article key={horario.id} className={`horario-card status-${horario.status.toLowerCase().replace(' ', '-')}`}>
                
                {/* Opcional: Mostra o status para visualizar o motivo de não ser 'Disponível' */}
                <p className="horario-status">Status: {horario.status}</p> 
                
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
            <p className="lista-vazia">Nenhum horário cadastrado.</p>
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
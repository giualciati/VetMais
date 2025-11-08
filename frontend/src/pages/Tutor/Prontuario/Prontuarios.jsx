import React from 'react';
import './Prontuarios.css';

// O componente recebe 'prontuarios' (array) e 'onVerMaisClick' (função) das props
function Prontuarios(props) {
  const { prontuarios = [], onVerMaisClick } = props;

  return (
    <div className="prontuarios-pagina">
      
      {/* --- BARRA LATERAL (Sidebar) --- */}
      <aside className="sidebar-prontuarios">
        <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
        
        <nav className="sidebar-nav">
          <a href="#">Perfil</a>
          <a href="#" className="active">Prontuários</a>
          <a href="#">Agenda</a>
          <a href="#">Sair</a>
        </nav>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="main-content-prontuarios">
        <h1 className="titulo-prontuarios">Prontuários</h1>
        
        <div className="prontuario-tabela">
          
          <div className="prontuario-header">
            <span>Número de protocolo</span>
            <span>Nome</span>
            <span>Espécie</span>
            <span>Sexo</span>
            <span></span> {/* Coluna vazia para o link */}
          </div>

          {/* (Mapeando os dados das props) */}
          {prontuarios.map(prontuario => (
            <div className="prontuario-linha" key={prontuario.id}>
              <span><strong>{prontuario.protocolo}</strong></span>
              <span>{prontuario.nome}</span>
              <span>{prontuario.especie}</span>
              <span>{prontuario.sexo}</span>
              <span>
                <a 
                  href="#" 
                  className="ver-mais-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onVerMaisClick) {
                      onVerMaisClick(prontuario.id);
                    }
                  }}
                >
                  Ver mais
                </a>
              </span>
            </div>
          ))}

          {prontuarios.length === 0 && (
            <p className="lista-vazia">Nenhum prontuário encontrado.</p>
          )}
        </div>
        
        <div className="paginacao">
          <a href="#" className="page-link active">1</a>
          <a href="#" className="page-link">2</a>
          <a href="#" className="page-link">3</a>
        </div>
      </main>
    </div>
  );
}

export default Prontuarios;
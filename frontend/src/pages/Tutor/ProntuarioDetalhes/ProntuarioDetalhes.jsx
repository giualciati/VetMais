import React from 'react';
import './ProntuarioDetalhes.css';
// import logo from '../assets/logo.png'; 

// ATENÇÃO: Removi 'onVoltarClick' das props, pois ele não
// existe mais na nova imagem.
function ProntuarioDetalhes(props) {
  const { prontuario } = props;

  if (!prontuario) {
    return (
      <div className="detalhe-pagina">
        <p>Erro: Prontuário não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="detalhe-pagina">
      <div className="detalhe-card">
        
        {/* --- CABEÇALHO --- */}
        <header className="detalhe-header">
        <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
          <div className="detalhe-titulo-protocolo">
            <h1 className="detalhe-titulo">Prontuário</h1>
            <div className="detalhe-protocolo">
              <span>Protocolo</span>
              <span className="detalhe-protocolo-numero">
                {prontuario.protocolo}
              </span>
            </div>
          </div>
        </header>
        
        {/* O LINK DE VOLTAR FOI REMOVIDO PARA SEGUIR A IMAGEM */}

        {/* --- DADOS DO ANIMAL --- */}
        <section className="detalhe-secao-flex">
          <div className="detalhe-grupo-coluna">
            <label>Nome do Animal</label>
            <span>{prontuario.nome}</span>
            <label>Espécie</label>
            <span>{prontuario.especie}</span>
            <label>Nome Tutor</label>
            <span>{prontuario.tutor}</span>
            <label>Descrição do Animal</label>
            <span>{prontuario.descricao}</span>
          </div>
          <div className="detalhe-grupo-coluna">
            <label>Sexo</label>
            <span>{prontuario.sexo}</span>
            <label>Raça</label>
            <span>{prontuario.raca}</span>
            <label>RA</label>
            <span>{prontuario.ra}</span>
          </div>
          {/* Coluna 3 */}
          <div className="detalhe-grupo-coluna">
            <label>Data de Nascimento</label>
            <span>{prontuario.nascimento}</span>
          </div>
        </section>

        
        {/* --- DADOS DA CONSULTA --- */}
        <h2 className="detalhe-titulo-secao">Dados da Consulta</h2>
        
        <section className="detalhe-secao-flex">
          <div className="detalhe-grupo-coluna">
            <label>Veterinário(a)</label>
            <span>{prontuario.veterinario}</span>
          </div>
          <div className="detalhe-grupo-coluna">
            <label>Data</label>
            <span>{prontuario.data}</span>
          </div>
          <div className="detalhe-grupo-coluna">
            <label>Hora</label>
            <span>{prontuario.hora}</span>
          </div>
          <div className="detalhe-grupo-coluna">
            <label>Hospital</label>
            <span>{prontuario.hospital}</span>
          </div>
        </section>

        <section className="detalhe-secao-inline">
          <div className="detalhe-inline-grupo">
            <label>Sintomas</label> <br />
            <span>{prontuario.sintomas}</span>
          </div> 
          <div className="detalhe-inline-grupo">
            <label>Diagnóstico</label> <br />
            <span>{prontuario.diagnostico}</span>
          </div> 
          <div className="detalhe-inline-grupo">
            <label>Tratamento</label> <br />
            <span>{prontuario.tratamento}</span>
          </div> 
          <div className="detalhe-inline-grupo">
            <label>Observações</label> <br />
            <span>{prontuario.observacoes}</span>
          </div>
        </section>

        {/* --- RODAPÉ COM ÍCONE --- */}
        <footer className="detalhe-footer">
          <a href="#" className="download-icon">
            &#x21E3; 
          </a>
        </footer>

      </div>
    </div>
  );
}

export default ProntuarioDetalhes;
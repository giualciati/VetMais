import React, { useRef } from 'react'; 
import jsPDF from 'jspdf';            
import html2canvas from 'html2canvas'; 
import './ProntuarioDetalhes.css';


function ProntuarioDetalhes(props) {
  const { prontuario } = props;

  const cardRef = useRef(null);

  // Função de download
  const handleDownloadPDF = (event) => {
    event.preventDefault();

    if (!cardRef.current) {
      console.error("Erro: Card não encontrado para download.");
      return;
    }

    html2canvas(cardRef.current, { 
      scale: 2, 
      useCORS: true 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      // Cria um novo PDF no tamanho A4 
      const pdf = new jsPDF('p', 'mm', 'a4');
      

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`prontuario_${prontuario.protocolo || 'detalhes'}.pdf`);
    });
  };

  if (!prontuario) {
    return (
      <div className="detalhe-pagina">
        <p>Erro: Prontuário não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="detalhe-pagina">
      <div className="detalhe-card" ref={cardRef}>
        
        <div className="detalhe-card-conteudo">

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
            {/* 6. Mude de href="#" para onClick={handleDownloadPDF} */}
            <a href="#" className="download-icon" onClick={handleDownloadPDF}>
              &#x21E3; 
            </a>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default ProntuarioDetalhes;
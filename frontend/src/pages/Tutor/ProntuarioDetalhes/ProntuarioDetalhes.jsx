import React, { useRef, useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';            
import html2canvas from 'html2canvas'; 
import './ProntuarioDetalhes.css';

function ProntuarioDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [prontuario, setProntuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarProntuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/prontuarios/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProntuario(data);
        } else {
          console.error("Prontuário não encontrado");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) carregarProntuario();
  }, [id]);

  const formatarData = (dataISO) => {
    if (!dataISO) return '-';
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const formatarHora = (dataISO) => {
    if (!dataISO) return '-';
    return new Date(dataISO).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

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
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`prontuario_${prontuario?.protocolo || 'detalhes'}.pdf`);
    });
  };

  if (loading) {
    return <div className="detalhe-pagina"><p>Carregando dados...</p></div>;
  }

  if (!prontuario) {
    return (
      <div className="detalhe-pagina">
        <p>Erro: Prontuário não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="detalhe-pagina">
      <button className='btnVoltar'
        onClick={() => navigate("/prontuarioAnimal")} 
      >
        &larr; Voltar
      </button>

      <div className="detalhe-card" ref={cardRef}>
        
        <div className="detalhe-card-conteudo">


          <header className="detalhe-header">
            <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
            <div className="detalhe-titulo-protocolo">
              <h1 className="detalhe-titulo">Prontuário</h1>
              <div className="detalhe-protocolo">
                <span>Protocolo</span>
                <span className="detalhe-protocolo-numero">
                  {String(prontuario.protocolo).padStart(2, '0')}
                </span>
              </div>
            </div>
          </header>

          <section className="detalhe-secao-flex">
            <div className="detalhe-grupo-coluna">
              <label>Nome do Animal</label>
              <span>{prontuario.nomeAnimal}</span>
              
              <label>Espécie</label>
              <span>{prontuario.especie}</span>
              
              <label>Nome Tutor</label>
              <span>{prontuario.nomeTutor}</span>
              
              <label>Descrição do Animal</label>
              <span>{prontuario.descricaoAnimal}</span>
            </div>
            
            <div className="detalhe-grupo-coluna">
              <label>Sexo</label>
              <span>{prontuario.sexo}</span>
              
              <label>Raça</label>
              <span>{prontuario.raca}</span>
              
              <label>RA</label>
              <span>{prontuario.rga || '---'}</span>
            </div>
            
            <div className="detalhe-grupo-coluna">
              <label>Data de Nascimento</label>
              <span>{formatarData(prontuario.dataNascimento)}</span>
            </div>
          </section>

          
          {/* --- DADOS DA CONSULTA --- */}
          <h2 className="detalhe-titulo-secao">Dados da Consulta</h2>
          
          <section className="detalhe-secao-flex">
            <div className="detalhe-grupo-coluna">
              <label>Veterinário(a)</label>
              <span>{prontuario.nomeVeterinario}</span>
            </div>
            <div className="detalhe-grupo-coluna">
              <label>Data</label>
  
              <span>{formatarData(prontuario.dataAtendimento)}</span>
            </div>
            <div className="detalhe-grupo-coluna">
              <label>Hora</label>
              <span>{formatarHora(prontuario.dataAtendimento)}</span>
            </div>
            <div className="detalhe-grupo-coluna">
              <label>Hospital</label>
              <span>{prontuario.nomeHospital}</span>
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

          <footer className="detalhe-footer">
            <a href="#" className="download-icon" onClick={handleDownloadPDF} title="Baixar PDF">
              &#x21E3; 
            </a>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default ProntuarioDetalhes;
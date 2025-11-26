import React, { useState, useEffect } from 'react';
import './Prontuarios.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../../components/SideBar.jsx";

function Prontuarios() {
  const navigate = useNavigate();
  
  const [listaProntuarios, setListaProntuarios] = useState([]);
  const [loading, setLoading] = useState(true);


  const idSalvo = localStorage.getItem("idTutor");
  const ID_TUTOR_LOGADO = idSalvo ? JSON.parse(idSalvo) : 1; 


  useEffect(() => {
    const carregarProntuarios = async () => {
      try {
        const response = await fetch(`http://localhost:8080/prontuarios/tutor/${ID_TUTOR_LOGADO}`);
        
        if (response.status === 204) {
            setListaProntuarios([]); 
        } else if (response.ok) {
            const data = await response.json();
            setListaProntuarios(data);
        }
      } catch (error) {
        console.error("Erro ao buscar prontuários:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ID_TUTOR_LOGADO) {
        carregarProntuarios();
    }
  }, [ID_TUTOR_LOGADO]);


  const formatarProtocolo = (id) => String(id).padStart(2, '0');

  return (
    <div className="prontuariosTutor-pagina">
      
      <Sidebar />

      <main className="main-content-prontuariosTutor">
        <h1 className="titulo-prontuariosTutor">Prontuários</h1>
        
        <div className="prontuarioTutor-tabela">
          
          <div className="prontuarioTutor-header">
            <span>Número de protocolo</span>
            <span>Nome</span>
            <span>Espécie</span>
            <span>Sexo</span>
            <span></span>
          </div>

          {loading && <p style={{padding: '20px', textAlign: 'center'}}>Carregando...</p>}

          {!loading && listaProntuarios.map(item => (
            <div className="prontuario-linha" key={item.id_prontuario}>
              <span><strong>{formatarProtocolo(item.id_prontuario)}</strong></span>
              <span>{item.nm_animal}</span>
              <span>{item.especie_animal}</span>
              <span>{item.sexo_animal}</span>
              
              <span 
                className="ver-mais-btn"
                onClick={() => navigate(`/prontuarios/detalhes/${item.id_prontuario}`)} 
                style={{ cursor: 'pointer' }} 
              >
                Ver mais
              </span>
            </div>
          ))}

          {!loading && listaProntuarios.length === 0 && (
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
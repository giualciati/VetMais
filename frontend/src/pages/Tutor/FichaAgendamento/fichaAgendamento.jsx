import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './fichaAgendamento.css';

function FichaAgendamento() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [dados, setDados] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState('');

  useEffect(() => {
    const carregarFicha = async () => {
      try {
        const response = await fetch(`http://localhost:8080/agendamentos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDados(data);
          setStatusSelecionado(data.statusAgendamento); 
        } else {
          alert("Erro ao carregar agendamento");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    carregarFicha();
  }, [id]);

  const handleVoltar = () => {
    navigate('/agenda');
  };

  const handleSalvar = async () => {
    
    if (statusSelecionado === 'Cancelado' && dados.statusAgendamento !== 'Cancelado') {
      
      const confirmar = window.confirm("Tem certeza que deseja cancelar este agendamento? O horário será liberado.");
      
      if (confirmar) {
        try {
          const response = await fetch(`http://localhost:8080/agendamentos/${id}/cancelar`, {
            method: 'PUT'
          });

          if (response.ok) {
            alert("Agendamento cancelado com sucesso!");
            navigate('/agenda');
          } else {
            alert("Erro ao cancelar.");
          }
        } catch (error) {
          console.error("Erro:", error);
        }
      }
    } else {
      navigate('/agenda');
    }
  };

  if (!dados) return <div className="loading">Carregando ficha...</div>;


  const dataNasc = new Date(dados.dataNascimento).toLocaleDateString('pt-BR');
  const dataConsulta = new Date(dados.dataHora).toLocaleDateString('pt-BR');
  const horaConsulta = new Date(dados.dataHora).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

  return (
    <div className="ficha-container">
      <header>
        <img src="/logo.png" alt="Logo" className="logo-ficha" />
        <h1>Ficha de Agendamento</h1>
        <div className="protocolo">Protocolo <strong>{dados.protocolo}</strong></div>
      </header>

      <div className="ficha-content">
        {/* Bloco 1: Animal e Tutor */}
        <div className="row">
          <div className="campo">
            <label>Nome do Animal</label>
            <input type="text" value={dados.nomeAnimal} readOnly className="input-readonly" />
          </div>
          <div className="campo">
            <label>Raça</label>
            <input type="text" value={dados.raca} readOnly className="input-readonly" />
          </div>
          <div className="campo">
            <label>Data de Nascimento</label>
            <input type="text" value={dataNasc} readOnly className="input-readonly" />
          </div>
        </div>

        <div className="row">
           <div className="campo">
            <label>Espécie</label>
            <input type="text" value={dados.especie} readOnly className="input-readonly" />
          </div>
          <div className="campo">
            <label>Sexo</label>
            <input type="text" value={dados.sexo || ''} readOnly className="input-readonly" />
          </div>
           <div className="campo">
            <label>RGA</label>
            <input type="text" value={dados.rga || 'Não informado'} readOnly className="input-readonly" />
          </div>
        </div>

        <div className="row">
          <div className="campo full-width">
            <label>Nome Tutor</label>
            <input type="text" value={dados.nomeTutor} readOnly className="input-readonly" />
          </div>
        </div>

        <div className="row">
          <div className="campo full-width">
            <label>Descrição do Animal</label>
            <textarea readOnly value={dados.descricaoAnimal || ''} className="input-readonly" />
          </div>
        </div>

        <h2 className="titulo-secao">Dados da Consulta</h2>

        <div className="row">
          <div className="campo">
            <label>Veterinário(a)</label>
            <div className="valor-texto">{dados.nomeVeterinario}</div>
          </div>
          <div className="campo">
            <label>Hospital</label>
            <div className="valor-texto">{dados.nomeHospital}</div>
          </div>
          <div className="campo">
            <label>Especialidade</label>
            <div className="valor-texto">{dados.especialidade}</div>
          </div>
        </div>

        <div className="row last-row">
          <div className="campo">
            <label>Data</label>
            <div className="valor-texto">{dataConsulta}</div>
          </div>
          <div className="campo">
            <label>Hora</label>
            <div className="valor-texto">{horaConsulta}</div>
          </div>

          <div className="campo">
            <label>Status</label>
            <select 
                value={statusSelecionado} 
                onChange={(e) => setStatusSelecionado(e.target.value)}
                className="select-status"
                // Se já estiver cancelado ou concluído, não deixa mexer
                disabled={dados.statusAgendamento === 'Concluído' || dados.statusAgendamento === 'Cancelado'}
            >
                <option value="Agendado">Agendado</option>
                <option value="Cancelado">Cancelado</option>
                {/* Tutor não pode marcar como Concluído manualmente, então não colocamos */}
            </select>
          </div>
        </div>

        <div className="ficha-actions">
            <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
            <button className="btn-voltar" onClick={handleVoltar}>Voltar</button>
        </div>

      </div>
    </div>
  );
}

export default FichaAgendamento;


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
          setStatusSelecionado(data.statusAgendamento || 'Agendado');
        } else {
          alert('Erro ao carregar agendamento');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    carregarFicha();
  }, [id]);

  const handleVoltar = () => {
    navigate('/agenda');
  };

  const handleSalvar = async () => {
    // Se não mudou o status, só volta
    if (statusSelecionado === dados.statusAgendamento) {
      navigate('/agenda');
      return;
    }

    // Confirmação extra se for cancelar
    if (statusSelecionado === 'Cancelado' && dados.statusAgendamento !== 'Cancelado') {
      const confirmar = window.confirm(
        'Tem certeza que deseja cancelar este agendamento? O horário será liberado.'
      );
      if (!confirmar) return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/agendamentos/${id}/status`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statusAgendamento: statusSelecionado })
        }
      );
      if (response.ok) {
        alert('Status atualizado com sucesso!');
        navigate('/agenda');
      } else {
        alert('Erro ao atualizar status.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar status.');
    }
  };

  if (!dados) return <div className="loading">Carregando ficha...</div>;

  const dataNasc = dados.dataNascimento
    ? new Date(dados.dataNascimento).toLocaleDateString('pt-BR')
    : '';
  const dataConsulta = dados.dataHora
    ? new Date(dados.dataHora).toLocaleDateString('pt-BR')
    : '';
  const horaConsulta = dados.dataHora
    ? new Date(dados.dataHora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    : '';

  return (
    <div className="ficha-container-geral">
      <header className="ficha-header">
        <img src="/images/logo.png" alt="Logo" className="ficha-logo" />
        <h1 className="ficha-titulo-principal">Ficha de Agendamento</h1>
        <div className="ficha-protocolo">
          <strong>{dados.dataHora ? new Date(dados.dataHora).toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) + ' - ' + horaConsulta : ''}</strong>
        </div>
      </header>

      <div className="ficha-agendamento-box">
        {/* Bloco 1: Animal e Tutor */}
        <div className="ficha-protocolo">
          Protocolo <strong>{dados.protocolo}</strong>
        </div>
        <div className="row">
          <div className="campo">
            <label className="ficha-label">Nome do Animal</label>
            <input
              type="text"
              value={dados.nomeAnimal}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
          <div className="campo">
            <label className="ficha-label">Raça</label>
            <input
              type="text"
              value={dados.raca}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
          <div className="campo">
            <label className="ficha-label">Data de Nascimento</label>
            <input
              type="text"
              value={dataNasc}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
        </div>

        <div className="row">
          <div className="campo">
            <label className="ficha-label">Espécie</label>
            <input
              type="text"
              value={dados.especie}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
          <div className="campo">
            <label className="ficha-label">Sexo</label>
            <input
              type="text"
              value={dados.sexo || ''}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
          <div className="campo">
            <label className="ficha-label">RGA</label>
            <input
              type="text"
              value={dados.rga || 'Não informado'}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
        </div>

        <div className="row">
          <div className="campo full-width">
            <label className="ficha-label">Nome Tutor</label>
            <input
              type="text"
              value={dados.nomeTutor}
              readOnly
              className="ficha-input input-readonly"
            />
          </div>
        </div>

        <div className="row">
          <div className="campo full-width">
            <label className="ficha-label">Descrição do Animal</label>
            <textarea
              readOnly
              value={dados.descricaoAnimal || ''}
              className="ficha-textarea input-readonly"
            />
          </div>
        </div>

        <h2 className="ficha-titulo-secao">Dados da Consulta</h2>

        <div className="row">
          <div className="campo">
            <label className="ficha-label">Veterinário(a)</label>
            <div className="valor-texto">{dados.nomeVeterinario}</div>
          </div>
          <div className="campo">
            <label className="ficha-label">Hospital</label>
            <div className="valor-texto">{dados.nomeHospital}</div>
          </div>
          <div className="campo">
            <label className="ficha-label">Especialidade</label>
            <div className="valor-texto">{dados.especialidade}</div>
          </div>
        </div>

        <div className="row last-row">
          <div className="campo">
            <label className="ficha-label">Data</label>
            <div className="valor-texto">{dados.dataHora ? new Date(dados.dataHora).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : ''}</div>
          </div>
          <div className="campo">
            <label className="ficha-label">Hora</label>
            <div className="valor-texto">{horaConsulta}</div>
          </div>

          <div className="campo">
            <label className="ficha-label">Status</label>
            <select
              value={statusSelecionado}
              onChange={(e) => setStatusSelecionado(e.target.value)}
              className={`ficha-select select-status ${statusSelecionado}`}
              disabled={
                dados.statusAgendamento === 'Concluído' ||
                dados.statusAgendamento === 'Cancelado'
              }
            >
              <option value="Atendido">Atendido</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="ficha-footer">
          <button className="ficha-btn-salvar" onClick={handleSalvar}>
            Salvar
          </button>
          <button className="ficha-btn-voltar" onClick={handleVoltar}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FichaAgendamento;

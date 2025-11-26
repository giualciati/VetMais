import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './fichaAgendamento.css';
import logo from '../../../assets/images/Logo.png';

function FichaAgendamento() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Inicializamos com objeto vazio {} para a tela renderizar na hora
  const [dados, setDados] = useState({});
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [loading, setLoading] = useState(true); // Controle de loading separado

  useEffect(() => {
    const carregarFicha = async () => {
      try {
        const response = await fetch(`http://localhost:8080/agendamentos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDados(data);
          setStatusSelecionado(data.statusAgendamento || 'Agendado');
        } else {
          // Se der erro, não faz nada, apenas deixa os campos vazios
          console.warn('Agendamento não encontrado ou erro na API');
        }
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false); // Finaliza o loading independente do resultado
      }
    };

    if (id) {
        carregarFicha();
    } else {
        setLoading(false);
    }
  }, [id]);

  const handleVoltar = () => {
    navigate('/agenda');
  };

  const handleSalvar = async () => {
    if (statusSelecionado === dados?.statusAgendamento) {
      navigate('/agenda');
      return;
    }

    if (statusSelecionado === 'Cancelado' && dados?.statusAgendamento !== 'Cancelado') {
      const confirmar = window.confirm(
        'Tem certeza que deseja cancelar este agendamento? O horário será liberado.'
      );

      if (confirmar) {
        try {
          const response = await fetch(
            `http://localhost:8080/agendamentos/${id}/cancelar`,
            { method: 'PUT' }
          );

          if (response.ok) {
            alert('Agendamento cancelado com sucesso!');
            navigate('/agenda');
          } else {
            alert('Erro ao cancelar.');
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      }
    } else {
      navigate('/agenda');
    }
  };

  // 2. Tratamento seguro das datas (só formata se existir)
  const formatarData = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const formatarHora = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });
  };

  if (loading) return <div className="loading">Carregando ficha...</div>;

  return (
    <div className="page-agendamento-wrapper">
      
      <div className="ficha-container">
        
        <header>
          <img src={logo} alt="Logo" className="logo-ficha" />
          <h1>Ficha de Agendamento</h1>
          <div className="protocolo">
            Protocolo <strong>{dados?.protocolo || '---'}</strong>
          </div>
        </header>

        <div className="ficha-content">
          <div className="row">
            <div className="campo">
              <label>Nome do Animal</label>
              <input type="text" value={dados?.nomeAnimal || ''} readOnly className="input-readonly" placeholder="Não informado" />
            </div>
            <div className="campo">
              <label>Raça</label>
              <input type="text" value={dados?.raca || ''} readOnly className="input-readonly" />
            </div>
            <div className="campo">
              <label>Data de Nascimento</label>
              <input type="text" value={formatarData(dados?.dataNascimento)} readOnly className="input-readonly" />
            </div>
          </div>

          <div className="row">
            <div className="campo">
              <label>Espécie</label>
              <input type="text" value={dados?.especie || ''} readOnly className="input-readonly" />
            </div>
            <div className="campo">
              <label>Sexo</label>
              <input type="text" value={dados?.sexo || ''} readOnly className="input-readonly" />
            </div>
            <div className="campo">
              <label>RGA</label>
              <input type="text" value={dados?.rga || 'Não informado'} readOnly className="input-readonly" />
            </div>
          </div>

          <div className="row">
            <div className="campo full-width">
              <label>Nome Tutor</label>
              <input type="text" value={dados?.nomeTutor || ''} readOnly className="input-readonly" />
            </div>
          </div>

          <div className="row">
            <div className="campo full-width">
              <label>Descrição do Animal</label>
              <textarea readOnly value={dados?.descricaoAnimal || ''} className="input-readonly" />
            </div>
          </div>

          <h2 className="titulo-secao">Dados da Consulta</h2>

          <div className="row">
            <div className="campo">
              <label>Veterinário(a)</label>
              <div className="valor-texto">{dados?.nomeVeterinario || '-'}</div>
            </div>
            <div className="campo">
              <label>Hospital</label>
              <div className="valor-texto">{dados?.nomeHospital || '-'}</div>
            </div>
            <div className="campo">
              <label>Especialidade</label>
              <div className="valor-texto">{dados?.especialidade || '-'}</div>
            </div>
          </div>

          <div className="row last-row">
            <div className="campo">
              <label>Data</label>
              <div className="valor-texto">{formatarData(dados?.dataHora)}</div>
            </div>
            <div className="campo">
              <label>Hora</label>
              <div className="valor-texto">{formatarHora(dados?.dataHora)}</div>
            </div>

            <div className="campo">
              <label>Status</label>
              <select
                value={statusSelecionado}
                onChange={(e) => setStatusSelecionado(e.target.value)}
                className={`select-status ${statusSelecionado}`}
                disabled={dados?.statusAgendamento === 'Concluído' || dados?.statusAgendamento === 'Cancelado' || !dados?.idAgenda}
              >
                <option value="">Selecione</option>
                <option value="Agendado">Agendado</option>
                <option value="Atendido">Atendido</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="ficha-actions">
            <button className="btn-salvar" onClick={handleSalvar} disabled={!dados?.idAgenda}>Salvar</button>
            <button className="btn-voltar" onClick={handleVoltar}>Voltar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaAgendamento;
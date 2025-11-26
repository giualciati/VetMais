import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './agendarServico.css'; 
import logo from '../../../assets/images/Logo.png';

function AgendarServico() {
  const navigate = useNavigate();
  
  // --- ESTADOS ---
  const [pets, setPets] = useState([]); 
  const [horarios, setHorarios] = useState([]); 
  const [cep, setCep] = useState('');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  
  const [procedimento, setProcedimento] = useState(''); 
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedHorarioId, setSelectedHorarioId] = useState(null);

  const [carregando, setCarregando] = useState(false);

  // Simulação do Tutor logado
  const idSalvo = localStorage.getItem("idTutor");
  const ID_TUTOR_LOGADO = idSalvo ? JSON.parse(idSalvo) : 1; 

  // Vou mudar aqui ainda
  const listaProcedimentos = ["Consulta Geral", "Vacinação", "Cirurgia", "Ortopedia", "Dermatologia", "Cardiologia", "Exames"];

  useEffect(() => {
    const buscarPetsDoTutor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/animais/tutor/${ID_TUTOR_LOGADO}`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    if (ID_TUTOR_LOGADO) {
        buscarPetsDoTutor();
    }
  }, [ID_TUTOR_LOGADO]);

  // --- BUSCAR HORÁRIOS DISPONÍVEIS (Filtro por Procedimento e Cidade) ---
  useEffect(() => {
    const carregarHorarios = async () => {
      setCarregando(true);
      try {
        let url = 'http://localhost:8080/agendas/disponiveis';
        
        const params = [];
        
        if (procedimento) {
          params.push(`especialidade=${encodeURIComponent(procedimento)}`);
        }
        
        if (cidadeFiltro) {
          params.push(`cidade=${encodeURIComponent(cidadeFiltro)}`);
        }
        
        if (params.length > 0) {
          url += '?' + params.join('&');
        }
        
        console.log(`URL de busca: ${url}`);
        
        const response = await fetch(url);
        const data = await response.json();
        
        setHorarios(data); 
        setSelectedHorarioId(null);
        
      } catch (error) {
        console.error("Erro ao buscar agendas:", error);
        setHorarios([]);
      } finally {
        setCarregando(false);
      }
    };

    carregarHorarios();
  }, [procedimento, cidadeFiltro]); 

  // --- LÓGICA DO CEP (ViaCEP) ---
  const buscarCep = async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, ''); 
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setCidadeFiltro(data.localidade); 
      } else {
        setCidadeFiltro('');
      }
    } catch (error) {
      console.error("Erro CEP:", error);
      setCidadeFiltro('');
    }
  };


  const formatarData = (dataString) => {
    const dataObj = new Date(dataString); 
    if (isNaN(dataObj)) {
      return { data: 'Data inválida', hora: '' };
    }
    return {
      data: dataObj.toLocaleDateString('pt-BR'),
      hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleAgendar = async (e) => {
    e.preventDefault();

    if (!selectedPetId || !selectedHorarioId) {
        alert("Por favor, selecione um Pet e um Horário!");
        return;
    }


    const payload = {
        idAgenda: selectedHorarioId, 
        idAnimal: selectedPetId,
        idTutor: ID_TUTOR_LOGADO
    };

    try {
      const response = await fetch('http://localhost:8080/agendamentos/novo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("✅ Agendamento realizado com sucesso!");
        navigate('/agenda');
      } else {
        const erroMsg = await response.text();
        alert("❌ Erro ao agendar: " + erroMsg);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com o servidor. Verifique se o backend está rodando.");
    }
  };

  const handleCancelar = () => {
    navigate('/agenda'); 
  };

  const semHorarios = !carregando && horarios.length === 0;

  return (
    <section className="agendar-servico">
      <div className="agendar-servico-container">

        <header className='agendar-header'>
          <img src={logo} alt="Vet+ Logo" className="logo" /> 
          <div className="titulo-container">
            <h1 className="titulo-agendar">Agendar Serviço</h1>
          </div>
        </header>

        <form className="form-agendamento" onSubmit={handleAgendar}>
          
          <div className="form-row-inputs">
            
            <div className="form-grupo">
              <label htmlFor="procedimento">Selecione o procedimento:</label>
              <select 
                id="procedimento" 
                value={procedimento} 
                onChange={(e) => setProcedimento(e.target.value)}
              >
                <option value="">Todos</option>
                {listaProcedimentos.map(proc => (
                  <option key={proc} value={proc}>{proc}</option>
                ))}
              </select>
            </div>
            <div className="form-grupo">
              <label htmlFor="cep">
                {cidadeFiltro ? `Filtrando por: ${cidadeFiltro}` : "Digite seu CEP:"}
              </label>
              <input 
                type="text" 
                id="cep" 
                value={cep} 
                onChange={(e) => setCep(e.target.value)}
                onBlur={(e) => buscarCep(e.target.value)}
                placeholder="Ex: 01310-100"
              />
            </div>
          </div>

          {semHorarios && (
            <div className="mensagem-sem-horarios">
              ⚠️ Não encontramos horários disponíveis com esses filtros.
            </div>
          )}

          <h2 className="secao-titulo">Selecione o PET:</h2>
          <div className="pet-list">
            {pets.length > 0 ? (
                pets.map(pet => {
                  const idRealPet = pet.id || pet.id_animal;
                  const nomeRealPet = pet.nome || pet.nm_animal;
                  const especieReal = pet.especie || pet.especie_animal;
                  const racaReal = pet.raca || pet.raca_animal;

                  return (
                    <div 
                        key={idRealPet}
                        className={`pet-card ${idRealPet === selectedPetId ? 'selected' : ''}`}
                        onClick={() => setSelectedPetId(idRealPet)}
                    >
                        <h3>🐶 {nomeRealPet}</h3>
                        <p>{especieReal} - {racaReal}</p>
                    </div>
                  );
                })
            ) : (
                <p>Nenhum pet encontrado para este tutor.</p>
            )}
          </div>

          <h2 className="secao-titulo">
            {cidadeFiltro 
              ? `Horários em ${cidadeFiltro}:` 
              : 'Horários disponíveis (Todas as cidades):'}
          </h2>

          <div className="horario-list-container">
            <div className="horario-list">
              
              {horarios.map(item => {
                const { data, hora } = formatarData(item.dataHora);
                return (
                  <div 
                    key={item.idAgenda} 
                    className={`horario-card ${item.idAgenda === selectedHorarioId ? 'selected' : ''}`}
                    onClick={() => setSelectedHorarioId(item.idAgenda)}
                  >
                    <h3>👩‍⚕️ {item.nomeVeterinario}</h3>
                    <p>🩺 {item.nomeServico}</p>
                    <p>📅 {data}</p>
                    <p>⏰ {hora}</p>
                    <p>📍 {item.cidade || "Local não inf."}</p> 
                  </div>
                );
              })}

              {horarios.length === 0 && !semHorarios && (
                 <p className="horario-nao-encontrado">Nenhum horário disponível no momento.</p>
              )}

            </div>
          </div>

          <footer className="agendar-footer">
            
            <button type="button" className="btn btn-cancelar-ag" onClick={handleCancelar} >
              Cancelar
            </button>
            <button type="submit" className="btn btn-agendar-ag" disabled={!selectedPetId || !selectedHorarioId}>
              Agendar
            </button>
          </footer>

        </form>
      </div>
    </section>
  );
}

export default AgendarServico;
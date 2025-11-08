import React, { useState } from 'react';
import './agendarServico.css';

function AgendarServico(props) {
  // --- Dados que vai vir do banco (via props) ---
  const { 
    pets = [], 
    procedimentos = [], 
    horarios = []
  } = props;

  // --- ESTADO INTERNO (o que o usuário seleciona) ---
  const [cep, setCep] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedHorarioId, setSelectedHorarioId] = useState(null);

  // --- LÓGICA DO CEP ---
  const [cidadeFiltro, setCidadeFiltro] = useState('');

  // Função que busca o CEP na API
  const buscarCep = async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, ''); 
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        console.error("CEP não encontrado");
        setCidadeFiltro(''); 
      } else {
        console.log("Endereço encontrado:", data);
        setCidadeFiltro(data.localidade); 
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCidadeFiltro('');
    }
  };

  // Filtra os horários com base na cidade do CEP
  const horariosFiltrados = cidadeFiltro
    ? horarios.filter(h => h.cidade && h.cidade.toLowerCase() === cidadeFiltro.toLowerCase())
    : horarios;

  return (
    <section className="agendar-servico">
      <div className="agendar-servico-container">

        <header className='agendar-header'>
          <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
          <div className="titulo-container">
            <h1 className="titulo-agendar">Agendar Serviço</h1>
          </div>
        </header>

        <form className="form-agendamento">
          
          <div className="form-row-inputs">
            <div className="form-grupo">
              <label htmlFor="cep">Digite seu CEP:</label>
              <input 
                type="text" 
                id="cep" 
                value={cep} 
                onChange={(e) => setCep(e.target.value)}
                //Chama a função buscarCep ao sair do campo
                onBlur={(e) => buscarCep(e.target.value)}
                placeholder="Ex: 01310100"
              />
            </div>
            <div className="form-grupo">
              <label htmlFor="procedimento">Selecione o procedimento/especialidade:</label>
              <select 
                id="procedimento" 
                value={procedimento} 
                onChange={(e) => setProcedimento(e.target.value)}
              >
                <option value="">Selecione...</option>
                {procedimentos.map(proc => (
                  <option key={proc} value={proc}>{proc}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="secao-titulo">Selecione o PET:</h2>
          <div className="pet-list">
            {pets.map(pet => (
              <div 
                key={pet.id} 
                className={`pet-card ${pet.id === selectedPetId ? 'selected' : ''}`}
                onClick={() => setSelectedPetId(pet.id)}
              >
                <h3>🐶 {pet.nome}</h3>
                <p>🐱 {pet.especie}</p>
                <p>♀️ {pet.genero}</p> 
                <p>🐾 {pet.raca}</p>
                <p>📅 {pet.nascimento}</p>
              </div>
            ))}
          </div>

          <h2 className="secao-titulo">
            {cidadeFiltro 
              ? `Horários disponíveis em ${cidadeFiltro}:` 
              : 'Horários disponíveis:'}
          </h2>

          <div className="horario-list-container">
            <div className="horario-list">
              
              {/* Mapeando 'horariosFiltrados' */}
              {horariosFiltrados.map(horario => (
                <div 
                  key={horario.id} 
                  className={`horario-card ${horario.id === selectedHorarioId ? 'selected' : ''}`}
                  onClick={() => setSelectedHorarioId(horario.id)}
                >
                  <h3>👩‍⚕️ {horario.vet}</h3>
                  <p>🩺 {horario.especialidade}</p>
                  <p>📅 {horario.data}</p>
                  <p>⏰ {horario.hora}</p>
                  <p>📍 {horario.cidade}</p>
                </div>
              ))}

              {/* Mensagem se o filtro não retornar nada */}
              {horariosFiltrados.length === 0 && cidadeFiltro && (
                <p className="horario-nao-encontrado">
                  Nenhum horário encontrado para a cidade de {cidadeFiltro}.
                </p>
              )}

            </div>
          </div>

          {/* --- BOTÕES --- */}
          <footer className="agendar-footer">
            <button type="button" className="btn btn-cancelar-ag">Cancelar</button>
            <button type="submit" className="btn btn-agendar-ag">Agendar</button>
          </footer>

        </form>
      </div>
    </section>
  );
}

export default AgendarServico;
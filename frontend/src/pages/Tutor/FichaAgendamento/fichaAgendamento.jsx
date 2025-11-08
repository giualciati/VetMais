import React, { useState } from 'react';
import './fichaAgendamento.css';


function FichaAgendamento(props) {
  
  const [nomeAnimal, setNomeAnimal] = useState(props.nomeAnimal || '');
  const [especie, setEspecie] = useState(props.especie || '');
  const [nomeTutor, setNomeTutor] = useState(props.nomeTutor || '');
  const [descricao, setDescricao] = useState(props.descricao || '');
  
  const [status, setStatus] = useState(props.status || 'Agendado'); 

  return (
    <div className="container-geral"> 
      <div className="ficha-agendamento">
        
        <header className="ficha-header">
          <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
          
          <div className="titulo-protocolo">
            <h1 className="titulo-principal">Ficha de Agendamento</h1>
            <div className="protocolo">
              <span>Protocolo</span>
              <span className="protocolo-numero">{props.protocolo || '01'}</span>
            </div>
          </div>
        </header>

        <form className="ficha-form">
          
          <section className="dados-animal">
            <div className="form-grupo-coluna">
              <label htmlFor="nomeAnimal">Nome do Animal</label>
              <input 
                type="text" 
                id="nomeAnimal" 
                value={nomeAnimal}
                onChange={(e) => setNomeAnimal(e.target.value)}
              />
              
              <label htmlFor="especie">Espécie</label>
              <input 
                type="text" 
                id="especie" 
                value={especie}
                onChange={(e) => setEspecie(e.target.value)} 
              />

              <label htmlFor="nomeTutor">Nome Tutor</label>
              <input 
                type="text" 
                id="nomeTutor" 
                value={nomeTutor} 
                onChange={(e) => setNomeTutor(e.target.value)}
              />
            </div>

            <div className="form-grupo-coluna">
              <label htmlFor="sexo">Sexo</label>
              <input type="text" id="sexo" defaultValue={props.sexo || ''} />

              <label htmlFor="raca">Raça</label>
              <input type="text" id="raca" defaultValue={props.raca || ''} />

              <label htmlFor="ra">RA</label>
              <input type="text" id="ra" defaultValue={props.ra || ''} />
            </div>

            <div className="form-grupo-coluna">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input type="text" id="dataNascimento" defaultValue={props.dataNascimento || ''} />
            </div>
          </section>

          <div className="form-grupo-descricao">
            <label htmlFor="descricao">Descrição do Animal</label>
            <textarea 
              id="descricao" 
              rows="3"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            >
            </textarea>
          </div>

          <h2 className="titulo-secao">Dados da Consulta</h2>
          <section className="dados-consulta">
            <div className="form-grupo-coluna">
              <label>Veterinário(a)</label>
              <span>{props.veterinario || 'Não informado'}</span>

              <label>Data</label>
              <span>{props.data || 'Não informada'}</span>
            </div>
            
            <div className="form-grupo-coluna">
              <label>Hospital</label>
              <span>{props.hospital || 'Não informado'}</span>

              <label>Hora</label>
              <span>{props.hora || 'Não informada'}</span>
            </div>

            <div className="form-grupo-coluna">
              <label>Especialidade</label>
              <span>{props.especialidade || 'Não informada'}</span>

              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`status-select ${status}`} 
              >
                <option value="Agendado">Agendado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </section>

          <footer className="ficha-footer">
            <button type="submit" className="btn btn-salvar">Salvar</button>
            <button type="button" className="btn btn-voltar">Voltar</button>
          </footer>

        </form>
      </div>
    </div>
  );
}

export default FichaAgendamento;
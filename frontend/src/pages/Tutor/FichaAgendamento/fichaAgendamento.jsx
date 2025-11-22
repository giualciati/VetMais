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
          <div className='logo'><img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
          </div>

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
                placeholder="Não informado"
              />
              <div className="especie"></div>
              <label htmlFor="especie">Espécie</label>
              <input
                type="text"
                id="especie"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                placeholder="Não informado"
              />

              <label htmlFor="nomeTutor">Nome Tutor</label>
              <input
                type="text"
                id="nomeTutor"
                value={nomeTutor}
                onChange={(e) => setNomeTutor(e.target.value)}
                placeholder="Não informado"
              />
            </div>

            <div className="form-grupo-coluna">
              <label htmlFor="sexo">Sexo</label>
              <input type="text" id="sexo" defaultValue={props.sexo || ''}
                placeholder="Não informado"
              />


              <div className="form-grupo-coluna data">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input type="date" id="dataNascimento" defaultValue={props.dataNascimento || ''} />
              </div>

              <label htmlFor="raca">Raça</label>
              <input type="text" id="raca" defaultValue={props.raca || ''}
                placeholder="Não informado" />


              <label htmlFor="ra">RA</label>
              <input type="text" id="ra" defaultValue={props.ra || ''}
                placeholder="Não informado" />
            </div>
            {/* 
            <div className="form-grupo-coluna">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input type="date" id="dataNascimento" defaultValue={props.dataNascimento || ''} />
            </div> */}

          </section>


          <div className="form-grupo-descricao">
            <label htmlFor="descricao">Descrição do Animal</label>
            <textarea
              id="descricao"
              rows="3"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Não informado"
            >
            </textarea>
          </div>

          <h2 className="titulo-secao">Dados da Consulta</h2>
          <section className="dados-consulta">
            {/* Veterinário */}
            <div className="vet">
              <label htmlFor="veterinario">Veterinário(a)</label>
              <input
                type="text"
                id="veterinario"
                defaultValue={props.veterinario || ''}
                placeholder="Não informado"
              />
            </div>

            {/* Hospital e Hora */}
            <div className="form-grupo-coluna">
              <label htmlFor="hospital">Hospital</label>
              <input
                type="text"
                id="hospital"
                defaultValue={props.hospital || ''}
                placeholder="Não informado"
              />
              <div className="form-grupo-hora"></div>
              <label htmlFor="hora">Hora</label>
              <input
                type="time"
                id="hora"
                defaultValue={props.hora || ''}
                placeholder="Não informada"
              />
            </div>


            <div className="form-grupo-coluna">
              <label htmlFor="especialidade">Especialidade</label>
              <input
                type="text"
                id="especialidade"
                defaultValue={props.especialidade || ''}
                placeholder="Não informada"
              />

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
            <button type="button" className="btn-ficha btn-voltar-ficha">Voltar</button>
          </footer>

        </form>
      </div>
    </div>
  );
}

export default FichaAgendamento;
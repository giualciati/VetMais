import '../NovoProntuario/novoProntuario.scss';




export default function EditaProntuario() {
  return (
    <section className="novo-prontuario-page">
      
      <div className="titulo-container">
        <h1 className="titulo-prontuario">Editar Prontuário</h1>
      </div>

      <section className="prontuario-forms-container">

        {/* FORMULÁRIO ESQUERDO */}
        <form className="form-esquerdo">
          <div className="input-garfield-container">
            
            <div className="imagem-garfield-container">
              <img
                className="garfield-imagem"
                src="/images/Garfield.png"
                alt="Garfield"
              />
            </div>

            <div className="inputs-bloco-1">
              <label className="label-prontuario" htmlFor="nomeAnimal">Nome do Animal:</label>
              <input className="input-prontuario" type="text" id="nomeAnimal" required />

              <label className="label-prontuario" htmlFor="nomeTutor">Nome do Tutor:</label>
              <input className="input-prontuario" type="text" id="nomeTutor" required />
            </div>
          </div>

          <div className="card-inputs-container">
            
            <div className="inputs-bloco-2">
              <label className="label-prontuario" htmlFor="nomeEspecie">Espécie:</label>
              <input className="input-prontuario" type="text" id="nomeEspecie" required />

              <label className="label-prontuario" htmlFor="nascimento">Data de Nascimento:</label>
              <input className="input-prontuario" type="date" id="nascimento" required />
            </div>

            <div className="inputs-bloco-2">
              <label className="label-prontuario" htmlFor="raca">Raça:</label>
              <input className="input-prontuario" type="text" id="raca" required />

              <label className="label-prontuario" htmlFor="sexo">Sexo:</label>
              <input className="input-prontuario" type="text" id="sexo" required />
            </div>

          </div>

          <div className="textarea-container">
            <label className="label-prontuario" htmlFor="descricaoAnimal">Descrição do Animal:</label>
            <textarea className="textarea-prontuario" id="descricaoAnimal" required />

            <label className="label-prontuario" htmlFor="sintomasAnimal">Sintomas:</label>
            <textarea className="textarea-prontuario" id="sintomasAnimal" required />
          </div>
        
        </form>

        {/* FORMULÁRIO DIREITO */}
        <form className="form-direito">

          <div className="input-garfield-container">
            
            <div className="imagem-garfield-container">
              <img
                className="tutor-garfield-imagem"
                src="/images/tutor_Garfield.png"
                alt="Tutor Garfield"
              />
            </div>

            <div className="textarea-bloco-1">
              <label className="label-prontuario" htmlFor="diagnostico">Diagnóstico:</label>
              <textarea className="textarea-prontuario" id="diagnostico" required />
            </div>

          </div>

          <div className="textarea-container-2">
            <div className="textarea-bloco-2">
              <label className="label-prontuario" htmlFor="tratamento">Tratamento:</label>
              <textarea className="textarea-prontuario" id="tratamento" required />

              <label className="label-prontuario" htmlFor="observacoes">Observações médicas:</label>
              <textarea className="textarea-prontuario" id="observacoes" required />
            </div>
          </div>

          <div className="inputs-final-container">

            <div className="formato-bloco">
              <label className="label-prontuario" htmlFor="dataAtendimento">Data de Atendimento:</label>
              <input className="input-prontuario" type="date" id="dataAtendimento" required />
            </div>

            <div className="formato-bloco">
              <label className="label-prontuario" htmlFor="horaAtendimento">Horário do Atendimento:</label>
              <input className="input-prontuario" type="time" id="horaAtendimento" required />
            </div>

            <div className="botoes-container">
              <button type="submit" className="btn-salvar">Salvar</button>
            </div>

          </div>

        </form>
      </section>

    </section>
  );
}

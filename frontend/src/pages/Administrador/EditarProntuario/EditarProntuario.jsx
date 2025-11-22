import '../NovoProntuario/novoProntuario.css';



export default function EditarProntuario() {
  return (
    <section className='prontuarioNovo'>
      <div className="titulo-prontuario">
        <h1 className='h1-prontuario'>Prontuário</h1>
      </div>

      <section className="forms-prontuario">
        <form >
          <div className="input-Garfield">
            <div>
              <img
                className="garfield"
                src="/images/Garfield.png"
                alt="Garfield"
              />
            </div>

            <div className="inputs-1">
              <label htmlFor="nomeAnimal">Nome do Animal:</label>
              <input className='input-prontuario1' type="text" id="nomeAnimal" required />
              <label htmlFor="nomeTutor">Nome do Tutor:</label>
              <input className='input-prontuario1' type="text" id="nomeTutor" required />
            </div>
          </div>

          <div className="card-input1">
            <div className="inputs-2">
              <label htmlFor="nomeEspecie">Espécie:</label>
              <input className='input-prontuario2' type="text" id="nomeEspecie" required />
              <label htmlFor="nascimento">Data de Nascimento:</label>
              <input className='input-prontuario2' type="date" id="nascimento" required />
            </div>

            <div className="inputs-2">
              <label htmlFor="raca">Raça:</label>
              <input className='input-prontuario2' type="text" id="raca" required />
              <label htmlFor="sexo">Sexo:</label>
              <input className='input-prontuario2' type="text" id="sexo" required />
            </div>
          </div>

          <div className="container-textarea">
            <label htmlFor="descricaoAnimal">Descrição do Animal:</label>
            <textarea className='textarea-pront' id="descricaoAnimal" required></textarea>

            <label htmlFor="sintomasAnimal">Sintomas:</label>
            <textarea className='textarea-pront' id="sintomasAnimal" required></textarea>
          </div>
        </form>

        <form>
          <div className="input-Garfield">
            <div>
              <img
                className="tutor-garfield"
                src="/images/tutor_Garfield.png"
                alt="Tutor Garfield"
              />
            </div>

            <div className="textarrea-1">
              <label htmlFor="diagnostico">Diagnóstico:</label>
              <textarea className='textarea-pront' id="diagnostico" required></textarea>
            </div>
          </div>

          <div className="container-textarea">
            <div className="textarea-2">
              <label htmlFor="tratamento">Tratamento:</label>
              <textarea  className='textarea-pront' id="tratamento" required></textarea>

              <label htmlFor="observacoes">Observações médicas:</label>
              <textarea  className='textarea-pront' id="observacoes" required></textarea>
            </div>
          </div>

          <div className="inputs-3">
            <div className="formato">
              <label htmlFor="dataAtendimento">Data de Atendimento:</label>
              <input className='input-prontuario3' type="date" id="dataAtendimento" required />
            </div>

            <div className="formato">
              <label htmlFor="horaAtendimento">Horário do Atendimento:</label>
              <input className='input-prontuario3' type="time" id="horaAtendimento" required />
            </div>

            <div>
              <button className="btn-salvar" type="submit">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

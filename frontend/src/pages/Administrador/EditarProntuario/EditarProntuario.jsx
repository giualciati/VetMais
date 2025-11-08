import './editarProntuarios.css';

export default function EditarProntuario() {
  return (
    <section>
      <div className="titulo">
        <h1>Editar Prontuário</h1>
      </div>

      <section className="forms-prontuario">
        <form>
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
              <input type="text" id="nomeAnimal" required />
              <label htmlFor="nomeTutor">Nome do Tutor:</label>
              <input type="text" id="nomeTutor" required />
            </div>
          </div>

          <div className="card-input1">
            <div className="inputs-2">
              <label htmlFor="nomeEspecie">Espécie:</label>
              <input type="text" id="nomeEspecie" required />
              <label htmlFor="nascimento">Data de Nascimento:</label>
              <input type="date" id="nascimento" required />
            </div>

            <div className="inputs-2">
              <label htmlFor="raca">Raça:</label>
              <input type="text" id="raca" required />
              <label htmlFor="sexo">Sexo:</label>
              <input type="text" id="sexo" required />
            </div>
          </div>

          <div className="container-textarea">
            <label htmlFor="descricaoAnimal">Descrição do Animal:</label>
            <textarea id="descricaoAnimal" required></textarea>

            <label htmlFor="sintomasAnimal">Sintomas:</label>
            <textarea id="sintomasAnimal" required></textarea>
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
              <textarea id="diagnostico" required></textarea>
            </div>
          </div>

          <div className="container-textarea">
            <div className="textarea-2">
              <label htmlFor="tratamento">Tratamento:</label>
              <textarea id="tratamento" required></textarea>

              <label htmlFor="observacoes">Observações médicas:</label>
              <textarea id="observacoes" required></textarea>
            </div>
          </div>

          <div className="inputs-3">
            <div className="formato">
              <label htmlFor="dataAtendimento">Data de Atendimento:</label>
              <input type="date" id="dataAtendimento" required />
            </div>

            <div className="formato">
              <label htmlFor="horaAtendimento">Horário do Atendimento:</label>
              <input type="time" id="horaAtendimento" required />
            </div>

            <div>
              <button className="btn-salvar" type="submit">
                Salvar
              </button>
              <button className="btn-cancelar" type="button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

import './infosProntuarios.scss';


export default function InfosProntuario() {
  return (
    <section>
      <form>
        <div className="div-1">
          <img
            className="logo"
            src="/images/logo.png"
            alt="logo vetmais"
          />
          <div className="protocolo">
            <h1>Protocolo</h1>
            <h2>01</h2>
          </div>
        </div>

        <div className="principal">
          <div className="div-2">
            <h1>Prontuário</h1>
          </div>

          <div className="div-3">
            <div className="formatacao1">
              <p className="titulo"><strong>Nome do Animal</strong></p>
              <p>Nina Rosa Santos</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Sexo</strong></p>
              <p>Fêmea</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Data de Nascimento</strong></p>
              <p>13/07/2013</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao1">
              <p className="titulo"><strong>Espécie</strong></p>
              <p>Canina</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Raça</strong></p>
              <p>Indefinida</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>RGA</strong></p>
              <p>00.000.000-0</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao1">
              <p className="titulo"><strong>Nome do Tutor</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao2">
              <p className="titulo"><strong>Descrição do Animal</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="protocolo">
            <h1>Dados da Consulta</h1>
          </div>

          <div className="div-3">
            <div className="formatacao1">
              <p className="titulo"><strong>Veterinário(a)</strong></p>
              <p>Canina</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Data</strong></p>
              <p>Indefinida</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Hora</strong></p>
              <p>00.000.000-0</p>
            </div>
            <div className="formatacao1">
              <p className="titulo"><strong>Hospital</strong></p>
              <p>00.000.000-0</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao2">
              <p className="titulo"><strong>Sintomas</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao2">
              <p className="titulo"><strong>Diagnóstico</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao2">
              <p className="titulo"><strong>Tratamento</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="div-3">
            <div className="formatacao2">
              <p className="titulo"><strong>Observações</strong></p>
              <p>Canina</p>
            </div>
          </div>

          <div className="downloads">
            <img
              className="imagem-final"
              src="/images/downloads 1.png"
              alt="downloads"
            />
          </div>
        </div>
      </form>
    </section>
  );
}

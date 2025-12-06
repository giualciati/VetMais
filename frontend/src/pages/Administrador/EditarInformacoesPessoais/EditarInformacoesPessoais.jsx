import Menu from "../../../components/Menu";
import './editarInformacoesPessoais.css'

export default function EditarInformacoesPessoais() {
  return (
    <section className="eip-section">
      <div className="eip-container">

        
          <Menu></Menu>
      
        <main className="eip-content">
          <h1 className="eip-title">Editar Informações Pessoais</h1>

          <section className="eip-info-card">
            <form className="eip-edit-form">
              <div className="eip-info-grid">

                <div className="eip-coluna eip-coluna-1">
                  <label className="eip-label">Nome</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="Camile Vitória Rosa Santos"
                  />

                  <label className="eip-label">E-mail</label>
                  <input 
                    className="eip-input"
                    type="email"
                    defaultValue="camilevitoria@gmail.com"
                  />

                  <label className="eip-label">CPF</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="000.000.000-00"
                  />

                  <label className="eip-label">RG</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="00.000.000-0"
                  />

                  <label className="eip-label">CRM</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="000000/SP"
                  />
                </div>

                <div className="eip-coluna eip-coluna-2">
                  <label className="eip-label">Data de Nascimento</label>
                  <input 
                    className="eip-input"
                    type="date"
                    defaultValue="2005-05-01"
                  />

                  <label className="eip-label">Telefone</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="(11) 9 0987-2344"
                  />

                  <label className="eip-label">Especialidade</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="Radiologia"
                  />

                  <label className="eip-label">Hospital</label>
                  <input 
                    className="eip-input"
                    type="text"
                    defaultValue="Hospital Jurubatuba"
                  />
                </div>

              </div>

              <div className="eip-btn-group">
                <a 
                  href="/informacoesPessoais" 
                  className="eip-btn eip-btn-edit"
                >
                  Salvar
                </a>

                <a 
                  href="/informacoesPessoais" 
                  className="eip-btn eip-btn-cancel"
                >
                  Cancelar
                </a>
              </div>

            </form>
          </section>
        </main>

      </div>
    </section>
  );
}

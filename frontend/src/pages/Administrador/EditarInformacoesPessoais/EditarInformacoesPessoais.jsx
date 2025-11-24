

export default function EditarInformacoesPessoais() {
  return (
    <section>
      <div className="container">

        <aside className="sidebar">
          <div className="logo">
            <img 
              src="img/Imagem do WhatsApp de 2025-11-11 à(s) 21.39.16_3b656ce9.png" 
              alt="Logo da Vet" 
            />
          </div>

          <nav className="menu">
            <a href="index.html">Perfil</a>
            <a href="#">Prontuários</a>
            <a href="#">Agenda</a>
            <a href="#">Meus Horários</a>
            <a href="#">Sair</a>
          </nav>
        </aside>

        <main className="content">
          <h1>Editar Informações Pessoais</h1>

          <section className="info-card">
            <form className="edit-form">
              <div className="info-grid">

                <div>
                  <label>Nome</label>
                  <input type="text" defaultValue="Camile Vitória Rosa Santos" />

                  <label>E-mail</label>
                  <input type="email" defaultValue="camilevitoria@gmail.com" />

                  <label>CPF</label>
                  <input type="text" defaultValue="000.000.000-00" />

                  <label>RG</label>
                  <input type="text" defaultValue="00.000.000-0" />

                  <label>CRM</label>
                  <input type="text" defaultValue="000000/SP" />
                </div>

                <div>
                  <label>Data de Nascimento</label>
                  <input type="date" defaultValue="2005-05-01" />

                  <label>Telefone</label>
                  <input type="text" defaultValue="(11) 9 0987-2344" />

                  <label>Especialidade</label>
                  <input type="text" defaultValue="Radiologia" />

                  <label>Hospital</label>
                  <input type="text" defaultValue="Hospital Jurubatuba" />
                </div>

              </div>

              <div className="btn-group">
                <button type="submit" className="btn-edit">Salvar</button>
                <a href="index.html" className="btn-cancel">Cancelar</a>
              </div>

            </form>
          </section>
        </main>

      </div>
    </section>
  );
}

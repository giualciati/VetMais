import './InformacoesPessoais.css';

export default function InformacoesPessoais() {
  return (
    <section>
      <div className="container">
        
        <aside className="sidebar">
          <div className="logo">
            <img 
              src="/images/logo.png" 
              alt="Logo da Vet" 
            />
          </div>

          <nav className="menu">
            <a href="#">Perfil</a>
            <a href="#">Prontuários</a>
            <a href="#">Agenda</a>
            <a href="#">Meus Horários</a>
            <a href="#">Sair</a>
          </nav>
        </aside>

        <main className="content">
          <h1>Informações Pessoais</h1>

          <section className="info-card">
            <div className="info-grid">
              
              <div>
                <p><strong>Nome</strong><br />Camile Vitória Rosa Santos</p>
                <p><strong>E-mail</strong><br />camilevitoria@gmail.com</p>
                <p><strong>CPF</strong><br />000.000.000-00</p>
                <p><strong>RG</strong><br />00.000.000-0</p>
                <p><strong>CRM</strong><br />000000/SP</p>
              </div>

              <div>
                <p><strong>Data de Nascimento</strong><br />01/05/2005</p>
                <p><strong>Telefone</strong><br />(11) 9 0987-2344</p>
                <p><strong>Especialidade</strong><br />Radiologia</p>
                <p><strong>Hospital</strong><br />Hospital Jurubatuba</p>
              </div>

            </div>

            <a href="editar.html" className="edit-btn">Editar</a>
          </section>
        </main>

      </div>
    </section>
  );
}

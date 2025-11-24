import './EdtInfoPessoais.css'; 

const EdtInfoPessoais = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <img src="/images/logo.png" alt="VET+ Logo" className="logo" />
        <nav>
          <a href="#" className="active">Perfil</a>
          <a href="#">Meus Pets</a>
          <a href="#">Agenda</a>
          <a href="#">Prontuários</a>
          <a href="#">Sair</a>
        </nav>
      </aside>
      
      <main className="main-content">
        <header>
          <h1>Editar Informações Pessoais</h1>
        </header>
        
        <div className="content-body">
          <form className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" defaultValue="Nome completo" />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" defaultValue="000.000.000-00" />
              </div>
              <div className="form-group">
                <label htmlFor="rg">RG</label>
                <input type="text" id="rg" defaultValue="00.000.000-0" />
              </div>
              
              <div className="form-group">
                <label htmlFor="nascimento">Data de Nascimento</label>
                <input type="text" id="nascimento" defaultValue="01/05/2005" />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" defaultValue="(11) 9 0987-2344" />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" defaultValue="camilevitoria@gmail.com" />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-edit">Editar</button>
              <button type="button" className="btn-cancel">Cancelar</button>
            </div>
          </form>
        </div>

        <div className="deco-circle"></div>
        <div className="deco-line-1"></div>
        <div className="deco-line-2"></div>

      </main>
    </div>
  );
};

export default EdtInfoPessoais;
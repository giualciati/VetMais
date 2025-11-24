import { NavLink } from 'react-router-dom';
import './InfoPessoais.css'; 

const InfoPessoais = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <img src="/images/logo.png" alt="VET+ Logo" className="logo" />
        <nav>
          <NavLink to="/infPessoaisTutor">Perfil</NavLink>
          <NavLink to="/MyPets">Meus Pets</NavLink>
          <NavLink to="/agenda">Agenda</NavLink>
          <NavLink to="/prontuarioAnimal">Prontuários</NavLink>
          <NavLink to="/">Sair</NavLink>
        </nav>
      </aside>
      
      <main className="main-content">
        <header>
          <h1>Informações Pessoais</h1>
        </header>
        
        <div className="content-body">
          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>Nome</label>
                <p>Camile Vitória Rosa Santos</p>
              </div>
              <div className="form-group">
                <label>CPF</label>
                <p>000.000.000-00</p>
              </div>
              <div className="form-group">
                <label>RG</label>
                <p>00.000.000-0</p>
              </div>
              
              <div className="form-group">
                <label>Data de Nascimento</label>
                <p>01/05/2005</p>
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <p>(11) 9 0987-2344</p>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <p>camilevitoria@gmail.com</p>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn-edit">Editar</button>
            </div>
          </div>
        </div>

        <div className="deco-circle"></div>
        <div className="deco-line-1"></div>
        <div className="deco-line-2"></div>

      </main>
    </div>
  );
};

export default InfoPessoais;
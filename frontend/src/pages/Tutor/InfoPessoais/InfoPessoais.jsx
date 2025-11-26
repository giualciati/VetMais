import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './InfoPessoais.css'; 
import logoImg from '../../../assets/images/Logo.png'; // Ajuste o caminho do logo

const InfoPessoais = () => {
  const navigate = useNavigate();
  
  // Estado para guardar os dados do usuário
  const [usuario, setUsuario] = useState({
    nome: "Carregando...",
    cpf: "...",
    rg: "...",
    dataNascimento: "...",
    telefone: "...",
    email: "..."
  });

  // useEffect roda assim que a tela abre
  useEffect(() => {
    // AQUI VAMOS BUSCAR OS DADOS NO JAVA
    // simular que buscou:
    setUsuario({
      nome: "Camile Vitória Rosa Santos",
      cpf: "000.000.000-00",
      rg: "00.000.000-0",
      dataNascimento: "01/05/2005",
      telefone: "(11) 9 0987-2344",
      email: "camilevitoria@gmail.com"
    });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <img src={logoImg} alt="VET+ Logo" className="logo" />
        <nav>
          <NavLink to="/infoPessoais" className="active">Perfil</NavLink>
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
                <p>{usuario.nome}</p>
              </div>
              <div className="form-group">
                <label>CPF</label>
                <p>{usuario.cpf}</p>
              </div>
              <div className="form-group">
                <label>RG</label>
                <p>{usuario.rg}</p>
              </div>
              
              <div className="form-group">
                <label>Data de Nascimento</label>
                <p>{usuario.dataNascimento}</p>
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <p>{usuario.telefone}</p>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <p>{usuario.email}</p>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn-edit" onClick={() => navigate('/editarInfoPessoais')}>
                Editar
              </button>
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
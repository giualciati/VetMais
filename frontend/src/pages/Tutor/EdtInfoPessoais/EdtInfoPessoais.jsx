import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './EdtInfoPessoais.css'; 
import logoImg from '../../../assets/images/Logo.png';

const EdtInfoPessoais = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    telefone: "",
    email: ""
  });

  useEffect(() => {
    // AQUI VAMOS BUSCAR OS DADOS ATUAIS DO JAVA PARA PREENCHER
    // Simulando dados iniciais:
    setFormData({
      nome: "Camile Vitória Rosa Santos",
      cpf: "000.000.000-00",
      rg: "00.000.000-0",
      dataNascimento: "01/05/2005",
      telefone: "(11) 9 0987-2344",
      email: "camilevitoria@gmail.com"
    });
  }, []);

  // atualiza os dados enquanto você digita
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log("Dados para salvar:", formData);
    // AQUI ENTRA O PUT PARA O JAVA
    alert("Dados salvos com sucesso! (Simulação)");
    navigate('/infoPessoais');
  };

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
          <h1>Editar Informações Pessoais</h1>
        </header>
        
        <div className="content-body">
          <form className="form-container" onSubmit={handleSalvar}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" value={formData.nome} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="rg">RG</label>
                <input type="text" id="rg" value={formData.rg} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label htmlFor="nascimento">Data de Nascimento</label>
                <input type="text" id="nascimento" value={formData.dataNascimento} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-edit">Salvar</button>
              <button type="button" className="btn-cancel" onClick={() => navigate('/infoPessoais')}>Cancelar</button>
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
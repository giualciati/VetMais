import Menu from '../../../components/Menu';
import './InformacoesPessoais.scss';

export default function InformacoesPessoais() {
  return (
    <section className="page-informacoes">
      <div className="container-informacoes">

        {/* MENU LATERAL */}
        <aside className="sidebar-informacoes">
         

          <div className="menu-informacoes">
            <Menu />
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="content-informacoes">
          <h1 className="titulo-informacoes">Informações Pessoais</h1>

          <section className="info-card-informacoes">

            <div className="coluna-info">
              <p><strong>Nome</strong><br />Camile Vitória Rosa Santos</p>
              <p><strong>E-mail</strong><br />camilevitoria@gmail.com</p>
              <p><strong>CPF</strong><br />000.000.000-00</p>
              <p><strong>RG</strong><br />00.000.000-0</p>
              <p><strong>CRM</strong><br />000000/SP</p>
            </div>

            <div className="coluna-info">
              <p><strong>Data de Nascimento</strong><br />01/05/2005</p>
              <p><strong>Telefone</strong><br />(11) 9 0987-2344</p>
              <p><strong>Especialidade</strong><br />Radiologia</p>
              <p><strong>Hospital</strong><br />Hospital Jurubatuba</p>
            </div>

            <div className="btn-container">
              <a href="/editarInformacoesPessoais" className="edit-btn-informacoes" >Editar</a>
            </div>

          </section>
        </main>

      </div>
    </section>
  );
}

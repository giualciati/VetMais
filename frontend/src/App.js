import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MyPets from "./pages/Tutor/MeusPets/MyPets";
import CadastroPets from "./pages/Tutor/MeusPets/CadastroPets";
import EditPets from "./pages/Tutor/MeusPets/EditPets";
import CadastroTutor from "./pages/Tutor/Cadastro/CadastroTutor";
import Prontuario from "./pages/Tutor/Prontuario/Prontuarios";
import Agenda from "./pages/Tutor/Agenda/agenda";
import Horarios from "./pages/Tutor/Horarios/horarios";
import FichaAgendamento from "./pages/Tutor/FichaAgendamento/fichaAgendamento";
import ControlDispo from "./pages/Tutor/ControlDispo/controlDispo";
import InformacoesPessoais from "./pages/Administrador/InformacoesPessoais/InformacoesPessoais";
import EditarInformacoesPessoais from "./pages/Administrador/EditarInformacoesPessoais/EditarInformacoesPessoais";
import CadastroColaborador from "./pages/Administrador/CadastroColaborador/CadastroColaborador";
import Prontuarios from "./pages/Administrador/Prontuarios/Prontuarios";
import NovoProntuario from "./pages/Administrador/NovoProntuario/NovoProntuario";
import EditarProntuario from "./pages/Administrador/EditarProntuario/EditarProntuario";
import AgendarServico from "./pages/Tutor/AgendarServico/agendarServico";
import ProntuarioDetalhes from "./pages/Tutor/ProntuarioDetalhes/ProntuarioDetalhes";

function AppContent() {
  const location = useLocation();

  const showNavAndFooter = ["/", "/AboutUs"].includes(
    location.pathname
  );

  return (
    <>
      {showNavAndFooter && <Navbar />}

      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/cadastro" element={<CadastroTutor />} />

        {/* Tutor */}
        <Route path="/MyPets" element={<MyPets />} />
        <Route path="/MyPets/Cadastro" element={<CadastroPets />} />
        <Route path="/MyPets/Editar/:id" element={<EditPets />} />
        <Route path="/prontuarioAnimal" element={<Prontuario />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/agendarServico" element={<AgendarServico />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/controlDispo" element={<ControlDispo />} />
        <Route path="/fichaagendamento/:id" element={<FichaAgendamento />} />
        <Route
          path="/prontuarioDetalhes/:id"
          element={<ProntuarioDetalhes />}
        />

        {/* Administrador */}
        <Route path="/informacoesPessoais" element={<InformacoesPessoais />} />
        <Route
          path="/editarInformacoesPessoais"
          element={<EditarInformacoesPessoais />}
        />
        <Route path="/cadastroColaborador" element={<CadastroColaborador />} />
        <Route path="/prontuarios/vet" element={<Prontuarios />} />
        <Route path="/novoProntuario" element={<NovoProntuario />} />
        <Route path="/editarProntuario" element={<EditarProntuario />} />
      </Routes>

      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

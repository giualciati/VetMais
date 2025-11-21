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
import CadastroTutor from "./pages/Tutor/Cadastro/CadastroTutor";
import Prontuario from "./pages/Tutor/Prontuario/Prontuarios";
import Agenda from "./pages/Tutor/Agenda/agenda";
import Horarios from "./pages/Tutor/Horarios/horarios";
import FichaAgendamento from "./pages/Tutor/FichaAgendamento/fichaAgendamento";
import ControlDispo from "./pages/Tutor/ControlDispo/controlDispo";
import InformacoesPessoais from "./pages/Administrador/InformacoesPessoais/InformacoesPessoais";
import EditarInformacoesPessoais from "./pages/Administrador/EditarInformacoesPessoais/EditarInformacoesPessoais";
import CadastroColaborador from "./pages/Administrador/CadastroColaborador/CadastroColaborador";
import AgendarServico from "./pages/Tutor/AgendarServico/agendarServico";

function AppContent() {
  const location = useLocation();

  const showNavAndFooter = ["/", "/AboutUs", "/cadastro"].includes(
    location.pathname
  );

  return (
    <>
      {showNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/cadastro" element={<CadastroTutor />} />
        <Route path="/prontuario" element={<Prontuario/>} />
        <Route path="/agenda" element={<Agenda/>} />
        <Route path="/agendarServico" element={<AgendarServico />} />
        <Route path="/horarios" element={<Horarios/>} />
        <Route path="/controlDispo" element={<ControlDispo />} />
        <Route path="/fichaagendamento" element={<FichaAgendamento />} />
        <Route path="/informacoesPessoais" element={<InformacoesPessoais />} />
        <Route path="/editarInformacoesPessoais" element={<EditarInformacoesPessoais />} />
        <Route path="/cadastroColaborador" element={<CadastroColaborador />} />

      </Routes>
      {showNavAndFooter && <Footer />}{" "}
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

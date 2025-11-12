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
import MyPets from "./pages/MyPets";

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
        <Route path="/MyPets" element={<MyPets />} />
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

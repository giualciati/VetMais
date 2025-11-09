import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CadastroTutor from "./pages/Tutor/Cadastro/CadastroTutor";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/cadastro" element={<CadastroTutor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

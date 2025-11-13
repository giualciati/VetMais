// src/components/HorarioCard.jsx
import "./HorariosCard.css";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";

export default function HorariosCard({ hora = "10:00", vagas = 1, data = "04/11/2025" }) {
  return (
    <div className="horario-card">
      <div className="horario-info-row">
        <FaRegCalendarAlt className="horario-icon blue" />
        <span className="horario-info">{data}</span>
      </div>
      <div className="horario-info-row">
        <FaClock className="horario-icon pink" />
        <span className="horario-info">{hora}</span>
      </div>
      <div className="horario-vagas">
        <span className="vagas-label">Vagas:</span>
        <span className="vagas-num">{vagas}</span>
      </div>
    </div>
  );
}

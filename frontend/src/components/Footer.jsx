import React from "react";
import "../styles/Footer.css";
import "../styles/Global.css";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiClock } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h1 className="footer-logo">VET+</h1>
          <p className="footer-description">
            Programa social da Prefeitura de São Paulo que oferece atendimento
            veterinário gratuito, promovendo o bem-estar animal e a saúde
            pública.
          </p>
        </div>

        <div className="footer-column">
          <h2 className="footer-title">Contato</h2>
          <ul className="footer-list">
            <li>
              <FiPhone />
              156 (24h)
            </li>
            <li>
              <FiMail /> sp156@prefeitura.sp.gov.br
            </li>
            <li>
              <FiMapPin /> Prefeitura de São Paulo
            </li>
            <li>
              <FiClock /> Seg-Sex: 8h às 17h
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="footer-title">Links úteis</h2>
          <ul className="footer-list">
            <li>
              <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?servico=4010">
                Cadastrar RGA (Registro Geral Animal)
              </a>
            </li>
            <li>
              <a href="#">Sobre Nós</a>
            </li>
            <li>
              <a href="#">Termos de Uso</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="footer-divider"></div>

      {/* Seção inferior */}
      <div className="footer-bottom">
        © 2025 <span className="highlight">VET+</span> - Programa SP 156 da
        Prefeitura de São Paulo. Todos os direitos reservados.
      </div>
    </footer>
  );
}

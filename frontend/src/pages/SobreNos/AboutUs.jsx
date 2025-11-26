import React from "react";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./AboutUs.css";

function AboutUs() {
  return (
    <main className="about">
      {/* 🔸 Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <FaInfoCircle className="about-icon" />
          <h1>Sobre o VET+</h1>
        </div>
      </section>

      {/* 🔹 Conteúdo principal */}
      <section className="about-main">
        {/* O que é */}
        <div className="about-what">
          <h2>O que é?</h2>
          <p>
            O VET+ é a plataforma digital para o Programa SP 156, uma iniciativa
            da Prefeitura de São Paulo que oferece atendimento veterinário
            gratuito para animais de estimação, focando em famílias em situação
            de vulnerabilidade social. O programa faz parte das políticas
            públicas de bem-estar animal e inclusão social.
          </p>
          <p>
            Através de parcerias com clínicas veterinárias e profissionais
            qualificados, o programa garante que todos os pets tenham acesso a
            cuidados básicos de saúde, independentemente da condição financeira
            de seus tutores.
          </p>
        </div>

        {/* Quem pode participar */}
        <div className="about-participation">
          <h2>Quem pode participar?</h2>

          <div className="requirements-container">
            <div className="requirements-box">
              <h3>Requisitos</h3>
              <ul>
                <li>
                  <FaCheckCircle /> Residir na cidade de São Paulo
                </li>
                <li>
                  <FaCheckCircle /> Documento de Identidade com foto
                </li>
                <li>
                  <FaCheckCircle /> Comprovante de residência atualizado
                </li>
                <li>
                  <FaCheckCircle /> RGA do(s) animal(is)
                </li>
              </ul>
            </div>

            <div className="requirements-box">
              <h3>Documentos Necessários</h3>
              <ul>
                <li>
                  <FaCheckCircle /> RG ou CNH do Tutor
                </li>
                <li>
                  <FaCheckCircle /> Comprovante de Residência no nome do Tutor
                </li>
                <li>
                  <FaCheckCircle /> Carteirinha de Vacinação do Pet (se houver)
                </li>
                <li>
                  <FaCheckCircle /> RGA do(s) animal(is)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Canais de atendimento */}
        <div className="about-contact">
          <h2>Canais de Atendimento</h2>
          <p>
            Para dúvidas, reclamações, elogios ou denúncias, utilize qualquer um
            dos canais abaixo:
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <p>
                <strong>156</strong>
                <br />
                Atendimento 24h
              </p>
            </div>

            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <p>
                <strong>sp156@prefeitura.sp.gov.br</strong>
                <br />
                Retorno em até 3 dias úteis
              </p>
            </div>

            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <p>
                <strong>Prefeitura de São Paulo</strong>
                <br />
                Viaduto do Chá, 15 – Centro
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;

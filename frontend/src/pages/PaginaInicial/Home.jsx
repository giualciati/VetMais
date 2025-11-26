import React from "react";

import "../PaginaInicial/Home.css";
import { Link } from "react-router-dom";
import cachorro1 from "../../assets/images/Cachorro1.png";
import vet from "../../assets/images/Veterinaria.jpg";
import gato from "../../assets/images/Gato.png";
import passaro from "../../assets/images/Passaro.png";
import porco from "../../assets/images/Porco.png";
import cachorro2 from "../../assets/images/Cachorro2.png";
import { FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import CirculoAzulVazado from "../../assets/images/CirculoAzulVazado.svg";
import CirculoRosa from "../../assets/images/CirculoRosa.svg";
import LinhaAmarela from "../../assets/images/LinhaAmarela.svg";

const Home = () => {
  return (
    <>
      <div className="home-page">
        {/* Seção inicial */}
        <section className="hero">
          <div className="hero-text">
            <h2>
              Saúde e cuidado com o apoio dos
              <br />
              hospitais públicos veterinários de São Paulo
            </h2>
            <Link to="/cadastro">
              <button className="signIn-button">Cadastre seu pet aqui!</button>
            </Link>
          </div>
          <div className="hero-img">
            <img src={cachorro1} alt="Cachorro" />
          </div>
        </section>

        {/* Benefícios */}
        <section className="benefits">
          <div className="benefit-card">
            <span>
              <FaHeart />
            </span>
            <h4>Atendimento Gratuito</h4>
            <p>Consultas, exames e cirurgias veterinárias 100% gratuitas.</p>
          </div>

          <div className="benefit-card">
            <span>
              <FaCheck />
            </span>
            <h4>Profissionais Qualificados</h4>
            <p>Veterinários experientes e especializados em diversas áreas.</p>
          </div>

          <div className="benefit-card">
            <span>
              <FaHospital />
            </span>
            <h4>Unidades por Toda SP</h4>
            <p>Hospitais localizados nas 4 zonas da cidade de São Paulo.</p>
          </div>
        </section>

        {/* Serviços oferecidos */}
        <section className="services">
          <div className="services-text">
            <h3>Serviços Oferecidos</h3>
            <p>
              Oferecemos uma gama completa de serviços veterinários para
              garantir
              <br />a saúde e bem-estar do seu pet.
            </p>

            <ul>
              <li>
                <FaRegCheckCircle /> Consultas Gerais
              </li>
              <li>
                <FaRegCheckCircle /> Castrações
              </li>
              <li>
                <FaRegCheckCircle /> Emergências
              </li>
              <li>
                <FaRegCheckCircle /> Vacinação
              </li>
              <li>
                <FaRegCheckCircle /> Cirurgias
              </li>
              <li>
                <FaRegCheckCircle /> Exames
              </li>
            </ul>
          </div>

          <div className="services-img">
            <img src={vet} alt="Veterinária atendendo cachorro" />
            <div className="floating-bubble">
              <div className="bubble-top">
                <FaHeartbeat />
                <span className="bubble-text">24/7</span>
              </div>
              <span className="bubble-sub">atendimento emergencial</span>
            </div>
          </div>
        </section>

        {/* Unidades */}
        <section className="unidades">
          <img
            src={CirculoAzulVazado}
            alt="Círculo Azul Vazado"
            className="forma circulo-azul"
          />
          <img
            src={CirculoRosa}
            alt="Círculo Rosa"
            className="forma circulo-rosa"
          />
          <img
            src={LinhaAmarela}
            alt="Linha Amarela"
            className="forma linha-amarela"
          />
          <h3>Escolha a unidade mais próxima de você!</h3>
          <div className="cards-unidades">
            <div className="card card-norte">
              <img className="img-norte" src={gato} alt="Zona Norte" />
              <p>
                Rua Atílio Píffer, 687 – Casa Verde
                <br />
                <span>de segunda a sexta-feira, das 7h às 17h</span>
              </p>
            </div>

            <div className="card card-sul">
              <img className="img-sul" src={cachorro2} alt="Zona Sul" />
              <p>
                Rua Agostino Togneri, n° 153 – Jurubatuba
                <br />
                <span>todos os dias, 24h</span>
              </p>
            </div>

            <div className="card card-leste">
              <img className="img-leste" src={passaro} alt="Zona Leste" />
              <p>
                Av. Salim Farah Maluf, esquina com R. Ulisses Cruz, lado par –
                Tatuapé
                <br />
                <span>todos os dias, 24h</span>
              </p>
            </div>

            <div className="card card-oeste">
              <img className="img-oeste" src={porco} alt="Zona Oeste" />
              <p>
                Av. Professor Orlando Marques de Paiva, 87 – Butantã (USP)
                <br />
                <span>de segunda a sexta-feira, das 7h às 17h</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

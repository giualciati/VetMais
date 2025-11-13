// src/components/ControlarVagas.jsx
import "./controlDispo.css";
import HorarioCard from "../../../components/HorariosCard/HorariosCard";
import { useNavigate } from "react-router-dom";

export default function ControlDispo() {
    const navigate = useNavigate();

    return (
        <div className="layout">


            {/* Conteúdo principal */}
            <main className="content">
                <h1 className="page-title">Controlar Vagas</h1>

                {/* Botão Voltar */}
                <button
                    className="btn-voltar"
                    onClick={() => navigate(-1)}
                    aria-label="Voltar"
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M14 18L8 11L14 4" stroke="#f68b1f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <section className="card-controlar" id="card">
                    {/* Linha 1 */}
                    <div className="row">
                        <div className="field-group">
                            <label htmlFor="dia">Dia:</label>
                            <input id="dia" type="date" />
                        </div>

                        <div className="field-group reservar-por">
                            <span className="field-label">Reservar vagas por:</span>
                            <label>
                                <input type="radio" name="tipoReserva" defaultChecked />
                                <span>Procedimento</span>
                            </label>
                            <label>
                                <input type="radio" name="tipoReserva" />
                                <span>Especialidade</span>
                            </label>
                        </div>
                    </div>

                    {/* Linha 2 */}
                    <div className="row">
                        <div className="field-group full">
                            <label htmlFor="proc">Selecione o procedimento/especialidade:</label>
                            <select id="proc">
                                <option>Selecionar</option>
                            </select>
                        </div>
                    </div>

                    {/* Linha 3 */}
                    <div className="row">
                        <div className="field-group quantidade">
                            <label htmlFor="qtd">
                                Aplicar quantidade de vagas padrão:
                            </label>
                            <input id="qtd" type="number" min="0" defaultValue="1" />
                        </div>

                        <div className="field-group aplicar-customizar">
                            <label>
                                <input type="radio" name="modoVaga" defaultChecked />
                                <span>Aplicar</span>
                            </label>
                            <label>
                                <input type="radio" name="modoVaga" />
                                <span>Customizar</span>
                            </label>
                        </div>
                    </div>

                    {/* Cards de horários */}
                    <div className="horarios-wrapper">
                        <HorarioCard hora="10:00" />
                        <HorarioCard hora="10:00" />
                    </div>

                    {/* Botões */}
                    <div className="actions">
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

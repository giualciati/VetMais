import React, { useState, useEffect } from 'react';
import './agenda.css';
import { Link } from "react-router-dom";

function Agenda() {
    const [agendas, setAgendas] = useState([]);
    const [erro, setErro] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    useEffect(() => {
        fetch('http://localhost:8080/agendamentos')
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                const adaptados = data.map(agendamento => {
                    const dataObj = agendamento.dataHora ? new Date(agendamento.dataHora) : null;
                    return {
                        id: agendamento.idAgendamento,
                        nome: agendamento.nomeAnimal,
                        especie: agendamento.especie,
                        sexo: agendamento.sexo,
                        especialidade: agendamento.especialidade,
                        data: dataObj ? dataObj.toLocaleDateString('pt-BR') : "",
                        hora: dataObj ? dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "",
                        status: agendamento.statusAgendamento
                    };
                });
                setAgendas(adaptados);
                setErro(false);
            })
            .catch(() => {
                setErro(true);
            });
    }, []);

    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const dadosPaginados = agendas.slice(indiceInicio, indiceFim);
    const totalPaginas = Math.ceil(agendas.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmado': return 'green';
            case 'Pendente': return 'orange';
            case 'Cancelado': return 'red';
            default: return '';
        }
    };

    return (
        <div className="prontuarios-pagina">
            <aside className="sidebar-prontuarios">
                <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />
                <nav className="sidebar-nav">
                    <Link to="/perfil">Perfil</Link>
                    <Link to="/prontuario">Prontuários</Link>
                    <Link to="/agenda" className="active">Agenda</Link>
                    <Link to="/horarios">Meus Horarios</Link>
                    <Link to="/">Sair</Link>
                </nav>
            </aside>

            <main className="main-content-prontuarios">
                <div className="horarios-header">
                    <h1 className="titulo-prontuarios">Agendamentos</h1>
                    <Link to="/novo-agendamento" className="btn-novo">Novo</Link>
                </div>

                {erro && (
                    <p className="lista-vazia">Nenhum prontuário encontrado.</p>
                )}

                {!erro && agendas.length === 0 && (
                    <p className="lista-vazia">Nenhum prontuário encontrado.</p>
                )}

                {!erro && agendas.length > 0 && (
                    <div className="prontuario-tabela">
                        <table className="prontuario-table">
                            <thead>
                                <tr className="prontuario-header">
                                    <th>Nome do Animal</th>
                                    <th>Espécie</th>
                                    <th>Sexo</th>
                                    <th>Especialidade</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {dadosPaginados.map(prontuario => (
                                    <tr className="prontuario-linha" key={prontuario.id}>
                                        <td>{prontuario.nome}</td>
                                        <td>{prontuario.especie}</td>
                                        <td>{prontuario.sexo}</td>
                                        <td>{prontuario.especialidade}</td>
                                        <td>{prontuario.data}</td>
                                        <td>{prontuario.hora}</td>
                                        <td style={{ color: getStatusStyle(prontuario.status) }}>
                                            {prontuario.status}
                                        </td>
                                        <td>
                                            <Link
                                                to="/fichaagendamento"
                                                className="ver-mais-link"
                                            >
                                                Ver mais
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="paginacao">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <a
                            key={index + 1}
                            href="#"
                            className={`page-link ${paginaAtual === index + 1 ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                mudarPagina(index + 1);
                            }}
                        >
                            {index + 1}
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Agenda;

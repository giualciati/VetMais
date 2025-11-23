import React, { useState, useEffect } from 'react';
import './agenda.css';
import { Link, useNavigate } from "react-router-dom";

function Agenda(props) {

    const [agendas, setAgendas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    // hook de navegação do React Router
    const navigate = useNavigate();

    // Função do botão NOVO -> vai para /agendarServico
    const handleNovoClick = () => {
        navigate("/agendarServico");
    };

    useEffect(() => {
        fetch('http://localhost:8080/agendamentos')
            .then(res => res.json())
            .then(data => {

                const adaptados = data.map(agendamento => {
                    let dataFormatada = '';
                    let horaFormatada = '';

                    if (agendamento.dataHora) {
                        const dataObj = new Date(agendamento.dataHora);
                        dataFormatada = dataObj.toLocaleDateString('pt-BR');
                        horaFormatada = dataObj.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }

                    return {
                        id: agendamento.idAgendamento,
                        nome: agendamento.nomeAnimal,
                        especie: agendamento.especie,
                        sexo: agendamento.sexo,
                        especialidade: agendamento.especialidade,
                        data: dataFormatada,
                        hora: horaFormatada,
                        status: agendamento.statusAgendamento,
                    };
                });

                setAgendas(adaptados);
            })
            .catch(() => setAgendas([]));
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

            {/* --- BARRA LATERAL --- */}
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

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <main className="main-content-prontuarios">

                <div className="horarios-header">
                    <h1 className="titulo-prontuarios">Agendamentos</h1>

                    <button
                        type="button"
                        className="btn-novo"
                        onClick={handleNovoClick}
                    >
                        Novo
                    </button>
                </div>

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
                            {dadosPaginados.map(agenda => (
                                <tr className="prontuario-linha" key={agenda.id}>
                                    <td>{agenda.nome}</td>
                                    <td>{agenda.especie}</td>
                                    <td>{agenda.sexo}</td>
                                    <td>{agenda.especialidade}</td>
                                    <td>{agenda.data}</td>
                                    <td>{agenda.hora}</td>
                                    <td style={{ color: getStatusStyle(agenda.status) }}>
                                        {agenda.status}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/fichaagendamento/${agenda.id}`}
                                            className="ver-mais-link"
                                        >
                                            Ver mais
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {agendas.length === 0 && (
                        <p className="lista-vazia">Nenhum agendamento encontrado.</p>
                    )}
                </div>

                {/* Paginação */}
                <div className="paginacao">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            type="button"
                            className={`page-link ${paginaAtual === index + 1 ? 'active' : ''}`}
                            onClick={() => mudarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default Agenda;

import React, { useState } from 'react';
import './agenda.css';

// O componente recebe 'prontuarios' (array) e 'onVerMaisClick' (função) das props
function Agenda(props) {

    let dadosExemplo = [
        {
            id: 1,
            nome: "Rex",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Cardiologia",
            data: "30/08/2025",
            hora: "14:00",
            status: "Confirmado"
        },
        {
            id: 2,
            nome: "Ju",
            especie: "Gato",
            sexo: "Fêmea",
            especialidade: "Dermatologia",
            data: "08/11/2025",
            hora: "10:30",
            status: "Pendente"
        },
        {
            id: 3,
            nome: "Thor",
            especie: "Cachorro",
            sexo: "Fêmea",
            especialidade: "Ortopedia",
            data: "15/09/2025",
            hora: "09:00",
            status: "Pendente"
        },
        {
            id: 4,
            nome: "Frufru",
            especie: "Gato",
            sexo: "Fêmea",
            especialidade: "Dermatologia",
            data: "23/12/2025",
            hora: "10:30",
            status: "Cancelado"
        },
        {
            id: 5,
            nome: "Bolt",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Cardiologia",
            data: "18/09/2025",
            hora: "15:00",
            status: "Confirmado"
        },
        {
            id: 6,
            nome: "Mimi",
            especie: "Gato",
            sexo: "Fêmea",
            especialidade: "Oftalmologia",
            data: "27/09/2025",
            hora: "11:00",
            status: "Pendente"
        },
        {
            id: 7,
            nome: "Max",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Neurologia",
            data: "02/01/2025",
            hora: "16:00",
            status: "Confirmado"
        },
        {
            id: 8,
            nome: "Luna",
            especie: "Gato",
            sexo: "Fêmea",
            especialidade: "Cardiologia",
            data: "09/02/2026",
            hora: "09:30",
            status: "Pendente"
        },
        {
            id: 9,
            nome: "Rocky",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Ortopedia",
            data: "09/08/2026",
            hora: "14:30",
            status: "Cancelado"
        },
        {
            id: 10,
            nome: "Whiskers",
            especie: "Gato",
            sexo: "Macho",
            especialidade: "Dermatologia",
            data: "19/03/2026",
            hora: "10:00",
            status: "Confirmado"
        },
        {
            id: 11,
            nome: "Buddy",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Cardiologia",
            data: "18/07/2025",
            hora: "13:00",
            status: "Pendente"
        },
        {
            id: 12,
            nome: "Garfield",
            especie: "Gato",
            sexo: "Macho",
            especialidade: "Oftalmologia",
            data: "24/11/2025",
            hora: "15:30",
            status: "Confirmado"
        },
        {
            id: 13,
            nome: "Spike",
            especie: "Cachorro",
            sexo: "Macho",
            especialidade: "Neurologia",
            data: "03/12/2025",
            hora: "08:00",
            status: "Confirmado"
        },
        {
            id: 14,
            nome: "Felix",
            especie: "Gato",
            sexo: "Macho",
            especialidade: "Cardiologia",
            data: "19/11/2025",
            hora: "12:00",
            status: "Cancelado"
        },
        {
            id: 15,
            nome: "Lassie",
            especie: "Cachorro",
            sexo: "Fêmea",
            especialidade: "Ortopedia",
            data: "30/12/2025",
            hora: "17:00",
            status: "Confirmado"
        }
    ];

    const { prontuarios = dadosExemplo, onVerMaisClick } = props;

    // Estado para controlar a página atual e itens por página
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    // Calcular índices para fatiar os dados
    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const dadosPaginados = prontuarios.slice(indiceInicio, indiceFim);

    // Calcular número total de páginas
    const totalPaginas = Math.ceil(prontuarios.length / itensPorPagina);

    // Função para mudar de página
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

            {/* --- BARRA LATERAL (Sidebar) --- */}
            <aside className="sidebar-prontuarios">
                <img src="/images/logo.png" alt="Vet+ Logo" className="logo" />

                <nav className="sidebar-nav">
                    <a href="#">Perfil</a>
                    <a href="#" >Prontuários</a>
                    <a href="#" className="active">Agenda</a>
                    <a href="#" >Meus Horarios</a>
                    <a href="#">Sair</a>
                </nav>
            </aside>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <main className="main-content-prontuarios">
                <h1 className="titulo-prontuarios">Agendamentos</h1>

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
                                <th></th> {/* Coluna vazia para o link */}
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
                                    <td style={{ color: getStatusStyle(prontuario.status) }}>{prontuario.status}</td>
                                    <td>
                                        <a
                                            href="#"
                                            className="ver-mais-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (onVerMaisClick) {
                                                    onVerMaisClick(prontuario.id);
                                                }
                                            }}
                                        >
                                            Ver mais
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {prontuarios.length === 0 && (
                        <p className="lista-vazia">Nenhum prontuário encontrado.</p>
                    )}
                </div>

                {/* Paginação dinâmica */}
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

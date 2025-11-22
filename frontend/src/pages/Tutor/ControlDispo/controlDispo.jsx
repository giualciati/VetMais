import { useEffect, useState } from "react";
import "./controlDispo.css";
import { useNavigate, useParams } from "react-router-dom";


export default function ControlDispo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataHora, setDataHora] = useState("");
    const [servicos, setServicos] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    const [veterinarioSelecionado, setVeterinarioSelecionado] = useState("");
    const [hospital, setHospital] = useState("");
    const [salvando, setSalvando] = useState(false);
    const editando = !!id;

    useEffect(() => {
        fetch("http://localhost:8080/servicos")
            .then(res => res.json())
            .then(setServicos)
            .catch(() => setServicos([]));
        fetch("http://localhost:8080/veterinarios")
            .then(res => res.json())
            .then(setVeterinarios)
            .catch(() => setVeterinarios([]));
    }, []);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/agendas/${id}`)
                .then(res => res.json())
                .then(agenda => {
                    if (agenda.data_hora) {
                        const d = new Date(agenda.data_hora);
                        // Ajusta para timezone local para o input datetime-local
                        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                            .toISOString().slice(0, 16);
                        setDataHora(local);
                    } else {
                        setDataHora("");
                    }
                    setServicoSelecionado(agenda.servico?.id_servico || "");
                    setVeterinarioSelecionado(agenda.veterinario?.id_veterinario || "");
                });
        }
    }, [id]);

    useEffect(() => {
        if (!veterinarioSelecionado) {
            setHospital("");
            return;
        }
        const vet = veterinarios.find(v => String(v.id_veterinario) === String(veterinarioSelecionado));
        setHospital(vet && vet.hospital ? vet.hospital.nm_hospital : "");
    }, [veterinarioSelecionado, veterinarios]);

    const handleSalvar = async () => {
        if (!dataHora || !servicoSelecionado || !veterinarioSelecionado) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }
        setSalvando(true);
        const vet = veterinarios.find(v => String(v.id_veterinario) === String(veterinarioSelecionado));
        const idHospital = vet && vet.hospital ? vet.hospital.id_hospvet : null;
        const body = {
            dataHora: new Date(dataHora),
            idServico: Number(servicoSelecionado),
            idVeterinario: Number(veterinarioSelecionado),
            idHospital: idHospital
        };
        try {
            let resp;
            if (editando) {
                resp = await fetch(`http://localhost:8080/agendas/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            } else {
                resp = await fetch("http://localhost:8080/agendas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }
            if (resp.ok) {
                alert(editando ? "Horário atualizado com sucesso!" : "Horário criado com sucesso!");
                navigate("/horarios");
            } else {
                alert("Erro ao salvar horário.");
            }
        } catch (e) {
            alert("Erro ao salvar horário.");
        } finally {
            setSalvando(false);
        }
    };

    const handleDeletar = async () => {
        if (!window.confirm("Tem certeza que deseja deletar este horário?")) return;
        setSalvando(true);
        try {
            const resp = await fetch(`http://localhost:8080/agendas/${id}`, { method: "DELETE" });
            if (resp.ok) {
                alert("Horário deletado com sucesso!");
                navigate("/horarios");
            } else {
                let msg = "Erro ao deletar horário.";
                if (resp.status === 409) {
                    try {
                        const data = await resp.json();
                        msg = data.message || "Não é possível deletar o horário pois existem agendamentos vinculados a ele.";
                    } catch {
                        msg = "Não é possível deletar o horário pois existem agendamentos vinculados a ele.";
                    }
                } else {
                    try {
                        const data = await resp.json();
                        if (data && data.message && data.message.includes("foreign key")) {
                            msg = "Não é possível deletar o horário pois existem agendamentos vinculados a ele.";
                        }
                    } catch { }
                }
                alert(msg);
            }
        } catch (e) {
            if (e && e.message && e.message.includes("foreign key")) {
                alert("Não é possível deletar o horário pois existem agendamentos vinculados a ele.");
            } else {
                alert("Erro ao deletar horário.");
            }
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="layout">
            <main className="content">
                <h1 className="page-title">{editando ? "Editar Horário" : "Novo Horário"}</h1>
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
                    <div className="row">
                        <div className="campo">
                            <label className="ficha-label">Data e Hora</label>
                            <input
                                type="datetime-local"
                                value={dataHora}
                                onChange={e => setDataHora(e.target.value)}
                                className="ficha-input"
                                required
                            />
                        </div>
                        <div className="campo">
                            <label className="ficha-label">Serviço</label>
                            <select
                                className="ficha-select"
                                value={servicoSelecionado}
                                onChange={e => setServicoSelecionado(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {servicos.map(s => (
                                    <option key={s.id_servico} value={s.id_servico}>{s.nm_servico}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="campo">
                            <label className="ficha-label">Veterinário</label>
                            <select
                                className="ficha-select"
                                value={veterinarioSelecionado}
                                onChange={e => setVeterinarioSelecionado(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {veterinarios.map(v => (
                                    <option key={v.id_veterinario} value={v.id_veterinario}>{v.pessoa?.nm_pessoa} ({v.especialidade_vet})</option>
                                ))}
                            </select>
                        </div>
                        <div className="campo">
                            <label className="ficha-label">Hospital</label>
                            <input
                                type="text"
                                className="ficha-input input-readonly"
                                value={hospital}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <button className="btn btn-secondary" onClick={() => navigate(-1)} disabled={salvando}>Cancelar</button>
                        {editando && (
                            <button className="btn btn-danger" style={{ marginRight: 8 }} onClick={handleDeletar} disabled={salvando}>Deletar</button>
                        )}
                        <button className="btn btn-primary" onClick={handleSalvar} disabled={salvando}>{editando ? "Salvar Alterações" : "Salvar"}</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

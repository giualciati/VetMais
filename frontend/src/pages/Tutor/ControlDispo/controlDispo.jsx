import { useState, useEffect } from "react";
import styles from "./controlDispo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function ControlDispo() {
  const navigate = useNavigate();

  // --- ESTADOS (VARIÁVEIS) ---
  const [data, setData] = useState("");
  const [hora, setHora] = useState("08:00");
  const [quantidade, setQuantidade] = useState(1);
  const [servicos, setServicos] = useState([]);
  const [idServicoSelecionado, setIdServicoSelecionado] = useState("");

  // ID do Veterinário (Fixo por enquanto, depois virá do Login)
  const idVeterinarioLogado = 1; 

  useEffect(() => {
    axios.get("http://localhost:8080/servicos")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => console.error("Erro ao buscar serviços:", error));
  }, []);

  const handleSalvar = async () => {
    if (!data || !idServicoSelecionado || !hora || quantidade < 1) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const payload = {
      dataHora: `${data}T${hora}`, 
      idServico: parseInt(idServicoSelecionado),
      idVeterinario: idVeterinarioLogado,
      quantidade: parseInt(quantidade)
    };

    try {
      await axios.post("http://localhost:8080/agendas/salvar", payload);
      alert(`${quantidade} vaga(s) criada(s) com sucesso!`);
      navigate(-1); 
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar agenda. Verifique se o Back-end está rodando.");
    }
  };

  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        <h1 className={styles.pageTitle}>Controlar Vagas</h1>

        <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14 18L8 11L14 4" stroke="#f68b1f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <section className={`${styles.card} ${styles.cardControlar}`}>
          
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label htmlFor="dia">Dia:</label>
              <input 
                id="dia" 
                type="date" 
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="hora">Horário Inicial:</label>
              <input 
                id="hora" 
                type="time" 
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label htmlFor="proc">Procedimento / Especialidade:</label>
              
              <select 
                id="proc"
                value={idServicoSelecionado}
                onChange={(e) => setIdServicoSelecionado(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="">Selecione o serviço...</option>
                {servicos.map((servico) => (
                  <option key={servico.id_servico} value={servico.id_servico}>
                    {servico.nm_servico}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.fieldGroup} ${styles.quantidade}`}>
              <label htmlFor="qtd">Quantidade de vagas (intervalo de 30min):</label>
              <input 
                id="qtd" 
                type="number" 
                min="1" 
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => navigate(-1)}>
              Cancelar
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSalvar}>
              Salvar
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}
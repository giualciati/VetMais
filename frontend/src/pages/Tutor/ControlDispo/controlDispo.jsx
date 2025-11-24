import styles from "./controlDispo.module.css";
import HorarioCard from "../../../components/HorariosCard/HorariosCard";
import { useNavigate } from "react-router-dom";

export default function ControlDispo() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      {/* Conteúdo principal */}
      <main className={styles.content}>
        <h1 className={styles.pageTitle}>Controlar Vagas</h1>

        {/* Botão Voltar */}
        <button
          className={styles.btnVoltar}
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M14 18L8 11L14 4"
              stroke="#f68b1f"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <section className={`${styles.card} ${styles.cardControlar}`}>
          {/* Linha 1 */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label htmlFor="dia">Dia:</label>
              <input id="dia" type="date" />
            </div>

            <div
              className={`${styles.fieldGroup} ${styles.reservarPor}`}
            >
              <span className={styles.fieldLabel}>Reservar vagas por:</span>
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
          <div className={styles.row}>
            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label htmlFor="proc">Procedimento / Especialidade:</label>
              <input
                type="text"
                id="proc"
                placeholder="Digite o procedimento ou especialidade"
              />
            </div>
          </div>

          {/* Linha 3 */}
          <div className={styles.row}>
            <div className={`${styles.fieldGroup} ${styles.quantidade}`}>
              <label htmlFor="qtd">
                Aplicar quantidade de vagas padrão:
              </label>
              <input id="qtd" type="number" min="0" defaultValue="1" />
            </div>

            <div
              className={`${styles.fieldGroup} ${styles.aplicarCustomizar}`}
            >
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
          <div className={styles.horariosWrapper}>
            <HorarioCard hora="10:00" />
          </div>

          {/* Botões */}
          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Salvar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

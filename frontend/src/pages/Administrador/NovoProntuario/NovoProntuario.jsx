import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./novoProntuario.scss";
import axios from "axios";
import garfield from "../../../assets/images/Garfield.png";

export default function NovoProntuario() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    animalId: "",
    veterinarioId: "",
    hospitalId: "",
    dt_atendimento: "",
    ds_sintomas: "",
    ds_diagnostico: "",
    ds_tratamento: "",
    ds_observacoes: "",
  });

  const [animais, setAnimais] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [hospitais, setHospitais] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/animais")
      .then(res => setAnimais(res.data))
      .catch(err => console.error("Erro ao buscar animais:", err));

    axios.get("http://localhost:8080/veterinarios")
      .then(res => setVeterinarios(res.data))
      .catch(err => console.error("Erro ao buscar veterinários:", err));

    axios.get("http://localhost:8080/hospital/findAll")
      .then(res => setHospitais(res.data))
      .catch(err => console.error("Erro ao buscar hospitais:", err));
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.animalId ||
      !formData.veterinarioId ||
      !formData.hospitalId ||
      !formData.dt_atendimento
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const payload = {
      dtAtendimento: formData.dt_atendimento,
      dsSintomas: formData.ds_sintomas,
      dsDiagnostico: formData.ds_diagnostico,
      dsTratamento: formData.ds_tratamento,
      dsObservacoes: formData.ds_observacoes,
      veterinarioId: Number(formData.veterinarioId),
      hospitalId: Number(formData.hospitalId),
      animalId: Number(formData.animalId)
    };

    try {
      await axios.post("http://localhost:8080/prontuarios/cadastro", payload);
      alert("✅ Prontuário criado com sucesso!");

      // 🔥 Navegação automática
      navigate("/prontuarios/vet");

    } catch (error) {
      console.error("Erro ao salvar prontuário:", error);
      alert("❌ Erro ao salvar prontuário.");
    }
  }

  return (
    <section className="novo-prontuario-page">

      {/* ---------- TÍTULO ---------- */}
      <div className="titulo-container">
        <h1 className="titulo-prontuario">Novo Prontuário</h1>
      </div>

      <form className="prontuario-forms-container" onSubmit={handleSubmit}>

        {/* ---------- FORMULÁRIO ESQUERDO ---------- */}
        <div className="form-esquerdo">

          <div className="input-garfield-container">

            <div className="imagem-garfield-container">
              <img
                src={garfield}
                alt="Garfield"
                className="garfield-imagem"
              />
            </div>

            <div className="inputs-bloco-1">

              <label className="label-prontuario">Animal:</label>
              <select
                className="input-prontuario"
                name="animalId"
                value={formData.animalId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um animal</option>
                {animais.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome}
                  </option>
                ))}
              </select>

              <label className="label-prontuario">Veterinário:</label>
              <select
                className="input-prontuario"
                name="veterinarioId"
                value={formData.veterinarioId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um veterinário</option>
                {veterinarios.map((v) => (
                  <option key={v.id_veterinario} value={v.id_veterinario}>
                    {v.pessoa?.nm_pessoa} - {v.especialidade_vet}
                  </option>
                ))}
              </select>

              <label className="label-prontuario">Hospital:</label>
              <select
                className="input-prontuario"
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um hospital</option>
                {hospitais.map((h) => (
                  <option key={h.id_hospvet} value={h.id_hospvet}>
                    {h.nm_hospital} - {h.cidade_hospital}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <div className="textarea-container">
            <label className="label-prontuario">Sintomas:</label>
            <textarea
              className="textarea-prontuario"
              name="ds_sintomas"
              value={formData.ds_sintomas}
              onChange={handleChange}
              required
            />

            <label className="label-prontuario">Diagnóstico:</label>
            <textarea
              className="textarea-prontuario"
              name="ds_diagnostico"
              value={formData.ds_diagnostico}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ---------- FORMULÁRIO DIREITO ---------- */}
        <div className="form-direito">

          <div className="textarea-container-2">

            <label className="label-prontuario">Tratamento:</label>
            <textarea
              className="textarea-prontuario"
              name="ds_tratamento"
              value={formData.ds_tratamento}
              onChange={handleChange}
              required
            />

            <label className="label-prontuario">Observações:</label>
            <textarea
              className="textarea-prontuario"
              name="ds_observacoes"
              value={formData.ds_observacoes}
              onChange={handleChange}
            />

          </div>

          <div className="inputs-final-container">

            <div className="formato-bloco">
              <label className="label-prontuario">
                Data e Hora do Atendimento:
              </label>

              <input
                className="input-prontuario"
                type="datetime-local"
                name="dt_atendimento"
                value={formData.dt_atendimento}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="botoes-container">
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </div>

        </div>

      </form>

    </section>
  );
}

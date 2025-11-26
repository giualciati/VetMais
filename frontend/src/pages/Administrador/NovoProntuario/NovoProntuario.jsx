import { useState, useEffect } from "react";
import "./novoProntuario.scss";
import axios from "axios";
import garfield from "../../../assets/images/Garfield.png";
import tutor from "../../../assets/images/tutor_Garfield.png";

export default function NovoProntuario() {
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
    // Buscar todos os animais
    axios.get("http://localhost:8080/animais")
      .then(res => setAnimais(res.data))
      .catch(err => console.error("Erro ao buscar animais:", err));

    // Buscar todos os veterinários
    axios.get("http://localhost:8080/veterinarios")
      .then(res => setVeterinarios(res.data))
      .catch(err => console.error("Erro ao buscar veterinários:", err));

    // Buscar todos os hospitais
    axios.get("http://localhost:8080/hospital/findAll")
      .then(res => setHospitais(res.data))
      .catch(err => console.error("Erro ao buscar hospitais:", err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação simples
    if (!formData.dt_atendimento || !formData.animalId || !formData.veterinarioId || !formData.hospitalId) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      dt_atendimento: formData.dt_atendimento, // mantemos o valor sem conversão
      ds_sintomas: formData.ds_sintomas,
      ds_diagnostico: formData.ds_diagnostico,
      ds_tratamento: formData.ds_tratamento,
      ds_observacoes: formData.ds_observacoes,
      veterinario: { id_veterinario: parseInt(formData.veterinarioId) },
      hospital: { id_hospvet: parseInt(formData.hospitalId) },
      animal: { id_animal: parseInt(formData.animalId) },
    };

    try {
      await axios.post("http://localhost:8080/prontuarios/cadastro", payload);
      alert("Prontuário criado com sucesso!");
      // Limpar formulário
      setFormData({
        animalId: "",
        veterinarioId: "",
        hospitalId: "",
        dt_atendimento: "",
        ds_sintomas: "",
        ds_diagnostico: "",
        ds_tratamento: "",
        ds_observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao salvar prontuário:", error);
      alert("Erro ao salvar prontuário.");
    }
  }

  return (
    <section className="novo-prontuario-page">
      <div className="titulo-container">
        <h1 className="titulo-prontuario">Novo Prontuário</h1>
      </div>

      <form className="prontuario-forms-container" onSubmit={handleSubmit}>
        {/* FORM ESQUERDO */}
        <div className="form-esquerdo">
          <div className="input-garfield-container">
            <div className="imagem-garfield-container">
              <img className="garfield-imagem" src={garfield} alt="Garfield" />
            </div>

            <div className="inputs-bloco-1">
              <label className="label-prontuario">Animal:</label>
              <select name="animalId" value={formData.animalId} onChange={handleChange} required>
                <option value="">Selecione um animal</option>
                {animais.map(animal => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nome}
                  </option>
                ))}
              </select>

              <label className="label-prontuario">Veterinário:</label>
              <select name="veterinarioId" value={formData.veterinarioId} onChange={handleChange} required>
                <option value="">Selecione um veterinário</option>
                {veterinarios.map(v => (
                  <option key={v.id_veterinario} value={v.id_veterinario}>
                    {v.pessoa.nm_pessoa} - {v.especialidade_vet}
                  </option>
                ))}
              </select>

              <label className="label-prontuario">Hospital:</label>
              <select name="hospitalId" value={formData.hospitalId} onChange={handleChange} required>
                <option value="">Selecione um hospital</option>
                {hospitais.map(h => (
                  <option key={h.id_hospvet} value={h.id_hospvet}>
                    {h.nm_hospital} - {h.cidade_hospital}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="textarea-container">
            <label className="label-prontuario">Sintomas:</label>
            <textarea name="ds_sintomas" value={formData.ds_sintomas} onChange={handleChange} required />

            <label className="label-prontuario">Diagnóstico:</label>
            <textarea name="ds_diagnostico" value={formData.ds_diagnostico} onChange={handleChange} required />

            <label className="label-prontuario">Tratamento:</label>
            <textarea name="ds_tratamento" value={formData.ds_tratamento} onChange={handleChange} required />

            <label className="label-prontuario">Observações:</label>
            <textarea name="ds_observacoes" value={formData.ds_observacoes} onChange={handleChange} />
          </div>

          <div className="inputs-final-container">
            <label className="label-prontuario">Data e Hora do Atendimento:</label>
            <input
              type="datetime-local"
              name="dt_atendimento"
              value={formData.dt_atendimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="botoes-container">
            <button type="submit" className="btn-salvar">Salvar</button>
          </div>
        </div>
      </form>
    </section>
  );
}

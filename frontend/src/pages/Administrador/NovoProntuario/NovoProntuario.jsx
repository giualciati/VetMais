import { useState } from "react";
import "./novoProntuario.scss";
import garfield from "../../../assets/images/Garfield.png";
import tutor from "../../../assets/images/tutor_Garfield.png";
import axios from "axios";

export default function NovoProntuario() {

  const [formData, setFormData] = useState({
    nomeAnimal: "",
    nomeTutor: "",
    nomeEspecie: "",
    nascimento: "",
    raca: "",
    sexo: "",
    descricaoAnimal: "",
    sintomasAnimal: "",
    diagnostico: "",
    tratamento: "",
    observacoes: "",
    dataAtendimento: "",
    horaAtendimento: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 🚨 Se faltar data ou hora, não envia
    if (!formData.dataAtendimento || !formData.horaAtendimento) {
      alert("Informe a data e horário do atendimento");
      return;
    }

    const dataCompleta = `${formData.dataAtendimento}T${formData.horaAtendimento}:00`;

    const payload = {
      dt_atendimento: dataCompleta,
      ds_sintomas: formData.sintomasAnimal,
      ds_diagnostico: formData.diagnostico,
      ds_tratamento: formData.tratamento,
      ds_observacoes: formData.observacoes,

      veterinario: { id_veterinario: 1 },
      hospital: { id_hospvet: 1 },
      animal: { id_animal: 3 }
    };

    try {
      await axios.post("http://localhost:8080/prontuarios", payload);
      alert("Prontuário criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar prontuário.");
    }
  }

  return (
    <section className="novo-prontuario-page">
      <div className="titulo-container">
        <h1 className="titulo-prontuario">Novo Prontuário</h1>
      </div>

      <form className="prontuario-forms-container" onSubmit={handleSubmit}>

        {/* Coluna ESQUERDA */}
        <div className="form-esquerdo">

          <div className="input-garfield-container">
            <div className="imagem-garfield-container">
              <img className="garfield-imagem" src={garfield} alt="Garfield" />
            </div>

            <div className="inputs-bloco-1">
              <label htmlFor="nomeAnimal" className="label-prontuario">Nome do Animal:</label>
              <input id="nomeAnimal" className="input-prontuario" type="text" required onChange={handleChange} />

              <label htmlFor="nomeTutor" className="label-prontuario">Nome do Tutor:</label>
              <input id="nomeTutor" className="input-prontuario" type="text" required onChange={handleChange} />
            </div>
          </div>

          <div className="card-inputs-container">
            <div className="inputs-bloco-2">
              <label htmlFor="nomeEspecie" className="label-prontuario">Espécie:</label>
              <input id="nomeEspecie" className="input-prontuario" type="text" required onChange={handleChange} />

              <label htmlFor="nascimento" className="label-prontuario">Data de Nascimento:</label>
              <input id="nascimento" className="input-prontuario" type="date" required onChange={handleChange} />
            </div>

            <div className="inputs-bloco-2">
              <label htmlFor="raca" className="label-prontuario">Raça:</label>
              <input id="raca" className="input-prontuario" type="text" required onChange={handleChange} />

              <label htmlFor="sexo" className="label-prontuario">Sexo:</label>
              <input id="sexo" className="input-prontuario" type="text" required onChange={handleChange} />
            </div>
          </div>

          <div className="textarea-container">
            <label htmlFor="descricaoAnimal" className="label-prontuario">Descrição do Animal:</label>
            <textarea id="descricaoAnimal" className="textarea-prontuario" required onChange={handleChange} />

            <label htmlFor="sintomasAnimal" className="label-prontuario">Sintomas:</label>
            <textarea id="sintomasAnimal" className="textarea-prontuario" required onChange={handleChange} />
          </div>

        </div>

        {/* Coluna DIREITA */}
        <div className="form-direito">

          <div className="input-garfield-container">
            <div className="imagem-garfield-container">
              <img className="tutor-garfield-imagem" src={tutor} alt="Tutor Garfield" />
            </div>

            <div className="textarea-bloco-1">
              <label htmlFor="diagnostico" className="label-prontuario">Diagnóstico:</label>
              <textarea id="diagnostico" className="textarea-prontuario" required onChange={handleChange} />
            </div>
          </div>

          <div className="textarea-container-2">
            <div className="textarea-bloco-2">
              <label htmlFor="tratamento" className="label-prontuario">Tratamento:</label>
              <textarea id="tratamento" className="textarea-prontuario" required onChange={handleChange} />

              <label htmlFor="observacoes" className="label-prontuario">Observações médicas:</label>
              <textarea id="observacoes" className="textarea-prontuario" required onChange={handleChange} />
            </div>
          </div>

          <div className="inputs-final-container">
            <div className="formato-bloco">
              <label htmlFor="dataAtendimento" className="label-prontuario">Data do Atendimento:</label>
              <input id="dataAtendimento" className="input-prontuario" type="date" required onChange={handleChange} />
            </div>

            <div className="formato-bloco">
              <label htmlFor="horaAtendimento" className="label-prontuario">Horário:</label>
              <input id="horaAtendimento" className="input-prontuario" type="time" required onChange={handleChange} />
            </div>

            <div className="botoes-container">
              <button type="submit" className="btn-salvar">Salvar</button>
            </div>
          </div>

        </div>

      </form>
    </section>
  );
}

import axios from "axios";

const API_URL = "http://localhost:8080/prontuarios";

// Listar prontuários
export function listarProntuarios() {
  return axios.get(API_URL);
}

// Cadastrar novo prontuário
export function criarProntuario(prontuarioData) {
  return axios.post(API_URL, prontuarioData);
}

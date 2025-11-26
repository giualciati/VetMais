import axios from "axios";

// Mudamos a rota para bater no SEU AnimalController
const API_URL = "http://localhost:8080/animais";

// Busca animais vinculados ao tutor logado
export function listarPets(idTutor) {
  return axios.get(`${API_URL}/tutor/${idTutor}`);
}

export function buscarPet(id) {
  return axios.get(`${API_URL}/${id}`);
}

// Salva o pet vinculando ao tutor (recebe o ID como parâmetro extra)
export function salvarPet(pet, idTutor) {
  return axios.post(`${API_URL}/tutor/${idTutor}`, pet);
}

export function atualizarPet(id, pet) {
  return axios.put(`${API_URL}/${id}`, pet);
}

export function deletarPet(id) {
  return axios.delete(`${API_URL}/${id}`);
}
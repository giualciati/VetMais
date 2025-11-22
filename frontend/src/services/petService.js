import axios from "axios";

const API_URL = "http://localhost:8080/pets";

export function listarPets() {
  return axios.get(API_URL);
}

export function buscarPet(id) {
  return axios.get(`${API_URL}/${id}`);
}

export function salvarPet(pet) {
  return axios.post(API_URL, pet);
}

export function atualizarPet(id, pet) {
  return axios.put(`${API_URL}/${id}`, pet);
}

export function deletarPet(id) {
  return axios.delete(`${API_URL}/${id}`);
}

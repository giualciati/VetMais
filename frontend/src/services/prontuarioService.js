import axios from "axios";

const API_URL = "http://localhost:8080/prontuarios";

export function listarProntuarios() {
  return axios.get(API_URL);
}

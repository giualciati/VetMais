// API Base URL - Pode ser alterado conforme o ambiente
const API_BASE_URL = "http://localhost:8080";

/**
 * Serviço de Autenticação
 * Responsável por fazer login, registro e gerenciar tokens JWT
 */

// ============================================
// LOGIN - Envia email + senha para backend
// ============================================
export const login = async (email, senha) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: email,  // O backend espera "usuario" (email)
        senha: senha,
      }),
    });

    if (!response.ok) {
      throw new Error("E-mail ou senha incorretos!");
    }

    // O backend retorna o token JWT como texto plano
    const token = await response.text();

    // Armazena o token no localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);

    return { success: true, token };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, error: error.message };
  }
};

// REGISTER - Cria nova conta
export const register = async (nome, email, senha) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar conta!");
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer registro:", error);
    return { success: false, error: error.message };
  }
};

// GET TOKEN - Recupera token armazenado
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// GET USER EMAIL - Recupera email do usuário logado
export const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};

// LOGOUT - Remove token e dados do usuário
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
};

// IS AUTHENTICATED - Verifica se usuário está logado
export const isAuthenticated = () => {
  return !!getToken();
};

// GET HEADERS COM TOKEN - Retorna headers com autenticação
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

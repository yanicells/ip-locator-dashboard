import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, user: {name: string, email: string}}>}
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Network error. Please try again.");
  }
};

const authService = {
  login,
};

export default authService;

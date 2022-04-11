import axios from "axios";

const register = async (userData: object) => {
  const response = await axios.post("http://localhost:5000/register", userData);

  if (response) localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const login = async (userData: object) => {
  const response = await axios.post("http://localhost:5000/login", userData);

  if (response) localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

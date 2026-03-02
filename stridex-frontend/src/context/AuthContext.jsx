import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);
    const userData = {
    ...data.user,
    token: data.token,
  };
    localStorage.setItem("user", JSON.stringify(data));
    setUser(userData);
  };

  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);
    const userData = {
    ...data.user,
    token: data.token,
  };
    localStorage.setItem("user", JSON.stringify(data));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  //  LOGIN
  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);

    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  //  REGISTER
  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);

    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
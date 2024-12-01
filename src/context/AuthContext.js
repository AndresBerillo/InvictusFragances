import React, { createContext, useState, useContext, useEffect } from 'react';
import users from '../data/users.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para rastrear la carga inicial

  // Cargar estado de autenticación desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Marcar como cargado
  }, []);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar usuario en localStorage
      return true; // Login exitoso
    }
    return false; // Credenciales incorrectas
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Eliminar usuario del localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


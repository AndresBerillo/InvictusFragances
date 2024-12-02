import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
      // Si no hay usuarios, inicializar con el usuario admin
      const defaultAdmin = {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
      };
      users.push(defaultAdmin);
      localStorage.setItem('users', JSON.stringify(users)); // Guardar en localStorage
    }

    // Verificar si ya hay un usuario autenticado
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Función para iniciar sesión
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Cargar usuarios
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  // registrar un nuevo usuario
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Cargar usuarios
    const existingUser = users.find(user => user.username === username);

    if (!existingUser) {
      const newUser = { id: users.length + 1, username, password, role: 'user' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); // Guardar los usuarios actualizados
      return true;
    }
    return false;
  };

  // ccerrar sesión
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};




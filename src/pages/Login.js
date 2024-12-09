import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Estado para cambiar entre Login y Registro
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isRegistering) {
      const success = await register(username, password);
      if (success) {
        setError('');
        setIsRegistering(false);
      } else {
        setError('El usuario ya existe');
      }
    } else {
      const success = await login(username, password);
      if (success) {
        navigate('/'); // Redirige al inicio
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    }
  };

  return (
    <>
      <Header /> {/* Incluye el Header */}
      <div className="container my-4">
        <h1>{isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="mt-3">
          {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn btn-link"
          >
            {isRegistering ? 'Iniciar Sesión' : 'Registrar'}
          </button>
        </p>
      </div>
      <Footer /> {/* Incluye el Footer */}
    </>
  );
};

export default Login;



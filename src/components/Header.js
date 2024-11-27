import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth(); // Usa el contexto

  return (
    <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Perfumes</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <span className="mx-3">Hola, {currentUser.username}</span>
                <button className="btn btn-danger btn-sm" onClick={logout}>
                  Cerrar Sesión
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;


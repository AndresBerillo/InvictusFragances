import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth(); // Usa el contexto

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo y nombre del sitio */}
        <Link className="navbar-brand fw-bold" to="/">
          Perfumes
        </Link>

        {/* Botón para el menú en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú desplegable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Enlace a Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Mostrar Login si no está autenticado */}
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-light px-3" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <>
                {/* Mensaje de bienvenida */}
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link text-white">
                    Hola, <strong>{currentUser?.username || 'Invitado'}</strong>
                  </span>
                  {/* Botón para ir al carrito */}
                  <Link className="btn btn-outline-warning px-3 mx-2" to="/cart">
                    🛒 Carrito
                  </Link>
                </li>

                {/* Dashboard si el usuario es admin */}
                {currentUser?.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link btn btn-outline-info px-3 mx-2" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                )}

                {/* Cerrar Sesión */}
                <li className="nav-item">
                  <button
                    className="btn btn-danger px-3"
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;



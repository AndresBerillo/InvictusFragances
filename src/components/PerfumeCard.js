import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PerfumeCard = ({ perfume }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const imageUrl = `http://localhost:8088${perfume.imagen}`;

  const handleBuyClick = () => {
    if (isAuthenticated) {
      navigate(`/product/${perfume.id}`);
    } else {
      alert('Por favor, inicie sesión para comprar.');
      navigate('/login');
    }
  };

  if (!perfume) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="card mb-5">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={perfume.nombre}
        style={{ objectFit: 'cover', height: '30rem' }}
      />
      <div className="card-body">
        <h5 className="card-title">{perfume.nombre}</h5>
        <p className="card-text">{perfume.descripcion}</p>
        <p className="card-text">${perfume.precio}</p>
        <button className="btn btn-primary" onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default PerfumeCard;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PerfumeCard = ({ perfume }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (isAuthenticated) {
      navigate(`/product/${perfume.id}`); // Redirige a detalles del producto
    } else {
      alert('Por favor, inicie sesión para comprar.');
      navigate('/login'); // Redirige a la página de login
    }
  };

  return (
    <div className="card">
      <img src={perfume.image} className="card-img-top" alt={perfume.name} />
      <div className="card-body">
        <h5 className="card-title">{perfume.name}</h5>
        <p className="card-text">${perfume.price}</p>
        <button className="btn btn-primary" onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default PerfumeCard;

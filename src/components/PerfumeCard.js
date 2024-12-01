import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import perfumes from '../data/data.json';


const PerfumeCard = ({ perfume }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (isAuthenticated) {
      navigate(`/product/${perfume.id}`);
    } else {
      alert('Por favor, inicie sesión para comprar.');
      navigate('/login');
    }
  };

  return (
    <div className="card">
      <img src={perfume.imagen} className="card-img-top" alt={perfume.nombre} />
      <div className="card-body">
        <h5 className="card-title">{perfume.nombre}</h5>
        <p className="card-text">${perfume.precio}</p>
        <button className="btn btn-primary" onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default PerfumeCard;


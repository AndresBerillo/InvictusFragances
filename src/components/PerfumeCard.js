import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PerfumeCard = ({ perfumeId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [perfume, setPerfume] = useState(null);

  // Obtener la información del perfume desde Local Storage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const product = storedProducts.find((item) => item.id === perfumeId);
    setPerfume(product);
  }, [perfumeId]);

  const handleBuyClick = () => {
    if (isAuthenticated) {
      navigate(`/product/${perfumeId}`);
    } else {
      alert('Por favor, inicie sesión para comprar.');
      navigate('/login');
    }
  };

  // Mostrar un mensaje si el perfume no se encuentra
  if (!perfume) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="card mb-5">
      <img
        src={perfume.imagen}
        className="card-img-top"
        alt={perfume.nombre}
        style={{ objectFit: 'cover', height: '30rem' }}
      />
      <div className="card-body">
        <h5 className="card-title">{perfume.nombre}</h5>
        <p className="card-text">{perfume.descripcion}</p> {/* Mostrar la descripción */}
        <p className="card-text">${perfume.precio}</p>
        <button className="btn btn-primary" onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default PerfumeCard;



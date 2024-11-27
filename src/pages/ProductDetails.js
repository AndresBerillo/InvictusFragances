import React from 'react';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import perfumes from '../data/data.json';

const ProductDetails = () => {
  const { id } = useParams();
  const product = perfumes.perfumes.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return <h1>Producto no encontrado</h1>;

  return (
    <div className="container my-4">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          addToCart(product);
          navigate('/cart');
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductDetails;

import React from 'react';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import perfumes from '../data/data.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams(); // ID recibido desde la URL como string
  const product = perfumes.perfumes.find((item) => item.id === id); // Comparación como string
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return <h1>Producto no encontrado</h1>;

  return (
    <>
      <Header /> {/* Añade el Header */}
      <div className="container my-4">
        <h1>{product.nombre}</h1> {/* Mostrar nombre del producto */}
        <p>{product.descripcion}</p> {/* Mostrar descripción */}
        <p>Precio: ${product.precio}</p> {/* Mostrar precio */}
        {product.imagen && (
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
          />
        )}
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            addToCart(product);
            navigate('/cart');
          }}
        >
          Añadir al carrito
        </button>
      </div>
      <Footer /> {/* Añade el Footer */}
    </>
  );
};

export default ProductDetails;


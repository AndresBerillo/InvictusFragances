import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams(); // ID recibido desde la URL
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Estado para el producto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/perfumes/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data); // Actualiza el estado con el producto
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h1>Cargando producto...</h1>;
  if (error) return <h1>{error}</h1>;
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
            src={`http://localhost:8088${product.imagen}`}
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

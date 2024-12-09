import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Cantidad seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/perfumes/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data);
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
      <Header />
      <div className="container my-4">
        <h1>{product.nombre}</h1>
        <p>{product.descripcion}</p>
        <p>Precio: ${product.precio}</p>
        {product.imagen && (
          <img
            src={`http://localhost:8088${product.imagen}`}
            alt={product.nombre}
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
          />
        )}
        <div className="mt-3">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="form-control"
            style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            addToCart(product, quantity);
            navigate('/cart');
          }}
        >
          Añadir al carrito
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

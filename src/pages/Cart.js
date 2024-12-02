import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, removeFromCart } = useCart(); 
  const navigate = useNavigate();

  return (
    <>
      <Header /> {/* Añade el Header */}
      <div className="container my-4">
        <h1>Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {product.nombre}
                      {product.imagen && (
                        <img
                          src={product.imagen}
                          alt={product.nombre}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            marginLeft: '10px',
                          }}
                        />
                      )}
                    </td>
                    <td>${product.precio}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(product.id)} // Eliminar producto del carrito
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
            >
              Proceder al pago
            </button>
          </>
        )}
      </div>
      <Footer /> {/* Añade el Footer */}
    </>
  );
};

export default Cart;

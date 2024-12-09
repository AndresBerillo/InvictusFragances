import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Calcular el total a pagar
  const totalAmount = cart.reduce(
    (total, product) => total + product.precio * product.quantity,
    0
  );

  return (
    <>
      <Header />
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
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
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
                          src={`http://localhost:8088${product.imagen}`}
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
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product.id, parseInt(e.target.value, 10))
                        }
                        className="form-control"
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>${product.precio * product.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <strong className="fs-5">Total a pagar: ${totalAmount.toFixed(2)}</strong>
              <button
                className="btn btn-success"
                onClick={() => navigate('/checkout')}
              >
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

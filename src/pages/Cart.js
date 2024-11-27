import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="container my-4">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const { setCart } = useCart();

  useEffect(() => {
    setCart([]);
  }, [setCart]);

  return (
    <>
      <Header />
      <div className="container text-center my-5">
        <h1 className="text-success">Compra realizada con éxito</h1>
        <p className="fs-4">¡Muchas gracias por tu compra!</p>
        <p className="fs-5">Esperamos que disfrutes tu experiencia con nuestros productos.</p>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

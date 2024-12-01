import React, { useEffect, useState } from 'react';
import PerfumeCard from '../components/PerfumeCard'; // Importa el componente para mostrar cada perfume
import Header from '../components/Header';
import Footer from '../components/Footer';
import perfumesData from '../data/data.json'; // Importa el JSON con los datos iniciales

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);

  // Cargar los datos desde Local Storage o inicializar con datos del JSON
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    const isInitialized = localStorage.getItem('isInitialized');

    if (!isInitialized) {
      // Si no se ha inicializado, guardar los datos del JSON y establecer la bandera
      localStorage.setItem('products', JSON.stringify(perfumesData.perfumes));
      localStorage.setItem('isInitialized', 'true'); // Marcar como inicializado
      setPerfumes(perfumesData.perfumes); // Inicializar el estado con los datos del JSON
    } else if (storedProducts) {
      // Si está inicializado, cargar los datos existentes
      setPerfumes(storedProducts);
    } else {
      // Si no hay productos (vacío por eliminación), inicializar como vacío
      setPerfumes([]);
    }
  }, []);

  return (
    <>
      <Header /> {/* Encabezado */}
      <div className="container">
        <h1 className="my-4">Catálogo de Perfumes</h1>
        <div className="row">
          {perfumes.length > 0 ? (
            perfumes.map((perfume) => (
              <div className="col-md-4" key={perfume.id}>
                <PerfumeCard perfumeId={perfume.id} /> {/* Pasar ID al componente */}
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer /> {/* Pie de página */}
    </>
  );
};

export default Home;

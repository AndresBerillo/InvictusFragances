import React, { useEffect, useState } from 'react';
import PerfumeCard from '../components/PerfumeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import perfumesData from '../data/data.json';

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);

  // cargar los datos desde Local Storage o inicializar con datos del JSON
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    const isInitialized = localStorage.getItem('isInitialized');

    if (!isInitialized) {
      // si no se inicalizó, guarda los datos del JSON y establecer la bandera
      localStorage.setItem('products', JSON.stringify(perfumesData.perfumes));
      localStorage.setItem('isInitialized', 'true'); 
      setPerfumes(perfumesData.perfumes);
    } else if (storedProducts) {
      
      setPerfumes(storedProducts);
    } else {
      setPerfumes([]);
    }
    
  }, []);

  useEffect(() => {
    document.title = 'Inicio- Perfumería Invictus';
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

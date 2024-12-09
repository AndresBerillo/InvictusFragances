import React, { useEffect, useState } from 'react';
import PerfumeCard from '../components/PerfumeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await fetch('http://localhost:8088/api/perfumes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setPerfumes(data);
      } catch (error) {
        console.error('Error al cargar perfumes:', error);
      }
    };
    fetchPerfumes();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-4">Catálogo de Perfumes</h1>
        <div className="row">
          {perfumes.length > 0 ? (
            perfumes.map((perfume) => (
              <div className="col-md-4" key={perfume.id}>
                <PerfumeCard perfumeId={perfume.id} perfume={perfume} />
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;


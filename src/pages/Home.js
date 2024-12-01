import perfumes from '../data/data.json'; // Importa el archivo JSON
import PerfumeCard from '../components/PerfumeCard'; // Importa el componente para mostrar cada perfume
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

  console.log(perfumes);
    return (
      <>
        <Header /> {/* Encabezado */}
        <div className="container">
          <h1 className="my-4">Catálogo de Perfumes</h1>
          <div className="row">
            {perfumes.perfumes.map((perfume) => (
              <div className="col-md-4" key={perfume.id}>
                <PerfumeCard perfume={perfume} />
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Footer /> {/* Pie de página */}
      </>
    );
  };
  
export default Home;

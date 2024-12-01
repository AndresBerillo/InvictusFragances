import React, { useState, useEffect } from 'react';
import perfumesData from '../data/data.json';
import Header from '../components/Header'; // Importa el componente Header
import Footer from '../components/Footer'; // Importa el componente Footer

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null); // ID del producto que se está editando
  const [newProduct, setNewProduct] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '', // URL o base64 de la imagen
  });
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario

  // Cargar datos iniciales desde Local Storage o JSON
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      const normalizedProducts = perfumesData.perfumes.map(product => ({
        ...product,
        id: String(product.id), // Convertir a cadena
      }));
      setProducts(normalizedProducts);
      localStorage.setItem('products', JSON.stringify(normalizedProducts)); // Guardar en Local Storage
    }
  }, []); // Array vacío asegura que se ejecute solo una vez

  const saveToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, imagen: reader.result });
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    } else {
      alert('Solo se permiten archivos PNG o JPG.');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio || !newProduct.imagen) {
      alert('Por favor completa todos los campos, incluida la imagen.');
      return;
    }

    if (currentProductId === null) {
      // Crear un nuevo producto
      const nextId = products.length > 0 ? String(Math.max(...products.map((p) => Number(p.id))) + 1) : "1";
      const newProductWithId = { ...newProduct, id: nextId }; // Convertir el ID a String

      const updatedProducts = [...products, newProductWithId];
      setProducts(updatedProducts); // Actualizar estado
      saveToLocalStorage(updatedProducts); // Guardar en Local Storage
    } else {
      // Editar un producto existente
      const updatedProducts = products.map((product) =>
        product.id === currentProductId ? { ...newProduct, id: currentProductId } : product
      );
      setProducts(updatedProducts); // Actualizar estado
      saveToLocalStorage(updatedProducts); // Guardar en Local Storage
    }

    // Restablecer estados y cerrar formulario
    setNewProduct({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
    setCurrentProductId(null);
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setCurrentProductId(product.id); // No es necesario convertir a número ya que ahora es String
    setNewProduct(product); // Cargar los datos del producto seleccionado en el formulario
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmDelete) return;

    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Actualizar estado
    saveToLocalStorage(updatedProducts); // Guardar en Local Storage
  };

  return (
    <>
      <Header /> {/* Incluye el Header */}
      <div className="container my-4">
        <h1>Dashboard de Administrador</h1>
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setShowForm(true);
            setCurrentProductId(null); // Asegurarse de que no se esté editando ningún producto
            setNewProduct({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
          }}
        >
          Añadir Producto
        </button>

        {/* Formulario para agregar o editar productos */}
        {showForm && (
          <form onSubmit={handleAddProduct} className="mb-4 border p-3">
            <h2>{currentProductId === null ? 'Crear Producto' : 'Editar Producto'}</h2>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {currentProductId === null ? 'Guardar' : 'Actualizar'}
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </form>
        )}

        {/* Tabla de productos */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>${product.precio}</td>
                <td>{product.descripcion}</td>
                <td>
                  {product.imagen && (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEditProduct(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <Footer /> {/* Incluye el Footer */}
    </>
  );
};

export default Admin;

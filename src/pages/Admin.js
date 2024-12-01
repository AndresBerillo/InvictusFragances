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

  // Cargar datos iniciales solo al montar el componente
  useEffect(() => {
    const normalizedProducts = perfumesData.perfumes.map(product => ({
      ...product,
      id: String(product.id), // Convertir a cadena
    }));
    setProducts(normalizedProducts);
  }, []); // Array vacío asegura que se ejecute solo una vez

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, imagen: reader.result });
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio || !newProduct.imagen) {
      alert('Por favor completa todos los campos, incluida la imagen.');
      return;
    }

    if (currentProductId === null) {
      // Crear un nuevo producto
      const nextId = products.length > 0 ? String(Math.max(...products.map((p) => Number(p.id))) + 1) : "1";
      const newProductWithId = { ...newProduct, id: nextId }; // Convertir el ID a String

      try {
        const response = await fetch('http://localhost:5000/perfumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProductWithId),
        });

        if (response.ok) {
          const addedProduct = await response.json();
          setProducts((prevProducts) => [...prevProducts, addedProduct]); // Actualiza el estado con el nuevo producto
        }
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    } else {
      // Editar un producto existente
      const updatedProduct = { ...newProduct, id: currentProductId };

      try {
        const response = await fetch(`http://localhost:5000/perfumes/${currentProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === currentProductId ? updatedProduct : product
            )
          ); // Actualiza el estado con el producto editado
        }
      } catch (error) {
        console.error('Error al editar el producto:', error);
      }
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

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/perfumes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        ); // Actualiza el estado después de eliminar
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
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
      <Footer /> {/* Incluye el Footer */}
    </>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';
import perfumesData from '../data/data.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); // ID del usuario que se está editando
  const [newProduct, setNewProduct] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
  });
  const [newUser, setNewUser] = useState({
    id: '',
    username: '',
    password: '',
    role: 'user',
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    document.title = 'Admin - Dashboard';
  }, []);

  // carga datos desde Local Storage para productos y usuarios
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      const normalizedProducts = perfumesData.perfumes.map((product) => ({
        ...product,
        id: String(product.id),
      }));
      setProducts(normalizedProducts);
      localStorage.setItem('products', JSON.stringify(normalizedProducts));
    }

    setUsers(storedUsers);
  }, []);

  // guarda productos en localStorage
  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  // guarda usuarios en localStorage
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Manejar cambio de campos en el formulario de productos
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Manejar cambio de campos en el formulario de usuarios
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Manejar cambio de archivo de imagen
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


  // agregar o editar productos
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio || !newProduct.imagen) {
      alert('Por favor completa todos los campos, incluida la imagen.');
      return;
    }

    if (currentProductId === null) {
      // Crear un nuevo producto
      const nextId = products.length > 0 ? String(Math.max(...products.map((p) => Number(p.id))) + 1) : "1";
      const newProductWithId = { ...newProduct, id: nextId };

      const updatedProducts = [...products, newProductWithId];
      setProducts(updatedProducts);
      saveProductsToLocalStorage(updatedProducts);
    } else {
      // Editar un producto existente
      const updatedProducts = products.map((product) =>
        product.id === currentProductId ? { ...newProduct, id: currentProductId } : product
      );
      setProducts(updatedProducts);
      saveProductsToLocalStorage(updatedProducts);
    }

    // Restablecer estados y cerrar formulario
    setNewProduct({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
    setCurrentProductId(null);
    setShowProductForm(false);
  };

  // Función para agregar o editar usuarios
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (currentUserId === null) {
      // Crear un nuevo usuario
      const nextId = users.length > 0 ? String(Math.max(...users.map((u) => Number(u.id))) + 1) : "1";
      const newUserWithId = { ...newUser, id: nextId };

      const updatedUsers = [...users, newUserWithId];
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
    } else {
      // Editar un usuario existente
      const updatedUsers = users.map((user) =>
        user.id === currentUserId ? { ...newUser, id: currentUserId } : user
      );
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
    }

    // Restablecer estados y cerrar formulario
    setNewUser({ id: '', username: '', password: '', role: 'user' });
    setCurrentUserId(null);
    setShowUserForm(false);
  };

  // editar un producto
  const handleEditProduct = (product) => {
    setCurrentProductId(product.id);
    setNewProduct(product);
    setShowProductForm(true);
  };

  // eliminar un producto
  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (confirmDelete) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      saveProductsToLocalStorage(updatedProducts);
    }
  };

  // eliminar un usuario
const handleDeleteUser = (id) => {
  if (id == "1") {
    alert("No se puede eliminar el usuario con ID = 1 (admin).");
    return;
  }

  const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');
  if (confirmDelete) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  }
};


  // editar un usuario
  const handleEditUser = (user) => {
    setCurrentUserId(user.id);
    setNewUser(user);
    setShowUserForm(true);
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h1>Dashboard de Administrador</h1>

        {/* Botón para añadir un producto */}
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setShowProductForm(true);
            setCurrentProductId(null);
            setNewProduct({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
          }}
        >
          Añadir Producto
        </button>

        {/* Formulario para agregar o editar productos */}
        {showProductForm && (
          <form onSubmit={handleAddProduct} className="mb-4 border p-3">
            <h2>{currentProductId === null ? 'Crear Producto' : 'Editar Producto'}</h2>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={newProduct.precio}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleProductInputChange}
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
              onClick={() => setShowProductForm(false)}
            >
              Cancelar
            </button>
          </form>
        )}

        {/* Tabla de productos */}
        <h2>Productos</h2>
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

        {/* Botón para añadir un usuario */}
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setShowUserForm(true);
            setCurrentUserId(null);
            setNewUser({ id: '', username: '', password: '', role: 'user' });
          }}
        >
          Añadir Usuario
        </button>

        {/* Formulario para agregar o editar usuarios */}
        {showUserForm && (
          <form onSubmit={handleAddUser} className="mb-4 border p-3">
            <h2>{currentUserId === null ? 'Crear Usuario' : 'Editar Usuario'}</h2>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={newUser.username}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={newUser.password}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-control"
                name="role"
                value={newUser.role}
                onChange={handleUserInputChange}
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {currentUserId === null ? 'Guardar' : 'Actualizar'}
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => setShowUserForm(false)}
            >
              Cancelar
            </button>
          </form>
        )}

        {/* Tabla de usuarios */}
        <h2>Usuarios</h2>
        <table className="table table-striped mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
      </div>
      <Footer />
    </>
  );
};

export default Admin;

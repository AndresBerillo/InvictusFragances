import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
  });
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    document.title = 'Admin - Dashboard';
    fetchProducts();
    fetchUsers();
  }, []);

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8088/api/perfumes');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8088/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
      alert('Solo se permiten archivos PNG o JPG.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', file);

    try {
      const response = await fetch('http://localhost:8088/api/perfumes/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      setNewProduct((prevState) => ({
        ...prevState,
        imagen: data.imagePath,
      }));
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio || !newProduct.descripcion || !newProduct.imagen) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const method = currentProductId ? 'PUT' : 'POST';
      const url = currentProductId
        ? `http://localhost:8088/api/perfumes/${currentProductId}`
        : 'http://localhost:8088/api/perfumes';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      await fetchProducts();
      setNewProduct({ nombre: '', precio: '', descripcion: '', imagen: '' });
      setCurrentProductId(null);
      setShowProductForm(false);
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.username || (!currentUserId && !newUser.password)) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const method = currentUserId ? 'PUT' : 'POST';
      const url = currentUserId
        ? `http://localhost:8088/api/users/${currentUserId}`
        : 'http://localhost:8088/api/users/register';

      const body = {
        username: newUser.username,
        role: newUser.role,
      };

      if (!currentUserId) {
        body.password = newUser.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      await fetchUsers();
      setNewUser({ username: '', password: '', role: 'user' });
      setCurrentUserId(null);
      setShowUserForm(false);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProductId(product.id);
    setNewProduct(product);
    setShowProductForm(true);
  };

  const handleEditUser = (user) => {
    setCurrentUserId(user.id);
    setNewUser({ username: user.username, password: '', role: user.role });
    setShowUserForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`http://localhost:8088/api/perfumes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const response = await fetch(`http://localhost:8088/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      await fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
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
            setNewProduct({ nombre: '', precio: '', descripcion: '', imagen: '' });
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
              {newProduct.imagen && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:8088${newProduct.imagen}`}
                    alt="Vista previa"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
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
                      src={`http://localhost:8088${product.imagen}`}
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
            setNewUser({ username: '', password: '', role: 'user' });
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
        <table className="table table-striped">
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

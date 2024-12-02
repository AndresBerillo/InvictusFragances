# Perfumería Invictus

Nuestra aplicación web está diseñada para una perfumería que ofrece reconocidas fragancias. Este sistema proporciona una experiencia interactiva y funcional tanto para los clientes como para los administradores del negocio.

## Características principales

### Catálogo de productos
- Los visitantes del sitio pueden explorar la amplia variedad de fragancias con descripciones y precios.

### Carrito de compras
- Los usuarios registrados tienen la opción de agregar productos al carrito para realizar sus compras.
- Requiere iniciar sesión para gestionar el carrito y proceder al pago.

### Gestión de productos
Los administradores tienen acceso a un **dashboard** exclusivo que permite:
- **Agregar** nuevos productos al catálogo.
- **Editar** detalles de productos existentes como nombre, precio, descripción e imagen.
- **Eliminar** productos que ya no estén disponibles.

### Gestión de usuarios
Un completo sistema **CRUD** para usuarios, que permite:
- **Crear** nuevos usuarios con diferentes roles (como administrador o cliente).
- **Editar** información de usuarios existentes.
- **Eliminar** usuarios.

### Sistema de autenticación
- Inicio y cierre de sesión para acceder a funcionalidades específicas.
- Roles diferenciados para clientes y administradores. El login es el mismo para ambos tipos de usuarios, pero los administradores tienen acceso al dashboard.

## Objetivo de la aplicación

El objetivo de nuestra aplicación es ofrecer una solución digital práctica y sencilla que facilite la gestión de una perfumería. Queremos mejorar la experiencia de compra de los clientes y, al mismo tiempo, simplificar las tareas administrativas.

## Usuario ya creado para testeo
```json
[
  {
    "id": 1,
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }
]

const express = require('express');
const productos = require('./data/productos');

/*
 * ======================================================
 * CONFIGURACIÓN PRINCIPAL DEL SERVIDOR
 * ======================================================
 * Se crea la aplicación de Express, se activa el middleware
 * que permite recibir datos en formato JSON y se define el
 * puerto. Si no existe una variable PORT, se usa el 3000.
 */
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/*
 * ======================================================
 * RUTA PRINCIPAL
 * ======================================================
 * Esta ruta permite comprobar de forma sencilla que el
 * servidor se encuentra activo. El código 200 indica que
 * la solicitud fue atendida correctamente.
 */
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API de productos funcionando correctamente' });
});

/*
 * ======================================================
 * OBTENER TODOS LOS PRODUCTOS
 * ======================================================
 * GET /api/productos devuelve el arreglo completo. Express
 * utiliza el código HTTP 200 de manera predeterminada.
 */
app.get('/api/productos', (req, res) => {
  res.status(200).json(productos);
});

/*
 * ======================================================
 * BUSCAR UN PRODUCTO POR ID
 * ======================================================
 * GET /api/productos/:id convierte el parámetro recibido a
 * número y busca una coincidencia. Devuelve 200 si encuentra
 * el registro o 404 si el producto no existe.
 */
app.get('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.status(200).json(producto);
});

/*
 * ======================================================
 * CREAR UN PRODUCTO
 * ======================================================
 * POST /api/productos valida que nombre y precio hayan sido
 * enviados. Si falta alguno responde con 400. El nuevo ID se
 * calcula a partir del ID más alto y la creación exitosa usa
 * el código HTTP 201.
 */
app.post('/api/productos', (req, res) => {
  const { nombre, precio, descripcion = '' } = req.body;

  if (!nombre || precio === undefined || precio === null) {
    return res.status(400).json({ mensaje: 'El nombre y el precio son obligatorios' });
  }

  const nuevoId = productos.length > 0
    ? Math.max(...productos.map((producto) => producto.id)) + 1
    : 1;

  const nuevoProducto = {
    id: nuevoId,
    nombre,
    precio,
    descripcion
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

/*
 * ======================================================
 * ACTUALIZAR UN PRODUCTO
 * ======================================================
 * PUT /api/productos/:id busca primero la posición del
 * registro. Si no existe responde con 404. Si existe, cambia
 * los datos enviados y conserva los que no fueron incluidos.
 * La respuesta exitosa utiliza el código HTTP 200.
 */
app.put('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indiceProducto = productos.findIndex((item) => item.id === id);

  if (indiceProducto === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  const productoActual = productos[indiceProducto];
  const productoActualizado = {
    ...productoActual,
    ...req.body,
    id: productoActual.id
  };

  productos[indiceProducto] = productoActualizado;

  res.status(200).json(productoActualizado);
});

/*
 * ======================================================
 * ELIMINAR UN PRODUCTO
 * ======================================================
 * DELETE /api/productos/:id busca la posición del producto.
 * Si no existe responde con 404; si existe, splice lo retira
 * del arreglo y se confirma la operación con un código 200.
 */
app.delete('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indiceProducto = productos.findIndex((item) => item.id === id);

  if (indiceProducto === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos.splice(indiceProducto, 1);

  res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
});

/*
 * ======================================================
 * INICIO DEL SERVIDOR
 * ======================================================
 * listen pone la aplicación en funcionamiento y muestra en
 * la consola la dirección que se puede abrir en el navegador.
 */
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

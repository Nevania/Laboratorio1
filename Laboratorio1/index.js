const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// Endpoint para obtener todas las categorías
app.get('/categorias', async (req, res) => {
  const categorias = await db.query('SELECT * FROM categorias');
  res.json(categorias);
});

// Endpoint para obtener un producto por ID
app.get('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const producto = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
  res.json(producto);
});

// Endpoint para obtener todos los productos
app.get('/productos', async (req, res) => {
  const productos = await db.query('SELECT * FROM productos');
  res.json(productos);
});

// Endpoint para crear un nuevo producto
app.post('/productos', async (req, res) => {
  const { nombre, descripcion, precio, categoria_id } = req.body;
  await db.query('INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, categoria_id]);
  res.status(201).send();
});

// Endpoint para actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, categoria_id } = req.body;
  await db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?', [nombre, descripcion, precio, categoria_id, id]);
  res.status(204).send();
});

// Endpoint para eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
  const id = req.params.id;
  await db.query('DELETE FROM productos WHERE id = ?', [id]);
  res.status(204).send();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 8000;

const productManager = new ProductManager();

// Cargar productos desde el archivo al iniciar la aplicación
fs.readFile('/ProductManger', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  const productsFromFile = JSON.parse(data);

  // Agregar los productos al ProductManager
  productsFromFile.forEach((product) => {
    productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock
    );
  });

  console.log('Productos cargados desde el archivo.');
});

// Ruta para obtener todos los productos con un límite opcional
app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

// Ruta para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

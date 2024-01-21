class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const codeExists = this.products.some((product) => product.code === code);
      if (codeExists) {
        console.log("El código ya existe. Introduce uno diferente.");
        return;
      }
  
      // Agregar el producto con un id autoincrementable
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado exitosamente.");
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
  
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "P001", 50);
  productManager.addProduct("Producto 2", "Descripción 2", 19.99, "imagen2.jpg", "P002", 30);
  
  const allProducts = productManager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  const productById = productManager.getProductById(1);
  console.log("Producto con ID 1:", productById);
  
  const nonExistentProduct = productManager.getProductById(3);
  // "Producto no encontrado" se mostrará en la consola
  
  // Agregar más productos, validar campos obligatorios y códigos repetidos
  productManager.addProduct("", "Descripción 3", 15.99, "imagen3.jpg", "P003", 20);
  productManager.addProduct("Producto 4", "Descripción 4", null, "imagen4.jpg", "P002", 15);
  productManager.addProduct("Producto 5", "Descripción 5", 25.99, "imagen5.jpg", "P005", 10);
  
  const updatedProducts = productManager.getProducts();
  console.log("Productos actualizados:", updatedProducts);
  
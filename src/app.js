import express from "express";
import ProductManager from "./ProductManager.js";

// Nueva instancia de nuestra clase ProductManager
const manager = new ProductManager("productos.json");

const app = express();

app.get("/products", async (req, res) => {
	const limit = parseInt(req.query.limit);
	const allProduct = await manager.getProducts();
	if(limit && !isNaN(limit)) {
		return res.json({ status: 200, payload: allProduct.slice(0, limit), limit})
	}
	res.json({status:200, payload: allProduct, limit: null})
});

app.get("/products/:id", async (req, res) => {
	const idProduct = req.params.id;
	if (isNaN(idProduct)) {
        return res.status(400).json({ error: "Invalid ID format, must be a number", status: 404 });
    }
	const product = await manager.getProductById(Number(idProduct));
	if(!product) return res.status(404) .json({error: "Product not found", status: 404})
	res.json({ payload: product, status: 200 })
});


app.listen(8080, () => console.log("¡Servidor arriba escuchando en el puerto 8080!"));

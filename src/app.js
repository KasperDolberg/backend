import express from "express";
import ProductManager from "./ProductManager.js";

// Nueva instancia de nuestra clase ProductManager
const manager = new ProductManager("productos.json");

const app = express();

app.get("/products", async (req, res) => {
	// --- Escribe aqui tu codigo ---
});

app.get("/products/:id", async (req, res) => {
	// --- Escribe aqui tu codigo ---
});

app.listen(8080, () => console.log("¡Servidor arriba escuchando en el puerto 8080!"));

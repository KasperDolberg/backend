import fs from "fs/promises"

class ProductManager {
	constructor(path) {
		this.path = path;
	}

	async addProduct({ title, description, price, thumbnail, code, stock }) {
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log("¡Faltan propiedades del producto!");
			return null;
		}

		const products = await this.getProducts();

		const foundCode = products.find((prod) => prod.code === code);
		if (foundCode) {
			console.log("Codigo de producto repetido");
			return null;
		}

		const id = products.length ? products[products.length - 1].id + 1 : 1;

		const newProduct = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			id,
		};

		products.push(newProduct);
		await this.writeFile(products);
		return id;
	}

	async getProducts() {
		try {
			const json = await fs.readFile(this.path, "utf-8");
			const products = JSON.parse(json);
			return products;
		} catch (error) {
			await fs.writeFile(this.path, "[]");
			return [];
		}
	}

	async getProductById(id) {
		const products = await this.getProducts();
		const foundProduct = products.find((prod) => prod.id === id);
		if (!foundProduct) {
			console.log("¡Not found!");
			return null;
		}
		return foundProduct;
	}

	async updateProduct(id, obj) {
		const products = await this.getProducts();
		const indexProduct = products.findIndex((product) => product.id === id);

		if (indexProduct < 0) {
			console.log("¡Not found!");
			return null;
		}

		products[indexProduct] = { ...products[indexProduct], ...obj };

		await this.writeFile(products);
		return products[indexProduct];
	}

	async deleteProduct(id) {
		let products = await this.getProducts();
		const orginalLength = products.length;
		products = products.filter((product) => product.id !== id);
		if (orginalLength === products.length) {
			console.log("¡Not found!");
			return null;
		}

		await this.writeFile(products);
		return true;
	}

	async writeFile(products) {
		try {
			const json = JSON.stringify(products, null, 2);
			await fs.writeFile(this.path, json);
		} catch (error) {
			console.log("Error al escribir el archivo: ", error);
		}
	}
}

export default ProductManager

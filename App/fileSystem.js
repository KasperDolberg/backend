
import {promises as fs} from 'fs'
import { uptime } from 'process'
import { stringify } from 'querystring'
class ProductManager{
    constructor(){
        this.patch= "./productos.txt"
        this.products= []
    }

    static id= 0

    addProduct = async(title, description, price, imagen, code, stock) => {

        ProductManager.id++
        
        let newProduct = {
            title, 
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);
         await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta=  await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    };

    getProducts = async ()=> {
        let respuesta2 = await this.readProducts()
        return console.log (respuesta2)
    };

    getProductsById = async (id)=> {
        let respuesta3 = await this.readProducts()
      if (!respuesta3.find(product => product.id === id)){
        console.log("Producto no Encontrado ")
      }else {
        console.log(respuesta3.find(product => product.id === id))
      }
    };
    
    deteleProductsById = async (id)=> {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile (this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado")};

    updateProducts = async ({id, ...producto}) => {
        await this.deteleProductsById(id);
        let productOld = await this.readProducts()
        let productsModif = [{...producto, id}, ...productOld];
        await fs.writeFile (this.patch, JSON.stringify(productsModif));
    };

}







const productos = new ProductManager ();
// productos.addProduct("titulo1", "Decription1", 1000,"Imagen1", "abc123", 5 )
// productos.addProduct("titulo2", "Decription2", 1000,"Imagen2", "abc123", 10)
// productos.addProduct("titulo3", "Decription3", 1200,"Imagen3", "abc125", 15)
//  productos.getProducts()



// productos.getProductsById(3)
// productos.deteleProductsById(2)

productos.updateProducts (  {
    title: 'titulo3',
    description: 'Decription3',
    price: 3500,
    imagen: 'Imagen3',
    code: 'abc125',
    stock: 15,
    id: 3
  })
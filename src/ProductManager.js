const fs = require('fs');


class ProductManager {
    //path

    constructor(path) {
        this.path = path
    }

    addProduct = async ({ title, description, price, stock, status, category, code, thumbnails }) => {
        const valid = title && description && price && stock && code && category;

        if (!valid) return "El formato no es el correcto, Faltan campos.";
        if (status === undefined || status === null) status = true;


        let data // para no repetir toda la linea de writeFile, establezco en una variable auxiliar la información a guardar

        if (fs.existsSync(this.path)) {
            const { products } = await this.getProducts() // 'array' con todos los productos
            products.push({ id: 0, title: title, description: description, price: price, stock: stock, code: code, status: status, category: category, thumbnails: thumbnails }) // añade el nuevo producto
            data = products.map((item, index) => { return { ...item, id: index } })

        } else {
            data = [{ id: 0, title: title, description: description, price: price, stock: stock, code: code, thumbnails: thumbnails }]

        }


        await fs.promises.writeFile(this.path, JSON.stringify({ products: data }, null, 2))
        return ("El producto fue agregado de forma exitosa");
    }

    getProducts = async () => {
        const response = await fs.promises.readFile(this.path, { encoding: 'utf8' })
        return JSON.parse(response)
    }

    getProductById = async (id) => {
        const { products } = await this.getProducts();
        return products.find(p => p.id == id);
    }

    deleteProduct = async (id) => {
        const { products } = await this.getProducts()

        const objWithIdIndex = products.findIndex((obj) => obj.id == id);

        if (objWithIdIndex > -1) {
            products.splice(objWithIdIndex, 1);
        }

        await fs.promises.writeFile(this.path, JSON.stringify({ products: products }, null, 2))

        return objWithIdIndex > -1 ? "Borrado satisfactoriamente " : "No existe";
    }

    updateProduct = async (id, object) => {
        let { products } = await this.getProducts();
        const index = products.findIndex((item) => item.id === id);
        products[index] = Object.assign(products[index], object);
        await fs.promises.writeFile(this.path, JSON.stringify({ products: products }, null, 2))
        return "Producto actualizado satisfactoriamente ";
    }


}
module.exports = ProductManager;



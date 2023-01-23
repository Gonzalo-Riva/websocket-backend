const ProductManager = require("../ProductManager");
const pm = new ProductManager("./src/products.json")
const { emitdeleteproduct } = require("../utils/socket.io")
const { emitaddproduct } = require("../utils/socket.io")

const views = async (req, res) => {
    let { products } = await pm.getProducts();
    res.render("home", { products });
}

const realTimeView = async (req, res) => {
    res.render("realTimeProducts")
}

const realTimeDelete = async (req, res) => {
    const id = req.params.pid
    let remove = await pm.deleteProduct(parseInt(id));
    if (remove.error) {
        res.json(remove)
    } else {
        emitdeleteproduct(id);
        res.json(remove)
    }
}

const realTimeAdd = async (req, res) => {
    const body = req.body;
    const products = await pm.addProduct(body);
    if (products.error) {
        res.json(products)
    } else {
        emitaddproduct(products)
        res.json(products)
    }
}


module.exports = {
    views,
    realTimeView,
    realTimeDelete,
    realTimeAdd
}
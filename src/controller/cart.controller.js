const cartManager = require('../CartManager');
const ProductManager = require('../ProductManager');

const cart = new cartManager(__dirname + '/../cart.json');
const pm = new ProductManager('./src/products.json');

const createCart = async (req, res) => {
    const resp = await cart.createFile();
    res.json({ msg: 'Carro creado.', id: resp });
};

const getCart = async (req, res) => {
    const resp = await cart.getCart(req.params.cid);
    if (resp.error) {
        res.json(resp.status).send(resp);
    } else {
        res.json(resp);
    }
};

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const products = await pm.getProductsById(pid);

    if (products) {
        const resp = await cart.addProductToCart(cid, products.id);
        res.json({ msg: "Producto Agregado" })
    } else {
        res.json({ msg: "Producto no Encontrado" })
    }

};

module.exports = {
    createcart: createCart,
    getchango: getCart,
    addProductCart: addProductToCart
};
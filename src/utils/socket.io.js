const ProductManager = require("../ProductManager");
const pm = new ProductManager("./src/products.json")
const { Server } = require("socket.io");
let io;

const connectionSocket = (httpServer) => {
    io = new Server(httpServer)
    io.on("connection", async (socket) => {
        console.log("nuevo cliente conectado")
        let { products } = await pm.getProducts();
        socket.emit("init-products", products)
    })
}

const emitDeleteProduct = (id) => {
    io.emit("delete-products", { id })
}

const emitAddProduct = (products) => {
    io.emit("add-products", { products })
}

module.exports = {
    connectionSocket,
    emitDeleteProduct,
    emitAddProduct
}
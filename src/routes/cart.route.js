const { Router } = require('express');
const cartcontroller = require('../controller/cart.controller');
const router = Router();


router.post('/', cartcontroller.createcart);
router.get('/:cid', cartcontroller.getchango)
router.post('/:cid/products/:pid', cartcontroller.addProductCart)


module.exports = router;

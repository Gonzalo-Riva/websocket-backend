const { Router } = require("express");
const viewcontroller = require('../controller/views.controller')

const router = Router();

router.get('/views', viewcontroller.views);
router.get('/realtimeproducts', viewcontroller.realTimeView);
router.delete('/realtimeproducts/:pid', viewcontroller.realTimeDelete);
router.post('/realtimeproducts/', viewcontroller.realTimeAdd);






module.exports = router;
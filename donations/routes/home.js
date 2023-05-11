const express = require('express')
const router = express()
const home = require('../controllers/home')
const access = require('../middlewares/access')

router.get('/', home.landing)
router.get('/carritoDB',[access],home.homee)
router.get('/checkout',home.feedback)

router.post('/agregar',home.addCart)
router.post('/eliminar',home.deleteCart)
router.post('/checkout', home.checkout)

module.exports = router
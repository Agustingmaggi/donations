const express = require('express')
const router = express()
const home = require('../controllers/home')

router.get('/', home.landing)
router.get('/carrito',home.homee)
router.get('/checkout',home.feedback)

router.post('/agregar',home.addCart)
router.post('/eliminar',home.deleteCart)
router.post('/checkout', home.checkout)

module.exports = router
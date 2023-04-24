const express = require('express')
const router = express()
const database =require('../controllers/database')
const access = require('../middlewares/access')

router.get('/',database.base)
router.get('/agregarData',database.agregarDatos)
router.get('/agregarProyecto',database.agregarData)

router.post('/crear',database.create)
router.post('/crearProyecto',database.createProj)


module.exports=router
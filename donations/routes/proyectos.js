const express = require('express')
const router = express()
const projects = require('../controllers/proyectos')

router.get('/', projects.listado)
router.get('/create', projects.create)
router.get('/:id', projects.show)
router.get('/update/:id',projects.update)
router.get('/dona/:id', projects.dona)

router.put('/:id',projects.modify)
router.post('/guardar', projects.save)
router.delete('/',projects.delete)

module.exports = router
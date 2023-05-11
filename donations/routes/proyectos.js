const express = require('express')
const router = express()
const projects = require('../controllers/proyectos')
const access = require('../middlewares/access')
const path = require('path')
const multer = require('multer')
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname,'../public/images')),
    filename: (req, file, cb) => cb(null, file.fieldname+'-'+Date.now() + path.extname(file.originalname))
})})


router.get('/', projects.listado)
router.get('/create', projects.create)
router.get('/carritoJSON',[access],projects.dona)
router.get('/checkout',projects.feedback)
router.get('/:id', projects.show)
router.get('/update/:id',projects.update)
router.get('/dona/:id', projects.dona)

router.post('/agregar',projects. addCart)
router.post('/eliminar',projects.deleteCart)
router.post('/checkout', projects.checkout)
router.post('/guardar', [upload.any()], projects.save)
//router.post('/guardar',[upload.any()],projects.storeFile)
router.put('/:id',projects.modify)
router.delete('/',projects.delete)

module.exports = router
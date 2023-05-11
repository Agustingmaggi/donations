const express = require('express')
const router = express()
const path = require('path')
const database =require('../controllers/database')
const access = require('../middlewares/access')
const multer = require('multer')
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname,'../public/images')),
    filename: (req, file, cb) => cb(null, file.fieldname+'-'+Date.now() + path.extname(file.originalname))
})})

router.get('/',database.base)
router.get('/:id',database.show)
router.get('/agregarData',database.agregarDatos)
router.get('/agregarProyecto',database.agregarData)
router.get('/database',database.base)

router.post('/crear',database.create)
router.post('/crearProyecto',[upload.any()],database.createProj)


module.exports=router
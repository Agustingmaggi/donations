const express = require('express')
const router = express()
const user = require('../controllers/user')
const database =require('../controllers/database')
const userModel = require('../models/user')
const access = require('../middlewares/access')

router.get('/register',user.register)
router.get('/login',user.login)
router.get('/profile',[access],user.profile)
router.get('/database',database.base)

router.post('/',[userModel.validate],user.save)
router.post('/access',[userModel.validate], user.access)
router.post('/logout',user.logout)

module.exports=router
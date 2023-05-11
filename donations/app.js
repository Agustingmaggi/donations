const path = require('path')
const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const session = require('express-session')
const method = require('method-override')

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'))

app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.urlencoded({extended:true}))
app.use(cookie())
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: false
}))

app.set ('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'./views'))

app.use(require('./middlewares/user'))
app.use(require('./middlewares/cart'))
app.use(require('./middlewares/carrito'))
app.use(method("m"))


app.use(require('./routes/home'))
app.use('/projects',require('./routes/proyectos'))
app.use('/users',require('./routes/usuarios'))
app.use('/database',require('./routes/database'))

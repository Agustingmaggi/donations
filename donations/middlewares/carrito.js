module.exports = (req, res, next) => {
    if(!req.session.carrito){
        req.session.carrito = []
    }
    res.locals.carrito = req.session.carrito
    next()
}
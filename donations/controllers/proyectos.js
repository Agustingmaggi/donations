const product = require('../models/product')
module.exports = {
    listado: (req, res) => res.render('../views/projects/donaciones',{
        modelo: product.info()
    }),
    create: (req, res) => res.render('../views/projects/nuevoProyecto'),
    save: (req, res) => {
       return res.send(product.add(req.body))},
    show: (req, res) => {
        let result = product.search('id',req.params.id)
        return result ? res. render('../views/projects/detail',{
            product: result
        }) : res.send("Producto no encontrado!")},
    update: (req, res) => res.render('../views/projects/update',{
        product: product.search('id',req.params.id)
    }),
    modify: (req, res) => {
        let updated = product.update(req.params.id,req.body)
        return res.redirect('/projects/')
    },
    delete: (req, res) => {
        product.delete(req.body.id)
        return res.redirect('/projects')
    },
    dona: (req, res) => {
        res.render('../views/projects/carrito')
    }
}
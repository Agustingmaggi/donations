const {Project} = require('../database/models')
const axios = require('axios')
module.exports = {
    landing: (req, res) => res.render('../views/home'),
    homee: async (req, res) => {
        try {
            const products = await Project.findAll()
            res.render('carrito', {
                products
        })
           } catch (error){
            res.send(error)
        }
    },
    addCart: async (req, res) => {
        try {
            const {id,quantity} = req.body
            const product = await Project.findByPk(id)
            if(!req.session.cart){
                req.session.cart = []
            }
            const cart = req.session.cart
            const productExist = cart.find(item => item.id == id)
            if(productExist){
                req.session.cart = cart.map(item => {
                    if(item.id ==id){
                        item.quantity += parseInt(quantity)
                        item.subtotal = product.price * item.quantity
                    }
                    return item
                })
            }else{
            req.session.cart.push({
                id:product.id,
                name:product.name,
                price:product.price,
                quantity:parseInt(quantity),
                subtotal:product.price * quantity,
            })
        }
            res.redirect('/carrito')
        } catch (error){
            res.send(error)
        }
    },
    deleteCart: async(req,res) => {
        try {
            const {id} = req.body
            const cart = req.session.cart
            req.session.cart = cart.filter(item => item.id != id)
            res.redirect('/carrito')
        } catch (error){
            res.send(error)
        }
    },
    checkout: async (req, res) => {
        try{
            
            let response = await axios.post('https://api.mercadopago.com/checkout/preferences',{
                    /*items: [
                        {id: '1234',
                        title: 'producto',
                        description: 'descripcion del prod',
                        quantity: 1,
                        currency_id: 'ARS',
                        unit_price: 100
                    } ],*/
            
             items: req.session.cart.map(item =>{
                    return {
                        title:item.name,
                        quantity: item.quantity,
                        currency_id: 'ARS',
                        unit_price: item.price
                    }
                }),
                
                back_urls: {
                    success: 'http://localhost:3030/feedback',
                    failure: 'http://localhost:3030/feedback',
                    pending: 'http://localhost:3030/feedback'
                },
                auto_return: 'approved',
            }, {
                
                headers: {
                    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN || 'TEST-1249931130347559-042118-5f199316521dd8ea2c71dc45cfa1d6a2-173356790'}`,
                    'Content-Type': 'application/json'
                }
        })
        return res.redirect(response.data.init_point)

        } catch (error) {
            res.send(error)
        }
    },
    feedback: async (req, res) => {
        req.session.destroy()
        res.send(req.query)
    }

}


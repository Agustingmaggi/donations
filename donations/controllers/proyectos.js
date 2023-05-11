const fs = require('fs');
const path = require('path');
const axios = require('axios')
const product = require('../models/product')
const file = require('../models/file')

module.exports = {
    listado: (req, res) =>
    res.render('../views/projects/donaciones',{
        modelo: product.info().map(p => Object({...p, image_id: file.search('id',p.image_id)}))
    }),
    create: (req, res) => res.render('../views/projects/nuevoProyecto'),
    save: (req, res) => {
        req.body.file = req.files //aca ponemos los archivos o el archivo que multer guarda como files
       return res.send(product.add(req.body))},
    storeFile: (req, res) => {
        res.send(req.files)},

        /* //con este codigo comentado + una pequeña linea en el modelo product.js conseguimos cargar imagenes con mucho menos codigo y sin necesidad de mas archivos como un json de uploads por ejemplo
        save: (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: parseInt(req.body.price),
        files: req.files ? req.files[0].filename : null
      };
    const addedProduct=product.add(newProduct)
    if(req.files){
        const archivo = req.files[0].originalname
        console.log(archivo)
    }
   return res.send(addedProduct)},
        */
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
        res.render('../views/projects/carritoJSON',{
            productos: product.info()
        })
    },
    addCart: async (req, res) => {
        try {
          const { id, quantity } = req.body;
      
          // Cargar los productos desde el archivo JSON
          const productsPath = path.resolve(__dirname,'..', 'data', 'products.json');
          const productsData = fs.readFileSync(productsPath);
          const products = JSON.parse(productsData);
      
          if (!req.session.carrito) {
            req.session.carrito = [];
          }
          const carrito = req.session.carrito;
          const productExist = carrito.find(item => item.id == id);
          const product = products.find(item => item.id == id);
      
          if (productExist) {
            req.session.carrito = carrito.map(item => {
              if (item.id == id) {
                item.quantity += parseInt(quantity);
                item.subtotal = product.price * item.quantity;
              }
              return item;
            });
          } else {
            req.session.carrito.push({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: parseInt(quantity),
              subtotal: product.price * quantity,
            });
          }
      
          // Enviar una respuesta JSON con el contenido del carrito
          res.redirect('/projects/carritoJSON');
        } catch (error) {
          res.send(error);
        }
      },
      deleteCart: async(req,res) => {
        try {
            const {id} = req.body
            const carrito = req.session.carrito
            req.session.carrito = carrito.filter(item => item.id != id)
            res.redirect('/projects/carritoJSON')
        } catch (error){
            res.send(error)
        }
        
    },
    checkout: async (req, res) => {
        try{
            
            let response = await axios.post('https://api.mercadopago.com/checkout/preferences',{
                   /* items: [
                        {id: '1234',
                        title: 'producto',
                        description: 'descripcion del prod',*/
                        //quantity: 1,
                       /* currency_id: 'ARS',
                        unit_price: 100
                    } ],*/
            
             items: req.session.carrito.map(item =>{
                    return {
                        title:item.name,
                        quantity: item.quantity,
                        currency_id: 'ARS',
                        unit_price: parseInt(item.price)
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
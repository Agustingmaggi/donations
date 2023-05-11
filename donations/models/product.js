const path = require('path')
const fs = require('fs')
const file = require('./file')
const model = {
    info: () => JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json'))),
    write: data => fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(data,null,2)),
    generate: a => Object ({
        id: model.info(). length == 0 ? 1 : model.info().pop().id + 1,
        name: a.name,
        price: parseInt(a.price),
        image_id: a.file.map(f=>file.create(f).id)
        //img: a.files ? "images/" + a.files : null //con esta linea + el codigo comentado en el controlador de proyectos tambien funciona y de manera mucho mas directa, sin la necesidad de tener un json de archivos o de imagenes por ejemplo
    }),
    add: b => {
        let newProduct = model.generate(b)
        let listaProductos = model.info()
        listaProductos.push(newProduct)
        model.write(listaProductos)
        return newProduct
    },
    search: (field, value) => model.info().find(e => e[field] == value),
    update: (id,data) => {
        let all = model.info()
        let updated = all.map(e =>{
            if(e.id == id){
                e.name = data.name
                e.price = data.price
                e.img = data.img
                return e
            }
        return e
        })
        model.write(updated)
        let product = model.search('id',id)
        return product
    },
    delete: id => model.write(model.info().filter(e => e.id != id))
}

module.exports = model


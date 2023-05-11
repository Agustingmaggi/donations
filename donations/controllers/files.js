const file = require('../models/file')

const controller = {
    upload: (req,res) => res.render('files/upload',{
        styles: ['files/upload'],
        title: 'Archivos | Subir'
    })
}

module.exports = controller
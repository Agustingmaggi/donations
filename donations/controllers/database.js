const db = require('../database/models')
module.exports = {
    base: (req,res) =>
        db.User.findAll({
            include: [{association:'projects'}]
        })
    .then((users) => {
        // Consulta para obtener todos los proyectos con los usuarios que invirtieron en cada uno
        db.Project.findAll({
          include: [{ association: 'users' }]
        })
          .then((projects) => {
            res.render('database', { data: users, projects })
          })
    })
      .catch(err => {
        console.error(err);
        res.send('error');
      }),
    create: function (req, res){
        const {name} = req.body
        db.User.create ({
            name
        }).then(() => {res.send(req.body)})       
    },
    createProj: function (req, res){
        const {name} = req.body
        db.Project.create ({
            name
        }).then(() => {res.send(req.body)})       
    },
    agregarDatos: (req, res) => res.render('add'),
    agregarData: (req, res) => res.render('addData')
}

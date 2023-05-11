const db = require('../database/models')
module.exports = {
    show: async (req,res) => {
      try {
        const project = await db.Project.findByPk(req.params.id)
        if (!project) {
          return res.render('error', {
            msg: 'Producto no encontrado'
          })
        }
        return res.render('database/detail', { project })
      } catch (error) {
        console.log(error)
        return res.render('error', {
          msg: 'Error en el servidor'
        })
      }
    },
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
            res.render('database/donationsDB', { data: users, projects })
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
    createProj: function (req, res) {
      const { name, price } = req.body;
      const photo = req.files.map(file => file.filename).join(','); // obtiene el nombre del archivo de la propiedad "filename" si existe un archivo
      db.Project.create({
        name,
        price,
        photo
      })
        .then(project => {
          res.send(project);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Error al crear proyecto en la base de datos.');
        });
    },
    agregarDatos: (req, res) => res.render('add'),
    agregarData: (req, res) => res.render('database/agregarProyecto')
}

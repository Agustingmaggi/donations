const userModel= require('../models/user')
const user = (req,res,next) => {
    let user = null

    if(req.cookie && req.cookie.email){
        user = userModel.search('email',req.cookie.email)
        req.session.user = user
    }
    if(req.session && req.session.user){
        user = req.session.user
    }
    res.locals.user = user
    return next()
}

module.exports = user

//este middleware creo que solamente se requirió en la visa del home y del profile,
//y ni siquiera se requirió de manera normal o sea con require() etc, se puso directamente if (user) y chau.
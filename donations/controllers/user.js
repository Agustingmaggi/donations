const validator = require('express-validator')
const bcrypt = require('bcrypt')
const user = require('../models/user')
module.exports = {
    register: (req,res) => res.render('users/register'),
    login: (req,res) => res.render('users/login'),
    profile: (req,res) => res.render('users/profile'),
    save: (req,res) =>{
        let errors = validator.validationResult(req)

        if(!errors.isEmpty()){
            return res.render('users/register',{
                errors: errors.mapped()
            })
        }

        let exist = user.search('email',req.body.email)
        if(exist){
            return res.render('users/register',{
                errors:{
                    email:{
                        msg: 'Email is registered'
                    }
                }
            })
        }

        let userRegistred = user.create(req.body)

       return res.redirect('/users/login')
},
    access: (req,res) => {
        let errors = validator.validationResult(req)

        if(!errors.isEmpty()){
            return res.render('users/login',{
                errors: errors.mapped()
            })
        }

        let exist = user.search('email',req.body.email)

        if(!exist){
            return res.render('users/login',{
                errors:{
                    email:{
                        msg: 'Email is not registered'
                    }
                }
            })
        }
        if(!bcrypt.compareSync(req.body.password, exist.password)){
            return res.render('users/login',{
                errors:{
                    password:{
                        msg: 'Password is not valid'
                    }
                }
            })
        }

        if(req.body.remember){
            res.cookie('email',req.body.email,{maxage:1000*60*60*24*30})
        }
        req.session.user = exist
        return res.redirect('/')
    }, 
    logout: (req,res) => {
        delete req.session.user
        res.cookie('email', null,{maxAge:-1})
        return res.redirect('/')        
    }
}
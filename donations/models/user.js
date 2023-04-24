const path = require('path')
const fs=require('fs')
const bcrypt = require('bcrypt')
const validator=require('express-validator')

const model = {
    file: path.resolve(__dirname,'../data/users.json'),
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file,JSON.stringify(data,null,2)),
    all: () => JSON.parse(model.read()),
    search: (prop,value) => model.all().find(e => e[prop]==value),
    generate: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id +1,
        email: String(data.email),
        password: bcrypt.hashSync(data.password,10),
    }),
    create: data => {
        let all = model.all()
        let user = model.generate(data)
        all.push(user)
        model.write(all)
        return user
    },
    validate: [
        validator.body('email').isEmail().withMessage('Invalid Email'),
        validator.body('password').isLength({ min: 5}).withMessage('Min 5 characters')
    ]
    }

module.exports = model
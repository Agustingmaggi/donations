module.exports = (Sequelize,Datatypes) => {
    const alias = 'User'
    const cols = {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type: Datatypes.INTEGER
        },
        name:{
            notNull:false,
            type: Datatypes.TEXT
        }       
    }
    const config={
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'users'
    }
    
    const User = Sequelize.define(alias, cols, config)
    
    User.associate = function(models){
        User.belongsToMany(models.Project,{
            as:'projects',
            through:'users_proyectos',
            foreignKey: 'user_id',
            otherKey: 'proyecto_id'
        })
    }
    return User
}
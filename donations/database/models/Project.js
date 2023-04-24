module.exports = (Sequelize,Datatypes) => {
    const alias = 'Project'
    const cols = {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type: Datatypes.INTEGER
        },
        name:{
            notNull:false,
            type: Datatypes.TEXT
        },
        /*price: {
            type: Datatypes.FLOAT,
            allowNull: false,
        }   */    
    }
    const config={
        timestamps: false,
        createdAt: 'created_at',
         updatedAt: 'updated_at',
        tableName: 'projects'
    }
    
    const Project = Sequelize.define(alias, cols, config)
    
    Project.associate = function(models){
        Project.belongsToMany(models.User,{
            as:'users',
            through:'users_proyectos',
            foreignKey: 'proyecto_id',
            otherKey: 'user_id'
        })
    }
    return Project
}
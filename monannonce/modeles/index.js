const {Sequelize}  = require('sequelize');
const User = require('./User');
const Annonce = require('./Annonce');
async function initModels()
{
    //la connexion à la base
    //const sequelize = new Sequelize('mariadb://root:root@db:3306/')
    //console.log(process.env)
    const sequelize = new Sequelize(`mariadb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

    try {

        await sequelize.authenticate();
        console.log('Connection établie aavec succès !');

        const user = User(sequelize);
        const annonce = Annonce(sequelize);

        user.hasMany(annonce);
        annonce.belongsTo(user);
        //return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports =  initModels;
const {Sequelize}  = require('sequelize');
const User = require('./User');
async function initModels()
{
    //la connexion à la base
    const sequelize = new Sequelize('mariadb://root:root@db:3306/')

    try {
        await sequelize.authenticate();
        console.log('Connection établie aavec succès !');
        User(sequelize);
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports =  initModels;
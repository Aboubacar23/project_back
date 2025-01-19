const { DataTypes } = require('sequelize')

function init(sequelize)
{
    const User = sequelize.define(
        'User',
        {
            nom : { type: DataTypes.STRING, allowNull: true},
            prenom : { type: DataTypes.STRING},
            password : { type: DataTypes.STRING},
            roles: {
                type: DataTypes.ENUM('admin', 'annonceur', 'acheteur'), // Ajout de l'enum ici
                allowNull: false, // Cela rend ce champ obligatoire
                defaultValue: 'acheteur' // Facultatif : valeur par défaut si aucune n'est fournie
            }
            //date_creation : { type: DataTyoes.DATE},
        }
    )

    return User;
}


module.exports = init;
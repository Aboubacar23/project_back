const { DataTypes } = require('sequelize')

function init(sequelize)
{
    const Annonce = sequelize.define(
        'Annonce',
        {
            titre : { type: DataTypes.STRING, allowNull: false},
            desciption : { type: DataTypes.STRING},
            prix : { type: DataTypes.FLOAT},
            roles: {
                type: DataTypes.ENUM('Visible', 'Non-visible'), // Ajout de l'enum ici
                allowNull: false, // Cela rend ce champ obligatoire
                defaultValue: 'Visible' // Facultatif : valeur par défaut si aucune n'est fournie
            }
        }
    )

    return Annonce;
}

module.exports = init;

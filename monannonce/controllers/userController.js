const { sequelize, User } = require('../models');

// Liste des utilisateurs
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({
            status: 'success',
            users,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Création d'un utilisateur
exports.createUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { nom, prenom, password, roles } = req.body;

        if (!password) {
            throw new Error("Le champ 'password' est obligatoire");
        }

        const user = await User.create(
            { nom, prenom, password, roles },
            { transaction }
        );
        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            user,
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Afficher un utilisateur spécifique
exports.showUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Utilisateur avec ID ${userId} introuvable`,
            });
        }
        return res.status(200).json({
            status: 'success',
            user,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Mise à jour d'un utilisateur
exports.editUser = async (req, res) => {
    const userId = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const { nom, prenom, password, roles } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Utilisateur avec ID ${userId} introuvable`,
            });
        }

        await user.update(
            { nom, prenom, password, roles },
            { transaction }
        );
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Utilisateur avec l'ID ${userId} modifié avec succès`,
            user,
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Utilisateur avec ID ${userId} introuvable`,
            });
        }

        await user.destroy();
        return res.status(200).json({
            status: 'success',
            message: `Utilisateur avec l'ID ${userId} supprimé avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};
const { sequelize, Signalement, Annonce, User } = require('../models');

exports.listSignalements = async (req, res) => {
    try {
        const signalements = await Signalement.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Annonce, as: 'annonce' },
            ],
        });
        return res.status(200).json({
            status: 'success',
            signalements,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

exports.createSignalement = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { description, user_id, annonce_id } = req.body;

        // Vérification de l'utilisateur
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error("User n'existe pas !");
        }

        // Vérification de l'annonce
        const annonce = await Annonce.findByPk(annonce_id);
        if (!annonce) {
            throw new Error("Annonce n'existe pas !");
        }

        // Création du signalement
        const signalement = await Signalement.create(
            { description, user_id, annonce_id },
            { transaction }
        );
        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            signalement,
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

exports.showSignalement = async (req, res) => {
    const signalementID = req.params.id;
    try {
        const signalement = await Signalement.findByPk(signalementID, {
            include: [
                { model: User, as: 'user' },
                { model: Annonce, as: 'annonce' },
            ],
        });
        if (!signalement) {
            return res.status(404).json({
                status: 'error',
                message: `Signalement avec ID ${signalementID} introuvable`,
            });
        }
        return res.status(200).json({
            status: 'success',
            signalement,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

exports.deleteSignalement = async (req, res) => {
    const signalementID = req.params.id;
    try {
        const signalement = await Signalement.findByPk(signalementID);
        if (!signalement) {
            return res.status(404).json({
                status: 'error',
                message: `Signalement avec ID ${signalementID} introuvable`,
            });
        }

        await signalement.destroy();
        return res.status(200).json({
            status: 'success',
            message: `Signalement avec l'ID ${signalementID} supprimé avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

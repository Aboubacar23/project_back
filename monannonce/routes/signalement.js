const express = require("express");
const router = express.Router();
const { sequelize, Signalement, User} = require('../models');

// Route pour lister tous les signalements
router.get('/list', async (req, res) => {
    try {
        const signalements = await Signalement.findAll();
        return res.status(200).json({
            status: 'success',
            signalements,
        });
    } catch (err) {
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour ajouter un nouveau signalement
router.post('/new', async (req, res) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const { objet, message, user_id, annonce_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error("User n'existe pas !");
        }

        const annonce = await User.findByPk(annonce_id);
        if (!annonce) {
            throw new Error("Annonce n'existe pas !");
        }

        if (!objet || !message) {
            return res.status(400).json({
                status: 'error',
                message: "Les champs 'objet' et 'message' sont requis",
            });
        }

        const signalement = await Signalement.create({ objet, message }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            signalement,
            user_id,
            annonce_id
        });
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error('ERROR:', err);

        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour afficher un signalement par ID
router.get('/show/:id', async (req, res) => {
    const signalementID = req.params.id;

    try {
        const signalement = await Signalement.findByPk(signalementID);

        if (!signalement) {
            return res.status(404).json({
                status: 'error',
                message: `Signalement avec l'ID ${signalementID} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            signalement,
        });
    } catch (err) {
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour modifier un signalement
router.put('/edit/:id', async (req, res) => {
    let transaction;
    const signalementID = req.params.id;

    try {
        transaction = await sequelize.transaction();

        const { objet, message, user_id, annonce_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error("User n'existe pas !");
        }

        const annonce = await User.findByPk(annonce_id);
        if (!annonce) {
            throw new Error("Annonce n'existe pas !");
        }

        const signalement = await Signalement.findByPk(signalementID);
        if (!signalement) {
            return res.status(404).json({
                status: 'error',
                message: `Signalement avec l'ID ${signalementID} introuvable`,
            });
        }

        await signalement.update({ objet, message }, { transaction });
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Signalement avec l'ID ${signalementID} modifié avec succès`,
            signalement,
        });
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour supprimer un signalement
router.delete('/delete/:id', async (req, res) => {
    const signalementID = req.params.id;

    try {
        const signalement = await Signalement.findByPk(signalementID);

        if (!signalement) {
            return res.status(404).json({
                status: 'error',
                message: `Signalement avec l'ID ${signalementID} introuvable`,
            });
        }

        await signalement.destroy();

        return res.status(200).json({
            status: 'success',
            message: `Signalement avec l'ID ${signalementID} supprimé avec succès`,
        });
    } catch (err) {
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

module.exports = router;

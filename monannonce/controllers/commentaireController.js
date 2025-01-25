const { sequelize, Commentaire, User, Annonce } = require('../models');
const {mailer} = require("../services/mailer");

// Liste des commentaires
exports.listCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'nom', 'prenom', 'email'] },
                { model: Annonce, as: 'annonce', attributes: ['id', 'titre'] },
            ],
        });

        return res.status(200).json({
            status: 'success',
            commentaires,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Création d'un commentaire
exports.createCommentaire = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { objet, date_commentaire, description, user_id, annonce_id } = req.body;

        if (!user_id || !annonce_id) {
            throw new Error("Les champs 'user_id' et 'annonce_id' sont obligatoires");
        }

        const commentaire = await Commentaire.create(
            { objet, date_commentaire, description, user_id, annonce_id },
            { transaction }
        );

        const annonce = await Annonce.findByPk(annonce_id);
        const user = await User.findByPk(annonce.user_id);
        if (!user)
        {
            throw new Error("Pas de user associé à ce commentaire");
        }

        if (!annonce)
        {
            throw new Error("Pas de user associé à ce commentaire");
        }

        await transaction.commit();
        const mailing = await mailer(
            user.email,
            'bar@example.com',
            commentaire.objet,
            commentaire.description,
            commentaire.description
        );

        return res.status(201).json({
            status: 'success',
            commentaire,
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

// Afficher un commentaire spécifique
exports.showCommentaire = async (req, res) => {
    const commentaireId = req.params.id;
    try {
        const commentaire = await Commentaire.findByPk(commentaireId, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'nom', 'prenom', 'email'] },
                { model: Annonce, as: 'annonce', attributes: ['id', 'titre'] },
            ],
        });

        if (!commentaire) {
            return res.status(404).json({
                status: 'error',
                message: `Commentaire avec ID ${commentaireId} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            commentaire,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Mise à jour d'un commentaire
exports.editCommentaire = async (req, res) => {
    const commentaireId = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const { objet, date_commentaire, description } = req.body;

        const commentaire = await Commentaire.findByPk(commentaireId);
        if (!commentaire) {
            return res.status(404).json({
                status: 'error',
                message: `Commentaire avec ID ${commentaireId} introuvable`,
            });
        }

        await commentaire.update(
            { objet, date_commentaire, description },
            { transaction }
        );
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Commentaire avec l'ID ${commentaireId} modifié avec succès`,
            commentaire,
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

// Suppression d'un commentaire
exports.deleteCommentaire = async (req, res) => {
    const commentaireId = req.params.id;
    try {
        const commentaire = await Commentaire.findByPk(commentaireId);
        if (!commentaire) {
            return res.status(404).json({
                status: 'error',
                message: `Commentaire avec ID ${commentaireId} introuvable`,
            });
        }

        await commentaire.destroy();
        return res.status(200).json({
            status: 'success',
            message: `Commentaire avec l'ID ${commentaireId} supprimé avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

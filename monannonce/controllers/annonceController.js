const { sequelize, Annonce, User, Commentaire } = require('../models');
const {mailer} = require("../services/mailer");

exports.listAnnonces = async (req, res) => {
    try {
        const annonces = await Annonce.findAll();
        return res.status(200).json({
            status: 'Success',
            annonces,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'err',
            details: err.errors || err.message,
        });
    }
};

exports.createAnnonce = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { titre, description, prix, statut, categorie, user_id } = req.body;
        const image = req.file ? req.file.path : null;
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error("User n'existe pas !");
        }

        const annonce = await Annonce.create(
            { titre, description, prix, image, statut, categorie, user_id },
            { transaction }
        );
        console.log("******Annonce*********");
        console.log(annonce);
        await transaction.commit();

        return res.status(201).json({
            status: "success",
            annonce
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors || err.message,
        });
    }
};

exports.editAnnonce = async (req, res) => {
    const annonceId = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const { titre, description, prix, image, statut, categorie, user_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error("User n'existe pas !");
        }

        const annonce = await Annonce.findByPk(annonceId);
        if (!annonce) {
            return res.status(404).json({
                status: 'error',
                message: `Annonce avec ID ${annonceId} introuvable`,
            });
        }

        await annonce.update({ titre, description, prix, image, statut, categorie }, { transaction });
        await transaction.commit();

        return res.status(200).json({
            status: "success",
            message: `Annonce avec l'ID ${annonceId} modifiée avec succès`,
            annonce,
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors || err.message,
        });
    }
};

exports.showAnnonce = async (req, res) => {
    const annonceID = req.params.id;
    try {
        const annonce = await Annonce.findByPk(annonceID, {
            include: [
                {
                    model: Commentaire,
                    as: 'commentaires',
                    attributes : ['id','objet', 'description', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'nom', 'prenom', 'email'], // Attributs utilisateur à inclure
                        },
                    ],
                },
                { model: User, as: 'user', attributes: ['id', 'nom', 'prenom', 'email'] },
            ]
        });

        if (!annonce) {
            return res.status(404).json({
                status: 'error',
                message: `Annonce avec ID ${annonceID} introuvable`,
            });
        }
        return res.status(200).json({
            status: 'success',
            annonce,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

exports.deleteAnnonce = async (req, res) => {
    const annonceID = req.params.id;
    try {
        const annonce = await Annonce.findByPk(annonceID);
        if (!annonce) {
            return res.status(404).json({
                status: 'error',
                message: `Annonce avec ID ${annonceID} introuvable`,
            });
        }

        await annonce.destroy();
        return res.status(200).json({
            status: 'success',
            message: `Annonce avec l'ID ${annonceID} supprimée avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

exports.sendComment = async (req, res, next) =>
{
    try {
        const mailing = await mailer(
            'conde@gmail.com',
            'bar@example.com',
            'Hello !',
            'TEST',
            '<h1>TEST</h1>'
        );
        if (mailing === true) {
            return res.json({ success: true });
        }
        return res.status(400).json({ success: false, error: mailing });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
}

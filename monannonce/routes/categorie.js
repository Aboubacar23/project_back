const express = require("express");
const router = express.Router();
const { sequelize, Categorie } = require('../models');

// Route pour lister toutes les catégories
router.get('/list', async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        return res.status(200).json({
            status: 'success',
            categories,
        });
    } catch (err) {
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour ajouter une nouvelle catégorie
router.post('/new', async (req, res) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const { libelle } = req.body;
        if (!libelle) {
            return res.status(400).json({
                status: 'error',
                message: "Le champ 'libelle' est requis",
            });
        }

        const categorie = await Categorie.create({ libelle }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            categorie,
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

// Route pour afficher une catégorie par ID
router.get('/show/:id', async (req, res) => {
    const categorieID = req.params.id;

    try {
        const categorie = await Categorie.findByPk(categorieID, { attributes: ['id', 'libelle', 'createdAt', 'updatedAt'] });

        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec l'ID ${categorieID} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            categorie,
        });
    } catch (err) {
        console.error('ERROR:', err);
        return res.status(500).json({
            status: 'error',
            details: err.message,
        });
    }
});

// Route pour modifier une catégorie
router.put('/edit/:id', async (req, res) => {
    let transaction;
    const categorieID = req.params.id;

    try {
        transaction = await sequelize.transaction();

        const { libelle } = req.body;

        const categorie = await Categorie.findByPk(categorieID);
        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec l'ID ${categorieID} introuvable`,
            });
        }

        await categorie.update({ libelle }, { transaction });
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Catégorie avec l'ID ${categorieID} modifiée avec succès`,
            categorie,
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

// Route pour supprimer une catégorie
router.delete('/delete/:id', async (req, res) => {
    const categorieID = req.params.id;

    try {
        const categorie = await Categorie.findByPk(categorieID);

        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec l'ID ${categorieID} introuvable`,
            });
        }

        await categorie.destroy();

        return res.status(200).json({
            status: 'success',
            message: `Catégorie avec l'ID ${categorieID} supprimée avec succès`,
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

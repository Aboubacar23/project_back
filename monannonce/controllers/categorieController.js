const { sequelize, Categorie } = require('../models');

// Liste des catégories
exports.listCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        return res.status(200).json({
            status: 'success',
            categories,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Création d'une catégorie
exports.createCategorie = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { libelle } = req.body;

        if (!libelle) {
            throw new Error("Le champ 'libelle' est obligatoire");
        }

        const categorie = await Categorie.create(
            { libelle },
            { transaction }
        );
        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            categorie,
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

// Afficher une catégorie spécifique
exports.showCategorie = async (req, res) => {
    const categorieId = req.params.id;
    try {
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec ID ${categorieId} introuvable`,
            });
        }
        return res.status(200).json({
            status: 'success',
            categorie,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Mise à jour d'une catégorie
exports.editCategorie = async (req, res) => {
    const categorieId = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const { libelle } = req.body;

        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec ID ${categorieId} introuvable`,
            });
        }

        await categorie.update(
            { libelle },
            { transaction }
        );
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Catégorie avec l'ID ${categorieId} modifiée avec succès`,
            categorie,
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

// Suppression d'une catégorie
exports.deleteCategorie = async (req, res) => {
    const categorieId = req.params.id;
    try {
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(404).json({
                status: 'error',
                message: `Catégorie avec ID ${categorieId} introuvable`,
            });
        }

        await categorie.destroy();
        return res.status(200).json({
            status: 'success',
            message: `Catégorie avec l'ID ${categorieId} supprimée avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

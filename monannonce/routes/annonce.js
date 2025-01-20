const express = require("express");
const router = express.Router();
const { validatorUser} = require('../middleware/user');
const { sequelize, Annonce, User} = require('../models');

router.get('/lists', async (req, res) => {
    try {
        const annonces = await Annonce.findAll({attributes : ['id', 'titre', 'description','image', 'statut', 'createdAt' ,'updatedAt']});

        return res.status(200).json({
            status: 'Success',
            annonces,
        });
    }catch (err)
    {
        console.log('ERROR', err);
        return  res.status(400).json({
            status: 'err',
            details: err.errors || err.message,
        })

    }
})
router.post('/new',async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { titre,description,prix,image,statut } = req.body;

        const annonce = await Annonce.create({titre, description, prix, image,statut}, {transaction});
        transaction.commit();

        return res.status(201).json({
            status : "success",
            user: annonce
        })

    }catch(err) {
        transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors
        });
    }
});
router.put('/edit/:id',async (req, res) => {
    const annonceId = req.params.id;
    const transaction = await sequelize.transaction();
    const { titre,description,prix,image,statut } = req.body;

    try {
        const annonce = await Annonce   .findByPk(annonceId);
        if (!annonce)
        {
            return res.status(404).json({
                status: 'error',
                message: `User avec ID ${annonceId} introuvable`,
            });
        }

       await annonce.update({titre, description, prix, image,statut}, {transaction});
        transaction.commit();

        return res.status(201).json({
            status : "success",
            message: `Annonce avec l'ID ${annonceId} modifié avec succès`,
            user: annonce
        })

    }catch(err) {
        transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors
        });
    }
});

router.get('/show/:id', async (req, res) => {
    const annonceID = req.params.id;

    try {
        const annonce = await Annonce.findByPk(annonceID, {
            attributes : ['id', 'titre', 'description','image', 'statut', 'createdAt' ,'updatedAt']
        });

        if (!annonce)
        {
            return res.status(404).json({
                status: 'error',
                message: `User avec ID ${annonceID} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            annonce,
        });
    }catch (err){
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message
        });
    }
});

router.delete('/delete/:id', async  (req, res) => {
    const annonceID = req.params.id; // ID de l'utilisateur à supprimer

    try {
        // Rechercher l'utilisateur
        const annonce = await Annonce.findByPk(annonceID);

        if (!annonce) {
            return res.status(404).json({
                status: 'error',
                message: `Annonce avec l'ID ${annonceID} introuvable`,
            });
        }

        // Supprimer l'utilisateur
        await annonce.destroy();

        return res.status(200).json({
            status: 'success',
            message: `Annonce avec l'ID ${annonceID} supprimé avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
})

module.exports = router;

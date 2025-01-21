const express = require('express');
const router = express.Router();
const { validatorCommentaire } = require("../middleware/commentaire");
const { Commentaire } = require("../models"); 

// Récupérer la liste des commentaires
router.get('/list', async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll(); 
        res.status(200).json({
            statut: 'succès',
            message: 'Liste des commentaires.',
            data: commentaires,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statut: 'erreur',
            message: 'Une erreur est survenue lors de la récupération des commentaires.',
        });
    }
});

// Ajouter un nouveau commentaire
router.post('/new', validatorCommentaire, async (req, res) => {
    try {
        const { objet, description, date_commentaire } = req.body;

        // Créer un nouveau commentaire dans la base de données
        const commentaireAjoute = await Commentaire.create({
            objet,
            description,
            date_commentaire: date_commentaire || new Date(),
        });

        res.status(201).json({
            statut: 'succès',
            message: `Commentaire ajouté avec succès.`,
            data: commentaireAjoute,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statut: 'erreur',
            message: 'Une erreur est survenue lors de l’ajout du commentaire.',
        });
    }
});

// Afficher les détails d’un commentaire spécifique
router.get('/show/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const commentaire = await Commentaire.findByPk(id); 
        if (!commentaire) {
            return res.status(404).json({
                statut: 'erreur',
                message: `Commentaire avec l'ID ${id} non trouvé.`,
            });
        }

        res.status(200).json({
            statut: 'succès',
            message: `Détails du commentaire avec ID ${id}.`,
            data: commentaire,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statut: 'erreur',
            message: 'Une erreur est survenue lors de la récupération du commentaire.',
        });
    }
});

// Modifier un commentaire existant
router.put('/edit/:id', validatorCommentaire, async (req, res) => {
    try {
        const { id } = req.params;
        const { objet, description, date_commentaire } = req.body;

        const commentaire = await Commentaire.findByPk(id);
        if (!commentaire) {
            return res.status(404).json({
                statut: 'erreur',
                message: `Commentaire avec l'ID ${id} non trouvé.`,
            });
        }

        // Mettre à jour le commentaire
        await commentaire.update({
            objet,
            description,
            date_commentaire,
        });

        res.status(200).json({
            statut: 'succès',
            message: `Commentaire modifié avec succès.`,
            data: commentaire,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statut: 'erreur',
            message: 'Une erreur est survenue lors de la modification du commentaire.',
        });
    }
});
// Supprimer un commentaire
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const commentaire = await Commentaire.findByPk(id);

        if (!commentaire) {
            return res.status(404).json({
                statut: 'échec',
                message: `Aucun commentaire trouvé avec l'ID ${id}.`,
            });
        }

        // Supprimer le commentaire
        await commentaire.destroy();

        res.status(200).json({
            statut: 'succès',
            message: `Commentaire avec l'ID ${id} supprimé avec succès.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statut: 'erreur',
            message: 'Une erreur est survenue lors de la suppression du commentaire.',
        });
    }
});
module.exports = router;

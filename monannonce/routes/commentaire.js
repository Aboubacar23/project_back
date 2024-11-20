const express = require('express');
const router = express.Router();
const { validatorCommentaire} = require("../middleware/commentaire");
// Récupérer la liste des commentaires
router.get('/list', (req, res) => {
    res.status(200).json({
        statut: 'succès',
        message: 'Liste des commentaires.',
    });
});

// Ajouter un nouveau commentaire
router.post('/new/:id', validatorCommentaire, (req, res) => {
    const { id } = req.params;
    const { commentaire } = req.body;

    res.status(201).json({
        statut: 'succès',
        message: `Commentaire ajouté avec l'ID ${id}: ${commentaire}`,
    });
});

// Afficher les détails d’un commentaire spécifique
router.get('/show/:id', validatorCommentaire, (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        statut: 'succès',
        message: `Détails du commentaire avec ID ${id}.`,
    });
});

// Modifier un commentaire existant
router.put('/modifier/:id', validatorCommentaire, (req, res) => {
    const { id } = req.params;
    const { commentaire } = req.body;

    res.status(200).json({
        statut: 'succès',
        message: `Commentaire modifié avec l'ID ${id}: ${commentaire}`,
    });
});

module.exports = router;

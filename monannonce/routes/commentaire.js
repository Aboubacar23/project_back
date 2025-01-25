const express = require('express');
const router = express.Router();
const commentaireController = require("../controllers/commentaireController");

// Récupérer la liste des commentaires
router.get('/list', commentaireController.listCommentaires);

// Ajouter un nouveau commentaire
router.post('/new', commentaireController.createCommentaire);

// Afficher les détails d’un commentaire spécifique
router.get('/show/:id', commentaireController.showCommentaire);

// Modifier un commentaire existant
router.put('/edit/:id', commentaireController.editCommentaire);

// Supprimer un commentaire
router.delete('/delete/:id', commentaireController.deleteCommentaire);

module.exports = router;

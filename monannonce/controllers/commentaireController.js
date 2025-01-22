const {Commentaire} = require("../models");


exports.listCommentaire = async (req, res) => {
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
};




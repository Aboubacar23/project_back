const express = require("express");
const router = express.Router();
const { validatorUser} = require('../middleware/user')

router.get('/list', (request, response) => {
    response.send('la liste des annonces');
})
router.post('/new',(request, response) => {
    response.status(201).json({
        statut : 'succès',
        message: 'Utilisateur créé avec succès',
    })
})
router.get('/show/:id', (request, response) => {
    response.send("détails d'une annonce");
})
router.put('/edit/:id', (request, response) =>
{
    const id = request.params.id;
    response.send(`modifier une annonce ${id}`);
})

router.delete('/delete/:id', (request, response) => {
    response.send("suppression d'une annonce");
})
module.exports = router;
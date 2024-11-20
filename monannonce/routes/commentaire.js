const express = require("express");
const router = express.Router();

router.get('/list', (request, response) => {
    response.send('la liste des commentaires');
})
router.get('/new', (request, response) => {
    response.send("ajoute d'un commentaire");
})
router.get('/show', (request, response) => {
    response.send("détails d'un commentaire ");
})
router.get('/modifier', (request, response) => {
    response.send("modifier un commentaire");
})

router.get('/delete', (request, response) => {
    response.send("suppression d'un commentaire");
})
module.exports = router;
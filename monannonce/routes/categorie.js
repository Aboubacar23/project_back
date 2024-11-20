const express = require("express");
const router = express.Router();

router.get('/list', (request, response) => {
    response.send('la liste des categories');
})
router.get('/new', (request, response) => {
    response.send("ajoute d'une categorie");
})
router.get('/show', (request, response) => {
    response.send("détails d'une categorie ");
})
router.get('/modifier', (request, response) => {
    response.send("modifier une categorie");
})

router.get('/delete', (request, response) => {
    response.send("suppression d'une categorie");
})
module.exports = router;
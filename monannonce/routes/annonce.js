const express = require("express");
const router = express.Router();

router.get('/list', (request, response) => {
    response.send('la liste des annonces');
})
router.get('/new', (request, response) => {
    response.send("ajoute d'une annonce");
})
router.get('/show', (request, response) => {
    response.send("détails d'une annonce");
})
router.get('/modifier', (request, response) => {
    response.send("modifier une annonce");
})

router.get('/delete', (request, response) => {
    response.send("suppression d'une annonce");
})
module.exports = router;
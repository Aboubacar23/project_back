const express = require("express");
const router = express.Router();

router.get('/list', (request, response) => {
    response.send('la liste des annonces');
})
router.post('/new', (request, response) => {
    response.send("ajoute d'une annonce");
})
router.get('/show/:id', (request, response) => {
    response.send("détails d'une annonce");
})
router.put('/modifier/:id', (request, response) => {
    response.send("modifier une annonce");
})

router.delete('/delete/:id', (request, response) => {
    response.send("suppression d'une annonce");
})
module.exports = router;
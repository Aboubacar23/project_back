const express = require("express");
const router = express.Router();

router.get('/list', (request, response) => {
    response.send('la liste des signalements');
})
router.get('/new', (request, response) => {
    response.send("ajoute d'un signalement");
})
router.get('/show', (request, response) => {
    response.send("détails d'un signalement");
})
router.get('/modifier', (request, response) => {
    response.send("modifier un signalement");
})

router.get('/delete', (request, response) => {
    response.send("suppression d'un signalement");
})
module.exports = router;
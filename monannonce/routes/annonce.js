const express = require("express");
const router = express.Router();
const annonceController = require('../controllers/annonceController');

router.get('/lists', annonceController.listAnnonces)
router.post('/new',annonceController.createAnnonce);
router.put('/edit/:id',annonceController.editAnnonce);
router.get('/show/:id', annonceController.showAnnonce);
router.delete('/delete/:id', annonceController.deleteAnnonce)

module.exports = router;

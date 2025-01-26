const express = require("express");
const router = express.Router();
const upload = require('../middleware/uploader')
const annonceController = require('../controllers/annonceController');

router.get('/lists', annonceController.listAnnonces)
router.post('/new', upload.single('image'),annonceController.createAnnonce);
router.put('/edit/:id',annonceController.editAnnonce);
router.get('/show/:id', annonceController.showAnnonce);
router.delete('/delete/:id', annonceController.deleteAnnonce)
router.post('/sendComment', annonceController.sendComment)

module.exports = router;

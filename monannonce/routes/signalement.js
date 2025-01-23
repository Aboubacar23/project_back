const express = require('express');
const router = express.Router();
const signalementController = require('../controllers/signalementController');


router.get('/list', signalementController.listSignalements);
router.post('/new', signalementController.createSignalement);
router.get('/show/:id', signalementController.showSignalement);
router.delete('/delete/:id', signalementController.deleteSignalement);

module.exports = router;

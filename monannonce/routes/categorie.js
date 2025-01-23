const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');


router.get('/list', categorieController.listCategories);
router.post('/new', categorieController.createCategorie);
router.get('/show/:id', categorieController.showCategorie);
router.put('/edit/:id', categorieController.editCategorie);
router.delete('/delete/:id', categorieController.deleteCategorie);

module.exports = router;

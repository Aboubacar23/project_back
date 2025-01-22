const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/list', userController.listUsers);
router.post('/new', userController.createUser);
router.get('/show/:id', userController.showUser);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;

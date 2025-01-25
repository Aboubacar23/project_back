const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/list', userController.listUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/show/:id', userController.showUser);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
